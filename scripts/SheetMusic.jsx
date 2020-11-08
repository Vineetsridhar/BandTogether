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
      <div
        style={{ border: "4px solid #0063B1", height: "200px", width: "50vw" }}
      >
        {upcomingNotes.map((note) => (
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
    </>
  );
}
