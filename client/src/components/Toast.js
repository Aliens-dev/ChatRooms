import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HIDE_TOAST_ACTION} from "../actions/popupsActions";


const MyToast = (props) => {

    const dispatch = useDispatch()
    const {showToast,toastMessage} = useSelector(state => state.popup)
    const hideToast =() => {
        dispatch(HIDE_TOAST_ACTION())
    }
    return (
        <div className={`${showToast ? 'my-toast' : 'd-none'}`}>
            <div className="my-toast-header">
                {
                    toastMessage.title
                }
                <i className="fa fa-times close-toast" onClick={hideToast} />
            </div>
            <div className="my-toast-body">
                {
                    toastMessage.message
                }
            </div>
        </div>
    )
}

export default MyToast;
