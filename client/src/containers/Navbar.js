import React, { useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import {Navbar} from '../components';
import {ROOMS_PAGE,JOINED_ROOMS_PAGE,PUBLIC_ROOMS_PAGE} from "../urls/AppBaseUrl";

import {FaBars} from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_ACTION } from '../actions/authActions';
import Invitations from '../components/invitations/Invitations';

const NavbarContainer = ({children,container, ...restProps}) => {

    const {user} = useSelector(state => state.auth.user)
    const {echo} = useSelector(state => state.echo)

    const dispatch = useDispatch()

    useEffect(() => {
        if(window.Echo) {
            console.log('private echo')
            window.Echo.private('user.'+ user.id)
            .listen('.invitation.received', (e) => {
                console.log('invitation !')
            })
        }
    }, [echo])

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
                        <Invitations />
                        <Link  
                            to="#" 
                            className="nav-link"
                            onClick={
                                () => dispatch(LOGOUT_ACTION()).then(res => <Redirect to={"/login"} />)
                            }
                        >
                            Logout
                        </Link>
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
