import React from "react";
import { CustomButton } from "./CustomButton";
import { Stack } from "office-ui-fabric-react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { socket } from "./Socket";
// import {checkNote} from "./SheetMusic";

export const CustomBass = ({ playSound, instrument, name }) => {
  const sendToServer = (event, note) => {
    socket.emit(event, { note, instrument, name });
  };

  const firstNote = MidiNumbers.fromNote("c4");
  const lastNote = MidiNumbers.fromNote("b4");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  const translate = {
    60: "C4",
    61: "C#4",
    62: "D4",
    63: "D#4",
    64: "E4",
    65: "F4",
    66: "F#4",
    67: "G4",
    68: "G#4",
    69: "A4",
    70: "A#4",
    71: "B5",
  };
  return (
    <div style={{ height: "200px" }}>
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(note) => {
          playSound(translate[note]);
          sendToServer("key_down", translate[note]);
          // console.log(midiNumber);
        }}
        stopNote={(midiNumber, n) => {
          // Stop playing a given note - see notes below
        }}
        // width={"100%"}
        // height={"100%"}
        keyboardShortcuts={keyboardShortcuts}
        onPlayNoteInput={(note) => {
          // checkNote(note);
        }}
        onStopNoteInput={(blah) => {
          // console.log("stop", blah);
        }}
      />
    </div>
  );
};
