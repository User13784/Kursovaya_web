
let scheduleCache = null;

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
    
    const data = await loadScheduleData();
    const doctors = data.doctors || [];
    
    filter.innerHTML = '<option value="all">Все врачи</option>';
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.name + ' (' + doctor.specialization + ')';
        filter.appendChild(option);
    });
}

async function displaySchedule() {
    const scheduleContainer = document.getElementById('scheduleList');
    if (!scheduleContainer) return;
    
    scheduleContainer.innerHTML = '<div class="loading">Загрузка расписания...</div>';
    
    const data = await loadScheduleData();
    const doctorFilter = document.getElementById('scheduleDoctorFilter')?.value || 'all';
    const dayFilter = document.getElementById('scheduleDayFilter')?.value || 'all';
    
    let doctors = [...(data.doctors || [])];
    let schedule = [...(data.schedule || [])];
    
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