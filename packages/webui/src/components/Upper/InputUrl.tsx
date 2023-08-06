import React from "react";

const InputURL = (): JSX.Element => {
  return (
    <>
      <div
        className={`bg-white/25 relative border-4 border-dashed border-white shadow-[0px_11px_20px_0px_rgba(43,36,128,0.41)] rounded-full flex flex-row justify-between items-center p-2.5  before:w-full  before:text-xl before:text-yellow-400 before:absolute before:-top-9 before:capitalize before:z-50`}
      >
        <input
          className="text-white text-lg px-3 mr-2 font-semibold w-full bg-transparent rounded-full outline-none border-none placeholder:text-slate-300 tracking-wider"
          type="text"
          name="destination"
          id="destination"
          placeholder="https://example.com/*"
        />

        <div className="flex flex-row justify-center items-center space-x-5 mob_only:absolute mob_only:-bottom-14  mob_only:w-full mob_only:right-0  ">
          <button
            className={`minifybtn font-semibold text-base capitalize px-10 py-1 bg-white text-black hover:scale-105 active:scale-90 rounded-full cursor-pointer  transition-all ease-in-out duration-200 `}
          >
            erase
          </button>

          <button
            className={`minifybtn font-semibold text-base capitalize px-10 py-1 bg-white text-black hover:scale-105 active:scale-90" rounded-full cursor-pointer  transition-all ease-in-out duration-200 `}
          >
            cutify
          </button>

          <button
            className={`minifybtn font-normal w-max text-base capitalize px-10 py-1 bg-slate-700 hover:bg-slate-800 text-white rounded-full cursor-pointer hover:scale-105 active:scale-90 transition-all ease-in-out duration-200 `}
          >
            copy
          </button>
        </div>
      </div>
    </>
  );
};

export default InputURL;
