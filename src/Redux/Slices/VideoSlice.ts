import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
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
  isLastElement: false,
  isFirstElement: false,
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
      const targetID = action.payload?.video?.id;
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
    FORWARD_MEDIA: (state) => {
      // get index of current video
      const currIndex = state.videosList?.findIndex(
        (vid) => vid.id === state.currentVideo?.id
      ) as number | -1;
      const lastElement = state.videosList?.length! - 1;
      let nextElement = currIndex;

      if (currIndex !== lastElement) {
        nextElement++;
        state.currentVideo = state.videosList?.[nextElement];
        const id = state.videosList?.[nextElement].id;
        const newVideosList = state.videosList?.map((vid) =>
          vid.id === id ? { ...vid, isPlay: true } : { ...vid, isPlay: false }
        );
        state.videosList = newVideosList;
      }
      if (nextElement >= lastElement) {
        state.isLastElement = true;
      } else {
        state.isFirstElement = false;
      }
      state.playing = true;
    },
    BACKWORd_MEDIA: (state) => {
      // get index of current video
      const currIndex = state.videosList?.findIndex(
        (vid) => vid.id === state.currentVideo?.id
      ) as number | -1;
      const firstElement = 0;
      let precedesElement = currIndex;
      if (currIndex !== firstElement) {
        precedesElement--;
        state.currentVideo = state.videosList?.[precedesElement];
        const id = state.videosList?.[precedesElement].id;
        const newVideosLIst = state.videosList?.map((vid) =>
          vid.id === id ? { ...vid, isPlay: true } : { ...vid, isPlay: false }
        );
        state.videosList = newVideosLIst;
      }
      if (precedesElement <= 0) {
        state.isFirstElement = true;
      } else {
        state.isLastElement = false;
      }
      state.playing = true;
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
  FORWARD_MEDIA,
  BACKWORd_MEDIA,
} = VideoSlice.actions;
