//import react dependencies
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//import bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';

//import internal components
import Auth from './components/auth/auth.js';
import LoginContext from './components/auth/login-context.js';
import Login from './components/auth/login.js';
import ToDo from './components/todo/todo.js';

//renders entire application
//LoginConext allows state to be requested by all components wrapped inside it.
function App() {

  return (
    <>
      <LoginContext>
        <Login />
        <Auth>
          <ToDo />
        </Auth>
      </LoginContext>
    </>
  );

}
export default App;
