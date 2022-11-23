import { BsPlusLg } from "react-icons/bs";
import VideossList from "../../Components/VideosList";
import { useLayoutEffect, useRef, useState } from "react";
import SectionHead from "../../Components/SectionHead";
import { useAppDispatch, useAppSelector } from "../../Redux/ReduxHooks";
import { IVideosFileList } from "../../Types/AppTypes";
import { ADD_VIDEO_DATA } from "../../Redux/Slices/VideoSlice";
import { nanoid } from "nanoid";
const Home = () => {
  const { folderName, itemsLength } = useAppSelector(
    (state) => state["video-player"]
  );
  const dispatch = useAppDispatch();
  const chooseFolderRef = useRef<HTMLInputElement>(null);
  //
  const dataSizeFormatter = (
    data: number,
    unit: "KB" | "MB" | "GB" | "auto" = "auto"
  ) => {
    let byte = 1024;
    let kilobytes = 0,
      megabyte = 0,
      gigabyte = 0;

    kilobytes = +(data / Math.pow(byte, 1)).toFixed(2);
    megabyte = +(data / Math.pow(byte, 2)).toFixed(2);
    gigabyte = +(data / Math.pow(byte, 3)).toFixed(2);

    if (unit === "auto") {
      if (+data >= 1000) {
        return `${kilobytes} KB`;
      } else if (data >= 1000_000) {
        return `${megabyte} MB`;
      } else {
        return `${gigabyte} GB`;
      }
    } else {
      if (unit === "KB") return `${kilobytes} KB`;
      if (unit === "MB") return `${megabyte} MB`;
      if (unit === "GB") return `${gigabyte} GB`;
    }
  };
  const handleGetFolder = (ev: React.ChangeEvent) => {
    const inputElement = ev.target as HTMLInputElement;
    const files = Array.from(inputElement.files || []);
    let newFilesList: IVideosFileList[] = [];

    if (files) {
      const filterVideos = files.filter(
        (file) => file.type.split("/")[0] === "video"
      );
      filterVideos.forEach((file) => {
        newFilesList.push({
          id: nanoid(3) as string,
          video: URL.createObjectURL(file),
          isPlay: false,
          name: file.name.split(".")[0],
          type: file.type,
          size: dataSizeFormatter(file.size, "MB") as string,
          lastModifiedDate: Intl.DateTimeFormat("en-EG").format(
            file.lastModified
          ),
          folderName: file.webkitRelativePath.split("/")[0],
        });
      });

      dispatch(
        ADD_VIDEO_DATA({
          videosList: newFilesList,
          folderName: newFilesList[0]?.folderName,
          itemsLength: newFilesList.length,
        })
      );
    }
  };

  useLayoutEffect(() => {
    chooseFolderRef.current?.setAttribute("webkitdirectory", "true");
    chooseFolderRef.current?.setAttribute("directory", "true");
  }, []);
  return (
    <section className="container mx-auto min-h-screen flex flex-col justify-start items-start pt-12">
      <article className="w-full mb-3 my-2">
        <SectionHead
          filesCount={itemsLength || 0}
          name={folderName || "all folders"}
        />
        <VideossList>
          {itemsLength === 0 && (
            <label className="flex items-center justify-evenly flex-col h-44 w-36 border bg-zinc-800 capitalize">
              <BsPlusLg className="text-2xl text-indigo-400" />
              <p>add folder</p>
              <input
                className="hidden"
                ref={chooseFolderRef}
                id="choose-folder"
                type="file"
                accept="video/*"
                onChange={(ev: React.ChangeEvent) => handleGetFolder(ev)}
              />
            </label>
          )}
        </VideossList>
      </article>
    </section>
  );
};

export default Home;
