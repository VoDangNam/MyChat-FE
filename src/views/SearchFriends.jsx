import React, { useState } from "react";
import axiosClient from "../api/axiosClient";

function SearchFriends() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("user"))?.username;
    const res = await axiosClient.get(`/friends/search`, {
        params: { keyword, currentUser: username },
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(res.data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };

  //  Gửi lời mời kết bạn
  const sendRequest = async (toUser) => {
    // ⚠️ KHÔNG CẦN LẤY fromUser TỪ localStorage NỮA. Backend sẽ làm việc đó.
    if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
    }

    try {
        await axiosClient.post(
        `/friends/sendRequest?toUser=${toUser}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`✅ Đã gửi lời mời kết bạn đến ${toUser}`);
        
        // Cải tiến UX: Xóa người dùng khỏi danh sách kết quả tìm kiếm sau khi gửi
        setResults(prev => prev.filter(user => user.username !== toUser));

    } catch (error) {
        console.error("Lỗi khi gửi lời mời:", error);
        // Hiển thị lỗi cụ thể từ Backend nếu có (ví dụ: đã gửi rồi)
        alert(error.response?.data || "Gửi lời mời thất bại!");
    }
};

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-center font-semibold text-2xl mb-6">
        Tìm kiếm bạn bè
      </h2>

      {/* Ô nhập và nút tìm kiếm */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Nhập username hoặc email..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Danh sách kết quả */}
      <ul className="mt-6 space-y-3">
        {results.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center border p-3 rounded-xl hover:bg-gray-50"
          >
            <span className="font-medium">{user.username}</span>
            <button
              onClick={() => sendRequest(user.username)}
              className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
            >
              Kết bạn
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchFriends;
