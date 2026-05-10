async function loadPriceData() {
    try {
        const prices = await getPrices();
        return prices;
    } catch (error) {
        console.error('Ошибка загрузки прайс-листа:', error);
        return { version: '2.0', categories: [], services: [] };
    }
}

function getCurrentLangForPrices() {
    return localStorage.getItem('dental_language') || 'ru';
}

function getTableHeaders() {
    const currentLang = getCurrentLangForPrices();
    if (currentLang === 'ru') {
        return {
            service: 'Услуга',
            price: 'Цена',
            note: 'Примечание'
        };
    } else {
        return {
            service: 'Service',
            price: 'Price',
            note: 'Note'
        };
    }
}

function getFreeText() {
    const currentLang = getCurrentLangForPrices();
    return currentLang === 'ru' ? 'Бесплатно' : 'Free';
}

function getAllServicesText() {
    const currentLang = getCurrentLangForPrices();
    return currentLang === 'ru' ? 'Все услуги' : 'All services';
}

function getCategoryLabelText() {
    const currentLang = getCurrentLangForPrices();
    return currentLang === 'ru' ? 'Категория:' : 'Category:';
}

function getSearchLabelText() {
    const currentLang = getCurrentLangForPrices();
    return currentLang === 'ru' ? 'Поиск:' : 'Search:';
}

function getSearchPlaceholderText() {
    const currentLang = getCurrentLangForPrices();
    return currentLang === 'ru' ? 'Поиск по названию услуги...' : 'Search by service name...';
}

function getLoadingText() {
    const currentLang = getCurrentLangForPrices();
    return currentLang === 'ru' ? 'Загрузка цен...' : 'Loading prices...';
}

function getEmptyResultText() {
    const currentLang = getCurrentLangForPrices();
    return currentLang === 'ru' ? 'По вашему запросу ничего не найдено' : 'Nothing found for your request';
}

async function loadDiscounts() {
    try {
        const response = await fetch('http://localhost:3000/discounts');
        if (!response.ok) throw new Error('Ошибка загрузки скидок');
        const discounts = await response.json();
        console.log('✅ Загружено скидок:', discounts.length);
        return discounts;
    } catch (error) {
        console.error('Ошибка загрузки скидок:', error);
        return [];
    }
}

function getActiveDiscountForCategory(categoryId, discounts) {
    const today = new Date().toISOString().split('T')[0];
    return discounts.find(d => 
        d.discountCategoryId === categoryId && 
        d.active === true &&
        (!d.endDate || d.endDate >= today)
    );
}

function formatPriceWithDiscount(service, discount) {
    const currentLang = getCurrentLangForPrices();
    const freeText = getFreeText();
    
    if (service.price === '0') {
        return freeText;
    }
    
    const unitHtml = service.unit === 'BYN' 
        ? '<span class="currency-icon">BYN</span>' 
        : service.unit;
    
    if (discount) {
        let discountedPrice = parseFloat(service.price);
        let discountHtml = '';
        
        if (discount.type === 'percentage') {
            discountedPrice = discountedPrice * (1 - discount.value / 100);
            const discountPercentText = currentLang === 'ru' ? `-${discount.value}%` : `-${discount.value}%`;
            discountHtml = `<span class="discount-badge" style="background: #EF4444; color: white; padding: 2px 8px; border-radius: 20px; font-size: 11px; margin-left: 8px;">${discountPercentText}</span>`;
            return `
                <span style="text-decoration: line-through; color: #9CA3AF;">${service.price} ${unitHtml}</span>
                <span style="color: #EF4444; font-weight: 700; margin-left: 8px;">${discountedPrice.toFixed(0)} ${unitHtml}</span>
                ${discountHtml}
            `;
        } else {
            discountedPrice = Math.max(0, discountedPrice - discount.value);
            const discountAmountText = currentLang === 'ru' ? `-${discount.value} BYN` : `-${discount.value} BYN`;
            discountHtml = `<span class="discount-badge" style="background: #EF4444; color: white; padding: 2px 8px; border-radius: 20px; font-size: 11px; margin-left: 8px;">${discountAmountText}</span>`;
            return `
                <span style="text-decoration: line-through; color: #9CA3AF;">${service.price} ${unitHtml}</span>
                <span style="color: #EF4444; font-weight: 700; margin-left: 8px;">${discountedPrice.toFixed(0)} ${unitHtml}</span>
                ${discountHtml}
            `;
        }
    }
    
    return `${service.price} ${unitHtml}`;
}

