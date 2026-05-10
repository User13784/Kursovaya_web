
const API_BASE_URL = 'http://localhost:3000';

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
        'add_service_detail': '+ Добавить детальную услугу',
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
'date_placeholder': 'ДД.ММ.ГГГГ',

        'service_name_label': 'Название услуги *',
        'service_url_label': 'URL страницы *',
        'service_url_hint': 'Путь к файлу страницы услуги',
        'service_bg_label': 'Фоновое изображение',
        'service_title_label': 'Заголовок на странице',
        'service_active_label': 'Активна (показывать на сайте)',

        'service_name_placeholder': 'Например: ДИАГНОСТИКА',
        'service_url_placeholder': 'service-menu2.html',
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

        'action_edit': '✏️ Редакт.',
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
        
        'date_placeholder': 'ДД.ММ.ГГГГ',
        'date_format': 'ДД.ММ.ГГГГ',
        
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
        'stat_upcoming_discounts': 'Предстоящие'
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
        'date_placeholder': 'YYYY-MM-DD',

        'back_to_site': '← Back to site',
        'services_title': 'Manage Services',
        'add_service': '+ Add Service',
        'add_service_detail': '+ Add Service Detail',
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
        'service_url_label': 'Page URL *',
        'service_url_hint': 'Path to service page file',
        'service_bg_label': 'Background Image',
        'service_title_label': 'Page Title',
        'service_active_label': 'Active (show on site)',

        'service_name_placeholder': 'Example: DIAGNOSTICS',
        'service_url_placeholder': 'service-menu2.html',
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

        'action_edit': '✏️ Edit',
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
        
        'date_placeholder': 'YYYY-MM-DD',
        'date_format': 'YYYY-MM-DD',
        
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
        'stat_upcoming_discounts': 'Upcoming'
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
    return name.trim() || 'Unknown';
}

