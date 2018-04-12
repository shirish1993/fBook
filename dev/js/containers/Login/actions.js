import {
  SET_USER, LOGIN_USER,
} from './constants';

import { app, facebookProvider } from '../../utils/firebase';

import { setToastDetails } from '../Toast/actions';
import { setLoader } from '../Loader/actions';

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
    dispatch(setLoader(true, LOGIN_USER));
    app.auth().signInWithPopup(facebookProvider)
    .then((result, error) => {
      if (error) {
        dispatch(setLoader(false, null));
        dispatch(setToastDetails("Unable to login at this moment", "error"));
      } else {
        dispatch(setLoader(false, null));
        dispatch(setUser({
          displayName: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL,
        }))
      }
    })
    .catch((error) => {
      dispatch(setLoader(false, null));
      dispatch(setToastDetails("Unable to login at this moment", "error"));
    });
  };
}