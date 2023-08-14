import React from "react";
import Accounts from "./Accounts";
import Dashboard from "./Dashboard";
import LinkAnalyticsIndex from "./LinkAnalytics/LinkAnalytics.Index";

const DetailsviewIndex = () => {
  return (
    <div className="detailsview w-full h-auto p-5">
      <Dashboard />
      <LinkAnalyticsIndex />
      <Accounts />
    </div>
  );
};

export default DetailsviewIndex;
