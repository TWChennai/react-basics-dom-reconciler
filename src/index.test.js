/** @jsx MiniReact.createElement */

import MiniReact, { render } from "./MiniReact";

describe("MiniReact", () => {
  it("should render a div", () => {
    const rootElement = document.createElement("section");
    render(<div></div>, rootElement);

    expect(rootElement.querySelector("div")).toBeTruthy();
  });
});
