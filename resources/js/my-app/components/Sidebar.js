import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {
    APP_URL,
    DASHBOARD,
    DASHBOARD_PAGE,
    JOINED_ROOMS_PAGE, PROFILE_PAGE,
    PUBLIC_ROOMS_PAGE,
    ROOMS,
    ROOMS_PAGE
} from "../urls/AppBaseUrl";
import {AppContext} from "../context/AppContext";

const Sidebar = () => {
    const { _Logout,globalState } = useContext(AppContext);

    return (
        <div className={globalState.sidebarClass}>
            <div className="sidebar-header"><span>CR</span><span>-AliensDev</span></div>
            <div className="sidebar-menu">
                <Link className="sidebar-item" to={DASHBOARD_PAGE}>
                    <div>
                        <i className="fas fa-tachometer-alt" />
                    </div>
                    <span>Dashboard</span>
                </Link>
                <Link className="sidebar-item" to={ROOMS_PAGE}>
                    <div>
                        <i  className="far fa-comments"/>
                    </div>
                    <span>My rooms</span>
                </Link>
                <Link className="sidebar-item" to={PUBLIC_ROOMS_PAGE} >
                    <div>
                        <i  className="fa fa-globe-americas"/>
                    </div>
                    <span>Public rooms</span>
                </Link>
                <Link className="sidebar-item" to={JOINED_ROOMS_PAGE} >
                    <div>
                        <i  className="fa fa-users"/>
                    </div>
                    <span>Joined-in Rooms</span>
                </Link>
                <Link className="sidebar-item" to={PROFILE_PAGE} >
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
