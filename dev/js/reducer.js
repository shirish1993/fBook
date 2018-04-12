import {combineReducers} from 'redux';
import loginReducer from './containers/Login/reducer';
import toastReducer from './containers/Toast/reducer';
import postsReducer from './containers/Posts/reducer';
import commentsReducer from './containers/Comments/reducer';
import sessionReducer from './containers/Session/reducer';

const allReducers = combineReducers({
    login: loginReducer,
    toast: toastReducer,
    posts: postsReducer,
    comments: commentsReducer,
    session: sessionReducer,
});

export default allReducers;
