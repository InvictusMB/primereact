'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tree = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UITreeNode = require('./UITreeNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = exports.Tree = function (_Component) {
    _inherits(Tree, _Component);

    function Tree(props) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

        if (!_this.props.onToggle) {
            _this.state = {
                expandedKeys: _this.props.expandedKeys
            };
        }

        _this.onToggle = _this.onToggle.bind(_this);
        _this.onDragStart = _this.onDragStart.bind(_this);
        _this.onDragEnd = _this.onDragEnd.bind(_this);
        _this.onDrop = _this.onDrop.bind(_this);
        _this.onDropPoint = _this.onDropPoint.bind(_this);
        return _this;
    }

    _createClass(Tree, [{
        key: 'getExpandedKeys',
        value: function getExpandedKeys() {
            return this.props.onToggle ? this.props.expandedKeys : this.state.expandedKeys;
        }
    }, {
        key: 'onToggle',
        value: function onToggle(event) {
            if (this.props.onToggle) {
                this.props.onToggle(event);
            } else {
                this.setState({
                    expandedKeys: event.value
                });
            }
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(event) {
            this.dragState = {
                path: event.path,
                index: event.index
            };
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd() {
            this.dragState = null;
        }
    }, {
        key: 'onDrop',
        value: function onDrop(event) {
            if (this.validateDropNode(this.dragState.path, event.path)) {
                var value = JSON.parse(JSON.stringify(this.props.value));
                var dragPaths = this.dragState.path.split('-');
                dragPaths.pop();
                var dragNodeParent = this.findNode(value, dragPaths);
                var dragNode = dragNodeParent ? dragNodeParent.children[this.dragState.index] : value[this.dragState.index];
                var dropNode = this.findNode(value, event.path.split('-'));

                if (dropNode.children) dropNode.children.push(dragNode);else dropNode.children = [dragNode];

                if (dragNodeParent) dragNodeParent.children.splice(this.dragState.index, 1);else value.splice(this.dragState.index, 1);

                if (this.props.onDragDrop) {
                    this.props.onDragDrop({
                        originalEvent: event.originalEvent,
                        value: value
                    });
                }
            }
        }
    }, {
        key: 'onDropPoint',
        value: function onDropPoint(event) {
            if (this.validateDropPoint(event)) {
                var value = JSON.parse(JSON.stringify(this.props.value));
                var dragPaths = this.dragState.path.split('-');
                dragPaths.pop();
                var dropPaths = event.path.split('-');
                dropPaths.pop();
                var dragNodeParent = this.findNode(value, dragPaths);
                var dropNodeParent = this.findNode(value, dropPaths);
                var dragNode = dragNodeParent ? dragNodeParent.children[this.dragState.index] : value[this.dragState.index];
                var siblings = this.areSiblings(this.dragState.path, event.path);

                if (dragNodeParent) dragNodeParent.children.splice(this.dragState.index, 1);else value.splice(this.dragState.index, 1);

                if (event.position < 0) {
                    var dropIndex = siblings ? this.dragState.index > event.index ? event.index : event.index - 1 : event.index;

                    if (dropNodeParent) dropNodeParent.children.splice(dropIndex, 0, dragNode);else value.splice(dropIndex, 0, dragNode);
                } else {
                    if (dropNodeParent) dropNodeParent.children.push(dragNode);else value.push(dragNode);
                }

                if (this.props.onDragDrop) {
                    this.props.onDragDrop({
                        originalEvent: event.originalEvent,
                        value: value
                    });
                }
            }
        }
    }, {
        key: 'validateDrop',
        value: function validateDrop(dragPath, dropPath) {
            if (!dragPath) {
                return false;
            } else {
                //same node
                if (dragPath === dropPath) {
                    return false;
                }

                //parent dropped on an descendant
                if (dropPath.indexOf(dragPath) === 0) {
                    return false;
                }

                return true;
            }
        }
    }, {
        key: 'validateDropNode',
        value: function validateDropNode(dragPath, dropPath) {
            var validateDrop = this.validateDrop(dragPath, dropPath);
            if (validateDrop) {
                //child dropped on parent
                if (dragPath.indexOf('-') > 0 && dragPath.substring(0, dragPath.lastIndexOf('-')) === dropPath) {
                    return false;
                }

                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'validateDropPoint',
        value: function validateDropPoint(event) {
            var validateDrop = this.validateDrop(this.dragState.path, event.path);
            if (validateDrop) {
                //child dropped to next sibling's drop point
                if (event.position === -1 && this.areSiblings(this.dragState.path, event.path) && this.dragState.index + 1 === event.index) {
                    return false;
                }

                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'areSiblings',
        value: function areSiblings(path1, path2) {
            if (path1.length === 1 && path2.length === 1) return true;else return path1.substring(0, path1.lastIndexOf('-')) === path2.substring(0, path2.lastIndexOf('-'));
        }
    }, {
        key: 'findNode',
        value: function findNode(value, path) {
            if (path.length === 0) {
                return null;
            } else {
                var index = parseInt(path[0], 10);
                var nextSearchRoot = value.children ? value.children[index] : value[index];

                if (path.length === 1) {
                    return nextSearchRoot;
                } else {
                    path.shift();
                    return this.findNode(nextSearchRoot, path);
                }
            }
        }
    }, {
        key: 'renderRootChild',
        value: function renderRootChild(node, index, last) {
            return _react2.default.createElement(_UITreeNode.UITreeNode, { key: node.key || node.label, node: node, index: index, last: last, path: String(index), selectionMode: this.props.selectionMode,
                selectionKeys: this.props.selectionKeys, onSelectionChange: this.props.onSelectionChange, metaKeySelection: this.props.metaKeySelection,
                contextMenuSelectionKey: this.props.contextMenuSelectionKey, onContextMenuSelectionChange: this.props.onContextMenuSelectionChange, onContextMenu: this.props.onContextMenu,
                propagateSelectionDown: this.props.propagateSelectionDown, propagateSelectionUp: this.props.propagateSelectionUp,
                onExpand: this.props.onExpand, onCollapse: this.props.onCollapse, onSelect: this.props.onSelect, onUnselect: this.props.onUnselect,
                expandedKeys: this.getExpandedKeys(), onToggle: this.onToggle, nodeTemplate: this.props.nodeTemplate,
                dragdropScope: this.props.dragdropScope, onDragStart: this.onDragStart, onDragEnd: this.onDragEnd, onDrop: this.onDrop, onDropPoint: this.onDropPoint });
        }
    }, {
        key: 'renderRootChildren',
        value: function renderRootChildren() {
            var _this2 = this;

            return this.props.value.map(function (node, index) {
                return _this2.renderRootChild(node, index, index === _this2.props.value.length - 1);
            });
        }
    }, {
        key: 'renderModel',
        value: function renderModel() {
            if (this.props.value) {
                var rootNodes = this.renderRootChildren();

                return _react2.default.createElement(
                    'ul',
                    { className: 'p-tree-container', role: 'tree', 'aria-label': this.props.ariaLabel, 'aria-labelledby': this.props.ariaLabelledBy },
                    rootNodes
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderLoader',
        value: function renderLoader() {
            if (this.props.loading) {
                var icon = (0, _classnames2.default)('p-tree-loading-icon pi-spin', this.props.loadingIcon);

                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement('div', { className: 'p-tree-loading-mask p-component-overlay' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'p-tree-loading-content' },
                        _react2.default.createElement('i', { className: icon })
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('p-tree p-component', { 'p-tree-selectable': this.props.selectionMode, 'p-tree-loading': this.props.loading });
            var loader = this.renderLoader();
            var content = this.renderModel();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                loader,
                content
            );
        }
    }]);

    return Tree;
}(_react.Component);

Tree.defaultProps = {
    id: null,
    value: null,
    selectionMode: null,
    selectionKeys: null,
    onSelectionChange: null,
    contextMenuSelectionKey: null,
    onContextMenuSelectionChange: null,
    expandedKeys: null,
    style: null,
    className: null,
    metaKeySelection: true,
    propagateSelectionUp: true,
    propagateSelectionDown: true,
    loading: false,
    loadingIcon: 'pi pi-spinner',
    dragdropScope: null,
    nodeTemplate: null,
    onSelect: null,
    onUnselect: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onDragDrop: null,
    onContextMenu: null
};
Tree.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any.isRequired,
    selectionMode: _propTypes2.default.string,
    selectionKeys: _propTypes2.default.any,
    onSelectionChange: _propTypes2.default.func,
    contextMenuSelectionKey: _propTypes2.default.any,
    onContextMenuSelectionChange: _propTypes2.default.func,
    expandedKeys: _propTypes2.default.object,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    metaKeySelection: _propTypes2.default.bool,
    propagateSelectionUp: _propTypes2.default.bool,
    propagateSelectionDown: _propTypes2.default.bool,
    loading: _propTypes2.default.bool,
    loadingIcon: _propTypes2.default.string,
    dragdropScope: _propTypes2.default.string,
    nodeTemplate: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onUnselect: _propTypes2.default.func,
    onExpand: _propTypes2.default.func,
    onCollapse: _propTypes2.default.func,
    onToggle: _propTypes2.default.func,
    onDragDrop: _propTypes2.default.func,
    onContextMenu: _propTypes2.default.func
};