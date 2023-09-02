import React from "react";
import Accounts from "./Accounts";
import Dashboard from "./Dashboard";
import LinkAnalyticsIndex from "./LinkAnalytics/LinkAnalytics.Index";
import { Props } from "../Manager.Index";

const DetailsviewIndex = ({ Active, setActive }: Props) => {
  return (
    <div className="detailsview w-full h-auto p-5">
      {Active == "Dashboard" ? <Dashboard /> : ""}
      {Active == "LinkAnalyticsIndex" ? <LinkAnalyticsIndex /> : ""}
      {Active == "Accounts" ? <Accounts /> : ""}
    </div>
  );
};

export default DetailsviewIndex;
