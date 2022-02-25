import React,{ useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Loading} from "../components";
import {LOGIN_PAGE} from "../urls/AppBaseUrl";
import {useDispatch, useSelector} from "react-redux";
import {CHECK_AUTH} from "../actions/authActions";


const PrivateRoutes = ({component,path, ...restProps}) => {

    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CHECK_AUTH())
    },[])

    if(authState.loading) {
        return (
            <Loading>
                <Loading.Large />
            </Loading>
        )
    }

    if( !authState.loginSuccess ) {
        return (
            <Redirect to={LOGIN_PAGE}/>
        )
    }
    return (
        <Route path={path} {...restProps} component={component}/>
    )
}

export default PrivateRoutes;
