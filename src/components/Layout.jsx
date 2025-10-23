import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Layout() {
  const [friends, setFriends] = useState([]);
  const username = localStorage.getItem("username"); // username đang đăng nhập
  const navigate = useNavigate();
  const location = useLocation(); // lấy thông tin route hiện tại
const token = localStorage.getItem("token");
  useEffect(() => {
    if (!username) return; // đợi có username
    if (location.pathname.startsWith("/chat")) {
      axios
                .get(`http://localhost:8081/friends/M`, {
                    headers: { Authorization: `Bearer ${token}` } // Truyền Token qua Header
                })
                .then((res) => {
                    console.log("Friends data:", res.data);
                    // res.data chứa List<UserDTO>
                    setFriends(res.data);
                })
        .catch((err) => console.error("Lỗi load friends:", err));
    }
  }, [username, location.pathname]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 text-white flex flex-col">
        {/* Logo + Username */}
        <div
          className="p-4 text-lg font-bold cursor-pointer border-b border-gray-700"
          onClick={() => navigate("/chat")}
        >
          <div className="flex flex-row">
           <div className="bg-[url('/LogoMyChat.png')] w-[50px] h-[50px] bg-cover rounded-full border-4 border-double mr-4 mb-4" />

                {/* Text bên phải logo */}
                <h1 className="text-xl font-semibold text-white pt-[10px] ">MyChat</h1>
          </div>

          {username && (
            <div className="text-sm font-normal text-gray-300 mt-1">
              Xin chào, <span className="font-semibold">{username}</span>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto">
          {/* Link đến trang Chat chung */}
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            Chat chung
          </NavLink>

          {/* Link đến trang Tìm kiếm bạn bè */}
          <NavLink
            to="/search-friends"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
           Tìm kiếm bạn bè
          </NavLink>

            <NavLink
            to="/friend-requests"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
           Yêu cầu kết bạn
          </NavLink>

        
            <div className="mt-4">
              <div className="px-4 py-2 text-sm font-semibold text-gray-300">
                Bạn bè
              </div>
              {friends.map((f) => (
                <NavLink
                  key={f.id}
                  to={`/chat/${f.username}`}
                  className={({ isActive }) =>
                    `block px-4 py-2 hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  {f.username}
                </NavLink>
              ))}
            </div>
        
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
}
