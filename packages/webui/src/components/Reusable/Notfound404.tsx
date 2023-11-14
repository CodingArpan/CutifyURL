import React from "react";
import Link from "next/link";
function Notfound404() {
  return (
    <div className="notfound h-screen  flex flex-col justify-center items-center gap-5">
      <div className="titleImage bg-spaceImage bg-cover">
        <h1 className="title capitalize font-black text-[10rem] text-black bg-white mix-blend-screen ">
          Oops!
        </h1>
      </div>
      <p className="title capitalize font-black text-2xl text-black">
        404 - Page Not Found
      </p>
      <p className="title capitalize font-black text-base text-gray-600 max-w-md text-center">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <Link href="/">
        {" "}
        <button
          className="capitalize px-5 py-2 bg-blue-500 shadow-xl shadow-blue-500/50 text-white font-medium
       tracking-wide rounded-full active:scale-95"
        >
          go to homepage
        </button>
      </Link>
    </div>
  );
}

export default Notfound404