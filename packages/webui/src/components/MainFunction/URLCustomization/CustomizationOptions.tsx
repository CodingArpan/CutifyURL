"use client";
import React, { useState } from "react";
import { Props, PropsModal, Dataset } from "../MainFunction.index";
import CustomizationForm from "./CustomizationForm";
import { Jost } from "next/font/google";
const jost = Jost({ weight: "400", subsets: ["latin"] });
const Minifyoptions = (props: Props): JSX.Element => {
  let { ActivateBtn, setData } = props;

  const [Modal, setModal] = useState<boolean>(false);

  return (
    <div
      style={jost.style}
      className={`flex flex-row justify-center items-center md:space-x-10 mob_only:space-y-10 mob_only:flex-wrap ${
        ActivateBtn ? "" : "mob_only:pt-8"
      }`}
    >
      {ActivateBtn && (
        <input
          onChange={() => setModal(true)}
          className="hidden"
          type="checkbox"
          name="modal"
          id="modal"
        />
      )}

      {ActivateBtn && (
        <CustomizationForm
          Modal={Modal}
          setModal={setModal}
          setData={setData}
        />
      )}

      <div className="relative flex flex-row justify-evenly md:items-center items-start md:space-x-10 mob_only:w-full">
        <label
          htmlFor="modal"
          className={`trackurl flex flex-row justify-between items-center space-x-3 cursor-pointer before:opacity-0 before:invisible hover:before:visible hover:before:opacity-100 ${
            ActivateBtn
              ? "before:content-['Active'] "
              : "before:content-['Inactive'] "
          } before:w-fit before:px-5 before:py-1 before:absolute before:z-0 before:top-8 before:bg-gray-700 before:text-gray-200 before:rounded-xl before:transition-all before:ease-in-out before:duration-300`}
        >
          <div className="icon">
            <svg
              className="w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078zM256 444.8C393.1 378 431.1 230.1 432 141.4L256 66.77L256 444.8z"
                fill={`${ActivateBtn ? "#6C6C6C" : "rgb(209 213 219)"}`}
              />
            </svg>
          </div>
          <p
            className={` whitespace-nowrap text-sm sm:text-base ${
              ActivateBtn ? "text-gray-500" : "text-gray-300"
            }`}
          >
            Add Password
          </p>
        </label>

        <label
          htmlFor="modal"
          className={`trackurl flex flex-row justify-between items-center space-x-3 cursor-pointer before:opacity-0 before:invisible hover:before:visible hover:before:opacity-100 ${
            ActivateBtn
              ? "before:content-['Active'] "
              : "before:content-['Inactive'] "
          } before:w-fit before:px-5 before:py-1 before:absolute before:z-0 before:top-8 before:bg-gray-700 before:text-gray-200 before:rounded-xl before:transition-all before:ease-in-out before:duration-300`}
        >
          <div className="icon">
            <svg
              className="w-5 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M282.3 343.7L248.1 376.1C244.5 381.5 238.4 384 232 384H192V424C192 437.3 181.3 448 168 448H128V488C128 501.3 117.3 512 104 512H24C10.75 512 0 501.3 0 488V408C0 401.6 2.529 395.5 7.029 391L168.3 229.7C162.9 212.8 160 194.7 160 176C160 78.8 238.8 0 336 0C433.2 0 512 78.8 512 176C512 273.2 433.2 352 336 352C317.3 352 299.2 349.1 282.3 343.7zM376 176C398.1 176 416 158.1 416 136C416 113.9 398.1 96 376 96C353.9 96 336 113.9 336 136C336 158.1 353.9 176 376 176z"
                fill={`${ActivateBtn ? "#6C6C6C" : "rgb(209 213 219)"}`}
              />
            </svg>
          </div>
          <p
            className={` whitespace-nowrap text-sm sm:text-base ${
              ActivateBtn ? "text-gray-500" : "text-gray-300"
            }`}
          >
            Use Custom Keyword
          </p>
        </label>
      </div>

      <div className="relative flex flex-row justify-evenly md:items-center items-start md:space-x-10 mob_only:w-full">
        <label
          htmlFor="modal"
          className={`trackurl flex flex-row justify-between items-center space-x-3 cursor-pointer before:opacity-0 before:invisible hover:before:visible hover:before:opacity-100 ${
            ActivateBtn
              ? "before:content-['Active'] "
              : "before:content-['Inactive'] "
          } before:w-fit before:px-5 before:py-1 before:absolute before:z-0 before:top-8 before:bg-gray-700 before:text-gray-200 before:rounded-xl before:transition-all before:ease-in-out before:duration-300`}
        >
          <div className="icon">
            <svg
              className="w-5 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M144 32C170.5 32 192 53.49 192 80V176C192 202.5 170.5 224 144 224H48C21.49 224 0 202.5 0 176V80C0 53.49 21.49 32 48 32H144zM128 96H64V160H128V96zM144 288C170.5 288 192 309.5 192 336V432C192 458.5 170.5 480 144 480H48C21.49 480 0 458.5 0 432V336C0 309.5 21.49 288 48 288H144zM128 352H64V416H128V352zM256 80C256 53.49 277.5 32 304 32H400C426.5 32 448 53.49 448 80V176C448 202.5 426.5 224 400 224H304C277.5 224 256 202.5 256 176V80zM320 160H384V96H320V160zM352 448H384V480H352V448zM448 480H416V448H448V480zM416 288H448V416H352V384H320V480H256V288H352V320H416V288z"
                fill={`${ActivateBtn ? "#6C6C6C" : "rgb(209 213 219)"}`}
              />
            </svg>
          </div>
          <p
            className={` whitespace-nowrap text-sm sm:text-base ${
              ActivateBtn ? "text-gray-500" : "text-gray-300"
            }`}
          >
            Generate QR Code
          </p>
        </label>

        <label
          htmlFor="modal"
          className={`trackurl flex flex-row justify-between items-center space-x-3 cursor-pointer before:opacity-0 before:invisible hover:before:visible hover:before:opacity-100 ${
            ActivateBtn
              ? "before:content-['Active'] "
              : "before:content-['Inactive'] "
          } before:w-fit before:px-5 before:py-1 before:absolute before:z-0 before:top-8 before:bg-gray-700 before:text-gray-200 before:rounded-xl before:transition-all before:ease-in-out before:duration-300`}
        >
          <div className="icon">
            <svg
              className="w-5 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M176 256C176 211.8 211.8 176 256 176C300.2 176 336 211.8 336 256C336 300.2 300.2 336 256 336C211.8 336 176 300.2 176 256zM256 0C273.7 0 288 14.33 288 32V66.65C368.4 80.14 431.9 143.6 445.3 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H445.3C431.9 368.4 368.4 431.9 288 445.3V480C288 497.7 273.7 512 256 512C238.3 512 224 497.7 224 480V445.3C143.6 431.9 80.14 368.4 66.65 288H32C14.33 288 0 273.7 0 256C0 238.3 14.33 224 32 224H66.65C80.14 143.6 143.6 80.14 224 66.65V32C224 14.33 238.3 0 256 0zM128 256C128 326.7 185.3 384 256 384C326.7 384 384 326.7 384 256C384 185.3 326.7 128 256 128C185.3 128 128 185.3 128 256z"
                fill={`${ActivateBtn ? "#6C6C6C" : "rgb(209 213 219)"}`}
              />
            </svg>
          </div>
          <p
            className={` whitespace-nowrap text-sm sm:text-base ${
              ActivateBtn ? "text-gray-500" : "text-gray-300"
            }`}
          >
            Track URL Clicks
          </p>
        </label>
      </div>
    </div>
  );
};

export default Minifyoptions;
