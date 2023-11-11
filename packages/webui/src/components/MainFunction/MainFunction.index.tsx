"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Reusable/Navbar";
import InputURL from "./URLInput";
import { UserType } from "@/components/TypeInterfaces/PropsInterfaces";
import UrlCustomize from "./URLCustomization/CustomizationOptions";

export interface Props {
  setActivateBtn: React.Dispatch<React.SetStateAction<boolean>>;
  ActivateBtn: boolean;
  setData: React.Dispatch<React.SetStateAction<Dataset>>;
  Data: Dataset;
}

export interface PropsModal {
  Modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<Dataset>>;
}

export interface Dataset {
  destination: string;
  custom: boolean;
  keyword: string;
  secure: boolean;
  password: string;
  login: boolean;
  userid: string;
  track: boolean;
}


const HeaderIndex = (): JSX.Element => {
  const [User, setUser] = useState<UserType>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/checkaccesstoken`, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: "" }),
    })
      .then(async (res) => {
        //   {
        //     "authentication": true,
        //     "message": "session active",
        //     "userdata": {
        //         "name": "arpan das",
        //         "ref": "654e3896809859186734fd35"
        //     }
        // }
        const response = await res.json();
        return response;
      })
      .then((data) => {
        if (data?.authentication) {
          setUser({ ...data?.userdata });
        } else {
          setUser(null);
        }
        console.log(data);
      })
      .catch((error) => {
        setUser(null);
        console.log(error);
      });
  }, []);
  const [ActivateBtn, setActivateBtn] = useState<boolean>(false);
  const [Data, setData] = useState<Dataset>({
    destination: "",
    custom: false,
    keyword: "",
    secure: false,
    password: "",
    login: false,
    userid: "",
    track: false,
  });

  return (
    <div className=" pb-10 relative">
      <div className="w-full h-full bg-orange-600"></div>
      <div className="bg-white/0">
        <Navbar User={User} setUser={setUser} />

        <form
          id="minifyreq"
          className="system w-full m-auto max-w-5xl px-5 md:px-10 space-y-12 my-10 mt-20 relative"
        >
          <InputURL
            setActivateBtn={setActivateBtn}
            ActivateBtn={ActivateBtn}
            setData={setData}
            Data={Data}
          />
          <UrlCustomize
            setActivateBtn={setActivateBtn}
            ActivateBtn={ActivateBtn}
            setData={setData}
            Data={Data}
          />
        </form>
        <div className="graphics absolute -z-10 w-full  flex flex-row justify-around -bottom-28">
          <div className="circle w-60 h-60 bg-yellow-400/60 blur-3xl rounded-full"></div>
          <div className="circle w-60 h-60 bg-blue-400/60 blur-3xl  "></div>
          <div className="circle w-60 h-60 bg-violet-400/60 blur-3xl  rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderIndex;
