import React from 'react';


const DropDown = ({children, className, ...restProps}) => {
    return (
        <div className="dropdown" {...restProps}>
            <i className={className}
               data-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false"
            />
            {children}
        </div>
    )
}

DropDown.Menu = function DropdownMenu({children,...restProps}) {
    return (
        <div {...restProps} className="dropdown-menu">
            {children}
        </div>
    )
}
DropDown.Item = function DropdownMenu({children, action, ...restProps}) {
    return (
        <div className="dropdown-item"
             onClick={action}
        >
            {children}
        </div>
    )
}

export default DropDown;
