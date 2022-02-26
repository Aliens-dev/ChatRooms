import React, {useState,useEffect,useContext,useRef} from 'react';
import axios from 'axios'
import {BreadCrumb,Loading} from "../../components";
import {APP_URL, DASHBOARD_PAGE, FULL_URL, PROFILE_PAGE_API} from "../../urls/AppBaseUrl";
import UserIcon from "../../components/UserIcon";

const MyProfile = (props) => {
    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);

    const [editUser,setEditUser] = useState(null);
    const [progress,setProgress] = useState(0);
    const [previewImg,setPreviewImg] = useState('');
    const avatarBtn = useRef(null)


    // useEffect(() => {
    //     getUserInfo()
    // },[])

    // const getUserInfo = () => {
    //     axios({
    //         method:"GET",
    //         url : PROFILE_PAGE_API + auth.user.id,
    //         headers : {
    //             authorization: 'bearer ' + auth.token
    //         }
    //     })
    //         .then(res => {
    //             setUser(res.data.data);
    //             setEditUser({...res.data.data, password : ''});
    //             setLoading(false);
    //         })
    //         .catch(err => {
    //             setLoading(false);
    //         })
    // }

    // const EditUser = (e)=> {
    //     e.preventDefault();
    //     let formData = new FormData();

    //     formData.append('name',editUser.name)
    //     formData.append('email',editUser.email)
    //     formData.append('password',editUser.password)
    //     formData.append('image',editUser.image)
    //     formData.append("_method", 'PATCH');
    //     axios({
    //         url: PROFILE_PAGE_API + auth.user.id,
    //         data: formData,
    //         method: 'POST',
    //         headers: {
    //             authorization: "Bearer " + auth.token,
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         onUploadProgress: function (progressEvent) {
    //             let progress = progressEvent.loaded / progressEvent.total;
    //             setProgress(Math.floor(progress) * 100)
    //         },
    //     })
    //         .then(res => {
    //             getUserInfo()
    //             setProgress(0);
    //             setPreviewImg('')
    //         })
    //         .catch(err => {
    //             setProgress(0);
    //             setPreviewImg('')
    //         })

    // }

    // const chooseAvatar = (e) => {
    //     e.preventDefault();
    //     avatarBtn.current.click();
    // }

    // const avatarBtnChange = () => {
    //     setEditUser({...editUser, image: avatarBtn.current.files[0]});
    //     setPreviewImg(URL.createObjectURL(avatarBtn.current.files[0]))
    // }


    const render = () => {
        if (loading) {
            return (
                <Loading>
                    <Loading.Large />
                </Loading>
            )
        }else {
            return (
                <div className="profile-page">
                    <BreadCrumb>
                        <BreadCrumb.Item url={DASHBOARD_PAGE}>
                            Dashboard
                        </BreadCrumb.Item>
                        <BreadCrumb.Active>
                            Profile
                        </BreadCrumb.Active>
                    </BreadCrumb>
                    <div className="container-fluid">
                        <div className="row my-profile">
                            <div className="col-lg-3 col-sm-12" >
                                <div className="my-card">
                                    <div className="profile-header">
                                        <UserIcon img={FULL_URL+"/uploads/" + user.image}/>
                                        <div className="user-info">
                                            {
                                                user.name
                                            }
                                        </div>
                                    </div>
                                    <div className="profile-info">
                                        <div className="item">
                                            <span>Email</span>  {user.email}
                                        </div>
                                        <div className="item">
                                            <span>Joined </span>  {user.created_at}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-sm-12 settings-tab">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#settings"
                                           role="tab" aria-controls="home" aria-selected="true">Settings</a>
                                    </li>
                                </ul>
                                <div className="tab-content my-card" id="myTabContent">
                                    <div className="tab-pane fade show active" id="settings" role="tabpanel"
                                         aria-labelledby="home-tab">
                                        <div className="settings">
                                            <form className="form">
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-3">Name:  </label>
                                                    <input id="name" className="col-lg-9 col-sm-12 form-control"
                                                           value={editUser.name}
                                                           onChange={(e) => setEditUser({...editUser,name:e.target.value})}
                                                           placeholder="Your name"
                                                    />
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-3">Email:  </label>
                                                    <input id="name" type="email"
                                                           value={editUser.email}
                                                           onChange={(e) => setEditUser({...editUser,email:e.target.value})}
                                                           className="form-control col-lg-9 col-sm-12" placeholder="Your Email" />
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-3">Password:  </label>
                                                    <input id="name" type="password" className="form-control col-lg-9 col-sm-12"
                                                           value={editUser.password}
                                                           onChange={(e) => setEditUser({...editUser,password:e.target.value})}
                                                           placeholder="Password." />
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="file" className="col-3">Avatar:  </label>
                                                    <input ref={avatarBtn} //onChange={avatarBtnChange} 
                                                    type="file" className="d-none" />
                                                    <div className="form-image col-lg-9 col-sm-11 ">
                                                        <button id="file" className="btn btn-primary"
                                                                //onClick={chooseAvatar}
                                                        >
                                                            Upload Avatar
                                                        </button>
                                                        {
                                                            previewImg !== '' && <UserIcon img={previewImg} alt="preview" />
                                                        }
                                                        {
                                                            progress > 0 && (
                                                                <div>
                                                                    <progress min="0" max="100" value={progress} />
                                                                    <span>{ progress } %</span>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary" 
                                                    //onClick={EditUser}
                                                
                                                >Edit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        render()
    )
}

export default MyProfile;
