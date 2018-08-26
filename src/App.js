import React, { Component} from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Todos from './Todos';
import TodoCreate from './TodoCreate';
import TodoEdit from './TodoEdit';

class App extends Component{
  constructor(){
    super();
    this.state = {
      todos: []
    };
    this.destroyTodo = this.destroyTodo.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }
  fetchTodo(id){
    return axios.get(`/todos/${id}`)
      .then( response => response.data);
  }
  updateTodo(todo){
    return axios.put(`/todos/${todo.id}`, todo)
      .then(response => response.data)
      .then( todo => {
        const todos = this.state.todos.map(_todo => _todo.id !== todo.id ? _todo : todo);
        this.setState({ todos: todos })
      });
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
    const { destroyTodo, createTodo, fetchTodo, updateTodo } = this;
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
          <Switch>
            <Route path='/todos/create' render={({ history })=> <TodoCreate history={ history } createTodo={ createTodo } /> } />
            <Route path='/todos/:id' render={({ history, match })=> <TodoEdit history={ history } updateTodo={ updateTodo } id={ match.params.id*1 } fetchTodo={ fetchTodo }/> } />
          </Switch>
          <Route path='/todos' render={()=> <Todos todos={ todos} destroyTodo={ destroyTodo } /> } />
        </div>
      </Router>
    );
  }
}

export default App;
