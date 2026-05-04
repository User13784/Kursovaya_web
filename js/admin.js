// ========== КЛЮЧИ ДЛЯ LOCALSTORAGE ==========
const STORAGE_KEYS = {
    SERVICES: 'dental_services',
    SERVICE_DETAILS: 'dental_service_details',
    DOCTORS: 'dental_doctors',
    APPOINTMENTS: 'dental_appointments',
    REVIEWS: 'dental_reviews',
    PRICES: 'dental_prices',
    SCHEDULE: 'dental_schedule',
    DISCOUNTS: 'dental_discounts'
};

// ========== ДАННЫЕ ПО УМОЛЧАНИЮ ==========

// Услуги (главные)
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

// Детальная информация услуг
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

// Врачи
const defaultDoctors = [
    { id: 1, lastName: 'Волкова', firstName: 'Екатерина', middleName: 'Андреевна', specialization: 'Стоматолог-терапевт, детский стоматолог', photo: '../assets/images/team/team-menu2.jpg', education: 'Белорусский государственный медицинский университет (2010 г)', experience: 'более 12 лет', improvement: 'Регулярно повышает квалификацию в области детской стоматологии и эндодонтии.', schedule: 'Пн-Сб, 09:00 - 18:00', active: true },
    { id: 2, lastName: 'Кузнецов', firstName: 'Андрей', middleName: 'Владимирович', specialization: 'Стоматолог-пародонтолог', photo: '../assets/images/team/team-menu3.jpg', education: 'Витебский государственный медицинский университет (2008 г)', experience: 'более 14 лет', improvement: 'Прошел курсы по лазерной пародонтологии в Германии.', schedule: 'Пн-Пт, 10:00 - 19:00', active: true },
    { id: 3, lastName: 'Соколова', firstName: 'Мария', middleName: 'Александровна', specialization: 'Стоматолог-пародонтолог, гигиенист', photo: '../assets/images/team/team-menu4.jpg', education: 'Гродненский государственный медицинский университет (2012 г)', experience: 'более 10 лет', improvement: 'Сертифицированный специалист по AirFlow и Vector-терапии.', schedule: 'Вт-Сб, 10:00 - 20:00', active: true },
    { id: 4, lastName: 'Новикова', firstName: 'Валентина', middleName: 'Сергеевна', specialization: 'Стоматолог-терапевт, эндодонтист', photo: '../assets/images/team/team-menu5.jpg', education: 'Белорусский государственный медицинский университет (2011 г)', experience: 'более 11 лет', improvement: 'Прошла обучение по работе с дентальным микроскопом в Швейцарии.', schedule: 'Пн-Пт, 09:00 - 18:00', active: true },
    { id: 5, lastName: 'Щеголев', firstName: 'Дмитрий', middleName: 'Владиславович', specialization: 'Стоматолог-имплантолог, ортопед', photo: '../assets/images/team/team-menu6.jpg', education: 'Белорусский государственный медицинский университет (1986 г) (диплом с отличием)', experience: 'более 30 лет', improvement: 'Неоднократно проходил курсы повышения квалификации, мастер-классы от профессоров мирового уровня.', schedule: 'Пн-Пт, 10:00 - 19:00', active: true },
    { id: 6, lastName: 'Ковальчук', firstName: 'Анастасия', middleName: 'Дмитриевна', specialization: 'Стоматолог-хирург, имплантолог', photo: '../assets/images/team/team-menu7.jpg', education: 'Белорусский государственный медицинский университет (2009 г)', experience: 'более 13 лет', improvement: 'Прошла обучение у ведущих имплантологов Европы.', schedule: 'Пн-Ср-Пт, 10:00 - 19:00', active: true }
];

// Записи на прием
const defaultAppointments = [
    { id: 1, patientName: 'Иванов Иван Иванович', phone: '+375 29 123-45-67', email: 'ivanov@mail.ru', doctorId: 1, serviceId: 1, date: new Date().toISOString().split('T')[0], time: '10:00', comment: 'Первичная консультация', status: 'confirmed', createdAt: new Date().toISOString() },
    { id: 2, patientName: 'Петрова Анна Сергеевна', phone: '+375 33 456-78-90', email: 'petrova@mail.ru', doctorId: 2, serviceId: 2, date: new Date().toISOString().split('T')[0], time: '14:00', comment: '', status: 'pending', createdAt: new Date().toISOString() },
    { id: 3, patientName: 'Сидоров Алексей Владимирович', phone: '+375 44 567-89-01', email: 'sidorov@mail.ru', doctorId: 3, serviceId: 3, date: new Date().toISOString().split('T')[0], time: '11:00', comment: 'Боль в зубе', status: 'completed', createdAt: new Date().toISOString() }
];

// Отзывы по умолчанию
const defaultReviews = [
    { id: 1, author: 'Айгуль Ахметова', userInfo: 'Президент АО «RAIMBEK GROUP»', text: 'С удовольствием хотела бы поделиться своим отношением к стоматологической клинике Dental Club. Я являюсь клиентом этой клиники на протяжении многих лет, поэтому очень рада ее обновлению и росту! Приятно осознавать, что в Dental Club технологичность сочетается с совершенным сервисом.', rating: 5, photo: '../assets/images/reviews/reviews2.jpg', date: '2024-11-15', published: true },
    { id: 2, author: 'Лариса Мухамеджанова', userInfo: 'MBA, PH.D, Академик КАМ', text: 'Я лечусь у Дмитрия Щеголева уже 20 лет. За это время выросла дочь, подросла внучка. И, разумеется мы все – пациенты данной клиники. Здесь - сверхстандарты безопасности, абсолютная надежность и доверие.', rating: 5, photo: '../assets/images/reviews/reviews3.jpg', date: '2024-11-10', published: true },
    { id: 3, author: 'Эленора Тен', userInfo: '', text: 'Хотелось бы поблагодарить команду Dental Club за профессионализм, квалифицированный подход в лечении. Благодаря прекрасному, чуткому врачу Дмитрию Щёголева в клинике витает атмосфера добра, уверенности, защищённости и спокойствия.', rating: 5, photo: '../assets/images/logo/logo4.png', date: '2024-11-05', published: true }
];

// Данные для прайс-листа
const defaultPricesData = {
    version: '2.0',
    categories: [
        { id: 1, name: 'Диагностика', order: 1, active: true },
        { id: 2, name: 'Профилактика и гигиена', order: 2, active: true },
        { id: 3, name: 'Терапевтическая стоматология', order: 3, active: true },
        { id: 4, name: 'Хирургическая стоматология', order: 4, active: true },
        { id: 5, name: 'Ортопедия (протезирование)', order: 5, active: true },
        { id: 6, name: 'Имплантация', order: 6, active: true },
        { id: 7, name: 'Ортодонтия', order: 7, active: true },
        { id: 8, name: 'Эстетическая стоматология', order: 8, active: true }
    ],
    services: [
        { id: 1, categoryId: 1, name: 'Первичная консультация', price: '0', unit: 'BYN', description: 'бесплатно', order: 1, active: true },
        { id: 2, categoryId: 1, name: 'Осмотр и составление плана лечения', price: '25', unit: 'BYN', description: '', order: 2, active: true },
        { id: 3, categoryId: 1, name: 'Компьютерная томография (3D)', price: '80', unit: 'BYN', description: 'Одна челюсть', order: 3, active: true },
        { id: 4, categoryId: 1, name: 'Панорамный снимок (ОПТГ)', price: '40', unit: 'BYN', description: '', order: 4, active: true },
        { id: 5, categoryId: 1, name: 'Прицельный снимок', price: '15', unit: 'BYN', description: 'Один зуб', order: 5, active: true },
        { id: 6, categoryId: 2, name: 'Профессиональная гигиена (AirFlow)', price: '60', unit: 'BYN', description: '', order: 1, active: true },
        { id: 7, categoryId: 2, name: 'Ультразвуковая чистка', price: '40', unit: 'BYN', description: 'Одна челюсть', order: 2, active: true },
        { id: 8, categoryId: 3, name: 'Лечение кариеса', price: '70', unit: 'BYN', description: 'Один зуб', order: 1, active: true },
        { id: 9, categoryId: 3, name: 'Лечение пульпита', price: '120', unit: 'BYN', description: 'Один канал', order: 2, active: true },
        { id: 10, categoryId: 4, name: 'Удаление зуба (простое)', price: '50', unit: 'BYN', description: '', order: 1, active: true },
        { id: 11, categoryId: 5, name: 'Коронка металлокерамическая', price: '250', unit: 'BYN', description: 'Один зуб', order: 1, active: true },
        { id: 12, categoryId: 6, name: 'Имплантат (установка)', price: '800', unit: 'BYN', description: 'Под ключ', order: 1, active: true },
        { id: 13, categoryId: 7, name: 'Брекет-система (металл)', price: '1000', unit: 'BYN', description: 'На челюсть', order: 1, active: true },
        { id: 14, categoryId: 8, name: 'Отбеливание ZOOM', price: '300', unit: 'BYN', description: 'Одна процедура', order: 1, active: true }
    ]
};

// Данные для расписания
const defaultScheduleData = {
    version: '2.0',
    doctors: [
        { id: 1, name: 'Волкова Екатерина Андреевна', specialization: 'Стоматолог-терапевт, детский стоматолог', photo: '../assets/images/team/team-menu2.jpg' },
        { id: 2, name: 'Кузнецов Андрей Владимирович', specialization: 'Стоматолог-пародонтолог', photo: '../assets/images/team/team-menu3.jpg' },
        { id: 3, name: 'Соколова Мария Александровна', specialization: 'Стоматолог-пародонтолог, гигиенист', photo: '../assets/images/team/team-menu4.jpg' },
        { id: 4, name: 'Новикова Валентина Сергеевна', specialization: 'Стоматолог-терапевт, эндодонтист', photo: '../assets/images/team/team-menu5.jpg' },
        { id: 5, name: 'Щеголев Дмитрий Владиславович', specialization: 'Стоматолог-имплантолог, ортопед', photo: '../assets/images/team/team-menu6.jpg' },
        { id: 6, name: 'Ковальчук Анастасия Дмитриевна', specialization: 'Стоматолог-хирург, имплантолог', photo: '../assets/images/team/team-menu7.jpg' }
    ],
    schedule: []
};

