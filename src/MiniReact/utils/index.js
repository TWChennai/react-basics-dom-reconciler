export function updateDomProperties(domElement, props) {
  const isEvent = (key) => key.startsWith("on");
  const isProperty = (key) => key !== "children" && !isEvent(key);

  Object.keys(props)
    .filter(isProperty)
    .forEach((name) => {
      domElement.setAttribute(name, props[name]);
    });

  // Add event listeners
  Object.keys(props)
    .filter(isEvent)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      domElement.addEventListener(eventType, props[name]);
    });
}
