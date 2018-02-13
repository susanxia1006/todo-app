import {
  createStore,
} from 'redux';


import Reducer from '../reducers';
import { AddTodo, RemoveTodo, ToggleTodo } from '../actions';

const Store = createStore(
  Reducer,
);

export default Store;

// debug code
console.log(Store.getState().todos);

//log SelectionReducer each time the state changes
const unsubsribe = Store.subscribe(() => {
  console.log(Store.getState().todos);
});

Store.dispatch(AddTodo('sup'));
Store.dispatch(AddTodo('suuup'));
Store.dispatch(ToggleTodo(1));
Store.dispatch(AddTodo('hello'));
Store.dispatch(RemoveTodo(1));
Store.dispatch(ToggleTodo(2));
Store.dispatch(RemoveTodo(2));
