(function() {
    const API_BASE_URL = 'http://localhost:3000';
    
    function getCurrentLang() {
        return localStorage.getItem('dental_language') || 'ru';
    }
    
    function translateLoginText(key, defaultValue = '') {
        const lang = getCurrentLang();
        const translations = {
            ru: {
                'login_title': 'ВХОД В АККАУНТ',
                'login_subtitle': 'Добро пожаловать обратно!',
                'login_email_phone': 'Email или телефон',
                'login_email_phone_placeholder': 'example@mail.com или +375 (29) 123-45-67',
                'login_password': 'Пароль',
                'login_password_placeholder': 'Введите пароль',
                'login_remember': 'Запомнить меня',
                'login_button': 'ВОЙТИ',
                'login_no_account': 'Нет аккаунта?',
                'login_register_link': 'Зарегистрироваться',
                'login_error_required': 'Введите email или номер телефона',
                'login_error_password_required': 'Введите пароль',
                'login_error_invalid': 'Неверный email/телефон или пароль',
                'login_success': 'Вход выполнен успешно! Перенаправление...',
                'login_server_error': 'Ошибка подключения к серверу. Запустите json-server'
            },
            en: {
                'login_title': 'LOGIN',
                'login_subtitle': 'Welcome back!',
                'login_email_phone': 'Email or phone',
                'login_email_phone_placeholder': 'example@mail.com or +375 (29) 123-45-67',
                'login_password': 'Password',
                'login_password_placeholder': 'Enter your password',
                'login_remember': 'Remember me',
                'login_button': 'LOGIN',
                'login_no_account': "Don't have an account?",
                'login_register_link': 'Sign up',
                'login_error_required': 'Enter email or phone number',
                'login_error_password_required': 'Enter password',
                'login_error_invalid': 'Invalid email/phone or password',
                'login_success': 'Login successful! Redirecting...',
                'login_server_error': 'Server connection error. Please start json-server'
            }
        };
        return translations[lang]?.[key] || translations['ru'][key] || defaultValue;
    }
    
    function updateLoginPageTranslations() {
        const currentLang = getCurrentLang();
        console.log('🌐 Обновление перевода страницы входа, язык:', currentLang);
        
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            const translated = translateLoginText(key);
            if (translated && translated !== key) {
                if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                    el.placeholder = translated;
                } else {
                    el.textContent = translated;
                }
            }
        });
        
        const titleEl = document.querySelector('title');
        if (titleEl) {
            titleEl.textContent = translateLoginText('login_title', 'Вход | Dental Club');
        }
    }
    
    async function loginViaAPI(email, password) {
        try {
            console.log('🔍 Попытка входа:', email);
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const users = await response.json();
            console.log('✅ Загружено пользователей:', users.length);
            
            const cleanLogin = email.replace(/\D/g, '');
            const user = users.find(u => 
                (u.email === email || u.phone === cleanLogin || u.phone === email) && 
                u.password === password
            );
            
            if (user) {
                console.log('✅ Пользователь найден:', user.email);
                const { password: _, ...safeUser } = user;
                return safeUser;
            }
            console.log('❌ Пользователь не найден');
            return null;
        } catch (error) {
            console.error('❌ Ошибка подключения к серверу:', error);
            showNotification(translateLoginText('login_server_error'), true);
            return null;
        }
    }
    
    function setupPasswordToggles() {
        document.querySelectorAll('.login-toggle-password').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const input = document.getElementById(targetId);
                if (input) {
                    input.type = input.type === 'password' ? 'text' : 'password';
                }
            });
        });
    }
    
    function showError(elementId, message) {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('visible');
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.login-error-message').forEach(el => {
            el.classList.remove('visible');
            el.textContent = '';
        });
        document.querySelectorAll('.login-form-group input').forEach(el => {
            el.classList.remove('error');
        });
    }
    
    function showNotification(message, isError = false) {
        const oldNotification = document.querySelector('.login-notification');
        if (oldNotification) oldNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'login-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isError ? '#EF4444' : '#10B981'};
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            font-family: 'Mulish', sans-serif;
            font-size: 14px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    function initLogin() {
        const form = document.getElementById('loginForm');
        if (!form) {
            console.error('❌ Форма входа не найдена');
            return;
        }
        console.log('✅ Форма входа найдена');
        
        updateLoginPageTranslations();
        
        const savedEmail = localStorage.getItem('dental_club_saved_email');
        if (savedEmail) {
            const emailInput = document.getElementById('loginEmail');
            const rememberCheckbox = document.getElementById('rememberMe');
            if (emailInput && rememberCheckbox) {
                emailInput.value = savedEmail;
                rememberCheckbox.checked = true;
            }
        }
        
        setupPasswordToggles();
        
        const oldSubmit = form.onsubmit;
        form.onsubmit = null;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('📤 Отправка формы');
            clearErrors();
            
            const login = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            let isValid = true;
            
            if (!login) {
                showError('loginEmailError', translateLoginText('login_error_required'));
                document.getElementById('loginEmail').classList.add('error');
                isValid = false;
            }
            
            if (!password) {
                showError('loginPasswordError', translateLoginText('login_error_password_required'));
                document.getElementById('loginPassword').classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = translateLoginText('login_button');
                submitBtn.disabled = true;
                
                const user = await loginViaAPI(login, password);
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                if (user) {
                    if (typeof window.saveSession === 'function') {
                        window.saveSession(user, rememberMe);
                        console.log('✅ Сессия сохранена через window.saveSession');
                    } else {
                        console.error('❌ window.saveSession не найден!');
                        const session = {
                            userId: user.id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            phone: user.phone,
                            role: user.role || 'user',
                            loginTime: new Date().toISOString()
                        };
                        localStorage.setItem('dental_club_session', JSON.stringify(session));
                        console.log('✅ Сессия сохранена в localStorage (fallback)');
                    }
                    
                    if (rememberMe) {
                        localStorage.setItem('dental_club_saved_email', login);
                    } else {
                        localStorage.removeItem('dental_club_saved_email');
                    }
                    
                    showNotification(translateLoginText('login_success'));
                    
                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 1500);
                } else {
                    showError('loginPasswordError', translateLoginText('login_error_invalid'));
                    document.getElementById('loginPassword').classList.add('error');
                    showNotification(translateLoginText('login_error_invalid'), true);
                }
            }
        });
    }
    
    if (!document.querySelector('#login-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'login-animation-styles';
        style.textContent = `
            @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        `;
        document.head.appendChild(style);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLogin);
    } else {
        initLogin();
    }
    
    document.addEventListener('languageChanged', function() {
        console.log('🌐 Смена языка на странице входа');
        updateLoginPageTranslations();
        
        const submitBtn = document.querySelector('#loginForm button[type="submit"]');
        if (submitBtn && !submitBtn.disabled) {
            submitBtn.textContent = translateLoginText('login_button');
        }
    });
})();