// Данные для скидок
const defaultDiscounts = [
    { 
        id: 1, 
        serviceId: 1, 
        name: 'Осенняя распродажа', 
        type: 'percentage', 
        value: 20, 
        startDate: new Date().toISOString().split('T')[0], 
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0], 
        description: 'Скидка 20% на диагностику',
        active: true,
        createdAt: new Date().toISOString()
    },
    { 
        id: 2, 
        serviceId: 6, 
        name: 'Акция на гигиену', 
        type: 'percentage', 
        value: 15, 
        startDate: new Date().toISOString().split('T')[0], 
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0], 
        description: 'Скидка 15% на профессиональную гигиену',
        active: true,
        createdAt: new Date().toISOString()
    }
];

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

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

// ========== Ф-1: УПРАВЛЕНИЕ УСЛУГАМИ ==========

let services = [];

function renderServices() {
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
            <td class="service-id">${service.id}</td>
            <td class="service-name"><strong>${escapeHtml(service.name)}</strong></td>
            <td class="service-page"><code>${escapeHtml(service.page)}</code></td>
            <td class="service-status"><span class="status-badge ${service.active ? 'status-active' : 'status-inactive'}">${service.active ? 'Активна' : 'Скрыта'}</span></td>
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

function openServiceModal(editMode = false, service = null) {
    const titleEl = document.getElementById('serviceModalTitle');
    const idEl = document.getElementById('serviceId');
    const nameEl = document.getElementById('serviceName');
    const pageEl = document.getElementById('servicePage');
    const bgImageEl = document.getElementById('serviceBgImage');
    const titleInputEl = document.getElementById('serviceTitle');
    const activeEl = document.getElementById('serviceActive');
    const modal = document.getElementById('serviceModal');
    
    if (titleEl) titleEl.textContent = editMode ? 'Редактировать услугу' : 'Добавить услугу';
    if (idEl) idEl.value = service ? service.id : '';
    if (nameEl) nameEl.value = service ? service.name : '';
    if (pageEl) pageEl.value = service ? service.page : '';
    if (bgImageEl) bgImageEl.value = service ? (service.bgImage || '') : '';
    if (titleInputEl) titleInputEl.value = service ? (service.title || '') : '';
    if (activeEl) activeEl.checked = service ? service.active : true;
    if (modal) modal.style.display = 'flex';
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
    const modal = document.getElementById('serviceModal');
    if (modal) modal.style.display = 'none';
    document.getElementById('serviceForm').reset();
}

// ========== Ф-2: УПРАВЛЕНИЕ ДЕТАЛЬНОЙ ИНФОРМАЦИЕЙ УСЛУГ ==========

let serviceDetails = [];

function renderServiceDetails() {
    const tbody = document.getElementById('serviceDetailsList');
    const filterValue = document.getElementById('detailServiceFilter')?.value || '';
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
            </td>
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
    const titleEl = document.getElementById('detailModalTitle');
    const idEl = document.getElementById('detailId');
    const serviceIdEl = document.getElementById('detailServiceId');
    const mainTextEl = document.getElementById('detailMainText');
    const secondaryTextEl = document.getElementById('detailSecondaryText');
    const featuresEl = document.getElementById('detailFeatures');
    const stepsEl = document.getElementById('detailSteps');
    const imagesEl = document.getElementById('detailImages');
    const modal = document.getElementById('detailModal');
    
    if (titleEl) titleEl.textContent = editMode ? 'Редактировать детальную информацию' : 'Добавить детальную информацию';
    if (idEl) idEl.value = detail ? detail.id : '';
    if (serviceIdEl) serviceIdEl.value = detail ? detail.serviceId : '';
    if (mainTextEl) mainTextEl.value = detail ? (detail.mainText || '') : '';
    if (secondaryTextEl) secondaryTextEl.value = detail ? (detail.secondaryText || '') : '';
    if (featuresEl) featuresEl.value = detail ? (detail.features || '') : '';
    if (stepsEl) stepsEl.value = detail ? (detail.steps || '') : '';
    if (imagesEl) imagesEl.value = detail ? (detail.images || '') : '';
    if (modal) modal.style.display = 'flex';
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
    const modal = document.getElementById('detailModal');
    if (modal) modal.style.display = 'none';
    document.getElementById('detailForm').reset();
}


let doctors = [];

function renderDoctors() {
    const tbody = document.getElementById('doctorsList');
    if (!tbody) return;
    
    const doctorsCount = document.getElementById('doctorsCount');
    if (doctorsCount) doctorsCount.textContent = doctors.length;
    
    tbody.innerHTML = '';
    doctors.forEach(doctor => {
        const fullName = getDoctorFullName(doctor);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="doctor-id">${doctor.id}</td>
            <td class="doctor-photo">${doctor.photo ? `<img src="${doctor.photo}" class="doctor-photo-cell" onerror="this.src='../assets/images/placeholder.jpg'">` : '—'}</td>
            <td class="doctor-name"><strong>${escapeHtml(fullName)}</strong></td>
            <td class="doctor-specialization">${escapeHtml(doctor.specialization)}</td>
            <td class="doctor-status"><span class="status-badge ${doctor.active ? 'status-active' : 'status-inactive'}">${doctor.active ? 'Активен' : 'Скрыт'}</span></td>
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

function openDoctorModal(editMode = false, doctor = null) {
    const titleEl = document.getElementById('doctorModalTitle');
    const idEl = document.getElementById('doctorId');
    const lastNameEl = document.getElementById('doctorLastName');
    const firstNameEl = document.getElementById('doctorFirstName');
    const middleNameEl = document.getElementById('doctorMiddleName');
    const specEl = document.getElementById('doctorSpecialization');
    const photoEl = document.getElementById('doctorPhoto');
    const educationEl = document.getElementById('doctorEducation');
    const experienceEl = document.getElementById('doctorExperience');
    const improvementEl = document.getElementById('doctorImprovement');
    const scheduleEl = document.getElementById('doctorSchedule');
    const activeEl = document.getElementById('doctorActive');
    const modal = document.getElementById('doctorModal');
    
    if (titleEl) titleEl.textContent = editMode ? 'Редактировать врача' : 'Добавить врача';
    if (idEl) idEl.value = doctor ? doctor.id : '';
    if (lastNameEl) lastNameEl.value = doctor ? doctor.lastName : '';
    if (firstNameEl) firstNameEl.value = doctor ? doctor.firstName : '';
    if (middleNameEl) middleNameEl.value = doctor ? (doctor.middleName || '') : '';
    if (specEl) specEl.value = doctor ? doctor.specialization : '';
    if (photoEl) photoEl.value = doctor ? (doctor.photo || '') : '';
    if (educationEl) educationEl.value = doctor ? (doctor.education || '') : '';
    if (experienceEl) experienceEl.value = doctor ? (doctor.experience || '') : '';
    if (improvementEl) improvementEl.value = doctor ? (doctor.improvement || '') : '';
    if (scheduleEl) scheduleEl.value = doctor ? (doctor.schedule || '') : '';
    if (activeEl) activeEl.checked = doctor ? doctor.active : true;
    if (modal) modal.style.display = 'flex';
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
    const modal = document.getElementById('doctorModal');
    if (modal) modal.style.display = 'none';
    document.getElementById('doctorForm').reset();
}


let appointments = [];

function renderAppointments() {
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
    <td><span class="status-badge status-${app.status}">${getStatusWithEmoji(app.status)}</span></td>
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
    const titleEl = document.getElementById('appointmentModalTitle');
    const idEl = document.getElementById('appointmentId');
    const patientNameEl = document.getElementById('appointmentPatientName');
    const phoneEl = document.getElementById('appointmentPhone');
    const emailEl = document.getElementById('appointmentEmail');
    const doctorIdEl = document.getElementById('appointmentDoctorId');
    const serviceIdEl = document.getElementById('appointmentServiceId');
    const dateEl = document.getElementById('appointmentDate');
    const timeEl = document.getElementById('appointmentTime');
    const commentEl = document.getElementById('appointmentComment');
    const statusEl = document.getElementById('appointmentStatus');
    const modal = document.getElementById('appointmentModal');
    
    if (titleEl) titleEl.textContent = editMode ? 'Редактировать запись' : 'Новая запись на прием';
    if (idEl) idEl.value = appointment ? appointment.id : '';
    if (patientNameEl) patientNameEl.value = appointment ? appointment.patientName : '';
    if (phoneEl) phoneEl.value = appointment ? appointment.phone : '';
    if (emailEl) emailEl.value = appointment ? (appointment.email || '') : '';
    if (doctorIdEl) doctorIdEl.value = appointment ? appointment.doctorId : '';
    if (serviceIdEl) serviceIdEl.value = appointment ? appointment.serviceId : '';
    if (dateEl) dateEl.value = appointment ? appointment.date : '';
    if (timeEl) timeEl.value = appointment ? appointment.time : '';
    if (commentEl) commentEl.value = appointment ? (appointment.comment || '') : '';
    if (statusEl) statusEl.value = appointment ? appointment.status : 'pending';
    if (modal) modal.style.display = 'flex';
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
    const modal = document.getElementById('appointmentModal');
    if (modal) modal.style.display = 'none';
    document.getElementById('appointmentForm').reset();
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
            const tabContent = document.getElementById(`tab-${tabId}`);
            if (tabContent) tabContent.classList.add('active');
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
                const tabContent = document.getElementById(`tab-${tabId}`);
                if (tabContent) tabContent.classList.add('active');
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
        if (burgerIcon) burgerIcon.classList.add('active');
        if (mobileMenu) mobileMenu.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        if (body) body.classList.add('menu-open');
    }
    
    function closeMobileMenu() {
        if (burgerIcon) burgerIcon.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        if (body) body.classList.remove('menu-open');
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
    const mobileFooterLink = document.querySelector('.mobile-footer a');
    if (mobileFooterLink) mobileFooterLink.addEventListener('click', closeMobileMenu);
}


let reviews = [];

function loadReviews() {
    const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (stored) {
        reviews = JSON.parse(stored);
    } else {
        reviews = [...defaultReviews];
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    }
    return reviews;
}

function saveReviews() {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
}

function renderReviewsTable() {
    const tbody = document.getElementById('reviewsList');
    if (!tbody) return;
    
    const statusFilter = document.getElementById('reviewStatusFilter')?.value || 'all';
    const searchFilter = document.getElementById('reviewSearchFilter')?.value.toLowerCase() || '';
    
    let filtered = [...reviews];
    
    if (statusFilter !== 'all') {
        filtered = filtered.filter(r => r.published === (statusFilter === 'published'));
    }
    
    if (searchFilter) {
        filtered = filtered.filter(r => 
            r.author.toLowerCase().includes(searchFilter) || 
            r.text.toLowerCase().includes(searchFilter)
        );
    }
    
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const totalReviews = document.getElementById('totalReviews');
    const publishedReviews = document.getElementById('publishedReviews');
    const hiddenReviews = document.getElementById('hiddenReviews');
    
    if (totalReviews) totalReviews.textContent = reviews.length;
    if (publishedReviews) publishedReviews.textContent = reviews.filter(r => r.published).length;
    if (hiddenReviews) hiddenReviews.textContent = reviews.filter(r => !r.published).length;
    
    tbody.innerHTML = '';
    filtered.forEach(review => {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += i <= review.rating ? '★' : '☆';
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${review.id}</td>
            <td><strong>${escapeHtml(review.author)}</strong></td>
            <td class="review-text-preview" title="${escapeHtml(review.text)}">${escapeHtml(review.text.substring(0, 80))}${review.text.length > 80 ? '...' : ''}</td>
            <td class="rating-stars"><span>${starsHtml}</span></td>
            <td>${review.date}</td>
            <td><span class="status-badge ${review.published ? 'status-published' : 'status-hidden'}">${review.published ? 'Опубликован' : 'Скрыт'}</span></td>
            <td class="action-buttons">
                <button class="btn-view" data-id="${review.id}">👁️ Просмотр</button>
                <button class="btn-toggle-review" data-id="${review.id}">${review.published ? '🙈 Скрыть' : '👁️ Опубликовать'}</button>
                <button class="btn-delete-review" data-id="${review.id}">🗑️ Удалить</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', () => viewReview(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-toggle-review').forEach(btn => {
        btn.addEventListener('click', () => toggleReviewStatus(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-review').forEach(btn => {
        btn.addEventListener('click', () => deleteReview(parseInt(btn.dataset.id)));
    });
}

function viewReview(id) {
    const review = reviews.find(r => r.id === id);
    if (!review) return;
    
    const viewAuthor = document.getElementById('viewAuthor');
    const viewUserInfo = document.getElementById('viewUserInfo');
    const viewRating = document.getElementById('viewRating');
    const viewText = document.getElementById('viewText');
    const viewDate = document.getElementById('viewDate');
    const viewPhoto = document.getElementById('viewPhoto');
    const modal = document.getElementById('viewReviewModal');
    
    if (viewAuthor) viewAuthor.textContent = review.author;
    if (viewUserInfo) viewUserInfo.textContent = review.userInfo || '';
    
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += i <= review.rating ? '★' : '☆';
    }
    if (viewRating) viewRating.innerHTML = starsHtml;
    if (viewText) viewText.textContent = review.text;
    if (viewDate) viewDate.textContent = 'Дата: ' + review.date;
    
    if (viewPhoto) {
        if (review.photo && review.photo !== '../assets/images/logo/logo4.png') {
            viewPhoto.innerHTML = `<img src="${review.photo}" alt="Фото автора">`;
        } else {
            viewPhoto.innerHTML = '';
        }
    }
    
    if (modal) modal.style.display = 'flex';
}

function toggleReviewStatus(id) {
    const review = reviews.find(r => r.id === id);
    if (review) {
        review.published = !review.published;
        saveReviews();
        renderReviewsTable();
        showToast(review.published ? 'Отзыв опубликован' : 'Отзыв скрыт', 'success');
    }
}

function deleteReview(id) {
    const review = reviews.find(r => r.id === id);
    if (!review) return;
    if (confirm(`Удалить отзыв от "${review.author}"?`)) {
        reviews = reviews.filter(r => r.id !== id);
        saveReviews();
        renderReviewsTable();
        showToast('Отзыв удален', 'success');
    }
}

function resetReviewFilters() {
    const statusFilter = document.getElementById('reviewStatusFilter');
    const searchFilter = document.getElementById('reviewSearchFilter');
    
    if (statusFilter) statusFilter.value = 'all';
    if (searchFilter) searchFilter.value = '';
    renderReviewsTable();
}

function exportReviews() {
    const dataStr = JSON.stringify(reviews, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reviews_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Экспорт выполнен', 'success');
}

function initReviewsTab() {
    loadReviews();
    renderReviewsTable();
    
    const reviewStatusFilter = document.getElementById('reviewStatusFilter');
    const reviewSearchFilter = document.getElementById('reviewSearchFilter');
    const resetReviewFiltersBtn = document.getElementById('resetReviewFilters');
    const exportReviewsBtn = document.getElementById('exportReviewsBtn');
    
    if (reviewStatusFilter) reviewStatusFilter.addEventListener('change', renderReviewsTable);
    if (reviewSearchFilter) reviewSearchFilter.addEventListener('input', renderReviewsTable);
    if (resetReviewFiltersBtn) resetReviewFiltersBtn.addEventListener('click', resetReviewFilters);
    if (exportReviewsBtn) exportReviewsBtn.addEventListener('click', exportReviews);
    
    const reviewsTab = document.querySelector('.nav-tab[data-tab="reviews"]');
    if (reviewsTab) {
        reviewsTab.addEventListener('click', () => {
            setTimeout(() => {
                loadReviews();
                renderReviewsTable();
            }, 100);
        });
    }
}


let pricesData = null;

function loadPricesData() {
    const stored = localStorage.getItem(STORAGE_KEYS.PRICES);
    if (stored) {
        pricesData = JSON.parse(stored);
        if (!pricesData.version || pricesData.version !== '2.0') {
            pricesData = JSON.parse(JSON.stringify(defaultPricesData));
            localStorage.setItem(STORAGE_KEYS.PRICES, JSON.stringify(pricesData));
        }
    } else {
        pricesData = JSON.parse(JSON.stringify(defaultPricesData));
        localStorage.setItem(STORAGE_KEYS.PRICES, JSON.stringify(pricesData));
    }
    return pricesData;
}

function savePricesData() {
    localStorage.setItem(STORAGE_KEYS.PRICES, JSON.stringify(pricesData));
}

function renderPricesAdmin() {
    const container = document.getElementById('pricesAdminContainer');
    if (!container) return;
    
    const categoryFilter = document.getElementById('priceCategoryFilter')?.value || 'all';
    const searchFilter = document.getElementById('priceSearchFilter')?.value.toLowerCase() || '';
    
    let categories = pricesData.categories.filter(c => c.active);
    let services = pricesData.services.filter(s => s.active);
    
    if (categoryFilter !== 'all') {
        services = services.filter(s => s.categoryId == categoryFilter);
        categories = categories.filter(c => c.id == categoryFilter);
    }
    
    if (searchFilter) {
        services = services.filter(s => s.name.toLowerCase().includes(searchFilter));
        const filteredCategoryIds = [...new Set(services.map(s => s.categoryId))];
        categories = categories.filter(c => filteredCategoryIds.includes(c.id));
    }
    
    const totalCategories = document.getElementById('totalCategories');
    const totalPriceServices = document.getElementById('totalPriceServices');
    if (totalCategories) totalCategories.textContent = pricesData.categories.length;
    if (totalPriceServices) totalPriceServices.textContent = pricesData.services.length;
    
    categories.sort((a, b) => a.order - b.order);
    
    if (categories.length === 0) {
        container.innerHTML = '<div class="empty-prices">Нет категорий. Добавьте первую категорию</div>';
        return;
    }
    
    let html = '';
    categories.forEach(category => {
        const categoryServices = services.filter(s => s.categoryId === category.id).sort((a, b) => a.order - b.order);
        
        html += `
            <div class="price-category-card" data-category-id="${category.id}">
                <div class="price-category-header" onclick="window.togglePriceCategory && togglePriceCategory(this)">
                    <h3>${escapeHtml(category.name)} <span class="price-category-badge">${categoryServices.length} услуг</span></h3>
                    <span class="price-category-toggle">▼</span>
                </div>
                <div class="price-category-content">
                    <table class="price-services-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Примечание</th>
                                <th>Порядок</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        categoryServices.forEach(service => {
            let priceDisplay = service.price === '0' ? 'Бесплатно' : `${service.price} ${service.unit}`;
            html += `
                <tr>
                    <td>${service.id}</td>
                    <td><strong>${escapeHtml(service.name)}</strong></td>
                    <td>${priceDisplay}</td>
                    <td>${escapeHtml(service.description || '—')}</td>
                    <td>${service.order}</td>
                    <td class="price-service-actions">
                        <button class="btn-edit-price-service" data-id="${service.id}">✏️</button>
                        <button class="btn-delete-price-service" data-id="${service.id}">🗑️</button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                    <div class="category-actions" style="padding: 15px; border-top: 1px solid #E5E7EB;">
                        <button class="btn-edit-category" data-id="${category.id}">✏️ Редактировать категорию</button>
                        <button class="btn-delete-category" data-id="${category.id}">🗑️ Удалить категорию</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    document.querySelectorAll('.btn-edit-price-service').forEach(btn => {
        btn.addEventListener('click', () => editPriceService(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-price-service').forEach(btn => {
        btn.addEventListener('click', () => deletePriceService(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-edit-category').forEach(btn => {
        btn.addEventListener('click', () => editPriceCategory(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-category').forEach(btn => {
        btn.addEventListener('click', () => deletePriceCategory(parseInt(btn.dataset.id)));
    });
}

window.togglePriceCategory = function(header) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.price-category-toggle');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.classList.remove('open');
    } else {
        content.style.display = 'none';
        toggle.classList.add('open');
    }
};

function openPriceCategoryModal(editMode = false, category = null) {
    const titleEl = document.getElementById('priceCategoryModalTitle');
    const idEl = document.getElementById('priceCategoryId');
    const nameEl = document.getElementById('priceCategoryName');
    const orderEl = document.getElementById('priceCategoryOrder');
    const activeEl = document.getElementById('priceCategoryActive');
    const modal = document.getElementById('priceCategoryModal');
    
    if (titleEl) titleEl.textContent = editMode ? 'Редактировать категорию' : 'Добавить категорию';
    if (idEl) idEl.value = category ? category.id : '';
    if (nameEl) nameEl.value = category ? category.name : '';
    if (orderEl) orderEl.value = category ? category.order : pricesData.categories.length + 1;
    if (activeEl) activeEl.checked = category ? category.active : true;
    if (modal) modal.style.display = 'flex';
}

function addPriceCategory() {
    openPriceCategoryModal(false);
}

function editPriceCategory(id) {
    const category = pricesData.categories.find(c => c.id === id);
    if (category) openPriceCategoryModal(true, category);
}

function deletePriceCategory(id) {
    const category = pricesData.categories.find(c => c.id === id);
    if (!category) return;
    const hasServices = pricesData.services.some(s => s.categoryId === id);
    if (hasServices) {
        if (confirm(`В категории "${category.name}" есть услуги. Удалить категорию и все услуги в ней?`)) {
            pricesData.services = pricesData.services.filter(s => s.categoryId !== id);
        } else {
            return;
        }
    }
    if (confirm(`Удалить категорию "${category.name}"?`)) {
        pricesData.categories = pricesData.categories.filter(c => c.id !== id);
        savePricesData();
        renderPricesAdmin();
        updatePriceCategoryFilters();
        showToast('Категория удалена');
    }
}

function savePriceCategory(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('priceCategoryId').value);
    const name = document.getElementById('priceCategoryName').value.trim();
    const order = parseInt(document.getElementById('priceCategoryOrder').value) || 0;
    const active = document.getElementById('priceCategoryActive').checked;
    
    if (!name) {
        showToast('Введите название категории', 'error');
        return;
    }
    
    if (id) {
        const index = pricesData.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            pricesData.categories[index] = { ...pricesData.categories[index], name, order, active };
            savePricesData();
            showToast('Категория обновлена');
        }
    } else {
        const newId = Math.max(...pricesData.categories.map(c => c.id), 0) + 1;
        pricesData.categories.push({ id: newId, name, order, active });
        savePricesData();
        showToast('Категория добавлена');
    }
    
    renderPricesAdmin();
    updatePriceCategoryFilters();
    const modal = document.getElementById('priceCategoryModal');
    if (modal) modal.style.display = 'none';
    document.getElementById('priceCategoryForm').reset();
}

function updatePriceCategoryFilters() {
    const filter = document.getElementById('priceCategoryFilter');
    if (filter) {
        filter.innerHTML = '<option value="all">Все категории</option>';
        pricesData.categories.filter(c => c.active).forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            filter.appendChild(option);
        });
    }
    
    const serviceFilter = document.getElementById('priceServiceCategoryId');
    if (serviceFilter) {
        serviceFilter.innerHTML = '<option value="">-- Выберите категорию --</option>';
        pricesData.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            serviceFilter.appendChild(option);
        });
    }
}

function openPriceServiceModal(editMode = false, service = null) {
    updatePriceCategoryFilters();
    const titleEl = document.getElementById('priceServiceModalTitle');
    const idEl = document.getElementById('priceServiceId');
    const categoryIdEl = document.getElementById('priceServiceCategoryId');
    const nameEl = document.getElementById('priceServiceName');
    const priceEl = document.getElementById('priceServicePrice');
    const unitEl = document.getElementById('priceServiceUnit');
    const descEl = document.getElementById('priceServiceDescription');
    const orderEl = document.getElementById('priceServiceOrder');
    const activeEl = document.getElementById('priceServiceActive');
    const modal = document.getElementById('priceServiceModal');
    
    if (titleEl) titleEl.textContent = editMode ? 'Редактировать услугу' : 'Добавить услугу';
    if (idEl) idEl.value = service ? service.id : '';
    if (categoryIdEl) categoryIdEl.value = service ? service.categoryId : '';
    if (nameEl) nameEl.value = service ? service.name : '';
    if (priceEl) priceEl.value = service ? service.price : '';
    if (unitEl) unitEl.value = service ? service.unit : 'BYN';
    if (descEl) descEl.value = service ? (service.description || '') : '';
    if (orderEl) orderEl.value = service ? service.order : 1;
    if (activeEl) activeEl.checked = service ? service.active : true;
    if (modal) modal.style.display = 'flex';
}

function addPriceService() {
    openPriceServiceModal(false);
}

function editPriceService(id) {
    const service = pricesData.services.find(s => s.id === id);
    if (service) openPriceServiceModal(true, service);
}

function deletePriceService(id) {
    if (confirm('Удалить услугу из прайс-листа?')) {
        pricesData.services = pricesData.services.filter(s => s.id !== id);
        savePricesData();
        renderPricesAdmin();
        showToast('Услуга удалена');
    }
}

function savePriceService(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('priceServiceId').value);
    const categoryId = parseInt(document.getElementById('priceServiceCategoryId').value);
    const name = document.getElementById('priceServiceName').value.trim();
    const price = document.getElementById('priceServicePrice').value.trim();
    const unit = document.getElementById('priceServiceUnit').value;
    const description = document.getElementById('priceServiceDescription').value.trim();
    const order = parseInt(document.getElementById('priceServiceOrder').value) || 1;
    const active = document.getElementById('priceServiceActive').checked;
    
    if (!categoryId || !name) {
        showToast('Заполните обязательные поля', 'error');
        return;
    }
    
    if (id) {
        const index = pricesData.services.findIndex(s => s.id === id);
        if (index !== -1) {
            pricesData.services[index] = { ...pricesData.services[index], categoryId, name, price, unit, description, order, active };
            savePricesData();
            showToast('Услуга обновлена');
        }
    } else {
        const newId = Math.max(...pricesData.services.map(s => s.id), 0) + 1;
        pricesData.services.push({ id: newId, categoryId, name, price, unit, description, order, active });
        savePricesData();
        showToast('Услуга добавлена');
    }
    
    renderPricesAdmin();
    const modal = document.getElementById('priceServiceModal');
    if (modal) modal.style.display = 'none';
    document.getElementById('priceServiceForm').reset();
}

function exportPrices() {
    const dataStr = JSON.stringify(pricesData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prices_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Экспорт выполнен');
}


let scheduleData = null;

function loadScheduleData() {
    const stored = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    if (stored) {
        scheduleData = JSON.parse(stored);
        if (!scheduleData.version || scheduleData.version !== '2.0') {
            scheduleData = JSON.parse(JSON.stringify(defaultScheduleData));
            localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(scheduleData));
        }
    } else {
        scheduleData = JSON.parse(JSON.stringify(defaultScheduleData));
        localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(scheduleData));
        initDefaultSchedule();
    }
    return scheduleData;
}

function initDefaultSchedule() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    
    scheduleData.schedule = [];
    scheduleData.doctors.forEach((doctor) => {
        days.forEach((day, index) => {
            let isWorking = index < 5;
            scheduleData.schedule.push({
                id: scheduleData.schedule.length + 1,
                doctorId: doctor.id,
                day: day,
                dayName: dayNames[index],
                timeStart: isWorking ? '10:00' : '',
                timeEnd: isWorking ? '19:00' : '',
                breakStart: isWorking ? '13:00' : '',
                breakEnd: isWorking ? '14:00' : '',
                isWorking: isWorking
            });
        });
    });
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(scheduleData));
}

function saveScheduleData() {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(scheduleData));
}

function renderScheduleAdmin() {
    const container = document.getElementById('scheduleAdminContainer');
    if (!container) return;
    
    const totalDoctorsSchedule = document.getElementById('totalDoctorsSchedule');
    if (totalDoctorsSchedule) totalDoctorsSchedule.textContent = scheduleData.doctors.length;
    
    let html = '';
    scheduleData.doctors.forEach(doctor => {
        const doctorSchedule = scheduleData.schedule.filter(s => s.doctorId === doctor.id);
        const dayOrder = { 'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6, 'sunday': 7 };
        doctorSchedule.sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
        
        html += `
            <div class="doctor-schedule-card-admin" data-doctor-id="${doctor.id}">
                <div class="doctor-schedule-header-admin" onclick="window.toggleDoctorScheduleAdmin && toggleDoctorScheduleAdmin(this)">
                    <h3>${escapeHtml(doctor.name)}</h3>
                    <span class="doctor-schedule-toggle">▼</span>
                </div>
                <div class="doctor-schedule-content-admin" style="display: block;">
                    <table class="schedule-table-admin">
                        <thead>
                            <tr>
                                <th>День недели</th>
                                <th>Время работы</th>
                                <th>Перерыв</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        doctorSchedule.forEach(item => {
            let workHours = '';
            let breakTime = '';
            let statusClass = '';
            let statusText = '';
            
            if (item.isWorking) {
                workHours = `<span class="work-hours">${item.timeStart || '—'} - ${item.timeEnd || '—'}</span>`;
                if (item.breakStart && item.breakEnd) {
                    breakTime = `<span class="break-time">${item.breakStart} - ${item.breakEnd}</span>`;
                } else {
                    breakTime = '<span class="break-time">—</span>';
                }
                statusClass = 'working-yes';
                statusText = 'Рабочий';
            } else {
                workHours = '<span class="work-hours off">Выходной</span>';
                breakTime = '<span class="break-time">—</span>';
                statusClass = 'working-no';
                statusText = 'Выходной';
            }
            
            html += `
                <tr>
                    <td>${item.dayName}</td>
                    <td>${workHours}</td>
                    <td>${breakTime}</td>
                    <td><span class="working-badge ${statusClass}">${statusText}</span></td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                    <div style="padding: 15px; border-top: 1px solid #E5E7EB;">
                        <button class="btn-edit-schedule" data-id="${doctor.id}">✏️ Редактировать расписание</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    document.querySelectorAll('.btn-edit-schedule').forEach(btn => {
        btn.addEventListener('click', () => editDoctorSchedule(parseInt(btn.dataset.id)));
    });
}

window.toggleDoctorScheduleAdmin = function(header) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.doctor-schedule-toggle');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.classList.remove('open');
    } else {
        content.style.display = 'none';
        toggle.classList.add('open');
    }
};

function updateDoctorSelect() {
    const select = document.getElementById('scheduleDoctorSelect');
    if (select) {
        select.innerHTML = '<option value="">-- Выберите врача --</option>';
        scheduleData.doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = doctor.name;
            select.appendChild(option);
        });
    }
}

function editDoctorSchedule(doctorId) {
    const doctorSchedule = scheduleData.schedule.filter(s => s.doctorId === doctorId);
    updateDoctorSelect();
    
    const doctorIdEl = document.getElementById('scheduleDoctorId');
    const doctorSelectEl = document.getElementById('scheduleDoctorSelect');
    const modal = document.getElementById('scheduleModal');
    const titleEl = document.getElementById('scheduleModalTitle');
    
    if (titleEl) titleEl.textContent = 'Редактировать расписание';
    if (doctorIdEl) doctorIdEl.value = doctorId;
    if (doctorSelectEl) doctorSelectEl.value = doctorId;
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
        const daySchedule = doctorSchedule.find(s => s.day === day);
        if (daySchedule) {
            const workingCheckbox = document.querySelector(`.schedule-working[data-day="${day}"]`);
            const startInput = document.querySelector(`.schedule-start[data-day="${day}"]`);
            const endInput = document.querySelector(`.schedule-end[data-day="${day}"]`);
            const breakStartInput = document.querySelector(`.schedule-break-start[data-day="${day}"]`);
            const breakEndInput = document.querySelector(`.schedule-break-end[data-day="${day}"]`);
            const hoursRow = document.querySelector(`.work-hours-row[data-day="${day}"]`);
            
            if (workingCheckbox) {
                workingCheckbox.checked = daySchedule.isWorking;
                if (hoursRow) {
                    hoursRow.style.display = daySchedule.isWorking ? 'flex' : 'none';
                }
            }
            if (startInput) startInput.value = daySchedule.timeStart || '';
            if (endInput) endInput.value = daySchedule.timeEnd || '';
            if (breakStartInput) breakStartInput.value = daySchedule.breakStart || '';
            if (breakEndInput) breakEndInput.value = daySchedule.breakEnd || '';
        }
    });
    
    if (modal) modal.style.display = 'flex';
}

