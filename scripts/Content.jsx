import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import { Buttons } from "./Buttons";
import AudioPlayer from "./AudioPlayer";

const audioPlayers = {};

export function Content() {
  const [instrument, setInstrument] = useState("acoustic_grand_piano");

  useEffect(() => {
    audioPlayers[instrument] = AudioPlayer();
    audioPlayers[instrument].setInstrument(instrument);

    socket.on("key_up", (data) => {});

    socket.on("key_down", (data) => {
      playSound(data["note"], data["instrument"]);
    });
  }, []);

  const playSound = (note, instrument = instrument) => {
    if (!audioPlayers.hasOwnProperty(instrument)) {
      audioPlayers[instrument] = AudioPlayer();
    }
    audioPlayers[instrument].playNote(note);
  };

  return <Buttons playSound={playSound} instrument={instrument} />;
}
