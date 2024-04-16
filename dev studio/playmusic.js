document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.getElementById('play-btn');
    const pauseButton = document.getElementById('pause-btn');

    playButton.addEventListener('click', function() {
        audioPlayer.play();
    });

    pauseButton.addEventListener('click', function() {
        audioPlayer.pause();
    });
});
