import React, {useContext, useRef, useState,useEffect} from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {AppContext} from "../../../context/AppContext";
import {BreadCrumb,Loading} from "../../../components";
import {DASHBOARD_PAGE, ROOMS_PAGE, ROOMS_PAGE_API} from "../../../urls/AppBaseUrl";
import MessageUsers from "./MessageUsers";
import {Link} from 'react-router-dom';

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
            url: ROOMS_PAGE_API + props.match.params.id,
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
                props.history.push(ROOMS_PAGE);
                setLoading(false)
            })
    }

    const getMessages = () => {
        axios({
            url:ROOMS_PAGE_API+props.match.params.id+'/messages',
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
            url:ROOMS_PAGE_API+props.match.params.id+'/messages',
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
    const deleteRoom = () => {
        axios({
            url: ROOMS_PAGE_API+ room.id,
            method : 'DELETE',
            headers : {
                authorization: "Bearer "+ auth.token
            }
        })
            .then(res => {
                props.history.push(ROOMS_PAGE);
            })
            .catch(err => {
                alert('Error Failed To delete!')
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
            <BreadCrumb>
                <BreadCrumb.Item url={DASHBOARD_PAGE}>
                    Dashboard
                </BreadCrumb.Item>
                <BreadCrumb.Item url={ROOMS_PAGE}>
                    Public rooms
                </BreadCrumb.Item>
                <BreadCrumb.Active>
                    {room.name}
                </BreadCrumb.Active>
            </BreadCrumb>
            {
                loading ?
                    <Loading>
                        <Loading.Large />
                    </Loading>
                :
                <div className="room-section" >
                    <MessageUsers id={props.match.params.id} activeUsers={activeUsers} />
                    <div className="room-messages">
                        <div className="room-info">
                            <div className="room-image">
                                <img src={`/uploads/${room.image}`} />
                            </div>
                            <div className="room-name">
                                <span>
                                    {
                                        room.name
                                    }
                                </span>
                            </div>
                            <div className="d-flex flex-grow-1"></div>
                            <div className="dropleft">
                                <i className="fa fa-ellipsis-h"
                                   data-toggle="dropdown"
                                   aria-haspopup="true"
                                   aria-expanded="false"
                                />
                                <div className="dropdown-menu">
                                    <Link to={ROOMS_PAGE+room.id+'/edit'} className="dropdown-item">Edit</Link>
                                    <div onClick={deleteRoom} className="dropdown-item">Delete</div>
                                </div>
                            </div>
                        </div>
                        <div className="room-message-container">
                            {
                                renderMessages()
                            }
                            <div className="message-typing">
                                {
                                    userWriting
                                }
                            </div>
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
