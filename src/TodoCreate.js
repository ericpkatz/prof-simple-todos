import React, { Component } from 'react';

class TodoCreate extends Component{
  constructor(props){
    super();
    this.state = {
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }
  onCreate(ev){
    ev.preventDefault();
    this.props.createTodo({ name: this.state.name })
      .then(()=> this.props.history.push('/todos'));
  }
  handleChange(ev){
    this.setState({ name: ev.target.value });
  }
  render(){
    const { name } = this.state;
    const { handleChange, onCreate } = this;
    return (
      <form onSubmit={ onCreate }>
        <input value={ name } onChange = { handleChange }/>
        <button disabled={ !name }>Create</button>
      </form>
    );
  }
}

export default TodoCreate;
