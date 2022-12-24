import React, { useState, useEffect } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
// import { v4 } from 'uuid';

export default function Create() {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imgList, setImgList] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState("");
  const imgListRef = ref(storage, "post/");
  //todo: correct this
  const uploadImg = () => {
    if (!imageUpload) return;
    const imgUrl = "post/" + imageUpload.name + crypto.randomUUID();
    const imgRef = ref(storage, imgUrl);
     uploadBytes(imgRef, imageUpload).then((snapshot) => {
       getDownloadURL(snapshot.ref).then((url) => {
         console.log('uploaded')
         setImgList((prev) => [...prev, url]);
             listAll(imgListRef).then((response) => {
               console.log("here");
               response.items.forEach((item) => {
                 getDownloadURL(item).then((url) => {
                   setImgList((prev) => [...prev, url]);
                 });
               });
               //loading if img is uploading
               console.log('loading')
               imgList.map((img) => {
                 console.log(img);
               });
             });
       });
       
   });


  };
  
  //  useEffect(() => {
  //      listAll(imgListRef).then((response) => {
  //        response.items.forEach((item) => {
  //          getDownloadURL(item).then((url) => {
  //            setImgList((prev) => [...prev, url]);
  //          })
  //        })
  //      });
  //  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen text-center text-blue-300 
       lg:text-4xl p-5">
        <div className=" w-full lg:w-2/5 h-4/5 lg:h-full p-2 border border-black  ">
          <h1 className=" m-3 mt-0 p-5   font-bold  border-b border-black ">
            Create Post
          </h1>
          <div className="w-full h-9/10">
            <div className="flex h-3/4">
              <div className="w-3/5 h-full border p-2 m-2 ml-0">
                <label htmlFor="files" className="cursor-pointer">
                  Select Images
                </label>
                <input
                  className="invisible"
                  type="file"
                  id="files"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImageUpload(e.target.files[0]);
                      //upload img
                    }
                  }}
                />
              </div>
              <div>
                <textarea
                  className="m-2 ml-0 p-2 h-full outline-none w-full text-sm lg:text-lg resize-none"
                  placeholder="Description.."
                ></textarea>
              </div>
            </div>
            <button
              //remove on click from here and make img saved after selection , use this btn for sending data to db
              onClick={uploadImg}
              className="mt-7">Upload Post</button>
          </div>
        </div>
      </div>
    </>
  );
  // }
}
