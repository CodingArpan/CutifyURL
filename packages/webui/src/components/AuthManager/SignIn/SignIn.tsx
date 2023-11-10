import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/ThreeballDropping.module.css";
import { AlertPropsType } from "@/components/TypeInterfaces/PropsInterfaces";

interface LoginCredentialsType {
  email: string;
  password: string;
}

function SignIn({
  setAlertdata,
}: {
  setAlertdata: React.Dispatch<React.SetStateAction<AlertPropsType>>;
}) {
  const router = useRouter();

  const [LoginCredentials, setLoginCredentials] =
    useState<LoginCredentialsType>({
      email: "",
      password: "",
    });

  const [Email, setEmail] = useState<boolean>(true);
  const [Pwd, setPwd] = useState<boolean>(true);

  const [Loader, setLoader] = useState<boolean>(false);

  const checkUserInputData = (
    e: React.ChangeEvent<HTMLInputElement>
  ): boolean => {
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
      case "password":
        const pwdRegx = /[a-zA-Z0-9\!\@\#\$\%\&\-\_\\\/]{6,50}/g;
        const pwdTest = pwdRegx.test(userInput);
        pwdTest ? setPwd(true) : setPwd(false);
        pwdTest && (dataValidation = true);
        break;
    }
    return dataValidation;
  };

  const userInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    if (checkUserInputData(e)) {
      setLoginCredentials((LoginCredentials) => {
        return {
          ...LoginCredentials,
          [e.target.name]: e.target.value,
        };
      });
      console.log(FormData);
    }
  };

  const sendData = async () // e: React.ChangeEvent<HTMLInputElement>
  : Promise<void> => {
    // e.preventDefault();
    if (Email && Pwd && LoginCredentials.email && LoginCredentials.password) {
      setLoader(true);
      console.log("sending your message");
      requestLogin();
    } else {
      console.log("error, request can not be send");
      setEmail(false);
      setPwd(false);
    }
  };

  const requestLogin = async (): Promise<void> => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        {
          mode: "cors",
          method: "post",
          headers: [["Content-Type", "application/json"]],
          credentials: "include",
          body: JSON.stringify({ ...LoginCredentials }),
        }
      );
      let res = await req.json();
      console.log(res);

      if (res.authentication === true) {
        setLoginCredentials({
          email: "",
          password: "",
        });
        setAlertdata({
          type: "success",
          title: "Authentication Successfull",
          message: res.message,
        });
        setTimeout(() => {
          router.push("/", { scroll: false });
        }, 1500);
      } else if (res.authentication === false) {
        setAlertdata({
          type: "warning",
          title: "Authentication Failed",
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
    <div className="form w-full py-10 px-20  flex flex-col justify-center items-center space-y-5 bg-white rounded-3xl ">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign in</h1>
        <p className="text-sm ">Sign in to access your account</p>
      </div>
      <form className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email Address / Phone Number
            </label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                userInput(e)
              }
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border outline-none rounded-md "
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <Link href="/auth/forgetpassword">
                <span className="text-xs hover:underline ">
                  Forgot password?
                </span>
              </Link>
            </div>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                userInput(e)
              }
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-3 py-2 border outline-none rounded-md "
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-5">
          <div>
            {!Loader && (
              <button
                onClick={() => {
                  sendData();
                }}
                type="button"
                className="bg-violet-400 shadow-lg shadow-violet-500/30 w-fit px-10 py-2
               text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95"
              >
                Sign in
              </button>
            )}
            {Loader && (
              <button className="bg-gray-800 flex flex-row  items-center shadow-lg shadow-violet-500/30 w-fit px-5 py-2 text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95">
                <p className="">Verifying</p>
                <div className={styles.loader}>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                </div>
              </button>
            )}
          </div>
          <p className="w-full px-6 text-sm text-center ">
            Don&#39;t have an account yet?
            <Link href="/auth/signup">
              <span className="underline text-sm text-violet-500 cursor-pointer px-2">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
