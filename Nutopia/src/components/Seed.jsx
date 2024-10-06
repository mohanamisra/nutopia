import React from 'react';
import seedImage from '../assets/seed.png'

const Seed = ({innerRef, size, positionX, positionY}) => {
    const seedStyles = {
        container: {
            background: `url(${seedImage}) no-repeat center center`,
            backgroundSize: 'contain',
            borderRadius: "50%",
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