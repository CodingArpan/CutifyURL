import React from "react";
import DetailsviewIndex from "./Detailsview/Detailsview.Index";
import Optionsbar from "./Optionsbar";

const ManagerIndex = () => {
  return (
    <div className="w-full">
      <div className="w-full m-auto max-w-7xl flex flex-col justify-between items-start p-10 space-x-5">
        <Optionsbar />
        <DetailsviewIndex />
      </div>
    </div>
  );
};

export default ManagerIndex;
