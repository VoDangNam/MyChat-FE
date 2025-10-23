import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// 1. Đảm bảo bạn đã import useState
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

import Register from "./Register";
import axiosClient from "./api/axiosClient";
// 2. SỬA LỖI BUILD: Đổi ".JSX" thành ".jsx".
// Server Render (Linux) phân biệt hoa thường, nó sẽ báo lỗi nếu bạn viết hoa .JSX
import Home from './Home.jsx'; 

function App() {
  // 3. DÙNG useState thay vì const
  // Điều này cho phép App "vẽ lại" khi role và username thay đổi
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const [friends, setFriends] = useState([]);

  // 4. TẠO HÀM CALLBACK
  // Hàm này sẽ được truyền xuống Login.jsx
  // Khi Login thành công, nó sẽ gọi hàm này để "báo" cho App.jsx cập nhật state
  const handleLoginSuccess = () => {
    setRole(localStorage.getItem("role"));
    setUsername(localStorage.getItem("username"));
  };

  // fetch danh sách bạn bè
  const fetchFriends = async () => {
    if (!username) return; // Giờ nó dùng state `username`
    try {
      const res = await axiosClient.get(`/friends/${username}`);
      setFriends(res.data);
    } catch (error) {
      console.error("Lỗi load friends:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [username]); // Tự động chạy lại khi state `username` thay đổi (sau khi login)

  return (
    <BrowserRouter>
      <Routes>
        {/* 5. TRUYỀN HÀM CALLBACK xuống Login */}
        <Route 
          path="/login" 
          element={<Login onLoginSuccess={handleLoginSuccess} />} 
        />

        {/* 6. Route cho Admin (bây giờ dùng state `role`) */}
        <Route
          path="/homeAdmin"
          element={
            role === "ADMIN" ? <HomeAdmin /> : <Navigate to="/login" replace />
          }
        />

        {/* 7. Route cho User (bây giờ dùng state `role`) */}
        {/* Logic này sẽ ĐÚNG sau khi state được cập nhật */}
        <Route
          element={role === "USER" ? <Layout /> : <Navigate to="/login" replace />}
        >
          {/* Chat */}
          <Route path="/chat" element={<ChatView />} />
          <Route path="/chat/:friendUsername" element={<ChatView />} />
          <Route path="/luu-tru" element={<ArchiveView />} />

          {/* Các trang bạn bè */}
          <Route path="/search-friends" element={<SearchFriends />} />
          
          <Route
            path="/friend-requests"
            element={<FriendRequests onAccept={fetchFriends} />}
          />
          <Route path="/friends" element={<FriendsList friends={friends} />} />
        </Route>

        {/* 8. TRANG MẶC ĐỊNH (giữ nguyên như code của bạn) */}
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