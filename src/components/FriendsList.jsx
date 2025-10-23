import { useEffect, useState } from "react";
import axios from "axios";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const username = localStorage.getItem("username"); // hoặc lấy từ props/context

  useEffect(() => {
    axios
      .get(`http://localhost:8081/friends/${username}`)
      .then((res) => {
        console.log("Friends data:", res.data);
        setFriends(res.data);
      })
      .catch((err) => console.error("Lỗi load friends:", err));
  }, [username]);

  return (
    <div>
      <h3>Danh sách bạn bè</h3>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;
