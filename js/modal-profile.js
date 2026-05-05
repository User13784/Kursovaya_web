const API_BASE_URL = 'http://localhost:3000';

let currentUser = null;

function createProfileModal() {
    if (document.getElementById('profileModal')) {
        return;
    }
    
    const modalHTML = `
        <div id="profileModal" class="profile-modal">
            <div class="profile-modal-content">
                <div class="profile-modal-header">
                    <h2>👤 Личный кабинет</h2>
                    <span class="profile-modal-close">&times;</span>
                </div>
                <div class="profile-modal-body">
                    <div class="profile-tabs">
                        <button class="profile-tab-btn active" data-tab="info">📋 Личные данные</button>
                        <button class="profile-tab-btn" data-tab="visits">📅 Мои визиты</button>
                    </div>
                    
                    <!-- Вкладка: Личные данные -->
                    <div class="profile-tab-content active" id="profileInfoTab">
                        <form id="profileForm">
                            <div class="profile-form-row">
                                <div class="profile-form-group">
                                    <label>Фамилия <span class="required">*</span></label>
                                    <input type="text" id="profileLastName" required placeholder="Иванов">
                                </div>
                                <div class="profile-form-group">
                                    <label>Имя <span class="required">*</span></label>
                                    <input type="text" id="profileFirstName" required placeholder="Иван">
                                </div>
                            </div>
                            
                            <div class="profile-form-group">
                                <label>Отчество</label>
                                <input type="text" id="profileMiddleName" placeholder="Иванович">
                            </div>
                            
                            <div class="profile-form-row">
                                <div class="profile-form-group">
                                    <label>Email <span class="required">*</span></label>
                                    <input type="email" id="profileEmail" required placeholder="ivanov@example.com">
                                </div>
                                <div class="profile-form-group">
                                    <label>Телефон <span class="required">*</span></label>
                                    <input type="tel" id="profilePhone" required placeholder="+375 29 123-45-67">
                                </div>
                            </div>
                            
                            <div class="profile-form-group">
                                <label>Дата рождения</label>
                                <input type="date" id="profileBirthDate">
                            </div>
                            
                            <div class="profile-form-group">
                                <label>Адрес</label>
                                <input type="text" id="profileAddress" placeholder="г. Минск, ул. Примерная, д. 1, кв. 1">
                            </div>
                            
                            <div class="profile-actions" id="profileActions">
                                <button type="button" class="profile-edit-btn" id="profileEditBtn">✏️ Редактировать</button>
                            </div>
                            
                            <button type="button" class="profile-logout-btn" id="profileLogoutBtn">🚪 Выйти из аккаунта</button>
                        </form>
                    </div>
                    
                    <!-- Вкладка: Мои визиты -->
                    <div class="profile-tab-content" id="profileVisitsTab">
                        <div class="visits-filters">
                            <button class="visits-filter-btn active" data-filter="all">Все</button>
                            <button class="visits-filter-btn" data-filter="pending">⏳ Ожидают</button>
                            <button class="visits-filter-btn" data-filter="confirmed">✅ Подтверждены</button>
                            <button class="visits-filter-btn" data-filter="completed">✔️ Завершены</button>
                            <button class="visits-filter-btn" data-filter="cancelled">❌ Отменены</button>
                        </div>
                        <div id="visitsList" class="visits-list">
                            <div class="empty-visits">
                                <div class="empty-visits-icon">📅</div>
                                <div class="empty-visits-text">Загрузка...</div>
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
    const tabBtns = document.querySelectorAll('.profile-tab-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProfileModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProfileModal();
            }
        });
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.profile-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            if (tabId === 'info') {
                document.getElementById('profileInfoTab').classList.add('active');
            } else if (tabId === 'visits') {
                document.getElementById('profileVisitsTab').classList.add('active');
                loadUserVisits();
            }
        });
    });
    
    if (editBtn) {
        editBtn.addEventListener('click', toggleProfileEdit);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
    
    initVisitsFilters();
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

function getCurrentUser() {
    try {
        let session = sessionStorage.getItem('dental_club_session');
        if (!session) {
            session = localStorage.getItem('dental_club_session');
        }
        
        if (session) {
            const sessionData = JSON.parse(session);
            currentUser = sessionData;
            return currentUser;
        }
    } catch(e) {
        console.error('Ошибка получения пользователя:', e);
    }
    return null;
}

async function loadFullUserData() {
    const sessionUser = getCurrentUser();
    if (!sessionUser) return null;
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/${sessionUser.userId}`);
        if (response.ok) {
            const userData = await response.json();
            return userData;
        }
    } catch (error) {
        console.error('Ошибка загрузки данных пользователя:', error);
    }
    
    return sessionUser;
}

