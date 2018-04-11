import {
  SET_USER,
} from './constants';

import { app, facebookProvider } from '../../utils/firebase';

import { setToastDetails } from '../Toast/actions';

export function setUser(userDetails) {
  if (localStorage) {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }
  return {
    type: SET_USER,
    userDetails,
  };
}

export function loginUser() {
  return (dispatch) => {
    app.auth().signInWithPopup(facebookProvider)
    .then((result, error) => {
      if (error) {
        dispatch(setToastDetails("Unable to login at this moment", "error"));
      } else {
        dispatch(setUser({
          displayName: result.user.displayName,
          email: result.user.email,
          photorl: result.user.photorl,
        }))
      }
    })
    .catch((error) => {
      dispatch(setToastDetails("Unable to login at this moment", "error"));
    });
  };
}