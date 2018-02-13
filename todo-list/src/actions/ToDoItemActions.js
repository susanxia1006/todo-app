import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './Types.js';

let next = 0;

export const AddTodo = text => ({
  type: ADD_TODO,
  text,
  completed: false,
  id: next++
});

export const RemoveTodo = id => ({
  type: REMOVE_TODO,
  id
});

export const ToggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});
