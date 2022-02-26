import axios from 'axios'

const GET_INVITATIONS = () => async (dispatch, getState) => {
    try{
        let response = await axios({
            method: 'GET',
            url: ,
            headers: {
                Authorization: 'Bearer ' + getState().auth.user.token
            }
        })
    }catch(e) {

    }

}