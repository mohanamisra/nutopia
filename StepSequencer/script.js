// Obviously you create an audio context first
const audioContext = new AudioContext();

// creating a custom wave for the oscillator node (not sine, square, the typicals...)
const myWave = new PeriodicWave(audioContext, {
    real: wavetable.real,
    imag: wavetable.imag,
})