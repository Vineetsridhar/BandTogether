import React, { useEffect, useState } from "react";
import { socket } from "./Socket";
import { Buttons } from "./Buttons";
import AudioPlayer from "./AudioPlayer";
import { Stack } from "office-ui-fabric-react";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

export function SheetMusic() {
  useEffect(() => {
    console.log("skdjfn");
    const osmd = new OpenSheetMusicDisplay("osmdContainer", {
      autoResize: true, // just an example for an option, no option is necessary.
      backend: "svg",
      drawTitle: true,
      // put further options here
    });
    console.log(osmd);
  }, []);

  return <div id="osmdContainer" />;
}
