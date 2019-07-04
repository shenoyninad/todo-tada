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
    this.handleMove = this.handleMove.bind(this);
  }
  render(){
    return (
      <div className="header">
        <h3>TODO LIST</h3>
        <label
          htmlFor="new-todo">What will you do today?
          <span className="total-points"> Points up for grabs: {this.state.items.length * 10}</span>
          <i className="fas fa-arrow-circle-up"></i>
        </label>
        <TodoList items={this.state.items} handleDone={this.handleDone} handleClose={this.handleClose}/>
        <form>
        <input 
          id="new-todo"
          className = "new-todo"
          onChange = {this.handleChange}
          value = {this.state.text}
        />
        <button className="button-add" onClick = {this.handleSubmit}>Add #{this.state.items.length + 1}</button>
        </form>
        <h3>Things Completed <i className="fas fa-check-circle"></i>  <span className="done-points"> +{this.state.itemsDone.length * 10}</span></h3>
        <TodoDone itemsDone={this.state.itemsDone} />
        <h3>Things Closed <i className="fas fa-times-circle"></i>  <span className="close-points"> -{this.state.itemsClose.length * 10}</span></h3>
        <TodoClose itemsClose={this.state.itemsClose} handleMove={this.handleMove}/>
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
    let itemId = e.target.value;
    let itemsTemp = this.state.items;
    let itemsOriginal = this.state.items;
    for(let count = 0; count < itemsTemp.length; count++) {
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
    let itemId = e.target.value;
    let itemsTemp = this.state.items;
    let itemsOriginal = this.state.items;
    for (let count = 0; count < itemsTemp.length; count++) {
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

  handleMove = (e) => {
    let itemId = e.target.value;
    let itemsTemp = this.state.itemsClose;
    let itemsOriginal = this.state.itemsClose;
    for(let count = 0; count< itemsTemp.length; count++) {
      if(itemId == itemsTemp[count].id) {
        const itemMove = {
          id: itemId,
          text: itemsTemp[count].text
        }

        itemsOriginal.splice(count, 1);

        this.setState(state => ({
          items: state.items.concat(itemMove),
          itemsClose: itemsOriginal
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
          {this.props.itemsClose.map(item => (<li>{item.text}
            <button className="btn-move" value={item.id} onClick={this.props.handleMove}><i className="fas fa-arrow-circle-up move-icon"></i></button></li>))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
