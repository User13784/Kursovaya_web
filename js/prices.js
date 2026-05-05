async function loadPriceData() {
    try {
        const prices = await getPrices();
        return prices;
    } catch (error) {
        console.error('Ошибка загрузки прайс-листа:', error);
        return { version: '2.0', categories: [], services: [] };
    }
}

async function displayPrices() {
    const pricesContainer = document.getElementById('pricesList');
    if (!pricesContainer) return;
    
    pricesContainer.innerHTML = '<div class="loading">Загрузка цен...</div>';
    
    const data = await loadPriceData();
    const categoryFilter = document.getElementById('priceCategoryFilter')?.value || 'all';
    const searchQuery = document.getElementById('priceSearchInput')?.value.toLowerCase() || '';
    
    let categories = data.categories?.filter(c => c.active) || [];
    let services = data.services?.filter(s => s.active) || [];
    
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
    
    categories.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    if (categories.length === 0) {
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
        const categoryServices = services.filter(s => s.categoryId === category.id).sort((a, b) => (a.order || 0) - (b.order || 0));
        
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
            let priceDisplay = '';
            if (service.price === '0') {
                priceDisplay = 'Бесплатно';
            } else if (service.unit === 'BYN') {
                priceDisplay = `${service.price} <span class="currency-icon">BYN</span>`;
            } else {
                priceDisplay = `${service.price} ${service.unit}`;
            }
            
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

async function populateCategoryFilter() {
    const filter = document.getElementById('priceCategoryFilter');
    if (!filter) return;
    
    const data = await loadPriceData();
    const categories = data.categories?.filter(c => c.active) || [];
    categories.sort((a, b) => (a.order || 0) - (b.order || 0));
    
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

document.addEventListener('DOMContentLoaded', async function() {
    if (!document.querySelector('#currency-styles')) {
        const style = document.createElement('style');
        style.id = 'currency-styles';
        style.textContent = `
            .currency-icon {
                font-family: "nbrb" !important;
                speak: none;
                font-style: normal;
                font-weight: normal;
                font-variant: normal;
                text-transform: none;
                line-height: 1;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                letter-spacing: normal;
                font-feature-settings: "liga";
                -webkit-font-variant-ligatures: discretionary-ligatures;
                font-variant-ligatures: discretionary-ligatures;
            }
            .service-price .currency-icon {
                margin-left: 3px;
            }
        `;
        document.head.appendChild(style);
    }
    
    await populateCategoryFilter();
    await displayPrices();
    
    const categoryFilter = document.getElementById('priceCategoryFilter');
    const searchInput = document.getElementById('priceSearchInput');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', displayPrices);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', displayPrices);
    }
});