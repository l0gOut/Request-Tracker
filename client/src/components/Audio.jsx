import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import KingAndClown from "../audio/Король и Шут - Кукла Колдуна.mp3";

export default class Audio extends Component {
  render() {
    return (
      <ReactAudioPlayer
        className="audio-component"
        src={KingAndClown}
        volume={0.1}
        controls
        loop={true}
        autoPlay={true}
      ></ReactAudioPlayer>
    );
  }
}
