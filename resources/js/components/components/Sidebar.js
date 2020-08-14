import React, {useContext} from 'react';
import Nav from "./Nav";
import {Link} from "react-router-dom";
import {APP_URL, ROOM_URL} from "../urls/AppBaseUrl";
import {AppContext} from "../context/AppContext";

const Sidebar = () => {
    const { _Logout } = useContext(AppContext);
    return (
        <div className="sidebar">
            <div className="sidebar-header">CR-AliensDev</div>
            <div className="sidebar-menu">
                <Link className="sidebar-item" to={ROOM_URL}>
                    Rooms
                </Link>
                <Link className="sidebar-item" to={`${APP_URL}/joined`} >
                    Joined
                </Link>
                <Link className="sidebar-item" to="#" onClick={_Logout}>
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;
