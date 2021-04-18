import { VIEW_STORY, ADD_STORY } from '../actions/types'
import store from '../store';

const initialState = {
    story: null,
    stories: [],
    loading: true,
    error: {}
}


export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log('comment', payload)
    switch (type) {

        case VIEW_STORY:
            return {
                ...state,
                story: payload,
                stories: payload,
                loading: false,
            }
        case ADD_STORY:
            return {
                ...state,
                story: payload,
                stories: [payload, ...state.stories],
                loading: false,
            }
        default:
            return state;
        }
}