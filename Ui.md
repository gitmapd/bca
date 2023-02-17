# Separating the Ui code from the business logic

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {useState} from 'react';

const MyFormUi = ({
  state,
  handleSubmit,
  handleChange
}) => {
  return <>
    <div>Name: {state.name}</div>
    <div>Age: {state.age}</div>
    <form method="post" onSubmit={handleSubmit}>
      <div>Name: <input type="text" name="name" value={state.name} onChange={handleChange} /></div>
      <div>Age: <input type="date" name="age" value={state.age} onChange={handleChange} /></div>
      <button>Submit form</button>
    </form>
  </>;
}

const MyForm = () => {
  // create a state variable for each form
  const [state, setState] = useState({
    'name': '',
    'age': ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);

    // do things using the state here
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  return (
    <MyFormUi
      state={state}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <MyForm/>
  </React.StrictMode>
);
```

A fantastic example to separate hook, counterUi, and helper function: https://stackoverflow.com/a/69333202
