import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';

const Test = () => {
  const [state, setState] = useState({
    'age': 0,
    'birthYear': 1900
  });

  const handleChange = (event) => {
    const age = 2023 - event.target.value;

    setState({
      [event.target.name]: event.target.value,
      age: age
    });
  };

  return <>
    <div>Age: {state.age}</div>
    <form method="post">
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
