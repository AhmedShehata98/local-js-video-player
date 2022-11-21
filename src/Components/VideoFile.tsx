import { nanoid } from "nanoid";
import React, { useLayoutEffect, useRef, useState } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { IVideosFileList } from "../Types/AppTypes";
import { useAppDispatch } from "../Redux/ReduxHooks";
import {
  ADD_VIDEO_DATA,
  ADD_VIDEO,
  setVideo,
} from "../Redux/Slices/VideoSlice";

type VideoFileProps = {
  videoData: IVideosFileList;
};
const VideoFile = ({ videoData }: VideoFileProps) => {
  const dispatch = useAppDispatch();
  const PlayBtnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const VideoDurationRef = useRef({
    duration: "",
  });
  const [videoDuration, setvideoDuration] = useState({
    duration: "",
  });
  let paused: boolean = false;

  const handleMedtadata = (
    ev: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const videoMetadata = ev.target as HTMLVideoElement;
    const duration = (+videoMetadata.duration / 60).toFixed(2);
    VideoDurationRef.current = {
      duration: `${duration.split(".").join(":")}`,
    };
  };

  const handleToPlayVideo = (file: IVideosFileList, ev: React.MouseEvent) => {
    const button = ev.target as HTMLElement;
    const childrensArr = button.children as HTMLCollection;

    if (videoData.isPlay) {
      dispatch(ADD_VIDEO({ video: file, playState: false }));
    } else {
      dispatch(ADD_VIDEO({ video: file, playState: true }));
    }
  };

  useLayoutEffect(() => {
    if (VideoDurationRef.current?.duration !== "") {
      setvideoDuration({
        duration: VideoDurationRef.current.duration,
      });
    }
  }, [VideoDurationRef.current?.duration]);
  return (
    <li
      key={nanoid(6)}
      className={`${
        videoData.isPlay
          ? "flex justify-start h-14 w-full px-3 hover:bg-slate-800 bg-slate-800"
          : "flex justify-start h-14 w-full px-3 hover:bg-slate-800"
      }`}
    >
      <div className="flex items-center gap-3 max-w-max">
        <figure className="relative border-b w-14">
          <video
            ref={videoRef}
            className="max-w-full object-cover aspect-video"
            src={videoData?.video}
            typeof={videoData?.type}
            preload="metadata"
            onDurationChange={(
              ev: React.SyntheticEvent<HTMLVideoElement, Event>
            ) => handleMedtadata(ev)}
          />
        </figure>
        <figcaption className="flex flex-col px-3 w-48">
          <b className="truncate">{videoData?.name}</b>
        </figcaption>
      </div>
      <div className="flex items-center justify-start w-1/2">
        <small className="w-1/4">{videoData?.lastModifiedDate}</small>
        <small>{videoData.size}</small>
      </div>
      <div className="flex items-center gap-10 ml-auto">
        <b className="px-2 w-1/4 inline-block">{videoDuration.duration}</b>
        <button
          ref={PlayBtnRef}
          type="button"
          className="flex items-center justify-center h-8 w-10 rounded text-emerald-500 hover:text-emerald-300"
          onClick={(ev: React.MouseEvent) => handleToPlayVideo(videoData, ev)}
        >
          {videoData.isPlay ? (
            <span className=" pointer-events-none">
              <AiFillPauseCircle className="text-4xl" />
            </span>
          ) : (
            <span className="pointer-events-none">
              <AiFillPlayCircle className="text-4xl" />
            </span>
          )}
        </button>
      </div>
    </li>
  );
};

export default VideoFile;
