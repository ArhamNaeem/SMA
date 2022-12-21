import React from "react";
import { auth, googleProvider, facebookProvider } from "../config/firebase";
import { Link , useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
export default function Login() {
const navigate = useNavigate();

  const signInGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    navigate('\timelime')
    };
    const signInFacebook = async () => {
      await signInWithPopup(auth, facebookProvider);
    navigate("\timelime");

  };

  return (
    <>
      <div className="container p-10 h-screen flex justify-between items-center text-blue-300 drop-shadow-sm">
        <img className=" w-6/12 p-2 mr-3" src="img.jpg" />
       <div className="flex flex-col h-4/5 w-screen">
          <p className="font-bold text-4xl text-center">Posts</p> 

          <div className="flex flex-col items-center p-2 m-2">
            <input
              type="text"
              name="name"
              id="uName"
              className="p-3 m-3 ml-0 bg-transparent border-2 border-blue rounded-md outline-none hover:border-blue-200 w-4/5"
              placeholder="Username.."
            />
            <input
              type="password"
              name="password"
              id="uPass"
              className=" p-3 m-3 ml-0 bg-transparent outline-none border-2 border-blue rounded-md hover:border-blue-200 w-4/5"
              placeholder="Password.."
            />
            <button className="w-10/12 text-white bg-blue-300 p-2 rounded-md m-4 ml-0 transition-all hover:scale-105">
              Sign In
            </button>
            <Link to={"/signUp"}>
              <button className="text-sm relative sm:left-14 xl:left-48 bottom-3 hover:text-blue-500">
                Sign up
              </button>
            </Link>
            <p
              onClick={signInFacebook}
              className="border-t cursor-pointer p-2 text-lg mt-2 w-full text-center hover:text-blue-500"
            >
              Sign in with Facebook
            </p>
            <p
              onClick={signInGoogle}
              className=" border-t cursor-pointer p-2 text-lg mt-4 w-full text-center hover:text-blue-500"
            >
              Sign in with Google
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
