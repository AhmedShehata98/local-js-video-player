import React, { forwardRef, useLayoutEffect, useRef } from "react";
import { useAppSelector } from "../Redux/ReduxHooks";
import { IVideosFileList } from "../Types/AppTypes";
import { IoMdClose } from "react-icons/io";

type playerProps = {
  CURRENT_VIDEO: IVideosFileList;
  show: boolean;
};

const Player = forwardRef<HTMLVideoElement, playerProps>(
  ({ show, CURRENT_VIDEO }, ref) => {
    const { isRepeating } = useAppSelector((state) => state["video-player"]);
    const playerRef = useRef<HTMLDivElement>(null);

    function handleClose(ev: React.MouseEvent) {
      playerRef.current?.classList.toggle("hide-player");
    }
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
        <span className="absolute top-4 left-0 z-10 flex justify-end px-4 w-full h-10 bg-transparent ">
          <button
            onClick={(ev) => handleClose(ev)}
            className="grid place-content-center bg-slate-400 aspect-square rounded-full bg-opacity-40 hover:bg-opacity-80"
          >
            <IoMdClose className="leading-3 text-2xl pointer-events-none select-none" />
          </button>
        </span>
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
