import {
    TOAST_DETAILS,
} from './constants';

export function setToastDetails(message, messageType) {
    
    return (dispatch) => {
        if(message) {
            // dispatch another action after 3 seconds
            setTimeout(() => {
                dispatch({
                    type: TOAST_DETAILS,
                    message: null,
                    messageType: null
                })    
            }, 3000);
            
        }
        dispatch({
            type: TOAST_DETAILS,
            message,
            messageType,
        });
    }
    
}