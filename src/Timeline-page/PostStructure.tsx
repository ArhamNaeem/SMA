import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase';

interface PostType{
  index: number;
  description: string;
  postId: string;
  url: string;
  userName: string;
}
export default function PostStructure(props: PostType) {
  interface Like{
    userId: string; 
    likeId: string;
    }
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", props.postId));

  
  
  const [likes, setLikes] = useState<null | Like[]>(null);
  // check if current logged in user has liked the post

      const currUser = auth.currentUser;
    
    
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId , likeId:doc.id})));
  };
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: currUser?.uid,
        postId: props.postId
      })
      if (currUser) {
        setLikes((prev) => prev ? [...prev, { userId: currUser.uid, likeId: newDoc.id }] : [{
          userId: currUser.uid,
          likeId: newDoc.id
        }]);
      }
    } catch (e) {
      console.log('Error occurred')
    }
  }
  const deleteLike = async () => {
    try {
      const deleteLikeQuery = query(likesRef, where("postId", '==', props.postId), where("userId", "==", currUser?.uid))
      const getLikeDoc = await getDocs(deleteLikeQuery)
      const likeId = getLikeDoc.docs[0].id;
      const deleteLikeDoc = doc(db, 'likes', likeId)
      await deleteDoc(deleteLikeDoc)
      if (currUser) {
        setLikes(
          (prev) => prev && prev.filter((like)=>like.likeId!==likeId)
        )
      }
    } catch (e) {
      console.log('Error occurred')
    }
  }
    const hasUserLiked = likes?.find((like) => 
      like.userId === currUser?.uid
    );
    useEffect(() => {
    getLikes()
    }, []);
    
  return (
    
    <React.Fragment key={props.index}>
      <div className="w-full flex justify-center">
        <div className="flex text-blue-300 text-center flex-col flex-wrap justify-start items-center  w-2/3 md:w-1/3 h-9/10 p-3 border border-black lg:text-4xl ">
          <div className="w-full h-9/10">
            <p className="text-sm">Posted by: {props.userName}</p>

            <div className="flex h-4/5">
              <div className="md:ml-3 w-3/5 h-full  border m-2 ml-0">
                <div className="h-full drop-shadow flex justify-center">
                  <img src={props.url} />
                </div>
              </div>
              <div>
                <p className="w-full text-blue-500 text-lg font-semibold">
                  Description
                </p>
                <textarea
                  value={props.description}
                  readOnly
                  className="m-2 ml-0 p-1 h-full bg-slate-50 drop-shadow flex justify-center text-blue-600 outline-none w-22 lg:w-44 text-xs lg:text-sm  flex-wrap resize-none rounded-lg"
                />
              </div>
            </div>
            <div className="mt-4 text-md  h-1/5 w-2/4">
              <button
                className="absolute left-[31%] md:left-[38.3%] lg:left-[37%]  transition-all hover:scale-110"
                onClick={hasUserLiked?deleteLike : addLike}
              >
                {(hasUserLiked) ? <>&#10084;</>:<>&#129293;</> }
              </button>

              <p className="ml-10 text-blue-500">{likes?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    // </div>
  );
}
