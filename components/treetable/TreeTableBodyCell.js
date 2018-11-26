'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTableBodyCell = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTableBodyCell = exports.TreeTableBodyCell = function (_Component) {
    _inherits(TreeTableBodyCell, _Component);

    function TreeTableBodyCell(props) {
        _classCallCheck(this, TreeTableBodyCell);

        var _this = _possibleConstructorReturn(this, (TreeTableBodyCell.__proto__ || Object.getPrototypeOf(TreeTableBodyCell)).call(this, props));

        if (_this.props.editor) {
            _this.state = {};
        }

        _this.onClick = _this.onClick.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.onEditorFocus = _this.onEditorFocus.bind(_this);
        return _this;
    }

    _createClass(TreeTableBodyCell, [{
        key: 'onClick',
        value: function onClick() {
            if (this.props.editor) {
                this.setState({
                    editing: true
                });

                if (this.documentEditListener) this.cellClick = true;else this.bindDocumentEditListener();
            }
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(event) {
            if (event.which === 13 || event.which === 9) {
                this.switchCellToViewMode();
            }
        }
    }, {
        key: 'bindDocumentEditListener',
        value: function bindDocumentEditListener() {
            var _this2 = this;

            if (!this.documentEditListener) {
                this.documentEditListener = function (event) {
                    if (!_this2.cellClick) {
                        _this2.switchCellToViewMode();
                    }

                    _this2.cellClick = false;
                };

                document.addEventListener('click', this.documentEditListener);
            }
        }
    }, {
        key: 'unbindDocumentEditListener',
        value: function unbindDocumentEditListener() {
            if (this.documentEditListener) {
                document.removeEventListener('click', this.documentEditListener);
                this.documentEditListener = null;
            }
        }
    }, {
        key: 'closeCell',
        value: function closeCell() {
            this.setState({
                editing: false
            });
            this.unbindDocumentEditListener();
        }
    }, {
        key: 'onEditorFocus',
        value: function onEditorFocus(event) {
            this.onClick(event);
        }
    }, {
        key: 'switchCellToViewMode',
        value: function switchCellToViewMode() {
            if (this.props.editorValidator) {
                var valid = this.props.editorValidator(this.props);
                if (valid) {
                    this.closeCell();
                }
            } else {
                this.closeCell();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this3 = this;

            if (this.container && this.props.editor) {
                if (this.state && this.state.editing) {
                    var focusable = _DomHandler2.default.findSingle(this.container, 'input');
                    if (focusable) {
                        focusable.setAttribute('data-isCellEditing', true);
                        focusable.focus();
                    }

                    this.keyHelper.tabIndex = -1;
                } else {
                    setTimeout(function () {
                        _this3.keyHelper.removeAttribute('tabindex');
                    }, 50);
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var className = (0, _classnames2.default)(this.props.bodyClassName || this.props.className, {
                'p-editable-column': this.props.editor,
                'p-cell-editing': this.props.editor ? this.state.editing : false
            });
            var style = this.props.bodyStyle || this.props.style;
            var content = void 0;

            if (this.state && this.state.editing) {
                if (this.props.editor) content = this.props.editor(this.props);else throw new Error("Editor is not found on column.");
            } else {
                if (this.props.body) content = this.props.body(this.props.node, this.props.column);else content = _ObjectUtils2.default.resolveFieldData(this.props.node.data, this.props.field);
            }

            /* eslint-disable */
            var editorKeyHelper = this.props.editor && _react2.default.createElement(
                'a',
                { tabIndex: '0', ref: function ref(el) {
                        _this4.keyHelper = el;
                    }, className: 'p-cell-editor-key-helper p-hidden-accessible', onFocus: this.onEditorFocus },
                _react2.default.createElement('span', null)
            );
            /* eslint-enable */

            return _react2.default.createElement(
                'td',
                { ref: function ref(el) {
                        return _this4.container = el;
                    }, className: className, style: style, onClick: this.onClick, onKeyDown: this.onKeyDown },
                this.props.children,
                editorKeyHelper,
                content
            );
        }
    }]);

    return TreeTableBodyCell;
}(_react.Component);