import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import alert from './alert';
import post from './post'


export default combineReducers({
    auth,
    profile,
    post,
    alert
})