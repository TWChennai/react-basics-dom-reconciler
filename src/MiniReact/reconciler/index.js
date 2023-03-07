export function render(element, container) {
  const domElement = document.createElement(element.type);
  container.appendChild(domElement);
}