function saveSchedule(event) {
    event.preventDefault();
    const doctorId = parseInt(document.getElementById('scheduleDoctorId').value);
    
    if (!doctorId) {
        showToast('Выберите врача', 'error');
        return;
    }
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    
    days.forEach((day, index) => {
        const workingCheckbox = document.querySelector(`.schedule-working[data-day="${day}"]`);
        const startInput = document.querySelector(`.schedule-start[data-day="${day}"]`);
        const endInput = document.querySelector(`.schedule-end[data-day="${day}"]`);
        const breakStartInput = document.querySelector(`.schedule-break-start[data-day="${day}"]`);
        const breakEndInput = document.querySelector(`.schedule-break-end[data-day="${day}"]`);
        
        const isWorking = workingCheckbox ? workingCheckbox.checked : false;
        const timeStart = startInput ? startInput.value : '';
        const timeEnd = endInput ? endInput.value : '';
        const breakStart = breakStartInput ? breakStartInput.value : '';
        const breakEnd = breakEndInput ? breakEndInput.value : '';
        
        const existingIndex = scheduleData.schedule.findIndex(s => s.doctorId === doctorId && s.day === day);
        
        if (existingIndex !== -1) {
            scheduleData.schedule[existingIndex] = {
                ...scheduleData.schedule[existingIndex],
                isWorking,
                timeStart,
                timeEnd,
                breakStart,
                breakEnd
            };
        } else {
            scheduleData.schedule.push({
                id: scheduleData.schedule.length + 1,
                doctorId,
                day,
                dayName: dayNames[index],
                timeStart,
                timeEnd,
                breakStart,
                breakEnd,
                isWorking
            });
        }
    });
    
    saveScheduleData();
    renderScheduleAdmin();
    const modal = document.getElementById('scheduleModal');
    if (modal) modal.style.display = 'none';
    showToast('Расписание сохранено');
}

