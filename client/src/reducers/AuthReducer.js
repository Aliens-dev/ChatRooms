import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, START_LOADING, STOP_LOADING} from "../actions";

const initState= {
    user: JSON.parse(localStorage.getItem('auth')) || {},
    token: '',
    loading: true,
    loginSuccess: false,
}

export const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            
            localStorage.setItem('auth', JSON.stringify(action.payload));
            return {...state, user:action.payload};
        case LOGOUT:
            localStorage.setItem('auth', JSON.stringify({}))
            return  {...state, user : {}}
        case START_LOADING: return {...state, loading: true}
        case STOP_LOADING: return {...state, loading: false}
        case LOGIN_SUCCESS: return {...state, loginSuccess: true}
        case LOGIN_FAILED: return {...state, loginSuccess: false}
        default: return state;
    }
}
