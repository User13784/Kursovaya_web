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
                            </div>
                            <div class="appointment-form-group">
                                <label>Email</label>
                                <input type="email" id="visitorEmail" placeholder="ivanov@example.com">
                            </div>
                        </div>
                        
                        <div class="appointment-form-group">
                            <label>Выберите услугу <span class="required">*</span></label>
                            <select id="visitorServiceId" required>
                                <option value="">-- Выберите услугу --</option>
                            </select>
                        </div>
                        
                        <div class="appointment-form-group">
                            <label>Выберите врача <span class="required">*</span></label>
                            <select id="visitorDoctorId" required>
                                <option value="">-- Выберите врача --</option>
                            </select>
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
                            <textarea id="visitorComment" rows="3" placeholder="Дополнительная информация..."></textarea>
                        </div>
                        
                        <button type="submit" class="appointment-submit-btn">📝 ЗАПИСАТЬСЯ</button>
                    </form>
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
    
    initAppointmentModal();
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
            serviceSelect.innerHTML = '<option value="">-- Выберите услугу --</option>';
            services.filter(s => s.active).forEach(service => {
                const option = document.createElement('option');
                option.value = service.id;
                option.textContent = service.name;
                serviceSelect.appendChild(option);
            });
        }
        
        if (doctorSelect) {
            doctorSelect.innerHTML = '<option value="">-- Выберите врача --</option>';
            doctors.filter(d => d.active).forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = `${doctor.lastName} ${doctor.firstName} ${doctor.middleName || ''}`.trim();
                doctorSelect.appendChild(option);
            });
        }
        
        const dateInput = document.getElementById('visitorDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
        
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

function openVisitorAppointmentModal() {
    const modal = document.getElementById('visitorAppointmentModal');
    if (!modal) {
        createAppointmentModal();
        setTimeout(() => openVisitorAppointmentModal(), 100);
        return;
    }
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
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
    
    const name = document.getElementById('visitorName')?.value.trim();
    const phone = document.getElementById('visitorPhone')?.value.trim();
    const email = document.getElementById('visitorEmail')?.value.trim();
    const serviceId = document.getElementById('visitorServiceId')?.value;
    const doctorId = document.getElementById('visitorDoctorId')?.value;
    const date = document.getElementById('visitorDate')?.value;
    const time = document.getElementById('visitorTime')?.value;
    const comment = document.getElementById('visitorComment')?.value;
    
    if (!name || !phone || !serviceId || !doctorId || !date || !time) {
        showAppointmentToast('Заполните все обязательные поля!', 'error');
        return;
    }
    
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
            showAppointmentToast('✅ Запись успешно создана! Мы свяжемся с вами для подтверждения.', 'success');
            closeAppointmentModal();
            event.target.reset();
        } else {
            throw new Error('Ошибка при сохранении');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showAppointmentToast('❌ Ошибка при создании записи. Попробуйте позже.', 'error');
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
        toast.style.cssText = `
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

document.addEventListener('DOMContentLoaded', function() {
    createAppointmentModal();
});

window.openVisitorAppointmentModal = openVisitorAppointmentModal;
window.closeAppointmentModal = closeAppointmentModal;