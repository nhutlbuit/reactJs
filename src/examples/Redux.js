import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Redux() {
  const count = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      This is clicked {count} times!
      <div>
        <button onClick={()=> dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={()=> dispatch({ type: 'INCREMENT' })}>+</button>
      </div>
    </div>
  );
}

export default Redux;
