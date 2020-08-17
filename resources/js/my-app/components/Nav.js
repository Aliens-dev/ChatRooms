import React from 'react';

const Nav = props => {
    return (
        <div className={`d-flex flex-grow-1 ${props.className || ''}`}>
            { props.children }
        </div>
    )
}
export default Nav;
