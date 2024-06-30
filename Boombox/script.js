// creates the interface in which the entire audio lifecycle graph resides
const audioContext = new AudioContext();

// get the audio element from the DOM
const audioElement = document.querySelector("audio");

// pass it into the audio context as a "source"
const track = audioContext.createMediaElementSource(audioElement);

// connect the input element "track" to the output or destination
track.connect(audioContext.destination);