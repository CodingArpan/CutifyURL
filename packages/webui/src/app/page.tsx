"use client";
import React, { useState, useEffect } from "react";
import ManagerIndex from "@/components/LinkManager/Manager.Index";
import HeaderIndex from "@/components/MainFunction/MainFunction.index";
import InformAlert from "@/components/Reusable/InformAlert";
import Image from "next/image";

export default function Home() {
  //  ----------------only testing that the server is running properly or not----------------
  useEffect(() => {
    try{

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkup`, {
      mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.text();
        return response;
      })
      .then((data) => console.log(data));
    }
    catch(err){
      console.log(err);
    }
  }, []);
  // ----------------------------------------------------------------------------------------
  return (
    <>
      <HeaderIndex />
      <ManagerIndex />
    </>
  );
}
