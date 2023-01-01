import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from "../config/firebase";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const currUser = auth.currentUser;
  const signUserOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (e) {
      console.log('error')
    }
  }
  return (
    <>
        {
        console.log(currUser?.displayName, currUser?.email)
      }
      <div className="h-20 bg-black opacity-80 text-white">
        <ul className="flex justify-between  p-2 items-center">
          <li>
            <div className="flex text-lg relative bottom-1">
              <Link to={"/create-post"}>
                <button className="mr-3 ml-2 lg:mr-5 ">Create post</button>
              </Link>
              <Link to={"/delete-post"}>
                <button> Delete post</button>
              </Link>
            </div>
          </li>
          <li className="text-4xl">
            <img className=" mb-2 -ml-2 mr-2 w-14 inline" src="./images.png" />
          </li>
          <li>
            <button className="text-xl mb-3 mr-4 lg:mr-10" onClick={signUserOut}>Sign out</button>
          </li>
        </ul>
      </div>
    </>
  );
}
