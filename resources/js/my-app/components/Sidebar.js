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
                <Link className="sidebar-item" to={APP_URL}>
                    <div>
                        <i className="fas fa-tachometer-alt" />
                    </div>
                    <span>Dashboard</span>
                </Link>
                <Link className="sidebar-item" to={ROOM_URL}>
                    <div>
                        <i  className="far fa-comments"/>
                    </div>
                    <span>My rooms</span>
                </Link>
                <Link className="sidebar-item" to={`${APP_URL}/public-rooms`} >
                    <div>
                        <i  className="fa fa-globe-americas"/>
                    </div>
                    <span>Public rooms</span>
                </Link>
                <Link className="sidebar-item" to={`${APP_URL}/joined-rooms`} >
                    <div>
                        <i  className="fa fa-users"/>
                    </div>
                    <span>Joined-in Rooms</span>
                </Link>
                <Link className="sidebar-item" to={`${APP_URL}/profile`} >
                    <div>
                        <i  className="fa fa-user"/>
                    </div>
                    <span>Profile</span>
                </Link>
                <Link className="sidebar-item" to="#" onClick={_Logout}>
                    <div>
                        <i className="fas fa-sign-out-alt" />
                    </div>
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;
