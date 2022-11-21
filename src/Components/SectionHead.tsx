import React from "react";
type sectionHeadProps = {
  name: string;
  filesCount: number;
};
const SectionHead = ({ filesCount, name }: sectionHeadProps) => {
  return (
    <div className="flex items-center justify-start my-3 w-full h-9">
      <h4 className="text-2xl capitalize">{name}</h4>
      <small className="px-4">{filesCount + " " + "files"}</small>
    </div>
  );
};

export default SectionHead;
