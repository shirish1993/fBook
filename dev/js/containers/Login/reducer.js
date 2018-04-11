import {
  SET_USER,
} from './constants';

const userDetails = localStorage ? localStorage.getItem('userDetails') : null;

const initialState = {
  userDetails: userDetails ? JSON.parse(userDetails) : null,
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, {
        userDetails: action.userDetails,
      });
    default:
      return state;
  }
}

export default loginReducer;