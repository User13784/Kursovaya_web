const API_BASE_URL = 'http://localhost:3000';

const LOCKED_PAGES = [
    'service-menu2.html',
    'service-menu3.html', 
    'service-menu4.html',
    'service-menu5.html',
    'service-menu6.html',
    'service-menu7.html',
    'service-menu8.html',
    'service-menu9.html'
];
const TEMPLATE_PAGE = 'service-template.html';  


function isLockedPage(page) {
    if (!page || page === 'undefined' || page === 'null') {
        console.warn('isLockedPage: страница не указана, блокируем');
        return true;
    }
    
    try {
        const basePage = getBasePageName(page);
        
        if (!basePage) {
            console.warn('isLockedPage: basePage пустая, блокируем');
            return true;
        }
        
        if (basePage === TEMPLATE_PAGE) {
            console.log(`✅ Разрешено редактирование (точное совпадение): ${page}`);
            return false;
        }
        
        if (basePage.endsWith(TEMPLATE_PAGE)) {
            console.log(`✅ Разрешено редактирование (заканчивается на): ${page}`);
            return false;
        }
        
        if (basePage.includes(TEMPLATE_PAGE)) {
            console.log(`✅ Разрешено редактирование (содержит): ${page}`);
            return false;
        }
        
        if (page.startsWith(TEMPLATE_PAGE)) {
            console.log(`✅ Разрешено редактирование (начинается с): ${page}`);
            return false;
        }
        
        console.log(`❌ Заблокировано редактирование: ${page} (basePage: ${basePage})`);
        return true;
        
    } catch (error) {
        console.error('Ошибка в isLockedPage:', error);
        return true;
    }
}

function getBasePageName(page) {
    if (!page) return '';
    if (page.includes('?')) {
        return page.split('?')[0];
    }
    return page;
}

function getNextId(items) {
    if (!items || items.length === 0) return 1;
    const maxId = Math.max(...items.map(item => item.id));
    return maxId + 1;
}

async function getNextServiceId() {
    const response = await fetch(`${API_BASE_URL}/services`);
    const services = await response.json();
    return getNextId(services);
}

async function getNextServiceDetailId() {
    const response = await fetch(`${API_BASE_URL}/serviceDetails`);
    const details = await response.json();
    return getNextId(details);
}

async function getNextDoctorId() {
    const response = await fetch(`${API_BASE_URL}/doctors`);
    const doctors = await response.json();
    return getNextId(doctors);
}

async function getNextAppointmentId() {
    try {
        const response = await fetch(`${API_BASE_URL}/appointments`);
        const appointments = await response.json();
        
        if (appointments && appointments.length > 0) {
            const maxId = Math.max(...appointments.map(a => a.id));
            return maxId + 1;
        }
        return 1;
    } catch (error) {
        console.error('Ошибка получения следующего ID:', error);
        return Date.now();
    }
}

async function getNextDiscountId() {
    const response = await fetch(`${API_BASE_URL}/discounts`);
    const discounts = await response.json();
    return getNextId(discounts);
}

function getNextPriceCategoryId(pricesData) {
    const categories = pricesData?.categories || [];
    return getNextId(categories);
}

function getNextPriceServiceId(pricesData) {
    const services = pricesData?.services || [];
    return getNextId(services);
}

function getNextScheduleId(scheduleData) {
    const schedule = scheduleData?.schedule || [];
    return getNextId(schedule);
}

function getCurrentAdminLang() {
    return localStorage.getItem('dental_language') || 'ru';
}

function getLocalizedText(obj, defaultValue = '') {
    if (!obj) return defaultValue;
    if (typeof obj === 'string') return obj;
    const lang = getCurrentAdminLang();
    return obj[lang] || obj.ru || defaultValue;
}

function localizeObject(item, fields = []) {
    if (!item) return item;
    const localized = { ...item };
    fields.forEach(field => {
        if (item[field]) {
            localized[field] = getLocalizedText(item[field]);
        }
    });
    return localized;
}

function localizeArray(items, fields = []) {
    if (!items || !Array.isArray(items)) return [];
    return items.map(item => localizeObject(item, fields));
}

function formatDateForDisplay(dateStr, lang = null) {
    if (!dateStr) return '';
    const currentLang = lang || getCurrentAdminLang();
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        if (currentLang === 'ru') {
            return `${parts[2]}.${parts[1]}.${parts[0]}`;
        } else {
            return `${parts[1]}/${parts[2]}/${parts[0]}`;
        }
    }
    return dateStr;
}

function getDatePlaceholder(lang = null) {
    const currentLang = lang || getCurrentAdminLang();
    return currentLang === 'ru' ? 'ДД.ММ.ГГГГ' : 'MM/DD/YYYY';
}

