(function() {
    const savedTheme = localStorage.getItem('dental_theme') || 'system';
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log('🎨 Применена тема:', savedTheme);
})();