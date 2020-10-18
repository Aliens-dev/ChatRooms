import React, { useEffect,useContext,useState } from 'react';
import axios from 'axios';
import {Card,BreadCrumb,Loading,Navbar} from "../../components";
import {AppContext} from "../../context/AppContext";
import {APP_URL, DASHBOARD_PAGE, PUBLIC_ROOMS_PAGE_API, ROOM_URL, ROOMS_PAGE} from "../../urls/AppBaseUrl";
import UserIcon from "../../components/UserIcon";
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
            url : PUBLIC_ROOMS_PAGE_API,
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
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={room.id}>
                    <Card
                        roomId={room.id}
                    >
                        <Card.Image>
                            <Card.CardLink  to={ROOMS_PAGE+room.id}>
                                <UserIcon letter={room.name[0]} />
                            </Card.CardLink>
                        </Card.Image>
                        <Card.Header>
                            <Card.CardLink to={ROOMS_PAGE+room.id} >
                                <i className="far fa-comments" />
                                <Card.Title>
                                    { room.name }
                                </Card.Title>
                            </Card.CardLink>
                        </Card.Header>
                        <Card.Footer>
                            <UserIcon width={35} height={35}/>
                            <UserIcon width={35} height={35}/>
                            <UserIcon width={35} height={35}/>
                            <UserIcon width={35} height={35}/>
                            <UserIcon width={35} height={35}/>
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
                    Public rooms
                </BreadCrumb.Active>
            </BreadCrumb>
            {
                loading ?
                    <Loading>
                        <Loading.Large />
                    </Loading>
                    :
                    <div className="container-fluid">
                        <Navbar.Nav className="ml-1 mt-2 row">
                            {
                                rooms.length ? "Public Rooms" : "There is no Public rooms"
                            }
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


export default PublicRooms;
