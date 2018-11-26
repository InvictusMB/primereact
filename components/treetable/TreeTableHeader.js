'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTableHeader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTableHeader = exports.TreeTableHeader = function (_Component) {
    _inherits(TreeTableHeader, _Component);

    function TreeTableHeader(props) {
        _classCallCheck(this, TreeTableHeader);

        var _this = _possibleConstructorReturn(this, (TreeTableHeader.__proto__ || Object.getPrototypeOf(TreeTableHeader)).call(this, props));

        _this.onHeaderMouseDown = _this.onHeaderMouseDown.bind(_this);
        return _this;
    }

    _createClass(TreeTableHeader, [{
        key: 'onHeaderClick',
        value: function onHeaderClick(event, column) {
            if (column.props.sortable) {
                var targetNode = event.target;
                if (_DomHandler2.default.hasClass(targetNode, 'p-sortable-column') || _DomHandler2.default.hasClass(targetNode, 'p-column-title') || _DomHandler2.default.hasClass(targetNode, 'p-sortable-column-icon') || _DomHandler2.default.hasClass(targetNode.parentElement, 'p-sortable-column-icon')) {

                    this.props.onSort({
                        originalEvent: event,
                        sortField: column.props.field,
                        sortFunction: column.props.sortFunction,
                        sortable: column.props.sortable
                    });

                    _DomHandler2.default.clearSelection();
                }
            }
        }
    }, {
        key: 'onHeaderMouseDown',
        value: function onHeaderMouseDown(event) {
            if (this.props.reorderableColumns) {
                if (event.target.nodeName !== 'INPUT') event.currentTarget.draggable = true;else if (event.target.nodeName === 'INPUT') event.currentTarget.draggable = false;
            }
        }
    }, {
        key: 'getMultiSortMetaData',
        value: function getMultiSortMetaData(column) {
            if (this.props.multiSortMeta) {
                for (var i = 0; i < this.props.multiSortMeta.length; i++) {
                    if (this.props.multiSortMeta[i].field === column.props.field) {
                        return this.props.multiSortMeta[i];
                    }
                }
            }

            return null;
        }
    }, {
        key: 'onResizerMouseDown',
        value: function onResizerMouseDown(event, column) {
            if (this.props.resizableColumns && this.props.onResizeStart) {
                this.props.onResizeStart({
                    originalEvent: event,
                    columnEl: event.target.parentElement,
                    column: column
                });
            }
        }
    }, {
        key: 'renderSortIcon',
        value: function renderSortIcon(column, sorted, sortOrder) {
            if (column.props.sortable) {
                var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-down' : 'pi-sort-up' : 'pi-sort';
                var sortIconClassName = (0, _classnames2.default)('pi pi-fw', sortIcon);

                return _react2.default.createElement(
                    'a',
                    { className: 'p-sortable-column-icon' },
                    _react2.default.createElement('span', { className: sortIconClassName })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderResizer',
        value: function renderResizer(column) {
            var _this2 = this;

            if (this.props.resizableColumns) {
                return _react2.default.createElement('span', { className: 'p-column-resizer p-clickable', onMouseDown: function onMouseDown(e) {
                        return _this2.onResizerMouseDown(e, column);
                    } });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderHeaderCell',
        value: function renderHeaderCell(column, index) {
            var _this3 = this;

            var multiSortMetaData = this.getMultiSortMetaData(column);
            var singleSorted = column.props.field === this.props.sortField;
            var multipleSorted = multiSortMetaData !== null;
            var sorted = column.props.sortable && (singleSorted || multipleSorted);
            var sortOrder = 0;

            if (singleSorted) sortOrder = this.props.sortOrder;else if (multipleSorted) sortOrder = multiSortMetaData.order;

            var sortIconElement = this.renderSortIcon(column, sorted, sortOrder);

            var className = (0, _classnames2.default)(column.props.headerClassName || column.props.className, {
                'p-sortable-column': column.props.sortable,
                'p-highlight': sorted,
                'p-resizable-column': this.props.resizableColumns
            });

            var resizer = this.renderResizer(column);

            return _react2.default.createElement(
                'th',
                { key: column.field || index, className: className, style: column.props.headerStyle || column.props.style,
                    onClick: function onClick(e) {
                        return _this3.onHeaderClick(e, column);
                    }, onMouseDown: this.onHeaderMouseDown, rowSpan: column.props.rowSpan, colSpan: column.props.colSpan,
                    onDragStart: this.props.onDragStart, onDragOver: this.props.onDragOver, onDragLeave: this.props.onDragLeave, onDrop: this.props.onDrop },
                resizer,
                _react2.default.createElement(
                    'span',
                    { className: 'p-column-title' },
                    column.props.header
                ),
                sortIconElement
            );
        }
    }, {
        key: 'renderHeaderRow',
        value: function renderHeaderRow(row, index) {
            var _this4 = this;

            var rowColumns = _react2.default.Children.toArray(row.props.children);
            var rowHeaderCells = rowColumns.map(function (col, index) {
                return _this4.renderHeaderCell(col, index);
            });

            return _react2.default.createElement(
                'tr',
                { key: index },
                rowHeaderCells
            );
        }
    }, {
        key: 'renderColumnGroup',
        value: function renderColumnGroup() {
            var _this5 = this;

            var rows = _react2.default.Children.toArray(this.props.columnGroup.props.children);

            return rows.map(function (row, i) {
                return _this5.renderHeaderRow(row, i);
            });
        }
    }, {
        key: 'renderColumns',
        value: function renderColumns(columns) {
            var _this6 = this;

            if (columns) {
                var headerCells = columns.map(function (col, index) {
                    return _this6.renderHeaderCell(col, index);
                });
                return _react2.default.createElement(
                    'tr',
                    null,
                    headerCells
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var content = this.props.columnGroup ? this.renderColumnGroup() : this.renderColumns(this.props.columns);

            return _react2.default.createElement(
                'thead',
                { className: 'p-treetable-thead' },
                content
            );
        }
    }]);

    return TreeTableHeader;
}(_react.Component);

TreeTableHeader.defaultProps = {
    columns: null,
    columnGroup: null,
    sortField: null,
    sortOrder: null,
    multiSortMeta: null,
    resizableColumns: false,
    reorderableColumns: false,
    onSort: null,
    onResizeStart: null,
    onDragStart: null,
    onDragOver: null,
    onDragLeave: null,
    onDrop: null
};
TreeTableHeader.propsTypes = {
    columns: _propTypes2.default.array,
    columnGroup: _propTypes2.default.any,
    sortField: _propTypes2.default.string,
    sortOrder: _propTypes2.default.number,
    multiSortMeta: _propTypes2.default.array,
    resizableColumns: _propTypes2.default.bool,
    reorderableColumns: _propTypes2.default.bool,
    onSort: _propTypes2.default.func,
    onResizeStart: _propTypes2.default.func,
    onDragStart: _propTypes2.default.func,
    onDragOver: _propTypes2.default.func,
    onDragLeave: _propTypes2.default.func,
    onDrop: _propTypes2.default.func
};