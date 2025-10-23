import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";



import Login from "./Login";
import HomeAdmin from "./HomeAdmin";
import Layout from "./components/Layout";
import ChatView from "./views/ChatView";
import ArchiveView from "./views/ArchiveView";

// import thêm 3 trang bạn bè
import SearchFriends from "./views/SearchFriends";
import FriendRequests from "./views/FriendRequests";
import FriendsList from "./views/FriendsList";
import Home from "./Home.JSX";
import Register from "./Register";
import axiosClient from "./api/axiosClient";

function App() {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const [friends, setFriends] = useState([]);

  // fetch danh sách bạn bè
  const fetchFriends = async () => {
    if (!username) return;
    try {
     const res = await axiosClient.get(`/friends/${username}`);
      setFriends(res.data);
    } catch (error) {
      console.error("Lỗi load friends:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [username]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Trang login */}
        <Route path="/login" element={<Login />} />

        {/* Route cho Admin */}
        <Route
          path="/homeAdmin"
          element={
            role === "ADMIN" ? <HomeAdmin /> : <Navigate to="/login" replace />
          }
        />

        {/* Route cho User (Layout chung) */}
        <Route
          element={role === "USER" ? <Layout /> : <Navigate to="/login" replace />}
        >
          {/* Chat */}
          <Route path="/chat" element={<ChatView />} />
          <Route path="/chat/:friendUsername" element={<ChatView />} />
          <Route path="/luu-tru" element={<ArchiveView />} />

          {/* Các trang bạn bè */}
          <Route path="/search-friends" element={<SearchFriends />} />
          
          {/* Truyền fetchFriends cho FriendRequests để update */}
          <Route
            path="/friend-requests"
            element={<FriendRequests onAccept={fetchFriends} />}
          />
          {/* Truyền state friends cho FriendsList */}
          <Route path="/friends" element={<FriendsList friends={friends} />} />
        </Route>

        {/* Trang mặc định (login) */}
        <Route index element={<Home />} />
        
        {/* 404 Not found */}
        <Route
          path="*"
          element={
            <div className="h-[60vh] flex items-center justify-center text-red-500">
              Không tìm thấy trang
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
