import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {AppContext} from "../../context/AppContext";
import BreadCrumb from "../../components/BreadCrumb";
import Nav from "../../components/Nav";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL, ROOM_URL} from "../../urls/AppBaseUrl";

const SingleRoom = props => {
    const [room, setRoom] = useState({});
    const {auth,navbarHeight,pageContentHeight} = useContext(AppContext);
    const [loading,setLoading] = useState(true);
    const [myPageHeight,setMyPageHeight] = useState(0);
    const [breadHeight,setBreadHeight] = useState(0);
    const [roomHeight,setRoomHeight] = useState(0);
    const singleRoom = useRef(null);
    const breadRef = useRef(null);
    useEffect(() => {
        setBreadHeight(breadRef.current.clientHeight);
        setMyPageHeight(pageContentHeight - navbarHeight);
        axios({
            method:"GET",
            url: '/rooms/' + props.match.params.id,
            headers : {
                Authorization : 'bearer ' + auth.token,
            }
        })
            .then(res => {
                setRoom(res.data.data);
                setLoading(false)
            })
            .catch(err => {
                console.log('error');
                setLoading(false)
            })
    }, []);
    useEffect(() => {
        setRoomHeight(myPageHeight - breadHeight);
    },[breadHeight,myPageHeight]);
    return (
        <div className="single-room" ref={singleRoom} style={{height: myPageHeight+'px'}}>
            <div className="room-header" ref={breadRef}>
                <BreadCrumb >
                    <BreadCrumbItem url={APP_URL}>
                        App
                    </BreadCrumbItem>
                    <BreadCrumbItem url={ROOM_URL}>
                        Rooms
                    </BreadCrumbItem>
                    <BreadCrumbItem active>
                        {room.name}
                    </BreadCrumbItem>
                </BreadCrumb>
            </div>
            <div className="room-section" style={{ height: (roomHeight - 1)+'px'}}>
                <div className="room-users">
                    <div className="room-user-search">
                        <input className="search-input" placeholder="Find a user..."/>
                        <i className="fa fa-search" />
                    </div>
                    <div className="room-users-list">
                        <div className="room-user">
                            <div className="user-image">
                                <img src="https://unsplash.it/50/50" />
                            </div>
                            <div className="user-info">
                                <div className="username">
                                    User - 1
                                </div>
                            </div>
                        </div>
                        <div className="room-user">
                            <div className="user-image">
                                <img src="https://unsplash.it/50/50" />
                            </div>
                            <div className="user-info">
                                <div className="username">
                                    User - 1
                                </div>
                            </div>
                        </div>
                        <div className="room-user">
                            <div className="user-image">
                                <img src="https://unsplash.it/50/50" />
                            </div>
                            <div className="user-info">
                                <div className="username">
                                    User - 1
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="room-messages">
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleRoom;
