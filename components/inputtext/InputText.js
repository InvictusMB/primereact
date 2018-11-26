'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputText = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _KeyFilter = require('../keyfilter/KeyFilter');

var _KeyFilter2 = _interopRequireDefault(_KeyFilter);

var _Tooltip = require('../tooltip/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputText = exports.InputText = function (_Component) {
    _inherits(InputText, _Component);

    function InputText(props) {
        _classCallCheck(this, InputText);

        var _this = _possibleConstructorReturn(this, (InputText.__proto__ || Object.getPrototypeOf(InputText)).call(this, props));

        _this.onInput = _this.onInput.bind(_this);
        _this.onKeyPress = _this.onKeyPress.bind(_this);
        return _this;
    }

    _createClass(InputText, [{
        key: 'onKeyPress',
        value: function onKeyPress(event) {
            if (this.props.onKeyPress) {
                this.props.onKeyPress(event);
            }

            if (this.props.keyfilter) {
                _KeyFilter2.default.onKeyPress(event, this.props.keyfilter, this.props.validateOnly);
            }
        }
    }, {
        key: 'onInput',
        value: function onInput(event) {
            var validatePattern = true;
            if (this.props.keyfilter && this.props.validateOnly) {
                validatePattern = _KeyFilter2.default.validate(event, this.props.keyfilter);
            }

            if (this.props.onInput) {
                this.props.onInput(event, validatePattern);
            }

            if (!this.props.onChange) {
                if (event.target.value.length > 0) _DomHandler2.default.addClass(event.target, 'p-filled');else _DomHandler2.default.removeClass(event.target, 'p-filled');
            }
        }
    }, {
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
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('p-inputtext p-component', this.props.className, {
                'p-disabled': this.props.disabled,
                'p-filled': this.props.value != null && this.props.value.toString().length > 0 || this.props.defaultValue != null && this.props.defaultValue.toString().length > 0
            });

            var inputProps = Object.assign({}, this.props);
            delete inputProps.onInput;
            delete inputProps.onKeyPress;
            delete inputProps.keyfilter;
            delete inputProps.validateOnly;
            delete inputProps.tooltip;
            delete inputProps.tooltipOptions;

            return _react2.default.createElement('input', _extends({ ref: function ref(el) {
                    return _this2.element = el;
                } }, inputProps, { className: className, onInput: this.onInput, onKeyPress: this.onKeyPress }));
        }
    }]);

    return InputText;
}(_react.Component);

InputText.defaultProps = {
    onInput: null,
    onKeyPress: null,
    keyfilter: null,
    validateOnly: false,
    tooltip: null,
    tooltipOptions: null
};
InputText.propTypes = {
    onInput: _propTypes2.default.func,
    onKeyPress: _propTypes2.default.func,
    keyfilter: _propTypes2.default.any,
    validateOnly: _propTypes2.default.bool,
    tooltip: _propTypes2.default.string,
    tooltipOptions: _propTypes2.default.object
};