
(function() {
    function getOriginalReturnUrl() {
        let originalUrl = sessionStorage.getItem('menuOriginalReturnUrl');
        
        if (originalUrl && originalUrl !== '') {
            console.log('🎯 Возврат на исходную страницу:', originalUrl);
            return originalUrl;
        }
        
        if (document.referrer && document.referrer !== '') {
            if (!document.referrer.includes('menu.html')) {
                console.log('📎 Возврат по referrer:', document.referrer);
                return document.referrer;
            }
        }
        
        console.log('🏠 Возврат на главную');
        return '../index.html';
    }
    
    function closeMenuAndGoBack() {
        const returnUrl = getOriginalReturnUrl();
        console.log('❌ Закрытие меню, переход на:', returnUrl);
        
        sessionStorage.removeItem('menuOriginalReturnUrl');
        
        window.location.href = returnUrl;
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('📍 Меню загружено');
        
        const closeBtn = document.getElementById('closeMenuBtn');
        
        if (closeBtn) {
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            
            newCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenuAndGoBack();
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenuAndGoBack();
            }
        });
        
        const menuOverlay = document.querySelector('.menu-overlay');
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function(e) {
                if (e.target === menuOverlay || e.target.classList.contains('menu-overlay')) {
                    closeMenuAndGoBack();
                }
            });
        }
    });
})();