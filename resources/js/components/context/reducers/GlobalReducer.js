import {SET_ROOM_HEIGHT,SET_BREADCRUMB_HEIGHT,
    SET_NAVBAR_HEIGHT,SET_PAGE_HEIGHT,SET_PAGE_CONTENT_HEIGHT} from "../actions/GlobalActions";

export const GlobalReducer = (state,action) => {
    switch(action.type) {
        case SET_NAVBAR_HEIGHT:
            return {...state, navbarHeight: action.payload}
        case SET_BREADCRUMB_HEIGHT :
            return {...state,breadcrumbHeight : action.payload}
        case SET_ROOM_HEIGHT :
            return {...state,roomHeight: action.payload}
        case SET_PAGE_HEIGHT:
            return {...state,pageHeight: action.payload}
        case SET_PAGE_CONTENT_HEIGHT:
            return {...state,pageContentHeight: action.payload}
        default : return state;
    }
}
