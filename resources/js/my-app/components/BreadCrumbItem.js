import React from 'react';
import { Link } from 'react-router-dom';
const BreadCrumbItem = props => {

    return (
            <Link to={props.url || '#'} className={`my-breadcrumb-item ${props.active ? 'active' : ''}`}>
                <div className="my-breadcrumb-text">
                    {
                        props.children
                    }
                </div>
                {
                    !props.active && <i className="fa fa-angle-right" />
                }
            </Link>
    )

}
export default BreadCrumbItem;
