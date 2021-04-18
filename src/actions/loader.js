import { SET_LOADER, REMOVE_LOADER } from './types';

export const loader = () => dispatch => {
    dispatch ({
        type: SET_LOADER,
        payload: true
    });
    // setTimeout(()=> dispatch({type: REMOVE_ALERT, payload:id}), 5000 )
}

export const removeLoader = () => dispatch => {
    dispatch ({
        type: REMOVE_LOADER,
        payload: false
    });
    // setTimeout(()=> dispatch({type: REMOVE_ALERT, payload:id}), 5000 )
}