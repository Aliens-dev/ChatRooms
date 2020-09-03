import React, {useContext, useRef, useState,useEffect} from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {AppContext} from "../../context/AppContext";
import BreadCrumb from "../../components/BreadCrumb";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL, ROOM_URL} from "../../urls/AppBaseUrl";
import {
    setBreadCrumbHeightAction, setModalHiddenAction,
    setModalVisibleAction,
    setPageHeightAction,
    setRoomHeightAction
} from "../../context/actions/GlobalActions";
import Loading from "../../components/Loading";
import UserIcon from "../../components/UserIcon";
import Modal from "../../components/Modal";

const SingleRoom = props => {

    const [room, setRoom] = useState({});
    const [members,setMembers] = useState([]);

    const [myEcho,setMyEcho] = useState(null)

    // Search for users ...
    const [users,setUsers] = useState([]);
    const [searchUser,setSearchUser] = useState('');
    const [selectSearchUser,setSelectSearchUser] = useState(false);

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
    const {auth,globalState,dispatchGlobalState} = useContext(AppContext);
    const [loading,setLoading] = useState(true);
    const singleRoom = useRef(null);
    const breadRef = useRef(null);


    useEffect(()=> {
        setActiveUsers([...activeUsers, joinedUser]);
    },[joinedUser]);

    useEffect(()=> {
        let filter = activeUsers.filter(user => user.id !== leavingUser.id)
        setActiveUsers(filter);
    },[leavingUser]);

    useEffect(() => {
        console.log(userWriting);
        //setIsTyping(true);
    },[userWriting])

    useEffect(() => {
        if(isTyping) {
            setTimeout(() => {
                setUserWriting('')
                clearTimeout(this)
                setIsTyping(false)
            },3000)
        }
    },[isTyping])


    useEffect(() => {
        dispatchGlobalState(setBreadCrumbHeightAction(breadRef.current.clientHeight))
        dispatchGlobalState(setPageHeightAction(globalState.pageContentHeight - globalState.navbarHeight))
    }, [loading]);

    // Get Room Height
    useEffect(() => {
        dispatchGlobalState(setRoomHeightAction(globalState.pageHeight - globalState.breadcrumbHeight))
    },[globalState.breadcrumbHeight,globalState.pageHeight]);

    // On Component Mount :

    useEffect(() => {
        getRoom();
        getMembers();
        getMessages();

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
                setLoading(false)
            })
            .catch(err => {
                console.log('error');
                setLoading(false)
            })
    }

    // Get Room users ...
    const getMembers = () => {
        axios({
            method:"GET",
            url: '/rooms/' + props.match.params.id + '/users',
            headers : {
                Authorization : 'bearer ' + auth.token,
            }
        })
            .then(res => {
                setMembers(res.data.data);
            })
            .catch(err => {
                console.log('error');
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

    useEffect(() => {
        if(searchUser !== '') {
            axios({
                url: '/users',
                method: 'GET',
                params: {
                    email : searchUser,
                },
                headers : {
                    Authorization: 'bearer ' + auth.token,
                }
            })
                .then(res => {
                    setUsers(res.data.data);
                })
                .catch(err => {

                })
        }else {
            setUsers([]);
        }
    }, [searchUser])

    // add a member to the group
    const addUser  = () => {
        let selectedUser = users.find(user => user.email === searchUser);
        axios({
            url: `/rooms/${room.id}/users/${selectedUser.id}`,
            method:'POST',
            headers : {
                authorization : 'bearer ' + auth.token,
            }
        })
            .then(res => {
                getMembers();
                dispatchGlobalState(setModalHiddenAction());
                setSearchUser('');
                setUsers([])
            })
            .catch(err => {
                console.log('Failed!')
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
        <div className="single-room" ref={singleRoom} style={{height: globalState.pageHeight + 'px'}}>
            <div ref={breadRef}>
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
                <div className="room-section" style={{height: (globalState.roomHeight - 1) + 'px'}}>
                    <div className="room-users">
                        <div className="room-user-search">
                            <input className="search-input" placeholder="Find a user..."/>
                            <i className="fa fa-search"/>
                        </div>
                        <div className="room-users-list">
                            {
                                members.map(member => {
                                    return (
                                        <div className="room-user" key={member.id}>
                                            <UserIcon />
                                            <div className="user-info">
                                                <div className="username">
                                                    {member.name}
                                                </div>
                                                <div className={`${activeUsers.some(user => user.id === member.id) && 'active-user'}`} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="room-controls">
                            <div onClick={() => dispatchGlobalState(setModalVisibleAction())}>
                                <i className="fa fa-plus" />
                            </div>
                        </div>
                    </div>
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
                                <span>
                                    {
                                        members.length && members[0].name + ' and ' + (members.length) + ' members'
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
                    <Modal
                        title="Add User"
                        onClick={addUser}
                    >
                        <div className="add-user">
                            <input
                                value={searchUser}
                                onChange={(e) => setSearchUser(e.target.value)}
                                placeholder="search for user ..." />
                            <div className="search-users-list">
                                {
                                    users.map(user => {
                                        return (
                                            <div className="search-user" key={user.id} onClick={() => setSearchUser(user.email)}>
                                                <div>{user.email}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Modal>
                </div>
            }
        </div>
    )
}
export default SingleRoom;
