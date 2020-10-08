import {Link} from "react-router-dom";
import React, { useContext} from 'react';
import {AppContext} from "../context/AppContext";
import Nav from "./Nav";
import {ROOMS_PAGE,JOINED_ROOMS_PAGE,PUBLIC_ROOMS_PAGE} from "../urls/AppBaseUrl";
import {toggleSidebarClass} from "../context/actions/GlobalActions";
const Navbar = (props) => {
    const { auth,_Logout,dispatchGlobalState } = useContext(AppContext)

    const render = () => {
        if(auth.token) {
            return (
                <Nav className="justify-content-between">
                    <Nav>
                        <div className="nav-link">
                            <i className="fa fa-bars" onClick={() => dispatchGlobalState(toggleSidebarClass())} />
                        </div>
                        <Link className="nav-link" to={ROOMS_PAGE}>Rooms</Link>
                        <Link className="nav-link" to={PUBLIC_ROOMS_PAGE}>Public Rooms</Link>
                        <Link className="nav-link" to={JOINED_ROOMS_PAGE}>Joined Rooms</Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Link to="#" className="nav-link" onClick={_Logout}>Logout</Link>
                    </Nav>
                </Nav>
            )
        }else {
            return (
                <Nav className="justify-content-between">
                    <Nav className="justify-content-end">
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                    </Nav>
                </Nav>
            )
        }
    }
    return (
        <nav className="navbar">
            <div className={`${props.container ? 'container' : 'container-fluid'}`}>
                {
                    render()
                }
            </div>
        </nav>
    )
}

export default Navbar;
