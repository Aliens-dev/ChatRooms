import React, {useContext, useState , useEffect} from 'react';
import Navbar from "../components/Navbar";
import axios from 'axios';
import {AppContext} from "../context/AppContext"
const Login = (props) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const {auth,dispatchAuth} = useContext(AppContext);
    const [check,setCheck] = useState(false);

    useEffect(() => {
        if(auth.token !== '') {
            axios.post('/checkToken', [],{
                headers : {
                    Authorization : 'Bearer ' + auth.token
                }
            })
                .then(res => {
                    if(res.data.success && res.data.status == 'refresh') {
                        localStorage.setItem('chatApp', JSON.stringify(res.data.data));
                        dispatchAuth({type : 'USER_LOGIN', payload: res.data.data})
                    }
                    props.history.push('/app')
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
        axios.post('/login', {email,password})
            .then(res => {
                if(res.data.success) {
                    localStorage.setItem('chatApp',JSON.stringify(res.data.data));
                    dispatchAuth({type: 'USER_LOGIN', payload: res.data.data});
                    props.history.push('/app')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    if(!check) {
        return (
            <div>Loading ...</div>
        )
    }else {
        return (
            <div>
                <Navbar container />
                <div className="container">
                    <div className="login-form">
                        <form className="form" method="POST" onSubmit={_Login}>
                            <div className="form-group">
                                <label htmlFor="email">Email :</label>
                                <input
                                    name="email" type="email"
                                    id="email" className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password :</label>
                                <input
                                    name="password" type="password"
                                    id="password" className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
