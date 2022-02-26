import {GET_MESSAGES, START_MESSAGES_LOADING, STOP_MESSAGES_LOADING, UPDATE_ACTIVE_USERS, UPDATE_JOINED_USERS, UPDATE_LEAVING_USERS, UPDATE_MESSAGES, UPDATE_TYPING_USER} from "../actions";


const initState = {
    messages: [],
    loading: true,
    userTyping: null,
    activeUsers: [],
};


export const MessagesReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_MESSAGES: return {...state, messages: action.payload}
        case STOP_MESSAGES_LOADING: return {...state, loading:false}
        case START_MESSAGES_LOADING: return {...state, loading:true}
        case UPDATE_ACTIVE_USERS: return {...state, activeUsers: action.payload}
        case UPDATE_JOINED_USERS: return {...state, activeUsers: [...state.activeUsers,action.payload]}
        case UPDATE_LEAVING_USERS:  
        const filtered = state.activeUsers.filter(user => user.id !== action.payload.id)
        return {...state, activeUsers: filtered}
        case UPDATE_TYPING_USER: return {...state, userTyping: action.payload}
        case UPDATE_MESSAGES: return {...state, messages: [...state.messages, action.payload]}
        default: return state;
    }
}


