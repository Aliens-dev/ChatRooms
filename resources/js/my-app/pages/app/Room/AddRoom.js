import React , {useState,useContext,useRef} from 'react';
import BreadCrumb from "../../../components/BreadCrumb";
import BreadCrumbItem from "../../../components/BreadCrumbItem";
import {AppContext} from "../../../context/AppContext";
import Card from "../../../components/Card";
import UserIcon from "../../../components/UserIcon";
import {setToastMessage, setToastShowAction} from "../../../context/actions/GlobalActions";


const AddRoom = (props) => {

    const [room,setRoom] = useState({type:0})
    const avatarBtn = useRef(null);
    const [previewAvatar,setPreviewAvatar] = useState("");
    const {auth,dispatchGlobalState} = useContext(AppContext);
    const [progress,setProgress] = useState(0);

    const chooseAvatar = (e) => {
        e.preventDefault();
        avatarBtn.current.click();
    }

    const avatarBtnChange = () => {
        setRoom({...room,image: avatarBtn.current.files[0]})
        setPreviewAvatar(URL.createObjectURL(avatarBtn.current.files[0]))
    }
    const addRoom =() => {
        let formData = new FormData();
        formData.append('name', room.name);
        formData.append('image', room.image);
        formData.append('type', room.type);
        axios({
            method:'POST',
            url : '/rooms/',
            data:formData,
            headers : {
                authorization : "Bearer " + auth.token,
                "Content-Type" : 'multipart/form-data'
            }
        })
            .then(res => {
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("Room added successfully",`${room.name} is Added`))
                props.history.push('/app/rooms')
            })
            .catch(err => {
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("Error, failed to add",`${room.name} failed to add`))
            })
    }

    return (
        <div className="room-page">
            <div className="bread-container">
                <BreadCrumb>
                    <BreadCrumbItem url="/app">
                        Dashboard
                    </BreadCrumbItem>
                    <BreadCrumbItem url="/app/rooms">
                        Rooms
                    </BreadCrumbItem>
                    <BreadCrumbItem active>
                        Add Room
                    </BreadCrumbItem>
                </BreadCrumb>
            </div>
            <div>
                <Card style={{width:"500px", margin:"0 auto"}}>
                    <h1>Add new room</h1>
                    <div className="form-group">
                        <label htmlFor="name">Name </label>
                        <input type="text" className="form-control"
                               value={room.name}
                               onChange={(e) => setRoom({...room,name:e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <select
                            className="form-control"
                            onChange={ e=> setRoom({...room, type:e.target.value})}
                            value={room.type}
                        >
                            <option value="0">Private</option>
                            <option value="1">Public</option>
                        </select>
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <label htmlFor="file" className="mr-2">Avatar:  </label>

                        <input ref={avatarBtn} onChange={avatarBtnChange} type="file" className="d-none" />

                        <div className="form-image d-flex align-items-center flex-grow-1 justify-content-between">
                            <button id="file" className="btn btn-primary"
                                    onClick={chooseAvatar}>
                                Upload Avatar
                            </button>
                            {
                                previewAvatar !== '' && <UserIcon img={previewAvatar} alt="preview" />
                            }
                            {
                                progress > 0 && (
                                    <div>
                                        <progress min="0" max="100" value={progress} />
                                        <span>{ progress } %</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={addRoom}>Add</button>
                </Card>
            </div>
        </div>
    )
}

export default AddRoom;
