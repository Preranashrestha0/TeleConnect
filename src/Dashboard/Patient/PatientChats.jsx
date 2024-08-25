import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';

const ChatPage = () => {
  const { doctorId } = useParams(); // Get the doctor's ID from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    // Fetch the messages between the logged-in patient and the selected doctor
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`/api/messages/${doctorId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [doctorId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await axiosInstance.post('/api/messages/send', {
        receiver: doctorId,
        message: newMessage,
      });

      // Update messages with the newly sent message
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === userId ? 'from-doctor' : 'from-patient'}`}>
            <p>{msg.message}</p>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="send-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
