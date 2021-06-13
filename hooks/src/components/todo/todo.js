//import react dependencies
import React, { useState, useEffect } from 'react';

//import internal components
import Auth from '../auth/auth.js';
import TodoForm from './form.js';
import TodoList from './list.js';
import Header from '../header/header.js';

//import styling
import './todo.scss';


//handles logic for todo list, including adding new items to the list and toggling them complete or incomplete
//manages state of list, which keeps an array of objects
function ToDo(props) {

  const [list, setList] = useState([]);

  //Method - assigns an object a random id numbers and adds it to the list state
  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  //Method - filters the list state to find an object using the id paramter.
  //Object's .complete property is toggled from false>true or true>false
  const toggleComplete = (id) => {

    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let listMap = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(listMap);
    }
  };

  const deleteTask = (id) => {
    setList(list.filter(el => el._id !== id ));
  }


  //Effect hook creates a sample list upon page render
  useEffect(() => {
    let exList = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ];

    setList(exList);
  }, []);

  return (
    <>
      <Header list={list} />

      <section className="todo">
        <Auth capability="create">
          <div>
            <TodoForm handleSubmit={addItem} />
          </div>
        </Auth>


        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
            handleDelete={deleteTask}
          />
        </div>

      </section>
    </>
  );

}

export default ToDo;
