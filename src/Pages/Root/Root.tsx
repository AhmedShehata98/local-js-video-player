import React, { MutableRefObject, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import Player from "../../Components/Player";
import PlayerBar from "../../Components/PlayerBar";
import { useAppSelector } from "../../Redux/ReduxHooks";

export const Root = () => {
  const {
    "video-player": { currentVideo, playing },
  } = useAppSelector((s) => s);
  const volumeRef = useRef<number>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  console.log(currentVideo);
  return (
    <main className="relative bg-slate-900 px-4 min-h-screen">
      <Header />
      <Outlet />

      <Player
        CURRENT_VIDEO={currentVideo!}
        show={playing as boolean}
        ref={videoRef}
      />
      <PlayerBar
        CURRENT_VIDEO={currentVideo!}
        SHOW={playing as boolean}
        VIDEO_PLAYER_REF={videoRef as MutableRefObject<HTMLVideoElement>}
      />
    </main>
  );
};
