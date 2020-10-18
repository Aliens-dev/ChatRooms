import styled from 'styled-components';
import {Link} from "react-router-dom";

export const Container = styled.div`
    max-height:50px;
    height:50px;
    background-color:#F8F9FF;
    i:hover {
        cursor: pointer;
    }
    @media (max-width: 768px) {
        .nav-link:first-child {
            display:none;
        }
    }
`;
export const Nav = styled.div`
    display:flex;
    flex-grow:1;
    align-items:center;
`;
export const NavLink = styled(Link)``;
export const Inner = styled.div`
    display:flex;
    align-items:center;
    height:100%;
`;
