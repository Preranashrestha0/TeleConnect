// ChatComponent.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.role) {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);

      newSocket.emit('join_room', user.role);

      newSocket.on('receive_message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      const messageData = {
        author: user.username,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        role: user.role,
      };

      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage('');
    }
  };

  if (!user || !user.role) {
    return <div className="text-red-500">Error: User not found or role is missing</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f4f4]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Chat</h2>
        <div className="mb-4 h-64 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.author}</strong>: {msg.message} <em>{msg.timestamp}</em>
            </div>
          ))}
        </div>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="w-full bg-[#567fbf] text-white py-2 px-4 rounded-md hover:bg-[#3a5e8c] mt-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
