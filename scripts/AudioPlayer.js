import SoundFontPlayer from "soundfont-player";
import AudioContext from "./AudioContext";

/*
 * https://dev.to/ganeshmani/building-a-piano-with-react-hooks-3mih
 * Used this link to create the Sound player boilder plate code
 */

const NullSoundFontPlayerNoteAudio = {
  stop() {},
};

const NullSoundFontPlayer = {
  play() {
    return NullSoundFontPlayerNoteAudio;
  },
};
const AudioPlayer = () => {
  //Audio Context
  const audioContext = AudioContext && new AudioContext();

  //soundPlayer
  let soundPlayer = NullSoundFontPlayer;
  //setInstrument
  const Player = {
    setInstrument(instrumentName) {
      SoundFontPlayer.instrument(audioContext, instrumentName)
        .then((soundfontPlayer) => {
          soundPlayer = soundfontPlayer;
        })
        .catch((e) => {
          soundPlayer = NullSoundFontPlayer;
        });
    },
    playNote(note) {
      soundPlayer.play(note);
    },
  };
  return Player;
};

export default AudioPlayer;
