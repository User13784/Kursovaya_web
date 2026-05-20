function getModalTranslation(key, defaultValue = '') {
    if (typeof window.translate === 'function') {
        const translated = window.translate(key);
        if (translated && translated !== key) {
            return translated;
        }
    }
    return defaultValue;
}

function createAppointmentModal() {
    if (document.getElementById('visitorAppointmentModal')) {
        return;
    }
    
    const modalHTML = `
        <div id="visitorAppointmentModal" class="appointment-modal">
            <div class="appointment-modal-content">
                <div class="appointment-modal-header">
                    <h2 id="modalAppointmentTitle">📅 Запись на прием</h2>
                    <span class="appointment-modal-close">&times;</span>
                </div>
                <div class="appointment-modal-body">
                    <form id="visitorAppointmentForm">
                        <div class="appointment-form-group">
                            <label id="modalNameLabel">Ваше имя <span class="required">*</span></label>
                            <input type="text" id="visitorName" required placeholder="Иванов Иван Иванович" style="background: transparent; border-bottom: 1px solid #9F9F9F; border-top: none; border-left: none; border-right: none; padding: 12px 5px 12px 8px; width: 100%; box-sizing: border-box;">
                        </div>
                        
                        <div class="appointment-form-row">
                            <div class="appointment-form-group">
                                <label id="modalPhoneLabel">Телефон <span class="required">*</span></label>
                                <input type="tel" id="visitorPhone" required placeholder="+375 (29) 123-45-67" style="background: transparent; border-bottom: 1px solid #9F9F9F; border-top: none; border-left: none; border-right: none; padding: 12px 5px 12px 8px; width: 100%; box-sizing: border-box;">
                            </div>
                            <div class="appointment-form-group">
                                <label id="modalEmailLabel">Email</label>
                                <input type="email" id="visitorEmail" placeholder="ivanov@example.com" style="background: transparent; border-bottom: 1px solid #9F9F9F; border-top: none; border-left: none; border-right: none; padding: 12px 5px 12px 8px; width: 100%; box-sizing: border-box;">
                            </div>
                        </div>
                        
                        <div class="appointment-form-group">
                            <label id="modalServiceLabel">Выберите услугу <span class="required">*</span></label>
                            <select id="visitorServiceId" required style="background: transparent; border-bottom: 1px solid #9F9F9F; border-top: none; border-left: none; border-right: none; padding: 12px 5px 12px 8px; width: 100%; box-sizing: border-box;">
                                <option value="">-- Выберите услугу --</option>
                            </select>
                        </div>
                        
                        <div class="appointment-form-group">
                            <label id="modalDoctorLabel">Выберите врача <span class="required">*</span></label>
                            <select id="visitorDoctorId" required style="background: transparent; border-bottom: 1px solid #9F9F9F; border-top: none; border-left: none; border-right: none; padding: 12px 5px 12px 8px; width: 100%; box-sizing: border-box;">
                                <option value="">-- Выберите врача --</option>
                            </select>
                        </div>
                        
                        <div class="appointment-form-row">
                            <div class="appointment-form-group">
                                <label id="modalDateLabel">Дата <span class="required">*</span></label>
                                <input type="date" id="visitorDate" required style="background: transparent; border-bottom: 1px solid #9F9F9F; border-top: none; border-left: none; border-right: none; padding: 12px 5px 12px 8px; width: 100%; box-sizing: border-box;">
                            </div>
                            <div class="appointment-form-group">
                                <label id="modalTimeLabel">Время <span class="required">*</span></label>
                                <select id="visitorTime" required style="background: transparent; border-bottom: 1px solid #9F9F9F; border-top: none; border-left: none; border-right: none; padding: 12px 5px 12px 8px; width: 100%; box-sizing: border-box;">
                                    <option value="">-- Выберите время --</option>
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                    <option value="18:00">18:00</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="appointment-form-group">
                            <label id="modalCommentLabel">Комментарий</label>
                            <textarea id="visitorComment" rows="3" placeholder="Дополнительная информация..." style="background: transparent; border-bottom: 1px solid #9F9F9F; border-top: none; border-left: none; border-right: none; padding: 12px 5px 12px 8px; width: 100%; box-sizing: border-box; resize: vertical;"></textarea>
                        </div>
                        
                        <button type="submit" class="appointment-submit-btn" id="modalSubmitBtn" style="background: #2F353B; color: white; border: none; padding: 14px; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 20px; width: 100%;">📝 ЗАПИСАТЬСЯ</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .appointment-toast {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #2F353B;
                color: white;
                padding: 12px 24px;
                border-radius: 12px;
                font-family: 'Mulish', sans-serif;
                font-size: 14px;
                z-index: 10010;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                pointer-events: none;
            }
            .appointment-toast.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    if (!document.querySelector('link[href*="modal-appointment.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/modal-appointment.css';
        document.head.appendChild(link);
    }
    
    initAppointmentModal();
    updateAppointmentModalTranslations();
}

function updateAppointmentModalTranslations() {
    const modal = document.getElementById('visitorAppointmentModal');
    if (!modal) return;
    
    const title = document.getElementById('modalAppointmentTitle');
    if (title) title.textContent = getModalTranslation('modal_appointment_title', '📅 Запись на прием');
    
    const nameLabel = document.getElementById('modalNameLabel');
    if (nameLabel) nameLabel.innerHTML = getModalTranslation('modal_appointment_name', 'Ваше имя') + ' <span class="required">*</span>';
    
    const phoneLabel = document.getElementById('modalPhoneLabel');
    if (phoneLabel) phoneLabel.innerHTML = getModalTranslation('modal_appointment_phone', 'Телефон') + ' <span class="required">*</span>';
    
    const emailLabel = document.getElementById('modalEmailLabel');
    if (emailLabel) emailLabel.textContent = getModalTranslation('modal_appointment_email', 'Email');
    
    const serviceLabel = document.getElementById('modalServiceLabel');
    if (serviceLabel) serviceLabel.innerHTML = getModalTranslation('modal_appointment_select_service', 'Выберите услугу') + ' <span class="required">*</span>';
    
    const doctorLabel = document.getElementById('modalDoctorLabel');
    if (doctorLabel) doctorLabel.innerHTML = getModalTranslation('modal_appointment_select_doctor', 'Выберите врача') + ' <span class="required">*</span>';
    
    const dateLabel = document.getElementById('modalDateLabel');
    if (dateLabel) dateLabel.innerHTML = getModalTranslation('modal_appointment_date', 'Дата') + ' <span class="required">*</span>';
    
    const timeLabel = document.getElementById('modalTimeLabel');
    if (timeLabel) timeLabel.innerHTML = getModalTranslation('modal_appointment_time', 'Время') + ' <span class="required">*</span>';
    
    const commentLabel = document.getElementById('modalCommentLabel');
    if (commentLabel) commentLabel.textContent = getModalTranslation('modal_appointment_comment', 'Комментарий');
    
    const commentTextarea = document.getElementById('visitorComment');
    if (commentTextarea) commentTextarea.placeholder = getModalTranslation('modal_appointment_comment_placeholder', 'Дополнительная информация...');
    
    const submitBtn = document.getElementById('modalSubmitBtn');
    if (submitBtn) submitBtn.textContent = getModalTranslation('modal_appointment_submit', '📝 ЗАПИСАТЬСЯ');
    
    const serviceSelect = document.getElementById('visitorServiceId');
    if (serviceSelect && serviceSelect.options[0]) {
        serviceSelect.options[0].textContent = getModalTranslation('modal_appointment_select_service', '-- Выберите услугу --');
    }
    
    const doctorSelect = document.getElementById('visitorDoctorId');
    if (doctorSelect && doctorSelect.options[0]) {
        doctorSelect.options[0].textContent = getModalTranslation('modal_appointment_select_doctor', '-- Выберите врача --');
    }
    
    const timeSelect = document.getElementById('visitorTime');
    if (timeSelect && timeSelect.options[0]) {
        timeSelect.options[0].textContent = getModalTranslation('modal_appointment_time', '-- Выберите время --');
    }
}

function initAppointmentModal() {
    const modal = document.getElementById('visitorAppointmentModal');
    const closeBtn = document.querySelector('.appointment-modal-close');
    const form = document.getElementById('visitorAppointmentForm');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAppointmentModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAppointmentModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeAppointmentModal();
        }
    });
    
    if (form) {
        form.addEventListener('submit', submitAppointment);
    }
    
    loadServicesAndDoctors();
}

function isUserLoggedIn() {
    const session = localStorage.getItem('dental_club_session') || sessionStorage.getItem('dental_club_session');
    if (session) {
        try {
            const userData = JSON.parse(session);
            return userData && userData.userId;
        } catch(e) {
            return false;
        }
    }
    return false;
}

function getCurrentUserData() {
    const session = localStorage.getItem('dental_club_session') || sessionStorage.getItem('dental_club_session');
    if (session) {
        try {
            return JSON.parse(session);
        } catch(e) {
            return null;
        }
    }
    return null;
}

function fillFormWithUserData() {
    const userData = getCurrentUserData();
    if (!userData) return;
    
    const nameInput = document.getElementById('visitorName');
    const phoneInput = document.getElementById('visitorPhone');
    const emailInput = document.getElementById('visitorEmail');
    
    if (nameInput && !nameInput.value && userData.lastName && userData.firstName) {
        nameInput.value = `${userData.lastName} ${userData.firstName}`.trim();
    }
    
    if (phoneInput && !phoneInput.value && userData.phone) {
        phoneInput.value = userData.phone;
    }
    
    if (emailInput && !emailInput.value && userData.email) {
        emailInput.value = userData.email;
    }
}

function updateAvailableTimeSlots() {
    const dateInput = document.getElementById('visitorDate');
    const timeSelect = document.getElementById('visitorTime');
    
    if (!dateInput || !timeSelect) return;
    
    const selectedDate = dateInput.value;
    if (!selectedDate) {
        enableAllTimeSlots();
        return;
    }
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const isToday = selectedDate === todayStr;
    
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    
    const timeOptions = timeSelect.querySelectorAll('option');
    
    timeOptions.forEach(option => {
        const timeValue = option.value;
        if (timeValue && timeValue !== '') {
            if (isToday) {
                const [hours, minutes] = timeValue.split(':').map(Number);
                const isTimePassed = (hours < currentHour) || (hours === currentHour && minutes <= currentMinute);
                
                if (isTimePassed) {
                    option.disabled = true;
                    option.style.color = '#9CA3AF';
                    option.style.backgroundColor = 'transparent';
                    option.textContent = `${timeValue} (время прошло)`;
                } else {
                    option.disabled = false;
                    option.style.color = '';
                    option.style.backgroundColor = 'transparent';
                    option.textContent = timeValue;
                }
            } else {
                option.disabled = false;
                option.style.color = '';
                option.style.backgroundColor = 'transparent';
                if (option.textContent.includes('(время прошло)')) {
                    option.textContent = timeValue;
                }
            }
        }
    });
}

function enableAllTimeSlots() {
    const timeSelect = document.getElementById('visitorTime');
    if (!timeSelect) return;
    
    const timeOptions = timeSelect.querySelectorAll('option');
    timeOptions.forEach(option => {
        if (option.value && option.value !== '') {
            option.disabled = false;
            option.style.color = '';
            option.style.backgroundColor = 'transparent';
            if (option.textContent.includes('(время прошло)')) {
                option.textContent = option.value;
            }
        }
    });
}

function setupDatePicker() {
    const dateInput = document.getElementById('visitorDate');
    if (!dateInput) return;
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    dateInput.min = todayStr;
    
    dateInput.addEventListener('keydown', function(e) {
        e.preventDefault();
        this.showPicker();
    });
    
    dateInput.addEventListener('click', function() {
        this.showPicker();
    });
    
    dateInput.addEventListener('change', function() {
        const selectedDate = this.value;
        if (selectedDate && selectedDate < todayStr) {
            showAppointmentToast('❌ Нельзя выбрать дату в прошлом!', 'error');
            this.value = '';
            enableAllTimeSlots();
        } else {
            updateAvailableTimeSlots();
        }
    });
}

async function loadServicesAndDoctors() {
    try {
        const [servicesRes, doctorsRes] = await Promise.all([
            fetch('http://localhost:3000/services'),
            fetch('http://localhost:3000/doctors')
        ]);
        
        const services = await servicesRes.json();
        const doctors = await doctorsRes.json();
        
        const serviceSelect = document.getElementById('visitorServiceId');
        const doctorSelect = document.getElementById('visitorDoctorId');
        
        if (serviceSelect) {
            const selectOptionText = getModalTranslation('modal_appointment_select_service', '-- Выберите услугу --');
            serviceSelect.innerHTML = `<option value="">${selectOptionText}</option>`;
            services.filter(s => s.active).forEach(service => {
                const option = document.createElement('option');
                option.value = service.id;
                const serviceName = typeof service.name === 'object' 
                    ? (service.name.ru || service.name.en || 'Unknown')
                    : service.name;
                option.textContent = serviceName;
                serviceSelect.appendChild(option);
            });
        }
        
        if (doctorSelect) {
            const selectOptionText = getModalTranslation('modal_appointment_select_doctor', '-- Выберите врача --');
            doctorSelect.innerHTML = `<option value="">${selectOptionText}</option>`;
            doctors.filter(d => d.active).forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                let lastName = '', firstName = '';
                if (typeof doctor.lastName === 'object') {
                    lastName = doctor.lastName.ru || doctor.lastName.en || '';
                } else {
                    lastName = doctor.lastName || '';
                }
                if (typeof doctor.firstName === 'object') {
                    firstName = doctor.firstName.ru || doctor.firstName.en || '';
                } else {
                    firstName = doctor.firstName || '';
                }
                option.textContent = `${lastName} ${firstName}`.trim();
                doctorSelect.appendChild(option);
            });
        }
        
        setupDatePicker();
        updateAvailableTimeSlots();
        
        fillFormWithUserData();
        
        setInterval(function() {
            const dateInput = document.getElementById('visitorDate');
            if (dateInput && dateInput.value) {
                updateAvailableTimeSlots();
            }
        }, 60000);
        
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

function openVisitorAppointmentModal() {
    if (!isUserLoggedIn()) {
        showAppointmentToast('🔐 Для записи на прием необходимо войти в аккаунт. Перенаправление на страницу входа...', 'error');
        
        const modal = document.getElementById('visitorAppointmentModal');
        if (modal && modal.style.display === 'flex') {
            closeAppointmentModal();
        }
        
        setTimeout(() => {
            const isInPages = window.location.pathname.includes('/pages/');
            window.location.href = isInPages ? 'login.html' : '../pages/login.html';
        }, 2000);
        return;
    }
    
    const modal = document.getElementById('visitorAppointmentModal');
    if (!modal) {
        createAppointmentModal();
        setTimeout(() => openVisitorAppointmentModal(), 100);
        return;
    }
    updateAppointmentModalTranslations();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        setupDatePicker();
        updateAvailableTimeSlots();
        fillFormWithUserData();
    }, 100);
}

function closeAppointmentModal() {
    const modal = document.getElementById('visitorAppointmentModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

async function submitAppointment(event) {
    event.preventDefault();
    
    if (!isUserLoggedIn()) {
        showAppointmentToast('🔐 Для записи на прием необходимо войти в аккаунт', 'error');
        closeAppointmentModal();
        setTimeout(() => {
            const isInPages = window.location.pathname.includes('/pages/');
            window.location.href = isInPages ? 'login.html' : '../pages/login.html';
        }, 1500);
        return;
    }
    
    const name = document.getElementById('visitorName')?.value.trim();
    const phone = document.getElementById('visitorPhone')?.value.trim();
    const email = document.getElementById('visitorEmail')?.value.trim();
    const serviceId = document.getElementById('visitorServiceId')?.value;
    const doctorId = document.getElementById('visitorDoctorId')?.value;
    const date = document.getElementById('visitorDate')?.value;
    const time = document.getElementById('visitorTime')?.value;
    const comment = document.getElementById('visitorComment')?.value;
    
    const requiredFieldsText = getModalTranslation('modal_appointment_required_fields', 'Заполните все обязательные поля!');
    
    if (!name || !phone || !serviceId || !doctorId || !date || !time) {
        showAppointmentToast(requiredFieldsText, 'error');
        return;
    }
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    if (date < todayStr) {
        showAppointmentToast('❌ Нельзя записаться на прошедшую дату!', 'error');
        return;
    }
    
    if (date === todayStr) {
        const [hours, minutes] = time.split(':').map(Number);
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();
        
        if (hours < currentHour || (hours === currentHour && minutes <= currentMinute)) {
            showAppointmentToast('❌ Нельзя записаться на время, которое уже прошло!', 'error');
            return;
        }
    }
    
    const userData = getCurrentUserData();
    const userId = userData ? userData.userId : null;
    
    const appointmentData = {
        patientName: name,
        phone: phone.replace(/\D/g, ''),
        email: email || '',
        doctorId: parseInt(doctorId),
        serviceId: parseInt(serviceId),
        date: date,
        time: time,
        comment: comment || '',
        status: 'pending',
        userId: userId,
        createdAt: new Date().toISOString()
    };
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;
    if (submitBtn) {
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
    }
    
    try {
        const response = await fetch('http://localhost:3000/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...appointmentData, id: Date.now() })
        });
        
        if (response.ok) {
            const successText = getModalTranslation('modal_appointment_success', '✅ Запись успешно создана! Мы свяжемся с вами для подтверждения.');
            showAppointmentToast(successText, 'success');
            closeAppointmentModal();
            event.target.reset();
        } else {
            throw new Error('Ошибка при сохранении');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        const errorText = getModalTranslation('modal_appointment_error', '❌ Ошибка при создании записи. Попробуйте позже.');
        showAppointmentToast(errorText, 'error');
    } finally {
        if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
}

function showAppointmentToast(message, type = 'success') {
    let toast = document.querySelector('.appointment-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'appointment-toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.background = type === 'error' ? '#EF4444' : '#10B981';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    createAppointmentModal();
});

document.addEventListener('languageChanged', function() {
    updateAppointmentModalTranslations();
    loadServicesAndDoctors();
});

window.openVisitorAppointmentModal = openVisitorAppointmentModal;
window.closeAppointmentModal = closeAppointmentModal;
window.updateAppointmentModalTranslations = updateAppointmentModalTranslations;