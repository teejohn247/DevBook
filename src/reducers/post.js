import {POST,GET_POST } from '../actions/types'

const initialState = {
    post: null,
    posts: [],
    loading:true,
    error: {}
}


export default function (state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        case GET_POST:
            return {
                ...state,
                post:payload,
                posts: payload,
                loading: false
            }
        case POST:
        return {
            ...state,
            post:payload,
            posts: [payload, ...state.posts],
            loading: false
        }
        default:
        return state;
    }
}