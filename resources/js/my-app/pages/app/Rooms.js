import React, { useEffect,useContext,useState } from 'react';
import axios from 'axios';
import Card from "../../components/Card";
import {AppContext} from "../../context/AppContext";
import BreadCrumb from "../../components/BreadCrumb";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL, ROOM_URL} from "../../urls/AppBaseUrl";
import UserIcon from "../../components/UserIcon";
import Loading from "../../components/Loading";
import {setModalHiddenAction, setModalVisibleAction} from "../../context/actions/GlobalActions";
import Modal from '../../components/Modal';
import Nav from "../../components/Nav";
import {Link} from "react-router-dom";

const Rooms = (props) => {
    const { auth, dispatchGlobalState } = useContext(AppContext);
    const [ rooms, setRooms ] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        getRooms();
    }, [])

    const getRooms = () => {
        axios({
            method : 'GET',
            url : '/rooms',
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
        event.stopPropagation()
        axios({
            url: "/rooms/"+ roomId,
            method : 'DELETE',
            headers : {
                authorization: "Bearer "+ auth.token
            }
        })
            .then(res => {
                getRooms();
            })
            .catch(err => {
                alert('Error Failed To delete!')
            })
    }

    const renderRooms = (type) => {
        return rooms.map( room => {
            if(room.type === type) {
                return (
                    <div className="col-3" key={room.id}>
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
                                             onClick={() => props.history.push('/app/rooms/'+ room.id + '/edit')}
                                        >Edit</div>
                                        <div className="dropdown-item"
                                             onClick={() => deleteRoom(room.id)}
                                        >Delete</div>
                                    </div>
                                </div>
                            </div>
                            <Link className="card-image" to={`/app/rooms/${room.id}`} >
                                <UserIcon letter={room.name[0]} />
                            </Link>
                            <Link className="card-title" to={`/app/rooms/${room.id}`}>
                                <i className="far fa-comments" />
                                <div>
                                    { room.name }
                                </div>
                            </Link>
                            <div className="card-foot">
                                <UserIcon width={35} height={35}/>
                                <UserIcon width={35} height={35}/>
                                <UserIcon width={35} height={35}/>
                                <UserIcon width={35} height={35}/>
                                <UserIcon width={35} height={35}/>
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
                    <BreadCrumbItem url="/app">
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
                                <Link to="/app/rooms/add" className="btn btn-primary">Add Room</Link>
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
                        <Nav className="ml-1 mt-2  row">
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
