import axios from "axios";
import {ROOMS_PAGE_API} from "../urls/AppBaseUrl";
import {GET_ROOM_USERS, RESET_ROOM_USERS} from "./index";


export const GET_ROOM_USERS_ACTION = (roomId) => async (dispatch, getState) => {
    try {
        let res = await axios({
            method:"GET",
            url: ROOMS_PAGE_API + roomId + '/users',
            headers : {
                Authorization : 'Bearer ' + getState().auth.user.token,
            }
        })
        dispatch({
            type:GET_ROOM_USERS,
            payload: {
                [roomId]: res.data.data,
            }
        })
    }catch (e) {

    }
}
export const RESET_ROOM_USERS_ACTION = () => {
    return {
        type: RESET_ROOM_USERS,
    }
}
