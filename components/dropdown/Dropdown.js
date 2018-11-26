'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownPanel = require('./DropdownPanel');

var _DropdownItem = require('./DropdownItem');

var _Tooltip = require('../tooltip/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = exports.Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this.state = {
            filter: ''
        };

        _this.onClick = _this.onClick.bind(_this);
        _this.onInputFocus = _this.onInputFocus.bind(_this);
        _this.onInputBlur = _this.onInputBlur.bind(_this);
        _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
        _this.onEditableInputClick = _this.onEditableInputClick.bind(_this);
        _this.onEditableInputChange = _this.onEditableInputChange.bind(_this);
        _this.onEditableInputFocus = _this.onEditableInputFocus.bind(_this);
        _this.onOptionClick = _this.onOptionClick.bind(_this);
        _this.onFilterInputChange = _this.onFilterInputChange.bind(_this);
        _this.onFilterInputKeyDown = _this.onFilterInputKeyDown.bind(_this);
        _this.panelClick = _this.panelClick.bind(_this);
        _this.clear = _this.clear.bind(_this);
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'onClick',
        value: function onClick(event) {
            var _this2 = this;

            if (this.props.disabled) {
                return;
            }

            if (this.documentClickListener) {
                this.selfClick = true;
            }

            var clearClick = _DomHandler2.default.hasClass(event.target, 'p-dropdown-clear-icon');

            if (!this.overlayClick && !this.editableInputClick && !clearClick) {
                this.focusInput.focus();

                if (this.panel.element.offsetParent) {
                    this.hide();
                } else {
                    this.show();

                    if (this.props.filter) {
                        setTimeout(function () {
                            _this2.filterInput.focus();
                        }, 200);
                    }
                }
            }

            if (this.editableInputClick) {
                this.expeditableInputClick = false;
            }
        }
    }, {
        key: 'panelClick',
        value: function panelClick() {
            this.overlayClick = true;
        }
    }, {
        key: 'onInputFocus',
        value: function onInputFocus(event) {
            _DomHandler2.default.addClass(this.container, 'p-focus');
        }
    }, {
        key: 'onInputBlur',
        value: function onInputBlur(event) {
            _DomHandler2.default.removeClass(this.container, 'p-focus');
        }
    }, {
        key: 'onUpKey',
        value: function onUpKey(event) {
            if (this.props.options) {
                var selectedItemIndex = this.findOptionIndex(this.props.value);
                var prevItem = this.findPrevVisibleItem(selectedItemIndex);

                if (prevItem) {
                    this.selectItem({
                        originalEvent: event,
                        option: prevItem
                    });
                }
            }

            event.preventDefault();
        }
    }, {
        key: 'onDownKey',
        value: function onDownKey(event) {
            if (this.props.options) {
                if (!this.panel.element.offsetParent && event.altKey) {
                    this.show();
                } else {
                    var selectedItemIndex = this.findOptionIndex(this.props.value);
                    var nextItem = this.findNextVisibleItem(selectedItemIndex);

                    if (nextItem) {
                        this.selectItem({
                            originalEvent: event,
                            option: nextItem
                        });
                    }
                }
            }

            event.preventDefault();
        }
    }, {
        key: 'onInputKeyDown',
        value: function onInputKeyDown(event) {
            switch (event.which) {
                //down
                case 40:
                    this.onDownKey(event);
                    break;

                //up
                case 38:
                    this.onUpKey(event);
                    break;

                //space
                case 32:
                    if (!this.panel.element.offsetParent) {
                        this.show();
                        event.preventDefault();
                    }
                    break;

                //enter
                case 13:
                    this.hide();
                    this.unbindDocumentClickListener();
                    event.preventDefault();
                    break;

                //escape and tab
                case 27:
                case 9:
                    this.hide();
                    this.unbindDocumentClickListener();
                    break;

                default:
                    this.search(event);
                    break;
            }
        }
    }, {
        key: 'search',
        value: function search(event) {
            var _this3 = this;

            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            var char = String.fromCharCode(event.keyCode);
            this.previousSearchChar = this.currentSearchChar;
            this.currentSearchChar = char;

            if (this.previousSearchChar === this.currentSearchChar) this.searchValue = this.currentSearchChar;else this.searchValue = this.searchValue ? this.searchValue + char : char;

            var searchIndex = this.props.value ? this.findOptionIndex(this.props.value) : -1;
            var newOption = this.searchOption(++searchIndex);

            if (newOption) {
                this.selectItem({
                    originalEvent: event,
                    option: newOption
                });
                this.selectedOptionUpdated = true;
            }

            this.searchTimeout = setTimeout(function () {
                _this3.searchValue = null;
            }, 250);
        }
    }, {
        key: 'searchOption',
        value: function searchOption(index) {
            var option = void 0;

            if (this.searchValue) {
                option = this.searchOptionInRange(index, this.props.options.length);

                if (!option) {
                    option = this.searchOptionInRange(0, index);
                }
            }

            return option;
        }
    }, {
        key: 'searchOptionInRange',
        value: function searchOptionInRange(start, end) {
            for (var i = start; i < end; i++) {
                var opt = this.props.options[i];
                var label = this.getOptionLabel(opt).toLowerCase();
                if (label.startsWith(this.searchValue.toLowerCase())) {
                    return opt;
                }
            }

            return null;
        }
    }, {
        key: 'findNextVisibleItem',
        value: function findNextVisibleItem(index) {
            var i = index + 1;
            if (i === this.props.options.length) {
                return null;
            }

            var option = this.props.options[i];
            if (this.hasFilter()) {
                if (this.filter(option)) return option;else return this.findNextVisibleItem(i);
            } else {
                return option;
            }
        }
    }, {
        key: 'findPrevVisibleItem',
        value: function findPrevVisibleItem(index) {
            var i = index - 1;
            if (i === -1) {
                return null;
            }

            var option = this.props.options[i];
            if (this.hasFilter()) {
                if (this.filter(option)) return option;else return this.findPrevVisibleItem(i);
            } else {
                return option;
            }
        }
    }, {
        key: 'onEditableInputClick',
        value: function onEditableInputClick(event) {
            this.editableInputClick = true;
            this.bindDocumentClickListener();
        }
    }, {
        key: 'onEditableInputChange',
        value: function onEditableInputChange(event) {
            this.props.onChange({
                originalEvent: event.originalEvent,
                value: event.target.value,
                stopPropagation: function stopPropagation() {},
                preventDefault: function preventDefault() {},
                target: {
                    name: this.props.name,
                    id: this.props.id,
                    value: event.target.value
                }
            });
        }
    }, {
        key: 'onEditableInputFocus',
        value: function onEditableInputFocus(event) {
            _DomHandler2.default.addClass(this.container, 'p-focus');
            this.hide();
        }
    }, {
        key: 'onOptionClick',
        value: function onOptionClick(event) {
            var _this4 = this;

            this.selectItem(event);
            this.focusInput.focus();
            setTimeout(function () {
                _this4.hide();
            }, 100);
        }
    }, {
        key: 'onFilterInputChange',
        value: function onFilterInputChange(event) {
            this.setState({ filter: event.target.value });
        }
    }, {
        key: 'onFilterInputKeyDown',
        value: function onFilterInputKeyDown(event) {
            switch (event.which) {
                //down
                case 40:
                    this.onDownKey(event);
                    break;

                //up
                case 38:
                    this.onUpKey(event);
                    break;

                //enter
                case 13:
                    event.preventDefault();
                    break;

                default:
                    break;
            }
        }
    }, {
        key: 'clear',
        value: function clear(event) {
            this.props.onChange({
                originalEvent: event,
                value: null,
                stopPropagation: function stopPropagation() {},
                preventDefault: function preventDefault() {},
                target: {
                    name: this.props.name,
                    id: this.props.id,
                    value: null
                }
            });
            this.updateEditableLabel();
        }
    }, {
        key: 'selectItem',
        value: function selectItem(event) {
            var selectedOption = this.findOption(this.props.value);

            if (selectedOption !== event.option) {
                this.updateEditableLabel(event.option);
                this.props.onChange({
                    originalEvent: event.originalEvent,
                    value: this.props.optionLabel ? event.option : event.option.value,
                    stopPropagation: function stopPropagation() {},
                    preventDefault: function preventDefault() {},
                    target: {
                        name: this.props.name,
                        id: this.props.id,
                        value: this.props.optionLabel ? event.option : event.option.value
                    }
                });
            }
        }
    }, {
        key: 'findOptionIndex',
        value: function findOptionIndex(value) {
            var index = -1;
            if (this.props.options) {
                for (var i = 0; i < this.props.options.length; i++) {
                    var optionValue = this.props.optionLabel ? this.props.options[i] : this.props.options[i].value;
                    if (value === null && optionValue == null || _ObjectUtils2.default.equals(value, optionValue, this.props.dataKey)) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        }
    }, {
        key: 'findOption',
        value: function findOption(value) {
            var index = this.findOptionIndex(value);
            return index !== -1 ? this.props.options[index] : null;
        }
    }, {
        key: 'show',
        value: function show() {
            var _this5 = this;

            this.panel.element.style.zIndex = String(_DomHandler2.default.generateZIndex());
            this.panel.element.style.display = 'block';

            setTimeout(function () {
                _DomHandler2.default.addClass(_this5.panel.element, 'p-input-overlay-visible');
                _DomHandler2.default.removeClass(_this5.panel.element, 'p-input-overlay-hidden');
            }, 1);

            this.alignPanel();
            this.bindDocumentClickListener();
        }
    }, {
        key: 'hide',
        value: function hide() {
            var _this6 = this;

            if (this.panel.element.offsetParent) {
                _DomHandler2.default.addClass(this.panel.element, 'p-input-overlay-hidden');
                _DomHandler2.default.removeClass(this.panel.element, 'p-input-overlay-visible');

                this.unbindDocumentClickListener();
                this.clearClickState();

                this.hideTimeout = setTimeout(function () {
                    _this6.panel.element.style.display = 'none';
                    _DomHandler2.default.removeClass(_this6.panel.element, 'p-input-overlay-hidden');
                }, 150);
            }
        }
    }, {
        key: 'alignPanel',
        value: function alignPanel() {
            if (this.props.appendTo) {
                _DomHandler2.default.absolutePosition(this.panel.element, this.container);
                this.panel.element.style.minWidth = _DomHandler2.default.getWidth(this.container) + 'px';
            } else {
                _DomHandler2.default.relativePosition(this.panel.element, this.container);
            }
        }
    }, {
        key: 'bindDocumentClickListener',
        value: function bindDocumentClickListener() {
            var _this7 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function () {
                    if (!_this7.selfClick && !_this7.overlayClick) {
                        _this7.hide();
                    }

                    _this7.clearClickState();
                };

                document.addEventListener('click', this.documentClickListener);
            }
        }
    }, {
        key: 'unbindDocumentClickListener',
        value: function unbindDocumentClickListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        }
    }, {
        key: 'clearClickState',
        value: function clearClickState() {
            this.selfClick = false;
            this.editableInputClick = false;
            this.overlayClick = false;
        }
    }, {
        key: 'updateEditableLabel',
        value: function updateEditableLabel(option) {
            if (this.editableInput) {
                this.editableInput.value = option ? this.getOptionLabel(option) : this.props.value || '';
            }
        }
    }, {
        key: 'filter',
        value: function filter(option) {
            var filterValue = this.state.filter.trim().toLowerCase();
            var optionLabel = this.getOptionLabel(option);

            return optionLabel.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
        }
    }, {
        key: 'hasFilter',
        value: function hasFilter() {
            return this.state.filter && this.state.filter.trim().length > 0;
        }
    }, {
        key: 'renderHiddenSelect',
        value: function renderHiddenSelect() {
            var _this8 = this;

            if (this.props.autoWidth) {
                var options = this.props.options && this.props.options.map(function (option, i) {
                    return _react2.default.createElement(
                        'option',
                        { key: _this8.getOptionLabel(option), value: option.value },
                        _this8.getOptionLabel(option)
                    );
                });

                return _react2.default.createElement(
                    'div',
                    { className: 'p-hidden-accessible' },
                    _react2.default.createElement(
                        'select',
                        { ref: function ref(el) {
                                return _this8.nativeSelect = el;
                            }, required: this.props.required, tabIndex: '-1', 'aria-hidden': 'true' },
                        options
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderKeyboardHelper',
        value: function renderKeyboardHelper() {
            var _this9 = this;

            return _react2.default.createElement(
                'div',
                { className: 'p-hidden-accessible' },
                _react2.default.createElement('input', { ref: function ref(el) {
                        return _this9.focusInput = el;
                    }, id: this.props.inputId, type: 'text', role: 'listbox',
                    onFocus: this.onInputFocus, onBlur: this.onInputBlur, onKeyDown: this.onInputKeyDown,
                    disabled: this.props.disabled, tabIndex: this.props.tabIndex })
            );
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel(label) {
            var _this10 = this;

            if (this.props.editable) {
                var value = label || this.props.value || '';

                return _react2.default.createElement('input', { ref: function ref(el) {
                        return _this10.editableInput = el;
                    }, type: 'text', defaultValue: value, className: 'p-dropdown-label p-inputtext', disabled: this.props.disabled, placeholder: this.props.placeholder,
                    onClick: this.onEditableInputClick, onInput: this.onEditableInputChange, onFocus: this.onEditableInputFocus, onBlur: this.onInputBlur });
            } else {
                var className = (0, _classnames2.default)('p-dropdown-label p-inputtext', {
                    'p-placeholder': label === null && this.props.placeholder,
                    'p-dropdown-label-empty': label === null && !this.props.placeholder });

                return _react2.default.createElement(
                    'label',
                    { className: className },
                    label || this.props.placeholder || 'empty'
                );
            }
        }
    }, {
        key: 'renderClearIcon',
        value: function renderClearIcon() {
            if (this.props.value && this.props.showClear && !this.props.disabled) {
                return _react2.default.createElement('i', { className: 'p-dropdown-clear-icon pi pi-times', onClick: this.clear });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderDropdownIcon',
        value: function renderDropdownIcon() {
            return _react2.default.createElement(
                'div',
                { className: 'p-dropdown-trigger' },
                _react2.default.createElement('span', { className: 'p-dropdown-trigger-icon pi pi-chevron-down p-clickable' })
            );
        }
    }, {
        key: 'renderItems',
        value: function renderItems(selectedOption) {
            var _this11 = this;

            var items = this.props.options;

            if (items && this.hasFilter()) {
                items = items && items.filter(function (option) {
                    return _this11.filter(option);
                });
            }

            if (items) {
                return items.map(function (option, index) {
                    var optionLabel = _this11.getOptionLabel(option);
                    return _react2.default.createElement(_DropdownItem.DropdownItem, { key: optionLabel, label: optionLabel, option: option, template: _this11.props.itemTemplate, selected: selectedOption === option,
                        onClick: _this11.onOptionClick });
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderFilter',
        value: function renderFilter() {
            var _this12 = this;

            if (this.props.filter) {
                return _react2.default.createElement(
                    'div',
                    { className: 'p-dropdown-filter-container' },
                    _react2.default.createElement('input', { ref: function ref(el) {
                            return _this12.filterInput = el;
                        }, type: 'text', autoComplete: 'off', className: 'p-dropdown-filter p-inputtext p-component', placeholder: this.props.filterPlaceholder,
                        onKeyDown: this.onFilterInputKeyDown, onChange: this.onFilterInputChange }),
                    _react2.default.createElement('span', { className: 'p-dropdown-filter-icon pi pi-search' })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'getOptionLabel',
        value: function getOptionLabel(option) {
            return this.props.optionLabel ? _ObjectUtils2.default.resolveFieldData(option, this.props.optionLabel) : option.label;
        }
    }, {
        key: 'unbindWindowLoadListener',
        value: function unbindWindowLoadListener() {
            if (this.windowLoadListener) {
                window.removeEventListener('load', this.windowLoadListener);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this13 = this;

            if (this.props.autoWidth) {
                // Added setTimeout to render it with the correct width value in hidden container components such as TabView and Accordion.
                setTimeout(function () {
                    if (!_this13.props.style || !_this13.props.style['width'] && !_this13.props.style['min-width']) {
                        _this13.container.style.width = _this13.nativeSelect.offsetWidth + 30 + 'px';
                    }
                }, 0);
            }

            if (this.props.autoFocus && this.focusInput) {
                this.windowLoadListener = function () {
                    _this13.focusInput.focus();
                };

                window.addEventListener('load', this.windowLoadListener);
            }

            if (this.props.tooltip) {
                this.renderTooltip();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentClickListener();
            this.unbindWindowLoadListener();

            if (this.tooltip) {
                this.tooltip.destroy();
                this.tooltip = null;
            }

            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.props.filter) {
                this.alignPanel();
            }

            if (this.panel.element.offsetParent) {
                var highlightItem = _DomHandler2.default.findSingle(this.panel.element, 'li.p-highlight');
                if (highlightItem) {
                    _DomHandler2.default.scrollInView(this.panel.itemsWrapper, highlightItem);
                }
            }

            if (this.props.tooltip && prevProps.tooltip !== this.props.tooltip) {
                if (this.tooltip) this.tooltip.updateContent(this.props.tooltip);else this.renderTooltip();
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
            var _this14 = this;

            var className = (0, _classnames2.default)('p-dropdown p-component', this.props.className, { 'p-disabled': this.props.disabled,
                'p-dropdown-clearable': this.props.showClear && !this.props.disabled });
            var selectedOption = this.findOption(this.props.value);
            var label = selectedOption ? this.getOptionLabel(selectedOption) : null;

            var hiddenSelect = this.renderHiddenSelect();
            var keyboardHelper = this.renderKeyboardHelper();
            var labelElement = this.renderLabel(label);
            var dropdownIcon = this.renderDropdownIcon();
            var items = this.renderItems(selectedOption);
            var filterElement = this.renderFilter();
            var clearIcon = this.renderClearIcon();

            if (this.props.editable && this.editableInput) {
                var value = label || this.props.value || '';
                this.editableInput.value = value;
            }

            return _react2.default.createElement(
                'div',
                { id: this.props.id, ref: function ref(el) {
                        return _this14.container = el;
                    }, className: className, style: this.props.style, onClick: this.onClick,
                    onMouseDown: this.props.onMouseDown, onContextMenu: this.props.onContextMenu },
                hiddenSelect,
                keyboardHelper,
                labelElement,
                clearIcon,
                dropdownIcon,
                _react2.default.createElement(
                    _DropdownPanel.DropdownPanel,
                    { ref: function ref(el) {
                            return _this14.panel = el;
                        }, appendTo: this.props.appendTo,
                        panelStyle: this.props.panelStyle, panelClassName: this.props.panelClassName,
                        scrollHeight: this.props.scrollHeight, onClick: this.panelClick, filter: filterElement },
                    items
                )
            );
        }
    }]);

    return Dropdown;
}(_react.Component);

Dropdown.defaultProps = {
    id: null,
    value: null,
    options: null,
    optionLabel: null,
    itemTemplate: null,
    style: null,
    className: null,
    autoWidth: true,
    scrollHeight: '200px',
    filter: false,
    filterPlaceholder: null,
    editable: false,
    placeholder: null,
    required: false,
    disabled: false,
    appendTo: null,
    tabIndex: null,
    autoFocus: false,
    panelClassName: null,
    panelStyle: null,
    dataKey: null,
    inputId: null,
    showClear: false,
    tooltip: null,
    tooltipOptions: null,
    onChange: null,
    onMouseDown: null,
    onContextMenu: null
};
Dropdown.propTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    options: _propTypes2.default.array,
    optionLabel: _propTypes2.default.string,
    itemTemplate: _propTypes2.default.func,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    autoWidth: _propTypes2.default.bool,
    scrollHeight: _propTypes2.default.string,
    filter: _propTypes2.default.bool,
    filterPlaceholder: _propTypes2.default.string,
    editable: _propTypes2.default.bool,
    placeholder: _propTypes2.default.string,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    appendTo: _propTypes2.default.any,
    tabIndex: _propTypes2.default.number,
    autoFocus: _propTypes2.default.bool,
    lazy: _propTypes2.default.bool,
    panelClassName: _propTypes2.default.string,
    panelstyle: _propTypes2.default.object,
    dataKey: _propTypes2.default.string,
    inputId: _propTypes2.default.string,
    showClear: _propTypes2.default.bool,
    tooltip: _propTypes2.default.string,
    tooltipOptions: _propTypes2.default.object,
    onChange: _propTypes2.default.func,
    onMouseDown: _propTypes2.default.func,
    onContextMenu: _propTypes2.default.func
};