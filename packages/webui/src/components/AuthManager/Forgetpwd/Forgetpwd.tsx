import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/ThreeballDropping.module.css";

import { AlertPropsType } from "@/components/TypeInterfaces/PropsInterfaces";
function Forgetpwd({
  setAlertdata,
}: {
  setAlertdata: React.Dispatch<React.SetStateAction<AlertPropsType>>;
}) {
  const [EmailAddress, setEmailAddress] = useState<{ email: string }>({
    email: "",
  });
  const [Email, setEmail] = useState<boolean>(true);
  const [Loader, setLoader] = useState<boolean>(false);

  const checkUserInputData: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => boolean = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
    const userInput = e.target.value;
    let dataValidation = false;
    switch (e.target.name) {
      case "email":
        const emailRegx =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gi;
        const emailTest = emailRegx.test(userInput);
        emailTest ? setEmail(true) : setEmail(false);
        emailTest ? (e.target.value = e.target.value.toLowerCase()) : "";
        emailTest && (dataValidation = true);
        break;
    }
    return dataValidation;
  };

  const userInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    if (checkUserInputData(e)) {
      setEmailAddress((EmailAddress) => {
        return {
          ...EmailAddress,
          [e.target.name]: e.target.value,
        };
      });
      console.log(FormData);
    }
  };

  const sendData = async () // e: React.ChangeEvent<HTMLInputElement>
  : Promise<void> => {
    // e.preventDefault();
    if (Email && EmailAddress.email) {
      setLoader(true);
      requestOTP();
    } else {
      console.log("error, request can not be send");
      setEmail(false);
    }
  };

  const requestOTP = async (): Promise<void> => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resetpassword`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...EmailAddress }),
        }
      );
      let res = await req.json();
      console.log(res);

      if (res.emailindb === true) {
        setEmailAddress({
          email: "",
        });
        setAlertdata({
          type: "success",
          title: res.type,
          message: res.message,
        });
      } else if (res.emailindb === false) {
        setAlertdata({
          type: "warning",
          title: res.type,
          message: res.message,
        });
      } else {
        setAlertdata({
          type: "error",
          title: "Unexpected Response",
          message: res.message ?? "",
        });
      }
    } catch (error) {
      console.log(error);
      setAlertdata({
        type: "error",
        title: "Server Down",
        message: "Please try again later",
        list: [],
      });
    }
    setTimeout(() => {
      setLoader(false);
    }, 500);
  };

  return (
    <div className="forgetpassword relative w-full h-screen flex flex-col justify-center items-center">
      <div className="container relative  shadow-2xl shadow-blue-500/25  w-full max-w-fit p-20 bg-white min-h-fit flex flex-row justify-center items-center space-x-10 rounded-xl ">
        <div className="imageContainer relative w-96 h-96 ">
          <Image fill src="/forget.jpg" alt="forget password" />
        </div>
        <div className="formContainer relative w-80 h-80 flex flex-col justify-center items-start space-y-10">
          <p className="title font-black text-6xl">
            Forgot <br />
            Password ?
          </p>
          <p className="tagline text-sm font-semibold text-gray-400 tracking-wide">
            Dont worry we will help you out to change your pasword. Enter the
            email associated with your account.
          </p>
          <div className="form flex flex-col justify-center items-end">
            <div className="emailContainer relative w-80">
              <input
                onChange={(e) => {
                  const checkbox = document.getElementById("optioncheck");
                  e.target.value
                    ? checkbox?.setAttribute("checked", "checked")
                    : checkbox?.removeAttribute("checked");
                  userInput(e);
                }}
                className=" peer py-2 left-0 top-0 outline-none border-b-2 border-b-gray-400 w-full bg-transparent"
                type="email"
                name="email"
                id="email"
              />
              <input
                className="peer/check hidden"
                type="checkbox"
                name="option"
                id="optioncheck"
              />
              <label
                className=" absolute left-0 top-0 py-2 text-base font-bold text-gray-500
                  peer-focus:text-xs peer-focus:font-semibold peer-focus:-top-5
                  peer-checked/check:text-xs peer-checked/check:font-semibold peer-checked/check:-top-5"
                htmlFor="email"
              >
                Enter Your Email
              </label>
              <p
                className={`py-3 ${
                  Email ? "invisible" : "visible"
                } text-pink-600 text-sm`}
              >
                Please provide a valid email address.
              </p>
            </div>
            <div className="btnContainer w-full flex justify-evenly">
              {/* <button
                disabled
                className="btn w-max px-5 py-2 cursor-pointer text-gray-600 font-extrabold text-sm rounded-md capitalize"
              >
                Try Another way
              </button> */}
              <button
                onClick={() => {
                  sendData();
                }}
                className="btn w-max px-5 py-2 bg-gray-800 text-white text-sm rounded-md capitalize
                flex flex-row justify-center items-center space-x-2"
              >
                <p className="">Reset password</p>
                {Loader && (
                  <div className={styles.loader}>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgetpwd;
