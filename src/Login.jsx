import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "./api/axiosClient";

// 1. NHẬN PROP `onLoginSuccess` TỪ APP.JSX
const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //chuyển hướng redirect

  const handleLogin = async () => {
    try {
      const res = await axiosClient.post("/api/auth/login", {
        username,
        password,
      });

      // Lưu localStorage (giữ nguyên)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: res.data.username,
          role: res.data.role,
        })
      );
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);

      // 2. GỌI HÀM CALLBACK CỦA APP.JSX
      // Báo cho App.jsx cập nhật state `role` và `username`
      onLoginSuccess();

      // 3. Điều hướng (giữ nguyên)
      // Vì App.jsx đã cập nhật state, nên lần này điều hướng sẽ thành công
      if (res.data.role === "ADMIN") navigate("/homeAdmin");
      else if (res.data.role === "USER") navigate("/chat");
    } catch (error) {
      alert("Login failed: " + error.response?.data || "Unknown error");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="flex flex-row w-[1000px] h-[500px] ">
          <div className="basis-2/4 bg-[url('/avtLogin.png')] bg-cover bg-center rounded-l-3xl">
            {" "}
          </div>
          <div className="basis-2/4 bg-blue-200 flex flex-col pt-[80px]">
            <h1 className="text-3xl font-bold text-center m-6 font-serif">
              Wellcome
            </h1>
            <input
              type="text"
              className="w-[300px] h-8 pl-2 ml-[100px] rounded-md mt-[10px] placeholder:text-sm"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[300px] h-8 pl-2 ml-[100px] rounded-md mt-8 placeholder:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-[300px] h-8 bg-blue-950 mt-8 pl-2 ml-[100px] rounded-xl text-white hover:bg-blue-800 font-serif"
              onClick={handleLogin}
            >
              Login
            </button>
            <span className="px-3 text-black text-sm text-center mt-3">OR</span>
            <button className="w-[300px] h-8 bg-white pl-2 ml-[100px] rounded-xl hover:bg-red-500 hover:text-white text-red-950 mt-4 font-serif">
              Login With GG
            </button>
            <span className="px-3 text-black text-sm text-center mt-3">
              Don't have an account?{" "}
              <a href="#" className="text-blue-950 hover:text-blue-600">
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;