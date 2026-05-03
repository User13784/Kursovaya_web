const PRICES_STORAGE_KEY = 'dental_prices';

const defaultPrices = {
    categories: [
        { id: 1, name: 'Диагностика', order: 1, active: true },
        { id: 2, name: 'Профилактика и гигиена', order: 2, active: true },
        { id: 3, name: 'Терапевтическая стоматология', order: 3, active: true },
        { id: 4, name: 'Хирургическая стоматология', order: 4, active: true },
        { id: 5, name: 'Ортопедия (протезирование)', order: 5, active: true },
        { id: 6, name: 'Имплантация', order: 6, active: true },
        { id: 7, name: 'Ортодонтия', order: 7, active: true },
        { id: 8, name: 'Эстетическая стоматология', order: 8, active: true }
    ],
    services: [
        { id: 1, categoryId: 1, name: 'Первичная консультация', price: '0', unit: 'BYN', description: 'бесплатно', order: 1, active: true },
        { id: 2, categoryId: 1, name: 'Осмотр и составление плана лечения', price: '25', unit: 'BYN', description: '', order: 2, active: true },
        { id: 3, categoryId: 1, name: 'Компьютерная томография (3D)', price: '80', unit: 'BYN', description: 'Одна челюсть', order: 3, active: true },
        { id: 4, categoryId: 1, name: 'Панорамный снимок (ОПТГ)', price: '40', unit: 'BYN', description: '', order: 4, active: true },
        { id: 5, categoryId: 1, name: 'Прицельный снимок', price: '15', unit: 'BYN', description: 'Один зуб', order: 5, active: true },
        { id: 6, categoryId: 1, name: 'ТРГ (телерентгенограмма)', price: '50', unit: 'BYN', description: '', order: 6, active: true },
        
        { id: 7, categoryId: 2, name: 'Профессиональная гигиена (AirFlow)', price: '60', unit: 'BYN', description: '', order: 1, active: true },
        { id: 8, categoryId: 2, name: 'Ультразвуковая чистка', price: '40', unit: 'BYN', description: 'Одна челюсть', order: 2, active: true },
        { id: 9, categoryId: 2, name: 'Фторирование эмали', price: '25', unit: 'BYN', description: 'Одна челюсть', order: 3, active: true },
        { id: 10, categoryId: 2, name: 'Герметизация фиссур', price: '20', unit: 'BYN', description: 'Один зуб', order: 4, active: true },
        { id: 11, categoryId: 2, name: 'Снятие зубных отложений (скейлинг)', price: '50', unit: 'BYN', description: '', order: 5, active: true },
        
        { id: 12, categoryId: 3, name: 'Лечение кариеса (средний)', price: '70', unit: 'BYN', description: 'Один зуб', order: 1, active: true },
        { id: 13, categoryId: 3, name: 'Лечение кариеса (глубокий)', price: '90', unit: 'BYN', description: 'Один зуб', order: 2, active: true },
        { id: 14, categoryId: 3, name: 'Лечение пульпита (эндодонтия)', price: '120', unit: 'BYN', description: 'Один канал', order: 3, active: true },
        { id: 15, categoryId: 3, name: 'Лечение периодонтита', price: '140', unit: 'BYN', description: 'Один зуб', order: 4, active: true },
        { id: 16, categoryId: 3, name: 'Художественная реставрация (пломба)', price: '110', unit: 'BYN', description: 'Один зуб', order: 5, active: true },
        { id: 17, categoryId: 3, name: 'Стоматологический микроскоп', price: '50', unit: 'BYN', description: 'За использование', order: 6, active: true },
        { id: 18, categoryId: 3, name: 'Вкладка керамическая', price: '250', unit: 'BYN', description: 'Один зуб', order: 7, active: true },
        
        { id: 19, categoryId: 4, name: 'Удаление зуба (простое)', price: '50', unit: 'BYN', description: '', order: 1, active: true },
        { id: 20, categoryId: 4, name: 'Удаление зуба (сложное)', price: '100', unit: 'BYN', description: '', order: 2, active: true },
        { id: 21, categoryId: 4, name: 'Удаление зуба мудрости', price: '150', unit: 'BYN', description: '', order: 3, active: true },
        { id: 22, categoryId: 4, name: 'Синус-лифтинг (закрытый)', price: '300', unit: 'BYN', description: '', order: 4, active: true },
        { id: 23, categoryId: 4, name: 'Синус-лифтинг (открытый)', price: '500', unit: 'BYN', description: '', order: 5, active: true },
        { id: 24, categoryId: 4, name: 'Костная пластика', price: '400', unit: 'BYN', description: '', order: 6, active: true },
        { id: 25, categoryId: 4, name: 'Резекция верхушки корня', price: '120', unit: 'BYN', description: '', order: 7, active: true },
        
        { id: 26, categoryId: 5, name: 'Коронка металлокерамическая', price: '250', unit: 'BYN', description: 'Один зуб', order: 1, active: true },
        { id: 27, categoryId: 5, name: 'Коронка диоксид циркония', price: '450', unit: 'BYN', description: 'Один зуб', order: 2, active: true },
        { id: 28, categoryId: 5, name: 'Коронка E-max', price: '500', unit: 'BYN', description: 'Один зуб', order: 3, active: true },
        { id: 29, categoryId: 5, name: 'Виниры керамические', price: '400', unit: 'BYN', description: 'Один зуб', order: 4, active: true },
        { id: 30, categoryId: 5, name: 'Люминиры', price: '550', unit: 'BYN', description: 'Один зуб', order: 5, active: true },
        { id: 31, categoryId: 5, name: 'Съемный протез (нейлоновый)', price: '600', unit: 'BYN', description: 'Одна челюсть', order: 6, active: true },
        { id: 32, categoryId: 5, name: 'Съемный протез (акриловый)', price: '400', unit: 'BYN', description: 'Одна челюсть', order: 7, active: true },
        { id: 33, categoryId: 5, name: 'Бюгельный протез', price: '900', unit: 'BYN', description: '', order: 8, active: true },
        { id: 34, categoryId: 5, name: 'Культевая вкладка', price: '150', unit: 'BYN', description: '', order: 9, active: true },
        
        { id: 35, categoryId: 6, name: 'Имплантат (установка)', price: '800', unit: 'BYN', description: 'Под ключ', order: 1, active: true },
        { id: 36, categoryId: 6, name: 'Формирователь десны', price: '80', unit: 'BYN', description: '', order: 2, active: true },
        { id: 37, categoryId: 6, name: 'Абатмент', price: '150', unit: 'BYN', description: '', order: 3, active: true },
        { id: 38, categoryId: 6, name: 'Коронка на имплантате', price: '450', unit: 'BYN', description: '', order: 4, active: true },
        
        { id: 39, categoryId: 7, name: 'Диагностика и план лечения', price: '50', unit: 'BYN', description: '', order: 1, active: true },
        { id: 40, categoryId: 7, name: 'Брекет-система (металл)', price: '1000', unit: 'BYN', description: 'На челюсть', order: 2, active: true },
        { id: 41, categoryId: 7, name: 'Брекет-система (керамика)', price: '1300', unit: 'BYN', description: 'На челюсть', order: 3, active: true },
        { id: 42, categoryId: 7, name: 'Брекет-система (сапфир)', price: '1500', unit: 'BYN', description: 'На челюсть', order: 4, active: true },
        { id: 43, categoryId: 7, name: 'Элайнеры Invisalign', price: '3500', unit: 'BYN', description: 'Курс лечения', order: 5, active: true },
        { id: 44, categoryId: 7, name: 'Ретенционный аппарат', price: '80', unit: 'BYN', description: '', order: 6, active: true },
        { id: 45, categoryId: 7, name: 'Активация брекетов', price: '30', unit: 'BYN', description: 'Один визит', order: 7, active: true },
        
        { id: 46, categoryId: 8, name: 'Отбеливание ZOOM', price: '300', unit: 'BYN', description: 'Одна процедура', order: 1, active: true },
        { id: 47, categoryId: 8, name: 'Отбеливание капное (домашнее)', price: '150', unit: 'BYN', description: 'Курс', order: 2, active: true },
        { id: 48, categoryId: 8, name: 'Коррекция формы зубов', price: '25', unit: 'BYN', description: 'Один зуб', order: 3, active: true },
        { id: 49, categoryId: 8, name: 'Микропротезирование', price: '200', unit: 'BYN', description: '', order: 4, active: true }
    ]
};

