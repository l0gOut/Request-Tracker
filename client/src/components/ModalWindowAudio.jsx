import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import ReactAudioPlayer from "react-audio-player";
import KingAndClown from "../audio/Король и Шут - Кукла Колдуна.mp3";
import Nyanpansu from "../audio/Nyanpansu.mp3";

function ModalWindowAudio() {
  const [checkbox, setCheckbox] = useState(false);

  function handleCheckbox() {
    setCheckbox(!checkbox);
  }

  const [styles, setStyles] = useState({
    className: "soundtracks",
  });

  useEffect(() => {
    if (checkbox) setStyles({ className: "soundtracks soundtracks-true" });
    else
      setStyles({
        className: "soundtracks",
      });
  }, [checkbox]);

  return (
    <div className="modal-audio-component">
      <Form.Checkbox
        id="checkbox-audio"
        checked={checkbox}
        onClick={handleCheckbox}
      />
      <div {...styles}>
        <ReactAudioPlayer
          className="audio-component"
          label="Кукла колдуна"
          src={KingAndClown}
          volume={0.1}
          controls
          loop={true}
        ></ReactAudioPlayer>
        <ReactAudioPlayer
          className="audio-component"
          src={Nyanpansu}
          volume={0.1}
          controls
          loop={true}
        ></ReactAudioPlayer>
      </div>
    </div>
  );
}

export default ModalWindowAudio;
