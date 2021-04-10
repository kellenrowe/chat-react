import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const SERVER = "http://localhost:8000";

/** Custom Hook
 *
 *  roomName passed down when hook is called
 */
function useChat(roomName) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SERVER, {
      query: { roomName },
    });

    // Listens for incoming messages
    socketRef.current.on("newChat", (message) => {
      const incomingMessage = {
        ...message,
        sentByMe: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
      setIsTyping(false);
    });

    socketRef.current.on("userIsTyping", function (handle) {
      setIsTyping(true);
    });

    socketRef.current.on("userNotTyping", function () {
      setIsTyping(false);
    });

    // ends connection
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomName]);

  function sendMessage(fData) {
    socketRef.current.emit("newChat", {
      msg: fData.msg,
      handle: fData.handle,
      senderId: socketRef.current.id,
    });
  }

  function sendUserIsTyping(handle) {
    socketRef.current.emit("userIsTyping", handle);
  }

  function sendUserNotTyping() {
    socketRef.current.emit("userNotTyping");
  }

  return {
    messages,
    sendMessage,
    sendUserIsTyping,
    isTyping,
    sendUserNotTyping,
  };
}

export default useChat;
