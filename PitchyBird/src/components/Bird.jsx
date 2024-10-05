import React from 'react';

const Bird = ({size, position}) => {
    const birdStyles = {
        container: {
            top: position,
            borderRadius: '50%',
            backgroundColor: "white",
            position: "absolute",
            width: size,
            height: size,
        }
    }
    return (
        <div className = "bird-container" style={birdStyles.container}>
            
        </div>
    );
};

export default Bird;