'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTableBody = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TreeTableRow = require('./TreeTableRow');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTableBody = exports.TreeTableBody = function (_Component) {
    _inherits(TreeTableBody, _Component);

    function TreeTableBody() {
        _classCallCheck(this, TreeTableBody);

        return _possibleConstructorReturn(this, (TreeTableBody.__proto__ || Object.getPrototypeOf(TreeTableBody)).apply(this, arguments));
    }

    _createClass(TreeTableBody, [{
        key: 'createRow',
        value: function createRow(node) {
            return _react2.default.createElement(_TreeTableRow.TreeTableRow, { key: node.key || JSON.stringify(node.data), level: 0,
                node: node, columns: this.props.columns, expandedKeys: this.props.expandedKeys,
                onToggle: this.props.onToggle, onExpand: this.props.onExpand, onCollapse: this.props.onCollapse,
                selectionMode: this.props.selectionMode, selectionKeys: this.props.selectionKeys, onSelectionChange: this.props.onSelectionChange,
                metaKeySelection: this.props.metaKeySelection, onRowClick: this.props.onRowClick, onSelect: this.props.onSelect, onUnselect: this.props.onUnselect,
                propagateSelectionUp: this.props.propagateSelectionDown, propagateSelectionDown: this.props.propagateSelectionDown,
                rowClassName: this.props.rowClassName,
                contextMenuSelectionKey: this.props.contextMenuSelectionKey, onContextMenuSelectionChange: this.props.onContextMenuSelectionChange, onContextMenu: this.props.onContextMenu });
        }
    }, {
        key: 'renderRows',
        value: function renderRows() {
            var _this2 = this;

            if (this.props.paginator && !this.props.lazy) {
                var rpp = this.props.rows || 0;
                var startIndex = this.props.first || 0;
                var endIndex = startIndex + rpp;
                var rows = [];

                for (var i = startIndex; i < endIndex; i++) {
                    rows.push(this.createRow(this.props.value[i]));
                }

                return rows;
            } else {
                return this.props.value.map(function (node) {
                    return _this2.createRow(node);
                });
            }
        }
    }, {
        key: 'renderEmptyMessage',
        value: function renderEmptyMessage() {
            if (this.props.loading) {
                return null;
            } else {
                var colSpan = this.props.columns ? this.props.columns.length : null;
                return _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'td',
                        { className: 'p-treetable-emptymessage', colSpan: colSpan },
                        this.props.emptyMessage
                    )
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var content = this.props.value && this.props.value.length ? this.renderRows() : this.renderEmptyMessage();

            return _react2.default.createElement(
                'tbody',
                { className: 'p-treetable-tbody' },
                content
            );
        }
    }]);

    return TreeTableBody;
}(_react.Component);

TreeTableBody.defaultProps = {
    value: null,
    columns: null,
    expandedKeys: null,
    contextMenuSelectionKey: null,
    paginator: false,
    first: null,
    rows: null,
    selectionMode: null,
    selectionKeys: null,
    metaKeySelection: true,
    propagateSelectionUp: true,
    propagateSelectionDown: true,
    lazy: false,
    rowClassName: null,
    emptyMessage: "No records found",
    loading: false,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onRowClick: null,
    onSelect: null,
    onUnselect: null,
    onSelectionChange: null,
    onContextMenuSelectionChange: null,
    onContextMenu: null
};
TreeTableBody.propsTypes = {
    value: _propTypes2.default.array,
    columns: _propTypes2.default.array,
    expandedKeys: _propTypes2.default.array,
    contextMenuSelectionKey: _propTypes2.default.any,
    paginator: _propTypes2.default.bool,
    first: _propTypes2.default.number,
    rows: _propTypes2.default.number,
    selectionMode: _propTypes2.default.string,
    selectionKeys: _propTypes2.default.array,
    metaKeySelection: _propTypes2.default.bool,
    propagateSelectionUp: _propTypes2.default.bool,
    propagateSelectionDown: _propTypes2.default.bool,
    lazy: _propTypes2.default.bool,
    rowClassName: _propTypes2.default.func,
    emptyMessage: _propTypes2.default.string,
    loading: _propTypes2.default.boolean,
    onExpand: _propTypes2.default.func,
    onCollapse: _propTypes2.default.func,
    onToggle: _propTypes2.default.func,
    onRowClick: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onUnselect: _propTypes2.default.func,
    onSelectionChange: _propTypes2.default.func,
    onContextMenuSelectionChange: _propTypes2.default.func,
    onContextMenu: _propTypes2.default.func
};