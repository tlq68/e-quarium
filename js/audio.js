document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("backgroundAudio");
    const audioSources = [
        "assets/audio/Fish3.m4a",
        "assets/audio/Fish2.m4a",
        "assets/audio/Fish1.m4a"
    ];
    let currentSourceIndex = 0;
    audio.volume = 0.2;

    // Function to play the next audio file
    function playNextAudio() {
        currentSourceIndex = (currentSourceIndex + 1) % audioSources.length;
        audio.src = audioSources[currentSourceIndex];
        audio.play();
        synchronizeRadioButtons(); // Update the selected radio button
    }

    // Play the first audio file initially
    audio.src = audioSources[currentSourceIndex];
    audio.play();
    synchronizeRadioButtons(); // Update the selected radio button

    // Event listener to play the next audio file when the current one ends
    audio.addEventListener("ended", playNextAudio);

    // Function to synchronize the radio buttons with the current audio source
    function synchronizeRadioButtons() {
        const radioButtons = document.querySelectorAll('input[name="audio-option"]');
        radioButtons.forEach((radioButton, index) => {
            radioButton.checked = index === currentSourceIndex;
        });
    }

    // Add event listener to audio selection radio buttons
    const audioSelection = document.getElementById("audio-selection");
    audioSelection.addEventListener("change", function(event) {
        const selectedIndex = parseInt(event.target.value);
        if (!isNaN(selectedIndex) && selectedIndex >= 0 && selectedIndex < audioSources.length) {
            currentSourceIndex = selectedIndex;
            audio.src = audioSources[currentSourceIndex];
            audio.play();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var audio = document.getElementById("backgroundAudio");
    var toggleAudioButton = document.getElementById("toggle-audio-button");
    var isUnMuted = true; // Initialize a variable to track the mute state

    // Function to toggle the audio mute state and change the icon accordingly
    function toggleAudio() {
        if (isUnMuted) { // If currently muted, unmute the audio
            audio.volume = 0.2; // Set the volume to the desired level
            isUnMuted = false; // Update the mute state
            toggleAudioButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>';

        } else { // If not muted, mute the audio
            audio.volume = 0; // Set the volume to 0 to mute
            isUnMuted = true; // Update the mute state
            toggleAudioButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>';
        }
    }

    // Initial setup of the button based on the initial mute state
    toggleAudio();

    // Add click event listener to the button to toggle audio
    toggleAudioButton.addEventListener("click", toggleAudio);
});


document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("backgroundAudio");
    const audioSelection = document.getElementById("audio-selection");

    // Function to play the selected audio file
    function playSelectedAudio(event) {
        const selectedAudio = event.target.value;
        audio.src = selectedAudio;
        audio.play();
    }

    // Add event listener to audio selection radio buttons
    audioSelection.addEventListener("change", playSelectedAudio);
});

