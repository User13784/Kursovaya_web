const SCHEDULE_STORAGE_KEY = 'dental_schedule';
const SCHEDULE_VERSION = '1.0';

const defaultSchedule = {
    version: SCHEDULE_VERSION,
    doctors: [
        { id: 1, name: 'Волкова Екатерина Андреевна', specialization: 'Стоматолог-терапевт, детский стоматолог', photo: '../assets/images/team/team-menu2.jpg' },
        { id: 2, name: 'Кузнецов Андрей Владимирович', specialization: 'Стоматолог-пародонтолог', photo: '../assets/images/team/team-menu3.jpg' },
        { id: 3, name: 'Соколова Мария Александровна', specialization: 'Стоматолог-пародонтолог, гигиенист', photo: '../assets/images/team/team-menu4.jpg' },
        { id: 4, name: 'Новикова Валентина Сергеевна', specialization: 'Стоматолог-терапевт, эндодонтист', photo: '../assets/images/team/team-menu5.jpg' },
        { id: 5, name: 'Щеголев Дмитрий Владиславович', specialization: 'Стоматолог-имплантолог, ортопед', photo: '../assets/images/team/team-menu6.jpg' },
        { id: 6, name: 'Ковальчук Анастасия Дмитриевна', specialization: 'Стоматолог-хирург, имплантолог', photo: '../assets/images/team/team-menu7.jpg' }
    ],
    schedule: [
        { doctorId: 1, day: 'monday', dayName: 'Понедельник', timeStart: '10:00', timeEnd: '18:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 1, day: 'tuesday', dayName: 'Вторник', timeStart: '10:00', timeEnd: '18:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 1, day: 'wednesday', dayName: 'Среда', timeStart: '10:00', timeEnd: '18:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 1, day: 'thursday', dayName: 'Четверг', timeStart: '10:00', timeEnd: '18:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 1, day: 'friday', dayName: 'Пятница', timeStart: '10:00', timeEnd: '18:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 1, day: 'saturday', dayName: 'Суббота', timeStart: '10:00', timeEnd: '15:00', breakStart: '', breakEnd: '', isWorking: true },
        { doctorId: 1, day: 'sunday', dayName: 'Воскресенье', timeStart: '', timeEnd: '', breakStart: '', breakEnd: '', isWorking: false },
        
        { doctorId: 2, day: 'monday', dayName: 'Понедельник', timeStart: '09:00', timeEnd: '17:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 2, day: 'tuesday', dayName: 'Вторник', timeStart: '09:00', timeEnd: '17:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 2, day: 'wednesday', dayName: 'Среда', timeStart: '09:00', timeEnd: '17:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 2, day: 'thursday', dayName: 'Четверг', timeStart: '09:00', timeEnd: '17:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 2, day: 'friday', dayName: 'Пятница', timeStart: '09:00', timeEnd: '17:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 2, day: 'saturday', dayName: 'Суббота', timeStart: '09:00', timeEnd: '14:00', breakStart: '', breakEnd: '', isWorking: true },
        { doctorId: 2, day: 'sunday', dayName: 'Воскресенье', timeStart: '', timeEnd: '', breakStart: '', breakEnd: '', isWorking: false },
        
        { doctorId: 3, day: 'monday', dayName: 'Понедельник', timeStart: '11:00', timeEnd: '19:00', breakStart: '14:00', breakEnd: '15:00', isWorking: true },
        { doctorId: 3, day: 'tuesday', dayName: 'Вторник', timeStart: '11:00', timeEnd: '19:00', breakStart: '14:00', breakEnd: '15:00', isWorking: true },
        { doctorId: 3, day: 'wednesday', dayName: 'Среда', timeStart: '11:00', timeEnd: '19:00', breakStart: '14:00', breakEnd: '15:00', isWorking: true },
        { doctorId: 3, day: 'thursday', dayName: 'Четверг', timeStart: '11:00', timeEnd: '19:00', breakStart: '14:00', breakEnd: '15:00', isWorking: true },
        { doctorId: 3, day: 'friday', dayName: 'Пятница', timeStart: '11:00', timeEnd: '19:00', breakStart: '14:00', breakEnd: '15:00', isWorking: true },
        { doctorId: 3, day: 'saturday', dayName: 'Суббота', timeStart: '10:00', timeEnd: '15:00', breakStart: '', breakEnd: '', isWorking: true },
        { doctorId: 3, day: 'sunday', dayName: 'Воскресенье', timeStart: '', timeEnd: '', breakStart: '', breakEnd: '', isWorking: false },
        
        { doctorId: 4, day: 'monday', dayName: 'Понедельник', timeStart: '08:00', timeEnd: '16:00', breakStart: '12:00', breakEnd: '13:00', isWorking: true },
        { doctorId: 4, day: 'tuesday', dayName: 'Вторник', timeStart: '08:00', timeEnd: '16:00', breakStart: '12:00', breakEnd: '13:00', isWorking: true },
        { doctorId: 4, day: 'wednesday', dayName: 'Среда', timeStart: '08:00', timeEnd: '16:00', breakStart: '12:00', breakEnd: '13:00', isWorking: true },
        { doctorId: 4, day: 'thursday', dayName: 'Четверг', timeStart: '08:00', timeEnd: '16:00', breakStart: '12:00', breakEnd: '13:00', isWorking: true },
        { doctorId: 4, day: 'friday', dayName: 'Пятница', timeStart: '08:00', timeEnd: '16:00', breakStart: '12:00', breakEnd: '13:00', isWorking: true },
        { doctorId: 4, day: 'saturday', dayName: 'Суббота', timeStart: '', timeEnd: '', breakStart: '', breakEnd: '', isWorking: false },
        { doctorId: 4, day: 'sunday', dayName: 'Воскресенье', timeStart: '', timeEnd: '', breakStart: '', breakEnd: '', isWorking: false },
        
        { doctorId: 5, day: 'monday', dayName: 'Понедельник', timeStart: '10:00', timeEnd: '19:00', breakStart: '14:00', breakEnd: '15:00', isWorking: true },
        { doctorId: 5, day: 'tuesday', dayName: 'Вторник', timeStart: '10:00', timeEnd: '19:00', breakStart: '14:00', breakEnd: '15:00', isWorking: true },
        { doctorId: 5, day: 'wednesday', dayName: 'Среда', timeStart: '10:00', timeEnd: '19:00', breakStart: '14:00', breakEnd: '15:00', isWorking: true },
        { doctorId: 5, day: 'thursday', dayName: 'Четверг', timeStart: '10:00', timeEnd: '19:00', breakStart: '14:00', breakEnd: '15:00', isWorking: true },
        { doctorId: 5, day: 'friday', dayName: 'Пятница', timeStart: '10:00', timeEnd: '19:00', breakStart: '14:00', breakEnd: '15:00', isWorking: true },
        { doctorId: 5, day: 'saturday', dayName: 'Суббота', timeStart: '10:00', timeEnd: '15:00', breakStart: '', breakEnd: '', isWorking: true },
        { doctorId: 5, day: 'sunday', dayName: 'Воскресенье', timeStart: '', timeEnd: '', breakStart: '', breakEnd: '', isWorking: false },
        
        { doctorId: 6, day: 'monday', dayName: 'Понедельник', timeStart: '09:00', timeEnd: '18:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 6, day: 'tuesday', dayName: 'Вторник', timeStart: '09:00', timeEnd: '18:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 6, day: 'wednesday', dayName: 'Среда', timeStart: '09:00', timeEnd: '18:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 6, day: 'thursday', dayName: 'Четверг', timeStart: '09:00', timeEnd: '18:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 6, day: 'friday', dayName: 'Пятница', timeStart: '09:00', timeEnd: '18:00', breakStart: '13:00', breakEnd: '14:00', isWorking: true },
        { doctorId: 6, day: 'saturday', dayName: 'Суббота', timeStart: '09:00', timeEnd: '14:00', breakStart: '', breakEnd: '', isWorking: true },
        { doctorId: 6, day: 'sunday', dayName: 'Воскресенье', timeStart: '', timeEnd: '', breakStart: '', breakEnd: '', isWorking: false }
    ]
};

function loadScheduleData() {
    const stored = localStorage.getItem(SCHEDULE_STORAGE_KEY);
    if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.version || parsed.version !== SCHEDULE_VERSION) {
            localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(defaultSchedule));
            return { ...defaultSchedule };
        }
        return parsed;
    } else {
        localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(defaultSchedule));
        return { ...defaultSchedule };
    }
}

