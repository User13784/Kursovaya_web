(function() {
    let currentSettings = {
        fontSize: 'normal',
        colorScheme: 'black-yellow',
        hideImages: false,
        isActive: false
    };
    
    let panelElement = null;
    let styleElement = null;
    let dynamicObserver = null;
    
    const fontSizeMap = {
        normal: { base: '16px', h1: '48px', h2: '36px', h3: '28px', h4: '24px', small: '14px', footer: '14px', breakText: '18px', button: '16px', menu: '20px' },
        large: { base: '18px', h1: '54px', h2: '40px', h3: '32px', h4: '28px', small: '16px', footer: '16px', breakText: '20px', button: '18px', menu: '22px' },
        xlarge: { base: '20px', h1: '60px', h2: '44px', h3: '36px', h4: '32px', small: '18px', footer: '18px', breakText: '24px', button: '20px', menu: '24px' },
        xxlarge: { base: '24px', h1: '72px', h2: '52px', h3: '42px', h4: '38px', small: '20px', footer: '20px', breakText: '28px', button: '24px', menu: '28px' }
    };
    
    const colorSchemes = {
        'black-yellow': {
            bg: '#000000',
            text: '#FFFF00',
            border: '#FFFF00',
            link: '#FFFF00',
            buttonBg: '#FFFF00',
            buttonText: '#000000',
            inputBg: '#1a1a1a',
            placeholder: '#888800',
            hover: '#333300',
            headerBg: '#000000',
            headerText: '#FFFF00',
            footerBg: '#000000',
            footerText: '#FFFF00',
            iconFilter: 'brightness(0) invert(1)',
            menuText: '#FFFFFF',
            socialIconFilter: 'brightness(0) invert(1)'
        },
        'white-black': {
            bg: '#FFFFFF',
            text: '#000000',
            border: '#000000',
            link: '#0000FF',
            buttonBg: '#000000',
            buttonText: '#FFFFFF',
            inputBg: '#F0F0F0',
            placeholder: '#666666',
            hover: '#E0E0E0',
            headerBg: '#FFFFFF',
            headerText: '#000000',
            footerBg: '#FFFFFF',
            footerText: '#000000',
            iconFilter: 'brightness(0) invert(0)',
            menuText: '#000000',
            socialIconFilter: 'brightness(0) invert(0)'
        },
        'blue-yellow': {
            bg: '#00008B',
            text: '#FFFF00',
            border: '#FFFF00',
            link: '#FFFF00',
            buttonBg: '#FFFF00',
            buttonText: '#00008B',
            inputBg: '#0000AA',
            placeholder: '#AAAA00',
            hover: '#0000CC',
            headerBg: '#00008B',
            headerText: '#FFFF00',
            footerBg: '#00008B',
            footerText: '#FFFF00',
            iconFilter: 'brightness(0) invert(1)',
            menuText: '#FFFFFF',
            socialIconFilter: 'brightness(0) invert(1)'
        },
        'black-white': {
            bg: '#000000',
            text: '#FFFFFF',
            border: '#FFFFFF',
            link: '#FFFFFF',
            buttonBg: '#444444',
            buttonText: '#FFFFFF',
            inputBg: '#222222',
            placeholder: '#888888',
            hover: '#333333',
            headerBg: '#000000',
            headerText: '#FFFFFF',
            footerBg: '#000000',
            footerText: '#FFFFFF',
            iconFilter: 'brightness(0) invert(1)',
            menuText: '#FFFFFF',
            socialIconFilter: 'brightness(0) invert(1)'
        },
        'dark-blue-light': {
            bg: '#0a0e27',
            text: '#e0e0e0',
            border: '#4a6fa5',
            link: '#7aa2f7',
            buttonBg: '#1d2438',
            buttonText: '#e0e0e0',
            inputBg: '#151a2d',
            placeholder: '#5a6b8a',
            hover: '#1a2040',
            headerBg: '#0a0e27',
            headerText: '#e0e0e0',
            footerBg: '#0a0e27',
            footerText: '#e0e0e0',
            iconFilter: 'brightness(1.2) contrast(1.1)',
            menuText: '#FFFFFF',
            socialIconFilter: 'brightness(1.2) contrast(1.1)'
        }
    };
    
    function translateSpecialPanel() {
        const panel = document.getElementById('specialPanel');
        if (!panel) return;
        
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        
        const header = panel.querySelector('.special-panel-header h3');
        if (header) {
            header.innerHTML = currentLang === 'ru' ? '👁️ Настройки для слабовидящих' : '👁️ Accessibility Settings';
        }
        
        const labels = panel.querySelectorAll('.special-setting-group label');
        if (labels[0]) labels[0].innerHTML = currentLang === 'ru' ? '📏 Размер шрифта' : '📏 Font Size';
        if (labels[1]) labels[1].innerHTML = currentLang === 'ru' ? '🎨 Цвет фона и текста' : '🎨 Color Scheme';
        if (labels[2]) labels[2].innerHTML = currentLang === 'ru' ? '🖼️ Изображения' : '🖼️ Images';
        
        const sizeBtns = panel.querySelectorAll('#fontSizeButtons .special-btn');
        const sizeTexts = currentLang === 'ru' 
            ? ['Обычный', 'Увеличенный', 'Крупный', 'Очень крупный']
            : ['Normal', 'Large', 'X-Large', 'XX-Large'];
        sizeBtns.forEach((btn, idx) => {
            if (sizeTexts[idx]) btn.textContent = sizeTexts[idx];
        });
        
        const resetBtn = document.getElementById('specialResetBtn');
        if (resetBtn) {
            resetBtn.innerHTML = currentLang === 'ru' ? '🔄 Сбросить' : '🔄 Reset';
        }
        
        const imagesBtn = document.getElementById('toggleImagesBtn');
        if (imagesBtn) {
            if (currentSettings.hideImages) {
                imagesBtn.textContent = currentLang === 'ru' ? 'Показать фото' : 'Show Images';
            } else {
                imagesBtn.textContent = currentLang === 'ru' ? 'Скрыть фото' : 'Hide Images';
            }
        }
        
        const toggleBtn = document.getElementById('specialToggleBtn');
        if (toggleBtn) {
            if (currentSettings.isActive) {
                toggleBtn.innerHTML = currentLang === 'ru' ? '🔴 Выключить режим' : '🔴 Disable mode';
            } else {
                toggleBtn.innerHTML = currentLang === 'ru' ? '🟢 Включить режим' : '🟢 Enable mode';
            }
        }
        
        const colorOptions = panel.querySelectorAll('.color-option');
        const colorTitles = {
            'black-yellow': { ru: 'Чёрный на жёлтом', en: 'Black on Yellow' },
            'white-black': { ru: 'Белый на чёрном', en: 'White on Black' },
            'blue-yellow': { ru: 'Синий на жёлтом', en: 'Blue on Yellow' },
            'black-white': { ru: 'Чёрный на белом', en: 'Black on White' },
            'dark-blue-light': { ru: 'Тёмно-синий на светлом', en: 'Dark Blue on Light' }
        };
        colorOptions.forEach(option => {
            const scheme = option.dataset.scheme;
            if (scheme && colorTitles[scheme]) {
                option.title = colorTitles[scheme][currentLang];
            }
        });
        
        console.log('🌐 Панель переведена на:', currentLang);
    }
    
    function resetMoreButtonStyles() {
        const moreBtn = document.getElementById('moreBtn');
        if (moreBtn) {
            moreBtn.removeAttribute('style');
            moreBtn.removeAttribute('data-special-styled');
            moreBtn.style.cssText = `
                background-color: #FFFFFF !important;
                background: #FFFFFF !important;
                color: #777C88 !important;
                border: none !important;
                border-radius: 30px !important;
                padding: 15px 60px !important;
                font-size: 16px !important;
                font-weight: 400 !important;
                text-transform: uppercase !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                text-decoration: none !important;
                box-shadow: none !important;
                transform: none !important;
                opacity: 1 !important;
                visibility: visible !important;
            `;
            console.log('🔄 Стили кнопки MORE сброшены');
        }
    }
    
    function resetLoginButtonAndTitleStyles() {
        const loginLink = document.querySelector('.login-link, #desktopLoginLink');
        const serviceTitle = document.getElementById('serviceTitle');
        
        if (loginLink) {
            loginLink.removeAttribute('style');
            loginLink.style.marginTop = '9px';
            loginLink.style.display = 'inline-block';
            loginLink.style.color = 'white';
            loginLink.style.fontSize = '18px';
            loginLink.style.fontWeight = '400';
            loginLink.style.textTransform = 'uppercase';
            loginLink.style.textDecoration = 'none';
            loginLink.removeAttribute('data-special-styled');
        }
        
        if (serviceTitle) {
            serviceTitle.removeAttribute('style');
            serviceTitle.removeAttribute('data-special-styled');
        }
        
        console.log('🔄 Стили кнопки "ВОЙТИ" и заголовка сброшены');
    }
    
    function applyLoginButtonAndTitleStyles() {
        if (!currentSettings.isActive) return;
        
        const loginLink = document.querySelector('.login-link, #desktopLoginLink');
        const serviceTitle = document.getElementById('serviceTitle');
        
        if (loginLink && !loginLink.hasAttribute('data-special-styled')) {
            loginLink.style.marginTop = '6px';
            loginLink.style.display = 'inline-block';
            loginLink.style.position = 'relative';
            loginLink.style.top = '4px';
            loginLink.setAttribute('data-special-styled', 'true');
            console.log('👁️ Стили для кнопки "ВОЙТИ" применены');
        }
        
        if (serviceTitle && !serviceTitle.hasAttribute('data-special-styled')) {
            serviceTitle.style.fontSize = '48px';
            serviceTitle.style.fontWeight = 'bold';
            serviceTitle.style.marginBottom = '30px';
            serviceTitle.style.lineHeight = '1.3';
            serviceTitle.setAttribute('data-special-styled', 'true');
            console.log('👁️ Стили для заголовка применены');
        }
    }
    
    function forceResetOnLoad() {
        const wasDisabled = sessionStorage.getItem('special_mode_disabled');
        
        if (wasDisabled === 'true') {
            localStorage.removeItem('special_version_settings');
            localStorage.removeItem('specialVersion');
            currentSettings.isActive = false;
            document.body.classList.remove('special-mode');
            document.body.classList.remove('photo-hidden-mode');
            document.body.removeAttribute('data-special-scheme');
            document.body.removeAttribute('data-special-font');
            
            if (styleElement) {
                styleElement.remove();
                styleElement = null;
            }
            
            resetMoreButtonStyles();
            resetLoginButtonAndTitleStyles();
            sessionStorage.removeItem('special_mode_disabled');
            console.log('🔄 Принудительный сброс режима при загрузке');
        }
        
        const saved = localStorage.getItem('special_version_settings');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.isActive === false) {
                    currentSettings = {
                        fontSize: 'normal',
                        colorScheme: 'black-yellow',
                        hideImages: false,
                        isActive: false
                    };
                    resetMoreButtonStyles();
                    resetLoginButtonAndTitleStyles();
                }
            } catch(e) {}
        }
    }
    
    function applyServiceMenu2Styles() {
        const isServiceMenu2Page = window.location.pathname.includes('service-menu2.html');
        if (!isServiceMenu2Page) return;
        
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        
        const specialistsText = document.querySelector('.specialists-text');
        const teamText = document.querySelector('.team-text');
        const specialistsLine = document.querySelector('.specialists-line');
        
        if (isPhotoHidden) {
            if (specialistsText) {
                specialistsText.style.display = 'none';
                specialistsText.style.visibility = 'hidden';
            }
            if (teamText) {
                teamText.style.display = 'none';
                teamText.style.visibility = 'hidden';
            }
            if (specialistsLine) {
                specialistsLine.style.display = 'none';
                specialistsLine.style.visibility = 'hidden';
            }
            console.log('👁️ Тексты и линия скрыты в service-menu2 (режим скрытия фото)');
        } else {
            if (specialistsText) {
                specialistsText.style.display = '';
                specialistsText.style.visibility = '';
            }
            if (teamText) {
                teamText.style.display = '';
                teamText.style.visibility = '';
            }
            if (specialistsLine) {
                specialistsLine.style.display = '';
                specialistsLine.style.visibility = '';
            }
            console.log('👁️ Тексты и линия восстановлены в service-menu2');
        }
    }
    
    function applyServiceMenu3Styles() {
        const isServiceMenu3Page = window.location.pathname.includes('service-menu3.html');
        if (!isServiceMenu3Page) return;
        
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        
        const diagnosticsWrapper = document.querySelector('.diagnostics-wrapper');
        const whiteBgSection = document.querySelector('.white-bg-section');
        const heroSection = document.querySelector('.hero-diagnostics');
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero-diagnostics h1');
        const heroBtn = document.querySelector('.hero-diagnostics .btn-white');
        const infoRows = document.querySelectorAll('.info-row');
        const infoTexts = document.querySelectorAll('.info-text');
        const infoImages = document.querySelectorAll('.info-image');
        const textBlocks = document.querySelectorAll('.diagnosis-text, .tomograph-text, .safety-text, .steps-title, .steps-list, .team-text');
        const buttons = document.querySelectorAll('.btn-white, .btn-outline, .first-btn, .diagnost-btn, .steps-btn');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        const footer = document.querySelector('.footer');
        
        if (isPhotoHidden) {
            const allImages = document.querySelectorAll('.info-image img, .full-width-section img, .side-img img, .tomograph-image img, .specialists-image img, .double-img img, .microscope-img, .team-img');
            allImages.forEach(img => {
                img.style.display = 'none';
                img.style.visibility = 'hidden';
            });
            
            infoImages.forEach(container => {
                container.style.display = 'none';
                container.style.visibility = 'hidden';
                container.style.minHeight = '0';
                container.style.height = '0';
                container.style.margin = '0';
                container.style.padding = '0';
            });
            
            if (heroSection) {
                heroSection.style.minHeight = '250px';
                heroSection.style.padding = '40px 0';
                heroSection.style.marginBottom = '-20px';
            }
            
            if (heroContent) {
                heroContent.style.transform = 'translateY(0)';
                heroContent.style.marginTop = '0';
                heroContent.style.paddingTop = '0';
                heroContent.style.position = 'relative';
                heroContent.style.top = '0';
            }
            
            if (heroTitle) {
                heroTitle.style.fontSize = '36px';
                heroTitle.style.marginBottom = '15px';
            }
            
            if (heroBtn) {
                heroBtn.style.marginTop = '10px';
                heroBtn.style.marginBottom = '0';
            }
            
            if (diagnosticsWrapper) {
                diagnosticsWrapper.style.paddingBottom = '20px';
                diagnosticsWrapper.style.marginTop = '-30px';
            }
            
            if (whiteBgSection) {
                whiteBgSection.style.paddingTop = '20px';
                whiteBgSection.style.paddingBottom = '20px';
                whiteBgSection.style.marginTop = '-20px';
            }
            
            infoRows.forEach(row => {
                row.style.marginBottom = '20px';
                row.style.gap = '15px';
            });
            
            infoTexts.forEach(text => {
                text.style.width = '100%';
                text.style.maxWidth = '100%';
                text.style.margin = '0';
                text.style.padding = '0 15px';
            });
            
            textBlocks.forEach(block => {
                block.style.marginBottom = '10px';
                block.style.padding = '0';
            });
            
            const lists = document.querySelectorAll('.steps-list');
            lists.forEach(list => {
                list.style.marginBottom = '10px';
                list.style.paddingLeft = '20px';
            });
            
            buttons.forEach(btn => {
                btn.style.marginTop = '10px';
                btn.style.marginBottom = '10px';
                btn.style.padding = '10px 20px';
            });
            
            if (footerPlaceholder) {
                footerPlaceholder.style.marginTop = '-30px';
                footerPlaceholder.style.position = 'relative';
            }
            
            if (footer) {
                footer.style.marginTop = '0';
                footer.style.padding = '25px 0 20px 0';
            }
            
            const stepsListItems = document.querySelectorAll('.specialists-text-block .steps-list li');
            const teamTextEl = document.querySelector('.team-text');
            
            if (stepsListItems.length > 0) {
                stepsListItems.forEach(item => {
                    item.style.display = 'none';
                    item.style.visibility = 'hidden';
                });
            }
            if (teamTextEl) {
                teamTextEl.style.display = 'none';
                teamTextEl.style.visibility = 'hidden';
            }
            
            console.log('👁️ Стили для service-menu3 применены (режим скрытия фото)');
        } else {
            const allImages = document.querySelectorAll('.info-image img, .full-width-section img, .side-img img, .tomograph-image img, .specialists-image img, .double-img img, .microscope-img, .team-img');
            allImages.forEach(img => {
                img.style.display = '';
                img.style.visibility = '';
            });
            
            infoImages.forEach(container => {
                container.style.display = '';
                container.style.visibility = '';
                container.style.minHeight = '';
                container.style.height = '';
                container.style.margin = '';
                container.style.padding = '';
            });
            
            if (heroSection) {
                heroSection.style.minHeight = '';
                heroSection.style.padding = '';
                heroSection.style.marginBottom = '';
            }
            
            if (heroContent) {
                heroContent.style.transform = '';
                heroContent.style.marginTop = '';
                heroContent.style.paddingTop = '';
                heroContent.style.position = '';
                heroContent.style.top = '';
            }
            
            if (heroTitle) {
                heroTitle.style.fontSize = '';
                heroTitle.style.marginBottom = '';
            }
            
            if (heroBtn) {
                heroBtn.style.marginTop = '';
                heroBtn.style.marginBottom = '';
            }
            
            if (diagnosticsWrapper) {
                diagnosticsWrapper.style.paddingBottom = '';
                diagnosticsWrapper.style.marginTop = '';
            }
            
            if (whiteBgSection) {
                whiteBgSection.style.paddingTop = '';
                whiteBgSection.style.paddingBottom = '';
                whiteBgSection.style.marginTop = '';
            }
            
            infoRows.forEach(row => {
                row.style.marginBottom = '';
                row.style.gap = '';
            });
            
            infoTexts.forEach(text => {
                text.style.width = '';
                text.style.maxWidth = '';
                text.style.margin = '';
                text.style.padding = '';
            });
            
            textBlocks.forEach(block => {
                block.style.marginBottom = '';
                block.style.padding = '';
            });
            
            const lists = document.querySelectorAll('.steps-list');
            lists.forEach(list => {
                list.style.marginBottom = '';
                list.style.paddingLeft = '';
            });
            
            buttons.forEach(btn => {
                btn.style.marginTop = '';
                btn.style.marginBottom = '';
                btn.style.padding = '';
            });
            
            if (footerPlaceholder) {
                footerPlaceholder.style.marginTop = '';
                footerPlaceholder.style.position = '';
            }
            
            if (footer) {
                footer.style.marginTop = '';
                footer.style.padding = '';
            }
            
            const stepsListItems = document.querySelectorAll('.specialists-text-block .steps-list li');
            const teamTextEl = document.querySelector('.team-text');
            
            if (stepsListItems.length > 0) {
                stepsListItems.forEach(item => {
                    item.style.display = '';
                    item.style.visibility = '';
                });
            }
            if (teamTextEl) {
                teamTextEl.style.display = '';
                teamTextEl.style.visibility = '';
            }
            
            console.log('👁️ Стили для service-menu3 восстановлены');
        }
    }
    
    function applyServiceMenu4Styles() {
        const isServiceMenu4Page = window.location.pathname.includes('service-menu4.html');
        if (!isServiceMenu4Page) return;
        
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        
        const diagnosticsWrapper = document.querySelector('.diagnostics-wrapper');
        const whiteBgSection = document.querySelector('.white-bg-section');
        const heroSection = document.querySelector('.hero-diagnostics');
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero-diagnostics h1');
        const heroBtn = document.querySelector('.hero-diagnostics .btn-white');
        const infoRows = document.querySelectorAll('.info-row');
        const infoTexts = document.querySelectorAll('.info-text');
        const infoImages = document.querySelectorAll('.info-image');
        const buttons = document.querySelectorAll('.btn-white, .btn-outline, .first-btn, .diagnost-btn, .steps-btn, .last-step-btn');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        const footer = document.querySelector('.footer');
        
        const stepsRow = document.querySelector('.steps-row');
        const stepsTextBlock = document.querySelector('.steps-text-block');
        const stepsTitle = document.querySelector('.steps-text-block .steps-title');
        const visitTitleFirst = document.querySelector('.steps-text-block .visit-title-first');
        const stepsListFirst = document.querySelectorAll('.steps-text-block .steps-list');
        const visitTitleSecond = document.querySelector('.steps-text-block .visit-title-second');
        const stepsListSecond = document.querySelectorAll('.steps-text-block .steps-list2');
        const extraServiceImg = document.querySelector('.extra-service-img');
        const lastStepBtn = document.querySelector('.steps-text-block .last-step-btn');
        const doubleImg = document.querySelector('.double-img');
        
        if (isPhotoHidden) {
            const allImages = document.querySelectorAll('.info-image img, .full-width-section img, .side-img img, .tomograph-image img, .specialists-image img, .double-img img, .microscope-img, .team-img, .extra-service-img');
            allImages.forEach(img => {
                img.style.display = 'none';
                img.style.visibility = 'hidden';
            });
            
            infoImages.forEach(container => {
                container.style.display = 'none';
                container.style.visibility = 'hidden';
                container.style.minHeight = '0';
                container.style.height = '0';
                container.style.margin = '0';
                container.style.padding = '0';
            });
            
            if (doubleImg) {
                doubleImg.style.display = 'none';
                doubleImg.style.visibility = 'hidden';
                doubleImg.style.minHeight = '0';
                doubleImg.style.height = '0';
                doubleImg.style.margin = '0';
                doubleImg.style.padding = '0';
            }
            
            if (extraServiceImg) {
                extraServiceImg.style.display = 'none';
                extraServiceImg.style.visibility = 'hidden';
            }
            
            if (heroSection) {
                heroSection.style.minHeight = '200px';
                heroSection.style.padding = '30px 0';
                heroSection.style.marginBottom = '-40px';
            }
            
            if (heroContent) {
                heroContent.style.transform = 'translateY(0)';
                heroContent.style.marginTop = '-20px';
                heroContent.style.paddingTop = '0';
                heroContent.style.position = 'relative';
                heroContent.style.top = '0';
            }
            
            if (heroTitle) {
                heroTitle.style.fontSize = '32px';
                heroTitle.style.marginBottom = '10px';
            }
            
            if (heroBtn) {
                heroBtn.style.marginTop = '5px';
                heroBtn.style.marginBottom = '0';
            }
            
            if (diagnosticsWrapper) {
                diagnosticsWrapper.style.paddingBottom = '10px';
                diagnosticsWrapper.style.marginTop = '-50px';
            }
            
            if (whiteBgSection) {
                whiteBgSection.style.paddingTop = '10px';
                whiteBgSection.style.paddingBottom = '10px';
                whiteBgSection.style.marginTop = '-40px';
            }
            
            infoRows.forEach(row => {
                row.style.marginBottom = '15px';
                row.style.gap = '10px';
            });
            
            infoTexts.forEach(text => {
                text.style.width = '100%';
                text.style.maxWidth = '100%';
                text.style.margin = '0';
                text.style.padding = '0 15px';
            });
            
            if (stepsRow) {
                stepsRow.style.marginTop = '-80px';
                stepsRow.style.marginBottom = '0';
                stepsRow.style.position = 'relative';
            }
            
            if (stepsTextBlock) {
                stepsTextBlock.style.marginTop = '-60px';
                stepsTextBlock.style.paddingTop = '0';
                stepsTextBlock.style.position = 'relative';
            }
            
            if (stepsTitle) {
                stepsTitle.style.marginTop = '0';
                stepsTitle.style.marginBottom = '10px';
                stepsTitle.style.fontSize = '20px';
            }
            
            if (visitTitleFirst) {
                visitTitleFirst.style.marginTop = '5px';
                visitTitleFirst.style.marginBottom = '8px';
            }
            
            if (stepsListFirst.length > 0) {
                stepsListFirst.forEach(list => {
                    list.style.marginTop = '0';
                    list.style.marginBottom = '8px';
                    list.style.paddingLeft = '15px';
                });
            }
            
            if (visitTitleSecond) {
                visitTitleSecond.style.marginTop = '10px';
                visitTitleSecond.style.marginBottom = '8px';
            }
            
            if (stepsListSecond.length > 0) {
                stepsListSecond.forEach(list => {
                    list.style.marginTop = '0';
                    list.style.marginBottom = '8px';
                    list.style.paddingLeft = '15px';
                });
            }
            
            if (lastStepBtn) {
                lastStepBtn.style.marginTop = '10px';
                lastStepBtn.style.marginBottom = '5px';
            }
            
            const allLists = document.querySelectorAll('.steps-list, .steps-list2');
            allLists.forEach(list => {
                list.style.marginBottom = '8px';
                list.style.paddingLeft = '15px';
            });
            
            const listItems = document.querySelectorAll('.steps-list li, .steps-list2 li');
            listItems.forEach(item => {
                item.style.marginBottom = '5px';
                item.style.lineHeight = '1.4';
            });
            
            const titles = document.querySelectorAll('h2.steps-title');
            titles.forEach(title => {
                title.style.marginBottom = '10px';
                title.style.fontSize = '22px';
            });
            
            buttons.forEach(btn => {
                btn.style.marginTop = '8px';
                btn.style.marginBottom = '8px';
                btn.style.padding = '8px 16px';
            });
            
            if (footerPlaceholder) {
                footerPlaceholder.style.marginTop = '-50px';
                footerPlaceholder.style.position = 'relative';
            }
            
            if (footer) {
                footer.style.marginTop = '-10px';
                footer.style.padding = '20px 0 15px 0';
            }
            
            const safetyText1 = document.querySelector('.safety-text[data-translate="therapy_safety_text_1"]');
            const safetyText2 = document.querySelector('.safety-text[data-translate="therapy_safety_text_2"]');
            const safetyText3 = document.querySelector('.safety-text[data-translate="therapy_safety_text_3"]');
            const allSafetyTexts = document.querySelectorAll('.specialists-text-block .safety-text');
            const therapyTexts = document.querySelectorAll('.tomograph-text, .safety-text');
            
            if (safetyText1) {
                safetyText1.style.display = 'none';
                safetyText1.style.visibility = 'hidden';
            }
            if (safetyText2) {
                safetyText2.style.display = 'none';
                safetyText2.style.visibility = 'hidden';
            }
            if (safetyText3) {
                safetyText3.style.display = 'none';
                safetyText3.style.visibility = 'hidden';
            }
            allSafetyTexts.forEach(text => {
                text.style.display = 'none';
                text.style.visibility = 'hidden';
            });
            
            therapyTexts.forEach(text => {
                text.style.marginBottom = '5px';
            });
            
            console.log('👁️ Стили для service-menu4 применены (режим скрытия фото)');
        } else {
            const allImages = document.querySelectorAll('.info-image img, .full-width-section img, .side-img img, .tomograph-image img, .specialists-image img, .double-img img, .microscope-img, .team-img, .extra-service-img');
            allImages.forEach(img => {
                img.style.display = '';
                img.style.visibility = '';
            });
            
            infoImages.forEach(container => {
                container.style.display = '';
                container.style.visibility = '';
                container.style.minHeight = '';
                container.style.height = '';
                container.style.margin = '';
                container.style.padding = '';
            });
            
            if (doubleImg) {
                doubleImg.style.display = '';
                doubleImg.style.visibility = '';
                doubleImg.style.minHeight = '';
                doubleImg.style.height = '';
                doubleImg.style.margin = '';
                doubleImg.style.padding = '';
            }
            
            if (extraServiceImg) {
                extraServiceImg.style.display = '';
                extraServiceImg.style.visibility = '';
            }
            
            if (heroSection) {
                heroSection.style.minHeight = '';
                heroSection.style.padding = '';
                heroSection.style.marginBottom = '';
            }
            
            if (heroContent) {
                heroContent.style.transform = '';
                heroContent.style.marginTop = '';
                heroContent.style.paddingTop = '';
                heroContent.style.position = '';
                heroContent.style.top = '';
            }
            
            if (heroTitle) {
                heroTitle.style.fontSize = '';
                heroTitle.style.marginBottom = '';
            }
            
            if (heroBtn) {
                heroBtn.style.marginTop = '';
                heroBtn.style.marginBottom = '';
            }
            
            if (diagnosticsWrapper) {
                diagnosticsWrapper.style.paddingBottom = '';
                diagnosticsWrapper.style.marginTop = '';
            }
            
            if (whiteBgSection) {
                whiteBgSection.style.paddingTop = '';
                whiteBgSection.style.paddingBottom = '';
                whiteBgSection.style.marginTop = '';
            }
            
            infoRows.forEach(row => {
                row.style.marginBottom = '';
                row.style.gap = '';
            });
            
            infoTexts.forEach(text => {
                text.style.width = '';
                text.style.maxWidth = '';
                text.style.margin = '';
                text.style.padding = '';
            });
            
            if (stepsRow) {
                stepsRow.style.marginTop = '';
                stepsRow.style.marginBottom = '';
                stepsRow.style.position = '';
            }
            
            if (stepsTextBlock) {
                stepsTextBlock.style.marginTop = '';
                stepsTextBlock.style.paddingTop = '';
                stepsTextBlock.style.position = '';
            }
            
            if (stepsTitle) {
                stepsTitle.style.marginTop = '';
                stepsTitle.style.marginBottom = '';
                stepsTitle.style.fontSize = '';
            }
            
            if (visitTitleFirst) {
                visitTitleFirst.style.marginTop = '';
                visitTitleFirst.style.marginBottom = '';
            }
            
            if (stepsListFirst.length > 0) {
                stepsListFirst.forEach(list => {
                    list.style.marginTop = '';
                    list.style.marginBottom = '';
                    list.style.paddingLeft = '';
                });
            }
            
            if (visitTitleSecond) {
                visitTitleSecond.style.marginTop = '';
                visitTitleSecond.style.marginBottom = '';
            }
            
            if (stepsListSecond.length > 0) {
                stepsListSecond.forEach(list => {
                    list.style.marginTop = '';
                    list.style.marginBottom = '';
                    list.style.paddingLeft = '';
                });
            }
            
            if (lastStepBtn) {
                lastStepBtn.style.marginTop = '';
                lastStepBtn.style.marginBottom = '';
            }
            
            const allLists = document.querySelectorAll('.steps-list, .steps-list2');
            allLists.forEach(list => {
                list.style.marginBottom = '';
                list.style.paddingLeft = '';
            });
            
            const listItems = document.querySelectorAll('.steps-list li, .steps-list2 li');
            listItems.forEach(item => {
                item.style.marginBottom = '';
                item.style.lineHeight = '';
            });
            
            const titles = document.querySelectorAll('h2.steps-title');
            titles.forEach(title => {
                title.style.marginBottom = '';
                title.style.fontSize = '';
            });
            
            buttons.forEach(btn => {
                btn.style.marginTop = '';
                btn.style.marginBottom = '';
                btn.style.padding = '';
            });
            
            if (footerPlaceholder) {
                footerPlaceholder.style.marginTop = '';
                footerPlaceholder.style.position = '';
            }
            
            if (footer) {
                footer.style.marginTop = '';
                footer.style.padding = '';
            }
            
            const safetyText1 = document.querySelector('.safety-text[data-translate="therapy_safety_text_1"]');
            const safetyText2 = document.querySelector('.safety-text[data-translate="therapy_safety_text_2"]');
            const safetyText3 = document.querySelector('.safety-text[data-translate="therapy_safety_text_3"]');
            const allSafetyTexts = document.querySelectorAll('.specialists-text-block .safety-text');
            const therapyTexts = document.querySelectorAll('.tomograph-text, .safety-text');
            
            if (safetyText1) {
                safetyText1.style.display = '';
                safetyText1.style.visibility = '';
            }
            if (safetyText2) {
                safetyText2.style.display = '';
                safetyText2.style.visibility = '';
            }
            if (safetyText3) {
                safetyText3.style.display = '';
                safetyText3.style.visibility = '';
            }
            allSafetyTexts.forEach(text => {
                text.style.display = '';
                text.style.visibility = '';
            });
            
            therapyTexts.forEach(text => {
                text.style.marginBottom = '';
            });
            
            console.log('👁️ Стили для service-menu4 восстановлены');
        }
    }
    
    function applyServiceMenu7Styles() {
        const isServiceMenu7Page = window.location.pathname.includes('service-menu7.html');
        if (!isServiceMenu7Page) return;
        
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        
        const specialistFirst = document.querySelector('.tomograph-text.specialist-first');
        const specialistSecond = document.querySelector('.tomograph-text.specialist-second');
        const stepsBtn = document.querySelector('.specialists-text-block .steps-btn');
        
        if (isPhotoHidden) {
            if (specialistFirst) {
                specialistFirst.style.display = 'none';
                specialistFirst.style.visibility = 'hidden';
            }
            if (specialistSecond) {
                specialistSecond.style.display = 'none';
                specialistSecond.style.visibility = 'hidden';
            }
            if (stepsBtn) {
                stepsBtn.style.display = 'none';
                stepsBtn.style.visibility = 'hidden';
            }
            console.log('👁️ Тексты сложной имплантации скрыты в service-menu7 (режим скрытия фото)');
        } else {
            if (specialistFirst) {
                specialistFirst.style.display = '';
                specialistFirst.style.visibility = '';
            }
            if (specialistSecond) {
                specialistSecond.style.display = '';
                specialistSecond.style.visibility = '';
            }
            if (stepsBtn) {
                stepsBtn.style.display = '';
                stepsBtn.style.visibility = '';
            }
            console.log('👁️ Тексты сложной имплантации восстановлены в service-menu7');
        }
    }
    
    function applyServiceMenu8Styles() {
        const isServiceMenu8Page = window.location.pathname.includes('service-menu8.html');
        if (!isServiceMenu8Page) return;
        
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        
        const alignersText = document.querySelector('.tomograph-text[data-translate="aligners_text_3"]');
        const visitTitleFirst = document.querySelector('strong[data-translate="visit_1"]');
        
        if (isPhotoHidden) {
            if (alignersText) {
                alignersText.style.display = 'none';
                alignersText.style.visibility = 'hidden';
            }
            if (visitTitleFirst) {
                visitTitleFirst.style.visibility = 'hidden';
            }
            console.log('👁️ Текст об элайнерах скрыт, "1-ое посещение" невидимо в service-menu8 (режим скрытия фото)');
        } else {
            if (alignersText) {
                alignersText.style.display = '';
                alignersText.style.visibility = '';
            }
            if (visitTitleFirst) {
                visitTitleFirst.style.visibility = '';
            }
            console.log('👁️ Текст об элайнерах и "1-ое посещение" восстановлены в service-menu8');
        }
    }
    
    function applyServiceMenu9Styles() {
        const isServiceMenu9Page = window.location.pathname.includes('service-menu9.html');
        if (!isServiceMenu9Page) return;
        
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        
        const veneersMaterials = document.querySelector('.tomograph-text.specialists-text-first');
        const veneersChoice = document.querySelector('.tomograph-text.specialists-text-second');
        const stepsTitle = document.querySelector('p.steps-title[data-translate="veneers_steps_title"]');
        
        if (isPhotoHidden) {
            if (veneersMaterials) {
                veneersMaterials.style.display = 'none';
                veneersMaterials.style.visibility = 'hidden';
            }
            if (veneersChoice) {
                veneersChoice.style.display = 'none';
                veneersChoice.style.visibility = 'hidden';
            }
            if (stepsTitle) {
                stepsTitle.style.display = 'none';
                stepsTitle.style.visibility = 'hidden';
            }
            console.log('👁️ Тексты о материалах виниров и заголовок этапов скрыты в service-menu9 (режим скрытия фото)');
        } else {
            if (veneersMaterials) {
                veneersMaterials.style.display = '';
                veneersMaterials.style.visibility = '';
            }
            if (veneersChoice) {
                veneersChoice.style.display = '';
                veneersChoice.style.visibility = '';
            }
            if (stepsTitle) {
                stepsTitle.style.display = '';
                stepsTitle.style.visibility = '';
            }
            console.log('👁️ Тексты о материалах виниров и заголовок этапов восстановлены в service-menu9');
        }
    }
    
    function applyIndexStyles() {
        const isIndexPage = window.location.pathname === '/' || 
                            window.location.pathname.includes('index.html') ||
                            window.location.pathname.endsWith('/') ||
                            window.location.pathname === '';
        if (!isIndexPage) return;
        
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        
        const heroSection = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero h1');
        const heroBtn = document.querySelector('.hero .btn-primary');
        const searchContainer = document.querySelector('.hero-search-container');
        const searchInput = document.querySelector('.hero-search-input');
        const clinicInfo = document.querySelector('.clinic-info');
        const advantages = document.querySelector('.advantages');
        const textBlocks = document.querySelectorAll('.text-block h2, .content-block p, .content-block ul, .content-block li');
        const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-outline');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        const footer = document.querySelector('.footer');
        
        if (isPhotoHidden) {
            const galleryImages = document.querySelectorAll('.image-gallery img, .image-gallery-alt img');
            galleryImages.forEach(img => {
                img.style.display = 'none';
                img.style.visibility = 'hidden';
            });
            
            const imgLeft = document.querySelector('.img-left');
            const imgRight = document.querySelector('.img-right');
            const imgBottomLeft = document.querySelector('.img-bottom-left');
            const imgBottomRight = document.querySelector('.img-bottom-right');
            
            if (imgLeft) {
                imgLeft.style.display = 'none';
                imgLeft.style.visibility = 'hidden';
                imgLeft.style.minHeight = '0';
                imgLeft.style.height = '0';
                imgLeft.style.margin = '0';
                imgLeft.style.padding = '0';
            }
            if (imgRight) {
                imgRight.style.display = 'none';
                imgRight.style.visibility = 'hidden';
                imgRight.style.minHeight = '0';
                imgRight.style.height = '0';
                imgRight.style.margin = '0';
                imgRight.style.padding = '0';
            }
            if (imgBottomLeft) {
                imgBottomLeft.style.display = 'none';
                imgBottomLeft.style.visibility = 'hidden';
                imgBottomLeft.style.minHeight = '0';
                imgBottomLeft.style.height = '0';
                imgBottomLeft.style.margin = '0';
                imgBottomLeft.style.padding = '0';
            }
            if (imgBottomRight) {
                imgBottomRight.style.display = 'none';
                imgBottomRight.style.visibility = 'hidden';
                imgBottomRight.style.minHeight = '0';
                imgBottomRight.style.height = '0';
                imgBottomRight.style.margin = '0';
                imgBottomRight.style.padding = '0';
            }
            
            if (heroSection) {
                heroSection.style.minHeight = '450px';
                heroSection.style.height = 'auto';
                heroSection.style.padding = '100px 0 60px 0';
                heroSection.style.marginBottom = '-40px';
            }
            
            if (heroContent) {
                heroContent.style.transform = 'translateY(0)';
                heroContent.style.marginTop = '0';
                heroContent.style.paddingTop = '0';
                heroContent.style.position = 'relative';
                heroContent.style.top = '0';
            }
            
            if (searchContainer) {
                searchContainer.style.marginTop = '40px';
                searchContainer.style.marginBottom = '30px';
                searchContainer.style.position = 'relative';
            }
            
            if (searchInput) {
                searchInput.style.padding = '14px 24px 14px 50px';
                searchInput.style.fontSize = '16px';
            }
            
            if (heroTitle) {
                heroTitle.style.fontSize = '38px';
                heroTitle.style.marginBottom = '25px';
            }
            
            if (heroBtn) {
                heroBtn.style.marginTop = '15px';
                heroBtn.style.marginBottom = '0';
                heroBtn.style.position = 'relative';
                heroBtn.style.top = '0';
            }
            
            if (clinicInfo) {
                clinicInfo.style.marginTop = '-20px';
                clinicInfo.style.padding = '30px 0';
            }
            
            if (advantages) {
                advantages.style.marginTop = '-10px';
                advantages.style.padding = '20px 0';
            }
            
            textBlocks.forEach(block => {
                block.style.marginBottom = '12px';
                block.style.padding = '0';
            });
            
            buttons.forEach(btn => {
                btn.style.marginTop = '8px';
                btn.style.marginBottom = '8px';
                btn.style.padding = '8px 18px';
            });
            
            const gridContainers = document.querySelectorAll('.grid-2');
            gridContainers.forEach(grid => {
                grid.style.gap = '15px';
                grid.style.padding = '15px 0';
            });
            
            if (footerPlaceholder) {
                footerPlaceholder.style.marginTop = '-40px';
                footerPlaceholder.style.position = 'relative';
            }
            
            if (footer) {
                footer.style.marginTop = '-5px';
                footer.style.padding = '25px 0 15px 0';
            }
            
            console.log('👁️ Стили для главной страницы применены (режим скрытия фото, поиск опущен)');
        } else {
            const galleryImages = document.querySelectorAll('.image-gallery img, .image-gallery-alt img');
            galleryImages.forEach(img => {
                img.style.display = '';
                img.style.visibility = '';
            });
            
            const imgLeft = document.querySelector('.img-left');
            const imgRight = document.querySelector('.img-right');
            const imgBottomLeft = document.querySelector('.img-bottom-left');
            const imgBottomRight = document.querySelector('.img-bottom-right');
            
            if (imgLeft) {
                imgLeft.style.display = '';
                imgLeft.style.visibility = '';
                imgLeft.style.minHeight = '';
                imgLeft.style.height = '';
                imgLeft.style.margin = '';
                imgLeft.style.padding = '';
            }
            if (imgRight) {
                imgRight.style.display = '';
                imgRight.style.visibility = '';
                imgRight.style.minHeight = '';
                imgRight.style.height = '';
                imgRight.style.margin = '';
                imgRight.style.padding = '';
            }
            if (imgBottomLeft) {
                imgBottomLeft.style.display = '';
                imgBottomLeft.style.visibility = '';
                imgBottomLeft.style.minHeight = '';
                imgBottomLeft.style.height = '';
                imgBottomLeft.style.margin = '';
                imgBottomLeft.style.padding = '';
            }
            if (imgBottomRight) {
                imgBottomRight.style.display = '';
                imgBottomRight.style.visibility = '';
                imgBottomRight.style.minHeight = '';
                imgBottomRight.style.height = '';
                imgBottomRight.style.margin = '';
                imgBottomRight.style.padding = '';
            }
            
            if (heroSection) {
                heroSection.style.minHeight = '';
                heroSection.style.height = '';
                heroSection.style.padding = '';
                heroSection.style.marginBottom = '';
            }
            
            if (heroContent) {
                heroContent.style.transform = '';
                heroContent.style.marginTop = '';
                heroContent.style.paddingTop = '';
                heroContent.style.position = '';
                heroContent.style.top = '';
            }
            
            if (searchContainer) {
                searchContainer.style.marginTop = '';
                searchContainer.style.marginBottom = '';
                searchContainer.style.position = '';
            }
            
            if (searchInput) {
                searchInput.style.padding = '';
                searchInput.style.fontSize = '';
            }
            
            if (heroTitle) {
                heroTitle.style.fontSize = '';
                heroTitle.style.marginBottom = '';
            }
            
            if (heroBtn) {
                heroBtn.style.marginTop = '';
                heroBtn.style.marginBottom = '';
                heroBtn.style.position = '';
                heroBtn.style.top = '';
            }
            
            if (clinicInfo) {
                clinicInfo.style.marginTop = '';
                clinicInfo.style.padding = '';
            }
            
            if (advantages) {
                advantages.style.marginTop = '';
                advantages.style.padding = '';
            }
            
            textBlocks.forEach(block => {
                block.style.marginBottom = '';
                block.style.padding = '';
            });
            
            buttons.forEach(btn => {
                btn.style.marginTop = '';
                btn.style.marginBottom = '';
                btn.style.padding = '';
            });
            
            const gridContainers = document.querySelectorAll('.grid-2');
            gridContainers.forEach(grid => {
                grid.style.gap = '';
                grid.style.padding = '';
            });
            
            if (footerPlaceholder) {
                footerPlaceholder.style.marginTop = '';
                footerPlaceholder.style.position = '';
            }
            
            if (footer) {
                footer.style.marginTop = '';
                footer.style.padding = '';
            }
            
            console.log('👁️ Стили для главной страницы восстановлены');
        }
    }
    
    function applyContactsStyles() {
        const isContactsPage = window.location.pathname.includes('contacts.html');
        if (!isContactsPage) return;
        
        const scheme = colorSchemes[currentSettings.colorScheme];
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        
        const heroSection = document.querySelector('.hero-contacts');
        const contactsInfoSection = document.querySelector('.contacts-info-section');
        const feedbackSection = document.querySelector('.feedback-section');
        const contactsTitle = document.querySelector('.contacts-details h2');
        const phones = document.querySelectorAll('.phones a');
        const address = document.querySelector('.address');
        const scheduleItems = document.querySelectorAll('.schedule');
        const emailLink = document.querySelector('.email');
        const socialImages = document.querySelectorAll('.social-icons img');
        const feedbackTitle = document.querySelector('.feedback-section .feedback-title h2');
        const feedbackInputs = document.querySelectorAll('.feedback-form input, .feedback-form textarea');
        const feedbackBtn = document.querySelector('.feedback-section .btn-submit');
        const contactsBtn = document.querySelector('.contacts-info-section .btn-outline');
        
        if (currentSettings.isActive && scheme) {
            if (heroSection) {
                heroSection.style.setProperty('background-color', scheme.bg, 'important');
                heroSection.style.setProperty('background-image', 'none', 'important');
            }
            
            if (contactsInfoSection) {
                contactsInfoSection.style.setProperty('background-color', scheme.bg, 'important');
            }
            
            if (feedbackSection) {
                feedbackSection.style.setProperty('background-color', scheme.bg, 'important');
            }
            
            if (contactsTitle) {
                contactsTitle.style.setProperty('color', scheme.text, 'important');
            }
            
            phones.forEach(phone => {
                phone.style.setProperty('color', scheme.text, 'important');
            });
            
            if (address) {
                address.style.setProperty('color', scheme.text, 'important');
            }
            
            scheduleItems.forEach(item => {
                item.style.setProperty('color', scheme.text, 'important');
            });
            
            if (emailLink) {
                emailLink.style.setProperty('color', scheme.link, 'important');
            }
            
            socialImages.forEach(img => {
                img.style.setProperty('filter', scheme.socialIconFilter, 'important');
            });
            
            if (feedbackTitle) {
                feedbackTitle.style.setProperty('color', scheme.text, 'important');
            }
            
            feedbackInputs.forEach(input => {
                input.style.setProperty('background-color', scheme.inputBg, 'important');
                input.style.setProperty('color', scheme.text, 'important');
                input.style.setProperty('border-bottom', `1px solid ${scheme.border}`, 'important');
            });
            
            if (feedbackBtn) {
                feedbackBtn.style.setProperty('background-color', scheme.buttonBg, 'important');
                feedbackBtn.style.setProperty('color', scheme.buttonText, 'important');
                feedbackBtn.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
            }
            
            if (contactsBtn) {
                contactsBtn.style.setProperty('background-color', scheme.buttonBg, 'important');
                contactsBtn.style.setProperty('color', scheme.buttonText, 'important');
                contactsBtn.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
            }
            
            const style = document.createElement('style');
            style.textContent = `
                .feedback-form input::placeholder,
                .feedback-form textarea::placeholder {
                    color: ${scheme.placeholder} !important;
                    opacity: 1 !important;
                }
            `;
            if (!document.querySelector('#contacts-placeholder-styles')) {
                style.id = 'contacts-placeholder-styles';
                document.head.appendChild(style);
            } else {
                document.querySelector('#contacts-placeholder-styles').textContent = style.textContent;
            }
            
            console.log('👁️ Стили для страницы контактов применены');
        } else {
            if (heroSection) {
                heroSection.style.removeProperty('background-color');
                heroSection.style.removeProperty('background-image');
            }
            if (contactsInfoSection) {
                contactsInfoSection.style.removeProperty('background-color');
            }
            if (feedbackSection) {
                feedbackSection.style.removeProperty('background-color');
            }
            if (contactsTitle) {
                contactsTitle.style.removeProperty('color');
            }
            phones.forEach(phone => {
                phone.style.removeProperty('color');
            });
            if (address) {
                address.style.removeProperty('color');
            }
            scheduleItems.forEach(item => {
                item.style.removeProperty('color');
            });
            if (emailLink) {
                emailLink.style.removeProperty('color');
            }
            socialImages.forEach(img => {
                img.style.removeProperty('filter');
            });
            if (feedbackTitle) {
                feedbackTitle.style.removeProperty('color');
            }
            feedbackInputs.forEach(input => {
                input.style.removeProperty('background-color');
                input.style.removeProperty('color');
                input.style.removeProperty('border-bottom');
            });
            if (feedbackBtn) {
                feedbackBtn.style.removeProperty('background-color');
                feedbackBtn.style.removeProperty('color');
                feedbackBtn.style.removeProperty('border');
            }
            if (contactsBtn) {
                contactsBtn.style.removeProperty('background-color');
                contactsBtn.style.removeProperty('color');
                contactsBtn.style.removeProperty('border');
            }
            const placeholderStyle = document.querySelector('#contacts-placeholder-styles');
            if (placeholderStyle) {
                placeholderStyle.remove();
            }
            
            console.log('👁️ Стили для страницы контактов восстановлены');
        }
        
        if (isPhotoHidden) {
            const mapImage = document.querySelector('.map-image-side img');
            if (mapImage) {
                mapImage.style.setProperty('display', 'none', 'important');
            }
        } else {
            const mapImage = document.querySelector('.map-image-side img');
            if (mapImage) {
                mapImage.style.removeProperty('display');
            }
        }
    }
    
    function ensureMoreButtonVisible() {
        const moreBtn = document.getElementById('moreBtn');
        if (moreBtn) {
            moreBtn.style.setProperty('display', 'inline-flex', 'important');
            moreBtn.style.setProperty('visibility', 'visible', 'important');
            moreBtn.style.setProperty('opacity', '1', 'important');
            moreBtn.style.setProperty('position', 'relative', 'important');
            moreBtn.style.setProperty('z-index', '100', 'important');
            moreBtn.style.setProperty('pointer-events', 'auto', 'important');
            
            const scheme = colorSchemes[currentSettings.colorScheme];
            if (scheme && currentSettings.isActive) {
                if (currentSettings.colorScheme === 'black-yellow' || currentSettings.colorScheme === 'blue-yellow') {
                    moreBtn.style.setProperty('background-color', '#FFFF00', 'important');
                    moreBtn.style.setProperty('color', '#000000', 'important');
                    moreBtn.style.setProperty('border', '2px solid #FFFF00', 'important');
                } else if (currentSettings.colorScheme === 'white-black') {
                    moreBtn.style.setProperty('background-color', '#000000', 'important');
                    moreBtn.style.setProperty('color', '#FFFFFF', 'important');
                    moreBtn.style.setProperty('border', '2px solid #000000', 'important');
                } else if (currentSettings.colorScheme === 'black-white') {
                    moreBtn.style.setProperty('background-color', '#FFFFFF', 'important');
                    moreBtn.style.setProperty('color', '#000000', 'important');
                    moreBtn.style.setProperty('border', '2px solid #FFFFFF', 'important');
                } else {
                    moreBtn.style.setProperty('background-color', scheme.buttonBg, 'important');
                    moreBtn.style.setProperty('color', scheme.buttonText, 'important');
                    moreBtn.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
                }
            }
            
            let parent = moreBtn.parentElement;
            while (parent && parent !== document.body) {
                const parentStyle = window.getComputedStyle(parent);
                if (parentStyle.display === 'none' || parentStyle.visibility === 'hidden') {
                    parent.style.setProperty('display', 'block', 'important');
                    parent.style.setProperty('visibility', 'visible', 'important');
                }
                parent = parent.parentElement;
            }
            
            console.log('✅ Кнопка "ПОДРОБНЕЕ" принудительно показана для темы:', currentSettings.colorScheme);
        }
    }
    
    function applyHeroTeamStylesImmediately() {
        const heroTeam = document.querySelector('.hero-team');
        if (!heroTeam) return;
        
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        
        if (currentSettings.isActive) {
            heroTeam.style.setProperty('padding-top', isPhotoHidden ? '140px' : '100px', 'important');
            heroTeam.style.setProperty('min-height', isPhotoHidden ? '320px' : '380px', 'important');
            heroTeam.style.setProperty('box-sizing', 'border-box', 'important');
            heroTeam.style.setProperty('display', 'flex', 'important');
            heroTeam.style.setProperty('align-items', 'center', 'important');
            heroTeam.style.setProperty('justify-content', 'center', 'important');
            
            const heroContent = heroTeam.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.setProperty('transform', 'translateY(0)', 'important');
                heroContent.style.setProperty('margin-top', '0', 'important');
                heroContent.style.setProperty('position', 'relative', 'important');
                heroContent.style.setProperty('top', '0', 'important');
            }
            
            const heroTitle = heroTeam.querySelector('h1');
            if (heroTitle) {
                heroTitle.style.setProperty('transform', 'none', 'important');
                heroTitle.style.setProperty('margin', '0 0 20px 0', 'important');
            }
            
            const heroBtn = heroTeam.querySelector('.btn-white');
            if (heroBtn) {
                heroBtn.style.setProperty('transform', 'none', 'important');
                heroBtn.style.setProperty('margin', '10px auto 0', 'important');
            }
        } else {
            heroTeam.style.removeProperty('padding-top');
            heroTeam.style.removeProperty('min-height');
            heroTeam.style.removeProperty('box-sizing');
            heroTeam.style.removeProperty('display');
            heroTeam.style.removeProperty('align-items');
            heroTeam.style.removeProperty('justify-content');
            
            const heroContent = heroTeam.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.removeProperty('transform');
                heroContent.style.removeProperty('margin-top');
                heroContent.style.removeProperty('position');
                heroContent.style.removeProperty('top');
            }
            
            const heroTitle = heroTeam.querySelector('h1');
            if (heroTitle) {
                heroTitle.style.removeProperty('transform');
                heroTitle.style.removeProperty('margin');
            }
            
            const heroBtn = heroTeam.querySelector('.btn-white');
            if (heroBtn) {
                heroBtn.style.removeProperty('transform');
                heroBtn.style.removeProperty('margin');
            }
        }
    }
    
    function applyReviewsStyles() {
        const isReviewsPage = window.location.pathname.includes('reviews.html');
        
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        const scheme = colorSchemes[currentSettings.colorScheme];
        
        const clinicIntro = document.querySelector('.clinic-intro');
        const reviewsList = document.querySelector('.reviews-list');
        const feedbackSimple = document.querySelector('.feedback-simple');
        const logoPlaceholders = document.querySelectorAll('.review-img.logo-placeholder, .review-img');
        const introTitle = document.querySelector('.intro-title h2');
        const introText = document.querySelectorAll('.intro-text p');
        const feedbackTitle = document.querySelector('.feedback-title h2');
        const feedbackInputs = document.querySelectorAll('.feedback-form-styled input, .feedback-form-styled textarea');
        const videoSlider = document.querySelector('.video-slider-section');
        
        if (currentSettings.isActive && scheme) {
            if (clinicIntro) {
                clinicIntro.style.setProperty('background-color', scheme.bg, 'important');
            }
            
            if (reviewsList) {
                reviewsList.style.setProperty('background-color', scheme.bg, 'important');
            }
            
            if (feedbackSimple) {
                feedbackSimple.style.setProperty('background-color', scheme.bg, 'important');
            }
            
            if (introTitle) {
                introTitle.style.setProperty('color', scheme.text, 'important');
            }
            
            introText.forEach(p => {
                p.style.setProperty('color', scheme.text, 'important');
            });
            
            if (feedbackTitle) {
                feedbackTitle.style.setProperty('color', scheme.text, 'important');
            }
            
            feedbackInputs.forEach(input => {
                input.style.setProperty('background-color', scheme.inputBg, 'important');
                input.style.setProperty('color', scheme.text, 'important');
                input.style.setProperty('border-bottom', `1px solid ${scheme.border}`, 'important');
            });
            
            const style = document.createElement('style');
            style.textContent = `
                .feedback-form-styled input::placeholder,
                .feedback-form-styled textarea::placeholder {
                    color: ${scheme.placeholder} !important;
                    opacity: 1 !important;
                }
            `;
            if (!document.querySelector('#reviews-placeholder-styles')) {
                style.id = 'reviews-placeholder-styles';
                document.head.appendChild(style);
            } else {
                document.querySelector('#reviews-placeholder-styles').textContent = style.textContent;
            }
        } else {
            if (clinicIntro) {
                clinicIntro.style.removeProperty('background-color');
            }
            if (reviewsList) {
                reviewsList.style.removeProperty('background-color');
            }
            if (feedbackSimple) {
                feedbackSimple.style.removeProperty('background-color');
            }
            if (introTitle) {
                introTitle.style.removeProperty('color');
            }
            introText.forEach(p => {
                p.style.removeProperty('color');
            });
            if (feedbackTitle) {
                feedbackTitle.style.removeProperty('color');
            }
            feedbackInputs.forEach(input => {
                input.style.removeProperty('background-color');
                input.style.removeProperty('color');
                input.style.removeProperty('border-bottom');
            });
            const placeholderStyle = document.querySelector('#reviews-placeholder-styles');
            if (placeholderStyle) {
                placeholderStyle.remove();
            }
        }
        
        if (isPhotoHidden) {
            logoPlaceholders.forEach(el => {
                el.style.setProperty('display', 'none', 'important');
            });
            if (videoSlider) {
                videoSlider.style.setProperty('display', 'none', 'important');
            }
        } else {
            logoPlaceholders.forEach(el => {
                el.style.removeProperty('display');
            });
            if (videoSlider) {
                videoSlider.style.removeProperty('display');
            }
        }
        
        const emailBtn = document.querySelector('.btn-email-link');
        if (emailBtn && currentSettings.isActive && scheme) {
            emailBtn.style.setProperty('background-color', scheme.buttonBg, 'important');
            emailBtn.style.setProperty('color', scheme.buttonText, 'important');
            emailBtn.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
        } else if (emailBtn && !currentSettings.isActive) {
            emailBtn.style.removeProperty('background-color');
            emailBtn.style.removeProperty('color');
            emailBtn.style.removeProperty('border');
        }
        
        console.log('👁️ Стили для страницы отзывов применены');
    }
    
    function applyPricesStyles() {
        const isPricesPage = window.location.pathname.includes('prices.html');
        if (!isPricesPage) return;
        
        if (!currentSettings.isActive) return;
        
        const sizes = fontSizeMap[currentSettings.fontSize];
        const adaptiveBaseSize = sizes ? sizes.base : '16px';
        const adaptiveH1Size = sizes ? sizes.h1 : '48px';
        const scheme = colorSchemes[currentSettings.colorScheme];
        
        const tables = document.querySelectorAll('.services-table');
        if (tables.length === 0) {
            setTimeout(applyPricesStyles, 100);
            return;
        }
        
        const pricesSection = document.querySelector('.prices-section');
        if (pricesSection && scheme) {
            pricesSection.style.setProperty('background-color', scheme.bg, 'important');
        }
        
        const container = document.querySelector('.prices-section .container');
        if (container && scheme) {
            container.style.setProperty('background-color', scheme.bg, 'important');
        }
        
        tables.forEach(table => {
            table.style.setProperty('width', '100%', 'important');
            table.style.setProperty('min-width', '900px', 'important');
            table.style.setProperty('table-layout', 'auto', 'important');
        });
        
        const thElements = document.querySelectorAll('.services-table th');
        thElements.forEach(th => {
            th.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 4px)`, 'important');
            th.style.setProperty('padding', '15px 20px', 'important');
            th.style.setProperty('font-weight', 'bold', 'important');
            th.style.setProperty('color', '#000000', 'important');
            th.style.setProperty('background-color', '#f3f4f6', 'important');
        });
        
        const tdElements = document.querySelectorAll('.services-table td');
        tdElements.forEach(td => {
            td.style.setProperty('font-size', adaptiveBaseSize, 'important');
            td.style.setProperty('padding', '12px 20px', 'important');
            td.style.setProperty('color', '#000000', 'important');
            td.style.setProperty('background-color', '#ffffff', 'important');
        });
        
        const serviceNames = document.querySelectorAll('.service-name');
        serviceNames.forEach(name => {
            name.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 2px)`, 'important');
            name.style.setProperty('font-weight', '600', 'important');
            name.style.setProperty('color', '#000000', 'important');
        });
        
        const servicePrices = document.querySelectorAll('.service-price');
        servicePrices.forEach(price => {
            price.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 2px)`, 'important');
            price.style.setProperty('font-weight', 'bold', 'important');
            price.style.setProperty('color', '#000000', 'important');
            
            const allSpans = price.querySelectorAll('span:not(.discount-badge)');
            allSpans.forEach(span => {
                if (!span.classList.contains('discount-badge')) {
                    span.style.setProperty('color', '#000000', 'important');
                }
            });
        });
        
        const categoryTitles = document.querySelectorAll('.category-title');
        categoryTitles.forEach(title => {
            title.style.setProperty('font-size', `calc(${adaptiveH1Size} * 0.6)`, 'important');
            title.style.setProperty('padding', '10px 0', 'important');
            if (scheme) {
                title.style.setProperty('color', scheme.buttonText, 'important');
            } else {
                title.style.setProperty('color', '#FFFFFF', 'important');
            }
        });
        
        const serviceUnits = document.querySelectorAll('.service-unit');
        serviceUnits.forEach(unit => {
            unit.style.setProperty('font-size', `calc(${adaptiveBaseSize} - 2px)`, 'important');
            unit.style.setProperty('line-height', '1.4', 'important');
            unit.style.setProperty('color', '#000000', 'important');
        });
        
        const discountedOldPrices = document.querySelectorAll('.service-price span[style*="text-decoration: line-through"]');
        discountedOldPrices.forEach(price => {
            price.style.setProperty('color', '#666666', 'important');
            const currencyIcon = price.querySelector('.currency-icon');
            if (currencyIcon) {
                currencyIcon.style.setProperty('color', '#666666', 'important');
            }
        });
        
        const discountedNewPrices = document.querySelectorAll('.service-price span[style*="color: #EF4444"]');
        discountedNewPrices.forEach(price => {
            price.style.setProperty('color', '#000000', 'important');
            const currencyIcon = price.querySelector('.currency-icon');
            if (currencyIcon) {
                currencyIcon.style.setProperty('color', '#000000', 'important');
            }
        });
        
        const discountBadges = document.querySelectorAll('.discount-badge');
        discountBadges.forEach(badge => {
            badge.style.setProperty('background', '#EF4444', 'important');
            badge.style.setProperty('color', '#FFFFFF', 'important');
        });
        
        const allCurrencyIcons = document.querySelectorAll('.currency-icon');
        allCurrencyIcons.forEach(icon => {
            icon.style.setProperty('font-family', 'nbrb', 'important');
            icon.style.setProperty('font-style', 'normal', 'important');
            icon.style.setProperty('font-weight', 'normal', 'important');
            icon.style.setProperty('font-variant', 'normal', 'important');
            icon.style.setProperty('text-transform', 'none', 'important');
            icon.style.setProperty('line-height', '1', 'important');
            icon.style.setProperty('display', 'inline-block', 'important');
            icon.style.setProperty('font-size', '1.3em', 'important');
            icon.style.setProperty('color', '#000000', 'important');
        });
        
        const filterLabels = document.querySelectorAll('.prices-filter .filter-group label');
        filterLabels.forEach(label => {
            if (scheme) {
                label.style.setProperty('color', scheme.text, 'important');
            }
        });
        
        const filterSelects = document.querySelectorAll('.category-select, .search-input');
        filterSelects.forEach(select => {
            if (scheme) {
                select.style.setProperty('background-color', scheme.inputBg, 'important');
                select.style.setProperty('color', scheme.text, 'important');
                select.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
            }
        });
        
        const searchInput = document.querySelector('.search-input');
        if (searchInput && scheme) {
            searchInput.style.setProperty('color', scheme.text, 'important');
        }
        
        const priceNotes = document.querySelectorAll('.prices-note p');
        priceNotes.forEach(note => {
            note.style.setProperty('color', '#000000', 'important');
        });
        
        const priceNoteLinks = document.querySelectorAll('.prices-note a');
        priceNoteLinks.forEach(link => {
            link.style.setProperty('color', '#000000', 'important');
        });
        
        const footer = document.querySelector('.footer');
        if (footer && scheme) {
            footer.style.setProperty('background-color', scheme.footerBg, 'important');
            footer.style.backgroundColor = scheme.footerBg;
        }
        
        const footerLinks = document.querySelectorAll('.footer-nav a');
        footerLinks.forEach(link => {
            if (scheme) {
                link.style.setProperty('color', scheme.footerText, 'important');
                link.style.color = scheme.footerText;
            }
        });
        
        const footerSocialIcons = document.querySelectorAll('.footer-socials img');
        footerSocialIcons.forEach(icon => {
            if (scheme) {
                icon.style.setProperty('filter', scheme.socialIconFilter, 'important');
            }
        });
        
        const footerLines = document.querySelectorAll('.footer-line');
        footerLines.forEach(line => {
            if (scheme) {
                line.style.setProperty('border-top-color', 'rgba(255, 255, 255, 0.2)', 'important');
            }
        });
        
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            tables.forEach(table => {
                table.style.setProperty('min-width', '700px', 'important');
            });
            thElements.forEach(th => {
                th.style.setProperty('padding', '10px 12px', 'important');
            });
            tdElements.forEach(td => {
                td.style.setProperty('padding', '8px 12px', 'important');
            });
        }
        
        if (screenWidth <= 576) {
            tables.forEach(table => {
                table.style.setProperty('min-width', '550px', 'important');
            });
            thElements.forEach(th => {
                th.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 2px)`, 'important');
                th.style.setProperty('padding', '8px 10px', 'important');
            });
            tdElements.forEach(td => {
                td.style.setProperty('font-size', `calc(${adaptiveBaseSize} - 2px)`, 'important');
                td.style.setProperty('padding', '6px 10px', 'important');
            });
        }
        
        console.log('🎨 Стили для прайс-листа применены (футер меняется, примечания чёрные)');
    }
    
    function resetPricesStyles() {
        const isPricesPage = window.location.pathname.includes('prices.html');
        if (!isPricesPage) return;
        
        const tables = document.querySelectorAll('.services-table');
        tables.forEach(table => {
            table.style.removeProperty('width');
            table.style.removeProperty('min-width');
            table.style.removeProperty('table-layout');
        });
        
        const thElements = document.querySelectorAll('.services-table th');
        thElements.forEach(th => {
            th.style.removeProperty('font-size');
            th.style.removeProperty('padding');
            th.style.removeProperty('font-weight');
        });
        
        const tdElements = document.querySelectorAll('.services-table td');
        tdElements.forEach(td => {
            td.style.removeProperty('font-size');
            td.style.removeProperty('padding');
        });
        
        const serviceNames = document.querySelectorAll('.service-name');
        serviceNames.forEach(name => {
            name.style.removeProperty('font-size');
            name.style.removeProperty('font-weight');
        });
        
        const servicePrices = document.querySelectorAll('.service-price');
        servicePrices.forEach(price => {
            price.style.removeProperty('font-size');
            price.style.removeProperty('font-weight');
        });
        
        const categoryTitles = document.querySelectorAll('.category-title');
        categoryTitles.forEach(title => {
            title.style.removeProperty('font-size');
            title.style.removeProperty('padding');
        });
        
        const serviceUnits = document.querySelectorAll('.service-unit');
        serviceUnits.forEach(unit => {
            unit.style.removeProperty('font-size');
            unit.style.removeProperty('line-height');
        });
    }
    
    function applyScheduleStyles() {
        const isSchedulePage = window.location.pathname.includes('schedule.html');
        if (!isSchedulePage) return;
        
        if (!currentSettings.isActive) return;
        
        const sizes = fontSizeMap[currentSettings.fontSize];
        const adaptiveBaseSize = sizes ? sizes.base : '16px';
        const scheme = colorSchemes[currentSettings.colorScheme];
        
        const pageTitle = document.querySelector('.hero-schedule h1');
        if (pageTitle) {
            pageTitle.style.setProperty('color', scheme.text, 'important');
        }
        
        const thElements = document.querySelectorAll('.schedule-table th');
        thElements.forEach(th => {
            th.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 4px)`, 'important');
            th.style.setProperty('padding', '15px 20px', 'important');
            th.style.setProperty('font-weight', 'bold', 'important');
            th.style.setProperty('background-color', scheme.bg === '#000000' ? '#1a1a1a' : (scheme.bg === '#FFFFFF' ? '#f0f0f0' : '#2a2a2a'), 'important');
            th.style.setProperty('color', scheme.text, 'important');
        });
        
        const tdElements = document.querySelectorAll('.schedule-table td');
        tdElements.forEach(td => {
            td.style.setProperty('font-size', adaptiveBaseSize, 'important');
            td.style.setProperty('padding', '12px 20px', 'important');
            td.style.setProperty('background-color', scheme.bg === '#000000' ? '#0a0a0a' : (scheme.bg === '#FFFFFF' ? '#fafafa' : '#1a1a1a'), 'important');
            td.style.setProperty('color', scheme.text, 'important');
        });
        
        const evenRows = document.querySelectorAll('.schedule-table tr:nth-child(even) td');
        evenRows.forEach(td => {
            td.style.setProperty('background-color', scheme.bg === '#000000' ? '#111111' : (scheme.bg === '#FFFFFF' ? '#f5f5f5' : '#222222'), 'important');
        });
        
        const dayNames = document.querySelectorAll('.day-name');
        dayNames.forEach(day => {
            day.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 2px)`, 'important');
            day.style.setProperty('font-weight', '600', 'important');
            day.style.setProperty('background-color', scheme.bg === '#000000' ? '#1a1a1a' : (scheme.bg === '#FFFFFF' ? '#e8e8e8' : '#252525'), 'important');
            day.style.setProperty('color', scheme.text, 'important');
            day.style.setProperty('padding', '8px 12px', 'important');
            day.style.setProperty('border-radius', '6px', 'important');
            day.style.setProperty('display', 'inline-block', 'important');
        });
        
        const workHours = document.querySelectorAll('.work-hours');
        workHours.forEach(hours => {
            hours.style.setProperty('font-size', adaptiveBaseSize, 'important');
            hours.style.setProperty('font-weight', '500', 'important');
        });
        
        const doctorNames = document.querySelectorAll('.doctor-info h3');
        doctorNames.forEach(name => {
            name.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 8px)`, 'important');
            name.style.setProperty('font-weight', 'bold', 'important');
            name.style.setProperty('color', scheme.text, 'important');
        });
        
        const specializations = document.querySelectorAll('.doctor-specialization');
        specializations.forEach(spec => {
            spec.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 2px)`, 'important');
            spec.style.setProperty('color', scheme.link, 'important');
        });
        
        const tables = document.querySelectorAll('.schedule-table');
        tables.forEach(table => {
            table.style.setProperty('width', '100%', 'important');
            table.style.setProperty('min-width', '700px', 'important');
            table.style.setProperty('table-layout', 'auto', 'important');
        });
        
        const noteTexts = document.querySelectorAll('.schedule-note p');
        noteTexts.forEach(note => {
            note.style.setProperty('color', '#000000', 'important');
        });
        
        const filterLabels = document.querySelectorAll('.filter-group label');
        filterLabels.forEach(label => {
            label.style.setProperty('color', '#000000', 'important');
            label.style.setProperty('font-weight', 'bold', 'important');
        });
        
        const selectElements = document.querySelectorAll('.doctor-select, .day-select');
        selectElements.forEach(select => {
            select.style.setProperty('background-color', '#FFFFFF', 'important');
            select.style.setProperty('color', '#000000', 'important');
            select.style.setProperty('border', '2px solid #000000', 'important');
        });
        
        const infoTexts = document.querySelectorAll('.schedule-info p');
        infoTexts.forEach(info => {
            info.style.setProperty('color', '#000000', 'important');
        });
        
        const infoLinks = document.querySelectorAll('.schedule-info a');
        infoLinks.forEach(link => {
            link.style.setProperty('color', '#0000FF', 'important');
        });
        
        if (currentSettings.colorScheme === 'black-white') {
            thElements.forEach(th => {
                th.style.setProperty('background-color', '#333333', 'important');
                th.style.setProperty('color', '#FFFFFF', 'important');
            });
            
            tdElements.forEach(td => {
                td.style.setProperty('background-color', '#1a1a1a', 'important');
                td.style.setProperty('color', '#FFFFFF', 'important');
            });
            
            evenRows.forEach(td => {
                td.style.setProperty('background-color', '#222222', 'important');
            });
            
            dayNames.forEach(day => {
                day.style.setProperty('background-color', '#333333', 'important');
                day.style.setProperty('color', '#FFFFFF', 'important');
            });
            
            workHours.forEach(hours => {
                hours.style.setProperty('color', '#000000', 'important');
                hours.style.setProperty('background-color', '#FFFFFF', 'important');
                hours.style.setProperty('padding', '4px 8px', 'important');
                hours.style.setProperty('border-radius', '8px', 'important');
                hours.style.setProperty('display', 'inline-block', 'important');
            });
            
            if (pageTitle) {
                pageTitle.style.setProperty('color', '#FFFFFF', 'important');
            }
        }
        
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            tables.forEach(table => {
                table.style.setProperty('min-width', '550px', 'important');
            });
            thElements.forEach(th => {
                th.style.setProperty('padding', '10px 12px', 'important');
                th.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 2px)`, 'important');
            });
            tdElements.forEach(td => {
                td.style.setProperty('padding', '8px 12px', 'important');
                td.style.setProperty('font-size', `calc(${adaptiveBaseSize} - 2px)`, 'important');
            });
            doctorNames.forEach(name => {
                name.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 4px)`, 'important');
            });
            dayNames.forEach(day => {
                day.style.setProperty('padding', '4px 8px', 'important');
            });
        }
        
        if (screenWidth <= 576) {
            tables.forEach(table => {
                table.style.setProperty('min-width', '450px', 'important');
            });
            thElements.forEach(th => {
                th.style.setProperty('padding', '6px 8px', 'important');
                th.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 1px)`, 'important');
            });
            tdElements.forEach(td => {
                td.style.setProperty('padding', '5px 8px', 'important');
                td.style.setProperty('font-size', `calc(${adaptiveBaseSize} - 4px)`, 'important');
            });
            dayNames.forEach(day => {
                day.style.setProperty('font-size', `calc(${adaptiveBaseSize} - 2px)`, 'important');
                day.style.setProperty('padding', '3px 6px', 'important');
            });
        }
    }
    
    function resetScheduleStyles() {
        const isSchedulePage = window.location.pathname.includes('schedule.html');
        if (!isSchedulePage) return;
        
        const thElements = document.querySelectorAll('.schedule-table th');
        thElements.forEach(th => {
            th.style.removeProperty('font-size');
            th.style.removeProperty('padding');
            th.style.removeProperty('font-weight');
            th.style.removeProperty('background-color');
            th.style.removeProperty('color');
        });
        
        const tdElements = document.querySelectorAll('.schedule-table td');
        tdElements.forEach(td => {
            td.style.removeProperty('font-size');
            td.style.removeProperty('padding');
            td.style.removeProperty('background-color');
            td.style.removeProperty('color');
        });
        
        const dayNames = document.querySelectorAll('.day-name');
        dayNames.forEach(day => {
            day.style.removeProperty('font-size');
            day.style.removeProperty('font-weight');
            day.style.removeProperty('background-color');
            day.style.removeProperty('color');
            day.style.removeProperty('padding');
            day.style.removeProperty('border-radius');
            day.style.removeProperty('display');
        });
        
        const workHours = document.querySelectorAll('.work-hours');
        workHours.forEach(hours => {
            hours.style.removeProperty('font-size');
            hours.style.removeProperty('font-weight');
            hours.style.removeProperty('color');
            hours.style.removeProperty('background-color');
            hours.style.removeProperty('padding');
            hours.style.removeProperty('border-radius');
            hours.style.removeProperty('display');
        });
        
        const doctorNames = document.querySelectorAll('.doctor-info h3');
        doctorNames.forEach(name => {
            name.style.removeProperty('font-size');
            name.style.removeProperty('font-weight');
            name.style.removeProperty('color');
        });
        
        const specializations = document.querySelectorAll('.doctor-specialization');
        specializations.forEach(spec => {
            spec.style.removeProperty('font-size');
            spec.style.removeProperty('color');
        });
        
        const tables = document.querySelectorAll('.schedule-table');
        tables.forEach(table => {
            table.style.removeProperty('width');
            table.style.removeProperty('min-width');
            table.style.removeProperty('table-layout');
        });
        
        const filterLabels = document.querySelectorAll('.filter-group label');
        filterLabels.forEach(label => {
            label.style.removeProperty('color');
            label.style.removeProperty('font-weight');
        });
        
        const selectElements = document.querySelectorAll('.doctor-select, .day-select');
        selectElements.forEach(select => {
            select.style.removeProperty('background-color');
            select.style.removeProperty('color');
            select.style.removeProperty('border');
        });
        
        const infoTexts = document.querySelectorAll('.schedule-info p');
        infoTexts.forEach(info => {
            info.style.removeProperty('color');
        });
        
        const noteTexts = document.querySelectorAll('.schedule-note p');
        noteTexts.forEach(note => {
            note.style.removeProperty('color');
        });
        
        const infoLinks = document.querySelectorAll('.schedule-info a');
        infoLinks.forEach(link => {
            link.style.removeProperty('color');
        });
        
        const pageTitle = document.querySelector('.hero-schedule h1');
        if (pageTitle) {
            pageTitle.style.removeProperty('color');
        }
    }
    
    function applyFaqStyles() {
        const isFaqPage = window.location.pathname.includes('faq.html');
        if (!isFaqPage) return;
        
        if (!currentSettings.isActive) return;
        
        const scheme = colorSchemes[currentSettings.colorScheme];
        const sizes = fontSizeMap[currentSettings.fontSize];
        const adaptiveBaseSize = sizes ? sizes.base : '16px';
        const adaptiveButtonSize = sizes ? sizes.button : '16px';
        
        if (!scheme) return;
        
        function applyStylesToFaq() {
            const faqSection = document.querySelector('.faq-section');
            if (faqSection) {
                faqSection.style.setProperty('background-color', scheme.bg, 'important');
            }
            
            const container = document.querySelector('.faq-section .container');
            if (container) {
                container.style.setProperty('background-color', scheme.bg, 'important');
            }
            
            const heroFaq = document.querySelector('.hero-faq');
            if (heroFaq && scheme) {
                heroFaq.style.setProperty('background-color', scheme.bg, 'important');
                heroFaq.style.setProperty('background-image', 'none', 'important');
            }
            
            const heroTitle = document.querySelector('.hero-faq h1');
            if (heroTitle) {
                if (currentSettings.colorScheme === 'black-white') {
                    heroTitle.style.setProperty('color', '#FFFFFF', 'important');
                } else if (currentSettings.colorScheme === 'white-black') {
                    heroTitle.style.setProperty('color', '#000000', 'important');
                } else {
                    heroTitle.style.setProperty('color', '#FFFFFF', 'important');
                }
            }
            
            const heroSubtitle = document.querySelector('.hero-faq p');
            if (heroSubtitle) {
                if (currentSettings.colorScheme === 'black-white') {
                    heroSubtitle.style.setProperty('color', '#FFFFFF', 'important');
                } else if (currentSettings.colorScheme === 'white-black') {
                    heroSubtitle.style.setProperty('color', '#000000', 'important');
                } else {
                    heroSubtitle.style.setProperty('color', 'rgba(255,255,255,0.9)', 'important');
                }
            }
            
            const categoryBtns = document.querySelectorAll('.faq-categories .category-btn');
            categoryBtns.forEach(btn => {
                btn.style.cssText = '';
                
                if (scheme.bg === '#000000' || scheme.bg === '#00008B' || scheme.bg === '#0a0e27') {
                    btn.style.setProperty('color', '#FFFFFF', 'important');
                    btn.style.setProperty('background-color', '#1a1a1a', 'important');
                } else if (scheme.bg === '#FFFFFF') {
                    btn.style.setProperty('color', '#000000', 'important');
                    btn.style.setProperty('background-color', '#e8e8e8', 'important');
                } else {
                    btn.style.setProperty('color', scheme.text, 'important');
                }
                btn.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
                btn.style.setProperty('font-size', adaptiveButtonSize, 'important');
                btn.style.setProperty('padding', '12px 24px', 'important');
                btn.style.setProperty('border-radius', '30px', 'important');
                btn.style.setProperty('display', 'inline-flex', 'important');
                btn.style.setProperty('align-items', 'center', 'important');
                btn.style.setProperty('justify-content', 'center', 'important');
                btn.style.setProperty('gap', '8px', 'important');
                btn.style.setProperty('cursor', 'pointer', 'important');
            });
            
            const activeBtn = document.querySelector('.faq-categories .category-btn.active');
            if (activeBtn) {
                activeBtn.style.setProperty('background-color', scheme.buttonBg, 'important');
                activeBtn.style.setProperty('color', scheme.buttonText, 'important');
                activeBtn.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
            }
            
            const searchInput = document.querySelector('.faq-search .search-input');
            if (searchInput) {
                searchInput.style.setProperty('background-color', scheme.inputBg, 'important');
                searchInput.style.setProperty('color', scheme.text, 'important');
                searchInput.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
                searchInput.style.setProperty('border-radius', '50px', 'important');
                searchInput.style.setProperty('padding', '14px 20px', 'important');
                searchInput.style.setProperty('width', '100%', 'important');
                searchInput.style.setProperty('max-width', '500px', 'important');
                searchInput.style.setProperty('display', 'block', 'important');
                searchInput.style.setProperty('margin', '0 auto', 'important');
            }
            
            if (searchInput && scheme) {
                const style = document.createElement('style');
                style.textContent = `
                    .faq-search .search-input::placeholder {
                        color: ${scheme.placeholder} !important;
                        opacity: 1 !important;
                    }
                `;
                if (!document.querySelector('#faq-placeholder-styles')) {
                    style.id = 'faq-placeholder-styles';
                    document.head.appendChild(style);
                } else {
                    document.querySelector('#faq-placeholder-styles').textContent = style.textContent;
                }
            }
            
            let styleTag = document.querySelector('#faq-text-styles');
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'faq-text-styles';
                document.head.appendChild(styleTag);
            }
            
            let textColor = '#FFFFFF';
            if (scheme.bg === '#FFFFFF') {
                textColor = '#000000';
            } else if (scheme.bg === '#000000') {
                textColor = '#FFFF00';
            } else if (scheme.bg === '#00008B') {
                textColor = '#FFFF00';
            } else if (scheme.bg === '#0a0e27') {
                textColor = '#e0e0e0';
            } else {
                textColor = scheme.text;
            }
            
            styleTag.textContent = `
                .faq-question h3 {
                    color: ${textColor} !important;
                    font-size: ${adaptiveBaseSize} !important;
                    font-weight: 600 !important;
                    line-height: 1.4 !important;
                }
                .faq-answer p {
                    color: #000000 !important;
                    font-size: ${adaptiveBaseSize} !important;
                    line-height: 1.5 !important;
                }
            `;
            
            const faqQuestions = document.querySelectorAll('.faq-question h3');
            faqQuestions.forEach(question => {
                question.style.setProperty('color', textColor, 'important');
                question.style.setProperty('font-size', `calc(${adaptiveBaseSize} + 2px)`, 'important');
                question.style.setProperty('font-weight', '600', 'important');
            });
            
            const faqAnswers = document.querySelectorAll('.faq-answer p');
            faqAnswers.forEach(answer => {
                answer.style.setProperty('color', '#000000', 'important');
                answer.style.setProperty('font-size', adaptiveBaseSize, 'important');
                answer.style.setProperty('line-height', '1.5', 'important');
            });
            
            const categoryBadges = document.querySelectorAll('.faq-category-badge');
            categoryBadges.forEach(badge => {
                badge.style.setProperty('background-color', scheme.buttonBg, 'important');
                badge.style.setProperty('color', scheme.buttonText, 'important');
                badge.style.setProperty('border', `1px solid ${scheme.border}`, 'important');
            });
            
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                if (scheme.bg === '#000000') {
                    item.style.setProperty('background-color', '#1a1a1a', 'important');
                } else if (scheme.bg === '#00008B') {
                    item.style.setProperty('background-color', '#0a0a3a', 'important');
                } else if (scheme.bg === '#0a0e27') {
                    item.style.setProperty('background-color', '#0d1230', 'important');
                } else if (scheme.bg === '#FFFFFF') {
                    item.style.setProperty('background-color', '#ffffff', 'important');
                } else {
                    item.style.setProperty('background-color', scheme.bg, 'important');
                }
            });
            
            const faqQuestionBlocks = document.querySelectorAll('.faq-question');
            faqQuestionBlocks.forEach(block => {
                if (scheme.bg === '#000000') {
                    block.style.setProperty('background-color', '#2a2a2a', 'important');
                } else if (scheme.bg === '#00008B') {
                    block.style.setProperty('background-color', '#15155a', 'important');
                } else if (scheme.bg === '#0a0e27') {
                    block.style.setProperty('background-color', '#151a3d', 'important');
                } else if (scheme.bg === '#FFFFFF') {
                    block.style.setProperty('background-color', '#f9fafb', 'important');
                } else {
                    block.style.setProperty('background-color', scheme.bg, 'important');
                }
                block.style.setProperty('cursor', 'pointer', 'important');
            });
            
            const faqAnswerBlocks = document.querySelectorAll('.faq-answer');
            faqAnswerBlocks.forEach(block => {
                if (scheme.bg === '#000000') {
                    block.style.setProperty('background-color', '#1a1a1a', 'important');
                } else if (scheme.bg === '#00008B') {
                    block.style.setProperty('background-color', '#0a0a3a', 'important');
                } else if (scheme.bg === '#0a0e27') {
                    block.style.setProperty('background-color', '#0d1230', 'important');
                } else if (scheme.bg === '#FFFFFF') {
                    block.style.setProperty('background-color', '#fafafa', 'important');
                } else {
                    block.style.setProperty('background-color', scheme.bg, 'important');
                }
                block.style.setProperty('border-top', `1px solid ${scheme.border}`, 'important');
            });
            
            const faqToggles = document.querySelectorAll('.faq-toggle');
            faqToggles.forEach(toggle => {
                if (scheme.bg === '#000000' || scheme.bg === '#00008B' || scheme.bg === '#0a0e27') {
                    toggle.style.setProperty('color', '#FFFFFF', 'important');
                } else {
                    toggle.style.setProperty('color', '#9CA3AF', 'important');
                }
            });
            
            const resetBtn = document.querySelector('.btn-reset-faq');
            if (resetBtn) {
                resetBtn.style.setProperty('background-color', scheme.buttonBg, 'important');
                resetBtn.style.setProperty('color', scheme.buttonText, 'important');
                resetBtn.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
            }
            
            console.log('👁️ Стили для страницы FAQ применены, цвет текста:', textColor);
        }
        
        applyStylesToFaq();
        
        const observer = new MutationObserver(function(mutations) {
            let needUpdate = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            if (node.matches && (node.matches('.faq-question h3') || node.querySelector('.faq-question h3'))) {
                                needUpdate = true;
                            }
                        }
                    });
                }
            });
            if (needUpdate) {
                applyStylesToFaq();
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        window._faqObserver = observer;
    }
    
    function resetFaqStyles() {
        const isFaqPage = window.location.pathname.includes('faq.html');
        
        const heroTitle = document.querySelector('.hero-faq h1');
        if (heroTitle) {
            heroTitle.style.removeProperty('color');
        }
        
        const heroSubtitle = document.querySelector('.hero-faq p');
        if (heroSubtitle) {
            heroSubtitle.style.removeProperty('color');
        }
        
        const categoryBtns = document.querySelectorAll('.faq-categories .category-btn');
        categoryBtns.forEach(btn => {
            btn.style.removeProperty('color');
            btn.style.removeProperty('background-color');
            btn.style.removeProperty('border');
            btn.style.removeProperty('font-size');
            btn.style.removeProperty('padding');
            btn.style.removeProperty('border-radius');
            btn.style.removeProperty('display');
            btn.style.removeProperty('align-items');
            btn.style.removeProperty('justify-content');
            btn.style.removeProperty('gap');
        });
        
        const faqQuestions = document.querySelectorAll('.faq-question h3');
        faqQuestions.forEach(question => {
            question.style.removeProperty('color');
            question.style.removeProperty('font-size');
            question.style.removeProperty('font-weight');
        });
        
        const faqAnswers = document.querySelectorAll('.faq-answer p');
        faqAnswers.forEach(answer => {
            answer.style.removeProperty('color');
            answer.style.removeProperty('font-size');
            answer.style.removeProperty('line-height');
        });
        
        const categoryBadges = document.querySelectorAll('.faq-category-badge');
        categoryBadges.forEach(badge => {
            badge.style.removeProperty('background-color');
            badge.style.removeProperty('color');
            badge.style.removeProperty('border');
        });
        
        const searchInput = document.querySelector('.faq-search .search-input');
        if (searchInput) {
            searchInput.style.removeProperty('background-color');
            searchInput.style.removeProperty('color');
            searchInput.style.removeProperty('border');
        }
    }
    
    function applyVisualTextsHiding() {
        const isPhotoHidden = currentSettings.hideImages && currentSettings.isActive;
        
        const visualTextSelectors = [
            '.specialists-text',
            '.team-text',
            '.specialists-line',
            '.specialists-text-block .safety-text',
            '.safety-text[data-translate="therapy_safety_text_1"]',
            '.safety-text[data-translate="therapy_safety_text_2"]',
            '.safety-text[data-translate="therapy_safety_text_3"]',
            '.tomograph-text.specialist-first',
            '.tomograph-text.specialist-second',
            '.specialists-text-block .steps-btn',
            '.tomograph-text[data-translate="aligners_text_3"]',
            '.tomograph-text.specialists-text-first',
            '.tomograph-text.specialists-text-second',
            '.specialists-text-block .steps-list li',
            '.visual-text',
            '.equipment-text'
        ];
        
        if (isPhotoHidden) {
            visualTextSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                });
            });
        } else {
            visualTextSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.display = '';
                    el.style.visibility = '';
                });
            });
        }
    }
    
    function loadSettings() {
        forceResetOnLoad();
        
        try {
            const saved = localStorage.getItem('special_version_settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.isActive === false) {
                    currentSettings = {
                        fontSize: 'normal',
                        colorScheme: 'black-yellow',
                        hideImages: false,
                        isActive: false
                    };
                    resetMoreButtonStyles();
                    resetLoginButtonAndTitleStyles();
                    localStorage.removeItem('special_version_settings');
                    localStorage.removeItem('specialVersion');
                    document.body.classList.remove('special-mode');
                    document.body.classList.remove('photo-hidden-mode');
                    return;
                }
                currentSettings = { ...currentSettings, ...parsed };
            }
        } catch(e) {}
        
        if (currentSettings.isActive) {
            document.body.classList.add('special-mode');
            if (currentSettings.hideImages) {
                document.body.classList.add('photo-hidden-mode');
            }
            localStorage.setItem('specialVersion', 'enabled');
            setTimeout(() => {
                applyLoginButtonAndTitleStyles();
            }, 100);
        } else {
            document.body.classList.remove('special-mode');
            document.body.classList.remove('photo-hidden-mode');
            localStorage.removeItem('specialVersion');
            resetLoginButtonAndTitleStyles();
            resetMoreButtonStyles();
        }
        
        if (currentSettings.isActive) {
            setTimeout(() => {
                applyStyles();
                applyHeroTeamStylesImmediately();
                applyReviewsStyles();
                applyPricesStyles();
                applyScheduleStyles();
                applyFaqStyles();
                applyServiceMenu2Styles();
                applyServiceMenu3Styles();
                applyServiceMenu4Styles();
                applyServiceMenu7Styles();
                applyServiceMenu8Styles();
                applyServiceMenu9Styles();
                applyIndexStyles();
                applyContactsStyles();
                applyVisualTextsHiding();
                ensureMoreButtonVisible();
                applyLoginButtonAndTitleStyles();
            }, 0);
        }
    }
    
    function saveSettings() {
        localStorage.setItem('special_version_settings', JSON.stringify({
            fontSize: currentSettings.fontSize,
            colorScheme: currentSettings.colorScheme,
            hideImages: currentSettings.hideImages,
            isActive: currentSettings.isActive
        }));
        if (currentSettings.isActive) {
            localStorage.setItem('specialVersion', 'enabled');
        } else {
            localStorage.removeItem('specialVersion');
        }
    }
    
    function resetAllInlineStyles() {
        const buttonSelectors = [
            'button', '.btn', '.btn-outline', '.btn-primary', '.btn-submit',
            '.btn-save', '.btn-cancel', '.btn-reset', '.btn-edit', '.btn-delete',
            '.btn-white', '.btn-white-caps', '.btn-more', '.btn-dark-outline',
            '.reviews-control-btn', '.show-more-btn',
            '.modal-submit-btn', '.signup-btn', '.login-btn', '.appointment-submit-btn',
            '.profile-edit-btn', '.profile-save-btn', '.profile-cancel-btn',
            '.profile-logout-btn', '.admin-panel-btn', '.back-to-site', '.logout-btn',
            '.nav-tab', '.btn-add', '.btn-export', '.btn-email-link',
            '#openAppointmentBtn', '#openAppointmentBtn1', '#openAppointmentBtn2',
            '#openAppointmentBtn3', '#openAppointmentBtn4', '#openAppointmentBtn5',
            '#openReviewModal', '#showMoreReviewsBtn',
            '#moreBtn', '.steps-btn', '.diagnost-btn', '.first-btn', '.last-step-btn',
            '.category-btn'
        ];
        
        const buttons = document.querySelectorAll(buttonSelectors.join(','));
        buttons.forEach(btn => {
            btn.removeAttribute('style');
            btn.removeAttribute('data-special-styled');
        });
        
        resetMoreButtonStyles();
        resetLoginButtonAndTitleStyles();
    }
    
    function applyStyles() {
        if (!currentSettings.isActive) return;
        
        const scheme = colorSchemes[currentSettings.colorScheme];
        const sizes = fontSizeMap[currentSettings.fontSize];
        
        if (!scheme || !sizes) return;
        
        let adaptiveBaseSize = sizes.base;
        let adaptiveH1Size = sizes.h1;
        let adaptiveButtonSize = sizes.button;
        
        const screenWidth = window.innerWidth;
        if (screenWidth <= 660) {
            adaptiveBaseSize = parseInt(sizes.base) * 0.85 + 'px';
            adaptiveH1Size = parseInt(sizes.h1) * 0.7 + 'px';
            adaptiveButtonSize = parseInt(sizes.button) * 0.85 + 'px';
        }
        if (screenWidth <= 480) {
            adaptiveBaseSize = parseInt(sizes.base) * 0.75 + 'px';
            adaptiveH1Size = parseInt(sizes.h1) * 0.6 + 'px';
            adaptiveButtonSize = parseInt(sizes.button) * 0.8 + 'px';
        }
        
        let css = `
            body.special-mode {
                background-color: ${scheme.bg} !important;
            }
            
            body.special-mode .diagnostics-wrapper,
            body.special-mode .white-bg-section {
                background-color: ${scheme.bg} !important;
            }
            
            body.special-mode .diagnostics-wrapper .container,
            body.special-mode .white-bg-section .container {
                background-color: transparent !important;
            }
            
            body.special-mode .container {
                background-color: ${scheme.bg} !important;
            }
            
            body.special-mode p:not(.special-panel p),
            body.special-mode span:not(.special-panel span),
            body.special-mode li:not(.special-panel li),
            body.special-mode h1:not(.special-panel h1),
            body.special-mode h2:not(.special-panel h2),
            body.special-mode h3:not(.special-panel h3),
            body.special-mode h4:not(.special-panel h4),
            body.special-mode [data-translate]:not(.special-panel [data-translate]) {
                color: ${scheme.text} !important;
                font-size: ${adaptiveBaseSize} !important;
                line-height: 1.5 !important;
            }
            
            body.special-mode h1:not(.special-panel h1),
            body.special-mode .hero-content h1:not(.special-panel .hero-content h1) {
                font-size: ${adaptiveH1Size} !important;
                color: ${scheme.text} !important;
            }
            
            body.special-mode a:not(.special-panel a):not(.special-button):not(.social-icons a):not(.footer-socials a):not(.menu-list a) {
                color: ${scheme.link} !important;
                text-decoration: underline !important;
            }
            
            body.special-mode button:not(.special-panel button):not(.special-btn),
            body.special-mode .btn:not(.special-panel .btn):not(.special-btn),
            body.special-mode .btn-outline:not(.special-panel .btn-outline),
            body.special-mode .btn-primary:not(.special-panel .btn-primary),
            body.special-mode .btn-submit:not(.special-panel .btn-submit),
            body.special-mode .btn-save:not(.special-panel .btn-save),
            body.special-mode .btn-cancel:not(.special-panel .btn-cancel),
            body.special-mode .btn-reset:not(.special-panel .btn-reset),
            body.special-mode .btn-edit:not(.special-panel .btn-edit),
            body.special-mode .btn-delete:not(.special-panel .btn-delete),
            body.special-mode .btn-white:not(.special-panel .btn-white),
            body.special-mode .btn-white-caps:not(.special-panel .btn-white-caps),
            body.special-mode .btn-more:not(.special-panel .btn-more),
            body.special-mode .reviews-control-btn:not(.special-panel .reviews-control-btn),
            body.special-mode .modal-submit-btn:not(.special-panel .modal-submit-btn),
            body.special-mode .signup-btn:not(.special-panel .signup-btn),
            body.special-mode .login-btn:not(.special-panel .login-btn),
            body.special-mode .appointment-submit-btn:not(.special-panel .appointment-submit-btn),
            body.special-mode .profile-edit-btn:not(.special-panel .profile-edit-btn),
            body.special-mode .profile-save-btn:not(.special-panel .profile-save-btn),
            body.special-mode .profile-cancel-btn:not(.special-panel .profile-cancel-btn),
            body.special-mode .profile-logout-btn:not(.special-panel .profile-logout-btn),
            body.special-mode .admin-panel-btn:not(.special-panel .admin-panel-btn),
            body.special-mode .back-to-site:not(.special-panel .back-to-site),
            body.special-mode .btn-add:not(.special-panel .btn-add),
            body.special-mode .btn-export:not(.special-panel .btn-export),
            body.special-mode .btn-email-link:not(.special-panel .btn-email-link),
            body.special-mode .steps-btn:not(.special-panel .steps-btn),
            body.special-mode .diagnost-btn:not(.special-panel .diagnost-btn),
            body.special-mode .first-btn:not(.special-panel .first-btn),
            body.special-mode .last-step-btn:not(.special-panel .last-step-btn),
            body.special-mode .category-btn:not(.special-panel .category-btn),
            body.special-mode #openAppointmentBtn,
            body.special-mode #openAppointmentBtn2,
            body.special-mode #openAppointmentBtn3,
            body.special-mode #openReviewModal {
                background-color: ${scheme.buttonBg} !important;
                color: ${scheme.buttonText} !important;
                border: 2px solid ${scheme.border} !important;
                font-size: ${adaptiveButtonSize} !important;
                padding: 12px 24px !important;
                border-radius: 30px !important;
                cursor: pointer !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
            }
            
            body.special-mode[data-special-scheme="black-yellow"] .btn-more,
            body.special-mode[data-special-scheme="blue-yellow"] .btn-more {
                background-color: #FFFF00 !important;
                color: #000000 !important;
                border: 2px solid #FFFF00 !important;
            }
            
            body.special-mode[data-special-scheme="white-black"] .btn-more {
                background-color: #000000 !important;
                color: #FFFFFF !important;
                border: 2px solid #000000 !important;
            }
            
            body.special-mode[data-special-scheme="black-white"] .btn-more {
                background-color: #FFFFFF !important;
                color: #000000 !important;
                border: 2px solid #FFFFFF !important;
            }
            
            body.special-mode[data-special-scheme="dark-blue-light"] .btn-more {
                background-color: #1d2438 !important;
                color: #e0e0e0 !important;
                border: 2px solid #4a6fa5 !important;
            }
            
            body.special-mode .btn-more {
                display: inline-flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: relative !important;
                z-index: 100 !important;
                pointer-events: auto !important;
                min-width: 200px !important;
                white-space: nowrap !important;
            }
            
            body.special-mode .btn-more:hover {
                transform: scale(1.05) !important;
                filter: brightness(1.1) !important;
            }
            
            body.special-mode input:not(.special-panel input),
            body.special-mode textarea:not(.special-panel textarea),
            body.special-mode select:not(.special-panel select) {
                background-color: ${scheme.inputBg} !important;
                color: ${scheme.text} !important;
                border: 2px solid ${scheme.border} !important;
                font-size: ${adaptiveBaseSize} !important;
                padding: 10px !important;
                border-radius: 8px !important;
            }
            
            body.special-mode .footer,
            body.special-mode .footer * {
                background-color: ${scheme.footerBg} !important;
                color: ${scheme.footerText} !important;
            }
            
            body.special-mode .burger-icon span {
                background-color: ${scheme.headerText === '#FFFF00' ? '#FFFF00' : '#FFFFFF'} !important;
            }
            
            body.special-mode .scroll-down {
                display: none !important;
            }
            
            body.special-mode .hero-search-container {
                position: relative;
                z-index: 5;
                margin-top: 20px;
                margin-bottom: 30px;
            }
            
            body.special-mode .hero-search-input {
                background-color: ${scheme.inputBg} !important;
                color: ${scheme.text} !important;
                border: 2px solid ${scheme.border} !important;
            }
            
            body.special-mode .hero-search-input::placeholder {
                color: ${scheme.placeholder} !important;
            }
            
            body.special-mode .faq-question h3 {
                color: #000000 !important;
                font-size: calc(${adaptiveBaseSize} + 2px) !important;
                font-weight: 600 !important;
            }
            
            body.special-mode .faq-answer p {
                color: #000000 !important;
                font-size: ${adaptiveBaseSize} !important;
                line-height: 1.5 !important;
            }
            
            body.special-mode .faq-search .search-input {
                background-color: ${scheme.inputBg} !important;
                color: ${scheme.text} !important;
                border: 2px solid ${scheme.border} !important;
            }
            
            body.special-mode .faq-category-badge {
                background-color: ${scheme.buttonBg} !important;
                color: ${scheme.buttonText} !important;
                border: 1px solid ${scheme.border} !important;
            }
            
            body.special-mode .hero-faq h1 {
                color: #FFFFFF !important;
            }
            
            body.special-mode .hero-faq p {
                color: rgba(255,255,255,0.9) !important;
            }
            
            body.special-mode[data-special-scheme="black-white"] .hero-faq h1 {
                color: #FFFFFF !important;
            }
            
            body.special-mode[data-special-scheme="black-white"] .hero-faq p {
                color: #FFFFFF !important;
            }
            
            body.special-mode[data-special-scheme="white-black"] .hero-faq h1 {
                color: #000000 !important;
            }
            
            body.special-mode[data-special-scheme="white-black"] .hero-faq p {
                color: #000000 !important;
            }
            
            body.special-mode .hero-team {
                min-height: 380px !important;
                height: auto !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding-top: 100px !important;
                box-sizing: border-box !important;
            }
            
            body.special-mode .hero-team .hero-content {
                transform: translateY(0) !important;
                margin-top: 0 !important;
                position: relative !important;
                top: 0 !important;
            }
            
            body.special-mode .hero-team h1 {
                transform: none !important;
                margin: 0 0 20px 0 !important;
            }
            
            body.special-mode .hero-team .btn-white {
                transform: none !important;
                margin: 10px auto 0 !important;
            }
            
            body.special-mode.photo-hidden-mode .hero-team {
                padding-top: 140px !important;
                min-height: 320px !important;
            }
            
            body.special-mode.photo-hidden-mode .review-card .review-img,
            body.special-mode.photo-hidden-mode .review-img.logo-placeholder {
                display: none !important;
            }
            
            body.special-mode.photo-hidden-mode .video-slider-section {
                display: none !important;
            }
            
            body.special-mode .btn-email-link {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-align: center !important;
                white-space: normal !important;
                word-break: break-word !important;
                padding: 10px 20px !important;
            }
            
            body.special-mode .services-table {
                width: 100% !important;
                min-width: 900px !important;
                table-layout: auto !important;
            }
            
            body.special-mode .services-table th {
                font-size: calc(${adaptiveBaseSize} + 4px) !important;
                padding: 15px 20px !important;
                font-weight: bold !important;
            }
            
            body.special-mode .services-table td {
                font-size: ${adaptiveBaseSize} !important;
                padding: 12px 20px !important;
            }
            
            body.special-mode .service-name {
                font-size: calc(${adaptiveBaseSize} + 2px) !important;
                font-weight: 600 !important;
            }
            
            body.special-mode .service-price {
                font-size: calc(${adaptiveBaseSize} + 2px) !important;
                font-weight: bold !important;
            }
            
            body.special-mode .category-title {
                font-size: calc(${adaptiveH1Size} * 0.6) !important;
                padding: 10px 0 !important;
            }
            
            body.special-mode .service-unit {
                font-size: calc(${adaptiveBaseSize} - 2px) !important;
                line-height: 1.4 !important;
            }
            
            body.special-mode .schedule-table {
                width: 100% !important;
                min-width: 700px !important;
                table-layout: auto !important;
            }
            
            body.special-mode .schedule-table th {
                font-size: calc(${adaptiveBaseSize} + 4px) !important;
                padding: 15px 20px !important;
                font-weight: bold !important;
                background-color: ${scheme.bg === '#000000' ? '#1a1a1a' : (scheme.bg === '#FFFFFF' ? '#f0f0f0' : '#2a2a2a')} !important;
                color: ${scheme.text} !important;
            }
            
            body.special-mode .schedule-table td {
                font-size: ${adaptiveBaseSize} !important;
                padding: 12px 20px !important;
                background-color: ${scheme.bg === '#000000' ? '#0a0a0a' : (scheme.bg === '#FFFFFF' ? '#fafafa' : '#1a1a1a')} !important;
                color: ${scheme.text} !important;
            }
            
            body.special-mode .schedule-table tr:nth-child(even) td {
                background-color: ${scheme.bg === '#000000' ? '#111111' : (scheme.bg === '#FFFFFF' ? '#f5f5f5' : '#222222')} !important;
            }
            
            body.special-mode .day-name {
                font-size: calc(${adaptiveBaseSize} + 2px) !important;
                font-weight: 600 !important;
                background-color: ${scheme.bg === '#000000' ? '#1a1a1a' : (scheme.bg === '#FFFFFF' ? '#e8e8e8' : '#252525')} !important;
                color: ${scheme.text} !important;
                padding: 8px 12px !important;
                border-radius: 6px !important;
                display: inline-block !important;
            }
            
            body.special-mode .work-hours {
                font-size: ${adaptiveBaseSize} !important;
                font-weight: 500 !important;
            }
            
            body.special-mode .doctor-info h3 {
                font-size: calc(${adaptiveBaseSize} + 8px) !important;
                font-weight: bold !important;
                color: ${scheme.text} !important;
            }
            
            body.special-mode .doctor-specialization {
                font-size: calc(${adaptiveBaseSize} + 2px) !important;
                color: ${scheme.link} !important;
            }
            
            body.special-mode .schedule-note p {
                color: #000000 !important;
            }
            
            body.special-mode .filter-group label {
                color: #000000 !important;
                font-weight: bold !important;
            }
            
            body.special-mode .doctor-select,
            body.special-mode .day-select {
                background-color: #FFFFFF !important;
                color: #000000 !important;
                border: 2px solid #000000 !important;
            }
            
            body.special-mode .schedule-info p {
                color: #000000 !important;
            }
            
            body.special-mode .schedule-info a {
                color: #0000FF !important;
            }
            
            body.special-mode[data-special-scheme="black-white"] .schedule-table th {
                background-color: #333333 !important;
                color: #FFFFFF !important;
            }
            
            body.special-mode[data-special-scheme="black-white"] .schedule-table td {
                background-color: #1a1a1a !important;
                color: #FFFFFF !important;
            }
            
            body.special-mode[data-special-scheme="black-white"] .schedule-table tr:nth-child(even) td {
                background-color: #222222 !important;
            }
            
            body.special-mode[data-special-scheme="black-white"] .day-name {
                background-color: #333333 !important;
                color: #FFFFFF !important;
            }
            
            body.special-mode[data-special-scheme="black-white"] .work-hours {
                color: #000000 !important;
                background-color: #FFFFFF !important;
                padding: 4px 8px !important;
                border-radius: 8px !important;
                display: inline-block !important;
            }
            
            body.special-mode[data-special-scheme="black-white"] .hero-schedule h1 {
                color: #FFFFFF !important;
            }
            
            body.special-mode.photo-hidden-mode .specialists-text,
            body.special-mode.photo-hidden-mode .team-text,
            body.special-mode.photo-hidden-mode .specialists-line,
            body.special-mode.photo-hidden-mode .specialists-text-block .safety-text,
            body.special-mode.photo-hidden-mode .safety-text[data-translate="therapy_safety_text_1"],
            body.special-mode.photo-hidden-mode .safety-text[data-translate="therapy_safety_text_2"],
            body.special-mode.photo-hidden-mode .safety-text[data-translate="therapy_safety_text_3"],
            body.special-mode.photo-hidden-mode .tomograph-text.specialist-first,
            body.special-mode.photo-hidden-mode .tomograph-text.specialist-second,
            body.special-mode.photo-hidden-mode .specialists-text-block .steps-btn,
            body.special-mode.photo-hidden-mode .tomograph-text[data-translate="aligners_text_3"],
            body.special-mode.photo-hidden-mode .tomograph-text.specialists-text-first,
            body.special-mode.photo-hidden-mode .tomograph-text.specialists-text-second,
            body.special-mode.photo-hidden-mode .specialists-text-block .steps-list li {
                display: none !important;
                visibility: hidden !important;
            }
            
            body.special-mode .login-link,
            body.special-mode #desktopLoginLink {
                margin-top: 6px !important;
                display: inline-block !important;
                position: relative !important;
                top: 4px !important;
            }
            
            body.special-mode #serviceTitle {
                font-size: 48px !important;
                font-weight: bold !important;
                margin-bottom: 30px !important;
                line-height: 1.3 !important;
            }
            
            @media (max-width: 992px) {
                body.special-mode .hero-team {
                    padding-top: 80px !important;
                    min-height: 320px !important;
                }
                body.special-mode.photo-hidden-mode .hero-team {
                    padding-top: 110px !important;
                }
                body.special-mode .hero-team h1 {
                    font-size: 38px !important;
                }
                body.special-mode .btn-more {
                    min-width: 180px !important;
                    padding: 12px 40px !important;
                    font-size: 14px !important;
                }
                body.special-mode #serviceTitle {
                    font-size: 40px !important;
                }
            }
            
            @media (max-width: 768px) {
                body.special-mode .hero-team {
                    padding-top: 70px !important;
                    min-height: 280px !important;
                }
                body.special-mode .hero-team h1 {
                    font-size: 32px !important;
                }
                body.special-mode.photo-hidden-mode .hero-team {
                    padding-top: 100px !important;
                }
                body.special-mode .schedule-table {
                    min-width: 550px !important;
                }
                body.special-mode .schedule-table th {
                    padding: 10px 12px !important;
                    font-size: calc(${adaptiveBaseSize} + 2px) !important;
                }
                body.special-mode .schedule-table td {
                    padding: 8px 12px !important;
                    font-size: calc(${adaptiveBaseSize} - 2px) !important;
                }
                body.special-mode .doctor-info h3 {
                    font-size: calc(${adaptiveBaseSize} + 4px) !important;
                }
                body.special-mode .day-name {
                    padding: 4px 8px !important;
                }
                body.special-mode .btn-more {
                    min-width: 160px !important;
                    padding: 10px 30px !important;
                    font-size: 12px !important;
                }
                body.special-mode .login-link,
                body.special-mode #desktopLoginLink {
                    margin-top: 4px !important;
                    top: 2px !important;
                }
                body.special-mode #serviceTitle {
                    font-size: 32px !important;
                    margin-bottom: 20px !important;
                }
            }
            
            @media (max-width: 576px) {
                body.special-mode .hero-team {
                    padding-top: 60px !important;
                    min-height: 250px !important;
                }
                body.special-mode .hero-team h1 {
                    font-size: 28px !important;
                }
                body.special-mode.photo-hidden-mode .hero-team {
                    padding-top: 90px !important;
                }
                body.special-mode .schedule-table {
                    min-width: 450px !important;
                }
                body.special-mode .schedule-table th {
                    padding: 6px 8px !important;
                    font-size: calc(${adaptiveBaseSize} + 1px) !important;
                }
                body.special-mode .schedule-table td {
                    padding: 5px 8px !important;
                    font-size: calc(${adaptiveBaseSize} - 4px) !important;
                }
                body.special-mode .day-name {
                    font-size: calc(${adaptiveBaseSize} - 2px) !important;
                    padding: 3px 6px !important;
                }
                body.special-mode .btn-more {
                    min-width: 140px !important;
                    padding: 8px 20px !important;
                    font-size: 11px !important;
                    white-space: nowrap !important;
                }
                body.special-mode .login-link,
                body.special-mode #desktopLoginLink {
                    margin-top: 3px !important;
                    top: 1px !important;
                }
                body.special-mode #serviceTitle {
                    font-size: 28px !important;
                    margin-bottom: 15px !important;
                }
            }
            
            @media (max-width: 380px) {
                body.special-mode .btn-more {
                    min-width: 120px !important;
                    padding: 6px 15px !important;
                    font-size: 10px !important;
                }
                body.special-mode #serviceTitle {
                    font-size: 24px !important;
                }
            }
        `;
        
        if (currentSettings.hideImages === true) {
            css += `
                body.special-mode.photo-hidden-mode .hero,
                body.special-mode.photo-hidden-mode .hero-diagnostics,
                body.special-mode.photo-hidden-mode .hero-prices,
                body.special-mode.photo-hidden-mode .hero-contacts,
                body.special-mode.photo-hidden-mode .hero-team,
                body.special-mode.photo-hidden-mode .hero-faq,
                body.special-mode.photo-hidden-mode .hero-reviews,
                body.special-mode.photo-hidden-mode .hero-schedule {
                    background-image: none !important;
                    background-color: ${scheme.bg} !important;
                }
                
                body.special-mode.photo-hidden-mode img:not(.special-panel img):not(.special-button img):not(.burger-icon img):not(.color-option img):not(.social-icons img):not(.footer-socials img):not(.mobile-menu-logo):not(.logo img):not(.footer-logo img) {
                    display: none !important;
                }
                
                body.special-mode.photo-hidden-mode .team-item .team-image {
                    display: none !important;
                }
                
                body.special-mode.photo-hidden-mode .team-item {
                    min-height: 0 !important;
                    height: auto !important;
                    margin: 10px 0 !important;
                    padding: 10px !important;
                }
            `;
        }
        
        document.body.setAttribute('data-special-scheme', currentSettings.colorScheme);
        document.body.setAttribute('data-special-font', currentSettings.fontSize);
        
        if (styleElement) {
            styleElement.remove();
        }
        
        styleElement = document.createElement('style');
        styleElement.id = 'special-mode-styles';
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
        
        applyHeroTeamStylesImmediately();
        applyReviewsStyles();
        applyPricesStyles();
        applyScheduleStyles();
        applyFaqStyles();
        applyServiceMenu2Styles();
        applyServiceMenu3Styles();
        applyServiceMenu4Styles();
        applyServiceMenu7Styles();
        applyServiceMenu8Styles();
        applyServiceMenu9Styles();
        applyIndexStyles();
        applyContactsStyles();
        applyVisualTextsHiding();
        ensureMoreButtonVisible();
        updatePanelActiveState();
        forceUpdateAllButtons();
        applyLoginButtonAndTitleStyles();
    }
    
    function forceUpdateAllButtons() {
        setTimeout(function() {
            const scheme = colorSchemes[currentSettings.colorScheme];
            if (!scheme) return;
            
            const buttonSelectors = [
                'button:not(.special-panel button):not(.special-btn)',
                '.btn:not(.special-panel .btn):not(.special-btn)',
                '.btn-outline:not(.special-panel .btn-outline)',
                '#moreBtn',
                '.btn-more',
                '#openReviewModal',
                '#showMoreReviewsBtn',
                '#openAppointmentBtn', '#openAppointmentBtn1', '#openAppointmentBtn2', '#openAppointmentBtn3',
                '.steps-btn:not(.special-panel .steps-btn)',
                '.diagnost-btn:not(.special-panel .diagnost-btn)',
                '.btn-white:not(.special-panel .btn-white)',
                '.category-btn:not(.special-panel .category-btn)'
            ];
            
            const buttons = document.querySelectorAll(buttonSelectors.join(','));
            buttons.forEach(btn => {
                if (btn && !btn.closest('.special-panel')) {
                    btn.style.cssText = '';
                    btn.style.backgroundColor = scheme.buttonBg;
                    btn.style.color = scheme.buttonText;
                    btn.style.border = `2px solid ${scheme.border}`;
                    btn.style.display = 'inline-flex';
                    btn.style.alignItems = 'center';
                    btn.style.justifyContent = 'center';
                    btn.style.borderRadius = '30px';
                    btn.style.padding = '12px 24px';
                    btn.setAttribute('data-special-styled', 'true');
                }
            });
            
            const moreBtn = document.getElementById('moreBtn');
            if (moreBtn) {
                if (currentSettings.colorScheme === 'black-yellow' || currentSettings.colorScheme === 'blue-yellow') {
                    moreBtn.style.setProperty('background-color', '#FFFF00', 'important');
                    moreBtn.style.setProperty('color', '#000000', 'important');
                    moreBtn.style.setProperty('border', '2px solid #FFFF00', 'important');
                } else if (currentSettings.colorScheme === 'white-black') {
                    moreBtn.style.setProperty('background-color', '#000000', 'important');
                    moreBtn.style.setProperty('color', '#FFFFFF', 'important');
                    moreBtn.style.setProperty('border', '2px solid #000000', 'important');
                } else if (currentSettings.colorScheme === 'black-white') {
                    moreBtn.style.setProperty('background-color', '#FFFFFF', 'important');
                    moreBtn.style.setProperty('color', '#000000', 'important');
                    moreBtn.style.setProperty('border', '2px solid #FFFFFF', 'important');
                } else {
                    moreBtn.style.setProperty('background-color', scheme.buttonBg, 'important');
                    moreBtn.style.setProperty('color', scheme.buttonText, 'important');
                    moreBtn.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
                }
                moreBtn.style.setProperty('display', 'inline-flex', 'important');
                moreBtn.style.setProperty('visibility', 'visible', 'important');
                moreBtn.style.setProperty('opacity', '1', 'important');
                moreBtn.style.setProperty('min-width', '160px', 'important');
                moreBtn.style.setProperty('white-space', 'nowrap', 'important');
            }
            
            const faqBtns = document.querySelectorAll('.faq-categories .category-btn');
            faqBtns.forEach(btn => {
                if (scheme.bg === '#000000' || scheme.bg === '#00008B' || scheme.bg === '#0a0e27') {
                    btn.style.setProperty('color', '#FFFFFF', 'important');
                    btn.style.setProperty('background-color', '#1a1a1a', 'important');
                } else if (scheme.bg === '#FFFFFF') {
                    btn.style.setProperty('color', '#000000', 'important');
                    btn.style.setProperty('background-color', '#e8e8e8', 'important');
                } else {
                    btn.style.setProperty('color', scheme.text, 'important');
                }
                btn.style.setProperty('border', `2px solid ${scheme.border}`, 'important');
            });
            
            const heroTitle = document.querySelector('.hero-faq h1');
            if (heroTitle) {
                if (currentSettings.colorScheme === 'black-white') {
                    heroTitle.style.setProperty('color', '#FFFFFF', 'important');
                } else if (currentSettings.colorScheme === 'white-black') {
                    heroTitle.style.setProperty('color', '#000000', 'important');
                } else {
                    heroTitle.style.setProperty('color', '#FFFFFF', 'important');
                }
            }
            
            const heroSubtitle = document.querySelector('.hero-faq p');
            if (heroSubtitle) {
                if (currentSettings.colorScheme === 'black-white') {
                    heroSubtitle.style.setProperty('color', '#FFFFFF', 'important');
                } else if (currentSettings.colorScheme === 'white-black') {
                    heroSubtitle.style.setProperty('color', '#000000', 'important');
                } else {
                    heroSubtitle.style.setProperty('color', 'rgba(255,255,255,0.9)', 'important');
                }
            }
            
            applyLoginButtonAndTitleStyles();
        }, 100);
    }
    
    function showNotification(message, type = 'success') {
        const oldNotifications = document.querySelectorAll('.special-notification');
        oldNotifications.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = 'special-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: ${type === 'error' ? '#EF4444' : '#10B981'};
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-family: 'Mulish', sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 20002;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            pointer-events: none;
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    function enableSpecialMode() {
        currentSettings.isActive = true;
        sessionStorage.removeItem('special_mode_disabled');
        document.body.classList.add('special-mode');
        if (currentSettings.hideImages) {
            document.body.classList.add('photo-hidden-mode');
        }
        localStorage.setItem('specialVersion', 'enabled');
        applyStyles();
        saveSettings();
        showNotification('🌙 Режим для слабовидящих включен');
        updateToggleButtonStyle();
        updateToggleButtonText();
        startDynamicObserver();
        ensureMoreButtonVisible();
        applyLoginButtonAndTitleStyles();
        translateSpecialPanel();
    }
    
    function startDynamicObserver() {
        if (dynamicObserver) {
            dynamicObserver.disconnect();
        }
        
        dynamicObserver = new MutationObserver(function() {
            if (currentSettings.isActive) {
                forceUpdateAllButtons();
                applyHeroTeamStylesImmediately();
                applyReviewsStyles();
                applyPricesStyles();
                applyScheduleStyles();
                applyFaqStyles();
                applyServiceMenu2Styles();
                applyServiceMenu3Styles();
                applyServiceMenu4Styles();
                applyServiceMenu7Styles();
                applyServiceMenu8Styles();
                applyServiceMenu9Styles();
                applyIndexStyles();
                applyContactsStyles();
                applyVisualTextsHiding();
                ensureMoreButtonVisible();
                applyLoginButtonAndTitleStyles();
            }
        });
        
        dynamicObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    function stopDynamicObserver() {
        if (dynamicObserver) {
            dynamicObserver.disconnect();
            dynamicObserver = null;
        }
    }
    
    function disableSpecialMode() {
        currentSettings.isActive = false;
        
        sessionStorage.setItem('special_mode_disabled', 'true');
        
        document.body.classList.remove('special-mode');
        document.body.classList.remove('photo-hidden-mode');
        document.body.removeAttribute('data-special-scheme');
        document.body.removeAttribute('data-special-font');
        
        localStorage.removeItem('special_version_settings');
        localStorage.removeItem('specialVersion');
        
        resetMoreButtonStyles();
        
        applyHeroTeamStylesImmediately();
        applyReviewsStyles();
        resetPricesStyles();
        resetScheduleStyles();
        resetFaqStyles();
        
        if (styleElement) {
            styleElement.remove();
            styleElement = null;
        }
        
        resetAllInlineStyles();
        stopDynamicObserver();
        
        currentSettings = {
            fontSize: 'normal',
            colorScheme: 'black-yellow',
            hideImages: false,
            isActive: false
        };
        
        saveSettings();
        
        showNotification('☀️ Обычный режим восстановлен');
        updateToggleButtonStyle();
        updateToggleButtonText();
        resetLoginButtonAndTitleStyles();
        translateSpecialPanel();
    }
    
    function toggleSpecialMode() {
        if (currentSettings.isActive) {
            disableSpecialMode();
        } else {
            enableSpecialMode();
        }
        updateToggleButtonText();
        updatePanelActiveState();
        ensureMoreButtonVisible();
    }
    
    function updateToggleButtonStyle() {
        const toggleBtn = document.getElementById('specialToggleBtn');
        if (toggleBtn) {
            toggleBtn.style.whiteSpace = 'normal';
            toggleBtn.style.display = 'flex';
            toggleBtn.style.alignItems = 'center';
            toggleBtn.style.justifyContent = 'center';
            toggleBtn.style.flexDirection = 'column';
            toggleBtn.style.lineHeight = '1.3';
            toggleBtn.style.minWidth = '100px';
        }
    }
    
    function setFontSize(size) {
        if (fontSizeMap[size]) {
            currentSettings.fontSize = size;
            if (currentSettings.isActive) {
                applyStyles();
                applyPricesStyles();
                applyScheduleStyles();
                applyFaqStyles();
                ensureMoreButtonVisible();
            }
            saveSettings();
            updatePanelActiveState();
            showNotification(`📏 Размер шрифта: ${getFontSizeName(size)}`);
        }
    }
    
    function setColorScheme(scheme) {
        if (colorSchemes[scheme]) {
            currentSettings.colorScheme = scheme;
            if (currentSettings.isActive) {
                applyStyles();
                document.body.setAttribute('data-special-scheme', scheme);
                applyPricesStyles();
                applyScheduleStyles();
                applyFaqStyles();
                applyServiceMenu2Styles();
                applyServiceMenu3Styles();
                applyServiceMenu4Styles();
                applyServiceMenu7Styles();
                applyServiceMenu8Styles();
                applyServiceMenu9Styles();
                ensureMoreButtonVisible();
            }
            saveSettings();
            updatePanelActiveState();
            showNotification(`🎨 Цветовая схема: ${getColorSchemeName(scheme)}`);
        }
    }
    
    function toggleHideImages() {
        currentSettings.hideImages = !currentSettings.hideImages;
        
        if (currentSettings.hideImages) {
            document.body.classList.add('photo-hidden-mode');
        } else {
            document.body.classList.remove('photo-hidden-mode');
        }
        
        if (currentSettings.isActive) {
            applyStyles();
            applyReviewsStyles();
            applyPricesStyles();
            applyScheduleStyles();
            applyFaqStyles();
            applyServiceMenu2Styles();
            applyServiceMenu3Styles();
            applyServiceMenu4Styles();
            applyServiceMenu7Styles();
            applyServiceMenu8Styles();
            applyServiceMenu9Styles();
            applyIndexStyles();
            applyContactsStyles();
            applyVisualTextsHiding();
            ensureMoreButtonVisible();
        }
        saveSettings();
        updatePanelActiveState();
        translateSpecialPanel();
        
        const hideImagesText = currentSettings.hideImages ? '🖼️ Все фото скрыты, контент сжат' : '🖼️ Фото показаны';
        showNotification(hideImagesText);
        
        const imagesBtn = document.getElementById('toggleImagesBtn');
        if (imagesBtn) {
            const currentLang = localStorage.getItem('dental_language') || 'ru';
            imagesBtn.textContent = currentSettings.hideImages 
                ? (currentLang === 'ru' ? 'Показать фото' : 'Show Images')
                : (currentLang === 'ru' ? 'Скрыть фото' : 'Hide Images');
        }
    }
    
    function getFontSizeName(size) {
        const names = { normal: 'Обычный', large: 'Увеличенный', xlarge: 'Крупный', xxlarge: 'Очень крупный' };
        return names[size] || size;
    }
    
    function getColorSchemeName(scheme) {
        const names = {
            'black-yellow': 'Чёрный на жёлтом',
            'white-black': 'Белый на чёрном',
            'blue-yellow': 'Синий на жёлтом',
            'black-white': 'Чёрный на белом',
            'dark-blue-light': 'Тёмно-синий на светлом'
        };
        return names[scheme] || scheme;
    }
    
    function resetSettings() {
        currentSettings = {
            fontSize: 'normal',
            colorScheme: 'black-yellow',
            hideImages: false,
            isActive: currentSettings.isActive
        };
        if (currentSettings.isActive) {
            applyStyles();
            applyPricesStyles();
            applyScheduleStyles();
            applyFaqStyles();
            applyServiceMenu2Styles();
            applyServiceMenu3Styles();
            applyServiceMenu4Styles();
            applyServiceMenu7Styles();
            applyServiceMenu8Styles();
            applyServiceMenu9Styles();
            ensureMoreButtonVisible();
        }
        saveSettings();
        updatePanelActiveState();
        showNotification('🔄 Настройки сброшены');
        const imagesBtn = document.getElementById('toggleImagesBtn');
        if (imagesBtn) {
            const currentLang = localStorage.getItem('dental_language') || 'ru';
            imagesBtn.textContent = currentLang === 'ru' ? 'Скрыть фото' : 'Hide Images';
        }
        resetLoginButtonAndTitleStyles();
        resetMoreButtonStyles();
        translateSpecialPanel();
    }
    
    function updateToggleButtonText() {
        const toggleBtn = document.getElementById('specialToggleBtn');
        if (toggleBtn) {
            const currentLang = localStorage.getItem('dental_language') || 'ru';
            if (currentSettings.isActive) {
                toggleBtn.innerHTML = currentLang === 'ru' ? '🔴 Выключить режим' : '🔴 Disable mode';
            } else {
                toggleBtn.innerHTML = currentLang === 'ru' ? '🟢 Включить режим' : '🟢 Enable mode';
            }
        }
    }
    
    function createSettingsPanel() {
        if (panelElement) return;
        
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        
        panelElement = document.createElement('div');
        panelElement.className = 'special-panel';
        panelElement.id = 'specialPanel';
        panelElement.innerHTML = `
            <div class="special-panel-header">
                <h3>${currentLang === 'ru' ? '👁️ Настройки для слабовидящих' : '👁️ Accessibility Settings'}</h3>
                <button class="special-panel-close" id="specialPanelClose">&times;</button>
            </div>
            <div class="special-panel-content">
                <div class="special-setting-group">
                    <label>${currentLang === 'ru' ? '📏 Размер шрифта' : '📏 Font Size'}</label>
                    <div class="special-buttons" id="fontSizeButtons">
                        <button data-size="normal" class="special-btn ${currentSettings.fontSize === 'normal' ? 'active' : ''}">${currentLang === 'ru' ? 'Обычный' : 'Normal'}</button>
                        <button data-size="large" class="special-btn ${currentSettings.fontSize === 'large' ? 'active' : ''}">${currentLang === 'ru' ? 'Увеличенный' : 'Large'}</button>
                        <button data-size="xlarge" class="special-btn ${currentSettings.fontSize === 'xlarge' ? 'active' : ''}">${currentLang === 'ru' ? 'Крупный' : 'X-Large'}</button>
                        <button data-size="xxlarge" class="special-btn ${currentSettings.fontSize === 'xxlarge' ? 'active' : ''}">${currentLang === 'ru' ? 'Очень крупный' : 'XX-Large'}</button>
                    </div>
                </div>
                
                <div class="special-setting-group">
                    <label>${currentLang === 'ru' ? '🎨 Цвет фона и текста' : '🎨 Color Scheme'}</label>
                    <div class="color-preview" id="colorButtons">
                        <div data-scheme="black-yellow" class="color-option black-yellow ${currentSettings.colorScheme === 'black-yellow' ? 'active' : ''}" title="${currentLang === 'ru' ? 'Чёрный на жёлтом' : 'Black on Yellow'}">Aa</div>
                        <div data-scheme="white-black" class="color-option white-black ${currentSettings.colorScheme === 'white-black' ? 'active' : ''}" title="${currentLang === 'ru' ? 'Белый на чёрном' : 'White on Black'}">Aa</div>
                        <div data-scheme="blue-yellow" class="color-option blue-yellow ${currentSettings.colorScheme === 'blue-yellow' ? 'active' : ''}" title="${currentLang === 'ru' ? 'Синий на жёлтом' : 'Blue on Yellow'}">Aa</div>
                        <div data-scheme="black-white" class="color-option black-white ${currentSettings.colorScheme === 'black-white' ? 'active' : ''}" title="${currentLang === 'ru' ? 'Чёрный на белом' : 'Black on White'}">Aa</div>
                        <div data-scheme="dark-blue-light" class="color-option dark-blue-light ${currentSettings.colorScheme === 'dark-blue-light' ? 'active' : ''}" title="${currentLang === 'ru' ? 'Тёмно-синий на светлом' : 'Dark Blue on Light'}">Aa</div>
                    </div>
                </div>
                
                <div class="special-setting-group">
                    <label>${currentLang === 'ru' ? '🖼️ Изображения' : '🖼️ Images'}</label>
                    <div class="special-buttons">
                        <button class="special-btn" id="toggleImagesBtn">${currentSettings.hideImages ? (currentLang === 'ru' ? 'Показать фото' : 'Show Images') : (currentLang === 'ru' ? 'Скрыть фото' : 'Hide Images')}</button>
                    </div>
                </div>
                
                <div class="special-actions">
                    <button class="special-btn" id="specialToggleBtn">${currentSettings.isActive ? (currentLang === 'ru' ? '🔴 Выключить режим' : '🔴 Disable mode') : (currentLang === 'ru' ? '🟢 Включить режим' : '🟢 Enable mode')}</button>
                    <button class="special-btn btn-reset" id="specialResetBtn">${currentLang === 'ru' ? '🔄 Сбросить' : '🔄 Reset'}</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(panelElement);
        
        updateToggleButtonStyle();
        updateToggleButtonText();
        
        const closeBtn = document.getElementById('specialPanelClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                panelElement.classList.remove('active');
            });
        }
        
        const toggleBtn = document.getElementById('specialToggleBtn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                toggleSpecialMode();
            });
        }
        
        const resetBtn = document.getElementById('specialResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetSettings);
        }
        
        const imagesBtn = document.getElementById('toggleImagesBtn');
        if (imagesBtn) {
            imagesBtn.addEventListener('click', () => {
                toggleHideImages();
            });
        }
        
        document.querySelectorAll('[data-size]').forEach(btn => {
            btn.addEventListener('click', () => {
                setFontSize(btn.dataset.size);
                updatePanelActiveState();
                translateSpecialPanel();
            });
        });
        
        document.querySelectorAll('[data-scheme]').forEach(btn => {
            btn.addEventListener('click', () => {
                setColorScheme(btn.dataset.scheme);
                updatePanelActiveState();
                translateSpecialPanel();
            });
        });
        
        document.addEventListener('click', (e) => {
            if (panelElement.classList.contains('active') && 
                !panelElement.contains(e.target) && 
                e.target.id !== 'specialButton' &&
                e.target.id !== 'mobileSpecialButton') {
                panelElement.classList.remove('active');
            }
        });
        
        translateSpecialPanel();
    }
    
    function updatePanelActiveState() {
        if (!panelElement) return;
        
        document.querySelectorAll('[data-size]').forEach(btn => {
            if (btn.dataset.size === currentSettings.fontSize) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        document.querySelectorAll('[data-scheme]').forEach(btn => {
            if (btn.dataset.scheme === currentSettings.colorScheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        const imagesBtn = document.getElementById('toggleImagesBtn');
        if (imagesBtn) {
            const currentLang = localStorage.getItem('dental_language') || 'ru';
            imagesBtn.textContent = currentSettings.hideImages 
                ? (currentLang === 'ru' ? 'Показать фото' : 'Show Images')
                : (currentLang === 'ru' ? 'Скрыть фото' : 'Hide Images');
        }
        
        translateSpecialPanel();
    }
    
    function updateSpecialButtonUI() {
        const specialButton = document.getElementById('specialButton');
        if (specialButton) {
            specialButton.style.background = currentSettings.isActive ? 'rgba(165, 195, 60, 0.4)' : 'rgba(165, 195, 60, 0.15)';
            specialButton.style.borderColor = currentSettings.isActive ? '#A5C33C' : 'rgba(165, 195, 60, 0.3)';
            specialButton.style.cursor = 'pointer';
        }
    }
    
    function initMobileSpecialButton() {
        const mobileSpecialBtn = document.getElementById('mobileSpecialButton');
        if (mobileSpecialBtn && !mobileSpecialBtn.hasAttribute('data-special-listener')) {
            mobileSpecialBtn.setAttribute('data-special-listener', 'true');
            
            const newMobileBtn = mobileSpecialBtn.cloneNode(true);
            mobileSpecialBtn.parentNode.replaceChild(newMobileBtn, mobileSpecialBtn);
            
            newMobileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                const panel = document.getElementById('specialPanel');
                if (panel) {
                    panel.classList.toggle('active');
                }
                
                return false;
            });
            
            newMobileBtn.addEventListener('touchstart', (e) => {
                e.stopPropagation();
            }, { passive: false });
        }
    }
    
    function waitForHeaderAndInit() {
        const specialButton = document.getElementById('specialButton');
        
        if (specialButton) {
            initPlugin();
            ensureMoreButtonVisible();
            return;
        }
        
        const observer = new MutationObserver(function(mutations) {
            const btn = document.getElementById('specialButton');
            if (btn) {
                observer.disconnect();
                clearInterval(interval);
                initPlugin();
                ensureMoreButtonVisible();
            }
        });
        
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
        
        let attempts = 0;
        const maxAttempts = 30;
        const interval = setInterval(() => {
            attempts++;
            const btn = document.getElementById('specialButton');
            if (btn) {
                clearInterval(interval);
                observer.disconnect();
                initPlugin();
                ensureMoreButtonVisible();
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                observer.disconnect();
                createSpecialButtonManually();
                initPlugin();
                ensureMoreButtonVisible();
            }
        }, 200);
    }
    
    function createSpecialButtonManually() {
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            const specialBtn = document.createElement('a');
            specialBtn.id = 'specialButton';
            specialBtn.href = '#';
            specialBtn.className = 'special-button';
            specialBtn.title = 'Настройки для слабовидящих';
            specialBtn.innerHTML = '👁️';
            specialBtn.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: rgba(165, 195, 60, 0.15); border-radius: 50%; text-decoration: none; cursor: pointer; font-size: 22px; border: 1px solid rgba(165, 195, 60, 0.3); margin-right: 10px;';
            headerRight.appendChild(specialBtn);
        }
    }
    
    document.addEventListener('languageChanged', function() {
        console.log('🌐 Смена языка в special-version.js');
        translateSpecialPanel();
        updateToggleButtonText();
        
        if (currentSettings.isActive) {
            applyStyles();
        }
        
        const imagesBtn = document.getElementById('toggleImagesBtn');
        if (imagesBtn) {
            const currentLang = localStorage.getItem('dental_language') || 'ru';
            if (currentSettings.hideImages) {
                imagesBtn.textContent = currentLang === 'ru' ? 'Показать фото' : 'Show Images';
            } else {
                imagesBtn.textContent = currentLang === 'ru' ? 'Скрыть фото' : 'Hide Images';
            }
        }
    });
    
    function initPlugin() {
        if (window._specialVersionInitialized) return;
        window._specialVersionInitialized = true;
        
        createSettingsPanel();
        translateSpecialPanel();
        updatePanelActiveState();
        updateSpecialButtonUI();
        initMobileSpecialButton();
        
        const specialButton = document.getElementById('specialButton');
        if (specialButton && !specialButton.hasAttribute('data-special-listener')) {
            specialButton.setAttribute('data-special-listener', 'true');
            
            const newSpecialButton = specialButton.cloneNode(true);
            specialButton.parentNode.replaceChild(newSpecialButton, specialButton);
            
            newSpecialButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const panel = document.getElementById('specialPanel');
                if (panel) {
                    panel.classList.toggle('active');
                }
                return false;
            });
        }
        
        const observer = new MutationObserver(() => {
            const btn = document.getElementById('specialButton');
            if (btn && !btn.hasAttribute('data-special-listener')) {
                btn.setAttribute('data-special-listener', 'true');
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                newBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const panel = document.getElementById('specialPanel');
                    if (panel) panel.classList.toggle('active');
                });
            }
            initMobileSpecialButton();
            ensureMoreButtonVisible();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    if (document.body) {
        ensureMoreButtonVisible();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            ensureMoreButtonVisible();
            waitForHeaderAndInit();
        });
    } else {
        ensureMoreButtonVisible();
        waitForHeaderAndInit();
    }
    
    const moreBtnObserver = new MutationObserver(function() {
        ensureMoreButtonVisible();
    });
    moreBtnObserver.observe(document.body, { childList: true, subtree: true });
    
    loadSettings();
    
    if (typeof window.addEventListener === 'function') {
        window.addEventListener('pageshow', function(event) {
            if (event.persisted || document.body.classList.contains('special-mode')) {
                loadSettings();
                ensureMoreButtonVisible();
                translateSpecialPanel();
            }
        });
    }
    
    window.specialVersion = {
        enable: enableSpecialMode,
        disable: disableSpecialMode,
        toggle: toggleSpecialMode,
        setFontSize: setFontSize,
        setColorScheme: setColorScheme,
        toggleHideImages: toggleHideImages,
        reset: resetSettings,
        ensureMoreButtonVisible: ensureMoreButtonVisible,
        translatePanel: translateSpecialPanel
    };
})();