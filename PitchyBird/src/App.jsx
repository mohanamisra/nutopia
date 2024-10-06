import './App.css'
import Bird from "./components/Bird.jsx";
import Seed from "./components/Seed.jsx";
import pointSound from "./assets/pointSound.mp3"
import { useRef, useEffect } from 'react';

function App() {
    const analyserRef = useRef(null);
    const birdRef = useRef(null);
    let birdPos = useRef(window.innerHeight / 2 - 100);
    let targetPos = useRef(0);
    const scoreRef = useRef(0);
    const scoreDisplayRef = useRef(null);
    const start = useRef(false);
    const audio = new Audio(pointSound);

    const detectCollision = (birdElement, seedElement) => {
        const birdRect = birdElement.getBoundingClientRect();
        const seedRect = seedElement.getBoundingClientRect();

        return (
            birdRect.left < seedRect.right &&
            birdRect.right > seedRect.left &&
            birdRect.top < seedRect.bottom &&
            birdRect.bottom > seedRect.top
        );
    };

    const seedRefs = useRef([...Array(9)].map(() => ({
        ref: useRef(null),
        pos: useRef(Math.random() * window.innerWidth),
        collected: useRef(false),
    })));

    useEffect(() => {
        const birdMovement = () => {
            if (start.current && birdRef.current) {
                if (targetPos.current > 500) {
                    birdPos.current -= (targetPos.current - birdPos.current) * 0.01;
                } else if (targetPos.current < 500) {
                    birdPos.current += (targetPos.current - birdPos.current) * 0.01;
                }
                birdPos.current = Math.min(Math.max(birdPos.current, -1000), window.innerHeight - 90);
                birdRef.current.style.transform = `translateY(${birdPos.current}px)`;

                seedRefs.current.forEach(({ ref, collected }) => {
                    if (ref.current && !collected.current && detectCollision(birdRef.current, ref.current)) {
                        collected.current = true;
                        ref.current.style.display = "none";
                        audio.play();
                        scoreRef.current += 5;
                        scoreDisplayRef.current.textContent = `Score = ${scoreRef.current}`;
                    }
                });
            }
            requestAnimationFrame(birdMovement);
        };

        const seedMovement = () => {
            seedRefs.current.forEach(({ ref, pos, collected }) => {
                if (start.current && ref.current) {
                    pos.current -= 3;

                    if (pos.current < -800) {
                        pos.current = window.innerWidth;
                        const newPosY = Math.random() * 90;
                        ref.current.style.top = `${newPosY}%`;
                        collected.current = false;
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
        start.current = true;
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
            <div ref={scoreDisplayRef} className="score-container">
                Score = 0
            </div>

            <Bird innerRef={birdRef} position={birdPos.current} size="150px" />

            {seedRefs.current.map(({ ref }, index) => (
                <Seed key={index} innerRef={ref} positionX="50%" positionY={`${Math.random() * 90}%`} size="75px" />
            ))}

            <button onClick={handleClick}>Start Game</button>
        </div>
    );
}

export default App;
