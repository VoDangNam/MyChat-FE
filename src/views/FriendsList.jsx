import React, { useEffect, useState } from "react";
import axios from "axios";

function FriendsList() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const username = "alice"; //thay bằng username người đang đăng nhập
      const res = await axios.get(`http://localhost:8081/friends/${username}`);
      setFriends(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bạn bè:", error);
    }
  };

  return (
    <div>
      <h2>Danh sách bạn bè</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;
