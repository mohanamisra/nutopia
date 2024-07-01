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