import React, { useState } from 'react';

function Example() {
  let [a, setA] = useState(0);
  let [b, setB] = useState(0);
  let [sum, setSum] = useState(0);
  let [counter, setCount] = useState(1);
  
  return (
    <div>
      <h1>Sum 2 numbers</h1>
      <button onClick={()=>setSum(parseInt(a) + parseInt(b))}>Sum</button>
      <input type="number" onChange={(e)=> setA(e.target.value)} />
      <input type="number" onChange={(e)=> setB(e.target.value)} />
      Result: {sum}
      <br/>
      <br/>
      <button onClick={()=> setCount(++counter)}>Counter: {counter}</button>
    </div>
  );
}

export default Example;


// findByUserNameContaining(name: string, page: number, size: number) {
//   const url = this.ROOT_URL + `/trainingApi/students/search/likeName?name=${name}&page=${page}&size=${size}&projection=InlineStudent`;
//   return this.httpClient.get(url);
// }