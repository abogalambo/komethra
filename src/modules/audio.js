const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioCtx.createGain();
let volumeMemory = 1;

export default class Audio {
  constructor(url) {
    this.url = url;
    this._state = {
      currentOffset: 0,
      isPlaying: false
    };
  }

  load() {
    this._state.promise =
      this._state.promise ||
      fetch(this.url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
        .then(buffer => Promise.resolve(buffer));
    return this._state.promise;
  }

  play() {
    if (this.isPlaying()) {
      return;
    }
    this.load().then(buffer => {
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      source.onended = () => this._onEndedCallback();
      source.start(0, this._state.currentOffset);
      this._updateState({
        source: source,
        isPlaying: true,
        playStartTime: audioCtx.currentTime - this._state.currentOffset
      });
    });
  }

  pause() {
    if (!this.isPlaying()) {
      return;
    }
    const { source } = this._state;
    this._updateState({
      currentOffset: audioCtx.currentTime - this._state.playStartTime,
      isPlaying: false
    });
    source.stop();
  }

  seek(offset) {
    const wasPlaying = this.isPlaying();
    wasPlaying && this.pause();
    this._updateState({
      currentOffset: offset
    });
    wasPlaying && this.play();
  }

  stop() {
    this.pause();
    this.seek(0);
  }

  isPlaying() {
    return this._state.isPlaying;
  }

  currentOffset() {
    if (this.isPlaying()) {
      return audioCtx.currentTime - this._state.playStartTime;
    } else {
      return this._state.currentOffset;
    }
  }

  duration() {
    const { source } = this._state;
    return (source && source.buffer && source.buffer.duration) || 0;
  }

  _updateState(attributes) {
    Object.assign(this._state, attributes);
  }

  _onEndedCallback() {
    const offset = audioCtx.currentTime - this._state.playStartTime;
    if (offset >= this.duration()) {
      this._updateState({
        currentOffset: 0,
        isPlaying: false
      });
    }
  }

  static mute() {
    volumeMemory = gainNode.gain.value;
    Audio.setVolume(0);
  }

  static unmute() {
    Audio.setVolume(volumeMemory);
  }

  static setVolume(volume) {
    gainNode.gain.value = volume;
  }
}
