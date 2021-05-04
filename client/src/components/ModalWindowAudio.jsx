import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import Audio from "./Audio";

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
        <Audio />
      </div>
    </div>
  );
}

export default ModalWindowAudio;
