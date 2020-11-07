import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import AudioPlayer from "./AudioPlayer";
import { Buttons } from "./Buttons";

const audioPlayer = AudioPlayer();

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
