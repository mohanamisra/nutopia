// creates the interface in which the entire audio lifecycle graph resides
const audioContext = new AudioContext();

// get the audio element from the DOM
const audioElement = document.querySelector("audio");

// pass it into the audio context as a "source"
const track = audioContext.createMediaElementSource(audioElement);

// connect the input element "track" to the output or destination
track.connect(audioContext.destination);

// get the play button
const playButton = document.querySelector("button");

// add functionality to the play button
playButton.addEventListener("click", (e) => {
    // this is because many browsers "suspend" your audio context unless the user interacts with the page first
    if(audioContext.state === "suspended")
        audioContext.resume();

    // if the audio isn't playing
    if(playButton.dataset.playing === "false") {
        audioElement.play();
        playButton.dataset.playing = "true";
    }
    // if the audio is already playing
    else if(playButton.dataset.playing === "true") {
        audioElement.pause();
        playButton.dataset.playing = "false";
    }
}, false);

// what to do when the audio element finishes playing?
audioElement.addEventListener("ended", (e) => {
    playButton.dataset.playing = "false";
}, false);

// PLAYING AROUND WITH AUDIO GAIN

// create gain node
const gainNode = audioContext.createGain();
// connect it to the audio graph residing in your audioContext
track.connect(gainNode).connect(audioContext.destination);

const volumeControl = document.querySelector("#volume");
volumeControl.addEventListener("input", () => {
    gainNode.gain.value = volumeControl.value;
    console.log(gainNode.gain.value);
}, false);

// PLAYING AROUND WITH THE PANNER

// create panner node
const pannerNode = audioContext.createStereoPanner();
track.connect(gainNode).connect(pannerNode).connect(audioContext.destination);

const pannerControl = document.querySelector("#panner");
pannerControl.addEventListener("input", () => {
    pannerNode.pan.value = pannerControl.value;
    console.log(pannerNode.pan.value);
}, false);

