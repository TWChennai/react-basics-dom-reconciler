

let createElement = function (type, props) {
    const element = document.createElement(type)
    element.className = props.className || '';
    element.style = props.style;
    if(props.src) element.src = props.src;
    if(props.href) element.href=props.href;
    return element;
}

let createTextNode = function(text){
    return document.createTextNode(text);
}

let appendChild = function(parent, child){
    parent.appendChild(child);
}


export { createElement, createTextNode, appendChild };