import React from "react";
import { Props } from "./Manager.Index";
const Optionsbar = ({ Active, setActive }: Props) => {
  return (
    <div className="optionsbar flex flex-row min-w-full capitalize text-blue-600 text-base p-2  justify-center  space-x-5">
      <input
        className="hidden peer/dashboard"
        type="radio"
        name="selectone"
        id="dashboard_label"
        defaultChecked
        onChange={(): void => {
          setActive(() => {
            return "Dashboard";
          });
        }}
      />
      <label
        htmlFor="dashboard_label"
        className={` rounded-lg flex flex-row justify-start items-center space-x-2 cursor-pointer py-2 px-4 my-1 ${
          Active == "Dashboard"
            ? "peer-checked/dashboard:bg-blue-500 peer-checked/dashboard:text-white bg-blue-500 text-white"
            : "hover:bg-blue-50"
        }`}
      >
        <div className="icon">
          <svg
            stroke="currentColor"
            fill="currentColor"
            className="w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M448 416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416zM256 160C256 142.3 241.7 128 224 128H128C110.3 128 96 142.3 96 160C96 177.7 110.3 192 128 192H224C241.7 192 256 177.7 256 160zM128 224C110.3 224 96 238.3 96 256C96 273.7 110.3 288 128 288H320C337.7 288 352 273.7 352 256C352 238.3 337.7 224 320 224H128zM192 352C192 334.3 177.7 320 160 320H128C110.3 320 96 334.3 96 352C96 369.7 110.3 384 128 384H160C177.7 384 192 369.7 192 352z" />
          </svg>
        </div>
        <p className="">Dashboard</p>
      </label>

      <input
        className="hidden peer/Filtersearch"
        type="radio"
        name="selectone"
        id="FilterSearch_label"
        onChange={(): void => {
          setActive(() => {
            return "LinkAnalyticsIndex";
          });
        }}
      />
      <label
        htmlFor="FilterSearch_label"
        className="hover:bg-blue-50 rounded-lg flex flex-row justify-start items-center space-x-2 cursor-pointer py-2 px-4 my-1 peer-checked/Filtersearch:bg-blue-500 peer-checked/Filtersearch:text-white"
      >
        <div className="icon">
          <svg
            className="w-5"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2z"></path>
            <path d="M15 9l.94-2.07L18 6l-2.06-.93L15 3l-.92 2.07L12 6l2.08.93zM3.5 11L4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9z"></path>
          </svg>
        </div>
        <p className="">Links & Analytics</p>
      </label>

      <input
        className="hidden peer/Account"
        type="radio"
        name="selectone"
        id="account_label"
        onChange={(): void => {
          setActive(() => {
            return "Accounts";
          });
        }}
      />
      <label
        htmlFor="account_label"
        className="hover:bg-blue-50 rounded-lg flex flex-row justify-start items-center space-x-2 cursor-pointer py-2 px-4 my-1 peer-checked/Account:bg-blue-500 peer-checked/Account:text-white"
      >
        <div className="icon">
          <svg
            stroke="currentColor"
            fill="currentColor"
            className="w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
          </svg>
        </div>
        <p className="">Account</p>
      </label>
    </div>
  );
};

export default Optionsbar;
