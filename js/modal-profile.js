let currentUserData = null;

let savedModalState = {
    isOpen: false,
    activeTab: 'info',
    scrollPosition: 0
};

function saveModalStateBeforeReload() {
    const modal = document.getElementById('profileModal');
    if (modal && modal.style.display === 'flex') {
        savedModalState.isOpen = true;
        const activeTabBtn = document.querySelector('.profile-tab-btn.active');
        savedModalState.activeTab = activeTabBtn ? activeTabBtn.dataset.tab : 'info';
        savedModalState.scrollPosition = window.scrollY;
        sessionStorage.setItem('profileModalState', JSON.stringify(savedModalState));
        console.log('💾 Состояние модального окна сохранено:', savedModalState);
    }
}

function restoreModalStateAfterReload() {
    const savedState = sessionStorage.getItem('profileModalState');
    if (savedState) {
        const state = JSON.parse(savedState);
        if (state.isOpen) {
            console.log('🔄 Восстанавливаем модальное окно после перезагрузки');
            sessionStorage.removeItem('profileModalState');
            
            setTimeout(() => {
                openProfileModal();
                setTimeout(() => {
                    if (state.activeTab !== 'info') {
                        const tabToActivate = document.querySelector(`.profile-tab-btn[data-tab="${state.activeTab}"]`);
                        if (tabToActivate) {
                            tabToActivate.click();
                        }
                    }
                    window.scrollTo(0, state.scrollPosition);
                }, 300);
            }, 100);
        }
    }
}

window.addEventListener('beforeunload', saveModalStateBeforeReload);

document.addEventListener('DOMContentLoaded', restoreModalStateAfterReload);


function getValidationText(key, defaultValue = '') {
    const currentLang = localStorage.getItem('dental_language') || 'ru';
    const translations = {
        ru: {
            'profile_validation_last_name_required': 'Введите фамилию',
            'profile_validation_last_name_min': 'Фамилия должна содержать минимум 2 символа',
            'profile_validation_first_name_required': 'Введите имя',
            'profile_validation_first_name_min': 'Имя должно содержать минимум 2 символа',
            'profile_validation_email_required': 'Введите email',
            'profile_validation_email_invalid': 'Введите корректный email (например: name@domain.com)',
            'profile_validation_phone_required': 'Введите номер телефона',
            'profile_validation_phone_invalid': 'Введите корректный номер телефона (например: +375 29 123-45-67)',
            'profile_validation_birth_date_invalid': 'Введите корректную дату в формате ДД.ММ.ГГГГ',
            'profile_validation_birth_date_future': 'Дата рождения не может быть в будущем',
            'profile_validation_birth_date_too_old': 'Дата рождения не может быть ранее 1900 года',
            'profile_validation_email_exists': '❌ Пользователь с таким email уже существует!',
            'profile_validation_phone_exists': '❌ Пользователь с таким номером телефона уже существует!',
            'profile_validation_form_errors': 'Пожалуйста, исправьте ошибки в форме'
        },
        en: {
            'profile_validation_last_name_required': 'Enter your last name',
            'profile_validation_last_name_min': 'Last name must contain at least 2 characters',
            'profile_validation_first_name_required': 'Enter your first name',
            'profile_validation_first_name_min': 'First name must contain at least 2 characters',
            'profile_validation_email_required': 'Enter email',
            'profile_validation_email_invalid': 'Enter a valid email (e.g., name@domain.com)',
            'profile_validation_phone_required': 'Enter phone number',
            'profile_validation_phone_invalid': 'Enter a valid phone number (e.g., +375 29 123-45-67)',
            'profile_validation_birth_date_invalid': 'Enter a valid date in DD.MM.YYYY format',
            'profile_validation_birth_date_future': 'Birth date cannot be in the future',
            'profile_validation_birth_date_too_old': 'Birth date cannot be earlier than 1900',
            'profile_validation_email_exists': '❌ User with this email already exists!',
            'profile_validation_phone_exists': '❌ User with this phone number already exists!',
            'profile_validation_form_errors': 'Please fix the errors in the form'
        }
    };
    return translations[currentLang]?.[key] || defaultValue;
}

function validateEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, '');
    const isValidLength = digits.length === 12;
    const startsWith375 = digits.startsWith('375');
    
    if (isValidLength && startsWith375) {
        return true;
    }
    
    if (digits.length >= 9 && digits.length <= 12) {
        return true;
    }
    
    return false;
}

function validateBirthDate(dateString) {
    if (!dateString) return true; 
    
    const parts = dateString.split('.');
    if (parts.length !== 3) return false;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    
    const currentYear = new Date().getFullYear();
    if (year < 1900) return false;
    if (year > currentYear) return false;
    
    const selectedDate = new Date(year, month, day);
    if (selectedDate.getFullYear() !== year || 
        selectedDate.getMonth() !== month || 
        selectedDate.getDate() !== day) {
        return false;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate > today) return false;
    
    return true;
}

