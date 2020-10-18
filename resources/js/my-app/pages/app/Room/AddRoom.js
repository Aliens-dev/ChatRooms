import React , {useState,useContext,useRef} from 'react';
import {AppContext} from "../../../context/AppContext";
import {Card,BreadCrumb} from "../../../components";
import UserIcon from "../../../components/UserIcon";
import {setToastMessage, setToastShowAction} from "../../../context/actions/GlobalActions";
import {ROOMS_PAGE, ROOMS_PAGE_API,APP_URL} from "../../../urls/AppBaseUrl";


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
            url : ROOMS_PAGE_API,
            data:formData,
            headers : {
                authorization : "Bearer " + auth.token,
                "Content-Type" : 'multipart/form-data'
            }
        })
            .then(res => {
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("Room added successfully",`${room.name} is Added`))
                props.history.push(ROOMS_PAGE)
            })
            .catch(err => {
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("Error, failed to add",`${room.name} failed to add`))
            })
    }

    return (
        <div className="room-page">
            <BreadCrumb>
                <BreadCrumb.Item url={APP_URL}>
                    Dashboard
                </BreadCrumb.Item>
                <BreadCrumb.Item url={ROOMS_PAGE}>
                    Rooms
                </BreadCrumb.Item>
                <BreadCrumb.Active>
                    Add Room
                </BreadCrumb.Active>
            </BreadCrumb>
            <div>
                <Card style={{width:"500px", margin:"0 auto"}}>
                    <Card.Header>
                        <Card.Title>
                            Add new room
                        </Card.Title>
                    </Card.Header>
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
