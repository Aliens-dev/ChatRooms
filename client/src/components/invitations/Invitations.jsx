import { Dropdown } from 'bootstrap';
import React from 'react';

import {BsPeopleFill} from 'react-icons/bs'
import DropDown from '../dropdown';

const Invitations = () => {



    return (
        <div className='invitation'>
            <span className='count'>2</span>
            <DropDown>
                <BsPeopleFill size={24} />
                <DropDown.Menu>
                    <DropDown.Item>Item 1</DropDown.Item>
                </DropDown.Menu>
            </DropDown>
        </div>
    );
};

export default Invitations;