export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const UserLoginAction = (data) => {
    return {
        type : USER_LOGIN,
        payload: data,
    }
}

export const UserLogoutAction = () => {
    return {
        type: USER_LOGOUT
    }
}
