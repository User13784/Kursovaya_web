// ========== ПЕРЕВОДЫ ДЛЯ ВСЕГО САЙТА ==========

const translations = {
    ru: {
        // Header
        'menu': 'МЕНЮ',
        'login': 'ВОЙТИ',
        'lang': 'RUS',
        
        // Footer
        'home': 'ГЛАВНАЯ',
        'services': 'УСЛУГИ',
        'team': 'КОМАНДА',
        'reviews': 'ОТЗЫВЫ',
        'contacts': 'КОНТАКТЫ',
        'prices': 'ПРАЙС-ЛИСТ',
        'schedule': 'РАСПИСАНИЕ',
        'faq': 'ВОПРОС-ОТВЕТ',
        
        // Hero section
        'hero_title': 'DENTAL CLUB',
        'hero_subtitle': 'Ваша улыбка - наша забота',
        'appointment_btn': 'ЗАПИСАТЬСЯ НА ПРИЕМ',
        
        // Clinic info
        'clinic_title': 'О КЛИНИКЕ',
        'clinic_text': 'Современная стоматологическая клиника с европейским уровнем сервиса',
        
        // Advantages
        'advantages_title': 'НАШИ ПРЕИМУЩЕСТВА',
        'advantage_1': 'Современное оборудование',
        'advantage_2': 'Опытные специалисты',
        'advantage_3': 'Безопасные материалы',
        'advantage_4': 'Доступные цены',
        
        // Buttons
        'more_btn': 'ПОДРОБНЕЕ',
        'send_btn': 'ОТПРАВИТЬ',
        'save_btn': 'СОХРАНИТЬ',
        'cancel_btn': 'ОТМЕНА',
        'edit_btn': 'РЕДАКТИРОВАТЬ',
        'delete_btn': 'УДАЛИТЬ',
        'close_btn': 'ЗАКРЫТЬ',
        'back_btn': 'НАЗАД',
        
        // Contacts page
        'contacts_title': 'КОНТАКТЫ',
        'contact_us': 'СВЯЗАТЬСЯ С НАМИ',
        'address_label': 'Адрес:',
        'phone_label': 'Телефон:',
        'email_label': 'Email:',
        'schedule_label': 'Режим работы:',
        'mon_fri': 'Пн - Пт: 10:00 - 20:00',
        'sat': 'Сб: 10:00 - 16:00',
        'sun': 'Вс: выходной',
        
        // Feedback form
        'feedback_title': 'ОБРАТНАЯ СВЯЗЬ',
        'name_placeholder': 'Ваше имя',
        'email_placeholder': 'Email',
        'phone_placeholder': '+7 (___) ___ __ __',
        'message_placeholder': 'Ваше сообщение',
        'question_placeholder': 'Введите ваш вопрос',
        
        // Reviews
        'reviews_title': 'ОТЗЫВЫ НАШИХ КЛИЕНТОВ',
        'send_review_btn': 'ОТПРАВИТЬ СВОЙ ОТЗЫВ',
        'write_review_title': 'НАПИШИТЕ СВОЙ ОТЗЫВ',
        
        // Team
        'team_title': 'КОМАНДА DENTAL CLUB',
        
        // Prices
        'prices_title': 'ПРАЙС-ЛИСТ',
        'all_services': 'Все услуги',
        'search_placeholder': 'Поиск по названию услуги...',
        'service_name': 'Услуга',
        'price': 'Цена',
        'note': 'Примечание',
        
        // Schedule
        'schedule_title': 'РАСПИСАНИЕ ВРАЧЕЙ',
        'select_doctor': 'Выберите врача',
        'select_day': 'День недели',
        'all_doctors': 'Все врачи',
        'all_days': 'Все дни',
        'working_hours': 'Время работы',
        'break_time': 'Перерыв',
        'day_off': 'Выходной',
        
        // FAQ
        'faq_title': 'ВОПРОС-ОТВЕТ',
        'faq_subtitle': 'Часто задаваемые вопросы о нашей клинике',
        'all_questions': 'Все вопросы',
        'search_questions': 'Поиск по вопросам...',
        'no_results': 'По вашему запросу ничего не найдено',
        'reset_filters': 'Сбросить фильтры',
        
        // Login
        'login_title': 'ВХОД В АККАУНТ',
        'login_subtitle': 'Добро пожаловать обратно!',
        'email_or_phone': 'Email или телефон',
        'password': 'Пароль',
        'remember_me': 'Запомнить меня',
        'forgot_password': 'Забыли пароль?',
        'no_account': 'Нет аккаунта?',
        'register': 'Зарегистрироваться',
        'demo_data': 'Данные для входа:',
        
        // Signup
        'signup_title': 'СОЗДАНИЕ АККАУНТА',
        'signup_subtitle': 'Заполните форму для регистрации',
        'first_name': 'Имя',
        'last_name': 'Фамилия',
        'middle_name': 'Отчество',
        'confirm_password': 'Подтверждение пароля',
        'agree_terms': 'Я соглашаюсь с условиями использования и политикой конфиденциальности',
        'already_have_account': 'Уже есть аккаунт?',
        'sign_in': 'Войти',
        
        // Profile
        'profile_title': 'Личный кабинет',
        'personal_data': 'Личные данные',
        'my_visits': 'Мои визиты',
        'edit_profile': 'Редактировать',
        'save_changes': 'Сохранить изменения',
        'logout': 'Выйти из аккаунта',
        'birth_date': 'Дата рождения',
        'address': 'Адрес',
        'all_visits': 'Все',
        'upcoming': 'Предстоящие',
        'past': 'Прошедшие',
        'no_visits': 'У вас пока нет записей на прием',
        
        // Appointment modal
        'appointment_title': 'Запись на прием',
        'patient_name': 'ФИО пациента',
        'select_service': 'Выберите услугу',
        'select_doctor_appointment': 'Выберите врача',
        'select_time': 'Выберите время',
        'comment': 'Комментарий',
        'submit_appointment': 'ЗАПИСАТЬСЯ',
        'appointment_success': 'Запись успешно создана!',
        
        // Admin panel
        'admin_panel': 'Админ-панель',
        'services_management': 'Управление услугами',
        'details_management': 'Детальная информация услуг',
        'doctors_management': 'Управление врачами',
        'appointments_management': 'Запись на прием',
        'reviews_moderation': 'Модерация отзывов',
        'prices_management': 'Управление прайс-листом',
        'schedule_management': 'Управление расписанием',
        'analytics': 'Аналитика',
        'discounts_management': 'Управление скидками',
        'add_service': '+ Добавить услугу',
        'add_doctor': '+ Добавить врача',
        'add_appointment': '+ Новая запись',
        'add_category': '+ Добавить категорию',
        'add_discount': '+ Добавить скидку',
        'total_services': 'Всего услуг',
        'active': 'Активных',
        'edit': 'Редакт.',
        'delete': 'Удалить',
        'save': 'Сохранить',
        'cancel': 'Отмена',
        'export': 'Экспорт',
        'refresh': 'Обновить',
        'reset': 'Сбросить',
        'pending': 'Ожидает',
        'confirmed': 'Подтверждена',
        'completed': 'Завершена',
        'cancelled': 'Отменена',
        'published': 'Опубликован',
        'hidden': 'Скрыт',
        'on_moderation': 'На модерации',
        'active_discounts': 'Активных скидок',
        'expired_discounts': 'Просроченных',
        'upcoming_discounts': 'Предстоящие',
        
        // Analytics
        'analytics_title': 'Аналитика посещений',
        'period': 'Период',
        'last_7_days': 'Последние 7 дней',
        'last_30_days': 'Последние 30 дней',
        'last_90_days': 'Последние 90 дней',
        'last_year': 'Последний год',
        'all_time': 'За все время',
        'custom_period': 'Свой период',
        'apply': 'Применить',
        'from': 'С:',
        'to': 'По:',
        'conversion': 'Конверсия записей',
        'confirmation': 'Подтверждение',
        'completion': 'Завершение',
        'cancellation': 'Отмена',
        'appointments_dynamics': 'Динамика записей',
        'doctors_popularity': 'Востребованность врачей',
        'services_popularity': 'Популярные услуги',
        'peak_hours': 'Часы пик',
        'weekdays_load': 'Загрузка по дням недели',
        'statuses': 'Статусы записей'
    },
    
    en: {
        // Header
        'menu': 'MENU',
        'login': 'LOGIN',
        'lang': 'ENG',
        
        // Footer
        'home': 'HOME',
        'services': 'SERVICES',
        'team': 'TEAM',
        'reviews': 'REVIEWS',
        'contacts': 'CONTACTS',
        'prices': 'PRICE LIST',
        'schedule': 'SCHEDULE',
        'faq': 'FAQ',
        
        // Hero section
        'hero_title': 'DENTAL CLUB',
        'hero_subtitle': 'Your smile is our care',
        'appointment_btn': 'BOOK APPOINTMENT',
        
        // Clinic info
        'clinic_title': 'ABOUT CLINIC',
        'clinic_text': 'Modern dental clinic with European level of service',
        
        // Advantages
        'advantages_title': 'OUR ADVANTAGES',
        'advantage_1': 'Modern equipment',
        'advantage_2': 'Experienced specialists',
        'advantage_3': 'Safe materials',
        'advantage_4': 'Affordable prices',
        
        // Buttons
        'more_btn': 'MORE',
        'send_btn': 'SEND',
        'save_btn': 'SAVE',
        'cancel_btn': 'CANCEL',
        'edit_btn': 'EDIT',
        'delete_btn': 'DELETE',
        'close_btn': 'CLOSE',
        'back_btn': 'BACK',
        
        // Contacts page
        'contacts_title': 'CONTACTS',
        'contact_us': 'CONTACT US',
        'address_label': 'Address:',
        'phone_label': 'Phone:',
        'email_label': 'Email:',
        'schedule_label': 'Working hours:',
        'mon_fri': 'Mon - Fri: 10:00 - 20:00',
        'sat': 'Sat: 10:00 - 16:00',
        'sun': 'Sun: closed',
        
        // Feedback form
        'feedback_title': 'FEEDBACK',
        'name_placeholder': 'Your name',
        'email_placeholder': 'Email',
        'phone_placeholder': '+7 (___) ___ __ __',
        'message_placeholder': 'Your message',
        'question_placeholder': 'Enter your question',
        
        // Reviews
        'reviews_title': 'CLIENT REVIEWS',
        'send_review_btn': 'SEND REVIEW',
        'write_review_title': 'WRITE A REVIEW',
        
        // Team
        'team_title': 'DENTAL CLUB TEAM',
        
        // Prices
        'prices_title': 'PRICE LIST',
        'all_services': 'All services',
        'search_placeholder': 'Search by service name...',
        'service_name': 'Service',
        'price': 'Price',
        'note': 'Note',
        
        // Schedule
        'schedule_title': 'DOCTORS SCHEDULE',
        'select_doctor': 'Select doctor',
        'select_day': 'Day of week',
        'all_doctors': 'All doctors',
        'all_days': 'All days',
        'working_hours': 'Working hours',
        'break_time': 'Break',
        'day_off': 'Day off',
        
        // FAQ
        'faq_title': 'FAQ',
        'faq_subtitle': 'Frequently asked questions about our clinic',
        'all_questions': 'All questions',
        'search_questions': 'Search questions...',
        'no_results': 'No results found for your query',
        'reset_filters': 'Reset filters',
        
        // Login
        'login_title': 'LOGIN',
        'login_subtitle': 'Welcome back!',
        'email_or_phone': 'Email or phone',
        'password': 'Password',
        'remember_me': 'Remember me',
        'forgot_password': 'Forgot password?',
        'no_account': 'Don\'t have an account?',
        'register': 'Sign up',
        'demo_data': 'Demo login data:',
        
        // Signup
        'signup_title': 'CREATE ACCOUNT',
        'signup_subtitle': 'Fill out the form to register',
        'first_name': 'First name',
        'last_name': 'Last name',
        'middle_name': 'Middle name',
        'confirm_password': 'Confirm password',
        'agree_terms': 'I agree to the terms of use and privacy policy',
        'already_have_account': 'Already have an account?',
        'sign_in': 'Sign in',
        
        // Profile
        'profile_title': 'Profile',
        'personal_data': 'Personal data',
        'my_visits': 'My visits',
        'edit_profile': 'Edit',
        'save_changes': 'Save changes',
        'logout': 'Logout',
        'birth_date': 'Birth date',
        'address': 'Address',
        'all_visits': 'All',
        'upcoming': 'Upcoming',
        'past': 'Past',
        'no_visits': 'You have no appointments yet',
        
        // Appointment modal
        'appointment_title': 'Book appointment',
        'patient_name': 'Full name',
        'select_service': 'Select service',
        'select_doctor_appointment': 'Select doctor',
        'select_time': 'Select time',
        'comment': 'Comment',
        'submit_appointment': 'BOOK',
        'appointment_success': 'Appointment successfully created!',
        
        // Admin panel
        'admin_panel': 'Admin panel',
        'services_management': 'Services management',
        'details_management': 'Service details',
        'doctors_management': 'Doctors management',
        'appointments_management': 'Appointments',
        'reviews_moderation': 'Reviews moderation',
        'prices_management': 'Price list management',
        'schedule_management': 'Schedule management',
        'analytics': 'Analytics',
        'discounts_management': 'Discounts management',
        'add_service': '+ Add service',
        'add_doctor': '+ Add doctor',
        'add_appointment': '+ New appointment',
        'add_category': '+ Add category',
        'add_discount': '+ Add discount',
        'total_services': 'Total services',
        'active': 'Active',
        'edit': 'Edit',
        'delete': 'Delete',
        'save': 'Save',
        'cancel': 'Cancel',
        'export': 'Export',
        'refresh': 'Refresh',
        'reset': 'Reset',
        'pending': 'Pending',
        'confirmed': 'Confirmed',
        'completed': 'Completed',
        'cancelled': 'Cancelled',
        'published': 'Published',
        'hidden': 'Hidden',
        'on_moderation': 'On moderation',
        'active_discounts': 'Active discounts',
        'expired_discounts': 'Expired',
        'upcoming_discounts': 'Upcoming',
        
        // Analytics
        'analytics_title': 'Visits analytics',
        'period': 'Period',
        'last_7_days': 'Last 7 days',
        'last_30_days': 'Last 30 days',
        'last_90_days': 'Last 90 days',
        'last_year': 'Last year',
        'all_time': 'All time',
        'custom_period': 'Custom period',
        'apply': 'Apply',
        'from': 'From:',
        'to': 'To:',
        'conversion': 'Appointment conversion',
        'confirmation': 'Confirmation',
        'completion': 'Completion',
        'cancellation': 'Cancellation',
        'appointments_dynamics': 'Appointments dynamics',
        'doctors_popularity': 'Doctors popularity',
        'services_popularity': 'Popular services',
        'peak_hours': 'Peak hours',
        'weekdays_load': 'Weekdays load',
        'statuses': 'Appointment statuses'
    }
};