function formatPhoneForDisplay(phone) {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    
    if (digits.length === 12 && digits.startsWith('375')) {
        return `+375 (${digits.substring(3, 5)}) ${digits.substring(5, 8)}-${digits.substring(8, 10)}-${digits.substring(10, 12)}`;
    }
    
    if (digits.length === 11) {
        return `+${digits.substring(0, 1)} (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
    }
    
    return phone;
}

function formatPhoneForSave(phone) {
    if (!phone) return '';
    return phone.replace(/\D/g, '');
}

function formatDateForDisplay(dateString) {
    if (!dateString) return '';
    if (dateString.includes('.')) return dateString;
    const parts = dateString.split('-');
    if (parts.length === 3) {
        return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return dateString;
}

function formatDateForSave(dateString) {
    if (!dateString) return '';
    if (dateString.includes('.')) {
        const parts = dateString.split('.');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    }
    return dateString;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const oldError = field.parentNode.querySelector('.field-error');
    if (oldError) oldError.remove();
    
    field.classList.add('error');
    field.style.borderColor = '#EF4444';
    
    const errorSpan = document.createElement('span');
    errorSpan.className = 'field-error';
    errorSpan.textContent = message;
    errorSpan.style.cssText = 'display: block; font-size: 12px; color: #EF4444; margin-top: 5px;';
    field.parentNode.appendChild(errorSpan);
}

function hideFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const error = field.parentNode.querySelector('.field-error');
    if (error) error.remove();
    
    field.classList.remove('error');
    field.style.borderColor = '';
}

function validateProfileForm() {
    let isValid = true;
    
    const lastName = document.getElementById('profileLastName').value.trim();
    const firstName = document.getElementById('profileFirstName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    const birthDate = document.getElementById('profileBirthDate').value.trim();
    
    if (!lastName) {
        showFieldError('profileLastName', getValidationText('profile_validation_last_name_required'));
        isValid = false;
    } else if (lastName.length < 2) {
        showFieldError('profileLastName', getValidationText('profile_validation_last_name_min'));
        isValid = false;
    } else {
        hideFieldError('profileLastName');
    }
    
    if (!firstName) {
        showFieldError('profileFirstName', getValidationText('profile_validation_first_name_required'));
        isValid = false;
    } else if (firstName.length < 2) {
        showFieldError('profileFirstName', getValidationText('profile_validation_first_name_min'));
        isValid = false;
    } else {
        hideFieldError('profileFirstName');
    }
    
    if (!email) {
        showFieldError('profileEmail', getValidationText('profile_validation_email_required'));
        isValid = false;
    } else if (!validateEmail(email)) {
        showFieldError('profileEmail', getValidationText('profile_validation_email_invalid'));
        isValid = false;
    } else {
        hideFieldError('profileEmail');
    }
    
    if (!phone) {
        showFieldError('profilePhone', getValidationText('profile_validation_phone_required'));
        isValid = false;
    } else if (!validatePhone(phone)) {
        showFieldError('profilePhone', getValidationText('profile_validation_phone_invalid'));
        isValid = false;
    } else {
        hideFieldError('profilePhone');
    }
    
    if (birthDate && !validateBirthDate(birthDate)) {
        const parts = birthDate.split('.');
        if (parts.length === 3) {
            const year = parseInt(parts[2], 10);
            const currentYear = new Date().getFullYear();
            if (year > currentYear) {
                showFieldError('profileBirthDate', getValidationText('profile_validation_birth_date_future'));
            } else if (year < 1900) {
                showFieldError('profileBirthDate', getValidationText('profile_validation_birth_date_too_old'));
            } else {
                showFieldError('profileBirthDate', getValidationText('profile_validation_birth_date_invalid'));
            }
        } else {
            showFieldError('profileBirthDate', getValidationText('profile_validation_birth_date_invalid'));
        }
        isValid = false;
    } else {
        hideFieldError('profileBirthDate');
    }
    
    return isValid;
}

function showToast(message, type = 'success') {
    let toast = document.querySelector('.profile-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'profile-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #2F353B;
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 14px;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10010;
            max-width: 350px;
            word-wrap: break-word;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: 'Mulish', sans-serif;
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.background = type === 'error' ? '#EF4444' : '#10B981';
    toast.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
    }, 3000);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function getProfileTranslation(key, defaultValue = '') {
    if (typeof window.translate === 'function') {
        const translated = window.translate(key);
        if (translated && translated !== key) {
            return translated;
        }
    }
    return defaultValue;
}

function applyDateMask(input) {
    if (!input || input.type !== 'text') return;
    
    input.addEventListener('input', function(e) {
        let value = this.value.replace(/[^\d]/g, '');
        if (value.length >= 2 && value.length < 4) {
            value = value.substring(0, 2) + '.' + value.substring(2);
        } else if (value.length >= 4 && value.length < 6) {
            value = value.substring(0, 2) + '.' + value.substring(2, 4) + '.' + value.substring(4);
        } else if (value.length >= 6) {
            value = value.substring(0, 2) + '.' + value.substring(2, 4) + '.' + value.substring(4, 8);
        }
        this.value = value;
    });
}

function updateProfileModalTranslations() {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    
    const currentLang = localStorage.getItem('dental_language') || 'ru';
    
    function getCleanTranslation(key) {
        let translated = getProfileTranslation(key);
        if (!translated) return '';
        return translated.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}]+\s*/u, '');
    }
    
    function extractEmoji(text) {
        const emojiMatch = text.match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}]/u);
        return emojiMatch ? emojiMatch[0] : '';
    }
    
    modal.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (el.classList && (el.classList.contains('profile-tab-btn') ||
            el.classList.contains('visits-filter-btn') ||
            el.classList.contains('reviews-filter-btn') ||
            el.id === 'profileEditBtn' ||
            el.id === 'profileLogoutBtn' ||
            el.id === 'goToAdminPanelBtn')) {
            return;
        }
        
        const translated = getProfileTranslation(key);
        if (translated && translated !== key) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = translated;
                }
            } else if (el.tagName === 'BUTTON') {
                el.textContent = translated;
            } else {
                el.textContent = translated;
            }
        }
    });
    
    const placeholderMappings = [
        { id: 'profileLastName', ru: 'Иванов', en: 'Ivanov' },
        { id: 'profileFirstName', ru: 'Иван', en: 'Ivan' },
        { id: 'profileMiddleName', ru: 'Иванович', en: 'Ivanovich' },
        { id: 'profileEmail', ru: 'ivanov@example.com', en: 'ivanov@example.com' },
        { id: 'profilePhone', ru: '+375 29 123-45-67', en: '+375 29 123-45-67' },
        { id: 'profileAddress', ru: 'г. Могилёв, ул. Ленинская, д. 5', en: 'Mogilev, Leninskaya str., 5' }
    ];
    
    placeholderMappings.forEach(mapping => {
        const input = document.getElementById(mapping.id);
        if (input && input.hasAttribute('placeholder')) {
            input.placeholder = currentLang === 'ru' ? mapping.ru : mapping.en;
        }
    });
    
    const birthDateInput = document.getElementById('profileBirthDate');
    if (birthDateInput) {
        if (birthDateInput.type === 'date') {
            const dateHint = currentLang === 'ru' ? 'Формат: ДД.ММ.ГГГГ' : 'Format: DD.MM.YYYY';
            birthDateInput.title = dateHint;
            
            let hintElement = birthDateInput.parentNode.querySelector('.date-format-hint');
            if (!hintElement) {
                hintElement = document.createElement('small');
                hintElement.className = 'date-format-hint';
                hintElement.style.cssText = 'display: block; font-size: 12px; color: #6B7280; margin-top: 5px;';
                birthDateInput.parentNode.appendChild(hintElement);
            }
            hintElement.textContent = dateHint;
        } else if (birthDateInput.type === 'text') {
            birthDateInput.placeholder = currentLang === 'ru' ? 'ДД.ММ.ГГГГ' : 'DD.MM.YYYY';
        }
    }
    
    const tabBtns = modal.querySelectorAll('.profile-tab-btn');
    const tabKeys = ['profile_personal_data', 'profile_visits', 'profile_reviews'];
    tabBtns.forEach((btn, idx) => {
        if (tabKeys[idx]) {
            const translated = getCleanTranslation(tabKeys[idx]);
            if (translated) {
                const currentHtml = btn.innerHTML;
                const existingIcon = extractEmoji(currentHtml);
                btn.innerHTML = existingIcon + ' ' + translated;
            }
        }
    });
    
    const modalHeader = modal.querySelector('.profile-modal-header h2');
    if (modalHeader) {
        const translated = getCleanTranslation('profile_title');
        if (translated) {
            const currentHtml = modalHeader.innerHTML;
            const existingIcon = extractEmoji(currentHtml);
            modalHeader.innerHTML = existingIcon + ' ' + translated;
        }
    }
    
    const visitsFilterBtns = modal.querySelectorAll('.visits-filter-btn');
    const visitsFilterKeys = ['profile_visits_all', 'profile_visits_pending', 'profile_visits_confirmed', 'profile_visits_completed', 'profile_visits_cancelled'];
    visitsFilterBtns.forEach((btn, idx) => {
        if (visitsFilterKeys[idx]) {
            const translated = getCleanTranslation(visitsFilterKeys[idx]);
            if (translated) {
                const currentHtml = btn.innerHTML;
                const existingIcon = extractEmoji(currentHtml);
                btn.innerHTML = existingIcon + ' ' + translated;
            }
        }
    });
    
    const reviewsFilterBtns = modal.querySelectorAll('.reviews-filter-btn');
    const reviewsFilterKeys = ['profile_reviews_all', 'profile_reviews_published', 'profile_reviews_pending'];
    reviewsFilterBtns.forEach((btn, idx) => {
        if (reviewsFilterKeys[idx]) {
            const translated = getCleanTranslation(reviewsFilterKeys[idx]);
            if (translated) {
                const currentHtml = btn.innerHTML;
                const existingIcon = extractEmoji(currentHtml);
                btn.innerHTML = existingIcon + ' ' + translated;
            }
        }
    });
    
    const logoutBtn = modal.querySelector('#profileLogoutBtn');
    if (logoutBtn) {
        const translated = getCleanTranslation('profile_logout_btn');
        if (translated) {
            logoutBtn.innerHTML = '🚪 ' + translated;
        }
    }
    
    const adminBtn = modal.querySelector('#goToAdminPanelBtn');
    if (adminBtn) {
        const translated = getCleanTranslation('profile_admin_panel');
        if (translated) {
            adminBtn.innerHTML = '⚙️ ' + translated;
        }
    }
    
    const editBtn = modal.querySelector('#profileEditBtn');
    if (editBtn) {
        const translated = getCleanTranslation('profile_edit_btn');
        if (translated) {
            editBtn.innerHTML = '✏️ ' + translated;
        }
    }
    
    const saveBtn = modal.querySelector('#profileSaveBtn');
    if (saveBtn) {
        const translated = getCleanTranslation('profile_save_btn');
        if (translated) {
            const currentHtml = saveBtn.innerHTML;
            const existingIcon = extractEmoji(currentHtml);
            saveBtn.innerHTML = existingIcon + ' ' + translated;
        }
    }
    
    const cancelBtn = modal.querySelector('#profileCancelBtn');
    if (cancelBtn) {
        const translated = getCleanTranslation('profile_cancel_btn');
        if (translated) {
            const currentHtml = cancelBtn.innerHTML;
            const existingIcon = extractEmoji(currentHtml);
            cancelBtn.innerHTML = existingIcon + ' ' + translated;
        }
    }
    
    const labels = modal.querySelectorAll('#profileForm label');
    const labelKeys = [
        'profile_last_name', 'profile_first_name', 'profile_middle_name',
        'profile_email', 'profile_phone', 'profile_birth_date', 'profile_address'
    ];
    labels.forEach((label, idx) => {
        if (labelKeys[idx]) {
            const translated = getCleanTranslation(labelKeys[idx]);
            if (translated) {
                const starSpan = label.querySelector('.required');
                if (starSpan) {
                    label.innerHTML = translated + ' <span class="required">*</span>';
                } else {
                    label.textContent = translated;
                }
            }
        }
    });
}

async function checkEmailUniqueness(email, currentUserId) {
    if (!email) return true;
    
    try {
        const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
        const users = await response.json();
        
        const existingUser = users.find(u => u.email === email && u.id !== currentUserId);
        
        if (existingUser) {
            const errorMessage = getValidationText('profile_validation_email_exists');
            showToast(errorMessage, 'error');
            showFieldError('profileEmail', errorMessage);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Ошибка проверки email:', error);
        return true;
    }
}

async function checkPhoneUniqueness(phone, currentUserId) {
    if (!phone) return true;
    
    const cleanPhone = formatPhoneForSave(phone);
    
    try {
        const response = await fetch(`http://localhost:3000/users?phone=${cleanPhone}`);
        const users = await response.json();
        
        const existingUser = users.find(u => u.phone === cleanPhone && u.id !== currentUserId);
        
        if (existingUser) {
            const errorMessage = getValidationText('profile_validation_phone_exists');
            showToast(errorMessage, 'error');
            showFieldError('profilePhone', errorMessage);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Ошибка проверки телефона:', error);
        return true;
    }
}

async function openProfileModal() {
    console.log('🔵 openProfileModal вызвана');
    
    let modal = document.getElementById('profileModal');
    if (!modal) {
        createProfileModal();
        setTimeout(() => openProfileModal(), 200);
        return;
    }
    
    updateProfileModalTranslations();
    
    const user = window.getCurrentUser ? window.getCurrentUser() : null;
    if (!user) {
        console.log('❌ Пользователь не авторизован');
        const isInPages = window.location.pathname.includes('/pages/');
        window.location.href = isInPages ? 'login.html' : '../pages/login.html';
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/users/${user.userId}`);
        if (!response.ok) throw new Error('Пользователь не найден');
        const userData = await response.json();
        currentUserData = userData;
        
        const formattedPhone = formatPhoneForDisplay(userData.phone || '');
        const formattedBirthDate = formatDateForDisplay(userData.birthDate || '');
        
        document.getElementById('profileLastName').value = userData.lastName || '';
        document.getElementById('profileFirstName').value = userData.firstName || '';
        document.getElementById('profileMiddleName').value = userData.middleName || '';
        document.getElementById('profileEmail').value = userData.email || '';
        document.getElementById('profilePhone').value = formattedPhone || userData.phone || '';
        document.getElementById('profileBirthDate').value = formattedBirthDate || userData.birthDate || '';
        document.getElementById('profileAddress').value = userData.address || '';
        
        const inputs = document.querySelectorAll('#profileForm input');
        inputs.forEach(input => input.disabled = true);
        
        const isAdmin = userData.role === 'admin';
        const visitsTab = document.querySelector('.profile-tab-btn[data-tab="visits"]');
        const reviewsTab = document.querySelector('.profile-tab-btn[data-tab="reviews"]');
        
        if (visitsTab) {
            visitsTab.style.display = isAdmin ? 'none' : 'inline-block';
        }
        if (reviewsTab) {
            reviewsTab.style.display = isAdmin ? 'none' : 'inline-block';
        }
        
        const adminPanelBtn = document.getElementById('adminPanelBtn');
        if (adminPanelBtn) {
            adminPanelBtn.style.display = isAdmin ? 'flex' : 'none';
        }
        
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        showToast('Ошибка загрузки данных профиля', 'error');
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function createProfileModal() {
    if (document.getElementById('profileModal')) return;
    
    const modalHTML = `
        <div id="profileModal" class="profile-modal">
            <div class="profile-modal-content">
                <div class="profile-modal-header">
                    <h2 data-translate="profile_title">👤 Личный кабинет</h2>
                    <span class="profile-modal-close">&times;</span>
                </div>
                <div class="profile-modal-body">
                    <div class="profile-tabs">
                        <button class="profile-tab-btn active" data-tab="info" data-translate="profile_personal_data">📋 Личные данные</button>
                        <button class="profile-tab-btn" data-tab="visits" data-translate="profile_visits">📅 Мои визиты</button>
                        <button class="profile-tab-btn" data-tab="reviews" data-translate="profile_reviews">⭐ Мои отзывы</button>
                    </div>
                    
                    <div class="profile-tab-content active" id="profileInfoTab">
                        <form id="profileForm">
                            <div class="profile-form-row">
                                <div class="profile-form-group">
                                    <label data-translate="profile_last_name">Фамилия <span class="required">*</span></label>
                                    <input type="text" id="profileLastName" placeholder="Иванов">
                                </div>
                                <div class="profile-form-group">
                                    <label data-translate="profile_first_name">Имя <span class="required">*</span></label>
                                    <input type="text" id="profileFirstName" placeholder="Иван">
                                </div>
                            </div>
                            <div class="profile-form-group">
                                <label data-translate="profile_middle_name">Отчество</label>
                                <input type="text" id="profileMiddleName" placeholder="Иванович">
                            </div>
                            <div class="profile-form-group">
                                <label data-translate="profile_email">Email <span class="required">*</span></label>
                                <input type="email" id="profileEmail" placeholder="ivanov@example.com">
                            </div>
                            <div class="profile-form-group">
                                <label data-translate="profile_phone">Телефон <span class="required">*</span></label>
                                <input type="tel" id="profilePhone" placeholder="+375 29 123-45-67">
                            </div>
                            <div class="profile-form-group">
                                <label data-translate="profile_birth_date">Дата рождения</label>
                                <input type="text" id="profileBirthDate" placeholder="ДД.ММ.ГГГГ" maxlength="10">
                            </div>
                            <div class="profile-form-group">
                                <label data-translate="profile_address">Адрес</label>
                                <input type="text" id="profileAddress" placeholder="г. Минск, ул. Примерная, д. 1">
                            </div>
                            <div class="profile-actions" id="profileActions">
                                <button type="button" class="profile-edit-btn" id="profileEditBtn" data-translate="profile_edit_btn">✏️ Редактировать</button>
                            </div>
                            
                            <div id="adminPanelBtn" class="admin-panel-btn-container" style="display: none;">
                                <button type="button" class="admin-panel-btn" id="goToAdminPanelBtn" data-translate="profile_admin_panel">
                                    ⚙️ Перейти в админ-панель
                                </button>
                            </div>
                            
                            <button type="button" class="profile-logout-btn" id="profileLogoutBtn" data-translate="profile_logout_btn">🚪 Выйти из аккаунта</button>
                        </form>
                    </div>
                    
                    <div class="profile-tab-content" id="profileVisitsTab">
                        <div class="visits-filters">
                            <button class="visits-filter-btn active" data-filter="all" data-translate="profile_visits_all">Все</button>
                            <button class="visits-filter-btn" data-filter="pending" data-translate="profile_visits_pending">⏳ Ожидают</button>
                            <button class="visits-filter-btn" data-filter="confirmed" data-translate="profile_visits_confirmed">✅ Подтверждены</button>
                            <button class="visits-filter-btn" data-filter="completed" data-translate="profile_visits_completed">✔️ Завершены</button>
                            <button class="visits-filter-btn" data-filter="cancelled" data-translate="profile_visits_cancelled">❌ Отменены</button>
                        </div>
                        <div id="visitsList" class="visits-list">
                            <div class="empty-visits">
                                <div class="empty-visits-icon">📅</div>
                                <div class="empty-visits-text" data-translate="profile_loading">Загрузка...</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-tab-content" id="profileReviewsTab">
                        <div class="reviews-filters">
                            <button class="reviews-filter-btn active" data-filter="all" data-translate="profile_reviews_all">Все отзывы</button>
                            <button class="reviews-filter-btn" data-filter="published" data-translate="profile_reviews_published">✅ Опубликованные</button>
                            <button class="reviews-filter-btn" data-filter="pending" data-translate="profile_reviews_pending">⏳ На модерации</button>
                        </div>
                        <div id="reviewsList" class="reviews-list-container">
                            <div class="empty-reviews">
                                <div class="empty-reviews-icon">⭐</div>
                                <div class="empty-reviews-text" data-translate="profile_loading">Загрузка...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    if (!document.querySelector('link[href*="modal-profile.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/modal-profile.css';
        document.head.appendChild(link);
    }
    
    initProfileModal();
}

function initProfileModal() {
    const modal = document.getElementById('profileModal');
    const closeBtn = document.querySelector('.profile-modal-close');
    const editBtn = document.getElementById('profileEditBtn');
    const logoutBtn = document.getElementById('profileLogoutBtn');
    const adminPanelBtn = document.getElementById('goToAdminPanelBtn');
    const tabBtns = document.querySelectorAll('.profile-tab-btn');
    
    function resetAllTabStyles() {
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = '#F3F4F6';
            btn.style.color = '#4B5563';
            btn.style.border = 'none';
        });
    }
    
    function activateTabButton(btn) {
        btn.classList.add('active');
        btn.style.backgroundColor = '#2F353B';
        btn.style.color = 'white';
        btn.style.border = 'none';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProfileModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeProfileModal();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeProfileModal();
        }
    });
    
    if (adminPanelBtn) {
        adminPanelBtn.addEventListener('click', function() {
            window.location.href = '../pages/admin.html';
        });
    }
    
    resetAllTabStyles();
    const activeTabBtn = document.querySelector('.profile-tab-btn.active');
    if (activeTabBtn) {
        activateTabButton(activeTabBtn);
    } else {
        const infoBtn = document.querySelector('.profile-tab-btn[data-tab="info"]');
        if (infoBtn) activateTabButton(infoBtn);
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.style.display === 'none') return;
            
            resetAllTabStyles();      
            activateTabButton(btn);   
            
            document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.remove('active'));
            
            if (btn.dataset.tab === 'info') {
                document.getElementById('profileInfoTab').classList.add('active');
            } else if (btn.dataset.tab === 'visits') {
                document.getElementById('profileVisitsTab').classList.add('active');
                loadUserVisits();
            } else if (btn.dataset.tab === 'reviews') {
                document.getElementById('profileReviewsTab').classList.add('active');
                loadUserReviews();
            }
        });
    });
    
    if (editBtn) {
        editBtn.addEventListener('click', toggleProfileEdit);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
    
    const birthDateInput = document.getElementById('profileBirthDate');
    if (birthDateInput && birthDateInput.type === 'text') {
        applyDateMask(birthDateInput);
    }
    
    initVisitsFilters();
    initReviewsFilters();
}

