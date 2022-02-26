import axios from "axios";
import {PROFILE_PAGE_API, ROOMS_PAGE_API} from "../urls/AppBaseUrl";
import {GET_ROOM_USERS, GET_USERS, RESET_ROOM_USERS} from "./index";
import { HIDE_MODAL_ACTION, SHOW_TOAST_ACTION } from "./popupsActions";


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


export const SEARCH_USERS_ACTION = (searchUser) => async (dispatch, getState) => {
    try {
        let res = await axios({
            method:"GET",
            url: PROFILE_PAGE_API,
            params: {
                email: searchUser,
            },
            headers : {
                Authorization : 'Bearer ' + getState().auth.user.token,
            }
        })
        dispatch({
            type:GET_USERS,
            payload: res.data.data
        })
    }catch (e) {

    }
} 

export const INVITE_USER_ACTION = (roomId, user) => async (dispatch, getState) => {
    try {
        let res = await axios({
            method:"POST",
            url: ROOMS_PAGE_API + roomId + '/users/' + user.id + '/invite' ,
            headers : {
                Authorization : 'Bearer ' + getState().auth.user.token,
            }
        })
        dispatch(SHOW_TOAST_ACTION('success', 'Successfully invited ' + user.name))
        dispatch(HIDE_MODAL_ACTION())
    }catch (e) {
        dispatch(SHOW_TOAST_ACTION('Error', 'failed to invite user ' + user.name))
    }
} 