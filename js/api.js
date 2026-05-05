
const API_BASE_URL = 'http://localhost:3000';

async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: { 'Content-Type': 'application/json' },
            ...options
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

async function getServices(filters = {}) {
    let query = '/services';
    const params = new URLSearchParams();
    
    if (filters.active !== undefined) params.append('active', filters.active);
    if (filters.search) params.append('q', filters.search);
    if (filters._page) params.append('_page', filters._page);
    if (filters._limit) params.append('_limit', filters._limit);
    
    const queryString = params.toString();
    const result = await apiRequest(`${query}${queryString ? '?' + queryString : ''}`);
    return result || [];
}

async function getServiceById(id) {
    return await apiRequest(`/services/${id}`);
}

async function addService(service) {
    const newService = { ...service, id: Date.now() };
    return await apiRequest('/services', {
        method: 'POST',
        body: JSON.stringify(newService)
    });
}

async function updateService(id, service) {
    return await apiRequest(`/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(service)
    });
}

async function deleteService(id) {
    return await apiRequest(`/services/${id}`, {
        method: 'DELETE'
    });
}

async function getServiceDetails() {
    return await apiRequest('/serviceDetails') || [];
}

async function getServiceDetailById(id) {
    return await apiRequest(`/serviceDetails/${id}`);
}

async function addServiceDetail(detail) {
    const newDetail = { ...detail, id: Date.now() };
    return await apiRequest('/serviceDetails', {
        method: 'POST',
        body: JSON.stringify(newDetail)
    });
}

async function updateServiceDetail(id, detail) {
    return await apiRequest(`/serviceDetails/${id}`, {
        method: 'PUT',
        body: JSON.stringify(detail)
    });
}

async function deleteServiceDetail(id) {
    return await apiRequest(`/serviceDetails/${id}`, {
        method: 'DELETE'
    });
}

async function getDoctors(filters = {}) {
    let query = '/doctors';
    const params = new URLSearchParams();
    
    if (filters.active !== undefined) params.append('active', filters.active);
    
    const queryString = params.toString();
    const result = await apiRequest(`${query}${queryString ? '?' + queryString : ''}`);
    return result || [];
}

async function getDoctorById(id) {
    return await apiRequest(`/doctors/${id}`);
}

async function addDoctor(doctor) {
    const newDoctor = { ...doctor, id: Date.now() };
    return await apiRequest('/doctors', {
        method: 'POST',
        body: JSON.stringify(newDoctor)
    });
}

async function updateDoctor(id, doctor) {
    return await apiRequest(`/doctors/${id}`, {
        method: 'PUT',
        body: JSON.stringify(doctor)
    });
}

async function deleteDoctor(id) {
    return await apiRequest(`/doctors/${id}`, {
        method: 'DELETE'
    });
}

async function getReviews(filters = {}) {
    let query = '/reviews';
    const params = new URLSearchParams();
    
    if (filters.published !== undefined) params.append('published', filters.published);
    if (filters._page) params.append('_page', filters._page);
    if (filters._limit) params.append('_limit', filters._limit);
    
    const queryString = params.toString();
    const result = await apiRequest(`${query}${queryString ? '?' + queryString : ''}`);
    return result || [];
}

async function getReviewById(id) {
    return await apiRequest(`/reviews/${id}`);
}

async function addReview(review) {
    const newReview = {
        ...review,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        published: false
    };
    return await apiRequest('/reviews', {
        method: 'POST',
        body: JSON.stringify(newReview)
    });
}

async function updateReview(id, review) {
    return await apiRequest(`/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    });
}

async function deleteReview(id) {
    return await apiRequest(`/reviews/${id}`, {
        method: 'DELETE'
    });
}

async function getPrices() {
    const result = await apiRequest('/prices');
    return result || { version: '2.0', categories: [], services: [] };
}

async function updatePrices(pricesData) {
    return await apiRequest('/prices', {
        method: 'PUT',
        body: JSON.stringify(pricesData)
    });
}

async function getSchedule() {
    const result = await apiRequest('/schedule');
    return result || { version: '2.0', doctors: [], schedule: [] };
}

async function updateSchedule(scheduleData) {
    return await apiRequest('/schedule', {
        method: 'PUT',
        body: JSON.stringify(scheduleData)
    });
}

async function getFaq(filters = {}) {
    let query = '/faq';
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.active !== undefined) params.append('active', filters.active);
    if (filters.search) params.append('q', filters.search);
    
    const queryString = params.toString();
    const result = await apiRequest(`${query}${queryString ? '?' + queryString : ''}`);
    return result || [];
}

async function getFaqById(id) {
    return await apiRequest(`/faq/${id}`);
}

async function addFaq(faqItem) {
    const newFaq = { ...faqItem, id: Date.now() };
    return await apiRequest('/faq', {
        method: 'POST',
        body: JSON.stringify(newFaq)
    });
}

async function updateFaq(id, faqItem) {
    return await apiRequest(`/faq/${id}`, {
        method: 'PUT',
        body: JSON.stringify(faqItem)
    });
}

async function deleteFaq(id) {
    return await apiRequest(`/faq/${id}`, {
        method: 'DELETE'
    });
}

async function getUsers() {
    return await apiRequest('/users') || [];
}

async function getUserById(id) {
    return await apiRequest(`/users/${id}`);
}

async function loginUser(email, password) {
    const users = await apiRequest(`/users?email=${email}&password=${password}`);
    return users && users.length > 0 ? users[0] : null;
}

async function registerUser(userData) {
    const users = await getUsers();
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
        return { success: false, error: 'Пользователь с таким email уже существует' };
    }
    
    const newUser = {
        id: Date.now(),
        ...userData,
        role: 'user',
        createdAt: new Date().toISOString()
    };
    
    const result = await apiRequest('/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
    });
    
    return { success: true, user: result };
}

async function getAppointments(filters = {}) {
    let query = '/appointments';
    const params = new URLSearchParams();
    
    if (filters.doctorId) params.append('doctorId', filters.doctorId);
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.status) params.append('status', filters.status);
    if (filters.date) params.append('date', filters.date);
    
    const queryString = params.toString();
    const result = await apiRequest(`${query}${queryString ? '?' + queryString : ''}`);
    return result || [];
}

async function getAppointmentById(id) {
    return await apiRequest(`/appointments/${id}`);
}

async function addAppointment(appointment) {
    const newAppointment = {
        ...appointment,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    return await apiRequest('/appointments', {
        method: 'POST',
        body: JSON.stringify(newAppointment)
    });
}

async function updateAppointment(id, appointment) {
    return await apiRequest(`/appointments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(appointment)
    });
}

async function deleteAppointment(id) {
    return await apiRequest(`/appointments/${id}`, {
        method: 'DELETE'
    });
}

async function getDiscounts() {
    return await apiRequest('/discounts') || [];
}

async function getDiscountById(id) {
    return await apiRequest(`/discounts/${id}`);
}

async function addDiscount(discount) {
    const newDiscount = {
        ...discount,
        id: Date.now(),
        createdAt: new Date().toISOString()
    };
    return await apiRequest('/discounts', {
        method: 'POST',
        body: JSON.stringify(newDiscount)
    });
}

async function updateDiscount(id, discount) {
    return await apiRequest(`/discounts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(discount)
    });
}

async function deleteDiscount(id) {
    return await apiRequest(`/discounts/${id}`, {
        method: 'DELETE'
    });
}