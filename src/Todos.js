import React from 'react';
import { Link } from 'react-router-dom';

const Todos = ({ todos, destroyTodo })=> {
  return (
    <div>
      <ul>
        {
          todos.map(todo => <li key={ todo.id }>
            <Link to={`/todos/${todo.id}`}>{ todo.name }</Link>
            <br />
            <a onClick={()=> destroyTodo(todo)}>x</a>
            </li>)
        }
      </ul>
    </div>
  );
}
export default Todos;
