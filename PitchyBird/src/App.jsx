import './App.css'
import Bird from "./components/Bird.jsx";
import Seed from "./components/Seed.jsx";
import { useRef, useEffect, useState } from 'react';

function App() {
    const analyserRef = useRef(null);
    const birdRef = useRef(null);
    let birdPos = useRef(window.innerHeight / 2 - 100);
    let targetPos = useRef(0);
    const score = useState(0);

    // Create an array of useRefs for 9 seeds
    const seedRefs = useRef([...Array(9)].map(() => ({ ref: useRef(null), pos: useRef(Math.random() * window.innerWidth) })));

    useEffect(() => {
        const birdMovement = () => {
            if (birdRef.current) {
                if (targetPos.current > 500) {
                    birdPos.current -= (targetPos.current - birdPos.current) * 0.01;
                } else if (targetPos.current < 500) {
                    birdPos.current += (targetPos.current - birdPos.current) * 0.01;
                }
                birdPos.current = Math.min(Math.max(birdPos.current, -1000), window.innerHeight - 90);
                birdRef.current.style.transform = `translateY(${birdPos.current}px)`;
            }
            requestAnimationFrame(birdMovement);
        };

        const seedMovement = () => {
            seedRefs.current.forEach(({ ref, pos }) => {
                if (ref.current) {
                    pos.current -= 3;
                    // If the seed crosses the boundary, reset it to the right of the screen
                    if (pos.current < -800) {
                        pos.current = window.innerWidth;
                        const newPosY = Math.random() * 90;
                        ref.current.style.top = `${newPosY}%`;
                    }
                    ref.current.style.transform = `translateX(${pos.current}px)`;
                }
            });
            requestAnimationFrame(seedMovement);
        };

        seedMovement();
        birdMovement();
    }, []);

    const handleClick = () => {
        let audioCtx = new AudioContext();
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                let microphone = audioCtx.createMediaStreamSource(stream);
                let analyser = audioCtx.createAnalyser();
                analyser.fftSize = 512;
                analyserRef.current = analyser;
                microphone.connect(analyser);

                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const getFrequency = () => {
                    analyser.getByteFrequencyData(dataArray);

                    let maxIndex = 0;
                    let maxAmplitude = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        if (dataArray[i] > maxAmplitude) {
                            maxAmplitude = dataArray[i];
                            maxIndex = i;
                        }
                    }

                    const frequency = (maxIndex / bufferLength) * (audioCtx.sampleRate / 2);
                    targetPos.current = frequency;

                    requestAnimationFrame(getFrequency);
                };

                getFrequency();
            })
            .catch(err => console.error('Error accessing microphone:', err));
    }

    return (
        <div className="app-container">
            <div className = "score-container">
                Score = {score}
            </div>

            <Bird innerRef={birdRef} position={birdPos.current} size="90px" />

            {seedRefs.current.map(({ ref }, index) => (
                <Seed key={index} innerRef={ref} positionX="50%" positionY={`${Math.random() * 90}%`} size="50px" />
            ))}

            <button onClick={handleClick}>Click me</button>
        </div>
    );
}

export default App;
