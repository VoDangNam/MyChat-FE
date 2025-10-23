import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";


let stompClient = null;

export const connectWebSocket = (username, onMessageReceived) => {
  const socket = new SockJS('http://localhost:8081/ws'); // backend phải config endpoint /ws
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => console.log(str),
    onConnect: () => {
      console.log('✅ WebSocket connected!');
      // Lắng nghe tin nhắn riêng
      stompClient.subscribe(`/user/${username}/queue/message`, (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    },
  });

  stompClient.activate();
};

export const sendPrivateMessage = (msgObj) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/chat.privateMessage', // mapping backend
      body: JSON.stringify(msgObj),
    });
  } else {
    console.error("❌ STOMP client chưa kết nối");
  }
};
