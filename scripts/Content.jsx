
import React, { useEffect } from 'react';
import { socket } from './Socket';
import AudioPlayer from "./AudioPlayer";

const audioPlayer = AudioPlayer();

const TONES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const OCTAVE_NUMBERS = [1, 2, 3, 4, 5, 6, 7];

export function Content() {
    useEffect(() => {
        audioPlayer.setInstrument("acoustic_grand_piano");
    }, []);


    const onClick = (note) => {
        audioPlayer.playNote(note);
    }

    const getAllButton = () => {
        let buttons = [];
        TONES.forEach(TONE => {
            OCTAVE_NUMBERS.forEach(OCTAVE => {
                const note = TONE+OCTAVE
                buttons.push(
                    <button onClick={()=> {onClick(note)}}>{note}</button>
                )
            })
        })
        return buttons;
    }

    return (
        <div>
            {getAllButton()}
        </div>
    );
}
