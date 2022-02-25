import React , {useEffect,useState,useContext,useRef} from 'react';
import axios from 'axios'
import {AppContext} from "../../../context/AppContext";
import {Card,Loading,BreadCrumb} from "../../../components";
import UserIcon from "../../../components/UserIcon";
import {setToastMessage, setToastShowAction} from "../../../context/actions/GlobalActions";
import {APP_URL, ROOMS_PAGE, ROOMS_PAGE_API} from "../../../urls/AppBaseUrl";

const EditRoom = (props) => {

    const [room,setRoom] = useState({})
    const [loading,setLoading] = useState(true);
    const avatarBtn = useRef(null);
    const [previewAvatar,setPreviewAvatar] = useState("");
    const {auth,dispatchGlobalState} = useContext(AppContext);
    const [progress,setProgress] = useState(0);

    console.log(room)

    useEffect(() => {
        getRoom();
    },[]);

    const chooseAvatar = (e) => {
        e.preventDefault();
        avatarBtn.current.click();
    }

    const avatarBtnChange = () => {
        setRoom({...room,image: avatarBtn.current.files[0]})
        setPreviewAvatar(URL.createObjectURL(avatarBtn.current.files[0]))
    }
    const updateRoom = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', room.name);
        formData.append('image', room.image);
        formData.append('type', room.type);
        formData.append('_method', 'PATCH');
        axios({
            method:'POST',
            url : ROOMS_PAGE_API + room.id,
            data:formData,
            headers : {
                authorization : "Bearer " + auth.token,
                "Content-Type" : 'multipart/form-data'
            }
        })
            .then(res => {
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("Room edited successfully",`${room.name} is edited`))
                props.history.push('/app/rooms/'+ room.id)
            })
            .catch(err => {
                dispatchGlobalState(setToastShowAction())
                dispatchGlobalState(setToastMessage("Error, try again",`${room.name} failed to edit`))
            })
    }

    const getRoom = () => {
        axios({
            url: ROOMS_PAGE_API+ props.match.params.id,
            method: "GET",
            headers : {
                authorization : 'Bearer '+ auth.token,
            }
        })
            .then(res => {
                setRoom(res.data.data)
                setLoading(false)
            })
    }

    const render = () => {
        if(loading) {
            return (
                <Loading>
                    <Loading.Large />
                </Loading>
            )
        }else {
            return (
                <div className="room-page">
                    <BreadCrumb>
                        <BreadCrumb.Item url={APP_URL}>
                            Dashboard
                        </BreadCrumb.Item>
                        <BreadCrumb.Item url={ROOMS_PAGE}>
                            Rooms
                        </BreadCrumb.Item>
                        <BreadCrumb.Item url={ROOMS_PAGE+room.id}>
                            {
                                room.name
                            }
                        </BreadCrumb.Item>
                        <BreadCrumb.Active>
                            Edit
                        </BreadCrumb.Active>
                    </BreadCrumb>
                    <div className="form-container mr-auto ml-auto" style={{width:'500px'}} >
                        <Card style={{margin:"0 auto"}}>
                            <Card.Header>
                                <Card.Title>
                                    Edit Room
                                </Card.Title>
                            </Card.Header>
                            <form className="form" onSubmit={updateRoom}>
                                <div className="form-group form-group-custom">
                                    <label htmlFor="name"><i className="far fa-comments" /></label>
                                    <input type="text" className="form-control"
                                           value={room.name}
                                           onChange={(e) => setRoom({...room,name:e.target.value})}
                                    />
                                </div>
                                <div className="form-group form-group-custom">
                                    <label htmlFor="name"><i className="fas fa-users-slash" /></label>
                                    <select
                                        className="form-control select"
                                        onChange={ e=> setRoom({...room, type:e.target.value})}
                                        value={room.type}
                                    >
                                        <option value="0">Private</option>
                                        <option value="1">Public</option>
                                    </select>
                                </div>
                                <div className="form-group form-group-custom">
                                    <label htmlFor="file" className="mr-2"><i className="fa fa-image"></i></label>
                                    <input ref={avatarBtn} onChange={avatarBtnChange} type="file" className="d-none" />
                                    <button id="file" className="upload-icon"
                                            onClick={chooseAvatar}>
                                        Upload Avatar
                                    </button>
                                </div>
                                {
                                    previewAvatar !== '' &&
                                        <div className="form-group form-group-custom">
                                            <UserIcon img={previewAvatar} alt="preview" />
                                        </div>
                                }
                                {
                                    progress > 0 && (
                                        <div>
                                            <progress min="0" max="100" value={progress} />
                                            <span>{ progress } %</span>
                                        </div>
                                    )
                                }
                                <button className="btn btn-primary">Update</button>
                            </form>
                        </Card>
                    </div>
                </div>
            )
        }
    }

    return render()
}

export default EditRoom;
