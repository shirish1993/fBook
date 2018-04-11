import {
  SET_POSTS
} from './constants';

import { app } from '../../utils/firebase';

import { setToastDetails } from '../Toast/actions';

export function setPosts(posts, currentTime) {
  return {
    type: SET_POSTS,
    posts,
    currentTime,
  };
}

export function fetchPosts(currentTime) {
  return (dispatch) => {
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
            result.push(Object.assign({}, snapshotValue[i], {
                uniqueId: i
              }));
          }

          dispatch(setPosts(result, result[result.length-1].postTime));
        }
        else {
          dispatch(setToastDetails("no posts at this moment", "info"));
        }
      })
      .catch((error) => {
        dispatch(setToastDetails("Unable to fetch data", "error"));
      });
  };
}

export function createNewPost(content, userDetails, currentTime) {
  return (dispatch) => {
    const timeNow = new Date();
    app.database().ref("posts")
    .push({
        content: content,
        email: userDetails.email,
        displayName: userDetails.displayName,
        photoUrl: userDetails.photoUrl,
        postTime: timeNow.getTime()
    })
    .then((snap) => {
      dispatch(setPosts({content: content,
        email: userDetails.email,
        displayName: userDetails.displayName,
        photoUrl: userDetails.photoUrl,
        uniqueId: snap.key,
        postTime: timeNow.getTime()}, currentTime))
    });

    
  };
}
