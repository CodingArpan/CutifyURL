import React from "react";
import Link from "next/link";
import { AlertPropsType } from "@/components/TypeInterfaces/PropsInterfaces";
function SignIn({
  setAlertdata,
}: {
  setAlertdata: React.Dispatch<React.SetStateAction<AlertPropsType>>;
}) {
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
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md "
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
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md "
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-5">
          <div>
            <button
              type="button"
              className="bg-violet-400 shadow-lg shadow-violet-500/30 w-fit px-10 py-2
               text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95"
            >
              Sign in
            </button>
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