function getServiceNameById(serviceId, services) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return 'Unknown';
    const lang = getCurrentAdminLang();
    if (typeof service.name === 'object') {
        return service.name[lang] || service.name.ru || 'Unknown';
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

let services = [];
let serviceDetails = [];
let doctors = [];
let appointments = [];
let reviews = [];
let pricesData = null;
let scheduleData = null;
let discounts = [];

function initDateMask() {
    const dateInput = document.getElementById('appointmentDateFilter');
    if (!dateInput) return;
    
    const updatePlaceholder = () => {
        const lang = getCurrentAdminLang();
        const placeholder = lang === 'ru' ? 'ДД.ММ.ГГГГ' : 'YYYY-MM-DD';
        dateInput.placeholder = placeholder;
        
        if (dateInput.hasAttribute('placeholder')) {
            dateInput.setAttribute('placeholder', placeholder);
        }
    };
    
    dateInput.addEventListener('input', function(e) {
        const lang = getCurrentAdminLang();
        
        if (lang === 'en') {
            return;
        }
        
        let value = this.value.replace(/[^\d]/g, '');
        
        if (value.length >= 2 && value.length < 4) {
            value = value.substring(0, 2) + '.' + value.substring(2);
        } else if (value.length >= 4 && value.length < 6) {
            value = value.substring(0, 2) + '.' + value.substring(2, 4) + '.' + value.substring(4);
        } else if (value.length >= 6) {
            value = value.substring(0, 2) + '.' + value.substring(2, 4) + '.' + value.substring(4, 8);
        }
        
        this.value = value;
    });
    
    updatePlaceholder();
    document.addEventListener('languageChanged', updatePlaceholder);
}

async function loadAllData() {
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
        
        discounts = localizeArray(await discountsRes.json(), ['name', 'description']);
        
        services = servicesData;
        serviceDetails = serviceDetailsData;
        doctors = doctorsData;
        appointments = await appointmentsRes.json();
        reviews = reviewsData;
        pricesData = pricesDataRaw;
        scheduleData = scheduleDataRaw;
        
        console.log('✅ Все данные загружены с локализацией, язык:', getCurrentAdminLang());
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

function updateAdminUITranslations() {
    const currentLang = getCurrentAdminLang();
    
    document.querySelectorAll('[data-admin-translate]').forEach(el => {
        const key = el.getAttribute('data-admin-translate');
        if (key) {
            const translated = getUIText(key);
            if (translated) {
                el.textContent = translated;
            }
        }
    });
    
    
    const serviceNameInput = document.getElementById('serviceName');
    if (serviceNameInput && serviceNameInput.hasAttribute('placeholder')) {
        serviceNameInput.placeholder = getUIText('service_name_placeholder');
    }
    
    const servicePageInput = document.getElementById('servicePage');
    if (servicePageInput && servicePageInput.hasAttribute('placeholder')) {
        servicePageInput.placeholder = getUIText('service_url_placeholder');
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
    
    const appointmentDateInput = document.getElementById('appointmentDate');
    if (appointmentDateInput && appointmentDateInput.hasAttribute('placeholder')) {
        appointmentDateInput.placeholder = getUIText('date_placeholder');
    }
    
    const dateFilterInput = document.getElementById('appointmentDateFilter');
    if (dateFilterInput && dateFilterInput.hasAttribute('placeholder')) {
        dateFilterInput.placeholder = getUIText('date_placeholder');
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
    
    const scheduleLabels = document.querySelectorAll('#scheduleModal .schedule-day-card label, #scheduleModal .form-group label');
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
    
    // ========== ПЕРЕВОД СТАТИСТИКИ ==========
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
    
    const doctorFilter = document.getElementById('appointmentDoctorFilter');
    if (doctorFilter && doctorFilter.options.length > 1) {
        const oldValue = doctorFilter.value;
        doctorFilter.options[0].textContent = getUIText('filter_all_doctors');
        doctorFilter.value = oldValue;
    }
    
    const statusFilter = document.getElementById('appointmentStatusFilter');
    if (statusFilter && statusFilter.options.length > 1) {
        const statusOptions = ['filter_all_statuses', 'status_pending', 'status_confirmed', 'status_completed', 'status_cancelled'];
        statusFilter.querySelectorAll('option').forEach((opt, idx) => {
            if (statusOptions[idx]) opt.textContent = getUIText(statusOptions[idx]);
        });
    }
    
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
    services.forEach(service => {
        const statusText = service.active ? getUIText('status_active') : getUIText('status_inactive');
        const statusClass = service.active ? 'status-active' : 'status-inactive';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.id}</td>
            <td><strong>${escapeHtml(service.name)}</strong></td>
            <td><code>${escapeHtml(service.page)}</code></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-service" data-id="${service.id}">${getUIText('action_edit')}</button>
                <button class="btn-delete-service" data-id="${service.id}">${getUIText('action_delete')}</button>
              </td>
        `;
        tbody.appendChild(row);
    });
    
    document.querySelectorAll('.btn-edit-service').forEach(btn => {
        btn.addEventListener('click', () => editService(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-service').forEach(btn => {
        btn.addEventListener('click', () => deleteService(parseInt(btn.dataset.id)));
    });
}

async function deleteService(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;
    if (confirm(`Удалить услугу "${service.name}"?`)) {
        try {
            await fetch(`${API_BASE_URL}/services/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderServices();
            await updateServiceDetailsFilter();
            await updateAppointmentFilters();
            showToast(`Услуга "${service.name}" удалена`);
        } catch (error) {
            showToast('Ошибка удаления', 'error');
        }
    }
}

async function saveService(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('serviceId').value);
    const name = document.getElementById('serviceName').value.trim();
    const page = document.getElementById('servicePage').value.trim();
    const bgImage = document.getElementById('serviceBgImage').value.trim();
    const title = document.getElementById('serviceTitle').value.trim();
    const active = document.getElementById('serviceActive').checked;
    
    if (!name || !page) {
        showToast('Заполните обязательные поля', 'error');
        return;
    }
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/services/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name, page, bgImage, title, active, order: id })
            });
            showToast(`Услуга "${name}" обновлена`);
        } else {
            const newId = Date.now();
            await fetch(`${API_BASE_URL}/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: newId, name, page, bgImage, title, active, order: services.length + 1 })
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
        showToast('Ошибка сохранения', 'error');
    }
}

function openServiceModal(editMode = false, serviceData = null) {
    document.getElementById('serviceModalTitle').textContent = editMode ? getUIText('modal_edit_service') : getUIText('modal_add_service');
    if (serviceData) {
        document.getElementById('serviceId').value = serviceData.id;
        document.getElementById('serviceName').value = serviceData.name;
        document.getElementById('servicePage').value = serviceData.page;
        document.getElementById('serviceBgImage').value = serviceData.bgImage || '';
        document.getElementById('serviceTitle').value = serviceData.title || '';
        document.getElementById('serviceActive').checked = serviceData.active;
    } else {
        document.getElementById('serviceForm').reset();
        document.getElementById('serviceId').value = '';
        document.getElementById('serviceActive').checked = true;
    }
    document.getElementById('serviceModal').style.display = 'flex';
}

function editService(id) {
    const service = services.find(s => s.id === id);
    if (service) {
        openServiceModal(true, service);
    }
}

async function renderServiceDetails() {
    const tbody = document.getElementById('serviceDetailsList');
    const filterValue = document.getElementById('detailServiceFilter')?.value || '';
    if (!tbody) return;
    
    let filtered = [...serviceDetails];
    if (filterValue) {
        filtered = filtered.filter(d => d.serviceId == filterValue);
    }
    
    tbody.innerHTML = '';
    for (const detail of filtered) {
        const service = services.find(s => s.id === detail.serviceId);
        const serviceName = service ? service.name : 'Неизвестно';
        const hasContent = detail.mainText || detail.features || detail.steps;
        const statusText = hasContent ? getUIText('detail_filled') : getUIText('detail_empty');
        const statusClass = hasContent ? 'status-active' : 'status-inactive';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${detail.id}</td>
            <td><strong>${escapeHtml(serviceName)}</strong></td>
            <td>${detail.mainText ? detail.mainText.substring(0, 50) + '...' : '—'}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-detail" data-id="${detail.id}">${getUIText('action_edit')}</button>
                <button class="btn-delete-detail" data-id="${detail.id}">${getUIText('action_delete')}</button>
              </td>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.btn-edit-detail').forEach(btn => {
        btn.addEventListener('click', () => editServiceDetail(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-detail').forEach(btn => {
        btn.addEventListener('click', () => deleteServiceDetail(parseInt(btn.dataset.id)));
    });
}

async function updateServiceDetailsFilter() {
    const filter = document.getElementById('detailServiceFilter');
    if (!filter) return;
    filter.innerHTML = `<option value="">${getUIText('filter_all_services')}</option>`;
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        filter.appendChild(option);
    });
}

async function deleteServiceDetail(id) {
    const detail = serviceDetails.find(d => d.id === id);
    if (!detail) return;
    if (confirm(`Удалить детальную информацию?`)) {
        try {
            await fetch(`${API_BASE_URL}/serviceDetails/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderServiceDetails();
            showToast('Детальная информация удалена');
        } catch (error) {
            showToast('Ошибка удаления', 'error');
        }
    }
}

