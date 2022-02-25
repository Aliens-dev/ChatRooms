import React, { useEffect } from 'react';
import {Card,BreadCrumb,DropDown,Loading,Navbar} from "../../components";
import UserIcon from "../../components/UserIcon";
import {Link} from "react-router-dom";
import {DASHBOARD_PAGE} from "../../urls/AppBaseUrl";
import {useDispatch, useSelector} from "react-redux";
import {GET_ROOMS_ACTION,REMOVE_ROOM_ACTION} from "../../actions/roomsActions";
import {GET_ROOM_USERS_ACTION, RESET_ROOM_USERS_ACTION} from "../../actions/usersActions";

const Rooms = (props) => {

    const dispatch = useDispatch()

    const rooms = useSelector(state => state.rooms.rooms)
    const roomUsers = useSelector(state => state.users.roomUsers)
    const loading = useSelector(state => state.auth.loading)

    useEffect(() => {
        dispatch(RESET_ROOM_USERS_ACTION())
        dispatch(GET_ROOMS_ACTION())
    }, [])

    const deleteRoom = (roomId) => {
        dispatch(REMOVE_ROOM_ACTION(roomId))
    }

    const getUsers = (room) =>{
        //let check = roomUsers.some(roomUser => parseInt(roomUser.roomId) === parseInt(room.id))
        if(! roomUsers[room.id]) {
            dispatch(GET_ROOM_USERS_ACTION(room.id))
        }
    }

    const renderUsers = (roomId) => {
        if (roomUsers[roomId]) {
            return roomUsers[roomId].length;
        }
    }

    const renderRooms = () => {
        return rooms.map( room => {
            getUsers(room)
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
                                renderUsers(room.id)
                            }
                        </Card.Footer>
                    </Card>
                </div>
            )
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
                            My Rooms
                        </Navbar.Nav>
                        <div className="row rooms">
                            {
                                renderRooms()
                            }
                        </div>
                    </div>
            }
        </div>
    )

}


export default Rooms;
