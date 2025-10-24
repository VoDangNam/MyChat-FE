import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
 // ✅ Dùng axiosClient thay vì axios trực tiếp

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const username = localStorage.getItem("username"); // hoặc lấy từ props/context

  useEffect(() => {
    if (!username) return;

    const fetchFriends = async () => {
      try {
        const res = await axiosClient // THÀNH DÒNG NÀY:
          .get(`/friends/M`); 
        console.log("Friends data:", res.data);
        setFriends(res.data);
      } catch (err) {
        console.error("Lỗi load friends:", err);
      }
    };

    fetchFriends();
  }, [username]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 text-center">
        Danh sách bạn bè
      </h3>

      {friends.length === 0 ? (
        <p className="text-gray-500 text-center">Chưa có bạn bè nào 😅</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="py-2 text-gray-800 hover:bg-blue-50 rounded-md px-2 transition"
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