function exportSchedule() {
    const dataStr = JSON.stringify(scheduleData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schedule_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Экспорт выполнен');
}

function initScheduleTab() {
    loadScheduleData();
    renderScheduleAdmin();
    
    const addScheduleBtn = document.getElementById('addScheduleBtn');
    const scheduleForm = document.getElementById('scheduleForm');
    const exportScheduleBtn = document.getElementById('exportScheduleBtn');
    
    if (addScheduleBtn) {
        addScheduleBtn.addEventListener('click', () => {
            updateDoctorSelect();
            const modal = document.getElementById('scheduleModal');
            const titleEl = document.getElementById('scheduleModalTitle');
            if (titleEl) titleEl.textContent = 'Настроить расписание';
            if (modal) modal.style.display = 'flex';
        });
    }
    if (scheduleForm) scheduleForm.addEventListener('submit', saveSchedule);
    if (exportScheduleBtn) exportScheduleBtn.addEventListener('click', exportSchedule);
    
    document.querySelectorAll('.schedule-working').forEach(checkbox => {
        const day = checkbox.dataset.day;
        const hoursRow = document.querySelector(`.work-hours-row[data-day="${day}"]`);
        checkbox.addEventListener('change', function() {
            if (hoursRow) {
                hoursRow.style.display = this.checked ? 'flex' : 'none';
            }
        });
    });
}


let appointmentsChart = null;
let doctorsChart = null;
let servicesChart = null;
let hoursChart = null;
let weekdaysChart = null;
let statusChart = null;

function getAnalyticsData() {
    let appointmentsData = [];
    let doctorsData = [];
    let servicesData = [];
    
    try {
        const storedAppointments = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
        if (storedAppointments) {
            appointmentsData = JSON.parse(storedAppointments);
        }
        
        const storedDoctors = localStorage.getItem(STORAGE_KEYS.DOCTORS);
        if (storedDoctors) {
            doctorsData = JSON.parse(storedDoctors);
        }
        
        const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
        if (storedServices) {
            servicesData = JSON.parse(storedServices);
        }
    } catch(e) {
        console.error('Ошибка загрузки данных для аналитики:', e);
    }
    
    return { appointmentsData, doctorsData, servicesData };
}

function updateAnalyticsStats() {
    const { appointmentsData } = getAnalyticsData();
    
    const total = appointmentsData.length;
    const confirmed = appointmentsData.filter(a => a.status === 'confirmed').length;
    const completed = appointmentsData.filter(a => a.status === 'completed').length;
    const pending = appointmentsData.filter(a => a.status === 'pending').length;
    const cancelled = appointmentsData.filter(a => a.status === 'cancelled').length;
    
    const totalEl = document.getElementById('totalAppointments');
    const confirmedEl = document.getElementById('confirmedAppointments');
    const completedEl = document.getElementById('completedAppointments');
    const pendingEl = document.getElementById('pendingAppointments');
    const cancelledEl = document.getElementById('cancelledAppointments');
    
    if (totalEl) totalEl.textContent = total;
    if (confirmedEl) confirmedEl.textContent = confirmed;
    if (completedEl) completedEl.textContent = completed;
    if (pendingEl) pendingEl.textContent = pending;
    if (cancelledEl) cancelledEl.textContent = cancelled;
    
    const confirmationRate = total > 0 ? ((confirmed + completed) / total * 100).toFixed(1) : 0;
    const completionRate = total > 0 ? (completed / total * 100).toFixed(1) : 0;
    const cancellationRate = total > 0 ? (cancelled / total * 100).toFixed(1) : 0;
    
    const confirmationRateEl = document.getElementById('confirmationRate');
    const completionRateEl = document.getElementById('completionRate');
    const cancellationRateEl = document.getElementById('cancellationRate');
    
    if (confirmationRateEl) confirmationRateEl.textContent = `${confirmationRate}%`;
    if (completionRateEl) completionRateEl.textContent = `${completionRate}%`;
    if (cancellationRateEl) cancellationRateEl.textContent = `${cancellationRate}%`;
}

function filterAppointmentsByPeriod(period, startDate = null, endDate = null) {
    const { appointmentsData } = getAnalyticsData();
    
    if (!appointmentsData || appointmentsData.length === 0) return [];
    
    let filtered = [...appointmentsData];
    const today = new Date();
    
    if (period === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        filtered = filtered.filter(a => new Date(a.date) >= weekAgo);
    } else if (period === 'month') {
        const monthAgo = new Date();
        monthAgo.setDate(today.getDate() - 30);
        filtered = filtered.filter(a => new Date(a.date) >= monthAgo);
    } else if (period === 'quarter') {
        const quarterAgo = new Date();
        quarterAgo.setDate(today.getDate() - 90);
        filtered = filtered.filter(a => new Date(a.date) >= quarterAgo);
    } else if (period === 'year') {
        const yearAgo = new Date();
        yearAgo.setFullYear(today.getFullYear() - 1);
        filtered = filtered.filter(a => new Date(a.date) >= yearAgo);
    } else if (period === 'custom' && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59);
        filtered = filtered.filter(a => {
            const appDate = new Date(a.date);
            return appDate >= start && appDate <= end;
        });
    }
    
    return filtered;
}

