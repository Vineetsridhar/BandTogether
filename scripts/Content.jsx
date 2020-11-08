import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import { Buttons } from "./Buttons";
import AudioPlayer from "./AudioPlayer";
import { Stack } from "office-ui-fabric-react";
import { SheetMusic } from "./SheetMusic";

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
  const [name, setName] = useState("Random");
  const [users, setUsers] = useState({});
  const [sid, setSID] = useState("");

  useEffect(() => {
    audioPlayers[instrument] = AudioPlayer();
    audioPlayers[instrument].setInstrument(instrument);

    socket.on("key_up", (data) => {
      console.log(data);
    });

    socket.on("key_down", (data) => {
      playSound(data["note"], data["instrument"]);
      setUsers((users) => {
        return users;
      });
    });

    socket.on("all_users", (data) => {
      setUsers(data);
    });
  }, []);

  const playSound = (note, ins) => {
    ins = ins ? ins : instrument;

    if (!audioPlayers.hasOwnProperty(ins)) {
      audioPlayers[ins] = AudioPlayer();
      audioPlayers[ins].setInstrument(instrument);
    }
    audioPlayers[ins].playNote(note);
  };

  return (
    <Stack horizontalAlign="space-between" align="center">
      <h1 align="center">Band Together</h1>
      <h3 align="center">Play some music together!</h3>
      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {Object.values(users).map((user) => (
        <p>
          {user["name"]} - {user["instrument"]}
        </p>
      ))}
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
      <SheetMusic />
      <Buttons playSound={playSound} instrument={instrument} name={name} />
    </Stack>
  );
}
