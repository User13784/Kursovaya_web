let scheduleCache = null;

function getCurrentLangForSchedule() {
    return localStorage.getItem('dental_language') || 'ru';
}

function getLocalizedDoctorName(doctor) {
    const currentLang = getCurrentLangForSchedule();
    if (currentLang === 'ru') {
        return doctor.name?.ru || doctor.name || '';
    } else {
        return doctor.name?.en || doctor.name?.ru || doctor.name || '';
    }
}

function getLocalizedSpecialization(doctor) {
    const currentLang = getCurrentLangForSchedule();
    if (currentLang === 'ru') {
        return doctor.specialization?.ru || doctor.specialization || '';
    } else {
        return doctor.specialization?.en || doctor.specialization?.ru || doctor.specialization || '';
    }
}

function getLocalizedDayName(scheduleItem) {
    const currentLang = getCurrentLangForSchedule();
    if (currentLang === 'ru') {
        return scheduleItem.dayName?.ru || scheduleItem.dayName || '';
    } else {
        return scheduleItem.dayName?.en || scheduleItem.dayName?.ru || scheduleItem.dayName || '';
    }
}

async function loadScheduleData() {
    try {
        const data = await getSchedule();
        scheduleCache = data;
        return data;
    } catch (error) {
        console.error('Ошибка загрузки расписания:', error);
        return { version: '2.0', doctors: [], schedule: [] };
    }
}

async function populateDoctorFilter() {
    const filter = document.getElementById('scheduleDoctorFilter');
    if (!filter) return;
    
    const currentLang = getCurrentLangForSchedule();
    const allDoctorsText = currentLang === 'ru' ? 'Все врачи' : 'All doctors';
    
    filter.innerHTML = `<option value="all">${allDoctorsText}</option>`;
    
    try {
        const response = await fetch('http://localhost:3000/doctors');
        if (response.ok) {
            const doctors = await response.json();
            const activeDoctors = doctors.filter(d => d.active !== false);
            
            activeDoctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                
                let lastName = '', firstName = '';
                if (typeof doctor.lastName === 'object') {
                    lastName = doctor.lastName[currentLang] || doctor.lastName.ru || '';
                } else {
                    lastName = doctor.lastName || '';
                }
                if (typeof doctor.firstName === 'object') {
                    firstName = doctor.firstName[currentLang] || doctor.firstName.ru || '';
                } else {
                    firstName = doctor.firstName || '';
                }
                
                let specialization = '';
                if (typeof doctor.specialization === 'object') {
                    specialization = doctor.specialization[currentLang] || doctor.specialization.ru || '';
                } else {
                    specialization = doctor.specialization || '';
                }
                
                option.textContent = `${lastName} ${firstName} (${specialization})`.trim();
                filter.appendChild(option);
            });
            
            console.log('✅ Фильтр врачей обновлён, активных врачей:', activeDoctors.length);
        } else {
            throw new Error('Ошибка загрузки');
        }
    } catch (error) {
        console.error('❌ Ошибка загрузки врачей для фильтра:', error);
        const data = await loadScheduleData();
        const doctors = data.doctors || [];
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            const doctorName = getLocalizedDoctorName(doctor);
            const specialization = getLocalizedSpecialization(doctor);
            option.textContent = `${doctorName} (${specialization})`;
            filter.appendChild(option);
        });
    }
}

