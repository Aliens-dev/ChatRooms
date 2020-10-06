import React, {useContext, useState, useEffect} from 'react';
import UserIcon from "../../../components/UserIcon";
import {
    setModalHiddenAction,
    setModalVisibleAction,
    setToastMessage,
    setToastShowAction
} from "../../../context/actions/GlobalActions";
import axios from "axios";
import {AppContext} from "../../../context/AppContext";
import Modal from '../../../components/Modal'

const MessageUsers = (props) => {

    const [members,setMembers] = useState([]);
    // Search for users ...
    const [users,setUsers] = useState([]);
    const [searchUser,setSearchUser] = useState('');
    const {auth,dispatchGlobalState} = useContext(AppContext);

    useEffect(() => {
        getMembers();
    },[])

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

    const removeUser = (user) => {
        axios({
            method:"DELETE",
            url: '/rooms/' + props.id + '/users/' + user.id,
            headers : {
                authorization: "bearer "+ auth.token,
            }
        })
            .then((res) => {
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("User successfully removed",`${user.name} is removed`))
                getMembers();
            })
            .catch(err => {
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("Error, failed to remove",`User failed to remove`))
            })
    }

    // Get Room users ...
    const getMembers = () => {
        axios({
            method:"GET",
            url: '/rooms/' + props.id + '/users',
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
    // add a member to the group
    const addUser  = () => {
        let selectedUser = users.find(user => user.email === searchUser);
        axios({
            url: `/rooms/${props.id}/users/${selectedUser.id}`,
            method:'POST',
            headers : {
                authorization : 'bearer ' + auth.token,
            }
        })
            .then(res => {
                getMembers();
                dispatchGlobalState(setModalHiddenAction());
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("User successfully added",`${selectedUser.name} added`))
                setSearchUser('');
                setUsers([])
            })
            .catch(err => {
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("Error, failed to add",`User failed to add`))
            })
    }
    return (
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
                                <UserIcon img={"/uploads/" + member.image} />
                                <div className="user-info">
                                    <div className="username">
                                        {member.name}
                                    </div>
                                    <div className={`${props.activeUsers.some(user => user.id === member.id) && 'active-user'}`} />
                                    <div className="dropdown">
                                        <i className="fa fa-ellipsis-h"  data-toggle="dropdown" />
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item" onClick={() => removeUser(member)}>remove</div>
                                        </div>
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
    )
}


export default MessageUsers;
