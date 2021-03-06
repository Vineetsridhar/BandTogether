import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import { Buttons } from "./Buttons";
import AudioPlayer from "./AudioPlayer";
import {
  DefaultButton,
  FontIcon,
  IconButton,
  ImageIcon,
  Stack,
} from "office-ui-fabric-react";
import { Animated } from "react-animated-css";
import { Piano } from "react-piano";
import { getResponsiveMode } from "office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode";

let music = [];

export function SheetMusic({ upcomingNotes, score }) {
  return (
    <>
      <div
        style={{
          border: "4px solid #0063B1",
          height: "200px",
          width: "50vw",
          position: "relative",
        }}
      >
        {upcomingNotes.map(
          (note) => (
            music.push(note),
            (
              <div style={{ position: "absolute", width: "50vw" }}>
                <p
                  className="slideOutDown"
                  style={{
                    animationDelay: note.delay,
                    position: "absolute",
                    left: note.pos,
                  }}
                >
                  {note.note}
                </p>
              </div>
            )
          )
        )}

        <div
          style={{
            position: "absolute",
            background: "#0063B1",
            width: "50vw",
            height: "50px",
          }}
        >
          <p style={{ color: "lightblue" }}>
            Upcoming notes{" "}
            <DefaultButton
              onClick={() => {
                socket.emit("restart_upcoming");
              }}
            >
              <FontIcon iconName="Refresh"></FontIcon>
              <p>Restart Song</p>
            </DefaultButton>
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            borderTop: "2px solid #0063B1",
            background: "DarkSeaGreen",
            width: "50vw",
            height: "50px",
            bottom: "0px",
            zIndex: "-1",
          }}
        ></div>
      </div>

      <p>Current Score: {score}</p>
    </>
  );
}
// let score = 0;
// export function checkNote(note) {
//   let painoMap = new Map([
//     ["A", 60],
//     ["W", 61],
//     ["S", 62],
//     ["E", 63],
//     ["D", 64],
//     ["F", 65],
//     ["T", 66],
//     ["G", 67],
//     ["Y", 68],
//     ["H", 69],
//     ["U", 70],
//     ["J", 71],
//     ["K", 72],
//   ]);
//   console.log(music);
//   if (music !== undefined && music.length != 0) {
//     if (painoMap.get(music[0].note.substr(music[0].note.length - 1)) == note) {
//       score += 5;
//       music.shift();
//     }
//   }
//   console.log(score);
// }
