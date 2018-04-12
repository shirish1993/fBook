import {
  SET_COMMENTS,
  CHANGE_COMMENT_TEXT
} from './constants';

const currentTime = new Date();
const initialState = {
  comments: {},
  commentText: {},
};

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMMENTS:
      var newComment = {};
      newComment[action.resourceId] = [].concat(state.comments[action.resourceId] ? state.comments[action.resourceId] : [], action.comments);

      return Object.assign({}, state, {
        comments: Object.assign({}, state.comments, newComment)
      })
    case CHANGE_COMMENT_TEXT:
      var newCommentText = {};
      newCommentText[action.resourceId] = action.text;

      return Object.assign({}, state, {
        commentText: Object.assign({}, state.commentText, newCommentText)
      })
    default:
      return state;
  }
}

export default postsReducer;
