import React from 'react';
import ChatAgent from '../components/ui/ChatAgent';

const ChatAgentPage = () => {
  return (
    <div className="page-container" style={{ 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '40px'
    }}>
      <ChatAgent />
    </div>
  );
};

export default ChatAgentPage;
