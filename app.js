const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const muteButton = document.getElementById('muteButton');
const seek = document.getElementById('seek');
const time = document.getElementById('time');

function fmt(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateTime() {
  const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
  const current = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
  time.textContent = `${fmt(current)} / ${fmt(duration)}`;
  seek.value = duration ? (current / duration) * 100 : 0;
}

playButton.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  } catch (err) {
    console.warn('Add assets/song.mp3 before using the player.', err);
  }
});

audio.addEventListener('play', () => {
  playIcon.textContent = '❚❚';
  playButton.setAttribute('aria-label', 'Pause');
});

audio.addEventListener('pause', () => {
  playIcon.textContent = '▶';
  playButton.setAttribute('aria-label', 'Play');
});

audio.addEventListener('loadedmetadata', updateTime);
audio.addEventListener('timeupdate', updateTime);

seek.addEventListener('input', () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (seek.value / 100) * audio.duration;
  }
});

muteButton.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? '🔇' : '🔊';
  muteButton.setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute');
});

updateTime();
