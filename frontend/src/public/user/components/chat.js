import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const LiveChat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_SOCKET); // WebSocket server on port 8081
    setSocket(socketConnection);
    
    // Listen for incoming messages
    socketConnection.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // return () => {
    //   socketConnection.close();
    // };
  }, []);

  const handleSendMessage = () => {
    if (socket && message) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Live Chat</h2>
      <div>
        <div>
          {messages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default LiveChat;