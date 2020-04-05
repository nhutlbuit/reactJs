import React, { useState } from 'react';

function Example() {
  let [a, b] = useState(0);
  let [sum, setSum] = useState(0);
  let [counter, setCount] = useState(0);
  function getText() {
      sum = parseInt(a) + parseInt(b);
    //  this.setState({sum});
  }

  const calCounter = () => setCount(counter + 1);
  const sum2number = () => {
    sum = parseInt(a) + parseInt(b);
    setSum(sum);
  };

  return (
    <div>
        <h1>Hello world</h1>
        <button onClick={sum2number}>Click Me</button>
        <input type="number" defaultValue={a}/>
        <input type="number" defaultValue={b}/>
        {sum}
        <button onClick={calCounter}>Counter: {counter}</button>
    </div>

);

}

export default Example;
