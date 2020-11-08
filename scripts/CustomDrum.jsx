import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import AudioPlayer from "./AudioPlayer";
import { Stack, TextField, DefaultButton } from "office-ui-fabric-react";

export const CustomDrum = ({ note, instrument, playSound, name }) => {
  const sendToServer = (event) => {
    socket.emit(event, { note, instrument, name });
  };

  return (
    <DefaultButton
      // iconProps={{ iconName: "send" }}
      onMouseDown={() => {
        sendToServer("key_down");
        playSound(note);
      }}
      onMouseUp={() => {
        sendToServer("key_up");
      }}
      style={{
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
        backgroundColor: "#fff",
        borderRadius: 100,
      }}
    >
      {note}
    </DefaultButton>
  );
};