function parseDisplayDateToISO(displayDate) {
    if (!displayDate) return '';
    const currentLang = getCurrentAdminLang();
    if (currentLang === 'ru') {
        const parts = displayDate.split('.');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    } else {
        const parts = displayDate.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[0]}-${parts[1]}`;
        }
    }
    return displayDate;
}

function initDiscountDatePickers() {
    const startDateInput = document.getElementById('discountStartDate');
    const endDateInput = document.getElementById('discountEndDate');
    
    if (!startDateInput || !endDateInput) return;
    
    function isoToDisplayDate(isoDate) {
        if (!isoDate) return '';
        const parts = isoDate.split('-');
        if (parts.length !== 3) return isoDate;
        const lang = getCurrentAdminLang();
        if (lang === 'ru') {
            return `${parts[2]}.${parts[1]}.${parts[0]}`;
        } else {
            return `${parts[1]}/${parts[2]}/${parts[0]}`;
        }
    }
    
    function displayToIsoDate(displayDate) {
        if (!displayDate) return '';
        const lang = getCurrentAdminLang();
        let parts;
        if (lang === 'ru') {
            parts = displayDate.split('.');
            if (parts.length === 3) {
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
        } else {
            parts = displayDate.split('/');
            if (parts.length === 3) {
                return `${parts[2]}-${parts[0]}-${parts[1]}`;
            }
        }
        return displayDate;
    }
    
    function convertToNativeDatePicker() {
        const currentStartValue = startDateInput.value;
        const currentEndValue = endDateInput.value;
        
        startDateInput.type = 'date';
        endDateInput.type = 'date';
        
        if (currentStartValue) {
            startDateInput.value = displayToIsoDate(currentStartValue);
        }
        if (currentEndValue) {
            endDateInput.value = displayToIsoDate(currentEndValue);
        }
        
        startDateInput.placeholder = '';
        endDateInput.placeholder = '';
    }
    
    function updateDatePlaceholders() {
        const lang = getCurrentAdminLang();
        const dateFormatHint = lang === 'ru' ? 'ДД.ММ.ГГГГ' : 'MM/DD/YYYY';
        
        if (startDateInput.type !== 'date') {
            startDateInput.placeholder = dateFormatHint;
        }
        if (endDateInput.type !== 'date') {
            endDateInput.placeholder = dateFormatHint;
        }
    }
    
    const testInput = document.createElement('input');
    testInput.type = 'date';
    const isDatePickerSupported = testInput.type === 'date';
    
    if (isDatePickerSupported) {
        convertToNativeDatePicker();
        
        startDateInput.addEventListener('click', function() {
            if (this.showPicker) {
                this.showPicker();
            }
        });
        
        endDateInput.addEventListener('click', function() {
            if (this.showPicker) {
                this.showPicker();
            }
        });
    } else {
        updateDatePlaceholders();
    }
    
    document.addEventListener('languageChanged', function() {
        if (startDateInput.type !== 'date') {
            updateDatePlaceholders();
        }
    });
}

function initDateFilterWithCalendar() {
    const dateFilter = document.getElementById('appointmentDateFilter');
    if (!dateFilter) return;
    
    dateFilter.type = 'date';
    
    function updateDatePlaceholder() {
        const lang = getCurrentAdminLang();
        dateFilter.placeholder = getDatePlaceholder(lang);
    }
    updateDatePlaceholder();
    
    dateFilter.addEventListener('keydown', function(e) {
        e.preventDefault();
        if (this.showPicker) {
            this.showPicker();
        }
    });
    
    dateFilter.addEventListener('click', function() {
        if (this.showPicker) {
            this.showPicker();
        }
    });
    
    dateFilter.removeAttribute('autocomplete');
    
    let currentDateValue = '';
    
    dateFilter.addEventListener('change', function(e) {
        const selectedDate = this.value;
        if (selectedDate) {
            currentDateValue = selectedDate;
            renderAppointments();
        } else {
            currentDateValue = '';
            renderAppointments();
        }
    });
    
    window.setAppointmentDateFilter = function(dateStr) {
        if (!dateStr) {
            dateFilter.value = '';
            currentDateValue = '';
            renderAppointments();
            return;
        }
        dateFilter.value = dateStr;
        currentDateValue = dateStr;
        renderAppointments();
    };
    
    window.getAppointmentDateFilterValue = function() {
        return dateFilter.value || '';
    };
    
    console.log('✅ Фильтр по дате с календарём инициализирован');
}

const adminTranslations = {
    ru: {
        'prices_title': 'Управление прайс-листом',
        'status_active': 'Активна',
        'status_inactive': 'Скрыта',
        'status_active_doctor': 'Активен',
        'status_inactive_doctor': 'Скрыт',
        'status_published': 'Опубликован',
        'status_hidden': 'На модерации',
        'status_pending': '⏳ Ожидает',
        'status_confirmed': '✅ Подтверждена',
        'status_completed': '✔️ Завершена',
        'status_cancelled': '❌ Отменена',
        'status_expired': 'Просрочена',
        'status_not_active': 'Неактивна',
        'status_day_off': 'Выходной',
        'status_filled': 'Заполнена',
        'status_not_filled': 'Не заполнена',
        'profile_last_name_placeholder': 'Иванов',
        'profile_first_name_placeholder': 'Иван',
        'profile_middle_name_placeholder': 'Иванович',
        'profile_email_placeholder': 'ivanov@example.com',
        'profile_phone_placeholder': '+375 29 123-45-67',
        'profile_address_placeholder': 'г. Минск, ул. Примерная, д. 1',
        'profile_birth_date_placeholder': 'Выберите дату рождения',
        'th_main_text': 'Основной текст',
        'th_count': 'Кол-во записей',
        'th_percent': '%',
        'th_category': 'Категория',
        'tab_services': 'Услуги',
        'tab_service_details': 'Детали услуг',
        'tab_doctors': 'Врачи',
        'tab_appointments': 'Запись на прием',
        'tab_reviews': 'Отзывы',
        'tab_prices': 'Прайс-лист',
        'tab_schedule': 'Расписание',
        'tab_analytics': 'Аналитика',
        'tab_discounts': 'Скидки',
        'back_to_site': '← На сайт',
        'services_title': 'Управление услугами',
        'add_service': '+ Добавить услугу',
        'service_details_title': 'Детальная информация услуг',
        'doctors_title': 'Управление врачами',
        'add_doctor': '+ Добавить врача',
        'appointments_title': 'Запись на прием',
        'new_appointment': '+ Новая запись',
        'reviews_title': 'Модерация отзывов',
        'export_reviews': '📥 Экспорт отзывов',
        'export_prices': '📥 Экспорт',
        'schedule_title': 'Управление расписанием врачей',
        'configure_schedule': '+ Настроить расписание',
        'export_schedule': '📥 Экспорт',
        'analytics_title': 'Аналитика посещений',
        'export_report': '📥 Экспорт отчета',
        'refresh': '🔄 Обновить',
        'discounts_title': 'Управление скидками',
        'add_discount': '+ Добавить скидку',
        'add_category': '+ Добавить категорию',
        'add_price_service': '+ Добавить услугу',
        'modal_add_category': 'Добавить категорию',
        'modal_edit_category': 'Редактировать категорию',
        'save_btn': 'Сохранить',
        'cancel_btn': 'Отмена',
        'close_btn': 'Закрыть',
        'save_schedule_btn': 'Сохранить расписание',
        'service_name_label': 'Название услуги *',
        'service_url_label': 'URL страницы',
        'service_url_hint': 'Все услуги используют динамическую страницу service-detail.html',
        'service_bg_label': 'Фоновое изображение',
        'service_title_label': 'Заголовок на странице',
        'service_active_label': 'Активна (показывать на сайте)',
        'service_name_placeholder': 'Например: ДИАГНОСТИКА',
        'service_title_placeholder': 'ДИАГНОСТИКА',
        'schedule_placeholder': 'Пн-Пт, 10:00 - 18:00',
        'price_placeholder': '0',
        'note_placeholder': 'Описание услуги',
        'category_name_placeholder': 'Например: Диагностика',
        'working_day_label': 'Рабочий день',
        'work_start_label': 'Начало работы',
        'work_end_label': 'Конец работы',
        'break_start_label': 'Начало перерыва',
        'break_end_label': 'Конец перерыва',
        'modal_add_service_detail': 'Добавить детальную информацию',
        'service_select_label': 'Услуга *',
        'main_text_label': 'Основной текст',
        'main_text_placeholder': 'Введите основной текст...',
        'secondary_text_label': 'Вторичный текст',
        'secondary_text_placeholder': 'Введите дополнительный текст...',
        'features_label': 'Особенности (через запятую)',
        'features_placeholder': 'Особенность 1, Особенность 2...',
        'steps_label': 'Этапы (через запятую)',
        'steps_placeholder': 'Этап 1, Этап 2...',
        'images_label': 'Изображения (URL)',
        'last_name_label': 'Фамилия *',
        'first_name_label': 'Имя *',
        'middle_name_label': 'Отчество',
        'specialization_label': 'Специализация *',
        'photo_label': 'Фото (URL)',
        'education_label': 'Образование',
        'experience_label': 'Опыт работы',
        'improvement_label': 'Повышение квалификации',
        'schedule_label': 'Расписание',
        'doctor_active_label': 'Активен (показывать на сайте)',
        'patient_name_label': 'Пациент *',
        'phone_label': 'Телефон *',
        'email_label': 'Email',
        'doctor_label': 'Врач *',
        'service_label': 'Услуга *',
        'date_label': 'Дата *',
        'time_label': 'Время *',
        'status_label': 'Статус',
        'comment_label': 'Комментарий',
        'select_doctor_option': '-- Выберите врача --',
        'select_service_option': '-- Выберите услугу --',
        'select_time_option': '-- Выберите время --',
        'select_category_option': '-- Выберите категорию --',
        'discount_name_label': 'Название скидки *',
        'discount_type_label': 'Тип скидки *',
        'discount_value_label': 'Размер скидки *',
        'start_date_label': 'Дата начала',
        'end_date_label': 'Дата окончания',
        'description_label': 'Описание',
        'discount_active_label': 'Активна',
        'category_label': 'Категория *',
        'price_label': 'Цена *',
        'currency_label': 'Валюта',
        'note_label': 'Примечание',
        'order_label': 'Порядок сортировки',
        'active_label': 'Активна',
        'category_name_label': 'Название категории *',
        'category_order_label': 'Порядок сортировки',
        'category_order_hint': 'Порядок отображения категорий на сайте',
        'category_active_label': 'Активна (показывать на сайте)',
        'view_review_title': 'Просмотр отзыва',
        'author_label': 'Автор:',
        'about_label': 'О себе:',
        'rating_label': 'Рейтинг:',
        'review_text_label': 'Текст отзыва:',
        'filter_all_doctors': 'Все врачи',
        'filter_all_statuses': 'Все статусы',
        'filter_all_categories': 'Все категории',
        'filter_all_services': 'Все услуги',
        'filter_all_discounts': 'Все скидки',
        'filter_published': 'Опубликованы',
        'filter_hidden': 'Скрыты',
        'filter_active': 'Активные',
        'filter_expired': 'Просроченные',
        'filter_upcoming': 'Предстоящие',
        'btn_reset': 'Сбросить',
        'period_label': 'Период:',
        'period_week': 'Последние 7 дней',
        'period_month': 'Последние 30 дней',
        'period_quarter': 'Последние 90 дней',
        'period_year': 'Последний год',
        'period_all': 'За все время',
        'from_label': 'С:',
        'to_label': 'По:',
        'apply_btn': 'Применить',
        'conversion_title': '📈 Конверсия записей',
        'confirmation_label': 'Подтверждение',
        'completion_label': 'Завершение',
        'cancellation_label': 'Отмена',
        'chart_dynamics': '📈 Динамика записей',
        'chart_doctors': '👨‍⚕️ Востребованность врачей',
        'chart_services': '🦷 Популярные услуги',
        'chart_peak_hours': '⏰ Часы пик',
        'chart_weekdays': '📅 Загрузка по дням недели',
        'chart_statuses': '📊 Статусы записей',
        'peak_hour_label': 'Часы пик:',
        'busiest_day_label': 'Самый загруженный день:',
        'monday': 'Понедельник',
        'tuesday': 'Вторник',
        'wednesday': 'Среда',
        'thursday': 'Четверг',
        'friday': 'Пятница',
        'saturday': 'Суббота',
        'sunday': 'Воскресенье',
        'search_by_name_text': 'Поиск по имени или тексту...',
        'search_by_service': 'Поиск по услуге...',
        'search_by_name': 'Поиск по названию...',
        'discount_label': 'Скидка',
        'until_label': 'до',
        'active_discount_on_category': 'Активная скидка на категорию',
        'valid_until': 'действует до',
        'action_edit': 'Редактировать',
        'action_delete': '🗑️ Удалить',
        'action_edit_small': '✏️',
        'action_delete_small': '🗑️',
        'action_hide': '🙈 Скрыть',
        'action_publish': '✅ Опубликовать',
        'action_confirm': '✅',
        'action_complete': '✔️',
        'action_deactivate': '🔴 Деакт.',
        'action_activate': '🟢 Акт.',
        'th_id': 'ID',
        'th_name': 'Название',
        'th_url': 'URL страницы',
        'th_status': 'Статус',
        'th_actions': 'Действия',
        'th_photo': 'Фото',
        'th_fullname': 'ФИО',
        'th_specialization': 'Специализация',
        'th_patient': 'Пациент',
        'th_phone': 'Телефон',
        'th_doctor': 'Врач',
        'th_service': 'Услуга',
        'th_date': 'Дата',
        'th_time': 'Время',
        'th_author': 'Автор',
        'th_review_text': 'Текст отзыва',
        'th_rating': 'Рейтинг',
        'th_price': 'Цена',
        'th_currency': 'Валюта',
        'th_note': 'Примечание',
        'th_discount_name': 'Название скидки',
        'th_discount_type': 'Тип',
        'th_discount_value': 'Размер',
        'th_period': 'Период действия',
        'th_break': 'Перерыв',
        'discount_percentage': 'Процентная (%)',
        'discount_fixed': 'Фиксированная',
        'price_free': 'Бесплатно',
        'price_with_discount': 'со скидкой',
        'detail_filled': 'Заполнена',
        'detail_empty': 'Пустая',
        'modal_add_service': 'Добавить услугу',
        'modal_edit_service': 'Редактировать услугу',
        'modal_add_doctor': 'Добавить врача',
        'modal_edit_doctor': 'Редактировать врача',
        'modal_new_appointment': 'Новая запись',
        'modal_edit_appointment': 'Редактировать запись',
        'modal_add_discount': 'Добавить скидку',
        'modal_edit_discount': 'Редактировать скидку',
        'stat_total_services': 'Всего услуг',
        'stat_active_services': 'Активных',
        'stat_total_doctors': 'Всего врачей',
        'stat_total_appointments': 'Всего записей',
        'stat_today_appointments': 'На сегодня',
        'stat_week_appointments': 'На неделю',
        'stat_total_reviews': 'Всего отзывов',
        'stat_published_reviews': 'Опубликовано',
        'stat_hidden_reviews': 'Скрыто',
        'stat_categories': 'Категорий',
        'stat_services_count': 'Услуг',
        'stat_active_discounts': 'Активных скидок',
        'stat_expired_discounts': 'Просроченных',
        'stat_upcoming_discounts': 'Предстоящие',
        'error_negative_discount': '❌ Размер скидки не может быть отрицательным!',
        'error_discount_exists': '⚠️ Для этой категории уже есть скидка! Удалите или деактивируйте существующую скидку перед созданием новой.',
        'unknown': 'Неизвестно',
                'main_image_label': '📷 Основное фото услуги',
        'main_image_small': 'Основное фото услуги',
        'features_image_label': '📷 Фото для секции "Особенности"',
        'features_image_small': 'Изображение будет отображаться справа от списка особенностей',
        'steps_image_label': '📷 Фото для секции "Этапы"',
        'steps_image_small': 'Изображение будет отображаться справа от списка этапов',
                'locked_page': '🔒 защищённая страница',
        'dynamic_page': '📄 динамическая страница',
        'dynamic_template': '📄 динамический шаблон',
                'locked_page_title': 'Эта страница защищена от редактирования',
        'locked_delete_title': 'Защищённые страницы нельзя удалить',
                'new_service_page_hint': 'НОВЫЙ (динамическая страница)',
                        'select_discount_type': '-- Выберите тип скидки --',
                'date_placeholder': 'дд.мм.гггг',
        'date_placeholder_hint': 'Формат: дд.мм.гггг'
    },
    en: {
        'prices_title': 'Price List Management',
        'status_active': 'Active',
        'status_inactive': 'Hidden',
        'status_active_doctor': 'Active',
        'status_inactive_doctor': 'Hidden',
        'status_published': 'Published',
        'status_hidden': 'Moderation',
        'status_pending': '⏳ Pending',
        'status_confirmed': '✅ Confirmed',
        'status_completed': '✔️ Completed',
        'status_cancelled': '❌ Cancelled',
        'status_expired': 'Expired',
        'status_not_active': 'Inactive',
        'status_day_off': 'Day off',
        'status_filled': 'Filled',
        'status_not_filled': 'Not filled',
        'profile_last_name_placeholder': 'Ivanov',
        'profile_first_name_placeholder': 'Ivan',
        'profile_middle_name_placeholder': 'Ivanovich',
        'profile_email_placeholder': 'ivanov@example.com',
        'profile_phone_placeholder': '+375 29 123-45-67',
        'profile_address_placeholder': 'Minsk, Prilukskaya str., 1',
        'profile_birth_date_placeholder': 'Select birth date',
        'th_main_text': 'Main Text',
        'th_count': 'Count',
        'th_percent': '%',
        'th_category': 'Category',
        'tab_services': 'Services',
        'tab_service_details': 'Service Details',
        'tab_doctors': 'Doctors',
        'tab_appointments': 'Appointments',
        'tab_reviews': 'Reviews',
        'tab_prices': 'Price List',
        'tab_schedule': 'Schedule',
        'tab_analytics': 'Analytics',
        'tab_discounts': 'Discounts',
        'back_to_site': '← Back to site',
        'services_title': 'Manage Services',
        'add_service': '+ Add Service',
        'service_details_title': 'Service Details Information',
        'doctors_title': 'Manage Doctors',
        'add_doctor': '+ Add Doctor',
        'appointments_title': 'Appointments',
        'new_appointment': '+ New Appointment',
        'reviews_title': 'Review Moderation',
        'export_reviews': '📥 Export Reviews',
        'export_prices': '📥 Export',
        'schedule_title': 'Manage Doctor Schedule',
        'configure_schedule': '+ Configure Schedule',
        'export_schedule': '📥 Export',
        'analytics_title': 'Visit Analytics',
        'export_report': '📥 Export Report',
        'refresh': '🔄 Refresh',
        'discounts_title': 'Manage Discounts',
        'add_discount': '+ Add Discount',
        'add_category': '+ Add Category',
        'add_price_service': '+ Add Service',
        'modal_add_category': 'Add Category',
        'modal_edit_category': 'Edit Category',
        'save_btn': 'Save',
        'cancel_btn': 'Cancel',
        'close_btn': 'Close',
        'save_schedule_btn': 'Save Schedule',
        'service_name_label': 'Service Name *',
        'service_url_label': 'Page URL',
        'service_url_hint': 'All services use the dynamic page service-detail.html',
        'service_bg_label': 'Background Image',
        'service_title_label': 'Page Title',
        'service_active_label': 'Active (show on site)',
        'service_name_placeholder': 'Example: DIAGNOSTICS',
        'service_title_placeholder': 'DIAGNOSTICS',
        'schedule_placeholder': 'Mon-Fri, 10:00 - 18:00',
        'price_placeholder': '0',
        'note_placeholder': 'Service description',
        'category_name_placeholder': 'Example: Diagnostics',
        'working_day_label': 'Working day',
        'work_start_label': 'Start time',
        'work_end_label': 'End time',
        'break_start_label': 'Break start',
        'break_end_label': 'Break end',
        'modal_add_service_detail': 'Add Service Details',
        'service_select_label': 'Service *',
        'main_text_label': 'Main Text',
        'main_text_placeholder': 'Enter main text...',
        'secondary_text_label': 'Secondary Text',
        'secondary_text_placeholder': 'Enter additional text...',
        'features_label': 'Features (comma separated)',
        'features_placeholder': 'Feature 1, Feature 2...',
        'steps_label': 'Steps (comma separated)',
        'steps_placeholder': 'Step 1, Step 2...',
        'images_label': 'Images (URL)',
        'last_name_label': 'Last Name *',
        'first_name_label': 'First Name *',
        'middle_name_label': 'Middle Name',
        'specialization_label': 'Specialization *',
        'photo_label': 'Photo (URL)',
        'education_label': 'Education',
        'experience_label': 'Work Experience',
        'improvement_label': 'Advanced Training',
        'schedule_label': 'Schedule',
        'doctor_active_label': 'Active (show on site)',
        'patient_name_label': 'Patient *',
        'phone_label': 'Phone *',
        'email_label': 'Email',
        'doctor_label': 'Doctor *',
        'service_label': 'Service *',
        'date_label': 'Date *',
        'time_label': 'Time *',
        'status_label': 'Status',
        'comment_label': 'Comment',
        'select_doctor_option': '-- Select doctor --',
        'select_service_option': '-- Select service --',
        'select_time_option': '-- Select time --',
        'select_category_option': '-- Select category --',
        'discount_name_label': 'Discount Name *',
        'discount_type_label': 'Discount Type *',
        'discount_value_label': 'Discount Amount *',
        'start_date_label': 'Start Date',
        'end_date_label': 'End Date',
        'description_label': 'Description',
        'discount_active_label': 'Active',
        'category_label': 'Category *',
        'price_label': 'Price *',
        'currency_label': 'Currency',
        'note_label': 'Note',
        'order_label': 'Sort Order',
        'active_label': 'Active',
        'category_name_label': 'Category Name *',
        'category_order_label': 'Sort Order',
        'category_order_hint': 'The smaller the number, the higher in the list',
        'category_active_label': 'Active (show on site)',
        'view_review_title': 'View Review',
        'author_label': 'Author:',
        'about_label': 'About:',
        'rating_label': 'Rating:',
        'review_text_label': 'Review Text:',
        'filter_all_doctors': 'All doctors',
        'filter_all_statuses': 'All statuses',
        'filter_all_categories': 'All categories',
        'filter_all_services': 'All services',
        'filter_all_discounts': 'All discounts',
        'filter_published': 'Published',
        'filter_hidden': 'Hidden',
        'filter_active': 'Active',
        'filter_expired': 'Expired',
        'filter_upcoming': 'Upcoming',
        'btn_reset': 'Reset',
        'period_label': 'Period:',
        'period_week': 'Last 7 days',
        'period_month': 'Last 30 days',
        'period_quarter': 'Last 90 days',
        'period_year': 'Last year',
        'period_all': 'All time',
        'from_label': 'From:',
        'to_label': 'To:',
        'apply_btn': 'Apply',
        'conversion_title': '📈 Appointment Conversion',
        'confirmation_label': 'Confirmation',
        'completion_label': 'Completion',
        'cancellation_label': 'Cancellation',
        'chart_dynamics': '📈 Appointment Dynamics',
        'chart_doctors': '👨‍⚕️ Doctor Demand',
        'chart_services': '🦷 Popular Services',
        'chart_peak_hours': '⏰ Peak Hours',
        'chart_weekdays': '📅 Weekday Load',
        'chart_statuses': '📊 Appointment Statuses',
        'peak_hour_label': 'Peak hour:',
        'busiest_day_label': 'Busiest day:',
        'monday': 'Monday',
        'tuesday': 'Tuesday',
        'wednesday': 'Wednesday',
        'thursday': 'Thursday',
        'friday': 'Friday',
        'saturday': 'Saturday',
        'sunday': 'Sunday',
        'search_by_name_text': 'Search by name or text...',
        'search_by_service': 'Search by service...',
        'search_by_name': 'Search by name...',
        'discount_label': 'Discount',
        'until_label': 'until',
        'active_discount_on_category': 'Active discount on category',
        'valid_until': 'valid until',
        'action_edit': 'Edit',
        'action_delete': '🗑️ Delete',
        'action_edit_small': '✏️',
        'action_delete_small': '🗑️',
        'action_hide': '🙈 Hide',
        'action_publish': '✅ Publish',
        'action_confirm': '✅',
        'action_complete': '✔️',
        'action_deactivate': '🔴 Deact.',
        'action_activate': '🟢 Act.',
        'th_id': 'ID',
        'th_name': 'Name',
        'th_url': 'Page URL',
        'th_status': 'Status',
        'th_actions': 'Actions',
        'th_photo': 'Photo',
        'th_fullname': 'Full Name',
        'th_specialization': 'Specialization',
        'th_patient': 'Patient',
        'th_phone': 'Phone',
        'th_doctor': 'Doctor',
        'th_service': 'Service',
        'th_date': 'Date',
        'th_time': 'Time',
        'th_author': 'Author',
        'th_review_text': 'Review Text',
        'th_rating': 'Rating',
        'th_price': 'Price',
        'th_currency': 'Currency',
        'th_note': 'Note',
        'th_discount_name': 'Discount Name',
        'th_discount_type': 'Type',
        'th_discount_value': 'Amount',
        'th_period': 'Period',
        'th_break': 'Break',
        'discount_percentage': 'Percentage (%)',
        'discount_fixed': 'Fixed',
        'price_free': 'Free',
        'price_with_discount': 'with discount',
        'detail_filled': 'Filled',
        'detail_empty': 'Empty',
        'modal_add_service': 'Add Service',
        'modal_edit_service': 'Edit Service',
        'modal_add_doctor': 'Add Doctor',
        'modal_edit_doctor': 'Edit Doctor',
        'modal_new_appointment': 'New Appointment',
        'modal_edit_appointment': 'Edit Appointment',
        'modal_add_discount': 'Add Discount',
        'modal_edit_discount': 'Edit Discount',
        'stat_total_services': 'Total Services',
        'stat_active_services': 'Active',
        'stat_total_doctors': 'Total Doctors',
        'stat_total_appointments': 'Total Appointments',
        'stat_today_appointments': 'Today',
        'stat_week_appointments': 'This Week',
        'stat_total_reviews': 'Total Reviews',
        'stat_published_reviews': 'Published',
        'stat_hidden_reviews': 'Hidden',
        'stat_categories': 'Categories',
        'stat_services_count': 'Services',
        'stat_active_discounts': 'Active Discounts',
        'stat_expired_discounts': 'Expired',
        'stat_upcoming_discounts': 'Upcoming',
        'error_negative_discount': '❌ Discount amount cannot be negative!',
        'error_discount_exists': '⚠️ There is already a discount for this category! Please delete or deactivate the existing discount before creating a new one.',
        'unknown': 'Unknown',
                'main_image_label': '📷 Main service photo',
        'main_image_small': 'Main service photo',
        'features_image_label': '📷 Photo for "Features" section',
        'features_image_small': 'The image will be displayed to the right of the features list',
        'steps_image_label': '📷 Photo for "Steps" section',
        'steps_image_small': 'The image will be displayed to the right of the steps list',
                'locked_page': '🔒 protected page',
        'dynamic_page': '📄 dynamic page',
        'dynamic_template': '📄 dynamic template',
                'locked_page_title': 'This page is protected from editing',
        'locked_delete_title': 'Protected pages cannot be deleted',
                'new_service_page_hint': 'NEW (dynamic page)',
                        'select_discount_type': '-- Select discount type --',
                'date_placeholder': 'mm/dd/yyyy',
        'date_placeholder_hint': 'Format: mm/dd/yyyy',
    }
};

function getUIText(key, defaultValue = '') {
    const lang = getCurrentAdminLang();
    return adminTranslations[lang]?.[key] || adminTranslations['ru'][key] || defaultValue;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.textContent === message) {
                toast.textContent = '';
            }
        }, 300);
    }, 3000);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function getDoctorFullName(doctor) {
    const lang = getCurrentAdminLang();
    let lastName, firstName, middleName;
    
    if (lang === 'en') {
        lastName = doctor.lastName?.en || doctor.lastName?.ru || doctor.lastName || '';
        firstName = doctor.firstName?.en || doctor.firstName?.ru || doctor.firstName || '';
        middleName = doctor.middleName?.en || doctor.middleName?.ru || doctor.middleName || '';
    } else {
        lastName = doctor.lastName?.ru || doctor.lastName || '';
        firstName = doctor.firstName?.ru || doctor.firstName || '';
        middleName = doctor.middleName?.ru || doctor.middleName || '';
    }
    
    let name = lastName + ' ' + firstName;
    if (middleName) name += ' ' + middleName;
    return name.trim() || getUIText('unknown');
}

function getServiceNameById(serviceId, services) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return getUIText('unknown');
    const lang = getCurrentAdminLang();
    if (typeof service.name === 'object') {
        return service.name[lang] || service.name.ru || getUIText('unknown');
    }
    return service.name;
}

function getLocalizedPatientName(appointment) {
    const lang = getCurrentAdminLang();
    if (!appointment.patientName) return '';
    if (typeof appointment.patientName === 'object') {
        return appointment.patientName[lang] || appointment.patientName.ru || '';
    }
    return appointment.patientName;
}

function getCurrencyHtml(unit) {
    if (unit === 'BYN') {
        return '<span class="currency-icon"></span>';
    }
    return escapeHtml(unit);
}

function populateServiceSelectForDetail() {
    const serviceSelect = document.getElementById('detailServiceId');
    if (!serviceSelect) {
        console.error('❌ Элемент detailServiceId не найден!');
        return;
    }
    
    const currentValue = serviceSelect.value;
    serviceSelect.innerHTML = `<option value="">${getUIText('select_service_option')}</option>`;
    
    if (!services || services.length === 0) {
        console.warn('⚠️ Нет услуг для заполнения списка!');
        return;
    }
    
    const sortedServices = [...services].sort((a, b) => (a.order || a.id) - (b.order || b.id));
    
    sortedServices.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        const serviceName = typeof service.name === 'object' ? (service.name.ru || service.name.en) : service.name;
        option.textContent = serviceName;
        serviceSelect.appendChild(option);
    });
    
    if (currentValue && serviceSelect.querySelector(`option[value="${currentValue}"]`)) {
        serviceSelect.value = currentValue;
    }
    
    console.log('📋 Список услуг для модального окна заполнен, опций:', serviceSelect.options.length);
}

let services = [];
let serviceDetails = [];
let doctors = [];
let appointments = [];
let reviews = [];
let pricesData = null;
let scheduleData = null;
let discounts = [];

// ========== ФУНКЦИИ ДЛЯ ПРОВЕРКИ СКИДОК ==========

function hasAnyDiscountForCategory(categoryId, excludeDiscountId = null) {
    if (!discounts || discounts.length === 0) return false;
    
    return discounts.some(discount => {
        if (discount.discountCategoryId !== categoryId) return false;
        if (excludeDiscountId && discount.id === excludeDiscountId) return false;
        return true;
    });
}

function hasActiveDiscountForCategory(categoryId, excludeDiscountId = null) {
    if (!discounts || discounts.length === 0) return false;
    
    const today = new Date().toISOString().split('T')[0];
    
    return discounts.some(discount => {
        if (discount.discountCategoryId !== categoryId) return false;
        if (excludeDiscountId && discount.id === excludeDiscountId) return false;
        if (!discount.active) return false;
        if (discount.endDate && discount.endDate < today) return false;
        return true;
    });
}

function validateDiscountForCategory(categoryId, excludeDiscountId = null) {
    if (hasAnyDiscountForCategory(categoryId, excludeDiscountId)) {
        return {
            valid: false,
            message: getUIText('error_discount_exists')
        };
    }
    return { valid: true, message: '' };
}

function validateDiscountValue(value, type) {
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
        return { valid: false, message: 'Введите корректное число' };
    }
    
    if (numValue < 0) {
        return { valid: false, message: getUIText('error_negative_discount') };
    }
    
    if (type === 'percentage' && numValue > 100) {
        return { valid: false, message: 'Процентная скидка не может превышать 100%' };
    }
    
    return { valid: true, message: '' };
}

function saveActiveTab(tabId) {
    if (tabId) {
        localStorage.setItem('admin_active_tab', tabId);
        console.log('💾 Сохранена вкладка:', tabId);
    }
}

function loadActiveTab() {
    const savedTab = localStorage.getItem('admin_active_tab');
    if (savedTab && document.querySelector(`.nav-tab[data-tab="${savedTab}"]`)) {
        console.log('📂 Загружена сохраненная вкладка:', savedTab);
        return savedTab;
    }
    return 'services';
}

function activateTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const tabButton = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
    if (tabButton) {
        tabButton.classList.add('active');
    }
    
    const tabContent = document.getElementById(`tab-${tabId}`);
    if (tabContent) {
        tabContent.classList.add('active');
    }
    
    console.log('✅ Активирована вкладка:', tabId);
}

async function renderAppointments() {
    const tbody = document.getElementById('appointmentsList');
    if (!tbody) return;
    
    const doctorFilter = document.getElementById('appointmentDoctorFilter')?.value || '';
    let dateFilter = document.getElementById('appointmentDateFilter')?.value || '';
    const statusFilter = document.getElementById('appointmentStatusFilter')?.value || '';
    
    let filtered = [...appointments];
    
    if (dateFilter) {
        filtered = filtered.filter(a => a.date === dateFilter);
    }
    
    if (doctorFilter) {
        filtered = filtered.filter(a => a.doctorId == doctorFilter);
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
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<td><td colspan="9" style="text-align: center; padding: 40px;">📅 ' + (getCurrentAdminLang() === 'ru' ? 'Нет записей для отображения' : 'No appointments to display') + '</td></tr>';
        return;
    }
    
    const lang = getCurrentAdminLang();
    
    for (const app of filtered) {
        const doctor = doctors.find(d => d.id === app.doctorId);
        let doctorName = getUIText('unknown');
        
        if (doctor) {
            if (lang === 'en') {
                const lastName = doctor.lastName?.en || doctor.lastName?.ru || doctor.lastName || '';
                const firstName = doctor.firstName?.en || doctor.firstName?.ru || doctor.firstName || '';
                doctorName = `${lastName} ${firstName}`.trim();
                if (!doctorName) doctorName = getUIText('unknown');
            } else {
                doctorName = getDoctorFullName(doctor);
            }
        }
        
        const service = services.find(s => s.id === app.serviceId);
        let serviceName = getUIText('unknown');
        if (service) {
            if (typeof service.name === 'object') {
                serviceName = service.name[lang] || service.name.ru || service.name.en || getUIText('unknown');
            } else {
                serviceName = service.name;
            }
        }
        
        const statusMap = {
            pending: getUIText('status_pending'),
            confirmed: getUIText('status_confirmed'),
            completed: getUIText('status_completed'),
            cancelled: getUIText('status_cancelled')
        };
        const statusText = statusMap[app.status] || app.status;
        
        let displayDate = formatDateForDisplay(app.date);
        
        let patientName = app.patientName;
        if (typeof patientName === 'object') {
            patientName = patientName[lang] || patientName.ru || patientName.en || JSON.stringify(patientName);
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.id}</td>
            <td><strong>${escapeHtml(patientName)}</strong></td>
            <td>${escapeHtml(app.phone)}</span>
            <td>${escapeHtml(doctorName)}</span>
            <td>${escapeHtml(serviceName)}</span>
            <td>${displayDate}</span>
            <td>${app.time}</span>
            <td><span class="status-badge status-${app.status}">${statusText}</span></span>
            <td class="action-buttons">
                <button class="btn-edit-appointment" data-id="${app.id}" title="Редактировать">✏️</button>
                <button class="btn-delete-appointment" data-id="${app.id}" title="Удалить">🗑️</button>
                ${app.status === 'pending' ? `<button class="btn-confirm-appointment" data-id="${app.id}" title="Подтвердить">✅</button>` : ''}
                ${app.status === 'confirmed' ? `<button class="btn-complete-appointment" data-id="${app.id}" title="Завершить">✔️</button>` : ''}
             </span>
        `;
        tbody.appendChild(row);
    }
    
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

function resetAppointmentFilters() {
    const doctorFilter = document.getElementById('appointmentDoctorFilter');
    const dateFilter = document.getElementById('appointmentDateFilter');
    const statusFilter = document.getElementById('appointmentStatusFilter');
    
    if (doctorFilter) doctorFilter.value = '';
    if (dateFilter) dateFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    
    renderAppointments();
}

