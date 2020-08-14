import React, { createContext,useReducer ,useState } from 'react';
import AuthReducer from "./reducers/AuthReducer";
import {UserLogoutAction} from "./actions/AuthActions";
import axios from 'axios';
import {Redirect} from "react-router-dom";


export const AppContext = createContext();

const AuthState = JSON.parse(localStorage.getItem('chatApp')) || {};

export const AppProvider = (props) => {
    const [auth,dispatchAuth] = useReducer(AuthReducer, AuthState);
    const [navbarHeight,setNavbarHeight] = useState(0);
    const [pageContentHeight,setPageContentHeight] = useState(0);
    const _Logout = (event) => {
        event.preventDefault();
        axios.post('/logout', [], {
            headers: {
                authorization : 'Bearer ' + auth.token
            }
        })
            .then(res => {
                dispatchAuth(UserLogoutAction())
                return (
                    <Redirect to="/" />
                )
            })
            .catch(err => {
                dispatchAuth(UserLogoutAction())
                return (
                    <Redirect to="/" />
                )
            })
    }
    return (
        <AppContext.Provider
            value={{
                auth,dispatchAuth, _Logout, setNavbarHeight , navbarHeight,
                setPageContentHeight,pageContentHeight
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