async function loadUserToForm() {
    const user = await loadFullUserData();
    if (!user) return;
    
    document.getElementById('profileLastName').value = user.lastName || '';
    document.getElementById('profileFirstName').value = user.firstName || '';
    document.getElementById('profileMiddleName').value = user.middleName || '';
    document.getElementById('profileEmail').value = user.email || '';
    document.getElementById('profilePhone').value = user.phone || '';
    document.getElementById('profileBirthDate').value = user.birthDate || '';
    document.getElementById('profileAddress').value = user.address || '';
    
    const inputs = document.querySelectorAll('#profileForm input');
    inputs.forEach(input => {
        input.disabled = true;
    });
    
    const editBtn = document.getElementById('profileEditBtn');
    if (editBtn) {
        editBtn.textContent = '✏️ Редактировать';
    }
}

function toggleProfileEdit() {
    const inputs = document.querySelectorAll('#profileForm input');
    const editBtn = document.getElementById('profileEditBtn');
    const saveBtn = document.querySelector('#profileActions .profile-save-btn');
    const cancelBtn = document.querySelector('#profileActions .profile-cancel-btn');
    
    const isEditing = inputs[0] && !inputs[0].disabled;
    
    if (!isEditing) {
        inputs.forEach(input => {
            input.disabled = false;
        });
        
        if (editBtn) {
            editBtn.style.display = 'none';
        }
        
        if (!saveBtn) {
            const actionsDiv = document.getElementById('profileActions');
            const saveButton = document.createElement('button');
            saveButton.type = 'button';
            saveButton.className = 'profile-save-btn';
            saveButton.textContent = '💾 Сохранить изменения';
            saveButton.id = 'profileSaveBtn';
            
            const cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.className = 'profile-cancel-btn';
            cancelButton.textContent = '❌ Отменить';
            cancelButton.id = 'profileCancelBtn';
            
            actionsDiv.appendChild(saveButton);
            actionsDiv.appendChild(cancelButton);
            
            saveButton.addEventListener('click', saveProfileChanges);
            cancelButton.addEventListener('click', cancelProfileEdit);
        }
    }
}

function cancelProfileEdit() {
    loadUserToForm();
    
    const saveBtn = document.getElementById('profileSaveBtn');
    const cancelBtn = document.getElementById('profileCancelBtn');
    const editBtn = document.getElementById('profileEditBtn');
    
    if (saveBtn) saveBtn.remove();
    if (cancelBtn) cancelBtn.remove();
    if (editBtn) editBtn.style.display = 'block';
}

