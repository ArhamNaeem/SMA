import React, { useState } from "react";
import { db,auth } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import {useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../config/firebase";
export default function Create() {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState<string>("");
  const [style, setStyle] = useState("w-screen h-12");
  const colRef = collection(db, 'posts');
  const navigate = useNavigate();
  const currUser = auth.currentUser;
  const displayImg = (event: any) => {
    const file = event.target.files[0];
    if (!file.type.startsWith("image/")) {
        setStyle(
          "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
        );
        setMsg("Upload an image file");
        setTimeout(() => {
          setStyle("w-screen h-12");
          setMsg("");
        }, 1000);
        return;
      }
    
    const objectURL = URL.createObjectURL(file);
    setImageUpload(file);
    setImg(objectURL);
  };

  const uploadPost = async () => {
    if (!imageUpload) {
       setStyle(
         "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
       );
       setMsg("Incomplete info");
       setTimeout(() => {
         setStyle("w-screen h-12");
         setMsg("");
       }, 1000);
      return;
    }
        const rand = crypto.randomUUID();
        const imgUrl = "post/" + imageUpload.name + rand;
        const imgRef = ref(storage, imgUrl);
        setStyle(
          "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
        );
        setMsg("Posting..");
     
    await uploadBytes(imgRef, imageUpload);
    await addDoc(colRef, {
      userId: currUser?.uid,
      username: currUser?.displayName,
      url: imgUrl,
      description: description,
      email: currUser?.email
    })
  
      setStyle(
        "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
      );
      setMsg("Posted!");
      setTimeout(() => {
        setStyle("w-screen h-12");
        setMsg("");
        navigate("/timeline");
      }, 1000);
  };
  return (
    <>
      <div className={style}>{msg}</div>
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
              <div className="md:ml-3 w-3/5 h-full   border p-2 m-2 ml-0">
                <div className="h-full flex justify-center">
                  <img src={img} className="h-full" />
                </div>
                <label
                  htmlFor="files"
                  className="cursor-pointer relative bottom-full"
                >
                  {img ? "" : "Select img"}
                </label>
                <input
                  className="invisible"
                  type="file"
                  id="files"
                  onChange={displayImg}
                />
              </div>

              <div>
                <textarea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="m-2 ml-0 p-2 h-full outline-none w-full text-sm md:text-lg resize-none"
                  placeholder="Description.."
                ></textarea>
              </div>
            </div>
            <button onClick={uploadPost} className="mt-7">
              Upload Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
