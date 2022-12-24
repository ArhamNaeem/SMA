import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Login-page/LoginMain";
import SignUp from "./Login-page/SignUp";
import Create from "./Posts/Create";
import Delete from "./Posts/Delete";
import TimelineMain from "./Timeline-page/TimelineMain";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/timeline" element={<TimelineMain />} />
          <Route path="/create-post" element={<Create />} />
          <Route path="/delete-post" element={ <Delete/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
