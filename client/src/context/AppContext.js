import React, { createContext,useReducer } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

import AuthReducer from "./reducers/AuthReducer";
import { UserLogoutAction } from "./actions/AuthActions";
import { GlobalReducer } from "./reducers/GlobalReducer";
import {setModalVisibleAction, setToastMessage} from "./actions/GlobalActions";

export const AppContext = createContext();

const AuthInitState = JSON.parse(localStorage.getItem('chatApp')) || {};

const GlobalInitState = {
    visibleModal: false,
    showToast:false,
    toastMessage: {header:'',body:''},
    sidebarClass:'sidebar'
};

export const AppProvider = (props) => {

    const [auth,dispatchAuth] = useReducer(AuthReducer, AuthInitState);
    const [globalState,dispatchGlobalState] = useReducer(GlobalReducer,GlobalInitState);

    const _Logout = (event) => {
        event.preventDefault();

        axios.post('/api/logout', [], {
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
                /*
                    dispatchAuth(UserLogoutAction())
                    return (
                        <Redirect to="/" />
                    )
                */
                dispatchGlobalState(setToastMessage('Failed', 'Failed To Logout'))
                dispatchGlobalState(setModalVisibleAction());
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

