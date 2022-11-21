import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { IVideosFileList } from "../Types/AppTypes";

type playerProps = {
  CURRENT_VIDEO: IVideosFileList;
  show: boolean;
  fullscreen: boolean;
};

const Player = forwardRef<HTMLVideoElement, playerProps>(
  ({ show, CURRENT_VIDEO, fullscreen }, ref) => {
    const playerRef = useRef<HTMLDivElement>(null);

    const handleAddFullscreenClass = (): boolean => {
      if (playerRef.current?.classList.contains("full-screen")) {
        playerRef.current.classList.remove("full-screen");
      } else {
        playerRef.current?.classList.add("full-screen");
      }

      return playerRef.current?.classList.contains("full-screen")
        ? true
        : false;
    };
    useEffect(() => {
      handleAddFullscreenClass();
    }, [fullscreen]);

    useLayoutEffect(() => {
      if (show) {
        playerRef.current?.classList.remove("hide-player");
        // videoRef?.current?.play();
      } else {
        playerRef.current?.classList.add("hide-player");
      }

      return () => {
        playerRef.current?.classList.add("hide-player");
        // videoRef?.current?.pause();
      };
    }, [show]);

    console.count("render player");
    return (
      <div
        ref={playerRef}
        className="absolute bottom-24 left-6 shadow-md p-1 rounded-md bg-slate-700 w-1/5 h1/5 transition-all duration-500 hide-player"
      >
        <video
          className="w-full h-full"
          src={CURRENT_VIDEO?.video}
          typeof={CURRENT_VIDEO?.type}
          autoPlay
          ref={ref}
          preload="metadata"
        ></video>
      </div>
    );
  }
);

export default Player;
