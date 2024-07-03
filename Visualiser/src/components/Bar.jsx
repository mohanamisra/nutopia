import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Bar = forwardRef(({ initialX, initialY, initialWidth, initialHeight, initialColor }, ref) => {
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [color, setColor] = useState(initialColor);

    useImperativeHandle(ref, () => ({
        draw(context) {
            context.fillStyle = color;
            context.fillRect(x, y, width, height);
        },
        update() {
            setX((prevX) => prevX + 1);
        }
    }));

    return null; // We don't need to render anything in the DOM
});

export default Bar;
