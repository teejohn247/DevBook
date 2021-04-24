import axios from 'axios';
import { NOTIFICATION, FETCH_NOTIFICATIONS, REMOVE_NOTIFICATION, POST_ERROR } from './types';
import { setAlert } from './alert';
import { loader } from './loader';

export const addNotification = (data) => (dispatch, getState) => {
    const state = getState()

       return {
            type:NOTIFICATION,
            payload: data,
            auth: state.auth,
            notification: state.notification
        } 
}

export const fetchNotifications = () => async dispatch => {
    let time = localStorage.getItem('disconnect_time_devbook')
    let notificationtime = localStorage.getItem('notificationTime')

    let tme = notificationtime ? notificationtime : time

    try{
        const res = await axios.get(`https://devbook-node.herokuapp.com/api/v1/notifications/${tme}/1/50`);
        dispatch({
            type:FETCH_NOTIFICATIONS,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type:POST_ERROR,
            payload: err
        })
    }
}

export const removeNotification = (data) => (dispatch, getState) => {
    const state = getState()
    dispatch({
            type:REMOVE_NOTIFICATION,
            payload: data,
            auth: state.auth
    })
}