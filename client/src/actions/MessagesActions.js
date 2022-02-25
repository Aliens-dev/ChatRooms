import axios from 'axios'
import {ROOMS_PAGE_API} from "../urls/AppBaseUrl";
import {GET_MESSAGES, GET_ROOMS, START_MESSAGES_LOADING, STOP_MESSAGES_LOADING, UPDATE_ACTIVE_USERS, UPDATE_JOINED_USERS, UPDATE_LEAVING_USERS, UPDATE_MESSAGES, UPDATE_TYPING_USER} from "./index";

export const GET_MESSAGES_ACTION = (roomId) => async (dispatch,getState) => {
    try {
        let res = await axios({
            url:ROOMS_PAGE_API+roomId+'/messages',
            method:'GET',
            headers : {
                authorization : 'Bearer '+ getState().auth.user.token,
            }
        })
        dispatch({
            type: GET_MESSAGES,
            payload:res.data.data
        })
        dispatch(STOP_MESSAGES_LOADING_ACTION())
        // handle Success
    }catch(e){
        dispatch(STOP_MESSAGES_LOADING_ACTION())
        // handle this
    }
}


export const SEND_MESSAGE_ACTION = (roomId, message) => (dispatch, getState) => {
    return new Promise(async(resolve, reject) => {
        try {
            let res = await axios({
                url:ROOMS_PAGE_API+roomId+'/messages',
                method:'POST',
                data: {
                    message,
                },
                headers : {
                    authorization : 'Bearer '+ getState().auth.user.token,
                }
            })
            //dispatch(UPDATE_MESSAGES_ACTION(message))
            resolve(res)
        }catch(e) {
            reject(e)
        }
    })
}

export const UPDATE_MESSAGES_ACTION = (message) => {
    return {
        type: UPDATE_MESSAGES,
        payload: message
    }
}

export const UPDATE_ACTIVE_USERS_ACTION = (users) => {
    return {
        type: UPDATE_ACTIVE_USERS,
        payload: users,
    }
}
export const UPDATE_JOINED_USERS_ACTION = (user) => {
    return {
        type: UPDATE_JOINED_USERS,
        payload: user,
    }
}
export const UPDATE_LEAVING_USERS_ACTION = (user) => {
    return {
        type: UPDATE_LEAVING_USERS,
        payload: user,
    }
}
export const UPDATE_TYPING_USER_ACTION = (user) => {
    return {
        type: UPDATE_TYPING_USER,
        payload: user,
    }
}

export const STOP_MESSAGES_LOADING_ACTION = () => {
    return {
        type: STOP_MESSAGES_LOADING,
    }
}
export const START_MESSAGES_LOADING_ACTION = () => {
    return {
        type: START_MESSAGES_LOADING,
    }
}