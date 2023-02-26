/** @jsx MiniReact.createElement */
import MiniReact from "./MiniReact";

class ClassCounter extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + this.props.incrementBy });
          }}
        >
          Click Me
        </button>
      </div>
    );
  }
}

export default ClassCounter;