async function displayPrices() {
    const pricesContainer = document.getElementById('pricesList');
    if (!pricesContainer) return;
    
    const loadingText = getLoadingText();
    pricesContainer.innerHTML = `<div class="loading">${loadingText}</div>`;
    
    const priceData = await loadPriceData();
    const discounts = await loadDiscounts();
    
    const categoryFilter = document.getElementById('priceCategoryFilter')?.value || 'all';
    const searchQuery = document.getElementById('priceSearchInput')?.value.toLowerCase() || '';
    
    let categories = priceData.categories?.filter(c => c.active) || [];
    let services = priceData.services?.filter(s => s.active) || [];
    
    if (categoryFilter !== 'all') {
        services = services.filter(s => s.categoryId == categoryFilter);
        categories = categories.filter(c => c.id == categoryFilter);
    }
    
    if (searchQuery) {
        services = services.filter(s => s.name.toLowerCase().includes(searchQuery));
        const filteredCategoryIds = [...new Set(services.map(s => s.categoryId))];
        categories = categories.filter(c => filteredCategoryIds.includes(c.id));
    }
    
    categories.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    const emptyResultText = getEmptyResultText();
    if (categories.length === 0) {
        pricesContainer.innerHTML = `
            <div class="empty-prices">
                <div class="empty-icon">💊</div>
                <div class="empty-text">${emptyResultText}</div>
            </div>
        `;
        return;
    }
    
    const headers = getTableHeaders();
    
    let html = '';
    
    for (const category of categories) {
        const categoryServices = services
            .filter(s => s.categoryId === category.id)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
        
        if (categoryServices.length === 0) continue;
        
        const categoryDiscount = getActiveDiscountForCategory(category.id, discounts);
        
        html += `
            <div class="price-category" data-category-id="${category.id}">
                <div class="category-header" onclick="toggleCategory(this)">
                    <h3 class="category-title">
                        ${escapeHtmlForPrices(category.name)}
                        ${categoryDiscount ? `<span class="category-discount-badge" style="background: #EF4444; color: white; padding: 2px 10px; border-radius: 20px; font-size: 12px; margin-left: 10px;">-${categoryDiscount.value}%</span>` : ''}
                    </h3>
                    <span class="category-toggle">▼</span>
                </div>
                <div class="category-content">
                    <table class="services-table">
                        <thead>
                            <tr>
                                <th>${headers.service}</th>
                                <th>${headers.price}</th>
                                <th>${headers.note}</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        for (const service of categoryServices) {
            const priceDisplay = formatPriceWithDiscount(service, categoryDiscount);
            
            let description = '';
            if (service.description) {
                if (typeof service.description === 'object') {
                    const currentLang = getCurrentLangForPrices();
                    description = service.description[currentLang] || service.description.ru || '';
                } else {
                    description = service.description;
                }
            }
            if (!description) description = '—';
            
            html += `
                <tr>
                    <td class="service-name">${escapeHtmlForPrices(service.name)}</td>
                    <td class="service-price">${priceDisplay}</td>
                    <td class="service-unit">${escapeHtmlForPrices(description)}</td>
                </tr>
            `;
        }
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    pricesContainer.innerHTML = html;
}

function toggleCategory(header) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.category-toggle');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle?.classList.remove('open');
    } else {
        content.style.display = 'none';
        toggle?.classList.add('open');
    }
}

async function populateCategoryFilter() {
    const filter = document.getElementById('priceCategoryFilter');
    if (!filter) return;
    
    const data = await loadPriceData();
    const categories = data.categories?.filter(c => c.active) || [];
    categories.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    const allServicesText = getAllServicesText();
    filter.innerHTML = `<option value="all">${allServicesText}</option>`;
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        filter.appendChild(option);
    });
}

function updateFiltersText() {
    const categoryLabel = document.querySelector('.filter-group label:first-child');
    if (categoryLabel) {
        categoryLabel.textContent = getCategoryLabelText();
    }
    
    const searchLabel = document.querySelector('.filter-group:last-child label');
    if (searchLabel) {
        searchLabel.textContent = getSearchLabelText();
    }
    
    const searchInput = document.getElementById('priceSearchInput');
    if (searchInput) {
        searchInput.placeholder = getSearchPlaceholderText();
    }
    
    populateCategoryFilter();
}

function escapeHtmlForPrices(str) {
    if (!str) return '';
    if (typeof str === 'object') {
        const currentLang = getCurrentLangForPrices();
        str = str[currentLang] || str.ru || '';
    }
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
            @font-face {
                font-family: "nbrb";
                src: url("../fonts/nbrb.woff2") format("woff2"),
                     url("../fonts/nbrb.ttf") format("truetype"),
                     url("../fonts/nbrb.woff") format("woff");
                font-weight: normal;
                font-style: normal;
                font-display: swap;
            }
            .currency-icon {
                font-family: "nbrb" !important;
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
                display: inline-block;
                vertical-align: baseline;
            }
            .service-price .currency-icon {
                margin-left: 3px;
            }
            .discount-badge {
                display: inline-block;
                white-space: nowrap;
            }
            .category-discount-badge {
                display: inline-block;
                white-space: nowrap;
            }
        `;
        document.head.appendChild(style);
    }
    
    await populateCategoryFilter();
    await displayPrices();
    
    updateFiltersText();
    
    const categoryFilter = document.getElementById('priceCategoryFilter');
    const searchInput = document.getElementById('priceSearchInput');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', displayPrices);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', displayPrices);
    }
});

window.toggleCategory = toggleCategory;
window.displayPrices = displayPrices;

document.addEventListener('languageChanged', function() {
    updateFiltersText();
    displayPrices();
});