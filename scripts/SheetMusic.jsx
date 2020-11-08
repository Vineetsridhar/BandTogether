import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import { Buttons } from "./Buttons";
import AudioPlayer from "./AudioPlayer";
import { DefaultButton, Stack } from "office-ui-fabric-react";
import { Animated } from "react-animated-css";

export function SheetMusic() {
  const [upcomingNotes, updateUpcomingNotes] = useState([
    { note: "Piano C", delay: "0s" },
    { note: "Piano G", delay: "5s" },
  ]);
  console.log("skjdfnsdkjnf");

  useEffect(() => {
    socket.on("upcoming_note", (data) => {
      console.log(data);
      updateUpcomingNotes([]);
      setTimeout(() => {
        updateUpcomingNotes(data);
      }, 100);
    });
  }, []);
  console.log(upcomingNotes);
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
            <p className="slideOutDown" style={{ animationDelay: note.delay }}>
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
