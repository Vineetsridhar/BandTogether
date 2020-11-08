import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import { Buttons } from "./Buttons";
import AudioPlayer from "./AudioPlayer";
import { DefaultButton, Stack } from "office-ui-fabric-react";
import { Animated } from "react-animated-css";

let music = [];

export function SheetMusic() {
  const [upcomingNotes, updateUpcomingNotes] = useState([
    { note: "Piano A", delay: "0s" },
    { note: "Piano G", delay: "5s" },
  ]);
  music.push(upcomingNotes);
  console.log(music);
  useEffect(() => {
    socket.on("upcoming_note", (data) => {
      updateUpcomingNotes([]);
      setTimeout(() => {
        updateUpcomingNotes(data);
        console.log(111);
      }, 100);
    });
    upcomingNotes.forEach((note) => {
      console.log(note);
      setTimeout(()=>{
        console.log(note);
      }, note.delay.substr(0, note.delay.length-1));
    });
    
  }, []);
  // console.log(upcomingNotes);
 
  return (
    <>
      <DefaultButton
        iconProps={{ iconName: "Refresh" }}
        onClick={() => {
          socket.emit("restart_upcoming");
        }}
      ></DefaultButton>
      <div style={{ height: "200px" }}>
        {upcomingNotes.map((note) => (
          <div style={{ position: "absolute" }}>
            <p className="slideOutDown" fstyle={{ animationDelay: note.delay }}>
              {note.note}
            </p>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            background: "black",
            width: "75%",
            height: "50px",
          }}
        >
          <p style={{ color: "lightblue" }}>Upcoming notes</p>
        </div>
      </div>
    </>
  );
}

export function checkNote(note) {
  // checkNote((note) => {
  //   // socket.on("upcoming_note", (data) => {
  //   //   updateUpcomingNotes([]);
  //   //   setTimeout(() => {
  //   //     updateUpcomingNotes(data);
  //   //   }, 100);
  //   // });
  //   console.log(note);
  // }, []);
  console.log(note);
  console.log(music);

}
