import {HIDE_MODAL, HIDE_TOAST, SHOW_MODAL, SHOW_TOAST, START_BUTTON_LOADING, STOP_BUTTON_LOADING} from "../actions";

const initState = {
    showModal: false,
    showToast:false,
    toastMessage: {title:'',message:''},
    sidebarClass:'sidebar',
    buttonLoading: false,
};

export const PopupsReducer = (state = initState, action) => {
    switch (action.type) {
        case SHOW_MODAL: return {...state, showModal: true}
        case HIDE_MODAL: return {...state, showModal: false}
        case SHOW_TOAST: return {...state, showToast: true, toastMessage: {...action.payload}}
        case HIDE_TOAST: return {...state, showToast: false, toastMessage: {title:'', message: ''}}
        case START_BUTTON_LOADING: return {...state, buttonLoading: true}
        case STOP_BUTTON_LOADING: return {...state, buttonLoading: false}
        default: return initState;
    }
}
