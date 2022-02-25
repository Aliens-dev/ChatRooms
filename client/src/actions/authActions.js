import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, START_LOADING, STOP_LOADING} from "./index";
import axios from "axios";
import {CHECKTOKEN, LOGIN_PAGE_API, REGISTER_PAGE_API} from "../urls/AppBaseUrl";
import {SHOW_TOAST_ACTION,START_BUTTON_LOADING_ACTION, STOP_BUTTON_LOADING_ACTION} from "./popupsActions";


export const LOGIN_ACTION = (email, password) => async dispatch => {
    try {
        let res = await axios.post(LOGIN_PAGE_API, {email,password})
        if(res.data.success) {
            dispatch(
                {
                    type:LOGIN,
                    payload: res.data.data,
                }
            );
            dispatch(LOGIN_SUCCESS_ACTION())
        }
    }catch(e) {
        dispatch(SHOW_TOAST_ACTION('Failed to Login', 'Wrong Email or Password'))
    }
}

export const REGISTER_ACTION = (data) => async dispatch => {
    dispatch(START_BUTTON_LOADING_ACTION())
    try {
        let res = axios.post(REGISTER_PAGE_API, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        if(res.data.success) {
            dispatch(SHOW_TOAST_ACTION('register success', 'you can now login to your account'))
        }
        dispatch(START_BUTTON_LOADING_ACTION())
    }catch(e) {
        dispatch(SHOW_TOAST_ACTION('register failed', 'failed to register, please try again'))
        dispatch(STOP_BUTTON_LOADING_ACTION())
    }
}

export const LOGOUT_ACTION = () => {
    return {
        type:LOGOUT
    }
}

export const CHECK_AUTH = () => async (dispatch,getState) => {
    dispatch(START_LOADING_ACTION())
    if(getState().auth.user?.token) {
        try {
            //axios.defaults.withCredentials = true;
            //let res = await axios.get('http://localhost:8000/sanctum/csrf-cookie');
            let response = await axios.post(CHECKTOKEN, [],{
                headers : {
                    Authorization : 'Bearer ' + getState().auth.user.token,
                }
            })
            if(response.data.success) {
                dispatch(LOGIN_SUCCESS_ACTION())
            }else {
                dispatch(LOGOUT_ACTION())
            }
            dispatch(STOP_LOADING_ACTION())
        }catch(e) {
            dispatch(STOP_LOADING_ACTION())
        }
    }else {
        dispatch(STOP_LOADING_ACTION())
    }
}

export const START_LOADING_ACTION = () => {
    return {
        type: START_LOADING,
    }
}

export const STOP_LOADING_ACTION = () => {
    return {
        type: STOP_LOADING,
    }
}

export const LOGIN_FAILED_ACTION = () => {
    return {
        type: LOGIN_FAILED,
    }
}

export const LOGIN_SUCCESS_ACTION = () => {
    return {
        type: LOGIN_SUCCESS,
    }
}