async function renderServices() {
    const tbody = document.getElementById('servicesList');
    if (!tbody) return;
    
    const activeCount = services.filter(s => s.active).length;
    const servicesCount = document.getElementById('servicesCount');
    const activeServicesCount = document.getElementById('activeServicesCount');
    if (servicesCount) servicesCount.textContent = services.length;
    if (activeServicesCount) activeServicesCount.textContent = activeCount;
    
    tbody.innerHTML = '';
    
    const sortedServices = [...services].sort((a, b) => (a.order || a.id) - (b.order || b.id));
    
    for (const service of sortedServices) {
        const statusText = service.active ? getUIText('status_active') : getUIText('status_inactive');
        const statusClass = service.active ? 'status-active' : 'status-inactive';
        const serviceName = typeof service.name === 'object' ? (service.name.ru || service.name.en) : service.name;
        
        const basePage = getBasePageName(service.page);
        const isLocked = isLockedPage(basePage);
        const lockIcon = isLocked ? ' 🔒' : '';
        const editDisabled = isLocked ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : '';
        
        let pageDisplay = service.page;
        if (isLocked) {
            pageDisplay = '🔒 ' + basePage + ` (${getUIText('locked_page')})`;
        } else if (service.page.includes('service-detail.html')) {
            pageDisplay = '📄 ' + service.page + ` (${getUIText('dynamic_page')})`;
        } else if (service.page.includes('service-template.html')) {
            pageDisplay = '📄 ' + service.page + ` (${getUIText('dynamic_template')})`;
        }
        
        const row = document.createElement('tr');
        if (!service.active) {
            row.style.opacity = '0.6';
            row.style.backgroundColor = '#f5f5f5';
        }
        
        row.innerHTML = `
            <td>${service.id}</td>
            <td><strong>${escapeHtml(serviceName)}${lockIcon}</strong></td>
            <td><code style="font-size: 12px;">${escapeHtml(pageDisplay)}</code></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-service" data-id="${service.id}" ${editDisabled} title="${isLocked ? getUIText('locked_page_title', 'Эта страница защищена от редактирования') : getUIText('action_edit')}">
                    ✏️ ${getUIText('action_edit')}
                </button>
                <button class="btn-delete-service" data-id="${service.id}" ${editDisabled} title="${isLocked ? getUIText('locked_delete_title', 'Защищённые страницы нельзя удалить') : getUIText('action_delete')}">
                    🗑️ ${getUIText('action_delete')}
                </button>
                ${!isLocked ? `
                    <button class="btn-toggle-service" data-id="${service.id}" title="${service.active ? 'Скрыть' : 'Показать'}">
                        ${service.active ? '🙈 Скрыть' : '👁️ Показать'}
                    </button>
                ` : ''}
             </span>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.btn-edit-service').forEach(btn => {
        if (!btn.disabled) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', () => editService(parseInt(newBtn.dataset.id)));
        }
    });
    
    document.querySelectorAll('.btn-delete-service').forEach(btn => {
        if (!btn.disabled) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', () => deleteService(parseInt(newBtn.dataset.id)));
        }
    });
    
    document.querySelectorAll('.btn-toggle-service').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => toggleServiceVisibility(parseInt(newBtn.dataset.id)));
    });
}

async function toggleServiceVisibility(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;
    
    const basePage = getBasePageName(service.page);
    if (isLockedPage(basePage)) {
        showToast('❌ Нельзя скрыть защищённую страницу!', 'error');
        return;
    }
    
    service.active = !service.active;
    
    try {
        await fetch(`${API_BASE_URL}/services/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(service)
        });
        
        await loadAllData();
        await renderServices();
        showToast(`Услуга ${service.active ? 'показана' : 'скрыта'}`, 'success');
    } catch (error) {
        console.error('Ошибка:', error);
        showToast('Ошибка при изменении статуса', 'error');
    }
}

function editService(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;
    
    const basePage = getBasePageName(service.page);
    
    if (isLockedPage(basePage)) {
        showToast('❌ Эта страница защищена от редактирования!', 'error');
        return;
    }
    
    openServiceModal(true, service);
}

async function deleteService(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;
    
    const basePage = getBasePageName(service.page);
    
    if (isLockedPage(basePage)) {
        showToast('❌ Защищённые страницы нельзя удалить!', 'error');
        return;
    }
    
    const serviceName = typeof service.name === 'object' ? (service.name.ru || service.name.en) : service.name;
    
    if (confirm(`Удалить услугу "${serviceName}"?`)) {
        try {
            await fetch(`${API_BASE_URL}/services/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderServices();
            await updateServiceDetailsFilter();
            await updateAppointmentFilters();
            showToast(`Услуга "${serviceName}" удалена`);
        } catch (error) {
            showToast('Ошибка удаления', 'error');
        }
    }
}

async function saveService(event) {
    event.preventDefault();
    
    const id = parseInt(document.getElementById('serviceId').value);
    let name = document.getElementById('serviceName').value.trim();
    const bgImage = document.getElementById('serviceBgImage').value.trim();
    let title = document.getElementById('serviceTitle').value.trim();
    const active = document.getElementById('serviceActive').checked;
    
    if (!name) {
        showToast('Заполните название услуги', 'error');
        return;
    }
    
    if (id) {
        const existingService = services.find(s => s.id === id);
        if (existingService) {
            const basePage = getBasePageName(existingService.page);
            if (isLockedPage(basePage)) {
                showToast('❌ Нельзя редактировать защищённую страницу!', 'error');
                return;
            }
        }
    }
    
    const newId = id || await getNextServiceId();
const page = `service-template.html?service=${newId}`;
    
    const currentLang = getCurrentAdminLang();
    const existingService = services.find(s => s.id === id);
    
    let nameObj, titleObj;
    if (existingService && typeof existingService.name === 'object') {
        nameObj = { ...existingService.name, [currentLang]: name };
        titleObj = { ...existingService.title, [currentLang]: title || name };
    } else {
        nameObj = { ru: name, en: name };
        titleObj = { ru: title || name, en: title || name };
    }
    
    const serviceData = { 
        id: newId, 
        name: nameObj, 
        page, 
        bgImage, 
        title: titleObj, 
        active, 
        order: id || services.length + 1 
    };
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/services/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceData)
            });
            showToast(`Услуга "${name}" обновлена`);
        } else {
            const response = await fetch(`${API_BASE_URL}/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceData)
            });
            const savedService = await response.json();
            
            await fetch(`${API_BASE_URL}/serviceDetails`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: await getNextServiceDetailId(),
                    serviceId: savedService.id,
                    mainText: { ru: '', en: '' },
                    secondaryText: { ru: '', en: '' },
                    features: { ru: '', en: '' },
                    steps: { ru: '', en: '' },
                    images: ''
                })
            });
            
            showToast(`Услуга "${name}" добавлена`);
        }
        
        await loadAllData();
        await renderServices();
        await updateServiceDetailsFilter();
        await updateAppointmentFilters();
        
        document.getElementById('serviceModal').style.display = 'none';
        document.getElementById('serviceForm').reset();
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        showToast('Ошибка сохранения', 'error');
    }
}

function openServiceModal(editMode = false, serviceData = null) {
    const modalTitle = document.getElementById('serviceModalTitle');
    if (modalTitle) {
        modalTitle.textContent = editMode ? getUIText('modal_edit_service') : getUIText('modal_add_service');
    }
    
    const pageField = document.getElementById('servicePage');
    
    if (serviceData) {
        document.getElementById('serviceId').value = serviceData.id;
        document.getElementById('serviceName').value = typeof serviceData.name === 'object' ? (serviceData.name.ru || serviceData.name.en) : serviceData.name;
        
        pageField.value = `service-detail.html?service=${serviceData.id} (${getUIText('dynamic_page')})`;
        pageField.disabled = true;
        pageField.style.backgroundColor = '#f5f5f5';
        
        document.getElementById('serviceBgImage').value = serviceData.bgImage || '';
        document.getElementById('serviceTitle').value = typeof serviceData.title === 'object' ? (serviceData.title.ru || serviceData.title.en) : (serviceData.title || '');
        document.getElementById('serviceActive').checked = serviceData.active;
        
        document.getElementById('serviceName').disabled = false;
        document.getElementById('serviceBgImage').disabled = false;
        document.getElementById('serviceTitle').disabled = false;
        document.getElementById('serviceActive').disabled = false;
    } else {
        document.getElementById('serviceForm').reset();
        document.getElementById('serviceId').value = '';
        document.getElementById('serviceActive').checked = true;
        
        const newPageHint = getUIText('new_service_page_hint');
        pageField.value = `service-detail.html?service=${newPageHint}`;
        pageField.disabled = true;
        pageField.style.backgroundColor = '#e8f5e9';
        
        document.getElementById('serviceName').disabled = false;
        document.getElementById('serviceBgImage').disabled = false;
        document.getElementById('serviceTitle').disabled = false;
        document.getElementById('serviceActive').disabled = false;
    }
    
    document.getElementById('serviceModal').style.display = 'flex';
}


async function renderServiceDetails() {
    const tbody = document.getElementById('serviceDetailsList');
    const filterValue = document.getElementById('detailServiceFilter')?.value || '';
    if (!tbody) return;
    
    const filterSelect = document.getElementById('detailServiceFilter');
    if (filterSelect && filterSelect.options.length <= 1 && services.length > 0) {
        console.log('🔄 Принудительное заполнение фильтра деталей услуг');
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            const serviceName = typeof service.name === 'object' ? (service.name.ru || service.name.en) : service.name;
            option.textContent = serviceName;
            filterSelect.appendChild(option);
        });
    }
    
    let filteredServices = [...services];
    
    if (filterValue && filterValue !== '') {
        filteredServices = filteredServices.filter(s => s.id == filterValue);
    }
    
    tbody.innerHTML = '';
    
    const lang = getCurrentAdminLang();
    const filledText = getUIText('status_filled');
    const notFilledText = getUIText('status_not_filled');
    
    for (const service of filteredServices) {
        const detail = serviceDetails.find(d => d.serviceId === service.id);
        const basePage = getBasePageName(service.page);
        const isLocked = isLockedPage(basePage);
        
        const serviceName = typeof service.name === 'object' ? (service.name[lang] || service.name.ru || service.name.en || service.name) : service.name;
        const hasContent = detail && (detail.mainText || detail.features || detail.steps);
        const statusText = hasContent ? filledText : notFilledText;
        const statusClass = hasContent ? 'status-active' : 'status-inactive';
        
        let mainTextPreview = '—';
        if (detail && detail.mainText) {
            const mainText = typeof detail.mainText === 'object' ? (detail.mainText[lang] || detail.mainText.ru || detail.mainText.en) : detail.mainText;
            mainTextPreview = mainText ? mainText.substring(0, 50) + (mainText.length > 50 ? '...' : '') : '—';
        }
        
        const lockIcon = isLocked ? ' 🔒' : '';
        const editDisabled = isLocked ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : '';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.id}${lockIcon}</td>
            <td><strong>${escapeHtml(serviceName)}</strong></td>
            <td>${escapeHtml(mainTextPreview)}</span>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-detail" data-service-id="${service.id}" ${editDisabled} title="${isLocked ? 'Эта страница защищена от редактирования' : 'Редактировать'}">✏️ ${getUIText('action_edit')}</button>
                ${hasContent ? '<span style="margin-left: 10px; font-size: 12px; color: #10B981;">✅</span>' : '<span style="margin-left: 10px; font-size: 12px; color: #F59E0B;">⚠️</span>'}
             </span>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.btn-edit-detail').forEach(btn => {
        if (!btn.disabled) {
            btn.removeEventListener('click', handleEditDetail);
            btn.addEventListener('click', handleEditDetail);
        }
    });
}

function handleEditDetail(e) {
    const serviceId = parseInt(e.currentTarget.dataset.serviceId);
    const service = services.find(s => s.id === serviceId);
    if (service && isLockedPage(getBasePageName(service.page))) {
        showToast('❌ Эта страница защищена от редактирования!', 'error');
        return;
    }
    editServiceDetailByServiceId(serviceId);
}

async function editServiceDetailByServiceId(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) {
        showToast('Услуга не найдена', 'error');
        return;
    }
    
    if (isLockedPage(getBasePageName(service.page))) {
        showToast('❌ Эта страница защищена от редактирования!', 'error');
        return;
    }
    
    let detail = serviceDetails.find(d => d.serviceId === serviceId);
    
    if (!detail) {
        const newId = await getNextServiceDetailId();
        const newDetail = {
            id: newId,
            serviceId: serviceId,
            mainText: '',
            secondaryText: '',
            features: '',
            steps: '',
            images: ''
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/serviceDetails`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDetail)
            });
            
            if (response.ok) {
                await loadAllData();
                detail = serviceDetails.find(d => d.serviceId === serviceId);
                showToast(`Создана новая запись для "${getLocalizedText(service.name)}"`, 'success');
            }
        } catch (error) {
            console.error('Ошибка создания:', error);
            showToast('Ошибка создания детальной информации', 'error');
            return;
        }
    }
    
    openDetailModal(true, detail);
}

async function updateServiceDetailsFilter() {
    const filter = document.getElementById('detailServiceFilter');
    if (!filter) return;
    
    const currentValue = filter.value;
    filter.innerHTML = `<option value="">${getUIText('filter_all_services')}</option>`;
    
    if (!services || services.length === 0) {
        console.warn('⚠️ Нет услуг для заполнения фильтра!');
        return;
    }
    
    const sortedServices = [...services].sort((a, b) => (a.order || a.id) - (b.order || b.id));
    
    sortedServices.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        const serviceName = typeof service.name === 'object' ? (service.name.ru || service.name.en) : service.name;
        option.textContent = serviceName;
        filter.appendChild(option);
    });
    
    if (currentValue && filter.querySelector(`option[value="${currentValue}"]`)) {
        filter.value = currentValue;
    }
    
    console.log('📋 Фильтр деталей услуг обновлён, найдено услуг:', sortedServices.length);
}

function openDetailModal(editMode = false, detailData = null) {
    const modalTitle = document.getElementById('detailModalTitle');
    const serviceSelect = document.getElementById('detailServiceId');
    
    if (modalTitle) {
        modalTitle.textContent = editMode ? getUIText('edit_detail_info') : getUIText('modal_add_service_detail');
    }
    
    if (editMode && detailData) {
        serviceSelect.setAttribute('data-current-service-id', detailData.serviceId);
        
        const selectedService = services.find(s => s.id === detailData.serviceId);
        
        if (selectedService) {
            const serviceName = typeof selectedService.name === 'object' 
                ? (selectedService.name.ru || selectedService.name.en || 'Услуга') 
                : selectedService.name;
            
            serviceSelect.innerHTML = '';
            const option = document.createElement('option');
            option.value = selectedService.id;
            option.textContent = serviceName;
            option.selected = true;
            serviceSelect.appendChild(option);
            
            serviceSelect.disabled = true;
            serviceSelect.style.backgroundColor = '#f5f5f5';
            serviceSelect.style.opacity = '0.8';
            serviceSelect.style.cursor = 'not-allowed';
        } else {
            serviceSelect.innerHTML = '<option value="">Услуга не найдена</option>';
            serviceSelect.disabled = true;
        }
        
        document.getElementById('detailId').value = detailData.id || '';
        document.getElementById('detailMainText').value = typeof detailData.mainText === 'object' ? (detailData.mainText.ru || detailData.mainText.en || '') : (detailData.mainText || '');
        document.getElementById('detailSecondaryText').value = typeof detailData.secondaryText === 'object' ? (detailData.secondaryText.ru || detailData.secondaryText.en || '') : (detailData.secondaryText || '');
        document.getElementById('detailFeatures').value = typeof detailData.features === 'object' ? (detailData.features.ru || detailData.features.en || '') : (detailData.features || '');
        document.getElementById('detailSteps').value = typeof detailData.steps === 'object' ? (detailData.steps.ru || detailData.steps.en || '') : (detailData.steps || '');
        document.getElementById('detailImages').value = detailData.images || '';
        document.getElementById('detailImages2').value = detailData.images2 || '';
        document.getElementById('detailImages3').value = detailData.images3 || '';
        
    } else {
        document.getElementById('detailForm').reset();
        document.getElementById('detailId').value = '';
        
        serviceSelect.disabled = false;
        serviceSelect.style.backgroundColor = '';
        serviceSelect.style.opacity = '';
        serviceSelect.style.cursor = '';
        serviceSelect.removeAttribute('data-current-service-id');
        
        populateServiceSelectForDetail();
    }
    
    const modal = document.getElementById('detailModal');
    if (modal) modal.style.display = 'flex';
}

async function saveServiceDetail(event) {
    event.preventDefault();
    
    const id = parseInt(document.getElementById('detailId').value);
    const serviceSelect = document.getElementById('detailServiceId');
    
    let serviceId = parseInt(serviceSelect.value);
    
    if (serviceSelect.disabled && serviceSelect.getAttribute('data-current-service-id')) {
        serviceId = parseInt(serviceSelect.getAttribute('data-current-service-id'));
    }
    
    let mainText = document.getElementById('detailMainText').value;
    let secondaryText = document.getElementById('detailSecondaryText').value;
    let features = document.getElementById('detailFeatures').value;
    let steps = document.getElementById('detailSteps').value;
    let images = document.getElementById('detailImages').value;
    let images2 = document.getElementById('detailImages2').value;
    let images3 = document.getElementById('detailImages3').value;
    
    if (!serviceId) {
        showToast('Выберите услугу', 'error');
        return;
    }
    
    const currentLang = getCurrentAdminLang();
    const existingDetail = serviceDetails.find(d => d.id === id);
    
    let mainTextObj, secondaryTextObj, featuresObj, stepsObj;
    
    if (existingDetail && typeof existingDetail.mainText === 'object') {
        mainTextObj = { ...existingDetail.mainText, [currentLang]: mainText };
        secondaryTextObj = { ...existingDetail.secondaryText, [currentLang]: secondaryText };
        featuresObj = { ...existingDetail.features, [currentLang]: features };
        stepsObj = { ...existingDetail.steps, [currentLang]: steps };
    } else {
        mainTextObj = { ru: mainText, en: mainText };
        secondaryTextObj = { ru: secondaryText, en: secondaryText };
        featuresObj = { ru: features, en: features };
        stepsObj = { ru: steps, en: steps };
    }
    
    const detailData = {
        id: id,
        serviceId: serviceId,
        mainText: mainTextObj,
        secondaryText: secondaryTextObj,
        features: featuresObj,
        steps: stepsObj,
        images: images,
        images2: images2,
        images3: images3
    };
    
    try {
        let response;
        if (id) {
            response = await fetch(`${API_BASE_URL}/serviceDetails/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(detailData)
            });
            showToast('Детальная информация обновлена', 'success');
        } else {
            const newId = await getNextServiceDetailId();
            detailData.id = newId;
            response = await fetch(`${API_BASE_URL}/serviceDetails`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(detailData)
            });
            showToast('Детальная информация добавлена', 'success');
        }
        
        if (!response.ok) throw new Error('Ошибка сохранения');
        
        await loadAllData();
        await renderServiceDetails();
        await updateServiceDetailsFilter();
        
        localStorage.setItem('dental_data_updated', Date.now().toString());
        document.dispatchEvent(new CustomEvent('adminDataSaved'));
        
        document.getElementById('detailModal').style.display = 'none';
        document.getElementById('detailForm').reset();
        
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        showToast('Ошибка сохранения', 'error');
    }
}

