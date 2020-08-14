import React from 'react';
import Nav from "./Nav";



const BreadCrumb = props => {

    return (
        <div className="my-breadcrumb" onClick={() => props.onClick()}>
            {
                props.children
            }
        </div>
    )

}
export default BreadCrumb;
