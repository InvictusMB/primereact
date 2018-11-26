'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ToggleButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _Tooltip = require('../tooltip/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleButton = exports.ToggleButton = function (_Component) {
    _inherits(ToggleButton, _Component);

    function ToggleButton(props) {
        _classCallCheck(this, ToggleButton);

        var _this = _possibleConstructorReturn(this, (ToggleButton.__proto__ || Object.getPrototypeOf(ToggleButton)).call(this, props));

        _this.toggle = _this.toggle.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(ToggleButton, [{
        key: 'toggle',
        value: function toggle(e) {
            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: e,
                    value: !this.props.checked,
                    stopPropagation: function stopPropagation() {},
                    preventDefault: function preventDefault() {},
                    target: {
                        name: this.props.name,
                        id: this.props.id,
                        value: !this.props.checked
                    }
                });
            }
        }
    }, {
        key: 'onFocus',
        value: function onFocus(e) {
            _DomHandler2.default.addClass(this.container, 'p-focus');
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            _DomHandler2.default.removeClass(this.container, 'p-focus');
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
                target: this.container,
                content: this.props.tooltip,
                options: this.props.tooltipOptions
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('p-button p-togglebutton p-component', this.props.className, {
                'p-button-text-icon-left': this.props.onIcon && this.props.offIcon,
                'p-button-text-only': !this.props.onIcon && !this.props.offIcon && (this.props.onLabel || this.props.offLabel),
                'p-highlight': this.props.checked,
                'p-disabled': this.props.disabled
            }),
                iconStyleClass = null;

            if (this.props.onIcon || this.props.offIcon) {
                iconStyleClass = (0, _classnames2.default)('p-c', this.props.checked ? this.props.onIcon : this.props.offIcon, {
                    'p-button-icon-only': this.props.onIcon && this.props.offIcon && (!this.props.onLabel || !this.props.offLabel),
                    'p-button-icon-left': this.props.onIcon && this.props.offIcon
                });
            }

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this2.container = el;
                    }, id: this.props.id, className: className, style: this.props.style, onClick: this.toggle },
                _react2.default.createElement(
                    'div',
                    { className: 'p-hidden-accessible' },
                    _react2.default.createElement('input', { ref: function ref(el) {
                            return _this2.checkbox = el;
                        }, type: 'checkbox', onFocus: this.onFocus, onBlur: this.onBlur })
                ),
                this.props.onIcon && this.props.offIcon && _react2.default.createElement('span', { className: iconStyleClass }),
                _react2.default.createElement(
                    'span',
                    { className: 'p-button-text p-unselectable-text' },
                    this.props.checked ? this.props.onLabel : this.props.offLabel
                )
            );
        }
    }]);

    return ToggleButton;
}(_react.Component);

ToggleButton.defaultProps = {
    id: null,
    onIcon: null,
    offIcon: null,
    onLabel: 'Yes',
    offLabel: 'No',
    style: null,
    className: null,
    checked: false,
    tooltip: null,
    tooltipOptions: null,
    onChange: null
};
ToggleButton.propTypes = {
    id: _propTypes2.default.string,
    onIcon: _propTypes2.default.string,
    offIcon: _propTypes2.default.string,
    onLabel: _propTypes2.default.string,
    offLabel: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    checked: _propTypes2.default.bool,
    tooltip: _propTypes2.default.string,
    tooltipOptions: _propTypes2.default.object,
    onChange: _propTypes2.default.func
};