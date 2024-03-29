import React, { useState, useRef, useEffect } from "react";
import { REQFiltersTypes } from "./LinkAnalytics.Index";

interface CustomFilterProps {
  setDupReqFilters: React.Dispatch<React.SetStateAction<REQFiltersTypes>>;
}

const AddFilterTags = (props: CustomFilterProps) => {
  const { setDupReqFilters }: CustomFilterProps = props;
  const taginput = useRef<HTMLInputElement>(null);
  const [NewTag, setNewTag] = useState("");
  const [Invalidtag, setInvalidtag] = useState<boolean>(false);
  const [filtertags, setfiltertags] = useState<string[]>([]);
  const [RemoveTag, setRemoveTag] = useState<number>(0);

  useEffect(() => {
    setDupReqFilters((val) => {
      return {
        ...val,
        tags: filtertags,
      };
    });
  }, [filtertags]);

  useEffect(() => {
    setfiltertags((val) => {
      val.splice(RemoveTag, 1);
      return [...val];
    });
    setInvalidtag(false);
    console.log(filtertags);
  }, [RemoveTag]);

  return (
    <div className="relative flex flex-col w-full space-y-3">
      {Invalidtag && (
        <p className="text-red-300 text-sm lowercase">
          Keyword is invalid or already exist
        </p>
      )}
      <div className="w-full input flex justify-start items-center space-x-3 ">
        <input
          onChange={(e) => {
            setNewTag(e.target.value.toLowerCase().trim());
          }}
          className="border p-2 w-96 rounded-lg outline-none drop-shadow"
          type="text"
          name="addfiltertag"
          id="addfiltertag"
          placeholder="Enter a filter tag"
        />
        <div
          onClick={() => {
            setfiltertags((val) => {
              if (NewTag != "" && filtertags.indexOf(NewTag) == -1) {
                setInvalidtag(false);
                return [NewTag, ...val];
              }
              setInvalidtag(true);
              return [...val];
            });
            setNewTag("");
          }}
          className="addbtn cursor-pointer p-2"
        >
          <svg
            className="w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
              fill="#7c3aed"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {filtertags?.map((tag, index) => {
          return (
            <div
              key={`a_` + index}
              className="relative flex justify-center items-center space-x-2 group px-3 py-1 bg-gray-200 rounded-full w-max"
            >
              <div className="text-gray-700">{tag}</div>
              <div
                // data-seq={index}
                onClick={(e) => {
                  const ele = e.target as HTMLElement;
                  const id = Number(ele.dataset.seq);
                  setRemoveTag(id);
                }}
                className="icon cursor-pointer overflow-hidden rounded-full"
              >
                <svg
                  data-seq={index}
                  className="w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"
                    fill="gray"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddFilterTags;
