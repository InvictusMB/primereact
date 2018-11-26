'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FullCalendar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _fullcalendar = require('fullcalendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FullCalendar = exports.FullCalendar = function (_Component) {
    _inherits(FullCalendar, _Component);

    function FullCalendar() {
        _classCallCheck(this, FullCalendar);

        return _possibleConstructorReturn(this, (FullCalendar.__proto__ || Object.getPrototypeOf(FullCalendar)).apply(this, arguments));
    }

    _createClass(FullCalendar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.config = {
                theme: true
            };

            if (this.props.options) {
                for (var prop in this.props.options) {
                    this.config[prop] = this.props.options[prop];
                }
            }

            this.initialize();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (!this.calendar) {
                this.initialize();
            } else {
                if (!_ObjectUtils2.default.equals(prevProps.events, this.props.events)) {
                    this.calendar.removeAllEventSources();
                    this.calendar.addEventSource(this.props.events);
                }

                if (!_ObjectUtils2.default.equals(prevProps.options, this.props.options)) {
                    for (var prop in this.props.options) {
                        var optionValue = this.props.options[prop];
                        this.config[prop] = optionValue;
                        this.calendar.setOption(prop, optionValue);
                    }
                }
            }
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            this.calendar = new _fullcalendar.Calendar(this.element, this.config);
            this.calendar.render();

            if (this.props.events) {
                this.calendar.removeAllEventSources();
                this.calendar.addEventSource(this.props.events);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.calendar) {
                this.calendar.destroy();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('div', { id: this.props.id, ref: function ref(el) {
                    return _this2.element = el;
                }, style: this.props.style, className: this.props.className });
        }
    }]);

    return FullCalendar;
}(_react.Component);

FullCalendar.defaultProps = {
    id: null,
    events: [],
    style: null,
    className: null,
    options: null
};
FullCalendar.propsTypes = {
    id: _propTypes2.default.string,
    events: _propTypes2.default.array,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    options: _propTypes2.default.object
};