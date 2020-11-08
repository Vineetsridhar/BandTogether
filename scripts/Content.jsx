import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import { Buttons } from "./Buttons";
import AudioPlayer from "./AudioPlayer";
import { Stack } from "office-ui-fabric-react";
import { SheetMusic } from "./SheetMusic";
import Images from "./images";

const audioPlayers = {};

const instruments = [
  "accordion",
  "acoustic_grand_piano",
  "acoustic_guitar_nylon",
  "steel_drums",
  "alto_sax",
  "synth_drum",
];

export function Content() {
  const [instrument, setInstrument] = useState("acoustic_grand_piano");
  const [name, setName] = useState("Random");
  const [users, setUsers] = useState({});

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
      <div className="imageContainer">
        {instruments.map((i) => (
          <span style={{ flexDirection: "column", display: "flex", flex: 1 }}>
            <img
              className={"image " + (i == instrument ? "selected" : "")}
              src={Images[i]}
              onClick={() => {
                setInstrument(i);
              }}
              style={{ cursor: "pointer" }}
            />
            <p style={{ textAlign: "center" }}>{i}</p>
          </span>
        ))}
      </div>
      <SheetMusic />
      <Buttons playSound={playSound} instrument={instrument} name={name} />
    </Stack>
  );
}
