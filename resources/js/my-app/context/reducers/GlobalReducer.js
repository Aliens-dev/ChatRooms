import {SHOW_MODAL,HIDE_MODAL} from "../actions/GlobalActions";

export const GlobalReducer = (state,action) => {
    switch(action.type) {
        case SHOW_MODAL:
            return {...state,visibleModal:true}
        case HIDE_MODAL :
            return {...state,visibleModal: false}
        default : return state;
    }
}
