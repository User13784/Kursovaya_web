(function() {
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.startsWith('7') && value.length > 0) {
            value = '+' + value;
        } else if (value.startsWith('8') && value.length > 0) {
            value = value;
        } else if (value.length > 0 && !value.startsWith('+')) {
            value = '+7' + value;
        }
        
        if (value.startsWith('+7') && value.length > 3) {
            let numbers = value.substring(2).replace(/\D/g, '');
            let formatted = '+7';
            
            if (numbers.length > 0) formatted += ' (' + numbers.substring(0, 3);
            if (numbers.length > 3) formatted += ') ' + numbers.substring(3, 6);
            if (numbers.length > 6) formatted += '-' + numbers.substring(6, 8);
            if (numbers.length > 8) formatted += '-' + numbers.substring(8, 10);
            
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
        const notification = document.createElement('div');
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
        }, 2500);
    }

    function validateEmail(email) {
        return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        const digits = phone.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 12;
    }

    function saveUser(userData) {
        let users = JSON.parse(localStorage.getItem('dental_club_users') || '[]');
        
        if (users.find(u => u.email === userData.email)) {
            return { success: false, error: 'Пользователь с таким email уже существует' };
        }
        
        if (users.find(u => u.phone === userData.phone)) {
            return { success: false, error: 'Пользователь с таким номером телефона уже существует' };
        }
        
        const newUser = {
            id: Date.now(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone.replace(/\D/g, ''),
            password: userData.password,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('dental_club_users', JSON.stringify(users));
        
        return { success: true, user: newUser };
    }

    function initSignup() {
        const form = document.getElementById('signupForm');
        if (!form) return;
        
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() { formatPhoneNumber(this); });
        }
        
        setupPasswordToggles();
        
        form.addEventListener('submit', function(e) {
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
            } else if (firstName.length > 50) {
                showError('firstNameError', 'Имя не должно превышать 50 символов');
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
            } else if (lastName.length > 50) {
                showError('lastNameError', 'Фамилия не должна превышать 50 символов');
                document.getElementById('lastName').classList.add('error');
                isValid = false;
            }
            
            const email = document.getElementById('email').value.trim();
            if (!email) {
                showError('emailError', 'Введите email');
                document.getElementById('email').classList.add('error');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('emailError', 'Введите корректный email (example@mail.com)');
                document.getElementById('email').classList.add('error');
                isValid = false;
            }
            
            const phone = document.getElementById('phone').value.trim();
            if (!phone) {
                showError('phoneError', 'Введите номер телефона');
                document.getElementById('phone').classList.add('error');
                isValid = false;
            } else if (!validatePhone(phone)) {
                showError('phoneError', 'Введите корректный номер телефона (например, +7 777 123 45 67)');
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
            } else if (password.length > 100) {
                showError('passwordError', 'Пароль не должен превышать 100 символов');
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
                const result = saveUser({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password
                });
                
                if (result.success) {
                    showNotification('✅ Регистрация успешна! Перенаправление на страницу входа...');
                    
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                } else {
                    showError('emailError', result.error);
                    document.getElementById('email').classList.add('error');
                    showNotification('❌ ' + result.error, true);
                }
            }
        });
    }
    
    const style = document.createElement('style');
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
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSignup);
    } else {
        initSignup();
    }
})();