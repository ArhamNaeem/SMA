import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../config/firebase';
import Navbar from './Navbar';
import PostStructure from './PostStructure';

export default function Main() {
  const currUser = auth.currentUser;
  const [postData, setPostData] = useState<
    Array<{ url: string; description: string; postId: string, userName: string, likesCount:number }>
    >([]);
  const colRef = collection(db, "posts");

  const [likesCount, setLikesCount] = useState(0);
  const getPosts = async () => {
    try {
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
            console.log("Error has occurred ");
          }
      
      }
      setPostData(posts);
    } catch (e) {
      console.log("Error has occurred");
    }
  };


  useEffect(() => {
    getPosts();
  },[])
 
  return (
    <>
      <Navbar />
      <div id="main" className="p-2  h-screen flex  flex-wrap justify-center">
        {postData.map((data, index) => (
          <PostStructure index={index} description={data.description} postId={data.postId} url={data.url} userName={data.userName} />
        ))}
      </div>
    </>
  );
}
