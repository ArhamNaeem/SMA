import React, { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, getDocs, deleteDoc,query,where, getDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
export default function Delete() {
  const currUser = auth.currentUser;
  const colRef = collection(db, "posts");
  const navigate = useNavigate();
     const [msg, setMsg] = useState<string>("");
   const [style, setStyle] = useState("w-screen h-12");
  const [postData, setPostData] = useState<
    Array<{ url: string; description: string, postId:string }>
  >([]);

  const deletePost = async (postId: string) => {
    try {
         setStyle(
           "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
         );
         setMsg("Deleting post..");
      const docToDeleteQuery = query(colRef, where("postId", "==", postId), where("userId", "==", currUser?.uid))
     const docToDeleteDoc = await getDocs(docToDeleteQuery)
      const docToDelete = doc(db, 'posts', docToDeleteDoc.docs[0].id);
      await deleteDoc(docToDelete)
        setStyle("w-screen h-12");
      loadPosts();
    } catch (err) {
     setStyle(
       "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
     );
     setMsg("Error occurred..");
     navigate("/");
    }
 }

  const loadPosts = async () => {
    // setIsLoading(true);1
    try {
        setStyle(
          "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
        );
        setMsg("Fetching your posts..");
      const data = await getDocs(colRef);
      const posts = [];
      //iterate through the data
      for (const doc of data.docs) {
        if (currUser?.uid == doc.data().userId) {
        const imgRef = ref(storage, doc.data().url);
          const description = doc.data().description;
          const postId = doc.data().postId;
        try {
          const url = await getDownloadURL(imgRef);
          posts.push({ url: url, description: description, postId: postId });

        } catch (e) {
        setStyle(
          "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
        );
          setMsg("Error occurred..");
          navigate("/")
        }
        }
      }
      setPostData(posts);
      setStyle(
        "w-screen h-12"
      );
      setMsg("");

    } catch (e) {
   setStyle(
     "w-screen h-12 bg-blue-300 text-xl text-center text-white p-2 font-md"
   );
   setMsg("Error occurred..");
   navigate("/");
    }
  };

  useEffect(() => {
    loadPosts()
  }, []); // The empty array means that this effect will only be run once (when the component mounts)

  // Render the component using postData
  return (
    <>
      <div className={style}>{msg}</div>
      <div id="main" className="p-2  h-screen flex flex-wrap justify-center">
        {postData.map((data, index) => (
          // <p>{data.description}</p>
          <React.Fragment key={index}>
            <div className=" flex text-blue-300  text-center flex-col flex-wrap justify-start items-center  w-2/3 md:w-1/3  h-3/5 p-2 m-2 border border-black lg:text-4xl ">
              <p></p>
              <div className="w-full h-9/10">
                <div className="flex h-4/5">
                  <div className="md:ml-3 w-3/5 h-full  border m-2 ml-0">
                    <div className="h-full flex justify-center">
                      <img src={data.url} />
                    </div>
                  </div>
                  <div>
                    <p className="w-full text-blue-500 text-lg font-semibold">
                      Description
                    </p>
                    <textarea
                      value={data.description}
                      readOnly
                      className="m-2 ml-0 p-1 h-full bg-transparent flex justify-center text-blue-600 outline-none w-22 lg:w-44 text-xs lg:text-sm  flex-wrap resize-none rounded-lg"
                    />
                  </div>
                </div>
                <button
                  className="mt-8 md:mt-14"
                  onClick={() => {
                    deletePost(data.postId);
                  }}
                >
                  Delete Post
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}