import React, { Component } from 'react';

class TodoEdit extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.fetchTodo = this.fetchTodo.bind(this);
    this.fetchTodo(this.props.id);
  }
  fetchTodo(id){
    this.props.fetchTodo(id)
      .then( todo => this.setState({ name: todo.name }));
  }
  onUpdate(ev){
    ev.preventDefault();
    this.props.updateTodo({ id:this.props.id, name: this.state.name })
      .then(()=> this.props.history.push('/todos'));
  }
  componentDidUpdate(prevProps){
    if(prevProps.id !== this.props.id){
      this.fetchTodo(this.props.id);
    }
  }
  handleChange(ev){
    this.setState({ name: ev.target.value });
  }
  render(){
    const { name } = this.state;
    const { handleChange, onUpdate } = this;
    return (
      <form onSubmit={ onUpdate }>
        <input value={ name } onChange = { handleChange }/>
        <button disabled={ !name }>Edit</button>
      </form>
    );
  }
}

export default TodoEdit;