function initVisitsFilters() {
    const filterBtns = document.querySelectorAll('.visits-filter-btn');
    filterBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            this.style.backgroundColor = '';
            this.style.color = '';
            loadUserVisits(this.dataset.filter);
        });
    });
}

function initReviewsFilters() {
    const filterBtns = document.querySelectorAll('.reviews-filter-btn');
    filterBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            this.style.backgroundColor = '';
            this.style.color = '';
            loadUserReviews(this.dataset.filter);
        });
    });
}

async function loadUserData(userId) {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) throw new Error('Пользователь не найден');
        const user = await response.json();
        currentUserData = user;
        
        const formattedPhone = formatPhoneForDisplay(user.phone || '');
        const formattedBirthDate = formatDateForDisplay(user.birthDate || '');
        
        document.getElementById('profileLastName').value = user.lastName || '';
        document.getElementById('profileFirstName').value = user.firstName || '';
        document.getElementById('profileMiddleName').value = user.middleName || '';
        document.getElementById('profileEmail').value = user.email || '';
        document.getElementById('profilePhone').value = formattedPhone || user.phone || '';
        document.getElementById('profileBirthDate').value = formattedBirthDate || user.birthDate || '';
        document.getElementById('profileAddress').value = user.address || '';
        
        const inputs = document.querySelectorAll('#profileForm input');
        inputs.forEach(input => input.disabled = true);
        
        const isAdmin = user.role === 'admin';
        const visitsTab = document.querySelector('.profile-tab-btn[data-tab="visits"]');
        const reviewsTab = document.querySelector('.profile-tab-btn[data-tab="reviews"]');
        
        if (visitsTab) {
            visitsTab.style.display = isAdmin ? 'none' : 'inline-block';
        }
        if (reviewsTab) {
            reviewsTab.style.display = isAdmin ? 'none' : 'inline-block';
        }
        
        const adminPanelBtn = document.getElementById('adminPanelBtn');
        if (adminPanelBtn) {
            adminPanelBtn.style.display = isAdmin ? 'flex' : 'none';
        }
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        showToast('Ошибка загрузки данных профиля', 'error');
    }
}

