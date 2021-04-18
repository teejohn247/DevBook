import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'
import auth from './auth';
import profile from './profile';
import alert from './alert';
import post from './post';
import story from './story';
import online from './online';
import loading from './loader';
import chat from './chat';
import notification from './notification';
// import { loadingAll } from 'redux-global-loader';








export default combineReducers({
    auth,
    loading,
    // loadingAll,
    profile,
    post,
    alert,
    online,
    chat,
    notification,
    story,
    // loadingBar: loadingBarReducer,
})