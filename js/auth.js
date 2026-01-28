// Authentication System for Lux Properties - UPDATED FIXED VERSION

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        this.loadUser();
        this.setupEventListeners();
        this.updateUI();
    }
    
    loadUser() {
        try {
            const userData = localStorage.getItem('lux_user');
            if (userData) {
                this.currentUser = JSON.parse(userData);
                console.log('User loaded:', this.currentUser);
            }
        } catch (error) {
            console.error('Error loading user:', error);
            this.currentUser = null;
        }
    }
    
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }
        
        // Toggle between login and signup
        const toggleLinks = document.querySelectorAll('.toggle-form');
        toggleLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleForm();
            });
        });
    }
    
    handleLogin(e) {
        e.preventDefault();
        console.log('Login attempt');
        
        const form = e.target;
        const email = form.querySelector('#loginEmail').value;
        const password = form.querySelector('#loginPassword').value;
        
        console.log('Email:', email, 'Password:', password);
        
        // Simple validation
        if (!email || !password) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('lux_users') || '[]');
        console.log('Users in storage:', users);
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            console.log('User found:', user);
            this.login(user);
        } else {
            console.log('User not found or password incorrect');
            this.showMessage('Invalid email or password', 'error');
            
            // For demo purposes, create a test user if none exists
            if (users.length === 0) {
                this.createDemoUser();
            }
        }
    }
    
    createDemoUser() {
        console.log('Creating demo user...');
        const demoUser = {
            id: Date.now(),
            name: 'Demo User',
            email: 'demo@luxproperties.com',
            phone: '+234 80*******',
            password: 'demo123',
            joinedDate: new Date().toISOString(),
            savedProperties: [],
            recentViews: [],
            activeChats: []
        };
        
        const users = [demoUser];
        localStorage.setItem('lux_users', JSON.stringify(users));
        
        this.showMessage('Demo user created. Use email: demo@luxproperties.com, password: demo123', 'info');
    }
    
    handleSignup(e) {
        e.preventDefault();
        console.log('Signup attempt');
        
        const form = e.target;
        const name = form.querySelector('#signupName').value;
        const email = form.querySelector('#signupEmail').value;
        const phone = form.querySelector('#signupPhone').value;
        const password = form.querySelector('#signupPassword').value;
        const confirmPassword = form.querySelector('#signupConfirmPassword').value;
        
        console.log('Signup data:', { name, email, phone, password, confirmPassword });
        
        // Validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showMessage('Password must be at least 6 characters', 'error');
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('lux_users') || '[]');
        if (users.some(u => u.email === email)) {
            this.showMessage('User with this email already exists', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            joinedDate: new Date().toISOString(),
            savedProperties: [],
            recentViews: [],
            activeChats: []
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('lux_users', JSON.stringify(users));
        
        console.log('User created:', newUser);
        
        // Auto login
        this.login(newUser);
        this.showMessage('Account created successfully!', 'success');
    }
    
    login(user) {
        console.log('Logging in user:', user);
        
        // Remove password before storing in session
        const { password, ...userWithoutPassword } = user;
        this.currentUser = userWithoutPassword;
        
        // Save to localStorage
        localStorage.setItem('lux_user', JSON.stringify(userWithoutPassword));
        console.log('User saved to localStorage');
        
        // Update UI
        this.updateUI();
        
        // Redirect to dashboard
        setTimeout(() => {
            console.log('Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
        }, 1000);
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('lux_user');
        this.updateUI();
        window.location.href = 'index.html';
    }
    
    updateUI() {
        console.log('Updating UI, current user:', this.currentUser);
        
        const authLink = document.getElementById('authLink');
        const dashboardName = document.getElementById('dashboardName');
        const userGreeting = document.getElementById('userGreeting');
        
        if (this.currentUser) {
            console.log('User is logged in');
            // Update navigation
            if (authLink) {
                authLink.textContent = 'Dashboard';
                authLink.href = 'dashboard.html';
                console.log('Auth link updated to Dashboard');
            }
            
            // Update dashboard
            if (dashboardName) {
                dashboardName.textContent = this.currentUser.name;
                console.log('Dashboard name updated:', this.currentUser.name);
            }
            
            if (userGreeting) {
                userGreeting.textContent = `Welcome back, ${this.currentUser.name.split(' ')[0]}`;
                console.log('User greeting updated');
            }
            
            // Load dashboard data
            if (window.location.pathname.includes('dashboard.html')) {
                console.log('Loading dashboard data...');
                this.loadDashboardData();
            }
        } else {
            console.log('No user logged in');
            if (authLink) {
                authLink.textContent = 'Login';
                authLink.href = 'login.html';
            }
        }
    }
    
    toggleForm() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const toggleText = document.getElementById('toggleText');
        
        if (loginForm && signupForm && toggleText) {
            const isLogin = loginForm.style.display !== 'none';
            
            if (isLogin) {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
                toggleText.innerHTML = 'Already have an account? <a href="#" class="toggle-form">Login</a>';
            } else {
                signupForm.style.display = 'block';
                loginForm.style.display = 'block';
                toggleText.innerHTML = "Don't have an account? <a href="#" class="toggle-form">Sign up</a>";
            }
        }
    }
    
    showMessage(message, type = 'info') {
        console.log(`Showing ${type} message:`, message);
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `auth-message auth-message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 12px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            background: ${type === 'success' ? '#38a169' : type === 'error' ? '#c53030' : '#3182ce'};
            color: white;
            font-weight: 500;
            animation: fadeIn 0.3s ease;
        `;
        
        // Find where to insert the message
        const container = document.querySelector('.auth-form') || document.querySelector('.auth-container');
        if (container) {
            const existingMessage = container.querySelector('.auth-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            container.insertBefore(messageEl, container.firstChild);
            
            // Auto remove after 5 seconds
            if (type !== 'success') {
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.remove();
                    }
                }, 5000);
            }
        }
    }
    
    loadDashboardData() {
        console.log('Loading dashboard data for user:', this.currentUser);
        
        // Load saved properties
        this.loadSavedProperties();
        
        // Load recent views
        this.loadRecentViews();
        
        // Load active chats
        this.loadActiveChats();
    }
    
    loadSavedProperties() {
        const container = document.getElementById('savedProperties');
        if (!container || !this.currentUser) {
            console.log('No saved properties container or user');
            return;
        }
        
        const savedProperties = this.currentUser.savedProperties || [];
        console.log('Saved properties:', savedProperties);
        
        if (savedProperties.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <h3>No Saved Properties</h3>
                    <p>Properties you save will appear here</p>
                </div>
            `;
        } else {
            // Display saved properties
            container.innerHTML = savedProperties.map(property => `
                <div class="dashboard-property">
                    <img src="${property.image}" alt="${property.title}">
                    <div class="property-info">
                        <h4>${property.title}</h4>
                        <p>${property.location}</p>
                        <div class="property-price">${property.price}</div>
                    </div>
                    <button class="remove-saved" onclick="authSystem.removeSavedProperty(${property.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }
    
    loadRecentViews() {
        const container = document.getElementById('recentViews');
        if (!container || !this.currentUser) {
            console.log('No recent views container or user');
            return;
        }
        
        const recentViews = this.currentUser.recentViews || [];
        console.log('Recent views:', recentViews);
        
        if (recentViews.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-eye"></i>
                    <h3>No Recent Views</h3>
                    <p>Properties you view will appear here</p>
                </div>
            `;
        } else {
            // Display recent views
            container.innerHTML = recentViews.map(property => `
                <div class="dashboard-property">
                    <img src="${property.image}" alt="${property.title}">
                    <div class="property-info">
                        <h4>${property.title}</h4>
                        <p>${property.location}</p>
                        <div class="property-price">${property.price}</div>
                    </div>
                    <a href="property-details.html?id=${property.id}" class="view-again">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            `).join('');
        }
    }
    
    loadActiveChats() {
        const container = document.getElementById('activeChats');
        if (!container || !this.currentUser) {
            console.log('No active chats container or user');
            return;
        }
        
        // Get chats from localStorage
        const messages = JSON.parse(localStorage.getItem('lux_chat_messages') || '[]');
        console.log('Chat messages:', messages);
        
        if (messages.length <= 1) { // Only has welcome message
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-comments"></i>
                    <h3>No Active Chats</h3>
                    <p>Start a chat with an agent to see conversations here</p>
                </div>
            `;
        } else {
            // Display recent chats
            container.innerHTML = `
                <div class="dashboard-chat">
                    <div class="chat-preview">
                        <div class="chat-agent">
                            <i class="fas fa-user-tie"></i>
                            <span>Admin</span>
                        </div>
                        <div class="chat-last-message">
                            ${messages[messages.length - 1].message.substring(0, 50)}...
                        </div>
                        <button class="continue-chat" onclick="startChatWithAgent('Admin')">
                            <i class="fas fa-comment"></i> Continue Chat
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    saveProperty(property) {
        if (!this.currentUser) {
            this.showMessage('Please login to save properties', 'error');
            return;
        }
        
        console.log('Saving property:', property);
        
        // Load users
        const users = JSON.parse(localStorage.getItem('lux_users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) {
            console.log('User not found in users array');
            return;
        }
        
        // Add property to saved
        if (!users[userIndex].savedProperties) {
            users[userIndex].savedProperties = [];
        }
        
        // Check if already saved
        if (!users[userIndex].savedProperties.some(p => p.id === property.id)) {
            users[userIndex].savedProperties.push(property);
            
            // Update current user
            this.currentUser.savedProperties = users[userIndex].savedProperties;
            
            // Save to localStorage
            localStorage.setItem('lux_users', JSON.stringify(users));
            localStorage.setItem('lux_user', JSON.stringify(this.currentUser));
            
            console.log('Property saved successfully');
            this.showMessage('Property saved to your favorites', 'success');
            
            // Update dashboard if open
            if (window.location.pathname.includes('dashboard.html')) {
                this.loadSavedProperties();
            }
        } else {
            console.log('Property already saved');
            this.showMessage('Property already in your favorites', 'info');
        }
    }
    
    removeSavedProperty(propertyId) {
        if (!this.currentUser) return;
        
        console.log('Removing property:', propertyId);
        
        const users = JSON.parse(localStorage.getItem('lux_users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) return;
        
        // Remove property
        users[userIndex].savedProperties = users[userIndex].savedProperties.filter(
            p => p.id !== propertyId
        );
        
        // Update current user
        this.currentUser.savedProperties = users[userIndex].savedProperties;
        
        // Save to localStorage
        localStorage.setItem('lux_users', JSON.stringify(users));
        localStorage.setItem('lux_user', JSON.stringify(this.currentUser));
        
        console.log('Property removed successfully');
        
        // Reload saved properties
        this.loadSavedProperties();
    }
    
    addRecentView(property) {
        if (!this.currentUser) {
            console.log('No user logged in, skipping recent view');
            return;
        }
        
        console.log('Adding recent view:', property);
        
        const users = JSON.parse(localStorage.getItem('lux_users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) {
            console.log('User not found in users array');
            return;
        }
        
        // Initialize recent views if not exists
        if (!users[userIndex].recentViews) {
            users[userIndex].recentViews = [];
        }
        
        // Remove if already exists (to bring to front)
        users[userIndex].recentViews = users[userIndex].recentViews.filter(
            p => p.id !== property.id
        );
        
        // Add to beginning
        users[userIndex].recentViews.unshift(property);
        
        // Keep only last 10 views
        if (users[userIndex].recentViews.length > 10) {
            users[userIndex].recentViews = users[userIndex].recentViews.slice(0, 10);
        }
        
        // Update current user
        this.currentUser.recentViews = users[userIndex].recentViews;
        
        // Save to localStorage
        localStorage.setItem('lux_users', JSON.stringify(users));
        localStorage.setItem('lux_user', JSON.stringify(this.currentUser));
        
        console.log('Recent view added successfully');
    }
}

// Initialize auth system globally
let authSystem = null;

function initAuth() {
    if (!authSystem) {
        console.log('Initializing auth system...');
        authSystem = new AuthSystem();
    }
    return authSystem;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing auth...');
    initAuth();
    
    // Also check auth status for navigation
    const user = JSON.parse(localStorage.getItem('lux_user'));
    const authLink = document.getElementById('authLink');
    
    if (user && authLink) {
        authLink.textContent = 'Dashboard';
        authLink.href = 'dashboard.html';
    }
});

// Make functions globally available
window.saveProperty = function(property) {
    console.log('Global saveProperty called:', property);
    const auth = initAuth();
    auth.saveProperty(property);
};

window.addRecentView = function(property) {
    console.log('Global addRecentView called:', property);
    const auth = initAuth();
    auth.addRecentView(property);
};

// Export for debugging
window.authSystem = authSystem;