// Получение текущего языка
let currentLanguage = localStorage.getItem('dental_language') || 'ru';

// Применение переводов на странице
function applyTranslations() {
    const t = translations[currentLanguage];
    if (!t) return;
    
    // Переводим элементы с атрибутом data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
            // Для input и textarea переводим placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = t[key];
                }
            } else {
                element.textContent = t[key];
            }
        }
    });
    
    // Переводим элементы с id
    const elementsWithId = {
        'menuText': 'menu',
        'langSelectorText': 'lang',
        'desktopLoginLink': 'login',
        'footerHomeLink': 'home',
        'footerServicesLink': 'services',
        'footerTeamLink': 'team',
        'footerReviewsLink': 'reviews',
        'footerContactsLink': 'contacts',
        'footerPricesLink': 'prices',
        'footerScheduleLink': 'schedule',
        'heroTitle': 'hero_title',
        'heroSubtitle': 'hero_subtitle',
        'appointmentBtnDesktop': 'appointment_btn'
    };
    
    for (const [id, key] of Object.entries(elementsWithId)) {
        const element = document.getElementById(id);
        if (element && t[key]) {
            element.textContent = t[key];
        }
    }
    
    // Переводим элементы с классами для мобильного меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn && t.menu) mobileMenuBtn.textContent = t.menu;
    
    const mobileLoginLink = document.querySelector('.mobile-login-link');
    if (mobileLoginLink && t.login) mobileLoginLink.textContent = t.login;
    
    const mobileLangSelector = document.querySelector('.mobile-lang-selector');
    if (mobileLangSelector && t.lang) mobileLangSelector.textContent = t.lang;
    
    // Переводим ссылки в футере
    const footerLinks = document.querySelectorAll('.footer-links-row a');
    const footerLinkKeys = ['home', 'services', 'team', 'prices', 'schedule', 'reviews', 'contacts'];
    footerLinks.forEach((link, index) => {
        if (footerLinkKeys[index] && t[footerLinkKeys[index]]) {
            link.textContent = t[footerLinkKeys[index]];
        }
    });
    
    // Переводим ссылки в мобильном меню
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const mobileLinkKeys = ['home', 'services', 'team', 'reviews', 'contacts', 'prices', 'schedule', 'faq'];
    mobileLinks.forEach((link, index) => {
        if (mobileLinkKeys[index] && t[mobileLinkKeys[index]]) {
            link.textContent = t[mobileLinkKeys[index]];
        }
    });
    
    console.log(`✅ Перевод применён: ${currentLanguage}`);
}

