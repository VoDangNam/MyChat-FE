import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  // Hàm lấy username từ localStorage (nếu cần)
  const getUsername = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser?.username;
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  //  Lấy danh sách lời mời kết bạn

  const fetchRequests = async () => {
    // Thêm check token để đảm bảo token tồn tại trước khi gọi API
    if (!token) {
      console.error("❌ Lỗi: Không tìm thấy token.");
      return;
    } // Bỏ qua việc lấy username, vì nó không cần thiết cho URL này nữa // const currentUsername = getUsername(); // if (!currentUsername) return;
    try {
      // 🛑 SỬA LỖI 404: Xóa ${currentUsername} khỏi URL
      const res = await axiosClient.get(`/friends/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Requests:", res.data);
      setRequests(res.data.map((req) => ({ ...req, action: "pending" })));
    } catch (error) {
      console.error("❌ Lỗi khi lấy requests:", error);
    }
  };
  // Chấp nhận lời mời kết bạn
  const acceptRequest = async (requestId) => {
    try {
      await axiosClient.post(
        `/friends/acceptRequest?requestId=${requestId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Cập nhật UI: đổi trạng thái sang "accepted"
      setRequests((prev) =>
        prev.map((req) =>
          req.requestId === requestId ? { ...req, action: "accepted" } : req
        )
      );

      // Lưu danh sách bạn bè mới (nếu cần)
      const friendsRes = await axiosClient.get(`/friends/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("friends", JSON.stringify(friendsRes.data));
    } catch (error) {
      console.error("❌ Lỗi khi chấp nhận:", error);
      if (error.response) {
        console.error("➡️ Backend báo:", error.response.data);
      }
    }
  };

  // Từ chối lời mời kết bạn
  const declineRequest = async (requestId) => {
    try {
      await axiosClient.post(
        `/friends/declineRequest?requestId=${requestId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Cập nhật UI: đổi trạng thái sang "declined" thay vì xóa hẳn
      setRequests((prev) =>
        prev.map((req) =>
          req.requestId === requestId ? { ...req, action: "declined" } : req
        )
      );

      // OPTIONAL: Bạn có thể dùng setTimeout để xóa nó sau 2 giây nếu muốn
      // setTimeout(() => {
      //     setRequests(prev => prev.filter(req => req.requestId !== requestId));
      // }, 2000);
    } catch (error) {
      console.error("❌ Lỗi khi từ chối:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-custom-down-blue animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Lời mời kết bạn
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">Không có lời mời nào</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req.requestId}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <span className="text-gray-700 font-medium">
                {req.fromUsername}
              </span>

              <div className="space-x-2">
                {req.action === "pending" && (
                  <>
                    <button
                      onClick={() => acceptRequest(req.requestId)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                    >
                      Chấp nhận
                    </button>
                    <button
                      onClick={() => declineRequest(req.requestId)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                      Từ chối
                    </button>
                  </>
                )}

                {req.action === "accepted" && (
                  <span className="text-green-600 font-medium">
                    ✅ Đã chấp nhận
                  </span>
                )}

                {req.action === "declined" && (
                  <span className="text-red-600 font-medium">
                    ❌ Đã từ chối
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FriendRequests;
