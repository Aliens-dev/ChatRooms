

const initState = {
    echo : null
}


const EchoReducer = (state=initState, action) => {
    switch(action.type) {
        case "SET_ECHO": return {...state, echo: action.payload}
        default: return state;
    }
}

export default EchoReducer