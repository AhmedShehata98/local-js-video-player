import {
  IoPlay,
  IoPause,
  IoRepeatSharp,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
import { MdPictureInPictureAlt } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { FaRandom } from "react-icons/fa";
import { TbRepeatOff } from "react-icons/tb";
import { RiSkipBackMiniFill, RiSkipForwardMiniFill } from "react-icons/ri";
import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Seekbar from "./Seekbar";
import { IVideosFileList } from "../Types/AppTypes";
import { useAppDispatch } from "../Redux/ReduxHooks";
import { PLAY_VIDEO } from "../Redux/Slices/VideoSlice";

type PlayerBarProps = {
  CURRENT_VIDEO: IVideosFileList;
  SHOW: boolean;
  VIDEO_PLAYER_REF: React.MutableRefObject<HTMLVideoElement>;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};
const PlayerBar = ({
  SHOW,
  CURRENT_VIDEO,
  VIDEO_PLAYER_REF,
  setFullscreen,
}: PlayerBarProps) => {
  const dispatch = useAppDispatch();
  const [isPlaying, setisPlaying] = useState<boolean>(false);
  const [isVideoEnded, setisVideoEnded] = useState<boolean>(false);

  const PLAY_BTN_REF = useRef<HTMLButtonElement>(null);
  const toggleIcons = (ev: React.MouseEvent) => {
    const btn = ev.target as HTMLButtonElement;
    const childsIcons = Array.from(btn.children);
    childsIcons.forEach((icon) => {
      if (icon?.classList?.contains("hidden")) {
        icon?.classList.remove("hidden");
      } else {
        icon?.classList.add("hidden");
      }
    });
  };

  VIDEO_PLAYER_REF.current?.addEventListener("ended", (ev) => {
    const vid = ev.target as HTMLVideoElement;
    if (vid.ended) {
      setisVideoEnded(true);
    } else {
      setisVideoEnded(false);
    }
  });
  VIDEO_PLAYER_REF.current?.addEventListener("playing", (ev) => {
    const vid = ev.target as HTMLVideoElement;
    if (vid?.paused) {
      setisPlaying(false);
      dispatch(PLAY_VIDEO({ playState: false }));
    } else {
      setisPlaying(true);
      dispatch(PLAY_VIDEO({ playState: true }));
    }
  });
  const addBtnActiveStyls = (ev: React.MouseEvent, state: boolean) => {
    const btn = ev.target as HTMLButtonElement;
    const childsIcons = Array.from(btn.children);

    childsIcons.forEach((ico) =>
      ico.classList.contains("hidden")
        ? ico.classList.remove("hidden")
        : ico.classList.add("hidden")
    );

    if (state) {
      btn.classList.add("btn-active");
    } else {
      btn.classList.remove("btn-active");
    }
  };

  const handleSHOWVolume = (ev: React.MouseEvent) => {
    const button = ev.target as HTMLButtonElement;
    const volumeRange = button.lastElementChild;
    if (volumeRange?.classList.contains("hide-volume")) {
      volumeRange.classList.remove("hide-volume");
    } else {
      volumeRange?.classList.add("hide-volume");
    }
  };
  const handleVolumeChange = (
    ev: React.ChangeEvent,
    VIDEO_REF: React.MutableRefObject<HTMLVideoElement>
  ) => {
    const volumeRange = ev.target as HTMLInputElement;
    const btn = volumeRange.closest(".volume-btn");
    const currVolume = volumeRange.valueAsNumber;
    if (currVolume <= 0) {
      btn?.firstElementChild?.classList.replace("hidden", "inline-block");
      btn?.children[1].classList.add("hidden");
    } else {
      btn?.firstElementChild?.classList.replace("inline-block", "hidden");
      btn?.children[1].classList.remove("hidden");
    }
    VIDEO_REF.current.volume = currVolume;
  };

  const disbledBtnStyle = (
    ElEM: React.RefObject<HTMLButtonElement>,
    state: boolean
  ) => {
    const btn = ElEM.current as HTMLButtonElement;
    if (state) {
      btn.classList.remove("disabled-player-btn");
    } else {
      btn.classList.add("disabled-player-btn");
    }
  };
  const handlesFullscreen = (
    ev: React.MouseEvent,
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ) => {
    setFullscreen((prev) => {
      addBtnActiveStyls(ev, prev);
      return !prev;
    });
  };
  const handleRepeatMode = (
    ev: React.MouseEvent,
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ) => {};
  const handleRandom = (
    ev: React.MouseEvent,
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ) => {};
  const handleForward = (
    ev: React.MouseEvent,
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ) => {};
  const handleBackward = (
    ev: React.MouseEvent,
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ) => {};
  const handlePlay = (
    ev: React.MouseEvent,
    VIDEO_REF: React.MutableRefObject<HTMLVideoElement | null>
  ) => {
    toggleIcons(ev);

    if (VIDEO_REF.current?.paused) {
      VIDEO_REF.current?.play();
      setisPlaying(true);
    } else {
      VIDEO_REF.current?.pause();
      setisPlaying(false);
    }
  };
  const handleDuration = (
    VIDEO_REF: MutableRefObject<HTMLVideoElement>
  ): string => {
    const duration = (+VIDEO_REF.current?.duration / 60).toFixed(2);
    return `${duration.split(".").join(":")}`;
  };

  const handkeCurrentTime = (VIDEO_REF: MutableRefObject<HTMLVideoElement>) => {
    const currentTime = (+VIDEO_REF.current?.currentTime / 60).toFixed(2);
    return `${currentTime.split(".").join(":")}`;
  };

  useEffect(() => {
    if (Boolean(CURRENT_VIDEO?.video)) {
      disbledBtnStyle(PLAY_BTN_REF, true);
    } else {
      disbledBtnStyle(PLAY_BTN_REF, false);
    }
  }, [CURRENT_VIDEO?.video]);

  useLayoutEffect(() => {
    if (VIDEO_PLAYER_REF.current?.ended) {
      setisVideoEnded(true);
    } else {
      setisVideoEnded(false);
    }
  }, [VIDEO_PLAYER_REF.current?.ended]);
  useLayoutEffect(() => {
    if (isVideoEnded) {
      let btn = PLAY_BTN_REF.current as HTMLButtonElement;
      const childsIcons = Array.from(btn.children);
      childsIcons.forEach((icon) => {
        if (icon?.classList?.contains("hidden")) {
          icon?.classList.remove("hidden");
        } else {
          icon?.classList.add("hidden");
        }
      });
    }
  }, [isVideoEnded]);

  console.count("render bar");

  return (
    <div className="absolute bottom-0 left-0 flex flex-col items-center justify-between shadow-md w-full h-20 text-white">
      <Seekbar
        VIDEO_PLAYER_REF={VIDEO_PLAYER_REF}
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
      />
      <div className="flex items-center justify-between w-full h-4/5 bg-indigo-900 px-2">
        <span className="controls-box">
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer bg-opacity-30 border transition-colors border-slate-600 hover:bg-zinc-600 rounded-full w-10 h-10"
          >
            <RiSkipBackMiniFill />
          </button>
          <button
            ref={PLAY_BTN_REF}
            type="button"
            className="flex justify-center items-center cursor-pointer bg-opacity-30 border transition-colors border-slate-600 hover:bg-zinc-600 rounded-full w-10 h-10"
            onClick={(ev: React.MouseEvent) => handlePlay(ev, VIDEO_PLAYER_REF)}
          >
            {CURRENT_VIDEO?.isPlay && (
              <span className="pointer-events-none select-none">
                <IoPause />
              </span>
            )}
            {!CURRENT_VIDEO?.isPlay && (
              <span className="pointer-events-none select-none">
                <IoPlay />
              </span>
            )}
          </button>
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer bg-opacity-30 border transition-colors border-slate-600 hover:bg-zinc-600 rounded-full w-10 h-10"
          >
            <RiSkipForwardMiniFill />
          </button>
        </span>
        <span className="flex items-center justify-center gap-3 w-1/2">
          <figure className="w-20 flex gap-4">
            <video
              className="max-w-full object-cover aspect-video"
              src={CURRENT_VIDEO?.video}
              typeof={CURRENT_VIDEO?.type}
            ></video>
          </figure>
          <span className="flex flex-col">
            <figcaption className="capitalize font-semibold">
              {CURRENT_VIDEO?.name}
            </figcaption>

            {/* <p>{VIDEO_DETAILS?.duration}</p> */}
          </span>
        </span>
        <span className="flex items-center justify-end gap-2 w-1/4">
          <button
            type="button"
            className="volume-btn"
            onClick={(ev: React.MouseEvent) => handleSHOWVolume(ev)}
          >
            <span className="pointer-events-none select-none hidden">
              <IoVolumeMute className="text-xl" />
            </span>
            <span className="pointer-events-none select-none">
              <IoVolumeHigh className="text-xl" />
            </span>
            <span className="volume-range hide-volume pointer-events-none select-none">
              <input
                className="accent-yellow-400 pointer-events-auto"
                type="range"
                name="volume-range"
                id="volume"
                step={0.00001}
                min={0}
                max={1}
                onChange={(ev: React.ChangeEvent) =>
                  handleVolumeChange(ev, VIDEO_PLAYER_REF)
                }
              />
            </span>
          </button>
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer h-9 w-9 bg-opacity-80 rounded-full hover:brightness-75 hover:bg-gray-600 hover:border border-slate-500"
          >
            <span>
              <FaRandom className="text-xl" />
            </span>
          </button>
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer h-9 w-9 bg-opacity-80 rounded-full hover:brightness-75 hover:bg-gray-600 hover:border border-slate-500"
          >
            <span className="hidden">
              <IoRepeatSharp className="text-xl" />
            </span>
            <span>
              <TbRepeatOff className="text-xl" />
            </span>
          </button>
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer h-9 w-9 bg-opacity-80 rounded-full hover:brightness-75 hover:bg-gray-600 hover:border border-slate-500"
            onClick={(ev) => handlesFullscreen(ev, VIDEO_PLAYER_REF)}
          >
            <span className="hidden pointer-events-none select-none">
              <MdPictureInPictureAlt className="text-xl" />
            </span>
            <span className="pointer-events-none select-none">
              <SlScreenDesktop className="text-xl" />
            </span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default PlayerBar;
