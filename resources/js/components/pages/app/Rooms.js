import React, { useEffect,useContext,useState } from 'react';
import axios from 'axios';
import Nav from "../../components/Nav";
import Card from "../../components/Card";
import {AppContext} from "../../context/AppContext";
import BreadCrumb from "../../components/BreadCrumb";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL, ROOM_URL} from "../../urls/AppBaseUrl";
import UserIcon from "../../components/UserIcon";
import Loading from "../../components/Loading";

const Rooms = () => {
    const { auth, dispatchAuth,_Logout } = useContext(AppContext);
    const [ rooms, setRooms ] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
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
    }, [])

    const renderCards = () => {
        return rooms.map( room => {
            return (
                <div className="col-3" key={room.id}>
                    <Card
                        roomId={room.id}
                    >
                        <div className="card-image">
                            <UserIcon letter={room.name[0]} />
                        </div>
                        <div className="card-title">
                            <i className="far fa-comments" />
                            <div>
                                { room.name }
                            </div>
                        </div>
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
        <div className="container-fluid home-page">
            <Nav className="mt-1 mb-1">
                <BreadCrumb  >
                    <BreadCrumbItem url={APP_URL}>
                        App
                    </BreadCrumbItem>
                    <BreadCrumbItem active>
                        Rooms
                    </BreadCrumbItem>
                </BreadCrumb>
            </Nav>
            <Nav>
                <button className="btn btn-primary">Add Room</button>
            </Nav>
            {
                loading ?
                    <Loading />
                    :
                    <div className="row rooms">

                        {
                            renderCards()
                        }
                    </div>
            }
        </div>
    )
}


export default Rooms;