async function saveProfileChanges() {
    const sessionUser = getCurrentUser();
    if (!sessionUser) return;
    
    const lastName = document.getElementById('profileLastName').value.trim();
    const firstName = document.getElementById('profileFirstName').value.trim();
    const middleName = document.getElementById('profileMiddleName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    const birthDate = document.getElementById('profileBirthDate').value;
    const address = document.getElementById('profileAddress').value.trim();
    
    if (!lastName || !firstName || !email || !phone) {
        showProfileToast('Заполните все обязательные поля!', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/${sessionUser.userId}`);
        const userData = await response.json();
        
        const updatedUser = {
            ...userData,
            lastName,
            firstName,
            middleName,
            email,
            phone,
            birthDate,
            address,
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
                loginTime: new Date().toISOString()
            };
            
            if (sessionStorage.getItem('dental_club_session')) {
                sessionStorage.setItem('dental_club_session', JSON.stringify(updatedSession));
            }
            if (localStorage.getItem('dental_club_session')) {
                localStorage.setItem('dental_club_session', JSON.stringify(updatedSession));
            }
            
            showProfileToast('✅ Профиль успешно обновлен!', 'success');
            cancelProfileEdit();
            updateHeaderUserDisplay();
        } else {
            throw new Error('Ошибка при обновлении');
        }
    } catch (error) {
        console.error('Ошибка сохранения профиля:', error);
        showProfileToast('❌ Ошибка при сохранении. Проверьте подключение к серверу.', 'error');
    }
}

async function loadUserVisits(filter = 'all') {
    const visitsContainer = document.getElementById('visitsList');
    const sessionUser = getCurrentUser();
    
    if (!sessionUser) {
        visitsContainer.innerHTML = `
            <div class="empty-visits">
                <div class="empty-visits-icon">🔒</div>
                <div class="empty-visits-text">Войдите в аккаунт, чтобы увидеть историю посещений</div>
            </div>
        `;
        return;
    }
    
    visitsContainer.innerHTML = '<div class="empty-visits"><div class="empty-visits-icon">⏳</div><div class="empty-visits-text">Загрузка...</div></div>';
    
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
        const sortedVisits = [...upcoming, ...past];
        
        if (sortedVisits.length === 0) {
            let emptyMessage = 'У вас пока нет записей на прием';
            if (filter !== 'all') {
                emptyMessage = 'Нет записей с выбранным статусом';
            }
            visitsContainer.innerHTML = `
                <div class="empty-visits">
                    <div class="empty-visits-icon">📅</div>
                    <div class="empty-visits-text">${emptyMessage}</div>
                </div>
            `;
            return;
        }
        
        visitsContainer.innerHTML = '';
        
        if (upcoming.length > 0 && past.length > 0) {
            const upcomingDivider = document.createElement('div');
            upcomingDivider.className = 'visits-divider';
            upcomingDivider.innerHTML = '<span>📌 Предстоящие визиты</span>';
            visitsContainer.appendChild(upcomingDivider);
        }
        
        upcoming.forEach(visit => {
            visitsContainer.appendChild(createVisitElement(visit, doctors, services));
        });
        
        if (upcoming.length > 0 && past.length > 0) {
            const pastDivider = document.createElement('div');
            pastDivider.className = 'visits-divider';
            pastDivider.innerHTML = '<span>📋 История посещений</span>';
            visitsContainer.appendChild(pastDivider);
        } else if (past.length > 0 && upcoming.length === 0) {
            const historyDivider = document.createElement('div');
            historyDivider.className = 'visits-divider';
            historyDivider.innerHTML = '<span>📋 История посещений</span>';
            visitsContainer.appendChild(historyDivider);
        }
        
        past.forEach(visit => {
            visitsContainer.appendChild(createVisitElement(visit, doctors, services));
        });
        
    } catch(e) {
        console.error('Ошибка загрузки визитов:', e);
        visitsContainer.innerHTML = `
            <div class="empty-visits">
                <div class="empty-visits-icon">⚠️</div>
                <div class="empty-visits-text">Ошибка загрузки истории. Проверьте подключение к серверу.</div>
            </div>
        `;
    }
}

function createVisitElement(visit, doctors, services) {
    const doctor = doctors.find(d => d.id === visit.doctorId);
    const service = services.find(s => s.id === visit.serviceId);
    
    const visitDate = new Date(visit.date);
    const formattedDate = visitDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const statusConfig = {
        pending: { text: '⏳ Ожидает подтверждения', class: 'pending' },
        confirmed: { text: '✅ Подтверждена', class: 'confirmed' },
        completed: { text: '✔️ Завершена', class: 'completed' },
        cancelled: { text: '❌ Отменена', class: 'cancelled' }
    };
    
    const status = statusConfig[visit.status] || statusConfig.pending;
    
    const visitItem = document.createElement('div');
    visitItem.className = `visit-item ${status.class}`;
    
    const today = new Date().toISOString().split('T')[0];
    const isPast = visit.date < today;
    
    visitItem.innerHTML = `
        <div class="visit-header">
            <span class="visit-date">${formattedDate}</span>
            <span class="visit-time">🕐 ${visit.time}</span>
        </div>
        <div class="visit-doctor">
            ${doctor ? `${doctor.lastName} ${doctor.firstName} ${doctor.middleName || ''}`.trim() : 'Врач не указан'}
            ${doctor ? `<span style="font-size: 12px; color: #9CA3AF;">(${doctor.specialization})</span>` : ''}
        </div>
        <div class="visit-service">
            ${service ? service.name : 'Услуга не указана'}
        </div>
        ${visit.comment ? `<div class="visit-comment">${escapeHtmlForProfile(visit.comment)}</div>` : ''}
        <span class="visit-status ${status.class}">${status.text}</span>
        ${isPast && visit.status === 'completed' ? '<div style="margin-top: 8px; font-size: 12px; color: #10B981;">✓ Прием состоялся</div>' : ''}
        ${!isPast && visit.status === 'confirmed' ? '<div style="margin-top: 8px; font-size: 12px; color: #3B82F6;">⏰ Напоминаем о записи</div>' : ''}
    `;
    
    return visitItem;
}

function escapeHtmlForProfile(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

async function openProfileModal() {
    const modal = document.getElementById('profileModal');
    
    if (!modal) {
        createProfileModal();
        setTimeout(() => openProfileModal(), 100);
        return;
    }
    
    const sessionUser = getCurrentUser();
    
    if (!sessionUser) {
        if (confirm('Для просмотра профиля необходимо войти в аккаунт. Перейти на страницу входа?')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    await loadUserToForm();
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

function logoutUser() {
    if (confirm('Вы уверены, что хотите выйти из аккаунта?')) {
        sessionStorage.removeItem('dental_club_session');
        localStorage.removeItem('dental_club_session');
        currentUser = null;
        
        showProfileToast('👋 Вы вышли из аккаунта', 'success');
        closeProfileModal();
        
        updateHeaderUserDisplay();
        
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
}

function showProfileToast(message, type = 'success') {
    let toast = document.querySelector('.profile-toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'profile-toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = `profile-toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function updateHeaderUserDisplay() {
    const sessionUser = getCurrentUser();
    const loginLink = document.querySelector('.login-link');
    const mobileLoginLink = document.querySelector('.mobile-login-link');
    
    if (sessionUser && sessionUser.firstName && sessionUser.lastName && (loginLink || mobileLoginLink)) {
        const userName = `${sessionUser.firstName} ${sessionUser.lastName}`.trim();
        if (loginLink && !loginLink.closest('.mobile-menu')) {
            loginLink.textContent = `👤 ${userName}`;
            loginLink.href = '#';
            loginLink.onclick = (e) => {
                e.preventDefault();
                openProfileModal();
            };
        }
        if (mobileLoginLink) {
            mobileLoginLink.textContent = `👤 ${userName}`;
            mobileLoginLink.href = '#';
            mobileLoginLink.onclick = (e) => {
                e.preventDefault();
                openProfileModal();
            };
        }
    } else if (loginLink || mobileLoginLink) {
        if (loginLink && !loginLink.closest('.mobile-menu') && !loginLink.getAttribute('data-no-override')) {
            loginLink.textContent = 'ВОЙТИ';
            loginLink.href = 'login.html';
            loginLink.onclick = null;
        }
        if (mobileLoginLink && !mobileLoginLink.getAttribute('data-no-override')) {
            mobileLoginLink.textContent = 'ВОЙТИ';
            mobileLoginLink.href = 'login.html';
            mobileLoginLink.onclick = null;
        }
    }
}

function checkAuthOnLoad() {
    const user = getCurrentUser();
    if (user) {
        updateHeaderUserDisplay();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createProfileModal();
    checkAuthOnLoad();
});