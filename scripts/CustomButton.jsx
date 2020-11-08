import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import AudioPlayer from "./AudioPlayer";
import { Stack, TextField, DefaultButton } from "office-ui-fabric-react";

export const CustomButton = ({ note, instrument, playSound, name }) => {
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
    >
      {note}
    </DefaultButton>
  );
};
