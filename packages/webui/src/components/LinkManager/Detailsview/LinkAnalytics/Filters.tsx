import React, { useState, useEffect } from "react";
import CustomFilters from "./CustomFilters";
import { REQFilters } from "./LinkAnalytics.Index";
interface FilterProps {
  setReqFilters: React.Dispatch<React.SetStateAction<REQFilters>>;
  ReqFilters: REQFilters;
}

const Filters = (props: FilterProps): JSX.Element => {
  const { setReqFilters, ReqFilters }: FilterProps = props;

  const [DupReqFilters, setDupReqFilters] = useState<REQFilters>({
    ...ReqFilters,
  });

  const [ShowFilter, setShowFilter] = useState<boolean>(false);
  const [Calldata, setCalldata] = useState<boolean>(false);

  useEffect(() => {
    if (!ShowFilter && Calldata) {
      setReqFilters((val: REQFilters): REQFilters => {
        return { ...DupReqFilters };
      });
    }
  // }, [Calldata]);
  }, []);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-center space-x-5">
        <div
          onClick={(): void => {
            setShowFilter(true);
          }}
          className="filters cursor-pointer flex justify-center items-center w-max py-3 px-5 space-x-2 text-lg capitalize text-violet-600 bg-violet-100 rounded-xl"
        >
          <div className="icon">
            <svg
              className="w-5"
              stroke="currentColor"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M3.853 54.87C10.47 40.9 24.54 32 40 32H472C487.5 32 501.5 40.9 508.1 54.87C514.8 68.84 512.7 85.37 502.1 97.33L320 320.9V448C320 460.1 313.2 471.2 302.3 476.6C291.5 482 278.5 480.9 268.8 473.6L204.8 425.6C196.7 419.6 192 410.1 192 400V320.9L9.042 97.33C-.745 85.37-2.765 68.84 3.854 54.87L3.853 54.87z" />
            </svg>
          </div>
          <p className="">filters</p>
        </div>

        <div className="w-full border-b border-b-blue-600 px-2 py-2 flex justify-start items-center space-x-2">
          <div className="flex ">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="w-full px-2 py-1 outline-none text-base"
            placeholder="Search by Minified URL , Title"
          />
          <div className="w-max cursor-pointer rounded-lg text-violet-700 py-1 px-4 bg-violet-200 font-medium">
            Search
          </div>
        </div>
      </div>

      <CustomFilters
        ShowFilter={ShowFilter}
        setShowFilter={setShowFilter}
        setDupReqFilters={setDupReqFilters}
        setCalldata={setCalldata}
      />
    </div>
  );
};

export default Filters;
