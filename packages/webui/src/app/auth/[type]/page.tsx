"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import SignUp from "@/components/AuthManager/SignUp/SignUp";
import SignIn from "@/components/AuthManager/SignIn/SignIn";

import InformAlert from "@/components/Reusable/InformAlert";
import { AlertContext } from "@/components/ContextManager/AlertContextProvider/AlertContext";
import { AlertContextType } from "@/components/TypeInterfaces/ContextInterfaces";
import { AlertPropsType } from "@/components/TypeInterfaces/PropsInterfaces";
import Forgetpwd from "@/components/AuthManager/Forgetpwd/Forgetpwd";

function Auth_page({ params }: { params: { type: string } }) {
  // ------------------------------ Alert Box feature-------------------

  const [Visibility, setVisibility] =
    useState<AlertContextType["Visibility"]>(false);
  const [Alertdata, setAlertdata] = useState<AlertPropsType>({
    type: "",
    title: "",
    message: "",
    list: [],
  });
  const hideAlert = () => {
    const alertbox = document.getElementById("alertbox");
    !Visibility && alertbox?.style.setProperty("top", "-10rem");
    Visibility && alertbox?.style.setProperty("top", "1rem");
  };

  useEffect(() => {
    Alertdata.title && setVisibility(true);
  }, [Alertdata]);
  useEffect(() => {
    hideAlert();
    !Visibility &&
      setAlertdata({
        type: "",
        title: "",
        message: "",
        list: [],
      });
  }, [Visibility]);
  useEffect(() => {
    hideAlert();
    setVisibility(false);
  }, []);
  // ------------------------------------------------------------------

  return (
    <>
      <AlertContext.Provider value={{ Visibility, setVisibility }}>
        <InformAlert
          type={Alertdata.type}
          title={Alertdata.title}
          message={Alertdata.message}
          list={Alertdata.list}
        />
      </AlertContext.Provider>
      {params.type == "signup" || params.type == "signin" ? (
        <div className="w-full   min-h-screen py-10 flex flex-row  justify-center items-center ">
          <div
            className="relative bg-[url('/auth_graphic.jpg')] bg-cover   h-fit rounded-3xl shadow-2xl shadow-orange-500/20 
          flex flex-row mob:flex-col-reverse justify-between items-center"
          >
            {params.type == "signup" ? (
              <SignUp setAlertdata={setAlertdata} />
            ) : (
              ""
            )}

            {params.type == "signin" ? (
              <SignIn setAlertdata={setAlertdata} />
            ) : (
              ""
            )}

            <div className="graphics relative w-max p-10 bg-transparent flex justify-center items-center ">
              <div className="imagecontainer w-80 h-80 ">
                {/* <Image fill src={"/Group.svg"} alt="image" /> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {params.type == "forgetpassword" ? (
        <Forgetpwd setAlertdata={setAlertdata} />
      ) : (
        ""
      )}
    </>
  );
}

export default Auth_page;
