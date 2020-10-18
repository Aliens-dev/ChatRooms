import React, { useContext} from 'react';
import {Link} from "react-router-dom";
import {AppContext} from "../context/AppContext";
import {Navbar} from '../components';
import {ROOMS_PAGE,JOINED_ROOMS_PAGE,PUBLIC_ROOMS_PAGE} from "../urls/AppBaseUrl";
import {toggleSidebarClass} from "../context/actions/GlobalActions";

const NavbarContainer = ({children,container, ...restProps}) => {

    const { auth,_Logout,dispatchGlobalState } = useContext(AppContext)
    const render = () => {
        if(auth.token) {
            return (
                <Navbar.Nav className="justify-content-between">
                    <Navbar.Nav>
                        <Navbar.Link onClick={() => dispatchGlobalState(toggleSidebarClass())}>
                            <i className="fa fa-bars" />
                        </Navbar.Link>
                        <Navbar.Link to={ROOMS_PAGE}>Rooms</Navbar.Link>
                        <Navbar.Link to={PUBLIC_ROOMS_PAGE}>Public Rooms</Navbar.Link>
                        <Navbar.Link to={JOINED_ROOMS_PAGE}>Joined Rooms</Navbar.Link>
                    </Navbar.Nav>
                    <Navbar.Nav className="justify-content-end">
                        <Link to="#" className="nav-link" onClick={_Logout}>Logout</Link>
                    </Navbar.Nav>
                </Navbar.Nav>
            )
        }else {
            return (
                <Navbar.Nav className="justify-content-between">
                    <Navbar.Nav className="justify-content-end">
                        <Navbar.Link to="/login">Login</Navbar.Link>
                        <Navbar.Link to="/register">Register</Navbar.Link>
                    </Navbar.Nav>
                </Navbar.Nav>
            )
        }
    }
    return (
        <Navbar>
            <Navbar.Inner container={container}>
                {
                    render()
                }
            </Navbar.Inner>
        </Navbar>
    )
}

export default NavbarContainer;
