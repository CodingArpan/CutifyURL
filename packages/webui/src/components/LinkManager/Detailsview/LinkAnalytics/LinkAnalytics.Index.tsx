import React, { useState } from "react";
import Filters from "./Filters";
import LinkLists from "./LinkLists";

export interface REQFilters {
  fromDate: string;
  toDate: string;
}

const LinkAnalyticsIndex = () => {
  const [ReqFilters, setReqFilters] = useState<REQFilters>({
    fromDate: "",
    toDate: "",
  });

  return (
    <div className="flex flex-col space-y-5">
      <Filters setReqFilters={setReqFilters} ReqFilters={ReqFilters} />
      <LinkLists ReqFilters={ReqFilters} />
    </div>
  );
};

export default LinkAnalyticsIndex;
