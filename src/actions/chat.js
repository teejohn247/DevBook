import { ONLINE, FETCH_CHATS, CHAT } from './types';
import axios from 'axios';

import { setAlert } from './alert';
import { loader } from './loader';


// export const postTasks = (formData) => async dispatch => {
//     const config = {
//         headers: {
//         'content-type': 'application/json'
//         }
//     }
//     try{
//         const res = await axios.post('https://moore-advice-task.herokuapp.com/api/v1/addTask', formData, config);

export const fetchChats = (data) => async dispatch => {
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
    console.log({data})
    try {
        const res = await axios.post('http://localhost:4000/api/v1/fetchChats', data, config);
        console.log({res})
        dispatch({
            type: FETCH_CHATS,
            payload: res.data
        })
    } catch (err) {
        // dispatch({
        //     type:POST_ERROR,
        //     payload: {error: err.response.error, status: err.response.status}
        // })
    }
}


export const chat = (data) => (dispatch, getState) => {
    console.log({ data })
    const state = getState()
    return {
        type: CHAT,
        payload: data,
        auth: state.auth

    }
}
