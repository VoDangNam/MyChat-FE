import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function FriendsList() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      // Lấy thông tin người đang đăng nhập từ localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const username = storedUser?.username;
      const token = localStorage.getItem("token");

      if (!username || !token) {
        console.error("❌ Không tìm thấy username hoặc token.");
        return;
      }

      // Gọi API với axiosClient
      const res = await axiosClient.get(`/friends/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFriends(res.data);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách bạn bè:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-custom-down-blue animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Danh sách bạn bè
      </h2>

      {friends.length === 0 ? (
        <p className="text-gray-500">Bạn chưa có bạn nào</p>
      ) : (
        <ul className="space-y-3">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              {friend.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FriendsList;
