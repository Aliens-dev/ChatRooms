import React, {useState , useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Loading} from "../components";
import {APP_URL, REGISTER_PAGE} from "../urls/AppBaseUrl";
import {useDispatch, useSelector} from "react-redux";
import {CHECK_AUTH, LOGIN_ACTION} from "../actions/authActions";

const Login = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(CHECK_AUTH())
    },[]);

    const _Login = (e) => {
        e.preventDefault();
        dispatch(LOGIN_ACTION(email,password))
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
                <form className="form" method="POST" onSubmit={_Login}>
                    <div className="form-header">
                        <h6>Chat <span>room</span></h6>
                    </div>
                    <div className="form-image">
                        <img src="/img/login_image.PNG" alt="login image" />
                    </div>
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
                    <button className="submit-button" >Login</button>
                </form>
                <div className="register">
                    New to chatrooms? <Link to={REGISTER_PAGE}>Register Here</Link>
                </div>
            </div>
        </div>
    )

}

export default Login;
