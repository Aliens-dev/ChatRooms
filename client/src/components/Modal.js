import React, {useRef,useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_MODAL_ACTION } from '../actions/popupsActions';


const Modal = (props) => {

    const dispatch = useDispatch()
    const showModal = useSelector(state => state.popup.showModal)

    const myModal = useRef(null)
    const closeModal = () => {
        dispatch(HIDE_MODAL_ACTION())
    }

    const clickAway =(e) => {
        e.stopPropagation();
        if(e.target === myModal.current) {
            closeModal()
        }
    }

    const clicked = () => {
        if(props.onClick) {
            props.onClick();
        }
    }
    const render = () => {
        if(!showModal) {
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
