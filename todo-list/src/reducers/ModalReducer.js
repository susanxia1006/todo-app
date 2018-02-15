import { OPEN_MODAL, CLOSE_MODAL } from '../actions/Types.js';

const initialState = {
  modalOpen: false
};

function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        modalOpen: action.open
      };
    }
    case CLOSE_MODAL: {
      return {
        modalOpen: action.open
      };
    }
    default:
      return state;
  }
}

export default ModalReducer;
