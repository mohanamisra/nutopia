import React from 'react';

const Bird = ({innerRef, size, position}) => {
    const birdStyles = {
        container: {
            top: position,
            left: '30%',
            borderRadius: '50%',
            backgroundColor: "white",
            position: "absolute",
            width: size,
            height: size,
        }
    }
    return (
        <div ref = {innerRef} className = "bird-container" style={birdStyles.container}>
            
        </div>
    );
};

export default Bird;