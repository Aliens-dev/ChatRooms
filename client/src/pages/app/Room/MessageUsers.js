import React, {useContext, useState, useEffect} from 'react';
import UserIcon from "../../../components/UserIcon";
import axios from "axios";
import Modal from '../../../components/Modal'
import {PROFILE_PAGE_API, ROOMS_PAGE_API} from "../../../urls/AppBaseUrl";
import {useDispatch, useSelector} from "react-redux";
import {GET_ROOM_MEMBERS_ACTION, REMOVE_ROOM_MEMBER_ACTION} from "../../../actions/roomsActions";
import Loading from "../../../components/loading/index";
import { SHOW_MODAL_ACTION } from '../../../actions/popupsActions';
import { useParams } from 'react-router-dom';
import { INVITE_USER_ACTION, SEARCH_USERS_ACTION } from '../../../actions/usersActions';
import { GET_USERS } from '../../../actions';

import {AiOutlinePlusCircle} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'

const MessageUsers = (props) => {

    const dispatch = useDispatch()
    const {membersLoading, roomMembers} = useSelector(state => state.rooms);
    const {users} = useSelector(state => state.users);
    const {activeUsers, leavingUsers, joinedUsers} = useSelector(state => state.messages);
    const [isSelectedUser,setIsSelectedUser] = useState(false);
    const params = useParams()

    const [searchUser, setSearchUser] = useState('')

    useEffect(() => {
        dispatch(GET_ROOM_MEMBERS_ACTION(params.id))
    }, [])


    // const [members,setMembers] = useState([]);
    // Search for users ...
    
    useEffect(() => {
        if(searchUser !== '') {
            dispatch(SEARCH_USERS_ACTION(searchUser)) 
        }else {
            setIsSelectedUser(false);
            dispatch({type: GET_USERS, payload: []})
        }
    }, [searchUser])
    
    const removeUser = (user) => {
        dispatch(REMOVE_ROOM_MEMBER_ACTION(params.id, user))
    }
    
    // // add a member to the group
    // const addUser  = () => {
    //     let selectedUser = users.find(user => user.email === searchUser);
    //     axios({
    //         url: ROOMS_PAGE_API + params.id+'/users/'+ selectedUser.id,
    //         method:'POST',
    //         headers : {
    //             authorization : 'bearer ' + auth.token,
    //         }
    //     })
    //         .then(res => {
                
    //         })
    //         .catch(err => {
                
    //         })
    // }

    const inviteUser = () => {
        const user = users.find(u => u.email === searchUser);
        //console.log(user)
        if(user) {
            dispatch(INVITE_USER_ACTION(params.id, user))
        }
    }


    return (
        <div className="room-users">
            <div className="room-user-search">
                <input className="search-input" placeholder="Find a user..."/>
                <BiSearch />
            </div>
            <div className="room-users-list">
                {
                    membersLoading ?
                        <Loading>
                            <Loading.Large color={"#00F"} />
                        </Loading>
                        :
                        roomMembers.members.map(member => {
                            return (
                                <div className="room-user" key={member.id}>
                                    {
                                        member.image ? <UserIcon img={"/uploads/" + member.image} /> :
                                            <UserIcon />
                                    }
                                    <div className="user-info">
                                        <div className="username">
                                            {member.name}
                                        </div>
                                        <div
                                            className={`${activeUsers.some(user => user.id === member.id) && 'active-user'}`}
                                        />
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
                <div
                    onClick={() => dispatch(SHOW_MODAL_ACTION())}
                >
                    <AiOutlinePlusCircle />
                </div>
            </div>
            {
                <Modal
                    title="Add User"
                    onClick={inviteUser}
                >
                    <div className="add-user">
                        <input
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                            placeholder="search for user ..." 
                        />
                        <div className="search-users-list">
                            {
                                !isSelectedUser && users.map(user => {
                                    return (
                                        <div className="search-user"
                                            key={user.id} 
                                            onClick={() => {
                                                setSearchUser(user.email)
                                                setIsSelectedUser(true);
                                            }}
                                        >
                                            <div>{user.email}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}


export default MessageUsers;
