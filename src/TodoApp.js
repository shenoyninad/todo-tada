import React from 'react';
import './App.css';

class TodoApp extends React.Component {
  constructor(props){
    super(props);
    this.state = { items: [], itemsDone: [], itemsClose: [], text: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  render(){
    return (
      <div className="header">
        <h3>TODO LIST</h3>
        <TodoList items={this.state.items} handleDone={this.handleDone} handleClose={this.handleClose}/>
        <form>
        <label 
          htmlFor="new-todo">What will you do today? :
        </label> <br />
        <input 
          id="new-todo"
          className = "new-todo"
          onChange = {this.handleChange}
          value = {this.state.text}
        />
        <button className="button-add" onClick = {this.handleSubmit}>Add #{this.state.items.length + 1}</button>
        </form>
        <h3>Things Completed <i className="fas fa-check-circle"></i></h3>
        <TodoDone itemsDone={this.state.itemsDone} />
        <h3>Things Closed <i className="fas fa-times-circle"></i></h3>
        <TodoClose itemsClose={this.state.itemsClose} />
      </div>
    );
  }

  handleChange(e)
  {
    console.log(e);
    this.setState({ text: e.target.value});
  }

  handleSubmit(e)
  {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
  
    const newItem = {
      text: this.state.text,
      id: Date.now()
    }

    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  handleClose = (e) =>
  {
    var itemId = e.target.value;
    var itemsTemp = this.state.items;
    var itemsOriginal = this.state.items;
    for(var count = 0; count < itemsTemp.length; count++) {
      if(itemId == itemsTemp[count].id) {
        const itemClose = {
          id: itemId,
          text: itemsTemp[count].text
        }

        itemsOriginal.splice(count, 1);

        this.setState(state => ({
          itemsClose: state.itemsClose.concat(itemClose),
          items: itemsOriginal
        }));
      }
    }
  }

  handleDone = (e) =>
  {
    var itemId = e.target.value;
    var itemsTemp = this.state.items;
    var itemsOriginal = this.state.items;
    for (var count = 0; count < itemsTemp.length; count++) {
      if (itemId == itemsTemp[count].id) {
        const itemDone = {
          id: itemId,
          text: itemsTemp[count].text
        }

        itemsOriginal.splice(count, 1);

        this.setState(state =>({
          itemsDone: state.itemsDone.concat(itemDone),
          items: itemsOriginal
        }));
      }
    }
  }
}


class TodoList extends React.Component {
  render(){
    return(
      <ul>
        {this.props.items.map(item => (<li key={item.id} className ="list-type">{item.text}
          <button className="btn-done" value={item.id} onClick={this.props.handleDone}><i className="fas fa-check-circle done-icon"></i></button>
          <button className="btn-close" value={item.id} onClick={this.props.handleClose}><i className = "fas fa-times-circle close-icon"></i></button></li>))}
      </ul>
    );
  }
}

class TodoDone extends React.Component {
  render(){
    return(
      <div>
        <ul>
          {this.props.itemsDone.map(item => (<li>{item.text}</li>))}
        </ul>
      </div>
    );
  }
}

class TodoClose extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.itemsClose.map(item => (<li>{item.text}</li>))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
