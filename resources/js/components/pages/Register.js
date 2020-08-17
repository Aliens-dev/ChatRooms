import React, {useContext, useState, useEffect} from 'react';
import Navbar from "../components/Navbar";
import { AppContext} from "../context/AppContext";
import {UserLoginAction, UserLogoutAction} from "../context/actions/AuthActions";
import Loading from "../components/Loading";

const Register = (props) => {
    const [check,setCheck] = useState(false);
    const {auth,dispatchAuth} = useContext(AppContext);

    useEffect(() => {
        if(auth.token !== '') {
            axios.post('/checkToken', [],{
                headers : {
                    Authorization : 'Bearer ' + auth.token
                }
            })
                .then(res => {
                    if(res.data.success && res.data.status === 'refresh') {
                        localStorage.setItem('chatApp', JSON.stringify(res.data.data));
                        dispatchAuth(UserLoginAction(res.data.data))
                    }
                    props.history.push('/app')
                    setCheck(true)

                })
                .catch(err => {
                    setCheck(true)
                    localStorage.setItem('chatApp', JSON.stringify({}));
                    dispatchAuth(UserLogoutAction())
                })
        }else {
            setCheck(true);
        }
    },[]);
    if(!check) {
        return <Loading />
    }else {
        return (
            <div>
                <Navbar container />
                Register
            </div>
        )
    }
}


export default Register;
