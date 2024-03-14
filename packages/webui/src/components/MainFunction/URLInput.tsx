"use client";
import React, { useState } from "react";
import { Props, PropsModal, Dataset } from "./MainFunction.index";
import styles from "@/styles/ThreeballDropping.module.css";
const InputURL = (props: Props): JSX.Element => {
  let { setActivateBtn, ActivateBtn, setData, Data } = props;
  const [ValidURL, setValidURL] = useState<boolean>(true);
  const [MinifiedURL, setMinifiedURL] = useState<boolean>(false);
  const [Loader, setLoader] = useState<boolean>(false);

  const request_minified_url = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoader(true);
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/url/short`, {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(Data),
    })
      .then(async (response) => {
        const result = await response.json();
        if (result.request === "successfull") {
          setActivateBtn(false);
          const minifyreq = document.getElementById(
            "minifyreq"
          ) as HTMLFormElement | null;
          minifyreq!.reset();
          setMinifiedURL(true);
          const minifiedurl = `${process.env.NEXT_PUBLIC_UI_URL}/${result.keyword}`;
          const url_input = document.getElementById(
            "destination"
          ) as HTMLInputElement | null;
          url_input!.value = minifiedurl;
        } else if (result.request === "failed") {
          alert(result.message);
          const check = document.getElementById("modal") as HTMLInputElement;
          check.click();
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      });
  };

  const copy_minified_url = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const url_input = document.getElementById(
      "destination"
    ) as HTMLInputElement | null;

    const target = e.target as HTMLElement;

    navigator.clipboard.writeText(url_input!.value).then(() => {
      target.innerHTML = "copied!";
      setTimeout(() => {
        target.innerHTML = "copy";
      }, 400);
    });
  };

  const resetAll = () => {
    setActivateBtn(false);
    setValidURL(true);
    setMinifiedURL(false);
    setData({
      destination: "",
      custom: false,
      keyword: "",
      secure: false,
      password: "",
      login: false,
      userid: "",
      track: false,
    });
    const minifyreq = document.getElementById(
      "minifyreq"
    ) as HTMLFormElement | null;
    minifyreq!.reset();
  };

  const paste = async (
    e: React.FocusEvent<HTMLInputElement, Element>
  ): Promise<void> => {
    try {
      const text: string = await navigator.clipboard.readText();
      e.target.value = text;
      checkinputval(e);
    } catch (err) {}
  };

  const checkinputval = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const val: string = e.target.value;
    console.log(val);

    if (val !== "") {
      const validurl: boolean = new RegExp(
        /^(((https|http):\/{2})([a-z0-9\-\.]{2,33})\.([a-z0-9]{2,33}))([a-zA-Z0-9\/\-\.\+\=\&\#\?\%\_\\\$\:\;\,\<\>]{0,})?/g
      ).test(val);
      if (validurl) {
        setValidURL(true);
        setActivateBtn(true);
        setData((value): Dataset => {
          return { ...value, [e.target.name]: val };
        });
      } else {
        setValidURL(false);
        setActivateBtn(false);
      }
      console.log(validurl);
    } else {
      setValidURL(true);
      setActivateBtn(false);
    }
  };

  return (
    <>
      <div
       
        className={`bg-blue-50 border border-blue-400/10 relative  border-solid shadow-lg shadow-blue-500/30 rounded-full flex flex-row justify-between items-center p-2.5  before:w-full  before:text-lg before:text-red-400 before:absolute before:-top-9 before:capitalize before:z-50 ${
          ValidURL ? "" : "before:content-['It_is_not_a_valid_URL_⚠️']"
        }`}
      >
        <input
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
            !MinifiedURL ? checkinputval(e) : "";
          }}
          onFocus={(e: React.FocusEvent<HTMLInputElement, Element>): void => {
            !MinifiedURL ? paste(e) : "";
          }}
          className="text-gray-500 text-lg px-3 mr-2 font-normal w-full  rounded-full outline-none border-none tracking-wider bg-transparent"
          type="text"
          name="destination"
          id="destination"
          placeholder="Paste Your Link Here : www.your_url.com/*"
        />

        <div className="flex flex-row justify-center items-center space-x-5 mob_only:absolute mob_only:-bottom-14  mob_only:w-full mob_only:right-0  ">
          <button
            onClick={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ): void => {
              e.preventDefault();
              resetAll();
            }}
            className={`minifybtn font-semibold text-base capitalize px-10 py-1 border-2 border-custom_blue  text-custom_blue hover:scale-105 active:scale-90
                   rounded-full cursor-pointer  transition-all ease-in-out duration-200 `}
          >
            clear
          </button>

          {!MinifiedURL && !Loader && (
            <button
              onClick={(
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ): void => {
                e.preventDefault();
                ActivateBtn ? request_minified_url(e) : "";
              }}
              className={`minifybtn font-semibold text-base capitalize px-10 py-1  ${
                ActivateBtn
                  ? " border-2 border-violet-500 bg-violet-200 text-violet-800 hover:scale-105 active:scale-90"
                  : "bg-gray-300 text-gray-600"
              } rounded-full cursor-pointer  transition-all ease-in-out duration-200 `}
            >
              <p className="">minify</p>
            </button>
          )}

          {Loader && (
            <button
              className="minifybtn font-semibold text-base capitalize px-5 py-1
              rounded-full cursor-pointer  transition-all ease-in-out duration-200 bg-gray-800 text-gray-300
              flex flex-row justify-center items-center space-x-5"
            >
              <p className="">minifing...</p>
              <div className={styles.loader}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
              </div>
            </button>
          )}

          {MinifiedURL && !Loader && (
            <button
              onClick={(
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ): void => {
                e.preventDefault();
                copy_minified_url(e);
              }}
              className={`minifybtn font-normal w-max text-base capitalize px-10 py-1 bg-slate-700 hover:bg-slate-800 text-white rounded-full cursor-pointer hover:scale-105 active:scale-90 transition-all ease-in-out duration-200 `}
            >
              copy
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputURL;
