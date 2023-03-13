export const TEXT_ELEMENT = "TEXT";

/**
 * @param {string} type - the node type
 * @param {?object} configObject - the props
 * @param  {...any} args - the children array
 * @returns {object} - to be called by tevreact.render
 */
export function createElement(type, configObject, ...args) {
  const props = {
    ...configObject,
  };

  const hasChildren = args.length > 0;
  const nodeChildren = hasChildren ? [...args] : [];
  props.children = nodeChildren;

  return { type, props };
}
