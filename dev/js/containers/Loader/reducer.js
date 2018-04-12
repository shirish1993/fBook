import {
  SET_LOADER,
} from './constants';

const initialState = {
  isLoading: false,
  loaderType: null
};

function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADER:
      return Object.assign({}, {
        isLoading: action.isLoading,
        loaderType: action.loaderType,
      });
    default:
      return state;
  }
}

export default loaderReducer;