import React, {useRef,useContext, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_MODAL_ACTION } from '../actions/popupsActions';
import {FaTimes} from 'react-icons/fa'

const Modal = ({
    onClick, title, children
}) => {

    const dispatch = useDispatch()
    const {showModal} = useSelector(state => state.popup)

    const myModal = useRef(null)
    
    const closeModal = () => {
        dispatch(HIDE_MODAL_ACTION())
    }

    useEffect(() => {
    }, [showModal])


    useEffect(() => {
        document.addEventListener('click', function(e) {
            if(e.target === myModal.current) {
                closeModal()
            }
        })

        return () => {
            document.removeEventListener('click', () => null);
        }
    }, [])

    const render = () => {
        if(!showModal) {
            return null;
        }else {
            return (
                <div className="my-modal" ref={myModal}>
                    <div className="modal-content">
                        <div className="header">
                            <div>{title}</div>
                            <FaTimes onClick={closeModal} />
                        </div>
                        <div className="body">
                            {
                                children
                            }
                        </div>
                        <div className="foot">
                            <button className="btn btn-primary" onClick={() => onClick()}>Submit</button>
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
