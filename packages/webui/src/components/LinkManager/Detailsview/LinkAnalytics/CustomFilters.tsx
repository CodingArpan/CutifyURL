import React, { useState } from "react";
import AddFilterTags from "./AddFilterTags";
import { REQFilters } from "./LinkAnalytics.Index";

interface CustomFilterProps {
  ShowFilter: boolean;
  setDupReqFilters: React.Dispatch<React.SetStateAction<REQFilters>>;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setCalldata: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomFilters = (props: CustomFilterProps): JSX.Element => {
  const {
    ShowFilter,
    setShowFilter,
    setDupReqFilters,
    setCalldata,
  }: CustomFilterProps = props;



  return (
    <div
      className={` w-full  bg-white shadow-lg rounded-xl space-y-3 origin-top ${
        // ShowFilter ? "scale-y-100" : "scale-y-0"
        ShowFilter ? "h-fit opacity-100 p-5" : "h-0 opacity-0 p-0"
      } duration-100`}
    >
      <div className="bytime capitalize">
        <p className="filtype w-full py-2 text-gray-400 font-medium border-b border-slate-200">
          duration
        </p>
        <div className="flex flex-row justify-start items-center flex-wrap py-2">
          <div className="btn flex space-x-2 cursor-pointer group">
            <input
              className="cursor-pointer hidden peer"
              type="radio"
              name="filteropt"
              id="lastdayopt"
            />
            <label
              className="cursor-pointer px-2 py-1 text-slate-600 group-hover:text-indigo-500  rounded-lg  border-4 border-double border-white/0 peer-checked:border-indigo-500/70 peer-checked:text-indigo-600  duration-100"
              htmlFor="lastdayopt"
            >
              last day
            </label>
          </div>
          <div className="btn flex space-x-2 cursor-pointer group">
            <input
              className="cursor-pointer hidden peer"
              type="radio"
              name="filteropt"
              id="lastweekopt"
            />
            <label
              className="cursor-pointer px-2 py-1 text-slate-600 group-hover:text-indigo-500  rounded-lg  border-4 border-double border-white/0 peer-checked:border-indigo-500/70 peer-checked:text-indigo-600  duration-100"
              htmlFor="lastweekopt"
            >
              last week
            </label>
          </div>
          <div className="btn flex space-x-2 cursor-pointer group">
            <input
              className="cursor-pointer hidden peer"
              type="radio"
              name="filteropt"
              id="lastmonthopt"
            />
            <label
              className="cursor-pointer px-2 py-1 text-slate-600 group-hover:text-indigo-500  rounded-lg  border-4 border-double border-white/0 peer-checked:border-indigo-500/70 peer-checked:text-indigo-600  duration-100"
              htmlFor="lastmonthopt"
            >
              last month
            </label>
          </div>
        </div>
      </div>

      <div className="bydate capitalize py-2 space-x-2">
        <input
          className="cursor-pointer  hidden peer"
          type="radio"
          name="filteropt"
          id="bydaTE"
        />
        <label
          className="cursor-pointer px-2 py-1 text-slate-600 group-hover:text-indigo-500  rounded-lg  border-4 border-double border-white/0 peer-checked:border-indigo-500/70 peer-checked:text-indigo-600  duration-100"
          htmlFor="bydaTE"
        >
          Search by date
        </label>
        <div className="hidden peer-checked:flex flex-wrap px-2 space-x-5 mt-5">
          <div className="space-x-2">
            <label htmlFor="fromdate">from date</label>
            <input
              className="outline outline-1"
              type="date"
              name="fromdate"
              id="fromdate"
            />
          </div>
          <div className="space-x-2">
            <label htmlFor="todate">to date</label>
            <input
              className="outline outline-1"
              type="date"
              name="todate"
              id="todate"
            />
          </div>
        </div>
      </div>

      <div className="bytime capitalize flex justify-start items-start space-x-5">
        <p className="filtype w-max py-2 text-gray-400 font-medium">Tags</p>

        <div className="w-full border border-slate-500 rounded-lg p-2 flex flex-wrap space-x-2">
          <AddFilterTags />

          


        </div>
      </div>

      <div
        onClick={(): void => {
          setShowFilter(false);
          setCalldata(true);
        }}
        className="btn cursor-pointer capitalize px-5 py-2 bg-blue-500 w-fit rounded-full text-white"
      >
        ok Done
      </div>
    </div>
  );
};

export default CustomFilters;
