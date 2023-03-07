import { createElement } from "./element";
import { render } from "./reconciler";

export { createElement, render };

const Index = (function () {
  return {
    createElement: createElement,
    render: render,
  };
})();

export default Index;
