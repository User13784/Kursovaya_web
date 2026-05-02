const STORAGE_KEYS = {
    SERVICES: 'dental_services',
    SERVICE_DETAILS: 'dental_service_details',
    DOCTORS: 'dental_doctors',
    APPOINTMENTS: 'dental_appointments'
};


const defaultServices = [
    { id: 1, name: 'ДИАГНОСТИКА', page: 'service-menu2.html', bgImage: '../assets/images/service-menu2-page/service-menu2.jpg', title: 'ДИАГНОСТИКА', active: true, order: 1 },
    { id: 2, name: 'ПРОФИЛАКТИКА КАРИЕСА', page: 'service-menu3.html', bgImage: '../assets/images/service-menu3-page/service-menu2.jpg', title: 'ПРОФИЛАКТИКА КАРИЕСА', active: true, order: 2 },
    { id: 3, name: 'ТЕРАПИЯ', page: 'service-menu4.html', bgImage: '../assets/images/service-menu4-page/service-menu2.jpg', title: 'ТЕРАПИЯ', active: true, order: 3 },
    { id: 4, name: 'ЦИФРОВОЕ ПРОТЕЗИРОВАНИЕ', page: 'service-menu5.html', bgImage: '../assets/images/service-menu5-page/service-menu2.jpg', title: 'ЦИФРОВОЕ ПРОТЕЗИРОВАНИЕ', active: true, order: 4 },
    { id: 5, name: 'ЦИФРОВАЯ ИМПЛАНТАЦИЯ', page: 'service-menu6.html', bgImage: '../assets/images/service-menu6-page/service-menu1.jpg', title: 'ЦИФРОВАЯ ИМПЛАНТАЦИЯ', active: true, order: 5 },
    { id: 6, name: 'СЛОЖНАЯ ИМПЛАНТАЦИЯ', page: 'service-menu7.html', bgImage: '../assets/images/service-menu7-page/service-menu1.jpg', title: 'СЛОЖНАЯ ИМПЛАНТАЦИЯ', active: true, order: 6 },
    { id: 7, name: 'ОРТОДОНТИЯ', page: 'service-menu8.html', bgImage: '../assets/images/service-menu8-page/service-menu1.jpg', title: 'ЭСТЕТИЧЕСКАЯ ОРТОДОНТИЯ', active: true, order: 7 },
    { id: 8, name: 'ВИНИРЫ, ЛЮМИНИРЫ', page: 'service-menu9.html', bgImage: '../assets/images/service-menu9-page/service-menu1.jpg', title: 'ВИНИРЫ. ЛЮМИНИРЫ', active: true, order: 8 }
];

