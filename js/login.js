(function() {
    function setupPasswordToggles() {
        document.querySelectorAll('.login-toggle-password').forEach(btn => {
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
        document.querySelectorAll('.login-error-message').forEach(el => {
            el.classList.remove('visible');
            el.textContent = '';
        });
        document.querySelectorAll('.login-form-group input').forEach(el => {
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

    function findUser(login, password) {
        const users = JSON.parse(localStorage.getItem('dental_club_users') || '[]');
        const cleanLogin = login.replace(/\D/g, '');
        
        return users.find(u => 
            (u.email === login || u.phone === cleanLogin) && u.password === password
        );
    }

    function saveSession(user, rememberMe) {
        const session = {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            loginTime: new Date().toISOString()
        };
        
        if (rememberMe) {
            localStorage.setItem('dental_club_session', JSON.stringify(session));
        } else {
            sessionStorage.setItem('dental_club_session', JSON.stringify(session));
        }
    }

    function initLogin() {
        const form = document.getElementById('loginForm');
        if (!form) return;
        
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
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();
            
            const login = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            let isValid = true;
            
            if (!login) {
                showError('loginEmailError', 'Введите email или номер телефона');
                document.getElementById('loginEmail').classList.add('error');
                isValid = false;
            }
            
            if (!password) {
                showError('loginPasswordError', 'Введите пароль');
                document.getElementById('loginPassword').classList.add('error');
                isValid = false;
            } else if (password.length < 6) {
                showError('loginPasswordError', 'Неверный пароль');
                document.getElementById('loginPassword').classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                const user = findUser(login, password);
                
                if (user) {
                    saveSession(user, rememberMe);
                    
                    if (rememberMe) {
                        localStorage.setItem('dental_club_saved_email', login);
                    } else {
                        localStorage.removeItem('dental_club_saved_email');
                    }
                    
                    showNotification('✅ Вход выполнен успешно! Перенаправление...');
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    showError('loginPasswordError', 'Неверный email/телефон или пароль');
                    document.getElementById('loginPassword').classList.add('error');
                    showNotification('❌ Неверный email/телефон или пароль', true);
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
        document.addEventListener('DOMContentLoaded', initLogin);
    } else {
        initLogin();
    }
})();