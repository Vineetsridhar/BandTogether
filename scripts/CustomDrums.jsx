import React from "react";
import { CustomButton } from "./CustomButton";
import { Stack } from "office-ui-fabric-react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { socket } from "./Socket";
import { CustomDrum } from "./CustomDrum";

const TONES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVE_NUMBERS = [4];

export const CustomDrums = ({ playSound, instrument, name }) => {
  const sendToServer = (event, note) => {
    socket.emit(event, { note, instrument, name });
  };
  const getAllButton = () => {
    return OCTAVE_NUMBERS.map((OCTAVE) =>
      TONES.map((TONE) => (
        <CustomDrum
          note={TONE + OCTAVE}
          instrument={instrument}
          playSound={playSound}
          name={name}
        />
      ))
    ).flat();
  };

  return (
    <>
      <Stack horizontal wrap horizontalAlign="space-around" align="center">
        {getAllButton()}
      </Stack>
    </>
  );
};
