import {SHOW_MODAL, HIDE_MODAL, HIDE_TOAST, SHOW_TOAST,TOAST_MESSAGE,TOGGLE_SIDEBAR_CLASS} from "../actions/GlobalActions";

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
        case TOGGLE_SIDEBAR_CLASS:
            let payload = 'sidebar';
            if(state.sidebarClass === 'sidebar') {
                payload = 'sidebar-collapsed'
            }
            return {...state,sidebarClass: payload}
        default : return state;
    }
}