const defaultServiceDetails = [
    { id: 1, serviceId: 1, mainText: 'Диагностика необходима для составления качественного плана лечения...', secondaryText: 'В Dental Club производится 3D-диагностика на оборудовании последнего поколения.', features: 'Точность\nБезопасность\nСкорость', steps: '1. Консультация\n2. 3D-снимок\n3. План лечения', images: '' },
    { id: 2, serviceId: 2, mainText: 'Профилактика - это комплекс мер, направленных на предупреждение возникновения и развития стоматологических заболеваний.', secondaryText: 'Регулярная профилактика по системе Dental Club снижает риск кариеса в несколько раз.', features: 'Профессиональная чистка\nОбучение гигиене\nФторирование', steps: '1. Оценка состояния\n2. Удаление зубного камня\n3. Полировка\n4. Покрытие фторлаком', images: '' },
    { id: 3, serviceId: 3, mainText: 'Терапевтическая стоматология - раздел медицины, занимающийся диагностикой и лечением болезней зубов.', secondaryText: 'Лечение кариеса, пульпита, периодонтита с применением микроскопа.', features: 'Безболезненно\nКачественные материалы\nЭстетично', steps: '1. Диагностика\n2. Лечение\n3. Реставрация', images: '' },
    { id: 4, serviceId: 4, mainText: 'Цифровое протезирование - современный метод восстановления зубов.', secondaryText: 'Использование CAD/CAM технологий для максимальной точности.', features: 'Высокая точность\nБыстрое изготовление\nОтличная эстетика', steps: '1. Сканирование\n2. 3D-моделирование\n3. Фрезеровка\n4. Фиксация', images: '' },
    { id: 5, serviceId: 5, mainText: 'Имплантация зубов с использованием навигационной стоматологии.', secondaryText: 'Планирование операции в 3D формате, установка имплантатов за 10 минут.', features: 'Быстро\nБезболезненно\nНадежно', steps: '1. Диагностика\n2. Планирование\n3. Установка\n4. Протезирование', images: '' },
    { id: 6, serviceId: 6, mainText: 'Сложная имплантация для пациентов, которым отказали в других клиниках.', secondaryText: 'Методики All-on-4, All-on-6, скуловые имплантаты Zygoma.', features: 'Решение сложных случаев\nОпытные хирурги\nГарантия', steps: '1. Консультация\n2. 3D-планирование\n3. Операция\n4. Протезирование в день', images: '' },
    { id: 7, serviceId: 7, mainText: 'Эстетическая ортодонтия для детей и взрослых.', secondaryText: 'Брекет-системы и элайнеры Invisalign.', features: 'Незаметно\nКомфортно\nЭффективно', steps: '1. Диагностика\n2. Установка системы\n3. Контроль\n4. Результат', images: '' },
    { id: 8, serviceId: 8, mainText: 'Керамические виниры и люминиры для идеальной улыбки.', secondaryText: 'Минимальная обработка зубов, толщина до 5 микрон.', features: 'Эстетично\nДолговечно\nБез боли', steps: '1. Диагностика\n2. Wax-up\n3. Mock-up\n4. Фиксация', images: '' }
];

const defaultDoctors = [
    { id: 1, lastName: 'Волкова', firstName: 'Екатерина', middleName: 'Андреевна', specialization: 'Стоматолог-терапевт, детский стоматолог', photo: '../assets/images/team/team-menu2.jpg', education: 'Белорусский государственный медицинский университет (2010 г)', experience: 'более 12 лет', improvement: 'Регулярно повышает квалификацию в области детской стоматологии и эндодонтии.', schedule: 'Пн-Сб, 09:00 - 18:00', active: true },
    { id: 2, lastName: 'Кузнецов', firstName: 'Андрей', middleName: 'Владимирович', specialization: 'Стоматолог-пародонтолог', photo: '../assets/images/team/team-menu3.jpg', education: 'Витебский государственный медицинский университет (2008 г)', experience: 'более 14 лет', improvement: 'Прошел курсы по лазерной пародонтологии в Германии.', schedule: 'Пн-Пт, 10:00 - 19:00', active: true },
    { id: 3, lastName: 'Соколова', firstName: 'Мария', middleName: 'Александровна', specialization: 'Стоматолог-пародонтолог, гигиенист', photo: '../assets/images/team/team-menu4.jpg', education: 'Гродненский государственный медицинский университет (2012 г)', experience: 'более 10 лет', improvement: 'Сертифицированный специалист по AirFlow и Vector-терапии.', schedule: 'Вт-Сб, 10:00 - 20:00', active: true },
    { id: 4, lastName: 'Новикова', firstName: 'Валентина', middleName: 'Сергеевна', specialization: 'Стоматолог-терапевт, эндодонтист', photo: '../assets/images/team/team-menu5.jpg', education: 'Белорусский государственный медицинский университет (2011 г)', experience: 'более 11 лет', improvement: 'Прошла обучение по работе с дентальным микроскопом в Швейцарии.', schedule: 'Пн-Пт, 09:00 - 18:00', active: true },
    { id: 5, lastName: 'Щеголев', firstName: 'Дмитрий', middleName: 'Владиславович', specialization: 'Стоматолог-имплантолог, ортопед', photo: '../assets/images/team/team-menu6.jpg', education: 'Белорусский государственный медицинский университет (1986 г) (диплом с отличием)', experience: 'более 30 лет', improvement: 'Неоднократно проходил курсы повышения квалификации, мастер-классы от профессоров мирового уровня.', schedule: 'Пн-Пт, 10:00 - 19:00', active: true },
    { id: 6, lastName: 'Ковальчук', firstName: 'Анастасия', middleName: 'Дмитриевна', specialization: 'Стоматолог-хирург, имплантолог', photo: '../assets/images/team/team-menu7.jpg', education: 'Белорусский государственный медицинский университет (2009 г)', experience: 'более 13 лет', improvement: 'Прошла обучение у ведущих имплантологов Европы.', schedule: 'Пн-Ср-Пт, 10:00 - 19:00', active: true }
];

