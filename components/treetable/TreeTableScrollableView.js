'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTableScrollableView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTableScrollableView = exports.TreeTableScrollableView = function (_Component) {
    _inherits(TreeTableScrollableView, _Component);

    function TreeTableScrollableView(props) {
        _classCallCheck(this, TreeTableScrollableView);

        var _this = _possibleConstructorReturn(this, (TreeTableScrollableView.__proto__ || Object.getPrototypeOf(TreeTableScrollableView)).call(this, props));

        _this.onHeaderScroll = _this.onHeaderScroll.bind(_this);
        _this.onBodyScroll = _this.onBodyScroll.bind(_this);
        return _this;
    }

    _createClass(TreeTableScrollableView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setScrollHeight();

            if (!this.props.frozen) {
                this.alignScrollBar();
            } else {
                this.scrollBody.style.paddingBottom = _DomHandler2.default.calculateScrollbarWidth() + 'px';
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!this.props.frozen) {
                this.alignScrollBar();
            }
        }
    }, {
        key: 'setScrollHeight',
        value: function setScrollHeight() {
            if (this.props.scrollHeight) {
                if (this.props.scrollHeight.indexOf('%') !== -1) {
                    var datatableContainer = this.findDataTableContainer(this.container);
                    this.scrollBody.style.visibility = 'hidden';
                    this.scrollBody.style.height = '100px'; //temporary height to calculate static height
                    var containerHeight = _DomHandler2.default.getOuterHeight(datatableContainer);
                    var relativeHeight = _DomHandler2.default.getOuterHeight(datatableContainer.parentElement) * parseInt(this.props.scrollHeight, 10) / 100;
                    var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
                    var scrollBodyHeight = relativeHeight - staticHeight;

                    this.scrollBody.style.height = 'auto';
                    this.scrollBody.style.maxHeight = scrollBodyHeight + 'px';
                    this.scrollBody.style.visibility = 'visible';
                } else {
                    this.scrollBody.style.maxHeight = this.props.scrollHeight;
                }
            }
        }
    }, {
        key: 'findDataTableContainer',
        value: function findDataTableContainer(element) {
            if (element) {
                var el = element;
                while (el && !_DomHandler2.default.hasClass(el, 'p-treetable')) {
                    el = el.parentElement;
                }

                return el;
            } else {
                return null;
            }
        }
    }, {
        key: 'onHeaderScroll',
        value: function onHeaderScroll() {
            this.scrollHeader.scrollLeft = 0;
        }
    }, {
        key: 'onBodyScroll',
        value: function onBodyScroll() {
            var frozenView = this.container.previousElementSibling;
            var frozenScrollBody = void 0;
            if (frozenView) {
                frozenScrollBody = _DomHandler2.default.findSingle(frozenView, '.p-treetable-scrollable-body');
            }

            this.scrollHeaderBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
            if (this.scrollFooterBox) {
                this.scrollFooterBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
            }

            if (frozenScrollBody) {
                frozenScrollBody.scrollTop = this.scrollBody.scrollTop;
            }
        }
    }, {
        key: 'hasVerticalOverflow',
        value: function hasVerticalOverflow() {
            return _DomHandler2.default.getOuterHeight(this.scrollTable) > _DomHandler2.default.getOuterHeight(this.scrollBody);
        }
    }, {
        key: 'alignScrollBar',
        value: function alignScrollBar() {
            var scrollBarWidth = this.hasVerticalOverflow() ? _DomHandler2.default.calculateScrollbarWidth() : 0;

            this.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';
            if (this.scrollFooterBox) {
                this.scrollFooterBox.style.marginRight = scrollBarWidth + 'px';
            }
        }
    }, {
        key: 'calculateRowHeight',
        value: function calculateRowHeight() {
            var row = _DomHandler2.default.findSingle(this.scrollTable, 'tr:not(.p-treetable-emptymessage-row)');
            if (row) {
                this.rowHeight = _DomHandler2.default.getOuterHeight(row);
            }
        }
    }, {
        key: 'renderColGroup',
        value: function renderColGroup() {
            if (this.props.columns && this.props.columns.length) {
                return _react2.default.createElement(
                    'colgroup',
                    { className: 'p-treetable-scrollable-colgroup' },
                    this.props.columns.map(function (col, i) {
                        return _react2.default.createElement('col', { key: col.field + '_' + i });
                    })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('p-treetable-scrollable-view', { 'p-treetable-frozen-view': this.props.frozen, 'p-treetable-unfrozen-view': !this.props.frozen && this.props.frozenWidth });
            var width = this.props.frozen ? this.props.frozenWidth : 'calc(100% - ' + this.props.frozenWidth + ')';
            var left = this.props.frozen ? null : this.props.frozenWidth;
            var colGroup = this.renderColGroup();

            return _react2.default.createElement(
                'div',
                { className: className, style: { width: width, left: left }, ref: function ref(el) {
                        _this2.container = el;
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'p-treetable-scrollable-header', ref: function ref(el) {
                            _this2.scrollHeader = el;
                        }, onScroll: this.onHeaderScroll },
                    _react2.default.createElement(
                        'div',
                        { className: 'p-treetable-scrollable-header-box', ref: function ref(el) {
                                _this2.scrollHeaderBox = el;
                            } },
                        _react2.default.createElement(
                            'table',
                            { className: 'p-treetable-scrollable-header-table' },
                            colGroup,
                            this.props.header
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'p-treetable-scrollable-body', ref: function ref(el) {
                            _this2.scrollBody = el;
                        }, onScroll: this.onBodyScroll },
                    _react2.default.createElement(
                        'table',
                        { ref: function ref(el) {
                                _this2.scrollTable = el;
                            }, style: { top: '0' }, className: 'p-treetable-scrollable-body-table' },
                        colGroup,
                        this.props.body
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'p-treetable-scrollable-footer', ref: function ref(el) {
                            _this2.scrollFooter = el;
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'p-treetable-scrollable-footer-box', ref: function ref(el) {
                                _this2.scrollFooterBox = el;
                            } },
                        _react2.default.createElement(
                            'table',
                            { className: 'p-treetable-scrollable-footer-table' },
                            colGroup,
                            this.props.footer
                        )
                    )
                )
            );
        }
    }]);

    return TreeTableScrollableView;
}(_react.Component);

TreeTableScrollableView.defaultProps = {
    header: null,
    body: null,
    footer: null,
    columns: null,
    frozen: null,
    frozenWidth: null,
    frozenBody: null
};
TreeTableScrollableView.propTypes = {
    header: _propTypes2.default.any,
    body: _propTypes2.default.any,
    footer: _propTypes2.default.any,
    columns: _propTypes2.default.array,
    frozen: _propTypes2.default.bool,
    frozenWidth: _propTypes2.default.string,
    frozenBody: _propTypes2.default.any
};