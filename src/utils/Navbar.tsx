import React from 'react'

export default function Navbar() {
  return (
    <>
      <div className="h-20 bg-black opacity-80 text-white">
        <ul className="flex justify-between  p-2 items-center">
          
          <li><div className="flex text-lg relative bottom-1"><button className="mr-3 ml-2 lg:mr-5 ">Create post</button> <button> Delete post</button></div></li>
          <li className='text-4xl'>
              <img className=" mb-2 -ml-2 mr-2 w-14 inline" src="./images.png" />
          </li>
          <li> <button className="text-xl mb-3 mr-4 lg:mr-10">Sign out</button></li>
        </ul>
      </div>
    </>
  );
}