async function renderDoctors() {
    const tbody = document.getElementById('doctorsList');
    if (!tbody) return;
    
    const doctorsCount = document.getElementById('doctorsCount');
    if (doctorsCount) doctorsCount.textContent = doctors.length;
    
    tbody.innerHTML = '';
    doctors.forEach(doctor => {
        const fullName = getDoctorFullName(doctor);
        const statusText = doctor.active ? getUIText('status_active_doctor') : getUIText('status_inactive_doctor');
        const statusClass = doctor.active ? 'status-active' : 'status-inactive';
        
        let photoHtml = '—';
        if (doctor.photo && doctor.photo.trim() !== '') {
            photoHtml = `<img src="${doctor.photo}" class="doctor-photo-cell" alt="Фото" onerror="this.onerror=null; this.src='../assets/images/team/photo.jpg';">`;
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${photoHtml}</td>
            <td><strong>${escapeHtml(fullName)}</strong></td>
            <td>${escapeHtml(doctor.specialization)}</span>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-doctor" data-id="${doctor.id}">✏️ ${getUIText('action_edit')}</button>
                <button class="btn-delete-doctor" data-id="${doctor.id}">🗑️ ${getUIText('action_delete')}</button>
             </span>
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

async function cleanOrphanedDoctorsFromSchedule() {
    console.log('🧹 Начинаем чистку расписания от удалённых врачей...');
    
    const [scheduleRes, doctorsRes] = await Promise.all([
        fetch('http://localhost:3000/schedule'),
        fetch('http://localhost:3000/doctors')
    ]);
    
    let scheduleData = await scheduleRes.json();
    const doctors = await doctorsRes.json();
    
    if (!scheduleData) {
        console.log('Расписание не найдено');
        return;
    }
    
    const existingDoctorIds = doctors.map(d => d.id);
    
    let changed = false;
    
    const beforeDoctorsCount = scheduleData.doctors?.length || 0;
    if (scheduleData.doctors) {
        scheduleData.doctors = scheduleData.doctors.filter(d => existingDoctorIds.includes(d.id));
        if (beforeDoctorsCount !== scheduleData.doctors.length) {
            changed = true;
            console.log(`🗑️ Удалено ${beforeDoctorsCount - scheduleData.doctors.length} врачей из schedule.doctors`);
        }
    }
    
    const beforeScheduleCount = scheduleData.schedule?.length || 0;
    if (scheduleData.schedule) {
        scheduleData.schedule = scheduleData.schedule.filter(s => existingDoctorIds.includes(s.doctorId));
        if (beforeScheduleCount !== scheduleData.schedule.length) {
            changed = true;
            console.log(`🗑️ Удалено ${beforeScheduleCount - scheduleData.schedule.length} записей расписания`);
        }
    }
    
    if (changed) {
        const saveResponse = await fetch('http://localhost:3000/schedule', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scheduleData)
        });
        
        if (saveResponse.ok) {
            console.log('✅ Чистка расписания завершена!');
            alert('Расписание очищено от удалённых врачей. Страница будет обновлена.');
            location.reload();
        } else {
            console.error('❌ Ошибка сохранения');
        }
    } else {
        console.log('✅ В расписании нет удалённых врачей');
    }
}

cleanOrphanedDoctorsFromSchedule();

async function saveDoctor(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('doctorId').value);
    let lastName = document.getElementById('doctorLastName').value.trim();
    let firstName = document.getElementById('doctorFirstName').value.trim();
    let middleName = document.getElementById('doctorMiddleName').value.trim();
    let specialization = document.getElementById('doctorSpecialization').value.trim();
    let photo = document.getElementById('doctorPhoto').value.trim();
    let education = document.getElementById('doctorEducation').value;
    let experience = document.getElementById('doctorExperience').value.trim();
    let improvement = document.getElementById('doctorImprovement').value;
    let active = document.getElementById('doctorActive').checked;
    
    if (!lastName || !firstName || !specialization) {
        showToast('Заполните обязательные поля (Фамилия, Имя, Специализация)', 'error');
        return;
    }
    
    let newId = id;
    if (!newId) {
        newId = await getNextDoctorId();
    }
    
    if (!photo || photo === '') {
        photo = `../assets/images/team/photo.jpg`;
    }
    
    const doctorData = {
        id: id || newId,
        lastName: { ru: lastName, en: lastName },
        firstName: { ru: firstName, en: firstName },
        middleName: { ru: middleName || '', en: middleName || '' },
        specialization: { ru: specialization, en: specialization },
        photo: photo,
        education: { ru: education || '', en: education || '' },
        experience: { ru: experience || '', en: experience || '' },
        improvement: { ru: improvement || '', en: improvement || '' },
        active: active
    };
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/doctors/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData)
            });
            showToast(`Врач ${lastName} ${firstName} обновлён`);
        } else {
            await fetch(`${API_BASE_URL}/doctors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData)
            });
            showToast(`Врач ${lastName} ${firstName} добавлен`);
        }
        
        try {
            const scheduleRes = await fetch(`${API_BASE_URL}/schedule`);
            let scheduleData = await scheduleRes.json();
            
            if (!scheduleData) {
                scheduleData = { version: '2.0', doctors: [], schedule: [] };
            }
            if (!scheduleData.doctors) scheduleData.doctors = [];
            if (!scheduleData.schedule) scheduleData.schedule = [];
            
            const fullName = `${lastName} ${firstName} ${middleName || ''}`.trim();
            const doctorId = id || newId;
            
            const existingDoctorIndex = scheduleData.doctors.findIndex(d => d.id === doctorId);
            
            const doctorForSchedule = {
                id: doctorId,
                name: { ru: fullName, en: fullName },
                specialization: { ru: specialization, en: specialization },
                photo: photo
            };
            
            if (existingDoctorIndex !== -1) {
                scheduleData.doctors[existingDoctorIndex] = doctorForSchedule;
            } else {
                scheduleData.doctors.push(doctorForSchedule);
            }
            
            const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            const dayNamesRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
            const dayNamesEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const currentLang = getCurrentAdminLang();
            
            const existingSchedules = scheduleData.schedule.filter(s => s.doctorId === doctorId);
            
            for (let i = 0; i < days.length; i++) {
                const day = days[i];
                const existing = existingSchedules.find(s => s.day === day);
                
                if (!existing) {
                    const isWorking = (i < 5); 
                    const newScheduleId = getNextScheduleId(scheduleData);
                    
                    scheduleData.schedule.push({
                        id: newScheduleId,
                        doctorId: doctorId,
                        day: day,
                        dayName: { ru: dayNamesRu[i], en: dayNamesEn[i] },
                        timeStart: isWorking ? '09:00' : '',
                        timeEnd: isWorking ? '18:00' : '',
                        breakStart: isWorking ? '13:00' : '',
                        breakEnd: isWorking ? '14:00' : '',
                        isWorking: isWorking
                    });
                    console.log(`📅 Создано расписание для ${fullName}, день: ${dayNamesRu[i]}, рабочий: ${isWorking}`);
                }
            }
            
            const saveScheduleResponse = await fetch(`${API_BASE_URL}/schedule`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scheduleData)
            });
            
            if (!saveScheduleResponse.ok) {
                throw new Error('Ошибка сохранения расписания');
            }
            
            console.log('✅ Расписание успешно обновлено');
            
        } catch (scheduleError) {
            console.error('❌ Ошибка синхронизации с расписанием:', scheduleError);
        }
        
        await loadAllData();
        
        await renderDoctors();
        await updateAppointmentFilters();
        await renderAppointments();
        await renderAdminSchedule(); 
        await updateCategoryFilters();
        
        document.getElementById('doctorModal').style.display = 'none';
        document.getElementById('doctorForm').reset();
        
        showToast(`Врач "${lastName} ${firstName}" успешно сохранён`, 'success');
        
    } catch (error) {
        console.error('❌ Ошибка сохранения врача:', error);
        showToast('Ошибка сохранения. Проверьте консоль.', 'error');
    }
}

function openDoctorModal(editMode = false, doctorData = null) {
    const modalTitle = document.getElementById('doctorModalTitle');
    if (modalTitle) {
        modalTitle.textContent = editMode ? getUIText('modal_edit_doctor') : getUIText('modal_add_doctor');
    }
    
    if (doctorData) {
        document.getElementById('doctorId').value = doctorData.id;
        
        let lastName = doctorData.lastName;
        let firstName = doctorData.firstName;
        let middleName = doctorData.middleName || '';
        let specialization = doctorData.specialization;
        let education = doctorData.education || '';
        let experience = doctorData.experience || '';
        let improvement = doctorData.improvement || '';
        
        if (typeof lastName === 'object') lastName = lastName.ru || lastName.en || '';
        if (typeof firstName === 'object') firstName = firstName.ru || firstName.en || '';
        if (typeof middleName === 'object') middleName = middleName.ru || middleName.en || '';
        if (typeof specialization === 'object') specialization = specialization.ru || specialization.en || '';
        if (typeof education === 'object') education = education.ru || education.en || '';
        if (typeof experience === 'object') experience = experience.ru || experience.en || '';
        if (typeof improvement === 'object') improvement = improvement.ru || improvement.en || '';
        
        document.getElementById('doctorLastName').value = lastName;
        document.getElementById('doctorFirstName').value = firstName;
        document.getElementById('doctorMiddleName').value = middleName;
        document.getElementById('doctorSpecialization').value = specialization;
        document.getElementById('doctorPhoto').value = doctorData.photo || '';
        document.getElementById('doctorEducation').value = education;
        document.getElementById('doctorExperience').value = experience;
        document.getElementById('doctorImprovement').value = improvement;
        document.getElementById('doctorActive').checked = doctorData.active !== false;
        
    } else {
        document.getElementById('doctorForm').reset();
        document.getElementById('doctorId').value = '';
        document.getElementById('doctorActive').checked = true;
        document.getElementById('doctorPhoto').value = '';
        document.getElementById('doctorEducation').value = '';
        document.getElementById('doctorExperience').value = '';
        document.getElementById('doctorImprovement').value = '';
    }
    
    const modal = document.getElementById('doctorModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function editDoctor(id) {
    const doctor = doctors.find(d => d.id === id);
    if (doctor) {
        openDoctorModal(true, doctor);
    }
}


function updateAvailableTimeSlotsForAdmin() {
    const dateInput = document.getElementById('appointmentDate');
    const timeSelect = document.getElementById('appointmentTime');
    
    if (!dateInput || !timeSelect) return;
    
    const selectedDate = dateInput.value;
    if (!selectedDate) return;
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const isToday = selectedDate === todayStr;
    
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    
    const timeOptions = timeSelect.querySelectorAll('option');
    
    let anyAvailable = false;
    
    timeOptions.forEach(option => {
        const timeValue = option.value;
        if (timeValue && timeValue !== '') {
            if (isToday) {
                const [hours, minutes] = timeValue.split(':').map(Number);
                const isTimePassed = (hours < currentHour) || (hours === currentHour && minutes <= currentMinute);
                
                if (isTimePassed) {
                    option.disabled = true;
                    option.style.color = '#9CA3AF';
                    option.style.backgroundColor = '#f5f5f5';
                    option.textContent = `${timeValue} (время прошло)`;
                } else {
                    option.disabled = false;
                    option.style.color = '';
                    option.style.backgroundColor = '';
                    option.textContent = timeValue;
                    anyAvailable = true;
                }
            } else {
                option.disabled = false;
                option.style.color = '';
                option.style.backgroundColor = '';
                if (option.textContent.includes('(время прошло)')) {
                    option.textContent = timeValue;
                }
            }
        }
    });
    
    if (isToday && !anyAvailable) {
        const firstOption = timeSelect.options[0];
        if (firstOption && firstOption.value === '') {
            firstOption.textContent = '-- Нет доступного времени (все часы прошли) --';
        }
    } else {
        const firstOption = timeSelect.options[0];
        if (firstOption && firstOption.value === '' && firstOption.textContent.includes('Нет доступного времени')) {
            firstOption.textContent = '-- Выберите время --';
        }
    }
}

function initDateRestrictions() {
    const dateInput = document.getElementById('appointmentDate');
    if (!dateInput) return;
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    dateInput.min = todayStr;
    
    dateInput.addEventListener('keydown', function(e) {
        e.preventDefault();
        if (this.showPicker) {
            this.showPicker();
        }
    });
    
    dateInput.addEventListener('click', function() {
        if (this.showPicker) {
            this.showPicker();
        }
    });
    
    dateInput.addEventListener('change', function() {
        const selectedDate = this.value;
        
        if (selectedDate && selectedDate < todayStr) {
            showToast('❌ Нельзя выбрать дату в прошлом!', 'error');
            this.value = '';
            const timeSelect = document.getElementById('appointmentTime');
            if (timeSelect) {
                const options = timeSelect.querySelectorAll('option');
                options.forEach(opt => {
                    if (opt.value && opt.value !== '') {
                        opt.disabled = false;
                        opt.style.color = '';
                        opt.style.backgroundColor = '';
                        if (opt.textContent.includes('(время прошло)')) {
                            opt.textContent = opt.value;
                        }
                    }
                });
            }
        } else {
            updateAvailableTimeSlotsForAdmin();
        }
    });
}

function validateAppointmentDateTime(date, time) {
    if (!date || !time) return true;
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    if (date < todayStr) {
        showToast('❌ Нельзя записать на прошедшую дату!', 'error');
        return false;
    }
    
    if (date === todayStr) {
        const [hours, minutes] = time.split(':').map(Number);
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();
        
        if (hours < currentHour || (hours === currentHour && minutes < currentMinute)) {
            showToast('❌ Нельзя записать на время, которое уже прошло!', 'error');
            return false;
        }
    }
    
    return true;
}

async function updateAppointmentFilters() {
    console.log('🔄 updateAppointmentFilters вызвана, врачей:', doctors.length);
    
    const doctorFilter = document.getElementById('appointmentDoctorFilter');
    if (doctorFilter) {
        doctorFilter.innerHTML = `<option value="">${getUIText('filter_all_doctors')}</option>`;
        
        if (doctors && doctors.length > 0) {
            const activeDoctors = doctors.filter(d => d.active !== false);
            activeDoctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = getDoctorFullName(doctor);
                doctorFilter.appendChild(option);
            });
        }
    }
    
    const statusFilter = document.getElementById('appointmentStatusFilter');
    if (statusFilter) {
        statusFilter.innerHTML = `
            <option value="">${getUIText('filter_all_statuses')}</option>
            <option value="pending">${getUIText('status_pending')}</option>
            <option value="confirmed">${getUIText('status_confirmed')}</option>
            <option value="completed">${getUIText('status_completed')}</option>
            <option value="cancelled">${getUIText('status_cancelled')}</option>
        `;
    }
    
    const serviceSelect = document.getElementById('appointmentServiceId');
    if (serviceSelect) {
        serviceSelect.innerHTML = '<option value="">-- Выберите услугу --</option>';
        if (services && services.length > 0) {
            services.filter(s => s.active !== false).forEach(service => {
                const option = document.createElement('option');
                option.value = service.id;
                const serviceName = typeof service.name === 'object' ? (service.name.ru || service.name.en) : service.name;
                option.textContent = serviceName;
                serviceSelect.appendChild(option);
            });
        }
    }
    
    const doctorSelect = document.getElementById('appointmentDoctorId');
    if (doctorSelect) {
        doctorSelect.innerHTML = '<option value="">-- Выберите врача --</option>';
        if (doctors && doctors.length > 0) {
            doctors.filter(d => d.active !== false).forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = getDoctorFullName(doctor);
                doctorSelect.appendChild(option);
            });
        }
    }
    
    const dateFilter = document.getElementById('appointmentDateFilter');
    if (dateFilter) {
        dateFilter.placeholder = getDatePlaceholder();
    }
}

async function deleteAppointment(id) {
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) return;
    const patientName = typeof appointment.patientName === 'object' ? appointment.patientName.ru : appointment.patientName;
    if (confirm(`Удалить запись пациента "${patientName}"?`)) {
        try {
            await fetch(`${API_BASE_URL}/appointments/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderAppointments();
            showToast('Запись удалена');
        } catch (error) {
            showToast('Ошибка удаления', 'error');
        }
    }
}

async function updateAppointmentStatus(id, newStatus) {
    try {
        const appointment = appointments.find(a => a.id === id);
        if (appointment) {
            await fetch(`${API_BASE_URL}/appointments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...appointment, status: newStatus })
            });
            await loadAllData();
            await renderAppointments();
            const statusText = { confirmed: 'подтверждена', completed: 'завершена' };
            showToast(`Запись ${statusText[newStatus] || 'обновлена'}`);
        }
    } catch (error) {
        showToast('Ошибка обновления статуса', 'error');
    }
}

async function saveAppointment(event) {
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
    
    if (!validateAppointmentDateTime(date, time)) {
        return;
    }
    
    const currentTab = document.querySelector('.nav-tab.active')?.dataset.tab || 'appointments';
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/appointments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, patientName, phone, email, doctorId, serviceId, date, time, comment, status, createdAt: new Date().toISOString() })
            });
            showToast(`Запись для ${patientName} обновлена`);
        } else {
            const newId = await getNextAppointmentId();
            await fetch(`${API_BASE_URL}/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: newId, patientName, phone, email, doctorId, serviceId, date, time, comment, status, createdAt: new Date().toISOString() })
            });
            showToast(`Запись для ${patientName} добавлена`);
        }
        
        await loadAllData();
        await renderAppointments();
        
        activateTab(currentTab);
        
        document.getElementById('appointmentModal').style.display = 'none';
        document.getElementById('appointmentForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
        activateTab(currentTab);
    }
}

function openAppointmentModal(editMode = false, appointmentData = null) {
    const lang = getCurrentAdminLang();
    document.getElementById('appointmentModalTitle').textContent = editMode ? getUIText('modal_edit_appointment') : getUIText('modal_new_appointment');
    
    const serviceSelect = document.getElementById('appointmentServiceId');
    if (serviceSelect) {
        serviceSelect.innerHTML = `<option value="">${getUIText('select_service_option')}</option>`;
        if (services && services.length > 0) {
            services.filter(s => s.active !== false).forEach(service => {
                const option = document.createElement('option');
                option.value = service.id;
                const serviceName = typeof service.name === 'object' ? (service.name[lang] || service.name.ru || service.name.en) : service.name;
                option.textContent = serviceName;
                serviceSelect.appendChild(option);
            });
        }
    }
    
    const doctorSelect = document.getElementById('appointmentDoctorId');
    if (doctorSelect) {
        doctorSelect.innerHTML = `<option value="">${getUIText('select_doctor_option')}</option>`;
        if (doctors && doctors.length > 0) {
            doctors.filter(d => d.active !== false).forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = getDoctorFullName(doctor);
                doctorSelect.appendChild(option);
            });
        }
    }
    
    const timeSelect = document.getElementById('appointmentTime');
    if (timeSelect && timeSelect.options.length > 0) {
        timeSelect.options[0].textContent = getUIText('select_time_option');
    }
    
    if (appointmentData) {
        document.getElementById('appointmentId').value = appointmentData.id;
        document.getElementById('appointmentPatientName').value = appointmentData.patientName || '';
        document.getElementById('appointmentPhone').value = appointmentData.phone || '';
        document.getElementById('appointmentEmail').value = appointmentData.email || '';
        document.getElementById('appointmentDoctorId').value = appointmentData.doctorId || '';
        document.getElementById('appointmentServiceId').value = appointmentData.serviceId || '';
        document.getElementById('appointmentDate').value = appointmentData.date || '';
        document.getElementById('appointmentTime').value = appointmentData.time || '';
        document.getElementById('appointmentComment').value = appointmentData.comment || '';
        document.getElementById('appointmentStatus').value = appointmentData.status || 'pending';
    } else {
        document.getElementById('appointmentForm').reset();
        document.getElementById('appointmentId').value = '';
        document.getElementById('appointmentStatus').value = 'pending';
    }
    
    const appointmentDateInput = document.getElementById('appointmentDate');
    if (appointmentDateInput) {
        appointmentDateInput.placeholder = getDatePlaceholder();
    }
    
    setTimeout(() => {
        initDateRestrictions();
        if (appointmentData && appointmentData.date) {
            const today = new Date().toISOString().split('T')[0];
            if (appointmentData.date === today) {
                updateAvailableTimeSlotsForAdmin();
            }
        }
    }, 100);
    
    document.getElementById('appointmentModal').style.display = 'flex';
}

function editAppointment(id) {
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
        openAppointmentModal(true, appointment);
    }
}


async function renderAdminReviews() {
    const tbody = document.getElementById('reviewsList');
    if (!tbody) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/reviews`);
        if (!response.ok) throw new Error('Ошибка загрузки отзывов');
        const freshReviews = await response.json();
        reviews = localizeArray(freshReviews, ['author', 'userInfo', 'text']);
    } catch (error) {
        console.error('Ошибка загрузки отзывов:', error);
        reviews = localizeArray(reviews, ['author', 'userInfo', 'text']);
    }
    
    const totalReviews = document.getElementById('totalReviews');
    const publishedReviews = document.getElementById('publishedReviews');
    const hiddenReviews = document.getElementById('hiddenReviews');
    
    if (totalReviews) totalReviews.textContent = reviews.length;
    if (publishedReviews) publishedReviews.textContent = reviews.filter(r => r.published).length;
    if (hiddenReviews) hiddenReviews.textContent = reviews.filter(r => !r.published).length;
    
    const statusFilter = document.getElementById('reviewStatusFilter')?.value || 'all';
    const searchFilter = document.getElementById('reviewSearchFilter')?.value.toLowerCase() || '';
    
    let filtered = [...reviews];
    
    if (statusFilter === 'published') {
        filtered = filtered.filter(r => r.published === true);
    } else if (statusFilter === 'hidden') {
        filtered = filtered.filter(r => r.published === false);
    }
    
    if (searchFilter) {
        filtered = filtered.filter(r => 
            r.author.toLowerCase().includes(searchFilter) || 
            r.text.toLowerCase().includes(searchFilter)
        );
    }
    
    tbody.innerHTML = '';
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">' + (getCurrentAdminLang() === 'ru' ? 'Нет отзывов для отображения' : 'No reviews to display') + '</span></tr>';
        return;
    }
    
    for (const review of filtered) {
        const statusText = review.published ? getUIText('status_published') : getUIText('status_hidden');
        const statusClass = review.published ? 'status-published' : 'status-hidden';
        const authorName = typeof review.author === 'object' ? (review.author.ru || review.author.en) : review.author;
        const reviewText = typeof review.text === 'object' ? (review.text.ru || review.text.en) : review.text;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${review.id}</td>
            <td><strong>${escapeHtml(authorName)}</strong><br><small>${escapeHtml(review.email || '')}</small></td>
            <td><div class="review-text-preview" title="${escapeHtml(reviewText)}">${escapeHtml(reviewText.substring(0, 100))}...</div></td>
            <td><div class="rating-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div></td>
            <td>${review.date || review.createdAt?.split('T')[0] || ''}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-view-review" data-id="${review.id}">👁️</button>
                <button class="btn-toggle-review" data-id="${review.id}">${review.published ? getUIText('action_hide') : getUIText('action_publish')}</button>
                <button class="btn-delete-review" data-id="${review.id}">🗑️</button>
             </span>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.btn-view-review').forEach(btn => {
        btn.addEventListener('click', () => viewReview(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-toggle-review').forEach(btn => {
        btn.addEventListener('click', () => toggleReviewStatus(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-review').forEach(btn => {
        btn.addEventListener('click', () => deleteReview(parseInt(btn.dataset.id)));
    });
}

async function viewReview(id) {
    const review = reviews.find(r => r.id === id);
    if (!review) return;
    
    const authorName = typeof review.author === 'object' ? (review.author.ru || review.author.en) : review.author;
    const userInfo = typeof review.userInfo === 'object' ? (review.userInfo.ru || review.userInfo.en) : review.userInfo;
    const reviewText = typeof review.text === 'object' ? (review.text.ru || review.text.en) : review.text;
    
    document.getElementById('viewAuthor').textContent = authorName;
    document.getElementById('viewUserInfo').textContent = userInfo || '';
    document.getElementById('viewRating').innerHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    document.getElementById('viewText').textContent = reviewText;
    document.getElementById('viewDate').textContent = review.date || review.createdAt?.split('T')[0] || '';
    
    const viewPhoto = document.getElementById('viewPhoto');
    if (review.photo) {
        viewPhoto.innerHTML = `<img src="${review.photo}" alt="Фото отзыва" style="max-width: 100%; max-height: 200px; border-radius: 12px;">`;
    } else {
        viewPhoto.innerHTML = '';
    }
    
    document.getElementById('viewReviewModal').style.display = 'flex';
}

async function toggleReviewStatus(id) {
    try {
        const review = reviews.find(r => r.id === id);
        if (!review) return;
        
        review.published = !review.published;
        
        const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });
        
        if (response.ok) {
            await loadAllData();
            await renderAdminReviews();
            showToast(`Отзыв ${review.published ? 'опубликован' : 'скрыт'}`, 'success');
        }
    } catch (error) {
        showToast('Ошибка при изменении статуса', 'error');
    }
}

async function deleteReview(id) {
    if (confirm('Удалить этот отзыв?')) {
        try {
            await fetch(`${API_BASE_URL}/reviews/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderAdminReviews();
            showToast('Отзыв удален', 'success');
        } catch (error) {
            showToast('Ошибка при удалении', 'error');
        }
    }
}

