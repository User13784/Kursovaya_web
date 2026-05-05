const API_BASE_URL = 'http://localhost:3000';


function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function getDoctorFullName(doctor) {
    let name = doctor.lastName + ' ' + doctor.firstName;
    if (doctor.middleName) name += ' ' + doctor.middleName;
    return name;
}

function getServiceNameById(serviceId, services) {
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : 'Неизвестно';
}

function getStatusWithEmoji(status) {
    const statuses = {
        pending: '⏳ Ожидает',
        confirmed: '✅ Подтверждена',
        completed: '✔️ Завершена',
        cancelled: '❌ Отменена'
    };
    return statuses[status] || status;
}


let services = [];
let serviceDetails = [];
let doctors = [];
let appointments = [];
let reviews = [];
let pricesData = null;
let scheduleData = null;
let discounts = [];

async function loadAllData() {
    try {
        const [servicesRes, serviceDetailsRes, doctorsRes, appointmentsRes, reviewsRes, pricesRes, scheduleRes, discountsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/services`),
            fetch(`${API_BASE_URL}/serviceDetails`),
            fetch(`${API_BASE_URL}/doctors`),
            fetch(`${API_BASE_URL}/appointments`),
            fetch(`${API_BASE_URL}/reviews`),
            fetch(`${API_BASE_URL}/prices`),
            fetch(`${API_BASE_URL}/schedule`),
            fetch(`${API_BASE_URL}/discounts`)
        ]);
        
        services = await servicesRes.json();
        serviceDetails = await serviceDetailsRes.json();
        doctors = await doctorsRes.json();
        appointments = await appointmentsRes.json();
        reviews = await reviewsRes.json();
        pricesData = await pricesRes.json();
        scheduleData = await scheduleRes.json();
        discounts = await discountsRes.json();
        
        console.log('Все данные загружены из API');
        return true;
    } catch (error) {
        console.error('Ошибка загрузки данных из API:', error);
        showToast('Ошибка подключения к серверу. Запустите json-server --watch db.json --port 3000', 'error');
        return false;
    }
}


async function renderServices() {
    const tbody = document.getElementById('servicesList');
    if (!tbody) return;
    
    const activeCount = services.filter(s => s.active).length;
    const servicesCount = document.getElementById('servicesCount');
    const activeServicesCount = document.getElementById('activeServicesCount');
    if (servicesCount) servicesCount.textContent = services.length;
    if (activeServicesCount) activeServicesCount.textContent = activeCount;
    
    tbody.innerHTML = '';
    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.id}</td>
            <td><strong>${escapeHtml(service.name)}</strong></td>
            <td><code>${escapeHtml(service.page)}</code></td>
            <td><span class="status-badge ${service.active ? 'status-active' : 'status-inactive'}">${service.active ? 'Активна' : 'Скрыта'}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-service" data-id="${service.id}">✏️ Редакт.</button>
                <button class="btn-delete-service" data-id="${service.id}">🗑️ Удалить</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    document.querySelectorAll('.btn-edit-service').forEach(btn => {
        btn.addEventListener('click', () => editService(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-service').forEach(btn => {
        btn.addEventListener('click', () => deleteService(parseInt(btn.dataset.id)));
    });
}

async function deleteService(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;
    if (confirm(`Удалить услугу "${service.name}"?`)) {
        try {
            await fetch(`${API_BASE_URL}/services/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderServices();
            await updateServiceDetailsFilter();
            await updateAppointmentFilters();
            showToast(`Услуга "${service.name}" удалена`);
        } catch (error) {
            showToast('Ошибка удаления', 'error');
        }
    }
}

async function saveService(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('serviceId').value);
    const name = document.getElementById('serviceName').value.trim();
    const page = document.getElementById('servicePage').value.trim();
    const bgImage = document.getElementById('serviceBgImage').value.trim();
    const title = document.getElementById('serviceTitle').value.trim();
    const active = document.getElementById('serviceActive').checked;
    
    if (!name || !page) {
        showToast('Заполните обязательные поля', 'error');
        return;
    }
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/services/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name, page, bgImage, title, active, order: id })
            });
            showToast(`Услуга "${name}" обновлена`);
        } else {
            const newId = Date.now();
            await fetch(`${API_BASE_URL}/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: newId, name, page, bgImage, title, active, order: services.length + 1 })
            });
            showToast(`Услуга "${name}" добавлена`);
        }
        
        await loadAllData();
        await renderServices();
        await updateServiceDetailsFilter();
        await updateAppointmentFilters();
        
        document.getElementById('serviceModal').style.display = 'none';
        document.getElementById('serviceForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}

function openServiceModal(editMode = false, serviceData = null) {
    document.getElementById('serviceModalTitle').textContent = editMode ? 'Редактировать услугу' : 'Добавить услугу';
    if (serviceData) {
        document.getElementById('serviceId').value = serviceData.id;
        document.getElementById('serviceName').value = serviceData.name;
        document.getElementById('servicePage').value = serviceData.page;
        document.getElementById('serviceBgImage').value = serviceData.bgImage || '';
        document.getElementById('serviceTitle').value = serviceData.title || '';
        document.getElementById('serviceActive').checked = serviceData.active;
    } else {
        document.getElementById('serviceForm').reset();
        document.getElementById('serviceId').value = '';
        document.getElementById('serviceActive').checked = true;
    }
    document.getElementById('serviceModal').style.display = 'flex';
}

function editService(id) {
    const service = services.find(s => s.id === id);
    if (service) {
        openServiceModal(true, service);
    }
}


async function renderServiceDetails() {
    const tbody = document.getElementById('serviceDetailsList');
    const filterValue = document.getElementById('detailServiceFilter')?.value || '';
    if (!tbody) return;
    
    let filtered = [...serviceDetails];
    if (filterValue) {
        filtered = filtered.filter(d => d.serviceId == filterValue);
    }
    
    tbody.innerHTML = '';
    for (const detail of filtered) {
        const service = services.find(s => s.id === detail.serviceId);
        const serviceName = service ? service.name : 'Неизвестно';
        const hasContent = detail.mainText || detail.features || detail.steps;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${detail.id}</td>
            <td><strong>${escapeHtml(serviceName)}</strong></td>
            <td>${detail.mainText ? detail.mainText.substring(0, 50) + '...' : '—'}</td>
            <td><span class="status-badge ${hasContent ? 'status-active' : 'status-inactive'}">${hasContent ? 'Заполнена' : 'Пустая'}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-detail" data-id="${detail.id}">✏️ Редакт.</button>
                <button class="btn-delete-detail" data-id="${detail.id}">🗑️ Удалить</button>
            </td>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.btn-edit-detail').forEach(btn => {
        btn.addEventListener('click', () => editServiceDetail(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-detail').forEach(btn => {
        btn.addEventListener('click', () => deleteServiceDetail(parseInt(btn.dataset.id)));
    });
}

async function updateServiceDetailsFilter() {
    const filter = document.getElementById('detailServiceFilter');
    if (!filter) return;
    filter.innerHTML = '<option value="">Все услуги</option>';
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        filter.appendChild(option);
    });
}

async function deleteServiceDetail(id) {
    const detail = serviceDetails.find(d => d.id === id);
    if (!detail) return;
    if (confirm(`Удалить детальную информацию?`)) {
        try {
            await fetch(`${API_BASE_URL}/serviceDetails/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderServiceDetails();
            showToast('Детальная информация удалена');
        } catch (error) {
            showToast('Ошибка удаления', 'error');
        }
    }
}

