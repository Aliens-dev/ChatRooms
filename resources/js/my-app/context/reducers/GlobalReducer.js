import {SHOW_MODAL, HIDE_MODAL, HIDE_TOAST, SHOW_TOAST,TOAST_MESSAGE} from "../actions/GlobalActions";

export const GlobalReducer = (state,action) => {
    switch(action.type) {
        case SHOW_MODAL:
            return {...state,visibleModal:true}
        case HIDE_MODAL :
            return {...state,visibleModal: false}
        case HIDE_TOAST:
            return {...state,showToast:false}
        case SHOW_TOAST:
            return {...state,showToast: true}
        case TOAST_MESSAGE:
            return {...state,toastMessage: action.payload}
        default : return state;
    }
}
