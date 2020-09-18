import React, {useContext, useRef, useState,useEffect} from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {AppContext} from "../../context/AppContext";
import BreadCrumb from "../../components/BreadCrumb";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL, ROOM_URL} from "../../urls/AppBaseUrl";
import {
    setBreadCrumbHeightAction,
    setPageHeightAction,
    setRoomHeightAction
} from "../../context/actions/GlobalActions";
import Loading from "../../components/Loading";
import MessageUsers from "./MessageUsers";

const SingleRoom = props => {
    const [room, setRoom] = useState({});
    const [myEcho,setMyEcho] = useState(null)

    // Active Users
    const [activeUsers,setActiveUsers] = useState([]);
    const [joinedUser,setJoinedUser] = useState([]);
    const [leavingUser,setLeavingUser] = useState([]);
    // messages
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const [userWriting,setUserWriting] = useState('');
    const [isTyping,setIsTyping] = useState(false);
    const [socketMessage,setSocketMessage] = useState(null);
    const {auth} = useContext(AppContext);
    const [loading,setLoading] = useState(true);

    useEffect(()=> {
        setActiveUsers([...activeUsers, joinedUser]);
    },[joinedUser]);

    useEffect(()=> {
        let filter = activeUsers.filter(user => user.id !== leavingUser.id)
        setActiveUsers(filter);
    },[leavingUser]);

    useEffect(() => {
        if(isTyping) {
            setTimeout(() => {
                setUserWriting('')
                clearTimeout(this)
                setIsTyping(false)
            },3000)
        }
    },[isTyping])

    // On Component Mount :

    useEffect(() => {
        getRoom();

        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'd8b949bfb89e354b3e51',
            cluster: 'eu',
            forceTLS: false,
            auth: {
                headers: {
                    Authorization : "Bearer " + auth.token,
                },
            },
        });
        setMyEcho(echo)
    }, []);

    useEffect(() => {
        if(myEcho) {
            myEcho
                .join('room.'+ props.match.params.id)
                .listen('UserSendMessageEvent', (e) => {
                    setSocketMessage(e.data);
                })
                .here(users => {
                    setActiveUsers(users);
                })
                .joining(user => {
                    setJoinedUser(user);
                })
                .leaving(user => {
                    setLeavingUser(user)
                })
                .listenForWhisper('typing', (e) => {
                    setIsTyping(true);
                    setUserWriting(e.name  + ' is Typing ...')
                });
        }
    }, [myEcho])

    const userTyping = (e) => {
        setMessage(e.target.value)
        myEcho
            .join('room.'+ props.match.params.id)
            .whisper('typing', {
                name: auth.user.name
            });
    }

    useEffect(() => {
        if(socketMessage) {
            setMessages([...messages,socketMessage]);
        }
    }, [socketMessage])

    const getRoom = () => {
        axios({
            method:"GET",
            url: '/rooms/' + props.match.params.id,
            headers : {
                Authorization : 'bearer ' + auth.token,
            }
        })
            .then(res => {
                setRoom(res.data.data);
                getMessages();
                setLoading(false)
            })
            .catch(err => {
                props.history.push('/app/rooms');
                setLoading(false)
            })
    }

    const getMessages = () => {
        axios({
            url:'/rooms/'+props.match.params.id+'/messages',
            method:'GET',
            headers : {
                authorization : 'bearer '+ auth.token,
            }
        })
            .then(res=> {
                setMessages(res.data.data);
            })
            .catch(err => {

            })
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if(message === '') {
            return;
        }
        axios({
            url:'/rooms/'+props.match.params.id+'/messages',
            method:'POST',
            data: {
                message,
            },
            headers : {
                authorization : 'bearer '+ auth.token,
            }
        })
            .then(res=> {
                setMessage('');
                setMessages([...messages,res.data.data]);
            })
            .catch(err => {

            })
    }

    const renderMessages = () => {
        return messages.map(message => {
            if(message.sender_id === auth.user.id) {
                return (
                    <div className="room-message-box" key={message.id}>
                        <div className="room-message-right-box">
                            <span>{message.message}</span>
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className="room-message-box" key={message.id}>
                        <div className="room-message-left-box">
                            <span>{message.message}</span>
                        </div>
                    </div>
                )
            }
        });
    }

    return (
        <div className="single-room" >
            <div className="bread-container">
                <BreadCrumb>
                    <BreadCrumbItem url={APP_URL}>
                        Dashboard
                    </BreadCrumbItem>
                    <BreadCrumbItem url={ROOM_URL}>
                        Rooms
                    </BreadCrumbItem>
                    <BreadCrumbItem active>
                        {room.name}
                    </BreadCrumbItem>
                </BreadCrumb>
            </div>
            {
                loading ? <Loading />
                :
                <div className="room-section" >
                    <MessageUsers id={props.match.params.id} activeUsers={activeUsers} />
                    <div className="room-messages">
                        <div className="room-info">
                            <div className="room-image">
                                <img src="https://unsplash.it/60/60"/>
                            </div>
                            <div className="room-name">
                                <span>
                                    {
                                        room.name
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="room-message-container">
                            {
                                renderMessages()
                            }
                            {
                                userWriting
                            }
                        </div>
                        <form className="room-message-input" onSubmit={sendMessage}>
                            <input
                                value={message}
                                onChange={userTyping}
                                placeholder="Write a message ..."
                            />
                            <div className="send" onClick={sendMessage}>
                                <i className="fa fa-paper-plane"/>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}
export default SingleRoom;