async function saveServiceDetail(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('detailId').value);
    const serviceId = parseInt(document.getElementById('detailServiceId').value);
    const mainText = document.getElementById('detailMainText').value;
    const secondaryText = document.getElementById('detailSecondaryText').value;
    const features = document.getElementById('detailFeatures').value;
    const steps = document.getElementById('detailSteps').value;
    const images = document.getElementById('detailImages').value;
    
    if (!serviceId) {
        showToast('Выберите услугу', 'error');
        return;
    }
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/serviceDetails/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, serviceId, mainText, secondaryText, features, steps, images })
            });
            showToast('Детальная информация обновлена');
        } else {
            const newId = Date.now();
            await fetch(`${API_BASE_URL}/serviceDetails`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: newId, serviceId, mainText, secondaryText, features, steps, images })
            });
            showToast('Детальная информация добавлена');
        }
        
        await loadAllData();
        await renderServiceDetails();
        
        document.getElementById('detailModal').style.display = 'none';
        document.getElementById('detailForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}

function openDetailModal(editMode = false, detailData = null) {
    document.getElementById('detailModalTitle').textContent = editMode ? 'Редактировать детальную информацию' : 'Добавить детальную информацию';
    
    const serviceSelect = document.getElementById('detailServiceId');
    serviceSelect.innerHTML = '<option value="">-- Выберите услугу --</option>';
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        serviceSelect.appendChild(option);
    });
    
    if (detailData) {
        document.getElementById('detailId').value = detailData.id;
        document.getElementById('detailServiceId').value = detailData.serviceId;
        document.getElementById('detailMainText').value = detailData.mainText || '';
        document.getElementById('detailSecondaryText').value = detailData.secondaryText || '';
        document.getElementById('detailFeatures').value = detailData.features || '';
        document.getElementById('detailSteps').value = detailData.steps || '';
        document.getElementById('detailImages').value = detailData.images || '';
    } else {
        document.getElementById('detailForm').reset();
        document.getElementById('detailId').value = '';
    }
    document.getElementById('detailModal').style.display = 'flex';
}

function editServiceDetail(id) {
    const detail = serviceDetails.find(d => d.id === id);
    if (detail) {
        openDetailModal(true, detail);
    }
}


async function renderDoctors() {
    const tbody = document.getElementById('doctorsList');
    if (!tbody) return;
    
    const doctorsCount = document.getElementById('doctorsCount');
    if (doctorsCount) doctorsCount.textContent = doctors.length;
    
    tbody.innerHTML = '';
    doctors.forEach(doctor => {
        const fullName = getDoctorFullName(doctor);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.photo ? `<img src="${doctor.photo}" class="doctor-photo-cell" onerror="this.src='../assets/images/placeholder.jpg'">` : '—'}</td>
            <td><strong>${escapeHtml(fullName)}</strong></td>
            <td>${escapeHtml(doctor.specialization)}</td>
            <td><span class="status-badge ${doctor.active ? 'status-active' : 'status-inactive'}">${doctor.active ? 'Активен' : 'Скрыт'}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-doctor" data-id="${doctor.id}">✏️ Редакт.</button>
                <button class="btn-delete-doctor" data-id="${doctor.id}">🗑️ Удалить</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    document.querySelectorAll('.btn-edit-doctor').forEach(btn => {
        btn.addEventListener('click', () => editDoctor(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-doctor').forEach(btn => {
        btn.addEventListener('click', () => deleteDoctor(parseInt(btn.dataset.id)));
    });
}

async function deleteDoctor(id) {
    const doctor = doctors.find(d => d.id === id);
    if (!doctor) return;
    if (confirm(`Удалить врача "${getDoctorFullName(doctor)}"?`)) {
        try {
            await fetch(`${API_BASE_URL}/doctors/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderDoctors();
            await updateAppointmentFilters();
            showToast(`Врач ${getDoctorFullName(doctor)} удален`);
        } catch (error) {
            showToast('Ошибка удаления', 'error');
        }
    }
}

async function saveDoctor(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('doctorId').value);
    const lastName = document.getElementById('doctorLastName').value.trim();
    const firstName = document.getElementById('doctorFirstName').value.trim();
    const middleName = document.getElementById('doctorMiddleName').value.trim();
    const specialization = document.getElementById('doctorSpecialization').value.trim();
    const photo = document.getElementById('doctorPhoto').value.trim();
    const education = document.getElementById('doctorEducation').value;
    const experience = document.getElementById('doctorExperience').value.trim();
    const improvement = document.getElementById('doctorImprovement').value;
    const schedule = document.getElementById('doctorSchedule').value.trim();
    const active = document.getElementById('doctorActive').checked;
    
    if (!lastName || !firstName || !specialization) {
        showToast('Заполните обязательные поля (Фамилия, Имя, Специализация)', 'error');
        return;
    }
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/doctors/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, lastName, firstName, middleName, specialization, photo, education, experience, improvement, schedule, active })
            });
            showToast(`Врач ${lastName} ${firstName} обновлен`);
        } else {
            const newId = Date.now();
            await fetch(`${API_BASE_URL}/doctors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: newId, lastName, firstName, middleName, specialization, photo, education, experience, improvement, schedule, active })
            });
            showToast(`Врач ${lastName} ${firstName} добавлен`);
        }
        
        await loadAllData();
        await renderDoctors();
        await updateAppointmentFilters();
        
        document.getElementById('doctorModal').style.display = 'none';
        document.getElementById('doctorForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}

function openDoctorModal(editMode = false, doctorData = null) {
    document.getElementById('doctorModalTitle').textContent = editMode ? 'Редактировать врача' : 'Добавить врача';
    if (doctorData) {
        document.getElementById('doctorId').value = doctorData.id;
        document.getElementById('doctorLastName').value = doctorData.lastName || '';
        document.getElementById('doctorFirstName').value = doctorData.firstName || '';
        document.getElementById('doctorMiddleName').value = doctorData.middleName || '';
        document.getElementById('doctorSpecialization').value = doctorData.specialization || '';
        document.getElementById('doctorPhoto').value = doctorData.photo || '';
        document.getElementById('doctorEducation').value = doctorData.education || '';
        document.getElementById('doctorExperience').value = doctorData.experience || '';
        document.getElementById('doctorImprovement').value = doctorData.improvement || '';
        document.getElementById('doctorSchedule').value = doctorData.schedule || '';
        document.getElementById('doctorActive').checked = doctorData.active;
    } else {
        document.getElementById('doctorForm').reset();
        document.getElementById('doctorId').value = '';
        document.getElementById('doctorActive').checked = true;
    }
    document.getElementById('doctorModal').style.display = 'flex';
}

function editDoctor(id) {
    const doctor = doctors.find(d => d.id === id);
    if (doctor) {
        openDoctorModal(true, doctor);
    }
}


async function renderAppointments() {
    const tbody = document.getElementById('appointmentsList');
    if (!tbody) return;
    
    const doctorFilter = document.getElementById('appointmentDoctorFilter')?.value || '';
    const dateFilter = document.getElementById('appointmentDateFilter')?.value || '';
    const statusFilter = document.getElementById('appointmentStatusFilter')?.value || '';
    
    let filtered = [...appointments];
    
    if (doctorFilter) {
        filtered = filtered.filter(a => a.doctorId == doctorFilter);
    }
    if (dateFilter) {
        filtered = filtered.filter(a => a.date === dateFilter);
    }
    if (statusFilter) {
        filtered = filtered.filter(a => a.status === statusFilter);
    }
    
    filtered.sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.time.localeCompare(b.time);
    });
    
    const today = new Date().toISOString().split('T')[0];
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate() + 7);
    const weekLaterStr = weekLater.toISOString().split('T')[0];
    
    const appointmentsCount = document.getElementById('appointmentsCount');
    const appointmentsTodayCount = document.getElementById('appointmentsTodayCount');
    const appointmentsWeekCount = document.getElementById('appointmentsWeekCount');
    
    if (appointmentsCount) appointmentsCount.textContent = appointments.length;
    if (appointmentsTodayCount) appointmentsTodayCount.textContent = appointments.filter(a => a.date === today).length;
    if (appointmentsWeekCount) appointmentsWeekCount.textContent = appointments.filter(a => a.date >= today && a.date <= weekLaterStr).length;
    
    tbody.innerHTML = '';
    for (const app of filtered) {
        const doctor = doctors.find(d => d.id === app.doctorId);
        const doctorName = doctor ? getDoctorFullName(doctor) : 'Неизвестно';
        const serviceName = getServiceNameById(app.serviceId, services);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.id}</td>
            <td><strong>${escapeHtml(app.patientName)}</strong></td>
            <td>${escapeHtml(app.phone)}</td>
            <td>${escapeHtml(doctorName)}</td>
            <td>${escapeHtml(serviceName)}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td><span class="status-badge status-${app.status}">${getStatusWithEmoji(app.status)}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-appointment" data-id="${app.id}">✏️</button>
                <button class="btn-delete-appointment" data-id="${app.id}">🗑️</button>
                ${app.status === 'pending' ? '<button class="btn-confirm-appointment" data-id="' + app.id + '">✅</button>' : ''}
                ${app.status === 'confirmed' ? '<button class="btn-complete-appointment" data-id="' + app.id + '">✔️</button>' : ''}
            </td>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.btn-edit-appointment').forEach(btn => {
        btn.addEventListener('click', () => editAppointment(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-appointment').forEach(btn => {
        btn.addEventListener('click', () => deleteAppointment(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-confirm-appointment').forEach(btn => {
        btn.addEventListener('click', () => updateAppointmentStatus(parseInt(btn.dataset.id), 'confirmed'));
    });
    document.querySelectorAll('.btn-complete-appointment').forEach(btn => {
        btn.addEventListener('click', () => updateAppointmentStatus(parseInt(btn.dataset.id), 'completed'));
    });
}

async function updateAppointmentFilters() {
    const doctorFilter = document.getElementById('appointmentDoctorFilter');
    if (doctorFilter) {
        doctorFilter.innerHTML = '<option value="">Все врачи</option>';
        doctors.filter(d => d.active).forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = getDoctorFullName(doctor);
            doctorFilter.appendChild(option);
        });
    }
    
    const serviceSelect = document.getElementById('appointmentServiceId');
    if (serviceSelect) {
        serviceSelect.innerHTML = '<option value="">-- Выберите услугу --</option>';
        services.filter(s => s.active).forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    }
    
    const doctorSelect = document.getElementById('appointmentDoctorId');
    if (doctorSelect) {
        doctorSelect.innerHTML = '<option value="">-- Выберите врача --</option>';
        doctors.filter(d => d.active).forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = getDoctorFullName(doctor);
            doctorSelect.appendChild(option);
        });
    }
}