function toggleProfileEdit() {
    if (window.event) {
        window.event.preventDefault();
        window.event.stopPropagation();
    }
    
    hideFieldError('profileLastName');
    hideFieldError('profileFirstName');
    hideFieldError('profileEmail');
    hideFieldError('profilePhone');
    hideFieldError('profileBirthDate');
    
    const inputs = document.querySelectorAll('#profileForm input');
    const editBtn = document.getElementById('profileEditBtn');
    const isEditing = inputs[0] && !inputs[0].disabled;
    
    if (!isEditing) {
        inputs.forEach(input => input.disabled = false);
        if (editBtn) editBtn.style.display = 'none';
        
        if (!document.getElementById('profileSaveBtn')) {
            const actionsDiv = document.getElementById('profileActions');
            
            const oldSaveBtn = document.getElementById('profileSaveBtn');
            const oldCancelBtn = document.getElementById('profileCancelBtn');
            if (oldSaveBtn) oldSaveBtn.remove();
            if (oldCancelBtn) oldCancelBtn.remove();
            
            const saveBtn = document.createElement('button');
            saveBtn.type = 'button';
            saveBtn.className = 'profile-save-btn';
            const saveText = getProfileTranslation('profile_save_btn', '💾 Сохранить');
            saveBtn.innerHTML = '💾 ' + saveText;
            saveBtn.id = 'profileSaveBtn';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.className = 'profile-cancel-btn';
            const cancelText = getProfileTranslation('profile_cancel_btn', '❌ Отменить');
            cancelBtn.innerHTML = '❌ ' + cancelText;
            cancelBtn.id = 'profileCancelBtn';
            
            actionsDiv.appendChild(saveBtn);
            actionsDiv.appendChild(cancelBtn);
            
            const newSaveBtn = document.getElementById('profileSaveBtn');
            const newCancelBtn = document.getElementById('profileCancelBtn');
            
            if (newSaveBtn) {
                newSaveBtn.removeEventListener('click', saveProfileChanges);
                newSaveBtn.addEventListener('click', function(e) {
                    if (e) e.preventDefault();
                    saveProfileChanges();
                    return false;
                });
            }
            if (newCancelBtn) {
                newCancelBtn.removeEventListener('click', cancelProfileEdit);
                newCancelBtn.addEventListener('click', function(e) {
                    if (e) e.preventDefault();
                    cancelProfileEdit();
                    return false;
                });
            }
        }
    }
    
    return false;
}

