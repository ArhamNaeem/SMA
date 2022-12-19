import React from 'react'

export default function Navbar() {
  return (
    <>
      <div className="h-20 bg-black opacity-80 text-white">
        <ul className="flex justify-between  p-2 items-center">
          <li className='text-4xl'>
              <img className=" mb-2 mr-2 w-14 inline" src="./images.png" />
              Posts
          </li>
          <li className='mr-5 mb-1 text-lg'>
            <button>Login</button>
          </li>
        </ul>
      </div>
    </>
  );
}
