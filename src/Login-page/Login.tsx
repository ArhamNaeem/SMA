import React, { useState } from "react";
import { auth, googleProvider, facebookProvider } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [msg, setMsg] = useState<string>("");
   const [style, setStyle] = useState("w-screen h-12");
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setStyle(
        "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
      );
      setMsg("Signed in");
      setTimeout(() => {
        setStyle("w-screen h-12");
        setMsg("");
        navigate("/timeline");
      }, 1000);
   
    }
    catch (e) {
      console.log(e)
         setStyle(
           "w-screen h-12 bg-blue-200 text-xl text-center text-white p-2 font-md"
         );
         setMsg("Invalid information");
         setTimeout(() => {
           setStyle("w-screen h-12");
           setMsg("");
         }, 1000);
    }
  }

  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setStyle(
        "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
      );
      setMsg("Signed in");
      setTimeout(() => {
        setStyle("w-screen h-12");
        setMsg("");
        navigate("/timeline");
      }, 1000);
    } catch (e) {
      setStyle(
        "w-screen h-12 bg-blue-200 text-xl text-center text-white p-2 font-md"
      );
      setMsg("Invalid information");
      setTimeout(() => {
        setStyle("w-screen h-12");
        setMsg("");
      }, 1000);
    }
    };
  const signInFacebook = async () => {
      try {
        await signInWithPopup(auth, facebookProvider);
        setStyle(
          "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
        );
        setMsg("Signing in");
        setTimeout(() => {
          setStyle("w-screen h-12");
          setMsg("");
          navigate("/timeline");
        }, 1000);
      } catch (e) {
        setStyle(
          "w-screen h-12 bg-blue-200 text-xl text-center text-white p-2 font-md"
        );
        setMsg("Invalid information");
        setTimeout(() => {
          setStyle("w-screen h-12");
          setMsg("");
        }, 1000);
      }

  };

  return (
    <>
      <div className={style}>{msg}</div>

      <div className="container  h-screen flex justify-between items-center text-blue-300 drop-shadow-sm">
        <div className="text-center p-10 h-3/4 w-1/2 mr-4 font-bold text-5xl">
          Posts
          <p className=" border-b border-blue-300 pb-5 mt-10 font-light text-lg">
            Easy sign ups, just with email and password. No need to go through
            tedious sign-up forms
          </p>
        </div>
        <div className="flex flex-col border-l w-2/3 h-4/5">
          <p className="font-bold text-4xl text-center">Sign in</p>

          <div className="pl-4 flex flex-col items-center p-2 m-2">
            <input
              type="text"
              name="name"
              id="uName"
              className="p-3 m-3 ml-0 bg-transparent border-2 border-blue rounded-md outline-none hover:border-blue-200 w-4/5"
              placeholder="Email.."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              id="uPass"
              className=" p-3 m-3 ml-0 bg-transparent outline-none border-2 border-blue rounded-md hover:border-blue-200 w-4/5"
              placeholder="Password.."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="w-10/12 text-white bg-blue-300 p-2 rounded-md m-4 ml-0 transition-all hover:scale-105"
              onClick={signUp}
            >
              Sign In
            </button>
            <p
              onClick={signInGoogle}
              className="border-t cursor-pointer p-2 text-lg mt-4 w-full text-center transition-all hover:text-blue-500"
            >
              Sign in with Google
            </p>
            <p
              onClick={signInFacebook}
              className=" border-t cursor-pointer p-2 text-lg mt-4 w-full text-center transition-all hover:text-blue-500"
            >
              Sign in with Facebook
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
