import {useRef, useState} from "react";
import Bar from "../components/Bar.jsx";

const bars = [
    {x: 5,
    y: 5,
    width: 50,
    height: 100,
    color: "blue"},
]


const Visualiser = () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        requestAnimationFrame(animate);
    }
    animate();
};

export default Visualiser;