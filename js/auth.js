let cachedUser = null;

function getCurrentUser() {
    if (cachedUser) return cachedUser;
    
    try {
        let session = localStorage.getItem('dental_club_session');
        if (!session) {
            session = sessionStorage.getItem('dental_club_session');
        }
        if (session) {
            cachedUser = JSON.parse(session);
            return cachedUser;
        }
    } catch(e) {
        console.error('Ошибка получения пользователя:', e);
    }
    return null;
}

function saveSession(user, rememberMe) {
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
    
    if (!rememberMe) {
        sessionStorage.setItem('dental_club_session', JSON.stringify(session));
    } else {
        sessionStorage.removeItem('dental_club_session');
    }
    
    cachedUser = session;
    console.log('✅ Сессия сохранена, пользователь:', user.email, 'Роль:', user.role);
    
    setTimeout(() => {
        if (typeof window.updateAuthUI === 'function') {
            window.updateAuthUI();
        }
    }, 100);
}

function clearSession() {
    sessionStorage.removeItem('dental_club_session');
    localStorage.removeItem('dental_club_session');
    cachedUser = null;
    console.log('👋 Сессия очищена');
}

function getInitials(firstName, lastName) {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last;
}

function updateAuthUI() {
    const user = getCurrentUser();
    const loginContainer = document.getElementById('desktopLoginContainer');
    const mobileLoginContainer = document.getElementById('mobileLoginContainer');
    const currentLang = localStorage.getItem('dental_language') || 'ru';
    
    console.log('🔄 updateAuthUI вызван, пользователь:', user ? user.email : 'не авторизован', 'язык:', currentLang);
    
    if (!loginContainer) return;
    
    if (user && user.firstName) {
        const initials = getInitials(user.firstName, user.lastName);
        
        loginContainer.innerHTML = '';
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'user-avatar-btn';
        avatarDiv.id = 'userAvatarBtn';
        avatarDiv.style.cssText = 'display: flex; align-items: center; gap: 10px; cursor: pointer;';
        avatarDiv.innerHTML = `
            <div class="avatar-circle" style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #A5C33C, #7A9A2E); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 16px;">${initials}</div>
            <span class="avatar-name" style="color: white; font-size: 14px;">${user.firstName}</span>
            ${user.role === 'admin' ? '<span style="background: #EF4444; color: white; font-size: 10px; padding: 2px 8px; border-radius: 20px; margin-left: 5px;">ADMIN</span>' : ''}
        `;
        
        avatarDiv.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof window.openProfileModal === 'function') {
                window.openProfileModal();
            }
        });
        loginContainer.appendChild(avatarDiv);
        
        if (mobileLoginContainer) {
            mobileLoginContainer.innerHTML = '';
            const mobileAvatar = document.createElement('div');
            mobileAvatar.className = 'mobile-user-avatar';
            mobileAvatar.id = 'mobileUserAvatar';
            mobileAvatar.style.cssText = 'display: flex; align-items: center; gap: 12px; padding: 12px 0; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.2);';
            mobileAvatar.innerHTML = `
                <div class="mobile-avatar-circle" style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #A5C33C, #7A9A2E); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 18px;">${initials}</div>
                <div class="mobile-avatar-info" style="flex: 1;">
                    <div class="mobile-avatar-name" style="color: white; font-size: 16px; font-weight: 500;">${user.firstName} ${user.lastName || ''}</div>
                    <div class="mobile-avatar-email" style="color: rgba(255,255,255,0.6); font-size: 12px;">${user.email || ''}</div>
                    ${user.role === 'admin' ? '<div style="background: #EF4444; color: white; font-size: 10px; padding: 2px 8px; border-radius: 20px; display: inline-block; margin-top: 4px;">ADMIN</div>' : ''}
                </div>
            `;
            mobileAvatar.addEventListener('click', function(e) {
                e.preventDefault();
                if (typeof window.openProfileModal === 'function') {
                    window.openProfileModal();
                }
            });
            mobileLoginContainer.appendChild(mobileAvatar);
        }
        
        console.log('✅ UI обновлен - показан аватар');
    } else {
        loginContainer.innerHTML = '';
        const loginLink = document.createElement('a');
        loginLink.href = '#';
        loginLink.className = 'login-link';
        loginLink.id = 'desktopLoginLink';
        loginLink.setAttribute('data-translate', 'login');
        loginLink.textContent = currentLang === 'ru' ? 'ВОЙТИ' : 'LOGIN';
        loginLink.style.cssText = 'text-decoration: none; color: white; font-size: 18px;';
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isInPages = window.location.pathname.includes('/pages/');
            window.location.href = isInPages ? 'login.html' : 'pages/login.html';
        });
        loginContainer.appendChild(loginLink);
        
        if (mobileLoginContainer) {
            mobileLoginContainer.innerHTML = '';
            const mobileLink = document.createElement('a');
            mobileLink.href = '#';
            mobileLink.className = 'mobile-login-link';
            mobileLink.setAttribute('data-translate', 'login');
            mobileLink.textContent = currentLang === 'ru' ? 'ВОЙТИ' : 'LOGIN';
            mobileLink.style.cssText = 'text-decoration: none; color: white; font-size: 18px;';
            mobileLink.addEventListener('click', function(e) {
                e.preventDefault();
                const isInPages = window.location.pathname.includes('/pages/');
                window.location.href = isInPages ? 'login.html' : 'pages/login.html';
            });
            mobileLoginContainer.appendChild(mobileLink);
        }
        
        console.log('✅ UI обновлен - показана кнопка ВОЙТИ с текстом:', loginLink.textContent);
    }
}

window.getCurrentUser = getCurrentUser;
window.saveSession = saveSession;
window.clearSession = clearSession;
window.updateAuthUI = updateAuthUI;

function initAuth() {
    console.log('🚀 auth.js инициализация');
    updateAuthUI();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}

window.addEventListener('storage', function(e) {
    if (e.key === 'dental_club_session') {
        console.log('🔄 Сессия изменена в другой вкладке');
        cachedUser = null;
        updateAuthUI();
    }
});

document.addEventListener('languageChanged', function() {
    console.log('🌐 languageChanged в auth.js, обновляем UI');
    updateAuthUI();
});