import {
    GET_PROFILE, PROFILE_ERROR, EDIT_PROFILE, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES,
    DELETE_EDU, DELETE_EXP, ACCEPT_FRIEND, REJECT_FRIEND, ADD_FRIEND, SEARCH_USER
} from '../actions/types';

const initialState = {
    profile: null,
    // showLoading: false,
    profiles: [],
    searchedProfile: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload, auth } = action;
    switch (type) {
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case EDIT_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case SEARCH_USER:
            return {
                ...state,
                searchedProfile: payload,
                loading: false
            }
        case ADD_FRIEND:
            return {
                ...state,
                // data.receiver == user._id || data.sender == user._id
                //         condition1 ? value1
                //  : condition2 ? value2
                //  : condition3 ? value3
                //  : value4;
                profile: state.profile.user == payload.receiver ? { ...state.profile, friendRequests: [...state.profile.friendRequests, { user: payload.sender, username: payload.senderName, email: payload.senderEmail, image: payload.senderImage }] } :
                    payload.sender == state.profile.user ? { ...state.profile, sentRequests: [...state.profile.sentRequests, { user: payload.receiver, username: payload.receiverName }] } : '',
                loading: false
            }
        case ACCEPT_FRIEND:
            return {
                ...state,
                profile: state.profile.user == payload.receiver ? { ...state.profile, friendRequests: state.profile.friendRequests.filter(req => req.user !== payload.sender), friendsList: [...state.profile.friendsList, { user: payload.sender, username: payload.senderName, email: payload.senderEmail }] } :
                    state.profile.user == payload.sender && { ...state.profile, friendsList: [...state.profile.friendsList, { user: payload.receiver, username: payload.receiverName, email: payload.receiverEmail }] },
                loading: false
            }
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case DELETE_EDU:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state;
    }

}