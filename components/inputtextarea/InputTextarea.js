'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputTextarea = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Tooltip = require('../tooltip/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputTextarea = exports.InputTextarea = function (_Component) {
    _inherits(InputTextarea, _Component);

    function InputTextarea(props) {
        _classCallCheck(this, InputTextarea);

        var _this = _possibleConstructorReturn(this, (InputTextarea.__proto__ || Object.getPrototypeOf(InputTextarea)).call(this, props));

        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onKeyUp = _this.onKeyUp.bind(_this);
        _this.onInput = _this.onInput.bind(_this);
        _this.state = { filled: false };

        _this.textareaProps = Object.assign({}, _this.props);
        delete _this.textareaProps.autoResize;
        delete _this.textareaProps.onInput;
        delete _this.textareaProps.onBlur;
        delete _this.textareaProps.onKeyUp;
        delete _this.textareaProps.onInput;
        delete _this.textareaProps.tooltip;
        delete _this.textareaProps.tooltipOptions;
        return _this;
    }

    _createClass(InputTextarea, [{
        key: 'onFocus',
        value: function onFocus(e) {
            if (this.props.autoResize) {
                this.resize();
            }

            if (this.props.onFocus) {
                this.props.onFocus(e);
            }
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            if (this.props.autoResize) {
                this.resize();
            }

            if (this.props.onBlur) {
                this.props.onBlur(e);
            }
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(e) {
            if (this.props.autoResize) {
                this.resize();
            }

            if (this.props.onKeyUp) {
                this.props.onKeyUp(e);
            }
        }
    }, {
        key: 'onInput',
        value: function onInput(e) {
            if (this.props.autoResize) {
                this.resize();
            }

            if (this.props.onInput) {
                this.props.onInput(e);
            }

            this.updateFilledState(e);
        }
    }, {
        key: 'resize',
        value: function resize() {
            if (!this.cachedScrollHeight) {
                this.cachedScrollHeight = this.element.scrollHeight;
                this.element.style.overflow = "hidden";
            }

            if (this.cachedScrollHeight !== this.element.scrollHeight) {
                this.element.style.height = '';
                this.element.style.height = this.element.scrollHeight + 'px';

                if (parseFloat(this.element.style.height) >= parseFloat(this.element.style.maxHeight)) {
                    this.element.style.overflowY = "scroll";
                    this.element.style.height = this.element.style.maxHeight;
                } else {
                    this.element.style.overflow = "hidden";
                }

                this.cachedScrollHeight = this.element.scrollHeight;
            }
        }
    }, {
        key: 'updateFilledState',
        value: function updateFilledState(e) {
            var _filled = e.target.value && e.target.value.length ? true : false;
            this.setState({ filled: _filled });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _value = this.textareaProps.value || this.textareaProps.defaultValue,
                _filled = _value && _value.length ? true : false;

            this.setState({ filled: _filled });

            if (this.props.tooltip) {
                this.renderTooltip();
            }

            if (this.props.autoResize) {
                this.resize();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.tooltip && prevProps.tooltip !== this.props.tooltip) {
                if (this.tooltip) this.tooltip.updateContent(this.props.tooltip);else this.renderTooltip();
            }

            if (this.props.autoResize) {
                this.resize();
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
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.props.hasOwnProperty('value')) {
                this.textareaProps.value = this.props.value;
            }

            var className = (0, _classnames2.default)('p-inputtext p-inputtextarea p-component', this.props.className, {
                'p-disabled': this.props.disabled,
                'p-state-filled': this.state.filled,
                'p-inputtextarea-resizable': this.props.autoResize
            });

            return _react2.default.createElement('textarea', _extends({}, this.textareaProps, { className: className, ref: function ref(input) {
                    return _this2.element = input;
                },
                onFocus: this.onFocus, onBlur: this.onBlur, onKeyUp: this.onKeyUp, onInput: this.onInput }));
        }
    }]);

    return InputTextarea;
}(_react.Component);

InputTextarea.defaultProps = {
    autoResize: false,
    onInput: null,
    cols: 20,
    rows: 2,
    tooltip: null,
    tooltipOptions: null
};
InputTextarea.propTypes = {
    autoResize: _propTypes2.default.bool,
    onInput: _propTypes2.default.func,
    cols: _propTypes2.default.number,
    rows: _propTypes2.default.number,
    tooltip: _propTypes2.default.string,
    tooltipOptions: _propTypes2.default.object
};