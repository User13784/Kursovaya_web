
function saveCurrentPageForMenu() {
    let fullPath = window.location.pathname.split('/').pop();
    const searchParams = window.location.search;
    
    if (searchParams && searchParams !== '') {
        fullPath = fullPath + searchParams;
    }
    
    if (fullPath && !fullPath.includes('menu.html')) {
        sessionStorage.setItem('menuOriginalReturnUrl', fullPath);
        console.log('💾 Сохранена страница для меню:', fullPath);
    }
}

function getMenuPath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        return '../menu.html';
    }
    return 'menu.html';
}

async function loadComponent(elementId, url) {
    try {
        console.log('📥 Загрузка компонента:', url);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        let html = await response.text();
        const isInPages = window.location.pathname.includes('/pages/');
        
        if (isInPages) {
            html = html.replace(/src="assets\//g, 'src="../assets/');
            html = html.replace(/href="assets\//g, 'href="../assets/');
            html = html.replace(/src="\.\.\/assets\//g, 'src="../assets/');
            html = html.replace(/href="\.\.\/assets\//g, 'href="../assets/');
        }
        
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = html;
            setupMenuButton();
            
            const scripts = container.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                    if (isInPages && newScript.src.includes('assets/')) {
                        newScript.src = newScript.src.replace(/assets\//g, '../assets/');
                    }
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                oldScript.remove();
                document.body.appendChild(newScript);
            });
            
            setTimeout(() => {
                if (typeof window.updateAuthUI === 'function') {
                    window.updateAuthUI();
                }
                if (typeof window.applyTranslations === 'function') {
                    window.applyTranslations();
                }
            }, 150);
        }
    } catch (error) {
        console.error('Ошибка загрузки компонента:', error);
    }
}

function setupMenuButton() {
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn && !menuBtn.hasAttribute('data-menu-initialized')) {
        menuBtn.setAttribute('data-menu-initialized', 'true');
        
        const newMenuBtn = menuBtn.cloneNode(true);
        menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);
        
        newMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            saveCurrentPageForMenu();
            window.location.href = getMenuPath();
        });
    }
}

function applyTranslationsToComponents() {
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }
}

function initMobileMenuAfterLoad() {
    setTimeout(() => {
        const burgerIcon = document.getElementById('burgerIcon');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const closeMenuBtn = document.getElementById('closeMenuBtn');
        const body = document.body;
        
        if (!burgerIcon || !mobileMenu) return;
        
        function openMenu() {
            saveCurrentPageForMenu();
            burgerIcon.classList.add('active');
            mobileMenu.classList.add('active');
            if (menuOverlay) menuOverlay.classList.add('active');
            body.classList.add('menu-open');
            body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            burgerIcon.classList.remove('active');
            mobileMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
        }
        
        const newBurgerIcon = burgerIcon.cloneNode(true);
        burgerIcon.parentNode.replaceChild(newBurgerIcon, burgerIcon);
        
        newBurgerIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        if (closeMenuBtn) {
            const newCloseBtn = closeMenuBtn.cloneNode(true);
            closeMenuBtn.parentNode.replaceChild(newCloseBtn, closeMenuBtn);
            newCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
        }
        
        if (menuOverlay) {
            const newOverlay = menuOverlay.cloneNode(true);
            menuOverlay.parentNode.replaceChild(newOverlay, menuOverlay);
            newOverlay.addEventListener('click', closeMenu);
        }
        
        const mobileLinks = document.querySelectorAll('.mobile-menu-btn, .mobile-lang-selector, .mobile-login-link, .mobile-link');
        mobileLinks.forEach(link => {
            if (link) {
                link.addEventListener('click', closeMenu);
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && mobileMenu && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        setTimeout(() => {
            if (typeof window.updateAuthUI === 'function') {
                window.updateAuthUI();
            }
        }, 100);
    }, 200);
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 DOMContentLoaded в components.js');
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';
    
    await loadComponent('header-placeholder', `${basePath}components/header.html`);
    await loadComponent('footer-placeholder', `${basePath}components/footer.html`);
    
    applyTranslationsToComponents();
    initMobileMenuAfterLoad();
    setupMenuButton();
    
    setTimeout(() => {
        if (typeof window.updateAuthUI === 'function') {
            window.updateAuthUI();
            console.log('✅ updateAuthUI вызван после загрузки компонентов');
        }
        if (typeof window.getCurrentUser === 'function') {
            const user = window.getCurrentUser();
            console.log('👤 Текущий пользователь после загрузки компонентов:', user ? user.email : 'не авторизован');
        }
    }, 300);
    
    setTimeout(() => {
        const openAppointmentBtns = document.querySelectorAll('#openAppointmentBtn, #openAppointmentBtn2, #openAppointmentBtn3');
        openAppointmentBtns.forEach(btn => {
            if (btn && typeof openVisitorAppointmentModal === 'function') {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    openVisitorAppointmentModal();
                });
            }
        });
    }, 500);
});

window.loadComponent = loadComponent;
window.applyTranslationsToComponents = applyTranslationsToComponents;
window.saveCurrentPageForMenu = saveCurrentPageForMenu;