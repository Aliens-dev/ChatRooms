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

const Rooms = () => {
    const { auth, dispatchGlobalState } = useContext(AppContext);
    const [ rooms, setRooms ] = useState([]);
    const [loading,setLoading] = useState(true);
    const [newRoom,setNewRoom] = useState({name:'',type : 0});

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

    const addRoom = () => {
        axios({
            url: '/rooms',
            method:'POST',
            data : {...newRoom},
            headers : {
                authorization: 'bearer ' + auth.token,
            }
        })
            .then(res => {
                getRooms();
                dispatchGlobalState(setModalHiddenAction())
            })
            .catch(err => {

            })
    }

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
        <div className="home-page">
            <div>
                <BreadCrumb  >
                    <BreadCrumbItem url={APP_URL}>
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
                    <div className="container-fluid">
                        <div className="row">
                            <div className="ml-3">
                                <button className="btn btn-primary"
                                        onClick={() => dispatchGlobalState(setModalVisibleAction())}
                                >Add Room</button>
                            </div>
                        </div>
                        <div className="row rooms">
                            {
                                renderCards()
                            }
                        </div>
                    </div>
            }
            <Modal
                title="Add new room"
                onClick={addRoom}
            >
                <div className="modal-body">
                    <div className="mb-2">
                        <input type="text" placeholder="Room name..."
                           value={newRoom.name}
                           onChange={ e=> setNewRoom({...newRoom, name:e.target.value})}
                        />
                    </div>
                    <div>
                        <select
                            onChange={ e=> setNewRoom({...newRoom, type:e.target.value})}
                            value={newRoom.type}
                        >
                            <option value="0">Private</option>
                            <option value="1">Public</option>
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    )
}


export default Rooms;
