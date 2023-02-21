import ReactReconciler from 'react-reconciler';
import { createElement, createTextNode, appendChild } from './Utils';


let reconciler = ReactReconciler({
    now: Date.now,
    getRootHostContext: function (nextRootInstance) {
        let rootContext = {}
        return rootContext;
    },
    getChildHostContext: function (parentContext, fiberType, rootInstance) {
        let context = { type: fiberType }
        return context;
    },
    shouldSetTextContent: function (type, nextProps) {
        return false
    },
    createTextInstance: function (
        text,
        rootContainerInstance,
        currentHostContext,
        workInProgress
    ) {
        console.log('text', text);
        return createTextNode(text);
    },
    createInstance: function (
        type,
        props,
        rootContainerInstance,
        currentHostContext,
        workInProgress
    ) {
        console.log('createInstance', type);
        return createElement(type, props);
    },
    appendInitialChild: (parent, child) => {
        appendChild(parent, child);
    },
    finalizeInitialChildren: (
        instance,
        type,
        newProps,
        rootContainerInstance,
        currentHostContext
    ) => {
        return true;
    },
    prepareForCommit: function (rootContainerInstance) { },
    resetAfterCommit: function (rootContainerInstance) { },
    commitMount: (domElement, type, newProps, fiberNode) => {
        domElement.focus()
    },
    appendChildToContainer: (parent, child) => {
        parent.appendChild(child)
    },
    clearContainer: function () { },
    detachDeletedInstance: function () { },
    removeChildFromContainer: function (container, child) {
        container.removeChild(child);
    },
    prepareUpdate: function (instance, type, oldProps, newProps, rootContainerInstance, currentHostcontext) {
        if (type === 'p') {
            return { 'newValue': newProps };
        }
        return null;
    },
    commitUpdate: function (instance, updatePayload, type, oldProps, newProps, finishedWork) {
        instance.type = type;
        instance.props = newProps;
    },
    commitTextUpdate: function (textInstance, oldText, newText) {
        textInstance.textContent = newText;
    },
    supportsMutation: true

});

let MiniDomRenderer = {
    render(whatToRender, div) {
        let container = reconciler.createContainer(div, false, false);
        reconciler.updateContainer(whatToRender, container, null, null);
    }
};

export default MiniDomRenderer;