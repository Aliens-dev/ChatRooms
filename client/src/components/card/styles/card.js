import styled from 'styled-components';
import {Link} from "react-router-dom";

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin:10px 0;
    padding:20px;
    text-decoration: none !important;
    border:1px solid #E6E8ED;
    cursor: pointer;
    &:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.05);
    }
`;
export const Header = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    margin:30px 0;
    i {
        font-size:18px;
        color: #adaeb1;
    }
`;

export const CardLink = styled(Link)`
    text-decoration: none;
    display:flex;
    align-items:center;
    &:hover {
        text-decoration: none;
    }
`;
export const Title = styled.div`
    font-size:20px;
    font-weight:600;
    color:#000;
    margin:0 10px;
`
export const Settings = styled.div`
    position:absolute;
    top:0;
    right:10px;
    padding:20px;

    &:hover {
        cursor:pointer;
    }
`;
export const Image = styled.div`
    display:flex;
    justify-content: center;
    margin:15px 0;
`;
export const Body = styled.div``;
export const Footer = styled.div`
    display:flex;
    justify-content:center;
    margin:10px 0;
`;
