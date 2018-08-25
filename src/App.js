import React, { Component} from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';
import Todos from './Todos';
import TodoCreate from './TodoCreate';

class App extends Component{
  constructor(){
    super();
    this.state = {
      todos: []
    };
    this.destroyTodo = this.destroyTodo.bind(this);
    this.createTodo = this.createTodo.bind(this);
  }
  createTodo(todo){
    return axios.post('/todos', todo)
      .then(response => response.data)
      .then( todo => this.setState({ todos: [...this.state.todos, todo]}));
  }
  destroyTodo(todo){
    axios.delete(`/todos/${todo.id}`)
      .then( ()=> {
        this.setState({ todos: this.state.todos.filter(_todo => _todo.id !== todo.id)});
      });
  }
  componentDidMount(){
    axios.get('/todos')
      .then(response => response.data)
      .then(todos => this.setState({ todos }))
  }
  render(){
    const { todos } = this.state;
    const { destroyTodo, createTodo } = this;
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to='/todos'>Todos</Link>
            </li>
            <li>
              <Link to='/todos/create'>Create A Todo</Link>
            </li>
          </ul>
          <Route path='/todos/create' render={({ history })=> <TodoCreate history={ history } createTodo={ createTodo } /> } />
          <Route exact path='/todos' render={()=> <Todos todos={ todos} destroyTodo={ destroyTodo } /> } />
        </div>
      </Router>
    );
  }
}

export default App;
