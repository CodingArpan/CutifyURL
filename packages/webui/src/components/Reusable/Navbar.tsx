import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserType } from "../TypeInterfaces/PropsInterfaces";

interface PropType {
  User: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}
const Navbar = ({ User, setUser }: PropType): JSX.Element => {
  const logOut = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: User?.ref }),
    })
      .then(async (res) => {
        const response = await res.json();
        return response;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUser(null);
      });
  };

  return (
    <div className="w-full bg-transparent text-custom_blue">
      <div className="relative w-full max-w-6xl mx-auto py-3 px-10 flex flex-row justify-between items-center">
        <div className="brand text-3xl font-bold text-custom_blue px-4 py-1 cursor-pointer ">
          CutifyURL
        </div>

        <div
          className={`options flex flex-row justify-evenly items-center capitalize space-x-12 tracking-wider  font-semibold text-base `}
        >
          <div className="px-2 py-1.5  cursor-pointer  ">pricing</div>
          {!User && (
            <Link href="/auth/signup">
              <div className="px-8 py-1.5 rounded-full bg-custom_blue  cursor-pointer  block text-white ">
                sign up
              </div>
            </Link>
          )}
          {!User && (
            <Link href="/auth/signin">
              <div className="px-8 py-1.5 rounded-full border-2 border-custom_blue text-custom_blue  cursor-pointer  block ">
                log in
              </div>
            </Link>
          )}
          {User && (
            <button
              onClick={() => logOut()}
              className="px-3 py-1  cursor-pointer bg-gray-800
             rounded-full text-white text-sm  hover:scale-105 hover:bg-blue-500  active:scale-95"
            >
              Logout
            </button>
          )}
          {User && (
            <div className=" rounded-full border-4 border-custom_blue">
              <div
                className="w-12 h-12 rounded-full  border-2 border-white 
             bg-[url('https://media.licdn.com/dms/image/D4D35AQGZZA8W825mMg/profile-framedphoto-shrink_400_400/0/1690870287630?e=1694430000&v=beta&t=NI9jA8ByOl6pNahADVGuv-19YV6PHmf__AjcO9Ydx9c')]
              bg-center bg-cover"
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
