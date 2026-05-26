let servicesData = [];
let serviceDetailsData = [];
let currentService = null;

function getLocalizedText(obj, defaultValue = '') {
    if (!obj) return defaultValue;
    if (typeof obj === 'string') return obj;
    const lang = localStorage.getItem('dental_language') || 'ru';
    return obj[lang] || obj.ru || defaultValue;
}

function showErrorToast(message) {
    let toast = document.querySelector('.error-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #EF4444;
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-family: 'Mulish', sans-serif;
            font-size: 14px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
    }, 3000);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

async function loadServicesFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/services');
        if (!response.ok) throw new Error('Ошибка загрузки услуг');
        let servicesDataRaw = await response.json();
        servicesData = servicesDataRaw.filter(s => s.active === true);
        console.log('✅ Услуги загружены из API:', servicesData.length);
        return servicesData;
    } catch (error) {
        console.error('❌ Ошибка загрузки услуг:', error);
        showErrorToast('Не удалось загрузить услуги. Проверьте подключение к серверу.');
        return [];
    }
}

async function loadServiceDetailsFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/serviceDetails');
        if (!response.ok) throw new Error('Ошибка загрузки деталей услуг');
        serviceDetailsData = await response.json();
        console.log('✅ Детали услуг загружены из API:', serviceDetailsData.length);
        return serviceDetailsData;
    } catch (error) {
        console.error('❌ Ошибка загрузки деталей услуг:', error);
        return [];
    }
}

function getCurrentServiceParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('service');
}

