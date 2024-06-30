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
playButton.addEventListener("click", (e) => {
    if(audioContext.state === "suspended")
        audioContext.resume();

    if(playButton.dataset.playing === "false") {
        audioElement.play();
        playButton.dataset.playing = "true";
    }
    else if(playButton.dataset.playing === "true") {
        audioElement.pause();
        playButton.dataset.playing = "false";
    }
}, false);

audioElement.addEventListener("ended", (e) => {
    playButton.dataset.playing = "false";
}, false);