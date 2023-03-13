/** @jsx MiniReact.createElement */

import MiniReact, { render } from "./MiniReact";

render(
  <div id="my-div" onClick={() => window.alert("Hello, World!")}>
    Test
  </div>,
  document.getElementById("root")
);
