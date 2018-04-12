import {
  SESSION_TIMER,
} from './constants';

export function setSessionTimer(sessionTimer) {
  return {
    type: SESSION_TIMER,
    sessionTimer,
  };
}