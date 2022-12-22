import React from 'react'
import { useRef } from 'react';

export default function PostMain() {
        return (
          <>
            <div className="container flex justify-center items-center h-screen text-center text-blue-300 text-4xl">
              <div className="w-3/4 lg:w-2/5 h-5/6 border border-black">
                <h1 className=" m-3 mt-0 p-5  font-bold  border-b border-black">
                  Create Post
                </h1>
                <div>
                  <input type="file" name="" id="" />
                  <button>Upload img</button>
                </div>
              </div>
            </div>
          </>
        );
    // }
}