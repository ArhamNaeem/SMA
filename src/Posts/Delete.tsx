
import React, { useState } from "react";
import { storage } from "../config/firebase";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
export default function Delete() {
  const currUser = auth.currentUser;
  const [imgList,setImgList]=useState<string[]>([])
  const colRef = collection(db, "posts")
  const func = async () => {
    const data = await getDocs(colRef);
    data.docs.map((doc) => {
      // console.log(currUser?.uid,doc.id);

      // if (currUser?.uid == doc.id)
      const imgRef = ref(storage, doc.data().url);
      getDownloadURL(imgRef).then((url) => {
        setImgList((prev)=>[...prev,url])
      })
    })
  }

  return (
    <>
    
   <button onClick={func}> Click</button>
      {imgList.map((img,index) => <img src={img} key = {index} />)}  
    </>
  );
}