async function saveServiceDetail(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('detailId').value);
    const serviceId = parseInt(document.getElementById('detailServiceId').value);
    const mainText = document.getElementById('detailMainText').value;
    const secondaryText = document.getElementById('detailSecondaryText').value;
    const features = document.getElementById('detailFeatures').value;
    const steps = document.getElementById('detailSteps').value;
    const images = document.getElementById('detailImages').value;
    
    if (!serviceId) {
        showToast('Выберите услугу', 'error');
        return;
    }
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/serviceDetails/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, serviceId, mainText, secondaryText, features, steps, images })
            });
            showToast('Детальная информация обновлена');
        } else {
            const newId = Date.now();
            await fetch(`${API_BASE_URL}/serviceDetails`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: newId, serviceId, mainText, secondaryText, features, steps, images })
            });
            showToast('Детальная информация добавлена');
        }
        
        await loadAllData();
        await renderServiceDetails();
        
        document.getElementById('detailModal').style.display = 'none';
        document.getElementById('detailForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}

function openDetailModal(editMode = false, detailData = null) {
    document.getElementById('detailModalTitle').textContent = editMode ? 'Редактировать детальную информацию' : 'Добавить детальную информацию';
    
    const serviceSelect = document.getElementById('detailServiceId');
    serviceSelect.innerHTML = '<option value="">-- Выберите услугу --</option>';
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        serviceSelect.appendChild(option);
    });
    
    if (detailData) {
        document.getElementById('detailId').value = detailData.id;
        document.getElementById('detailServiceId').value = detailData.serviceId;
        document.getElementById('detailMainText').value = detailData.mainText || '';
        document.getElementById('detailSecondaryText').value = detailData.secondaryText || '';
        document.getElementById('detailFeatures').value = detailData.features || '';
        document.getElementById('detailSteps').value = detailData.steps || '';
        document.getElementById('detailImages').value = detailData.images || '';
    } else {
        document.getElementById('detailForm').reset();
        document.getElementById('detailId').value = '';
    }
    document.getElementById('detailModal').style.display = 'flex';
}

