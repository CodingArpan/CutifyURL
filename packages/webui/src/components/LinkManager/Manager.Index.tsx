import React, { useState } from "react";
import DetailsviewIndex from "./Detailsview/Detailsview.Index";
import Optionsbar from "./Optionsbar";

export interface Props {
  Active: string;
  setActive: React.Dispatch<React.SetStateAction<String>>;
}

const ManagerIndex = () => {
  const [Active, setActive] = useState<String>("Dashboard");
  return (
    <div className="w-full">
      <div className="w-full m-auto max-w-7xl flex flex-col justify-between items-start p-10 space-x-5">
        <Optionsbar Active={Active} setActive={setActive} />
        <DetailsviewIndex Active={Active} setActive={setActive} />
      </div>
    </div>
  );
};

export default ManagerIndex;
