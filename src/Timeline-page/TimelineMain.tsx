import React, { useState } from 'react'
import { createContext } from 'react';
import Navbar from './Navbar';
const ImgListContext = createContext(null)
export default function Main() {
  const [imgList, setImgList] = useState(null);
  // const updateImgList = () => {
  //   setImgList(imgList)
  // }
  return (
    <>
      {/* <ImgListContext.Provider value={imgList}> */}
        <Navbar />
      {/* </ImgListContext.Provider> */}
    </>
  );
}
