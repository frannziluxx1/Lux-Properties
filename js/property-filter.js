// Property Filtering System

const properties = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Luxury Villa, Banana Island',
        location: 'Lagos, Nigeria',
        price: 450000000,
        type: 'duplex',
        status: 'sale',
        bedrooms: 5,
        bathrooms: 6,
        sqft: '4500',
        agent: 'John Adekunle'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Modern Duplex, Maitama',
        location: 'Abuja, Nigeria',
        price: 280000000,
        type: 'duplex',
        status: 'sale',
        bedrooms: 4,
        bathrooms: 4,
        sqft: '3200',
        agent: 'Amina Bello'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Waterfront Apartment',
        location: 'Port Harcourt, Nigeria',
        price: 85000000,
        type: 'flat',
        status: 'sale',
        bedrooms: 3,
        bathrooms: 3,
        sqft: '2200',
        agent: 'Chinedu Okoro'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Executive Bungalow',
        location: 'Ibadan, Nigeria',
        price: 65000000,
        type: 'bungalow',
        status: 'sale',
        bedrooms: 4,
        bathrooms: 3,
        sqft: '2800',
        agent: 'Femi Ojo'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Penthouse Apartment, Victoria Island',
        location: 'Lagos, Nigeria',
        price: 320000000,
        type: 'flat',
        status: 'sale',
        bedrooms: 4,
        bathrooms: 4,
        sqft: '3800',
        agent: 'John Adekunle'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Luxury Mansion, Asokoro',
        location: 'Abuja, Nigeria',
        price: 620000000,
        type: 'duplex',
        status: 'sale',
        bedrooms: 6,
        bathrooms: 7,
        sqft: '5200',
        agent: 'Amina Bello'
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Modern Townhouse, GRA',
        location: 'Port Harcourt, Nigeria',
        price: 185000000,
        type: 'duplex',
        status: 'sale',
        bedrooms: 4,
        bathrooms: 4,
        sqft: '3000',
        agent: 'Chinedu Okoro'
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: '3-Bedroom Flat for Rent',
        location: 'Lagos, Nigeria',
        price: 4500000,
        type: 'flat',
        status: 'rent',
        bedrooms: 3,
        bathrooms: 2,
        sqft: '1800',
        agent: 'John Adekunle'
    },
    {
        id: 9,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Commercial Land, Lekki',
        location: 'Lagos, Nigeria',
        price: 120000000,
        type: 'land',
        status: 'sale',
        size: '1200 sqm',
        agent: 'Femi Ojo'
    },
    {
        id: 10,
        image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Family Bungalow, Bodija',
        location: 'Ibadan, Nigeria',
        price: 55000000,
        type: 'bungalow',
        status: 'sale',
        bedrooms: 3,
        bathrooms: 2,
        sqft: '2200',
        agent: 'Femi Ojo'
    },
    {
        id: 11,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Luxury Apartment for Rent',
        location: 'Abuja, Nigeria',
        price: 6500000,
        type: 'flat',
        status: 'rent',
        bedrooms: 3,
        bathrooms: 3,
        sqft: '2000',
        agent: 'Amina Bello'
    },
    {
        id: 12,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Residential Plot, Enugu',
        location: 'Enugu, Nigeria',
        price: 35000000,
        type: 'land',
        status: 'sale',
        size: '800 sqm',
        agent: 'Ngozi Eze'
    }
];

