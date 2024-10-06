import React from 'react';
import squirrelImage from "../assets/squirrel.png"

const Bird = ({innerRef, size, position}) => {
    const birdStyles = {
        container: {
            background: `url(${squirrelImage}) no-repeat center center`,
            backgroundSize: 'contain',
            top: position,
            left: `${Math.max(50, window.innerWidth * 0.2)}px`,
            borderRadius: '50%',
            position: "absolute",
            width: `${size}`,
            height: `${size}`,
        }
    }
    return (
        <div ref = {innerRef} className = "bird-container" style={birdStyles.container}>
            
        </div>
    );
};

export default Bird;