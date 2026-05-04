(function() {
    function hidePreloader() {
        const preloader = document.getElementById('pagePreloader');
        if (preloader && !preloader.classList.contains('hide')) {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }
    }
    
    window.addEventListener('load', function() {
        const startTime = Date.now();
        const minDisplayTime = 1800;
        const elapsed = Date.now() - startTime;
        const remaining = minDisplayTime - elapsed;
        
        if (remaining > 0) {
            setTimeout(hidePreloader, remaining);
        } else {
            hidePreloader();
        }
    });
    
    setTimeout(() => {
        const preloader = document.getElementById('pagePreloader');
        if (preloader && !preloader.classList.contains('hide')) {
            hidePreloader();
        }
    }, 4500);
})();