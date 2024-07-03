import React, {useEffect, useRef} from 'react';
import './App.css'

import Visualiser from "./scripts/Visualiser.jsx";

const Canvas = () => {

    useEffect(() => {
        Visualiser();
    }, []);
    return (
        <canvas id = "myCanvas">
            
        </canvas>
    );
};

export default Canvas;