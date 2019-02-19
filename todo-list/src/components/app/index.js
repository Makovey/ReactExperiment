import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './index.css';

export default class App extends Component {

    newId = 1;

    state = {
        todoData: [
            this.createTodoItem('Do Something')
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.newId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            };
        });
    };

    toggleProp (arr, id, propName){
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    onImportant = (id) => {
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProp(todoData, id, 'important')
            };
        });
    };

    onDone = (id) => {
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProp(todoData, id, 'done')
            };
        });
    };

    onFilter = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    search(items, term){

        if(term.length === 0){
            return items;
        }

        return items.filter((item) => {
           return item.label.toLowerCase().indexOf(term.toLocaleString()) > -1;
        });
    }

    filter(items, filter){
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }



    render() {
        const {todoData, term, filter} = this.state;

        const visibleList = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onFilter = {this.onFilter}/>
                    <ItemStatusFilter
                        onFilterChange={this.onFilterChange}
                        filter={filter}/>
                </div>
                <TodoList
                    todos={visibleList}
                    onDeleted={this.deleteItem}
                    onImportant={this.onImportant}
                    onDone={this.onDone}
                />
                <AddItem addItem={this.addItem}/>
            </div>
        );
    };
}