function loadPriceData() {
    const stored = localStorage.getItem(PRICES_STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    } else {
        localStorage.setItem(PRICES_STORAGE_KEY, JSON.stringify(defaultPrices));
        return { ...defaultPrices };
    }
}

function displayPrices() {
    const pricesContainer = document.getElementById('pricesList');
    if (!pricesContainer) return;
    
    const data = loadPriceData();
    const categoryFilter = document.getElementById('priceCategoryFilter')?.value || 'all';
    const searchQuery = document.getElementById('priceSearchInput')?.value.toLowerCase() || '';
    
    let categories = data.categories.filter(c => c.active);
    let services = data.services.filter(s => s.active);
    
    if (categoryFilter !== 'all') {
        services = services.filter(s => s.categoryId == categoryFilter);
        categories = categories.filter(c => c.id == categoryFilter);
    }
    
    if (searchQuery) {
        const filteredServiceIds = services.filter(s => 
            s.name.toLowerCase().includes(searchQuery)
        ).map(s => s.categoryId);
        
        categories = categories.filter(c => filteredServiceIds.includes(c.id));
        
        services = services.filter(s => 
            s.name.toLowerCase().includes(searchQuery)
        );
    }
    
    categories.sort((a, b) => a.order - b.order);
    
    if (categories.length === 0 || services.length === 0) {
        pricesContainer.innerHTML = `
            <div class="empty-prices">
                <div class="empty-icon">💊</div>
                <div class="empty-text">По вашему запросу ничего не найдено</div>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    categories.forEach(category => {
        const categoryServices = services.filter(s => s.categoryId === category.id).sort((a, b) => a.order - b.order);
        
        if (categoryServices.length === 0) return;
        
        html += `
            <div class="price-category" data-category-id="${category.id}">
                <div class="category-header" onclick="toggleCategory(this)">
                    <h3 class="category-title">${escapeHtml(category.name)}</h3>
                    <span class="category-toggle">▼</span>
                </div>
                <div class="category-content">
                    <table class="services-table">
                        <thead>
                            <tr>
                                <th>Услуга</th>
                                <th>Цена</th>
                                <th>Примечание</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        categoryServices.forEach(service => {
            let priceDisplay = service.price === '0' ? 'Бесплатно' : `${service.price} ${service.unit}`;
            html += `
                <tr>
                    <td class="service-name">${escapeHtml(service.name)}</td>
                    <td class="service-price">${priceDisplay}</td>
                    <td class="service-unit">${escapeHtml(service.description || '—')}</td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });
    
    pricesContainer.innerHTML = html;
}

function toggleCategory(header) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.category-toggle');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.classList.remove('open');
    } else {
        content.style.display = 'none';
        toggle.classList.add('open');
    }
}

function populateCategoryFilter() {
    const filter = document.getElementById('priceCategoryFilter');
    if (!filter) return;
    
    const data = loadPriceData();
    const categories = data.categories.filter(c => c.active);
    categories.sort((a, b) => a.order - b.order);
    
    filter.innerHTML = '<option value="all">Все услуги</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        filter.appendChild(option);
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    populateCategoryFilter();
    displayPrices();
    
    const categoryFilter = document.getElementById('priceCategoryFilter');
    const searchInput = document.getElementById('priceSearchInput');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', displayPrices);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', displayPrices);
    }
});