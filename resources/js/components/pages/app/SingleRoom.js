import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {AppContext} from "../../context/AppContext";
import BreadCrumb from "../../components/BreadCrumb";
import Nav from "../../components/Nav";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL, ROOM_URL} from "../../urls/AppBaseUrl";
import {
    setBreadCrumbHeightAction,
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

    // Search for users ...
    const [users,setUsers] = useState([]);
    const [searchUser,setSearchUser] = useState('');
    const [selectSearchUser,setSelectSearchUser] = useState(false);


    const {auth,globalState,dispatchGlobalState} = useContext(AppContext);
    const [loading,setLoading] = useState(true);
    const singleRoom = useRef(null);
    const breadRef = useRef(null);

    // On Component Mount :

    useEffect(() => {
        getRoom();
        getMembers();
    }, []);

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
                console.log('Success')
            })
            .catch(err => {
                console.log('Failed!')
            })
    }

    useEffect(() => {
        dispatchGlobalState(setBreadCrumbHeightAction(breadRef.current.clientHeight))
        dispatchGlobalState(setPageHeightAction(globalState.pageContentHeight - globalState.navbarHeight))
    }, [loading]);

    // Get Room Height

    useEffect(() => {
        dispatchGlobalState(setRoomHeightAction(globalState.pageHeight - globalState.breadcrumbHeight))
    },[globalState.breadcrumbHeight,globalState.pageHeight]);


    return (
        <div className="single-room" ref={singleRoom} style={{height: globalState.pageHeight + 'px'}}>
            <div className="room-header" ref={breadRef}>
                <BreadCrumb>
                    <BreadCrumbItem url={APP_URL}>
                        App
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
                                User1, User2 & 5 others ...
                            </span>
                                </div>
                            </div>
                            <div className="room-message-container">
                                <div className="room-message-box">
                                    <div className="room-message-left-box">
                                        <span>hello guys ...</span>
                                    </div>
                                </div>
                                <div className="room-message-box">
                                    <div className="room-message-right-box">
                                        <span>hello guys ...</span>
                                    </div>
                                </div>
                                <div className="room-message-box">
                                    <div className="room-message-right-box">
                                        <span>hello guys ...</span>
                                    </div>
                                </div>
                                <div className="room-message-box">
                                    <div className="room-message-left-box">
                                        <span>hello guys ...</span>
                                    </div>
                                </div>
                            </div>
                            <div className="room-message-input">
                                <input placeholder="Write a message ..."/>
                                <div className="send">
                                    <i className="fa fa-paper-plane"/>
                                </div>
                            </div>
                        </div>
                        <Modal
                            title="Add User"
                            onClick={addUser}
                        >
                            <div className="add-user">
                                <input value={searchUser} onChange={(e) => setSearchUser(e.target.value)} placeholder="search for user ..." />
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
