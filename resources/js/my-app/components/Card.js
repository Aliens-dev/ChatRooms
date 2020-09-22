import React from 'react';
import {Link} from "react-router-dom";

const Card = props => {

    return (
        <div className="card mb-3" style={props.style}>
            <div className="card-body">
                {
                    props.children
                }
            </div>
        </div>
    );
}

export default Card;
