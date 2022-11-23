import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVideosFileList } from "../../Types/AppTypes";
import {
  IAddVideoDataPayload,
  IinitialState,
  setVideoType,
} from "./IVideoSlice";

const initialState: Partial<IinitialState> = {
  playing: false,
  itemsLength: 0,
  isRandom: false,
  isRepeating: false,
  isFullScreen: false,
  videosList: [],

  isError: {
    state: false,
    message: "",
  },
};
export const VideoSlice = createSlice({
  name: "video-player",
  initialState,
  reducers: {
    ADD_VIDEO_DATA: (state, action: PayloadAction<IAddVideoDataPayload>) => {
      state.videosList = action.payload.videosList;
      state.folderName = action.payload.folderName;
      state.itemsLength = action.payload.itemsLength;
    },
    ADD_VIDEO: (
      state,
      action: PayloadAction<{
        video: IVideosFileList;
        playState: boolean;
      }>
    ) => {
      let targetID = action.payload?.video?.id;
      // // change isPlay property in video object
      // const newVideo: IVideosFileList = {
      //   ...action.payload?.video,
      //   isPlay: action.payload.playState,
      // };
      // // delete old video object from VideosList
      // const withoutTarget: Partial<IVideosFileList>[] = state.videosList
      //   ?.filter((vid) => vid.id !== targetID)
      //   .map((vid) => ({ ...vid, isPlay: false }))!;
      // // marge {newVideo object} with [ withoutTarget] ..
      // const newVideosList = [
      //   newVideo,
      //   ...withoutTarget,
      // ] as typeof state.videosList;
      const newVideo = { ...action.payload?.video, isPlay: true };
      const newVideosList = state.videosList?.map((vid) =>
        vid.id === targetID
          ? { ...vid, isPlay: action.payload?.playState }
          : { ...vid, isPlay: false }
      );
      // assign newVideosList to state
      state.videosList = newVideosList;

      //set current video data
      state.currentVideo = newVideo;
    },
    PLAY_VIDEO: (state, action: PayloadAction<{ playState: boolean }>) => {
      //set video to play / pause
      state.playing = action.payload.playState;
    },
    REPEAT_MODE: (state) => {
      state.isRepeating = !state.isRepeating;
    },
    RANDOM_MODE: (state) => {
      state.isRandom = !state.isRandom;
    },
    FULLSCREEN_MODE: (state) => {
      state.isFullScreen = !state.isFullScreen;
    },
  },
});
export const {
  ADD_VIDEO_DATA,
  ADD_VIDEO,
  PLAY_VIDEO,
  REPEAT_MODE,
  FULLSCREEN_MODE,
  RANDOM_MODE,
} = VideoSlice.actions;
