async function loadComponent(elementId, url) {
    try {
        const response = await fetch(url);
        let html = await response.text();
        
        const isInPages = window.location.pathname.includes('/pages/');
        
        if (isInPages) {
            html = html.replace(/src="assets\//g, 'src="../assets/');
            html = html.replace(/href="assets\//g, 'href="../assets/');
        }
        
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = html;
            
            const scripts = container.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                document.body.appendChild(newScript);
                oldScript.remove();
            });
        }
    } catch (error) {
        console.error('Ошибка загрузки компонента:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';
    
    loadComponent('header-placeholder', `${basePath}components/header.html`);
    loadComponent('footer-placeholder', `${basePath}components/footer.html`);
});