let appointmentsChart = null;
let doctorsChart = null;
let servicesChart = null;
let hoursChart = null;
let weekdaysChart = null;
let statusChart = null;

let analyticsData = {
    appointments: [],
    doctors: [],
    services: []
};

async function loadAnalyticsData() {
    try {
        const [appointmentsRes, doctorsRes, servicesRes] = await Promise.all([
            fetch('http://localhost:3000/appointments'),
            fetch('http://localhost:3000/doctors'),
            fetch('http://localhost:3000/services')
        ]);
        
        if (!appointmentsRes.ok || !doctorsRes.ok || !servicesRes.ok) {
            throw new Error('Ошибка загрузки данных из API');
        }
        
        analyticsData.appointments = await appointmentsRes.json();
        analyticsData.doctors = await doctorsRes.json();
        analyticsData.services = await servicesRes.json();
        
        console.log(`Загружено из API: ${analyticsData.appointments.length} записей, ${analyticsData.doctors.length} врачей, ${analyticsData.services.length} услуг`);
        
        if (analyticsData.appointments.length === 0) {
            console.warn('Нет данных о записях. Добавьте записи через админ-панель или в db.json');
            showToastForAnalytics('Нет данных для отображения. Добавьте записи через админ-панель.', 'info');
        }
        
    } catch (error) {
        console.error('Ошибка загрузки из API:', error);
        showToastForAnalytics('Ошибка подключения к серверу. Запустите json-server --watch db.json --port 3000', 'error');
        
        analyticsData.appointments = [];
        analyticsData.doctors = [];
        analyticsData.services = [];
    }
}

