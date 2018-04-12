import {
  SET_LOADER,
} from './constants';

export function setLoader(isLoading, loaderType) {
  return {
    type: SET_LOADER,
    isLoading,
    loaderType,
  };
}