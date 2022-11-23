import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../Redux/ReduxHooks";
import VideoFile from "./VideoFile";

type VideossListProps = {
  children: React.ReactNode | React.ReactNode[];
};
function VideossList({ children }: VideossListProps) {
  const { videosList } = useAppSelector((state) => state["video-player"]);
  return (
    <>
      <ul className="flex items-start justify-start flex-col flex-wrap max-h-[90vh] overflow-y-auto px-2 py-3 divide-y divide-slate-600">
        {Array.isArray(videosList) &&
          videosList &&
          videosList.map((file) => {
            return <VideoFile key={nanoid(7)} videoData={file} />;
          })}
        {children}
      </ul>
    </>
  );
}

export default VideossList;
