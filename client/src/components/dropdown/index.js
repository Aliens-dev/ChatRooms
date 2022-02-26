import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {GoChevronDown,GoChevronUp} from 'react-icons/go'

const DropDownContext = createContext()

const DropDown = ({children, ...restProps}) => {
    
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if(! dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        })
        return () => {
            document.removeEventListener('click', () => setIsOpen(false))
        }
    }, [])

    return (
        <div ref={dropdownRef} className="dropdown" {...restProps}
            onClick={() => setIsOpen(!isOpen)}
        >
            <DropDownContext.Provider value={{ isOpen, setIsOpen }}>
                {children}
            </DropDownContext.Provider>
        </div>
    )
}

DropDown.Menu = function DropdownMenu({children,...restProps}) {
    const {isOpen } = useContext(DropDownContext)
    return (
        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} {...restProps}>
            {children}
        </div>
    )
}

DropDown.Item = function DropdownItem({children, ...restProps}) {
    return (
        <div className="dropdown-item" {...restProps} >
            {children}
        </div>
    )
}

export default DropDown;
