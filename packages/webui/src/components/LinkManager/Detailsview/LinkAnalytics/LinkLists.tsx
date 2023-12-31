import React, { useEffect } from "react";
import ListComponent from "./ListComponent";
import { REQFiltersTypes } from "./LinkAnalytics.Index";

interface LinkListProps {
  ReqFilters: REQFiltersTypes;
}

const LinkLists = (props: LinkListProps) => {
  const { ReqFilters } = props;

  useEffect(() => {
    console.log('first')
  
  }, [ReqFilters]);

  return (
    <div className="">
      <p className="capitalize text-lg p-2 my-2">
        last 1 month history <span className="text-slate-400">(default)</span>
      </p>
      <div className="LinkLists bg-slate-100 h-max rounded-lg p-3 space-y-5 ">
        <ListComponent />
      </div>
    </div>
  );
};

export default LinkLists;
