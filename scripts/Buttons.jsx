import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import AudioPlayer from "./AudioPlayer";
import { Stack, TextField, DefaultButton } from "office-ui-fabric-react";

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
    audioPlayer.playNote(note);
  };

  const sendKeyDown = (note, instrument = "piano") => {
    playSound(note);
    socket.emit("key_down", { note, instrument });
  };

  const sendKeyUp = (note, instrument = "piano") => {
    socket.emit("key_up", { note, instrument });
  };

  const getAllButton = () => {
    return OCTAVE_NUMBERS.map((OCTAVE) =>
      TONES.map((TONE) => (
        <DefaultButton
          // iconProps={{ iconName: "send" }}
          onMouseDown={() => {
            console.log(TONE + OCTAVE + " down");
            sendKeyDown(TONE + OCTAVE);
          }}
          onMouseUp={() => {
            console.log(TONE + OCTAVE + " up");
            sendKeyUp(TONE + OCTAVE);
          }}
        >
          {TONE + OCTAVE}
        </DefaultButton>
      ))
    ).flat();
  };
  console.log(getAllButton());
  return <div>{getAllButton()}</div>;
};
