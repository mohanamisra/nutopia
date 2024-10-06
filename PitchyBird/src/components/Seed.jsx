import React from 'react';

const Seed = ({innerRef, size, positionX, positionY}) => {
    const seedStyles = {
        container: {
            backgroundColor: "#111222",
            borderRadius: "50%",
            border: "1px solid white",
            height: size,
            width: size,
            position: "absolute",
            top: positionY,
            left: positionX,
        }
    }
    return (
        <div ref = {innerRef} className = "seed-container" style={seedStyles.container}>

        </div>
    );
};

export default Seed;