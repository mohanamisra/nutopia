import React from 'react';

const Bird = ({size}) => {
    const birdStyles = {
        container: {
            borderRadius: '50%',
            backgroundColor: "white",
            position: "absolute",
            width: size,
            height: size,
            left: "500px"
        }
    }
    return (
        <div className = "bird-container" style={birdStyles.container}>
            
        </div>
    );
};

export default Bird;