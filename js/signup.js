(function() {
    const API_BASE_URL = 'http://localhost:3000';
    
    function getCurrentLang() {
        return localStorage.getItem('dental_language') || 'ru';
    }
    
    function getTranslation(key, defaultValue = '') {
        const translations = {
            ru: {
                'first_name_placeholder': 'Введите ваше имя',
                'last_name_placeholder': 'Введите вашу фамилию',
                'email_placeholder': 'example@mail.com',
                'phone_placeholder': '+375 (29) 123-45-67',
                'password_placeholder': 'Минимум 6 символов',
                'confirm_password_placeholder': 'Повторите пароль',
                'terms_error': '⚠️ Необходимо согласиться с условиями использования и политикой конфиденциальности',
                'first_name_error': 'Введите имя',
                'first_name_min_error': 'Имя должно содержать минимум 2 символа',
                'last_name_error': 'Введите фамилию',
                'last_name_min_error': 'Фамилия должна содержать минимум 2 символа',
                'email_error': 'Введите email',
                'email_invalid_error': 'Введите корректный email',
                'phone_error': 'Введите номер телефона',
                'phone_invalid_error': 'Введите корректный номер телефона',
                'phone_exists_error': 'Этот номер телефона уже зарегистрирован',
                'password_error': 'Введите пароль',
                'password_min_error': 'Пароль должен содержать минимум 6 символов',
                'confirm_password_error': 'Пароли не совпадают',
                'email_exists_error': 'Пользователь с таким email уже существует',
                'phone_exists_error': 'Пользователь с таким номером телефона уже существует',
                'register_error': 'Ошибка при регистрации. Попробуйте позже.',
                'register_success': '✅ Регистрация успешна! Перенаправление на страницу входа...'
            },
            en: {
                'first_name_placeholder': 'Enter your first name',
                'last_name_placeholder': 'Enter your last name',
                'email_placeholder': 'example@mail.com',
                'phone_placeholder': '+375 (29) 123-45-67',
                'password_placeholder': 'Minimum 6 characters',
                'confirm_password_placeholder': 'Repeat password',
                'terms_error': '⚠️ You must agree to the Terms of Use and Privacy Policy',
                'first_name_error': 'Enter your first name',
                'first_name_min_error': 'First name must be at least 2 characters',
                'last_name_error': 'Enter your last name',
                'last_name_min_error': 'Last name must be at least 2 characters',
                'email_error': 'Enter email',
                'email_invalid_error': 'Enter a valid email',
                'phone_error': 'Enter phone number',
                'phone_invalid_error': 'Enter a valid phone number',
                'phone_exists_error': 'This phone number is already registered',
                'password_error': 'Enter password',
                'password_min_error': 'Password must be at least 6 characters',
                'confirm_password_error': 'Passwords do not match',
                'email_exists_error': 'User with this email already exists',
                'phone_exists_error': 'User with this phone number already exists',
                'register_error': 'Registration error. Please try again later.',
                'register_success': '✅ Registration successful! Redirecting to login page...'
            }
        };
        const lang = getCurrentLang();
        return translations[lang]?.[key] || defaultValue;
    }
    
    function updateAllPlaceholders() {
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const termsError = document.getElementById('termsError');
        
        if (firstNameInput) firstNameInput.placeholder = getTranslation('first_name_placeholder');
        if (lastNameInput) lastNameInput.placeholder = getTranslation('last_name_placeholder');
        if (emailInput) emailInput.placeholder = getTranslation('email_placeholder');
        if (phoneInput) phoneInput.placeholder = getTranslation('phone_placeholder');
        if (passwordInput) passwordInput.placeholder = getTranslation('password_placeholder');
        if (confirmPasswordInput) confirmPasswordInput.placeholder = getTranslation('confirm_password_placeholder');
        if (termsError) termsError.textContent = getTranslation('terms_error');
        
        console.log('🌐 Плейсхолдеры обновлены, язык:', getCurrentLang());
    }
    
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.startsWith('7') && value.length > 0) {
            value = '+' + value;
        } else if (value.startsWith('8') && value.length > 0) {
            value = value;
        } else if (value.length > 0 && !value.startsWith('+')) {
            value = '+375' + value;
        }
        
        if (value.startsWith('+375') && value.length > 4) {
            let numbers = value.substring(4).replace(/\D/g, '');
            let formatted = '+375';
            
            if (numbers.length > 0) formatted += ' (' + numbers.substring(0, 2);
            if (numbers.length > 2) formatted += ') ' + numbers.substring(2, 5);
            if (numbers.length > 5) formatted += '-' + numbers.substring(5, 7);
            if (numbers.length > 7) formatted += '-' + numbers.substring(7, 9);
            
            input.value = formatted;
        }
    }
    
    function setupPasswordToggles() {
        const toggleButtons = document.querySelectorAll('.signup-toggle-password');
        
        toggleButtons.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const targetId = this.getAttribute('data-target');
                const input = document.getElementById(targetId);
                if (input) {
                    if (input.type === 'password') {
                        input.type = 'text';
                    } else {
                        input.type = 'password';
                    }
                }
            });
        });
    }
    
    function showError(elementId, message) {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('visible');
            errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.signup-error-message').forEach(el => {
            el.classList.remove('visible');
            el.textContent = '';
        });
        document.querySelectorAll('.signup-form-group input').forEach(el => {
            el.classList.remove('error');
        });
    }
    
    function showNotification(message, isError = false) {
        const oldNotification = document.querySelector('.signup-notification');
        if (oldNotification) oldNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'signup-notification';
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
    
    function validateEmail(email) {
        return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
    }
    
    function validatePhone(phone) {
        const digits = phone.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 12;
    }
    
    function normalizePhone(phone) {
        return phone.replace(/\D/g, '');
    }
    
    async function checkUserExists(email, phone) {
        try {
            const cleanPhone = normalizePhone(phone);
            
            const [emailRes, phoneRes] = await Promise.all([
                fetch(`${API_BASE_URL}/users?email=${encodeURIComponent(email)}`),
                fetch(`${API_BASE_URL}/users?phone=${cleanPhone}`)
            ]);
            
            const emailUsers = await emailRes.json();
            const phoneUsers = await phoneRes.json();
            
            if (emailUsers.length > 0) {
                return { exists: true, field: 'email', message: getTranslation('email_exists_error') };
            }
            
            if (phoneUsers.length > 0) {
                return { exists: true, field: 'phone', message: getTranslation('phone_exists_error') };
            }
            
            return { exists: false };
        } catch (error) {
            console.error('Ошибка проверки пользователя:', error);
            return { exists: false };
        }
    }
    
    async function checkPhoneUniqueness(phone) {
        if (!phone || phone.length < 10) return true;
        
        try {
            const cleanPhone = normalizePhone(phone);
            const phoneRes = await fetch(`${API_BASE_URL}/users?phone=${cleanPhone}`);
            const phoneUsers = await phoneRes.json();
            
            if (phoneUsers.length > 0) {
                showError('phoneError', getTranslation('phone_exists_error'));
                document.getElementById('phone').classList.add('error');
                return false;
            } else {
                const phoneError = document.getElementById('phoneError');
                if (phoneError && phoneError.textContent === getTranslation('phone_exists_error')) {
                    phoneError.classList.remove('visible');
                    phoneError.textContent = '';
                }
                document.getElementById('phone').classList.remove('error');
                return true;
            }
        } catch (error) {
            console.error('Ошибка проверки телефона:', error);
            return true;
        }
    }
    
    async function saveUserToAPI(userData) {
        const cleanPhone = normalizePhone(userData.phone);
        
        const usersResponse = await fetch(`${API_BASE_URL}/users`);
        const existingUsers = await usersResponse.json();
        
        let maxId = 0;
        existingUsers.forEach(user => {
            if (user.id > maxId) maxId = user.id;
        });
        
        const nextId = maxId + 1;
        
        const newUser = {
            id: nextId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            middleName: userData.middleName || '',
            email: userData.email,
            phone: cleanPhone,
            password: userData.password,
            role: 'user',
            birthDate: '',
            address: '',
            createdAt: new Date().toISOString()
        };
        
        console.log('📤 Отправка данных на сервер:', newUser);
        
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    async function registerUser(firstName, lastName, email, phone, password) {
        const checkResult = await checkUserExists(email, phone);
        
        if (checkResult.exists) {
            return { success: false, error: checkResult.message, field: checkResult.field };
        }
        
        try {
            const savedUser = await saveUserToAPI({ firstName, lastName, email, phone, password });
            return { success: true, user: savedUser };
        } catch (apiError) {
            console.error('Ошибка сохранения пользователя:', apiError);
            return { success: false, error: getTranslation('register_error') };
        }
    }
    
    function initSignup() {
        const form = document.getElementById('signupForm');
        if (!form) {
            console.error('❌ Форма регистрации не найдена');
            return;
        }
        
        console.log('✅ Форма регистрации найдена');
        
        updateAllPlaceholders();
        
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() { 
                formatPhoneNumber(this);
            });
            
            phoneInput.addEventListener('blur', async function() {
                const phone = this.value.trim();
                if (phone && validatePhone(phone)) {
                    await checkPhoneUniqueness(phone);
                }
            });
        }
        
        const agreeTermsCheckbox = document.getElementById('agreeTerms');
        if (agreeTermsCheckbox) {
            agreeTermsCheckbox.addEventListener('change', function() {
                const termsError = document.getElementById('termsError');
                if (this.checked && termsError) {
                    termsError.classList.remove('visible');
                    termsError.textContent = '';
                }
            });
        }
        
        setupPasswordToggles();
        
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        newForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            clearErrors();
            
            let isValid = true;
            
            const firstName = document.getElementById('firstName').value.trim();
            if (!firstName) {
                showError('firstNameError', getTranslation('first_name_error'));
                document.getElementById('firstName').classList.add('error');
                isValid = false;
            } else if (firstName.length < 2) {
                showError('firstNameError', getTranslation('first_name_min_error'));
                document.getElementById('firstName').classList.add('error');
                isValid = false;
            }
            
            const lastName = document.getElementById('lastName').value.trim();
            if (!lastName) {
                showError('lastNameError', getTranslation('last_name_error'));
                document.getElementById('lastName').classList.add('error');
                isValid = false;
            } else if (lastName.length < 2) {
                showError('lastNameError', getTranslation('last_name_min_error'));
                document.getElementById('lastName').classList.add('error');
                isValid = false;
            }
            
            const email = document.getElementById('email').value.trim();
            if (!email) {
                showError('emailError', getTranslation('email_error'));
                document.getElementById('email').classList.add('error');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('emailError', getTranslation('email_invalid_error'));
                document.getElementById('email').classList.add('error');
                isValid = false;
            }
            
            const phone = document.getElementById('phone').value.trim();
            if (!phone) {
                showError('phoneError', getTranslation('phone_error'));
                document.getElementById('phone').classList.add('error');
                isValid = false;
            } else if (!validatePhone(phone)) {
                showError('phoneError', getTranslation('phone_invalid_error'));
                document.getElementById('phone').classList.add('error');
                isValid = false;
            } else {
                const isPhoneUnique = await checkPhoneUniqueness(phone);
                if (!isPhoneUnique) {
                    isValid = false;
                }
            }
            
            const password = document.getElementById('password').value;
            if (!password) {
                showError('passwordError', getTranslation('password_error'));
                document.getElementById('password').classList.add('error');
                isValid = false;
            } else if (password.length < 6) {
                showError('passwordError', getTranslation('password_min_error'));
                document.getElementById('password').classList.add('error');
                isValid = false;
            }
            
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                showError('confirmPasswordError', getTranslation('confirm_password_error'));
                document.getElementById('confirmPassword').classList.add('error');
                isValid = false;
            }
            
            const agreeTerms = document.getElementById('agreeTerms').checked;
            if (!agreeTerms) {
                showError('termsError', getTranslation('terms_error'));
                document.getElementById('agreeTerms').scrollIntoView({ behavior: 'smooth', block: 'center' });
                isValid = false;
            }
            
            if (isValid) {
                const submitBtn = newForm.querySelector('button[type="submit"]');
                const originalText = submitBtn?.textContent || (getCurrentLang() === 'ru' ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'SIGN UP');
                if (submitBtn) {
                    submitBtn.textContent = getCurrentLang() === 'ru' ? 'Регистрация...' : 'Registering...';
                    submitBtn.disabled = true;
                }
                
                const result = await registerUser(firstName, lastName, email, phone, password);
                
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
                
                if (result.success) {
                    console.log('✅ Регистрация успешна!');
                    
                    showNotification(getTranslation('register_success'));
                    
                    setTimeout(() => {
                        const isInPages = window.location.pathname.includes('/pages/');
                        const redirectUrl = isInPages ? 'login.html' : 'pages/login.html';
                        
                        console.log('🔄 Перенаправление на страницу входа:', redirectUrl);
                        window.location.href = redirectUrl;
                    }, 2000);
                } else {
                    if (result.field === 'email') {
                        showError('emailError', result.error);
                        document.getElementById('email').classList.add('error');
                    } else if (result.field === 'phone') {
                        showError('phoneError', result.error);
                        document.getElementById('phone').classList.add('error');
                    } else {
                        showError('emailError', result.error);
                    }
                    showNotification('❌ ' + result.error, true);
                }
            }
        });
        
        setTimeout(() => {
            setupPasswordToggles();
        }, 100);
    }
    
    document.addEventListener('languageChanged', function() {
        console.log('🌐 Смена языка на странице регистрации');
        updateAllPlaceholders();
        
        const submitBtn = document.querySelector('#signupForm button[type="submit"]');
        if (submitBtn && !submitBtn.disabled) {
            submitBtn.textContent = getCurrentLang() === 'ru' ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'SIGN UP';
        }
    });
    
    if (!document.querySelector('#signup-styles')) {
        const style = document.createElement('style');
        style.id = 'signup-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSignup);
    } else {
        initSignup();
    }
})();