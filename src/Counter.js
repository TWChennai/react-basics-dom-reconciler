/** @jsx MiniReact.createElement */
import MiniReact from "./MiniReact";

function Counter(props) {
  const [count, setCount] = MiniReact.useState(1);
  const [double, setDouble] = MiniReact.useState(2);

  return (
    <div>
      <p>{count}</p>
      <p>{double}</p>
      <button
        onClick={() => {
          setCount((prevCount) => prevCount + props.incrementBy);
          setDouble((prevCount) => prevCount + props.incrementBy + 1);
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default Counter;
