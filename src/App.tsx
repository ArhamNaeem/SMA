import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Login-page/LoginMain";
import SignUp from "./Login-page/SignUp";
import PostMain from "./Posts/PostMain";
import TimelineMain from "./Timeline-page/TimelineMain";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/timeline" element={<TimelineMain />} />
          <Route path="/createPost" element={<PostMain />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
