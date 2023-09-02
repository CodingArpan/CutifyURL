import React, { useState, useEffect } from "react";
import AddFilterTags from "./AddFilterTags";
import { REQFiltersTypes } from "./LinkAnalytics.Index";

interface CustomFilterProps {
  ShowFilter: boolean;
  setDupReqFilters: React.Dispatch<React.SetStateAction<REQFiltersTypes>>;
  DupReqFilters: REQFiltersTypes;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setCalldata: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomFilters = (props: CustomFilterProps): JSX.Element => {
  const [SearchByDateActivate, setSearchByDateActivate] =
    useState<boolean>(false);
  const [DurationSelection, setDurationSelection] = useState<boolean>(false);
  const [DateRange, setDateRange] = useState<boolean>(false);

  const {
    ShowFilter,
    setShowFilter,
    setDupReqFilters,
    DupReqFilters,
    setCalldata,
  }: CustomFilterProps = props;

  const checkInputData = (): void => {
    const { fromDate, toDate, durationType, tags }: REQFiltersTypes =
      DupReqFilters;

    durationType == ""
      ? setDurationSelection(true)
      : setDurationSelection(false);

    if (durationType == "") {
      setDurationSelection(true);
    } else {
      setDurationSelection(false);
      if (durationType == "userDateToDate") {
        if (fromDate != "" && toDate != "") {
          setDateRange(false);
          setShowFilter(false);
          setCalldata(true);
        } else {
          setDateRange(true);
        }
      } else {
        setDateRange(false);
        setShowFilter(false);
        setCalldata(true);
      }
    }
  };

  useEffect(() => {
    const frm: HTMLFormElement = document.querySelector("form#daterange")!;
    if (frm) frm.reset();
  }, [SearchByDateActivate]);

  return (
    <div
      className={` w-full  bg-white shadow-lg rounded-xl space-y-3 origin-top ${
        // ShowFilter ? "scale-y-100" : "scale-y-0"
        ShowFilter ? "h-fit opacity-100 p-5" : "h-0 opacity-0 p-0"
      } duration-100`}
    >
      <div className="bytime capitalize">
        <p className="filtype w-full py-2 text-gray-600 font-medium border-b border-slate-200">
          duration{" "}
          {DurationSelection && (
            <span className="text-red-300 text-sm">( select an option )</span>
          )}
        </p>
        <div className="flex flex-row justify-start items-center flex-wrap py-2 text-gray-500">
          <div className="btn flex space-x-2 cursor-pointer group">
            <input
              onChange={(e) => {
                setSearchByDateActivate(false);
                const type = e.target.dataset.dyrtype!;
                console.log(type);
                setDupReqFilters((val) => {
                  return {
                    ...val,
                    durationType: type,
                    fromDate: "",
                    toDate: "",
                  };
                });
              }}
              data-dyrtype="lastDay"
              className="cursor-pointer hidden peer"
              type="radio"
              name="filteropt"
              id="lastdayopt"
            />
            <label
              className="cursor-pointer px-2 py-1  group-hover:text-indigo-500  rounded-lg  border-4 border-double border-white/0 peer-checked:border-indigo-500/70 peer-checked:text-indigo-600  duration-100"
              htmlFor="lastdayopt"
            >
              last day
            </label>
          </div>
          <div className="btn flex space-x-2 cursor-pointer group">
            <input
              onChange={(e) => {
                setSearchByDateActivate(false);
                const type = e.target.dataset.dyrtype!;
                console.log(type);
                setDupReqFilters((val) => {
                  return {
                    ...val,
                    durationType: type,
                    fromDate: "",
                    toDate: "",
                  };
                });
              }}
              data-dyrtype="lastWeek"
              className="cursor-pointer hidden peer"
              type="radio"
              name="filteropt"
              id="lastweekopt"
            />
            <label
              className="cursor-pointer px-2 py-1  group-hover:text-indigo-500  rounded-lg  border-4 border-double border-white/0 peer-checked:border-indigo-500/70 peer-checked:text-indigo-600  duration-100"
              htmlFor="lastweekopt"
            >
              last week
            </label>
          </div>
          <div className="btn flex space-x-2 cursor-pointer group">
            <input
              onChange={(e) => {
                setSearchByDateActivate(false);
                const type = e.target.dataset.dyrtype!;
                console.log(type);
                setDupReqFilters((val) => {
                  return {
                    ...val,
                    durationType: type,
                    fromDate: "",
                    toDate: "",
                  };
                });
              }}
              data-dyrtype="lastMonth"
              className="cursor-pointer hidden peer"
              type="radio"
              name="filteropt"
              id="lastmonthopt"
            />
            <label
              className="cursor-pointer px-2 py-1  group-hover:text-indigo-500  rounded-lg  border-4 border-double border-white/0 peer-checked:border-indigo-500/70 peer-checked:text-indigo-600  duration-100"
              htmlFor="lastmonthopt"
            >
              last month
            </label>
          </div>
          <div className="btn flex space-x-2 cursor-pointer group relative">
            <input
              className="cursor-pointer  hidden peer"
              type="radio"
              name="filteropt"
              id="bydaTE"
              onChange={(e) => {
                setSearchByDateActivate(true);
                const type = e.target.dataset.dyrtype!;
                console.log(type);
                setDupReqFilters((val) => {
                  return {
                    ...val,
                    durationType: type,
                    fromDate: "",
                    toDate: "",
                  };
                });
              }}
              data-dyrtype="userDateToDate"
            />
            <label
              className="cursor-pointer px-2 py-1   group-hover:text-indigo-500  rounded-lg  border-4 border-double border-white/0 peer-checked:border-indigo-500/70 peer-checked:text-indigo-600  duration-100
              "
              htmlFor="bydaTE"
            >
              Search by date
            </label>
          </div>
        </div>
      </div>
      {DateRange && (
        <p className="text-red-300 text-sm">( Select Date Range )</p>
      )}
      <form
        id="daterange"
        className={`relative w-fit  flex flex-row flex-nowrap justify-start items-center space-x-4 bg-white text-gray-500 border rounded-lg drop-shadow-sm  transition duration-500 overflow-hidden  ${
          SearchByDateActivate ? "opacity-100 h-fit p-5" : "opacity-0 h-0 p-0"
        }`}
      >
        <div className="flex justify-between items-center space-x-5">
          <label className="whitespace-nowrap w-fit" htmlFor="fromdate ">
            from date
          </label>
          <input
            className="w-40 p-3 bg-gray-50 shadow-md rounded-lg outline-none"
            type="date"
            name="fromdate"
            id="fromdate"
            onChange={(e) => {
              const fromdate = e.target.value!;
              setDupReqFilters((val) => {
                return {
                  ...val,
                  fromDate: fromdate,
                };
              });
            }}
          />
        </div>
        <div className="flex justify-between items-center space-x-5">
          <label className="whitespace-nowrap w-fit" htmlFor="todate">
            to date
          </label>
          <input
            onChange={(e) => {
              const todate = e.target.value!;
              setDupReqFilters((val) => {
                return {
                  ...val,
                  toDate: todate,
                };
              });
            }}
            className="w-40 p-3 bg-gray-50 shadow-md rounded-lg outline-none"
            type="date"
            name="todate"
            id="todate"
          />
        </div>
      </form>

      <div className="bytags capitalize flex flex-col justify-start items-start ">
        <p className="filtype w-max py-2 text-gray-600 font-medium">Tags</p>

        <div className="w-full border  rounded-lg p-2 flex flex-wrap space-x-2">
          <AddFilterTags setDupReqFilters={setDupReqFilters} />
        </div>
      </div>

      <div className="flex space-x-2 text-sm">
        <div
          onClick={(): void => {
            checkInputData();
            // setShowFilter(false);
            // setCalldata(true);
            console.log(DupReqFilters);
          }}
          className="btn cursor-pointer capitalize px-5 py-2 bg-violet-500 w-fit rounded-full text-white"
        >
          ok Done
        </div>

        <div
          onClick={(): void => {
            setShowFilter(false);
            // setCalldata(true);
          }}
          className="btn cursor-pointer capitalize px-5 py-2 bg-white border border-violet-500 w-fit rounded-full text-violet-500"
        >
          Close
        </div>
      </div>
    </div>
  );
};

export default CustomFilters;
