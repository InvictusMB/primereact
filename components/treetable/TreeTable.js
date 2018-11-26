'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _Paginator = require('../paginator/Paginator');

var _TreeTableHeader = require('./TreeTableHeader');

var _TreeTableBody = require('./TreeTableBody');

var _TreeTableFooter = require('./TreeTableFooter');

var _TreeTableScrollableView = require('./TreeTableScrollableView');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTable = exports.TreeTable = function (_Component) {
    _inherits(TreeTable, _Component);

    function TreeTable(props) {
        _classCallCheck(this, TreeTable);

        var _this = _possibleConstructorReturn(this, (TreeTable.__proto__ || Object.getPrototypeOf(TreeTable)).call(this, props));

        var state = {};

        if (!_this.props.onToggle) {
            _this.state = {
                expandedKeys: _this.props.expandedKeys
            };
        }

        if (!_this.props.onPage) {
            state.first = props.first;
            state.rows = props.rows;
        }

        if (!_this.props.onSort) {
            state.sortField = props.sortField;
            state.sortOrder = props.sortOrder;
            state.multiSortMeta = props.multiSortMeta;
        }

        if (Object.keys(state).length) {
            _this.state = state;
        }

        _this.onToggle = _this.onToggle.bind(_this);
        _this.onPageChange = _this.onPageChange.bind(_this);
        _this.onSort = _this.onSort.bind(_this);
        _this.onColumnResizeStart = _this.onColumnResizeStart.bind(_this);
        _this.onColumnDragStart = _this.onColumnDragStart.bind(_this);
        _this.onColumnDragOver = _this.onColumnDragOver.bind(_this);
        _this.onColumnDragLeave = _this.onColumnDragLeave.bind(_this);
        _this.onColumnDrop = _this.onColumnDrop.bind(_this);
        return _this;
    }

    _createClass(TreeTable, [{
        key: 'onToggle',
        value: function onToggle(event) {
            if (this.props.onToggle) {
                this.props.onToggle(event);
            } else {
                this.setState({
                    expandedKeys: event.value
                });
            }
        }
    }, {
        key: 'onPageChange',
        value: function onPageChange(event) {
            if (this.props.onPage) this.props.onPage(event);else this.setState({ first: event.first, rows: event.rows });
        }
    }, {
        key: 'onSort',
        value: function onSort(event) {
            var sortField = event.sortField;
            var sortOrder = this.getSortField() === event.sortField ? this.getSortOrder() * -1 : this.props.defaultSortOrder;
            var multiSortMeta = void 0;

            this.columnSortable = event.sortable;
            this.columnSortFunction = event.sortFunction;

            if (this.props.sortMode === 'multiple') {
                var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                multiSortMeta = this.getMultiSortMeta();
                if (!multiSortMeta || !metaKey) {
                    multiSortMeta = [];
                }

                multiSortMeta = this.addSortMeta({ field: sortField, order: sortOrder }, multiSortMeta);
            }

            if (this.props.onSort) {
                this.props.onSort({
                    sortField: sortField,
                    sortOrder: sortOrder,
                    multiSortMeta: multiSortMeta
                });
            } else {
                this.setState({
                    sortField: sortField,
                    sortOrder: sortOrder,
                    first: 0,
                    multiSortMeta: multiSortMeta
                });
            }
        }
    }, {
        key: 'addSortMeta',
        value: function addSortMeta(meta, multiSortMeta) {
            var index = -1;
            for (var i = 0; i < multiSortMeta.length; i++) {
                if (multiSortMeta[i].field === meta.field) {
                    index = i;
                    break;
                }
            }

            var value = [].concat(_toConsumableArray(multiSortMeta));
            if (index >= 0) value[index] = meta;else value.push(meta);

            return value;
        }
    }, {
        key: 'sortSingle',
        value: function sortSingle(data) {
            return this.sortNodes(data);
        }
    }, {
        key: 'sortNodes',
        value: function sortNodes(data) {
            var _this2 = this;

            var value = [].concat(_toConsumableArray(data));

            if (this.columnSortable && this.columnSortable === 'custom' && this.columnSortFunction) {
                value = this.columnSortFunction({
                    field: this.getSortField(),
                    order: this.getSortOrder()
                });
            } else {
                value.sort(function (node1, node2) {
                    var sortField = _this2.getSortField();
                    var value1 = _ObjectUtils2.default.resolveFieldData(node1.data, sortField);
                    var value2 = _ObjectUtils2.default.resolveFieldData(node2.data, sortField);
                    var result = null;

                    if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                    return _this2.getSortOrder() * result;
                });

                for (var i = 0; i < value.length; i++) {
                    if (value[i].children && value[i].children.length) {
                        value[i].children = this.sortNodes(value[i].children);
                    }
                }
            }

            return value;
        }
    }, {
        key: 'sortMultiple',
        value: function sortMultiple(data) {
            var multiSortMeta = this.getMultiSortMeta();

            if (multiSortMeta) return this.sortMultipleNodes(data, multiSortMeta);else return data;
        }
    }, {
        key: 'sortMultipleNodes',
        value: function sortMultipleNodes(data, multiSortMeta) {
            var _this3 = this;

            var value = [].concat(_toConsumableArray(data));
            value.sort(function (node1, node2) {
                return _this3.multisortField(node1, node2, multiSortMeta, 0);
            });

            for (var i = 0; i < value.length; i++) {
                if (value[i].children && value[i].children.length) {
                    value[i].children = this.sortMultipleNodes(value[i].children, multiSortMeta);
                }
            }

            return value;
        }
    }, {
        key: 'multisortField',
        value: function multisortField(node1, node2, multiSortMeta, index) {
            var value1 = _ObjectUtils2.default.resolveFieldData(node1.data, multiSortMeta[index].field);
            var value2 = _ObjectUtils2.default.resolveFieldData(node2.data, multiSortMeta[index].field);
            var result = null;

            if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else {
                if (value1 === value2) {
                    return multiSortMeta.length - 1 > index ? this.multisortField(node1, node2, multiSortMeta, index + 1) : 0;
                } else {
                    if ((typeof value1 === 'string' || value1 instanceof String) && (typeof value2 === 'string' || value2 instanceof String)) return multiSortMeta[index].order * value1.localeCompare(value2, undefined, { numeric: true });else result = value1 < value2 ? -1 : 1;
                }
            }

            return multiSortMeta[index].order * result;
        }
    }, {
        key: 'onColumnResizeStart',
        value: function onColumnResizeStart(event) {
            var containerLeft = _DomHandler2.default.getOffset(this.container).left;
            this.resizeColumn = event.columnEl;
            this.resizeColumnProps = event.column;
            this.columnResizing = true;
            this.lastResizerHelperX = event.originalEvent.pageX - containerLeft + this.container.scrollLeft;

            this.bindColumnResizeEvents();
        }
    }, {
        key: 'onColumnResize',
        value: function onColumnResize(event) {
            var containerLeft = _DomHandler2.default.getOffset(this.container).left;
            _DomHandler2.default.addClass(this.container, 'p-unselectable-text');
            this.resizerHelper.style.height = this.container.offsetHeight + 'px';
            this.resizerHelper.style.top = 0 + 'px';
            this.resizerHelper.style.left = event.pageX - containerLeft + this.container.scrollLeft + 'px';

            this.resizerHelper.style.display = 'block';
        }
    }, {
        key: 'onColumnResizeEnd',
        value: function onColumnResizeEnd(event) {
            var delta = this.resizerHelper.offsetLeft - this.lastResizerHelperX;
            var columnWidth = this.resizeColumn.offsetWidth;
            var newColumnWidth = columnWidth + delta;
            var minWidth = this.resizeColumn.style.minWidth || 15;

            if (columnWidth + delta > parseInt(minWidth, 10)) {
                if (this.props.columnResizeMode === 'fit') {
                    var nextColumn = this.resizeColumn.nextElementSibling;
                    var nextColumnWidth = nextColumn.offsetWidth - delta;

                    if (newColumnWidth > 15 && nextColumnWidth > 15) {
                        if (this.props.scrollable) {
                            var scrollableView = this.findParentScrollableView(this.resizeColumn);
                            var scrollableBodyTable = _DomHandler2.default.findSingle(scrollableView, 'table.p-treetable-scrollable-body-table');
                            var scrollableHeaderTable = _DomHandler2.default.findSingle(scrollableView, 'table.p-treetable-scrollable-header-table');
                            var scrollableFooterTable = _DomHandler2.default.findSingle(scrollableView, 'table.p-treetable-scrollable-footer-table');
                            var resizeColumnIndex = _DomHandler2.default.index(this.resizeColumn);

                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        } else {
                            this.resizeColumn.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                } else if (this.props.columnResizeMode === 'expand') {
                    if (this.props.scrollable) {
                        var _scrollableView = this.findParentScrollableView(this.resizeColumn);
                        var _scrollableBodyTable = _DomHandler2.default.findSingle(_scrollableView, 'table.p-treetable-scrollable-body-table');
                        var _scrollableHeaderTable = _DomHandler2.default.findSingle(_scrollableView, 'table.p-treetable-scrollable-header-table');
                        var _scrollableFooterTable = _DomHandler2.default.findSingle(_scrollableView, 'table.p-treetable-scrollable-footer-table');
                        _scrollableBodyTable.style.width = _scrollableBodyTable.offsetWidth + delta + 'px';
                        _scrollableHeaderTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';
                        if (_scrollableFooterTable) {
                            _scrollableFooterTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';
                        }
                        var _resizeColumnIndex = _DomHandler2.default.index(this.resizeColumn);

                        this.resizeColGroup(_scrollableHeaderTable, _resizeColumnIndex, newColumnWidth, null);
                        this.resizeColGroup(_scrollableBodyTable, _resizeColumnIndex, newColumnWidth, null);
                        this.resizeColGroup(_scrollableFooterTable, _resizeColumnIndex, newColumnWidth, null);
                    } else {
                        this.table.style.width = this.table.offsetWidth + delta + 'px';
                        this.resizeColumn.style.width = newColumnWidth + 'px';
                    }
                }

                if (this.props.onColumnResizeEnd) {
                    this.props.onColumnResizeEnd({
                        element: this.resizeColumn,
                        column: this.resizeColumnProps,
                        delta: delta
                    });
                }
            }

            this.resizerHelper.style.display = 'none';
            this.resizeColumn = null;
            this.resizeColumnProps = null;
            _DomHandler2.default.removeClass(this.container, 'p-unselectable-text');

            this.unbindColumnResizeEvents();
        }
    }, {
        key: 'findParentScrollableView',
        value: function findParentScrollableView(column) {
            if (column) {
                var parent = column.parentElement;
                while (parent && !_DomHandler2.default.hasClass(parent, 'p-treetable-scrollable-view')) {
                    parent = parent.parentElement;
                }

                return parent;
            } else {
                return null;
            }
        }
    }, {
        key: 'resizeColGroup',
        value: function resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
            if (table) {
                var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;

                if (colGroup) {
                    var col = colGroup.children[resizeColumnIndex];
                    var nextCol = col.nextElementSibling;
                    col.style.width = newColumnWidth + 'px';

                    if (nextCol && nextColumnWidth) {
                        nextCol.style.width = nextColumnWidth + 'px';
                    }
                } else {
                    throw new Error("Scrollable tables require a colgroup to support resizable columns");
                }
            }
        }
    }, {
        key: 'bindColumnResizeEvents',
        value: function bindColumnResizeEvents() {
            var _this4 = this;

            this.documentColumnResizeListener = document.addEventListener('mousemove', function (event) {
                if (_this4.columnResizing) {
                    _this4.onColumnResize(event);
                }
            });

            this.documentColumnResizeEndListener = document.addEventListener('mouseup', function (event) {
                if (_this4.columnResizing) {
                    _this4.columnResizing = false;
                    _this4.onColumnResizeEnd(event);
                }
            });
        }
    }, {
        key: 'unbindColumnResizeEvents',
        value: function unbindColumnResizeEvents() {
            document.removeEventListener('document', this.documentColumnResizeListener);
            document.removeEventListener('document', this.documentColumnResizeEndListener);
        }
    }, {
        key: 'onColumnDragStart',
        value: function onColumnDragStart(event) {
            if (this.columnResizing) {
                event.preventDefault();
                return;
            }

            this.iconWidth = _DomHandler2.default.getHiddenElementOuterWidth(this.reorderIndicatorUp);
            this.iconHeight = _DomHandler2.default.getHiddenElementOuterHeight(this.reorderIndicatorUp);

            this.draggedColumn = this.findParentHeader(event.target);
            event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
        }
    }, {
        key: 'onColumnDragOver',
        value: function onColumnDragOver(event) {
            var dropHeader = this.findParentHeader(event.target);
            if (this.props.reorderableColumns && this.draggedColumn && dropHeader) {
                event.preventDefault();
                var containerOffset = _DomHandler2.default.getOffset(this.container);
                var dropHeaderOffset = _DomHandler2.default.getOffset(dropHeader);

                if (this.draggedColumn !== dropHeader) {
                    var targetLeft = dropHeaderOffset.left - containerOffset.left;
                    //let targetTop =  containerOffset.top - dropHeaderOffset.top;
                    var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;

                    this.reorderIndicatorUp.style.top = dropHeaderOffset.top - containerOffset.top - (this.iconHeight - 1) + 'px';
                    this.reorderIndicatorDown.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

                    if (event.pageX > columnCenter) {
                        this.reorderIndicatorUp.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2) + 'px';
                        this.reorderIndicatorDown.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2) + 'px';
                        this.dropPosition = 1;
                    } else {
                        this.reorderIndicatorUp.style.left = targetLeft - Math.ceil(this.iconWidth / 2) + 'px';
                        this.reorderIndicatorDown.style.left = targetLeft - Math.ceil(this.iconWidth / 2) + 'px';
                        this.dropPosition = -1;
                    }

                    this.reorderIndicatorUp.style.display = 'block';
                    this.reorderIndicatorDown.style.display = 'block';
                }
            }
        }
    }, {
        key: 'onColumnDragLeave',
        value: function onColumnDragLeave(event) {
            if (this.props.reorderableColumns && this.draggedColumn) {
                event.preventDefault();
                this.reorderIndicatorUp.style.display = 'none';
                this.reorderIndicatorDown.style.display = 'none';
            }
        }
    }, {
        key: 'onColumnDrop',
        value: function onColumnDrop(event) {
            event.preventDefault();
            if (this.draggedColumn) {
                var dragIndex = _DomHandler2.default.index(this.draggedColumn);
                var dropIndex = _DomHandler2.default.index(this.findParentHeader(event.target));
                var allowDrop = dragIndex !== dropIndex;
                if (allowDrop && (dropIndex - dragIndex === 1 && this.dropPosition === -1 || dragIndex - dropIndex === 1 && this.dropPosition === 1)) {
                    allowDrop = false;
                }

                if (allowDrop) {
                    var columns = this.state.columnOrder ? this.getColumns() : _react2.default.Children.toArray(this.props.children);
                    _ObjectUtils2.default.reorderArray(columns, dragIndex, dropIndex);
                    var columnOrder = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var column = _step.value;

                            columnOrder.push(column.props.columnKey || column.props.field);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    this.setState({
                        columnOrder: columnOrder
                    });

                    if (this.props.onColReorder) {
                        this.props.onColReorder({
                            dragIndex: dragIndex,
                            dropIndex: dropIndex,
                            columns: columns
                        });
                    }
                }

                this.reorderIndicatorUp.style.display = 'none';
                this.reorderIndicatorDown.style.display = 'none';
                this.draggedColumn.draggable = false;
                this.draggedColumn = null;
                this.dropPosition = null;
            }
        }
    }, {
        key: 'findParentHeader',
        value: function findParentHeader(element) {
            if (element.nodeName === 'TH') {
                return element;
            } else {
                var parent = element.parentElement;
                while (parent.nodeName !== 'TH') {
                    parent = parent.parentElement;
                    if (!parent) break;
                }
                return parent;
            }
        }
    }, {
        key: 'getExpandedKeys',
        value: function getExpandedKeys() {
            return this.props.onToggle ? this.props.expandedKeys : this.state.expandedKeys;
        }
    }, {
        key: 'getFirst',
        value: function getFirst() {
            return this.props.onPage ? this.props.first : this.state.first;
        }
    }, {
        key: 'getRows',
        value: function getRows() {
            return this.props.onPage ? this.props.rows : this.state.rows;
        }
    }, {
        key: 'getSortField',
        value: function getSortField() {
            return this.props.onSort ? this.props.sortField : this.state.sortField;
        }
    }, {
        key: 'getSortOrder',
        value: function getSortOrder() {
            return this.props.onSort ? this.props.sortOrder : this.state.sortOrder;
        }
    }, {
        key: 'getMultiSortMeta',
        value: function getMultiSortMeta() {
            return this.props.onSort ? this.props.multiSortMeta : this.state.multiSortMeta;
        }
    }, {
        key: 'findColumnByKey',
        value: function findColumnByKey(columns, key) {
            if (columns && columns.length) {
                for (var i = 0; i < columns.length; i++) {
                    var child = columns[i];
                    if (child.props.columnKey === key || child.props.field === key) {
                        return child;
                    }
                }
            }

            return null;
        }
    }, {
        key: 'getColumns',
        value: function getColumns() {
            var columns = _react2.default.Children.toArray(this.props.children);

            if (this.props.reorderableColumns && this.state.columnOrder) {
                var orderedColumns = [];
                for (var i = 0; i < this.state.columnOrder.length; i++) {
                    orderedColumns.push(this.findColumnByKey(columns, this.state.columnOrder[i]));
                }

                return orderedColumns;
            } else {
                return columns;
            }
        }
    }, {
        key: 'getTotalRecords',
        value: function getTotalRecords(data) {
            return this.props.lazy ? this.props.totalRecords : data ? data.length : 0;
        }
    }, {
        key: 'isSingleSelectionMode',
        value: function isSingleSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'single';
        }
    }, {
        key: 'isMultipleSelectionMode',
        value: function isMultipleSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'multiple';
        }
    }, {
        key: 'isRowSelectionMode',
        value: function isRowSelectionMode() {
            return this.isSingleSelectionMode() || this.isMultipleSelectionMode();
        }
    }, {
        key: 'getFrozenColumns',
        value: function getFrozenColumns(columns) {
            var frozenColumns = null;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var col = _step2.value;

                    if (col.props.frozen) {
                        frozenColumns = frozenColumns || [];
                        frozenColumns.push(col);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return frozenColumns;
        }
    }, {
        key: 'getScrollableColumns',
        value: function getScrollableColumns(columns) {
            var scrollableColumns = null;

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = columns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var col = _step3.value;

                    if (!col.props.frozen) {
                        scrollableColumns = scrollableColumns || [];
                        scrollableColumns.push(col);
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return scrollableColumns;
        }
    }, {
        key: 'processValue',
        value: function processValue() {
            var data = this.props.value;

            if (!this.props.lazy) {
                if (data && data.length) {
                    if (this.getSortField() || this.getMultiSortMeta()) {
                        if (this.props.sortMode === 'single') data = this.sortSingle(data);else if (this.props.sortMode === 'multiple') data = this.sortMultiple(data);
                    }
                }
            }

            return data;
        }
    }, {
        key: 'createTableHeader',
        value: function createTableHeader(columns, columnGroup) {
            return _react2.default.createElement(_TreeTableHeader.TreeTableHeader, { columns: columns, columnGroup: columnGroup,
                onSort: this.onSort, sortField: this.getSortField(), sortOrder: this.getSortOrder(), multiSortMeta: this.getMultiSortMeta(),
                resizableColumns: this.props.resizableColumns, onResizeStart: this.onColumnResizeStart,
                reorderableColumns: this.props.reorderableColumns, onDragStart: this.onColumnDragStart,
                onDragOver: this.onColumnDragOver, onDragLeave: this.onColumnDragLeave, onDrop: this.onColumnDrop });
        }
    }, {
        key: 'createTableFooter',
        value: function createTableFooter(columns, columnGroup) {
            return _react2.default.createElement(_TreeTableFooter.TreeTableFooter, { columns: columns, columnGroup: columnGroup });
        }
    }, {
        key: 'createTableBody',
        value: function createTableBody(value, columns) {
            return _react2.default.createElement(_TreeTableBody.TreeTableBody, { value: value, columns: columns, expandedKeys: this.getExpandedKeys(),
                onToggle: this.onToggle, onExpand: this.props.onExpand, onCollapse: this.props.onCollapse,
                paginator: this.props.paginator, first: this.getFirst(), rows: this.getRows(),
                selectionMode: this.props.selectionMode, selectionKeys: this.props.selectionKeys, onSelectionChange: this.props.onSelectionChange,
                metaKeySelection: this.props.metaKeySelection, onRowClick: this.props.onRowClick, onSelect: this.props.onSelect, onUnselect: this.props.onUnselect,
                propagateSelectionUp: this.props.propagateSelectionDown, propagateSelectionDown: this.props.propagateSelectionDown,
                lazy: this.props.lazy, rowClassName: this.props.rowClassName, emptyMessage: this.props.emptyMessage, loading: this.props.loading,
                contextMenuSelectionKey: this.props.contextMenuSelectionKey, onContextMenuSelectionChange: this.props.onContextMenuSelectionChange, onContextMenu: this.props.onContextMenu });
        }
    }, {
        key: 'createPaginator',
        value: function createPaginator(position, totalRecords) {
            var className = 'p-paginator-' + position;

            return _react2.default.createElement(_Paginator.Paginator, { first: this.getFirst(), rows: this.getRows(), pageLinkSize: this.props.pageLinkSize, className: className,
                onPageChange: this.onPageChange, template: this.props.paginatorTemplate,
                totalRecords: totalRecords, rowsPerPageOptions: this.props.rowsPerPageOptions,
                leftContent: this.props.paginatorLeft, rightContent: this.props.paginatorRight });
        }
    }, {
        key: 'createScrollableView',
        value: function createScrollableView(value, columns, frozen, headerColumnGroup, footerColumnGroup) {
            var header = this.createTableHeader(columns, headerColumnGroup);
            var footer = this.createTableFooter(columns, footerColumnGroup);
            var body = this.createTableBody(value, columns);

            return _react2.default.createElement(_TreeTableScrollableView.TreeTableScrollableView, { columns: columns, header: header, body: body, footer: footer,
                scrollHeight: this.props.scrollHeight, frozen: frozen, frozenWidth: this.props.frozenWidth });
        }
    }, {
        key: 'renderScrollableTable',
        value: function renderScrollableTable(value) {
            var columns = this.getColumns();
            var frozenColumns = this.getFrozenColumns(columns);
            var scrollableColumns = frozenColumns ? this.getScrollableColumns(columns) : columns;
            var frozenView = void 0,
                scrollableView = void 0;
            if (frozenColumns) {
                frozenView = this.createScrollableView(value, frozenColumns, true, this.props.frozenHeaderColumnGroup, this.props.frozenFooterColumnGroup);
            }

            scrollableView = this.createScrollableView(value, scrollableColumns, false, this.props.headerColumnGroup, this.props.footerColumnGroup);

            return _react2.default.createElement(
                'div',
                { className: 'p-treetable-scrollable-wrapper' },
                frozenView,
                scrollableView
            );
        }
    }, {
        key: 'renderRegularTable',
        value: function renderRegularTable(value) {
            var _this5 = this;

            var columns = this.getColumns();
            var header = this.createTableHeader(columns, this.props.headerColumnGroup);
            var footer = this.createTableFooter(columns, this.props.footerColumnGroup);
            var body = this.createTableBody(value, columns);

            return _react2.default.createElement(
                'div',
                { className: 'p-treetable-tablewrapper' },
                _react2.default.createElement(
                    'table',
                    { style: this.props.tableStyle, className: this.props.tableClassName, ref: function ref(el) {
                            return _this5.table = el;
                        } },
                    header,
                    footer,
                    body
                )
            );
        }
    }, {
        key: 'renderTable',
        value: function renderTable(value) {
            if (this.props.scrollable) return this.renderScrollableTable(value);else return this.renderRegularTable(value);
        }
    }, {
        key: 'renderLoader',
        value: function renderLoader() {
            if (this.props.loading) {
                var iconClassName = (0, _classnames2.default)('p-treetable-loading-icon pi-spin', this.props.loadingIcon);

                return _react2.default.createElement(
                    'div',
                    { className: 'p-treetable-loading' },
                    _react2.default.createElement('div', { className: 'p-treetable-loading-overlay p-component-overlay' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'p-treetable-loading-content' },
                        _react2.default.createElement('i', { className: iconClassName })
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var value = this.processValue();
            var className = (0, _classnames2.default)('p-treetable p-component', {
                'p-treetable-hoverable-rows': this.isRowSelectionMode(),
                'p-treetable-resizable': this.props.resizableColumns,
                'p-treetable-resizable-fit': this.props.resizableColumns && this.props.columnResizeMode === 'fit',
                'p-treetable-auto-layout': this.props.autoLayout
            });
            var table = this.renderTable(value);
            var totalRecords = this.getTotalRecords(value);
            var headerFacet = this.props.header && _react2.default.createElement(
                'div',
                { className: 'p-treetable-header' },
                this.props.header
            );
            var footerFacet = this.props.footer && _react2.default.createElement(
                'div',
                { className: 'p-treetable-footer' },
                this.props.footer
            );
            var paginatorTop = this.props.paginator && this.props.paginatorPosition !== 'bottom' && this.createPaginator('top', totalRecords);
            var paginatorBottom = this.props.paginator && this.props.paginatorPosition !== 'top' && this.createPaginator('bottom', totalRecords);
            var loader = this.renderLoader();
            var resizeHelper = this.props.resizableColumns && _react2.default.createElement('div', { ref: function ref(el) {
                    _this6.resizerHelper = el;
                }, className: 'p-column-resizer-helper', style: { display: 'none' } });
            var reorderIndicatorUp = this.props.reorderableColumns && _react2.default.createElement('span', { ref: function ref(el) {
                    return _this6.reorderIndicatorUp = el;
                }, className: 'pi pi-arrow-down p-datatable-reorder-indicator-up', style: { position: 'absolute', display: 'none' } });
            var reorderIndicatorDown = this.props.reorderableColumns && _react2.default.createElement('span', { ref: function ref(el) {
                    return _this6.reorderIndicatorDown = el;
                }, className: 'pi pi-arrow-up p-datatable-reorder-indicator-down', style: { position: 'absolute', display: 'none' } });

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                        return _this6.container = el;
                    } },
                loader,
                headerFacet,
                paginatorTop,
                table,
                paginatorBottom,
                footerFacet,
                resizeHelper,
                reorderIndicatorUp,
                reorderIndicatorDown
            );
        }
    }]);

    return TreeTable;
}(_react.Component);

