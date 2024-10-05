import React from 'react';

const Pipe = ({gapSize, gapPosition}) => {
    const pipeStyle = {
        container: {
            width: "100px",
            height: "100%",
            backgroundColor: "white",
        },
        gap: {
            height: gapSize,
            backgroundColor: "#111222",
            position: "relative",
            top: gapPosition,
        }
    }

    return (
        <div className="pipe-container" style={pipeStyle.container}>
            <div className = "gap" style = {pipeStyle.gap}>

            </div>
        </div>
    );
};

export default Pipe;