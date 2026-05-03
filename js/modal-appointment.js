function createAppointmentModal() {
    if (document.getElementById('visitorAppointmentModal')) {
        return;
    }
    
    const modalHTML = `
        <div id="visitorAppointmentModal" class="appointment-modal">
            <div class="appointment-modal-content">
                <div class="appointment-modal-header">
                    <h2>📅 Запись на прием</h2>
                    <span class="appointment-modal-close">&times;</span>
                </div>
                <div class="appointment-modal-body">
                    <form id="visitorAppointmentForm">
                        <div class="appointment-form-group">
                            <label>Ваше имя <span class="required">*</span></label>
                            <input type="text" id="visitorName" required placeholder="Иванов Иван Иванович">
                        </div>
                        
                        <div class="appointment-form-row">
                            <div class="appointment-form-group">
                                <label>Телефон <span class="required">*</span></label>
                                <input type="tel" id="visitorPhone" required placeholder="+375 (29) 123-45-67">
                                <small style="display: block; font-size: 11px; color: #6B7280; margin-top: 5px;">
                                    Форматы: +375 XX XXX-XX-XX, +7 XXX XXX-XX-XX, 8XXXXXXXXXX
                                </small>
                            </div>
                            <div class="appointment-form-group">
                                <label>Email</label>
                                <input type="email" id="visitorEmail" placeholder="ivanov@example.com">
                            </div>
                        </div>
                        
                        <div class="appointment-form-row">
                            <div class="appointment-form-group">
                                <label>Врач <span class="required">*</span></label>
                                <select id="visitorDoctorId" required>
                                    <option value="">-- Выберите врача --</option>
                                </select>
                            </div>
                            <div class="appointment-form-group">
                                <label>Услуга <span class="required">*</span></label>
                                <select id="visitorServiceId" required>
                                    <option value="">-- Выберите услугу --</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="appointment-form-row">
                            <div class="appointment-form-group">
                                <label>Дата <span class="required">*</span></label>
                                <input type="date" id="visitorDate" required>
                            </div>
                            <div class="appointment-form-group">
                                <label>Время <span class="required">*</span></label>
                                <select id="visitorTime" required>
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
                            <label>Комментарий</label>
                            <textarea id="visitorComment" placeholder="Дополнительная информация, жалобы, пожелания..."></textarea>
                        </div>
                        
                        <button type="submit" class="appointment-submit-btn">Отправить заявку</button>
                    </form>
                    <div id="visitorAppointmentSuccess" style="display: none;">
                        <div class="appointment-success">
                            <div class="appointment-success-icon">✅</div>
                            <h3>Заявка отправлена!</h3>
                            <p>Мы свяжемся с вами в ближайшее время<br>для подтверждения записи.</p>
                            <button class="appointment-success-btn" onclick="closeVisitorAppointmentModal()">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    if (!document.querySelector('link[href*="modal-appointment.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/modal-appointment.css';
        document.head.appendChild(link);
    }
    
    initVisitorAppointmentModal();
}

function loadVisitorAppointmentData() {
    let doctors = [];
    let services = [];
    
    try {
        const doctorsStored = localStorage.getItem('dental_doctors');
        if (doctorsStored) {
            doctors = JSON.parse(doctorsStored).filter(d => d.active);
        }
        
        const servicesStored = localStorage.getItem('dental_services');
        if (servicesStored) {
            services = JSON.parse(servicesStored).filter(s => s.active);
        }
    } catch(e) {
        console.error('Ошибка загрузки данных:', e);
    }
    
    return { doctors, services };
}

function formatVisitorPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 12) {
        value = value.slice(0, 12);
    }
    
    let countryCode = '';
    let formatted = '';
    
    if (value.startsWith('375') && value.length >= 3) {
        countryCode = '375';
        const rest = value.slice(3);
        
        if (rest.length === 0) {
            formatted = '+375';
        } else if (rest.length <= 2) {
            formatted = '+375 (' + rest;
        } else if (rest.length <= 5) {
            formatted = '+375 (' + rest.slice(0, 2) + ') ' + rest.slice(2);
        } else if (rest.length <= 7) {
            formatted = '+375 (' + rest.slice(0, 2) + ') ' + rest.slice(2, 5) + '-' + rest.slice(5);
        } else {
            formatted = '+375 (' + rest.slice(0, 2) + ') ' + rest.slice(2, 5) + '-' + rest.slice(5, 7);
            if (rest.length > 7) {
                formatted += '-' + rest.slice(7, 9);
            }
        }
        input.value = formatted;
        return;
    }
    
    if (value.startsWith('7') && value.length >= 1) {
        countryCode = '7';
        const rest = value.slice(1);
        
        if (rest.length === 0) {
            formatted = '+7';
        } else if (rest.length <= 3) {
            formatted = '+7 (' + rest;
        } else if (rest.length <= 6) {
            formatted = '+7 (' + rest.slice(0, 3) + ') ' + rest.slice(3);
        } else if (rest.length <= 8) {
            formatted = '+7 (' + rest.slice(0, 3) + ') ' + rest.slice(3, 6) + '-' + rest.slice(6);
        } else {
            formatted = '+7 (' + rest.slice(0, 3) + ') ' + rest.slice(3, 6) + '-' + rest.slice(6, 8);
            if (rest.length > 8) {
                formatted += '-' + rest.slice(8, 10);
            }
        }
        input.value = formatted;
        return;
    }
    
    if (value.startsWith('8') && value.length >= 1) {
        const rest = value.slice(1);
        
        if (rest.length === 0) {
            formatted = '8';
        } else if (rest.length <= 3) {
            formatted = '8 (' + rest;
        } else if (rest.length <= 6) {
            formatted = '8 (' + rest.slice(0, 3) + ') ' + rest.slice(3);
        } else if (rest.length <= 8) {
            formatted = '8 (' + rest.slice(0, 3) + ') ' + rest.slice(3, 6) + '-' + rest.slice(6);
        } else {
            formatted = '8 (' + rest.slice(0, 3) + ') ' + rest.slice(3, 6) + '-' + rest.slice(6, 8);
            if (rest.length > 8) {
                formatted += '-' + rest.slice(8, 10);
            }
        }
        input.value = formatted;
        return;
    }
    
    if (value.length === 0) {
        input.value = '';
    } else if (value.length <= 3) {
        input.value = value;
    } else if (value.length <= 6) {
        input.value = value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length <= 8) {
        input.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
    } else {
        input.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 8) + '-' + value.slice(8, 10);
    }
}

function validateVisitorPhone(phone) {
    const digits = phone.replace(/\D/g, '');
    
    if (digits.startsWith('375') && digits.length === 12) {
        return true;
    }
    if ((digits.startsWith('7') || digits.startsWith('8')) && digits.length === 11) {
        return true;
    }
    if (digits.length >= 10 && digits.length <= 12) {
        return true;
    }
    
    return false;
}

function cleanVisitorPhone(phone) {
    return phone.replace(/\D/g, '');
}

function initVisitorAppointmentModal() {
    const modal = document.getElementById('visitorAppointmentModal');
    const closeBtn = document.querySelector('.appointment-modal-close');
    const form = document.getElementById('visitorAppointmentForm');
    const phoneInput = document.getElementById('visitorPhone');
    const dateInput = document.getElementById('visitorDate');
    
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) {
        dateInput.min = today;
        dateInput.addEventListener('change', function() {
            if (this.value < today) {
                this.value = today;
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatVisitorPhone(this);
        });
        
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validateVisitorPhone(this.value)) {
                this.style.borderColor = '#EF4444';
                this.style.backgroundColor = '#FEF2F2';
                
                let errorMsg = this.parentElement.querySelector('.phone-error');
                if (!errorMsg) {
                    errorMsg = document.createElement('small');
                    errorMsg.className = 'phone-error';
                    errorMsg.style.color = '#EF4444';
                    errorMsg.style.display = 'block';
                    errorMsg.style.marginTop = '5px';
                    errorMsg.style.fontSize = '11px';
                    this.parentElement.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Введите корректный номер телефона (например, +375 29 123-45-67 или +7 777 123-45-67)';
            } else if (this.value) {
                this.style.borderColor = '#E5E7EB';
                this.style.backgroundColor = 'white';
                const errorMsg = this.parentElement.querySelector('.phone-error');
                if (errorMsg) errorMsg.remove();
            }
        });
        
        phoneInput.addEventListener('focus', function() {
            this.style.borderColor = '#E5E7EB';
            this.style.backgroundColor = 'white';
            const errorMsg = this.parentElement.querySelector('.phone-error');
            if (errorMsg) errorMsg.remove();
        });
    }
    
    const { doctors, services } = loadVisitorAppointmentData();
    
    const doctorSelect = document.getElementById('visitorDoctorId');
    if (doctorSelect && doctors.length > 0) {
        doctorSelect.innerHTML = '<option value="">-- Выберите врача --</option>';
        doctors.forEach(doctor => {
            const name = `${doctor.lastName} ${doctor.firstName} ${doctor.middleName || ''}`.trim();
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = name + ' (' + doctor.specialization + ')';
            doctorSelect.appendChild(option);
        });
    }
    
    const serviceSelect = document.getElementById('visitorServiceId');
    if (serviceSelect && services.length > 0) {
        serviceSelect.innerHTML = '<option value="">-- Выберите услугу --</option>';
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVisitorAppointmentModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVisitorAppointmentModal();
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', submitVisitorAppointment);
    }
}

function openVisitorAppointmentModal() {
    const modal = document.getElementById('visitorAppointmentModal');
    const form = document.getElementById('visitorAppointmentForm');
    const success = document.getElementById('visitorAppointmentSuccess');
    
    if (!modal) {
        createAppointmentModal();
        setTimeout(() => openVisitorAppointmentModal(), 100);
        return;
    }
    
    const { doctors, services } = loadVisitorAppointmentData();
    
    const doctorSelect = document.getElementById('visitorDoctorId');
    if (doctorSelect) {
        doctorSelect.innerHTML = '<option value="">-- Выберите врача --</option>';
        doctors.forEach(doctor => {
            const name = `${doctor.lastName} ${doctor.firstName} ${doctor.middleName || ''}`.trim();
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = name + ' (' + doctor.specialization + ')';
            doctorSelect.appendChild(option);
        });
    }
    
    const serviceSelect = document.getElementById('visitorServiceId');
    if (serviceSelect) {
        serviceSelect.innerHTML = '<option value="">-- Выберите услугу --</option>';
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    }
    
    if (form) form.style.display = 'block';
    if (success) success.style.display = 'none';
    
    const phoneInput = document.getElementById('visitorPhone');
    if (phoneInput) {
        phoneInput.style.borderColor = '#E5E7EB';
        phoneInput.style.backgroundColor = 'white';
        const errorMsg = phoneInput.parentElement.querySelector('.phone-error');
        if (errorMsg) errorMsg.remove();
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeVisitorAppointmentModal() {
    const modal = document.getElementById('visitorAppointmentModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function saveVisitorAppointment(appointmentData) {
    let appointments = [];
    try {
        const stored = localStorage.getItem('dental_appointments');
        if (stored) {
            appointments = JSON.parse(stored);
        }
    } catch(e) {
        appointments = [];
    }
    
    const newId = Math.max(...appointments.map(a => a.id), 0) + 1;
    const newAppointment = {
        id: newId,
        ...appointmentData,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    localStorage.setItem('dental_appointments', JSON.stringify(appointments));
    
    return newAppointment;
}

function submitVisitorAppointment(event) {
    event.preventDefault();
    
    const name = document.getElementById('visitorName').value.trim();
    const phoneRaw = document.getElementById('visitorPhone').value.trim();
    const email = document.getElementById('visitorEmail').value.trim();
    const doctorId = parseInt(document.getElementById('visitorDoctorId').value);
    const serviceId = parseInt(document.getElementById('visitorServiceId').value);
    const date = document.getElementById('visitorDate').value;
    const time = document.getElementById('visitorTime').value;
    const comment = document.getElementById('visitorComment').value;
    
    if (!name) {
        alert('Пожалуйста, введите ваше имя!');
        document.getElementById('visitorName').focus();
        return;
    }
    
    if (!phoneRaw) {
        alert('Пожалуйста, введите номер телефона!');
        document.getElementById('visitorPhone').focus();
        return;
    }
    
    if (!validateVisitorPhone(phoneRaw)) {
        alert('Пожалуйста, введите корректный номер телефона!\n\nФорматы:\n• Беларусь: +375 29 123-45-67\n• Россия/Казахстан: +7 777 123-45-67 или 8 777 123-45-67');
        document.getElementById('visitorPhone').focus();
        return;
    }
    
    if (!doctorId || isNaN(doctorId)) {
        alert('Пожалуйста, выберите врача!');
        document.getElementById('visitorDoctorId').focus();
        return;
    }
    
    if (!serviceId || isNaN(serviceId)) {
        alert('Пожалуйста, выберите услугу!');
        document.getElementById('visitorServiceId').focus();
        return;
    }
    
    if (!date) {
        alert('Пожалуйста, выберите дату!');
        document.getElementById('visitorDate').focus();
        return;
    }
    
    if (!time) {
        alert('Пожалуйста, выберите время!');
        document.getElementById('visitorTime').focus();
        return;
    }
    
    const cleanPhone = cleanVisitorPhone(phoneRaw);
    
    const appointmentData = {
        patientName: name,
        phone: cleanPhone,
        phoneFormatted: phoneRaw, 
        email: email,
        doctorId: doctorId,
        serviceId: serviceId,
        date: date,
        time: time,
        comment: comment
    };
    
    saveVisitorAppointment(appointmentData);
    
    const form = document.getElementById('visitorAppointmentForm');
    const success = document.getElementById('visitorAppointmentSuccess');
    
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';
    
    const formElement = document.getElementById('visitorAppointmentForm');
    if (formElement) formElement.reset();
}

function bindAppointmentButtons() {
    const buttons = document.querySelectorAll('.btn-white, .btn-primary, .btn-outline, .btn-submit, .btn, [class*="btn"], button');
    
    buttons.forEach(button => {
        const buttonText = (button.textContent || button.innerText || '').toUpperCase();
        const isAppointmentBtn = 
            buttonText.includes('ЗАПИСАТЬ') || 
            buttonText.includes('ЗАПИСЬ') ||
            buttonText.includes('ЗАПИСАТЬСЯ') ||
            button.classList.contains('btn-white') ||
            button.classList.contains('btn-primary') ||
            (button.classList.contains('btn-outline') && buttonText.includes('ЗАПИС')) ||
            button.id === 'openReviewModal'; 
        
        if (isAppointmentBtn && button.id !== 'openReviewModal') {
            button.removeEventListener('click', openVisitorAppointmentModal);
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openVisitorAppointmentModal();
            });
        }
    });
}

window.openVisitorAppointmentModal = openVisitorAppointmentModal;
window.closeVisitorAppointmentModal = closeVisitorAppointmentModal;

document.addEventListener('DOMContentLoaded', function() {
    createAppointmentModal();
    bindAppointmentButtons();
    
    const observer = new MutationObserver(function() {
        bindAppointmentButtons();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});