// Фильтр по периоду
function filterByPeriod(period, startDate = null, endDate = null) {
    let filtered = [...analyticsData.appointments];
    
    if (filtered.length === 0) return [];
    
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
    } else if (period === 'all') {
        // возвращаем все записи
        return filtered;
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

function updateStatistics(filteredAppointments) {
    const total = filteredAppointments.length;
    const confirmed = filteredAppointments.filter(a => a.status === 'confirmed').length;
    const completed = filteredAppointments.filter(a => a.status === 'completed').length;
    const pending = filteredAppointments.filter(a => a.status === 'pending').length;
    const cancelled = filteredAppointments.filter(a => a.status === 'cancelled').length;
    
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
    
    // Конверсия
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

function prepareDoctorsChartData(filteredAppointments) {
    if (!filteredAppointments || filteredAppointments.length === 0) {
        return { labels: ['Нет данных'], data: [0] };
    }
    
    const doctorMap = new Map();
    
    filteredAppointments.forEach(app => {
        const doctor = analyticsData.doctors.find(d => d.id === app.doctorId);
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
                    <td class="doctor-name">${escapeHtmlForAnalytics(name)}</td>
                    <td class="doctor-count">${count}</td>
                    <td class="doctor-percent">${percent}% <span class="percent-bar" style="width: ${percent}%;"></span></td>
                `;
                tbody.appendChild(row);
            });
        }
    }
    
    return { labels, data };
}

function prepareServicesChartData(filteredAppointments) {
    if (!filteredAppointments || filteredAppointments.length === 0) {
        return { labels: ['Нет данных'], data: [0] };
    }
    
    const serviceMap = new Map();
    
    filteredAppointments.forEach(app => {
        const service = analyticsData.services.find(s => s.id === app.serviceId);
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
            tbody.innerHTML = '<tr><td colspan="3">Нет данных</td></table>';
        } else {
            sorted.forEach(([name, count]) => {
                const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="service-name">${escapeHtmlForAnalytics(name)}</td>
                    <td class="service-count">${count}</td>
                    <td class="service-percent">${percent}% <span class="percent-bar" style="width: ${percent}%;"></span></td>
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

function createCharts(filteredAppointments) {
    const hasData = filteredAppointments && filteredAppointments.length > 0;
    
    // Динамика записей
    const appointmentsData = prepareAppointmentsChartData(filteredAppointments);
    if (appointmentsChart) appointmentsChart.destroy();
    const appointmentsCtx = document.getElementById('appointmentsChart')?.getContext('2d');
    if (appointmentsCtx) {
        if (hasData && appointmentsData.labels[0] !== 'Нет данных') {
            appointmentsChart = new Chart(appointmentsCtx, {
                type: 'line',
                data: {
                    labels: appointmentsData.labels,
                    datasets: [{
                        label: 'Количество записей',
                        data: appointmentsData.data,
                        borderColor: '#A5C33C',
                        backgroundColor: 'rgba(165, 195, 60, 0.1)',
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: '#A5C33C',
                        pointBorderColor: '#fff',
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { position: 'top' },
                        tooltip: { callbacks: { label: (ctx) => `${ctx.raw} записей` } }
                    }
                }
            });
        } else {
            appointmentsChart = new Chart(appointmentsCtx, {
                type: 'line',
                data: {
                    labels: ['Нет данных'],
                    datasets: [{
                        label: 'Количество записей',
                        data: [0],
                        borderColor: '#9CA3AF',
                        backgroundColor: 'rgba(156, 163, 175, 0.1)'
                    }]
                },
                options: { responsive: true, maintainAspectRatio: true }
            });
        }
    }
    
    // Врачи
    const doctorsData = prepareDoctorsChartData(filteredAppointments);
    if (doctorsChart) doctorsChart.destroy();
    const doctorsCtx = document.getElementById('doctorsChart')?.getContext('2d');
    if (doctorsCtx) {
        if (hasData && doctorsData.labels[0] !== 'Нет данных') {
            doctorsChart = new Chart(doctorsCtx, {
                type: 'bar',
                data: {
                    labels: doctorsData.labels,
                    datasets: [{
                        label: 'Количество записей',
                        data: doctorsData.data,
                        backgroundColor: '#3B82F6',
                        borderRadius: 8,
                        barPercentage: 0.7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { position: 'top' },
                        tooltip: { callbacks: { label: (ctx) => `${ctx.raw} записей` } }
                    }
                }
            });
        } else {
            doctorsChart = new Chart(doctorsCtx, {
                type: 'bar',
                data: {
                    labels: ['Нет данных'],
                    datasets: [{ label: 'Количество записей', data: [0], backgroundColor: '#9CA3AF' }]
                },
                options: { responsive: true, maintainAspectRatio: true }
            });
        }
    }
    
    // Услуги
    const servicesData = prepareServicesChartData(filteredAppointments);
    if (servicesChart) servicesChart.destroy();
    const servicesCtx = document.getElementById('servicesChart')?.getContext('2d');
    if (servicesCtx) {
        if (hasData && servicesData.labels[0] !== 'Нет данных') {
            servicesChart = new Chart(servicesCtx, {
                type: 'bar',
                data: {
                    labels: servicesData.labels,
                    datasets: [{
                        label: 'Количество записей',
                        data: servicesData.data,
                        backgroundColor: '#10B981',
                        borderRadius: 8,
                        barPercentage: 0.7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { position: 'top' },
                        tooltip: { callbacks: { label: (ctx) => `${ctx.raw} записей` } }
                    }
                }
            });
        } else {
            servicesChart = new Chart(servicesCtx, {
                type: 'bar',
                data: {
                    labels: ['Нет данных'],
                    datasets: [{ label: 'Количество записей', data: [0], backgroundColor: '#9CA3AF' }]
                },
                options: { responsive: true, maintainAspectRatio: true }
            });
        }
    }
    
    // Часы пик
    const hoursData = prepareHoursChartData(filteredAppointments);
    if (hoursChart) hoursChart.destroy();
    const hoursCtx = document.getElementById('hoursChart')?.getContext('2d');
    if (hoursCtx) {
        hoursChart = new Chart(hoursCtx, {
            type: 'line',
            data: {
                labels: hoursData.labels,
                datasets: [{
                    label: 'Количество записей',
                    data: hoursData.data,
                    borderColor: '#F59E0B',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#F59E0B',
                    pointBorderColor: '#fff',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    tooltip: { callbacks: { label: (ctx) => `${ctx.raw} записей` } }
                }
            }
        });
    }
    
    // Дни недели
    const weekdaysData = prepareWeekdaysChartData(filteredAppointments);
    if (weekdaysChart) weekdaysChart.destroy();
    const weekdaysCtx = document.getElementById('weekdaysChart')?.getContext('2d');
    if (weekdaysCtx) {
        weekdaysChart = new Chart(weekdaysCtx, {
            type: 'bar',
            data: {
                labels: weekdaysData.labels,
                datasets: [{
                    label: 'Количество записей',
                    data: weekdaysData.data,
                    backgroundColor: '#8B5CF6',
                    borderRadius: 8,
                    barPercentage: 0.7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    tooltip: { callbacks: { label: (ctx) => `${ctx.raw} записей` } }
                }
            }
        });
    }
    
    // Статусы
    const statusData = prepareStatusChartData(filteredAppointments);
    if (statusChart) statusChart.destroy();
    const statusCtx = document.getElementById('statusChart')?.getContext('2d');
    if (statusCtx) {
        if (hasData && statusData.labels[0] !== 'Нет данных') {
            const total = statusData.data.reduce((a, b) => a + b, 0);
            statusChart = new Chart(statusCtx, {
                type: 'doughnut',
                data: {
                    labels: statusData.labels,
                    datasets: [{
                        data: statusData.data,
                        backgroundColor: ['#F59E0B', '#10B981', '#3B82F6', '#EF4444'],
                        borderWidth: 0,
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { position: 'bottom' },
                        tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw} записей (${total > 0 ? ((ctx.raw / total) * 100).toFixed(1) : 0}%)` } }
                    }
                }
            });
        } else {
            statusChart = new Chart(statusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Нет данных'],
                    datasets: [{ data: [1], backgroundColor: ['#9CA3AF'], borderWidth: 0 }]
                },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom' } } }
            });
        }
    }
}

