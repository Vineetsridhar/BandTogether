import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import AudioPlayer from "./AudioPlayer";

const audioPlayer = AudioPlayer();

const TONES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVE_NUMBERS = [1, 2, 3, 4, 5, 6, 7];

export function Content() {
  const [instrument, setInstrument] = useState("acoustic_grand_piano");

  const playSound = (note) => {
    audioPlayer.playNote(note);
  };

  useEffect(() => {
    audioPlayer.setInstrument(instrument);
    socket.on("key_down", (data) => {
      playSound(data["note"]);
    });
  }, []);

  const onClick = (note) => {
    playSound(note);
    socket.emit("key_down", { note, instrument });
  };

  const getAllButton = () => {
    let buttons = [];
    OCTAVE_NUMBERS.forEach((OCTAVE) => {
      TONES.forEach((TONE) => {
        const note = TONE + OCTAVE;
        buttons.push(
          <button
            onClick={() => {
              onClick(note);
            }}
          >
            {note}
          </button>
        );
      });
    });
    return buttons;
  };

  return <div>{getAllButton()}</div>;
}
