import React, { useEffect,useContext,useState } from 'react';
import axios from 'axios';
import Card from "../../components/Card";
import {AppContext} from "../../context/AppContext";
import BreadCrumb from "../../components/BreadCrumb";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL, DASHBOARD_PAGE, JOINED_ROOMS_PAGE_API, ROOMS_PAGE} from "../../urls/AppBaseUrl";
import UserIcon from "../../components/UserIcon";
import Loading from "../../components/Loading";
import Nav from "../../components/Nav";
import {Link} from "react-router-dom";

const JoinedRooms = () => {
    const { auth } = useContext(AppContext);
    const [ rooms, setRooms ] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        getRooms();
    }, [])

    const getRooms = () => {
        axios({
            method : 'GET',
            url : JOINED_ROOMS_PAGE_API,
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
            })
    }
    const render = () => {
        return rooms.map( room => {
            return (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={room.id}>
                    <Card
                        roomId={room.id}
                    >
                        <Link to={ROOMS_PAGE+room.id} className="card-image">
                            <UserIcon letter={room.name[0]} />
                        </Link>
                        <Link to={ROOMS_PAGE+room.id} className="card-title">
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
                    <BreadCrumbItem url={DASHBOARD_PAGE}>
                        Dashboard
                    </BreadCrumbItem>
                    <BreadCrumbItem active>
                        Joined rooms
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
                                rooms.length ? "Joined Rooms" : "You aren't joining any room..."
                            }
                        </Nav>
                        <div className="row rooms">
                            {
                                render()
                            }
                        </div>
                    </div>
            }
        </div>
    )
}


export default JoinedRooms;
