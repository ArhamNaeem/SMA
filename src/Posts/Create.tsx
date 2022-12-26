import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../config/firebase";
// import { v4 } from 'uuid';
export default function Create() {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [img, setImg] = useState("");
  // const [text, setText] = useState("");
  const imageRef = ref(storage, "post/");

  const displayImg = (event: any) => {
    const file = event.target.files[0];

    // Check that the file is an image
    if (!file.type.startsWith("image/")) {
      return;
    }

    // Create an object URL for the file
    const objectURL = URL.createObjectURL(file);

    // Update the selectedFile state with the object URL
    setImg(objectURL);
  };

  const uploadImg = async () => {
    if (!imageUpload) return;
    const rand = crypto.randomUUID();
    const imgUrl = "post/" + imageUpload.name + rand;
    const imgRef = ref(storage, imgUrl);
    await uploadBytes(imgRef, imageUpload);
    // list(imgRef).then((res) => {

    //   //TODO: get the uploaded file to be displayed

    //   console.log('hi')
    // }
  };
  return (
    <>
      <div
        className="flex flex-col justify-center items-center h-screen text-center text-blue-300 
       lg:text-4xl p-5"
      >
        <div className=" w-full lg:w-2/5 h-4/5 lg:h-full p-2 border border-black  ">
          <h1 className=" m-3 mt-0 p-5   font-bold  border-b border-black ">
            Create Post
          </h1>
          <div className="w-full h-9/10">
            <div className="flex h-3/4">
              <div className="md:ml-3 w-3/5 h-full border p-2 m-2 ml-0">
                <label htmlFor="files" className="cursor-pointer">
                 {img?"":"Select img"}
                </label>
                <input
                  className="invisible"
                  type="file"
                  id="files"
                  onChange={
                    // (e) => {
                      displayImg
                    // if (e.target.files) {
                    //   setImageUpload(e.target.files[0]);
                    //   //upload img
                    // }
                  // }
                  }
                />
                {/* //set img height */}
                <img src={img} className="  " />
              </div>

              <div>
                <textarea
                  className="m-2 ml-0 p-2 h-full outline-none w-full text-sm md:text-lg resize-none"
                  placeholder="Description.."
                ></textarea>
              </div>
            </div>
            <button
              //remove on click from here and make img saved after selection , use this btn for sending data to db
              onClick={uploadImg}
              className="mt-7"
            >
              Upload Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
