import {HIDE_MODAL, HIDE_TOAST, SHOW_MODAL, SHOW_TOAST, START_BUTTON_LOADING, STOP_BUTTON_LOADING} from "./index";


export const SHOW_MODAL_ACTION = () => {
    return {
        type: SHOW_MODAL,
    }
}

export const HIDE_MODAL_ACTION = () => {
    return {
        type: HIDE_MODAL,
    }
}

export const SHOW_TOAST_ACTION = (title,message) => {
    return {
        type: SHOW_TOAST,
        payload: { title, message }
    }
}

export const HIDE_TOAST_ACTION = () => {
    return {
        type: HIDE_TOAST,
    }
}

export const START_BUTTON_LOADING_ACTION = () => {
    return {
        type: START_BUTTON_LOADING
    }
}
export const STOP_BUTTON_LOADING_ACTION = () => {
    return {
        type: STOP_BUTTON_LOADING
    }
}