async function deleteAppointment(id) {
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) return;
    if (confirm(`Удалить запись пациента "${appointment.patientName}"?`)) {
        try {
            await fetch(`${API_BASE_URL}/appointments/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderAppointments();
            showToast('Запись удалена');
        } catch (error) {
            showToast('Ошибка удаления', 'error');
        }
    }
}

async function updateAppointmentStatus(id, newStatus) {
    try {
        const appointment = appointments.find(a => a.id === id);
        if (appointment) {
            await fetch(`${API_BASE_URL}/appointments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...appointment, status: newStatus })
            });
            await loadAllData();
            await renderAppointments();
            const statusText = { confirmed: 'подтверждена', completed: 'завершена' };
            showToast(`Запись ${statusText[newStatus] || 'обновлена'}`);
        }
    } catch (error) {
        showToast('Ошибка обновления статуса', 'error');
    }
}

async function saveAppointment(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('appointmentId').value);
    const patientName = document.getElementById('appointmentPatientName').value.trim();
    const phone = document.getElementById('appointmentPhone').value.trim();
    const email = document.getElementById('appointmentEmail').value.trim();
    const doctorId = parseInt(document.getElementById('appointmentDoctorId').value);
    const serviceId = parseInt(document.getElementById('appointmentServiceId').value);
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const comment = document.getElementById('appointmentComment').value;
    const status = document.getElementById('appointmentStatus').value;
    
    if (!patientName || !phone || !doctorId || !serviceId || !date || !time) {
        showToast('Заполните все обязательные поля', 'error');
        return;
    }
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/appointments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, patientName, phone, email, doctorId, serviceId, date, time, comment, status, createdAt: new Date().toISOString() })
            });
            showToast(`Запись для ${patientName} обновлена`);
        } else {
            const newId = Date.now();
            await fetch(`${API_BASE_URL}/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: newId, patientName, phone, email, doctorId, serviceId, date, time, comment, status, createdAt: new Date().toISOString() })
            });
            showToast(`Запись для ${patientName} добавлена`);
        }
        
        await loadAllData();
        await renderAppointments();
        
        document.getElementById('appointmentModal').style.display = 'none';
        document.getElementById('appointmentForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}

function openAppointmentModal(editMode = false, appointmentData = null) {
    document.getElementById('appointmentModalTitle').textContent = editMode ? 'Редактировать запись' : 'Новая запись';
    
    if (appointmentData) {
        document.getElementById('appointmentId').value = appointmentData.id;
        document.getElementById('appointmentPatientName').value = appointmentData.patientName || '';
        document.getElementById('appointmentPhone').value = appointmentData.phone || '';
        document.getElementById('appointmentEmail').value = appointmentData.email || '';
        document.getElementById('appointmentDoctorId').value = appointmentData.doctorId || '';
        document.getElementById('appointmentServiceId').value = appointmentData.serviceId || '';
        document.getElementById('appointmentDate').value = appointmentData.date || '';
        document.getElementById('appointmentTime').value = appointmentData.time || '';
        document.getElementById('appointmentComment').value = appointmentData.comment || '';
        document.getElementById('appointmentStatus').value = appointmentData.status || 'pending';
    } else {
        document.getElementById('appointmentForm').reset();
        document.getElementById('appointmentId').value = '';
        document.getElementById('appointmentStatus').value = 'pending';
    }
    document.getElementById('appointmentModal').style.display = 'flex';
}

function editAppointment(id) {
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
        openAppointmentModal(true, appointment);
    }
}

function resetAppointmentFilters() {
    const doctorFilter = document.getElementById('appointmentDoctorFilter');
    const dateFilter = document.getElementById('appointmentDateFilter');
    const statusFilter = document.getElementById('appointmentStatusFilter');
    
    if (doctorFilter) doctorFilter.value = '';
    if (dateFilter) dateFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    renderAppointments();
}


async function renderAdminReviews() {
    const tbody = document.getElementById('reviewsList');
    if (!tbody) return;
    
    const totalReviews = document.getElementById('totalReviews');
    const publishedReviews = document.getElementById('publishedReviews');
    const hiddenReviews = document.getElementById('hiddenReviews');
    
    if (totalReviews) totalReviews.textContent = reviews.length;
    if (publishedReviews) publishedReviews.textContent = reviews.filter(r => r.published).length;
    if (hiddenReviews) hiddenReviews.textContent = reviews.filter(r => !r.published).length;
    
    const statusFilter = document.getElementById('reviewStatusFilter')?.value || 'all';
    const searchFilter = document.getElementById('reviewSearchFilter')?.value.toLowerCase() || '';
    
    let filtered = [...reviews];
    
    if (statusFilter === 'published') {
        filtered = filtered.filter(r => r.published === true);
    } else if (statusFilter === 'hidden') {
        filtered = filtered.filter(r => r.published === false);
    }
    
    if (searchFilter) {
        filtered = filtered.filter(r => 
            r.author.toLowerCase().includes(searchFilter) || 
            r.text.toLowerCase().includes(searchFilter)
        );
    }
    
    tbody.innerHTML = '';
    
    for (const review of filtered) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${review.id}</td>
            <td><strong>${escapeHtml(review.author)}</strong><br><small>${escapeHtml(review.email || '')}</small></td>
            <td><div class="review-text-preview" title="${escapeHtml(review.text)}">${escapeHtml(review.text.substring(0, 100))}...</div></td>
            <td><div class="rating-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div></td>
            <td>${review.date || review.createdAt?.split('T')[0] || ''}</td>
            <td><span class="status-badge ${review.published ? 'status-published' : 'status-hidden'}">${review.published ? 'Опубликован' : 'На модерации'}</span></td>
            <td class="action-buttons">
                <button class="btn-view-review" data-id="${review.id}">👁️</button>
                <button class="btn-toggle-review" data-id="${review.id}">${review.published ? '🙈 Скрыть' : '✅ Опубликовать'}</button>
                <button class="btn-delete-review" data-id="${review.id}">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.btn-view-review').forEach(btn => {
        btn.addEventListener('click', () => viewReview(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-toggle-review').forEach(btn => {
        btn.addEventListener('click', () => toggleReviewStatus(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-review').forEach(btn => {
        btn.addEventListener('click', () => deleteReview(parseInt(btn.dataset.id)));
    });
}

async function viewReview(id) {
    const review = reviews.find(r => r.id === id);
    if (!review) return;
    
    document.getElementById('viewAuthor').textContent = review.author;
    document.getElementById('viewUserInfo').textContent = review.userInfo || '';
    document.getElementById('viewRating').innerHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    document.getElementById('viewText').textContent = review.text;
    document.getElementById('viewDate').textContent = review.date || review.createdAt?.split('T')[0] || '';
    
    const viewPhoto = document.getElementById('viewPhoto');
    if (review.photo) {
        viewPhoto.innerHTML = `<img src="${review.photo}" alt="Фото отзыва" style="max-width: 100%; max-height: 200px; border-radius: 12px;">`;
    } else {
        viewPhoto.innerHTML = '';
    }
    
    document.getElementById('viewReviewModal').style.display = 'flex';
}

async function toggleReviewStatus(id) {
    try {
        const review = reviews.find(r => r.id === id);
        if (!review) return;
        
        review.published = !review.published;
        
        const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });
        
        if (response.ok) {
            await loadAllData();
            await renderAdminReviews();
            showToast(`Отзыв ${review.published ? 'опубликован' : 'скрыт'}`, 'success');
        }
    } catch (error) {
        showToast('Ошибка при изменении статуса', 'error');
    }
}

async function deleteReview(id) {
    if (confirm('Удалить этот отзыв?')) {
        try {
            await fetch(`${API_BASE_URL}/reviews/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderAdminReviews();
            showToast('Отзыв удален', 'success');
        } catch (error) {
            showToast('Ошибка при удалении', 'error');
        }
    }
}

