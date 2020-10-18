import React, { useEffect,useContext,useState } from 'react';
import axios from 'axios';
import {Card,BreadCrumb,DropDown,Loading,Navbar} from "../../components";
import {AppContext} from "../../context/AppContext";
import UserIcon from "../../components/UserIcon";
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
                            <Card.Settings>
                                <DropDown className="fa fa-ellipsis-h">
                                    <DropDown.Menu>
                                        <DropDown.Item action={() => props.history.push('/rooms/'+ room.id + '/edit')}>
                                            Edit
                                        </DropDown.Item>
                                        <DropDown.Item action={() => deleteRoom(room.id)}>
                                            Delete
                                        </DropDown.Item>
                                    </DropDown.Menu>
                                </DropDown>
                            </Card.Settings>
                            <Card.Image>
                                <Card.CardLink to={`/rooms/${room.id}`}>
                                    <UserIcon letter={room.name[0]} />
                                </Card.CardLink>
                            </Card.Image>
                            <Card.Header>
                                <Card.CardLink to={`/rooms/${room.id}`}>
                                    <i className="far fa-comments" />
                                    <Card.Title>
                                        { room.name }
                                    </Card.Title>
                                </Card.CardLink>
                            </Card.Header>
                            <Card.Footer>
                                {
                                    renderUsers(room)
                                }
                            </Card.Footer>
                        </Card>
                    </div>
                )
            }
        })
    }
    return (
        <div className="home-page">
            <BreadCrumb>
                <BreadCrumb.Item url={DASHBOARD_PAGE}>
                    Dashboard
                </BreadCrumb.Item>
                <BreadCrumb.Active>
                    Rooms
                </BreadCrumb.Active>
            </BreadCrumb>
            {
                loading ?
                    <Loading>
                        <Loading.Large />
                    </Loading>
                    :
                    <div className="rooms-container container-fluid">
                        <div className="row">
                            <div className="ml-3">
                                <Link to="/rooms/add" className="btn btn-primary">Add Room</Link>
                            </div>
                        </div>
                        <Navbar.Nav className="ml-1 mt-2 row">
                            Public Rooms
                        </Navbar.Nav>
                        <div className="row rooms">
                            {
                                renderRooms(1)
                            }
                        </div>
                        <Navbar.Nav className="ml-1 mt-2 row">
                            Private Rooms
                        </Navbar.Nav>
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
