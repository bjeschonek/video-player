//DOM Elements

let dom = {
    player: document.querySelector('.player'),
    video: document.querySelector('video'),
    progressRange: document.querySelector('.progress-range'),
    progressBar: document.querySelector('.progress-bar'),
    playButton: document.getElementById('play-button'),
    volumeIcon: document.getElementById('volume-icon'),
    volumeRange: document.querySelector('.volume-range'),
    volumeBar: document.querySelector('.volume-bar'),
    currentTime: document.querySelector('.time-elapsed'),
    duration: document.querySelector('.time-duration'),
    speed: document.querySelector('.player-speed'),
    fullscreenButton: document.querySelector('.fullscreen')
}

//Play pause functionality

function showPlayIcon() {
    dom.playButton.classList.replace('fa-pause', 'fa-play');
    dom.playButton.setAttribute('title', 'Play');
}

function showPauseIcon() {
    dom.playButton.classList.replace('fa-play', 'fa-pause');
    dom.playButton.setAttribute('title', 'Pause');
}

function togglePlay() {
    if (dom.video.paused) {
        dom.video.play();
        showPauseIcon();
    } else {
        dom.video.pause();
        showPlayIcon();
    }
}

//progress bar

function displayTime(time) {
    const minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

function updateProgress() {
    dom.progressBar.style.width = `${(dom.video.currentTime/dom.video.duration) * 100}%`;
    dom.currentTime.textContent = `${displayTime(dom.video.currentTime)} /`;
    dom.duration.textContent = `${displayTime(dom.video.duration)}`;
}


function setProgress(event) {
    const newTime = event.offsetX / dom.progressRange.offsetWidth;
    dom.progressBar.style.width = `${newTime * 100}%`;
    dom.video.dom.currentTime = newTime * dom.video.dom.duration;
}

//Volume controls

let lastVolume = .5;

function changeVolume(event) {
    let volume = event.offsetX / dom.volumeRange.offsetWidth;
    if (volume < .1) {
        volume = 0;
    };
    if (volume > .9) {
        volume = 1;
    }
    dom.volumeBar.style.width = `${volume * 100}%`;
    dom.video.volume = volume;
    dom.volumeIcon.className = '';
    if (volume > .7) {
        dom.volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < .7 && volume > 0) {
        dom.volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        dom.volumeIcon.classList.add('fas', 'fa-volume-off');
    };
    lastVolume = volume;
}

function toggleMute() {
    dom.volumeIcon.className = '';
    if (dom.video.volume) {
        lastVolume = dom.video.volume;
        dom.video.volume = 0;
        dom.volumeBar.style.width = 0;
        dom.volumeIcon.classList.add('fas', 'fa-volume-mute');
        volume.setAttribute('title', 'unmute');
    } else {
        dom.video.volume = lastVolume;
        dom.volumeBar.style.width = `${lastVolume * 100}%`;
        dom.volumeIcon.classList.add('fas', 'fa-volume-up');
        dom.volumeIcon.setAttribute('title', 'Mute');
    };
}

//Playback speed

function changeSpeed() {
    dom.video.playbackRate = dom.speed.value;
}

//Fullscreen

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    dom.video.classList.add('video-fullscreen');
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    dom.video.classList.remove('video-fullscreen');
}

let fullscreen = false;

function toggleFullscreen() {
    !fullscreen ? openFullscreen(dom.player) : closeFullscreen();
    fullscreen = !fullscreen;
}

//Event listeners

dom.playButton.addEventListener('click', togglePlay);
dom.video.addEventListener('click', togglePlay);
dom.video.addEventListener('ended', showPlayIcon);
dom.video.addEventListener('timeupdate', updateProgress);
dom.video.addEventListener('canplay', updateProgress);
dom.progressRange.addEventListener('click', setProgress);
dom.volumeRange.addEventListener('click', changeVolume);
dom.volumeIcon.addEventListener('click', toggleMute);
dom.speed.addEventListener('change', changeSpeed);
dom.fullscreenButton.addEventListener('click', toggleFullscreen);