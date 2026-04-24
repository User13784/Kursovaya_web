(function() {
    // Хранение временных данных
    let tempResetData = {
        userIdentifier: null,
        verificationCode: null,
        userId: null
    };

    // Переключение видимости пароля
    function setupPasswordToggles() {
        document.querySelectorAll('.forgot-toggle-password').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const input = document.getElementById(targetId);
                if (input) {
                    input.type = input.type === 'password' ? 'text' : 'password';
                }
            });
        });
    }

    // Показать ошибку
    function showError(elementId, message) {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('visible');
        }
    }

    // Очистить ошибки
    function clearErrors() {
        document.querySelectorAll('.forgot-error-message').forEach(el => {
            el.classList.remove('visible');
            el.textContent = '';
        });
        document.querySelectorAll('.forgot-form-group input').forEach(el => {
            el.classList.remove('error');
        });
    }

    // Показать уведомление
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
        }, 3000);
    }

    // Генерация случайного 6-значного кода
    function generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Отправка кода (имитация)
    function sendVerificationCode(identifier) {
        const code = generateVerificationCode();
        tempResetData.verificationCode = code;
        
        // В реальном проекте здесь был бы запрос на сервер для отправки SMS/Email
        console.log('Код подтверждения:', code);
        
        // Показываем код в уведомлении для демо-режима
        showNotification(`📧 Демо-режим: Ваш код подтверждения - ${code}`, false);
        
        return true;
    }

    // Поиск пользователя по email или телефону
    function findUserByIdentifier(identifier) {
        const users = JSON.parse(localStorage.getItem('dental_club_users') || '[]');
        const cleanIdentifier = identifier.replace(/\D/g, '');
        
        return users.find(u => 
            u.email === identifier || u.phone === cleanIdentifier
        );
    }

    // Обновление пароля пользователя
    function updateUserPassword(userId, newPassword) {
        let users = JSON.parse(localStorage.getItem('dental_club_users') || '[]');
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            users[userIndex].passwordUpdatedAt = new Date().toISOString();
            localStorage.setItem('dental_club_users', JSON.stringify(users));
            return true;
        }
        
        return false;
    }

    // Переключение между формами
    function showForm(formNumber) {
        const form1 = document.getElementById('forgotForm');
        const form2 = document.getElementById('verifyCodeForm');
        const form3 = document.getElementById('resetPasswordForm');
        
        if (form1) form1.style.display = formNumber === 1 ? 'flex' : 'none';
        if (form2) form2.style.display = formNumber === 2 ? 'flex' : 'none';
        if (form3) form3.style.display = formNumber === 3 ? 'flex' : 'none';
    }

    // Инициализация формы восстановления
    function initForgotPassword() {
        const forgotForm = document.getElementById('forgotForm');
        const verifyForm = document.getElementById('verifyCodeForm');
        const resetForm = document.getElementById('resetPasswordForm');
        
        if (!forgotForm) return;
        
        setupPasswordToggles();
        
        // Шаг 1: Отправка email/телефона
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();
            
            const identifier = document.getElementById('resetEmail').value.trim();
            
            if (!identifier) {
                showError('resetEmailError', 'Введите email или номер телефона');
                document.getElementById('resetEmail').classList.add('error');
                return;
            }
            
            // Проверяем, существует ли пользователь
            const user = findUserByIdentifier(identifier);
            
            if (!user) {
                showError('resetEmailError', 'Пользователь с таким email/телефоном не найден');
                document.getElementById('resetEmail').classList.add('error');
                return;
            }
            
            // Сохраняем данные пользователя
            tempResetData.userIdentifier = identifier;
            tempResetData.userId = user.id;
            
            // Отправляем код подтверждения
            sendVerificationCode(identifier);
            
            // Переключаем на форму ввода кода
            showForm(2);
            
            // Инициализируем поля ввода кода
            initCodeInputs();
        });
        
        // Шаг 2: Проверка кода
        if (verifyForm) {
            verifyForm.addEventListener('submit', function(e) {
                e.preventDefault();
                clearErrors();
                
                // Собираем код из полей
                const digits = document.querySelectorAll('.code-digit');
                let enteredCode = '';
                digits.forEach(digit => {
                    enteredCode += digit.value;
                });
                
                if (enteredCode.length !== 6) {
                    showError('codeError', 'Введите полный 6-значный код');
                    return;
                }
                
                if (enteredCode !== tempResetData.verificationCode) {
                    showError('codeError', 'Неверный код подтверждения');
                    return;
                }
                
                // Код верный, переключаем на форму смены пароля
                showForm(3);
            });
        }
        
        // Шаг 3: Установка нового пароля
        if (resetForm) {
            resetForm.addEventListener('submit', function(e) {
                e.preventDefault();
                clearErrors();
                
                let isValid = true;
                
                const newPassword = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmNewPassword').value;
                
                if (!newPassword) {
                    showError('newPasswordError', 'Введите новый пароль');
                    document.getElementById('newPassword').classList.add('error');
                    isValid = false;
                } else if (newPassword.length < 6) {
                    showError('newPasswordError', 'Пароль должен содержать минимум 6 символов');
                    document.getElementById('newPassword').classList.add('error');
                    isValid = false;
                }
                
                if (!confirmPassword) {
                    showError('confirmNewPasswordError', 'Подтвердите новый пароль');
                    document.getElementById('confirmNewPassword').classList.add('error');
                    isValid = false;
                } else if (newPassword !== confirmPassword) {
                    showError('confirmNewPasswordError', 'Пароли не совпадают');
                    document.getElementById('confirmNewPassword').classList.add('error');
                    isValid = false;
                }
                
                if (isValid) {
                    const success = updateUserPassword(tempResetData.userId, newPassword);
                    
                    if (success) {
                        showNotification('✅ Пароль успешно изменен! Перенаправление на страницу входа...');
                        
                        // Очищаем временные данные
                        tempResetData = {
                            userIdentifier: null,
                            verificationCode: null,
                            userId: null
                        };
                        
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 2000);
                    } else {
                        showNotification('❌ Ошибка при смене пароля. Попробуйте позже.', true);
                    }
                }
            });
        }
        
        // Кнопка повторной отправки кода
        const resendBtn = document.getElementById('resendCodeBtn');
        if (resendBtn) {
            resendBtn.addEventListener('click', function() {
                if (tempResetData.userIdentifier) {
                    sendVerificationCode(tempResetData.userIdentifier);
                    showNotification('🔄 Новый код отправлен!', false);
                }
            });
        }
    }
    
    // Инициализация полей ввода кода с авто-переключением
    function initCodeInputs() {
        const digits = document.querySelectorAll('.code-digit');
        
        digits.forEach((input, index) => {
            input.value = '';
            
            input.addEventListener('input', function(e) {
                if (this.value.length === 1 && index < digits.length - 1) {
                    digits[index + 1].focus();
                }
            });
            
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                    digits[index - 1].focus();
                }
            });
            
            input.addEventListener('paste', function(e) {
                e.preventDefault();
                const paste = (e.clipboardData || window.clipboardData).getData('text');
                const pasteDigits = paste.replace(/\D/g, '').split('').slice(0, 6);
                
                pasteDigits.forEach((digit, i) => {
                    if (digits[i]) {
                        digits[i].value = digit;
                    }
                });
                
                if (pasteDigits.length === 6) {
                    digits[5].focus();
                } else if (pasteDigits.length > 0) {
                    digits[pasteDigits.length - 1].focus();
                }
            });
        });
    }
    
    // Добавляем стили для анимации уведомлений
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
    
    // Запуск после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initForgotPassword);
    } else {
        initForgotPassword();
    }
})();