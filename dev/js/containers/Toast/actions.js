import {
  TOAST_DETAILS,
} from './constants';

export function setToastDetails(message, messageType) {
  return {
    type: TOAST_DETAILS,
    message,
    messageType,
  };
}