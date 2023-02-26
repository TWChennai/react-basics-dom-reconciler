import { render } from "./reconciler";
import { createElement } from "./element";
import { Component } from "./component";
import { Hooks } from "./hooks";

export { createElement, render };

const Index = (function () {
  const hooks = Hooks();

  return {
    render: render,
    createElement: createElement,
    Component: Component,
    useState: hooks.useState,
  };
})();

export default Index;
