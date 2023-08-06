import React from "react";
import Navbar from "../Reusable/Navbar";
import InputURL from "./InputUrl";

const HeaderIndex = (): JSX.Element => {
  return (
    <div className="bg-[#615efd] pb-10">
      <Navbar />
      <form
        id="minifyreq"
        className="system w-full m-auto max-w-5xl px-5 md:px-10 space-y-12 my-10 mt-20 relative">
        <InputURL />
      </form>
    </div>
  );
};

export default HeaderIndex;
