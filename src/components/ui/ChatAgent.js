import React, { useState, useEffect, useRef } from 'react';
import './ChatAgent.css';

// Adaptive Card definitions
const adaptiveCards = [
  {
    id: 'welcome',
    type: 'message',
    message: "👋 Welcome! I'm here to collect some information from you. Let's start with your name."
  },
  {
    id: 'name',
    type: 'AdaptiveCard',
    version: '1.3',
    body: [
      {
        type: 'TextBlock',
        text: 'What is your name?',
        weight: 'Bolder',
        size: 'Medium'
      },
      {
        type: 'Input.Text',
        id: 'name',
        placeholder: 'Enter your full name',
        isRequired: true
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Next',
        data: { field: 'name' }
      }
    ]
  },
  {
    id: 'email',
    type: 'AdaptiveCard',
    version: '1.3',
    body: [
      {
        type: 'TextBlock',
        text: 'What is your email address?',
        weight: 'Bolder',
        size: 'Medium'
      },
      {
        type: 'Input.Text',
        id: 'email',
        placeholder: 'Enter your email',
        style: 'Email',
        isRequired: true
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Next',
        data: { field: 'email' }
      }
    ]
  },
  {
    id: 'phone',
    type: 'AdaptiveCard',
    version: '1.3',
    body: [
      {
        type: 'TextBlock',
        text: 'What is your phone number?',
        weight: 'Bolder',
        size: 'Medium'
      },
      {
        type: 'Input.Text',
        id: 'phone',
        placeholder: 'Enter your phone number',
        style: 'Tel',
        isRequired: true
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Next',
        data: { field: 'phone' }
      }
    ]
  },
  {
    id: 'company',
    type: 'AdaptiveCard',
    version: '1.3',
    body: [
      {
        type: 'TextBlock',
        text: 'Which company do you work for?',
        weight: 'Bolder',
        size: 'Medium'
      },
      {
        type: 'Input.Text',
        id: 'company',
        placeholder: 'Enter your company name',
        isRequired: true
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Next',
        data: { field: 'company' }
      }
    ]
  },
  {
    id: 'position',
    type: 'AdaptiveCard',
    version: '1.3',
    body: [
      {
        type: 'TextBlock',
        text: 'What is your position/role?',
        weight: 'Bolder',
        size: 'Medium'
      },
      {
        type: 'Input.ChoiceSet',
        id: 'position',
        style: 'compact',
        isRequired: true,
        choices: [
          { title: 'Executive/C-Level', value: 'executive' },
          { title: 'Manager', value: 'manager' },
          { title: 'Developer', value: 'developer' },
          { title: 'Designer', value: 'designer' },
          { title: 'HR Professional', value: 'hr' },
          { title: 'Other', value: 'other' }
        ]
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Submit',
        data: { field: 'position' }
      }
    ]
  },
  {
    id: 'complete',
    type: 'profile-card',
    message: "✅ Thank you! Your information has been saved successfully. We'll be in touch soon!"
  }
];

