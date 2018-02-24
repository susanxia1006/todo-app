import firebase from 'firebase';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions/Types.js';
import db from '../firebase.js';


function toDoItemStateChanger(action) {
  switch (action.type) {
    case ADD_TODO: {
      const key = db.ref('/items').push().key;
      db.ref('/items').child(key).set({ text: action.text, completed: action.completed });
      break; // if there is no return , must break to avoid funky behaviors.
    }
    case REMOVE_TODO: {
      db.ref('/items').child(action.id).remove();
      break;
    }

    case TOGGLE_TODO: {
      db.ref(`/items/${action.id}/completed`).once('value').then((datasnapshot) => {
        db.ref(`/items/${action.id}/completed`).set(!datasnapshot.val());
      });
      break;
    }
    default:
      return;
  }
}


export default toDoItemStateChanger;
