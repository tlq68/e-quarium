document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("backgroundAudio");
    const audioSources = [
        "assets/audio/Fish3.m4a",
        "assets/audio/Fish2.m4a",
        "assets/audio/Fish1.m4a"
    ];
    let currentSourceIndex = 0;

    // Function to play the next audio file
    function playNextAudio() {
        currentSourceIndex = (currentSourceIndex + 1) % audioSources.length;
        audio.src = audioSources[currentSourceIndex];
        audio.play();
    }

    // Play the first audio file initially
    audio.src = audioSources[currentSourceIndex];
    audio.play();

    // Event listener to play the next audio file when the current one ends
    audio.addEventListener("ended", playNextAudio);
});