const ChatAgent = () => {
  const [messages, setMessages] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userData, setUserData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    // Show welcome message
    const welcomeCard = adaptiveCards[0];
    setMessages([{ type: 'bot', content: welcomeCard }]);
    
    // Show first card after a delay
    setTimeout(() => {
      const firstCard = adaptiveCards[1];
      setMessages(prev => [...prev, { type: 'bot', content: firstCard }]);
      setCurrentCardIndex(1);
    }, 1000);
  }, []);

  const handleSubmit = async (e, card) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const field = card.actions[0].data.field;
    const value = formData.get(field);

    if (!value || value.trim() === '') {
      alert('Please fill in the required field');
      return;
    }

    // Update user data
    const newUserData = { ...userData, [field]: value };
    setUserData(newUserData);

    // Remove the current card and add user's response
    setMessages(prev => {
      const updated = [...prev];
      updated.pop(); // Remove the current bot question card
      return [...updated, { 
        type: 'user', 
        content: { message: value } 
      }];
    });

    // Move to next card
    const nextIndex = currentCardIndex + 1;
    
    if (nextIndex < adaptiveCards.length) {
      setTimeout(() => {
        const nextCard = adaptiveCards[nextIndex];
        setMessages(prev => [...prev, { type: 'bot', content: nextCard }]);
        setCurrentCardIndex(nextIndex);

        // If this is the last card submission, save to backend
        if (nextCard.id === 'complete') {
          saveToExcel(newUserData);
        }
      }, 500);
    }
  };

  const saveToExcel = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: { 
          type: 'message', 
          message: '⚠️ There was an error saving your data. Please try again or contact support.' 
        } 
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAdaptiveCard = (card, index) => {
    if (card.type === 'message') {
      return (
        <div className="chat-message bot-message" key={index}>
          <div className="message-avatar">🤖</div>
          <div className="message-content">
            <p>{card.message}</p>
          </div>
        </div>
      );
    }

    if (card.type === 'profile-card') {
      return (
        <div className="profile-card-container" key={index}>
          <div className="profile-card">
            <div className="profile-card-header">
              <div className="profile-avatar">
                {userData.name ? userData.name.charAt(0).toUpperCase() : '👤'}
              </div>
              <div className="profile-header-content">
                <h2>{userData.name || 'User'}</h2>
                <p>{userData.position ? userData.position.charAt(0).toUpperCase() + userData.position.slice(1) : 'Position'}</p>
              </div>
            </div>
            
            <div className="profile-card-body">
              <div className="profile-info-item">
                <div className="info-icon">📧</div>
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <span className="info-value">{userData.email}</span>
                </div>
              </div>
              
              <div className="profile-info-item">
                <div className="info-icon">📱</div>
                <div className="info-content">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{userData.phone}</span>
                </div>
              </div>
              
              <div className="profile-info-item">
                <div className="info-icon">🏢</div>
                <div className="info-content">
                  <span className="info-label">Company</span>
                  <span className="info-value">{userData.company}</span>
                </div>
              </div>
            </div>
            
            <div className="profile-card-footer">
              <div className="success-message">
                <span className="success-icon">✅</span>
                <p>{card.message}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="chat-message bot-message" key={index}>
        <div className="message-avatar">🤖</div>
        <div className="adaptive-card">
          <form onSubmit={(e) => handleSubmit(e, card)}>
            <div className="card-body">
              {card.body.map((element, idx) => {
                if (element.type === 'TextBlock') {
                  return (
                    <h3 key={idx} className="card-title">
                      {element.text}
                    </h3>
                  );
                }
                if (element.type === 'Input.Text') {
                  return (
                    <input
                      key={idx}
                      type={element.style === 'Email' ? 'email' : element.style === 'Tel' ? 'tel' : 'text'}
                      name={element.id}
                      placeholder={element.placeholder}
                      required={element.isRequired}
                      className="card-input"
                    />
                  );
                }
                if (element.type === 'Input.ChoiceSet') {
                  return (
                    <select
                      key={idx}
                      name={element.id}
                      required={element.isRequired}
                      className="card-select"
                    >
                      <option value="">Select an option...</option>
                      {element.choices.map((choice, choiceIdx) => (
                        <option key={choiceIdx} value={choice.value}>
                          {choice.title}
                        </option>
                      ))}
                    </select>
                  );
                }
                return null;
              })}
            </div>
            <div className="card-actions">
              {card.actions.map((action, idx) => (
                <button key={idx} type="submit" className="card-button">
                  {action.title}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="chat-agent-container">
      <div className="chat-header">
        <h2>💬 Data Collection Chat Agent</h2>
        <p>Please answer the questions to help us serve you better</p>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => {
          if (msg.type === 'user') {
            return (
              <div className="chat-message user-message" key={index}>
                <div className="message-content">
                  <p>{msg.content.message}</p>
                </div>
                <div className="message-avatar">👤</div>
              </div>
            );
          } else {
            return renderAdaptiveCard(msg.content, index);
          }
        })}
        {isSubmitting && (
          <div className="chat-message bot-message">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <p className="typing-indicator">Saving your data...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatAgent;