function prepareAppointmentsChartData(filteredAppointments) {
    if (!filteredAppointments || filteredAppointments.length === 0) {
        return { labels: ['Нет данных'], data: [0] };
    }
    
    const dateMap = new Map();
    const today = new Date();
    const last7Days = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const label = `${date.getDate()}.${date.getMonth() + 1}`;
        last7Days.push({ date: dateStr, label });
        dateMap.set(dateStr, 0);
    }
    
    filteredAppointments.forEach(app => {
        if (dateMap.has(app.date)) {
            dateMap.set(app.date, dateMap.get(app.date) + 1);
        }
    });
    
    const labels = last7Days.map(d => d.label);
    const data = last7Days.map(d => dateMap.get(d.date));
    
    return { labels, data };
}

function prepareDoctorsChartData(filteredAppointments, doctorsData) {
    if (!filteredAppointments || filteredAppointments.length === 0 || !doctorsData || doctorsData.length === 0) {
        return { labels: ['Нет данных'], data: [0] };
    }
    
    const doctorMap = new Map();
    
    filteredAppointments.forEach(app => {
        const doctor = doctorsData.find(d => d.id === app.doctorId);
        const doctorName = doctor ? `${doctor.lastName} ${doctor.firstName}`.trim() : 'Неизвестно';
        
        if (doctorMap.has(doctorName)) {
            doctorMap.set(doctorName, doctorMap.get(doctorName) + 1);
        } else {
            doctorMap.set(doctorName, 1);
        }
    });
    
    const sorted = Array.from(doctorMap.entries()).sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(item => item[0].length > 15 ? item[0].substring(0, 15) + '...' : item[0]);
    const data = sorted.map(item => item[1]);
    const total = data.reduce((a, b) => a + b, 0);
    
    const tbody = document.querySelector('#doctorsStatsTable tbody');
    if (tbody) {
        tbody.innerHTML = '';
        if (sorted.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3">Нет данных</td></tr>';
        } else {
            sorted.forEach(([name, count]) => {
                const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${escapeHtml(name)}</td>
                    <td>${count}</td>
                    <td>${percent}% <span class="percent-bar" style="width: ${percent}%;"></span></td>
                `;
                tbody.appendChild(row);
            });
        }
    }
    
    return { labels, data };
}

function prepareServicesChartData(filteredAppointments, servicesData) {
    if (!filteredAppointments || filteredAppointments.length === 0 || !servicesData || servicesData.length === 0) {
        return { labels: ['Нет данных'], data: [0] };
    }
    
    const serviceMap = new Map();
    
    filteredAppointments.forEach(app => {
        const service = servicesData.find(s => s.id === app.serviceId);
        const serviceName = service ? service.name : 'Неизвестно';
        
        if (serviceMap.has(serviceName)) {
            serviceMap.set(serviceName, serviceMap.get(serviceName) + 1);
        } else {
            serviceMap.set(serviceName, 1);
        }
    });
    
    const sorted = Array.from(serviceMap.entries()).sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(item => item[0].length > 15 ? item[0].substring(0, 15) + '...' : item[0]);
    const data = sorted.map(item => item[1]);
    const total = data.reduce((a, b) => a + b, 0);
    
    const tbody = document.querySelector('#servicesStatsTable tbody');
    if (tbody) {
        tbody.innerHTML = '';
        if (sorted.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3">Нет данных</td></tr>';
        } else {
            sorted.forEach(([name, count]) => {
                const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${escapeHtml(name)}</td>
                    <td>${count}</td>
                    <td>${percent}% <span class="percent-bar" style="width: ${percent}%;"></span></td>
                `;
                tbody.appendChild(row);
            });
        }
    }
    
    return { labels, data };
}

