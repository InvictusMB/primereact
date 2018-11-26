'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTableFooter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTableFooter = exports.TreeTableFooter = function (_Component) {
    _inherits(TreeTableFooter, _Component);

    function TreeTableFooter() {
        _classCallCheck(this, TreeTableFooter);

        return _possibleConstructorReturn(this, (TreeTableFooter.__proto__ || Object.getPrototypeOf(TreeTableFooter)).apply(this, arguments));
    }

    _createClass(TreeTableFooter, [{
        key: 'renderFooterCell',
        value: function renderFooterCell(column, index) {
            return _react2.default.createElement(
                'td',
                { key: column.field || index, className: column.props.footerClassName || column.props.className, style: column.props.footerStyle || column.props.style,
                    rowSpan: column.props.rowSpan, colSpan: column.props.colSpan },
                column.props.footer
            );
        }
    }, {
        key: 'renderFooterRow',
        value: function renderFooterRow(row, index) {
            var _this2 = this;

            var rowColumns = _react2.default.Children.toArray(row.props.children);
            var rowFooterCells = rowColumns.map(function (col, index) {
                return _this2.renderFooterCell(col, index);
            });

            return _react2.default.createElement(
                'tr',
                { key: index },
                rowFooterCells
            );
        }
    }, {
        key: 'renderColumnGroup',
        value: function renderColumnGroup() {
            var _this3 = this;

            var rows = _react2.default.Children.toArray(this.props.columnGroup.props.children);

            return rows.map(function (row, i) {
                return _this3.renderFooterRow(row, i);
            });
        }
    }, {
        key: 'renderColumns',
        value: function renderColumns(columns) {
            var _this4 = this;

            if (columns) {
                var headerCells = columns.map(function (col, index) {
                    return _this4.renderFooterCell(col, index);
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
        key: 'hasFooter',
        value: function hasFooter() {
            if (this.props.columnGroup) {
                return true;
            } else {
                for (var i = 0; i < this.props.columns.length; i++) {
                    if (this.props.columns[i].props.footer) {
                        return true;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var content = this.props.columnGroup ? this.renderColumnGroup() : this.renderColumns(this.props.columns);

            if (this.hasFooter()) {
                return _react2.default.createElement(
                    'tfoot',
                    { className: 'p-treetable-tfoot' },
                    content
                );
            } else {
                return null;
            }
        }
    }]);

    return TreeTableFooter;
}(_react.Component);

TreeTableFooter.defaultProps = {
    columns: null,
    columnGroup: null
};
TreeTableFooter.propsTypes = {
    columns: _propTypes2.default.array,
    columnGroup: _propTypes2.default.any
};