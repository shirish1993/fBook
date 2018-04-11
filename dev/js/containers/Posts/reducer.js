import {
  SET_POSTS,
} from './constants';

const currentTime = new Date();
const initialState = {
  posts: [],
  currentTime: currentTime.getTime(),
};

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return Object.assign({}, state, {
        posts: [].concat(state.posts, action.posts)
      });
    default:
      return state;
  }
}

export default postsReducer;
