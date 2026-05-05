(function() {
    const API_BASE_URL = 'http://localhost:3000';
    
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
        document.querySelectorAll('.signup-toggle-password').forEach(btn => {
            btn.addEventListener('click', function() {
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
    
    async function checkUserExists(email, phone) {
        try {
            const cleanPhone = phone.replace(/\D/g, '');
            
            const [emailRes, phoneRes] = await Promise.all([
                fetch(`${API_BASE_URL}/users?email=${encodeURIComponent(email)}`),
                fetch(`${API_BASE_URL}/users?phone=${cleanPhone}`)
            ]);
            
            const emailUsers = await emailRes.json();
            const phoneUsers = await phoneRes.json();
            
            if (emailUsers.length > 0) {
                return { exists: true, field: 'email', message: 'Пользователь с таким email уже существует' };
            }
            
            if (phoneUsers.length > 0) {
                return { exists: true, field: 'phone', message: 'Пользователь с таким номером телефона уже существует' };
            }
            
            return { exists: false };
        } catch (error) {
            console.error('Ошибка проверки пользователя:', error);
            return { exists: false };
        }
    }
    
    async function saveUserToAPI(userData) {
        const cleanPhone = userData.phone.replace(/\D/g, '');
        
        const newUser = {
            id: Date.now(),
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
            return { success: false, error: 'Ошибка при регистрации. Попробуйте позже.' };
        }
    }
    
    function initSignup() {
        const form = document.getElementById('signupForm');
        if (!form) return;
        
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() { formatPhoneNumber(this); });
        }
        
        setupPasswordToggles();
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            clearErrors();
            
            let isValid = true;
            
            const firstName = document.getElementById('firstName').value.trim();
            if (!firstName) {
                showError('firstNameError', 'Введите имя');
                document.getElementById('firstName').classList.add('error');
                isValid = false;
            } else if (firstName.length < 2) {
                showError('firstNameError', 'Имя должно содержать минимум 2 символа');
                document.getElementById('firstName').classList.add('error');
                isValid = false;
            }
            
            const lastName = document.getElementById('lastName').value.trim();
            if (!lastName) {
                showError('lastNameError', 'Введите фамилию');
                document.getElementById('lastName').classList.add('error');
                isValid = false;
            } else if (lastName.length < 2) {
                showError('lastNameError', 'Фамилия должна содержать минимум 2 символа');
                document.getElementById('lastName').classList.add('error');
                isValid = false;
            }
            
            const email = document.getElementById('email').value.trim();
            if (!email) {
                showError('emailError', 'Введите email');
                document.getElementById('email').classList.add('error');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('emailError', 'Введите корректный email');
                document.getElementById('email').classList.add('error');
                isValid = false;
            }
            
            const phone = document.getElementById('phone').value.trim();
            if (!phone) {
                showError('phoneError', 'Введите номер телефона');
                document.getElementById('phone').classList.add('error');
                isValid = false;
            } else if (!validatePhone(phone)) {
                showError('phoneError', 'Введите корректный номер телефона');
                document.getElementById('phone').classList.add('error');
                isValid = false;
            }
            
            const password = document.getElementById('password').value;
            if (!password) {
                showError('passwordError', 'Введите пароль');
                document.getElementById('password').classList.add('error');
                isValid = false;
            } else if (password.length < 6) {
                showError('passwordError', 'Пароль должен содержать минимум 6 символов');
                document.getElementById('password').classList.add('error');
                isValid = false;
            }
            
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                showError('confirmPasswordError', 'Пароли не совпадают');
                document.getElementById('confirmPassword').classList.add('error');
                isValid = false;
            }
            
            if (!document.getElementById('agreeTerms').checked) {
                showError('termsError', 'Необходимо согласиться с условиями использования');
                isValid = false;
            }
            
            if (isValid) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn?.textContent || 'ЗАРЕГИСТРИРОВАТЬСЯ';
                if (submitBtn) {
                    submitBtn.textContent = 'Регистрация...';
                    submitBtn.disabled = true;
                }
                
                const result = await registerUser(firstName, lastName, email, phone, password);
                
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
                
                if (result.success) {
                    showNotification('✅ Регистрация успешна! Перенаправление на страницу входа...');
                    
                    setTimeout(() => {
                        window.location.href = 'login.html';
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
    }
    
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