
let searchCache = {
    services: [],
    doctors: [],
    faq: [],
    prices: null
};

async function loadSearchData() {
    try {
        const [services, doctors, faq, prices] = await Promise.all([
            fetch('http://localhost:3000/services').then(res => res.json()),
            fetch('http://localhost:3000/doctors').then(res => res.json()),
            fetch('http://localhost:3000/faq').then(res => res.json()),
            fetch('http://localhost:3000/prices').then(res => res.json())
        ]);
        
        searchCache.services = services.filter(s => s.active === true);
        searchCache.doctors = doctors.filter(d => d.active === true);
        searchCache.faq = faq.filter(f => f.active === true);
        searchCache.prices = prices;
        
        console.log('✅ Данные для поиска загружены:', {
            services: searchCache.services.length,
            doctors: searchCache.doctors.length,
            faq: searchCache.faq.length
        });
        
        return searchCache;
    } catch (error) {
        console.error('❌ Ошибка загрузки данных для поиска:', error);
        return searchCache;
    }
}

async function performSearch(query) {
    if (!query || query.length < 2) return [];
    
    if (searchCache.services.length === 0) {
        await loadSearchData();
    }
    
    const searchTerm = query.toLowerCase();
    const { services, doctors, faq, prices } = searchCache;
    const results = [];
    
    services.forEach(service => {
        const serviceName = service.name.toLowerCase();
        const serviceTitle = (service.title || service.name).toLowerCase();
        
        if (serviceName.includes(searchTerm) || serviceTitle.includes(searchTerm)) {
            results.push({
                id: service.id,
                type: 'service',
                title: service.name,
                description: service.title || service.name,
                url: service.page || `service-detail.html?service=${getServiceParam(service.id)}`,
                icon: '🦷',
                category: 'Услуга'
            });
        }
    });
    
    const priceServices = prices?.services || [];
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
        const question = item.question.toLowerCase();
        const answer = item.answer.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            results.push({
                id: item.id,
                type: 'faq',
                title: item.question.length > 60 ? item.question.substring(0, 60) + '...' : item.question,
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

function getServiceParam(serviceId) {
    const serviceMap = {
        1: 'diagnostics',
        2: 'prevention',
        3: 'therapy',
        4: 'digital-prosthetics',
        5: 'digital-implantation',
        6: 'complex-implantation',
        7: 'orthodontics',
        8: 'veneers'
    };
    return serviceMap[serviceId] || 'diagnostics';
}

async function displayHeroSearchResults(results, searchQuery) {
    const container = document.getElementById('heroSearchResults');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="hero-search-empty">
                <span>🔍</span> По запросу "${escapeHtml(searchQuery)}" ничего не найдено
            </div>
        `;
        container.classList.add('active');
        return;
    }
    
    let html = '';
    results.slice(0, 8).forEach(result => {
        html += `
            <div class="hero-search-result-item" data-url="${result.url}" data-type="${result.type}" data-id="${result.id}" data-doctor-id="${result.doctorId || ''}">
                <div class="hero-search-result-icon">${result.icon}</div>
                <div class="hero-search-result-content">
                    <div class="hero-search-result-title">${escapeHtml(result.title)}</div>
                    <div class="hero-search-result-description">${escapeHtml(result.description)}</div>
                    <span class="hero-search-result-category">${escapeHtml(result.category)}</span>
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
            const doctorId = this.dataset.doctorId;
            
            if (type === 'doctor' && doctorId) {
                sessionStorage.setItem('selectedDoctorId', doctorId);
                window.location.href = url;
            } else if (url && url !== '#') {
                window.location.href = url;
            }
        });
    });
}

async function executeHeroSearch() {
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
    
    const results = await performSearch(query);
    displayHeroSearchResults(results, query);
}

function closeHeroSearchResults() {
    const resultsContainer = document.getElementById('heroSearchResults');
    if (resultsContainer) {
        setTimeout(() => {
            resultsContainer.classList.remove('active');
        }, 200);
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function initHeroSearch() {
    const searchInput = document.getElementById('heroSearchInput');
    const resultsContainer = document.getElementById('heroSearchResults');
    
    if (!searchInput) {
        console.log('❌ Элемент heroSearchInput не найден');
        return;
    }
    
    console.log('✅ Инициализация поиска');
    
    let debounceTimer;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            executeHeroSearch();
        }, 400);
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
    
    console.log('✅ Поиск инициализирован');
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('heroSearchInput')) {
        initHeroSearch();
        loadSearchData(); 
    }
});

window.initHeroSearch = initHeroSearch;
window.performSearch = performSearch;