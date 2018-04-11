import {
  TOAST_DETAILS,
} from './constants';

const initialState = {
  message: null,
  messageType: null,
};

function toastReducer(state = initialState, action) {
  switch (action.type) {
    case TOAST_DETAILS:
      return Object.assign({}, {
        message: action.message,
        messageType: action.messageType,
      });
    default:
      return state;
  }
}

export default toastReducer;