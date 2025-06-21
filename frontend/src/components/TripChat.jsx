import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useTripStore } from "@/store/useTripStore";
import { useAuthStore } from "@/store/useAuthStore";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const TripChat = () => {
  const { trip } = useTripStore();
  const { authUser } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (trip?._id) {
      socket.emit("joinRoom", trip._id);
    }
  }, [trip]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("sendMessage", {
        tripId: trip._id,
        message: input,
        sender: authUser?.name || "Anonymous",
      });
      setInput("");
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md mt-6">
      <h3 className="text-lg font-bold mb-2">💬 Trip Chat</h3>
      <div className="h-64 overflow-y-auto border p-3 rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <strong>{msg.sender}</strong>: {msg.message}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex mt-3 gap-2">
        <input
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TripChat;