async function updateAnalytics() {
    await loadAnalyticsData();
    
    const period = document.getElementById('periodSelect')?.value || 'month';
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;
    
    let filteredAppointments;
    if (period === 'custom') {
        filteredAppointments = filterByPeriod('custom', startDate, endDate);
    } else {
        filteredAppointments = filterByPeriod(period);
    }
    
    updateStatistics(filteredAppointments);
    createCharts(filteredAppointments);
    
    const message = filteredAppointments.length > 0 ? `Данные обновлены (${filteredAppointments.length} записей)` : 'Нет данных для отображения';
    showToastForAnalytics(message, filteredAppointments.length > 0 ? 'success' : 'info');
}

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
        filteredAppointments = filterByPeriod('custom', startDate, endDate);
    } else {
        filteredAppointments = filterByPeriod(period);
    }
    
    const total = filteredAppointments.length;
    const confirmed = filteredAppointments.filter(a => a.status === 'confirmed').length;
    const completed = filteredAppointments.filter(a => a.status === 'completed').length;
    const pending = filteredAppointments.filter(a => a.status === 'pending').length;
    const cancelled = filteredAppointments.filter(a => a.status === 'cancelled').length;
    
    const doctorStats = [];
    const doctorMap = new Map();
    filteredAppointments.forEach(app => {
        const doctor = analyticsData.doctors.find(d => d.id === app.doctorId);
        const doctorName = doctor ? `${doctor.lastName} ${doctor.firstName}`.trim() : 'Неизвестно';
        doctorMap.set(doctorName, (doctorMap.get(doctorName) || 0) + 1);
    });
    doctorMap.forEach((count, name) => {
        doctorStats.push({ name, count, percent: total > 0 ? ((count / total) * 100).toFixed(1) : 0 });
    });
    doctorStats.sort((a, b) => b.count - a.count);
    
    const serviceStats = [];
    const serviceMap = new Map();
    filteredAppointments.forEach(app => {
        const service = analyticsData.services.find(s => s.id === app.serviceId);
        const serviceName = service ? service.name : 'Неизвестно';
        serviceMap.set(serviceName, (serviceMap.get(serviceName) || 0) + 1);
    });
    serviceMap.forEach((count, name) => {
        serviceStats.push({ name, count, percent: total > 0 ? ((count / total) * 100).toFixed(1) : 0 });
    });
    serviceStats.sort((a, b) => b.count - a.count);
    
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
        },
        doctors: doctorStats,
        services: serviceStats
    };
    
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToastForAnalytics('Отчет экспортирован', 'success');
}

function escapeHtmlForAnalytics(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function showToastForAnalytics(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
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

async function initAnalytics() {
    console.log('Инициализация аналитики...');
    
    if (!document.getElementById('totalAppointments')) {
        console.log('Элементы аналитики не найдены, возможно вкладка не активна');
        return;
    }
    
    initDefaultDates();
    await loadAnalyticsData();
    updateStatistics(analyticsData.appointments);
    createCharts(analyticsData.appointments);
    
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
    
    const tabs = document.querySelectorAll('.nav-tab');
    if (tabs.length) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                if (tab.dataset.tab === 'analytics') {
                    setTimeout(() => {
                        if (appointmentsChart) appointmentsChart.resize();
                        if (doctorsChart) doctorsChart.resize();
                        if (servicesChart) servicesChart.resize();
                        if (hoursChart) hoursChart.resize();
                        if (weekdaysChart) weekdaysChart.resize();
                        if (statusChart) statusChart.resize();
                    }, 100);
                }
            });
        });
    }
    
    console.log('Аналитика инициализирована');
}

document.addEventListener('DOMContentLoaded', initAnalytics);