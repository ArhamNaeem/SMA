
import React, { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
export default function Delete() {
  const currUser = auth.currentUser;
  const [postData, setPostData] = useState<
    Array<{ url: string; description: string }>
  >([]);
  
  const colRef = collection(db, "posts");
  const func = async () => {
  try {
    const data = await getDocs(colRef);
    data.docs.map((doc) => {
      // console.log(currUser?.uid,doc.data().userId)
      // if (currUser?.uid == doc.data().userId) {
      const imgRef = ref(storage, doc.data().url);
      const description = doc.data().description;
      getDownloadURL(imgRef).then((url) => {
        setPostData([...postData, { url: url, description: description }]);
      });
      // }
    });
  } catch (err) {
    console.log("Error has occurred");
  }
  console.log("function");
  }
  useEffect(() => {
    func()
  }, []);
 
  return (
    <>
     {
        <div id = "main" className="p-2 h-screen flex flex-wrap justify-center">
          {postData.map((data, index) => (
            <p>{data.description}</p>
        //     <React.Fragment key={index}>
        //       <div className=" flex text-blue-300  text-center flex-col flex-wrap justify-start items-center  w-2/3 md:w-1/3  h-3/5 p-2 m-2 border border-black lg:text-4xl ">
        //         <div className="w-full h-9/10">
        //           <div className="flex h-4/5">
        //             <div className="md:ml-3 w-3/5 h-full  border m-2 ml-0">
        //               <div className="h-full flex justify-center">
        //                 <img src={data.url} />
        //               </div>
        //             </div>
        //             <div>
        //               <p className="m-2 ml-0 p-1 h-full outline-none w-full text-sm md:text-lg  resize-none">
        //                 {data.description}
        //               </p>
        //             </div>
        //           </div>
        //           <button className="mt-8">Delete Post</button>
        //         </div>
        //       </div>
        //     </React.Fragment>
            )
          )}
        </div>
      }
    </>
  );
}
