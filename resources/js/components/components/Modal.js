import React, {useRef,useContext} from 'react';
import {AppContext} from "../context/AppContext";
import {setModalHiddenAction} from "../context/actions/GlobalActions";



const Modal = (props) => {

    const {globalState,dispatchGlobalState} = useContext(AppContext);

    const myModal = useRef(null)
    const closeModal = () => {
        dispatchGlobalState(setModalHiddenAction())
    }

    const clickAway =(e) => {
        e.stopPropagation();
        if(e.target === myModal.current) {
            dispatchGlobalState(setModalHiddenAction())
        }
    }

    const clicked = () => {
        if(props.onClick) {
            props.onClick();
        }
    }
    const render = () => {
        if(!globalState.visibleModal) {
            return null;
        }else {
            return (
                <div className="my-modal" onClick={clickAway} ref={myModal}>
                    <div className="modal-content">
                        <div className="header">
                            <div>{props.title}</div>
                            <i className="fa fa-times" onClick={closeModal} />
                        </div>
                        <div className="body">
                            {
                                props.children
                            }
                        </div>
                        <div className="foot">
                            <button className="btn btn-primary" onClick={clicked}>Submit</button>
                            <button className="btn btn-danger" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return render()

}

export default Modal;