const defaultAppointments = [
    { id: 1, patientName: 'Иванов Иван Иванович', phone: '+7 777 123-45-67', email: 'ivanov@mail.ru', doctorId: 1, serviceId: 1, date: '2024-12-20', time: '10:00', comment: 'Первичная консультация', status: 'confirmed', createdAt: new Date().toISOString() },
    { id: 2, patientName: 'Петрова Анна Сергеевна', phone: '+7 701 234-56-78', email: 'petrova@mail.ru', doctorId: 2, serviceId: 2, date: '2024-12-21', time: '14:00', comment: '', status: 'pending', createdAt: new Date().toISOString() },
    { id: 3, patientName: 'Сидоров Алексей Владимирович', phone: '+7 702 345-67-89', email: 'sidorov@mail.ru', doctorId: 3, serviceId: 3, date: '2024-12-19', time: '11:00', comment: 'Боль в зубе', status: 'completed', createdAt: new Date().toISOString() }
];


function loadData(key, defaultData) {
    const stored = localStorage.getItem(key);
    if (stored) {
        return JSON.parse(stored);
    } else {
        localStorage.setItem(key, JSON.stringify(defaultData));
        return [...defaultData];
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
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

function getServiceNameById(serviceId) {
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

function renderServices() {
    const tbody = document.getElementById('servicesList');
    if (!tbody) return;
    
    const activeCount = services.filter(s => s.active).length;
    document.getElementById('servicesCount').textContent = services.length;
    document.getElementById('activeServicesCount').textContent = activeCount;
    
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
             </tr>
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

function openServiceModal(editMode = false, service = null) {
    document.getElementById('serviceModalTitle').textContent = editMode ? 'Редактировать услугу' : 'Добавить услугу';
    document.getElementById('serviceId').value = service ? service.id : '';
    document.getElementById('serviceName').value = service ? service.name : '';
    document.getElementById('servicePage').value = service ? service.page : '';
    document.getElementById('serviceBgImage').value = service ? (service.bgImage || '') : '';
    document.getElementById('serviceTitle').value = service ? (service.title || '') : '';
    document.getElementById('serviceActive').checked = service ? service.active : true;
    document.getElementById('serviceModal').style.display = 'flex';
}

function addService() {
    openServiceModal(false);
}

function editService(id) {
    const service = services.find(s => s.id === id);
    if (service) openServiceModal(true, service);
}

function deleteService(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;
    if (confirm(`Удалить услугу "${service.name}"?`)) {
        services = services.filter(s => s.id !== id);
        saveData(STORAGE_KEYS.SERVICES, services);
        renderServices();
        updateServiceDetailsFilter();
        updateAppointmentFilters();
        showToast(`Услуга "${service.name}" удалена`);
    }
}

function saveService(event) {
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
    
    if (id) {
        const index = services.findIndex(s => s.id === id);
        if (index !== -1) {
            services[index] = { ...services[index], name, page, bgImage, title, active };
            saveData(STORAGE_KEYS.SERVICES, services);
            showToast(`Услуга "${name}" обновлена`);
        }
    } else {
        const newId = Math.max(...services.map(s => s.id), 0) + 1;
        services.push({ id: newId, name, page, bgImage, title, active, order: services.length + 1 });
        saveData(STORAGE_KEYS.SERVICES, services);
        showToast(`Услуга "${name}" добавлена`);
    }
    
    renderServices();
    updateServiceDetailsFilter();
    updateAppointmentFilters();
    document.getElementById('serviceModal').style.display = 'none';
    document.getElementById('serviceForm').reset();
}


let serviceDetails = [];

function renderServiceDetails() {
    const tbody = document.getElementById('serviceDetailsList');
    const filterValue = document.getElementById('detailServiceFilter').value;
    if (!tbody) return;
    
    let filtered = [...serviceDetails];
    if (filterValue) {
        filtered = filtered.filter(d => d.serviceId == filterValue);
    }
    
    tbody.innerHTML = '';
    filtered.forEach(detail => {
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
             </tr>
        `;
        tbody.appendChild(row);
    });
    
    document.querySelectorAll('.btn-edit-detail').forEach(btn => {
        btn.addEventListener('click', () => editServiceDetail(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-detail').forEach(btn => {
        btn.addEventListener('click', () => deleteServiceDetail(parseInt(btn.dataset.id)));
    });
}

function updateServiceDetailsFilter() {
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

function updateDetailServiceSelect() {
    const select = document.getElementById('detailServiceId');
    if (!select) return;
    select.innerHTML = '<option value="">-- Выберите услугу --</option>';
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        select.appendChild(option);
    });
}

function openDetailModal(editMode = false, detail = null) {
    updateDetailServiceSelect();
    document.getElementById('detailModalTitle').textContent = editMode ? 'Редактировать детальную информацию' : 'Добавить детальную информацию';
    document.getElementById('detailId').value = detail ? detail.id : '';
    document.getElementById('detailServiceId').value = detail ? detail.serviceId : '';
    document.getElementById('detailMainText').value = detail ? (detail.mainText || '') : '';
    document.getElementById('detailSecondaryText').value = detail ? (detail.secondaryText || '') : '';
    document.getElementById('detailFeatures').value = detail ? (detail.features || '') : '';
    document.getElementById('detailSteps').value = detail ? (detail.steps || '') : '';
    document.getElementById('detailImages').value = detail ? (detail.images || '') : '';
    document.getElementById('detailModal').style.display = 'flex';
}

function addServiceDetail() {
    openDetailModal(false);
}

function editServiceDetail(id) {
    const detail = serviceDetails.find(d => d.id === id);
    if (detail) openDetailModal(true, detail);
}

function deleteServiceDetail(id) {
    const detail = serviceDetails.find(d => d.id === id);
    if (!detail) return;
    const service = services.find(s => s.id === detail.serviceId);
    if (confirm(`Удалить детальную информацию для услуги "${service ? service.name : '?'}"?`)) {
        serviceDetails = serviceDetails.filter(d => d.id !== id);
        saveData(STORAGE_KEYS.SERVICE_DETAILS, serviceDetails);
        renderServiceDetails();
        showToast('Детальная информация удалена');
    }
}

function saveServiceDetail(event) {
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
    
    if (id) {
        const index = serviceDetails.findIndex(d => d.id === id);
        if (index !== -1) {
            serviceDetails[index] = { ...serviceDetails[index], serviceId, mainText, secondaryText, features, steps, images };
            saveData(STORAGE_KEYS.SERVICE_DETAILS, serviceDetails);
            showToast('Детальная информация обновлена');
        }
    } else {
        const newId = Math.max(...serviceDetails.map(d => d.id), 0) + 1;
        serviceDetails.push({ id: newId, serviceId, mainText, secondaryText, features, steps, images });
        saveData(STORAGE_KEYS.SERVICE_DETAILS, serviceDetails);
        showToast('Детальная информация добавлена');
    }
    
    renderServiceDetails();
    document.getElementById('detailModal').style.display = 'none';
    document.getElementById('detailForm').reset();
}


let doctors = [];

function renderDoctors() {
    const tbody = document.getElementById('doctorsList');
    if (!tbody) return;
    
    document.getElementById('doctorsCount').textContent = doctors.length;
    
    tbody.innerHTML = '';
    doctors.forEach(doctor => {
        const fullName = getDoctorFullName(doctor);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.photo ? `<img src="${doctor.photo}" class="doctor-photo-cell" onerror="this.src='../assets/images/placeholder.jpg'">` : '—'}</td>
            <td><strong>${escapeHtml(fullName)}</strong></td>
            <td>${escapeHtml(doctor.specialization)}</td>
            <td class="action-buttons">
                <span class="status-badge ${doctor.active ? 'status-active' : 'status-inactive'}">${doctor.active ? 'Активен' : 'Скрыт'}</span>
            </td>
            <td class="action-buttons">
                <button class="btn-edit-doctor" data-id="${doctor.id}">✏️ Редакт.</button>
                <button class="btn-delete-doctor" data-id="${doctor.id}">🗑️ Удалить</button>
             </tr>
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

function openDoctorModal(editMode = false, doctor = null) {
    document.getElementById('doctorModalTitle').textContent = editMode ? 'Редактировать врача' : 'Добавить врача';
    document.getElementById('doctorId').value = doctor ? doctor.id : '';
    document.getElementById('doctorLastName').value = doctor ? doctor.lastName : '';
    document.getElementById('doctorFirstName').value = doctor ? doctor.firstName : '';
    document.getElementById('doctorMiddleName').value = doctor ? (doctor.middleName || '') : '';
    document.getElementById('doctorSpecialization').value = doctor ? doctor.specialization : '';
    document.getElementById('doctorPhoto').value = doctor ? (doctor.photo || '') : '';
    document.getElementById('doctorEducation').value = doctor ? (doctor.education || '') : '';
    document.getElementById('doctorExperience').value = doctor ? (doctor.experience || '') : '';
    document.getElementById('doctorImprovement').value = doctor ? (doctor.improvement || '') : '';
    document.getElementById('doctorSchedule').value = doctor ? (doctor.schedule || '') : '';
    document.getElementById('doctorActive').checked = doctor ? doctor.active : true;
    document.getElementById('doctorModal').style.display = 'flex';
}

function addDoctor() {
    openDoctorModal(false);
}

function editDoctor(id) {
    const doctor = doctors.find(d => d.id === id);
    if (doctor) openDoctorModal(true, doctor);
}

function deleteDoctor(id) {
    const doctor = doctors.find(d => d.id === id);
    if (!doctor) return;
    if (confirm(`Удалить врача "${getDoctorFullName(doctor)}"?`)) {
        doctors = doctors.filter(d => d.id !== id);
        saveData(STORAGE_KEYS.DOCTORS, doctors);
        renderDoctors();
        updateAppointmentFilters();
        showToast(`Врач ${getDoctorFullName(doctor)} удален`);
    }
}

function saveDoctor(event) {
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
    
    if (id) {
        const index = doctors.findIndex(d => d.id === id);
        if (index !== -1) {
            doctors[index] = { ...doctors[index], lastName, firstName, middleName, specialization, photo, education, experience, improvement, schedule, active };
            saveData(STORAGE_KEYS.DOCTORS, doctors);
            showToast(`Врач ${lastName} ${firstName} обновлен`);
        }
    } else {
        const newId = Math.max(...doctors.map(d => d.id), 0) + 1;
        doctors.push({ id: newId, lastName, firstName, middleName, specialization, photo, education, experience, improvement, schedule, active });
        saveData(STORAGE_KEYS.DOCTORS, doctors);
        showToast(`Врач ${lastName} ${firstName} добавлен`);
    }
    
    renderDoctors();
    updateAppointmentFilters();
    document.getElementById('doctorModal').style.display = 'none';
    document.getElementById('doctorForm').reset();
}


let appointments = [];

function renderAppointments() {
    const tbody = document.getElementById('appointmentsList');
    if (!tbody) return;
    
    const doctorFilter = document.getElementById('appointmentDoctorFilter').value;
    const dateFilter = document.getElementById('appointmentDateFilter').value;
    const statusFilter = document.getElementById('appointmentStatusFilter').value;
    
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
    
    document.getElementById('appointmentsCount').textContent = appointments.length;
    document.getElementById('appointmentsTodayCount').textContent = appointments.filter(a => a.date === today).length;
    document.getElementById('appointmentsWeekCount').textContent = appointments.filter(a => a.date >= today && a.date <= weekLaterStr).length;
    
    tbody.innerHTML = '';
    filtered.forEach(app => {
        const doctor = doctors.find(d => d.id === app.doctorId);
        const doctorName = doctor ? getDoctorFullName(doctor) : 'Неизвестно';
        const serviceName = getServiceNameById(app.serviceId);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.id}</td>
            <td><strong>${escapeHtml(app.patientName)}</strong></td>
            <td>${escapeHtml(app.phone)}</td>
            <td>${escapeHtml(doctorName)}</td>
            <td>${escapeHtml(serviceName)}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td class="action-buttons">
                <span class="status-badge status-${app.status}">${getStatusWithEmoji(app.status)}</span>
             </td>
            <td class="action-buttons">
                <button class="btn-edit-appointment" data-id="${app.id}">✏️</button>
                <button class="btn-delete-appointment" data-id="${app.id}">🗑️</button>
                ${app.status === 'pending' ? '<button class="btn-confirm-appointment" data-id="' + app.id + '">✅</button>' : ''}
                ${app.status === 'confirmed' ? '<button class="btn-complete-appointment" data-id="' + app.id + '">✔️</button>' : ''}
             </td>
        `;
        tbody.appendChild(row);
    });
    
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

function updateAppointmentFilters() {
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

function openAppointmentModal(editMode = false, appointment = null) {
    updateAppointmentFilters();
    document.getElementById('appointmentModalTitle').textContent = editMode ? 'Редактировать запись' : 'Новая запись на прием';
    document.getElementById('appointmentId').value = appointment ? appointment.id : '';
    document.getElementById('appointmentPatientName').value = appointment ? appointment.patientName : '';
    document.getElementById('appointmentPhone').value = appointment ? appointment.phone : '';
    document.getElementById('appointmentEmail').value = appointment ? (appointment.email || '') : '';
    document.getElementById('appointmentDoctorId').value = appointment ? appointment.doctorId : '';
    document.getElementById('appointmentServiceId').value = appointment ? appointment.serviceId : '';
    document.getElementById('appointmentDate').value = appointment ? appointment.date : '';
    document.getElementById('appointmentTime').value = appointment ? appointment.time : '';
    document.getElementById('appointmentComment').value = appointment ? (appointment.comment || '') : '';
    document.getElementById('appointmentStatus').value = appointment ? appointment.status : 'pending';
    document.getElementById('appointmentModal').style.display = 'flex';
}

function addAppointment() {
    openAppointmentModal(false);
}

function editAppointment(id) {
    const appointment = appointments.find(a => a.id === id);
    if (appointment) openAppointmentModal(true, appointment);
}

function deleteAppointment(id) {
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) return;
    if (confirm(`Удалить запись пациента "${appointment.patientName}"?`)) {
        appointments = appointments.filter(a => a.id !== id);
        saveData(STORAGE_KEYS.APPOINTMENTS, appointments);
        renderAppointments();
        showToast('Запись удалена');
    }
}

function updateAppointmentStatus(id, newStatus) {
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
        appointments[index].status = newStatus;
        saveData(STORAGE_KEYS.APPOINTMENTS, appointments);
        renderAppointments();
        const statusText = { confirmed: 'подтверждена', completed: 'завершена' };
        showToast(`Запись ${statusText[newStatus] || 'обновлена'}`);
    }
}

function saveAppointment(event) {
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
    
    if (id) {
        const index = appointments.findIndex(a => a.id === id);
        if (index !== -1) {
            appointments[index] = { ...appointments[index], patientName, phone, email, doctorId, serviceId, date, time, comment, status };
            saveData(STORAGE_KEYS.APPOINTMENTS, appointments);
            showToast(`Запись для ${patientName} обновлена`);
        }
    } else {
        const newId = Math.max(...appointments.map(a => a.id), 0) + 1;
        appointments.push({ id: newId, patientName, phone, email, doctorId, serviceId, date, time, comment, status, createdAt: new Date().toISOString() });
        saveData(STORAGE_KEYS.APPOINTMENTS, appointments);
        showToast(`Запись для ${patientName} добавлена`);
    }
    
    renderAppointments();
    document.getElementById('appointmentModal').style.display = 'none';
    document.getElementById('appointmentForm').reset();
}

function resetAppointmentFilters() {
    document.getElementById('appointmentDoctorFilter').value = '';
    document.getElementById('appointmentDateFilter').value = '';
    document.getElementById('appointmentStatusFilter').value = '';
    renderAppointments();
}


function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}


function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            const tabId = tab.dataset.tab;
            document.getElementById(`tab-${tabId}`).classList.add('active');
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
        
        const menuHeader = document.createElement('div');
        menuHeader.className = 'mobile-menu-header';
        
        const logo = document.createElement('img');
        logo.src = '../assets/images/logo/logo1.png';
        logo.className = 'mobile-menu-logo';
        logo.alt = 'Dental Club';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-menu-btn';
        closeBtn.id = 'mobileCloseBtn';
        closeBtn.innerHTML = '<span></span><span></span>';
        
        menuHeader.appendChild(logo);
        menuHeader.appendChild(closeBtn);
        
        const nav = document.createElement('nav');
        nav.className = 'mobile-nav';
        
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            const clonedTab = tab.cloneNode(true);
            const tabId = clonedTab.getAttribute('data-tab');
            clonedTab.addEventListener('click', () => {
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                clonedTab.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`tab-${tabId}`).classList.add('active');
                closeMobileMenu();
            });
            nav.appendChild(clonedTab);
        });
        
        const footer = document.createElement('div');
        footer.className = 'mobile-footer';
        footer.innerHTML = '<a href="index.html">← На сайт</a>';
        
        mobileMenu.appendChild(menuHeader);
        mobileMenu.appendChild(nav);
        mobileMenu.appendChild(footer);
        document.body.appendChild(mobileMenu);
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
    
    if (burgerIcon) {
        burgerIcon.addEventListener('click', openMobileMenu);
    }
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }
    document.querySelectorAll('.mobile-nav .nav-tab').forEach(btn => {
        btn.addEventListener('click', closeMobileMenu);
    });
    document.querySelector('.mobile-footer a')?.addEventListener('click', closeMobileMenu);
}


