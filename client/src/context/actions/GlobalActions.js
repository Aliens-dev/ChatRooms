export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
export const TOAST_MESSAGE = 'TOAST_MESSAGE';
export const TOGGLE_SIDEBAR_CLASS = 'TOGGLE_SIDEBAR_CLASS';

export const setModalVisibleAction = () => {
    return {
        type: SHOW_MODAL,
    }
}
export const setModalHiddenAction = () => {
    return {
        type: HIDE_MODAL,
    }
}

export const setToastHiddenAction = () => {
    return {
        type : HIDE_TOAST
    }
}
export const setToastShowAction = () => {
    return {
        type : SHOW_TOAST
    }
}

export const setToastMessage = (header,body) => {
    return {
        type : TOAST_MESSAGE,
        payload: {
            header,body
        }
    }
}

export const toggleSidebarClass = () => {
        return {
            type:TOGGLE_SIDEBAR_CLASS
        }
}
