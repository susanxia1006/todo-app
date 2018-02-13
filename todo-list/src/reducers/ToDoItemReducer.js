import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions/Types.js';
//import { AddTodo, RemoveTodo, CompleteTodo } from '../actions';

const initialState = [];

function ToDoItemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return [
        ...state,
        {
          text: action.text,
          id: action.id,
          completed: action.completed
        }
      ];
    }
    case REMOVE_TODO: {
      return state.filter((x) => x.id !== action.id);
    }

    case TOGGLE_TODO: {
      return state.map(todo => (todo.id === action.id) ? {
          ...todo,
          completed: !todo.completed
        } : todo);
    }
    default:
      return state;
  }
}

export default ToDoItemReducer;
