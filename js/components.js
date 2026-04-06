async function loadComponent(elementId, url) {
    try {
        const response = await fetch(url);
        let html = await response.text();
        
        const isInPages = window.location.pathname.includes('/pages/');
        
        if (isInPages) {
            html = html.replace(/src="assets\//g, 'src="../assets/');
            html = html.replace(/href="assets\//g, 'href="../assets/');
        }
        
        document.getElementById(elementId).innerHTML = html;
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