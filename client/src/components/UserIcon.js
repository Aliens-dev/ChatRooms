import React from 'react';



const UserIcon = props => {
    const {width, height , img , letter}  = props;
    const boxShadow = letter && 'none';
    return (
        <div className="user-image" style={{width, height,boxShadow}}>
            {
                letter ? <span className="letter">{ letter }</span> :
                    img ? <img src={img} alt="something ..."/> : <img src="https://unsplash.it/50/50" alt="something ..."/>
            }
        </div>
    )
}



export default UserIcon;
