
let currentUserData = null;

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
    
    modal.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const translated = getProfileTranslation(key);
        if (translated && translated !== key) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = translated;
                }
            } else if (el.tagName === 'BUTTON') {
                const icon = el.innerHTML.match(/[✏️💾❌🚪⚙️📋📅⭐✅⏳✔️❌]/);
                if (icon) {
                    el.innerHTML = icon[0] + ' ' + translated;
                } else {
                    el.textContent = translated;
                }
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
        { id: 'profileAddress', ru: 'г. Минск, ул. Примерная, д. 1', en: 'Minsk, Prilukskaya str., 1' }
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
            const translated = getProfileTranslation(tabKeys[idx]);
            if (translated) {
                const icon = btn.innerHTML.match(/[📋📅⭐]/);
                if (icon) {
                    btn.innerHTML = icon[0] + ' ' + translated;
                } else {
                    btn.textContent = translated;
                }
            }
        }
    });
    
    const modalHeader = modal.querySelector('.profile-modal-header h2');
    if (modalHeader) {
        const translated = getProfileTranslation('profile_title');
        if (translated) {
            const icon = modalHeader.innerHTML.match(/[👤]/);
            if (icon) {
                modalHeader.innerHTML = icon[0] + ' ' + translated;
            } else {
                modalHeader.textContent = translated;
            }
        }
    }
    
    const visitsFilterBtns = modal.querySelectorAll('.visits-filter-btn');
    const visitsFilterKeys = ['profile_visits_all', 'profile_visits_pending', 'profile_visits_confirmed', 'profile_visits_completed', 'profile_visits_cancelled'];
    visitsFilterBtns.forEach((btn, idx) => {
        if (visitsFilterKeys[idx]) {
            const translated = getProfileTranslation(visitsFilterKeys[idx]);
            if (translated) {
                const icon = btn.innerHTML.match(/[⏳✅✔️❌]/);
                if (icon) {
                    btn.innerHTML = icon[0] + ' ' + translated;
                } else {
                    btn.textContent = translated;
                }
            }
        }
    });
    
    const reviewsFilterBtns = modal.querySelectorAll('.reviews-filter-btn');
    const reviewsFilterKeys = ['profile_reviews_all', 'profile_reviews_published', 'profile_reviews_pending'];
    reviewsFilterBtns.forEach((btn, idx) => {
        if (reviewsFilterKeys[idx]) {
            const translated = getProfileTranslation(reviewsFilterKeys[idx]);
            if (translated) {
                const icon = btn.innerHTML.match(/[✅⏳]/);
                if (icon) {
                    btn.innerHTML = icon[0] + ' ' + translated;
                } else {
                    btn.textContent = translated;
                }
            }
        }
    });
    
    const logoutBtn = modal.querySelector('#profileLogoutBtn');
    if (logoutBtn) {
        const translated = getProfileTranslation('profile_logout_btn');
        if (translated) {
            const icon = '🚪';
            logoutBtn.innerHTML = icon + ' ' + translated;
        }
    }
    
    const adminBtn = modal.querySelector('#goToAdminPanelBtn');
    if (adminBtn) {
        const translated = getProfileTranslation('profile_admin_panel');
        if (translated) {
            const icon = '⚙️';
            adminBtn.innerHTML = icon + ' ' + translated;
        }
    }
    
    const editBtn = modal.querySelector('#profileEditBtn');
    if (editBtn) {
        const translated = getProfileTranslation('profile_edit_btn');
        if (translated) {
            const icon = '✏️';
            editBtn.innerHTML = icon + ' ' + translated;
        }
    }
    
    const labels = modal.querySelectorAll('#profileForm label');
    const labelKeys = [
        'profile_last_name', 'profile_first_name', 'profile_middle_name',
        'profile_email', 'profile_phone', 'profile_birth_date', 'profile_address'
    ];
    labels.forEach((label, idx) => {
        if (labelKeys[idx]) {
            const translated = getProfileTranslation(labelKeys[idx]);
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
        const response = await fetch(`${API_BASE_URL}/users/${user.userId}`);
        if (!response.ok) throw new Error('Пользователь не найден');
        const userData = await response.json();
        currentUserData = userData;
        
        document.getElementById('profileLastName').value = userData.lastName || '';
        document.getElementById('profileFirstName').value = userData.firstName || '';
        document.getElementById('profileMiddleName').value = userData.middleName || '';
        document.getElementById('profileEmail').value = userData.email || '';
        document.getElementById('profilePhone').value = userData.phone || '';
        document.getElementById('profileBirthDate').value = userData.birthDate || '';
        document.getElementById('profileAddress').value = userData.address || '';
        
        const inputs = document.querySelectorAll('#profileForm input');
        inputs.forEach(input => input.disabled = true);
        
        const editBtn = document.getElementById('profileEditBtn');
        if (editBtn) {
            const translated = getProfileTranslation('profile_edit_btn');
            editBtn.innerHTML = '✏️ ' + (translated || 'Редактировать');
        }
        
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
                            
                            <!-- Кнопка админ-панели (только для админов) -->
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
            window.location.href = 'pages/admin.html';
        });
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.style.display === 'none') return;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
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
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadUserVisits(btn.dataset.filter);
        });
    });
}