function initReviewFilters() {
    const statusFilter = document.getElementById('reviewStatusFilter');
    const searchFilter = document.getElementById('reviewSearchFilter');
    const resetBtn = document.getElementById('resetReviewFilters');
    
    if (searchFilter) searchFilter.placeholder = getUIText('search_by_name_text');
    if (statusFilter) statusFilter.addEventListener('change', () => renderAdminReviews());
    if (searchFilter) searchFilter.addEventListener('input', () => renderAdminReviews());
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (statusFilter) statusFilter.value = 'all';
            if (searchFilter) searchFilter.value = '';
            renderAdminReviews();
        });
    }
}


async function renderAdminSchedule() {
    const container = document.getElementById('scheduleAdminContainer');
    if (!container) return;
    
    let doctorsList = [];
    let scheduleList = [];
    let allDoctorsFromAPI = [];
    
    try {
        const doctorsResponse = await fetch(`${API_BASE_URL}/doctors`);
        if (doctorsResponse.ok) {
            allDoctorsFromAPI = await doctorsResponse.json();
            console.log('✅ Загружены врачи из API для статуса');
        }
    } catch (error) {
        console.error('Ошибка загрузки врачей из API:', error);
    }
    
    if (scheduleData) {
        if (scheduleData.doctors && Array.isArray(scheduleData.doctors)) {
            doctorsList = scheduleData.doctors;
        }
        if (scheduleData.schedule && Array.isArray(scheduleData.schedule)) {
            scheduleList = scheduleData.schedule;
        }
    }
    
    if (doctorsList.length === 0 && doctors && doctors.length > 0) {
        doctorsList = doctors;
    }
    
    doctorsList = doctorsList.map(doctor => {
        const doctorFromAPI = allDoctorsFromAPI.find(d => d.id === doctor.id);
        return {
            ...doctor,
            active: doctorFromAPI ? doctorFromAPI.active : true
        };
    });
    
    const totalDoctorsSchedule = document.getElementById('totalDoctorsSchedule');
    if (totalDoctorsSchedule) totalDoctorsSchedule.textContent = doctorsList.length;
    
    if (doctorsList.length === 0) {
        container.innerHTML = '<div class="empty-schedule" style="text-align: center; padding: 40px; color: #6B7280;">Нет данных о врачах</div>';
        return;
    }
    
    const lang = getCurrentAdminLang();
    const dayFullNames = { 
        monday: getUIText('monday'), 
        tuesday: getUIText('tuesday'), 
        wednesday: getUIText('wednesday'), 
        thursday: getUIText('thursday'), 
        friday: getUIText('friday'), 
        saturday: getUIText('saturday'), 
        sunday: getUIText('sunday')
    };
    const dayOrder = { monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7 };
    
    let html = '';
    
    for (const doctor of doctorsList) {
        const doctorSchedule = scheduleList.filter(s => s.doctorId === doctor.id);
        doctorSchedule.sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
        
        let doctorName = getUIText('unknown');
        let doctorSpecialization = '';
        
        if (doctor.name) {
            doctorName = getLocalizedText(doctor.name);
        } else if (doctor.lastName || doctor.firstName) {
            let lastName = getLocalizedText(doctor.lastName);
            let firstName = getLocalizedText(doctor.firstName);
            doctorName = `${lastName} ${firstName}`.trim();
        }
        
        if (doctor.specialization) {
            doctorSpecialization = getLocalizedText(doctor.specialization);
        }
        
        if (!doctorName || doctorName === '') doctorName = getUIText('unknown');
        
        const isDoctorActive = doctor.active !== false;
        const doctorStatusText = isDoctorActive ? getUIText('status_active_doctor') : getUIText('status_inactive_doctor');
        const doctorStatusClass = isDoctorActive ? 'status-active' : 'status-inactive';
        
        const doctorCardOpacity = isDoctorActive ? '1' : '0.6';
        const doctorCardBg = isDoctorActive ? 'white' : '#f5f5f5';
        
        let doctorPhoto = doctor.photo || '../assets/images/team/photo.jpg';
        const invalidValues = ['', '123', '0', 'null', 'undefined', 'false'];
        if (!doctorPhoto || invalidValues.includes(doctorPhoto)) {
            doctorPhoto = '../assets/images/team/photo.jpg';
        }
        
        html += `
            <div class="doctor-schedule-card-admin" data-doctor-id="${doctor.id}" style="background: ${doctorCardBg}; border-radius: 16px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); opacity: ${doctorCardOpacity};">
                <div class="doctor-schedule-header-admin" style="cursor: pointer; background: #2F353B; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <img src="${doctorPhoto}" alt="Фото врача" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" onerror="this.onerror=null; this.src='../assets/images/team/photo.jpg';">
                        <div>
                            <h3 style="color: white; margin: 0;">${escapeHtml(doctorName)}</h3>
                            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                                ${doctorSpecialization ? `<span style="color: #A5C33C; font-size: 14px;">${escapeHtml(doctorSpecialization)}</span>` : ''}
                                <span class="status-badge ${doctorStatusClass}" style="font-size: 11px; padding: 2px 8px;">${doctorStatusText}</span>
                            </div>
                        </div>
                    </div>
                    <span class="doctor-schedule-toggle" style="color: white; font-size: 20px;">▼</span>
                </div>
                <div class="schedule-content" style="display: block; padding: 20px; overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <colgroup>
                            <col style="width: 25%;">
                            <col style="width: 35%;">
                            <col style="width: 25%;">
                            <col style="width: 15%;">
                        </colgroup>
                        <thead>
                            <tr style="background: #F3F4F6;">
                                <th style="padding: 12px 15px; text-align: left;">${getUIText('th_name')}</th>
                                <th style="padding: 12px 15px; text-align: left;">${getUIText('th_time')}</th>
                                <th style="padding: 12px 15px; text-align: left;">${getUIText('th_break')}</th>
                                <th style="padding: 12px 15px; text-align: left; width: 80px;">${getUIText('th_actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        if (doctorSchedule.length === 0) {
            html += `
                <tr>
                    <td colspan="4" style="padding: 30px; text-align: center; color: #6B7280;">
                        ${getUIText('lang') === 'ru' ? 'Расписание не настроено' : 'Schedule not configured'}
                    </td>
                </tr>
            `;
        } else {
            for (const schedule of doctorSchedule) {
                const dayName = dayFullNames[schedule.day] || schedule.day;
                const isWorking = schedule.isWorking;
                
                let workHours = '';
                let breakTime = '—';
                
                if (isWorking) {
                    workHours = `${schedule.timeStart || '—'} - ${schedule.timeEnd || '—'}`;
                    if (schedule.breakStart && schedule.breakEnd) {
                        breakTime = `${schedule.breakStart} - ${schedule.breakEnd}`;
                    }
                } else {
                    workHours = getUIText('status_day_off');
                }
                
                html += `
                    <tr style="border-bottom: 1px solid #E5E7EB;">
                        <td style="padding: 12px 15px;"><strong>${escapeHtml(dayName)}</strong></td>
                        <td style="padding: 12px 15px;">
                            ${isWorking 
                                ? `<span style="color: #10B981; font-weight: 500;">${escapeHtml(workHours)}</span>` 
                                : `<span style="color: #EF4444;">${escapeHtml(workHours)}</span>`
                            }
                        </td>
                        <td style="padding: 12px 15px;">${escapeHtml(breakTime)}</span>
                        <td style="padding: 12px 15px;">
                            <button class="btn-edit-schedule" data-doctor="${doctor.id}" data-day="${schedule.day}" style="background: #E0E7FF; color: #4338CA; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer;" ${!isDoctorActive ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                                ✏️
                            </button>
                        </td>
                    </tr>
                `;
            }
        }
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
    
    document.querySelectorAll('.doctor-schedule-header-admin').forEach(header => {
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        newHeader.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            const card = this.closest('.doctor-schedule-card-admin');
            const content = card.querySelector('.schedule-content');
            const toggle = this.querySelector('.doctor-schedule-toggle');
            if (content && toggle) {
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    toggle.style.transform = 'rotate(0deg)';
                } else {
                    content.style.display = 'none';
                    toggle.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
    
    document.querySelectorAll('.btn-edit-schedule').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const doctorId = parseInt(newBtn.dataset.doctor);
            const doctor = doctorsList.find(d => d.id === doctorId);
            if (doctor && doctor.active === false) {
                showToast('❌ Нельзя редактировать расписание скрытого врача', 'error');
                return;
            }
            openScheduleModal(doctorId, newBtn.dataset.day);
        });
    });
}

function openScheduleModal(doctorId, day) {
    const doctor = scheduleData?.doctors?.find(d => d.id === doctorId);
    if (!doctor) return;
    
    const originalSchedule = scheduleData?.schedule?.find(s => s.doctorId === doctorId && s.day === day);
    const originalData = originalSchedule ? { ...originalSchedule } : null;
    
    document.getElementById('scheduleDoctorId').value = doctorId;
    
    const doctorSelect = document.getElementById('scheduleDoctorSelect');
    doctorSelect.innerHTML = '<option value="">-- Выберите врача --</option>';
    scheduleData?.doctors?.forEach(d => {
        const option = document.createElement('option');
        option.value = d.id;
        let doctorName = d.name;
        if (typeof doctorName === 'object') {
            const lang = getCurrentAdminLang();
            doctorName = doctorName[lang] || doctorName.ru || '';
        }
        let specialization = d.specialization;
        if (typeof specialization === 'object') {
            const lang = getCurrentAdminLang();
            specialization = specialization[lang] || specialization.ru || '';
        }
        option.textContent = `${doctorName} (${specialization})`;
        doctorSelect.appendChild(option);
    });
    doctorSelect.value = doctorId;
    
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayIndex = dayNames.indexOf(day);
    
    function generateHourOptions() {
        let options = '<option value="">--</option>';
        for (let hour = 0; hour < 24; hour++) {
            const hourStr = hour.toString().padStart(2, '0');
            options += `<option value="${hourStr}">${hourStr}</option>`;
        }
        return options;
    }
    
    function generateMinuteOptions() {
        let options = '<option value="">--</option>';
        for (let minute = 0; minute < 60; minute += 5) {
            const minuteStr = minute.toString().padStart(2, '0');
            options += `<option value="${minuteStr}">${minuteStr}</option>`;
        }
        return options;
    }
    
    const hourOptions = generateHourOptions();
    const minuteOptions = generateMinuteOptions();
    
    const container = document.querySelector('.schedule-days-container');
    if (!container) return;
    
    const daysLocalized = [
        getUIText('monday'),
        getUIText('tuesday'),
        getUIText('wednesday'),
        getUIText('thursday'),
        getUIText('friday'),
        getUIText('saturday'),
        getUIText('sunday')
    ];
    const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    const existingScheduleForDoctor = scheduleData?.schedule?.filter(s => s.doctorId === doctorId) || [];
    const scheduleMap = new Map();
    existingScheduleForDoctor.forEach(s => {
        scheduleMap.set(s.day, s);
    });
    
    function getScheduleLabel(key) {
        const lang = getCurrentAdminLang();
        const labels = {
            ru: {
                working_day: 'Рабочий день',
                start_time: 'Начало работы',
                end_time: 'Конец работы',
                break_start: 'Начало перерыва',
                break_end: 'Конец перерыва'
            },
            en: {
                working_day: 'Working day',
                start_time: 'Start time',
                end_time: 'End time',
                break_start: 'Break start',
                break_end: 'Break end'
            }
        };
        return labels[lang][key] || labels.ru[key];
    }
    
    container.innerHTML = '';
    
    daysLocalized.forEach((d, idx) => {
        const currentDayKey = dayKeys[idx];
        const existing = scheduleMap.get(currentDayKey);
        
        const isWorking = existing ? existing.isWorking : (idx < 5);
        const timeStart = existing?.timeStart || '09:00';
        const timeEnd = existing?.timeEnd || '18:00';
        const breakStart = existing?.breakStart || '13:00';
        const breakEnd = existing?.breakEnd || '14:00';
        
        container.innerHTML += `
            <div class="schedule-day-card" style="background: #F9FAFB; border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                <h4 style="margin: 0 0 15px 0; color: #2F353B;">${d}</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" class="schedule-working" data-day="${currentDayKey}" ${isWorking ? 'checked' : ''}> 
                            <span>${getScheduleLabel('working_day')}</span>
                        </label>
                    </div>
                </div>
                <div class="form-row work-hours-row" style="display: flex; flex-direction: column; gap: 15px; margin-top: 10px;" data-day="${currentDayKey}">
                    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 180px;">
                            <label>${getScheduleLabel('start_time')}</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <select class="schedule-start-hour" data-day="${currentDayKey}" style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #ccc;" ${!isWorking ? 'disabled' : ''}>
                                    ${hourOptions}
                                </select>
                                <span>:</span>
                                <select class="schedule-start-minute" data-day="${currentDayKey}" style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #ccc;" ${!isWorking ? 'disabled' : ''}>
                                    ${minuteOptions}
                                </select>
                            </div>
                        </div>
                        <div style="flex: 1; min-width: 180px;">
                            <label>${getScheduleLabel('end_time')}</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <select class="schedule-end-hour" data-day="${currentDayKey}" style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #ccc;" ${!isWorking ? 'disabled' : ''}>
                                    ${hourOptions}
                                </select>
                                <span>:</span>
                                <select class="schedule-end-minute" data-day="${currentDayKey}" style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #ccc;" ${!isWorking ? 'disabled' : ''}>
                                    ${minuteOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 180px;">
                            <label>${getScheduleLabel('break_start')}</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <select class="schedule-break-start-hour" data-day="${currentDayKey}" style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #ccc;" ${!isWorking ? 'disabled' : ''}>
                                    ${hourOptions}
                                </select>
                                <span>:</span>
                                <select class="schedule-break-start-minute" data-day="${currentDayKey}" style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #ccc;" ${!isWorking ? 'disabled' : ''}>
                                    ${minuteOptions}
                                </select>
                            </div>
                        </div>
                        <div style="flex: 1; min-width: 180px;">
                            <label>${getScheduleLabel('break_end')}</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <select class="schedule-break-end-hour" data-day="${currentDayKey}" style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #ccc;" ${!isWorking ? 'disabled' : ''}>
                                    ${hourOptions}
                                </select>
                                <span>:</span>
                                <select class="schedule-break-end-minute" data-day="${currentDayKey}" style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #ccc;" ${!isWorking ? 'disabled' : ''}>
                                    ${minuteOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    const dayCards = document.querySelectorAll('.schedule-day-card');
    dayCards.forEach((card, idx) => {
        const currentDayKey = dayKeys[idx];
        const existing = scheduleMap.get(currentDayKey);
        
        const workingCheckbox = card.querySelector('.schedule-working');
        const startHour = card.querySelector('.schedule-start-hour');
        const startMinute = card.querySelector('.schedule-start-minute');
        const endHour = card.querySelector('.schedule-end-hour');
        const endMinute = card.querySelector('.schedule-end-minute');
        const breakStartHour = card.querySelector('.schedule-break-start-hour');
        const breakStartMinute = card.querySelector('.schedule-break-start-minute');
        const breakEndHour = card.querySelector('.schedule-break-end-hour');
        const breakEndMinute = card.querySelector('.schedule-break-end-minute');
        
        if (existing) {
            workingCheckbox.checked = existing.isWorking;
            
            if (existing.timeStart) {
                const [hour, minute] = existing.timeStart.split(':');
                if (startHour) startHour.value = hour || '09';
                if (startMinute) startMinute.value = minute || '00';
            } else {
                if (startHour) startHour.value = '09';
                if (startMinute) startMinute.value = '00';
            }
            
            if (existing.timeEnd) {
                const [hour, minute] = existing.timeEnd.split(':');
                if (endHour) endHour.value = hour || '18';
                if (endMinute) endMinute.value = minute || '00';
            } else {
                if (endHour) endHour.value = '18';
                if (endMinute) endMinute.value = '00';
            }
            
            if (existing.breakStart) {
                const [hour, minute] = existing.breakStart.split(':');
                if (breakStartHour) breakStartHour.value = hour || '13';
                if (breakStartMinute) breakStartMinute.value = minute || '00';
            } else {
                if (breakStartHour) breakStartHour.value = '13';
                if (breakStartMinute) breakStartMinute.value = '00';
            }
            
            if (existing.breakEnd) {
                const [hour, minute] = existing.breakEnd.split(':');
                if (breakEndHour) breakEndHour.value = hour || '14';
                if (breakEndMinute) breakEndMinute.value = minute || '00';
            } else {
                if (breakEndHour) breakEndHour.value = '14';
                if (breakEndMinute) breakEndMinute.value = '00';
            }
            
            const selects = card.querySelectorAll('select');
            selects.forEach(select => {
                select.disabled = !existing.isWorking;
            });
        } else {
            if (startHour) startHour.value = '09';
            if (startMinute) startMinute.value = '00';
            if (endHour) endHour.value = '18';
            if (endMinute) endMinute.value = '00';
            if (breakStartHour) breakStartHour.value = '13';
            if (breakStartMinute) breakStartMinute.value = '00';
            if (breakEndHour) breakEndHour.value = '14';
            if (breakEndMinute) breakEndMinute.value = '00';
            
            const isDefaultWorking = idx < 5;
            workingCheckbox.checked = isDefaultWorking;
            
            const selects = card.querySelectorAll('select');
            selects.forEach(select => {
                select.disabled = !isDefaultWorking;
            });
        }
    });
    
    const workingCheckboxes = document.querySelectorAll('.schedule-working');
    workingCheckboxes.forEach(checkbox => {
        const newCheckbox = checkbox.cloneNode(true);
        checkbox.parentNode.replaceChild(newCheckbox, checkbox);
        
        newCheckbox.addEventListener('change', function(e) {
            const card = this.closest('.schedule-day-card');
            const selects = card.querySelectorAll('select');
            selects.forEach(select => {
                select.disabled = !this.checked;
            });
        });
    });
    
    let doctorName = doctor.name;
    if (typeof doctorName === 'object') {
        const lang = getCurrentAdminLang();
        doctorName = doctorName[lang] || doctorName.ru || '';
    }
    
    const dayNamesLocalized = {
        monday: getUIText('monday'),
        tuesday: getUIText('tuesday'),
        wednesday: getUIText('wednesday'),
        thursday: getUIText('thursday'),
        friday: getUIText('friday'),
        saturday: getUIText('saturday'),
        sunday: getUIText('sunday')
    };
    const localizedDayName = dayNamesLocalized[day] || day;
    
    document.getElementById('scheduleModalTitle').textContent = `${getUIText('configure_schedule')} - ${doctorName} (${localizedDayName})`;
    document.getElementById('scheduleModal').style.display = 'flex';
    
    const modal = document.getElementById('scheduleModal');
    if (originalData) {
        modal.setAttribute('data-original-schedule', JSON.stringify(originalData));
    } else {
        modal.setAttribute('data-original-schedule', 'null');
    }
}

function getDayNameRussian(day) {
    const days = { monday: 'Понедельник', tuesday: 'Вторник', wednesday: 'Среда', thursday: 'Четверг', friday: 'Пятница', saturday: 'Суббота', sunday: 'Воскресенье' };
    return days[day] || day;
}

async function saveSchedule(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }
    
    console.log('🟢 saveSchedule вызвана');
    
    const doctorId = parseInt(document.getElementById('scheduleDoctorId').value);
    
    if (!doctorId) {
        showToast('Выберите врача', 'error');
        return;
    }
    
    const currentTab = document.querySelector('.nav-tab.active')?.dataset.tab || 'schedule';
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = [getUIText('monday'), getUIText('tuesday'), getUIText('wednesday'), getUIText('thursday'), getUIText('friday'), getUIText('saturday'), getUIText('sunday')];
    
    const dayCards = document.querySelectorAll('.schedule-day-card');
    const newSchedule = [];
    
    for (let i = 0; i < days.length; i++) {
        const card = dayCards[i];
        const isWorking = card.querySelector('.schedule-working')?.checked || false;
        
        const startHour = card.querySelector('.schedule-start-hour')?.value || '';
        const startMinute = card.querySelector('.schedule-start-minute')?.value || '';
        const endHour = card.querySelector('.schedule-end-hour')?.value || '';
        const endMinute = card.querySelector('.schedule-end-minute')?.value || '';
        const breakStartHour = card.querySelector('.schedule-break-start-hour')?.value || '';
        const breakStartMinute = card.querySelector('.schedule-break-start-minute')?.value || '';
        const breakEndHour = card.querySelector('.schedule-break-end-hour')?.value || '';
        const breakEndMinute = card.querySelector('.schedule-break-end-minute')?.value || '';
        
        const startTime = (startHour && startMinute) ? `${startHour}:${startMinute}` : '';
        const endTime = (endHour && endMinute) ? `${endHour}:${endMinute}` : '';
        const breakStart = (breakStartHour && breakStartMinute) ? `${breakStartHour}:${breakStartMinute}` : '';
        const breakEnd = (breakEndHour && breakEndMinute) ? `${breakEndHour}:${breakEndMinute}` : '';
        
        const existingSchedule = scheduleData.schedule.find(s => s.doctorId === doctorId && s.day === days[i]);
        let id = existingSchedule ? existingSchedule.id : getNextScheduleId(scheduleData);
        
        newSchedule.push({
            id: id,
            doctorId: doctorId,
            day: days[i],
            dayName: dayNames[i],
            timeStart: isWorking ? startTime : '',
            timeEnd: isWorking ? endTime : '',
            breakStart: isWorking && breakStart ? breakStart : '',
            breakEnd: isWorking && breakEnd ? breakEnd : '',
            isWorking: isWorking
        });
    }
    
    const otherSchedules = scheduleData.schedule.filter(s => s.doctorId !== doctorId);
    scheduleData.schedule = [...otherSchedules, ...newSchedule];
    
    try {
        const response = await fetch(`${API_BASE_URL}/schedule`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scheduleData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('✅ Расписание сохранено в JSON');
        await loadAllData();
        await renderAdminSchedule();
        showToast('Расписание сохранено', 'success');
        document.getElementById('scheduleModal').style.display = 'none';
        
        activateTab(currentTab);
    } catch (error) {
        console.error('❌ Ошибка сохранения:', error);
        showToast('Ошибка сохранения расписания', 'error');
        activateTab(currentTab);
    }
}


async function renderAdminDiscounts() {
    const tbody = document.getElementById('discountsList');
    if (!tbody) return;
    
    const today = new Date().toISOString().split('T')[0];
    const activeDiscounts = discounts.filter(d => d.active && (!d.endDate || d.endDate >= today)).length;
    const expiredDiscounts = discounts.filter(d => d.endDate && d.endDate < today).length;
    const upcomingDiscounts = discounts.filter(d => d.startDate && d.startDate > today).length;
    
    const activeSpan = document.getElementById('activeDiscounts');
    const expiredSpan = document.getElementById('expiredDiscounts');
    const upcomingSpan = document.getElementById('upcomingDiscounts');
    if (activeSpan) activeSpan.textContent = activeDiscounts;
    if (expiredSpan) expiredSpan.textContent = expiredDiscounts;
    if (upcomingSpan) upcomingSpan.textContent = upcomingDiscounts;
    
    const statusFilter = document.getElementById('discountStatusFilter')?.value || 'all';
    const categoryFilter = document.getElementById('discountCategoryFilter')?.value || 'all';
    const searchFilter = document.getElementById('discountSearchFilter')?.value.toLowerCase() || '';
    
    let filtered = [...discounts];
    
    if (statusFilter === 'active') {
        filtered = filtered.filter(d => d.active && (!d.endDate || d.endDate >= today));
    } else if (statusFilter === 'expired') {
        filtered = filtered.filter(d => d.endDate && d.endDate < today);
    } else if (statusFilter === 'upcoming') {
        filtered = filtered.filter(d => d.startDate && d.startDate > today);
    }
    
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(d => d.discountCategoryId == categoryFilter);
    }
    
    if (searchFilter) {
        filtered = filtered.filter(d => d.name.toLowerCase().includes(searchFilter));
    }
    
    const categoryFilterSelect = document.getElementById('discountCategoryFilter');
    if (categoryFilterSelect && categoryFilterSelect.options.length <= 1 && pricesData?.categories) {
        const lang = getCurrentAdminLang();
        categoryFilterSelect.innerHTML = `<option value="all">${getUIText('filter_all_categories')}</option>`;
        pricesData.categories.forEach(cat => {
            if (cat.active) {
                const option = document.createElement('option');
                option.value = cat.id;
                let categoryName = cat.name;
                if (typeof categoryName === 'object') {
                    categoryName = categoryName[lang] || categoryName.ru || cat.name;
                }
                option.textContent = categoryName;
                categoryFilterSelect.appendChild(option);
            }
        });
    }
    
    const statusFilterSelect = document.getElementById('discountStatusFilter');
    if (statusFilterSelect) {
        statusFilterSelect.options[0].textContent = getUIText('filter_all_discounts');
        statusFilterSelect.options[1].textContent = getUIText('filter_active');
        statusFilterSelect.options[2].textContent = getUIText('filter_expired');
        statusFilterSelect.options[3].textContent = getUIText('filter_upcoming');
    }
    
    tbody.innerHTML = '';
    for (const discount of filtered) {
        const category = pricesData?.categories?.find(c => c.id === discount.discountCategoryId);
        const isActive = discount.active && (!discount.endDate || discount.endDate >= today);
        const isExpired = discount.endDate && discount.endDate < today;
        
        let statusText = getUIText('status_active');
        let statusClass = 'status-active';
        if (isExpired) { 
            statusText = getUIText('status_expired'); 
            statusClass = 'status-expired'; 
        } else if (!discount.active) { 
            statusText = getUIText('status_not_active'); 
            statusClass = 'status-inactive'; 
        }
        
        const discountType = discount.type === 'percentage' 
            ? getUIText('discount_percentage') 
            : getUIText('discount_fixed');
        
        const discountValue = discount.type === 'percentage' 
            ? discount.value + '%' 
            : discount.value + ' BYN';
        
        const periodText = discount.startDate && discount.endDate 
            ? `${discount.startDate} — ${discount.endDate}` 
            : (discount.startDate || discount.endDate || '—');
        
        let categoryName = category ? getLocalizedText(category.name) : getUIText('unknown');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${discount.id}</td>
            <td>${category ? escapeHtml(categoryName) : getUIText('unknown')}</td>
            <td><strong>${escapeHtml(discount.name)}</strong></td>
            <td>${discountType}</td>
            <td>${discountValue}</td>
            <td>${periodText}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-discount" data-id="${discount.id}" title="Редактировать">✏️${getUIText('action_edit')}</button>
                <button class="btn-toggle-discount" data-id="${discount.id}" title="${discount.active ? 'Деактивировать' : 'Активировать'}">${discount.active ? getUIText('action_deactivate') : getUIText('action_activate')}</button>
             </span>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.btn-edit-discount').forEach(btn => {
        btn.addEventListener('click', () => editDiscount(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-toggle-discount').forEach(btn => {
        btn.addEventListener('click', () => toggleDiscountStatus(parseInt(btn.dataset.id)));
    });
}

async function editDiscount(id) {
    const discount = discounts.find(d => d.id === id);
    if (!discount) return;
    
    const categorySelect = document.getElementById('discountServiceId');
    const lang = getCurrentAdminLang();
    categorySelect.innerHTML = `<option value="">${getUIText('select_category_option')}</option>`;
    if (pricesData?.categories) {
        pricesData.categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            let categoryName = cat.name;
            if (typeof categoryName === 'object') {
                categoryName = categoryName[lang] || categoryName.ru || cat.name;
            }
            option.textContent = categoryName;
            categorySelect.appendChild(option);
        });
    }
    
    document.getElementById('discountId').value = discount.id;
    document.getElementById('discountServiceId').value = discount.discountCategoryId;
    document.getElementById('discountName').value = discount.name;
    document.getElementById('discountType').value = discount.type;
    document.getElementById('discountValue').value = discount.value;
    document.getElementById('discountStartDate').value = discount.startDate || '';
    document.getElementById('discountEndDate').value = discount.endDate || '';
    document.getElementById('discountDescription').value = discount.description || '';
    document.getElementById('discountActive').checked = discount.active;
    document.getElementById('discountModalTitle').textContent = getUIText('modal_edit_discount');
    document.getElementById('discountModal').style.display = 'flex';
}

async function toggleDiscountStatus(id) {
    try {
        const discount = discounts.find(d => d.id === id);
        if (!discount) return;
        
        discount.active = !discount.active;
        
        await fetch(`${API_BASE_URL}/discounts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discount)
        });
        
        await loadAllData();
        await renderAdminDiscounts();
        showToast(`Скидка ${discount.active ? 'активирована' : 'деактивирована'}`, 'success');
    } catch (error) {
        showToast('Ошибка при изменении статуса', 'error');
    }
}

async function saveDiscount(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('discountId').value);
    const discountCategoryId = parseInt(document.getElementById('discountServiceId').value);
    let name = document.getElementById('discountName').value.trim();
    const type = document.getElementById('discountType').value;
    const valueRaw = document.getElementById('discountValue').value;
    const startDate = document.getElementById('discountStartDate').value;
    const endDate = document.getElementById('discountEndDate').value;
    let description = document.getElementById('discountDescription').value;
    const active = document.getElementById('discountActive').checked;
    
    if (!discountCategoryId) {
        showToast('Выберите категорию', 'error');
        return;
    }
    
    if (!name) {
        showToast('Введите название скидки', 'error');
        return;
    }
    
    const valueValidation = validateDiscountValue(valueRaw, type);
    if (!valueValidation.valid) {
        showToast(valueValidation.message, 'error');
        return;
    }
    const value = parseFloat(valueRaw);
    
    const categoryValidation = validateDiscountForCategory(discountCategoryId, id || null);
    if (!categoryValidation.valid) {
        showToast(categoryValidation.message, 'error');
        return;
    }
    
    if (typeof name === 'string') {
        name = { ru: name, en: name };
    }
    
    if (typeof description === 'string' && description) {
        description = { ru: description, en: description };
    }
    
    const discountData = { id, discountCategoryId, name, type, value, startDate, endDate, description, active, createdAt: new Date().toISOString() };
    
    const currentTab = document.querySelector('.nav-tab.active')?.dataset.tab || 'discounts';
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/discounts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discountData)
            });
            showToast('Скидка обновлена', 'success');
        } else {
            const newId = await getNextDiscountId();
            discountData.id = newId;
            await fetch(`${API_BASE_URL}/discounts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discountData)
            });
            showToast('Скидка добавлена', 'success');
        }
        
        await loadAllData();
        await renderAdminDiscounts();
        
        activateTab(currentTab);
        
        document.getElementById('discountModal').style.display = 'none';
        document.getElementById('discountForm').reset();
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        showToast('Ошибка сохранения', 'error');
        activateTab(currentTab);
    }
}

