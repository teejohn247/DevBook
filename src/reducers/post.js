import { POST, GET_POST, ADD_LIKE, REMOVE_LIKE, REMOVE_COMMENT_LIKE, ADD_COMMENT, ADD_COMMENT_LIKE } from '../actions/types'

const initialState = {
    post: null,
    posts: [],
    loading: true,
    feedLoader: true,
    error: {}
}


export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log('comment', payload)
    switch (type) {
        case GET_POST:
            return {
                ...state,
                post: payload,
                posts: payload,
                loading: false,
                feedLoader: false
            }
        case POST:
            return {
                ...state,
                post: payload,
                posts: [payload, ...state.posts],
                loading: false,
                feedLoader: false

            }
        case ADD_LIKE:
            return {
                ...state,
                post: payload,
                posts: state.posts.map(post => post.file_id == payload.file_id ? { ...post, likes:{user: payload._id}} : post),
                loading: false
            }
            case ADD_COMMENT_LIKE:
            return {
                ...state,
                post: payload,
                posts: state.posts.map(post => post.file_id == payload.file_id ? {...post, comments:post.comments.map(comment => comment.comment_id == payload.comment_id ? {...comment, commentLikes:[ ...comment.commentLikes, {user: comment.name}]} : comment )} : post ),
                loading: false
            }

            case REMOVE_COMMENT_LIKE:
                return {
                    ...state,
                    posts: state.posts.map(post => post.file_id == payload.file_id ? {...post, comments:post.comments.map(comment => comment.comment_id == payload.comment_id ? {...comment, commentLikes: comment.commentLikes.filter(like => like.user !== comment.name )} : comment )} : post ),
                    loading: false
                }
            case ADD_COMMENT:
                return {
                    ...state,
                    // post: payload,
                    posts: state.posts.map(post => post.file_id == payload.file_id ? { ...post, comments:[...post.comments, {file_id: payload.file_id, comment_id:payload.comment_id, name: payload.name, text: payload.text, commentLikes:[]}]} : post),
                    loading: false
                }
        case REMOVE_LIKE:
            return {
                ...state,
                post: payload,
                // post:[ ...state.post, state.post.likes.filter(like => like._id !== payload._id)],
                posts: state.posts.map(post => post.file._id == payload.file_id ? { ...post, likes: post.likes.filter(like => like._id !== payload._id)} : post),
                loading: false
            }

        default:
            return state;
    }
}