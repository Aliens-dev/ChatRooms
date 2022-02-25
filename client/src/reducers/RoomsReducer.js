import {
    GET_ROOMS,
    GET_ROOM,
    GET_ROOM_MEMBERS,
    START_ROOM_MEMBERS_LOADING,
    STOP_ROOM_MEMBERS_LOADING,
    ADD_ROOM_SUCCESS, ADD_ROOM_FAILS,
    SINGLE_ROOM_LOADING_STOP,SINGLE_ROOM_LOADING_START, ROOMS_LOADING_STOP, ROOMS_LOADING_START
} from "../actions";

const initState = {
    rooms: [],
    roomMembers: {
        roomId: null,
        members: [],
    },
    membersLoading: true,
    addRoomSuccess: false,
    singleRoom: null,
    singleRoomLoading: true,
    loading: true,
}

export const RoomsReducer = (state = initState, action) => {

    switch (action.type) {
        case GET_ROOMS : return {...state, rooms: action.payload};
        case GET_ROOM_MEMBERS : return {...state, roomMembers: action.payload};
        case ADD_ROOM_SUCCESS : return {...state, addRoomSuccess: true};
        case ADD_ROOM_FAILS : return {...state, addRoomSuccess: false};
        case START_ROOM_MEMBERS_LOADING : return {...state, membersLoading: true};
        case STOP_ROOM_MEMBERS_LOADING : return {...state, membersLoading: false};
        case GET_ROOM: return {...state, singleRoom: action.payload}
        case SINGLE_ROOM_LOADING_STOP: return {...state, singleRoomLoading: false}
        case SINGLE_ROOM_LOADING_START: return {...state, singleRoomLoading: true}
        case ROOMS_LOADING_STOP: return {...state, loading: false}
        case ROOMS_LOADING_START: return {...state, loading: true}
        default :return state;
    }
}
