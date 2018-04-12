import {
  SET_POSTS, FETCH_POSTS, CREATE_NEW_POST
} from './constants';

import { app } from '../../utils/firebase';

import { setToastDetails } from '../Toast/actions';
import { setLoader } from '../Loader/actions';

export function setPosts(posts, currentTime) {
  return {
    type: SET_POSTS,
    posts,
    currentTime,
  };
}

export function fetchPosts(currentTime) {
  return (dispatch) => {
    dispatch(setLoader(true, FETCH_POSTS));
    app.database().ref('posts')
      .orderByChild('postTime')
      .endAt(currentTime)
      .limitToFirst(10)
      .once('value')
      .then((snapshot) => {
        if(snapshot.val()) {
          const snapshotValue = snapshot.val();
          var result = [];
          for(var i in snapshotValue) {
            result.unshift(Object.assign({}, snapshotValue[i], {
                uniqueId: i
              }));
          }

          dispatch(setPosts(result, result[result.length-1].postTime));
          dispatch(setLoader(false, null));
        }
        else {
          dispatch(setToastDetails("no posts at this moment", "info"));
          dispatch(setLoader(false, null));
        }
      })
      .catch((error) => {
        dispatch(setToastDetails("Unable to fetch data", "error"));
        dispatch(setLoader(false, null));
      });
  };
}

export function createNewPost(content, userDetails, currentTime) {
  
  return (dispatch) => {
    dispatch(setLoader(true, CREATE_NEW_POST));
    const timeNow = new Date(),
      newEntry = {
          content: content,
          email: userDetails.email,
          displayName: userDetails.displayName,
          photoUrl: userDetails.photoUrl,
          postTime: timeNow.getTime()
        };

    app.database().ref("posts")
    .push(newEntry)
    .then((snap) => {
      dispatch(setPosts(Object.assign({}, newEntry, {uniqueId: snap.key}), currentTime));
      dispatch(setLoader(false, null));
    });

    
  };
}
