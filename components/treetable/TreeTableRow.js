'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTableRow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _TreeTableBodyCell = require('./TreeTableBodyCell');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTableRow = exports.TreeTableRow = function (_Component) {
    _inherits(TreeTableRow, _Component);

    function TreeTableRow(props) {
        _classCallCheck(this, TreeTableRow);

        var _this = _possibleConstructorReturn(this, (TreeTableRow.__proto__ || Object.getPrototypeOf(TreeTableRow)).call(this, props));

        _this.onTogglerClick = _this.onTogglerClick.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        _this.onTouchEnd = _this.onTouchEnd.bind(_this);
        _this.propagateUp = _this.propagateUp.bind(_this);
        _this.onCheckboxChange = _this.onCheckboxChange.bind(_this);
        _this.onCheckboxFocus = _this.onCheckboxFocus.bind(_this);
        _this.onCheckboxBlur = _this.onCheckboxBlur.bind(_this);
        _this.onRightClick = _this.onRightClick.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        return _this;
    }

    _createClass(TreeTableRow, [{
        key: 'isLeaf',
        value: function isLeaf() {
            return this.props.node.leaf === false ? false : !(this.props.node.children && this.props.node.children.length);
        }
    }, {
        key: 'onTogglerClick',
        value: function onTogglerClick(event) {
            if (this.isExpanded()) this.collapse(event);else this.expand(event);

            event.preventDefault();
        }
    }, {
        key: 'expand',
        value: function expand(event) {
            var expandedKeys = this.props.expandedKeys ? _extends({}, this.props.expandedKeys) : {};
            expandedKeys[this.props.node.key] = true;

            this.props.onToggle({
                originalEvent: event,
                value: expandedKeys
            });

            this.invokeToggleEvents(event, true);
        }
    }, {
        key: 'collapse',
        value: function collapse(event) {
            var expandedKeys = _extends({}, this.props.expandedKeys);
            delete expandedKeys[this.props.node.key];

            this.props.onToggle({
                originalEvent: event,
                value: expandedKeys
            });

            this.invokeToggleEvents(event, false);
        }
    }, {
        key: 'invokeToggleEvents',
        value: function invokeToggleEvents(event, expanded) {
            if (expanded) {
                if (this.props.onExpand) {
                    this.props.onExpand({
                        originalEvent: event,
                        node: this.props.node
                    });
                }
            } else {
                if (this.props.onCollapse) {
                    this.props.onCollapse({
                        originalEvent: event,
                        node: this.props.node
                    });
                }
            }
        }
    }, {
        key: 'onClick',
        value: function onClick(event) {
            if (this.props.onRowClick) {
                this.props.onRowClick({
                    originalEvent: event,
                    node: this.props.node
                });
            }

            var targetNode = event.target.nodeName;
            if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || _DomHandler2.default.hasClass(event.target, 'p-clickable') || _DomHandler2.default.hasClass(event.target, 'p-treetable-toggler') || _DomHandler2.default.hasClass(event.target.parentElement, 'p-treetable-toggler')) {
                return;
            }

            if ((this.isSingleSelectionMode() || this.isMultipleSelectionMode()) && this.props.node.selectable !== false) {
                var selectionKeys = void 0;
                var selected = this.isSelected();
                var metaSelection = this.nodeTouched ? false : this.props.metaKeySelection;

                if (metaSelection) {
                    var metaKey = event.metaKey || event.ctrlKey;

                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            selectionKeys = null;
                        } else {
                            selectionKeys = _extends({}, this.props.selectionKeys);
                            delete selectionKeys[this.props.node.key];
                        }

                        if (this.props.onUnselect) {
                            this.props.onUnselect({
                                originalEvent: event,
                                node: this.props.node
                            });
                        }
                    } else {
                        if (this.isSingleSelectionMode()) {
                            selectionKeys = this.props.node.key;
                        } else if (this.isMultipleSelectionMode()) {
                            selectionKeys = !metaKey ? {} : this.props.selectionKeys ? _extends({}, this.props.selectionKeys) : {};
                            selectionKeys[this.props.node.key] = true;
                        }

                        if (this.props.onSelect) {
                            this.props.onSelect({
                                originalEvent: event,
                                node: this.props.node
                            });
                        }
                    }
                } else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            selectionKeys = null;

                            if (this.props.onUnselect) {
                                this.props.onUnselect({
                                    originalEvent: event,
                                    node: this.props.node
                                });
                            }
                        } else {
                            selectionKeys = this.props.node.key;

                            if (this.props.onSelect) {
                                this.props.onSelect({
                                    originalEvent: event,
                                    node: this.props.node
                                });
                            }
                        }
                    } else {
                        if (selected) {
                            selectionKeys = _extends({}, this.props.selectionKeys);
                            delete selectionKeys[this.props.node.key];

                            if (this.props.onUnselect) {
                                this.props.onUnselect({
                                    originalEvent: event,
                                    node: this.props.node
                                });
                            }
                        } else {
                            selectionKeys = this.props.selectionKeys ? _extends({}, this.props.selectionKeys) : {};
                            selectionKeys[this.props.node.key] = true;

                            if (this.props.onSelect) {
                                this.props.onSelect({
                                    originalEvent: event,
                                    node: this.props.node
                                });
                            }
                        }
                    }
                }

                if (this.props.onSelectionChange) {
                    this.props.onSelectionChange({
                        originalEvent: event,
                        value: selectionKeys
                    });
                }
            }

            this.nodeTouched = false;
        }
    }, {
        key: 'onTouchEnd',
        value: function onTouchEnd() {
            this.nodeTouched = true;
        }
    }, {
        key: 'onCheckboxChange',
        value: function onCheckboxChange(event) {
            var checked = this.isChecked();
            var selectionKeys = this.props.selectionKeys ? _extends({}, this.props.selectionKeys) : {};

            if (checked) {
                if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, false, selectionKeys);else delete selectionKeys[this.props.node.key];

                if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
                    this.props.onPropagateUp({
                        originalEvent: event,
                        check: false,
                        selectionKeys: selectionKeys
                    });
                }

                if (this.props.onUnselect) {
                    this.props.onUnselect({
                        originalEvent: event,
                        node: this.props.node
                    });
                }
            } else {
                if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, true, selectionKeys);else selectionKeys[this.props.node.key] = { checked: true };

                if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
                    this.props.onPropagateUp({
                        originalEvent: event,
                        check: true,
                        selectionKeys: selectionKeys
                    });
                }

                if (this.props.onSelect) {
                    this.props.onSelect({
                        originalEvent: event,
                        node: this.props.node
                    });
                }
            }

            if (this.props.onSelectionChange) {
                this.props.onSelectionChange({
                    originalEvent: event,
                    value: selectionKeys
                });
            }

            _DomHandler2.default.clearSelection();
        }
    }, {
        key: 'onCheckboxFocus',
        value: function onCheckboxFocus() {
            _DomHandler2.default.addClass(this.checkboxBox, 'p-focus');
        }
    }, {
        key: 'onCheckboxBlur',
        value: function onCheckboxBlur() {
            _DomHandler2.default.removeClass(this.checkboxBox, 'p-focus');
        }
    }, {
        key: 'propagateUp',
        value: function propagateUp(event) {
            var check = event.check;
            var selectionKeys = event.selectionKeys;
            var checkedChildCount = 0;
            var childPartialSelected = false;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;

                    if (selectionKeys[child.key] && selectionKeys[child.key].checked) checkedChildCount++;else if (selectionKeys[child.key] && selectionKeys[child.key].partialChecked) childPartialSelected = true;
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

            if (check && checkedChildCount === this.props.node.children.length) {
                selectionKeys[this.props.node.key] = { checked: true, partialChecked: false };
            } else {
                if (!check) {
                    delete selectionKeys[this.props.node.key];
                }

                if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.props.node.children.length) selectionKeys[this.props.node.key] = { checked: false, partialChecked: true };else selectionKeys[this.props.node.key] = { checked: false, partialChecked: false };
            }

            if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
                this.props.onPropagateUp(event);
            }
        }
    }, {
        key: 'propagateDown',
        value: function propagateDown(node, check, selectionKeys) {
            if (check) selectionKeys[node.key] = { checked: true, partialChecked: false };else delete selectionKeys[node.key];

            if (node.children && node.children.length) {
                for (var i = 0; i < node.children.length; i++) {
                    this.propagateDown(node.children[i], check, selectionKeys);
                }
            }
        }
    }, {
        key: 'onRightClick',
        value: function onRightClick(event) {
            _DomHandler2.default.clearSelection();

            if (this.props.onContextMenuSelectionChange) {
                this.props.onContextMenuSelectionChange({
                    originalEvent: event,
                    value: this.props.node.key
                });
            }

            if (this.props.onContextMenu) {
                this.props.onContextMenu({
                    originalEvent: event,
                    node: this.props.node
                });
            }
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(event) {
            if (event.target === this.container) {
                var rowElement = event.currentTarget;

                switch (event.which) {
                    //down arrow
                    case 40:
                        var nextRow = rowElement.nextElementSibling;
                        if (nextRow) {
                            nextRow.focus();
                        }

                        event.preventDefault();
                        break;

                    //up arrow
                    case 38:
                        var previousRow = rowElement.previousElementSibling;
                        if (previousRow) {
                            previousRow.focus();
                        }

                        event.preventDefault();
                        break;

                    //right arrow
                    case 39:
                        if (!this.isExpanded()) {
                            this.expand(event);
                        }

                        event.preventDefault();
                        break;

                    //left arrow
                    case 37:
                        if (this.isExpanded()) {
                            this.collapse(event);
                        }

                        event.preventDefault();
                        break;

                    //enter
                    case 13:
                        this.onClick(event);
                        event.preventDefault();
                        break;

                    default:
                        //no op
                        break;
                }
            }
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
        key: 'isExpanded',
        value: function isExpanded() {
            return this.props.expandedKeys ? this.props.expandedKeys[this.props.node.key] !== undefined : false;
        }
    }, {
        key: 'isSelected',
        value: function isSelected() {
            if ((this.props.selectionMode === 'single' || this.props.selectionMode === 'multiple') && this.props.selectionKeys) return this.props.selectionMode === 'single' ? this.props.selectionKeys === this.props.node.key : this.props.selectionKeys[this.props.node.key] !== undefined;else return false;
        }
    }, {
        key: 'isChecked',
        value: function isChecked() {
            return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].checked : false;
        }
    }, {
        key: 'isPartialChecked',
        value: function isPartialChecked() {
            return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].partialChecked : false;
        }
    }, {
        key: 'renderToggler',
        value: function renderToggler() {
            var expanded = this.isExpanded();
            var iconClassName = (0, _classnames2.default)('pi pi-fw', { 'pi-chevron-right': !expanded, 'pi-chevron-down': expanded });
            var style = { marginLeft: this.props.level * 16 + 'px', visibility: this.props.node.leaf === false || this.props.node.children && this.props.node.children.length ? 'visible' : 'hidden' };

            return _react2.default.createElement(
                'a',
                { className: 'p-treetable-toggler p-unselectable-text', onClick: this.onTogglerClick, style: style },
                _react2.default.createElement('i', { className: iconClassName })
            );
        }
    }, {
        key: 'renderCheckbox',
        value: function renderCheckbox() {
            var _this2 = this;

            if (this.props.selectionMode === 'checkbox' && this.props.node.selectable !== false) {
                var checked = this.isChecked();
                var partialChecked = this.isPartialChecked();
                var className = (0, _classnames2.default)('p-checkbox-box', { 'p-highlight': checked });
                var icon = (0, _classnames2.default)('p-checkbox-icon p-c', { 'pi pi-check': checked, 'pi pi-minus': partialChecked });

                return _react2.default.createElement(
                    'div',
                    { className: 'p-checkbox p-treetable-checkbox p-component', onClick: this.onCheckboxChange },
                    _react2.default.createElement(
                        'div',
                        { className: 'p-hidden-accessible' },
                        _react2.default.createElement('input', { type: 'checkbox', onFocus: this.onCheckboxFocus, onBlur: this.onCheckboxBlur })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: className, ref: function ref(el) {
                                return _this2.checkboxBox = el;
                            } },
                        _react2.default.createElement('span', { className: icon })
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderCell',
        value: function renderCell(column) {
            var toggler = void 0,
                checkbox = void 0;

            if (column.props.expander) {
                toggler = this.renderToggler();
                checkbox = this.renderCheckbox();
            }

            return _react2.default.createElement(
                _TreeTableBodyCell.TreeTableBodyCell,
                _extends({ key: column.props.columnKey || column.props.field }, column.props, { node: this.props.node }),
                toggler,
                checkbox
            );
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var _this3 = this;

            if (this.isExpanded() && this.props.node.children) {
                return this.props.node.children.map(function (childNode) {
                    return _react2.default.createElement(TreeTableRow, { key: childNode.key || JSON.stringify(childNode.data), level: _this3.props.level + 1,
                        node: childNode, columns: _this3.props.columns, expandedKeys: _this3.props.expandedKeys,
                        onToggle: _this3.props.onToggle, onExpand: _this3.props.onExpand, onCollapse: _this3.props.onCollapse,
                        selectionMode: _this3.props.selectionMode, selectionKeys: _this3.props.selectionKeys, onSelectionChange: _this3.props.onSelectionChange,
                        metaKeySelection: _this3.props.metaKeySelection, onRowClick: _this3.props.onRowClick, onSelect: _this3.props.onSelect, onUnselect: _this3.props.onUnselect,
                        propagateSelectionUp: _this3.props.propagateSelectionDown, propagateSelectionDown: _this3.props.propagateSelectionDown, onPropagateUp: _this3.propagateUp,
                        rowClassName: _this3.props.rowClassName,
                        contextMenuSelectionKey: _this3.props.contextMenuSelectionKey, onContextMenuSelectionChange: _this3.props.onContextMenuSelectionChange, onContextMenu: _this3.props.onContextMenu });
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var cells = this.props.columns.map(function (col) {
                return _this4.renderCell(col);
            });
            var children = this.renderChildren();
            var className = {
                'p-highlight': this.isSelected(),
                'p-highlight-contextmenu': this.props.contextMenuSelectionKey && this.props.contextMenuSelectionKey === this.props.node.key
            };

            if (this.props.rowClassName) {
                var rowClassName = this.props.rowClassName(this.props.node);
                className = _extends({}, className, rowClassName);
            }

            className = (0, _classnames2.default)(className);

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'tr',
                    { ref: function ref(el) {
                            return _this4.container = el;
                        }, tabIndex: '0', className: className, onClick: this.onClick, onTouchEnd: this.onTouchEnd, onContextMenu: this.onRightClick, onKeyDown: this.onKeyDown },
                    cells
                ),
                children
            );
        }
    }]);

    return TreeTableRow;
}(_react.Component);

TreeTableRow.defaultProps = {
    node: null,
    level: null,
    columns: null,
    expandedKeys: null,
    contextMenuSelectionKey: null,
    selectionMode: null,
    selectionKeys: null,
    metaKeySelection: true,
    propagateSelectionUp: true,
    propagateSelectionDown: true,
    rowClassName: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onRowClick: null,
    onSelect: null,
    onUnselect: null,
    onSelectionChange: null,
    onPropagateUp: null,
    onContextMenuSelectionChange: null,
    onContextMenu: null
};
TreeTableRow.propsTypes = {
    node: _propTypes2.default.any,
    level: _propTypes2.default.number,
    columns: _propTypes2.default.array,
    expandedKeys: _propTypes2.default.array,
    contextMenuSelectionKey: _propTypes2.default.any,
    selectionMode: _propTypes2.default.string,
    selectionKeys: _propTypes2.default.array,
    metaKeySelection: _propTypes2.default.bool,
    propagateSelectionUp: _propTypes2.default.bool,
    propagateSelectionDown: _propTypes2.default.bool,
    rowClassName: _propTypes2.default.func,
    onExpand: _propTypes2.default.func,
    onCollapse: _propTypes2.default.func,
    onToggle: _propTypes2.default.func,
    onRowClick: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onUnselect: _propTypes2.default.func,
    onSelectionChange: _propTypes2.default.func,
    onPropagateUp: _propTypes2.default.func,
    onContextMenuSelectionChange: _propTypes2.default.func,
    onContextMenu: _propTypes2.default.func
};