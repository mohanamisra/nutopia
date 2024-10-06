import React from 'react';

const Bird = ({innerRef, size, position}) => {
    const birdStyles = {
        container: {
            top: position,
            left: `${Math.max(50, window.innerWidth * 0.2)}px`,
            borderRadius: '50%',
            backgroundColor: "white",
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