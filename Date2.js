import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {useState} from 'react';

const Test = () => {
  const [state, setState] = useState({
    'age': 0,
    'name': '',
    'birthYear': 1900
  });

  const handleChange = (event) => {
    // it is possible to call the setState() function multiple times to update state, but only
    // if we pass a function to it. Think of this as "previousState" for input and "nextState" for output.
    setState(
      // this function takes the old state, and RETURNS a new state — It's cleaner to have this as a separate function
      (previousState) => ({
        // the OLD state
        ...previousState,
        // the form field we're changing
        [event.target.name]: event.target.value
      })
    );

    // only if we're changing the birthYear
    if (event.target.name === 'birthYear') {
      setState(
        // this function takes the old state, and RETURNS a new state — It's cleaner to have this as a separate function
        (previousState) => ({
          // the OLD state
          ...previousState,
          // the age we're changing
          age: 2023 - event.target.value
        })
      );
    }
  };

  return <>
    <div>Name: {state.name}</div>
    <div>Age: {state.age}</div>
    <form method="post">
      <div>Name: <input type="text" name="name" value={state.name} onChange={handleChange} /></div>
      <div>Birth Year: <input type="number" name="birthYear" min="0" max="2023" value={state.birthYear} onChange={handleChange} /></div>
    </form>
  </>
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <Test/>
  </React.StrictMode>
);