function cancelProfileEdit() {
    if (window.event) {
        window.event.preventDefault();
        window.event.stopPropagation();
    }
    
    hideFieldError('profileLastName');
    hideFieldError('profileFirstName');
    hideFieldError('profileEmail');
    hideFieldError('profilePhone');
    hideFieldError('profileBirthDate');
    
    if (currentUserData) {
        const formattedPhone = formatPhoneForDisplay(currentUserData.phone || '');
        const formattedBirthDate = formatDateForDisplay(currentUserData.birthDate || '');
        
        document.getElementById('profileLastName').value = currentUserData.lastName || '';
        document.getElementById('profileFirstName').value = currentUserData.firstName || '';
        document.getElementById('profileMiddleName').value = currentUserData.middleName || '';
        document.getElementById('profileEmail').value = currentUserData.email || '';
        document.getElementById('profilePhone').value = formattedPhone || currentUserData.phone || '';
        document.getElementById('profileBirthDate').value = formattedBirthDate || currentUserData.birthDate || '';
        document.getElementById('profileAddress').value = currentUserData.address || '';
    }
    
    const inputs = document.querySelectorAll('#profileForm input');
    inputs.forEach(input => input.disabled = true);
    
    const saveBtn = document.getElementById('profileSaveBtn');
    const cancelBtn = document.getElementById('profileCancelBtn');
    const editBtn = document.getElementById('profileEditBtn');
    
    if (saveBtn) saveBtn.remove();
    if (cancelBtn) cancelBtn.remove();
    if (editBtn) {
        const editText = getProfileTranslation('profile_edit_btn', 'Редактировать');
        editBtn.innerHTML = '✏️ ' + editText;
        editBtn.style.display = 'block';
    }
    
    return false;
}

