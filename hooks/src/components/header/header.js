import React, { useState, useEffect } from 'react';

import '../todo/todo.scss';

function Header(props) {
  const [list, setList] = useState(props.list);
  
  useEffect( () => {
    setList(props.list);
  }, [props.list] );

  return (
    <>
      <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
          </h2>
      </header>
    </>
  );

}

export default Header;
