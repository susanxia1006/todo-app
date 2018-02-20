import firebase from 'firebase';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions/Types.js';
import db from '../firebase.js';

const initialState = [];
let s = false;

function ToDoItemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const key = db.ref('/items').push().key;
      db.ref('/items').child(key).set({ text: action.text, completed: action.completed });

      return [
        ...state,
        {
          text: action.text,
          id: key,
          completed: action.completed
        }
      ];
    }
    case REMOVE_TODO: {
      db.ref('/items').child(action.id).remove();
      return state.filter((x) => x.id !== action.id);
    }

    case TOGGLE_TODO: {
      s = !state.filter((x) => x.id === action.id)[0].completed;
      db.ref(`/items/${action.id}/completed`).set(s);

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