function init() {
    services = loadData(STORAGE_KEYS.SERVICES, defaultServices);
    serviceDetails = loadData(STORAGE_KEYS.SERVICE_DETAILS, defaultServiceDetails);
    doctors = loadData(STORAGE_KEYS.DOCTORS, defaultDoctors);
    appointments = loadData(STORAGE_KEYS.APPOINTMENTS, defaultAppointments);
    
    renderServices();
    updateServiceDetailsFilter();
    renderServiceDetails();
    renderDoctors();
    renderAppointments();
    
    initTabs();
    initMobileMenu();
    
    document.getElementById('addServiceBtn').addEventListener('click', addService);
    document.getElementById('serviceForm').addEventListener('submit', saveService);
    
    document.getElementById('addDetailBtn').addEventListener('click', addServiceDetail);
    document.getElementById('detailForm').addEventListener('submit', saveServiceDetail);
    document.getElementById('detailServiceFilter').addEventListener('change', renderServiceDetails);
    
    document.getElementById('addDoctorBtn').addEventListener('click', addDoctor);
    document.getElementById('doctorForm').addEventListener('submit', saveDoctor);
    
    document.getElementById('addAppointmentBtn').addEventListener('click', addAppointment);
    document.getElementById('appointmentForm').addEventListener('submit', saveAppointment);
    document.getElementById('appointmentDoctorFilter').addEventListener('change', renderAppointments);
    document.getElementById('appointmentDateFilter').addEventListener('change', renderAppointments);
    document.getElementById('appointmentStatusFilter').addEventListener('change', renderAppointments);
    document.getElementById('resetAppointmentFilters').addEventListener('click', resetAppointmentFilters);
    
    document.querySelectorAll('.modal-close, .btn-cancel').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = btn.dataset.modal;
            if (modalId) {
                document.getElementById(modalId).style.display = 'none';
            } else {
                closeModals();
            }
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', init);