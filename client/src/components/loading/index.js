import React from 'react';
import {Container,Large} from './styles/loading';

const Loading = ({children, ...restProps}) => {
    return (
        <Container {...restProps}>
            {children}
        </Container>
    )
}

Loading.Large = function LargeLoading({children, color,...restProps}){
    return (
        <Large color={color ? color: "#FFF"}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Large>
    )
}

export default Loading;
