import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import AddTweet from "../addTweet";
import AddUser from "../addUser";
import Tweets from "../tweets";
import Users from "../users";

export default function Router() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") navigate("/users");
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/addUser" element={<AddUser />} />
      <Route path="/tweets" element={<Tweets />} />
      <Route path="/addTweet" element={<AddTweet />} />
    </Routes>
  );
}
