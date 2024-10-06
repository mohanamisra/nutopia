import React from 'react';

const Pipe = ({innerRef, size, gapPosition, pipePosition}) => {
    const pipeStyle = {
        container: {
            width: `${Math.min(window.innerWidth * 0.125, 100)}px`,
            height: "100%",
            backgroundColor: "white",
            left: pipePosition,
            position: "absolute",
        },
        gap: {
            height: size,
            backgroundColor: "#111222",
            position: "relative",
            top: gapPosition,
            width: "100%",
        }
    }

    return (
        <div ref = {innerRef} className="pipe-container" style={pipeStyle.container}>
            <div className = "gap" style = {pipeStyle.gap}>

            </div>
        </div>
    );
};

export default Pipe;