import React, { useEffect, useState } from "react";
import { CustomButton } from "./CustomButton";

const TONES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVE_NUMBERS = [4];

export const Buttons = ({ playSound, instrument }) => {
  const getAllButton = () => {
    return OCTAVE_NUMBERS.map((OCTAVE) =>
      TONES.map((TONE) => (
        <CustomButton
          note={TONE + OCTAVE}
          instrument={instrument}
          playSound={playSound}
        />
      ))
    ).flat();
  };
  return <div>{getAllButton()}</div>;
};
