"use client";
import React from "react";
import Image from "next/image";
import SignUp from "@/components/AuthManager/SignUp";
import SignIn from "@/components/AuthManager/SignIn";
function Auth_page({ params }: { params: { type: string } }) {
  return (
    <div className="relative bg-violet-400  m-auto w-3/5 mt-5 rounded-3xl drop-shadow-[0_4px_45px_#a78bfa] flex flex-row justify-between items-center">
      {params.type == "signup" ? <SignUp /> : ""}
      {params.type == "signin" ? <SignIn /> : ""}

      <div className="graphics relative w-1/2 p-10 bg-transparent flex justify-center items-center ">
        <Image width={600} height={600} src={"/Group.svg"} alt="image" />
      </div>
    </div>
  );
}

export default Auth_page;
