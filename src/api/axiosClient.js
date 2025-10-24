import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// === THÊM ĐOẠN NÀY VÀO ===
// Đây là "interceptor" (bộ chặn) sẽ tự động thêm token vào MỌI request
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Nếu có token, thêm nó vào header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi
    return Promise.reject(error);
  }
);
// ==========================

export default axiosClient;