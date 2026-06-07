async function loadDoctorsForTeam() {
    try {
        const response = await fetch('http://localhost:3000/doctors');
        const doctors = await response.json();
        
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        const teamGrid = document.getElementById('teamGrid');
        
        if (!teamGrid) return;
        
        teamGrid.innerHTML = '';
        
        const activeDoctors = doctors.filter(d => d.active !== false);
        const sortedDoctors = activeDoctors.sort((a, b) => a.id - b.id);
        
        sortedDoctors.forEach((doctor) => {
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
            
            let photoUrl = doctor.photo;
            let useLogoPlaceholder = false;
            
            if (!photoUrl || photoUrl === '' || photoUrl === '../assets/images/team/placeholder.jpg') {
                useLogoPlaceholder = true;
                photoUrl = '../assets/images/logo/logo4.png';
            }
            
            let positionClass = '';
            if (doctor.id === 1) positionClass = 'doctor-pos-1';
            if (doctor.id === 2) positionClass = 'doctor-pos-2';
            if (doctor.id === 3) positionClass = 'doctor-pos-3';
            if (doctor.id === 4) positionClass = 'doctor-pos-4';
            if (doctor.id === 5) positionClass = 'doctor-pos-5';
            if (doctor.id === 6) positionClass = 'doctor-pos-6';
            
            const doctorCard = document.createElement('div');
            doctorCard.className = `team-item ${positionClass}`;
            doctorCard.setAttribute('data-doctor-id', doctor.id);
            doctorCard.style.cursor = 'pointer';
            
            const logoPlaceholderClass = useLogoPlaceholder ? 'logo-placeholder' : '';
            
            doctorCard.innerHTML = `
                <div class="team-image ${logoPlaceholderClass}">
                    <img src="${photoUrl}" 
                         alt="${lastName} ${firstName}" 
                         onerror="this.src='../assets/images/team/photo.jpg'">
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
        
        console.log(`✅ Загружено ${sortedDoctors.length} врачей, язык: ${currentLang}`);
        
    } catch (error) {
        console.error('❌ Ошибка загрузки врачей:', error);
        const teamGrid = document.getElementById('teamGrid');
        if (teamGrid) {
            teamGrid.innerHTML = `
                <div class="error" style="text-align: center; padding: 60px; color: #EF4444;">
                    <p>⚠️ Ошибка загрузки данных</p>
                    <p style="font-size: 14px; margin-top: 10px;">Убедитесь, что сервер запущен: json-server --watch db.json --port 3000</p>
                </div>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', loadDoctorsForTeam);
document.addEventListener('languageChanged', loadDoctorsForTeam);