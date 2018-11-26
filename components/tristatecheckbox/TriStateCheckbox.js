'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TriStateCheckbox = undefined;

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

var TriStateCheckbox = exports.TriStateCheckbox = function (_Component) {
    _inherits(TriStateCheckbox, _Component);

    function TriStateCheckbox(props) {
        _classCallCheck(this, TriStateCheckbox);

        var _this = _possibleConstructorReturn(this, (TriStateCheckbox.__proto__ || Object.getPrototypeOf(TriStateCheckbox)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(TriStateCheckbox, [{
        key: 'onClick',
        value: function onClick(event) {
            this.toggle(event);
            this.inputEL.focus();
        }
    }, {
        key: 'toggle',
        value: function toggle(event) {
            var newValue;
            if (this.props.value === null || this.props.value === undefined) newValue = true;else if (this.props.value === true) newValue = false;else if (this.props.value === false) newValue = null;

            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: newValue,
                    stopPropagation: function stopPropagation() {},
                    preventDefault: function preventDefault() {},
                    target: {
                        name: this.props.name,
                        id: this.props.id,
                        value: newValue
                    }
                });
            }
        }
    }, {
        key: 'onFocus',
        value: function onFocus(e) {
            _DomHandler2.default.addClass(this.box, 'p-focus');
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            _DomHandler2.default.removeClass(this.box, 'p-focus');
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

            var containerClass = (0, _classnames2.default)('p-checkbox p-tristatecheckbox p-component', this.props.className);
            var boxClass = (0, _classnames2.default)('p-checkbox-box p-component', { 'p-highlight': (this.props.value || !this.props.value) && this.props.value !== null });
            var iconClass = (0, _classnames2.default)('p-checkbox-icon p-c', { 'pi pi-check': this.props.value === true, 'pi pi-times': this.props.value === false });

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this2.element = el;
                    }, id: this.props.id, className: containerClass, style: this.props.style, onClick: this.onClick },
                _react2.default.createElement(
                    'div',
                    { className: 'p-hidden-accessible' },
                    _react2.default.createElement('input', { ref: function ref(el) {
                            return _this2.inputEL = el;
                        }, type: 'checkbox', id: this.props.inputId, name: this.props.name, onFocus: this.onFocus, onBlur: this.onBlur })
                ),
                _react2.default.createElement(
                    'div',
                    { className: boxClass, ref: function ref(el) {
                            _this2.box = el;
                        } },
                    _react2.default.createElement('span', { className: iconClass })
                )
            );
        }
    }]);

    return TriStateCheckbox;
}(_react.Component);

TriStateCheckbox.defaultProps = {
    id: null,
    inputId: null,
    value: null,
    name: null,
    style: null,
    className: null,
    tooltip: null,
    tooltipOptions: null,
    onChange: null
};
TriStateCheckbox.propTypes = {
    id: _propTypes2.default.string,
    inputId: _propTypes2.default.string,
    value: _propTypes2.default.bool,
    name: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    tooltip: _propTypes2.default.string,
    tooltipOptions: _propTypes2.default.object,
    onChange: _propTypes2.default.func
};