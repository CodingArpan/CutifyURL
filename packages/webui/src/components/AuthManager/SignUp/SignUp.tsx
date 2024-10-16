import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/ThreeballDropping.module.css";
import { AlertPropsType } from "@/components/TypeInterfaces/PropsInterfaces";
interface user {
  fullname: string;
  mobile: string;
  email: string;
  password: string;
  confirm_password: string;
}

function SignUp({
  setAlertdata,
}: {
  setAlertdata: React.Dispatch<React.SetStateAction<AlertPropsType>>;
}) {
  const router = useRouter();

  const [FormData, setFormData] = useState<user>({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });

  const [Name, setName] = useState<boolean>(true);
  const [Email, setEmail] = useState<boolean>(true);
  const [Mobile, setMobile] = useState<boolean>(true);
  const [Pwd, setPwd] = useState<boolean>(true);
  const [CnfPwd, setCnfPwd] = useState<boolean>(true);

  const [Loader, setLoader] = useState<boolean>(false);

  const checkUserInputData = (
    e: React.ChangeEvent<HTMLInputElement>
  ): boolean => {
    const userInput = e.target.value;
    let dataValidation = false;
    switch (e.target.name) {
      case "fullname":
        const nameRegx = /^[a-zA-Z\s]{3,}/g;
        const nameTest = nameRegx.test(userInput);
        nameTest ? setName(true) : setName(false);
        nameTest ? (e.target.value = e.target.value.toLowerCase()) : "";
        nameTest && (dataValidation = true);
        break;
      case "email":
        const emailRegx =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gi;
        const emailTest = emailRegx.test(userInput);
        emailTest ? setEmail(true) : setEmail(false);
        emailTest ? (e.target.value = e.target.value.toLowerCase()) : "";
        emailTest && (dataValidation = true);
        break;
      case "mobile":
        const mobnumRegx = /[0-9]{10}/g;
        const mobnumTest = mobnumRegx.test(userInput);
        mobnumTest ? setMobile(true) : setMobile(false);
        mobnumTest && (dataValidation = true);
        break;
      case "password":
        const pwdRegx = /[a-zA-Z0-9\!\@\#\$\%\&\-\_\\\/]{6,50}/g;
        const pwdTest = pwdRegx.test(userInput);
        pwdTest ? setPwd(true) : setPwd(false);
        pwdTest && (dataValidation = true);

      case "confirm_password":
        const cnfpwdRegx = /[a-zA-Z0-9\!\@\#\$\%\&\-\_\\\/]{6,50}/g;
        const cnfpwdTest =
          cnfpwdRegx.test(userInput) && userInput === FormData.password;
        cnfpwdTest ? setCnfPwd(true) : setCnfPwd(false);
        cnfpwdTest && (dataValidation = true);
        break;
    }
    return dataValidation;
  };

  const userInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    if (checkUserInputData(e)) {
      setFormData((FormData) => {
        return { ...FormData, [e.target.name]: e.target.value };
      });
      console.log(FormData);
    }
  };

  const sendData = async () // e: React.ChangeEvent<HTMLInputElement>
  : Promise<void> => {
    // e.preventDefault();
    if (
      Name &&
      Email &&
      Mobile &&
      Pwd &&
      CnfPwd &&
      FormData.fullname &&
      FormData.email &&
      FormData.mobile &&
      FormData.password &&
      FormData.confirm_password
    ) {
      setLoader(true);
      console.log("sending your message");
      createAccount();
    } else {
      console.log("error, request can not be send");
      setName(false);
      setEmail(false);
      setMobile(false);
      setPwd(false);
      setCnfPwd(false);
    }
  };

  const createAccount = async (): Promise<void> => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...FormData }),
        }
      );
      let res = await req.json();
      console.log(res);

      if (res.registration === true && res.status == "success") {
        setFormData({
          fullname: "",
          email: "",
          mobile: "",
          password: "",
          confirm_password: "",
        });
        setAlertdata({
          type: res.status,
          title: res.type,
          message: res.message,
          list: [],
        });
        setTimeout(() => {
          router.push("/auth/signin", { scroll: false });
        }, 1500);
      } else if (res.registration === false && res.status == "warning") {
        setAlertdata({
          type: res.status,
          title: res.type.toUpperCase(),
          message: res.message,
          list: Object.values(res.list),
        });
      } else {
        setAlertdata({
          type: res.status,
          title: res.type.toUpperCase(),
          message: res.message,
          list: [],
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

  const formElementDiv: string = "w-full  flex flex-col space-y-1";
  const inputElement: string =
    "w-full border-none outline-none bg-gray-100 rounded-lg  text-sm py-2 px-5 placeholder:text-gray-300";
  const errormesage: string = "text-red-500 px-3 text-xs ";

  return (
    <>
      <div className="form w-full py-10 px-10 flex flex-col justify-center items-center space-y-5 bg-white rounded-3xl ">
        
        <p className="text-xl text-gray-600 font-bold ">Create Your Account</p>
        <p className="text-sm  ">Fill the form rest we will handel</p>
        <form className={`name  ${formElementDiv} `}>
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="fname"
          >
            Full Name
          </label>
          <input
            className={inputElement}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => userInput(e)}
            type="text"
            name="fullname"
            id="fname"
            placeholder="Emily Endson"
          />
          {!Name && (
            <p className={errormesage}>
              Name must be 4 or more characters long and only alphabets
            </p>
          )}
        </form>
        <div className={`mobile ${formElementDiv} `}>
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="mobile"
          >
            Mobile No
          </label>
          <input
            className={inputElement}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => userInput(e)}
            minLength={10}
            maxLength={10}
            type="text"
            name="mobile"
            id="mobile"
            placeholder="+91 - XXXXXXXXXX"
          />
          {!Mobile && (
            <p className={errormesage}>
              Mobile number must be only 10 digits long
            </p>
          )}
        </div>
        <div className={`email ${formElementDiv} `}>
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className={inputElement}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => userInput(e)}
            type="email"
            name="email"
            id="email"
            placeholder="youremail@gmail.com"
          />
          {!Email && <p className={errormesage}>Invalid Email format</p>}
        </div>
        <div className={`pwd ${formElementDiv} `}>
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="pwd"
          >
            Password
          </label>
          <input
            className={inputElement}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => userInput(e)}
            type="password"
            name="password"
            id="pwd"
            placeholder="**********"
          />
          {!Pwd && (
            <p className={errormesage}>
              Password only contains a-z, A-Z, 0-9, !,@,#,$,%,&
            </p>
          )}
        </div>
        <div className={`cnfpwd ${formElementDiv} `}>
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="cnfpwd"
          >
            Confirm Password
          </label>
          <input
            className={inputElement}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => userInput(e)}
            type="password"
            name="confirm_password"
            id="cnfpwd"
            placeholder="**********"
          />
          {!CnfPwd && <p className={errormesage}>Different from password</p>}
        </div>
        <div className="btn w-full px-16 pt-5 flex flex-col justify-center items-center space-y-4">
          {!Loader && (
            <button
              disabled={!(Name && Email && Mobile && Pwd && CnfPwd)}
              type="button"
              onClick={() => {
                sendData();
              }}
              className="bg-orange-400 shadow-lg shadow-orange-500/30 w-fit px-10 py-2 text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95"
            >
              Create +
            </button>
          )}
          {Loader && (
            <button className="bg-gray-800 flex flex-row  items-center shadow-lg shadow-violet-500/30 w-fit px-5 py-2 text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95">
              <p className="">Creating</p>
              <div className={styles.loader}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
              </div>
            </button>
          )}
          <p className="text-gray-700 text-sm">
            Already have an account !
            <Link href="/auth/signin">
              <span className=" text-orange-600 px-2 underline cursor-pointer">
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
