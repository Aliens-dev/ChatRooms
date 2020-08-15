import React from 'react';
import {Link} from "react-router-dom";

const Card = props => {

    return (
        <Link to={`/app/rooms/${props.roomId}`} className="card mb-3">
            <div className="card-body">
                {
                    props.children
                }
            </div>
        </Link>
    );
}

export default Card;
