import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { getDocs, query, where, collection } from "firebase/firestore";
export default function Delete() {
  const currUser = auth.currentUser;
  const [id, setID] = useState<any>("");
  const postRef = collection(db, "posts");
    const getPosts = query(postRef, where("userId", "==", currUser?.uid));
  const getInfo = async () => {
    // if (currUser) {
    const posts = await getDocs(getPosts);

    setID(posts.docs.map((doc)=>({userId: doc.data().userId , description: doc.data().description})))

    // }
  };
  return <>
    <button onClick={getInfo}>Click me</button>
    {console.log(id)}
  
  </>;
}
