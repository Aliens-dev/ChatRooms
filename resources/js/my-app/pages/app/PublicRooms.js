import React, { useEffect,useContext,useState } from 'react';
import axios from 'axios';
import Card from "../../components/Card";
import {AppContext} from "../../context/AppContext";
import BreadCrumb from "../../components/BreadCrumb";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL, ROOM_URL} from "../../urls/AppBaseUrl";
import UserIcon from "../../components/UserIcon";
import Loading from "../../components/Loading";
import Nav from "../../components/Nav";
import {Link} from "react-router-dom";

const PublicRooms = () => {
    const { auth } = useContext(AppContext);
    const [ rooms, setRooms ] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        getRooms();
    }, [])

    const getRooms = () => {
        axios({
            method : 'GET',
            url : '/rooms/public',
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

    const renderRooms = () => {
        return rooms.map( room => {
            return (
                <div className="col-3" key={room.id}>
                    <Card
                        roomId={room.id}
                    >
                        <Link to={`/app/rooms/${room.id}`} className="card-image">
                            <UserIcon letter={room.name[0]} />
                        </Link>
                        <Link to={`/app/rooms/${room.id}`} className="card-title">
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

        })
    }
    return (
        <div className="home-page">
            <div className="bread-container">
                <BreadCrumb  >
                    <BreadCrumbItem url={APP_URL}>
                        Dashboard
                    </BreadCrumbItem>
                    <BreadCrumbItem active>
                        Public rooms
                    </BreadCrumbItem>
                </BreadCrumb>
            </div>
            {
                loading ?
                    <Loading />
                    :
                    <div className="container-fluid">
                        <Nav className="ml-1 mt-2 row">
                            {
                                rooms.length ? "Public Rooms" : "There is no Public rooms"
                            }
                        </Nav>
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


export default PublicRooms;
