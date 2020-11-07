import React from "react";
import { CustomButton } from "./CustomButton";
import { Stack } from "office-ui-fabric-react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { socket } from "./Socket";

const TONES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVE_NUMBERS = [4, 5];

export const Buttons = ({ playSound, instrument }) => {
  const sendToServer = (event, note) => {
    socket.emit(event, { note, instrument });
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

  const firstNote = MidiNumbers.fromNote("c4");
  const lastNote = MidiNumbers.fromNote("c6");
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
          // console.log(midiNumber);
        }}
        stopNote={(midiNumber, n) => {
          // Stop playing a given note - see notes below
        }}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
        onPlayNoteInput={(note) => {
          playSound(note);
          sendToServer("key_down", note);
        }}
        onStopNoteInput={(blah) => {
          // console.log("stop", blah);
        }}
      />
      <Stack horizontal wrap horizontalAlign="space-between" align="center">
        {getAllButton()}
      </Stack>
    </>
  );
};
