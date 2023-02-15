import ReactReconciler from 'react-reconciler';
import {createElement, createTextNode, appendChild} from './Utils';


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
        return createTextNode(text);
    },
    createInstance: function (
        type,
        props,
        rootContainerInstance,
        currentHostContext,
        workInProgress
    ) {
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
    supportsMutation: true

});

let ReactDOMCustom = {
    render(whatToRender, div) {
        let container = reconciler.createContainer(div, false, false);
        reconciler.updateContainer(whatToRender, container, null, null);
    }
};

export default ReactDOMCustom;