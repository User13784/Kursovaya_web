const SEARCH_KEYS = {
    SERVICES: 'dental_services',
    DOCTORS: 'dental_doctors',
    FAQ: 'dental_faq',
    PRICES: 'dental_prices'
};

function loadSearchData() {
    const services = JSON.parse(localStorage.getItem(SEARCH_KEYS.SERVICES) || '[]');
    const doctors = JSON.parse(localStorage.getItem(SEARCH_KEYS.DOCTORS) || '[]');
    const faq = JSON.parse(localStorage.getItem(SEARCH_KEYS.FAQ) || '[]');
    const prices = JSON.parse(localStorage.getItem(SEARCH_KEYS.PRICES) || '{}');
    
    let priceServices = [];
    if (prices.services) {
        priceServices = prices.services;
    }
    
    return { services, doctors, faq, priceServices };
}

function performSearch(query) {
    if (!query || query.length < 2) return [];
    
    const searchTerm = query.toLowerCase();
    const { services, doctors, faq, priceServices } = loadSearchData();
    const results = [];
    
    services.forEach(service => {
        if (!service.active) return;
        
        const serviceName = service.name.toLowerCase();
        const serviceTitle = (service.title || service.name).toLowerCase();
        
        if (serviceName.includes(searchTerm) || serviceTitle.includes(searchTerm)) {
            results.push({
                id: service.id,
                type: 'service',
                title: service.name,
                description: service.title || service.name,
                url: service.page || '#',
                icon: '🦷',
                category: 'Услуга'
            });
        }
    });
    
    priceServices.forEach(service => {
        if (!service.active) return;
        
        const serviceName = service.name.toLowerCase();
        const serviceDesc = (service.description || '').toLowerCase();
        
        if (serviceName.includes(searchTerm) || serviceDesc.includes(searchTerm)) {
            results.push({
                id: service.id,
                type: 'price_service',
                title: service.name,
                description: service.description || `${service.price} ${service.unit}`,
                url: 'prices.html',
                icon: '💰',
                category: 'Услуга (прайс)'
            });
        }
    });
    
    doctors.forEach(doctor => {
        if (!doctor.active) return;
        
        const lastName = doctor.lastName.toLowerCase();
        const firstName = doctor.firstName.toLowerCase();
        const middleName = (doctor.middleName || '').toLowerCase();
        const specialization = doctor.specialization.toLowerCase();
        const fullName = `${lastName} ${firstName} ${middleName}`.toLowerCase();
        
        if (fullName.includes(searchTerm) || specialization.includes(searchTerm) || 
            lastName.includes(searchTerm) || firstName.includes(searchTerm)) {
            results.push({
                id: doctor.id,
                type: 'doctor',
                title: `${doctor.lastName} ${doctor.firstName} ${doctor.middleName || ''}`.trim(),
                description: doctor.specialization,
                url: 'team-details.html',
                icon: '👨‍⚕️',
                category: 'Врач',
                doctorId: doctor.id
            });
        }
    });
    
    faq.forEach(item => {
        if (!item.active) return;
        
        const question = item.question.toLowerCase();
        const answer = item.answer.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            results.push({
                id: item.id,
                type: 'faq',
                title: item.question,
                description: item.answer.substring(0, 80) + (item.answer.length > 80 ? '...' : ''),
                url: 'faq.html',
                icon: '❓',
                category: item.category
            });
        }
    });
    
    results.sort((a, b) => a.title.localeCompare(b.title));
    
    return results;
}

function displayHeroSearchResults(results, searchQuery) {
    const container = document.getElementById('heroSearchResults');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="hero-search-empty">
                <span>🔍</span> По запросу "${escapeHtmlForSearch(searchQuery)}" ничего не найдено
            </div>
        `;
        container.classList.add('active');
        return;
    }
    
    let html = '';
    results.forEach(result => {
        html += `
            <div class="hero-search-result-item" data-url="${result.url}" data-type="${result.type}" data-id="${result.id}">
                <div class="hero-search-result-icon">${result.icon}</div>
                <div class="hero-search-result-content">
                    <div class="hero-search-result-title">${escapeHtmlForSearch(result.title)}</div>
                    <div class="hero-search-result-description">${escapeHtmlForSearch(result.description)}</div>
                    <span class="hero-search-result-category">${escapeHtmlForSearch(result.category)}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    container.classList.add('active');
    
    document.querySelectorAll('.hero-search-result-item').forEach(item => {
        item.addEventListener('click', function() {
            const url = this.dataset.url;
            const type = this.dataset.type;
            const id = this.dataset.id;
            
            if (type === 'doctor' && id) {
                sessionStorage.setItem('selectedDoctorId', id);
                window.location.href = url;
            } else if (url && url !== '#') {
                window.location.href = url;
            }
        });
    });
}

function executeHeroSearch() {
    const input = document.getElementById('heroSearchInput');
    const query = input ? input.value.trim() : '';
    const resultsContainer = document.getElementById('heroSearchResults');
    
    if (query.length < 2) {
        if (resultsContainer) {
            resultsContainer.classList.remove('active');
            resultsContainer.innerHTML = '';
        }
        return;
    }
    
    if (resultsContainer) {
        resultsContainer.innerHTML = '<div class="hero-search-loading"></div>';
        resultsContainer.classList.add('active');
    }
    
    setTimeout(() => {
        const results = performSearch(query);
        displayHeroSearchResults(results, query);
    }, 200);
}

function closeHeroSearchResults() {
    const resultsContainer = document.getElementById('heroSearchResults');
    const searchInput = document.getElementById('heroSearchInput');
    
    if (resultsContainer) {
        setTimeout(() => {
            resultsContainer.classList.remove('active');
        }, 200);
    }
}

function initHeroSearch() {
    const searchInput = document.getElementById('heroSearchInput');
    const resultsContainer = document.getElementById('heroSearchResults');
    
    if (!searchInput) return;
    
    let debounceTimer;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            executeHeroSearch();
        }, 300);
    });
    
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && resultsContainer && !resultsContainer.contains(event.target)) {
            resultsContainer.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && resultsContainer) {
            resultsContainer.classList.remove('active');
            searchInput.blur();
        }
    });
    
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length >= 2) {
            executeHeroSearch();
        }
    });
}

function escapeHtmlForSearch(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

window.initHeroSearch = initHeroSearch;
window.performSearch = performSearch;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('heroSearchInput')) {
            initHeroSearch();
        }
    });
} else {
    if (document.getElementById('heroSearchInput')) {
        initHeroSearch();
    }
}

