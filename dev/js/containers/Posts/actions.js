import {
  SET_POSTS
} from './constants';

import { app } from '../../utils/firebase';

import { setToastDetails } from '../Toast/actions';

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    app.database().ref('posts')
      .orderByChild('postTime')
      .limitToFirst(10)
      .once('value')
      .then((snapshot) => {
        if(snapshot.val()) {
          dispatch(setPosts(snapshot.val()));
        }
        else {
          dispatch(setToastDetails("no posts at this moment", "info"));
        }
      })
      .catch((error) => {
        dispatch(setToastDetails("Unable to fetch data", "error"));
      });
    dispatch(setPosts());
  };
}