async function displaySchedule() {
    const scheduleContainer = document.getElementById('scheduleList');
    if (!scheduleContainer) return;
    
    const currentLang = getCurrentLangForSchedule();
    const loadingText = currentLang === 'ru' ? 'Загрузка расписания...' : 'Loading schedule...';
    
    scheduleContainer.innerHTML = `<div class="loading">${loadingText}</div>`;
    
    const data = await loadScheduleData();
    const doctorFilter = document.getElementById('scheduleDoctorFilter')?.value || 'all';
    const dayFilter = document.getElementById('scheduleDayFilter')?.value || 'all';
    
    let doctors = [];
    let schedule = [];
    
    try {
        const doctorsResponse = await fetch('http://localhost:3000/doctors');
        if (doctorsResponse.ok) {
            const allDoctors = await doctorsResponse.json();
            doctors = allDoctors.filter(d => d.active !== false);
            console.log('✅ Загружено активных врачей из /doctors:', doctors.length);
        } else {
            throw new Error('Ошибка загрузки врачей');
        }
        
        schedule = data.schedule || [];
        
        const activeDoctorIds = doctors.map(d => d.id);
        schedule = schedule.filter(s => activeDoctorIds.includes(s.doctorId));
        
    } catch (error) {
        console.error('❌ Ошибка загрузки врачей из API:', error);
        doctors = (data.doctors || []).filter(d => d.active !== false);
        schedule = data.schedule || [];
        console.log('⚠️ Используем fallback данные из schedule, врачей:', doctors.length);
    }
    
    if (doctorFilter !== 'all') {
        doctors = doctors.filter(d => d.id == doctorFilter);
        schedule = schedule.filter(s => s.doctorId == doctorFilter);
    }
    
    if (dayFilter !== 'all') {
        schedule = schedule.filter(s => s.day === dayFilter);
    }
    
    doctors.sort((a, b) => a.id - b.id);
    
    if (doctors.length === 0) {
        const emptyText = currentLang === 'ru' ? 'По вашему запросу ничего не найдено' : 'Nothing found for your request';
        scheduleContainer.innerHTML = `
            <div class="empty-schedule">
                <div class="empty-icon">📅</div>
                <div class="empty-text">${emptyText}</div>
            </div>
        `;
        return;
    }
    
    function getLocalizedValue(value, lang) {
        if (!value) return '';
        if (typeof value === 'string') return value;
        if (typeof value === 'object') {
            return value[lang] || value.ru || value.en || '';
        }
        return '';
    }
    
    let html = '';
    
    for (const doctor of doctors) {
        const doctorSchedule = schedule.filter(s => s.doctorId === doctor.id);
        
        if (doctorSchedule.length === 0) continue;
        
        const dayOrder = { 'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6, 'sunday': 7 };
        doctorSchedule.sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
        
        let doctorName = '';
        
        if (doctor.lastName || doctor.firstName) {
            let lastName = getLocalizedValue(doctor.lastName, currentLang);
            let firstName = getLocalizedValue(doctor.firstName, currentLang);
            let middleName = getLocalizedValue(doctor.middleName, currentLang);
            
            doctorName = `${lastName} ${firstName}`.trim();
            if (middleName && middleName.trim() !== '') {
                doctorName += ` ${middleName}`;
            }
        }
        
        if (!doctorName || doctorName === '') {
            doctorName = getLocalizedValue(doctor.name, currentLang);
        }
        
        if (!doctorName || doctorName === '') {
            doctorName = getLocalizedValue(doctor.fullName, currentLang);
        }
        
        if (!doctorName || doctorName === '') {
            doctorName = currentLang === 'ru' ? 'Врач' : 'Doctor';
        }
        
        let doctorSpecialization = getLocalizedValue(doctor.specialization, currentLang);
        
        let doctorPhoto = doctor.photo || '../assets/images/team/photo.jpg';
        const invalidValues = ['', '123', '0', 'null', 'undefined', 'false', 'placeholder.jpg'];
        if (!doctorPhoto || invalidValues.includes(doctorPhoto)) {
            doctorPhoto = '../assets/images/team/photo.jpg';
        }
        
        html += `
            <div class="doctor-schedule-card" data-doctor-id="${doctor.id}">
                <div class="doctor-schedule-header" onclick="toggleDoctorSchedule(this)">
                    <img src="${doctorPhoto}" alt="Фото врача" class="doctor-avatar" onerror="this.onerror=null; this.src='../assets/images/team/photo.jpg'">
                    <div class="doctor-info">
                        <h3>${escapeHtmlForSchedule(doctorName)}</h3>
                        <p class="doctor-specialization">${escapeHtmlForSchedule(doctorSpecialization)}</p>
                    </div>
                    <span class="doctor-toggle">▼</span>
                </div>
                <div class="schedule-table-wrapper">
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th>${currentLang === 'ru' ? 'День недели' : 'Day of week'}</th>
                                <th>${currentLang === 'ru' ? 'Время работы' : 'Working hours'}</th>
                                <th>${currentLang === 'ru' ? 'Перерыв' : 'Break'}</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        for (const scheduleItem of doctorSchedule) {
            let dayName = '';
            if (scheduleItem.dayName) {
                dayName = getLocalizedValue(scheduleItem.dayName, currentLang);
            } else {
                const dayNames = {
                    monday: { ru: 'Понедельник', en: 'Monday' },
                    tuesday: { ru: 'Вторник', en: 'Tuesday' },
                    wednesday: { ru: 'Среда', en: 'Wednesday' },
                    thursday: { ru: 'Четверг', en: 'Thursday' },
                    friday: { ru: 'Пятница', en: 'Friday' },
                    saturday: { ru: 'Суббота', en: 'Saturday' },
                    sunday: { ru: 'Воскресенье', en: 'Sunday' }
                };
                dayName = dayNames[scheduleItem.day]?.[currentLang] || scheduleItem.day;
            }
            
            let workHours = '';
            let breakTime = '';
            
            if (scheduleItem.isWorking) {
                workHours = `<span class="work-hours">${scheduleItem.timeStart || '—'} - ${scheduleItem.timeEnd || '—'}</span>`;
                if (scheduleItem.breakStart && scheduleItem.breakEnd) {
                    breakTime = `<span class="break-time">(${scheduleItem.breakStart} - ${scheduleItem.breakEnd})</span>`;
                } else {
                    breakTime = '<span class="break-time">—</span>';
                }
            } else {
                const dayOffText = currentLang === 'ru' ? 'Выходной' : 'Day off';
                workHours = `<span class="work-hours off">${dayOffText}</span>`;
                breakTime = '<span class="break-time">—</span>';
            }
            
            html += `
                <tr>
                    <td class="day-name">${escapeHtmlForSchedule(dayName)}</span>
                    <td>${workHours}</span>
                    <td>${breakTime}</span>
                </tr>
            `;
        }
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
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

function escapeHtmlForSchedule(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
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

function escapeHtmlForSchedule(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    await populateDoctorFilter();
    await displaySchedule();
    
    const doctorFilter = document.getElementById('scheduleDoctorFilter');
    const dayFilter = document.getElementById('scheduleDayFilter');
    
    if (doctorFilter) {
        doctorFilter.addEventListener('change', () => displaySchedule());
    }
    
    if (dayFilter) {
        dayFilter.addEventListener('change', () => displaySchedule());
    }
});

document.addEventListener('languageChanged', function() {
    populateDoctorFilter();
    displaySchedule();
});

window.toggleDoctorSchedule = toggleDoctorSchedule;
window.displaySchedule = displaySchedule;