function initReviewFilters() {
    const statusFilter = document.getElementById('reviewStatusFilter');
    const searchFilter = document.getElementById('reviewSearchFilter');
    const resetBtn = document.getElementById('resetReviewFilters');
    
    if (statusFilter) statusFilter.addEventListener('change', () => renderAdminReviews());
    if (searchFilter) searchFilter.addEventListener('input', () => renderAdminReviews());
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (statusFilter) statusFilter.value = 'all';
            if (searchFilter) searchFilter.value = '';
            renderAdminReviews();
        });
    }
}


async function renderAdminPrices() {
    const container = document.getElementById('pricesAdminContainer');
    if (!container) return;
    
    const categoryFilter = document.getElementById('priceCategoryFilter')?.value || 'all';
    const searchFilter = document.getElementById('priceSearchFilter')?.value.toLowerCase() || '';
    
    let categories = pricesData?.categories?.filter(c => c.active) || [];
    let servicesList = pricesData?.services?.filter(s => s.active) || [];
    
    if (categoryFilter !== 'all') {
        servicesList = servicesList.filter(s => s.categoryId == categoryFilter);
        categories = categories.filter(c => c.id == categoryFilter);
    }
    
    if (searchFilter) {
        servicesList = servicesList.filter(s => s.name.toLowerCase().includes(searchFilter));
        const categoryIds = [...new Set(servicesList.map(s => s.categoryId))];
        categories = categories.filter(c => categoryIds.includes(c.id));
    }
    
    const totalCategories = document.getElementById('totalCategories');
    const totalPriceServices = document.getElementById('totalPriceServices');
    if (totalCategories) totalCategories.textContent = categories.length;
    if (totalPriceServices) totalPriceServices.textContent = servicesList.length;
    
    const categorySelect = document.getElementById('priceCategoryFilter');
    if (categorySelect && categorySelect.options.length <= 1 && pricesData?.categories) {
        categorySelect.innerHTML = '<option value="all">Все категории</option>';
        pricesData.categories.forEach(cat => {
            if (cat.active) {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.name;
                categorySelect.appendChild(option);
            }
        });
    }
    
    if (categories.length === 0) {
        container.innerHTML = '<div class="empty-prices">Нет категорий для отображения</div>';
        return;
    }
    
    let html = '';
    for (const category of categories) {
        const categoryServices = servicesList.filter(s => s.categoryId === category.id);
        if (categoryServices.length === 0) continue;
        
        html += `
            <div class="price-category-card">
                <div class="price-category-header" style="cursor: pointer; background: #2F353B; padding: 15px 20px; border-radius: 16px 16px 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: white; margin: 0;">${escapeHtml(category.name)}</h3>
                    <span class="price-category-badge" style="background: #A5C33C; color: #1a1e22; padding: 4px 10px; border-radius: 20px; font-size: 12px;">${categoryServices.length} услуг</span>
                    <span class="price-category-toggle" style="color: white; font-size: 20px;">▼</span>
                </div>
                <div class="category-content" style="display: block; padding: 20px; background: white; border-radius: 0 0 16px 16px;">
                    <table class="price-services-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #F3F4F6;">
                                <th style="padding: 12px 15px; text-align: left;">Название услуги</th>
                                <th style="padding: 12px 15px; text-align: left;">Цена</th>
                                <th style="padding: 12px 15px; text-align: left;">Примечание</th>
                                <th style="padding: 12px 15px; text-align: left; width: 100px;">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        for (const service of categoryServices) {
            html += `
                <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td style="padding: 12px 15px;"><strong>${escapeHtml(service.name)}</strong></td>
                    <td style="padding: 12px 15px;">${service.price === '0' ? 'Бесплатно' : service.price + ' ' + service.unit}</td>
                    <td style="padding: 12px 15px;">${escapeHtml(service.description || '—')}</td>
                    <td style="padding: 12px 15px;">
                        <button class="btn-edit-price-service" data-id="${service.id}" style="background: #E0E7FF; color: #4338CA; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; margin-right: 5px;">✏️</button>
                        <button class="btn-delete-price-service" data-id="${service.id}" style="background: #FEE2E2; color: #DC2626; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer;">🗑️</button>
                    </td>
                </tr>
            `;
        }
        html += `</tbody></table></div></div>`;
    }
    
    container.innerHTML = html;
    
    document.querySelectorAll('.price-category-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const toggle = this.querySelector('.price-category-toggle');
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggle.style.transform = 'rotate(0deg)';
            } else {
                content.style.display = 'none';
                toggle.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    document.querySelectorAll('.btn-edit-price-service').forEach(btn => {
        btn.addEventListener('click', () => editPriceService(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-price-service').forEach(btn => {
        btn.addEventListener('click', () => deletePriceService(parseInt(btn.dataset.id)));
    });
}

async function editPriceService(id) {
    const service = pricesData?.services?.find(s => s.id === id);
    if (!service) return;
    
    const categorySelect = document.getElementById('priceServiceCategoryId');
    categorySelect.innerHTML = '<option value="">-- Выберите категорию --</option>';
    pricesData?.categories?.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
    });
    
    document.getElementById('priceServiceId').value = service.id;
    document.getElementById('priceServiceCategoryId').value = service.categoryId;
    document.getElementById('priceServiceName').value = service.name;
    document.getElementById('priceServicePrice').value = service.price;
    document.getElementById('priceServiceUnit').value = service.unit;
    document.getElementById('priceServiceDescription').value = service.description || '';
    document.getElementById('priceServiceOrder').value = service.order || '';
    document.getElementById('priceServiceActive').checked = service.active;
    document.getElementById('priceServiceModalTitle').textContent = 'Редактировать услугу';
    document.getElementById('priceServiceModal').style.display = 'flex';
}

async function deletePriceService(id) {
    if (confirm('Удалить эту услугу из прайс-листа?')) {
        pricesData.services = pricesData.services.filter(s => s.id !== id);
        await fetch(`${API_BASE_URL}/prices`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pricesData)
        });
        await loadAllData();
        await renderAdminPrices();
        showToast('Услуга удалена', 'success');
    }
}

async function savePriceService(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('priceServiceId').value);
    const categoryId = parseInt(document.getElementById('priceServiceCategoryId').value);
    const name = document.getElementById('priceServiceName').value.trim();
    const price = document.getElementById('priceServicePrice').value.trim();
    const unit = document.getElementById('priceServiceUnit').value;
    const description = document.getElementById('priceServiceDescription').value.trim();
    const order = parseInt(document.getElementById('priceServiceOrder').value) || 999;
    const active = document.getElementById('priceServiceActive').checked;
    
    if (!categoryId || !name) {
        showToast('Заполните обязательные поля', 'error');
        return;
    }
    
    if (id) {
        const index = pricesData.services.findIndex(s => s.id === id);
        if (index !== -1) {
            pricesData.services[index] = { ...pricesData.services[index], categoryId, name, price, unit, description, order, active };
        }
    } else {
        const newId = Date.now();
        pricesData.services.push({ id: newId, categoryId, name, price, unit, description, order, active });
    }
    
    try {
        await fetch(`${API_BASE_URL}/prices`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pricesData)
        });
        await loadAllData();
        await renderAdminPrices();
        showToast('Услуга сохранена', 'success');
        document.getElementById('priceServiceModal').style.display = 'none';
        document.getElementById('priceServiceForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}


async function renderAdminSchedule() {
    const container = document.getElementById('scheduleAdminContainer');
    if (!container) return;
    
    const doctorsList = scheduleData?.doctors || [];
    const totalDoctorsSchedule = document.getElementById('totalDoctorsSchedule');
    if (totalDoctorsSchedule) totalDoctorsSchedule.textContent = doctorsList.length;
    
    if (doctorsList.length === 0) {
        container.innerHTML = '<div class="empty-schedule">Нет данных о врачах</div>';
        return;
    }
    
    const dayFullNames = { monday: 'Понедельник', tuesday: 'Вторник', wednesday: 'Среда', thursday: 'Четверг', friday: 'Пятница', saturday: 'Суббота', sunday: 'Воскресенье' };
    
    let html = '';
    for (const doctor of doctorsList) {
        const doctorSchedule = scheduleData?.schedule?.filter(s => s.doctorId === doctor.id) || [];
        html += `
            <div class="doctor-schedule-card-admin" style="background: white; border-radius: 16px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div class="doctor-schedule-header-admin" style="cursor: pointer; background: #2F353B; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: white; margin: 0;">${escapeHtml(doctor.name)}</h3>
                    <span style="color: #A5C33C; font-size: 14px;">${escapeHtml(doctor.specialization)}</span>
                    <span class="doctor-schedule-toggle" style="color: white; font-size: 20px;">▼</span>
                </div>
                <div class="schedule-content" style="display: block; padding: 20px;">
                    <table class="schedule-table-admin" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #F3F4F6;">
                                <th style="padding: 12px 15px; text-align: left;">День недели</th>
                                <th style="padding: 12px 15px; text-align: left;">Время работы</th>
                                <th style="padding: 12px 15px; text-align: left;">Перерыв</th>
                                <th style="padding: 12px 15px; text-align: left; width: 80px;">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        for (const [dayKey, dayName] of Object.entries(dayFullNames)) {
            const schedule = doctorSchedule.find(s => s.day === dayKey);
            if (schedule) {
                const isWorking = schedule.isWorking;
                html += `
                    <tr style="border-bottom: 1px solid #E5E7EB;">
                        <td><strong>${dayName}</strong></td>
                        <td>${isWorking ? `<span style="color: #10B981; font-weight: 500;">${schedule.timeStart} - ${schedule.timeEnd}</span>` : '<span style="color: #EF4444;">Выходной</span>'}</td>
                        <td>${isWorking && schedule.breakStart ? `${schedule.breakStart} - ${schedule.breakEnd}` : '—'}</td>
                        <td><button class="btn-edit-schedule" data-doctor="${doctor.id}" data-day="${dayKey}" style="background: #E0E7FF; color: #4338CA; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer;">✏️</button></td>
                    </tr>
                `;
            }
        }
        html += `</tbody></table></div></div>`;
    }
    
    container.innerHTML = html;
    
    document.querySelectorAll('.doctor-schedule-header-admin').forEach(header => {
        header.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            const content = this.nextElementSibling;
            const toggle = this.querySelector('.doctor-schedule-toggle');
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggle.style.transform = 'rotate(0deg)';
            } else {
                content.style.display = 'none';
                toggle.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    document.querySelectorAll('.btn-edit-schedule').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openScheduleModal(parseInt(btn.dataset.doctor), btn.dataset.day);
        });
    });
}

