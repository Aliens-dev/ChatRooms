import React, { createContext,useReducer ,useState } from 'react';


import AuthReducer from "./reducers/AuthReducer";
import {UserLogoutAction} from "./actions/AuthActions";
import axios from 'axios';
import {Redirect} from "react-router-dom";
import {GlobalReducer} from "./reducers/GlobalReducer";

export const AppContext = createContext();

const AuthState = JSON.parse(localStorage.getItem('chatApp')) || {};
const GlobalState = {
    navbarHeight: 0, breadcrumbHeight: 0,
    roomHeight: 0, pageHeight: 0,pageContentHeight : 0,
    visibleModal: false,
};

export const AppProvider = (props) => {

    const [auth,dispatchAuth] = useReducer(AuthReducer, AuthState);
    const [globalState,dispatchGlobalState] = useReducer(GlobalReducer,GlobalState);

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
                auth,dispatchAuth, _Logout, globalState, dispatchGlobalState,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

