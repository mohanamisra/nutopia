import './App.css'
// import Pipe from "./components/Pipe.jsx"
import Bird from "./components/Bird.jsx";
import Seed from "./components/Seed.jsx";
import { useRef, useEffect } from 'react';

function App() {
    const analyserRef = useRef(null);
    const birdRef = useRef(null);
    let birdPos = useRef(window.innerHeight/2 - 100);
    let targetPos = useRef(0);
    const seedRef = useRef(null);
    let seedPos = useRef(100);

    useEffect(() => {
        const birdMovement = () => {
            if (birdRef.current) {
                if(targetPos.current > 500) {
                    birdPos.current -= (targetPos.current - birdPos.current) * 0.01;
                }
                else if(targetPos.current < 500) {
                    birdPos.current += (targetPos.current - birdPos.current) * 0.01;
                }
                birdPos.current = Math.min(Math.max(birdPos.current, -1000), window.innerHeight - 90)
                birdRef.current.style.transform = `translateY(${birdPos.current}px)`;
            }
            requestAnimationFrame(birdMovement);
        };

        const seedMovement = () => {
            if(seedRef.current) {
                seedPos.current -= 3;
                if(seedPos.current < -2000) {
                    seedPos.current = window.innerWidth/2;
                    let newPos = Math.random() * (90 - 0) + 0;
                    seedRef.current.style.top = `${newPos}%`;
                }
                console.log(seedRef.current.style.top)
                seedRef.current.style.transform = `translateX(${seedPos.current}px`
            }
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
            {/*<Pipe innerRef = {pipeRef} gapPosition="300px" size="150px" pipePosition = {pipePos.current}/>*/}
            <Bird innerRef = {birdRef} position={birdPos.current} size="90px" />

            <Seed innerRef = {seedRef} positionY="50%" size = "50px"/>
            <Seed innerRef = {seedRef} positionY="50%" size = "50px"/>
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}

export default App;
