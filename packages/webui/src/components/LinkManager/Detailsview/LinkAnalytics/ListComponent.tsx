import React from "react";
import Analytics from "./Analytics";
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

const ListComponent = ({
  destination,
  keyword,
  secure,
  title,
  tags,
  clicks,
  country,
  updatedAt,
}: Dataset): JSX.Element => {
  return (
    <div className="rounded-xl w-full bg-white shadow-lg capitalize px-10 py-2">
      <div className="intro flex flex-row justify-between items-start py-2">
        <div className="part1 flex flex-col justify-start items-start space-y-5">
          <div className="title text-xl">
            {title == "null"
              ? destination?.replaceAll("https://", "").slice(0, 30)
              : title}{"..."}
          </div>
          <div className="tags flex flex-row justify-evenly items-center flex-wrap space-x-2 text-xs font-medium">
            <div className="tag rounded-lg bg-violet-100 text-violet-700 px-3 py-2">
              Tag No 1
            </div>
            <div className="tag rounded-lg bg-blue-100 text-blue-700 px-3 py-2">
              Tag No 1
            </div>
            <div className="tag rounded-lg bg-orange-100 text-orange-700 px-3 py-2">
              Tag No 1
            </div>
            <div className="tag rounded-lg bg-green-100 text-green-700 px-3 py-2">
              Tag No 1
            </div>
            <div className="tag rounded-lg bg-rose-100 text-rose-700 px-3 py-2">
              Tag No 1
            </div>
          </div>
          <div className="extrainfo flex space-x-4">
            {secure && (
              <div className="protection flex justify-center items-center space-x-2 text-rose-500">
                <div className="icon">
                  <svg
                    className="w-4"
                    stroke="currentColor"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                  </svg>
                </div>
                <p className="">protected</p>
              </div>
            )}
            <div className="createdat text-slate-400">{updatedAt}</div>
          </div>
        </div>
        <div className="part2 flex flex-col justify-start items-start space-y-3 text-slate-400">
          <div className="clicks flex space-x-2 justify-center items-center">
            <div className="icon">
              <svg
                className="w-2"
                stroke="currentColor"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z" />
              </svg>
            </div>
            <p className="">
              total clicks : <span className="text-orange-500">{clicks}</span>
            </p>
          </div>
          <div className="country flex space-x-2 justify-center items-center">
            <div className="icon">
              <svg
                stroke="currentColor"
                fill="currentColor"
                className="w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M266.3 48.3L232.5 73.6c-5.4 4-8.5 10.4-8.5 17.1v9.1c0 6.8 5.5 12.3 12.3 12.3c2.4 0 4.8-.7 6.8-2.1l41.8-27.9c2-1.3 4.4-2.1 6.8-2.1h1c6.2 0 11.3 5.1 11.3 11.3c0 3-1.2 5.9-3.3 8l-19.9 19.9c-5.8 5.8-12.9 10.2-20.7 12.8l-26.5 8.8c-5.8 1.9-9.6 7.3-9.6 13.4c0 3.7-1.5 7.3-4.1 10l-17.9 17.9c-6.4 6.4-9.9 15-9.9 24v4.3c0 16.4 13.6 29.7 29.9 29.7c11 0 21.2-6.2 26.1-16l4-8.1c2.4-4.8 7.4-7.9 12.8-7.9c4.5 0 8.7 2.1 11.4 5.7l16.3 21.7c2.1 2.9 5.5 4.5 9.1 4.5c8.4 0 13.9-8.9 10.1-16.4l-1.1-2.3c-3.5-7 0-15.5 7.5-18l21.2-7.1c7.6-2.5 12.7-9.6 12.7-17.6c0-10.3 8.3-18.6 18.6-18.6H400c8.8 0 16 7.2 16 16s-7.2 16-16 16H379.3c-7.2 0-14.2 2.9-19.3 8l-4.7 4.7c-2.1 2.1-3.3 5-3.3 8c0 6.2 5.1 11.3 11.3 11.3h11.3c6 0 11.8 2.4 16 6.6l6.5 6.5c1.8 1.8 2.8 4.3 2.8 6.8s-1 5-2.8 6.8l-7.5 7.5C386 262 384 266.9 384 272s2 10 5.7 13.7L408 304c10.2 10.2 24.1 16 38.6 16H454c6.5-20.2 10-41.7 10-64c0-111.4-87.6-202.4-197.7-207.7zm172 307.9c-3.7-2.6-8.2-4.1-13-4.1c-6 0-11.8-2.4-16-6.6L396 332c-7.7-7.7-18-12-28.9-12c-9.7 0-19.2-3.5-26.6-9.8L314 287.4c-11.6-9.9-26.4-15.4-41.6-15.4H251.4c-12.6 0-25 3.7-35.5 10.7L188.5 301c-17.8 11.9-28.5 31.9-28.5 53.3v3.2c0 17 6.7 33.3 18.7 45.3l16 16c8.5 8.5 20 13.3 32 13.3H248c13.3 0 24 10.7 24 24c0 2.5 .4 5 1.1 7.3c71.3-5.8 132.5-47.6 165.2-107.2zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM187.3 100.7c-6.2-6.2-16.4-6.2-22.6 0l-32 32c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l32-32c6.2-6.2 6.2-16.4 0-22.6z" />
              </svg>
            </div>
            <p className="">
              top 3 country :
              <span className="text-blue-600 break-words">
                {country?.map((val) => {
                  return val + ",";
                })}
              </span>
            </p>
          </div>
          <div className="destinationdomain flex space-x-1 justify-center items-center">
            <div className="icon">
              <svg
                stroke="currentColor"
                fill="currentColor"
                className="w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M176 256C176 211.8 211.8 176 256 176C300.2 176 336 211.8 336 256C336 300.2 300.2 336 256 336C211.8 336 176 300.2 176 256zM256 0C273.7 0 288 14.33 288 32V66.65C368.4 80.14 431.9 143.6 445.3 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H445.3C431.9 368.4 368.4 431.9 288 445.3V480C288 497.7 273.7 512 256 512C238.3 512 224 497.7 224 480V445.3C143.6 431.9 80.14 368.4 66.65 288H32C14.33 288 0 273.7 0 256C0 238.3 14.33 224 32 224H66.65C80.14 143.6 143.6 80.14 224 66.65V32C224 14.33 238.3 0 256 0zM128 256C128 326.7 185.3 384 256 384C326.7 384 384 326.7 384 256C384 185.3 326.7 128 256 128C185.3 128 128 185.3 128 256z"></path>
              </svg>
            </div>
            <p className="">
              destination domain :{" "}
              <span className="text-violet-500">
                {destination?.replaceAll("https://", "").split("/")[0]}
              </span>
            </p>
          </div>
          <div className="minifiedurl flex space-x-2 justify-center items-center">
            <div className="icon">
              <svg
                stroke="currentColor"
                fill="currentColor"
                className="w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
              </svg>
            </div>
            <p className="">
              minified URL :{" "}
              <span className="text-orange-500 lowercase">
                {process.env.NEXT_PUBLIC_UI_URL + "/" + keyword}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListComponent;
