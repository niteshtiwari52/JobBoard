import { useDispatch } from "react-redux";
import "./App.css";
import HomePage from "./pages/Home.Page";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getMyDetailsAction } from "./redux/reducers/user/user.action";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyDetailsAction());
   
  }, [localStorage]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:type" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
