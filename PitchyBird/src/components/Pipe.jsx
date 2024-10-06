import React from 'react';

const Pipe = ({size, position}) => {
    const pipeStyle = {
        container: {
            width: `${Math.min(window.innerWidth * 0.125, 100)}px`,
            height: "100%",
            backgroundColor: "white",
            left: "35%",
            position: "absolute",
        },
        gap: {
            height: size,
            backgroundColor: "#111222",
            position: "relative",
            top: position,
            width: "100%",
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