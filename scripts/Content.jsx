import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import { Buttons } from "./Buttons";
import AudioPlayer from "./AudioPlayer";
import { DefaultButton, PrimaryButton, Stack } from "office-ui-fabric-react";
import { SheetMusic } from "./SheetMusic";
import Images from "./images";
import { CustomPiano } from "./CustomPiano";
import { adjectives, animals } from "./names";

const audioPlayers = {};

export function Content() {
  const [instrument, setInstrument] = useState("acoustic_grand_piano");
  const [name, setName] = useState("Name");
  const [users, setUsers] = useState({});
  const [score, setScore] = useState(0);
  const [noteToBePlayed, setNoteToBePlayed] = useState([
    { note: "Piano H", delay: "0s" },
    { note: "Piano G", delay: "5s" },
    { note: "Piano A", delay: "10s" },
    { note: "Piano B", delay: "15s" },
  ]);
  const [upcomingNotes, updateUpcomingNotes] = useState([
    { note: "Piano H", delay: "0s" },
    { note: "Piano G", delay: "5s" },
    { note: "Piano A", delay: "10s" },
    { note: "Piano B", delay: "15s" },
  ]);

  const playSound = (note, ins) => {
    ins = ins ? ins : instrument;
    console.log(note);
    let painoMap = new Map([
      ["A", 60],
      ["W", 61],
      ["S", 62],
      ["E", 63],
      ["D", 64],
      ["F", 65],
      ["T", 66],
      ["G", 67],
      ["Y", 68],
      ["H", 69],
      ["U", 70],
      ["J", 71],
      ["K", 72],
    ]);
    console.log(noteToBePlayed);
    if (noteToBePlayed !== undefined && noteToBePlayed.length != 0) {
      if (
        painoMap.get(
          noteToBePlayed[0].note.substr(noteToBePlayed[0].note.length - 1)
        ) == note
      ) {
        setScore(score + 5);
        const newNoteToBePlayed = noteToBePlayed;
        newNoteToBePlayed.shift();
        updateUpcomingNotes(newNoteToBePlayed);
      }
    }
    console.log(score);

    if (!audioPlayers.hasOwnProperty(ins)) {
      audioPlayers[ins] = AudioPlayer();
      audioPlayers[ins].setInstrument(instrument);
    }
    audioPlayers[ins].playNote(note);
  };

  const instruments = {
    accordion: {
      name: "Accordion",
      ui: <Buttons playSound={playSound} instrument={instrument} name={name} />,
      image:
        "https://e7.pngegg.com/pngimages/466/517/png-clipart-cartoon-red-accordion-accordion-cartoon-musical-instrument-thumbnail.png",
    },
    acoustic_grand_piano: {
      name: "Piano",
      ui: (
        <CustomPiano
          playSound={playSound}
          instrument={instrument}
          name={name}
        />
      ),
      image:
        "https://p7.hiclipart.com/preview/214/760/914/beautiful-jazz-instruments.jpg",
    },
    acoustic_guitar_nylon: {
      name: "Guitar",
      ui: <Buttons playSound={playSound} instrument={instrument} name={name} />,
      image:
        "https://cf.ltkcdn.net/guitar/images/std/201173-350x350-Free-Guitar-Clip-Art-1.jpg",
    },
    steel_drums: {
      name: "Steel Drums",
      ui: <Buttons playSound={playSound} instrument={instrument} name={name} />,
      image:
        "https://www.clker.com/cliparts/5/c/d/3/15163052441523204714clipart-steel-drum.med.png",
    },
    alto_sax: {
      name: "Alto Sax",
      ui: <Buttons playSound={playSound} instrument={instrument} name={name} />,
      image:
        "https://www.pinclipart.com/picdir/middle/420-4201427_sax-clipart.png",
    },
    synth_drum: {
      name: "Synth Drums",
      ui: <Buttons playSound={playSound} instrument={instrument} name={name} />,
      image:
        "https://i.pinimg.com/564x/32/96/56/329656ec2dc1166cbc8dd92e421665c2.jpg",
    },
  };

  useEffect(() => {
    audioPlayers[instrument] = AudioPlayer();
    audioPlayers[instrument].setInstrument(instrument);
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    setName(`${randomAdjective} ${randomAnimal}`);

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

    socket.on("upcoming_note", (data) => {
      setScore(0);
      updateUpcomingNotes([]);
      setTimeout(() => {
        updateUpcomingNotes(data);
        setNoteToBePlayed(data);
      }, 100);
    });
  }, []);

  const stackItemStyles = { width: "100%", maxWidth: "none" };
  return (
    <Stack horizontalAlign="space-between" align="center">
      <Stack.Item align="center" styles={stackItemStyles}>
        <h1 align="center">Band Together</h1>
      </Stack.Item>
      <Stack.Item align="center" styles={stackItemStyles}>
        <h3 align="center">Play some music together!</h3>
      </Stack.Item>
      <Stack.Item align="center" styles={stackItemStyles}>
        <Stack
          horizontal
          wrap
          align="center"
          horizontalAlign="center"
          tokens={{ childrenGap: 10, padding: 10 }}
        >
          <p>Enter your name:</p>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Stack>
      </Stack.Item>
      <Stack.Item align="center" styles={stackItemStyles}>
        {Object.values(users).map((user) => (
          <p>
            {user["name"]} - {user["instrument"]}
          </p>
        ))}
      </Stack.Item>
      <Stack.Item align="center" styles={stackItemStyles}>
        <Stack
          horizontal
          wrap
          align="center"
          horizontalAlign="center"
          tokens={{ childrenGap: 10, padding: 10 }}
        >
          {Object.keys(instruments).map((i) => (
            <div style={{ maxWidth: "100px" }}>
              <Stack>
                <img
                  className={"image " + (i == instrument ? "selected" : "")}
                  src={instruments[i].image}
                  onClick={() => {
                    setInstrument(i);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <p style={{ textAlign: "center" }}>{instruments[i].name}</p>
                {i == instrument ? (
                  <PrimaryButton styles={{ maxWidth: "100px" }}>
                    {" Selected "}
                  </PrimaryButton>
                ) : (
                  <DefaultButton
                    onClick={() => {
                      setInstrument(i);
                    }}
                    styles={{ maxWidth: "100px" }}
                  >
                    Play!
                  </DefaultButton>
                )}
              </Stack>
            </div>
          ))}
        </Stack>
      </Stack.Item>
      <Stack.Item align="center" styles={stackItemStyles}>
        <div style={{ width: "50vw" }}>
          <SheetMusic upcomingNotes={upcomingNotes} score={score} />
        </div>
      </Stack.Item>
      <Stack.Item align="center" styles={stackItemStyles}>
        <div style={{ width: "50vw" }}>{instruments[instrument].ui}</div>
      </Stack.Item>
    </Stack>
  );
}