function initDiscountFilters() {
    const statusFilter = document.getElementById('discountStatusFilter');
    const categoryFilter = document.getElementById('discountCategoryFilter');
    const searchFilter = document.getElementById('discountSearchFilter');
    const resetBtn = document.getElementById('resetDiscountFilters');
    
    if (searchFilter) searchFilter.placeholder = getUIText('search_by_name');
    if (statusFilter) statusFilter.addEventListener('change', () => renderAdminDiscounts());
    if (categoryFilter) categoryFilter.addEventListener('change', () => renderAdminDiscounts());
    if (searchFilter) searchFilter.addEventListener('input', () => renderAdminDiscounts());
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (statusFilter) statusFilter.value = 'all';
            if (categoryFilter) categoryFilter.value = 'all';
            if (searchFilter) searchFilter.value = '';
            renderAdminDiscounts();
        });
    }
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            const tabId = tab.dataset.tab;
            
            saveActiveTab(tabId);
            
            activateTab(tabId);
            
            if (tabId === 'reviews') {
                await renderAdminReviews();
            } else if (tabId === 'prices') {
                await renderAdminPrices();
            } else if (tabId === 'schedule') {
                await renderAdminSchedule();
            } else if (tabId === 'discounts') {
                await renderAdminDiscounts();
            } else if (tabId === 'analytics' && typeof window.initAnalytics === 'function') {
                setTimeout(() => window.initAnalytics(), 100);
            }
        });
    });
    
    const savedTab = loadActiveTab();
    activateTab(savedTab);
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
        mobileMenu.innerHTML = `
            <div class="mobile-menu-header">
                <img src="../assets/images/logo/logo1.png" class="mobile-menu-logo" alt="Dental Club">
                <button class="close-menu-btn" id="mobileCloseBtn"><span></span><span></span></button>
            </div>
            <nav class="mobile-nav"></nav>
            <div class="mobile-footer"><a href="../index.html">← На сайт</a></div>
        `;
        document.body.appendChild(mobileMenu);
        
        const nav = mobileMenu.querySelector('.mobile-nav');
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            const clonedTab = document.createElement('button');
            clonedTab.className = 'nav-tab';
            clonedTab.innerHTML = tab.innerHTML;
            clonedTab.setAttribute('data-tab', tab.dataset.tab);
            clonedTab.addEventListener('click', () => {
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                clonedTab.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                const tabContent = document.getElementById(`tab-${tab.dataset.tab}`);
                if (tabContent) tabContent.classList.add('active');
                closeMobileMenu();
                saveActiveTab(tab.dataset.tab);
            });
            nav.appendChild(clonedTab);
        });
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
        burgerIcon?.classList.add('active');
        mobileMenu?.classList.add('active');
        menuOverlay?.classList.add('active');
        body.classList.add('menu-open');
    }
    
    function closeMobileMenu() {
        burgerIcon?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        menuOverlay?.classList.remove('active');
        body.classList.remove('menu-open');
    }
    
    burgerIcon?.addEventListener('click', openMobileMenu);
    closeMenuBtn?.addEventListener('click', closeMobileMenu);
    menuOverlay?.addEventListener('click', closeMobileMenu);
}