function openScheduleModal(doctorId, day) {
    const doctor = scheduleData?.doctors?.find(d => d.id === doctorId);
    if (!doctor) return;
    
    const schedule = scheduleData?.schedule?.find(s => s.doctorId === doctorId && s.day === day);
    
    document.getElementById('scheduleDoctorId').value = doctorId;
    
    const doctorSelect = document.getElementById('scheduleDoctorSelect');
    doctorSelect.innerHTML = '<option value="">-- Выберите врача --</option>';
    scheduleData?.doctors?.forEach(d => {
        const option = document.createElement('option');
        option.value = d.id;
        option.textContent = d.name + ' (' + d.specialization + ')';
        doctorSelect.appendChild(option);
    });
    doctorSelect.value = doctorId;
    
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayIndex = dayNames.indexOf(day);
    const dayCards = document.querySelectorAll('.schedule-day-card');
    
    if (dayCards.length === 0) {
        const container = document.querySelector('.schedule-days-container');
        if (container) {
            const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
            const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            container.innerHTML = '';
            days.forEach((d, idx) => {
                container.innerHTML += `
                    <div class="schedule-day-card" style="background: #F9FAFB; border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                        <h4 style="margin: 0 0 15px 0; color: #2F353B;">${d}</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="checkbox-label"><input type="checkbox" class="schedule-working" data-day="${dayKeys[idx]}"> Рабочий день</label>
                            </div>
                        </div>
                        <div class="form-row work-hours-row" style="display: flex; gap: 15px; margin-top: 10px;" data-day="${dayKeys[idx]}">
                            <div class="form-group"><label>Начало работы</label><input type="time" class="schedule-start" data-day="${dayKeys[idx]}"></div>
                            <div class="form-group"><label>Конец работы</label><input type="time" class="schedule-end" data-day="${dayKeys[idx]}"></div>
                            <div class="form-group"><label>Начало перерыва</label><input type="time" class="schedule-break-start" data-day="${dayKeys[idx]}"></div>
                            <div class="form-group"><label>Конец перерыва</label><input type="time" class="schedule-break-end" data-day="${dayKeys[idx]}"></div>
                        </div>
                    </div>
                `;
            });
        }
    }
    
    const updatedCards = document.querySelectorAll('.schedule-day-card');
    updatedCards.forEach((card, idx) => {
        const workingCheckbox = card.querySelector('.schedule-working');
        const startInput = card.querySelector('.schedule-start');
        const endInput = card.querySelector('.schedule-end');
        const breakStartInput = card.querySelector('.schedule-break-start');
        const breakEndInput = card.querySelector('.schedule-break-end');
        
        if (idx === dayIndex && schedule) {
            workingCheckbox.checked = schedule.isWorking;
            startInput.value = schedule.timeStart || '';
            endInput.value = schedule.timeEnd || '';
            breakStartInput.value = schedule.breakStart || '';
            breakEndInput.value = schedule.breakEnd || '';
        } else if (idx === dayIndex) {
            workingCheckbox.checked = true;
            startInput.value = '09:00';
            endInput.value = '18:00';
            breakStartInput.value = '13:00';
            breakEndInput.value = '14:00';
        }
    });
    
    document.getElementById('scheduleModalTitle').textContent = `Настройка расписания - ${doctor.name} (${getDayNameRussian(day)})`;
    document.getElementById('scheduleModal').style.display = 'flex';
}