function prepareHoursChartData(filteredAppointments) {
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const hourMap = new Map();
    hours.forEach(h => hourMap.set(h, 0));
    
    if (filteredAppointments && filteredAppointments.length > 0) {
        filteredAppointments.forEach(app => {
            if (hourMap.has(app.time)) {
                hourMap.set(app.time, hourMap.get(app.time) + 1);
            }
        });
    }
    
    const data = hours.map(h => hourMap.get(h));
    
    let maxCount = 0;
    let peakHour = '—';
    hours.forEach(hour => {
        const count = hourMap.get(hour);
        if (count > maxCount) {
            maxCount = count;
            peakHour = hour;
        }
    });
    
    const peakHourElement = document.getElementById('peakHour');
    if (peakHourElement) {
        peakHourElement.textContent = maxCount > 0 ? peakHour : '—';
    }
    
    return { labels: hours, data };
}

function prepareWeekdaysChartData(filteredAppointments) {
    const labels = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    const weekdayMap = new Map();
    labels.forEach(d => weekdayMap.set(d, 0));
    
    if (filteredAppointments && filteredAppointments.length > 0) {
        filteredAppointments.forEach(app => {
            const date = new Date(app.date);
            const dayIndex = date.getDay();
            const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
            const dayName = days[dayIndex];
            if (weekdayMap.has(dayName)) {
                weekdayMap.set(dayName, weekdayMap.get(dayName) + 1);
            }
        });
    }
    
    const data = labels.map(l => weekdayMap.get(l));
    
    let maxCount = 0;
    let busiestDay = '';
    labels.forEach((day, index) => {
        const count = data[index];
        if (count > maxCount) {
            maxCount = count;
            busiestDay = day;
        }
    });
    
    const dayNames = { 'ПН': 'Понедельник', 'ВТ': 'Вторник', 'СР': 'Среда', 'ЧТ': 'Четверг', 'ПТ': 'Пятница', 'СБ': 'Суббота', 'ВС': 'Воскресенье' };
    
    const busiestDayElement = document.getElementById('busiestDay');
    if (busiestDayElement) {
        busiestDayElement.textContent = maxCount > 0 ? dayNames[busiestDay] || busiestDay : '—';
    }
    
    return { labels, data };
}

function prepareStatusChartData(filteredAppointments) {
    if (!filteredAppointments || filteredAppointments.length === 0) {
        return { labels: ['Нет данных'], data: [1] };
    }
    
    const statusMap = new Map([
        ['pending', 0], ['confirmed', 0], ['completed', 0], ['cancelled', 0]
    ]);
    
    filteredAppointments.forEach(app => {
        statusMap.set(app.status, statusMap.get(app.status) + 1);
    });
    
    const labels = ['Ожидает', 'Подтверждена', 'Завершена', 'Отменена'];
    const data = [statusMap.get('pending'), statusMap.get('confirmed'), statusMap.get('completed'), statusMap.get('cancelled')];
    
    return { labels, data };
}

