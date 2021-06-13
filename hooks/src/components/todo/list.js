//impoprt react dependencies
import React, { useEffect, useState, useContext } from 'react';
import { If, Then, Else } from 'react-if';

//import internal components
import Auth from '../auth/auth.js';
import { LoginContext } from '../auth/login-context.js';


//receives 
function TodoList(props) {

  //gets a reference to the context so we can make requests about state
  const userContext = useContext(LoginContext);

  const [tdList, setList] = useState(props.list);

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  //checks if the current permissions request is on the list of actions allocated to this user
  let okToRender = userContext.can(props.capability);

  return (
    <ul>
      {tdList.map(item => (
        <li
          className={`complete-${item.complete.toString()}`}
          key={item._id}
        >
          <span onClick={

            () => {
              if (userContext.user.capabilities.includes('update')) {
                props.handleComplete(item._id)
              } else {
                alert('You must possess \'update\' permissions to continue');
              }
            }
          }>
            <b>Task: </b> {item.text}
            <div>
              <b>Assigned to: </b> {item.assignee}
            </div>
          </span>
          <Auth capability='delete'>
            <button data-testid={`delete-button-${item._id}`} onClick={() => props.handleDelete(item._id)}>Delete Item</button>
          </Auth>

        </li>
      ))}
    </ul>
  );

}

export default TodoList;