import { isClass, updateDomProperties } from "../utils";
import { TEXT_ELEMENT } from "../element";

export let rootInstance = null; // will keep the reference to the instance rendered on the dom
export let currElmForHook = null; // will be used for hooks to get the currentInstance

export function render(element, parentDom) {
  const prevInstance = rootInstance;
  rootInstance = reconcile(parentDom, prevInstance, element);
}

export function reconcile(parentDom, instance, element) {
  if (instance == null) {
    // initial render
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  } else if (element == null) {
    /**
     * this section gets hit when
     * a childElement was previously present
     * but in the new element is not present
     * for instance a todo item that has been deleted
     * it was present at first but is now not present
     */
    parentDom.removeChild(instance.dom);
    return null;
  } else if (instance.element.type !== element.type) {
    /**
     * if the type of the previous Instance is not the
     * same as the type of the new element
     * we replace the old with the new.
     * eg: if we had an "input" and now have "button"
     * we get rid of the input and replace it with the button
     */
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  } else if (typeof element.type === "string") {
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else {
    return updateComponent(element, parentDom, instance);
  }
}

function updateComponent(element, parentDom, instance) {
  if (isClass(element.type)) {
    return updateClassComponent(element, parentDom, instance);
  } else {
    return updateFunctionalComponent(element, parentDom, instance);
  }
}

function instantiate(element) {
  const { type, props } = element;
  const isDomElement = typeof type === "string";

  if (isDomElement) {
    // Instantiate DOM element
    const isTextElement = type === TEXT_ELEMENT;
    const dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(type);

    updateDomProperties(dom, [], props);

    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map((childInstance) => childInstance.dom);
    childDoms.forEach((childDom) => dom.appendChild(childDom));

    return { dom, element, childInstances };
  } else {
    return updateComponent(element);
  }
}

function updateClassComponent(element, parentDom, instance) {
  if (instance == null) {
    const { type, props } = element;
    instance = {};
    const publicInstance = new type(props); // the type is a class so we use the *new* keyword
    publicInstance.__internalInstance = instance;
    const childElement = publicInstance.render(); // each class has a render method
    // if render is called it returns the child
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;

    Object.assign(instance, { dom, element, childInstance, publicInstance });
  } else {
    instance.publicInstance.props = element.props;
    const childElement = instance.publicInstance.render();
    const oldChildInstance = instance.childInstance;
    const childInstance = reconcile(parentDom, oldChildInstance, childElement);
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
  }
  return instance;
}

function updateFunctionalComponent(element, parentDom, instance) {
  if (instance == null) {
    const { type, props } = element;
    instance = {};
    currElmForHook = instance;
    currElmForHook.hooks = [];
    currElmForHook.hookIndex = 0;
    const childElement = type(props); // the type is a class so we use the *new* keyword
    // if render is called it returns the child
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;

    Object.assign(instance, { dom, element, childInstance });
  } else {
    currElmForHook = instance;
    currElmForHook.oldInstance = { ...instance };
    currElmForHook.hooks = [];
    currElmForHook.hookIndex = 0;
    const childElement = instance.element.type(element.props);
    const oldChildInstance = instance.childInstance;
    const childInstance = reconcile(parentDom, oldChildInstance, childElement);
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
  }
  return instance;
}

function reconcileChildren(instance, element) {
  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);

  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    // the reconcile function has logic setup to handle the scenario when either
    // the child instance or the childElement is null
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }

  return newChildInstances.filter((instance) => instance != null);
}