function editServiceDetail(id) {
    const detail = serviceDetails.find(d => d.id === id);
    if (detail) {
        openDetailModal(true, detail);
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
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.photo ? `<img src="${doctor.photo}" class="doctor-photo-cell" onerror="this.src='../assets/images/placeholder.jpg'">` : '—'}</td>
            <td><strong>${escapeHtml(fullName)}</strong></td>
            <td>${escapeHtml(doctor.specialization)}</span></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-doctor" data-id="${doctor.id}">${getUIText('action_edit')}</button>
                <button class="btn-delete-doctor" data-id="${doctor.id}">${getUIText('action_delete')}</button>
              </td>
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

async function deleteDoctor(id) {
    const doctor = doctors.find(d => d.id === id);
    if (!doctor) return;
    if (confirm(`Удалить врача "${getDoctorFullName(doctor)}"?`)) {
        try {
            await fetch(`${API_BASE_URL}/doctors/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderDoctors();
            await updateAppointmentFilters();
            showToast(`Врач ${getDoctorFullName(doctor)} удален`);
        } catch (error) {
            showToast('Ошибка удаления', 'error');
        }
    }
}

async function saveDoctor(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('doctorId').value);
    const lastName = document.getElementById('doctorLastName').value.trim();
    const firstName = document.getElementById('doctorFirstName').value.trim();
    const middleName = document.getElementById('doctorMiddleName').value.trim();
    const specialization = document.getElementById('doctorSpecialization').value.trim();
    const photo = document.getElementById('doctorPhoto').value.trim();
    const education = document.getElementById('doctorEducation').value;
    const experience = document.getElementById('doctorExperience').value.trim();
    const improvement = document.getElementById('doctorImprovement').value;
    const schedule = document.getElementById('doctorSchedule').value.trim();
    const active = document.getElementById('doctorActive').checked;
    
    if (!lastName || !firstName || !specialization) {
        showToast('Заполните обязательные поля (Фамилия, Имя, Специализация)', 'error');
        return;
    }
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/doctors/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, lastName, firstName, middleName, specialization, photo, education, experience, improvement, schedule, active })
            });
            showToast(`Врач ${lastName} ${firstName} обновлен`);
        } else {
            const newId = Date.now();
            await fetch(`${API_BASE_URL}/doctors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: newId, lastName, firstName, middleName, specialization, photo, education, experience, improvement, schedule, active })
            });
            showToast(`Врач ${lastName} ${firstName} добавлен`);
        }
        
        await loadAllData();
        await renderDoctors();
        await updateAppointmentFilters();
        
        document.getElementById('doctorModal').style.display = 'none';
        document.getElementById('doctorForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}

function openDoctorModal(editMode = false, doctorData = null) {
    document.getElementById('doctorModalTitle').textContent = editMode ? getUIText('modal_edit_doctor') : getUIText('modal_add_doctor');
    if (doctorData) {
        document.getElementById('doctorId').value = doctorData.id;
        document.getElementById('doctorLastName').value = doctorData.lastName || '';
        document.getElementById('doctorFirstName').value = doctorData.firstName || '';
        document.getElementById('doctorMiddleName').value = doctorData.middleName || '';
        document.getElementById('doctorSpecialization').value = doctorData.specialization || '';
        document.getElementById('doctorPhoto').value = doctorData.photo || '';
        document.getElementById('doctorEducation').value = doctorData.education || '';
        document.getElementById('doctorExperience').value = doctorData.experience || '';
        document.getElementById('doctorImprovement').value = doctorData.improvement || '';
        document.getElementById('doctorSchedule').value = doctorData.schedule || '';
        document.getElementById('doctorActive').checked = doctorData.active;
    } else {
        document.getElementById('doctorForm').reset();
        document.getElementById('doctorId').value = '';
        document.getElementById('doctorActive').checked = true;
    }
    document.getElementById('doctorModal').style.display = 'flex';
}

function editDoctor(id) {
    const doctor = doctors.find(d => d.id === id);
    if (doctor) {
        openDoctorModal(true, doctor);
    }
}

async function renderAppointments() {
    const tbody = document.getElementById('appointmentsList');
    if (!tbody) return;
    
    const doctorFilter = document.getElementById('appointmentDoctorFilter')?.value || '';
    let dateFilter = document.getElementById('appointmentDateFilter')?.value || '';
    const statusFilter = document.getElementById('appointmentStatusFilter')?.value || '';
    
    let filtered = [...appointments];
    
    const lang = getCurrentAdminLang();
    if (dateFilter && lang === 'ru' && dateFilter.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
        const parts = dateFilter.split('.');
        dateFilter = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    
    if (doctorFilter) {
        filtered = filtered.filter(a => a.doctorId == doctorFilter);
    }
    if (dateFilter) {
        filtered = filtered.filter(a => a.date === dateFilter);
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
    
    for (const app of filtered) {
        const doctor = doctors.find(d => d.id === app.doctorId);
        let doctorName = 'Unknown';
        if (doctor) {
            if (lang === 'en') {
                const lastName = doctor.lastName?.en || doctor.lastName?.ru || doctor.lastName || '';
                const firstName = doctor.firstName?.en || doctor.firstName?.ru || doctor.firstName || '';
                doctorName = `${lastName} ${firstName}`.trim();
                if (!doctorName) doctorName = 'Unknown';
            } else {
                doctorName = getDoctorFullName(doctor);
            }
        }
        
        const serviceName = getServiceNameById(app.serviceId, services);
        
        const statusMap = {
            pending: getUIText('status_pending'),
            confirmed: getUIText('status_confirmed'),
            completed: getUIText('status_completed'),
            cancelled: getUIText('status_cancelled')
        };
        const statusText = statusMap[app.status] || app.status;
        
        let displayDate = app.date;
        if (lang === 'ru' && app.date) {
            const parts = app.date.split('-');
            if (parts.length === 3) {
                displayDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
            }
        }
        
        let patientName = app.patientName;
        if (typeof patientName === 'object') {
            patientName = patientName[lang] || patientName.ru || JSON.stringify(patientName);
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.id}</td>
            <td><strong>${escapeHtml(patientName)}</strong></span></td>
            <td>${escapeHtml(app.phone)}</span></td>
            <td>${escapeHtml(doctorName)}</span></td>
            <td>${escapeHtml(serviceName)}</span></td>
            <td>${displayDate}</span></td>
            <td>${app.time}</span></td>
            <td><span class="status-badge status-${app.status}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-appointment" data-id="${app.id}" title="${getUIText('action_edit')}">${getUIText('action_edit_small')}</button>
                <button class="btn-delete-appointment" data-id="${app.id}" title="${getUIText('action_delete')}">${getUIText('action_delete_small')}</button>
                ${app.status === 'pending' ? `<button class="btn-confirm-appointment" data-id="${app.id}" title="${getUIText('action_confirm')}">${getUIText('action_confirm')}</button>` : ''}
                ${app.status === 'confirmed' ? `<button class="btn-complete-appointment" data-id="${app.id}" title="${getUIText('action_complete')}">${getUIText('action_complete')}</button>` : ''}
              </td>
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

async function updateAppointmentFilters() {
    const doctorFilter = document.getElementById('appointmentDoctorFilter');
    if (doctorFilter) {
        doctorFilter.innerHTML = `<option value="">${getUIText('filter_all_doctors')}</option>`;
        doctors.filter(d => d.active).forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = getDoctorFullName(doctor);
            doctorFilter.appendChild(option);
        });
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
        services.filter(s => s.active).forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    }
    
    const doctorSelect = document.getElementById('appointmentDoctorId');
    if (doctorSelect) {
        doctorSelect.innerHTML = '<option value="">-- Выберите врача --</option>';
        doctors.filter(d => d.active).forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = getDoctorFullName(doctor);
            doctorSelect.appendChild(option);
        });
    }
}

async function deleteAppointment(id) {
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) return;
    if (confirm(`Удалить запись пациента "${appointment.patientName}"?`)) {
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
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/appointments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, patientName, phone, email, doctorId, serviceId, date, time, comment, status, createdAt: new Date().toISOString() })
            });
            showToast(`Запись для ${patientName} обновлена`);
        } else {
            const newId = Date.now();
            await fetch(`${API_BASE_URL}/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: newId, patientName, phone, email, doctorId, serviceId, date, time, comment, status, createdAt: new Date().toISOString() })
            });
            showToast(`Запись для ${patientName} добавлена`);
        }
        
        await loadAllData();
        await renderAppointments();
        
        document.getElementById('appointmentModal').style.display = 'none';
        document.getElementById('appointmentForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}

function openAppointmentModal(editMode = false, appointmentData = null) {
    document.getElementById('appointmentModalTitle').textContent = editMode ? getUIText('modal_edit_appointment') : getUIText('modal_new_appointment');
    
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
    document.getElementById('appointmentModal').style.display = 'flex';
}

function editAppointment(id) {
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
        openAppointmentModal(true, appointment);
    }
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
    
    const statusFilterSelect = document.getElementById('reviewStatusFilter');
    if (statusFilterSelect) {
        if (statusFilterSelect.options.length >= 3) {
            statusFilterSelect.options[0].textContent = getUIText('filter_all_statuses');
            statusFilterSelect.options[1].textContent = getUIText('filter_published');
            statusFilterSelect.options[2].textContent = getUIText('filter_hidden');
        }
    }
    
    tbody.innerHTML = '';
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Нет отзывов для отображения</td></tr>';
        return;
    }
    
    for (const review of filtered) {
        const statusText = review.published ? getUIText('status_published') : getUIText('status_hidden');
        const statusClass = review.published ? 'status-published' : 'status-hidden';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${review.id}</td>
            <td><strong>${escapeHtml(review.author)}</strong><br><small>${escapeHtml(review.email || '')}</small></td>
            <td><div class="review-text-preview" title="${escapeHtml(review.text)}">${escapeHtml(review.text.substring(0, 100))}...</div></td>
            <td><div class="rating-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div></td>
            <td>${review.date || review.createdAt?.split('T')[0] || ''}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-view-review" data-id="${review.id}">👁️</button>
                <button class="btn-toggle-review" data-id="${review.id}">${review.published ? getUIText('action_hide') : getUIText('action_publish')}</button>
                <button class="btn-delete-review" data-id="${review.id}">${getUIText('action_delete_small')}</button>
              </td>
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
    
    document.getElementById('viewAuthor').textContent = review.author;
    document.getElementById('viewUserInfo').textContent = review.userInfo || '';
    document.getElementById('viewRating').innerHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    document.getElementById('viewText').textContent = review.text;
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

async function renderAdminPrices() {
    const container = document.getElementById('pricesAdminContainer');
    if (!container) return;
    
    const lang = getCurrentAdminLang();
    const categoryFilter = document.getElementById('priceCategoryFilter')?.value || 'all';
    const searchFilter = document.getElementById('priceSearchFilter')?.value.toLowerCase() || '';
    
    let categories = pricesData?.categories?.filter(c => c.active) || [];
    let servicesList = pricesData?.services?.filter(s => s.active) || [];
    
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
    
    const totalCategories = document.getElementById('totalCategories');
    const totalPriceServices = document.getElementById('totalPriceServices');
    if (totalCategories) totalCategories.textContent = categories.length;
    if (totalPriceServices) totalPriceServices.textContent = servicesList.length;
    
    const categorySelect = document.getElementById('priceCategoryFilter');
    if (categorySelect && categorySelect.options.length <= 1 && pricesData?.categories) {
        categorySelect.innerHTML = `<option value="all">${getUIText('filter_all_categories')}</option>`;
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.localizedName;
            categorySelect.appendChild(option);
        });
    }
    
    if (categories.length === 0) {
        container.innerHTML = '<div class="empty-prices" style="text-align: center; padding: 40px; color: #6B7280;">Нет категорий для отображения</div>';
        return;
    }
    
    let html = '<div class="prices-admin-list">';
    for (const category of categories) {
        const categoryServices = servicesList.filter(s => s.categoryId === category.id);
        if (categoryServices.length === 0) continue;
        
        const categoryDiscount = getDiscountByCategoryId(category.id);
        
        const discountLabel = getUIText('discount_label');
        const untilLabel = getUIText('until_label');
        
        let discountHtml = '';
        if (categoryDiscount) {
            const discountValue = categoryDiscount.type === 'percentage' 
                ? categoryDiscount.value + '%' 
                : categoryDiscount.value + ' BYN';
            const dateText = categoryDiscount.endDate ? ` ${untilLabel} ${categoryDiscount.endDate}` : '';
            discountHtml = `
                <span style="background: #EF4444; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-left: 12px;">
                    ${discountLabel}: ${discountValue}${dateText}
                </span>
            `;
        }
        
        html += `
            <div class="price-category-card" style="background: white; border-radius: 16px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" data-category-id="${category.id}">
                <div class="price-category-header" style="cursor: pointer; background: #2F353B; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; flex-wrap: wrap;">
                        <h3 style="color: white; margin: 0;">${escapeHtml(category.localizedName)}</h3>
                        ${discountHtml}
                    </div>
                    <div>
                        <span style="background: #A5C33C; color: #1a1e22; padding: 4px 10px; border-radius: 20px; font-size: 12px; margin-right: 15px;">${categoryServices.length} ${getUIText('stat_services_count')}</span>
                        <button class="btn-edit-category" data-id="${category.id}" style="background: #E0E7FF; color: #4338CA; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; margin-right: 5px;" title="Редактировать категорию">✏️</button>
                        <button class="btn-delete-category" data-id="${category.id}" style="background: #FEE2E2; color: #DC2626; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer;" title="Удалить категорию">🗑️</button>
                        <span class="price-category-toggle" style="color: white; font-size: 20px; margin-left: 10px;">▼</span>
                    </div>
                </div>
                <div class="category-content" style="display: block; padding: 20px; background: white; overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
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
            
            html += `
                <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td style="padding: 12px 15px; word-break: break-word;"><strong>${escapeHtml(serviceName)}</strong></td>
                    <td style="padding: 12px 15px; vertical-align: top;">${priceDisplay}</td>
                    <td style="padding: 12px 15px; vertical-align: top;">${getCurrencyHtml(service.unit)}</span></td>
                    <td style="padding: 12px 15px; vertical-align: top; word-break: break-word;">${escapeHtml(serviceDescription)}</span></td>
                    <td style="padding: 12px 15px; vertical-align: top; white-space: nowrap;">
                        <button class="btn-edit-price-service" data-id="${service.id}" data-category-id="${category.id}" style="background: #E0E7FF; color: #4338CA; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; margin-right: 5px;">${getUIText('action_edit_small')}</button>
                        <button class="btn-delete-price-service" data-id="${service.id}" style="background: #FEE2E2; color: #DC2626; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer;">${getUIText('action_delete_small')}</button>
                    </span>
                </tr>
            `;
        }
        html += `</tbody></table></div></div>`;
    }
    html += '</div>';
    
    container.innerHTML = html;
    
    document.querySelectorAll('.btn-edit-category').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            editCategory(parseInt(btn.dataset.id));
        });
    });
    
    document.querySelectorAll('.btn-delete-category').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteCategory(parseInt(btn.dataset.id));
        });
    });
    
    document.querySelectorAll('.btn-edit-price-service').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const serviceId = parseInt(btn.dataset.id);
            const categoryId = parseInt(btn.dataset.categoryId);
            editPriceService(serviceId, categoryId);
        });
    });
    document.querySelectorAll('.btn-delete-price-service').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deletePriceService(parseInt(btn.dataset.id));
        });
    });
    
    document.querySelectorAll('.price-category-header').forEach(header => {
        header.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            const content = this.nextElementSibling;
            const toggle = this.querySelector('.price-category-toggle');
            if (content.style.display === 'none') {
                content.style.display = 'block';
                if (toggle) toggle.style.transform = 'rotate(0deg)';
            } else {
                content.style.display = 'none';
                if (toggle) toggle.style.transform = 'rotate(180deg)';
            }
        });
    });
}

