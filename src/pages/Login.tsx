import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../config/firebase' 


export default function Login() {
    const signInGoogle = async () => {
      await signInWithPopup(auth, googleProvider);
  }
  const signInFacebook =async() => {
    await signInWithPopup(auth, facebookProvider);
  }
  return (
    <div>
      <button onClick={signInGoogle}>Sign in with google</button>
      <button onClick={signInFacebook}>Sign in with facebook</button>
    </div>
  );
}