function loadProperties(filteredProperties = null) {
    const container = document.getElementById('propertiesContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noResults = document.getElementById('noResults');
    
    if (!container) return;
    
    // Show loading
    container.innerHTML = '';
    if (loadingSpinner) loadingSpinner.style.display = 'block';
    if (noResults) noResults.style.display = 'none';
    
    const propertiesToDisplay = filteredProperties || properties;
    
    setTimeout(() => {
        // Hide loading
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        
        if (propertiesToDisplay.length === 0) {
            if (noResults) noResults.style.display = 'block';
            return;
        }
        
        propertiesToDisplay.forEach(property => {
            const card = createPropertyCard(property);
            container.appendChild(card);
            
            // Add staggered animation
            setTimeout(() => {
                card.classList.add('revealed');
            }, 100);
        });
    }, 500);
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card reveal-on-scroll';
    
    const priceFormatted = property.price > 1000000 
        ? `₦${(property.price / 1000000).toFixed(1)}M` 
        : `₦${(property.price / 1000000).toFixed(3)}M`;
    
    const statusText = property.status === 'sale' ? 'For Sale' : 'For Rent';
    const statusClass = property.status === 'sale' ? 'sale' : 'rent';
    
    card.innerHTML = `
        <a href="property-details.html?id=${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <div class="property-badge ${statusClass}">${statusText}</div>
                <button class="chat-agent-btn" onclick="event.preventDefault(); startChatWithAgent('${property.agent}')">
                    <i class="fas fa-comment"></i> Chat Agent
                </button>
            </div>
            <div class="property-content">
                <div class="property-price">${priceFormatted}</div>
                <h3>${property.title}</h3>
                <div class="property-address">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${property.location}</span>
                </div>
                <div class="property-features">
                    ${property.bedrooms ? `
                    <div class="feature">
                        <i class="fas fa-bed"></i>
                        <span>${property.bedrooms} Beds</span>
                    </div>` : ''}
                    ${property.bathrooms ? `
                    <div class="feature">
                        <i class="fas fa-bath"></i>
                        <span>${property.bathrooms} Baths</span>
                    </div>` : ''}
                    ${property.sqft ? `
                    <div class="feature">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${property.sqft} Sqft</span>
                    </div>` : property.size ? `
                    <div class="feature">
                        <i class="fas fa-expand"></i>
                        <span>${property.size}</span>
                    </div>` : ''}
                </div>
            </div>
        </a>
    `;
    
    return card;
}

function applyFilters() {
    const location = document.getElementById('locationFilter')?.value;
    const type = document.getElementById('typeFilter')?.value;
    const price = document.getElementById('priceFilter')?.value;
    const bedrooms = document.getElementById('bedroomFilter')?.value;
    
    let filtered = [...properties];
    
    // Filter by location
    if (location) {
        filtered = filtered.filter(property => {
            const loc = property.location.toLowerCase();
            if (location === 'lagos') return loc.includes('lagos');
            if (location === 'abuja') return loc.includes('abuja');
            if (location === 'port-harcourt') return loc.includes('port harcourt');
            if (location === 'ibadan') return loc.includes('ibadan');
            if (location === 'enugu') return loc.includes('enugu');
            return true;
        });
    }
    
    // Filter by type
    if (type) {
        filtered = filtered.filter(property => property.type === type);
    }
    
    // Filter by price
    if (price) {
        const [min, max] = price.split('-').map(val => {
            if (val.endsWith('+')) return parseFloat(val);
            return parseFloat(val);
        });
        
        filtered = filtered.filter(property => {
            if (max === undefined) {
                return property.price >= min;
            }
            return property.price >= min && property.price <= max;
        });
    }
    
    // Filter by bedrooms
    if (bedrooms) {
        const minBedrooms = parseInt(bedrooms);
        filtered = filtered.filter(property => 
            property.bedrooms && property.bedrooms >= minBedrooms
        );
    }
    
    loadProperties(filtered);
}

function clearFilters() {
    document.getElementById('locationFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('bedroomFilter').value = '';
    
    loadProperties();
}

function initViewToggle() {
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    const container = document.getElementById('propertiesContainer');
    
    if (!gridView || !listView || !container) return;
    
    gridView.addEventListener('click', () => {
        gridView.classList.add('active');
        listView.classList.remove('active');
        container.classList.remove('property-list-view');
    });
    
    listView.addEventListener('click', () => {
        listView.classList.add('active');
        gridView.classList.remove('active');
        container.classList.add('property-list-view');
    });
}

// Make functions globally available
window.applyFilters = applyFilters;
window.clearFilters = clearFilters;