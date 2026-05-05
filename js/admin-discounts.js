let cachedDiscounts = null;

async function loadDiscountsFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/discounts');
        if (!response.ok) throw new Error('Ошибка загрузки скидок');
        const discounts = await response.json();
        cachedDiscounts = discounts;
        return discounts;
    } catch (error) {
        console.error('Ошибка загрузки скидок из API:', error);
        const stored = localStorage.getItem('dental_discounts_backup');
        if (stored) {
            cachedDiscounts = JSON.parse(stored);
            return cachedDiscounts;
        }
        return [];
    }
}

async function getActiveDiscountsForPrices() {
    let discounts = cachedDiscounts;
    if (!discounts) {
        discounts = await loadDiscountsFromAPI();
    }
    
    if (!discounts || discounts.length === 0) return [];
    
    const today = new Date().toISOString().split('T')[0];
    
    return discounts.filter(d => {
        if (!d.active) return false;
        if (d.startDate && d.endDate) {
            return today >= d.startDate && today <= d.endDate;
        }
        return d.active;
    });
}

async function getDiscountForServiceForPrices(serviceId) {
    const discounts = await getActiveDiscountsForPrices();
    return discounts.find(d => d.serviceId === serviceId);
}

function formatPriceWithDiscount(service, discount) {
    if (service.price === '0') {
        return 'Бесплатно';
    }
    
    if (discount) {
        let discountedPrice = service.price;
        if (discount.type === 'percentage') {
            discountedPrice = (parseFloat(service.price) * (1 - discount.value / 100)).toFixed(0);
            return `<span style="text-decoration: line-through; color: #9CA3AF;">${service.price} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span> 
                    <span style="color: #EF4444; font-weight: 700;">${discountedPrice} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span>
                    <span class="discount-badge" style="background: #EF4444; color: white; padding: 2px 8px; border-radius: 20px; font-size: 11px; margin-left: 8px;">-${discount.value}%</span>`;
        } else {
            discountedPrice = Math.max(0, parseFloat(service.price) - discount.value).toFixed(0);
            return `<span style="text-decoration: line-through; color: #9CA3AF;">${service.price} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span> 
                    <span style="color: #EF4444; font-weight: 700;">${discountedPrice} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span>
                    <span class="discount-badge" style="background: #EF4444; color: white; padding: 2px 8px; border-radius: 20px; font-size: 11px; margin-left: 8px;">-${discount.value} BYN</span>`;
        }
    } else if (service.unit === 'BYN') {
        return `${service.price} <span class="currency-icon">BYN</span>`;
    } else {
        return `${service.price} ${service.unit}`;
    }
}

function getDiscountedPriceSimple(service, discount) {
    if (service.price === '0') {
        return { original: 0, discounted: 0, hasDiscount: false, percent: 0 };
    }
    
    if (discount) {
        let discountedPrice = parseFloat(service.price);
        if (discount.type === 'percentage') {
            discountedPrice = discountedPrice * (1 - discount.value / 100);
            return {
                original: parseFloat(service.price),
                discounted: discountedPrice,
                hasDiscount: true,
                percent: discount.value,
                type: 'percentage',
                discountValue: discount.value
            };
        } else {
            discountedPrice = Math.max(0, discountedPrice - discount.value);
            return {
                original: parseFloat(service.price),
                discounted: discountedPrice,
                hasDiscount: true,
                amount: discount.value,
                type: 'fixed',
                discountValue: discount.value
            };
        }
    }
    
    return {
        original: parseFloat(service.price),
        discounted: parseFloat(service.price),
        hasDiscount: false,
        percent: 0
    };
}

