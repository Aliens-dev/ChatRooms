import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    min-height: 100vh;
    max-height: 100%;
    width:250px;
    min-width: 250px;
    transition: all 0.3s ease-in-out;
    background-color:#455CC7;
    color:#FFF;
    padding: 10px 20px;
    @media(max-width: 768px) {
        width:50px;
        min-width: 50px;
        transition: width 0.3s ease-in-out;
        padding:10px 0;
    }
`;

export const Header = styled.div`
    padding: 10px 5px;
    display:flex;
    justify-content: center;
    font-size:20px;
    font-weight: 600;
    margin-bottom: 20px;
    border-bottom: 1px solid #FFF;
    @media(max-width: 768px) {
        padding: 10px 5px;
        span:nth-child(2) {
            display:none;
        }
    }
`;
export const Menu = styled.div`
    display:flex;
    flex-direction:column;
    a{
        text-decoration: none;
        color:#FFF;
    }
`;


export const Item = styled(Link)`
    padding:10px;
    font-size:16px;
    font-weight:600;
    text-decoration: none;
    border-radius: 3px;
    color:#FFF;
    display:flex;
    justify-content: flex-start;
    &>div {
       margin: 0 10px;
    }
    span {
        margin: 0 10px;
    }
    &:hover {
        text-decoration: none;
        background-color:#6174CF;
        cursor:pointer;
    }

    @media(max-width:768px){
        padding: 10px 0;
        justify-content: center;
        span {
            display: none;
        }
    }
`;
export const ContainerCollapsed = styled.div`
    min-height: 100vh;
    max-height: 100%;
    width:50px;
    min-width: 50px;
    transition: all 0.3s ease-in-out;
    background-color:#455CC7;
    color:#FFF;
    padding: 10px 0;
    ${Header} {
        span:first-child{
            display:block;
        }
        span:last-child {
            display:none;
        }
    }
    ${Menu} {
        ${Item} {
            padding:10px 0;
            justify-content: center;
            span {
                display: none;
            }
            &:hover {
                text-decoration: none;
            }
        }
    }
`;