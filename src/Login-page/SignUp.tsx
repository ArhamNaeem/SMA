import React, { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword  } from "firebase/auth";
export default function SignUp() {
  
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState < string>("");
  const [style, setStyle] = useState("w-screen h-12");
  const [email, setEmail] = useState("");
  const signUp = async () => {
    // try {
      await createUserWithEmailAndPassword(auth, email, password);
      setStyle(
        "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
      );
      setMsg("Account created")
    // }
    // catch (err) {
    //   console.log('an error', err)
    // }

  };
  return (
    <>
      <div className={style}>{msg}</div>
      <div className="container mt-5 p-10 h-screen flex text-blue-300 drop-shadow-sm">
        <div className="text-center p-10 h-3/4 w-1/2 mr-4 font-bold text-5xl">
          Posts
          <p className=" border-b border-blue-300 pb-5 mt-10 font-light text-lg">
           Easy sign up, just with email and password!
          </p>
        </div>
        <div className="border-l border-blue-300 h-3/4 sm:h-4/6 w-1/2">
          <p className="font-bold text-4xl text-center">Sign Up</p>

          <div className="flex flex-col items-center p-2 m-2">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="uEmail"
              className="p-3 m-3 ml-0 bg-transparent border-2 border-blue rounded-md outline-none hover:border-blue-200 w-4/5"
              placeholder="Email.."
            />
            <input
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              name="password"
              id="uPass"
              className=" p-3 m-3 ml-0 bg-transparent outline-none border-2 border-blue rounded-md hover:border-blue-200 w-4/5"
              placeholder="Password.."
            />
            <button
              onClick={signUp}
              className="w-10/12 text-white bg-blue-300 p-2 rounded-md m-4 ml-0 transition-all hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
