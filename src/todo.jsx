import { observable, action, computed } from 'mobx';
import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react';

class Todo {
    id = Math.random();
    @observable title = '';
    @observable finished = false;
    @action.bound toggle(){
        this.finished = !this.finished;
    }
    constructor(title){
        this.title = title;
    }
}

class Store {
    @observable todos = [];
    @action.bound createTodo(title){
        this.todos.unshift(new Todo(title));
    }
    @action.bound removeTodo(todo){
        this.todos.remove(todo);
    }
    @computed get left(){
        return this.todos.filter(todo => !todo.finished).length;
    }
}
const store = new Store();

@observer
class TodoList extends Component {
    static propTypes = {
        store: PropTypes.shape({
            createTodo: PropTypes.func,
            todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
        }).isRequired
    };
    state = {
        val: ''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const store = this.props.store;
        const val = this.state.val;
        store.createTodo(val);
        this.setState({ val:'' })
    }
    handleChange = (e) =>{
        const val = e.target.value;
        this.setState({
            val
        })
    }
    render(){
        const store = this.props.store;
        const todos = store.todos;
        return <div className='div'>
            <header>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} value={this.state.val} placeholder='请输入' className='ipt'/>
                </form>
            </header>
            <ul>{todos.map(todo => {
                return <li key={todo.id} className='todo-item'>
                    <TodoItem todo={todo}/>
                    <span className='delete' onClick={e=>store.removeTodo(todo)}>X</span>
                </li>
            })}</ul>
            <footer>{store.left} item(s) unfinished</footer>
        </div>
    }
}
@observer
class TodoItem extends Component {
    static propTypes = {
        todo: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            finished: PropTypes.bool.isRequired
        }).isRequired
    }
    handleClick = (e) => {
        this.props.todo.toggle()
    }
    render(){
        const todo = this.props.todo;
        return <Fragment>
            <input type="checkbox" className='check' checked={todo.finished} onChange={this.handleClick}/>
            <span className={['title',todo.finished && 'finished'].join(' ')}>{todo.title}</span>
        </Fragment>
        
    }
}
ReactDom.render(<TodoList store={store}/>,document.querySelector('#root'));