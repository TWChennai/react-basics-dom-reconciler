import { updateDomProperties } from "../utils";
import { TEXT_ELEMENT } from "../element";

export function render(element, container) {
  const { type, props } = element;

  const isTextElement = type === TEXT_ELEMENT;
  let domElement;

  if (isTextElement) {
    domElement = document.createTextNode(props.nodeValue);
  } else {
    domElement = document.createElement(type);
    const children = props.children;
    children.forEach((child) => render(child, domElement));
    updateDomProperties(domElement, props);
  }

  container.appendChild(domElement);
}
