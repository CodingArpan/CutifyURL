"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Script from "next/script";
import ThreeDotLoadingAnimation from "@/components/Reusable/ThreeDotLoadingAnimation";
import Notfound404 from "@/components/Reusable/Notfound404";
interface datapass {
  security?: boolean;
  destination?: string;
  pathid?: string;
  refid: string;
  message?: string;
}

const Redirectpath = (): React.JSX.Element => {
  const params = useParams();
  let pathID = params.pathid;

  const [Input, setInput] = useState<string>("");
  const [Incorrect, setIncorrect] = useState<boolean>(false);
  const [WrongFormat, setWrongFormat] = useState<boolean>(false);
  const [Hidepass, setHidepass] = useState<boolean>(true);

  const [Pdata, setPdata] = useState<datapass>({
    security: false,
    destination: "",
    pathid: "",
    refid: "",
    message: "",
  });

  useEffect(() => {
    if (Pdata.destination == "") {
      const getPathData = async (pathID: String | String[]) => {
        console.log("----------Request path data-----------");
        let info: datapass;
        try {
          const response: Response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/redirect/pathid`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ pathID }),
            }
          );
          const data: datapass = await response.json();
          info = { ...data };
          setPdata({ ...info });
        } catch (err) {
          console.log(err);
          info = { refid: "0", message: "next server error" };
          setPdata({ ...info });
        }
      };
      getPathData(pathID);
    }

    let userdetails: any;
    try {
      let canvas = document.createElement("canvas") as HTMLCanvasElement;
      let webgl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      // console.log(webgl);
      if (webgl) {
        // @ts-ignore
        let debugInfo = webgl.getExtension("webgl_debug_renderer_info");
        // @ts-ignore
        var gpu = webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      } else {
        var gpu = null;
      }

      try {
        // @ts-ignore
        var userAgentData = window.navigator.userAgentData;
      } catch (error) {
        var userAgentData = null;
      }

      userdetails = {
        user_screen: {
          height: window.screen.height,
          width: window.screen.width,
          colorDepth: window.screen.colorDepth,
          pixelDepth: window.screen.pixelDepth,
          orientation: {
            angle: window.screen.orientation.angle,
            type: window.screen.orientation.type,
          },
        },

        user_device: {
          os: userAgentData ? userAgentData.platform : null,
          platform: window.navigator.platform,
          mobile: userAgentData ? userAgentData.mobile : true,
          gpu_info: gpu,
          cpu_threads: window.navigator.hardwareConcurrency,
          maxTouchPoints: window.navigator.maxTouchPoints,
        },
        user_browser: {
          browser: userAgentData ? userAgentData.brands[2] : null,
          language: window.navigator.languages,
          user_agent: window.navigator.userAgent,
          appVersion: window.navigator.appVersion,
        },
        user_info: {},
        pathid: Pdata.pathid,
        refid: Pdata.refid,
      };

      // console.log(userdetails);
    } catch (err) {}
    const sendanalytics = async () => {
      const user = await fetch("https://api.seeip.org/geoip", {
        method: "GET",
      });
      const user_info = await user.json();

      userdetails.user_info = user_info;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/redirect/data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userdetails),
        }
      );

      const finalres = await response.json();

      console.log(finalres);

      if (
        Pdata.destination != "" &&
        Pdata.security === false &&
        finalres.request
      ) {
        window.location.replace(Pdata.destination!);
      }
    };

    sendanalytics();

    if (Pdata.destination != "" && Pdata.security === false) {
      setTimeout(() => {
        window.location.replace(Pdata.destination!);
      }, 3000);
    }
  }, [Pdata, pathID]);

  if (Pdata.refid === "0") {
    return (
      <>
        <Notfound404 />
      </>
    );
  }

  const validatepassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();

    const inputdata: boolean = new RegExp(/[a-zA-Z0-9]{6,}/g).test(Input);

    if (inputdata) {
      const res: Response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/redirect/protection`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            securecode: Input,
            pathid: Pdata.pathid,
            refid: Pdata.refid,
          }),
        }
      );

      const data = await res.json();

      if (data.authentication === "successfull" && data.destination) {
        window.location.replace(data.destination);
      } else {
        const form = document.getElementById("password") as HTMLFormElement;
        form.reset();
        setInput("");
        setIncorrect(true);
        setTimeout(() => {
          setIncorrect(false);
        }, 3000);
      }
    } else {
      setWrongFormat(true);
    }
  };

  const dataInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputdata: boolean = new RegExp(/[a-zA-Z0-9]{6,}/g).test(
      e.target.value
    );
    if (inputdata) {
      setInput(e.target.value);
      setWrongFormat(false);
    } else {
      setWrongFormat(true);
    }
  };

  return (
    <>
      {Pdata.security && (
        <div className="container mx-auto my-[calc(100vh/8)] flex w-full max-w-fit flex-col items-center justify-center space-y-3 ">
          <div className="secure w-40">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
              <defs>
                <linearGradient
                  id="0"
                  gradientUnits="userSpaceOnUse"
                  y1="227.63"
                  x2="0"
                  y2="171.63"
                >
                  <stop stopColor="#2fae61" />
                  <stop offset="1" stopColor="#4bdf88" />
                </linearGradient>
              </defs>
              <g transform="matrix(.92857 0 0 .92857-676.99-152.79)">
                <path
                  d="m789.32 182.93c-.017-1.302-1.019-2.377-2.315-2.496-10.772-1.01-19.563-6.764-22.461-8.87-.606-.442-1.426-.442-2.032 0-2.893 2.106-11.683 7.863-22.456 8.87-1.296.119-2.293 1.194-2.315 2.496-.13 8.497 1.234 37.34 25.14 43.762.425.113.872.113 1.296 0 23.905-6.413 25.27-35.27 25.14-43.762"
                  fill="url(#0)"
                />
                <path
                  d="m773.85 193.97l-1.89-1.89c-.259-.259-.574-.389-.945-.389-.371 0-.686.13-.945.389l-9.116 9.13-4.085-4.099c-.259-.259-.574-.389-.945-.389-.371 0-.686.13-.945.389l-1.89 1.89c-.259.259-.389.574-.389.945 0 .37.13.686.389.945l5.03 5.03 1.89 1.89c.259.259.574.389.945.389.37 0 .685-.13.945-.389l1.89-1.89 10.06-10.06c.259-.259.389-.574.389-.945 0-.37-.13-.685-.389-.945"
                  fill="#fff"
                  fillOpacity=".851"
                />
              </g>
            </svg>
          </div>
          <span className="currenturl text-center text-sm font-normal">
            {`${process.env.NEXT_PUBLIC_UI_URL}/${Pdata.pathid}`}
          </span>
          <span className="warning text-center text-lg font-semibold capitalize text-blue-500">
            This url is password protected 🔐
          </span>
          <form id="password">
            <div className="pass relative flex flex-col items-center justify-center space-y-4">
              <div
                onClick={() => {
                  setHidepass((val) => {
                    return !val;
                  });
                }}
                className="w-max flex justify-end items-end absolute right-0 top-5  cursor-pointer p-2"
              >
                {!Hidepass && (
                  <svg
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z" />
                  </svg>
                )}

                {Hidepass && (
                  <svg
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
                  </svg>
                )}
              </div>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dataInput(e);
                }}
                className="w-60 rounded-full py-2 px-5 text-center outline outline-1 outline-blue-500"
                type={Hidepass ? "password" : "text"}
                name="pass"
                id="pass"
                required
                placeholder="Enter Password"
              />

              {Incorrect && (
                <span className="incorrect text-center capitalize text-red-500">
                  ⚠️ incorrect password, try again
                </span>
              )}
              {WrongFormat && (
                <span className="wrongpass  text-center capitalize text-red-500">
                  ⚠️ Password must be atleast
                  <br />6 characters long and contains
                  <br />
                  only alphabets and numbers
                </span>
              )}
              <button
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  validatepassword(e);
                }}
                id="loginform"
                type="button"
                className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 duration-200 hover:scale-105 active:scale-95"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      {!Pdata.security && <ThreeDotLoadingAnimation />}
    </>
  );
};

export default Redirectpath;
