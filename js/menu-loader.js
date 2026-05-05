function saveOriginalPage() {
    let referrerUrl = document.referrer;
    
    if (referrerUrl && referrerUrl !== '') {
        try {
            const urlObj = new URL(referrerUrl);
            let path = urlObj.pathname.split('/').pop();
            if (urlObj.search && urlObj.search !== '') {
                path = path + urlObj.search;
            }
            referrerUrl = path;
        } catch(e) {}
        
        if (!referrerUrl.includes('menu.html')) {
            sessionStorage.setItem('menuOriginalReturnUrl', referrerUrl);
            console.log('💾 Сохранена ИСХОДНАЯ страница:', referrerUrl);
        }
    }
}

async function loadServicesFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/services');
        if (!response.ok) throw new Error('Ошибка загрузки услуг');
        const services = await response.json();
        return services.filter(s => s.active === true);
    } catch (error) {
        console.error('❌ Ошибка загрузки услуг из API:', error);
        return [];
    }
}

async function loadMenuConfigFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/menuConfig');
        if (!response.ok) throw new Error('Ошибка загрузки конфигурации меню');
        const menuConfig = await response.json();
        return menuConfig;
    } catch (error) {
        console.error('❌ Ошибка загрузки конфигурации меню из API:', error);
        return { left: [], right: [] };
    }
}

async function loadMenuItems() {
    const menuContainer = document.getElementById('menuList');
    if (!menuContainer) return;
    
    saveOriginalPage();
    
    menuContainer.innerHTML = '<li class="loading-item">Загрузка меню...</li>';
    
    const [services, menuConfig] = await Promise.all([
        loadServicesFromAPI(),
        loadMenuConfigFromAPI()
    ]);
    
    if (services.length === 0) {
        menuContainer.innerHTML = '<li class="loading-item">Ошибка загрузки меню. Проверьте сервер.</li>';
        return;
    }
    
    console.log('✅ Загружено услуг из API:', services.length);
    console.log('✅ Загружена конфигурация меню из API:', menuConfig);
    
    let html = '';
    
    if (menuConfig.left && menuConfig.left.length > 0) {
        menuConfig.left.forEach(item => {
            html += `
                <li class="${item.class}">
                    <a href="${item.url}" data-translate="${item.key}">${item.name}</a>
                </li>
            `;
        });
    }
    
    const firstService = services[0];
    const firstServicePage = firstService?.page || 'service-detail.html?service=diagnostics';
    
    html += `
        <li class="item-services">
            <a href="${firstServicePage}" data-translate="services">УСЛУГИ</a>
        </li>
    `;
    
    if (menuConfig.right && menuConfig.right.length > 0) {
        menuConfig.right.forEach(item => {
            html += `
                <li class="${item.class}">
                    <a href="${item.url}" data-translate="${item.key}">${item.name}</a>
                </li>
            `;
        });
    }
    
    menuContainer.innerHTML = html;
    
    document.querySelectorAll('.menu-list a').forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            
            console.log('🔗 Переход по ссылке меню:', targetUrl);
            
            window.location.replace(targetUrl);
        });
    });
    
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('menuList')) {
        loadMenuItems();
    }
});