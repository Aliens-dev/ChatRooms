import React from 'react';
import {Link} from "react-router-dom";
import {Navbar} from '../components';
import {ROOMS_PAGE,JOINED_ROOMS_PAGE,PUBLIC_ROOMS_PAGE} from "../urls/AppBaseUrl";

import {FaBars} from 'react-icons/fa'

const NavbarContainer = ({children,container, ...restProps}) => {

    const render = () => {
            return (
                <Navbar.Nav className="justify-content-between">
                    <Navbar.Nav>
                        <Navbar.Link to={"#"} /*onClick={() => dispatchGlobalState(toggleSidebarClass())} */ >
                            <FaBars size={16} />
                        </Navbar.Link>
                        <Navbar.Link to={ROOMS_PAGE}>Rooms</Navbar.Link>
                        <Navbar.Link to={PUBLIC_ROOMS_PAGE}>Public Rooms</Navbar.Link>
                        <Navbar.Link to={JOINED_ROOMS_PAGE}>Joined Rooms</Navbar.Link>
                    </Navbar.Nav>
                    <Navbar.Nav className="justify-content-end">
                        <Link to="#" className="nav-link" /* onClick={_Logout} */ >Logout</Link>
                    </Navbar.Nav>
                </Navbar.Nav>
            )
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
