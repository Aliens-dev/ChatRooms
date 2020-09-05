import React, {useState,useEffect,useContext} from 'react';
import BreadCrumb from "../../components/BreadCrumb";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL} from "../../urls/AppBaseUrl";
import {AppContext} from "../../context/AppContext";

const MyProfile = (props) => {
    //const [loading,setLoading] = useState(true);
    const {auth} = useContext(AppContext);
    const [user,setUser] = useState(null)
    useEffect(() => {
        axios({
            method:"POST",
            url : '',
            headers : {
                authorization: 'bearer ' + auth.token
            }
        })
            .then(res => {

            })
            .catch(err => {
                console.log('Error');
            })
    },[])

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
