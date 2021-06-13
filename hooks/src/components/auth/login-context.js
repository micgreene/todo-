//import react dependencies
import React, { useState, useEffect } from 'react';

//import 3rd party dependencies
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import superagent from 'superagent';

//create context for auth data
export const LoginContext = React.createContext();

//handles authentication data requests
function LoginProvider(props) {

  //states keeps track whether logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //state is going to be user record from api
  const [user, setUser] = useState({});
  

  //Method - checks to see if user account includes the capability required, if no permission is requested then return true by default
  const can = (permission) => {  
    if(!permission){
      return true;
    }

    return user.capabilities && user.capabilities.includes(permission);
  }


  //Method - logs user out and removes token cookies from local browser
  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    cookie.remove('auth');
  }


  //Method - attempts to log user in, returns an error if failed.  
  const login = async (input) => {

    const API = `${process.env.REACT_APP_API}/signin`;

    try {
      //makes a request to the API
      const response = await superagent.post(API).auth(input.username, input.password);

      //creates a reference to that token and then validates it to ensure it's valid
      const { token } = response.body;
      validateToken(token);
    }
    catch (e) {
      console.warn('Login Attempt Failed');
    }
  }  


  //Method - attempts to validate a token passed in as a parameter and saves a token cookie to the user's local storage in case they attempt tp re-render
  //returns an auth error, if failed
  const validateToken = token => {
    try {
      let tokenUser = jwt.verify(token, process.env.REACT_APP_API_SECRET);
      setIsLoggedIn(true);
      cookie.save('auth', token)
      setUser(tokenUser);
    }
    catch {
      setIsLoggedIn(false);
      setUser({});

      console.warn('Token Validation Error');
    }
  }

  //effect hook checks to see if a token cookie is present in user's local storage to keep user logged in in case of re-render.
  //only runs once upon render
  useEffect( () => {
    const token = cookie.load('auth') || null;

    validateToken(token);
  }, []);


  //auth data and functions to be shared throughout the context
  const authInfo = {
    login,
    logout,
    can,
    user,
    isLoggedIn
  };


  //passes info to LoginContext
  return (
    <LoginContext.Provider value={authInfo}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginProvider;
