import * as React from "react";
import Slider from '@mui/material/Slider';
import DownloadButton from "./DownloadButton.jsx";

function MusicPlayer() {
  return (
    <div>
      <DownloadButton />
      <br />
      <Slider />
      <audio controls>
        <source src="votre_fichier_audio.mp3" type="audio/mpeg" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
      <br />
    </div>
  );
}
export default MusicPlayer;