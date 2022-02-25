import {GET_ROOM_USERS, GET_USERS,RESET_ROOM_USERS} from "../actions";


const initState = {
    users: [],
    roomUsers: {},
};

export const UsersReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_USERS: return {...state, users: action.payload};
        case GET_ROOM_USERS: return {
            ...state,
            roomUsers: {...state.roomUsers, ...action.payload}
        };
        case RESET_ROOM_USERS: return {...state, roomUsers: []}
        default: return state;
    }
}


