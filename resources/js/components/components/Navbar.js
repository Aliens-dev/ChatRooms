import {Link, Redirect} from "react-router-dom";
import React, { useContext,useEffect,useRef} from 'react';
import {AppContext} from "../context/AppContext";
import {UserLogoutAction} from "../context/actions/AuthActions";
import Nav from "./Nav";
import {ROOM_URL} from "../urls/AppBaseUrl";

const Navbar = (props) => {
    const { auth,_Logout,setNavbarHeight } = useContext(AppContext)
    const navbarRef = useRef(null)
    useEffect(() => {
        setNavbarHeight(navbarRef.current.clientHeight);
    }, [])
    const render = () => {
        if(auth.token) {
            return (
                <Nav className="justify-content-between">
                    <Nav>
                        <Link className="nav-link active" to="/">Home</Link>
                        <Link className="nav-link" to={ROOM_URL}>Rooms</Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Link to="#" className="nav-link" onClick={_Logout}>Logout</Link>
                    </Nav>
                </Nav>
            )
        }else {
            return (
                <Nav className="justify-content-between">
                    <Nav>
                        <Link className="nav-link active" to="/">Home</Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                    </Nav>
                </Nav>
            )
        }
    }
    return (
        <nav className="navbar" ref={navbarRef}>
            <div className={`${props.container ? 'container' : 'container-fluid'}`}>
                {
                    render()
                }
            </div>
        </nav>
    )
}

export default Navbar;
