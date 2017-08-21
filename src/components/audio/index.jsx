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
    this.onActive = this.onActive.bind(this);
  }

  callbacks() {
    return {
      onLoaded: () => this.setState({ loading: false }),
      onEnded: () => this.setState({ playing: false })
    };
  }

  play() {
    if (!this.props.active) {
      return;
    }
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

  onActive() {
    const { audio } = this.state;
    const { autoplay } = this.props;

    if (autoplay) {
      audio.load().then(() => {
        this.play();
      });
    }
  }

  componentDidMount() {
    this.state.audio.load();
    this.props.active && this.onActive();
  }

  componentWillUnmount() {
    const { playing } = this.state;
    playing && this.stop();
  }

  componentWillReceiveProps(nextProps) {
    const { playing } = this.state;
    const { active } = this.props;

    if (active && !nextProps.active) {
      playing && this.stop();
    }

    if (!active && nextProps.active) {
      this.onActive();
    }
  }

  render() {
    const { loading, playing } = this.state;

    return (
      (loading &&
        <button className="btn btn--audio btn--audio__load" disabled />) ||
      (playing &&
        <button
          className="btn btn--audio btn--audio__play"
          onClick={this.pause}
        />) ||
      <button
        className="btn btn--audio btn--audio__pause"
        onClick={this.play}
      />
    );
  }
}
