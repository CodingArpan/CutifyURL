"use client";
import React, { useState } from "react";
import { Props, PropsModal, Dataset } from "../MainFunction.index";

const OptionsForm = (props: PropsModal): JSX.Element => {
  let { Modal, setModal, setData } = props;
  const [Showpas, setShowpas] = useState<boolean>(false);
  const [Keyword, setKeyword] = useState<boolean>(false);

  const datachanged = (name: string, value: string | boolean): void => {
    setData((val): Dataset => {
      return { ...val, [name]: value };
    });

    switch (name) {
      case "keyword":
        if (value) {
          datachanged("custom", true);
        } else {
          datachanged("custom", false);
        }
        break;
      case "password":
        if (value) {
          datachanged("secure", true);
        } else {
          datachanged("secure", false);
        }
        break;
    }
  };

  const checkkeyword = (keyword: string) => {
    if (keyword.length >= 4) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/url/avail/${keyword}`, {
        method: "GET",
      })
        .then(async (res) => {
          const result = await res.json();
          if (result.useable) {
            setKeyword(true);
            datachanged("keyword", keyword);
          } else {
            setKeyword(false);
            datachanged("keyword", "");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setKeyword(false);
      datachanged("keyword", "");
    }
  };

  const debounce = (fn: (keyword: string) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (word: string) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(word);
      }, delay);
    };
  };

  const smartfunc = debounce(checkkeyword, 300);

  return (
    <div
      className={`absolute z-10 top-0 mob_only:-top-20 w-full max-w-max min-h-fit max-h- bg-white py-5 px-5  md:px-10 rounded-xl space-y-5 shadow-xl transition-all ease-in-out duration-300  ${
        Modal ? "scale-100" : "scale-0"
      }`}
    >
      <div className="flex flex-col space-y-2">
        <label className="px-4 py-2 " htmlFor="password">
          Add Password
        </label>
        <div
          onClick={() =>
            setShowpas((val: boolean): boolean => (!val ? true : false))
          }
          className={`w-full flex justify-end items-end px-4 cursor-pointer before:opacity-0 before:invisible hover:before:visible hover:before:opacity-100 ${
            Showpas
              ? "before:content-['Hide_Password'] "
              : "before:content-['Show_Password'] "
          } before:w-fit before:px-5 before:py-1 before:absolute before:mr-7 before:bg-gray-700 before:text-gray-200 before:rounded-xl before:transition-all before:ease-in-out before:duration-300`}
        >
          {!Showpas && (
            <svg
              className="w-5 absolute "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
            </svg>
          )}
          {Showpas && (
            <svg
              className="w-5 absolute "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z" />
            </svg>
          )}
        </div>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            datachanged(e.target.name, e.target.value);
          }}
          className="w-full  border border-1 py-2 px-4 rounded-full text-lg font-normal text-gray-800 bg-blue-50 outline-none"
          type={!Showpas ? "password" : "text"}
          name="password"
          id="password"
          placeholder="Enter Your password"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="px-4 py-2" htmlFor="keyword">
          Add Custom Path
        </label>

        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            smartfunc(e.target.value);
          }}
          className="w-full  border border-1 py-2 px-4 rounded-full text-lg font-normal text-gray-800 bg-blue-50 outline-none select-all"
          type="text"
          name="keyword"
          id="keyword"
          placeholder="Enter Your Keyword"
        />
        {!Keyword && (
          <p className="text-rose-500 px-4">Keyword is unavailable 🚫</p>
        )}
        {Keyword && (
          <p className="text-green-500 px-4">Keyword is available ✅</p>
        )}
      </div>
      <div className="flex flex-row justify-evenly items-center space-x-10">
        <div className=" flex justify-center items-center">
          <input
            disabled
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              datachanged(e.target.name, e.target.checked);
              console.log(e.target.name, e.target.checked);
            }}
            className="w-4 h-4 focus:ring-purple-500 cursor-pointer"
            type="checkbox"
            name="qrcode"
            id="qrcode"
          />
          <label className="px-4 py-3 text-lg cursor-pointer" htmlFor="qrcode">
            Generate QR Code
          </label>
        </div>
        <div className=" flex justify-center items-center">
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              datachanged(e.target.name, e.target.checked);
              console.log(e.target.name, e.target.checked);
            }}
            className="w-4 h-4 focus:ring-purple-500 cursor-pointer"
            type="checkbox"
            name="track"
            id="track"
          />
          <label className="px-4 py-3 text-lg cursor-pointer" htmlFor="track">
            Track URL Clicks
          </label>
        </div>
      </div>

      <div className="btngroup flex justify-end items-end">
        <button
          type="button"
          onClick={() => setModal(false)}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          OK Thanks
        </button>
      </div>
    </div>
  );
};

export default OptionsForm;
