import React from "react";
import { auth, googleProvider, facebookProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
export default function Login() {
  const signInGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    };
    const signInFacebook = async () => {
      await signInWithPopup(auth, facebookProvider);
    };
  return (
    <>
      <button onClick={signInGoogle}>Sign in with google</button>
      <button onClick={signInFacebook}>Sign in with facebook</button>
    </>
  );
}