function initReviewsFilters() {
    const filterBtns = document.querySelectorAll('.reviews-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadUserReviews(btn.dataset.filter);
        });
    });
}

async function loadUserData(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (!response.ok) throw new Error('Пользователь не найден');
        const user = await response.json();
        currentUserData = user;
        
        document.getElementById('profileLastName').value = user.lastName || '';
        document.getElementById('profileFirstName').value = user.firstName || '';
        document.getElementById('profileMiddleName').value = user.middleName || '';
        document.getElementById('profileEmail').value = user.email || '';
        document.getElementById('profilePhone').value = user.phone || '';
        document.getElementById('profileBirthDate').value = user.birthDate || '';
        document.getElementById('profileAddress').value = user.address || '';
        
        const inputs = document.querySelectorAll('#profileForm input');
        inputs.forEach(input => input.disabled = true);
        
        const editBtn = document.getElementById('profileEditBtn');
        if (editBtn) {
            const translated = getProfileTranslation('profile_edit_btn');
            editBtn.innerHTML = '✏️ ' + (translated || 'Редактировать');
        }
        
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
    const inputs = document.querySelectorAll('#profileForm input');
    const editBtn = document.getElementById('profileEditBtn');
    const isEditing = inputs[0] && !inputs[0].disabled;
    
    if (!isEditing) {
        inputs.forEach(input => input.disabled = false);
        if (editBtn) editBtn.style.display = 'none';
        
        if (!document.getElementById('profileSaveBtn')) {
            const actionsDiv = document.getElementById('profileActions');
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
            
            saveBtn.addEventListener('click', saveProfileChanges);
            cancelBtn.addEventListener('click', cancelProfileEdit);
        }
    }
}

function cancelProfileEdit() {
    if (currentUserData) {
        document.getElementById('profileLastName').value = currentUserData.lastName || '';
        document.getElementById('profileFirstName').value = currentUserData.firstName || '';
        document.getElementById('profileMiddleName').value = currentUserData.middleName || '';
        document.getElementById('profileEmail').value = currentUserData.email || '';
        document.getElementById('profilePhone').value = currentUserData.phone || '';
        document.getElementById('profileBirthDate').value = currentUserData.birthDate || '';
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
        const editText = getProfileTranslation('profile_edit_btn', '✏️ Редактировать');
        editBtn.innerHTML = '✏️ ' + editText;
        editBtn.style.display = 'block';
    }
}

