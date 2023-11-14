"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "@/styles/ThreeballDropping.module.css";
interface pwdType {
  password: string;
  confirm_password: string;
}
function Page({ params }: { params: { resetid: string } }) {
  const router = useRouter();

  const [Pwd, setPwd] = useState<pwdType>({
    password: "",
    confirm_password: "",
  });

  const [Password, setPassword] = useState<boolean>(true);
  const [PasswordConfirm, setPasswordConfirm] = useState<boolean>(true);
  const [Loader, setLoader] = useState<boolean>(false);
  const [ResData, setResData] = useState({
    action: false,
    type: "",
    message: "",
  });
  const checkUserInputData = (
    e: React.ChangeEvent<HTMLInputElement>
  ): boolean => {
    const userInput = e.target.value;
    let dataValidation = false;
    switch (e.target.name) {
      case "password":
        const pwdRegx = /[a-zA-Z0-9\!\@\#\$\%\&\-\_\\\/]{6,50}/g;
        const pwdTest = pwdRegx.test(userInput);
        pwdTest ? setPassword(true) : setPassword(false);
        pwdTest && (dataValidation = true);

      case "confirm_password":
        const cnfpwdRegx = /[a-zA-Z0-9\!\@\#\$\%\&\-\_\\\/]{6,50}/g;
        const cnfpwdTest =
          cnfpwdRegx.test(userInput) && userInput === Pwd.password;
        cnfpwdTest ? setPasswordConfirm(true) : setPasswordConfirm(false);
        cnfpwdTest && (dataValidation = true);
        break;
    }
    return dataValidation;
  };

  const userInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    if (checkUserInputData(e)) {
      setPwd((Pwd) => {
        return { ...Pwd, [e.target.name]: e.target.value };
      });
      console.log(Pwd);
    }
  };

  const sendData = async () // e: React.ChangeEvent<HTMLInputElement>
  : Promise<void> => {
    // e.preventDefault();
    if (Password && PasswordConfirm && Pwd.password && Pwd.confirm_password) {
      setLoader(true);
      console.log("sending your message");
      changePassword();
    } else {
      console.log("error, request can not be send");

      setPassword(false);
      setPasswordConfirm(false);
    }
  };

  const changePassword = async (): Promise<void> => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/changepwd`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...Pwd, resetid: params.resetid }),
        }
      );
      let res = await req.json();
      console.log(res);
      setResData({
        action: res.action,
        type: res.type,
        message: res.message,
      });
      if (res.action === true) {
        setPwd({
          password: "",
          confirm_password: "",
        });

        setTimeout(() => {
          router.push("/auth/signin");
        }, 1500);
      } else if (res.action === false) {
        setTimeout(() => {
          router.push("/auth/forgetpassword");
        }, 1500);
      } else {
        setTimeout(() => {
          router.push("/auth/forgetpassword");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
        setResData({
            action: false,
            type: "error",
            message: "can't connect to server",
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
          <Image fill src="/secure.jpg" alt="forget password" />
        </div>
        <div className="formContainer relative w-80 h-80 flex flex-col justify-center items-start space-y-10">
          <div className="form flex flex-col justify-center items-end">
            <div className="password relative w-80">
              <input
                onChange={(e) => {
                  const checkbox = document.getElementById("optioncheck1");
                  e.target.value
                    ? checkbox?.setAttribute("checked", "checked")
                    : checkbox?.removeAttribute("checked");
                  userInput(e);
                }}
                className=" peer py-2 left-0 top-0 outline-none border-b-2 border-b-gray-400 w-full bg-transparent"
                type="password"
                name="password"
                id="password"
              />
              <input
                className="peer/check hidden"
                type="checkbox"
                name="optionc1"
                id="optioncheck1"
              />
              <label
                className="capitalize absolute left-0 top-0 py-2 text-base font-bold text-gray-500
                  peer-focus:text-xs peer-focus:font-semibold peer-focus:-top-5
                  peer-checked/check:text-xs peer-checked/check:font-semibold peer-checked/check:-top-5"
                htmlFor="password"
              >
                password
              </label>
              <p
                className={`py-3 ${
                  Password ? "invisible" : "visible"
                } text-pink-600 text-sm`}
              >
                Password must be 6 or more characters long
              </p>
            </div>
            <div className="confirmpassword relative w-80">
              <input
                onChange={(e) => {
                  const checkbox = document.getElementById("optioncheck2");
                  e.target.value
                    ? checkbox?.setAttribute("checked", "checked")
                    : checkbox?.removeAttribute("checked");
                  userInput(e);
                }}
                className=" peer py-2 left-0 top-0 outline-none border-b-2 border-b-gray-400 w-full bg-transparent"
                type="password"
                name="confirm_password"
                id="confirmpassword"
              />
              <input
                className="peer/check hidden"
                type="checkbox"
                name="option2"
                id="optioncheck2"
              />
              <label
                className="capitalize absolute bg-transparent left-0 top-0 py-2 text-base font-bold text-gray-500
                  peer-focus:text-xs peer-focus:font-semibold peer-focus:-top-5
                  peer-checked/check:text-xs peer-checked/check:font-semibold peer-checked/check:-top-5"
                htmlFor="confirmpassword"
              >
                confirm password
              </label>
              <p
                className={`py-3 ${
                  PasswordConfirm ? "invisible" : "visible"
                } text-pink-600 text-sm`}
              >
                Confirm Password doesn't match
              </p>
            </div>
            <div className="btnContainer w-full flex justify-evenly">
              <button
                onClick={() => {
                  sendData();
                }}
                className="btn w-max px-5 py-2 bg-gray-800 text-white text-sm rounded-md capitalize
                flex flex-row justify-center items-center space-x-2"
              >
                <p className="btntext">Change password</p>
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
            {ResData.action ? (
              <p className="text-green-500 py-2 text-center w-full">
                {ResData.message}
              </p>
            ) : (
              <p className="text-rose-500 py-2 text-center w-full">
                {ResData.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