async function saveProfileChanges() {
    if (window.event) {
        window.event.preventDefault();
        window.event.stopPropagation();
    }
    
    const sessionUser = window.getCurrentUser ? window.getCurrentUser() : null;
    if (!sessionUser) return false;
    
    if (!validateProfileForm()) {
        showToast(getValidationText('profile_validation_form_errors'), 'error');
        return false;
    }
    
    const lastName = document.getElementById('profileLastName').value.trim();
    const firstName = document.getElementById('profileFirstName').value.trim();
    const middleName = document.getElementById('profileMiddleName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const rawPhone = document.getElementById('profilePhone').value.trim();
    const rawBirthDate = document.getElementById('profileBirthDate').value.trim();
    const address = document.getElementById('profileAddress').value.trim();
    
    const phone = formatPhoneForSave(rawPhone);
    const birthDate = formatDateForSave(rawBirthDate);
    const activeTab = document.querySelector('.profile-tab-btn.active')?.dataset.tab || 'info';
    
    const saveBtn = document.getElementById('profileSaveBtn');
    const originalText = saveBtn?.innerHTML || '💾 Сохранить';
    if (saveBtn) {
        saveBtn.innerHTML = '⏳ Сохранение...';
        saveBtn.disabled = true;
    }
    
    try {
        const isEmailUnique = await checkEmailUniqueness(email, sessionUser.userId);
        if (!isEmailUnique) {
            if (saveBtn) {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }
            return false;
        }
        
        const isPhoneUnique = await checkPhoneUniqueness(phone, sessionUser.userId);
        if (!isPhoneUnique) {
            if (saveBtn) {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }
            return false;
        }
        
        const response = await fetch(`http://localhost:3000/users/${sessionUser.userId}`);
        const userData = await response.json();
        
        const updatedUser = {
            ...userData,
            lastName, firstName, middleName, email, phone, birthDate, address,
            updatedAt: new Date().toISOString()
        };
        
        const updateResponse = await fetch(`http://localhost:3000/users/${sessionUser.userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });
        
        if (updateResponse.ok) {
            const updatedSession = {
                userId: sessionUser.userId,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                role: userData.role || 'user',
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('dental_club_session', JSON.stringify(updatedSession));
            sessionStorage.setItem('dental_club_session', JSON.stringify(updatedSession));
            
            currentUserData = updatedUser;
            
            showToast('✅ Профиль обновлен!', 'success');
            
            if (typeof window.updateAuthUI === 'function') {
                window.updateAuthUI();
            }
            
            saveModalStateBeforeReload();
            window.location.reload();
            
        } else {
            showToast('❌ Ошибка сохранения', 'error');
            if (saveBtn) {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }
        }
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        showToast('❌ Ошибка сохранения', 'error');
        if (saveBtn) {
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }
    }
    
    return false;
}

function getPatientNameString(patientName) {
    if (!patientName) return '';
    if (typeof patientName === 'string') return patientName;
    if (typeof patientName === 'object') {
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        return patientName[currentLang] || patientName.ru || patientName.en || '';
    }
    return String(patientName);
}

async function loadUserVisits(filter = 'all') {
    const visitsContainer = document.getElementById('visitsList');
    const sessionUser = window.getCurrentUser ? window.getCurrentUser() : null;
    
    if (!visitsContainer) return;
    
    if (!sessionUser) {
        const loginRequiredText = getProfileTranslation('profile_login_required', 'Войдите в аккаунт');
        visitsContainer.innerHTML = `<div class="empty-visits"><div class="empty-visits-icon">🔒</div><div class="empty-visits-text">${loginRequiredText}</div></div>`;
        return;
    }
    
    const loadingText = getProfileTranslation('profile_loading', 'Загрузка...');
    visitsContainer.innerHTML = `<div class="empty-visits"><div class="empty-visits-icon">⏳</div><div class="empty-visits-text">${loadingText}</div></div>`;
    
    try {
        const appointmentsRes = await fetch('http://localhost:3000/appointments');
        
        if (!appointmentsRes.ok) {
            throw new Error('Ошибка загрузки данных с сервера');
        }
        
        let appointments = await appointmentsRes.json();
        
        console.log('📅 Всего записей в БД:', appointments.length);
        console.log('👤 Информация о пользователе:', {
            userId: sessionUser.userId,
            phone: sessionUser.phone,
            email: sessionUser.email,
            lastName: sessionUser.lastName,
            firstName: sessionUser.firstName
        });
        
        let userVisits = [];
        
        userVisits = appointments.filter(apt => apt.userId === sessionUser.userId);
        console.log('🔍 Найдено по userId:', userVisits.length);
        
        const userPhone = sessionUser.phone ? String(sessionUser.phone).replace(/\D/g, '') : '';
        console.log('📱 Телефон пользователя (нормализованный):', userPhone);
        
        const phoneMatches = appointments.filter(apt => {
            const aptPhone = apt.phone ? String(apt.phone).replace(/\D/g, '') : '';
            return userPhone && aptPhone === userPhone;
        });
        
        phoneMatches.forEach(apt => {
            if (!userVisits.some(v => v.id === apt.id)) {
                userVisits.push(apt);
            }
        });
        console.log('🔍 Найдено по телефону (добавлено новых):', phoneMatches.filter(apt => !userVisits.some(v => v.id === apt.id)).length);
        
        const userEmail = sessionUser.email ? String(sessionUser.email).toLowerCase() : '';
        console.log('📧 Email пользователя:', userEmail);
        
        const emailMatches = appointments.filter(apt => {
            const aptEmail = apt.email ? String(apt.email).toLowerCase() : '';
            return userEmail && aptEmail === userEmail;
        });
        
        emailMatches.forEach(apt => {
            if (!userVisits.some(v => v.id === apt.id)) {
                userVisits.push(apt);
            }
        });
        console.log('🔍 Найдено по email (добавлено новых):', emailMatches.filter(apt => !userVisits.some(v => v.id === apt.id)).length);
        
        const userLastName = sessionUser.lastName ? String(sessionUser.lastName).toLowerCase() : '';
        const userFirstName = sessionUser.firstName ? String(sessionUser.firstName).toLowerCase() : '';
        console.log('👤 Имя и фамилия пользователя:', userLastName, userFirstName);
        
        const nameMatches = appointments.filter(apt => {
            let patientName = '';
            if (typeof apt.patientName === 'object') {
                const currentLang = localStorage.getItem('dental_language') || 'ru';
                patientName = apt.patientName[currentLang] || apt.patientName.ru || '';
            } else {
                patientName = apt.patientName || '';
            }
            const patientNameLower = patientName.toLowerCase();
            return (userLastName && patientNameLower.includes(userLastName)) ||
                   (userFirstName && patientNameLower.includes(userFirstName));
        });
        
        nameMatches.forEach(apt => {
            if (!userVisits.some(v => v.id === apt.id)) {
                userVisits.push(apt);
            }
        });
        console.log('🔍 Найдено по имени (добавлено новых):', nameMatches.filter(apt => !userVisits.some(v => v.id === apt.id)).length);
        
        if (userVisits.length === 0 && appointments.length > 0) {
            console.warn('⚠️ Визиты не найдены! Показываем последние 5 записей для проверки');
            userVisits = appointments.slice(0, 5);
        }
        
        console.log('📊 Всего найдено визитов после всех проверок:', userVisits.length);
        
        if (filter !== 'all') {
            userVisits = userVisits.filter(apt => apt.status === filter);
            console.log('📊 После фильтра по статусу:', userVisits.length);
        }
        
        const today = new Date().toISOString().split('T')[0];
        const upcoming = userVisits.filter(v => v.date >= today).sort((a, b) => a.date.localeCompare(b.date));
        const past = userVisits.filter(v => v.date < today).sort((a, b) => b.date.localeCompare(a.date));
        
        console.log('📅 Предстоящих записей:', upcoming.length);
        console.log('📅 Прошедших записей:', past.length);
        
        if (userVisits.length > 0) {
            console.log('📋 Список найденных визитов:');
            userVisits.forEach(visit => {
                console.log(`   - ID: ${visit.id}, Дата: ${visit.date}, Статус: ${visit.status}, Пациент: ${typeof visit.patientName === 'object' ? JSON.stringify(visit.patientName) : visit.patientName}`);
            });
        }
        
        const emptyVisitsText = getProfileTranslation('profile_empty_visits', 'У вас пока нет записей');
        if (upcoming.length === 0 && past.length === 0) {
            visitsContainer.innerHTML = `<div class="empty-visits"><div class="empty-visits-icon">📅</div><div class="empty-visits-text">${emptyVisitsText}</div></div>`;
            return;
        }
        
        visitsContainer.innerHTML = '';
        
        const visitsText = getProfileTranslation('profile_visits', '📌 Визиты');
        
        const [doctorsRes, servicesRes] = await Promise.all([
            fetch('http://localhost:3000/doctors'),
            fetch('http://localhost:3000/services')
        ]);
        
        const doctors = await doctorsRes.json();
        const services = await servicesRes.json();
        
        if (userVisits.length > 0) {
            const divider = document.createElement('div');
            divider.className = 'visits-divider';
            divider.innerHTML = `<span>${visitsText}</span>`;
            visitsContainer.appendChild(divider);
            userVisits.forEach(visit => {
                visitsContainer.appendChild(createVisitElement(visit, doctors, services));
            });
        }
        
    } catch(e) {
        console.error('❌ Ошибка загрузки визитов:', e);
        visitsContainer.innerHTML = `<div class="empty-visits"><div class="empty-visits-icon">⚠️</div><div class="empty-visits-text">Ошибка подключения к серверу. Убедитесь, что JSON Server запущен (json-server --watch db.json --port 3000)</div></div>`;
    }
}

function createVisitElement(visit, doctors, services) {
    const doctor = doctors.find(d => d.id === visit.doctorId);
    
    let formattedDate = '';
    if (visit.date) {
        if (visit.date.includes('-')) {
            const parts = visit.date.split('-');
            if (parts.length === 3) {
                formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
            } else {
                formattedDate = visit.date;
            }
        } else if (visit.date.includes('.')) {
            formattedDate = visit.date;
        } else {
            formattedDate = visit.date;
        }
    }
    
    const statusMap = {
        pending: { text: getProfileTranslation('profile_visit_status_pending', '⏳ Ожидает подтверждения'), class: 'pending' },
        confirmed: { text: getProfileTranslation('profile_visit_status_confirmed', '✅ Подтверждена'), class: 'confirmed' },
        completed: { text: getProfileTranslation('profile_visit_status_completed', '✔️ Завершена'), class: 'completed' },
        cancelled: { text: getProfileTranslation('profile_visit_status_cancelled', '❌ Отменена'), class: 'cancelled' }
    };
    const status = statusMap[visit.status] || statusMap.pending;
    
    let doctorName = 'Врач не указан';
    if (doctor) {
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        const lastName = typeof doctor.lastName === 'object' ? (doctor.lastName[currentLang] || doctor.lastName.ru) : doctor.lastName;
        const firstName = typeof doctor.firstName === 'object' ? (doctor.firstName[currentLang] || doctor.firstName.ru) : doctor.firstName;
        doctorName = `${lastName} ${firstName}`.trim();
    }
    
    const div = document.createElement('div');
    div.className = `visit-item ${status.class}`;
    div.innerHTML = `
        <div class="visit-header">
            <span class="visit-date">${formattedDate}</span>
            <span class="visit-time">${visit.time}</span>
        </div>
        <div class="visit-doctor">${escapeHtml(doctorName)}</div>
        ${visit.comment ? `<div class="visit-comment">${escapeHtml(visit.comment)}</div>` : ''}
        <div class="visit-status ${status.class}">${status.text}</div>
    `;
    return div;
}

async function loadUserReviews(filter = 'all') {
    const reviewsContainer = document.getElementById('reviewsList');
    const sessionUser = window.getCurrentUser ? window.getCurrentUser() : null;
    
    if (!reviewsContainer) return;
    
    if (!sessionUser) {
        const loginRequiredText = getProfileTranslation('profile_login_required', 'Войдите в аккаунт');
        reviewsContainer.innerHTML = `<div class="empty-reviews"><div class="empty-reviews-icon">🔒</div><div class="empty-reviews-text">${loginRequiredText}</div></div>`;
        return;
    }
    
    const loadingText = getProfileTranslation('profile_loading', 'Загрузка...');
    reviewsContainer.innerHTML = `<div class="empty-reviews"><div class="empty-reviews-icon">⏳</div><div class="empty-reviews-text">${loadingText}</div></div>`;
    
    try {
        const response = await fetch('http://localhost:3000/reviews');
        
        if (!response.ok) {
            throw new Error('Ошибка загрузки отзывов');
        }
        
        let reviews = await response.json();
        
        const userEmail = sessionUser.email ? String(sessionUser.email).toLowerCase() : '';
        const userPhone = sessionUser.phone ? String(sessionUser.phone).replace(/\D/g, '') : '';
        const userLastName = sessionUser.lastName ? String(sessionUser.lastName).toLowerCase() : '';
        
        let userReviews = reviews.filter(review => {
            if (userEmail && review.email && String(review.email).toLowerCase() === userEmail) return true;
            
            const reviewPhone = review.phone ? String(review.phone).replace(/\D/g, '') : '';
            if (userPhone && reviewPhone === userPhone) return true;
            
            let authorName = '';
            if (typeof review.author === 'object') {
                const currentLang = localStorage.getItem('dental_language') || 'ru';
                authorName = review.author[currentLang] || review.author.ru || '';
            } else {
                authorName = review.author || '';
            }
            if (userLastName && authorName.toLowerCase().includes(userLastName)) return true;
            
            return false;
        });
        
        userReviews.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        
        if (filter === 'published') {
            userReviews = userReviews.filter(review => review.published === true);
        } else if (filter === 'pending') {
            userReviews = userReviews.filter(review => review.published === false);
        }
        
        const emptyReviewsText = getProfileTranslation('profile_empty_reviews', 'У вас пока нет отзывов');
        const emptyPublishedText = getProfileTranslation('profile_empty_reviews', 'У вас нет опубликованных отзывов');
        const emptyPendingText = getProfileTranslation('profile_empty_reviews', 'У вас нет отзывов на модерации');
        
        if (userReviews.length === 0) {
            let message = emptyReviewsText;
            if (filter === 'published') message = emptyPublishedText;
            if (filter === 'pending') message = emptyPendingText;
            reviewsContainer.innerHTML = `<div class="empty-reviews"><div class="empty-reviews-icon">⭐</div><div class="empty-reviews-text">${message}</div></div>`;
            return;
        }
        
        reviewsContainer.innerHTML = '';
        userReviews.forEach(review => {
            reviewsContainer.appendChild(createReviewElement(review));
        });
        
    } catch(e) {
        console.error('Ошибка загрузки отзывов:', e);
        reviewsContainer.innerHTML = `<div class="empty-reviews"><div class="empty-reviews-icon">⚠️</div><div class="empty-reviews-text">Ошибка подключения к серверу. Убедитесь, что JSON Server запущен (json-server --watch db.json --port 3000)</div></div>`;
    }
}

function createReviewElement(review) {
    let formattedDate = '';
    if (review.createdAt || review.date) {
        const dateStr = review.createdAt || review.date;
        const date = new Date(dateStr);
        
        if (!isNaN(date.getTime())) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            formattedDate = `${day}.${month}.${year}`;
        } else {
            const parts = dateStr.split('T')[0].split('-');
            if (parts.length === 3) {
                formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
            } else {
                formattedDate = dateStr;
            }
        }
    }
    
    let authorName = '';
    if (typeof review.author === 'object') {
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        authorName = review.author[currentLang] || review.author.ru || '';
    } else {
        authorName = review.author || '';
    }
    
    let reviewText = '';
    if (typeof review.text === 'object') {
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        reviewText = review.text[currentLang] || review.text.ru || '';
    } else {
        reviewText = review.text || '';
    }
    
    const statusText = review.published 
        ? getProfileTranslation('profile_review_status_published', '✅ Опубликован')
        : getProfileTranslation('profile_review_status_pending', '⏳ На модерации');
    const statusClass = review.published ? 'review-published' : 'review-pending';
    const noteText = getProfileTranslation('profile_review_note', '⏳ Отзыв отправлен на модерацию и будет опубликован после проверки');
    
    const div = document.createElement('div');
    div.className = `review-item ${statusClass}`;
    div.innerHTML = `
        <div class="review-header">
            <span class="review-date">${formattedDate}</span>
            <span class="review-status ${statusClass}">${statusText}</span>
        </div>
        <div class="review-rating">
            ${'★'.repeat(review.rating || 5)}${'☆'.repeat(5 - (review.rating || 5))}
        </div>
        <div class="review-author"><strong>${escapeHtml(authorName)}</strong></div>
        <div class="review-text">${escapeHtml(reviewText)}</div>
        ${review.photo ? `<div class="review-photo"><img src="${review.photo}" alt="Фото к отзыву" onerror="this.style.display='none'"></div>` : ''}
        ${!review.published ? `<div class="review-note">${noteText}</div>` : ''}
    `;
    return div;
}

function logoutUser() {
    const confirmText = getProfileTranslation('profile_logout_confirm', 'Вы уверены, что хотите выйти?');
    if (confirm(confirmText)) {
        localStorage.removeItem('dental_club_session');
        sessionStorage.removeItem('dental_club_session');
        if (typeof window.clearSession === 'function') window.clearSession();
        closeProfileModal();
        if (typeof window.updateAuthUI === 'function') window.updateAuthUI();
        showToast('👋 Вы вышли из аккаунта', 'success');
        setTimeout(() => {
            if (typeof window.updateAuthUI === 'function') {
                window.updateAuthUI();
            }
        }, 100);
    }
}

document.addEventListener('languageChanged', function() {
    updateProfileModalTranslations();
    
    const modal = document.getElementById('profileModal');
    if (modal && modal.style.display === 'flex') {
        const activeTab = document.querySelector('.profile-tab-btn.active');
        if (activeTab) {
            const tabId = activeTab.dataset.tab;
            if (tabId === 'visits') {
                loadUserVisits();
            } else if (tabId === 'reviews') {
                loadUserReviews();
            }
        }
    }
});

window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;
window.createProfileModal = createProfileModal;
window.updateProfileModalTranslations = updateProfileModalTranslations;

