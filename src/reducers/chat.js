import { FETCH_CHATS, CHAT } from '../actions/types'
import store from '../store';
import loader from '../actions/loader';

const initialState = {
    chat: null,
    chats: [],
    loading: true,
    error: {}
}


export default function (state = initialState, action) {

    const { type, payload, auth } = action;

    console.log('chat', payload)
    switch (type) {

        case FETCH_CHATS:
            return {
                ...state,
                chat: payload,
                chats: payload,
                loading: false
            }
        case CHAT:
            return {
                ...state,
                chat: [...state.chat, (auth.user._id == payload.user || auth.user._id == payload.receiver_id) && {...payload}],
                chats: [...state.chat, (auth.user._id == payload.user || auth.user._id == payload.receiver_id )&& {...payload}],
                loading: false
            }
        default:
            return state;
    }
}

