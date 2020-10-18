import React,{ useContext,useState,useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AppContext} from "../context/AppContext";
import axios from 'axios';
import {UserLoginAction, UserLogoutAction} from "../context/actions/AuthActions";
import {Loading} from "../components";
import {LOGIN_PAGE} from "../urls/AppBaseUrl";


const PrivateRoutes = (props) => {
    const {auth,dispatchAuth} = useContext(AppContext);
    const [check,setCheck] = useState(false);

    useEffect(() => {
        if(auth.token) {
            axios.post('/api/checkToken', [],{
                headers : {
                    Authorization : 'bearer ' + auth.token,
                }
            })
                .then(res => {
                    if(res.data.success && res.data.status === 'refresh') {
                        localStorage.setItem('chatApp', JSON.stringify(res.data.data));
                        dispatchAuth(UserLoginAction(res.data.data))
                    }
                    setCheck(true)
                })
                .catch(err => {
                    localStorage.setItem('chatApp', JSON.stringify({}));
                    dispatchAuth(UserLogoutAction());
                    setCheck(true)
                })
        }else {
            dispatchAuth(UserLogoutAction())
            setCheck(true);
        }
    },[])

    if(!check) {
        return (
            <Loading>
                <Loading.Large />
            </Loading>
        )
    }else {
        if( !auth.token ) {
            return (
                <Redirect to={LOGIN_PAGE} />
            )
        }else {
            return (
                <Route path={props.path} exact={props.exact} component={props.component}/>
            )
        }
    }
}

export default PrivateRoutes;