TreeTable.defaultProps = {
    id: null,
    value: null,
    header: null,
    footer: null,
    style: null,
    className: null,
    tableStyle: null,
    tableClassName: null,
    expandedKeys: null,
    paginator: false,
    paginatorPosition: 'bottom',
    alwaysShowPaginator: true,
    paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    paginatorLeft: null,
    paginatorRight: null,
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    first: null,
    rows: null,
    totalRecords: null,
    lazy: false,
    sortField: null,
    sortOrder: null,
    multiSortMeta: null,
    sortMode: 'single',
    defaultSortOrder: 1,
    selectionMode: null,
    selectionKeys: null,
    contextMenuSelectionKey: null,
    metaKeySelection: true,
    propagateSelectionUp: true,
    propagateSelectionDown: true,
    autoLayout: false,
    rowClassName: null,
    loading: false,
    loadingIcon: 'pi pi-spinner',
    scrollable: false,
    scrollHeight: null,
    reorderableColumns: false,
    headerColumnGroup: null,
    footerColumnGroup: null,
    frozenHeaderColumnGroup: null,
    frozenFooterColumnGroup: null,
    frozenWidth: null,
    resizableColumns: false,
    columnResizeMode: 'fit',
    emptyMessage: "No records found",
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onPage: null,
    onSort: null,
    onSelect: null,
    onUnselect: null,
    onRowClick: null,
    onSelectionChange: null,
    onContextMenuSelectionChange: null,
    onColumnResizeEnd: null,
    onColReorder: null,
    onContextMenu: null
};
TreeTable.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    header: _propTypes2.default.any,
    footer: _propTypes2.default.any,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    tableStyle: _propTypes2.default.any,
    tableClassName: _propTypes2.default.string,
    expandedKeys: _propTypes2.default.object,
    paginator: _propTypes2.default.bool,
    paginatorPosition: _propTypes2.default.string,
    alwaysShowPaginator: _propTypes2.default.bool,
    paginatorTemplate: _propTypes2.default.string,
    paginatorLeft: _propTypes2.default.any,
    paginatorRight: _propTypes2.default.any,
    pageLinkSize: _propTypes2.default.number,
    rowsPerPageOptions: _propTypes2.default.array,
    first: _propTypes2.default.number,
    rows: _propTypes2.default.number,
    totalRecords: _propTypes2.default.number,
    lazy: _propTypes2.default.bool,
    sortField: _propTypes2.default.string,
    sortOrder: _propTypes2.default.number,
    multiSortMeta: _propTypes2.default.array,
    sortMode: _propTypes2.default.string,
    defaultSortOrder: _propTypes2.default.number,
    selectionMode: _propTypes2.default.string,
    selectionKeys: _propTypes2.default.array,
    contextMenuSelectionKey: _propTypes2.default.any,
    metaKeySelection: _propTypes2.default.bool,
    propagateSelectionUp: _propTypes2.default.bool,
    propagateSelectionDown: _propTypes2.default.bool,
    autoLayout: _propTypes2.default.bool,
    rowClassName: _propTypes2.default.func,
    loading: _propTypes2.default.bool,
    loadingIcon: _propTypes2.default.string,
    scrollable: _propTypes2.default.bool,
    scrollHeight: _propTypes2.default.string,
    reorderableColumns: _propTypes2.default.bool,
    headerColumnGroup: _propTypes2.default.any,
    footerColumnGroup: _propTypes2.default.any,
    frozenHeaderColumnGroup: _propTypes2.default.any,
    frozenFooterColumnGroup: _propTypes2.default.any,
    frozenWidth: _propTypes2.default.string,
    resizableColumns: _propTypes2.default.bool,
    columnResizeMode: _propTypes2.default.string,
    emptyMessage: _propTypes2.default.string,
    onExpand: _propTypes2.default.func,
    onCollapse: _propTypes2.default.func,
    onToggle: _propTypes2.default.func,
    onPage: _propTypes2.default.func,
    onSort: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onUnselect: _propTypes2.default.func,
    onRowClick: _propTypes2.default.func,
    onSelectionChange: _propTypes2.default.func,
    onContextMenuSelectionChange: _propTypes2.default.func,
    onColumnResizeEnd: _propTypes2.default.func,
    onColReorder: _propTypes2.default.func,
    onContextMenu: _propTypes2.default.func
};