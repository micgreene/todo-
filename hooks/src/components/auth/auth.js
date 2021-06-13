//import react dependencies
import React, { useContext } from 'react';
import { If, Then, Else } from 'react-if';

//import the context to reuest info about state
import { LoginContext } from './login-context.js';


//takes in user capability permission required as a prop, checks to see if user is authorized to view requested content
//if there is no capability sent then this is content the user needs to be signed in to see
function Auth(props) {

  //gets a reference to the context so we can make requests about state
  const userContext = useContext(LoginContext);

  //checks if the current permissions request is on the list of actions allocated to this user
  let canDoThing = userContext.can(props.capability);

  //checks to see if the user is currently logged in and if they are allowed to view the currently requested data before any components are rendered
  const okToRender = userContext.isLoggedIn === true  ? canDoThing : false;

  //Makes a reference to the requested permissions action to alert the user of the required permissions to access the curent component
  //if there is no permissions requirement, then simply requests the user to 'Log In'
  let permissionsList = props.capability ? props.capability : 'Log In';
  

  return (
    <>
      <If condition={okToRender}>
        <Then>
          {props.children}
        </Then>
        <Else>
          You must possess "{permissionsList}" permissions to continue 
        </Else>
      </If>
    </>
  )
}

export default Auth;