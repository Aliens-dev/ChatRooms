import React, {useRef, useContext,useEffect} from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AppRoutes from "../../routes/AppRoutes";
import {AppContext} from "../../context/AppContext";
import {setPageContentHeightAction} from "../../context/actions/GlobalActions";


const Index = () => {

    const pageContentRef = useRef(null);
    const {dispatchGlobalState} = useContext(AppContext);

    useEffect(() => {
        dispatchGlobalState(setPageContentHeightAction(pageContentRef.current.clientHeight));
    }, [])
    return (
        <div className="app-page">
            <Sidebar />
            <div className="page-content" ref={pageContentRef}>
                <Navbar />
                {
                    AppRoutes()
                }
            </div>
        </div>
    )
}


export default Index;
