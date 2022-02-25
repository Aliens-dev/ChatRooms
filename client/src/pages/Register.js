import React, {useState , useEffect,useRef} from 'react';
import {Redirect,Link} from "react-router-dom";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "../components";
import {APP_URL, LOGIN_PAGE, REGISTER_PAGE_API} from "../urls/AppBaseUrl";
import {CHECK_AUTH} from "../actions/authActions";

const Register = () => {

    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState("");
    const [passwordConfirmation,setPasswordConfirmation] = useState("");
    const [avatar,setAvatar] = useState(null);
    const uploadBtn = useRef(null);
    const [avatarPreview,setAvatarPreview] = useState("");

    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth)

    useEffect(() => {
       dispatch(CHECK_AUTH())
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
        dispatch()
    }


    if(authState.loading) {
        return (
            <Loading>
                <Loading.Large />
            </Loading>
        )
    }

    if(authState.loginSuccess) {
        return <Redirect to={APP_URL} />
    }
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

export default Register;