function getDayNameRussian(day) {
    const days = { monday: 'Понедельник', tuesday: 'Вторник', wednesday: 'Среда', thursday: 'Четверг', friday: 'Пятница', saturday: 'Суббота', sunday: 'Воскресенье' };
    return days[day] || day;
}

async function saveSchedule(event) {
    event.preventDefault();
    const doctorId = parseInt(document.getElementById('scheduleDoctorId').value);
    
    if (!doctorId) {
        showToast('Выберите врача', 'error');
        return;
    }
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    
    const dayCards = document.querySelectorAll('.schedule-day-card');
    const newSchedule = [];
    
    for (let i = 0; i < days.length; i++) {
        const card = dayCards[i];
        const isWorking = card.querySelector('.schedule-working').checked;
        const startTime = card.querySelector('.schedule-start').value;
        const endTime = card.querySelector('.schedule-end').value;
        const breakStart = card.querySelector('.schedule-break-start').value;
        const breakEnd = card.querySelector('.schedule-break-end').value;
        
        const existingSchedule = scheduleData.schedule.find(s => s.doctorId === doctorId && s.day === days[i]);
        const id = existingSchedule ? existingSchedule.id : Date.now() + i;
        
        newSchedule.push({
            id: id,
            doctorId: doctorId,
            day: days[i],
            dayName: dayNames[i],
            timeStart: isWorking ? startTime : '',
            timeEnd: isWorking ? endTime : '',
            breakStart: isWorking && breakStart ? breakStart : '',
            breakEnd: isWorking && breakEnd ? breakEnd : '',
            isWorking: isWorking
        });
    }
    
    const otherSchedules = scheduleData.schedule.filter(s => s.doctorId !== doctorId);
    scheduleData.schedule = [...otherSchedules, ...newSchedule];
    
    try {
        await fetch(`${API_BASE_URL}/schedule`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scheduleData)
        });
        await loadAllData();
        await renderAdminSchedule();
        showToast('Расписание сохранено', 'success');
        document.getElementById('scheduleModal').style.display = 'none';
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}


