'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Slider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = exports.Slider = function (_Component) {
    _inherits(Slider, _Component);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

        _this.onBarClick = _this.onBarClick.bind(_this);
        return _this;
    }

    _createClass(Slider, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDragListeners();
            this.unbindTouchListeners();
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(event, index) {
            if (this.disabled) {
                return;
            }

            this.dragging = true;
            this.updateDomData();
            this.sliderHandleClick = true;
            this.handleIndex = index;
            event.preventDefault();
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event, index) {
            this.bindDragListeners();
            this.onDragStart(event, index);
        }
    }, {
        key: 'onTouchStart',
        value: function onTouchStart(event, index) {
            this.bindTouchListeners();
            this.onDragStart(event, index);
        }
    }, {
        key: 'onBarClick',
        value: function onBarClick(event) {
            if (this.props.disabled) {
                return;
            }

            if (!this.sliderHandleClick) {
                this.updateDomData();
                this.setValue(event);
            }

            this.sliderHandleClick = false;
        }
    }, {
        key: 'onDrag',
        value: function onDrag(event) {
            if (this.dragging) {
                this.setValue(event);
                event.preventDefault();
            }
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd(event) {
            if (this.dragging) {
                this.dragging = false;

                if (this.props.onSlideEnd) {
                    if (this.props.range) this.props.onSlideEnd({ originalEvent: event, values: this.props.value });else this.props.onSlideEnd({ originalEvent: event, value: this.props.value });
                }

                this.unbindDragListeners();
                this.unbindTouchListeners();
            }
        }
    }, {
        key: 'bindDragListeners',
        value: function bindDragListeners() {
            if (!this.dragListener) {
                this.dragListener = this.onDrag.bind(this);
                document.addEventListener('mousemove', this.dragListener);
            }

            if (!this.dragEndListener) {
                this.dragEndListener = this.onDragEnd.bind(this);
                document.addEventListener('mouseup', this.dragEndListener);
            }
        }
    }, {
        key: 'unbindDragListeners',
        value: function unbindDragListeners() {
            if (this.dragListener) {
                document.removeEventListener('mousemove', this.dragListener);
                this.dragListener = null;
            }

            if (this.dragEndListener) {
                document.removeEventListener('mouseup', this.dragEndListener);
                this.dragEndListener = null;
            }
        }
    }, {
        key: 'bindTouchListeners',
        value: function bindTouchListeners() {
            if (!this.dragListener) {
                this.dragListener = this.onDrag.bind(this);
                document.addEventListener('touchmove', this.dragListener);
            }

            if (!this.dragEndListener) {
                this.dragEndListener = this.onDragEnd.bind(this);
                document.addEventListener('touchend', this.dragEndListener);
            }
        }
    }, {
        key: 'unbindTouchListeners',
        value: function unbindTouchListeners() {
            if (this.dragListener) {
                document.removeEventListener('touchmove', this.dragListener);
                this.dragListener = null;
            }

            if (this.dragEndListener) {
                document.removeEventListener('touchend', this.dragEndListener);
                this.dragEndListener = null;
            }
        }
    }, {
        key: 'updateDomData',
        value: function updateDomData() {
            var rect = this.el.getBoundingClientRect();
            this.initX = rect.left + _DomHandler2.default.getWindowScrollLeft();
            this.initY = rect.top + _DomHandler2.default.getWindowScrollTop();
            this.barWidth = this.el.offsetWidth;
            this.barHeight = this.el.offsetHeight;
        }
    }, {
        key: 'setValue',
        value: function setValue(event) {
            var handleValue = void 0;
            var pageX = event.touches ? event.touches[0].pageX : event.pageX;

            if (this.props.orientation === 'horizontal') handleValue = (pageX - this.initX) * 100 / this.barWidth;else handleValue = (this.initY + this.barHeight - event.pageY) * 100 / this.barHeight;

            var newValue = (this.props.max - this.props.min) * (handleValue / 100) + this.props.min;

            if (this.props.step) {
                var oldValue = this.props.range ? this.props.value[this.handleIndex] : this.props.value;
                var diff = newValue - oldValue;

                if (diff < 0) newValue = oldValue + Math.ceil(newValue / this.props.step - oldValue / this.props.step) * this.props.step;else if (diff > 0) newValue = oldValue + Math.floor(newValue / this.props.step - oldValue / this.props.step) * this.props.step;
            }

            this.updateValue(event, newValue);
        }
    }, {
        key: 'updateValue',
        value: function updateValue(event, value) {
            if (this.props.range) {
                var newValue = value;

                if (this.handleIndex === 0) {
                    if (newValue < this.props.min) newValue = this.props.min;else if (newValue > this.props.value[1]) newValue = this.props.value[1];
                } else {
                    if (newValue > this.props.max) newValue = this.props.max;else if (newValue < this.props.value[0]) newValue = this.props.value[0];
                }

                var newValues = [].concat(_toConsumableArray(this.props.value));
                newValues[this.handleIndex] = Math.floor(newValue);

                if (this.props.onChange) {
                    this.props.onChange({
                        originalEvent: event,
                        value: newValues
                    });
                }
            } else {
                var _newValue = value;

                if (_newValue < this.props.min) _newValue = this.props.min;else if (_newValue > this.props.max) _newValue = this.props.max;

                if (this.props.onChange) {
                    this.props.onChange({
                        originalEvent: event,
                        value: Math.floor(_newValue)
                    });
                }
            }
        }
    }, {
        key: 'renderHandle',
        value: function renderHandle(leftValue, bottomValue, index) {
            var _this2 = this;

            return _react2.default.createElement('span', { onMouseDown: function onMouseDown(event) {
                    return _this2.onMouseDown(event, index);
                }, onTouchStart: function onTouchStart(event) {
                    return _this2.onTouchStart(event, index);
                },
                className: 'p-slider-handle', style: { transition: this.dragging ? 'none' : null, left: leftValue + '%', bottom: bottomValue + '%' } });
        }
    }, {
        key: 'renderRangeSlider',
        value: function renderRangeSlider() {
            var values = this.props.value || [0, 0];
            var horizontal = this.props.orientation === 'horizontal';
            var handleValueStart = (values[0] < this.props.min ? 0 : values[0] - this.props.min) * 100 / (this.props.max - this.props.min);
            var handleValueEnd = (values[1] > this.props.max ? 100 : values[1] - this.props.min) * 100 / (this.props.max - this.props.min);
            var rangeStartHandle = horizontal ? this.renderHandle(handleValueStart, 'auto', 0) : this.renderHandle('auto', handleValueStart, 0);
            var rangeEndHandle = horizontal ? this.renderHandle(handleValueEnd, 'auto', 1) : this.renderHandle('auto', handleValueEnd, 1);
            var rangeStyle = horizontal ? { left: handleValueStart + '%', width: handleValueEnd - handleValueStart + '%' } : { bottom: handleValueStart + '%', height: handleValueEnd - handleValueStart + '%' };

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement('span', { className: 'p-slider-range', style: rangeStyle }),
                rangeStartHandle,
                rangeEndHandle
            );
        }
    }, {
        key: 'renderSingleSlider',
        value: function renderSingleSlider() {
            var value = this.props.value || 0;
            var handleValue = void 0;

            if (value < this.props.min) handleValue = 0;else if (value > this.props.max) handleValue = 100;else handleValue = (value - this.props.min) * 100 / (this.props.max - this.props.min);

            var rangeStyle = this.props.orientation === 'horizontal' ? { width: handleValue + '%' } : { height: handleValue + '%' };
            var handle = this.props.orientation === 'horizontal' ? this.renderHandle(handleValue, 'auto', null) : this.renderHandle('auto', handleValue, null);

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement('span', { className: 'p-slider-range p-slider-range-min ui-widget-header ui-corner-all', style: rangeStyle }),
                handle
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var className = (0, _classnames2.default)('p-slider p-component', this.props.className, {
                'p-disabled': this.props.disabled,
                'p-slider-horizontal': this.props.orientation === 'horizontal',
                'p-slider-vertical': this.props.orientation === 'vertical',
                'p-slider-animate': this.props.animate
            });

            var content = this.props.range ? this.renderRangeSlider() : this.renderSingleSlider();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, ref: function ref(el) {
                        return _this3.el = el;
                    }, style: this.props.style, className: className, onClick: this.onBarClick },
                content
            );
        }
    }]);

    return Slider;
}(_react.Component);

Slider.defaultProps = {
    id: null,
    value: null,
    animate: false,
    min: 0,
    max: 100,
    orientation: "horizontal",
    step: null,
    range: false,
    style: null,
    className: null,
    disabled: false,
    onChange: null,
    onSlideEnd: null
};
Slider.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.number,
    animate: _propTypes2.default.bool,
    min: _propTypes2.default.number,
    max: _propTypes2.default.number,
    orientation: _propTypes2.default.string,
    step: _propTypes2.default.number,
    range: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    onSlideEnd: _propTypes2.default.func
};