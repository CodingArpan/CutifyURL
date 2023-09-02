import React, { useState } from "react";
import Filters from "./Filters";
import LinkLists from "./LinkLists";

export interface REQFiltersTypes {
  fromDate: string;
  toDate: string;
  durationType: string;
  tags: string[];
}

const LinkAnalyticsIndex = () => {
  const [ReqFilters, setReqFilters] = useState<REQFiltersTypes>({
    fromDate: "",
    toDate: "",
    durationType: "",
    tags: [],
  });

  return (
    <div className="flex flex-col space-y-5">
      <Filters setReqFilters={setReqFilters} ReqFilters={ReqFilters} />
      <LinkLists ReqFilters={ReqFilters} />
    </div>
  );
};

export default LinkAnalyticsIndex;