async function displayPricesWithDiscounts() {
    const pricesContainer = document.getElementById('pricesList');
    if (!pricesContainer) return;
    
    pricesContainer.innerHTML = '<div class="loading">Загрузка цен...</div>';
    
    try {
        const [pricesResponse, discountsResponse] = await Promise.all([
            fetch('http://localhost:3000/prices'),
            fetch('http://localhost:3000/discounts')
        ]);
        
        const pricesData = await pricesResponse.json();
        const discounts = await discountsResponse.json();
        
        cachedDiscounts = discounts;
        
        const categoryFilter = document.getElementById('priceCategoryFilter')?.value || 'all';
        const searchQuery = document.getElementById('priceSearchInput')?.value.toLowerCase() || '';
        
        let categories = pricesData.categories?.filter(c => c.active) || [];
        let services = pricesData.services?.filter(s => s.active) || [];
        
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
        
        if (categories.length === 0) {
            pricesContainer.innerHTML = `<div class="empty-prices"><div class="empty-icon">💊</div><div class="empty-text">По вашему запросу ничего не найдено</div></div>`;
            return;
        }
        
        const getDiscountForService = (serviceId) => {
            return discounts.find(d => d.serviceId === serviceId && d.active);
        };
        
        let html = '';
        
        for (const category of categories) {
            const categoryServices = services.filter(s => s.categoryId === category.id).sort((a, b) => (a.order || 0) - (b.order || 0));
            
            if (categoryServices.length === 0) continue;
            
            html += `
                <div class="price-category" data-category-id="${category.id}">
                    <div class="category-header" onclick="toggleCategory(this)">
                        <h3 class="category-title">${escapeHtmlForDiscounts(category.name)}</h3>
                        <span class="category-toggle">▼</span>
                    </div>
                    <div class="category-content">
                        <table class="services-table">
                            <thead>
                                <tr><th>Услуга</th><th>Цена</th><th>Примечание</th></tr>
                            </thead>
                            <tbody>
            `;
            
            for (const service of categoryServices) {
                const discount = getDiscountForService(service.id);
                let priceDisplay = '';
                
                if (service.price === '0') {
                    priceDisplay = 'Бесплатно';
                } else if (discount) {
                    let discountedPrice = service.price;
                    if (discount.type === 'percentage') {
                        discountedPrice = (parseFloat(service.price) * (1 - discount.value / 100)).toFixed(0);
                        priceDisplay = `<span style="text-decoration: line-through; color: #9CA3AF;">${service.price} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span> 
                                        <span style="color: #EF4444; font-weight: 700;">${discountedPrice} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span>
                                        <span class="discount-badge" style="background: #EF4444; color: white; padding: 2px 8px; border-radius: 20px; font-size: 11px; margin-left: 8px;">-${discount.value}%</span>`;
                    } else {
                        discountedPrice = Math.max(0, parseFloat(service.price) - discount.value).toFixed(0);
                        priceDisplay = `<span style="text-decoration: line-through; color: #9CA3AF;">${service.price} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span> 
                                        <span style="color: #EF4444; font-weight: 700;">${discountedPrice} ${service.unit === 'BYN' ? '<span class="currency-icon">BYN</span>' : service.unit}</span>
                                        <span class="discount-badge" style="background: #EF4444; color: white; padding: 2px 8px; border-radius: 20px; font-size: 11px; margin-left: 8px;">-${discount.value} BYN</span>`;
                    }
                } else if (service.unit === 'BYN') {
                    priceDisplay = `${service.price} <span class="currency-icon">BYN</span>`;
                } else {
                    priceDisplay = `${service.price} ${service.unit}`;
                }
                
                html += `
                    <tr>
                        <td class="service-name">${escapeHtmlForDiscounts(service.name)}</td>
                        <td class="service-price">${priceDisplay}</td>
                        <td class="service-unit">${escapeHtmlForDiscounts(service.description || '—')}</td>
                    </tr>
                `;
            }
            
            html += `</tbody></table></div></div>`;
        }
        
        pricesContainer.innerHTML = html;
        
    } catch (error) {
        console.error('Ошибка загрузки цен:', error);
        pricesContainer.innerHTML = `<div class="empty-prices"><div class="empty-icon">⚠️</div><div class="empty-text">Ошибка загрузки данных. Убедитесь, что сервер запущен.</div></div>`;
    }
}

function escapeHtmlForDiscounts(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
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

window.getActiveDiscountsForPrices = getActiveDiscountsForPrices;
window.getDiscountForServiceForPrices = getDiscountForServiceForPrices;
window.formatPriceWithDiscount = formatPriceWithDiscount;
window.displayPricesWithDiscounts = displayPricesWithDiscounts;