async function editPriceService(id, categoryId) {
    const service = pricesData?.services?.find(s => s.id === id);
    if (!service) return;
    
    const categorySelect = document.getElementById('priceServiceCategoryId');
    categorySelect.innerHTML = '<option value="">-- Выберите категорию --</option>';
    pricesData?.categories?.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
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
        await fetch(`${API_BASE_URL}/prices`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pricesData)
        });
        await loadAllData();
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
        const newId = Date.now();
        pricesData.services.push({ id: newId, categoryId, name, price, unit, description, order, active });
    }
    
    try {
        await fetch(`${API_BASE_URL}/prices`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pricesData)
        });
        await loadAllData();
        await renderAdminPrices();
        showToast('Услуга сохранена', 'success');
        document.getElementById('priceServiceModal').style.display = 'none';
        document.getElementById('priceServiceForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
    }
}


async function openAddCategoryModal() {
    if (!pricesData) {
        pricesData = { version: '2.0', categories: [], services: [] };
    }
    if (!pricesData.categories) pricesData.categories = [];
    
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryOrder').value = pricesData.categories.length + 1;
    document.getElementById('categoryActive').checked = true;
    
    document.getElementById('categoryModalTitle').textContent = getUIText('modal_add_category');
    document.getElementById('categoryModal').style.display = 'flex';
}

