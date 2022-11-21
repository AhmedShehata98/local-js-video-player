import { IVideosFileList } from "../../Types/AppTypes";
export interface IinitialState {
  videoDetails: {
    name: string;
    modifiedDate?: number;
    duration?: string;
    isPlaying?: TimeRanges;
    isPaused?: boolean | undefined;
  };
  videosList: IVideosFileList[];
  currentVideo: IVideosFileList;
  folderName: string;
  itemsLength: number;
  videoPath: string;
  videoType: string;
  playing: boolean;

  isError: {
    state: false;
    message: string;
  };
}
// export type VideoInfo = {
//   duration: number;
//   currTime: number;
//   isPaused: boolean;
// };

export type setVideoType = {
  videoDetails: {
    name: string;
    modifiedDate?: number;
    duration?: string;
    isPlaying?: TimeRanges;
    isPaused?: boolean | undefined;
  };
  videoPath: string;
  videoType: string;
  playing: boolean;
};

export interface IAddVideoDataPayload {
  videosList: IVideosFileList[];
  folderName?: string;
  itemsLength: number;
}
