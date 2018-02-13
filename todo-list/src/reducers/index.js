import { combineReducers } from 'redux';
import ToDoItemReducer from './ToDoItemReducer.js';

export default combineReducers({
  todos: ToDoItemReducer
});
