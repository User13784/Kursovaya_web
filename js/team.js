async function loadDoctorsForTeam() {
    try {
        const response = await fetch('http://localhost:3000/doctors');
        const doctors = await response.json();
        
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        const teamGrid = document.getElementById('teamGrid');
        
        if (!teamGrid) return;
        
        teamGrid.innerHTML = '';
        
        doctors.filter(d => d.active).forEach(doctor => {
            let lastName = doctor.lastName;
            let firstName = doctor.firstName;
            let middleName = doctor.middleName || '';
            
            if (typeof lastName === 'object') {
                lastName = lastName[currentLang] || lastName.ru;
            }
            if (typeof firstName === 'object') {
                firstName = firstName[currentLang] || firstName.ru;
            }
            if (typeof middleName === 'object') {
                middleName = middleName[currentLang] || middleName.ru || '';
            }
            
            const fullName = `${lastName} ${firstName}<br>${middleName}`.trim();
            
            let specialization = doctor.specialization;
            if (typeof specialization === 'object') {
                specialization = specialization[currentLang] || specialization.ru;
            }
            
            const doctorCard = `
                <div class="team-item" data-doctor-id="${doctor.id}">
                    <div class="team-image">
                        <img src="${doctor.photo || '../assets/images/team/placeholder.jpg'}" alt="${lastName} ${firstName}">
                    </div>
                    <div class="team-info">
                        <h3>${fullName}</h3>
                        <p>${specialization}</p>
                    </div>
                </div>
            `;
            teamGrid.innerHTML += doctorCard;
        });
        
        document.querySelectorAll('.team-item').forEach(item => {
            item.addEventListener('click', () => {
                const doctorId = item.dataset.doctorId;
                sessionStorage.setItem('selectedDoctorId', doctorId);
                window.location.href = 'team-details.html';
            });
        });
        
    } catch (error) {
        console.error('Ошибка загрузки врачей:', error);
        document.getElementById('teamGrid').innerHTML = '<div class="error">Ошибка загрузки данных</div>';
    }
}

document.addEventListener('DOMContentLoaded', loadDoctorsForTeam);

document.addEventListener('languageChanged', loadDoctorsForTeam);