import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {AppContext} from "../../context/AppContext";
import BreadCrumb from "../../components/BreadCrumb";
import Nav from "../../components/Nav";
import BreadCrumbItem from "../../components/BreadCrumbItem";
import {APP_URL, ROOM_URL} from "../../urls/AppBaseUrl";
import {setBreadCrumbHeightAction, setPageHeightAction, setRoomHeightAction} from "../../context/actions/GlobalActions";
import Loading from "../../components/Loading";

const SingleRoom = props => {
    const [room, setRoom] = useState({});
    const {auth,globalState,dispatchGlobalState} = useContext(AppContext);
    const [loading,setLoading] = useState(true);
    const singleRoom = useRef(null);
    const breadRef = useRef(null);

    // On Component Mount :

    useEffect(() => {
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
        console.log(breadRef)
        dispatchGlobalState(setBreadCrumbHeightAction(breadRef.current.clientHeight))
        dispatchGlobalState(setPageHeightAction(globalState.pageContentHeight - globalState.navbarHeight))
    }, [loading]);

    // Get Room Height

    useEffect(() => {
        dispatchGlobalState(setRoomHeightAction(globalState.pageHeight - globalState.breadcrumbHeight))
    },[globalState.breadcrumbHeight,globalState.pageHeight]);


    return (
        <div className="single-room" ref={singleRoom} style={{height: globalState.pageHeight + 'px'}}>
            <div className="room-header" ref={breadRef}>
                <BreadCrumb>
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
            {
                loading ? <Loading />
                :
                    <div className="room-section" style={{height: (globalState.roomHeight - 1) + 'px'}}>
                        <div className="room-users">
                            <div className="room-user-search">
                                <input className="search-input" placeholder="Find a user..."/>
                                <i className="fa fa-search"/>
                            </div>
                            <div className="room-users-list">
                                <div className="room-user">
                                    <div className="user-image">
                                        <img src="https://unsplash.it/50/50"/>
                                    </div>
                                    <div className="user-info">
                                        <div className="username">
                                            User - 1
                                        </div>
                                    </div>
                                </div>
                                <div className="room-user">
                                    <div className="user-image">
                                        <img src="https://unsplash.it/50/50"/>
                                    </div>
                                    <div className="user-info">
                                        <div className="username">
                                            User - 1
                                        </div>
                                    </div>
                                </div>
                                <div className="room-user">
                                    <div className="user-image">
                                        <img src="https://unsplash.it/50/50"/>
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
                            <div className="room-info">
                                <div className="room-image">
                                    <img src="https://unsplash.it/60/60"/>
                                </div>
                                <div className="room-name">
                            <span>
                                {
                                    room.name
                                }
                            </span>
                                    <span>
                                User1, User2 & 5 others ...
                            </span>
                                </div>
                            </div>
                            <div className="room-message-container">
                                <div className="room-message-box">
                                    <div className="room-message-left-box">
                                        <span>hello guys ...</span>
                                    </div>
                                </div>
                                <div className="room-message-box">
                                    <div className="room-message-right-box">
                                        <span>hello guys ...</span>
                                    </div>
                                </div>
                                <div className="room-message-box">
                                    <div className="room-message-right-box">
                                        <span>hello guys ...</span>
                                    </div>
                                </div>
                                <div className="room-message-box">
                                    <div className="room-message-left-box">
                                        <span>hello guys ...</span>
                                    </div>
                                </div>
                            </div>
                            <div className="room-message-input">
                                <input placeholder="Write a message ..."/>
                                <div className="send">
                                    <i className="fa fa-paper-plane"/>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
export default SingleRoom;
