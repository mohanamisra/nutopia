import './App.css'
import Pipe from "./components/Pipe.jsx"
import Bird from "./components/Bird.jsx";
import { useRef } from 'react';

function App() {
    const analyserRef = useRef(null);
    const birdRef = useRef(null);
    let birdPos = useRef(10);

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
                    console.log(frequency);
                    const newPosition = frequency/10;
                    if(birdRef.current) {
                        birdRef.current.style.transform = `translateY(${newPosition}px)`
                    }

                    requestAnimationFrame(getFrequency);
                };

                getFrequency();
            })
            .catch(err => console.error('Error accessing microphone:', err));
    }

    return (
        <div className="app-container">
            <Pipe position="200px" size="150px" />
            <Bird innerRef = {birdRef} position={birdPos.current} size="100px" />
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}

export default App;
