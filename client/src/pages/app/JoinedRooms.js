import React, { useEffect,useContext,useState } from 'react';
import axios from 'axios';
import {Card,BreadCrumb,Loading,Navbar} from "../../components";
import {AppContext} from "../../context/AppContext";
import {APP_URL, DASHBOARD_PAGE, JOINED_ROOMS_PAGE_API, ROOMS_PAGE} from "../../urls/AppBaseUrl";
import UserIcon from "../../components/UserIcon";

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
                    <Card roomId={room.id}>
                        <Card.Image>
                            <Card.CardLink to={ROOMS_PAGE+room.id} >
                                <UserIcon letter={room.name[0]} />
                            </Card.CardLink>
                        </Card.Image>
                        <Card.Header>
                            <Card.CardLink to={ROOMS_PAGE+room.id}>
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
                    Joined rooms
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
                                rooms.length ? "Joined Rooms" : "You aren't joining any room..."
                            }
                        </Navbar.Nav>
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
