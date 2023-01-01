import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../config/firebase';
import Navbar from './Navbar';
import PostStructure from './PostStructure';

export default function Main() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<
    Array<{ url: string; description: string; postId: string, userName: string, likesCount:number }>
    >([]);
    const [msg, setMsg] = useState<string>("");
    const [style, setStyle] = useState("w-screen h-12");
  const colRef = collection(db, "posts");

  const [likesCount, setLikesCount] = useState(0);
  const getPosts = async () => {
    try {
         setStyle(
           "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
         );
         setMsg("Fetching your posts..");
      const data = await getDocs(colRef);
      const posts = [];
      //iterate through the data
      for (const doc of data.docs) {
          const imgRef = ref(storage, doc.data().url);
          const description = doc.data().description;
        const postId = doc.data().postId;
        const userName = doc.data().username
          try {
            const url = await getDownloadURL(imgRef);
            posts.push({ url: url, description: description, postId: postId, userName: userName, likesCount: data.docs.length });
          } catch (e) {
             setStyle(
               "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
             );
            setMsg("Error occurred! Try again later..");
              setTimeout(() => {
                navigate("/");
              }, 1000);
          }
      
      }
      setPostData(posts);
         setStyle("w-screen h-12");
         setMsg("");
    } catch (e) {
      
       setStyle(
         "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
       );
      setMsg("Error occurred!");
      setTimeout(() => {
        navigate("/")
      }, 1000);
    }
 
  };


  useEffect(() => {
    getPosts();
  },[])
 
  return (
    <>
      <Navbar />
      <div className={style}>{msg}</div>
      <div id="main" className="p-2  h-screen flex  flex-wrap justify-center">
        {postData.map((data, index) => (
          <PostStructure
            index={index}
            description={data.description}
            postId={data.postId}
            url={data.url}
            userName={data.userName}
          />
        ))}
      </div>
    </>
  );
}
