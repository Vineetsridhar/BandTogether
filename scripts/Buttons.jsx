import React, { useEffect, useState } from "react";
import { CustomButton } from "./CustomButton";
import { Stack } from "office-ui-fabric-react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";

const TONES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVE_NUMBERS = [4, 5];

export const Buttons = ({ playSound, instrument }) => {
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

  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("f5");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <>
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
        onPlayNoteInput={(blah) => {
          console.log(blah);
        }}
        onStopNoteInput={(blah) => {
          console.log(blah);
        }}
      />
      <Stack horizontal wrap horizontalAlign="space-between" align="center">
        {getAllButton()}
      </Stack>
    </>
  );
};
