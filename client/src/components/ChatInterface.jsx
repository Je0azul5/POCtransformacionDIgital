import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setLoading(true);
      setMessages(prev => [...prev, { type: 'user', content: input }]);
      
      console.log('Sending request to:', 'http://localhost:3001/api/chat');
      console.log('Request payload:', { message: input });
      
      const response = await axios.post('http://localhost:3001/api/chat', {
        message: input,
        context: messages.map(m => `${m.type}: ${m.content}`).join('\n')
      });

      console.log('Server response:', response.data);

      setMessages(prev => [...prev, { type: 'bot', content: response.data.message }]);
      setInput('');
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response?.data);
      setMessages(prev => [...prev, { 
        type: 'error', 
        content: `Error: ${error.response?.data?.message || error.message || 'An unexpected error occurred'}` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/test');
        console.log('Backend connection test:', response.data);
      } catch (error) {
        console.error('Backend connection failed:', error);
      }
    };

    testBackendConnection();
  }, []);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
