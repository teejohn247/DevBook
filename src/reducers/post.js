import { POST, GET_POST, ADD_LIKE, REMOVE_LIKE, REMOVE_COMMENT_LIKE, DELETE_POST, ADD_COMMENT, ADD_COMMENT_LIKE } from '../actions/types'
import store from '../store';
import loader from '../actions/loader';

const initialState = {
    post: null,
    posts: [],
    loading: true,
    feedLoader: true,
    like: null,
    error: {}
}


export default function (state = initialState, action) {

    const { type, payload, profile } = action;

    console.log('comment', payload, profile)
    switch (type) {

        case GET_POST:
            return {
                ...state,
                post: payload,
                posts: payload,
                loading: false,
                feedLoader: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.file_id !== payload),
                loading: false
                }
        case POST:
            return {
                // payload.user_id == profile.user ||
                ...state,
                post: payload,
                posts: [profile.profile.friendsList.some(frnd => frnd.user == payload.user_id ? payload : payload.user_id == profile.user ? payload : ''), ...state.posts],
                loading: false,
                feedLoader: false
            }
        case ADD_COMMENT:
                return {
                    ...state,
                    post: payload,
                    posts: state.posts.map(post => post.file_id == payload.file_id ? { ...post, comments:[...post.comments, {file_id: payload.file_id, comment_id:payload.comment_id, name: payload.name, text: payload.text, commentLikes:[]}]} : post),
                    loading: false
                }
        case ADD_LIKE:
            return {
                ...state,
                post: payload,
                posts: state.posts.map(post => post.file_id == payload.file_id ? { ...post,  likes:[...post.likes, {user: payload._id, like_req:payload.like}]} : post),
                loading: false
            }
            case ADD_COMMENT_LIKE: 
            return {
                ...state,
                post: payload,
                posts: state.posts.map(post => post.file_id == payload.file_id ? {...post, comments:post.comments.map(comment => comment.comment_id == payload.comment_id ? {...comment, commentLikes:[ ...comment.commentLikes, {user: payload.name}]} : comment )} : post ),
                loading: false
            }

            case REMOVE_COMMENT_LIKE:
                return {
                    ...state,
                    posts: state.posts.map(post => post.file_id == payload.file_id ? {...post, comments:post.comments.map(comment => comment.comment_id == payload.comment_id ? {...comment, commentLikes: comment.commentLikes.filter(like => like.user !== payload.name )} : comment )} : post ),
                    loading: false
                }
            
        case REMOVE_LIKE:
            return {
                ...state,
                like: payload.like,
                // post:[ ...state.post, state.post.likes.filter(like => like._id !== payload._id)],
                posts: state.posts.map(post => post.file_id == payload.file_id ? { ...post, likes: post.likes.filter(like => like.user !== payload._id)} : post),
                loading: false
            }

        default:
            return state;
    }
}
