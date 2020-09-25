import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AppRoutes from "../../routes/AppRoutes";
import MyToast from "../../components/Toast";


const Index = () => {
    return (
        <div className="app-page">
            <Sidebar />
            <div className="page-content" >
                <Navbar />
                <MyToast />
                {
                    AppRoutes()
                }
            </div>
        </div>
    )
}


export default Index;
