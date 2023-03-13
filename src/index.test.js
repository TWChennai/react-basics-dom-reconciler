/** @jsx MiniReact.createElement */

import MiniReact, { render } from "./MiniReact";

describe("MiniReact", () => {
  it("should render a div", () => {
    const rootElement = document.createElement("section");
    render(<div></div>, rootElement);

    expect(rootElement.querySelector("div")).toBeTruthy();
  });

  it("should render a div with text content", () => {
    const rootElement = document.createElement("section");
    render(<div>Hello, World!</div>, rootElement);

    const divElement = rootElement.querySelector("div");

    expect(divElement.textContent).toBe("Hello, World!");
  });

  it("should render an empty div when no content", () => {
    const rootElement = document.createElement("section");
    render(<div></div>, rootElement);

    const divElement = rootElement.querySelector("div");

    expect(divElement.textContent).toBe("");
    expect(divElement.children.length).toBe(0);
  });
});