async function editCategory(categoryId) {
    const category = pricesData?.categories?.find(c => c.id === categoryId);
    if (!category) return;
    
    document.getElementById('categoryId').value = category.id;
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categoryOrder').value = category.order || 0;
    document.getElementById('categoryActive').checked = category.active !== false;
    
    document.getElementById('categoryModalTitle').textContent = getUIText('modal_edit_category');
    document.getElementById('categoryModal').style.display = 'flex';
}

async function deleteCategory(categoryId) {
    const category = pricesData?.categories?.find(c => c.id === categoryId);
    if (!category) return;
    
    const servicesInCategory = pricesData?.services?.filter(s => s.categoryId === categoryId) || [];
    
    let confirmMessage = `Удалить категорию "${category.name}"?`;
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
        
        await savePricesData();
        await renderAdminPrices();
        await updateCategoryFilters();
        showToast(`Категория "${category.name}" удалена`, 'success');
    }
}

async function saveCategory(event) {
    event.preventDefault();
    
    const id = parseInt(document.getElementById('categoryId').value);
    const name = document.getElementById('categoryName').value.trim();
    const order = parseInt(document.getElementById('categoryOrder').value) || 999;
    const active = document.getElementById('categoryActive').checked;
    
    if (!name) {
        showToast('Введите название категории', 'error');
        return;
    }
    
    if (!pricesData) {
        pricesData = { version: '2.0', categories: [], services: [] };
    }
    if (!pricesData.categories) pricesData.categories = [];
    
    if (id) {
        const index = pricesData.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            pricesData.categories[index] = {
                ...pricesData.categories[index],
                name: name,
                order: order,
                active: active
            };
        }
        showToast(`Категория "${name}" обновлена`, 'success');
    } else {
        const newId = Date.now();
        pricesData.categories.push({
            id: newId,
            name: name,
            order: order,
            active: active
        });
        showToast(`Категория "${name}" добавлена`, 'success');
    }
    
    pricesData.categories.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    await savePricesData();
    await renderAdminPrices();
    await updateCategoryFilters();
    
    document.getElementById('categoryModal').style.display = 'none';
    document.getElementById('categoryForm').reset();
}

