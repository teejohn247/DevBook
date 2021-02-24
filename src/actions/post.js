import axios from 'axios';
import { POST, GET_POST, POST_ERROR } from './types';
import { setAlert } from './alert';

export const getPosts = (data) => dispatch => {
       return {
            type:POST,
            payload: data
       }
   
}

export const getCurrentPost = () => async dispatch => {
    try{
        const res = await axios.get(`http://localhost:4000/api/v1/fetchUpdates`);
        dispatch({
            type:GET_POST,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type:POST_ERROR,
            payload: {error: err.response.error, status: err.response.status}
        })
    }
}

// export const getCurrentProfile = () => async dispatch => {
//     //  dispatch({type: CLEAR_PROFILE})
//     let token = localStorage.getItem('token')
//     const config = {
//         headers: {
//             'content-type': 'application/json',
//             'Authorization': token
//         }
//     }
//     try{
//         const res = await axios.get('http://localhost:4000/api/v1/profile');
//         dispatch({
//             type:GET_PROFILE,
//             payload: res.data
//         })
//     } catch(err){
//     // dispatch({type: CLEAR_PROFILE})

//         dispatch({
//             type:PROFILE_ERROR,
//             payload: err
//         })
//     }
// }
// export const createProfile = (formData, history, edit=false) => async dispatch => {
//     const config = {
//         headers: {
//         'content-type': 'application/json'
//         }
//     }
//     try{
//         const res = await axios.post('http://localhost:4000/api/v1/profile', formData, config);
//         dispatch({
//             type:GET_PROFILE,
//             payload: res.data
//         })
//         dispatch (setAlert(edit ? 'profile updated' : 'profile created', 'success'));
//             history.push('/dashboard');
//     } catch(err){
//         const errors = err.response.data.errors
//         if(errors){
//             errors.forEach(error => dispatch(
//                 setAlert(error.msg, 'danger')
//         ))
//         }
//         dispatch({
//             type:PROFILE_ERROR,
//             payload: {error: err.response.error}

//         })
//     }
// }
// export const addEducation = (formData, history) => async dispatch => {
//     const config = {
//         headers: {
//         'content-type': 'application/json'
//         }
//     }
//     try{
//         const res = await axios.post('http://localhost:4000/api/v1/edu', formData, config);
//         dispatch({
//             type:UPDATE_PROFILE,
//             payload: res.data
//         })
//         dispatch (setAlert('Experience Added', 'success'));
//              history.push('/dashboard');
//     } catch(err){
//         const errors = err.response.data.errors
//         if(errors){
//             errors.forEach(error => dispatch(
//                 setAlert(error.msg, 'danger')
//         ))
//         }
//         dispatch({
//             type:PROFILE_ERROR,
//             payload: {error: err.response.error}

//         })
//     }
// }

// export const addExperience = (formData, history) => async dispatch => {
//     const config = {
//         headers: {
//         'content-type': 'application/json'
//         }
//     }
//     try{
//         const res = await axios.post('http://localhost:4000/api/v1/exp', formData, config);
//         dispatch({
//             type:UPDATE_PROFILE,
//             payload: res.data
//         })
//         history.push('/dashboard');
//         dispatch (setAlert('Education Added', 'success'));
//     } catch(err){
//         const errors = err.response.data.errors
//         if(errors){
//             errors.forEach(error => dispatch(
//                 setAlert(error.msg, 'danger')
//         ))
//         }
//         dispatch({
//             type:PROFILE_ERROR,
//             payload: {error: err.response.error}

//         })
//     }
// }

// export const deleteEdu = (edu_id) => async dispatch => {
//     try{
//          const res = await axios.delete(`http://localhost:4000/api/v1/edu/del/${edu_id}`);
//         dispatch({
//             type:DELETE_EDU,
//             payload: res.data
//         })
//         dispatch (setAlert('Successfully deleted', 'success'));
//     } catch(err){
//         const errors = err.response.data.errors
//         if(errors){
//             errors.forEach(error => dispatch(
//                 setAlert(error.msg, 'danger')
//         ))
//         }
//         dispatch({
//             type:PROFILE_ERROR,
//             payload: {error: err.response.error}

//         })
//     }
// }

// export const deleteExp = (exp_id) => async dispatch => {
//     try{
//          const res = await axios.delete(`http://localhost:4000/api/v1/exp/del/${exp_id}`);
//         dispatch({
//             type:UPDATE_PROFILE,
//             payload: res.data
//         })
//         dispatch (setAlert('Successfully deleted', 'success'));
//     }catch(err){
//         const errors = err.response.data.errors
//         if(errors){
//             errors.forEach(error => dispatch(
//                 setAlert(error.msg, 'danger')
//         ))
//         }
//         dispatch({
//             type:PROFILE_ERROR,
//             payload: {error: err.response.error}

//         })
//     }
// }

 