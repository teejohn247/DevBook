import { NOTIFICATION, FETCH_NOTIFICATIONS, REMOVE_NOTIFICATION } from '../actions/types'
import store from '../store';
import loader from '../actions/loader';

const initialState = {
    notification: null,
    notifications: [],
    totalNotifications: null,
    loading: true,
    error: {}
}


export default function (state = initialState, action) {

    const { type, payload, auth, notification } = action;

    console.log('online', payload)
    switch (type) {

        case NOTIFICATION:
            localStorage.setItem('receiver', payload.receiver_id)
            return {
                ...state,
                notifications: [...state.notifications, (auth.user._id == payload.receiver_id) ? { ...payload } : {...state.notifications}],
                totalNotifications: state.totalNotifications + 1,
                loading: false
            }
        case FETCH_NOTIFICATIONS:
            return {
                ...state,
                notifications: payload,
                totalNotifications: payload[payload.length - 1].totalNotifications,
                loading: false
            }
        case REMOVE_NOTIFICATION:
            var receiver = localStorage.getItem("receiver")
            return {
                ...state,
                totalNotifications: 0
            }
        default:
            return state;
    }
}

