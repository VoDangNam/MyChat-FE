import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 thêm dòng này
import axiosClient from "./api/axiosClient";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 👈 tạo navigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axiosClient.post("/api/auth/register", form);
      setMessage("Đăng ký thành công. Xin chào " + res.data.username);

      // 👇 Sau 1 giây quay về trang Login
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      if (err.response) {
        setMessage(err.response.data);
      } else {
        setMessage("Đăng ký thất bại. do server error");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-image bg-cover bg-center"
      style={{ backgroundImage: "url('/bgrRGT.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/30 shadow-xl rounded-2xl p-6 w-96 h-[400px] space-y-4 flex flex-col items-center border border-white/40"
      >
        <h2 className="text-xl font-bold text-center text-blue-400">
          Đăng ký tài khoản
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Tên người dùng"
          value={form.username}
          onChange={handleChange}
          className="w-72 p-2 border rounded focus:ring focus:ring-blue-300"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-72 p-2 border rounded focus:ring focus:ring-blue-300"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          className="w-72 p-2 border rounded focus:ring focus:ring-blue-300"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-72 p-2 border rounded focus:ring focus:ring-blue-300"
          required
        />

        <button
          type="submit"
          className="w-72 bg-blue-600 mt-4 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Đăng ký
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
