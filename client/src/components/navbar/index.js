import React from 'react';
import {Container, Inner, Nav, NavLink} from './styles/navbar';


const Navbar = ({children, ...restProps}) => {
    return (
        <Container {...restProps}>
            {children}
        </Container>
    )
}

Navbar.Inner = function NavbarInner({children,container, ...restProps}) {
    return (
        <Inner className={`${container ? 'container' : 'container-fluid'}`}>
            {children}
        </Inner>
    )
}

Navbar.Nav = function NavbarNav({children, className, ...restProps}) {
    return (
        <Nav className={`${className || ''}`} {...restProps}>
            {children}
        </Nav>
    )
}

Navbar.Link = function NavbarLink({children,...restProps}) {
    return (
        <NavLink className="nav-link" {...restProps}>
            {children}
        </NavLink>
    )
}
export default Navbar;
