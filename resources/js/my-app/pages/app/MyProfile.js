import React, {useState} from 'react';
import BreadCrumb from "../../components/BreadCrumb";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL} from "../../urls/AppBaseUrl";
import Loading from "../../components/Loading";
import {setModalVisibleAction} from "../../context/actions/GlobalActions";
import Nav from "../../components/Nav";
import Modal from "../../components/Modal";



const MyProfile = (props) => {
    //const [loading,setLoading] = useState(true);



    return (
        <div className="home-page">
            <div>
                <BreadCrumb  >
                    <BreadCrumbItem url={APP_URL}>
                        Dashboard
                    </BreadCrumbItem>
                    <BreadCrumbItem active>
                        Profile
                    </BreadCrumbItem>
                </BreadCrumb>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="ml-3">
                        <button className="btn btn-primary">Edit Profile</button>
                    </div>
                </div>
                <div className="row my-profile">
                    My Profile
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
