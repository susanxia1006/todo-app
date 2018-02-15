import { combineReducers } from 'redux';
import ToDoItemReducer from './ToDoItemReducer.js';
import ModalReducer from './ModalReducer.js';

export default combineReducers({
  todos: ToDoItemReducer,
  modal: ModalReducer
});
