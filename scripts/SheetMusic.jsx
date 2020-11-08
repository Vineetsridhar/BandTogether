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

let music = [];

export function SheetMusic() {
  const [upcomingNotes, updateUpcomingNotes] = useState([
    { note: "Piano H", delay: "0s" },
    { note: "Piano G", delay: "5s" },
  ]);

  useEffect(() => {
    socket.on("upcoming_note", (data) => {
      updateUpcomingNotes([]);
      setTimeout(() => {
        updateUpcomingNotes(data);
        
      }, 100);
    });
    upcomingNotes.forEach((note) => {
      console.log(note);
      setTimeout(()=>{
        console.log(music);
        // music.push(note);
      }, note.delay.substr(0, note.delay.length-1));
      
    });
    
  }, []);
  // console.log(upcomingNotes);
 
  return (
    <>
      <div
        style={{ border: "4px solid #0063B1", height: "200px", width: "50vw" }}
      >
        {upcomingNotes.map((note) => (
          music.push(note),
          <div style={{ position: "absolute", width: "50vw" }}>
            <p
              className="slideOutDown"
              style={{ animationDelay: note.delay, textAlign: "center" }}
            >
              {note.note}
            </p>
          </div>
        ))}
        
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
      </div>
      
      {
        setTimeout(() => {
          music.pop();
        }, 10000)
      }
    </>
  );
}
let score = 0;
export function checkNote(note) {
  let painoMap = new Map([
    ['A', 60],
    ['W', 61],
    ['S', 62],
    ['E', 63],
    ['D', 64],
    ['F', 65],
    ['T', 66],
    ['G', 67],
    ['Y', 68],
    ['H', 69],
    ['U', 70],
    ['J', 71],
    ['K', 72]
  ]);
  console.log(music);
  if(music !== undefined && music.length != 0) {
    if(painoMap.get(music[0].note.substr(music[0].note.length-1)) == note){
      score+=5;
      music.shift();
    }
  }
  console.log(score);
}
