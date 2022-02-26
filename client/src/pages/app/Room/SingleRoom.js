import React, {useContext, useRef, useState,useEffect} from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {BreadCrumb,Loading} from "../../../components";
import {DASHBOARD_PAGE, ROOMS_PAGE, ROOMS_PAGE_API} from "../../../urls/AppBaseUrl";
import MessageUsers from "./MessageUsers";
import {Link, Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {GET_MESSAGES_ACTION, SEND_MESSAGE_ACTION, UPDATE_ACTIVE_USERS_ACTION, UPDATE_JOINED_USERS_ACTION, UPDATE_LEAVING_USERS_ACTION, UPDATE_MESSAGES_ACTION, UPDATE_TYPING_USER_ACTION} from "../../../actions/MessagesActions";
import { GET_ROOM_ACTION, REMOVE_ROOM_ACTION } from '../../../actions/roomsActions';
import { SHOW_TOAST_ACTION } from '../../../actions/popupsActions';
import dingSoundAudio from '../../../assets/sound/ding.mp3'
import useAudio from '../../../hooks/UseAudio';
import {BiSend} from 'react-icons/bi'

const SingleRoom = props => {

    const params = useParams();
    const dispatch = useDispatch();
    const { echo } = useSelector(state => state.echo)
    const { messages, userTyping, loading } = useSelector(state => state.messages)
    const singleRoomLoading = useSelector(state => state.rooms.singleRoomLoading)
    const { user } = useSelector(state => state.auth.user)
    const room = useSelector(state => state.rooms.singleRoom)
    const [message, setMessage] = useState('');

    const [playAudio,toggleAudio] = useAudio(dingSoundAudio)

    useEffect(() => {
        // check this later !
        if(window.Echo) {
            window.Echo
                .join('room.'+ params.id)
                .listen('.message.sent', (e) => {
                    //setSocketMessage(e.data);
                    if(! playAudio) {
                        toggleAudio();
                    }
                    dispatch(UPDATE_MESSAGES_ACTION(e.message))
                })
                .here(users => {
                    console.log('active users', users)
                    dispatch(UPDATE_ACTIVE_USERS_ACTION(users))
                })
                .joining(user => {
                    console.log('joined user', user)
                    dispatch(UPDATE_JOINED_USERS_ACTION(user))
                })
                .leaving(user => {
                    console.log('left user', user)
                    dispatch(UPDATE_LEAVING_USERS_ACTION(user))
                })
                .listenForWhisper('typing', (user) => {
                    if(! userTyping) {
                        dispatch(UPDATE_TYPING_USER_ACTION(user))
                        setTimeout(() => {
                            dispatch(UPDATE_TYPING_USER_ACTION(null))
                        }, 3000)
                    }
                });
        }
    }, [echo])
    
    const typing = (e) => {
        setMessage(e.target.value)
        setTimeout(() => {
            window.Echo
            .join('room.'+ params.id)
            .whisper('typing', user);
        }, 1000)
    }
    
    const sendMessage = (e) => {
        e.preventDefault();
        if(message === '') {
            return;
        }
        dispatch(SEND_MESSAGE_ACTION(params.id, message))
        .then(res => {
            dispatch(UPDATE_MESSAGES_ACTION(res.data.data))
            setMessage('')
        })
        .catch(error => {
            dispatch(SHOW_TOAST_ACTION('Error!', 'Failed to send message'))
        })
    }

    useEffect(() => {
        dispatch(GET_ROOM_ACTION(params.id))
        dispatch(GET_MESSAGES_ACTION(params.id))
    }, [])

    const deleteRoom = () => {
        dispatch(REMOVE_ROOM_ACTION(params.id))
    }

    const renderMessages = () => {
        return messages.map(message => {
            if(message.sender_id === user.id) {
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
    
    if(singleRoomLoading) {
        return (
            <Loading>
                <Loading.Large />
            </Loading>
        )
    }
    
    if(! room) {
        return <Redirect to={ROOMS_PAGE} />
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
                    { room.name }
                </BreadCrumb.Active>
            </BreadCrumb>
            <div className="room-section" >
                {
                    <MessageUsers />
                }
                <div className="room-messages">
                    <div className="room-info">
                        <div className="room-image">
                            <img src={`/uploads/room-img`} />
                        </div>
                        <div className="room-name">
                            <span>
                                { room.name }
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
                                <Link to={ROOMS_PAGE+params.id+'/edit'} className="dropdown-item">Edit</Link>
                                <div onClick={deleteRoom} className="dropdown-item">Delete</div>
                            </div>
                        </div>
                    </div>
                    <div className="room-message-container">
                        {
                            loading ?
                                <Loading>
                                    <Loading.Large color={"#00F"} />
                                </Loading>
                                :
                                renderMessages()
                        }
                        <div className="message-typing">
                            {
                                userTyping ? userTyping.name + ' is typing' : ''
                            }
                        </div>
                    </div>
                    <form className="room-message-input" onSubmit={sendMessage}>
                        <input
                            value={message}
                            onChange={typing}
                            placeholder="Write a message ..."
                        />
                        <div className="send"
                            onClick={sendMessage}
                        >
                            <BiSend size={24}/>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default SingleRoom;
