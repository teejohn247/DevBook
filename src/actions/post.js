import axios from 'axios';
import { POST, GET_POST, ADD_LIKE,DELETE_POST, ADD_COMMENT, REMOVE_LIKE, REMOVE_COMMENT_LIKE, ADD_COMMENT_LIKE, POST_ERROR } from './types';
import { setAlert } from './alert';
import { loader } from './loader';

export const getPosts = (data) => (dispatch, getState) => {
    const state = getState()
       return {
            type:POST,
            payload: data,
            profile: state.profile
        } 
}


export const addComment = (data) => dispatch => {
    // console.log({data})
//     dispatch({
//         type:ADD_COMMENT,
//         payload: data
//    })
  return {
        dispatch: dispatch,
        type:ADD_COMMENT,
        payload: data
    }
  

}

export const addLike = (data) => dispatch => {
    return {
         type:ADD_LIKE,
         payload: data
    }
}

export const addCommentLike = (data) => dispatch => {
    return {
        type:ADD_COMMENT_LIKE,
        payload: data
   }
    // dispatch({
    //      type:ADD_COMMENT_LIKE,
    //      payload: data
    // })
}


export const removeCommentLike = (data) => dispatch => {
    return {
        type:REMOVE_COMMENT_LIKE,
        payload: data
   }
    // dispatch({
    //      type:REMOVE_COMMENT_LIKE,
    //      payload: data
    // })
}




export const removeLike = (data) => dispatch => {

    return {
         type:REMOVE_LIKE,
         payload: data
    }

}

export const getCurrentPost = () => async dispatch => {
    try{
        const res = await axios.get(`https://devbook-node.herokuapp.com/api/v1/fetchUpdates`);
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
//         const res = await axios.get('https://devbook-node.herokuapp.comprofile');
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
    // const config = {
    //     headers: {
    //     'content-type': 'application/json'
    //     }
    // }
    // try{
    //     const res = await axios.post('https://devbook-node.herokuapp.comprofile', formData, config);
    //     dispatch({
    //         type:GET_PROFILE,
    //         payload: res.data
    //     })
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
//         const res = await axios.post('https://devbook-node.herokuapp.comedu', formData, config);
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
//         const res = await axios.post('https://devbook-node.herokuapp.comexp', formData, config);
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

export const deletePost = (data) => {

        return {
            type:DELETE_POST,
            payload: data.file_id
        }
}
        //  const res = await axios.delete(`https://devbook-node.herokuapp.comdel/post/${file_id}`);
        // dispatch({
        //     type:DELETE_POST,
        //     payload: file_id
        // })
        // dispatch (setAlert('Successfully deleted', 'success'));
    // } catch(err){
    //     const errors = err.response.data.errors
    //     if(errors){
    //         errors.forEach(error => dispatch(
    //             setAlert(error.msg, 'danger')
    //     ))
    //     }
    //     dispatch({
    //         type:POST_ERROR,
    //         payload: {error: err.response.error, status: err.response.status}
    //     })
    // }
// }

// export const deleteExp = (exp_id) => async dispatch => {
//     try{
//          const res = await axios.delete(`https://devbook-node.herokuapp.comexp/del/${exp_id}`);
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

 