import { ONLINE } from './types';
import { setAlert } from './alert';
import { loader } from './loader';

export const onlineFriends = (data) => (dispatch) => {
       return {
            type:ONLINE,
            payload: data,
        } 
}