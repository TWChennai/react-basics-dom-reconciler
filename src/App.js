/** @jsx MiniReact.createElement */

import MiniReact from "./MiniReact";
import Counter from "./Counter";
import ClassCounter from "./ClassCounter";

function App() {
  return (
    <div>
      <Counter incrementBy={1}></Counter>
      <ClassCounter incrementBy={1}></ClassCounter>
    </div>
  );
}

export default App;
