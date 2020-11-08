import React from "react";
import { CustomButton } from "./CustomButton";
import { Stack } from "office-ui-fabric-react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { socket } from "./Socket";
// import {checkNote} from "./SheetMusic";

export const CustomPiano = ({ playSound, instrument, name }) => {
  const sendToServer = (event, note) => {
    socket.emit(event, { note, instrument, name });
  };

  const firstNote = MidiNumbers.fromNote("c4");
  const lastNote = MidiNumbers.fromNote("c5");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <div style={{ height: "200px" }}>
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          // console.log(midiNumber);
        }}
        stopNote={(midiNumber, n) => {
          // Stop playing a given note - see notes below
        }}
        // width={"100%"}
        // height={"100%"}
        keyboardShortcuts={keyboardShortcuts}
        onPlayNoteInput={(note) => {
          playSound("c4");
          sendToServer("key_down", note);
          // checkNote(note);
        }}
        onStopNoteInput={(blah) => {
          // console.log("stop", blah);
        }}
      />
    </div>
  );
};
