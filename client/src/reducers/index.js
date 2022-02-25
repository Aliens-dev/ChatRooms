import {combineReducers} from "redux";
import {AuthReducer} from "./AuthReducer";
import {RoomsReducer} from "./RoomsReducer";
import {PopupsReducer} from "./PopupsReducer";
import {MessagesReducer} from "./MessagesReducer";
import {UsersReducer} from "./UsersReducer";
import EchoReducer from "./EchoReducer";

export default combineReducers({
    auth: AuthReducer,
    rooms: RoomsReducer,
    popup: PopupsReducer,
    messages: MessagesReducer,
    users: UsersReducer,
    echo: EchoReducer,
});
