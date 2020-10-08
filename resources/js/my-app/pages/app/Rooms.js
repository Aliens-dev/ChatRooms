import React, { useEffect,useContext,useState } from 'react';
import axios from 'axios';
import Card from "../../components/Card";
import {AppContext} from "../../context/AppContext";
import BreadCrumb from "../../components/BreadCrumb";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import UserIcon from "../../components/UserIcon";
import Loading from "../../components/Loading";
import Nav from "../../components/Nav";
import {Link} from "react-router-dom";
import {setToastMessage, setToastShowAction} from "../../context/actions/GlobalActions";
import {DASHBOARD_PAGE, PROFILE_PAGE_API, ROOMS_PAGE_API} from "../../urls/AppBaseUrl";

const Rooms = (props) => {
    const { auth, dispatchGlobalState } = useContext(AppContext);
    const [ rooms, setRooms ] = useState([]);
    const [loading,setLoading] = useState(true);
    const [users,setUsers] = useState([]);

    useEffect(() => {
        getRooms();
    }, [])

    const getRooms = () => {
        axios({
            method : 'GET',
            url : ROOMS_PAGE_API,
            headers : {
                Authorization : 'bearer ' + auth.token,
            }
        })
            .then(res => {
                setRooms(res.data.data);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    const deleteRoom = (roomId) => {
        axios({
            url: ROOMS_PAGE_API+ roomId,
            method : 'DELETE',
            headers : {
                authorization: "Bearer "+ auth.token
            }
        })
            .then(res => {
                getRooms();
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("Room successfully removed",`${room.name} is removed`))
            })
            .catch(err => {
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("Error, try again",`${room.name} failed to remove`))
            })
    }

    const getUsers = () => {
        axios({
            url : PROFILE_PAGE_API,
            method : 'GET',
            headers :{
                authorization : 'Bearer '+ auth.token,
            }
        })
            .then((res) => {
                setUsers(res.data.data)
            })
    }

    const getUser = (room) => {
        axios({
            url : ROOMS_PAGE_API + room.id + '/users',
            method: 'GET',
            headers : {
                authorization : 'bearer '+ auth.token,
            }
        })
            .then(res => {

            })
    }

    const renderUsers = (room) => {
        if(users.length) {
            console.log(users)
            const roomUsers = users.filter(user => user.room.id == room.id);
            return roomUsers.map(user => <div>{user.image}</div>)
        }
    }

    const renderRooms = (type) => {
        return rooms.map( room => {
            getUser(room);
            if(room.type === type) {
                return (
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={room.id}>
                        <Card>
                            <div className="settings">
                                <div className="dropdown">
                                    <i className="fa fa-ellipsis-h"
                                       data-toggle="dropdown"
                                       aria-haspopup="true"
                                       aria-expanded="false"
                                    />
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item"
                                             onClick={() => props.history.push('/rooms/'+ room.id + '/edit')}
                                        >Edit</div>
                                        <div className="dropdown-item"
                                             onClick={() => deleteRoom(room.id)}
                                        >Delete</div>
                                    </div>
                                </div>
                            </div>
                            <Link className="card-image" to={`/rooms/${room.id}`} >
                                <UserIcon letter={room.name[0]} />
                            </Link>
                            <Link className="card-title" to={`/rooms/${room.id}`}>
                                <i className="far fa-comments" />
                                <div>
                                    { room.name }
                                </div>
                            </Link>
                            <div className="card-foot">
                                {
                                    renderUsers(room)
                                }
                            </div>
                        </Card>
                    </div>
                )
            }
        })
    }
    return (
        <div className="home-page">
            <div className="bread-container">
                <BreadCrumb>
                    <BreadCrumbItem url={DASHBOARD_PAGE}>
                        Dashboard
                    </BreadCrumbItem>
                    <BreadCrumbItem active>
                        Rooms
                    </BreadCrumbItem>
                </BreadCrumb>
            </div>
            {
                loading ?
                    <Loading />
                    :
                    <div className="rooms-container container-fluid">
                        <div className="row">
                            <div className="ml-3">
                                <Link to="/rooms/add" className="btn btn-primary">Add Room</Link>
                            </div>
                        </div>
                        <Nav className="ml-1 mt-2 row">
                            Public Rooms
                        </Nav>
                        <div className="row rooms">
                            {
                                renderRooms(1)
                            }
                        </div>
                        <Nav className="ml-1 mt-2 row">
                            Private Rooms
                        </Nav>
                        <div className="row rooms">
                            {
                                renderRooms(0)
                            }
                        </div>
                    </div>
            }
        </div>
    )
}


export default Rooms;
