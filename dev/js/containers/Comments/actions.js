import {
  SET_COMMENTS, CHANGE_COMMENT_TEXT, FETCH_COMMENTS, CREATE_NEW_COMMENT,
} from './constants';

import { app } from '../../utils/firebase';

import { setToastDetails } from '../Toast/actions';
import { setLoader } from '../Loader/actions';

export function setComments(resourceId, comments, currentTime) {
  return (dispatch) => {
    dispatch(changeCommentText("", resourceId));
    dispatch({
      type: SET_COMMENTS,
      resourceId,
      comments,
      currentTime,
    });
  }
}

export function changeCommentText(text, resourceId) {
  return {
    type: CHANGE_COMMENT_TEXT,
    resourceId,
    text,
  };
}

export function fetchComments(resourceId, currentTime) {
  return (dispatch) => {
    dispatch(setLoader(true, FETCH_COMMENTS + resourceId));
    app.database().ref('comments/' + resourceId)
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

          dispatch(setLoader(false, null));
          dispatch(setComments(resourceId, result, result[result.length-1].postTime));
        }
        else {
          dispatch(setLoader(false, null));
          dispatch(setComments(resourceId, [], currentTime)); 
          dispatch(setToastDetails("No comment for this post", "info"));
        }
      })
      .catch((error) => {
        dispatch(setLoader(false, null));
        dispatch(setToastDetails("Unable to fetch data", "error"));
      });
  };
}

export function createNewComment(resourceId, content, userDetails, currentTime) {
  return (dispatch) => {
    dispatch(setLoader(true, CREATE_NEW_COMMENT + resourceId));
    const timeNow = new Date();
    const newEntry = {
      content: content,
      email: userDetails.email,
      displayName: userDetails.displayName,
      photoUrl: userDetails.photoUrl,
      postTime: timeNow.getTime()
    };

    app.database().ref("comments/" + resourceId)
    .push(newEntry)
    .then((snap) => {
      dispatch(setComments(resourceId, Object.assign({}, newEntry, {
        uniqueId: snap.key
      }), currentTime));
      dispatch(setLoader(false, null));
    });

    
  };
}
