import React, {useReducer} from 'react';

const initialState = {count: 0};

//action should be an object with a type property that is a string, could also have a payload with data
const reducer = (state, action) => {

  switch(action.type){
    case 'increment':
      return {...state, count: state.count + 1};
    case 'decrement':
      return {...state, count: state.count - 1};
    case 'reset':
      return initialState;
    default:
      return initialState;
  }
}

function Counter({start}){
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <span data-testid="counter-value">{count}</span>
      <button data-testid="counter-increment-button" onClick={() => dispatch({type: 'increment'})}>+</button>
      <button data-testid="counter-decrement-button" onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button data-testid="counter-reset-button" onClick={() => dispatch({type: 'reset'})}>Reset</button>
    </>
  )
}