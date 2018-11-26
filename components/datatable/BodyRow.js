'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BodyRow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BodyCell = require('./BodyCell');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BodyRow = exports.BodyRow = function (_Component) {
    _inherits(BodyRow, _Component);

    function BodyRow(props) {
        _classCallCheck(this, BodyRow);

        var _this = _possibleConstructorReturn(this, (BodyRow.__proto__ || Object.getPrototypeOf(BodyRow)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.onDoubleClick = _this.onDoubleClick.bind(_this);
        _this.onTouchEnd = _this.onTouchEnd.bind(_this);
        _this.onRightClick = _this.onRightClick.bind(_this);
        _this.onMouseDown = _this.onMouseDown.bind(_this);
        _this.onDragEnd = _this.onDragEnd.bind(_this);
        _this.onDragOver = _this.onDragOver.bind(_this);
        _this.onDragLeave = _this.onDragLeave.bind(_this);
        _this.onDrop = _this.onDrop.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        return _this;
    }

    _createClass(BodyRow, [{
        key: 'onClick',
        value: function onClick(event) {
            if (this.props.onClick) {
                this.props.onClick({
                    originalEvent: event,
                    data: this.props.rowData,
                    index: this.props.rowIndex
                });
            }
        }
    }, {
        key: 'onDoubleClick',
        value: function onDoubleClick(event) {
            if (this.props.onDoubleClick) {
                this.props.onDoubleClick({
                    originalEvent: event,
                    data: this.props.rowData,
                    index: this.props.rowIndex
                });
            }
        }
    }, {
        key: 'onTouchEnd',
        value: function onTouchEnd(event) {
            if (this.props.onTouchEnd) {
                this.props.onTouchEnd(event);
            }
        }
    }, {
        key: 'onRightClick',
        value: function onRightClick(event) {
            if (this.props.onRightClick) {
                this.props.onRightClick({
                    originalEvent: event,
                    data: this.props.rowData,
                    index: this.props.rowIndex
                });
            }
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            if (_DomHandler2.default.hasClass(event.target, 'p-table-reorderablerow-handle')) event.currentTarget.draggable = true;else event.currentTarget.draggable = false;
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd(event) {
            if (this.props.onDragEnd) {
                this.props.onDragEnd(event);
            }
            event.currentTarget.draggable = false;
        }
    }, {
        key: 'onDragOver',
        value: function onDragOver(event) {
            if (this.props.onDragOver) {
                this.props.onDragOver({
                    originalEvent: event,
                    rowElement: this.container
                });
            }
            event.preventDefault();
        }
    }, {
        key: 'onDragLeave',
        value: function onDragLeave(event) {
            if (this.props.onDragLeave) {
                this.props.onDragLeave({
                    originalEvent: event,
                    rowElement: this.container
                });
            }
        }
    }, {
        key: 'onDrop',
        value: function onDrop(event) {
            if (this.props.onDrop) {
                this.props.onDrop({
                    originalEvent: event,
                    rowElement: this.container
                });
            }
            event.preventDefault();
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(event) {
            if (this.props.selectionMode) {
                var row = event.target;

                switch (event.which) {
                    //down arrow
                    case 40:
                        var nextRow = this.findNextSelectableRow(row);
                        if (nextRow) {
                            nextRow.focus();
                        }

                        event.preventDefault();
                        break;

                    //up arrow
                    case 38:
                        var prevRow = this.findPrevSelectableRow(row);
                        if (prevRow) {
                            prevRow.focus();
                        }

                        event.preventDefault();
                        break;

                    //enter
                    case 13:
                        this.onClick(event);
                        break;

                    default:
                        //no op
                        break;
                }
            }
        }
    }, {
        key: 'findNextSelectableRow',
        value: function findNextSelectableRow(row) {
            var nextRow = row.nextElementSibling;
            if (nextRow) {
                if (_DomHandler2.default.hasClass(nextRow, 'p-datatable-row')) return nextRow;else return this.findNextSelectableRow(nextRow);
            } else {
                return null;
            }
        }
    }, {
        key: 'findPrevSelectableRow',
        value: function findPrevSelectableRow(row) {
            var prevRow = row.previousElementSibling;
            if (prevRow) {
                if (_DomHandler2.default.hasClass(prevRow, 'p-datatable-row')) return prevRow;else return this.findPrevSelectableRow(prevRow);
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var columns = _react2.default.Children.toArray(this.props.children);
            var conditionalStyles = {
                'p-highlight': this.props.selected,
                'p-highlight-contextmenu': this.props.contextMenuSelected
            };

            if (this.props.rowClassName) {
                var rowClassNameCondition = this.props.rowClassName(this.props.rowData);
                conditionalStyles = _extends({}, conditionalStyles, rowClassNameCondition);
            }
            var className = (0, _classnames2.default)('p-datatable-row', conditionalStyles);
            var hasRowSpanGrouping = this.props.rowGroupMode === 'rowspan';
            var cells = [];

            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                var rowSpan = void 0;
                if (hasRowSpanGrouping) {
                    if (this.props.sortField === column.props.field) {
                        if (this.props.groupRowSpan) rowSpan = this.props.groupRowSpan;else continue;
                    }
                }

                var cell = _react2.default.createElement(_BodyCell.BodyCell, _extends({ key: i }, column.props, { value: this.props.value, rowSpan: rowSpan, rowData: this.props.rowData, rowIndex: this.props.rowIndex, onRowToggle: this.props.onRowToggle, expanded: this.props.expanded,
                    onRadioClick: this.props.onRadioClick, onCheckboxClick: this.props.onCheckboxClick, responsive: this.props.responsive, selected: this.props.selected }));

                cells.push(cell);
            }

            return _react2.default.createElement(
                'tr',
                { tabIndex: this.props.selectionMode ? '0' : null, ref: function ref(el) {
                        _this2.container = el;
                    }, className: className, onClick: this.onClick, onDoubleClick: this.onDoubleClick, onTouchEnd: this.onTouchEnd, onContextMenu: this.onRightClick, onMouseDown: this.onMouseDown,
                    onDragStart: this.props.onDragStart, onDragEnd: this.onDragEnd, onDragOver: this.onDragOver, onDragLeave: this.onDragLeave, onDrop: this.onDrop, style: { height: this.props.virtualRowHeight }, onKeyDown: this.onKeyDown },
                cells
            );
        }
    }]);

    return BodyRow;
}(_react.Component);