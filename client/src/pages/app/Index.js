import React, { useEffect } from "react";
import AppRoutes from "../../routes/AppRoutes";
import MyToast from "../../components/Toast";
import NavbarContainer from "../../containers/Navbar";
import SidebarContainer from "../../containers/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Echo from "laravel-echo";


const Index = () => {

    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)

    useEffect(()=> {
        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: 'd8b949bfb89e354b3e51',
            cluster: 'eu',
            authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
            forceTLS: false,
            auth: {
                headers: {
                    Authorization : "Bearer " + authState.user.token,
                },
            },
        });
        dispatch({
            type: 'SET_ECHO',
            payload: window.Echo
        })
    }, [])
    

    return (
        <div className="app-page">
            <SidebarContainer />
            <div className="page-content" >
                <NavbarContainer />
                <MyToast />
                {
                    AppRoutes()
                }
            </div>
        </div>
    )
}


export default Index;