async function loadAllData() {
    const currentTab = document.querySelector('.nav-tab.active')?.dataset.tab;
    if (currentTab) {
        saveActiveTab(currentTab);
    }
    
    try {
        const [servicesRes, serviceDetailsRes, doctorsRes, appointmentsRes, reviewsRes, pricesRes, scheduleRes, discountsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/services`),
            fetch(`${API_BASE_URL}/serviceDetails`),
            fetch(`${API_BASE_URL}/doctors`),
            fetch(`${API_BASE_URL}/appointments`),
            fetch(`${API_BASE_URL}/reviews`),
            fetch(`${API_BASE_URL}/prices`),
            fetch(`${API_BASE_URL}/schedule`),
            fetch(`${API_BASE_URL}/discounts`)
        ]);
        
        let servicesData = await servicesRes.json();
        let serviceDetailsData = await serviceDetailsRes.json();
        let doctorsData = await doctorsRes.json();
        let reviewsData = await reviewsRes.json();
        let pricesDataRaw = await pricesRes.json();
        let scheduleDataRaw = await scheduleRes.json();
        
        servicesData = localizeArray(servicesData, ['name', 'title']);
        serviceDetailsData = localizeArray(serviceDetailsData, ['mainText', 'secondaryText', 'features', 'steps']);
        doctorsData = localizeArray(doctorsData, ['lastName', 'firstName', 'middleName', 'specialization', 'education', 'experience', 'improvement']);
        reviewsData = localizeArray(reviewsData, ['author', 'userInfo', 'text']);
        
        if (pricesDataRaw && pricesDataRaw.categories) {
            pricesDataRaw.categories = localizeArray(pricesDataRaw.categories, ['name']);
        }
        if (pricesDataRaw && pricesDataRaw.services) {
            pricesDataRaw.services = localizeArray(pricesDataRaw.services, ['name', 'description']);
        }
        
        if (scheduleDataRaw && scheduleDataRaw.doctors) {
            scheduleDataRaw.doctors = localizeArray(scheduleDataRaw.doctors, ['name', 'specialization']);
        }
        if (scheduleDataRaw && scheduleDataRaw.schedule) {
            scheduleDataRaw.schedule = localizeArray(scheduleDataRaw.schedule, ['dayName']);
        }
        
        const discountsData = await discountsRes.json();
        discounts = localizeArray(discountsData, ['name', 'description']);
        
        services = servicesData;
        serviceDetails = serviceDetailsData;
        doctors = doctorsData;
        appointments = await appointmentsRes.json();
        reviews = reviewsData;
        pricesData = pricesDataRaw;
        scheduleData = scheduleDataRaw;
        
        console.log('✅ Все данные загружены');
        console.log('📋 Услуг:', services.length);
        console.log('👨‍⚕️ Врачей:', doctors.length);
        console.log('📅 Записей:', appointments.length);
        console.log('📂 Категорий прайс-листа:', pricesData?.categories?.length || 0);
        console.log('🏷️ Скидок:', discounts.length);
        
        if (currentTab) {
            activateTab(currentTab);
        }
        
        return true;
    } catch (error) {
        console.error('❌ Ошибка загрузки данных:', error);
        showToast('Ошибка подключения к серверу. Запустите json-server --watch db.json --port 3000', 'error');
        return false;
    }
}

function getDiscountByCategoryId(categoryId) {
    const today = new Date().toISOString().split('T')[0];
    return discounts.find(d => {
        if (d.discountCategoryId !== categoryId) return false;
        if (!d.active) return false;
        if (d.startDate && d.endDate) {
            return today >= d.startDate && today <= d.endDate;
        }
        return true;
    });
}

function exportPricesToJSON() {
    if (!pricesData) {
        showToast('Нет данных для экспорта', 'error');
        return;
    }
    
    const exportData = {
        version: pricesData.version || '2.0',
        categories: pricesData.categories || [],
        services: pricesData.services || [],
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prices_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Прайс-лист экспортирован', 'success');
}


async function refreshPricesData() {
    try {
        const response = await fetch(`${API_BASE_URL}/prices`);
        if (response.ok) {
            const freshData = await response.json();
            if (freshData) {
                pricesData = freshData;
                
                if (pricesData.categories) {
                    pricesData.categories = localizeArray(pricesData.categories, ['name']);
                }
                if (pricesData.services) {
                    pricesData.services = localizeArray(pricesData.services, ['name', 'description']);
                }
                
                console.log('🔄 Данные прайс-листа обновлены, категорий:', pricesData.categories?.length || 0);
                return true;
            }
        }
    } catch (error) {
        console.error('❌ Ошибка обновления данных прайс-листа:', error);
    }
    return false;
}

async function openAddCategoryModal() {
    await refreshPricesData();
    
    if (!pricesData) {
        pricesData = { version: '2.0', categories: [], services: [] };
    }
    if (!pricesData.categories) pricesData.categories = [];
    
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryName').value = '';
    const maxOrder = Math.max(...pricesData.categories.map(c => c.order || 0), 0);
    document.getElementById('categoryOrder').value = maxOrder + 1;
    document.getElementById('categoryActive').checked = true;
    
    document.getElementById('categoryModalTitle').textContent = getUIText('modal_add_category');
    document.getElementById('categoryModal').style.display = 'flex';
}

async function editCategory(categoryId) {
    await refreshPricesData();
    
    const category = pricesData?.categories?.find(c => c.id === categoryId);
    if (!category) return;
    
    document.getElementById('categoryId').value = category.id;
    document.getElementById('categoryName').value = typeof category.name === 'object' ? (category.name.ru || category.name) : category.name;
    document.getElementById('categoryOrder').value = category.order || 0;
    document.getElementById('categoryActive').checked = category.active !== false;
    
    document.getElementById('categoryModalTitle').textContent = getUIText('modal_edit_category');
    document.getElementById('categoryModal').style.display = 'flex';
}

async function deleteCategory(categoryId) {
    await refreshPricesData();
    
    const category = pricesData?.categories?.find(c => c.id === categoryId);
    if (!category) return;
    
    const categoryName = typeof category.name === 'object' ? (category.name.ru || category.name) : category.name;
    const servicesInCategory = pricesData?.services?.filter(s => s.categoryId === categoryId) || [];
    
    let confirmMessage = `Удалить категорию "${categoryName}"?`;
    if (servicesInCategory.length > 0) {
        confirmMessage += `\n\n⚠️ ВНИМАНИЕ: В этой категории ${servicesInCategory.length} услуг(а). Они также будут удалены!`;
    }
    
    if (confirm(confirmMessage)) {
        if (servicesInCategory.length > 0) {
            pricesData.services = pricesData.services.filter(s => s.categoryId !== categoryId);
        }
        
        pricesData.categories = pricesData.categories.filter(c => c.id !== categoryId);
        
        pricesData.categories.forEach((cat, index) => {
            cat.order = index + 1;
        });
        
        const saved = await savePricesData();
        if (saved) {
            await refreshPricesData();
            await renderAdminPrices();
            await updateCategoryFilters();
            showToast(`Категория "${categoryName}" удалена`, 'success');
        }
    }
}

async function saveCategory(event) {
    event.preventDefault();
    
    const id = parseInt(document.getElementById('categoryId').value);
    let name = document.getElementById('categoryName').value.trim();
    const order = parseInt(document.getElementById('categoryOrder').value) || 999;
    const active = document.getElementById('categoryActive').checked;
    
    if (!name) {
        showToast('Введите название категории', 'error');
        return;
    }
    
    await refreshPricesData();
    
    if (!pricesData) {
        pricesData = { version: '2.0', categories: [], services: [] };
    }
    if (!pricesData.categories) pricesData.categories = [];
    
    if (typeof name === 'string') {
        name = { ru: name, en: name };
    }
    
    if (id && id > 0) {
        const index = pricesData.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            pricesData.categories[index] = {
                ...pricesData.categories[index],
                name: name,
                order: order,
                active: active
            };
        }
        showToast(`Категория обновлена`, 'success');
    } else {
        const newId = getNextPriceCategoryId(pricesData);
        pricesData.categories.push({
            id: newId,
            name: name,
            order: order,
            active: active
        });
        showToast(`Категория добавлена`, 'success');
    }
    
    pricesData.categories.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    const saved = await savePricesData();
    
    if (saved) {
        await refreshPricesData();
        await updateCategoryFilters();
        await renderAdminPrices();
        
        const discountCategoryFilter = document.getElementById('discountCategoryFilter');
        if (discountCategoryFilter && pricesData?.categories) {
            const currentValue = discountCategoryFilter.value;
            discountCategoryFilter.innerHTML = '<option value="all">Все категории</option>';
            pricesData.categories.filter(c => c.active !== false).forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                let categoryName = cat.name;
                if (typeof categoryName === 'object') {
                    const lang = getCurrentAdminLang();
                    categoryName = categoryName[lang] || categoryName.ru || cat.name;
                }
                option.textContent = categoryName;
                discountCategoryFilter.appendChild(option);
            });
            if (currentValue && discountCategoryFilter.querySelector(`option[value="${currentValue}"]`)) {
                discountCategoryFilter.value = currentValue;
            }
        }
        
        const totalCategories = document.getElementById('totalCategories');
        if (totalCategories) {
            totalCategories.textContent = pricesData.categories.length;
        }
    }
    
    document.getElementById('categoryModal').style.display = 'none';
    document.getElementById('categoryForm').reset();
}

async function savePricesData() {
    try {
        if (!pricesData) {
            pricesData = { version: '2.0', categories: [], services: [] };
        }
        if (!pricesData.categories) pricesData.categories = [];
        if (!pricesData.services) pricesData.services = [];
        if (!pricesData.version) pricesData.version = '2.0';
        
        const response = await fetch(`${API_BASE_URL}/prices`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pricesData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('✅ Данные прайс-листа сохранены в JSON Server');
        return true;
    } catch (error) {
        console.error('❌ Ошибка сохранения прайс-листа:', error);
        showToast('Ошибка сохранения', 'error');
        return false;
    }
}

async function updateCategoryFilters() {
    const lang = getCurrentAdminLang();
    
    const categoryFilter = document.getElementById('priceCategoryFilter');
    if (categoryFilter && pricesData?.categories) {
        const currentValue = categoryFilter.value;
        categoryFilter.innerHTML = `<option value="all">${getUIText('filter_all_categories')}</option>`;
        
        const sortedCategories = [...pricesData.categories].sort((a, b) => (a.order || 0) - (b.order || 0));
        
        sortedCategories.filter(c => c.active !== false).forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            let categoryName = cat.name;
            if (typeof categoryName === 'object') {
                categoryName = categoryName[lang] || categoryName.ru || cat.name;
            }
            option.textContent = categoryName;
            categoryFilter.appendChild(option);
        });
        
        if (currentValue && categoryFilter.querySelector(`option[value="${currentValue}"]`)) {
            categoryFilter.value = currentValue;
        }
    }
    
    const discountCategoryFilter = document.getElementById('discountCategoryFilter');
    if (discountCategoryFilter && pricesData?.categories) {
        const currentValue = discountCategoryFilter.value;
        discountCategoryFilter.innerHTML = `<option value="all">${getUIText('filter_all_categories')}</option>`;
        
        const sortedCategories = [...pricesData.categories].sort((a, b) => (a.order || 0) - (b.order || 0));
        
        sortedCategories.filter(c => c.active !== false).forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            let categoryName = cat.name;
            if (typeof categoryName === 'object') {
                categoryName = categoryName[lang] || categoryName.ru || cat.name;
            }
            option.textContent = categoryName;
            discountCategoryFilter.appendChild(option);
        });
        
        if (currentValue && discountCategoryFilter.querySelector(`option[value="${currentValue}"]`)) {
            discountCategoryFilter.value = currentValue;
        }
    }
    
    const priceServiceCategory = document.getElementById('priceServiceCategoryId');
    if (priceServiceCategory && pricesData?.categories) {
        const currentValue = priceServiceCategory.value;
        priceServiceCategory.innerHTML = '<option value="" data-translate="select_category_option">-- Выберите категорию --</option>';
        
        const sortedCategories = [...pricesData.categories].sort((a, b) => (a.order || 0) - (b.order || 0));
        
        sortedCategories.filter(c => c.active !== false).forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            let categoryName = cat.name;
            if (typeof categoryName === 'object') {
                categoryName = categoryName[lang] || categoryName.ru || cat.name;
            }
            option.textContent = categoryName;
            priceServiceCategory.appendChild(option);
        });
        
        const firstOption = priceServiceCategory.options[0];
        if (firstOption) firstOption.textContent = getUIText('select_category_option');
        if (currentValue && priceServiceCategory.querySelector(`option[value="${currentValue}"]`)) {
            priceServiceCategory.value = currentValue;
        }
    }
    
    const discountServiceId = document.getElementById('discountServiceId');
    if (discountServiceId && pricesData?.categories) {
        const currentValue = discountServiceId.value;
        discountServiceId.innerHTML = '<option value="" data-translate="select_category_option">-- Выберите категорию --</option>';
        
        const sortedCategories = [...pricesData.categories].sort((a, b) => (a.order || 0) - (b.order || 0));
        
        sortedCategories.filter(c => c.active !== false).forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            let categoryName = cat.name;
            if (typeof categoryName === 'object') {
                categoryName = categoryName[lang] || categoryName.ru || cat.name;
            }
            option.textContent = categoryName;
            discountServiceId.appendChild(option);
        });
        
        const firstOption = discountServiceId.options[0];
        if (firstOption) firstOption.textContent = getUIText('select_category_option');
        if (currentValue && discountServiceId.querySelector(`option[value="${currentValue}"]`)) {
            discountServiceId.value = currentValue;
        }
    }
    
    console.log('✅ Фильтры категорий обновлены, категорий:', pricesData?.categories?.length || 0);
}

async function renderAdminPrices() {
    const container = document.getElementById('pricesAdminContainer');
    if (!container) return;
    
    await refreshPricesData();
    
    const lang = getCurrentAdminLang();
    const categoryFilter = document.getElementById('priceCategoryFilter')?.value || 'all';
    const searchFilter = document.getElementById('priceSearchFilter')?.value.toLowerCase() || '';
    
    let categories = pricesData?.categories || [];
    let servicesList = pricesData?.services || [];
    
    categories = categories.map(cat => ({
        ...cat,
        localizedName: getLocalizedText(cat.name)
    }));
    
    if (categoryFilter !== 'all') {
        servicesList = servicesList.filter(s => s.categoryId == categoryFilter);
        categories = categories.filter(c => c.id == categoryFilter);
    }
    
    if (searchFilter) {
        servicesList = servicesList.filter(s => s.name.toLowerCase().includes(searchFilter));
        const categoryIds = [...new Set(servicesList.map(s => s.categoryId))];
        categories = categories.filter(c => categoryIds.includes(c.id));
    }
    
    categories.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    const totalCategories = document.getElementById('totalCategories');
    const totalPriceServices = document.getElementById('totalPriceServices');
    if (totalCategories) totalCategories.textContent = categories.length;
    if (totalPriceServices) totalPriceServices.textContent = servicesList.length;
    
    const categorySelect = document.getElementById('priceCategoryFilter');
    if (categorySelect && categorySelect.options.length <= 1 && pricesData?.categories) {
        await updateCategoryFilters();
    }
    
    if (categories.length === 0) {
        container.innerHTML = '<div class="empty-prices" style="text-align: center; padding: 40px; color: #6B7280;">Нет категорий для отображения</div>';
        return;
    }
    
    let html = '';
    
    for (const category of categories) {
        const categoryServices = servicesList.filter(s => s.categoryId === category.id);
        
        const categoryDiscount = getDiscountByCategoryId(category.id);
        
        let discountHtml = '';
        if (categoryDiscount) {
            const discountValue = categoryDiscount.type === 'percentage' 
                ? categoryDiscount.value + '%' 
                : categoryDiscount.value + ' BYN';
            const dateText = categoryDiscount.endDate ? ` ${getUIText('until_label')} ${categoryDiscount.endDate}` : '';
            discountHtml = `
                <span style="background: #EF4444; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-left: 12px;">
                    ${getUIText('discount_label')}: ${discountValue}${dateText}
                </span>
            `;
        }
        
        const categoryOpacity = category.active !== false ? '1' : '0.6';
        const categoryBg = category.active !== false ? 'white' : '#f5f5f5';
        const categoryStatusText = category.active !== false ? getUIText('status_active') : getUIText('status_inactive');
        
        html += `
            <div class="price-category-card" style="background: ${categoryBg}; border-radius: 16px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); opacity: ${categoryOpacity};" data-category-id="${category.id}">
                <div class="price-category-header" style="cursor: pointer; background: #2F353B; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; flex-wrap: wrap;">
                        <h3 style="color: white; margin: 0;">${escapeHtml(category.localizedName)}</h3>
                        <span class="status-badge ${category.active !== false ? 'status-active' : 'status-inactive'}" style="margin-left: 15px;">${categoryStatusText}</span>
                        ${discountHtml}
                    </div>
                    <div>
                        <span style="background: #A5C33C; color: #1a1e22; padding: 4px 10px; border-radius: 20px; font-size: 12px; margin-right: 15px;">${categoryServices.length} ${getUIText('stat_services_count')}</span>
                        <button class="btn-edit-category" data-id="${category.id}" style="background: #E0E7FF; color: #4338CA; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; margin-right: 5px;" title="Редактировать категорию">✏️</button>
                        <button class="btn-toggle-category" data-id="${category.id}" style="background: #FEF3C7; color: #D97706; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; margin-right: 5px;" title="${category.active !== false ? 'Скрыть' : 'Показать'}">${category.active !== false ? '🙈' : '👁️'}</button>
                        <span class="price-category-toggle" style="color: white; font-size: 20px; margin-left: 10px;">▼</span>
                    </div>
                </div>
                <div class="category-content" style="display: block; padding: 20px; background: ${categoryBg}; overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <colgroup>
                            <col style="width: 35%;">
                            <col style="width: 20%;">
                            <col style="width: 15%;">
                            <col style="width: 20%;">
                            <col style="width: 10%;">
                        </colgroup>
                        <thead>
                            <tr style="background: #F3F4F6;">
                                <th style="padding: 12px 15px; text-align: left; font-weight: 600;">${getUIText('th_name')}</th>
                                <th style="padding: 12px 15px; text-align: left; font-weight: 600;">${getUIText('th_price')}</th>
                                <th style="padding: 12px 15px; text-align: left; font-weight: 600;">${getUIText('th_currency')}</th>
                                <th style="padding: 12px 15px; text-align: left; font-weight: 600;">${getUIText('th_note')}</th>
                                <th style="padding: 12px 15px; text-align: left; font-weight: 600; width: 100px;">${getUIText('th_actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        if (categoryServices.length === 0) {
            html += `
                <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td colspan="5" style="padding: 30px; text-align: center; color: #9CA3AF;">
                        Нет услуг в этой категории
                    </td>
                </tr>
            `;
        } else {
            for (const service of categoryServices) {
                let priceDisplay = '';
                const originalPrice = parseFloat(service.price);
                
                let serviceName = service.name;
                if (typeof serviceName === 'object') {
                    serviceName = serviceName[lang] || serviceName.ru || service.name;
                }
                
                let serviceDescription = service.description || '—';
                if (typeof serviceDescription === 'object') {
                    serviceDescription = serviceDescription[lang] || serviceDescription.ru || '—';
                }
                
                if (service.price === '0') {
                    priceDisplay = getUIText('price_free');
                } else if (categoryDiscount) {
                    let discountedPrice = originalPrice;
                    if (categoryDiscount.type === 'percentage') {
                        discountedPrice = originalPrice * (1 - categoryDiscount.value / 100);
                        priceDisplay = `
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="text-decoration: line-through; color: #9CA3AF; font-size: 12px;">${originalPrice}</span>
                                <span style="color: #EF4444; font-weight: 700; font-size: 15px;">${discountedPrice.toFixed(0)} <span style="font-size: 11px;">${getUIText('price_with_discount')}</span></span>
                            </div>
                        `;
                    } else {
                        discountedPrice = Math.max(0, originalPrice - categoryDiscount.value);
                        priceDisplay = `
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="text-decoration: line-through; color: #9CA3AF; font-size: 12px;">${originalPrice}</span>
                                <span style="color: #EF4444; font-weight: 700; font-size: 15px;">${discountedPrice.toFixed(0)} <span style="font-size: 11px;">${getUIText('price_with_discount')}</span></span>
                            </div>
                        `;
                    }
                } else {
                    priceDisplay = `<span style="font-size: 15px;">${originalPrice}</span>`;
                }
                
                const serviceOpacity = service.active !== false ? '1' : '0.6';
                const serviceBg = service.active !== false ? 'transparent' : '#fff3e0';
                const serviceStatusText = service.active !== false ? getUIText('status_active') : getUIText('status_inactive');
                
                html += `
                    <tr style="border-bottom: 1px solid #E5E7EB; opacity: ${serviceOpacity}; background: ${serviceBg};">
                        <td style="padding: 12px 15px; word-break: break-word;">
                            <strong>${escapeHtml(serviceName)}</strong>
                            <span class="status-badge ${service.active !== false ? 'status-active' : 'status-inactive'}" style="margin-left: 10px; font-size: 10px; padding: 2px 8px;">${serviceStatusText}</span>
                        </td>
                        <td style="padding: 12px 15px; vertical-align: top;">${priceDisplay}</td>
                        <td style="padding: 12px 15px; vertical-align: top;">${getCurrencyHtml(service.unit)}</td>
                        <td style="padding: 12px 15px; vertical-align: top; word-break: break-word;">${escapeHtml(serviceDescription)}</td>
                        <td style="padding: 12px 15px; vertical-align: top; white-space: nowrap;">
                            <button class="btn-edit-price-service" data-id="${service.id}" data-category-id="${category.id}" style="background: #E0E7FF; color: #4338CA; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; margin-right: 5px;" title="Редактировать">✏️</button>
                            <button class="btn-toggle-price-service" data-id="${service.id}" data-category-id="${category.id}" style="background: #FEF3C7; color: #D97706; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; margin-right: 5px;" title="${service.active !== false ? 'Скрыть' : 'Показать'}">
                                ${service.active !== false ? '🙈' : '👁️'}
                            </button>
                        </td>
                     </tr>
                `;
            }
        }
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
    
    document.querySelectorAll('.price-category-header').forEach(header => {
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        newHeader.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            const card = this.closest('.price-category-card');
            const content = card.querySelector('.category-content');
            const toggle = this.querySelector('.price-category-toggle');
            
            if (content) {
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    if (toggle) toggle.style.transform = 'rotate(0deg)';
                } else {
                    content.style.display = 'none';
                    if (toggle) toggle.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
    
    document.querySelectorAll('.btn-edit-category').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            editCategory(parseInt(newBtn.dataset.id));
        });
    });
    
    document.querySelectorAll('.btn-toggle-category').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const categoryId = parseInt(newBtn.dataset.id);
            await toggleCategoryVisibility(categoryId);
        });
    });
    
    document.querySelectorAll('.btn-edit-price-service').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const serviceId = parseInt(newBtn.dataset.id);
            const categoryId = parseInt(newBtn.dataset.categoryId);
            editPriceService(serviceId, categoryId);
        });
    });
    
    document.querySelectorAll('.btn-toggle-price-service').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const serviceId = parseInt(newBtn.dataset.id);
            await togglePriceServiceVisibility(serviceId);
        });
    });
}

async function toggleCategoryVisibility(categoryId) {
    const category = pricesData.categories.find(c => c.id === categoryId);
    if (!category) return;
    
    category.active = category.active === false ? true : false;
    
    const saved = await savePricesData();
    if (saved) {
        await refreshPricesData();
        await renderAdminPrices();
        await updateCategoryFilters();
        showToast(`Категория ${category.active ? 'показана' : 'скрыта'}`, 'success');
    }
}

async function editPriceService(id, categoryId) {
    await refreshPricesData();
    
    const service = pricesData?.services?.find(s => s.id === id);
    if (!service) return;
    
    const categorySelect = document.getElementById('priceServiceCategoryId');
    categorySelect.innerHTML = '<option value="">-- Выберите категорию --</option>';
    pricesData?.categories?.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        let categoryName = cat.name;
        if (typeof categoryName === 'object') {
            const lang = getCurrentAdminLang();
            categoryName = categoryName[lang] || categoryName.ru || cat.name;
        }
        option.textContent = categoryName;
        categorySelect.appendChild(option);
    });
    
    const currentDiscount = getDiscountByCategoryId(categoryId || service.categoryId);
    
    document.getElementById('priceServiceId').value = service.id;
    document.getElementById('priceServiceCategoryId').value = service.categoryId;
    document.getElementById('priceServiceName').value = service.name;
    document.getElementById('priceServicePrice').value = service.price;
    document.getElementById('priceServiceUnit').value = service.unit;
    document.getElementById('priceServiceDescription').value = service.description || '';
    document.getElementById('priceServiceOrder').value = service.order || '';
    document.getElementById('priceServiceActive').checked = service.active;
    
    const discountInfoContainer = document.getElementById('priceServiceDiscountInfo');
    if (discountInfoContainer) {
        if (currentDiscount) {
            const activeDiscountText = getUIText('active_discount_on_category');
            const validUntilText = getUIText('valid_until');
            discountInfoContainer.innerHTML = `
                <div style="background: #FEF3C7; border: 1px solid #F59E0B; border-radius: 8px; padding: 12px; margin-top: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 20px;">🏷️</span>
                        <div>
                            <strong style="color: #D97706;">${activeDiscountText}</strong><br>
                            <span style="font-size: 13px;">${escapeHtml(currentDiscount.name)}: ${currentDiscount.type === 'percentage' ? currentDiscount.value + '%' : currentDiscount.value + ' BYN'}</span>
                            ${currentDiscount.endDate ? `<span style="font-size: 12px; color: #6B7280;"> (${validUntilText} ${currentDiscount.endDate})</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
            discountInfoContainer.style.display = 'block';
        } else {
            discountInfoContainer.innerHTML = '';
            discountInfoContainer.style.display = 'none';
        }
    }
    
    document.getElementById('priceServiceModalTitle').textContent = 'Редактировать услугу';
    document.getElementById('priceServiceModal').style.display = 'flex';
}

async function deletePriceService(id) {
    if (confirm('Удалить эту услугу из прайс-листа?')) {
        pricesData.services = pricesData.services.filter(s => s.id !== id);
        await savePricesData();
        await refreshPricesData();
        await renderAdminPrices();
        showToast('Услуга удалена', 'success');
    }
}

