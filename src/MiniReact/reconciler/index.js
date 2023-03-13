import { updateDomProperties } from "../utils";

export function render(element, container) {
  const domElement = document.createElement(element.type);

  const children = element.props.children || [];
  children.forEach((child) => {
    domElement.appendChild(document.createTextNode(child));
  });

  updateDomProperties(domElement, element.props);

  container.appendChild(domElement);
}
