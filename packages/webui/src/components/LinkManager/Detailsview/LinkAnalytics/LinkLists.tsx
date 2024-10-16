import React, { useEffect, useState } from "react";
import ListComponent from "./ListComponent";
import { REQFiltersTypes } from "./LinkAnalytics.Index";

interface LinkListProps {
  ReqFilters: REQFiltersTypes;
}
export interface Dataset {
  destination?: string;
  custom?: boolean;
  keyword?: string;
  secure?: boolean;
  password?: string;
  login?: boolean;
  userid?: string;
  track?: boolean;
  title?: string;
  tags?: string[];
  clicks?: string;
  country?: string[];
  updatedAt?: string;
}
const LinkLists = (props: LinkListProps) => {
  const { ReqFilters } = props;
  const [Urldata, setUrldata] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/url/getall`, {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })
      .then(async (res) => {
        const response = await res.json();
        return response;
      })
      .then((data) => {
        console.log(data);
        if (!data.message) {
          setUrldata(data);
        }
      })
      .catch((error) => {
        console.log(error + "-------------------");
      });
  }, [ReqFilters]);

  return (
    <div className="">
      <p className="capitalize text-lg p-2 my-2">
        last 1 month history <span className="text-slate-400">(default)</span>
      </p>
      <div className="LinkLists bg-slate-100 h-max rounded-lg p-3 space-y-5 ">
        {Urldata?.map((val: Dataset) => {
          return (
            <ListComponent
              key={val.keyword}
              destination={val.destination}
              keyword={val.keyword}
              secure={val.secure}
              title={val.title}
              tags={val.tags}
              clicks={val.clicks}
              country={val.country}
              updatedAt={val.updatedAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LinkLists;
