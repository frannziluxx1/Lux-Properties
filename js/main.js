// Main JavaScript for Lux Properties - UPDATED

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js: DOM loaded');
    
    // Initialize all components
    initNavigation();
    initLoadingScreen();
    initPropertyCards();
    initStatsCounter();
    initScrollAnimations();
    initMobileMenu();
    
    // Check auth status - FIXED VERSION
    checkAuthStatus();
    
    // Load featured properties on home page
    if (document.getElementById('featuredProperties')) {
        loadFeaturedProperties();
    }
});

// Navigation initialization
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Loading screen animation
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (loadingScreen) {
        // Hide loading screen after animations complete
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            // Start hero animations
            startHeroAnimations();
            
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2500);
    }
}

// Hero section animations
function startHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.animation = 'revealText 1s ease forwards';
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.classList.add('fade-in-up');
        }, 500);
    }
    
    if (heroCta) {
        setTimeout(() => {
            heroCta.classList.add('fade-in-up', 'delay-2');
        }, 800);
    }
}

// Load featured properties
function loadFeaturedProperties() {
    const featuredProperties = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Luxury Villa, Banana Island',
            location: 'Lagos, Nigeria',
            price: '₦450,000,000',
            type: 'For Sale',
            bedrooms: 5,
            bathrooms: 6,
            sqft: '4500'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Modern Duplex, Maitama',
            location: 'Abuja, Nigeria',
            price: '₦280,000,000',
            type: 'For Sale',
            bedrooms: 4,
            bathrooms: 4,
            sqft: '3200'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Waterfront Apartment',
            location: 'Port Harcourt, Nigeria',
            price: '₦85,000,000',
            type: 'For Sale',
            bedrooms: 3,
            bathrooms: 3,
            sqft: '2200'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Executive Bungalow',
            location: 'Ibadan, Nigeria',
            price: '₦65,000,000',
            type: 'For Sale',
            bedrooms: 4,
            bathrooms: 3,
            sqft: '2800'
        }
    ];
    
    const container = document.getElementById('featuredProperties');
    
    featuredProperties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        container.appendChild(propertyCard);
        
        // Add staggered animation
        setTimeout(() => {
            propertyCard.classList.add('revealed');
        }, 300);
    });
}

// Create property card element
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card reveal-on-scroll';
    card.innerHTML = `
        <a href="property-details.html?id=${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-badge">${property.type}</div>
                <button class="chat-agent-btn" onclick="event.preventDefault(); startChatWithAgent('Agent ${property.id}')">
                    <i class="fas fa-comment"></i> Chat Agent
                </button>
            </div>
            <div class="property-content">
                <div class="property-price">${property.price}</div>
                <h3>${property.title}</h3>
                <div class="property-address">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${property.location}</span>
                </div>
                <div class="property-features">
                    <div class="feature">
                        <i class="fas fa-bed"></i>
                        <span>${property.bedrooms} Beds</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-bath"></i>
                        <span>${property.bathrooms} Baths</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${property.sqft} Sqft</span>
                    </div>
                </div>
            </div>
        </a>
    `;
    
    return card;
}

// Stats counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                animateCounter(element, target);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.getAttribute('data-count') > 98 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.getAttribute('data-count') > 98 ? '%' : '+');
        }
    }, 30);
}

// Scroll animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => observer.observe(element));
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Check authentication status - UPDATED FIXED VERSION
function checkAuthStatus() {
    console.log('Checking authentication status...');
    
    try {
        const userData = localStorage.getItem('lux_user');
        console.log('User data from localStorage:', userData);
        
        const user = userData ? JSON.parse(userData) : null;
        const authLink = document.getElementById('authLink');
        
        console.log('Parsed user:', user);
        console.log('Auth link found:', !!authLink);
        
        if (user && authLink) {
            console.log('User is logged in, updating link to Dashboard');
            authLink.textContent = 'Dashboard';
            authLink.href = 'dashboard.html';
            
            // If on login page, redirect to dashboard
            if (window.location.pathname.includes('login.html') || window.location.pathname.endsWith('login.html')) {
                console.log('On login page, redirecting to dashboard');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            }
        } else if (authLink) {
            console.log('No user logged in, keeping link as Login');
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
        }
    } catch (error) {
        console.error('Error in checkAuthStatus:', error);
        
        // Reset auth link on error
        const authLink = document.getElementById('authLink');
        if (authLink) {
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
        }
    }
}

// Start chat with agent
function startChatWithAgent(agentName) {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    
    // Store agent info for chat
    sessionStorage.setItem('currentAgent', agentName);
    
    // Open chat widget
    if (chatWidget && chatToggle) {
        chatWidget.classList.add('open');
        chatToggle.style.display = 'none';
        
        // Initialize chat if not already initialized
        if (typeof initChat === 'function') {
            initChat();
        }
    }
}

// Format Nigerian price
function formatNigerianPrice(amount) {
    return '₦' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData);
    
    // Simple validation
    if (!formValues.name || !formValues.email || !formValues.message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // In a real application, you would send this data to a server
    console.log('Contact form submitted:', formValues);
    
    // Show success message
    showNotification('Message sent successfully! We will contact you soon.', 'success');
    form.reset();
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#38a169' : type === 'error' ? '#c53030' : '#3182ce'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(120%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Make functions globally available
window.handleContactForm = handleContactForm;
window.startChatWithAgent = startChatWithAgent;
window.scrollToSection = scrollToSection;
window.formatNigerianPrice = formatNigerianPrice;

// Add demo user creation for testing
function createDemoUserIfNeeded() {
    const users = JSON.parse(localStorage.getItem('lux_users') || '[]');
    if (users.length === 0) {
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
        
        users.push(demoUser);
        localStorage.setItem('lux_users', JSON.stringify(users));
        console.log('Demo user created for testing');
    }
}

// Auto-create demo user on home page load for testing
if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(createDemoUserIfNeeded, 1000);
    });
}