async function saveProfileChanges() {
    const sessionUser = window.getCurrentUser ? window.getCurrentUser() : null;
    if (!sessionUser) return;
    
    const lastName = document.getElementById('profileLastName').value.trim();
    const firstName = document.getElementById('profileFirstName').value.trim();
    const middleName = document.getElementById('profileMiddleName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    const birthDate = document.getElementById('profileBirthDate').value;
    const address = document.getElementById('profileAddress').value.trim();
    
    if (!lastName || !firstName || !email || !phone) {
        showToast('Заполните все обязательные поля!', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/${sessionUser.userId}`);
        const userData = await response.json();
        
        const updatedUser = {
            ...userData,
            lastName, firstName, middleName, email, phone, birthDate, address,
            updatedAt: new Date().toISOString()
        };
        
        const updateResponse = await fetch(`${API_BASE_URL}/users/${sessionUser.userId}`, {
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
            cancelProfileEdit();
            if (typeof window.updateAuthUI === 'function') window.updateAuthUI();
        }
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        showToast('❌ Ошибка сохранения', 'error');
    }
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
        const [appointmentsRes, doctorsRes, servicesRes] = await Promise.all([
            fetch(`${API_BASE_URL}/appointments`),
            fetch(`${API_BASE_URL}/doctors`),
            fetch(`${API_BASE_URL}/services`)
        ]);
        
        let appointments = await appointmentsRes.json();
        let doctors = await doctorsRes.json();
        let services = await servicesRes.json();
        
        let userVisits = appointments.filter(apt => 
            apt.phone === sessionUser.phone || 
            apt.email === sessionUser.email ||
            (apt.patientName && apt.patientName.toLowerCase().includes(sessionUser.lastName?.toLowerCase() || ''))
        );
        
        if (filter !== 'all') {
            userVisits = userVisits.filter(apt => apt.status === filter);
        }
        
        const today = new Date().toISOString().split('T')[0];
        const upcoming = userVisits.filter(v => v.date >= today).sort((a, b) => a.date.localeCompare(b.date));
        const past = userVisits.filter(v => v.date < today).sort((a, b) => b.date.localeCompare(a.date));
        
        const emptyVisitsText = getProfileTranslation('profile_empty_visits', 'У вас пока нет записей');
        if (upcoming.length === 0 && past.length === 0) {
            visitsContainer.innerHTML = `<div class="empty-visits"><div class="empty-visits-icon">📅</div><div class="empty-visits-text">${emptyVisitsText}</div></div>`;
            return;
        }
        
        visitsContainer.innerHTML = '';
        
        const upcomingText = getProfileTranslation('profile_upcoming_visits', '📌 Предстоящие визиты');
        const pastText = getProfileTranslation('profile_past_visits', '📋 История посещений');
        
        if (upcoming.length > 0) {
            const divider = document.createElement('div');
            divider.className = 'visits-divider';
            divider.innerHTML = `<span>${upcomingText}</span>`;
            visitsContainer.appendChild(divider);
            upcoming.forEach(visit => visitsContainer.appendChild(createVisitElement(visit, doctors, services)));
        }
        
        if (past.length > 0) {
            const divider = document.createElement('div');
            divider.className = 'visits-divider';
            divider.innerHTML = `<span>${pastText}</span>`;
            visitsContainer.appendChild(divider);
            past.forEach(visit => visitsContainer.appendChild(createVisitElement(visit, doctors, services)));
        }
    } catch(e) {
        console.error('Ошибка загрузки визитов:', e);
        visitsContainer.innerHTML = `<div class="empty-visits"><div class="empty-visits-icon">⚠️</div><div class="empty-visits-text">Ошибка загрузки</div></div>`;
    }
}

function createVisitElement(visit, doctors, services) {
    const doctor = doctors.find(d => d.id === visit.doctorId);
    const service = services.find(s => s.id === visit.serviceId);
    const date = new Date(visit.date);
    const formattedDate = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    
    const statusMap = {
        pending: { text: getProfileTranslation('profile_visit_status_pending', '⏳ Ожидает подтверждения'), class: 'pending' },
        confirmed: { text: getProfileTranslation('profile_visit_status_confirmed', '✅ Подтверждена'), class: 'confirmed' },
        completed: { text: getProfileTranslation('profile_visit_status_completed', '✔️ Завершена'), class: 'completed' },
        cancelled: { text: getProfileTranslation('profile_visit_status_cancelled', '❌ Отменена'), class: 'cancelled' }
    };
    const status = statusMap[visit.status] || statusMap.pending;
    
    const div = document.createElement('div');
    div.className = `visit-item ${status.class}`;
    div.innerHTML = `
        <div class="visit-header">
            <span class="visit-date">${formattedDate}</span>
            <span class="visit-time">🕐 ${visit.time}</span>
        </div>
        <div class="visit-doctor">${doctor ? `${doctor.lastName} ${doctor.firstName}` : 'Врач не указан'}</div>
        <div class="visit-service">${service ? service.name : 'Услуга не указана'}</div>
        ${visit.comment ? `<div class="visit-comment">${escapeHtml(visit.comment)}</div>` : ''}
        <span class="visit-status ${status.class}">${status.text}</span>
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
        const response = await fetch(`${API_BASE_URL}/reviews`);
        let reviews = await response.json();
        
        let userReviews = reviews.filter(review => 
            review.email === sessionUser.email || 
            review.phone === sessionUser.phone ||
            (review.author && review.author.toLowerCase().includes(sessionUser.lastName?.toLowerCase() || ''))
        );
        
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
        reviewsContainer.innerHTML = `<div class="empty-reviews"><div class="empty-reviews-icon">⚠️</div><div class="empty-reviews-text">Ошибка загрузки</div></div>`;
    }
}

function createReviewElement(review) {
    const date = new Date(review.createdAt || review.date);
    const formattedDate = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    
    const statusText = review.published 
        ? getProfileTranslation('profile_review_status_published', '✅ Опубликован')
        : getProfileTranslation('profile_review_status_pending', '⏳ На модерации');
    const statusClass = review.published ? 'review-published' : 'review-pending';
    const noteText = getProfileTranslation('profile_review_note', '⏳ Отзыв отправлен на модерацию и будет опубликован после проверки');
    
    const div = document.createElement('div');
    div.className = `review-item ${statusClass}`;
    div.innerHTML = `
        <div class="review-header">
            <span class="review-date">📅 ${formattedDate}</span>
            <span class="review-status ${statusClass}">${statusText}</span>
        </div>
        <div class="review-rating">
            ${'★'.repeat(review.rating || 5)}${'☆'.repeat(5 - (review.rating || 5))}
        </div>
        <div class="review-text">${escapeHtml(review.text)}</div>
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
        setTimeout(() => location.reload(), 1000);
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