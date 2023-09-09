import React, { useState } from "react";
import DetailsviewIndex from "./Detailsview/Detailsview.Index";
import Optionsbar from "./Optionsbar";

export interface Props {
  Active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const ManagerIndex = () => {
  const [Active, setActive] = useState<string>("LinkAnalyticsIndex");
  return (
    <div className="w-full bg-white ">
      <div className="w-full bg-white m-auto max-w-7xl flex flex-col justify-between items-start p-10 space-x-5">
        <Optionsbar Active={Active} setActive={setActive} />
        <DetailsviewIndex Active={Active} setActive={setActive} />
      </div>
    </div>
  );
};

export default ManagerIndex;
