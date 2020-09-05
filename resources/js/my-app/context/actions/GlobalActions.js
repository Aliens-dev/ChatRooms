export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';


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
