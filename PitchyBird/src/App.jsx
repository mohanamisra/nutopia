import './App.css'
import Pipe from "./components/Pipe.jsx"
import Bird from "./components/Bird.jsx";
import { useRef, useEffect } from 'react';

function App() {
    const analyserRef = useRef(null);
    const birdRef = useRef(null);
    let birdPos = useRef(window.innerHeight/2 - 100);
    let targetPos = useRef(0);

    useEffect(() => {
        const smoothMovement = () => {
            if (birdRef.current) {
                if(targetPos.current > 500) {
                    birdPos.current -= (targetPos.current - birdPos.current) * 0.01;
                }
                else if(targetPos.current < 500) {
                    birdPos.current += (targetPos.current - birdPos.current) * 0.1;
                }
                birdPos.current = Math.min(Math.max(birdPos.current, -1000), window.innerHeight - 90)
                birdRef.current.style.transform = `translateY(${birdPos.current}px)`;
            }
            requestAnimationFrame(smoothMovement);
        };

        smoothMovement();  // Start the animation loop
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
                    for(let i = 0; i < dataArray.length; i++) {
                        if(dataArray[i] > maxAmplitude) {
                            maxAmplitude = dataArray[i];
                            maxIndex = i;
                        }
                    }

                    const frequency = (maxIndex/bufferLength) * (audioCtx.sampleRate/2)
                    targetPos.current = frequency;

                    requestAnimationFrame(getFrequency);
                };

                getFrequency();
            })
            .catch(err => console.error('Error accessing microphone:', err));
    }

    return (
        <div className="app-container">
            <Pipe position="200px" size="150px" />
            <Bird innerRef = {birdRef} position={birdPos.current} size="90px" />
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}

export default App;