async function renderAdminDiscounts() {
    const tbody = document.getElementById('discountsList');
    if (!tbody) return;
    
    const today = new Date().toISOString().split('T')[0];
    const activeDiscounts = discounts.filter(d => d.active && (!d.endDate || d.endDate >= today)).length;
    const expiredDiscounts = discounts.filter(d => d.endDate && d.endDate < today).length;
    const upcomingDiscounts = discounts.filter(d => d.startDate && d.startDate > today).length;
    
    const activeSpan = document.getElementById('activeDiscounts');
    const expiredSpan = document.getElementById('expiredDiscounts');
    const upcomingSpan = document.getElementById('upcomingDiscounts');
    if (activeSpan) activeSpan.textContent = activeDiscounts;
    if (expiredSpan) expiredSpan.textContent = expiredDiscounts;
    if (upcomingSpan) upcomingSpan.textContent = upcomingDiscounts;
    
    const statusFilter = document.getElementById('discountStatusFilter')?.value || 'all';
    const serviceFilter = document.getElementById('discountServiceFilter')?.value || 'all';
    const searchFilter = document.getElementById('discountSearchFilter')?.value.toLowerCase() || '';
    
    let filtered = [...discounts];
    
    if (statusFilter === 'active') {
        filtered = filtered.filter(d => d.active && (!d.endDate || d.endDate >= today));
    } else if (statusFilter === 'expired') {
        filtered = filtered.filter(d => d.endDate && d.endDate < today);
    } else if (statusFilter === 'upcoming') {
        filtered = filtered.filter(d => d.startDate && d.startDate > today);
    }
    
    if (serviceFilter !== 'all') {
        filtered = filtered.filter(d => d.serviceId == serviceFilter);
    }
    
    if (searchFilter) {
        filtered = filtered.filter(d => d.name.toLowerCase().includes(searchFilter));
    }
    
    const serviceSelect = document.getElementById('discountServiceFilter');
    if (serviceSelect && serviceSelect.options.length <= 1 && services.length > 0) {
        serviceSelect.innerHTML = '<option value="all">Все услуги</option>';
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    }
    
    tbody.innerHTML = '';
    for (const discount of filtered) {
        const service = services.find(s => s.id === discount.serviceId);
        const isActive = discount.active && (!discount.endDate || discount.endDate >= today);
        const isExpired = discount.endDate && discount.endDate < today;
        
        let statusText = 'Активна';
        let statusClass = 'status-active';
        if (isExpired) { statusText = 'Просрочена'; statusClass = 'status-expired'; }
        else if (!discount.active) { statusText = 'Неактивна'; statusClass = 'status-inactive'; }
        
        const periodText = discount.startDate && discount.endDate ? `${discount.startDate} — ${discount.endDate}` : (discount.startDate || discount.endDate || '—');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${discount.id}</td>
            <td>${service ? escapeHtml(service.name) : '—'}</td>
            <td><strong>${escapeHtml(discount.name)}</strong></td>
            <td>${discount.type === 'percentage' ? 'Процентная (%)' : 'Фиксированная'}</td>
            <td>${discount.type === 'percentage' ? discount.value + '%' : discount.value + ' BYN'}</td>
            <td>${periodText}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-discount" data-id="${discount.id}">✏️</button>
                <button class="btn-delete-discount" data-id="${discount.id}">🗑️</button>
                <button class="btn-toggle-discount" data-id="${discount.id}">${discount.active ? '🔴 Деакт.' : '🟢 Акт.'}</button>
            </td>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.btn-edit-discount').forEach(btn => {
        btn.addEventListener('click', () => editDiscount(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-discount').forEach(btn => {
        btn.addEventListener('click', () => deleteDiscount(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-toggle-discount').forEach(btn => {
        btn.addEventListener('click', () => toggleDiscountStatus(parseInt(btn.dataset.id)));
    });
}

async function editDiscount(id) {
    const discount = discounts.find(d => d.id === id);
    if (!discount) return;
    
    const serviceSelect = document.getElementById('discountServiceId');
    serviceSelect.innerHTML = '<option value="">-- Выберите услугу --</option>';
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        serviceSelect.appendChild(option);
    });
    
    document.getElementById('discountId').value = discount.id;
    document.getElementById('discountServiceId').value = discount.serviceId;
    document.getElementById('discountName').value = discount.name;
    document.getElementById('discountType').value = discount.type;
    document.getElementById('discountValue').value = discount.value;
    document.getElementById('discountStartDate').value = discount.startDate || '';
    document.getElementById('discountEndDate').value = discount.endDate || '';
    document.getElementById('discountDescription').value = discount.description || '';
    document.getElementById('discountActive').checked = discount.active;
    document.getElementById('discountModalTitle').textContent = 'Редактировать скидку';
    document.getElementById('discountModal').style.display = 'flex';
}

async function deleteDiscount(id) {
    if (confirm('Удалить эту скидку?')) {
        try {
            await fetch(`${API_BASE_URL}/discounts/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderAdminDiscounts();
            showToast('Скидка удалена', 'success');
        } catch (error) {
            showToast('Ошибка при удалении', 'error');
        }
    }
}

async function toggleDiscountStatus(id) {
    try {
        const discount = discounts.find(d => d.id === id);
        if (!discount) return;
        
        discount.active = !discount.active;
        
        await fetch(`${API_BASE_URL}/discounts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discount)
        });
        
        await loadAllData();
        await renderAdminDiscounts();
        showToast(`Скидка ${discount.active ? 'активирована' : 'деактивирована'}`, 'success');
    } catch (error) {
        showToast('Ошибка при изменении статуса', 'error');
    }
}

async function saveDiscount(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('discountId').value);
    const serviceId = parseInt(document.getElementById('discountServiceId').value);
    const name = document.getElementById('discountName').value.trim();
    const type = document.getElementById('discountType').value;
    const value = parseFloat(document.getElementById('discountValue').value);
    const startDate = document.getElementById('discountStartDate').value;
    const endDate = document.getElementById('discountEndDate').value;
    const description = document.getElementById('discountDescription').value;
    const active = document.getElementById('discountActive').checked;
    
    if (!serviceId || !name || !value) {
        showToast('Заполните обязательные поля', 'error');
        return;
    }
    
    const discountData = { id, serviceId, name, type, value, startDate, endDate, description, active, createdAt: new Date().toISOString() };
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/discounts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discountData)
            });
            showToast('Скидка обновлена', 'success');
        } else {
            discountData.id = Date.now();
            await fetch(`${API_BASE_URL}/discounts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discountData)
            });
            showToast('Скидка добавлена', 'success');
        }
        
        await loadAllData();
        await renderAdminDiscounts();
        document.getElementById('discountModal').style.display = 'none';
        document.getElementById('discountForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}

function initDiscountFilters() {
    const statusFilter = document.getElementById('discountStatusFilter');
    const serviceFilter = document.getElementById('discountServiceFilter');
    const searchFilter = document.getElementById('discountSearchFilter');
    const resetBtn = document.getElementById('resetDiscountFilters');
    
    if (statusFilter) statusFilter.addEventListener('change', () => renderAdminDiscounts());
    if (serviceFilter) serviceFilter.addEventListener('change', () => renderAdminDiscounts());
    if (searchFilter) searchFilter.addEventListener('input', () => renderAdminDiscounts());
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (statusFilter) statusFilter.value = 'all';
            if (serviceFilter) serviceFilter.value = 'all';
            if (searchFilter) searchFilter.value = '';
            renderAdminDiscounts();
        });
    }
}


function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}


function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            const tabId = tab.dataset.tab;
            const tabContent = document.getElementById(`tab-${tabId}`);
            if (tabContent) tabContent.classList.add('active');
            
            if (tabId === 'reviews') {
                await renderAdminReviews();
            } else if (tabId === 'prices') {
                await renderAdminPrices();
            } else if (tabId === 'schedule') {
                await renderAdminSchedule();
            } else if (tabId === 'discounts') {
                await renderAdminDiscounts();
            }
        });
    });
}


function initMobileMenu() {
    if (!document.querySelector('.burger-icon')) {
        const burgerIcon = document.createElement('button');
        burgerIcon.className = 'burger-icon';
        burgerIcon.id = 'burgerIcon';
        burgerIcon.innerHTML = '<span></span><span></span><span></span>';
        document.body.appendChild(burgerIcon);
    }
    
    if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.id = 'mobileMenu';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-header">
                <img src="../assets/images/logo/logo1.png" class="mobile-menu-logo" alt="Dental Club">
                <button class="close-menu-btn" id="mobileCloseBtn"><span></span><span></span></button>
            </div>
            <nav class="mobile-nav"></nav>
            <div class="mobile-footer"><a href="index.html">← На сайт</a></div>
        `;
        document.body.appendChild(mobileMenu);
        
        const nav = mobileMenu.querySelector('.mobile-nav');
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            const clonedTab = document.createElement('button');
            clonedTab.className = 'nav-tab';
            clonedTab.innerHTML = tab.innerHTML;
            clonedTab.setAttribute('data-tab', tab.dataset.tab);
            clonedTab.addEventListener('click', () => {
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                clonedTab.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                const tabContent = document.getElementById(`tab-${tab.dataset.tab}`);
                if (tabContent) tabContent.classList.add('active');
                closeMobileMenu();
            });
            nav.appendChild(clonedTab);
        });
    }
    
    if (!document.querySelector('.menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        overlay.id = 'menuOverlay';
        document.body.appendChild(overlay);
    }
    
    const burgerIcon = document.getElementById('burgerIcon');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenuBtn = document.getElementById('mobileCloseBtn');
    const body = document.body;
    
    function openMobileMenu() {
        burgerIcon?.classList.add('active');
        mobileMenu?.classList.add('active');
        menuOverlay?.classList.add('active');
        body.classList.add('menu-open');
    }
    
    function closeMobileMenu() {
        burgerIcon?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        menuOverlay?.classList.remove('active');
        body.classList.remove('menu-open');
    }
    
    burgerIcon?.addEventListener('click', openMobileMenu);
    closeMenuBtn?.addEventListener('click', closeMobileMenu);
    menuOverlay?.addEventListener('click', closeMobileMenu);
}


