const STORAGE_KEYS = {
    LANGUAGE: 'dental_language',
    THEME: 'dental_theme',
    ACCESSIBILITY: 'dental_accessibility',
    SESSION: 'dental_club_session',
    SAVED_EMAIL: 'dental_club_saved_email',
    UI_SETTINGS: 'dental_ui_settings'
};

function getLanguage() {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';
}

function setLanguage(lang) {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }
}

function getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
}

function setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
}

function getAccessibility() {
    return localStorage.getItem(STORAGE_KEYS.ACCESSIBILITY) || 'default';
}

function setAccessibility(mode) {
    localStorage.setItem(STORAGE_KEYS.ACCESSIBILITY, mode);
    document.documentElement.setAttribute('data-accessibility', mode);
}

function saveSession(user, rememberMe) {
    const session = {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        loginTime: new Date().toISOString()
    };
    
    if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } else {
        sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    }
}

function getSession() {
    let session = sessionStorage.getItem(STORAGE_KEYS.SESSION);
    if (!session) session = localStorage.getItem(STORAGE_KEYS.SESSION);
    return session ? JSON.parse(session) : null;
}

function clearSession() {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
}

function getUISettings() {
    const settings = localStorage.getItem(STORAGE_KEYS.UI_SETTINGS);
    return settings ? JSON.parse(settings) : {};
}

function setUISettings(settings) {
    localStorage.setItem(STORAGE_KEYS.UI_SETTINGS, JSON.stringify(settings));
}

function saveEmail(email) {
    if (email) {
        localStorage.setItem(STORAGE_KEYS.SAVED_EMAIL, email);
    } else {
        localStorage.removeItem(STORAGE_KEYS.SAVED_EMAIL);
    }
}

function getSavedEmail() {
    return localStorage.getItem(STORAGE_KEYS.SAVED_EMAIL) || '';
}

function resetAllSettings() {
    localStorage.removeItem(STORAGE_KEYS.LANGUAGE);
    localStorage.removeItem(STORAGE_KEYS.THEME);
    localStorage.removeItem(STORAGE_KEYS.ACCESSIBILITY);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    localStorage.removeItem(STORAGE_KEYS.SAVED_EMAIL);
    localStorage.removeItem(STORAGE_KEYS.UI_SETTINGS);
    
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    
    setLanguage('ru');
    setTheme('light');
    setAccessibility('default');
    
    location.reload();
}