async function savePricesData() {
    try {
        await fetch(`${API_BASE_URL}/prices`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pricesData)
        });
        return true;
    } catch (error) {
        console.error('Ошибка сохранения прайс-листа:', error);
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
        pricesData.categories.filter(c => c.active !== false).forEach(cat => {
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
        pricesData.categories.filter(c => c.active !== false).forEach(cat => {
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
        pricesData.categories.filter(c => c.active !== false).forEach(cat => {
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
        pricesData.categories.filter(c => c.active !== false).forEach(cat => {
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
}


async function renderAdminSchedule() {
    const container = document.getElementById('scheduleAdminContainer');
    if (!container) return;
    
    let doctorsList = [];
    let scheduleList = [];
    
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
    
    const totalDoctorsSchedule = document.getElementById('totalDoctorsSchedule');
    if (totalDoctorsSchedule) totalDoctorsSchedule.textContent = doctorsList.length;
    
    if (doctorsList.length === 0) {
        container.innerHTML = '<div class="empty-schedule" style="text-align: center; padding: 40px; color: #6B7280;">Нет данных о врачах</div>';
        return;
    }
    
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
    
    let html = '<div class="schedule-admin-list">';
    
    for (const doctor of doctorsList) {
        const doctorSchedule = scheduleList.filter(s => s.doctorId === doctor.id);
        doctorSchedule.sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
        
        let doctorName = '';
        if (doctor.name) {
            if (typeof doctor.name === 'object') {
                const lang = getCurrentAdminLang();
                doctorName = doctor.name[lang] || doctor.name.ru || '';
            } else {
                doctorName = doctor.name;
            }
        } else if (doctor.lastName || doctor.firstName) {
            const lang = getCurrentAdminLang();
            let lastName = '', firstName = '';
            if (typeof doctor.lastName === 'object') {
                lastName = doctor.lastName[lang] || doctor.lastName.ru || '';
            } else {
                lastName = doctor.lastName || '';
            }
            if (typeof doctor.firstName === 'object') {
                firstName = doctor.firstName[lang] || doctor.firstName.ru || '';
            } else {
                firstName = doctor.firstName || '';
            }
            doctorName = `${lastName} ${firstName}`.trim();
        }
        
        if (!doctorName) doctorName = 'Врач';
        
        let doctorSpecialization = '';
        if (doctor.specialization) {
            if (typeof doctor.specialization === 'object') {
                const lang = getCurrentAdminLang();
                doctorSpecialization = doctor.specialization[lang] || doctor.specialization.ru || '';
            } else {
                doctorSpecialization = doctor.specialization;
            }
        }
        
        html += `
            <div class="doctor-schedule-card-admin" data-doctor-id="${doctor.id}" style="background: white; border-radius: 16px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div class="doctor-schedule-header-admin" style="cursor: pointer; background: #2F353B; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h3 style="color: white; margin: 0;">${escapeHtml(doctorName)}</h3>
                        ${doctorSpecialization ? `<span style="color: #A5C33C; font-size: 14px;">${escapeHtml(doctorSpecialization)}</span>` : ''}
                    </div>
                    <span class="doctor-schedule-toggle" style="color: white; font-size: 20px;">▼</span>
                </div>
                <div class="schedule-content" style="display: block; padding: 20px; overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
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
                                <th style="padding: 12px 15px; text-align: left;">${getUIText('th_note')}</th>
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
                         </span>
                        <td style="padding: 12px 15px;">${escapeHtml(breakTime)}</span>
                        <td style="padding: 12px 15px;">
                            <button class="btn-edit-schedule" data-doctor="${doctor.id}" data-day="${schedule.day}" style="background: #E0E7FF; color: #4338CA; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer;">
                                ${getUIText('action_edit_small')}
                            </button>
                         </span>
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
    html += '</div>';
    
    container.innerHTML = html;
    
    document.querySelectorAll('.doctor-schedule-header-admin').forEach(header => {
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        newHeader.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            const content = this.nextElementSibling;
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
            openScheduleModal(parseInt(newBtn.dataset.doctor), newBtn.dataset.day);
        });
    });
}

function openScheduleModal(doctorId, day) {
    const doctor = scheduleData?.doctors?.find(d => d.id === doctorId);
    if (!doctor) return;
    
    const schedule = scheduleData?.schedule?.find(s => s.doctorId === doctorId && s.day === day);
    
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
    const dayCards = document.querySelectorAll('.schedule-day-card');
    
    if (dayCards.length === 0) {
        const container = document.querySelector('.schedule-days-container');
        if (container) {
            const days = [getUIText('monday'), getUIText('tuesday'), getUIText('wednesday'), getUIText('thursday'), getUIText('friday'), getUIText('saturday'), getUIText('sunday')];
            const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            container.innerHTML = '';
            days.forEach((d, idx) => {
                container.innerHTML += `
                    <div class="schedule-day-card" style="background: #F9FAFB; border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                        <h4 style="margin: 0 0 15px 0; color: #2F353B;">${d}</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="checkbox-label"><input type="checkbox" class="schedule-working" data-day="${dayKeys[idx]}"> Рабочий день</label>
                            </div>
                        </div>
                        <div class="form-row work-hours-row" style="display: flex; gap: 15px; margin-top: 10px;" data-day="${dayKeys[idx]}">
                            <div class="form-group"><label>Начало работы</label><input type="time" class="schedule-start" data-day="${dayKeys[idx]}"></div>
                            <div class="form-group"><label>Конец работы</label><input type="time" class="schedule-end" data-day="${dayKeys[idx]}"></div>
                            <div class="form-group"><label>Начало перерыва</label><input type="time" class="schedule-break-start" data-day="${dayKeys[idx]}"></div>
                            <div class="form-group"><label>Конец перерыва</label><input type="time" class="schedule-break-end" data-day="${dayKeys[idx]}"></div>
                        </div>
                    </div>
                `;
            });
        }
    }
    
    const updatedCards = document.querySelectorAll('.schedule-day-card');
    updatedCards.forEach((card, idx) => {
        const workingCheckbox = card.querySelector('.schedule-working');
        const startInput = card.querySelector('.schedule-start');
        const endInput = card.querySelector('.schedule-end');
        const breakStartInput = card.querySelector('.schedule-break-start');
        const breakEndInput = card.querySelector('.schedule-break-end');
        
        if (idx === dayIndex && schedule) {
            workingCheckbox.checked = schedule.isWorking;
            startInput.value = schedule.timeStart || '';
            endInput.value = schedule.timeEnd || '';
            breakStartInput.value = schedule.breakStart || '';
            breakEndInput.value = schedule.breakEnd || '';
        } else if (idx === dayIndex) {
            workingCheckbox.checked = true;
            startInput.value = '09:00';
            endInput.value = '18:00';
            breakStartInput.value = '13:00';
            breakEndInput.value = '14:00';
        }
    });
    
    let doctorName = doctor.name;
    if (typeof doctorName === 'object') {
        const lang = getCurrentAdminLang();
        doctorName = doctorName[lang] || doctorName.ru || '';
    }
    
    const dayNameRu = getDayNameRussian(day);
    document.getElementById('scheduleModalTitle').textContent = `Настройка расписания - ${doctorName} (${dayNameRu})`;
    document.getElementById('scheduleModal').style.display = 'flex';
}

function getDayNameRussian(day) {
    const days = { monday: 'Понедельник', tuesday: 'Вторник', wednesday: 'Среда', thursday: 'Четверг', friday: 'Пятница', saturday: 'Суббота', sunday: 'Воскресенье' };
    return days[day] || day;
}

async function saveSchedule(event) {
    event.preventDefault();
    const doctorId = parseInt(document.getElementById('scheduleDoctorId').value);
    
    if (!doctorId) {
        showToast('Выберите врача', 'error');
        return;
    }
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = [getUIText('monday'), getUIText('tuesday'), getUIText('wednesday'), getUIText('thursday'), getUIText('friday'), getUIText('saturday'), getUIText('sunday')];
    
    const dayCards = document.querySelectorAll('.schedule-day-card');
    const newSchedule = [];
    
    for (let i = 0; i < days.length; i++) {
        const card = dayCards[i];
        const isWorking = card.querySelector('.schedule-working').checked;
        const startTime = card.querySelector('.schedule-start').value;
        const endTime = card.querySelector('.schedule-end').value;
        const breakStart = card.querySelector('.schedule-break-start').value;
        const breakEnd = card.querySelector('.schedule-break-end').value;
        
        const existingSchedule = scheduleData.schedule.find(s => s.doctorId === doctorId && s.day === days[i]);
        const id = existingSchedule ? existingSchedule.id : Date.now() + i;
        
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
        await fetch(`${API_BASE_URL}/schedule`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scheduleData)
        });
        await loadAllData();
        await renderAdminSchedule();
        showToast('Расписание сохранено', 'success');
        document.getElementById('scheduleModal').style.display = 'none';
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
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
        categoryFilterSelect.innerHTML = `<option value="all">${getUIText('filter_all_categories')}</option>`;
        pricesData.categories.forEach(cat => {
            if (cat.active) {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.name;
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
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${discount.id}</td>
            <td>${category ? escapeHtml(category.name) : '—'}</td>
            <td><strong>${escapeHtml(discount.name)}</strong></td>
            <td>${discountType}</td>
            <td>${discountValue}</td>
            <td>${periodText}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-edit-discount" data-id="${discount.id}">${getUIText('action_edit_small')}</button>
                <button class="btn-delete-discount" data-id="${discount.id}">${getUIText('action_delete_small')}</button>
                <button class="btn-toggle-discount" data-id="${discount.id}">${discount.active ? getUIText('action_deactivate') : getUIText('action_activate')}</button>
              </td>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.btn-edit-discount').forEach(btn => {
        btn.addEventListener('click', () => editDiscount(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-delete-discount').forEach(btn => {
        btn.addEventListener('click', () => deleteDiscount(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-toggle-discount').forEach(btn => {
        btn.addEventListener('click', () => toggleDiscountStatus(parseInt(btn.dataset.id)));
    });
}

async function editDiscount(id) {
    const discount = discounts.find(d => d.id === id);
    if (!discount) return;
    
    const categorySelect = document.getElementById('discountServiceId');
    categorySelect.innerHTML = '<option value="">-- Выберите категорию --</option>';
    if (pricesData?.categories) {
        pricesData.categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
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

async function deleteDiscount(id) {
    if (confirm('Удалить эту скидку?')) {
        try {
            await fetch(`${API_BASE_URL}/discounts/${id}`, { method: 'DELETE' });
            await loadAllData();
            await renderAdminDiscounts();
            showToast('Скидка удалена', 'success');
        } catch (error) {
            showToast('Ошибка при удалении', 'error');
        }
    }
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
    const name = document.getElementById('discountName').value.trim();
    const type = document.getElementById('discountType').value;
    const value = parseFloat(document.getElementById('discountValue').value);
    const startDate = document.getElementById('discountStartDate').value;
    const endDate = document.getElementById('discountEndDate').value;
    const description = document.getElementById('discountDescription').value;
    const active = document.getElementById('discountActive').checked;
    
    if (!discountCategoryId || !name || !value) {
        showToast('Заполните обязательные поля', 'error');
        return;
    }
    
    const discountData = { id, discountCategoryId, name, type, value, startDate, endDate, description, active, createdAt: new Date().toISOString() };
    
    try {
        if (id) {
            await fetch(`${API_BASE_URL}/discounts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discountData)
            });
            showToast('Скидка обновлена', 'success');
        } else {
            discountData.id = Date.now();
            await fetch(`${API_BASE_URL}/discounts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discountData)
            });
            showToast('Скидка добавлена', 'success');
        }
        
        await loadAllData();
        await renderAdminDiscounts();
        document.getElementById('discountModal').style.display = 'none';
        document.getElementById('discountForm').reset();
    } catch (error) {
        showToast('Ошибка сохранения', 'error');
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
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            const tabId = tab.dataset.tab;
            const tabContent = document.getElementById(`tab-${tabId}`);
            if (tabContent) tabContent.classList.add('active');
            
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

async function init() {
    const loaded = await loadAllData();
    
    if (!loaded) {
        console.error('Не удалось загрузить данные');
        return;
    }
    
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
    initDateMask();
    
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
    const addScheduleBtn = document.getElementById('addScheduleBtn');
    const scheduleForm = document.getElementById('scheduleForm');
    const addDiscountBtn = document.getElementById('addDiscountBtn');
    const discountForm = document.getElementById('discountForm');
    const categoryForm = document.getElementById('categoryForm');
    
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
    
    if (addScheduleBtn) {
        addScheduleBtn.addEventListener('click', () => {
            openScheduleModal(scheduleData?.doctors?.[0]?.id || 1, 'monday');
        });
    }
    
    if (scheduleForm) scheduleForm.addEventListener('submit', saveSchedule);
    
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
        await loadAllData();
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
        showToast(`Язык изменён на ${getCurrentAdminLang() === 'ru' ? 'русский' : 'английский'}`, 'success');
    });
}

document.addEventListener('DOMContentLoaded', init);