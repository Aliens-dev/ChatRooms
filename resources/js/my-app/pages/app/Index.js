import React from "react";
import AppRoutes from "../../routes/AppRoutes";
import MyToast from "../../components/Toast";
import NavbarContainer from "../../containers/Navbar";
import SidebarContainer from "../../containers/Sidebar";


const Index = () => {
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
