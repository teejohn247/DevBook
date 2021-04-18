import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, EDIT_PROFILE, CLEAR_PROFILE, UPDATE_PROFILE,GET_PROFILES, DELETE_EDU,
     DELETE_EXP, ADD_FRIEND, ACCEPT_FRIEND, REJECT_FRIEND, SEARCH_USER } from './types';
import { setAlert } from './alert';

export const getProfiles = () => async dispatch => {
    // dispatch({type: CLEAR_PROFILE})
    try{
        const res = await axios.get('http://localhost:4000/api/v1/allprofiles');
        dispatch({
            type:GET_PROFILES,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {error: err.response.error, status: err.response.status}
        })
    }
}

export const getFriendsProfiles = () => async dispatch => {
    // dispatch({type: CLEAR_PROFILE})
    try{
        const res = await axios.get('http://localhost:4000/api/v1/getProfiles');
        dispatch({
            type:GET_PROFILES,
            payload: res.data.records
        })
    } catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {error: err.response.error, status: err.response.status}
        })
    }
}

export const addFriend = (data) => (dispatch, getState) => {
    console.log({data})
    const state = getState()

    return {
        type:ADD_FRIEND,
        payload: data,
        auth: state.auth

    }
}


export const confirmFriend = (data) => dispatch => {
    console.log({data})
    return {
        type:ACCEPT_FRIEND,
        payload: data
    }
}


export const getProfileById = (userId) =>async (dispatch, getState)=> {
    const state = getState()
    let ID;
    if(state.auth.user){
    let id = state.auth.user._id
    console.log('sql', id)
    if(userId == null || userId == undefined){
        ID = id
    }else{
        ID = userId
    }

    
    try{
        const res = await axios.get(`http://localhost:4000/api/v1/profile/${ID}`);
        console.log('sql2', res.data)
        
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
        return;
        
    } catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {error: err.response.error, status: err.response.status}
        })
    }
}
}

// export const getProfileById = (userId) => async dispatch => {
//     try{
//         const res = await axios.get(`/api/v1/specific/${userId}`);
//         dispatch({
//             type:SEARCH_USER,
//             payload: res.data
//         })
//     } catch(err){
//         dispatch({
//             type:PROFILE_ERROR,
//             payload: {error: err.response.error, status: err.response.status}
//         })
//     }
// }

export const getCurrentProfile = () => async dispatch => {
    //  dispatch({type: CLEAR_PROFILE})
    let token = localStorage.getItem('token')
    const config = {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    }
    try{
        const res = await axios.get('http://localhost:4000/api/v1/profile');
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
    } catch(err){
    // dispatch({type: CLEAR_PROFILE})

        dispatch({
            type:PROFILE_ERROR,
            payload: err
        })
    }
}
export const createProfile = (formData, history, edit=false) => async dispatch => {
    const config = {
        headers: {
        'content-type': 'application/json'
        }
    }
    try{
        const res = await axios.post('http://localhost:4000/api/v1/profile', formData, config);
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
        dispatch (setAlert(edit ? 'profile updated' : 'profile created', 'success'));
            history.push('/dashboard');
    } catch(err){
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
        ))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {error: err.response.error}

        })
    }
}

export const editProfile = (data) => async dispatch => {
    const config = {
        headers: {
        'content-type': 'application/json'
        }
    }
    try{
        const res = await axios.patch('http://localhost:4000/api/v1/editProfile', data, config);
        dispatch({
            type:EDIT_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Profile updated', 'success-grn'));
            // history.push('/dashboard');
    } catch(err){
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
        ))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {error: err.response.error}

        })
    }
}

export const addEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
        'content-type': 'application/json'
        }
    }
    try{
        const res = await axios.post('http://localhost:4000/api/v1/edu', formData, config);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        dispatch (setAlert('Experience Added', 'success'));
             history.push('/dashboard');
    } catch(err){
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
        ))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {error: err.response.error}
        })
    }
}

export const addExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
        'content-type': 'application/json'
        }
    }
    try{
        const res = await axios.post('http://localhost:4000/api/v1/exp', formData, config);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        history.push('/dashboard');
        dispatch (setAlert('Education Added', 'success'));
    } catch(err){
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
        ))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {error: err.response.error}

        })
    }
}

export const deleteEdu = (edu_id) => async dispatch => {
    try{
         const res = await axios.delete(`http://localhost:4000/api/v1/edu/del/${edu_id}`);
        dispatch({
            type:DELETE_EDU,
            payload: res.data
        })
        dispatch (setAlert('Successfully deleted', 'success'));
    } catch(err){
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
        ))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {error: err.response.error}

        })
    }
}

export const deleteExp = (exp_id) => async dispatch => {
    try{
         const res = await axios.delete(`http://localhost:4000/api/v1/exp/del/${exp_id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        dispatch (setAlert('Successfully deleted', 'success'));
    }catch(err){
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
        ))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {error: err.response.error}

        })
    }
}

 