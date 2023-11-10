import React, { useState, useMemo, useContext } from "react";
import { AlertContext } from "@/components/ContextManager/AlertContextProvider/AlertContext";
import { AlertContextType } from "@/components/TypeInterfaces/ContextInterfaces";
import { AlertPropsType } from "@/components/TypeInterfaces/PropsInterfaces";

function InformAlert({
  type,
  title,
  message,
  list,
}: AlertPropsType): React.JSX.Element {
  const context = useContext(AlertContext);
  const { Visibility, setVisibility } = context as AlertContextType;

  return (
    <div
      id="alertbox"
      className="w-full p-4 bg-black/0 fixed z-20 flex justify-end items-center -top-20"
    >
      <div
        className="flex  w-full max-w-sm
     overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 "
      >
        <AlertIcon type={type} />
        <div className="px-4 py-2 -mx-3">
          <div className="mx-3">
            <AlertTitle type={type} title={title} />
            <p className="text-sm text-gray-600 dark:text-gray-200">
              {message}
            </p>
            <ul className="list-disc mt-2 text-sm text-gray-600 dark:text-gray-400 pl-5">
              {list?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
        <CloseButton setVisibility={setVisibility} />
      </div>
    </div>
  );
}

export default InformAlert;

const AlertIcon = ({
  type,
}: {
  type: AlertPropsType["type"];
}): React.JSX.Element => {
  switch (type) {
    case "success":
      return (
        <div className="flex px-2 items-center justify-center w-12 bg-emerald-500">
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
          </svg>
        </div>
      );
      break;
    case "error":
      return (
        <div className="flex px-2 items-center justify-center w-12 bg-red-500">
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
          </svg>
        </div>
      );
      break;
    case "warning":
      return (
        <div className="flex px-2 items-center justify-center w-12 bg-yellow-400">
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
          </svg>
        </div>
      );
      break;
    default:
      return (
        <div className="flex px-2 items-center justify-center w-12 bg-emerald-500">
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
          </svg>
        </div>
      );
      break;
  }
};

const AlertTitle = ({
  type,
  title,
}: {
  type: AlertPropsType["type"];
  title?: string;
}): React.JSX.Element => {
  switch (type) {
    case "success":
      return (
        <span className=" capitalize font-semibold text-emerald-500 dark:text-emerald-400">
          {title}
        </span>
      );
      break;
    case "error":
      return (
        <span className=" capitalize font-semibold text-red-500 dark:text-red-400">
          {title}
        </span>
      );
      break;
    case "warning":
      return (
        <span className=" capitalize font-semibold text-yellow-400 dark:text-yellow-300">
          {title}
        </span>
      );
      break;
    default:
      return (
        <span className=" capitalize font-semibold text-blue-500 dark:text-blue-400">
          {title}
        </span>
      );
      break;
  }
};

const CloseButton = ({
  setVisibility,
}: {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => {
        setVisibility(false);
      }}
      className="p-3 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-500 focus:outline-none text-black dark:text-white"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 18L18 6M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