async function updatePageContent() {
    const serviceParam = getCurrentServiceParam();
    
    if (servicesData.length === 0) {
        await loadServicesFromAPI();
    }
    
    let currentService = null;
    
    if (serviceParam && !isNaN(serviceParam)) {
        currentService = servicesData.find(s => s.id == serviceParam);
    } else if (serviceParam) {
        currentService = servicesData.find(s => s.page === `service-detail.html?service=${serviceParam}` || 
                                                   s.page === serviceParam);
    }
    
    if (!currentService && servicesData.length > 0) {
        currentService = servicesData[0];
        console.log('🔄 Услуга не найдена, показываем первую:', currentService.id);
    }
    
    if (!currentService) {
        console.error('❌ Услуга не найдена');
        const titleElement = document.getElementById('serviceTitle');
        if (titleElement) titleElement.textContent = 'Услуга не найдена';
        return;
    }
    
    const serviceName = getLocalizedText(currentService.name);
    const serviceTitle = getLocalizedText(currentService.title || currentService.name);
    
    document.title = `${serviceName} | Dental Club`;
    
    const titleElement = document.getElementById('serviceTitle');
    if (titleElement) {
        titleElement.textContent = serviceTitle || serviceName;
    }
    
    const contentArea = document.getElementById('contentArea');
    if (contentArea && currentService.bgImage) {
        contentArea.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('${currentService.bgImage}')`;
        contentArea.style.backgroundSize = 'cover';
        contentArea.style.backgroundPosition = 'center';
    }
    
    sessionStorage.setItem('selectedService', JSON.stringify(currentService));
    
    console.log('✅ Текущая услуга:', serviceName, '(ID:', currentService.id, ')');
}

async function loadSideMenu() {
    const menuContainer = document.getElementById('servicesMenu');
    if (!menuContainer) return;
    
    if (servicesData.length === 0) {
        await loadServicesFromAPI();
    }
    
    if (servicesData.length === 0) {
        menuContainer.innerHTML = '<li class="loading-item">Нет доступных услуг</li>';
        return;
    }
    
    const currentParam = getCurrentServiceParam();
    let html = '';
    
    const sortedServices = [...servicesData].sort((a, b) => (a.order || a.id) - (b.order || b.id));
    
    for (const service of sortedServices) {
        const isActive = (currentParam == service.id) || 
                         (currentParam && service.page && service.page.includes(currentParam));
        const activeClass = isActive ? 'active' : '';
        const serviceName = getLocalizedText(service.name) || 'Услуга';
        const safeName = escapeHtml(serviceName);
        
        const linkUrl = `?service=${service.id}`;
        
        html += `
            <li>
                <a href="${linkUrl}" class="${activeClass}" data-service-id="${service.id}">${safeName}</a>
            </li>
        `;
    }
    
    menuContainer.innerHTML = html;
    
    document.querySelectorAll('.menu-list a').forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            const url = new URL(window.location.href);
            url.search = this.getAttribute('href');
            window.history.pushState({}, '', url);
            updatePageContent();
            updateActiveMenu();
        });
    });
    
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }
}

function updateActiveMenu() {
    const currentParam = getCurrentServiceParam();
    document.querySelectorAll('.menu-list a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes(`?service=${currentParam}`) || 
                     (currentParam && href.includes(currentParam)))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initMoreButton() {
    const moreBtn = document.getElementById('moreBtn');
    if (moreBtn) {
        const newMoreBtn = moreBtn.cloneNode(true);
        moreBtn.parentNode.replaceChild(newMoreBtn, moreBtn);
        
        newMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            let currentService = null;
            const serviceParam = getCurrentServiceParam();
            
            if (serviceParam && !isNaN(serviceParam)) {
                currentService = servicesData.find(s => s.id == serviceParam);
            }
            
            if (!currentService && sessionStorage.getItem('selectedService')) {
                currentService = JSON.parse(sessionStorage.getItem('selectedService'));
            }
            
            if (!currentService && servicesData.length > 0) {
                currentService = servicesData[0];
            }
            
            if (!currentService) {
                showErrorToast('Услуга не найдена');
                return;
            }
            
            const pageMap = {
                1: 'service-menu2.html',
                2: 'service-menu3.html',
                3: 'service-menu4.html',
                4: 'service-menu5.html',
                5: 'service-menu6.html',
                6: 'service-menu7.html',
                7: 'service-menu8.html',
                8: 'service-menu9.html'
            };
            
            let detailPage = pageMap[currentService.id];
            
            if (!detailPage && currentService.page) {
                detailPage = currentService.page;
            }
            
            if (detailPage) {
                console.log(`🔍 Переход на страницу: ${detailPage}`);
                window.location.href = detailPage;
            } else {
                showErrorToast('Страница с подробным описанием не найдена');
            }
        });
    }
}

function initCloseButton() {
    const closeBtn = document.getElementById('closeBtn');
    if (closeBtn) {
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
        
        newCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    }
}

async function init() {
    console.log('🚀 Инициализация страницы услуг...');
    
    const titleElement = document.getElementById('serviceTitle');
    if (titleElement) titleElement.textContent = 'Загрузка...';
    
    try {
        const testResponse = await fetch('http://localhost:3000/services');
        console.log('📡 Проверка подключения к серверу:', testResponse.ok ? '✅ OK' : '❌ Ошибка');
        if (!testResponse.ok) {
            showErrorToast('Сервер не отвечает. Запустите json-server --watch db.json --port 3000');
            return;
        }
    } catch (error) {
        console.error('❌ Сервер недоступен:', error);
        showErrorToast('Сервер недоступен. Запустите json-server --watch db.json --port 3000');
        return;
    }
    
    await loadServicesFromAPI();
    await loadServiceDetailsFromAPI();
    
    if (servicesData.length === 0) {
        if (titleElement) titleElement.textContent = 'Ошибка загрузки данных';
        console.error('❌ Нет данных об услугах');
        showErrorToast('Не удалось загрузить услуги. Проверьте подключение к серверу.');
        return;
    }
    
    await loadSideMenu();
    await updatePageContent();
    updateActiveMenu();
    
    initMoreButton();
    initCloseButton();
    
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }
    
    window.addEventListener('popstate', function() {
        updatePageContent();
        updateActiveMenu();
    });
    
    console.log('✅ Страница услуг инициализирована');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}