import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
// import { loadingBarMiddleware } from 'react-redux-loading-bar';
// import { globalLoaderMiddleware }  from 'redux-global-loader';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
const store = createStore(
    rootReducer,
    initialState,
    // composeWithDevTools(applyMiddleware(loadingBarMiddleware(), ...middleware))
    composeWithDevTools(applyMiddleware( ...middleware))

)
export default store;