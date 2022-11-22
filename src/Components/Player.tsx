import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { useAppSelector } from "../Redux/ReduxHooks";
import { IVideosFileList } from "../Types/AppTypes";

type playerProps = {
  CURRENT_VIDEO: IVideosFileList;
  show: boolean;
};

const Player = forwardRef<HTMLVideoElement, playerProps>(
  ({ show, CURRENT_VIDEO }, ref) => {
    const { isRepeating } = useAppSelector((state) => state["video-player"]);
    const playerRef = useRef<HTMLDivElement>(null);

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
          loop={isRepeating}
          ref={ref}
          preload="metadata"
        ></video>
      </div>
    );
  }
);

export default Player;
