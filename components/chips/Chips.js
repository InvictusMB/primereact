'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chips = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _InputText = require('../inputtext/InputText');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Tooltip = require('../tooltip/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chips = exports.Chips = function (_Component) {
    _inherits(Chips, _Component);

    function Chips(props) {
        _classCallCheck(this, Chips);

        var _this = _possibleConstructorReturn(this, (Chips.__proto__ || Object.getPrototypeOf(Chips)).call(this, props));

        _this.focusInput = _this.focusInput.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(Chips, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.tooltip) {
                this.renderTooltip();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.tooltip && prevProps.tooltip !== this.props.tooltip) {
                if (this.tooltip) this.tooltip.updateContent(this.props.tooltip);else this.renderTooltip();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.tooltip) {
                this.tooltip.destroy();
                this.tooltip = null;
            }
        }
    }, {
        key: 'renderTooltip',
        value: function renderTooltip() {
            this.tooltip = new _Tooltip2.default({
                target: this.element,
                content: this.props.tooltip,
                options: this.props.tooltipOptions
            });
        }
    }, {
        key: 'removeItem',
        value: function removeItem(event, index) {
            if (this.props.disabled) {
                return;
            }

            var values = [].concat(_toConsumableArray(this.props.value));
            var removedItem = values.splice(index, 1);

            if (this.props.onRemove) {
                this.props.onRemove({
                    originalEvent: event,
                    value: removedItem
                });
            }

            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: values,
                    stopPropagation: function stopPropagation() {},
                    preventDefault: function preventDefault() {},
                    target: {
                        name: this.props.name,
                        id: this.props.id,
                        value: values
                    }
                });
            }
        }
    }, {
        key: 'focusInput',
        value: function focusInput() {
            this.inputElement.focus();
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(event) {
            var inputValue = event.target.value;

            switch (event.which) {
                //backspace
                case 8:
                    if (this.inputElement.value.length === 0 && this.props.value && this.props.value.length > 0) {
                        this.removeItem(event, this.props.value.length - 1);
                    }
                    break;

                //enter
                case 13:
                    if (inputValue && inputValue.trim().length && (!this.props.max || this.props.max > this.props.value.length)) {
                        var values = [].concat(_toConsumableArray(this.props.value));
                        values.push(inputValue);
                        this.setState({ values: values });

                        if (this.props.onAdd) {
                            this.props.onAdd({
                                originalEvent: event,
                                value: inputValue
                            });
                        }

                        if (this.props.onChange) {
                            this.props.onChange({
                                originalEvent: event,
                                value: values,
                                stopPropagation: function stopPropagation() {},
                                preventDefault: function preventDefault() {},
                                target: {
                                    name: this.props.name,
                                    id: this.props.id,
                                    value: values
                                }
                            });
                        }
                    }

                    this.inputElement.value = '';
                    event.preventDefault();
                    break;

                default:
                    if (this.isMaxedOut()) {
                        event.preventDefault();
                    }
                    break;
            }
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            _DomHandler2.default.addClass(this.listElement, 'p-focus');
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            _DomHandler2.default.removeClass(this.listElement, 'p-focus');
        }
    }, {
        key: 'isMaxedOut',
        value: function isMaxedOut() {
            return this.props.max && this.props.value && this.props.max === this.props.value.length;
        }
    }, {
        key: 'renderItem',
        value: function renderItem(value, index) {
            var _this2 = this;

            var content = this.props.itemTemplate ? this.props.itemTemplate(value) : value;

            return _react2.default.createElement(
                'li',
                { key: index, className: 'p-chips-token p-highlight' },
                _react2.default.createElement('span', { className: 'p-chips-token-icon pi pi-fw pi-times', onClick: function onClick(event) {
                        return _this2.removeItem(event, index);
                    } }),
                _react2.default.createElement(
                    'span',
                    { className: 'p-chips-token-label' },
                    content
                )
            );
        }
    }, {
        key: 'renderInputElement',
        value: function renderInputElement() {
            var _this3 = this;

            return _react2.default.createElement(
                'li',
                { className: 'p-chips-input-token' },
                _react2.default.createElement(_InputText.InputText, { ref: function ref(el) {
                        return _this3.inputElement = _reactDom2.default.findDOMNode(el);
                    }, placeholder: this.props.placeholder, type: 'text', name: this.props.name, disabled: this.props.disabled || this.isMaxedOut(),
                    onKeyDown: this.onKeyDown, onFocus: this.onFocus, onBlur: this.onBlur })
            );
        }
    }, {
        key: 'renderItems',
        value: function renderItems() {
            var _this4 = this;

            if (this.props.value) {
                return this.props.value.map(function (value, index) {
                    return _this4.renderItem(value, index);
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderList',
        value: function renderList() {
            var _this5 = this;

            var className = (0, _classnames2.default)('p-inputtext', { 'p-disabled': this.props.disabled });
            var items = this.renderItems();
            var inputElement = this.renderInputElement();

            if (this.props.value) {
                return _react2.default.createElement(
                    'ul',
                    { ref: function ref(el) {
                            return _this5.listElement = el;
                        }, className: className, onClick: this.focusInput },
                    items,
                    inputElement
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var className = (0, _classnames2.default)('p-chips p-component', this.props.className);
            var list = this.renderList();

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this6.element = el;
                    }, id: this.props.id, className: className, style: this.props.style },
                list
            );
        }
    }]);

    return Chips;
}(_react.Component);

Chips.defaultProps = {
    id: null,
    name: null,
    placeholder: null,
    value: null,
    max: null,
    disabled: null,
    style: null,
    className: null,
    tooltip: null,
    tooltipOptions: null,
    itemTemplate: null,
    onAdd: null,
    onRemove: null,
    onChange: null
};
Chips.propTypes = {
    id: _propTypes2.default.string,
    name: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    value: _propTypes2.default.array,
    max: _propTypes2.default.number,
    disabled: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    tooltip: _propTypes2.default.string,
    tooltipOptions: _propTypes2.default.object,
    itemTemplate: _propTypes2.default.func,
    onAdd: _propTypes2.default.func,
    onRemove: _propTypes2.default.func,
    onChange: _propTypes2.default.func
};