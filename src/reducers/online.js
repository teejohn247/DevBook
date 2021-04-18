import { ONLINE } from '../actions/types'
import store from '../store';
import loader from '../actions/loader';

const initialState = {
    onlineUser: null,
    onlineUsers: [],
    loading: true,
    error: {}
}


export default function (state = initialState, action) {

    const { type, payload } = action;

    console.log('online',payload)
    switch (type) {

        case ONLINE:
            return {
                ...state,
               onlineUsers: payload,
               loading: false
            }
        default:
            return state;
    }
}