async function init() {
    const loaded = await loadAllData();
    
    if (!loaded) {
        console.error('Не удалось загрузить данные');
        return;
    }
    
    await renderServices();
    await updateServiceDetailsFilter();
    await renderServiceDetails();
    await renderDoctors();
    await renderAppointments();
    await renderAdminReviews();
    await renderAdminPrices();
    await renderAdminSchedule();
    await renderAdminDiscounts();
    
    initTabs();
    initMobileMenu();
    initReviewFilters();
    initDiscountFilters();
    
    const addServiceBtn = document.getElementById('addServiceBtn');
    const serviceForm = document.getElementById('serviceForm');
    const addDetailBtn = document.getElementById('addDetailBtn');
    const detailForm = document.getElementById('detailForm');
    const detailServiceFilter = document.getElementById('detailServiceFilter');
    const addDoctorBtn = document.getElementById('addDoctorBtn');
    const doctorForm = document.getElementById('doctorForm');
    const addAppointmentBtn = document.getElementById('addAppointmentBtn');
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentDoctorFilter = document.getElementById('appointmentDoctorFilter');
    const appointmentDateFilter = document.getElementById('appointmentDateFilter');
    const appointmentStatusFilter = document.getElementById('appointmentStatusFilter');
    const resetAppointmentFiltersBtn = document.getElementById('resetAppointmentFilters');
    const exportReviewsBtn = document.getElementById('exportReviewsBtn');
    const addPriceCategoryBtn = document.getElementById('addPriceCategoryBtn');
    const addPriceServiceBtn = document.getElementById('addPriceServiceBtn');
    const priceServiceForm = document.getElementById('priceServiceForm');
    const addScheduleBtn = document.getElementById('addScheduleBtn');
    const scheduleForm = document.getElementById('scheduleForm');
    const addDiscountBtn = document.getElementById('addDiscountBtn');
    const discountForm = document.getElementById('discountForm');
    
    if (addServiceBtn) addServiceBtn.addEventListener('click', () => openServiceModal(false));
    if (serviceForm) serviceForm.addEventListener('submit', saveService);
    if (addDetailBtn) addDetailBtn.addEventListener('click', () => openDetailModal(false));
    if (detailForm) detailForm.addEventListener('submit', saveServiceDetail);
    if (detailServiceFilter) detailServiceFilter.addEventListener('change', renderServiceDetails);
    if (addDoctorBtn) addDoctorBtn.addEventListener('click', () => openDoctorModal(false));
    if (doctorForm) doctorForm.addEventListener('submit', saveDoctor);
    if (addAppointmentBtn) addAppointmentBtn.addEventListener('click', () => openAppointmentModal(false));
    if (appointmentForm) appointmentForm.addEventListener('submit', saveAppointment);
    if (appointmentDoctorFilter) appointmentDoctorFilter.addEventListener('change', renderAppointments);
    if (appointmentDateFilter) appointmentDateFilter.addEventListener('change', renderAppointments);
    if (appointmentStatusFilter) appointmentStatusFilter.addEventListener('change', renderAppointments);
    if (resetAppointmentFiltersBtn) resetAppointmentFiltersBtn.addEventListener('click', resetAppointmentFilters);
    
    if (exportReviewsBtn) {
        exportReviewsBtn.addEventListener('click', () => {
            const dataStr = JSON.stringify(reviews, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `reviews_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('Отзывы экспортированы', 'success');
        });
    }
    
    if (addPriceCategoryBtn) {
        addPriceCategoryBtn.addEventListener('click', () => {
            showToast('Функция в разработке', 'info');
        });
    }
    
    if (addPriceServiceBtn) {
        addPriceServiceBtn.addEventListener('click', () => {
            document.getElementById('priceServiceId').value = '';
            document.getElementById('priceServiceForm').reset();
            document.getElementById('priceServiceModalTitle').textContent = 'Добавить услугу';
            document.getElementById('priceServiceModal').style.display = 'flex';
        });
    }
    
    if (priceServiceForm) priceServiceForm.addEventListener('submit', savePriceService);
    
    if (addScheduleBtn) {
        addScheduleBtn.addEventListener('click', () => {
            openScheduleModal(scheduleData?.doctors?.[0]?.id || 1, 'monday');
        });
    }
    
    if (scheduleForm) scheduleForm.addEventListener('submit', saveSchedule);
    
    if (addDiscountBtn) {
        addDiscountBtn.addEventListener('click', () => {
            document.getElementById('discountId').value = '';
            document.getElementById('discountForm').reset();
            document.getElementById('discountModalTitle').textContent = 'Добавить скидку';
            document.getElementById('discountModal').style.display = 'flex';
        });
    }
    
    if (discountForm) discountForm.addEventListener('submit', saveDiscount);
    
    document.querySelectorAll('.modal-close, .btn-cancel').forEach(btn => {
        btn.addEventListener('click', () => closeModals());
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', init);