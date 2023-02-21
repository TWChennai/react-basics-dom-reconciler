import React, { useState } from 'react';

function Counter(props) {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => {
                setCount(prevCount => prevCount + props.incrementBy)
            }}
            >Click Me</button>
        </div>
    );

}

export default Counter;