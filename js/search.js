let searchCache = {
    services: [],
    doctors: [],
    faq: [],
    prices: null
};

function getCurrentLangForSearch() {
    return localStorage.getItem('dental_language') || 'ru';
}

function getLocalizedText(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const lang = getCurrentLangForSearch();
    return obj[lang] || obj.ru || '';
}

async function loadSearchData() {
    try {
        console.log('🔄 Загрузка данных для поиска...');
        
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
    const currentLang = getCurrentLangForSearch();
    const { services, doctors, faq, prices } = searchCache;
    const results = [];
    
    services.forEach(service => {
        const serviceName = getLocalizedText(service.name).toLowerCase();
        const serviceTitle = getLocalizedText(service.title || service.name).toLowerCase();
        
        if (serviceName.includes(searchTerm) || serviceTitle.includes(searchTerm)) {
            results.push({
                id: service.id,
                type: 'service',
                title: getLocalizedText(service.name),
                description: getLocalizedText(service.title || service.name),
                url: service.page || `service-detail.html?service=${getServiceParam(service.id)}`,
                icon: '🦷',
                category: currentLang === 'ru' ? 'Услуга' : 'Service'
            });
        }
    });
    
    const priceServices = prices?.services || [];
    priceServices.forEach(service => {
        if (!service.active) return;
        
        const serviceName = getLocalizedText(service.name).toLowerCase();
        const serviceDesc = getLocalizedText(service.description || '').toLowerCase();
        
        if (serviceName.includes(searchTerm) || serviceDesc.includes(searchTerm)) {
            results.push({
                id: service.id,
                type: 'price_service',
                title: getLocalizedText(service.name),
                description: getLocalizedText(service.description) || `${service.price} ${service.unit}`,
                url: 'prices.html',
                icon: '💰',
                category: currentLang === 'ru' ? 'Услуга (прайс)' : 'Service (price)'
            });
        }
    });
    
    doctors.forEach(doctor => {
        const lastName = getLocalizedText(doctor.lastName).toLowerCase();
        const firstName = getLocalizedText(doctor.firstName).toLowerCase();
        const middleName = getLocalizedText(doctor.middleName || '').toLowerCase();
        const specialization = getLocalizedText(doctor.specialization).toLowerCase();
        const fullName = `${lastName} ${firstName} ${middleName}`.toLowerCase();
        
        if (fullName.includes(searchTerm) || specialization.includes(searchTerm) || 
            lastName.includes(searchTerm) || firstName.includes(searchTerm)) {
            results.push({
                id: doctor.id,
                type: 'doctor',
                title: `${getLocalizedText(doctor.lastName)} ${getLocalizedText(doctor.firstName)} ${getLocalizedText(doctor.middleName || '')}`.trim(),
                description: getLocalizedText(doctor.specialization),
                url: 'team-details.html',
                icon: '👨‍⚕️',
                category: currentLang === 'ru' ? 'Врач' : 'Doctor',
                doctorId: doctor.id
            });
        }
    });
    
    faq.forEach(item => {
        const question = getLocalizedText(item.question).toLowerCase();
        const answer = getLocalizedText(item.answer).toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            results.push({
                id: item.id,
                type: 'faq',
                title: getLocalizedText(item.question).length > 60 ? getLocalizedText(item.question).substring(0, 60) + '...' : getLocalizedText(item.question),
                description: getLocalizedText(item.answer).substring(0, 80) + (getLocalizedText(item.answer).length > 80 ? '...' : ''),
                url: 'faq.html',
                icon: '❓',
                category: currentLang === 'ru' ? 'FAQ' : 'FAQ'
            });
        }
    });
    
    results.sort((a, b) => a.title.localeCompare(b.title));
    
    console.log(`🔍 Найдено результатов: ${results.length} для запроса "${query}"`);
    
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
    
    const currentLang = getCurrentLangForSearch();
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="hero-search-empty">
                <span>🔍</span> 
                ${currentLang === 'ru' ? `По запросу "${escapeHtml(searchQuery)}" ничего не найдено` : `Nothing found for "${escapeHtml(searchQuery)}"`}
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
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        newItem.addEventListener('click', function(e) {
            e.preventDefault();
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
    if (!input) {
        console.log('❌ heroSearchInput не найден');
        return;
    }
    
    const query = input.value.trim();
    const resultsContainer = document.getElementById('heroSearchResults');
    
    console.log('🔍 Поиск:', query);
    
    if (query.length < 2) {
        if (resultsContainer) {
            resultsContainer.classList.remove('active');
            resultsContainer.innerHTML = '';
        }
        return;
    }
    
    if (resultsContainer) {
        const currentLang = getCurrentLangForSearch();
        resultsContainer.innerHTML = `<div class="hero-search-loading">${currentLang === 'ru' ? 'Поиск...' : 'Searching...'}</div>`;
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
    
    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);
    
    newSearchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            executeHeroSearch();
        }, 400);
    });
    
    document.addEventListener('click', function(event) {
        if (!newSearchInput.contains(event.target) && resultsContainer && !resultsContainer.contains(event.target)) {
            resultsContainer.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && resultsContainer) {
            resultsContainer.classList.remove('active');
            newSearchInput.blur();
        }
    });
    
    newSearchInput.addEventListener('focus', function() {
        if (this.value.trim().length >= 2) {
            executeHeroSearch();
        }
    });
    
    console.log('✅ Поиск инициализирован');
}

loadSearchData();

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

window.initHeroSearch = initHeroSearch;
window.performSearch = performSearch;