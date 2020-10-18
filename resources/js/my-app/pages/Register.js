import React, {useContext, useState , useEffect,useRef} from 'react';
import { Link} from "react-router-dom";
import axios from 'axios';
import {AppContext} from "../context/AppContext"
import {Loading} from "../components";
import {APP_URL, LOGIN_PAGE, REGISTER_PAGE_API} from "../urls/AppBaseUrl";
import {setToastMessage, setToastShowAction} from "../context/actions/GlobalActions";

const Register = () => {

    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState("");
    const [passwordConfirmation,setPasswordConfirmation] = useState("");
    const {auth,dispatchAuth,dispatchGlobalState} = useContext(AppContext);
    const [check,setCheck] = useState(false);
    const [avatar,setAvatar] = useState(null);
    const uploadBtn = useRef(null);
    const [avatarPreview,setAvatarPreview] = useState("");

    useEffect(() => {
        if(auth.token !== '') {
            axios.post('/api/checkToken', [],{
                headers : {
                    Authorization : 'Bearer ' + auth.token
                }
            })
                .then(res => {
                    if(res.data.success && res.data.status == 'refresh') {
                        localStorage.setItem('chatApp', JSON.stringify(res.data.data));
                        dispatchAuth({type : 'USER_LOGIN', payload: res.data.data})
                    }
                    props.history.push(APP_URL)
                    setCheck(true)
                })
                .catch(err => {
                    setCheck(true)
                    localStorage.setItem('chatApp', JSON.stringify({}));
                    dispatchAuth({type : 'USER_LOGOUT'})
                })
        }else {
            setCheck(true);
        }
    },[]);

    const loadImage = (e) => {
        e.preventDefault();
        uploadBtn.current.click();
    }

    const avatarLoad = () => {
        setAvatar(uploadBtn.current.files[0]);
        setAvatarPreview(URL.createObjectURL(uploadBtn.current.files[0]));
    }

    const _Register = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email',email);
        formData.append('password',password);
        formData.append('name',name);
        formData.append('image',avatar);

        axios.post(REGISTER_PAGE_API, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                if(res.data.success) {
                    dispatchGlobalState(setToastShowAction());
                    dispatchGlobalState(setToastMessage("Successfully registred","Account Created! you can login now"));
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    if(!check) {
        return (
            <Loading>
                <Loading.Large />
            </Loading>
        )
    }else {
        return (
            <div className="auth-pages">
                <div className="form-container">
                    <form className="form" method="POST" onSubmit={_Register}>
                        <div className="form-header">
                            <h6>Chat <span>room</span></h6>
                        </div>
                        <div className="form-image">
                            <img src="/img/login_image.PNG" alt="login image" />
                        </div>
                        <div className="form-group form-group-custom">
                            <label htmlFor="name"><i className="fa fa-user"></i></label>
                            <input
                                name="name" type="text"
                                id="name" className="form-control"
                                value={name}
                                placeholder="Your name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group form-group-custom">
                            <label htmlFor="avatar"><i className="fa fa-image"></i></label>
                            <input
                                name="avatar" type="file"
                                id="avatar" className="d-none"
                                ref={uploadBtn}
                                placeholder="Email Address"
                                onChange={avatarLoad}
                            />
                            <button
                                id="avatar" className="upload-icon"
                                onClick={loadImage}
                            >Avatar</button>
                        </div>
                        {
                            avatarPreview &&
                                <div className="form-group image-preview">
                                    <img src={avatarPreview} />
                                </div>
                        }
                        <div className="form-group form-group-custom">
                            <label htmlFor="email"><i className="fa fa-envelope"></i></label>
                            <input
                                name="email" type="email"
                                id="email" className="form-control"
                                value={email}
                                placeholder="Email Address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group form-group-custom">
                            <label htmlFor="password"><i className="fa fa-key"></i></label>
                            <input
                                name="password" type="password"
                                id="password" className="form-control"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group form-group-custom">
                            <label htmlFor="password"><i className="fa fa-key"></i></label>
                            <input
                                name="password" type="password"
                                id="password" className="form-control"
                                value={passwordConfirmation}
                                placeholder="Confirm password"
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                        </div>
                        <button className="submit-button">Register</button>
                    </form>
                    <div className="register">
                        Already ave an to account? <Link to={LOGIN_PAGE}>Login Here</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;
