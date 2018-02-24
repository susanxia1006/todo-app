import { combineReducers } from 'redux';
import toDoItemStateChanger from './ToDoItemReducer.js';
import ModalReducer from './ModalReducer.js';

const Reducer = combineReducers({
  modal: ModalReducer
});

export { Reducer, toDoItemStateChanger };
