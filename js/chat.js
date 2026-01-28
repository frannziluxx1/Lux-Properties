// Chat System for Lux Properties

class ChatSystem {
    constructor() {
        this.chatOpen = false;
        this.currentUser = null;
        this.currentAgent = 'Admin';
        this.messages = [];
        this.init();
    }
    
    init() {
        this.loadMessages();
        this.setupEventListeners();
        this.setupLocalStorageSync();
    }
    
    loadMessages() {
        const savedMessages = localStorage.getItem('lux_chat_messages');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
        } else {
            // Default welcome message
            this.messages = [{
                id: 1,
                sender: 'Admin',
                message: 'Hello! Welcome to Lux Properties. How can I assist you today?',
                timestamp: new Date().toISOString(),
                type: 'received'
            }];
            this.saveMessages();
        }
        
        this.renderMessages();
    }
    
    saveMessages() {
        localStorage.setItem('lux_chat_messages', JSON.stringify(this.messages));
    }
    
    setupEventListeners() {
        // Chat toggle
        const chatToggle = document.getElementById('chatToggle');
        const chatClose = document.getElementById('chatClose');
        const sendBtn = document.getElementById('sendMessage');
        const chatInput = document.getElementById('chatInput');
        
        if (chatToggle) {
            chatToggle.addEventListener('click', () => this.toggleChat());
        }
        
        if (chatClose) {
            chatClose.addEventListener('click', () => this.closeChat());
        }
        
        if (sendBtn && chatInput) {
            sendBtn.addEventListener('click', () => this.sendMessage());
            
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }
    
    setupLocalStorageSync() {
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'lux_chat_messages') {
                this.messages = JSON.parse(e.newValue || '[]');
                this.renderMessages();
            }
        });
    }
    
    toggleChat() {
        const chatWidget = document.getElementById('chatWidget');
        const chatToggle = document.getElementById('chatToggle');
        
        this.chatOpen = !this.chatOpen;
        
        if (this.chatOpen) {
            chatWidget.classList.add('open');
            chatToggle.style.display = 'none';
            
            // Focus input field
            setTimeout(() => {
                const input = document.getElementById('chatInput');
                if (input) input.focus();
            }, 300);
        } else {
            this.closeChat();
        }
    }
    
    closeChat() {
        const chatWidget = document.getElementById('chatWidget');
        const chatToggle = document.getElementById('chatToggle');
        
        chatWidget.classList.remove('open');
        chatToggle.style.display = 'flex';
        this.chatOpen = false;
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'sent');
        input.value = '';
        
        // Simulate agent response after delay
        setTimeout(() => {
            this.generateAgentResponse(message);
        }, 1000);
    }
    
    addMessage(message, type) {
        const newMessage = {
            id: Date.now(),
            sender: type === 'sent' ? 'You' : this.currentAgent,
            message: message,
            timestamp: new Date().toISOString(),
            type: type
        };
        
        this.messages.push(newMessage);
        this.saveMessages();
        this.renderMessages();
        
        // Scroll to bottom
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    generateAgentResponse(userMessage) {
        const responses = [
            "Thank you for your inquiry. One of our agents will get back to you shortly with more details.",
            "I can help you with that. Could you provide more specific details about what you're looking for?",
            "We have several properties that might interest you. Would you like me to send you some listings?",
            "For property viewings, our agents are available Monday to Friday, 9 AM to 6 PM. Would you like to schedule one?",
            "That's a great question. Let me connect you with a specialist agent who can provide detailed information."
        ];
        
        // Simple keyword-based response
        const message = userMessage.toLowerCase();
        let response;
        
        if (message.includes('price') || message.includes('cost')) {
            response = "Property prices vary based on location, size, and amenities. I can connect you with an agent for specific pricing.";
        } else if (message.includes('view') || message.includes('visit')) {
            response = "Property viewings can be scheduled through our agents. Would you like me to arrange one for you?";
        } else if (message.includes('location') || message.includes('area')) {
            response = "We have properties across major Nigerian cities including Lagos, Abuja, Port Harcourt, and Ibadan.";
        } else if (message.includes('contact') || message.includes('call')) {
            response = "You can reach us at +234 90******* or email info@luxproperties.com. Our office hours are 9 AM to 6 PM, Monday to Friday.";
        } else {
            response = responses[Math.floor(Math.random() * responses.length)];
        }
        
        this.addMessage(response, 'received');
    }
    
    renderMessages() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        chatMessages.innerHTML = '';
        
        this.messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.className = `chat-message ${msg.type}`;
            
            const time = new Date(msg.timestamp);
            const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-sender">${msg.sender}</div>
                    <div class="message-text">${msg.message}</div>
                    <div class="message-time">${timeString}</div>
                </div>
            `;
            
            chatMessages.appendChild(messageElement);
        });
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    startChatWithAgent(agentName) {
        this.currentAgent = agentName;
        this.closeChat(); // Close if open
        
        setTimeout(() => {
            this.toggleChat();
            
            // Add agent greeting
            setTimeout(() => {
                this.addMessage(`Hello! This is ${agentName}. How can I assist you with your property inquiry?`, 'received');
            }, 500);
        }, 300);
    }
}

// Initialize chat system
let chatSystem;

function initChat() {
    if (!chatSystem) {
        chatSystem = new ChatSystem();
    }
    return chatSystem;
}

// Make functions globally available
window.startChatWithAgent = function(agentName) {
    const chat = initChat();
    chat.startChatWithAgent(agentName);
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initChat();
});