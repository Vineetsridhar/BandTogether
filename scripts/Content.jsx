import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import AudioPlayer from "./AudioPlayer";
import { Buttons } from "./Buttons";

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

  return (
    <div>
      <Buttons />
    </div>
  );
}
