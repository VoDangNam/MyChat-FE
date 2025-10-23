
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"; 
import { connectWebSocket, sendPrivateMessage } from "../socketService";
import { Send, User, MessageSquare } from "lucide-react";
import axiosClient from "../api/axiosClient";

export default function ChatView() {
  const { friendUsername } = useParams(); 
  const username = localStorage.getItem("username");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null); 

  // Lấy lịch sử chat và kết nối WebSocket
  useEffect(() => {
    if (!friendUsername) return;

    axiosClient.get(`/messages?user1=${username}&user2=${friendUsername}`)
      .then(res => setMessages(res.data))
      .catch(error => console.error("Error fetching messages:", error)); 

    connectWebSocket(username, (msg) => {
      if (
        (msg.senderName === username && msg.recipientName === friendUsername) ||
        (msg.senderName === friendUsername && msg.recipientName === username)
      ) {
        setMessages(prev => [...prev, msg]);
      }
    });
  }, [username, friendUsername]);

  // Cuộn xuống cuối mỗi khi messages thay đổi
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollTo({
        top: bottomRef.current.scrollHeight,
        behavior: 'smooth' 
      });
    }
  }, [messages]);


  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = {
      senderName: username,
      recipientName: friendUsername,
      content: text,
      timestamp: new Date(),
    };

    sendPrivateMessage(msg);
    setMessages(prev => [...prev, msg]); 
    setText("");
  };

  // --- Giao diện Trạng thái Chờ (Empty State) ---
  if (!friendUsername) {
    return (
      <div className="flex flex-col items-center justify-center h-full rounded-2xl bg-white shadow-xl shadow-gray-200 animate-fadeIn border border-gray-100">
        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-blue-50 shadow-inner shadow-blue-100 mb-6">
          <MessageSquare className="w-16 h-16 text-blue-500"/>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
          Sẵn Sàng Trò Chuyện?
        </h2>
        <p className="text-gray-500 text-lg">
          Hãy chọn <span className="text-blue-600 font-semibold">một người bạn</span> từ danh sách để bắt đầu cuộc trò chuyện riêng tư!
        </p>
        <div className="w-20 h-1 bg-blue-500 rounded-full mt-8 opacity-75"></div>
      </div>
    );
  }

  // --- Giao diện Chat Chính ---
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
      
      {/* HEADER */}
      <div className="p-4 border-b border-gray-200 bg-blue-50 flex items-center shadow-md">
        <User className="w-6 h-6 text-blue-600 mr-3"/>
        <h2 className="text-xl font-bold text-gray-800">
          Chat với <span className="text-blue-600">{friendUsername}</span>
        </h2>
      </div>

      {/* KHUNG HIỂN THỊ TIN NHẮN */}
      <div
        // 1. Thêm 'flex flex-col' và xóa 'space-y-3'
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col"
        ref={bottomRef}
      >
        {/* 2. Thêm 'mt-auto' và 'space-y-3' vào div bọc bên trong */}
        <div className="flex flex-col mt-auto space-y-3"> 
          {messages.map((m, idx) => {
            const isMyMessage = m.senderName === username;
            const time = m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Vừa gửi';

            return (
              <div
                key={idx}
                // 3. Xóa 'my-1' (vì space-y-3 đã xử lý)
                className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] md:max-w-[55%] p-3 rounded-xl shadow-sm ${
                    isMyMessage
                      ? "bg-blue-500 text-white rounded-br-none" 
                      : "bg-gray-200 text-gray-800 rounded-tl-none" 
                  }`}
                >
                  {!isMyMessage && (
                    <div className="text-xs font-semibold mb-1 text-blue-600">
                        {m.senderName}
                    </div>
                  )}
                  <div>{m.content}</div>
                  <div className={`text-xs mt-1 ${isMyMessage ? "text-blue-200" : "text-gray-500"}`}>
                    {time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ô NHẬP + NÚT GỬI */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex space-x-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-inner"
            placeholder={`Nhắn tin cho ${friendUsername}...`}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            disabled={!text.trim()}
          >
            <Send className="w-5 h-5 -rotate-45 ml-1"/>
          </button>
        </div>
      </div>
    </div>
  );
}