function createCharts(filteredAppointments, doctorsData, servicesData) {
    const hasData = filteredAppointments && filteredAppointments.length > 0;
    
    const appointmentsChartData = prepareAppointmentsChartData(filteredAppointments);
    if (appointmentsChart) appointmentsChart.destroy();
    const appointmentsCtx = document.getElementById('appointmentsChart')?.getContext('2d');
    if (appointmentsCtx) {
        appointmentsChart = new Chart(appointmentsCtx, {
            type: 'line',
            data: {
                labels: appointmentsChartData.labels,
                datasets: [{
                    label: 'Количество записей',
                    data: appointmentsChartData.data,
                    borderColor: '#A5C33C',
                    backgroundColor: 'rgba(165, 195, 60, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    
    // Врачи
    const doctorsChartData = prepareDoctorsChartData(filteredAppointments, doctorsData);
    if (doctorsChart) doctorsChart.destroy();
    const doctorsCtx = document.getElementById('doctorsChart')?.getContext('2d');
    if (doctorsCtx) {
        doctorsChart = new Chart(doctorsCtx, {
            type: 'bar',
            data: {
                labels: doctorsChartData.labels,
                datasets: [{
                    label: 'Количество записей',
                    data: doctorsChartData.data,
                    backgroundColor: '#3B82F6',
                    borderRadius: 8
                }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    
    // Услуги
    const servicesChartData = prepareServicesChartData(filteredAppointments, servicesData);
    if (servicesChart) servicesChart.destroy();
    const servicesCtx = document.getElementById('servicesChart')?.getContext('2d');
    if (servicesCtx) {
        servicesChart = new Chart(servicesCtx, {
            type: 'bar',
            data: {
                labels: servicesChartData.labels,
                datasets: [{
                    label: 'Количество записей',
                    data: servicesChartData.data,
                    backgroundColor: '#10B981',
                    borderRadius: 8
                }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    
    // Часы пик
    const hoursChartData = prepareHoursChartData(filteredAppointments);
    if (hoursChart) hoursChart.destroy();
    const hoursCtx = document.getElementById('hoursChart')?.getContext('2d');
    if (hoursCtx) {
        hoursChart = new Chart(hoursCtx, {
            type: 'line',
            data: {
                labels: hoursChartData.labels,
                datasets: [{
                    label: 'Количество записей',
                    data: hoursChartData.data,
                    borderColor: '#F59E0B',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    
    // Дни недели
    const weekdaysChartData = prepareWeekdaysChartData(filteredAppointments);
    if (weekdaysChart) weekdaysChart.destroy();
    const weekdaysCtx = document.getElementById('weekdaysChart')?.getContext('2d');
    if (weekdaysCtx) {
        weekdaysChart = new Chart(weekdaysCtx, {
            type: 'bar',
            data: {
                labels: weekdaysChartData.labels,
                datasets: [{
                    label: 'Количество записей',
                    data: weekdaysChartData.data,
                    backgroundColor: '#8B5CF6',
                    borderRadius: 8
                }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    
    // Статусы
    const statusChartData = prepareStatusChartData(filteredAppointments);
    if (statusChart) statusChart.destroy();
    const statusCtx = document.getElementById('statusChart')?.getContext('2d');
    if (statusCtx) {
        const total = statusChartData.data.reduce((a, b) => a + b, 0);
        statusChart = new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: statusChartData.labels,
                datasets: [{
                    data: statusChartData.data,
                    backgroundColor: ['#F59E0B', '#10B981', '#3B82F6', '#EF4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}

// Обновление всей аналитики
function updateAnalytics() {
    const period = document.getElementById('periodSelect')?.value || 'month';
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;
    
    let filteredAppointments;
    if (period === 'custom') {
        filteredAppointments = filterAppointmentsByPeriod('custom', startDate, endDate);
    } else {
        filteredAppointments = filterAppointmentsByPeriod(period);
    }
    
    const { doctorsData, servicesData } = getAnalyticsData();
    
    updateAnalyticsStats();
    createCharts(filteredAppointments, doctorsData, servicesData);
    
    const message = filteredAppointments.length > 0 ? `Данные обновлены (${filteredAppointments.length} записей)` : 'Нет данных для отображения';
    showToast(message, filteredAppointments.length > 0 ? 'success' : 'info');
}

// Экспорт отчета
function exportAnalytics() {
    const period = document.getElementById('periodSelect')?.value || 'month';
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;
    
    let periodText = '';
    if (period === 'custom') {
        periodText = `${startDate} - ${endDate}`;
    } else {
        const selectElement = document.querySelector(`#periodSelect option[value="${period}"]`);
        periodText = selectElement ? selectElement.textContent : period;
    }
    
    let filteredAppointments;
    if (period === 'custom') {
        filteredAppointments = filterAppointmentsByPeriod('custom', startDate, endDate);
    } else {
        filteredAppointments = filterAppointmentsByPeriod(period);
    }
    
    const total = filteredAppointments.length;
    const confirmed = filteredAppointments.filter(a => a.status === 'confirmed').length;
    const completed = filteredAppointments.filter(a => a.status === 'completed').length;
    const pending = filteredAppointments.filter(a => a.status === 'pending').length;
    const cancelled = filteredAppointments.filter(a => a.status === 'cancelled').length;
    
    const report = {
        generatedAt: new Date().toISOString(),
        period: periodText,
        summary: {
            total,
            confirmed,
            completed,
            pending,
            cancelled,
            confirmationRate: total > 0 ? ((confirmed + completed) / total * 100).toFixed(1) : 0,
            completionRate: total > 0 ? (completed / total * 100).toFixed(1) : 0,
            cancellationRate: total > 0 ? (cancelled / total * 100).toFixed(1) : 0
        }
    };
    
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Отчет экспортирован', 'success');
}

function initDefaultDates() {
    const today = new Date();
    const monthAgo = new Date();
    monthAgo.setDate(today.getDate() - 30);
    
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (startDateInput) startDateInput.value = monthAgo.toISOString().split('T')[0];
    if (endDateInput) endDateInput.value = today.toISOString().split('T')[0];
}

function initAnalyticsTab() {
    console.log('Инициализация аналитики...');
    
    if (!document.getElementById('totalAppointments')) {
        console.log('Элементы аналитики не найдены, возможно вкладка не активна');
        return;
    }
    
    initDefaultDates();
    updateAnalytics();
    
    const periodSelect = document.getElementById('periodSelect');
    const applyCustomBtn = document.getElementById('applyCustomPeriod');
    const exportBtn = document.getElementById('exportAnalyticsBtn');
    const refreshBtn = document.getElementById('refreshAnalyticsBtn');
    
    if (periodSelect) {
        periodSelect.addEventListener('change', function() {
            if (this.value !== 'custom') {
                updateAnalytics();
            }
        });
    }
    
    if (applyCustomBtn) {
        applyCustomBtn.addEventListener('click', () => {
            if (periodSelect) periodSelect.value = 'custom';
            updateAnalytics();
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportAnalytics);
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', updateAnalytics);
    }
    
    console.log('Аналитика инициализирована');
}


let discounts = [];

function loadDiscountsData() {
    const stored = localStorage.getItem(STORAGE_KEYS.DISCOUNTS);
    if (stored) {
        discounts = JSON.parse(stored);
    } else {
        discounts = [...defaultDiscounts];
        localStorage.setItem(STORAGE_KEYS.DISCOUNTS, JSON.stringify(discounts));
    }
    return discounts;
}

function saveDiscountsData() {
    localStorage.setItem(STORAGE_KEYS.DISCOUNTS, JSON.stringify(discounts));
}

function getDiscountStatus(discount) {
    const today = new Date().toISOString().split('T')[0];
    
    if (!discount.active) return 'inactive';
    
    if (discount.startDate && discount.endDate) {
        if (today < discount.startDate) return 'upcoming';
        if (today > discount.endDate) return 'expired';
        return 'active';
    }
    
    return discount.active ? 'active' : 'inactive';
}

function renderDiscountsTable() {
    const tbody = document.getElementById('discountsList');
    if (!tbody) return;
    
    const statusFilter = document.getElementById('discountStatusFilter')?.value || 'all';
    const serviceFilter = document.getElementById('discountServiceFilter')?.value || 'all';
    const searchFilter = document.getElementById('discountSearchFilter')?.value.toLowerCase() || '';
    
    let filtered = [...discounts];
    
    if (statusFilter !== 'all') {
        filtered = filtered.filter(d => getDiscountStatus(d) === statusFilter);
    }
    
    if (serviceFilter !== 'all') {
        filtered = filtered.filter(d => d.serviceId == serviceFilter);
    }
    
    if (searchFilter) {
        filtered = filtered.filter(d => d.name.toLowerCase().includes(searchFilter));
    }
    
    const activeCount = discounts.filter(d => getDiscountStatus(d) === 'active').length;
    const expiredCount = discounts.filter(d => getDiscountStatus(d) === 'expired').length;
    const upcomingCount = discounts.filter(d => getDiscountStatus(d) === 'upcoming').length;
    
    const activeDiscountsEl = document.getElementById('activeDiscounts');
    const expiredDiscountsEl = document.getElementById('expiredDiscounts');
    const upcomingDiscountsEl = document.getElementById('upcomingDiscounts');
    
    if (activeDiscountsEl) activeDiscountsEl.textContent = activeCount;
    if (expiredDiscountsEl) expiredDiscountsEl.textContent = expiredCount;
    if (upcomingDiscountsEl) upcomingDiscountsEl.textContent = upcomingCount;
    
    tbody.innerHTML = '';
    
    filtered.forEach(discount => {
        const serviceName = getServiceNameById(discount.serviceId);
        const status = getDiscountStatus(discount);
        
        const statusText = {
            active: 'Активна',
            expired: 'Просрочена',
            upcoming: 'Предстоит',
            inactive: 'Отключена'
        }[status] || 'Неизвестно';
        
        const statusClass = {
            active: 'status-active',
            expired: 'status-expired',
            upcoming: 'status-upcoming',
            inactive: 'status-inactive'
        }[status] || 'status-inactive';
        
        const discountTypeText = discount.type === 'percentage' ? 'Процентная' : 'Фиксированная';
        
        const discountSizeText = discount.type === 'percentage' ? `${discount.value}%` : `${discount.value} BYN`;
        
        const periodText = discount.startDate && discount.endDate 
            ? `${discount.startDate} — ${discount.endDate}` 
            : 'Без ограничений';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(String(discount.id))}</td>
            <td><strong>${escapeHtml(serviceName)}</strong></td>
            <td>${escapeHtml(discount.name)}</td>
            <td>${escapeHtml(discountTypeText)}</td>
            <td><span class="discount-badge ${discount.type === 'percentage' ? 'discount-percentage' : 'discount-fixed'}">${escapeHtml(discountSizeText)}</span></td>
            <td>${escapeHtml(periodText)}</td>
            <td><span class="status-badge ${statusClass}">${escapeHtml(statusText)}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-discount" data-id="${discount.id}">✏️ Ред.</button>
                <button class="btn-toggle-discount" data-id="${discount.id}">${discount.active ? '🔇 Откл.' : '🔊 Вкл.'}</button>
                <button class="btn-delete-discount" data-id="${discount.id}">🗑️ Удалить</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    document.querySelectorAll('.btn-edit-discount').forEach(btn => {
        btn.removeEventListener('click', () => {});
        btn.addEventListener('click', () => editDiscount(parseInt(btn.dataset.id)));
    });
    
    document.querySelectorAll('.btn-toggle-discount').forEach(btn => {
        btn.removeEventListener('click', () => {});
        btn.addEventListener('click', () => toggleDiscountStatus(parseInt(btn.dataset.id)));
    });
    
    document.querySelectorAll('.btn-delete-discount').forEach(btn => {
        btn.removeEventListener('click', () => {});
        btn.addEventListener('click', () => deleteDiscount(parseInt(btn.dataset.id)));
    });
}

function populateDiscountServiceFilter() {
    const filter = document.getElementById('discountServiceFilter');
    const select = document.getElementById('discountServiceId');
    
    if (!filter || !select) return;
    
    filter.innerHTML = '<option value="all">Все услуги</option>';
    select.innerHTML = '<option value="">-- Выберите услугу --</option>';
    
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        filter.appendChild(option.cloneNode(true));
        select.appendChild(option);
    });
}

function openDiscountModal(editMode = false, discount = null) {
    populateDiscountServiceFilter();
    
    document.getElementById('discountModalTitle').textContent = editMode ? 'Редактировать скидку' : 'Добавить скидку';
    document.getElementById('discountId').value = discount ? discount.id : '';
    document.getElementById('discountServiceId').value = discount ? discount.serviceId : '';
    document.getElementById('discountName').value = discount ? discount.name : '';
    document.getElementById('discountType').value = discount ? discount.type : 'percentage';
    document.getElementById('discountValue').value = discount ? discount.value : '';
    document.getElementById('discountStartDate').value = discount ? (discount.startDate || '') : '';
    document.getElementById('discountEndDate').value = discount ? (discount.endDate || '') : '';
    document.getElementById('discountDescription').value = discount ? (discount.description || '') : '';
    document.getElementById('discountActive').checked = discount ? discount.active : true;
    
    document.getElementById('discountModal').style.display = 'flex';
}

function addDiscount() {
    openDiscountModal(false);
}

function editDiscount(id) {
    const discount = discounts.find(d => d.id === id);
    if (discount) openDiscountModal(true, discount);
}

function toggleDiscountStatus(id) {
    const discount = discounts.find(d => d.id === id);
    if (discount) {
        discount.active = !discount.active;
        saveDiscountsData();
        renderDiscountsTable();
        showToast(discount.active ? 'Скидка активирована' : 'Скидка деактивирована', 'success');
    }
}

function deleteDiscount(id) {
    const discount = discounts.find(d => d.id === id);
    if (!discount) return;
    if (confirm(`Удалить скидку "${discount.name}"?`)) {
        discounts = discounts.filter(d => d.id !== id);
        saveDiscountsData();
        renderDiscountsTable();
        showToast('Скидка удалена', 'success');
    }
}

function saveDiscount(event) {
    event.preventDefault();
    
    const id = parseInt(document.getElementById('discountId').value);
    const serviceId = parseInt(document.getElementById('discountServiceId').value);
    const name = document.getElementById('discountName').value.trim();
    const type = document.getElementById('discountType').value;
    const value = parseFloat(document.getElementById('discountValue').value);
    const startDate = document.getElementById('discountStartDate').value;
    const endDate = document.getElementById('discountEndDate').value;
    const description = document.getElementById('discountDescription').value.trim();
    const active = document.getElementById('discountActive').checked;
    
    if (!serviceId || !name || !value) {
        showToast('Заполните обязательные поля', 'error');
        return;
    }
    
    if (type === 'percentage' && (value < 0 || value > 100)) {
        showToast('Процент скидки должен быть от 0 до 100', 'error');
        return;
    }
    
    if (startDate && endDate && startDate > endDate) {
        showToast('Дата начала не может быть позже даты окончания', 'error');
        return;
    }
    
    if (id) {
        const index = discounts.findIndex(d => d.id === id);
        if (index !== -1) {
            discounts[index] = { ...discounts[index], serviceId, name, type, value, startDate, endDate, description, active };
            saveDiscountsData();
            showToast('Скидка обновлена', 'success');
        }
    } else {
        const newId = Math.max(...discounts.map(d => d.id), 0) + 1;
        discounts.push({ id: newId, serviceId, name, type, value, startDate, endDate, description, active, createdAt: new Date().toISOString() });
        saveDiscountsData();
        showToast('Скидка добавлена', 'success');
    }
    
    renderDiscountsTable();
    document.getElementById('discountModal').style.display = 'none';
    document.getElementById('discountForm').reset();
}

function resetDiscountFilters() {
    document.getElementById('discountStatusFilter').value = 'all';
    document.getElementById('discountServiceFilter').value = 'all';
    document.getElementById('discountSearchFilter').value = '';
    renderDiscountsTable();
}

function initDiscountsTab() {
    loadDiscountsData();
    renderDiscountsTable();
    populateDiscountServiceFilter();
    
    document.getElementById('addDiscountBtn')?.addEventListener('click', addDiscount);
    document.getElementById('discountForm')?.addEventListener('submit', saveDiscount);
    document.getElementById('discountStatusFilter')?.addEventListener('change', renderDiscountsTable);
    document.getElementById('discountServiceFilter')?.addEventListener('change', renderDiscountsTable);
    document.getElementById('discountSearchFilter')?.addEventListener('input', renderDiscountsTable);
}


function init() {
    services = loadData(STORAGE_KEYS.SERVICES, defaultServices);
    serviceDetails = loadData(STORAGE_KEYS.SERVICE_DETAILS, defaultServiceDetails);
    doctors = loadData(STORAGE_KEYS.DOCTORS, defaultDoctors);
    appointments = loadData(STORAGE_KEYS.APPOINTMENTS, defaultAppointments);
    reviews = loadData(STORAGE_KEYS.REVIEWS, defaultReviews);
    pricesData = loadPricesData();
    scheduleData = loadScheduleData();
    discounts = loadDiscountsData();
    
    renderServices();
    updateServiceDetailsFilter();
    renderServiceDetails();
    renderDoctors();
    renderAppointments();
    renderReviewsTable();
    renderPricesAdmin();
    renderScheduleAdmin();
    renderDiscountsTable();
    
    initTabs();
    initMobileMenu();
    initReviewsTab();
    initScheduleTab();
    initDiscountsTab();
    updatePriceCategoryFilters();
    
    const analyticsTab = document.querySelector('.nav-tab[data-tab="analytics"]');
    if (analyticsTab) {
        analyticsTab.addEventListener('click', () => {
            setTimeout(initAnalyticsTab, 100);
        });
    }
    
    if (document.getElementById('tab-analytics') && document.getElementById('tab-analytics').classList.contains('active')) {
        setTimeout(initAnalyticsTab, 200);
    }
    
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
    const reviewStatusFilter = document.getElementById('reviewStatusFilter');
    const reviewSearchFilter = document.getElementById('reviewSearchFilter');
    const resetReviewFiltersBtn = document.getElementById('resetReviewFilters');
    const exportReviewsBtn = document.getElementById('exportReviewsBtn');
    const addPriceCategoryBtn = document.getElementById('addPriceCategoryBtn');
    const priceCategoryForm = document.getElementById('priceCategoryForm');
    const addPriceServiceBtn = document.getElementById('addPriceServiceBtn');
    const priceServiceForm = document.getElementById('priceServiceForm');
    const exportPricesBtn = document.getElementById('exportPricesBtn');
    const priceCategoryFilter = document.getElementById('priceCategoryFilter');
    const priceSearchFilter = document.getElementById('priceSearchFilter');
    const addScheduleBtn = document.getElementById('addScheduleBtn');
    const scheduleForm = document.getElementById('scheduleForm');
    const exportScheduleBtn = document.getElementById('exportScheduleBtn');
    const addDiscountBtn = document.getElementById('addDiscountBtn');
    const discountForm = document.getElementById('discountForm');
    const discountStatusFilter = document.getElementById('discountStatusFilter');
    const discountServiceFilter = document.getElementById('discountServiceFilter');
    const discountSearchFilter = document.getElementById('discountSearchFilter');
    
    if (addServiceBtn) addServiceBtn.addEventListener('click', addService);
    if (serviceForm) serviceForm.addEventListener('submit', saveService);
    if (addDetailBtn) addDetailBtn.addEventListener('click', addServiceDetail);
    if (detailForm) detailForm.addEventListener('submit', saveServiceDetail);
    if (detailServiceFilter) detailServiceFilter.addEventListener('change', renderServiceDetails);
    if (addDoctorBtn) addDoctorBtn.addEventListener('click', addDoctor);
    if (doctorForm) doctorForm.addEventListener('submit', saveDoctor);
    if (addAppointmentBtn) addAppointmentBtn.addEventListener('click', addAppointment);
    if (appointmentForm) appointmentForm.addEventListener('submit', saveAppointment);
    if (appointmentDoctorFilter) appointmentDoctorFilter.addEventListener('change', renderAppointments);
    if (appointmentDateFilter) appointmentDateFilter.addEventListener('change', renderAppointments);
    if (appointmentStatusFilter) appointmentStatusFilter.addEventListener('change', renderAppointments);
    if (resetAppointmentFiltersBtn) resetAppointmentFiltersBtn.addEventListener('click', resetAppointmentFilters);
    if (reviewStatusFilter) reviewStatusFilter.addEventListener('change', renderReviewsTable);
    if (reviewSearchFilter) reviewSearchFilter.addEventListener('input', renderReviewsTable);
    if (resetReviewFiltersBtn) resetReviewFiltersBtn.addEventListener('click', resetReviewFilters);
    if (exportReviewsBtn) exportReviewsBtn.addEventListener('click', exportReviews);
    if (addPriceCategoryBtn) addPriceCategoryBtn.addEventListener('click', addPriceCategory);
    if (priceCategoryForm) priceCategoryForm.addEventListener('submit', savePriceCategory);
    if (addPriceServiceBtn) addPriceServiceBtn.addEventListener('click', addPriceService);
    if (priceServiceForm) priceServiceForm.addEventListener('submit', savePriceService);
    if (exportPricesBtn) exportPricesBtn.addEventListener('click', exportPrices);
    if (priceCategoryFilter) priceCategoryFilter.addEventListener('change', renderPricesAdmin);
    if (priceSearchFilter) priceSearchFilter.addEventListener('input', renderPricesAdmin);
    if (addScheduleBtn) addScheduleBtn.addEventListener('click', () => {
        updateDoctorSelect();
        const modal = document.getElementById('scheduleModal');
        if (modal) modal.style.display = 'flex';
    });
    if (scheduleForm) scheduleForm.addEventListener('submit', saveSchedule);
    if (exportScheduleBtn) exportScheduleBtn.addEventListener('click', exportSchedule);
    if (addDiscountBtn) addDiscountBtn.addEventListener('click', addDiscount);
    if (discountForm) discountForm.addEventListener('submit', saveDiscount);
    if (discountStatusFilter) discountStatusFilter.addEventListener('change', renderDiscountsTable);
    if (discountServiceFilter) discountServiceFilter.addEventListener('change', renderDiscountsTable);
    if (discountSearchFilter) discountSearchFilter.addEventListener('input', renderDiscountsTable);
    
    document.querySelectorAll('.modal-close, .btn-cancel').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = btn.dataset.modal;
            if (modalId) {
                const modal = document.getElementById(modalId);
                if (modal) modal.style.display = 'none';
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
    
    document.querySelectorAll('.schedule-working').forEach(checkbox => {
        const day = checkbox.dataset.day;
        const hoursRow = document.querySelector(`.work-hours-row[data-day="${day}"]`);
        checkbox.addEventListener('change', function() {
            if (hoursRow) {
                hoursRow.style.display = this.checked ? 'flex' : 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', init);