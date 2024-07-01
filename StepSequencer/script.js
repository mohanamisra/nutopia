// grab the wavetable from the wavetable repo
import wavetable from "./Bass_Amp360.js";

// Obviously you create an audio context first
const audioContext = new AudioContext();

// creating a custom wave for the oscillator node (not sine, square, the typicals...)
const myWave = new PeriodicWave(audioContext, {
    real: wavetable.real,
    imag: wavetable.imag,
})

const sweepLength = 2;
function playSweep(time) {
    // create the oscillator
    const osc = new OscillatorNode(audioContext, {
        frequency: 380,
        type: "custom",
        periodicWave: myWave
    });
    const sweepEnv = new GainNode(audioContext);
    sweepEnv.gain.cancelScheduledValues(time);
    sweepEnv.gain.setValueAtTime(0, time);
    sweepEnv.gain.linearRampToValueAtTime(1, time + attackTime);
    sweepEnv.gain.linearRampToValueAtTime(0, time + sweepLength - releaseTime);

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

// Release is the time taken for the sound to reach from sustain value to absolute silence
let releaseTime = 0.5;
const releaseControl = document.querySelector("#release");
releaseControl.addEventListener("input", (e) => {
    releaseTime = parseInt(e.target.value, 10);
}, false);

const osc = new OscillatorNode(audioContext, {
    type: "sine",
    frequency: 90,
});

const amp = new GainNode(audioContext, {
    value: 1,
});

const lfo = new OscillatorNode(audioContext, {
    type: "square",
    frequency: 30,
});

lfo.connect(amp.gain);
osc.connect(amp).connect(audioContext.destination);

const button = document.querySelector("button");

button.addEventListener("click", (e) => {
    lfo.start();
    osc.start(0);
    osc.stop(1000);
})
