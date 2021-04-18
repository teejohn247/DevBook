import {
    ADD_STORY, VIEW_STORY
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const addStory = (data) => dispatch => {
    
    return {
        type:ADD_STORY,
        payload: data
   }

}


export const getStory = () => async dispatch => {
    try{
        const res = await axios.get(`http://localhost:4000/api/v1/story`);
        dispatch({
            type:VIEW_STORY,
            payload: res.data
        })
    } catch(err){
        console.log(err)
        // dispatch({
        //     type:POST_ERROR,
        //     payload: {error: err.response.error, status: err.response.status}
        // })
    }
}

// export const getStory = (data) =>  dispatch => {
    
//     return {
//         type:VIEW_STORY,
//         payload: data
//    }

