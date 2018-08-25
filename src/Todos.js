import React from 'react';

const Todos = ({ todos, destroyTodo })=> {
  return (
    <div>
      <ul>
        {
          todos.map(todo => <li key={ todo.id }>
            { todo.name }
            <br />
            <a onClick={()=> destroyTodo(todo)}>x</a>
            </li>)
        }
      </ul>
    </div>
  );
}
export default Todos;
