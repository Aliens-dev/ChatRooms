import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    justify-content: flex-start;
    height:50px !important;
    max-height: 50px !important;

`;

export const Item = styled.div`
    display:flex;
    align-items: center;
    padding:10px 5px;
    a {
        text-decoration: none;
    }
`;
export const Active = styled.div`
    text-decoration: none;
    color:#333;
    border:none;
`;
