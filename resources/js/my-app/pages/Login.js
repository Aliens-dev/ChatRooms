import React, {useContext, useState , useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {AppContext} from "../context/AppContext"
import {Loading} from "../components";
import {APP_URL, LOGIN_PAGE, REGISTER_PAGE, LOGIN_PAGE_API} from "../urls/AppBaseUrl";
const Login = (props) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const {auth,dispatchAuth} = useContext(AppContext);
    const [check,setCheck] = useState(false);

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

    const _Login = (e) => {
        e.preventDefault();
        axios.post(LOGIN_PAGE_API, {email,password})
            .then(res => {
                if(res.data.success) {
                    localStorage.setItem('chatApp',JSON.stringify(res.data.data));
                    dispatchAuth({type: 'USER_LOGIN', payload: res.data.data});
                    props.history.push(APP_URL)
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
}

export default Login;