// Переключение языка
function switchLanguage() {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    localStorage.setItem('dental_language', currentLanguage);
    applyTranslations();
    
    // Обновляем текущий язык в селекторе
    const langSelectorText = document.getElementById('langSelectorText');
    if (langSelectorText) {
        langSelectorText.textContent = currentLanguage === 'ru' ? 'RUS' : 'ENG';
    }
    
    // Показываем уведомление о смене языка
    showLanguageToast(currentLanguage === 'ru' ? 'Язык изменён на русский' : 'Language changed to English');
    
    console.log(`🌐 Язык переключён на: ${currentLanguage}`);
}

// Уведомление о смене языка
function showLanguageToast(message) {
    let toast = document.querySelector('.language-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'language-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #2F353B;
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-family: 'Mulish', sans-serif;
            font-size: 14px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
    }, 2000);
}

// Инициализация перевода при загрузке страницы
function initTranslations() {
    applyTranslations();
    
    // Настраиваем обработчик клика по селектору языка в header
    const headerLangSelector = document.getElementById('headerLangSelector');
    if (headerLangSelector) {
        // Удаляем старые обработчики
        const newLangSelector = headerLangSelector.cloneNode(true);
        headerLangSelector.parentNode.replaceChild(newLangSelector, headerLangSelector);
        
        newLangSelector.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchLanguage();
        });
    }
    
    // Для мобильного селектора языка
    const mobileLangSelector = document.querySelector('.mobile-lang-selector');
    if (mobileLangSelector) {
        const newMobileLangSelector = mobileLangSelector.cloneNode(true);
        mobileLangSelector.parentNode.replaceChild(newMobileLangSelector, mobileLangSelector);
        
        newMobileLangSelector.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchLanguage();
        });
    }
}

// Запуск после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslations);
} else {
    initTranslations();
}

// Экспортируем функции для глобального использования
window.switchLanguage = switchLanguage;
window.applyTranslations = applyTranslations;
window.currentLanguage = () => currentLanguage;

