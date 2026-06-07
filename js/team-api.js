async function loadDoctorsForTeam() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return;
    
    teamGrid.innerHTML = '<div class="loading" style="text-align: center; padding: 60px; color: #6B7280;">Загрузка команды...</div>';
    
    try {
        const response = await fetch('http://localhost:3000/doctors');
        if (!response.ok) throw new Error('Ошибка загрузки врачей');
        
        const doctors = await response.json();
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        
        const activeDoctors = doctors.filter(d => d.active !== false);
        
        if (activeDoctors.length === 0) {
            teamGrid.innerHTML = '<div class="empty" style="text-align: center; padding: 60px; color: #6B7280;">Нет данных о врачах</div>';
            return;
        }
        
        teamGrid.innerHTML = '';
        
        activeDoctors.forEach(doctor => {
            let lastName = doctor.lastName;
            let firstName = doctor.firstName;
            let middleName = doctor.middleName || '';
            
            if (typeof lastName === 'object') {
                lastName = lastName[currentLang] || lastName.ru || '';
            } else {
                lastName = lastName || '';
            }
            
            if (typeof firstName === 'object') {
                firstName = firstName[currentLang] || firstName.ru || '';
            } else {
                firstName = firstName || '';
            }
            
            if (typeof middleName === 'object') {
                middleName = middleName[currentLang] || middleName.ru || '';
            }
            
            let fullNameHtml = `${lastName} ${firstName}`;
            if (middleName) {
                fullNameHtml += `<br>${middleName}`;
            }
            
            let specialization = doctor.specialization;
            if (typeof specialization === 'object') {
                specialization = specialization[currentLang] || specialization.ru || '';
            } else {
                specialization = specialization || '';
            }
            
            const photoUrl = doctor.photo || '../assets/images/team/placeholder.jpg';
            
            const doctorCard = document.createElement('div');
            doctorCard.className = 'team-item';
            doctorCard.setAttribute('data-doctor-id', doctor.id);
            doctorCard.style.cursor = 'pointer';
            
            doctorCard.innerHTML = `
                <div class="team-image">
                    <img src="${photoUrl}" alt="${lastName} ${firstName}" onerror="this.src='../assets/images/team/photo.jpg'">
                </div>
                <div class="team-info">
                    <h3>${fullNameHtml}</h3>
                    <p>${specialization}</p>
                </div>
            `;
            
            doctorCard.addEventListener('click', (function(id) {
                return function() {
                    sessionStorage.setItem('selectedDoctorId', id);
                    window.location.href = 'team-details.html';
                };
            })(doctor.id));
            
            teamGrid.appendChild(doctorCard);
        });
        
        console.log(`✅ Загружено ${activeDoctors.length} врачей, язык: ${currentLang}`);
        
    } catch (error) {
        console.error('❌ Ошибка загрузки врачей:', error);
        teamGrid.innerHTML = `
            <div class="error" style="text-align: center; padding: 60px; color: #EF4444;">
                <p>⚠️ Ошибка загрузки данных</p>
                <p style="font-size: 14px; margin-top: 10px;">Убедитесь, что сервер запущен: json-server --watch db.json --port 3000</p>
            </div>
        `;
    }
}

function refreshTeamOnLanguageChange() {
    console.log('🔄 Обновление команды при смене языка');
    loadDoctorsForTeam();
}

document.addEventListener('DOMContentLoaded', function() {
    loadDoctorsForTeam();
});

document.addEventListener('languageChanged', function() {
    setTimeout(refreshTeamOnLanguageChange, 100);
});

window.loadDoctorsForTeam = loadDoctorsForTeam;
window.refreshTeamOnLanguageChange = refreshTeamOnLanguageChange;