import React from 'react';
import {Container,Large} from './styles/loading';

const Loading = ({children, ...restProps}) => {
    return (
        <Container {...restProps}>
            {children}
        </Container>
    )
}

Loading.Large = function LargeLoading({children,...restProps}){
    return (
        <Large>
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
