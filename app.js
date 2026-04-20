const audio = new Audio('industrial_drum.wav');

const $ = id => document.getElementById(id);

function fmtTime(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

$('file-in').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  audio.src = URL.createObjectURL(file);
  $('track-name').textContent = file.name;
});

audio.addEventListener('loadedmetadata', function() {
  $('prog').max = audio.duration;
  $('dur-time').textContent = fmtTime(audio.duration);
});

audio.addEventListener('timeupdate', function() {
  $('prog').value = audio.currentTime;
  $('cur-time').textContent = fmtTime(audio.currentTime);
});

audio.addEventListener('ended', function() {
  $('btn-play').textContent = 'Play';
});

$('prog').addEventListener('input', function() {
  audio.currentTime = this.value;
});

$('btn-play').addEventListener('click', function() {
  if (!audio.src) {
    alert('Please load an audio file first.');
    return;
  }
  if (audio.paused) {
    audio.play();
    this.textContent = 'Pause';
  } else {
    audio.pause();
    this.textContent = 'Play';
  }
});

$('btn-mute').addEventListener('click', function() {
  audio.muted = !audio.muted;
  this.textContent = audio.muted ? 'Unmute' : 'Mute';
  this.classList.toggle('on', audio.muted);
});

$('btn-loop').addEventListener('click', function() {
  audio.loop = !audio.loop;
  this.textContent = audio.loop ? 'Loop: On' : 'Loop: Off';
  this.classList.toggle('on', audio.loop);
});

$('btn-skip-b').addEventListener('click', function() {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});

$('btn-skip-f').addEventListener('click', function() {
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
});

$('vol').addEventListener('input', function() {
  audio.volume = this.value;
  $('vol-val').textContent = Math.round(this.value * 100) + '%';
});

$('speed').addEventListener('change', function() {
  audio.playbackRate = this.value;
});