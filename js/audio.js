// Toggles music sound
document.addEventListener("DOMContentLoaded", function () {
    var audio = document.getElementById("backgroundAudio");
    var toggleAudioButton = document.getElementById("toggleAudioButton");

    toggleAudioButton.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
});

// Sets audio volume
document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('backgroundAudio');
    audio.volume = 0.2; // Set the volume to 30%
});
