"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeferredContent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeferredContent = exports.DeferredContent = function (_Component) {
    _inherits(DeferredContent, _Component);

    function DeferredContent() {
        _classCallCheck(this, DeferredContent);

        var _this = _possibleConstructorReturn(this, (DeferredContent.__proto__ || Object.getPrototypeOf(DeferredContent)).call(this));

        _this.state = {
            loaded: false
        };
        return _this;
    }

    _createClass(DeferredContent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (!this.state.loaded) {
                if (this.shouldLoad()) this.load();else this.bindScrollListener();
            }
        }
    }, {
        key: "bindScrollListener",
        value: function bindScrollListener() {
            var _this2 = this;

            this.documentScrollListener = function () {
                if (_this2.shouldLoad()) {
                    _this2.load();
                    _this2.unbindScrollListener();
                }
            };

            window.addEventListener('scroll', this.documentScrollListener);
        }
    }, {
        key: "unbindScrollListener",
        value: function unbindScrollListener() {
            if (this.documentScrollListener) {
                window.removeEventListener('scroll', this.documentScrollListener);
                this.documentScrollListener = null;
            }
        }
    }, {
        key: "shouldLoad",
        value: function shouldLoad() {
            if (this.state.loaded) {
                return false;
            } else {
                var rect = this.container.getBoundingClientRect();
                var docElement = document.documentElement;
                var winHeight = docElement.clientHeight;

                return winHeight >= rect.top;
            }
        }
    }, {
        key: "load",
        value: function load(event) {
            this.setState({ loaded: true });

            if (this.props.onLoad) {
                this.props.onLoad(event);
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.unbindScrollListener();
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                "div",
                { ref: function ref(el) {
                        return _this3.container = el;
                    } },
                this.state.loaded ? this.props.children : null
            );
        }
    }]);

    return DeferredContent;
}(_react.Component);

DeferredContent.defaultProps = {
    onload: null
};
DeferredContent.propsTypes = {
    onLoad: _propTypes2.default.func
};