function populateDoctorFilter() {
    const filter = document.getElementById('scheduleDoctorFilter');
    if (!filter) return;
    
    const data = loadScheduleData();
    const doctors = data.doctors;
    
    filter.innerHTML = '<option value="all">Все врачи</option>';
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.name + ' (' + doctor.specialization + ')';
        filter.appendChild(option);
    });
}

function displaySchedule() {
    const scheduleContainer = document.getElementById('scheduleList');
    if (!scheduleContainer) return;
    
    const data = loadScheduleData();
    const doctorFilter = document.getElementById('scheduleDoctorFilter')?.value || 'all';
    const dayFilter = document.getElementById('scheduleDayFilter')?.value || 'all';
    
    let doctors = [...data.doctors];
    let schedule = [...data.schedule];
    
    if (doctorFilter !== 'all') {
        doctors = doctors.filter(d => d.id == doctorFilter);
        schedule = schedule.filter(s => s.doctorId == doctorFilter);
    }
    
    if (dayFilter !== 'all') {
        schedule = schedule.filter(s => s.day === dayFilter);
    }
    
    if (doctors.length === 0) {
        scheduleContainer.innerHTML = `
            <div class="empty-schedule">
                <div class="empty-icon">📅</div>
                <div class="empty-text">По вашему запросу ничего не найдено</div>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    doctors.forEach(doctor => {
        const doctorSchedule = schedule.filter(s => s.doctorId === doctor.id);
        
        if (doctorSchedule.length === 0) return;
        
        const dayOrder = { 'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6, 'sunday': 7 };
        doctorSchedule.sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
        
        html += `
            <div class="doctor-schedule-card" data-doctor-id="${doctor.id}">
                <div class="doctor-schedule-header" onclick="toggleDoctorSchedule(this)">
                    <img src="${doctor.photo}" alt="Фото врача" class="doctor-avatar" onerror="this.src='../assets/images/placeholder.jpg'">
                    <div class="doctor-info">
                        <h3>${escapeHtml(doctor.name)}</h3>
                        <p class="doctor-specialization">${escapeHtml(doctor.specialization)}</p>
                    </div>
                    <span class="doctor-toggle">▼</span>
                </div>
                <div class="schedule-table-wrapper">
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th>День недели</th>
                                <th>Время работы</th>
                                <th>Перерыв</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        doctorSchedule.forEach(scheduleItem => {
            let workHours = '';
            let breakTime = '';
            
            if (scheduleItem.isWorking) {
                workHours = `<span class="work-hours">${scheduleItem.timeStart} - ${scheduleItem.timeEnd}</span>`;
                if (scheduleItem.breakStart && scheduleItem.breakEnd) {
                    breakTime = `<span class="break-time">(${scheduleItem.breakStart} - ${scheduleItem.breakEnd})</span>`;
                } else {
                    breakTime = '<span class="break-time">—</span>';
                }
            } else {
                workHours = `<span class="work-hours off">Выходной</span>`;
                breakTime = '<span class="break-time">—</span>';
            }
            
            html += `
                <tr>
                    <td class="day-name">${scheduleItem.dayName}</td>
                    <td>${workHours}</td>
                    <td>${breakTime}</td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });
    
    scheduleContainer.innerHTML = html;
}

function toggleDoctorSchedule(header) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.doctor-toggle');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.classList.remove('open');
    } else {
        content.style.display = 'none';
        toggle.classList.add('open');
    }
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

document.addEventListener('DOMContentLoaded', function() {
    populateDoctorFilter();
    displaySchedule();
    
    const doctorFilter = document.getElementById('scheduleDoctorFilter');
    const dayFilter = document.getElementById('scheduleDayFilter');
    
    if (doctorFilter) {
        doctorFilter.addEventListener('change', displaySchedule);
    }
    
    if (dayFilter) {
        dayFilter.addEventListener('change', displaySchedule);
    }
});