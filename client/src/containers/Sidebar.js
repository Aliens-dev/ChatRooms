import React from 'react';
import { Sidebar } from '../components';
import {
    JOINED_ROOMS_PAGE, PROFILE_PAGE,
    PUBLIC_ROOMS_PAGE,
    ROOMS_PAGE
} from "../urls/AppBaseUrl";

const SidebarContainer = () => {

    return (
        <Sidebar type="sidebar">
            <Sidebar.Header><span>CR</span><span>-AliensDev</span></Sidebar.Header>
            <Sidebar.Menu>
                <Sidebar.Item to={ROOMS_PAGE}>
                    <div>
                        <i  className="far fa-comments"/>
                    </div>
                    <span>My rooms</span>
                </Sidebar.Item>
                <Sidebar.Item to={PUBLIC_ROOMS_PAGE} >
                    <div>
                        <i  className="fa fa-globe-americas"/>
                    </div>
                    <span>Public rooms</span>
                </Sidebar.Item>
                <Sidebar.Item to={JOINED_ROOMS_PAGE} >
                    <div>
                        <i  className="fa fa-users"/>
                    </div>
                    <span>Joined-in Rooms</span>
                </Sidebar.Item>
                <Sidebar.Item to={PROFILE_PAGE} >
                    <div>
                        <i  className="fa fa-user"/>
                    </div>
                    <span>Profile</span>
                </Sidebar.Item>
                <Sidebar.Item to="#" >
                    <div>
                        <i className="fas fa-sign-out-alt" />
                    </div>
                    <span>Logout</span>
                </Sidebar.Item>
            </Sidebar.Menu>
        </Sidebar>
    )
}

export default SidebarContainer;
