import {
  SET_COMMENTS, CHANGE_COMMENT_TEXT,
} from './constants';

import { app } from '../../utils/firebase';

import { setToastDetails } from '../Toast/actions';

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

          dispatch(setComments(resourceId, result, result[result.length-1].postTime));
        }
        else {
          dispatch(setComments(resourceId, [], currentTime)); 
          dispatch(setToastDetails("no comment at this moment", "info"));
        }
      })
      .catch((error) => {
        dispatch(setToastDetails("Unable to fetch data", "error"));
      });
  };
}

export function createNewComment(resourceId, content, userDetails, currentTime) {
  return (dispatch) => {
    const timeNow = new Date();
    app.database().ref("comments/" + resourceId)
    .push({
        content: content,
        email: userDetails.email,
        displayName: userDetails.displayName,
        photoUrl: userDetails.photoUrl,
        postTime: timeNow.getTime()
    })
    .then((snap) => {
      dispatch(setComments(resourceId, {content: content,
        email: userDetails.email,
        displayName: userDetails.displayName,
        photoUrl: userDetails.photoUrl,
        uniqueId: snap.key,
        postTime: timeNow.getTime()}, currentTime))
    });

    
  };
}
