import ReactReconciler from 'react-reconciler';


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
        return document.createTextNode(text)
    },
    createInstance: function (
        type,
        props,
        rootContainerInstance,
        currentHostContext,
        workInProgress
    ) {
        const element = document.createElement(type)
        element.className = props.className || '';
        element.style = props.style;
        if(props.src) element.src = props.src;
        if(props.href) element.href=props.href;
        return element
    },
    appendInitialChild: (parent, child) => {
        parent.appendChild(child)
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
    supportsMutation: true,

});

let ReactDOMCustom = {
    render(whatToRender, div) {
        let container = reconciler.createContainer(div, false, false);
        reconciler.updateContainer(whatToRender, container, null, null);
    }
};

export default ReactDOMCustom;