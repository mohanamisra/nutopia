import React from 'react';

const Seed = ({innerRef, size, position}) => {
    const seedStyles = {
        container: {
            backgroundColor: "#111222",
            borderRadius: "50%",
            border: "1px solid white",
            height: size,
            width: size,
            position: "absolute",
            top: position,
            left: "35%",
            margin: "100px",
        }
    }
    return (
        <div className = "seed-container" style={seedStyles.container}>

        </div>
    );
};

export default Seed;