import React from 'react';
import {Container, Menu, Header, Item, ContainerCollapsed} from './styles/sidebar';

const Sidebar = ({children,type, ...restProps}) => {
    return (
        <>
            {
                type === 'sidebar' ?
                    <Container {...restProps}>
                        {children}
                    </Container>
                    :
                    <ContainerCollapsed>
                        {children}
                    </ContainerCollapsed>
            }
        </>
    )
}

Sidebar.Header = function SidebarHeader ({children, ...restProps}) {
    return (
        <Header {...restProps}>
            {children}
        </Header>
    )
}

Sidebar.Menu = function SidebarMenu ({children, ...restProps}) {
    return (
        <Menu {...restProps}>
            {children}
        </Menu>
    )
}
Sidebar.Item = function SidebarItem ({children, ...restProps}) {
    return (
        <Item {...restProps}>
            {children}
        </Item>
    )
}

export default Sidebar;
