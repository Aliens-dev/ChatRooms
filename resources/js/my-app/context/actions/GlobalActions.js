export const SET_NAVBAR_HEIGHT = 'SET_NAVBAR_HEIGHT';
export const SET_BREADCRUMB_HEIGHT = 'SET_BREADCRUMB_HEIGHT';
export const SET_ROOM_HEIGHT = 'SET_ROOM_HEIGHT';
export const SET_PAGE_HEIGHT = 'SET_PAGE_HEIGHT';
export const SET_PAGE_CONTENT_HEIGHT = 'SET_PAGE_CONTENT_HEIGHT';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const setNavbarHeightAction = (height) => {
    return {
        type : SET_NAVBAR_HEIGHT,
        payload: height
    }
}
export const setBreadCrumbHeightAction = (height) => {
    return {
        type : SET_BREADCRUMB_HEIGHT,
        payload: height
    }
}
export const setRoomHeightAction = (height) => {
    return {
        type : SET_ROOM_HEIGHT,
        payload: height
    }
}
export const setPageHeightAction = (height) => {
    return {
        type : SET_PAGE_HEIGHT,
        payload: height
    }
}
export const setPageContentHeightAction = (height) => {
    return {
        type : SET_PAGE_CONTENT_HEIGHT,
        payload: height
    }
}
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
