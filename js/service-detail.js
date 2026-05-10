let servicesData = [];
let serviceDetailsData = [];
let currentService = null;


const serviceUrlMap = {
    'diagnostics': 1,
    'prevention': 2,
    'therapy': 3,
    'digital-prosthetics': 4,
    'digital-implantation': 5,
    'complex-implantation': 6,
    'orthodontics': 7,
    'veneers': 8
};

const serviceIdToParam = {
    1: 'diagnostics',
    2: 'prevention',
    3: 'therapy',
    4: 'digital-prosthetics',
    5: 'digital-implantation',
    6: 'complex-implantation',
    7: 'orthodontics',
    8: 'veneers'
};

const serviceDetailPageMap = {
    1: 'service-menu2.html',
    2: 'service-menu3.html',
    3: 'service-menu4.html',
    4: 'service-menu5.html',
    5: 'service-menu6.html',
    6: 'service-menu7.html',
    7: 'service-menu8.html',
    8: 'service-menu9.html'
};

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

async function loadServicesFromAPI() {
    try {
        servicesData = await getServices({ active: true });
        console.log('✅ Услуги загружены из API через getServices():', servicesData.length);
        return servicesData;
    } catch (error) {
        console.error('❌ Ошибка загрузки услуг:', error);
        showErrorToast('Не удалось загрузить услуги. Проверьте подключение к серверу.');
        return [];
    }
}

async function loadServiceDetailsFromAPI() {
    try {
        serviceDetailsData = await getServiceDetails();
        console.log('✅ Детали услуг загружены из API через getServiceDetails():', serviceDetailsData.length);
        return serviceDetailsData;
    } catch (error) {
        console.error('❌ Ошибка загрузки деталей услуг:', error);
        return [];
    }
}

function getCurrentServiceParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('service') || 'diagnostics';
}

async function updatePageContent() {
    const serviceParam = getCurrentServiceParam();
    const serviceId = serviceUrlMap[serviceParam];
    
    if (!serviceId) {
        console.error('Неизвестный параметр услуги:', serviceParam);
        const titleElement = document.getElementById('serviceTitle');
        if (titleElement) titleElement.textContent = 'Услуга не найдена';
        return;
    }
    
    if (servicesData.length === 0) {
        await loadServicesFromAPI();
    }
    
    currentService = servicesData.find(s => s.id === serviceId);
    
    if (!currentService) {
        console.error('Услуга не найдена:', serviceId);
        const titleElement = document.getElementById('serviceTitle');
        if (titleElement) titleElement.textContent = 'Услуга не найдена';
        return;
    }
    
    const serviceName = currentService.name;
    const serviceTitle = currentService.title;
    
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
    
    console.log('✅ Текущая услуга:', serviceName);
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
    
    sortedServices.forEach(service => {
        const param = serviceIdToParam[service.id];
        if (!param) return;
        const isActive = currentParam === param;
        const activeClass = isActive ? 'active' : '';
        const serviceName = service.name || 'Услуга';
        const safeName = serviceName.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
        html += `
            <li>
                <a href="?service=${param}" class="${activeClass}" data-service-id="${service.id}">${safeName}</a>
            </li>
        `;
    });
    
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
        if (href && href.includes(currentParam)) {
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
            
            const serviceParam = getCurrentServiceParam();
            const serviceId = serviceUrlMap[serviceParam];
            
            if (!serviceId) {
                showErrorToast('Услуга не найдена');
                return;
            }
            
            const detailPage = serviceDetailPageMap[serviceId];
            
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
    console.log('📍 Текущий путь:', window.location.pathname);
    
    const titleElement = document.getElementById('serviceTitle');
    if (titleElement) titleElement.textContent = 'Загрузка...';
    
    try {
        const testResponse = await fetch(`${API_BASE_URL}/services`);
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