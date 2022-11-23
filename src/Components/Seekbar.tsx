import React, { useEffect, useRef, useState } from "react";
type SeekBarProps = {
  VIDEO_PLAYER_REF: React.MutableRefObject<HTMLVideoElement>;
  isPlaying: boolean;
  // setisPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};
const Seekbar = ({
  isPlaying,
  // setisPlaying,
  VIDEO_PLAYER_REF,
}: SeekBarProps) => {
  const [currVideoTime, setcurrVideoTime] = useState(
    VIDEO_PLAYER_REF.current?.currentSrc || 0
  );
  let intervalRef = useRef<number>(0);

  const updateCurrVideoTime = (
    VIDEO_REF: React.MutableRefObject<HTMLVideoElement>,
    ev: React.ChangeEvent
  ) => {
    const input = ev.target as HTMLInputElement;
    const seekValue = input.valueAsNumber;
    setcurrVideoTime(seekValue);
    VIDEO_REF.current.currentTime = seekValue;
    // setisPlaying(true);
  };

  useEffect(() => {
    if (!VIDEO_PLAYER_REF.current?.paused) {
      intervalRef.current = +setInterval(() => {
        setcurrVideoTime(VIDEO_PLAYER_REF.current.currentTime);
      }, 1000);
    }
    if (VIDEO_PLAYER_REF.current?.paused) {
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (VIDEO_PLAYER_REF.current?.ended) {
      clearInterval(intervalRef.current);
    }
  }, [VIDEO_PLAYER_REF.current?.ended]);

  console.count("render seek");

  return (
    <div className="flex items-center justify-center gap-3 px-4 h-1/5 w-full bg-indigo-900">
      <small>
        {isNaN(+VIDEO_PLAYER_REF.current?.duration)
          ? "00:00"
          : (+VIDEO_PLAYER_REF.current?.duration / 60).toFixed(2)}
      </small>
      <input
        className="accent-indigo-200 w-full h-[50%] appearance-none bg-indigo-400"
        type="range"
        name="video-seek"
        id="video-time"
        step={0.000001}
        min={0}
        max={+VIDEO_PLAYER_REF.current?.duration || 1}
        value={currVideoTime}
        onChange={(ev: React.ChangeEvent) =>
          updateCurrVideoTime(VIDEO_PLAYER_REF, ev)
        }
      />
      <small>{(+currVideoTime / 60).toFixed(2) || "00:00"}</small>
    </div>
  );
};

export default Seekbar;
