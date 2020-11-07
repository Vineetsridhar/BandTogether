import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import AudioPlayer from "./AudioPlayer";
import { Stack, TextField, DefaultButton } from "office-ui-fabric-react";
import { CustomButton } from "./CustomButton";

const TONES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVE_NUMBERS = [1];

const audioPlayer = AudioPlayer();

export const Buttons = () => {
  const [instrument, setInstrument] = useState("acoustic_grand_piano");

  useEffect(() => {
    audioPlayer.setInstrument("acoustic_grand_piano");

    socket.emit("key_up", { note: "a", instrument: "instrument" });
    socket.on("key_up", (data) => {
      console.log(data);
    });
    audioPlayer.setInstrument(instrument);
    socket.on("key_down", (data) => {
      playSound(data["note"]);
    });
  }, []);

  const playSound = (note) => {
    console.log(note);
    console.log("skjdfnsdkj");
    audioPlayer.playNote(note);
  };

  const getAllButton = () => {
    return OCTAVE_NUMBERS.map((OCTAVE) =>
      TONES.map((TONE) => (
        <CustomButton
          note={TONE + OCTAVE}
          instrument={instrument}
          playSound={playSound}
        />
      ))
    ).flat();
  };
  console.log(getAllButton());
  return <div>{getAllButton()}</div>;
};
