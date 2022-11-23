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
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Seekbar from "./Seekbar";
import { IVideosFileList } from "../Types/AppTypes";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import {
  FULLSCREEN_MODE,
  PLAY_VIDEO,
  RANDOM_MODE,
  REPEAT_MODE,
} from "../Redux/Slices/VideoSlice";

type PlayerBarProps = {
  CURRENT_VIDEO: IVideosFileList;
  SHOW: boolean;
  VIDEO_PLAYER_REF: React.MutableRefObject<HTMLVideoElement>;
};
const PlayerBar = ({
  SHOW,
  CURRENT_VIDEO,
  VIDEO_PLAYER_REF,
}: PlayerBarProps) => {
  const dispatch = useAppDispatch();
  const { isFullScreen, isRandom, isRepeating, playing } = useAppSelector(
    (state) => state["video-player"]
  );
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
  VIDEO_PLAYER_REF.current?.addEventListener("play", () => {
    setisPlaying(true);
    dispatch(PLAY_VIDEO({ playState: true }));
  });

  VIDEO_PLAYER_REF.current?.addEventListener("pause", () => {
    setisPlaying(false);
    dispatch(PLAY_VIDEO({ playState: false }));
  });
  const handleShowVolume = (ev: React.MouseEvent, action: "show" | "hide") => {
    const button = ev.target as HTMLButtonElement;
    const volumeRange = button?.closest(".volume-range");

    if (volumeRange !== null && action === "show") {
      volumeRange.classList.remove("hide-volume");
    }
    if (volumeRange !== null && action === "hide") {
      volumeRange.classList.add("hide-volume");
    }
  };
  const handleMuteVolume = (
    ev: React.MouseEvent,
    VIDEO_REF: MutableRefObject<HTMLVideoElement>
  ) => {
    const button = ev.target as HTMLButtonElement;
    const btnChildren = Array.from(button.children);
    const isMutedVol: boolean = btnChildren[0].classList.contains("hidden")
      ? true
      : false;
    VIDEO_REF.current.muted = isMutedVol;
    if (isMutedVol) {
      button.classList.add("btn-active");
    } else {
      button.classList.remove("btn-active");
    }
    //
    btnChildren.forEach((btn) => btn.classList.toggle("hidden"));
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
    const btn = ev.target as HTMLButtonElement;
    const icons = btn.children as HTMLCollection;
    Array.from(icons).forEach((ico) => ico.classList.toggle("hidden"));
    const isFullScreen = icons[0].classList.contains("hidden") ? false : true;
    if (isFullScreen) {
      btn.classList.add("btn-active");
    } else {
      btn.classList.remove("btn-active");
    }
    dispatch(FULLSCREEN_MODE());
  };
  const handleRepeatMode = (
    ev: React.MouseEvent,
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ) => {
    const btn = ev.target as HTMLButtonElement;
    const icons = btn.children as HTMLCollection;
    Array.from(icons).forEach((ico) => ico.classList.toggle("hidden"));
    const isRepeatMode = icons[0].classList.contains("hidden") ? false : true;
    if (isRepeatMode) {
      btn.classList.add("btn-active");
    } else {
      btn.classList.remove("btn-active");
    }
    dispatch(REPEAT_MODE());
  };
  const handleRandom = (
    ev: React.MouseEvent,
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ) => {
    dispatch(RANDOM_MODE());
  };
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
      dispatch(PLAY_VIDEO({ playState: true }));
    } else {
      VIDEO_REF.current?.pause();
      setisPlaying(false);
      dispatch(PLAY_VIDEO({ playState: false }));
    }
  };

  useEffect(() => {
    if (Boolean(CURRENT_VIDEO?.video)) {
      disbledBtnStyle(PLAY_BTN_REF, true);
    } else {
      disbledBtnStyle(PLAY_BTN_REF, false);
    }
  }, [CURRENT_VIDEO?.video]);

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

  useLayoutEffect(() => {
    if (isFullScreen) {
      VIDEO_PLAYER_REF.current?.parentElement?.classList.add("full-screen");
    } else {
      VIDEO_PLAYER_REF.current?.parentElement?.classList.remove("full-screen");
    }
  }, [isFullScreen]);

  useLayoutEffect(() => {
    if (isRepeating) {
      VIDEO_PLAYER_REF.current.loop = true;
    } else {
      VIDEO_PLAYER_REF.current.loop = false;
    }
  }, [isRepeating]);
  console.count("render bar");

  return (
    <div className="absolute bottom-0 left-0 flex flex-col items-center justify-between shadow-md w-full h-20 text-white">
      <Seekbar
        VIDEO_PLAYER_REF={VIDEO_PLAYER_REF}
        isPlaying={playing as boolean}
      />
      <div className="flex items-center justify-between w-full h-4/5 bg-indigo-900 px-2">
        <span className="controls-box">
          <button
            title="backword"
            type="button"
            className="flex justify-center items-center cursor-pointer bg-opacity-30 border transition-colors border-slate-600 hover:bg-zinc-600 rounded-full w-10 h-10"
            onClick={(ev: React.MouseEvent) =>
              handleBackward(ev, VIDEO_PLAYER_REF)
            }
          >
            <RiSkipBackMiniFill />
          </button>
          <button
            title="play / pause"
            ref={PLAY_BTN_REF}
            type="button"
            className="flex justify-center items-center cursor-pointer bg-opacity-30 border transition-colors border-slate-600 hover:bg-zinc-600 rounded-full w-10 h-10"
            onClick={(ev: React.MouseEvent) => handlePlay(ev, VIDEO_PLAYER_REF)}
          >
            {!VIDEO_PLAYER_REF.current?.paused && (
              <span className="pointer-events-none select-none">
                <IoPause />
              </span>
            )}
            {VIDEO_PLAYER_REF.current?.paused && (
              <span className="pointer-events-none select-none">
                <IoPlay />
              </span>
            )}
          </button>
          <button
            title="forward"
            type="button"
            className="flex justify-center items-center cursor-pointer bg-opacity-30 border transition-colors border-slate-600 hover:bg-zinc-600 rounded-full w-10 h-10"
            onClick={(ev: React.MouseEvent) =>
              handleForward(ev, VIDEO_PLAYER_REF)
            }
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

            <p>
              {!isNaN(VIDEO_PLAYER_REF.current?.duration) &&
                VIDEO_PLAYER_REF.current?.src?.length >= 1 &&
                (+VIDEO_PLAYER_REF.current?.duration / 60).toFixed(2)}
            </p>
          </span>
        </span>
        <div className="flex items-center justify-end gap-2 w-1/4 ">
          <span
            className="flex items-center justify-center gap-2 "
            onMouseOver={(ev: React.MouseEvent) => handleShowVolume(ev, "show")}
            onMouseOut={(ev: React.MouseEvent) => handleShowVolume(ev, "hide")}
          >
            <span className="volume-range pointer-events-none select-none hide-volume">
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
            <button
              type="button"
              className="volume-btn"
              onClick={(ev: React.MouseEvent) =>
                handleMuteVolume(ev, VIDEO_PLAYER_REF)
              }
            >
              <span
                className="pointer-events-none select-none hidden"
                title="mute"
              >
                <IoVolumeMute className="text-xl" />
              </span>
              <span className="pointer-events-none select-none">
                <IoVolumeHigh className="text-xl" title="volume high" />
              </span>
            </button>
          </span>
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer h-9 w-9 bg-opacity-80 rounded-full hover:brightness-75 hover:bg-gray-600 hover:border border-slate-500"
            onClick={(ev: React.MouseEvent) =>
              handleRandom(ev, VIDEO_PLAYER_REF)
            }
          >
            <span>
              <FaRandom className="text-xl" title="random" />
            </span>
          </button>
          <button
            title="repeat on / off"
            type="button"
            className="flex justify-center items-center cursor-pointer h-9 w-9 bg-opacity-80 rounded-full hover:brightness-75 hover:bg-gray-600 hover:border border-slate-500"
            onClick={(ev: React.MouseEvent) =>
              handleRepeatMode(ev, VIDEO_PLAYER_REF)
            }
          >
            <span className="pointer-events-none select-none hidden">
              <IoRepeatSharp className="text-xl" title="repeat on" />
            </span>
            <span className="pointer-events-none select-none">
              <TbRepeatOff className="text-xl" title="repeat off" />
            </span>
          </button>
          <button
            title="fullscreen on / off"
            type="button"
            className="flex justify-center items-center cursor-pointer h-9 w-9 bg-opacity-80 rounded-full hover:brightness-75 hover:bg-gray-600 hover:border border-slate-500"
            onClick={(ev) => handlesFullscreen(ev, VIDEO_PLAYER_REF)}
          >
            <span
              className="hidden pointer-events-none select-none"
              title="fullscreen off"
            >
              <MdPictureInPictureAlt className="text-xl" />
            </span>
            <span className="pointer-events-none select-none">
              <SlScreenDesktop className="text-xl" title="fullscreen on" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
