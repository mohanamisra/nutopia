// grab the wavetable from the wavetable repo
import wavetable from "./Bass_Amp360.js";

// Obviously you create an audio context first
const audioContext = new AudioContext();

// creating a custom wave for the oscillator node (not sine, square, the typicals...)
const myWave = new PeriodicWave(audioContext, {
    real: wavetable.real,
    imag: wavetable.imag,
})

function playSweep(time) {
    // create the oscillator
    const osc = new OscillatorNode(audioContext, {
        frequency: 380,
        type: "custom",
        periodicWave: myWave
    });
    osc.connect(audioContext.destination);
    osc.start(time);
    osc.stop(time + 1);
}

// Attack is the time taken for sound to reach from 0 to peak value
let attackTime = 0.2;
const attackControl = document.querySelector("#attack");
attackControl.addEventListener("input", (e) => {
    attackTime = parseInt(e.target.value, 10);
}, false);

// Release is the time taken for the soud to reach from sustain value to absolute silence
let releaseTime = 0.5;
const releaseControl = document.querySelector("#release");
releaseControl.addEventListener("input", (e) => {
    releaseTime = parseInt(e.target.value, 10);
}, false);