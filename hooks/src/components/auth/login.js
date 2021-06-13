//import react dependencies
import React, { useState, useContext } from "react";
import { If, Then, Else } from 'react-if';

//import internal components
import { LoginContext } from './login-context.js';


//creates login form input and requests authentication
function Login() {

  const [user, setUser] = useState({});

  //get a reference to the LoginContext
  const userContext = useContext(LoginContext);

  //updates state dynamically
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });    
  }

  //requests authentication upon user submit
  const handleSubmit = (e) => {
    e.preventDefault();

    userContext.login(user)
  }

  return (
    <>
      <If condition={userContext.isLoggedIn}>

        <Then>\
          <button onClick={userContext.logout}>Log Out</button>
        </Then>

        <Else>
          <form onSubmit={handleSubmit}>
            <input placeholder="username" name="username" onChange={handleChange} />

            <input placeholder="password" name="password" onChange={handleChange} />
            <button>Login</button>
          </form>
        </Else>

      </If>
    </>
  )
}
export default Login;
