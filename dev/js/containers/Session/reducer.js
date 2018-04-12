import {
  SESSION_TIMER,
} from './constants';

const initialState = {
  sessionTimer: null
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_TIMER:
      return Object.assign({}, {
        sessionTimer: action.sessionTimer,
      });
    default:
      return state;
  }
}

export default sessionReducer;