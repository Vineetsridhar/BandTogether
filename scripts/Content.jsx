import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import { Buttons } from "./Buttons";
import AudioPlayer from "./AudioPlayer";
import { Stack } from "office-ui-fabric-react";

const audioPlayers = {};

const instruments = [
  "accordion",
  "acoustic_grand_piano",
  "acoustic_guitar_nylon",
  "helicopter",
  "lead_6_voice",
  "steel_drums",
  "xylophone",
];

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

  const playSound = (note, ins) => {
    ins = ins ? ins : instrument;
    if (!audioPlayers.hasOwnProperty(ins)) {
      audioPlayers[ins] = AudioPlayer();
      audioPlayers[ins].setInstrument(instrument);
    }
    audioPlayers[ins].playNote(note);
    console.log(audioPlayers, ins);
  };

  return (
    <Stack horizontalAlign="space-between" align="center">
      <h1 align="center">Band Together</h1>
      <h3 align="center">Play some music together!</h3>
      <ul>
        {instruments.map((i) => (
          <li
            onClick={() => {
              setInstrument(i);
            }}
            style={{ cursor: "pointer" }}
          >
            {i}
          </li>
        ))}
      </ul>
      <Buttons playSound={playSound} instrument={instrument} />
    </Stack>
  );
}
