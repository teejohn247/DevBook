import axios from 'axios';
import {
    REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL,
    USER_LOADED, AUTH_ERROR, LOGOUT, CLEAR_PROFILE
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});
    try {
        const res = await axios.post('http://localhost:4000/api/v1/signup', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert('Account Created, you may login', 'success-grn'));
        //  history.push('/login');
    } catch (err) {
        console.log(err.response.data.error)
        const errors = err.response.data.error
        if (errors) {
            dispatch(setAlert(errors, 'error'))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('http://localhost:4000/api/v1/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert('Success', 'success-grn'));
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.error
        if (errors) {
            dispatch(setAlert(errors, 'error'))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('http://localhost:4000/api/v1/user');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.error
        if (errors) {
            // dispatch(setAlert(errors, 'error'))
        }
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT,
    })
}