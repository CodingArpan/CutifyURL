import React, { useState, useEffect } from "react";
import Link from "next/link";
import { METHODS } from "http";
interface user {
  fullname: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
}
function SignUp() {
  const [CnfPwdErr, setCnfPwdErr] = useState<boolean>(false);
  const [User, setUser] = useState<user>({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });

  const createAccount = async () => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}+/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(User),
          credentials: "include",
        }
      );
      let res = await req.json();
      res = {
        request: "successfull",
        registration: true,
        message: "Profile created successfully",
      };
      if (res.request == "successfull" && res.registration === true) {
      } else {
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="form py-10 flex flex-col justify-center items-center space-y-5 bg-white rounded-3xl w-1/2">
        <div className="icon">
          <svg
            className="w-10 h-10"
            viewBox="0 0 48 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.1762 45.8962C35.8013 46.3208 46.4001 36.5826 46.849 24.1456C47.2979 11.7089 37.4269 1.28256 24.8018 0.85795C12.1767 0.433342 1.57867 10.1713 1.12978 22.6079C0.680883 35.045 10.5511 45.4716 23.1762 45.8962Z"
              fill="#5D5BDB"
            />
            <path
              d="M14.705 28.6239L14.6555 30.7673L31.9639 31.1389L32.0133 28.9955C32.0791 26.1447 26.3466 24.5852 23.4583 24.5232C20.5699 24.4612 14.7708 25.7732 14.705 28.6239ZM30.0476 20.3757L29.9981 22.5191L33.2437 22.5888L33.1695 25.8036L35.3327 25.85L35.4069 22.6352L38.6525 22.7049L38.702 20.5615L35.4564 20.4918L35.5306 17.2771L33.3673 17.2306L33.2932 20.4454L30.0476 20.3757ZM27.9335 18.1859C27.9881 15.8176 26.0962 13.8579 23.7055 13.8065C21.3149 13.7552 19.3341 15.6319 19.2795 18.0001C19.2248 20.3687 21.117 22.3285 23.5077 22.3798C25.8984 22.4311 27.8788 20.5545 27.9335 18.1859Z"
              fill="white"
            />
          </svg>
        </div>
        <p className="text-xl text-violet-600 font-bold ">
          Create Your Account
        </p>
        <div className="name w-full px-16 flex flex-col space-y-1">
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="fname"
          >
            Full Name
          </label>
          <input
            className="w-full bg-blue-50 rounded-full shadow-inner shadow-blue-500/30 text-sm py-2 px-5 placeholder:text-blue-200"
            onChange={(e) => {
              setUser((details: user) => {
                return { ...details, fullname: e.target.value };
              });
            }}
            type="text"
            name="fname"
            id="fname"
            placeholder="Emily Endson"
          />
        </div>
        <div className="mobile w-full px-16 flex flex-col space-y-1">
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="mobile"
          >
            Mobile No
          </label>
          <input
            className="w-full bg-blue-50 rounded-full shadow-inner shadow-blue-500/30 text-sm py-2 px-5 placeholder:text-blue-200"
            onChange={(e) => {
              setUser((details: user) => {
                return { ...details, mobile: e.target.value };
              });
            }}
            minLength={10}
            maxLength={10}
            type="text"
            name="mobile"
            id="mobile"
            placeholder="+91 - XXXXXXXXXX"
          />
        </div>
        <div className="email w-full px-16 flex flex-col space-y-1">
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="w-full bg-blue-50 rounded-full shadow-inner shadow-blue-500/30 text-sm py-2 px-5 placeholder:text-blue-200"
            onChange={(e) => {
              setUser((details: user) => {
                return { ...details, email: e.target.value };
              });
            }}
            type="email"
            name="email"
            id="email"
            placeholder="youremail@gmail.com"
          />
        </div>
        <div className="pwd w-full px-16 flex flex-col space-y-1">
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="pwd"
          >
            Password
          </label>
          <input
            className="w-full bg-blue-50 rounded-full shadow-inner shadow-blue-500/30 text-sm py-2 px-5 placeholder:text-blue-200"
            onChange={(e) => {
              setUser((details: user) => {
                return { ...details, password: e.target.value };
              });
            }}
            type="password"
            name="pwd"
            id="pwd"
            placeholder="**********"
          />
        </div>
        <div className="cnfpwd w-full px-16 flex flex-col space-y-1">
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="cnfpwd"
          >
            Confirm Password
          </label>
          <input
            className="w-full bg-blue-50 rounded-full shadow-inner shadow-blue-500/30 text-sm py-2 px-5 placeholder:text-blue-200"
            onChange={(e) => {
              if (User.password === e.target.value) {
                setCnfPwdErr(false);

                setUser((details: user) => {
                  return { ...details, confirm_password: e.target.value };
                });
              } else {
                setCnfPwdErr(true);
              }
            }}
            type="password"
            name="cnfpwd"
            id="cnfpwd"
            placeholder="**********"
          />

          {CnfPwdErr ? (
            <p className="text-red-500 px-2 text-xs ">
              Confirm Password is not same
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="btn w-full px-16 pt-5 flex flex-col justify-center items-center space-y-4">
          <button
            onClick={() => {
              createAccount();
            }}
            className="bg-violet-400 shadow-lg shadow-violet-500/30 w-fit px-10 py-2 text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Create +
          </button>
          <p className="text-gray-700 text-sm">
            Already have an account !
            <Link href="/auth/signin">
              <span className=" text-violet-600 px-2 underline cursor-pointer">
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
