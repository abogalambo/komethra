import React, { Component } from 'react';
import './index.css';
import Sound from '../../modules/audio.js';

export default class Audio extends Component {
  constructor(props) {
    super(props);
    const audio = new Sound(this.props.url, this.callbacks());
    this.state = { audio, loading: true, playing: false };
    this.callbacks = this.callbacks.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }

  callbacks() {
    return {
      onLoaded: () => this.setState({ loading: false }),
      onEnded: () => this.setState({ playing: false })
    };
  }

  play() {
    this.state.audio.play();
    this.setState({ playing: true });
  }

  pause() {
    this.state.audio.pause();
    this.setState({ playing: false });
  }

  stop() {
    this.state.audio.stop();
    this.setState({ playing: false });
  }

  componentDidMount() {
    this.state.audio.load();
  }

  componentWillReceiveProps(nextProps) {
    const { playing } = this.state;
    const { active } = this.props;
    if (active && !nextProps.active) {
      playing && this.stop();
    }
  }

  render() {
    const { loading, playing } = this.state;

    return (
      (loading && <button>Loading ...</button>) ||
      (playing && <button onClick={this.pause}>Pause</button>) ||
      <button onClick={this.play}>Play</button>
    );
  }
}