async function savePriceService(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('priceServiceId').value);
    const categoryId = parseInt(document.getElementById('priceServiceCategoryId').value);
    const name = document.getElementById('priceServiceName').value.trim();
    const price = document.getElementById('priceServicePrice').value.trim();
    const unit = document.getElementById('priceServiceUnit').value;
    const description = document.getElementById('priceServiceDescription').value.trim();
    const order = parseInt(document.getElementById('priceServiceOrder').value) || 999;
    const active = document.getElementById('priceServiceActive').checked;
    
    if (!categoryId || !name) {
        showToast('Заполните обязательные поля', 'error');
        return;
    }
    
    if (id) {
        const index = pricesData.services.findIndex(s => s.id === id);
        if (index !== -1) {
            pricesData.services[index] = { ...pricesData.services[index], categoryId, name, price, unit, description, order, active };
        }
    } else {
        const newId = getNextPriceServiceId(pricesData);
        pricesData.services.push({ id: newId, categoryId, name, price, unit, description, order, active });
    }
    
    try {
        await savePricesData();
        await refreshPricesData();
        await renderAdminPrices();
        showToast('Услуга сохранена', 'success');
        document.getElementById('priceServiceModal').style.display = 'none';
        document.getElementById('priceServiceForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}

function updateAdminUITranslations() {
    const currentLang = getCurrentAdminLang();
    
    const dateFilterInput = document.getElementById('appointmentDateFilter');
    if (dateFilterInput) {
        dateFilterInput.placeholder = getDatePlaceholder();
    }
    
    document.querySelectorAll('[data-admin-translate]').forEach(el => {
        const key = el.getAttribute('data-admin-translate');
        if (key) {
            const translated = getUIText(key);
            if (translated) {
                el.textContent = translated;
            }
        }
    });
    
    const doctorFilter = document.getElementById('appointmentDoctorFilter');
    if (doctorFilter && doctorFilter.options.length > 0) {
        const firstOption = doctorFilter.options[0];
        if (firstOption) {
            firstOption.textContent = getUIText('filter_all_doctors');
        }
    }
    
    const statusFilter = document.getElementById('appointmentStatusFilter');
    if (statusFilter && statusFilter.options.length > 1) {
        const statusOptions = ['filter_all_statuses', 'status_pending', 'status_confirmed', 'status_completed', 'status_cancelled'];
        statusFilter.querySelectorAll('option').forEach((opt, idx) => {
            if (statusOptions[idx]) {
                opt.textContent = getUIText(statusOptions[idx]);
            }
        });
    }
    
    const serviceNameInput = document.getElementById('serviceName');
    if (serviceNameInput && serviceNameInput.hasAttribute('placeholder')) {
        serviceNameInput.placeholder = getUIText('service_name_placeholder');
    }
    
    const servicePageInput = document.getElementById('servicePage');
    if (servicePageInput && servicePageInput.hasAttribute('placeholder')) {
        servicePageInput.placeholder = getUIText('service_url_label');
    }
    
    const serviceTitleInput = document.getElementById('serviceTitle');
    if (serviceTitleInput && serviceTitleInput.hasAttribute('placeholder')) {
        serviceTitleInput.placeholder = getUIText('service_title_placeholder');
    }
    
    const doctorScheduleInput = document.getElementById('doctorSchedule');
    if (doctorScheduleInput && doctorScheduleInput.hasAttribute('placeholder')) {
        doctorScheduleInput.placeholder = getUIText('schedule_placeholder');
    }
    
    const priceServicePriceInput = document.getElementById('priceServicePrice');
    if (priceServicePriceInput && priceServicePriceInput.hasAttribute('placeholder')) {
        priceServicePriceInput.placeholder = getUIText('price_placeholder');
    }
    
    const priceServiceDescriptionInput = document.getElementById('priceServiceDescription');
    if (priceServiceDescriptionInput && priceServiceDescriptionInput.hasAttribute('placeholder')) {
        priceServiceDescriptionInput.placeholder = getUIText('note_placeholder');
    }
    
    const categoryNameInput = document.getElementById('categoryName');
    if (categoryNameInput && categoryNameInput.hasAttribute('placeholder')) {
        categoryNameInput.placeholder = getUIText('category_name_placeholder');
    }
    
    const detailServiceSelect = document.getElementById('detailServiceId');
    if (detailServiceSelect && detailServiceSelect.options.length > 0) {
        const firstOption = detailServiceSelect.options[0];
        if (firstOption && firstOption.getAttribute('data-translate') === 'select_service_option') {
            firstOption.textContent = getUIText('select_service_option');
        }
    }
    
    const appointmentDoctorSelect = document.getElementById('appointmentDoctorId');
    if (appointmentDoctorSelect && appointmentDoctorSelect.options.length > 0) {
        const firstOption = appointmentDoctorSelect.options[0];
        if (firstOption && firstOption.getAttribute('data-translate') === 'select_doctor_option') {
            firstOption.textContent = getUIText('select_doctor_option');
        }
    }
    
    const appointmentServiceSelect = document.getElementById('appointmentServiceId');
    if (appointmentServiceSelect && appointmentServiceSelect.options.length > 0) {
        const firstOption = appointmentServiceSelect.options[0];
        if (firstOption && firstOption.getAttribute('data-translate') === 'select_service_option') {
            firstOption.textContent = getUIText('select_service_option');
        }
    }
    
    const appointmentTimeSelect = document.getElementById('appointmentTime');
    if (appointmentTimeSelect && appointmentTimeSelect.options.length > 0) {
        const firstOption = appointmentTimeSelect.options[0];
        if (firstOption && firstOption.getAttribute('data-translate') === 'select_time_option') {
            firstOption.textContent = getUIText('select_time_option');
        }
    }
    
    const discountCategorySelect = document.getElementById('discountServiceId');
    if (discountCategorySelect && discountCategorySelect.options.length > 0) {
        const firstOption = discountCategorySelect.options[0];
        if (firstOption && firstOption.getAttribute('data-translate') === 'select_category_option') {
            firstOption.textContent = getUIText('select_category_option');
        }
    }
    
    const priceServiceCategorySelect = document.getElementById('priceServiceCategoryId');
    if (priceServiceCategorySelect && priceServiceCategorySelect.options.length > 0) {
        const firstOption = priceServiceCategorySelect.options[0];
        if (firstOption && firstOption.getAttribute('data-translate') === 'select_category_option') {
            firstOption.textContent = getUIText('select_category_option');
        }
    }
    
    const scheduleDoctorSelect = document.getElementById('scheduleDoctorSelect');
    if (scheduleDoctorSelect && scheduleDoctorSelect.options.length > 0) {
        const firstOption = scheduleDoctorSelect.options[0];
        if (firstOption && firstOption.getAttribute('data-translate') === 'select_doctor_option') {
            firstOption.textContent = getUIText('select_doctor_option');
        }
    }
    
    const scheduleLabels = document.querySelectorAll('#scheduleModal .schedule-day-card label');
    scheduleLabels.forEach(label => {
        const text = label.textContent.trim();
        if (text === 'Рабочий день' || text === 'Working day') {
            label.textContent = getUIText('working_day_label');
        } else if (text === 'Начало работы' || text === 'Start time') {
            label.textContent = getUIText('work_start_label');
        } else if (text === 'Конец работы' || text === 'End time') {
            label.textContent = getUIText('work_end_label');
        } else if (text === 'Начало перерыва' || text === 'Break start') {
            label.textContent = getUIText('break_start_label');
        } else if (text === 'Конец перерыва' || text === 'Break end') {
            label.textContent = getUIText('break_end_label');
        }
    });
    
    const workingDayCheckboxes = document.querySelectorAll('#scheduleModal .checkbox-label span');
    workingDayCheckboxes.forEach(checkbox => {
        const text = checkbox.textContent.trim();
        if (text === 'Рабочий день' || text === 'Working day') {
            checkbox.textContent = getUIText('working_day_label');
        }
    });
    
    const mainTextarea = document.getElementById('detailMainText');
    if (mainTextarea && mainTextarea.hasAttribute('placeholder')) {
        mainTextarea.placeholder = getUIText('main_text_placeholder');
    }
    
    const secondaryTextarea = document.getElementById('detailSecondaryText');
    if (secondaryTextarea && secondaryTextarea.hasAttribute('placeholder')) {
        secondaryTextarea.placeholder = getUIText('secondary_text_placeholder');
    }
    
    const featuresTextarea = document.getElementById('detailFeatures');
    if (featuresTextarea && featuresTextarea.hasAttribute('placeholder')) {
        featuresTextarea.placeholder = getUIText('features_placeholder');
    }
    
    const stepsTextarea = document.getElementById('detailSteps');
    if (stepsTextarea && stepsTextarea.hasAttribute('placeholder')) {
        stepsTextarea.placeholder = getUIText('steps_placeholder');
    }
    
    const modalTitles = {
        'serviceModalTitle': 'modal_add_service',
        'detailModalTitle': 'modal_add_service_detail',
        'doctorModalTitle': 'modal_add_doctor',
        'appointmentModalTitle': 'modal_new_appointment',
        'discountModalTitle': 'modal_add_discount',
        'priceServiceModalTitle': 'add_price_service',
        'scheduleModalTitle': 'configure_schedule',
        'categoryModalTitle': 'modal_add_category'
    };
    
    for (const [id, key] of Object.entries(modalTitles)) {
        const el = document.getElementById(id);
        if (el) {
            const translated = getUIText(key);
            if (translated) el.textContent = translated;
        }
    }
    
    const viewReviewTitle = document.querySelector('#viewReviewModal .modal-header h2');
    if (viewReviewTitle) {
        viewReviewTitle.textContent = getUIText('view_review_title');
    }
    
    const labelMappings = [
        { selector: '#serviceForm label[for="serviceName"]', key: 'service_name_label' },
        { selector: '#serviceForm label[for="servicePage"]', key: 'service_url_label' },
        { selector: '#serviceForm .checkbox-label span', key: 'service_active_label' },
        { selector: '#detailForm label[for="detailServiceId"]', key: 'service_select_label' },
        { selector: '#detailForm label[for="detailMainText"]', key: 'main_text_label' },
        { selector: '#detailForm label[for="detailSecondaryText"]', key: 'secondary_text_label' },
        { selector: '#detailForm label[for="detailFeatures"]', key: 'features_label' },
        { selector: '#detailForm label[for="detailSteps"]', key: 'steps_label' },
        { selector: '#detailForm label[for="detailImages"]', key: 'images_label' },
        { selector: '#doctorForm label[for="doctorLastName"]', key: 'last_name_label' },
        { selector: '#doctorForm label[for="doctorFirstName"]', key: 'first_name_label' },
        { selector: '#doctorForm label[for="doctorMiddleName"]', key: 'middle_name_label' },
        { selector: '#doctorForm label[for="doctorSpecialization"]', key: 'specialization_label' },
        { selector: '#doctorForm label[for="doctorPhoto"]', key: 'photo_label' },
        { selector: '#doctorForm label[for="doctorEducation"]', key: 'education_label' },
        { selector: '#doctorForm label[for="doctorExperience"]', key: 'experience_label' },
        { selector: '#doctorForm label[for="doctorImprovement"]', key: 'improvement_label' },
        { selector: '#doctorForm label[for="doctorSchedule"]', key: 'schedule_label' },
        { selector: '#doctorForm .checkbox-label span', key: 'doctor_active_label' },
        { selector: '#appointmentForm label[for="appointmentPatientName"]', key: 'patient_name_label' },
        { selector: '#appointmentForm label[for="appointmentPhone"]', key: 'phone_label' },
        { selector: '#appointmentForm label[for="appointmentEmail"]', key: 'email_label' },
        { selector: '#appointmentForm label[for="appointmentDoctorId"]', key: 'doctor_label' },
        { selector: '#appointmentForm label[for="appointmentServiceId"]', key: 'service_label' },
        { selector: '#appointmentForm label[for="appointmentDate"]', key: 'date_label' },
        { selector: '#appointmentForm label[for="appointmentTime"]', key: 'time_label' },
        { selector: '#appointmentForm label[for="appointmentStatus"]', key: 'status_label' },
        { selector: '#appointmentForm label[for="appointmentComment"]', key: 'comment_label' },
        { selector: '#discountForm label[for="discountServiceId"]', key: 'category_label' },
        { selector: '#discountForm label[for="discountName"]', key: 'discount_name_label' },
        { selector: '#discountForm label[for="discountType"]', key: 'discount_type_label' },
        { selector: '#discountForm label[for="discountValue"]', key: 'discount_value_label' },
        { selector: '#discountForm label[for="discountStartDate"]', key: 'start_date_label' },
        { selector: '#discountForm label[for="discountEndDate"]', key: 'end_date_label' },
        { selector: '#discountForm label[for="discountDescription"]', key: 'description_label' },
        { selector: '#discountForm .checkbox-label span', key: 'discount_active_label' },
        { selector: '#priceServiceForm label[for="priceServiceCategoryId"]', key: 'category_label' },
        { selector: '#priceServiceForm label[for="priceServiceName"]', key: 'service_name_label' },
        { selector: '#priceServiceForm label[for="priceServicePrice"]', key: 'price_label' },
        { selector: '#priceServiceForm label[for="priceServiceUnit"]', key: 'currency_label' },
        { selector: '#priceServiceForm label[for="priceServiceDescription"]', key: 'note_label' },
        { selector: '#priceServiceForm label[for="priceServiceOrder"]', key: 'order_label' },
        { selector: '#priceServiceForm .checkbox-label span', key: 'active_label' },
        { selector: '#categoryForm label[for="categoryName"]', key: 'category_name_label' },
        { selector: '#categoryForm label[for="categoryOrder"]', key: 'category_order_label' },
        { selector: '#categoryForm .checkbox-label span', key: 'category_active_label' },
        { selector: '#viewReviewModal .review-view-author strong', key: 'author_label' },
        { selector: '#viewReviewModal .review-view-user strong', key: 'about_label' },
        { selector: '#viewReviewModal .review-view-rating strong', key: 'rating_label' },
        { selector: '#viewReviewModal .review-view-text strong', key: 'review_text_label' },
        { selector: '#viewReviewModal .review-view-date strong', key: 'date_label' }
    ];
    
    labelMappings.forEach(mapping => {
        const el = document.querySelector(mapping.selector);
        if (el && !el.hasAttribute('data-admin-translate')) {
            const translated = getUIText(mapping.key);
            if (translated && translated !== mapping.key) {
                el.textContent = translated;
            }
        }
    });
    
    document.querySelectorAll('.modal .btn-save').forEach(btn => {
        btn.textContent = getUIText('save_btn');
    });
    document.querySelectorAll('.modal .btn-cancel').forEach(btn => {
        btn.textContent = getUIText('cancel_btn');
    });
    document.querySelectorAll('#viewReviewModal .btn-cancel').forEach(btn => {
        btn.textContent = getUIText('close_btn');
    });
    
    const resetBtn = document.getElementById('resetAppointmentFilters');
    if (resetBtn) resetBtn.textContent = getUIText('btn_reset');
    
    const resetReviewBtn = document.getElementById('resetReviewFilters');
    if (resetReviewBtn) resetReviewBtn.textContent = getUIText('btn_reset');
    
    const resetDiscountBtn = document.getElementById('resetDiscountFilters');
    if (resetDiscountBtn) resetDiscountBtn.textContent = getUIText('btn_reset');
    
    const statLabels = document.querySelectorAll('.stat-label');
    const statKeys = [
        'stat_total_services', 'stat_active_services',
        'stat_total_doctors', 'stat_total_appointments',
        'stat_today_appointments', 'stat_week_appointments',
        'stat_total_reviews', 'stat_published_reviews',
        'stat_hidden_reviews', 'stat_categories',
        'stat_services_count', 'stat_active_discounts',
        'stat_expired_discounts', 'stat_upcoming_discounts'
    ];
    statLabels.forEach((label, idx) => {
        if (statKeys[idx]) label.textContent = getUIText(statKeys[idx]);
    });
    
    const reviewSearch = document.getElementById('reviewSearchFilter');
    if (reviewSearch) reviewSearch.placeholder = getUIText('search_by_name_text');
    
    const priceSearch = document.getElementById('priceSearchFilter');
    if (priceSearch) priceSearch.placeholder = getUIText('search_by_service');
    
    const discountSearch = document.getElementById('discountSearchFilter');
    if (discountSearch) discountSearch.placeholder = getUIText('search_by_name');
    
    const patientHeader = document.querySelector('#tab-appointments .data-table th:nth-child(2)');
    if (patientHeader) {
        patientHeader.textContent = getUIText('th_patient');
    }
    
    const adminLangToggle = document.getElementById('adminLangToggle');
    if (adminLangToggle) {
        adminLangToggle.innerHTML = currentLang === 'ru' ? '🌐 RUS / ENG' : '🌐 ENG / RUS';
    }
}

async function init() {
    console.log('🚀 Инициализация админ-панели...');
    
    initDiscountDatePickers();
    
    const loaded = await loadAllData();
    
    if (!loaded) {
        console.error('❌ Не удалось загрузить данные');
        return;
    }
    
    initDateFilterWithCalendar();
    
    await updateAppointmentFilters();
    await updateCategoryFilters();
    
    await renderServices();
    await updateServiceDetailsFilter();
    await renderServiceDetails();
    await renderDoctors();
    await renderAppointments();
    await renderAdminReviews();
    await renderAdminPrices();
    await renderAdminSchedule();
    await renderAdminDiscounts();
    
    updateAdminUITranslations();
    
    initTabs();
    initMobileMenu();
    initReviewFilters();
    initDiscountFilters();
    
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
    const exportReviewsBtn = document.getElementById('exportReviewsBtn');
    const addPriceCategoryBtn = document.getElementById('addPriceCategoryBtn');
    const addPriceServiceBtn = document.getElementById('addPriceServiceBtn');
    const priceServiceForm = document.getElementById('priceServiceForm');
    const scheduleForm = document.getElementById('scheduleForm');
    const addDiscountBtn = document.getElementById('addDiscountBtn');
    const discountForm = document.getElementById('discountForm');
    const categoryForm = document.getElementById('categoryForm');
    
    const priceCategoryFilter = document.getElementById('priceCategoryFilter');
    const priceSearchFilter = document.getElementById('priceSearchFilter');
    
    const exportPricesBtn = document.getElementById('exportPricesBtn');
    if (exportPricesBtn) {
        exportPricesBtn.addEventListener('click', () => {
            exportPricesToJSON();
        });
    }
    
    if (addServiceBtn) addServiceBtn.addEventListener('click', () => openServiceModal(false));
    if (serviceForm) serviceForm.addEventListener('submit', saveService);
    if (addDetailBtn) addDetailBtn.addEventListener('click', () => openDetailModal(false));
    if (detailForm) detailForm.addEventListener('submit', saveServiceDetail);
    if (detailServiceFilter) detailServiceFilter.addEventListener('change', renderServiceDetails);
    if (addDoctorBtn) addDoctorBtn.addEventListener('click', () => openDoctorModal(false));
    if (doctorForm) doctorForm.addEventListener('submit', saveDoctor);
    if (addAppointmentBtn) addAppointmentBtn.addEventListener('click', () => openAppointmentModal(false));
    if (appointmentForm) appointmentForm.addEventListener('submit', saveAppointment);
    if (appointmentDoctorFilter) appointmentDoctorFilter.addEventListener('change', renderAppointments);
    if (appointmentDateFilter) appointmentDateFilter.addEventListener('change', renderAppointments);
    if (appointmentStatusFilter) appointmentStatusFilter.addEventListener('change', renderAppointments);
    if (resetAppointmentFiltersBtn) resetAppointmentFiltersBtn.addEventListener('click', resetAppointmentFilters);
    if (addPriceCategoryBtn) addPriceCategoryBtn.addEventListener('click', () => openAddCategoryModal());
    if (categoryForm) categoryForm.addEventListener('submit', saveCategory);
    
    if (priceCategoryFilter) {
        priceCategoryFilter.addEventListener('change', () => {
            renderAdminPrices();
        });
    }
    
    if (priceSearchFilter) {
        priceSearchFilter.addEventListener('input', () => {
            renderAdminPrices();
        });
    }
    
    if (exportReviewsBtn) {
        exportReviewsBtn.addEventListener('click', () => {
            const dataStr = JSON.stringify(reviews, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `reviews_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('Отзывы экспортированы', 'success');
        });
    }
    
    if (addPriceServiceBtn) {
        addPriceServiceBtn.addEventListener('click', () => {
            document.getElementById('priceServiceId').value = '';
            document.getElementById('priceServiceForm').reset();
            const discountInfoContainer = document.getElementById('priceServiceDiscountInfo');
            if (discountInfoContainer) discountInfoContainer.style.display = 'none';
            document.getElementById('priceServiceModalTitle').textContent = 'Добавить услугу';
            document.getElementById('priceServiceModal').style.display = 'flex';
        });
    }
    
    if (priceServiceForm) priceServiceForm.addEventListener('submit', savePriceService);
    
    if (scheduleForm) {
        const newScheduleForm = scheduleForm.cloneNode(true);
        scheduleForm.parentNode.replaceChild(newScheduleForm, scheduleForm);
        newScheduleForm.addEventListener('submit', saveSchedule);
        console.log('✅ Обработчик формы расписания добавлен');
    }
    
    if (addDiscountBtn) {
        addDiscountBtn.addEventListener('click', () => {
            document.getElementById('discountId').value = '';
            document.getElementById('discountForm').reset();
            document.getElementById('discountModalTitle').textContent = getUIText('modal_add_discount');
            document.getElementById('discountModal').style.display = 'flex';
        });
    }
    
    if (discountForm) discountForm.addEventListener('submit', saveDiscount);
    
    document.querySelectorAll('.modal-close, .btn-cancel').forEach(btn => {
        btn.addEventListener('click', () => closeModals());
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    document.addEventListener('languageChanged', async () => {
        const currentTab = document.querySelector('.nav-tab.active')?.dataset.tab || 'services';
        
        await loadAllData();
        await updateAppointmentFilters();
        await updateCategoryFilters();
        await renderServices();
        await updateServiceDetailsFilter();
        await renderServiceDetails();
        await renderDoctors();
        await renderAppointments();
        await renderAdminReviews();
        await renderAdminPrices();
        await renderAdminSchedule();
        await renderAdminDiscounts();
        updateAdminUITranslations();
        if (typeof updateAnalyticsTranslations === 'function') {
            updateAnalyticsTranslations();
        }
        
        activateTab(currentTab);
        
        showToast(`Язык изменён на ${getCurrentAdminLang() === 'ru' ? 'русский' : 'английский'}`, 'success');
    });
    
    console.log('✅ Админ-панель инициализирована');
}

document.addEventListener('DOMContentLoaded', init);