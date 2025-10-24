import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "./api/axiosClient";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  // 1. Thêm state isLoading
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // 2. Bật loading ngay khi nhấn
    setIsLoading(true);

    try {
      const res = await axiosClient.post("/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: res.data.username, role: res.data.role })
      );
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);

      onLoginSuccess();

      if (res.data.role === "ADMIN") navigate("/homeAdmin");
      else if (res.data.role === "USER") navigate("/chat");
    } catch (error) {
      alert("Login failed: " + (error.response?.data || "Unknown error"));
    } finally {
      // 3. Tắt loading (bất kể thành công hay thất bại)
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Ảnh bên trái */}
        <div className="md:basis-1/2 bg-[url('/avtLogin.png')] bg-cover bg-center h-48 md:h-auto"></div>

        {/* Form bên phải */}
        <div className="flex flex-col justify-center items-center md:basis-1/2 p-8">
          <h1 className="text-3xl font-bold text-blue-900 font-serif mb-6">
            Welcome
          </h1>

          <input
            type="text"
            placeholder="Username"
            className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 4. Cập nhật nút Login */}
          <button
            onClick={handleLogin}
            // Thêm class cho trạng thái disabled và vô hiệu hóa nút khi loading
            className="w-full max-w-xs bg-blue-900 text-white rounded-md py-2 font-serif hover:bg-blue-800 transition
                       disabled:bg-gray-400 disabled:cursor-not-allowed" // Thêm class này
            disabled={isLoading} // Vô hiệu hóa nút khi isLoading = true
          >
            {/* 5. Thay đổi text khi đang loading */}
            {isLoading ? "Đang đăng nhập..." : "Login"}
          </button>

          <div className="text-sm text-gray-600 mt-4">OR</div>

          <button 
             className="w-full max-w-xs bg-white border border-red-500 text-red-600 rounded-md py-2 mt-3 hover:bg-red-500 hover:text-white transition font-serif"
             disabled={isLoading} // Cũng nên vô hiệu hóa nút này
          >
            Login with Google
          </button>

          <p className="text-sm text-gray-700 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              // Ngăn người dùng nhấn link khi đang loading
              className={`text-blue-700 font-semibold hover:text-blue-500 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;