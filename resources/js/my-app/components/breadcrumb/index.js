import React from 'react';
import {Container, Item, Active} from './styles/breadcrumb';
import {Link} from "react-router-dom";

const BreadCrumb = ({children}) => {
    return (
        <Container className="ml-2" >
            {children}
        </Container>
    )
}

BreadCrumb.Item = function BreadCrumbItem({children,url, ...restProps}) {
    return (
        <Item {...restProps}>
            <Link to={url} >
                {children} <i className="fa fa-angle-right" />
            </Link>
        </Item>
    )
}
BreadCrumb.Active = function BreadCrumbActive({children, ...restProps}) {
    return (
        <Item>
            <Active {...restProps}>
                {children}
            </Active>
        </Item>
    )
}

export default BreadCrumb;
