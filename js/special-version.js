
(function() {
    let currentSettings = {
        fontSize: 'normal',
        colorScheme: 'black-yellow',
        hideImages: false,
        isActive: false
    };
    
    let panelElement = null;
    let styleElement = null;
    let initAttempts = 0;
    const maxAttempts = 20; 
    
    const fontSizeMap = {
        normal: { base: '16px', h1: '32px', h2: '28px', h3: '24px', h4: '20px', small: '14px' },
        large: { base: '18px', h1: '36px', h2: '32px', h3: '28px', h4: '24px', small: '16px' },
        xlarge: { base: '20px', h1: '40px', h2: '36px', h3: '32px', h4: '28px', small: '18px' },
        xxlarge: { base: '24px', h1: '48px', h2: '42px', h3: '36px', h4: '32px', small: '20px' }
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
            iconFilter: 'none'
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
            iconFilter: 'brightness(0) invert(0)'
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
            iconFilter: 'none'
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
            iconFilter: 'brightness(0) invert(1)'
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
            iconFilter: 'none'
        }
    };
    
    function loadSettings() {
        try {
            const saved = localStorage.getItem('special_version_settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                currentSettings = { ...currentSettings, ...parsed };
            }
        } catch(e) {}
        
        if (localStorage.getItem('specialVersion') === 'enabled') {
            currentSettings.isActive = true;
            enableSpecialMode();
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
    
    function applyStyles() {
        if (!currentSettings.isActive) return;
        
        const scheme = colorSchemes[currentSettings.colorScheme];
        const sizes = fontSizeMap[currentSettings.fontSize];
        
        if (!scheme || !sizes) return;
        
        let css = `
            /* ===== ОСНОВНЫЕ СТИЛИ ДЛЯ РЕЖИМА СЛАБОВИДЯЩИХ ===== */
            body.special-mode,
            body.special-mode * {
                background-color: ${scheme.bg} !important;
                color: ${scheme.text} !important;
                border-color: ${scheme.border} !important;
            }
            
            /* ===== ПЕРЕОПРЕДЕЛЯЕМ ЦВЕТ ТЕКСТА ДЛЯ ВСЕХ ОСНОВНЫХ ЭЛЕМЕНТОВ ===== */
            body.special-mode .clinic-name,
            body.special-mode .clinic-desc,
            body.special-mode .advantages-title,
            body.special-mode .advantages-subtitle,
            body.special-mode .advantage-item,
            body.special-mode .hero-content h1,
            body.special-mode .hero-content span,
            body.special-mode .hero-content .city-text,
            body.special-mode .hero-content .hero-title,
            body.special-mode .hero-content p,
            body.special-mode p,
            body.special-mode h1, body.special-mode h2, body.special-mode h3, body.special-mode h4,
            body.special-mode .container p,
            body.special-mode .container h1,
            body.special-mode .container h2,
            body.special-mode .container h3,
            body.special-mode .container span,
            body.special-mode .info-text p,
            body.special-mode .info-text h2,
            body.special-mode .info-text h3,
            body.special-mode .diagnosis-text,
            body.special-mode .tomograph-text,
            body.special-mode .safety-text,
            body.special-mode .specialists-text,
            body.special-mode .team-text,
            body.special-mode .steps-description,
            body.special-mode .steps-list li,
            body.special-mode .review-card h3,
            body.special-mode .review-content p,
            body.special-mode .intro-text p,
            body.special-mode .feedback-title h2 {
                color: ${scheme.text} !important;
            }
            
            /* ===== УБИРАЕМ ТОЛЬКО ЦВЕТНУЮ ПОДЛОЖКУ, НО СОХРАНЯЕМ ФОНОВОЕ ИЗОБРАЖЕНИЕ ===== */
            body.special-mode .hero,
            body.special-mode .hero-prices,
            body.special-mode .hero-contacts,
            body.special-mode .hero-team,
            body.special-mode .hero-faq,
            body.special-mode .hero-reviews,
            body.special-mode .hero-schedule,
            body.special-mode .hero-diagnostics,
            body.special-mode section[class*="hero"],
            body.special-mode div[class*="hero"] {
                background-color: transparent !important;
            }
            
            body.special-mode .hero-content {
                background-color: transparent !important;
            }
            
            body.special-mode .hero-content h1,
            body.special-mode .hero-content .city-text,
            body.special-mode .hero-content span {
                background-color: transparent !important;
            }
            
            /* СПЕЦИАЛЬНОЕ ПРАВИЛО ДЛЯ БЕЛОЙ ТЕМЫ С ФОТО */
            body.special-mode:not(.photo-hidden-mode) .hero-content h1,
            body.special-mode:not(.photo-hidden-mode) .hero-content .city-text,
            body.special-mode:not(.photo-hidden-mode) .hero-content span {
                color: #FFFFFF !important;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5) !important;
            }
            
            /* Исключение для панели настроек - она НЕ МЕНЯЕТСЯ */
            body.special-mode .special-panel,
            body.special-mode .special-panel * {
                background-color: #1a1e22 !important;
                color: #ffffff !important;
                border-color: rgba(165, 195, 60, 0.3) !important;
            }
            
            body.special-mode .special-panel-header,
            body.special-mode .special-panel-header * {
                background-color: #A5C33C !important;
                color: #1a1e22 !important;
            }
            
            /* ФИКСИРОВАННЫЕ СТИЛИ ДЛЯ КНОПОК В ПАНЕЛИ */
            body.special-mode .special-panel .special-btn {
                background-color: rgba(255, 255, 255, 0.1) !important;
                color: #FFFFFF !important;
                font-size: 14px !important;
                font-family: Arial, sans-serif !important;
                padding: 8px 16px !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                border-radius: 8px !important;
                min-width: 100px !important;
                text-align: center !important;
                line-height: 1.3 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
            }
            
            body.special-mode .special-panel #specialToggleBtn {
                white-space: normal !important;
                word-break: keep-all !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                flex-direction: column !important;
            }
            
            body.special-mode .special-panel #specialResetBtn {
                white-space: nowrap !important;
            }
            
            body.special-mode .special-panel .special-btn.active {
                background-color: #A5C33C !important;
                color: #1a1e22 !important;
            }
            
            body.special-mode .special-panel .btn-reset {
                background-color: rgba(239, 68, 68, 0.2) !important;
                color: #EF4444 !important;
            }
            
            body.special-mode .special-panel .color-option {
                width: 55px !important;
                min-width: 55px !important;
                height: 55px !important;
            }
            
            body.special-mode .special-panel .color-option.black-yellow {
                background: #000 !important;
                color: #FF0 !important;
            }
            
            body.special-mode .special-panel .color-option.white-black {
                background: #FFF !important;
                color: #000 !important;
            }
            
            body.special-mode .special-panel .color-option.blue-yellow {
                background: #00008B !important;
                color: #FF0 !important;
            }
            
            body.special-mode .special-panel .color-option.black-white {
                background: #000 !important;
                color: #FFF !important;
            }
            
            body.special-mode .special-panel .color-option.dark-blue-light {
                background: #0a0e27 !important;
                color: #e0e0e0 !important;
            }
            
            /* Стили для header и footer */
            body.special-mode .header,
            body.special-mode .header *,
            body.special-mode .footer,
            body.special-mode .footer * {
                background-color: ${scheme.headerBg} !important;
                color: ${scheme.headerText} !important;
            }
            
            body.special-mode .login-link,
            body.special-mode .menu-btn span,
            body.special-mode .lang-selector span {
                color: ${scheme.headerText} !important;
            }
            
            /* Иконки */
            body.special-mode .logo img,
            body.special-mode .menu-logo,
            body.special-mode .lang-logo,
            body.special-mode .footer-logo img,
            body.special-mode .footer-socials img {
                filter: ${scheme.iconFilter} !important;
            }
            
            /* Размеры шрифтов */
            body.special-mode {
                font-size: ${sizes.base} !important;
                line-height: 1.6 !important;
                letter-spacing: 0.5px !important;
            }
            
            body.special-mode p, body.special-mode li, body.special-mode span {
                font-size: ${sizes.base} !important;
            }
            body.special-mode h1 { font-size: ${sizes.h1} !important; }
            body.special-mode h2 { font-size: ${sizes.h2} !important; }
            body.special-mode h3 { font-size: ${sizes.h3} !important; }
            body.special-mode h4 { font-size: ${sizes.h4} !important; }
            
            /* Ссылки */
            body.special-mode a:not(.special-panel a):not(.special-button) {
                color: ${scheme.link} !important;
                text-decoration: underline !important;
            }
            
            /* Кнопки */
            body.special-mode button:not(.special-panel button):not(.special-button),
            body.special-mode .btn:not(.special-panel .btn) {
                background-color: ${scheme.buttonBg} !important;
                color: ${scheme.buttonText} !important;
                border: 2px solid ${scheme.border} !important;
            }
            
            /* Поля ввода */
            body.special-mode input, body.special-mode textarea, body.special-mode select {
                background-color: ${scheme.inputBg} !important;
                color: ${scheme.text} !important;
                border: 2px solid ${scheme.border} !important;
            }
        `;
        
        if (currentSettings.hideImages === true) {
            css += `
                body.special-mode img:not(.special-panel img):not(.special-button img),
                body.special-mode picture, body.special-mode figure, body.special-mode video {
                    display: none !important;
                }
                
                body.special-mode .hero,
                body.special-mode .hero-prices,
                body.special-mode .hero-contacts,
                body.special-mode .hero-team,
                body.special-mode .hero-faq,
                body.special-mode .hero-reviews,
                body.special-mode .hero-schedule,
                body.special-mode .hero-diagnostics,
                body.special-mode section[class*="hero"],
                body.special-mode div[class*="hero"] {
                    background-image: none !important;
                }
            `;
            document.body.classList.add('photo-hidden-mode');
        } else {
            css += `
                body.special-mode img:not(.special-panel img) {
                    filter: brightness(1.1) contrast(1.2) !important;
                }
            `;
            document.body.classList.remove('photo-hidden-mode');
        }
        
        if (styleElement) {
            styleElement.remove();
        }
        
        styleElement = document.createElement('style');
        styleElement.id = 'special-mode-styles';
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
        
        updatePanelActiveState();
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
        document.body.classList.add('special-mode');
        localStorage.setItem('specialVersion', 'enabled');
        applyStyles();
        saveSettings();
        showNotification('🌙 Режим для слабовидящих включен');
        updateToggleButtonStyle();
        updateToggleButtonText();
    }
    
    function disableSpecialMode() {
        currentSettings.isActive = false;
        document.body.classList.remove('special-mode');
        document.body.classList.remove('photo-hidden-mode');
        localStorage.removeItem('specialVersion');
        if (styleElement) {
            styleElement.remove();
            styleElement = null;
        }
        saveSettings();
        showNotification('☀️ Обычный режим восстановлен');
        updateToggleButtonStyle();
        updateToggleButtonText();
    }
    
    function toggleSpecialMode() {
        if (currentSettings.isActive) {
            disableSpecialMode();
        } else {
            enableSpecialMode();
        }
        updateToggleButtonText();
        updatePanelActiveState();
    }
    
    function updateToggleButtonStyle() {
        const toggleBtn = document.getElementById('specialToggleBtn');
        if (toggleBtn) {
            toggleBtn.style.whiteSpace = 'normal';
            toggleBtn.style.wordBreak = 'keep-all';
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
            if (currentSettings.isActive) applyStyles();
            saveSettings();
            updatePanelActiveState();
            showNotification(`📏 Размер шрифта: ${getFontSizeName(size)}`);
        }
    }
    
    function setColorScheme(scheme) {
        if (colorSchemes[scheme]) {
            currentSettings.colorScheme = scheme;
            if (currentSettings.isActive) applyStyles();
            saveSettings();
            updatePanelActiveState();
            showNotification(`🎨 Цветовая схема: ${getColorSchemeName(scheme)}`);
        }
    }
    
    function toggleHideImages() {
        currentSettings.hideImages = !currentSettings.hideImages;
        if (currentSettings.isActive) applyStyles();
        saveSettings();
        updatePanelActiveState();
        showNotification(currentSettings.hideImages ? '🖼️ Все фото скрыты' : '🖼️ Фото показаны');
        
        const imagesBtn = document.getElementById('toggleImagesBtn');
        if (imagesBtn) imagesBtn.textContent = currentSettings.hideImages ? 'Показать фото' : 'Скрыть фото';
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
        if (currentSettings.isActive) applyStyles();
        saveSettings();
        updatePanelActiveState();
        showNotification('🔄 Настройки сброшены');
        const imagesBtn = document.getElementById('toggleImagesBtn');
        if (imagesBtn) imagesBtn.textContent = 'Скрыть фото';
    }
    
    function updateToggleButtonText() {
        const toggleBtn = document.getElementById('specialToggleBtn');
        if (toggleBtn) {
            if (currentSettings.isActive) {
                toggleBtn.innerHTML = '🔴 Выключить<br>режим';
            } else {
                toggleBtn.innerHTML = '🟢 Включить<br>режим';
            }
        }
    }
    
    function createSettingsPanel() {
        if (panelElement) return;
        
        panelElement = document.createElement('div');
        panelElement.className = 'special-panel';
        panelElement.id = 'specialPanel';
        panelElement.innerHTML = `
            <div class="special-panel-header">
                <h3>👁️ Настройки для слабовидящих</h3>
                <button class="special-panel-close" id="specialPanelClose">&times;</button>
            </div>
            <div class="special-panel-content">
                <div class="special-setting-group">
                    <label>📏 Размер шрифта</label>
                    <div class="special-buttons" id="fontSizeButtons">
                        <button data-size="normal" class="special-btn">Обычный</button>
                        <button data-size="large" class="special-btn">Увеличенный</button>
                        <button data-size="xlarge" class="special-btn">Крупный</button>
                        <button data-size="xxlarge" class="special-btn">Очень крупный</button>
                    </div>
                </div>
                
                <div class="special-setting-group">
                    <label>🎨 Цвет фона и текста</label>
                    <div class="color-preview" id="colorButtons">
                        <div data-scheme="black-yellow" class="color-option black-yellow" title="Чёрный на жёлтом">Aa</div>
                        <div data-scheme="white-black" class="color-option white-black" title="Белый на чёрном">Aa</div>
                        <div data-scheme="blue-yellow" class="color-option blue-yellow" title="Синий на жёлтом">Aa</div>
                        <div data-scheme="black-white" class="color-option black-white" title="Чёрный на белом">Aa</div>
                        <div data-scheme="dark-blue-light" class="color-option dark-blue-light" title="Тёмно-синий на светлом">Aa</div>
                    </div>
                </div>
                
                <div class="special-setting-group">
                    <label>🖼️ Изображения</label>
                    <div class="special-buttons">
                        <button class="special-btn" id="toggleImagesBtn">${currentSettings.hideImages ? 'Показать фото' : 'Скрыть фото'}</button>
                    </div>
                </div>
                
                <div class="special-actions">
                    <button class="special-btn" id="specialToggleBtn">${currentSettings.isActive ? '🔴 Выключить режим' : '🟢 Включить режим'}</button>
                    <button class="special-btn btn-reset" id="specialResetBtn">🔄 Сбросить</button>
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
            });
        });
        
        document.querySelectorAll('[data-scheme]').forEach(btn => {
            btn.addEventListener('click', () => {
                setColorScheme(btn.dataset.scheme);
                updatePanelActiveState();
            });
        });
        
        document.addEventListener('click', (e) => {
            if (panelElement.classList.contains('active') && 
                !panelElement.contains(e.target) && 
                e.target.id !== 'specialButton') {
                panelElement.classList.remove('active');
            }
        });
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
        if (imagesBtn) imagesBtn.textContent = currentSettings.hideImages ? 'Показать фото' : 'Скрыть фото';
    }
    
    function updateSpecialButtonUI() {
        const specialButton = document.getElementById('specialButton');
        if (specialButton) {
            specialButton.style.background = currentSettings.isActive ? 'rgba(165, 195, 60, 0.4)' : 'rgba(165, 195, 60, 0.15)';
            specialButton.style.borderColor = currentSettings.isActive ? '#A5C33C' : 'rgba(165, 195, 60, 0.3)';
            specialButton.style.cursor = 'pointer';
        }
    }
    
    function tryInit() {
        const specialButton = document.getElementById('specialButton');
        
        if (specialButton) {
            console.log('✅ specialButton найден, инициализация плагина');
            initPlugin();
        } else if (initAttempts < maxAttempts) {
            initAttempts++;
            console.log(`⏳ Ждём загрузку header... попытка ${initAttempts}/${maxAttempts}`);
            setTimeout(tryInit, 500);
        } else {
            console.warn('⚠️ specialButton не найден, создаём вручную');
            createSpecialButtonManually();
            initPlugin();
        }
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
            console.log('✅ Кнопка для слабовидящих создана вручную');
        }
    }
    
    function initPlugin() {
        createSettingsPanel();
        updatePanelActiveState();
        updateSpecialButtonUI();
        
        const specialButton = document.getElementById('specialButton');
        if (specialButton) {
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
            if (btn && !btn.hasListener) {
                btn.hasListener = true;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const panel = document.getElementById('specialPanel');
                    if (panel) panel.classList.toggle('active');
                });
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        
        console.log('✅ Плагин для слабовидящих инициализирован');
    }
    
    loadSettings();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }
    
    window.specialVersion = {
        enable: enableSpecialMode,
        disable: disableSpecialMode,
        toggle: toggleSpecialMode,
        setFontSize: setFontSize,
        setColorScheme: setColorScheme,
        toggleHideImages: toggleHideImages,
        reset: resetSettings
    };
})();