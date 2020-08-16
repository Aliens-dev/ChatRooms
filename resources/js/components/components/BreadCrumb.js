import React from 'react';

const BreadCrumb = props => {

    return (
        <div className="my-breadcrumb ml-2" onClick={() => props.onClick()}>
            {
                props.children
            }
        </div>
    )

}
export default BreadCrumb;
