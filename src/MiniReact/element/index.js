export const TEXT_ELEMENT = "TEXT";

/**
 * @param {string} type - the node type
 * @param {?object} configObject - the props
 * @param  {...any} args - the children array
 * @returns {object} - to be called by tevreact.render
 */
// eslint-disable-next-line no-unused-vars
export function createElement(type, configObject, ...args) {
  const props = {
    ...configObject,
  };

  const hasChildren = args.length > 0;
  const nodeChildren = hasChildren ? [...args] : [];
  props.children = nodeChildren.map((child) =>
    child instanceof Object ? child : createTextElement(child)
  );

  return { type, props };
}

/**
 * @param {string} nodeValue - the text of the node
 * @returns {object} - a call to createElement
 */
function createTextElement(nodeValue) {
  return createElement(TEXT_ELEMENT, { nodeValue, children: [] });
}
