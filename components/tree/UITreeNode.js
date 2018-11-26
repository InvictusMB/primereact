'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UITreeNode = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var UITreeNode = exports.UITreeNode = function (_Component) {
    _inherits(UITreeNode, _Component);

    function UITreeNode(props) {
        _classCallCheck(this, UITreeNode);

        var _this = _possibleConstructorReturn(this, (UITreeNode.__proto__ || Object.getPrototypeOf(UITreeNode)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.onRightClick = _this.onRightClick.bind(_this);
        _this.onTouchEnd = _this.onTouchEnd.bind(_this);
        _this.onTogglerClick = _this.onTogglerClick.bind(_this);
        _this.onNodeKeyDown = _this.onNodeKeyDown.bind(_this);
        _this.propagateUp = _this.propagateUp.bind(_this);

        _this.onDrop = _this.onDrop.bind(_this);
        _this.onDragOver = _this.onDragOver.bind(_this);
        _this.onDragEnter = _this.onDragEnter.bind(_this);
        _this.onDragLeave = _this.onDragLeave.bind(_this);
        _this.onDragStart = _this.onDragStart.bind(_this);
        _this.onDragEnd = _this.onDragEnd.bind(_this);
        _this.onDropPointDragOver = _this.onDropPointDragOver.bind(_this);
        _this.onDropPointDragEnter = _this.onDropPointDragEnter.bind(_this);
        _this.onDropPointDragLeave = _this.onDropPointDragLeave.bind(_this);
        return _this;
    }

    _createClass(UITreeNode, [{
        key: 'isLeaf',
        value: function isLeaf() {
            return this.props.node.leaf === false ? false : !(this.props.node.children && this.props.node.children.length);
        }
    }, {
        key: 'expand',
        value: function expand(event) {
            var expandedKeys = this.props.expandedKeys ? _extends({}, this.props.expandedKeys) : {};
            expandedKeys[this.props.node.key] = true;

            this.props.onToggle({
                originalEvent: event,
                value: expandedKeys
            });

            this.invokeToggleEvents(event, true);
        }
    }, {
        key: 'collapse',
        value: function collapse(event) {
            var expandedKeys = _extends({}, this.props.expandedKeys);
            delete expandedKeys[this.props.node.key];

            this.props.onToggle({
                originalEvent: event,
                value: expandedKeys
            });

            this.invokeToggleEvents(event, false);
        }
    }, {
        key: 'onTogglerClick',
        value: function onTogglerClick(event) {
            if (this.isExpanded()) this.collapse(event);else this.expand(event);
        }
    }, {
        key: 'invokeToggleEvents',
        value: function invokeToggleEvents(event, expanded) {
            if (expanded) {
                if (this.props.onExpand) {
                    this.props.onExpand({
                        originalEvent: event,
                        node: this.props.node
                    });
                }
            } else {
                if (this.props.onCollapse) {
                    this.props.onCollapse({
                        originalEvent: event,
                        node: this.props.node
                    });
                }
            }
        }
    }, {
        key: 'isExpanded',
        value: function isExpanded() {
            return this.props.expandedKeys ? this.props.expandedKeys[this.props.node.key] !== undefined : false;
        }
    }, {
        key: 'onNodeKeyDown',
        value: function onNodeKeyDown(event) {
            var nodeElement = event.target.parentElement;

            switch (event.which) {
                //down arrow
                case 40:
                    var listElement = nodeElement.children[1];
                    if (listElement) {
                        this.focusNode(listElement.children[0]);
                    } else {
                        var nextNodeElement = nodeElement.nextElementSibling;
                        if (nextNodeElement) {
                            this.focusNode(nextNodeElement);
                        } else {
                            var nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);
                            if (nextSiblingAncestor) {
                                this.focusNode(nextSiblingAncestor);
                            }
                        }
                    }

                    event.preventDefault();
                    break;

                //up arrow
                case 38:
                    if (nodeElement.previousElementSibling) {
                        this.focusNode(this.findLastVisibleDescendant(nodeElement.previousElementSibling));
                    } else {
                        var parentNodeElement = this.getParentNodeElement(nodeElement);
                        if (parentNodeElement) {
                            this.focusNode(parentNodeElement);
                        }
                    }

                    event.preventDefault();
                    break;

                //right arrow
                case 39:
                    if (!this.isExpanded()) {
                        this.expand(event);
                    }

                    event.preventDefault();
                    break;

                //left arrow
                case 37:
                    if (this.isExpanded()) {
                        this.collapse(event);
                    }

                    event.preventDefault();
                    break;

                //enter
                case 13:
                    this.onClick(event);
                    event.preventDefault();
                    break;

                default:
                    //no op
                    break;
            }
        }
    }, {
        key: 'findNextSiblingOfAncestor',
        value: function findNextSiblingOfAncestor(nodeElement) {
            var parentNodeElement = this.getParentNodeElement(nodeElement);
            if (parentNodeElement) {
                if (parentNodeElement.nextElementSibling) return parentNodeElement.nextElementSibling;else return this.findNextSiblingOfAncestor(parentNodeElement);
            } else {
                return null;
            }
        }
    }, {
        key: 'findLastVisibleDescendant',
        value: function findLastVisibleDescendant(nodeElement) {
            var childrenListElement = nodeElement.children[1];
            if (childrenListElement) {
                var lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];

                return this.findLastVisibleDescendant(lastChildElement);
            } else {
                return nodeElement;
            }
        }
    }, {
        key: 'getParentNodeElement',
        value: function getParentNodeElement(nodeElement) {
            var parentNodeElement = nodeElement.parentElement.parentElement;

            return _DomHandler2.default.hasClass(parentNodeElement, 'p-treenode') ? parentNodeElement : null;
        }
    }, {
        key: 'focusNode',
        value: function focusNode(element) {
            element.children[0].focus();
        }
    }, {
        key: 'onClick',
        value: function onClick(event) {
            if (event.target.className && event.target.className.indexOf('p-tree-toggler') === 0) {
                return;
            }

            if (this.props.selectionMode && this.props.node.selectable !== false) {
                var selectionKeys = void 0;

                if (this.isCheckboxSelectionMode()) {
                    var checked = this.isChecked();
                    selectionKeys = this.props.selectionKeys ? _extends({}, this.props.selectionKeys) : {};

                    if (checked) {
                        if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, false, selectionKeys);else delete selectionKeys[this.props.node.key];

                        if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
                            this.props.onPropagateUp({
                                originalEvent: event,
                                check: false,
                                selectionKeys: selectionKeys
                            });
                        }

                        if (this.props.onUnselect) {
                            this.props.onUnselect({
                                originalEvent: event,
                                node: this.props.node
                            });
                        }
                    } else {
                        if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, true, selectionKeys);else selectionKeys[this.props.node.key] = { checked: true };

                        if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
                            this.props.onPropagateUp({
                                originalEvent: event,
                                check: true,
                                selectionKeys: selectionKeys
                            });
                        }

                        if (this.props.onSelect) {
                            this.props.onSelect({
                                originalEvent: event,
                                node: this.props.node
                            });
                        }
                    }
                } else {
                    var selected = this.isSelected();
                    var metaSelection = this.nodeTouched ? false : this.props.metaKeySelection;

                    if (metaSelection) {
                        var metaKey = event.metaKey || event.ctrlKey;

                        if (selected && metaKey) {
                            if (this.isSingleSelectionMode()) {
                                selectionKeys = null;
                            } else {
                                selectionKeys = _extends({}, this.props.selectionKeys);
                                delete selectionKeys[this.props.node.key];
                            }

                            if (this.props.onUnselect) {
                                this.props.onUnselect({
                                    originalEvent: event,
                                    node: this.props.node
                                });
                            }
                        } else {
                            if (this.isSingleSelectionMode()) {
                                selectionKeys = this.props.node.key;
                            } else if (this.isMultipleSelectionMode()) {
                                selectionKeys = !metaKey ? {} : this.props.selectionKeys ? _extends({}, this.props.selectionKeys) : {};
                                selectionKeys[this.props.node.key] = true;
                            }

                            if (this.props.onSelect) {
                                this.props.onSelect({
                                    originalEvent: event,
                                    node: this.props.node
                                });
                            }
                        }
                    } else {
                        if (this.isSingleSelectionMode()) {
                            if (selected) {
                                selectionKeys = null;

                                if (this.props.onUnselect) {
                                    this.props.onUnselect({
                                        originalEvent: event,
                                        node: this.props.node
                                    });
                                }
                            } else {
                                selectionKeys = this.props.node.key;

                                if (this.props.onSelect) {
                                    this.props.onSelect({
                                        originalEvent: event,
                                        node: this.props.node
                                    });
                                }
                            }
                        } else {
                            if (selected) {
                                selectionKeys = _extends({}, this.props.selectionKeys);
                                delete selectionKeys[this.props.node.key];

                                if (this.props.onUnselect) {
                                    this.props.onUnselect({
                                        originalEvent: event,
                                        node: this.props.node
                                    });
                                }
                            } else {
                                selectionKeys = this.props.selectionKeys ? _extends({}, this.props.selectionKeys) : {};
                                selectionKeys[this.props.node.key] = true;

                                if (this.props.onSelect) {
                                    this.props.onSelect({
                                        originalEvent: event,
                                        node: this.props.node
                                    });
                                }
                            }
                        }
                    }
                }

                if (this.props.onSelectionChange) {
                    this.props.onSelectionChange({
                        originalEvent: event,
                        value: selectionKeys
                    });
                }
            }

            this.nodeTouched = false;
        }
    }, {
        key: 'onRightClick',
        value: function onRightClick(event) {
            _DomHandler2.default.clearSelection();

            if (this.props.onContextMenuSelectionChange) {
                this.props.onContextMenuSelectionChange({
                    originalEvent: event,
                    value: this.props.node.key
                });
            }

            if (this.props.onContextMenu) {
                this.props.onContextMenu({
                    originalEvent: event,
                    node: this.props.node
                });
            }
        }
    }, {
        key: 'propagateUp',
        value: function propagateUp(event) {
            var check = event.check;
            var selectionKeys = event.selectionKeys;
            var checkedChildCount = 0;
            var childPartialSelected = false;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;

                    if (selectionKeys[child.key] && selectionKeys[child.key].checked) checkedChildCount++;else if (selectionKeys[child.key] && selectionKeys[child.key].partialChecked) childPartialSelected = true;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (check && checkedChildCount === this.props.node.children.length) {
                selectionKeys[this.props.node.key] = { checked: true, partialChecked: false };
            } else {
                if (!check) {
                    delete selectionKeys[this.props.node.key];
                }

                if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.props.node.children.length) selectionKeys[this.props.node.key] = { checked: false, partialChecked: true };else selectionKeys[this.props.node.key] = { checked: false, partialChecked: false };
            }

            if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
                this.props.onPropagateUp(event);
            }
        }
    }, {
        key: 'propagateDown',
        value: function propagateDown(node, check, selectionKeys) {
            if (check) selectionKeys[node.key] = { checked: true, partialChecked: false };else delete selectionKeys[node.key];

            if (node.children && node.children.length) {
                for (var i = 0; i < node.children.length; i++) {
                    this.propagateDown(node.children[i], check, selectionKeys);
                }
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected() {
            if (this.props.selectionMode && this.props.selectionKeys) return this.isSingleSelectionMode() ? this.props.selectionKeys === this.props.node.key : this.props.selectionKeys[this.props.node.key] !== undefined;else return false;
        }
    }, {
        key: 'isChecked',
        value: function isChecked() {
            return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].checked : false;
        }
    }, {
        key: 'isPartialChecked',
        value: function isPartialChecked() {
            return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].partialChecked : false;
        }
    }, {
        key: 'isSingleSelectionMode',
        value: function isSingleSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'single';
        }
    }, {
        key: 'isMultipleSelectionMode',
        value: function isMultipleSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'multiple';
        }
    }, {
        key: 'isCheckboxSelectionMode',
        value: function isCheckboxSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'checkbox';
        }
    }, {
        key: 'onTouchEnd',
        value: function onTouchEnd() {
            this.nodeTouched = true;
        }
    }, {
        key: 'onDropPoint',
        value: function onDropPoint(event, position) {
            event.preventDefault();

            if (this.props.node.droppable !== false) {
                _DomHandler2.default.removeClass(event.target, 'p-treenode-droppoint-active');

                if (this.props.onDropPoint) {
                    this.props.onDropPoint({
                        originalEvent: event,
                        path: this.props.path,
                        index: this.props.index,
                        position: position
                    });
                }
            }
        }
    }, {
        key: 'onDropPointDragOver',
        value: function onDropPointDragOver(event) {
            if (event.dataTransfer.types[1] === this.props.dragdropScope) {
                event.dataTransfer.dropEffect = 'move';
                event.preventDefault();
            }
        }
    }, {
        key: 'onDropPointDragEnter',
        value: function onDropPointDragEnter(event) {
            if (event.dataTransfer.types[1] === this.props.dragdropScope) {
                _DomHandler2.default.addClass(event.target, 'p-treenode-droppoint-active');
            }
        }
    }, {
        key: 'onDropPointDragLeave',
        value: function onDropPointDragLeave(event) {
            if (event.dataTransfer.types[1] === this.props.dragdropScope) {
                _DomHandler2.default.removeClass(event.target, 'p-treenode-droppoint-active');
            }
        }
    }, {
        key: 'onDrop',
        value: function onDrop(event) {
            if (this.props.dragdropScope && this.props.node.droppable !== false) {
                _DomHandler2.default.removeClass(this.contentElement, 'p-treenode-dragover');
                event.preventDefault();
                event.stopPropagation();

                if (this.props.onDrop) {
                    this.props.onDrop({
                        originalEvent: event,
                        path: this.props.path
                    });
                }
            }
        }
    }, {
        key: 'onDragOver',
        value: function onDragOver(event) {
            if (event.dataTransfer.types[1] === this.props.dragdropScope && this.props.node.droppable !== false) {
                event.dataTransfer.dropEffect = 'move';
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }, {
        key: 'onDragEnter',
        value: function onDragEnter(event) {
            if (event.dataTransfer.types[1] === this.props.dragdropScope && this.props.node.droppable !== false) {
                _DomHandler2.default.addClass(this.contentElement, 'p-treenode-dragover');
            }
        }
    }, {
        key: 'onDragLeave',
        value: function onDragLeave(event) {
            if (event.dataTransfer.types[1] === this.props.dragdropScope && this.props.node.droppable !== false) {
                var rect = event.currentTarget.getBoundingClientRect();
                if (event.nativeEvent.x > rect.left + rect.width || event.nativeEvent.x < rect.left || event.nativeEvent.y >= Math.floor(rect.top + rect.height) || event.nativeEvent.y < rect.top) {
                    _DomHandler2.default.removeClass(this.contentElement, 'p-treenode-dragover');
                }
            }
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(event) {
            event.dataTransfer.setData("text", this.props.dragdropScope);
            event.dataTransfer.setData(this.props.dragdropScope, this.props.dragdropScope);

            if (this.props.onDragStart) {
                this.props.onDragStart({
                    originalEvent: event,
                    path: this.props.path,
                    index: this.props.index
                });
            }
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd(event) {
            if (this.props.onDragEnd) {
                this.props.onDragEnd({
                    originalEvent: event
                });
            }
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            var label = this.props.nodeTemplate ? this.props.nodeTemplate(this.props.node) : this.props.node.label;

            return _react2.default.createElement(
                'span',
                { className: 'p-treenode-label' },
                label
            );
        }
    }, {
        key: 'renderCheckbox',
        value: function renderCheckbox() {
            if (this.isCheckboxSelectionMode() && this.props.node.selectable !== false) {
                var checked = this.isChecked();
                var partialChecked = this.isPartialChecked();
                var className = (0, _classnames2.default)('p-checkbox-box', { 'p-highlight': checked });
                var icon = (0, _classnames2.default)('p-checkbox-icon p-c', { 'pi pi-check': checked, 'pi pi-minus': partialChecked });

                return _react2.default.createElement(
                    'div',
                    { className: 'p-checkbox p-component' },
                    _react2.default.createElement(
                        'div',
                        { className: className },
                        _react2.default.createElement('span', { className: icon })
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderIcon',
        value: function renderIcon(expanded) {
            var icon = this.props.node.icon || (expanded ? this.props.node.expandedIcon : this.props.node.collapsedIcon);

            if (icon) {
                var className = (0, _classnames2.default)('p-treenode-icon', icon);

                return _react2.default.createElement('span', { className: className });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderToggler',
        value: function renderToggler(expanded) {
            var iconClassName = (0, _classnames2.default)('p-tree-toggler-icon pi pi-fw', { 'pi-caret-right': !expanded, 'pi-caret-down': expanded });

            return _react2.default.createElement(
                'a',
                { className: 'p-tree-toggler p-unselectable-text', onClick: this.onTogglerClick },
                _react2.default.createElement('span', { className: iconClassName })
            );
        }
    }, {
        key: 'renderDropPoint',
        value: function renderDropPoint(position) {
            var _this2 = this;

            if (this.props.dragdropScope) {
                return _react2.default.createElement('li', { className: 'p-treenode-droppoint', onDrop: function onDrop(event) {
                        return _this2.onDropPoint(event, position);
                    }, onDragOver: this.onDropPointDragOver,
                    onDragEnter: this.onDropPointDragEnter, onDragLeave: this.onDropPointDragLeave });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this3 = this;

            var selected = this.isSelected();
            var checked = this.isChecked();
            var className = (0, _classnames2.default)('p-treenode-content', this.props.node.className, {
                'p-treenode-selectable': this.props.selectionMode && this.props.node.selectable !== false,
                'p-highlight': this.isCheckboxSelectionMode() ? checked : selected,
                'p-highlight-contextmenu': this.props.contextMenuSelectionKey && this.props.contextMenuSelectionKey === this.props.node.key });
            var expanded = this.isExpanded();
            var toggler = this.renderToggler(expanded);
            var checkbox = this.renderCheckbox();
            var icon = this.renderIcon(expanded);
            var label = this.renderLabel();

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this3.contentElement = el;
                    }, className: className, style: this.props.node.style, onClick: this.onClick, onContextMenu: this.onRightClick, onTouchEnd: this.onTouchEnd, draggable: this.props.dragdropScope && this.props.node.draggable !== false,
                    onDrop: this.onDrop, onDragOver: this.onDragOver, onDragEnter: this.onDragEnter, onDragLeave: this.onDragLeave,
                    onDragStart: this.onDragStart, onDragEnd: this.onDragEnd, tabIndex: '0', onKeyDown: this.onNodeKeyDown,
                    role: 'treeitem', 'aria-posinset': this.props.index + 1, 'aria-expanded': this.isExpanded(), 'aria-selected': checked || selected },
                toggler,
                checkbox,
                icon,
                label
            );
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var _this4 = this;

            if (this.props.node.children && this.props.node.children.length && this.isExpanded()) {
                return _react2.default.createElement(
                    'ul',
                    { className: 'p-treenode-children', role: 'group' },
                    this.props.node.children.map(function (childNode, index) {
                        return _react2.default.createElement(UITreeNode, { key: childNode.key || childNode.label, node: childNode, parent: _this4.props.node, index: index, last: index === _this4.props.node.children.length - 1, path: _this4.props.path + '-' + index, selectionMode: _this4.props.selectionMode,
                            selectionKeys: _this4.props.selectionKeys, onSelectionChange: _this4.props.onSelectionChange, metaKeySelection: _this4.props.metaKeySelection,
                            propagateSelectionDown: _this4.props.propagateSelectionDown, propagateSelectionUp: _this4.props.propagateSelectionUp,
                            contextMenuSelectionKey: _this4.props.contextMenuSelectionKey, onContextMenuSelectionChange: _this4.props.onContextMenuSelectionChange, onContextMenu: _this4.props.onContextMenu,
                            onExpand: _this4.props.onExpand, onCollapse: _this4.props.onCollapse, onSelect: _this4.props.onSelect, onUnselect: _this4.props.onUnselect,
                            expandedKeys: _this4.props.expandedKeys, onToggle: _this4.props.onToggle, onPropagateUp: _this4.propagateUp, nodeTemplate: _this4.props.nodeTemplate,
                            dragdropScope: _this4.props.dragdropScope, onDragStart: _this4.props.onDragStart, onDragEnd: _this4.props.onDragEnd, onDrop: _this4.props.onDrop, onDropPoint: _this4.props.onDropPoint });
                    })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderNode',
        value: function renderNode() {
            var className = (0, _classnames2.default)('p-treenode', this.props.node.className, { 'p-treenode-leaf': this.isLeaf() });
            var content = this.renderContent();
            var children = this.renderChildren();

            return _react2.default.createElement(
                'li',
                { className: className, style: this.props.node.style },
                content,
                children
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var node = this.renderNode();

            if (this.props.dragdropScope) {
                var beforeDropPoint = this.renderDropPoint(-1);
                var afterDropPoint = this.props.last ? this.renderDropPoint(1) : null;

                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    beforeDropPoint,
                    node,
                    afterDropPoint
                );
            } else {
                return node;
            }
        }
    }]);

    return UITreeNode;
}(_react.Component);

UITreeNode.defaultProps = {
    node: null,
    index: null,
    last: null,
    parent: null,
    path: null,
    selectionMode: null,
    selectionKeys: null,
    contextMenuSelectionKey: null,
    metaKeySelection: true,
    expandedKeys: null,
    propagateSelectionUp: true,
    propagateSelectionDown: true,
    dragdropScope: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    nodeTemplate: null,
    onSelect: null,
    onUnselect: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onSelectionChange: null,
    onContextMenuSelectionChange: null,
    onPropagateUp: null,
    onDragStart: null,
    onDragEnd: null,
    onDrop: null,
    onDropPoint: null,
    onContextMenu: null
};
UITreeNode.propsTypes = {
    node: _propTypes2.default.object,
    index: _propTypes2.default.number,
    last: _propTypes2.default.number,
    parent: _propTypes2.default.object,
    path: _propTypes2.default.string,
    selectionMode: _propTypes2.default.string,
    selectionKeys: _propTypes2.default.any,
    contextMenuSelectionKey: _propTypes2.default.any,
    metaKeySelection: _propTypes2.default.bool,
    expandedKeys: _propTypes2.default.object,
    propagateSelectionUp: _propTypes2.default.bool,
    propagateSelectionDown: _propTypes2.default.bool,
    dragdropScope: _propTypes2.default.string,
    ariaLabel: _propTypes2.default.string,
    ariaLabelledBy: _propTypes2.default.string,
    nodeTemplate: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onUnselect: _propTypes2.default.func,
    onExpand: _propTypes2.default.func,
    onCollapse: _propTypes2.default.func,
    onToggle: _propTypes2.default.func,
    onSelectionChange: _propTypes2.default.func,
    onContextMenuSelectionChange: _propTypes2.default.func,
    onPropagateUp: _propTypes2.default.func,
    onDragStart: _propTypes2.default.func,
    onDragEnd: _propTypes2.default.func,
    onDrop: _propTypes2.default.func,
    onDropPoint: _propTypes2.default.func,
    onContextMenu: _propTypes2.default.func
};