import { SET_LOADER, REMOVE_LOADER } from '../actions/types'

const initialState = {
    pageLoading: false
};

export default function (state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        
        case SET_LOADER:
        return {
            pageLoading: payload
        }

        case REMOVE_LOADER:
        return {
            pageLoading: payload
        }
        
        // case REMOVE_ALERT:
        // return state.filter(alert => alert.id !== payload);
        
        default:
        return state;
    }
}