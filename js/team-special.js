
(function() {
    const isTeamPage = window.location.pathname.includes('team.html');
    if (!isTeamPage) return;
    
    console.log('🔄 Применение специальных фиксов для team.html');
    
    function applyTeamSpecialStyles() {
        const isSpecialMode = document.body.classList.contains('special-mode');
        const isPhotoHidden = document.body.classList.contains('photo-hidden-mode');
        
        if (!isSpecialMode) return;
        
        const heroTeam = document.querySelector('.hero-team');
        const heroContent = document.querySelector('.hero-team .hero-content');
        const heroTitle = document.querySelector('.hero-team h1');
        const heroBtn = document.querySelector('.hero-team .btn-white');
        
        if (!heroTeam) return;
        
        heroTeam.style.minHeight = isPhotoHidden ? '200px' : '300px';
        heroTeam.style.height = 'auto';
        heroTeam.style.display = 'flex';
        heroTeam.style.alignItems = 'center';
        heroTeam.style.justifyContent = 'center';
        heroTeam.style.padding = isPhotoHidden ? '20px 0' : '0';
        
        if (heroContent) {
            heroContent.style.position = 'relative';
            heroContent.style.top = '0';
            heroContent.style.left = '0';
            heroContent.style.transform = 'none';
            heroContent.style.margin = '0 auto';
            heroContent.style.padding = '20px';
            heroContent.style.textAlign = 'center';
            heroContent.style.width = '100%';
        }
        
        if (heroTitle) {
            heroTitle.style.transform = 'none';
            heroTitle.style.margin = '0 0 20px 0';
            heroTitle.style.fontSize = isPhotoHidden ? '36px' : '42px';
            heroTitle.style.lineHeight = '1.3';
        }
        
        if (heroBtn) {
            heroBtn.style.transform = 'none';
            heroBtn.style.margin = '10px auto 0';
            heroBtn.style.position = 'relative';
            heroBtn.style.top = '0';
        }
        
        if (isPhotoHidden) {
            const teamImages = document.querySelectorAll('.team-item .team-image');
            teamImages.forEach(img => {
                img.style.display = 'none';
            });
            
            const teamItems = document.querySelectorAll('.team-item');
            teamItems.forEach(item => {
                item.style.minHeight = '0';
                item.style.height = 'auto';
                item.style.margin = '10px 0';
                item.style.padding = '10px';
            });
        } else {
            const teamImages = document.querySelectorAll('.team-item .team-image');
            teamImages.forEach(img => {
                img.style.display = '';
            });
            
            const teamItems = document.querySelectorAll('.team-item');
            teamItems.forEach(item => {
                item.style.minHeight = '';
                item.style.height = '';
                item.style.margin = '';
                item.style.padding = '';
            });
        }
    }
    
    function resetTeamSpecialStyles() {
        const heroTeam = document.querySelector('.hero-team');
        const heroContent = document.querySelector('.hero-team .hero-content');
        const heroTitle = document.querySelector('.hero-team h1');
        const heroBtn = document.querySelector('.hero-team .btn-white');
        
        if (heroTeam) {
            heroTeam.style.minHeight = '';
            heroTeam.style.height = '';
            heroTeam.style.display = '';
            heroTeam.style.alignItems = '';
            heroTeam.style.justifyContent = '';
            heroTeam.style.padding = '';
        }
        
        if (heroContent) {
            heroContent.style.position = '';
            heroContent.style.top = '';
            heroContent.style.left = '';
            heroContent.style.transform = '';
            heroContent.style.margin = '';
            heroContent.style.padding = '';
            heroContent.style.textAlign = '';
            heroContent.style.width = '';
        }
        
        if (heroTitle) {
            heroTitle.style.transform = '';
            heroTitle.style.margin = '';
            heroTitle.style.fontSize = '';
            heroTitle.style.lineHeight = '';
        }
        
        if (heroBtn) {
            heroBtn.style.transform = '';
            heroBtn.style.margin = '';
            heroBtn.style.position = '';
            heroBtn.style.top = '';
        }
        
        const teamImages = document.querySelectorAll('.team-item .team-image');
        teamImages.forEach(img => {
            img.style.display = '';
        });
        
        const teamItems = document.querySelectorAll('.team-item');
        teamItems.forEach(item => {
            item.style.minHeight = '';
            item.style.height = '';
            item.style.margin = '';
            item.style.padding = '';
        });
    }
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const isSpecialMode = document.body.classList.contains('special-mode');
                const isPhotoHidden = document.body.classList.contains('photo-hidden-mode');
                
                if (isSpecialMode) {
                    applyTeamSpecialStyles();
                } else {
                    resetTeamSpecialStyles();
                }
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
    
    if (document.body.classList.contains('special-mode')) {
        applyTeamSpecialStyles();
    }
    
    window.addEventListener('resize', function() {
        if (document.body.classList.contains('special-mode')) {
            applyTeamSpecialStyles();
        }
    });
    
    console.log('✅ Специальные фиксы для team.html применены');
})();