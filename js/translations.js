
const translations = {
    ru: {
        // ========== НАВИГАЦИЯ (Header & Menu) ==========
        'menu': 'МЕНЮ',
        'login': 'ВОЙТИ',
        'profile': 'ПРОФИЛЬ',
        'logout': 'ВЫЙТИ',
        'lang': 'RUS',
        
         'profile_title': 'Личный кабинет',
        'profile_personal_data': '📋 Личные данные',
        'profile_visits': '📅 Мои визиты',
        'profile_reviews': '⭐ Мои отзывы',
        'profile_last_name': 'Фамилия',
        'profile_first_name': 'Имя',
        'profile_middle_name': 'Отчество',
        'profile_email': 'Email',
        'profile_phone': 'Телефон',
        'profile_birth_date': 'Дата рождения',
        'profile_address': 'Адрес',
        'profile_edit_btn': '✏️ Редактировать',
        'profile_save_btn': '💾 Сохранить',
        'profile_cancel_btn': '❌ Отменить',
        'profile_logout_btn': '🚪 Выйти из аккаунта',
        'profile_admin_panel': '⚙️ Перейти в админ-панель',
        'profile_visits_all': 'Все',
        'profile_visits_pending': '⏳ Ожидают',
        'profile_visits_confirmed': '✅ Подтверждены',
        'profile_visits_completed': '✔️ Завершены',
        'profile_visits_cancelled': '❌ Отменены',
        'profile_reviews_all': 'Все отзывы',
        'profile_reviews_published': '✅ Опубликованные',
        'profile_reviews_pending': '⏳ На модерации',
        'profile_empty_visits': 'У вас пока нет записей',
        'profile_empty_reviews': 'У вас пока нет отзывов',
        'profile_upcoming_visits': '📌 Предстоящие визиты',
        'profile_past_visits': '📋 История посещений',
        'profile_visit_status_pending': '⏳ Ожидает подтверждения',
        'profile_visit_status_confirmed': '✅ Подтверждена',
        'profile_visit_status_completed': '✔️ Завершена',
        'profile_visit_status_cancelled': '❌ Отменена',
        'profile_review_status_published': '✅ Опубликован',
        'profile_review_status_pending': '⏳ На модерации',
        'profile_review_note': '⏳ Отзыв отправлен на модерацию и будет опубликован после проверки',
        'profile_loading': 'Загрузка...',
        'profile_login_required': 'Войдите в аккаунт',

        // ========== ФУТЕР (Footer) ==========
        'home': 'ГЛАВНАЯ',
        'services': 'УСЛУГИ',
        'team': 'КОМАНДА',
        'reviews': 'ОТЗЫВЫ',
        'contacts': 'КОНТАКТЫ',
        'prices': 'ПРАЙС-ЛИСТ',
        'schedule': 'РАСПИСАНИЕ',
        'faq': 'ВОПРОС-ОТВЕТ',
        
        // ========== ГЛАВНАЯ СТРАНИЦА (index.html) ==========
        'hero_title': 'Dental Club — Стоматологическая клиника в Могилеве',
        'search_placeholder': '🔍 Поиск по сайту...',
        'hero_title_full': 'СТОМАТОЛОГИЧЕСКАЯ КЛИНИКА',
        'city_text': 'В МОГИЛЕВЕ',
        'appointment_btn': 'ЗАПИСАТЬСЯ НА ПРИЕМ',
        'clinic_name': 'КЛИНИКА',
        'clinic_desc': 'Первая клиника в Беларуси, предоставляющая полный спектр стоматологических услуг на европейском уровне. Мы используем передовое оборудование и digital технологии.',
        'advantages_title': 'НАШИ',
        'advantages_subtitle': 'ПРЕИМУЩЕСТВА',
        'advantage_1': 'Оборудование и материалы от ведущих мировых брендов.',
        'advantage_2': 'Профессионалы, владеющие самыми современными методиками и способные в минимальные сроки решить задачи любой сложности.',
        'advantage_3': 'Надежность и гарантии.',
        'advantage_4': 'Абсолютная уверенность в результатах лечения.',
        'advantage_5': 'Индивидуальный подход и экономия времени пациента.',
        'advantage_6': 'Безупречный сервис и интерьер, в котором приятно находиться.',
        
        // ========== СТРАНИЦЫ УСЛУГ ==========
        'diagnostics_title': 'ДИАГНОСТИКА',
        'diagnostics_text': 'Диагностика необходима для составления качественного плана лечения, гарантирующего результат.',
        'diagnostic_intro': 'Dental Club производит 3D-диагностику на оборудовании последнего поколения.',
        'tomograph_text': 'Компьютерный томограф Planmeca ProMax 3DMid – является одним из лучших в мире диагностических аппаратов.',
        'safety_text': 'ProMax 3DMid– это гарант безопасности. Уровень облучения при обследовании не превышает уровня облучения после короткого воздушного перелёта.',
        'diagnocam_text': 'DiagnoCam (KaVo, Германия)– второй инструмент в Dental Club, применяемый для выявления мельчайших дефектов и скрытых кариозных полостей.',
        'specialists_text': 'Специалисты Dental Club всегда производят обследования с применением специальных оптических увеличителей.',
        'team_text': 'Наша команда – профессионалы, которые ежегодно совершенствуют свои знания в ведущих медицинских учреждениях Европы.',
        'steps_description': 'У нас своя электронная картотека, позволяющая отследить все этапы лечения наших пациентов.',
        'steps_title': 'Этапы',
        'step_1': 'Анкетирование и опрос.',
        'step_2': 'Осмотр пациента в удобном кресле, с применением бинокуляров Carl Zeiss или микроскопа Leica.',
        'step_3': 'При необходимости визуализация скрытых полостей и микродефектов зубов при помощи DiagnoCam.',
        'step_4': '3D цифровая диагностика, с огромным функционалом: от локальных участков зубов, суставов и челюстей, до всех костных тканей головы.',
        'step_5': 'Обсуждение результатов с пациентом и совместное планирование лечения.',
        
        // Профилактика кариеса
        'prevention_title': 'ПРОФИЛАКТИКА КАРИЕСА',
        'prevention_text': 'Профилактика - это комплекс мер, направленных на предупреждение возникновения и развития стоматологических заболеваний.',
        'prevention_tomograph_text': 'Мы оповещаем пациентов о необходимости произвести профосмотр и пройти профилактику.',
        'prevention_safety_text': 'Регулярная профилактика по системе Dental Club в несколько раз снижает риск возникновения кариеса и заболеваний десен.',
        'prevention_steps_title': 'Этапы системы Dental Club',
        'prevention_step_1': 'Оценка состояния полости рта, по степени окрашивания биоплёнки.',
        'prevention_step_2': 'Prophylflex (KaVo) — устранение биоплёнки и пигментации.',
        'prevention_step_3': 'Удаление зубного камня скалером Sonyflex (KaVo).',
        'prevention_step_4': 'Полировка фторированной пастой Proxyt (Ivoclar).',
        'prevention_step_5': 'Покрытие зубной эмали препаратом Fluor Protector (Ivoclar) для укрепления эмали.',
        'prevention_step_6': 'Индивидуальное обучение по правильному уходу за полостью рта в домашних условиях.',
        'prevention_vector_text': 'При необходимости, после этих этапов мы производим лечение дёсен аппаратом Vector (Dürr Dental).',
        
        // Терапия
        'therapy_title': 'ТЕРАПИЯ',
        'therapy_text': 'Терапевтическая стоматология - раздел медицины, занимающийся диагностикой и лечением болезней зубов, околозубных тканей и слизистой оболочки полости рта.',
        'caries_treatment': 'ЛЕЧЕНИЕ КАРИЕСА',
        'caries_text': 'Наиболее частой причиной обращения в стоматологию является кариес.',
        'therapy_safety_text_1': 'В Dental Club всегда проводят лечение с применением специальных оптических увеличителей.',
        'therapy_safety_text_2': 'Для прямых реставраций используются лучшие немецкие пломбировочные материалы от фирмы Ivoclar.',
        'therapy_safety_text_3': 'Вкладки и накладки изготавливаются в нашей лаборатории из таких материалов, как: оксид циркония, IPS. E-max, керамика.',
        'therapy_steps_title': 'Этапы лечения кариеса (пломбы)',
        'visit_1': '1-ое посещение',
        'visit_2': '2-ое посещение',
        'step_anesthesia': 'Обезболивание',
        'step_preparation': 'Препарирование кариозного процесса и удаление старых реставраций',
        'step_impression': 'Снятие слепка',
        'step_temporary': 'Изготовление временной пломбы',
        'step_polishing': 'Пришлифовка и полировка временной пломбы',
        'step_remove_temporary': 'Удаление временной пломбы',
        'step_processing': 'Обработка вкладки и полости зуба',
        'step_fixation': 'Фиксация вкладки на композиционный цемент',
        'step_final_polishing': 'Пришлифовка и полировка',
        
        // Цифровое протезирование
        'prosthetics_title': 'ЦИФРОВОЕ ПРОТЕЗИРОВАНИЕ',
        'prosthetics_text': 'Цифровое протезирование зубов – это направление эстетической стоматологии, с использованием цифровых технологий.',
        'prosthetics_tomograph_text': 'Согласно вашим требованиям и возможностям подбирается оптимальный вариант ортопедической конструкции.',
        'prosthetics_materials_text': 'В практике Dental Club мы используем современные материалы - цирконий, IPS.E-max, керамические виниры.',
        'prosthetics_accuracy_text': 'Точность при цифровом изготовлении ортопедических конструкций позволяет уже во второе посещение зафиксировать коронку.',
        'prosthetics_durability_text': 'Отличительной особенностью ортопедических конструкций является прочность и устойчивость к изменению цвета.',
        'prosthetics_steps_title': 'Этапы',
        'prosthetics_step_1': 'Подготовка зуба или установленного имплантата к протезированию',
        'prosthetics_step_2': 'Снятие слепка',
        'prosthetics_step_3': 'Изготовление временной конструкции',
        'prosthetics_step_4': 'Установка финальной конструкции.',
        
        // Цифровая имплантация
        'implantation_title': 'ЦИФРОВАЯ ИМПЛАНТАЦИЯ',
        'implantation_text': 'Имплантация зубов – это операция по установке имплантатов, в качестве опоры для ортопедических конструкций.',
        'implantation_navigation_text': 'В Dental Club мы используем навигационную стоматологию.',
        'implantation_implants_text': 'В Dental Club мы используем имплантаты премиум класса от европейских и американских производителей.',
        'implantation_operation_text': 'Операция по установке имплантата в нашей клинике проводится в специализированной операционной.',
        'implantation_steps_title': 'Этапы цифровой имплантации:',
        'implantation_step_1': 'Диагностика и планирование: 3D снимок, сканирование модели зубов, изготовление хирургического шаблона.',
        'implantation_step_2': 'Удаление разрушенного зуба (при одномоментной имплантации).',
        'implantation_step_3': 'Установка имплантата, формирователя десны или временной коронки.',
        'implantation_step_4': 'Рекомендация к установке постоянных ортопедических конструкций максимум через 2 месяца.',
        
        // Сложная имплантация
        'complex_title': 'СЛОЖНАЯ ИМПЛАНТАЦИЯ',
        'complex_text_1': 'Часто в нашу клинику обращаются пациенты, которым отказали устанавливать имплантаты в других местах.',
        'complex_text_2': 'В Dental Club мы можем произвести установку имплантатов даже в самых сложных ситуациях.',
        'complex_navigation_text': 'Мы используем навигационную стоматологию. Операции планируются в цифровом формате.',
        'complex_virtual_text': 'Предварительно, перед самой операцией, мы производим виртуальную установку имплантатов в цифровой среде.',
        'complex_allon_text': 'Для особо сложных случаев, в нашем арсенале имеется методика "All-on-4" и "All-on-6".',
        'complex_training_text': 'Главный врач клиники прошёл обучение данной методике у ведущих специалистов.',
        'complex_zygoma_text': 'В самых сложных случаях мы можем установить скуловые имплантаты Zygoma.',
        'complex_steps_title': 'Этапы сложной имплантации (All-on-4):',
        'complex_step_1': 'Диагностика и планирование: 3D снимок, сканирование модели зубов, изготовление хирургического шаблона.',
        'complex_step_2': 'Удаление разрушенных зубов.',
        'complex_step_3': 'Установка имплантата, фиксация мульти-юнит абатментов и несъемного протеза.',
        'complex_final_text': 'По показаниям, врач ортопед установит несъёмные протезы либо в день операции, либо через 1 – 2 дня.',
        
        // Эстетическая ортодонтия
        'orthodontics_title': 'ЭСТЕТИЧЕСКАЯ ОРТОДОНТИЯ',
        'orthodontics_text_1': 'Эстетическая ортодонтия – область стоматологии, специализирующаяся на коррекции прикуса.',
        'orthodontics_text_2': 'Ортодонтическое лечение не имеет строгих возрастных рамок.',
        'orthodontics_features': 'Ортодонтия в Dental Club - это:',
        'orthodontics_feature_1': 'Цифровые методы диагностики и планирования лечения.',
        'orthodontics_feature_2': 'Лучшие самолигирующие брекет-системы.',
        'orthodontics_feature_3': 'Системы съёмного ортодонтического лечения Invisalign.',
        'orthodontics_feature_4': 'Детская ортодонтия.',
        'aligners_title': 'ЭЛАЙНЕРЫ',
        'aligners_text_1': 'Это индивидуально изготовленные капы из специального прозрачного материала.',
        'aligners_text_2': 'В клинике Dental Club мы используем элайнеры Invisalign.',
        'aligners_text_3': 'Элайнеры удобны и практически не заметны в повседневной жизни.',
        'aligners_process': 'Весь процесс лечения пациент может увидеть в цифровом формате.',
        'aligners_consult': 'Специалисты нашей клиники помогут Вам получить идеально ровные зубы.',
        'aligners_certified': 'Dental Club является сертифицированной клиникой Invisalign.',
        
        // Виниры и Люминиры
        'veneers_title': 'ВИНИРЫ. ЛЮМИНИРЫ',
        'veneers_title_main': 'ВИНИРЫ',
        'luminirs_title': 'ЛЮМИНИРЫ',
        'veneers_text': 'Виниры – это тонкие керамические пластинки, которые фиксируются на поверхность зубов.',
        'luminirs_text': 'Люминиры - это тончайшие керамические пластинки, которые одеваются прямо на поверхность зуба.',
        'veneers_materials': 'В Dental Club мы используем полный спектр материалов для изготовления виниров и люминиров.',
        'veneers_choice': 'Выбор зависит от вашего предпочтения и показаний.',
        'veneers_preparation': 'Перед установкой виниров мы проводим детальный чек-ап полости рта.',
        'veneers_final': 'После подготовки зубов, останется всего два финальных этапа до идеального результата.',
        'veneers_durability': 'Отличительной особенностью является прочность и устойчивость к изменению цвета.',
        'veneers_steps_title': 'Этапы установки виниров и люминиров',
        'veneers_step_1': 'Снятие слепков, фотопротокол лица, чек-ап.',
        'veneers_step_2': 'Моделирование цифровой версии - wax-up.',
        'veneers_step_3': 'Перенос в полость рта временной реставрации — mock-up.',
        'veneers_step_4': 'Обсуждение и утверждение с пациентом новой формы и цвета.',
        'veneers_step_5': 'Обработка зубов, снятие финального слепка.',
        'veneers_step_6': 'Изготовление постоянных керамических виниров и их фиксация.',
        'veneers_step_7': 'Финальная коррекция и полировка.',
        
        // ========== СТРАНИЦА КОМАНДЫ (team.html) ==========
        'team_title': 'КОМАНДА DENTAL CLUB',
        'doctor_therapist': 'Стоматолог-терапевт, детский стоматолог',
        'doctor_parodontologist': 'Стоматолог-пародонтолог',
        'doctor_hygienist': 'Стоматолог-пародонтолог, гигиенист',
        'doctor_endodontist': 'Стоматолог-терапевт, эндодонтист',
        'doctor_implantologist': 'Стоматолог-имплантолог, ортопед',
        'doctor_surgeon': 'Стоматолог-хирург, имплантолог',
        
        // ========== СТРАНИЦА ДЕТАЛЕЙ ВРАЧА (team-details.html) ==========
        'specialization': 'Специализация:',
        'education': 'Образование:',
        'experience': 'Опыт работы:',
        'improvement': 'Повышение квалификации:',
        'work_time': 'Время приема:',
        
        // ========== СТРАНИЦА ОТЗЫВОВ (reviews.html) ==========
        'reviews_title': 'ОТЗЫВЫ НАШИХ КЛИЕНТОВ',
        'send_review_btn': 'ОТПРАВИТЬ СВОЙ ОТЗЫВ',
        'write_review': 'НАПИШИТЕ СВОЙ ОТЗЫВ',
        'review_name': 'Ваше имя',
        'review_email': 'Email',
        'review_phone': 'Телефон',
        'review_text': 'Ваш отзыв',
        'submit_review': 'ОТПРАВИТЬ ОТЗЫВ',
        'feedback_title': 'ОБРАТНАЯ СВЯЗЬ',
        'name_placeholder': 'Ваше имя',
        'email_placeholder': 'Email',
        'phone_placeholder': '+7 (___) ___ __ __',
        'question_placeholder': 'Введите ваш вопрос',
        'send_btn': 'ОТПРАВИТЬ ЗАЯВКУ',
        'photo_video': 'ФОТО И ВИДЕО',
        'photo_video_desc': 'Наши работы и моменты из жизни клиники',
        'modern_cabinet': 'Современный кабинет',
        'treatment_process': 'Процесс лечения',
        'team_caption': 'Команда Dental Club',
        'cozy_atmosphere': 'Уютная атмосфера',
        'happy_patients': 'Счастливые пациенты',
        'clinic_desc_1': 'Клиника Dental Club работает по европейским стандартам и уделяет особое внимание обучению и профессиональному росту сотрудников.',
        'clinic_desc_2': 'Наши принципы: гарантировать пациентам лучшее лечение, а сотрудникам – лучшие условия труда.',
        'clinic_desc_3': 'Если Вы хотите стать частью дружной команды, присылайте Ваше резюме на почту:',
        
        // ========== СТРАНИЦА КОНТАКТОВ (contacts.html) ==========
        'contacts_title': 'КОНТАКТЫ',
        'contact_us': 'СВЯЗАТЬСЯ С НАМИ',
        'address_value': 'Беларусь, г. Могилев, ул. Ленинская, 25 (вход со стороны улицы Первомайской)',
        'mon_fri': 'Пн - Пт: 10:00 - 20:00',
        'sat': 'Сб: 10:00 - 16:00',
        'sun': 'Вс: выходной',
        'send_request': 'ОТПРАВИТЬ ЗАЯВКУ',
        
        // ========== СТРАНИЦА ПРАЙС-ЛИСТА (prices.html) ==========
        'prices_title': 'ПРАЙС-ЛИСТ',
        'all_services': 'Все услуги',
        'all_categories': 'Категория:',
        'search': 'Поиск:',
        'search_placeholder': 'Поиск по ключевым словам',
        'loading': 'Загрузка цен...',
        'prices_note_1': '⚠️ Цены, указанные на сайте, не являются публичной офертой. Точную стоимость уточняйте у администратора клиники.',
        'prices_note_2': '📞 Для записи на прием и уточнения цены звоните:',
        
        // ========== СТРАНИЦА РАСПИСАНИЯ (schedule.html) ==========
        'schedule_title': 'РАСПИСАНИЕ ВРАЧЕЙ',
        'clinic_hours': '📅 Режим работы клиники:',
        'mon_fri_hours': 'Пн-Пт: 10:00 - 20:00',
        'sat_hours': 'Сб: 10:00 - 16:00',
        'sun_hours': 'Вс: выходной',
        'call_appointment': '📞 Для записи на прием звоните:',
        'select_doctor': 'Выберите врача:',
        'all_doctors': 'Все врачи',
        'weekday': 'День недели:',
        'all_days': 'Все дни',
        'monday': 'Понедельник',
        'tuesday': 'Вторник',
        'wednesday': 'Среда',
        'thursday': 'Четверг',
        'friday': 'Пятница',
        'saturday': 'Суббота',
        'sunday': 'Воскресенье',
        'schedule_note_1': '⚠️ Расписание может меняться. Актуальное время приема уточняйте по телефону.',
        'schedule_note_2': '💡 Вы можете записаться на прием онлайн через форму записи.',
        
        // ========== СТРАНИЦА ВОПРОС-ОТВЕТ (faq.html) ==========
        'faq_title': 'ВОПРОС-ОТВЕТ',
        'faq_subtitle': 'Часто задаваемые вопросы о нашей клинике',
        'all_questions': 'Все вопросы',
        'search_questions': 'Поиск по вопросам...',
        'no_results': 'По вашему запросу ничего не найдено',
        'reset_filters': 'Сбросить фильтры',
        'booking_visits': '📅 Запись и визиты',
        'services_cat': '🦷 Услуги',
        'prices_payment': '💰 Цены и оплата',
        'doctors_cat': '👨‍⚕️ Врачи',
        'general_cat': 'ℹ️ Общие',
        
        // ========== МОДАЛЬНЫЕ ОКНА ==========
        'modal_appointment': 'Запись на прием',
        'modal_patient_name': 'ФИО пациента',
        'modal_select_service': 'Выберите услугу',
        'modal_select_doctor': 'Выберите врача',
        'modal_date': 'Дата',
        'modal_time': 'Время',
        'modal_comment': 'Комментарий',
        'modal_submit': 'ЗАПИСАТЬСЯ',
        'modal_close': 'Закрыть',
        
        // ========== ОБЩИЕ ФРАЗЫ ==========
        'more_btn': 'ПОДРОБНЕЕ',
        'send': 'ОТПРАВИТЬ',
        'save': 'СОХРАНИТЬ',
        'cancel': 'ОТМЕНА',
        'edit': 'РЕДАКТИРОВАТЬ',
        'delete': 'УДАЛИТЬ',
        'close': 'ЗАКРЫТЬ',
        'back': 'НАЗАД',
        'yes': 'Да',
        'no': 'Нет',
        'error': 'Ошибка',
        'success': 'Успешно'
    },
    
    en: {
        // ========== NAVIGATION (Header & Menu) ==========
        'menu': 'MENU',
        'login': 'LOGIN',
        'profile': 'PROFILE',
        'logout': 'LOGOUT',
        'lang': 'ENG',
        
  // ========== PROFILE MODAL ==========
        'profile_title': 'Profile',
        'profile_personal_data': '📋 Personal Data',
        'profile_visits': '📅 My Visits',
        'profile_reviews': '⭐ My Reviews',
        'profile_last_name': 'Last Name',
        'profile_first_name': 'First Name',
        'profile_middle_name': 'Middle Name',
        'profile_email': 'Email',
        'profile_phone': 'Phone',
        'profile_birth_date': 'Date of Birth',
        'profile_address': 'Address',
        'profile_edit_btn': '✏️ Edit',
        'profile_save_btn': '💾 Save',
        'profile_cancel_btn': '❌ Cancel',
        'profile_logout_btn': '🚪 Logout',
        'profile_admin_panel': '⚙️ Go to Admin Panel',
        'profile_visits_all': 'All',
        'profile_visits_pending': '⏳ Pending',
        'profile_visits_confirmed': '✅ Confirmed',
        'profile_visits_completed': '✔️ Completed',
        'profile_visits_cancelled': '❌ Cancelled',
        'profile_reviews_all': 'All Reviews',
        'profile_reviews_published': '✅ Published',
        'profile_reviews_pending': '⏳ Moderation',
        'profile_empty_visits': 'You have no appointments yet',
        'profile_empty_reviews': 'You have no reviews yet',
        'profile_upcoming_visits': '📌 Upcoming Visits',
        'profile_past_visits': '📋 Visit History',
        'profile_visit_status_pending': '⏳ Pending confirmation',
        'profile_visit_status_confirmed': '✅ Confirmed',
        'profile_visit_status_completed': '✔️ Completed',
        'profile_visit_status_cancelled': '❌ Cancelled',
        'profile_review_status_published': '✅ Published',
        'profile_review_status_pending': '⏳ Moderation',
        'profile_review_note': '⏳ Review sent for moderation and will be published after verification',
        'profile_loading': 'Loading...',
        'profile_login_required': 'Please log in',

        // ========== FOOTER ==========
        'home': 'HOME',
        'services': 'SERVICES',
        'team': 'TEAM',
        'reviews': 'REVIEWS',
        'contacts': 'CONTACTS',
        'prices': 'PRICE LIST',
        'schedule': 'SCHEDULE',
        'faq': 'FAQ',
        
        // ========== HOME PAGE (index.html) ==========
        'hero_title': 'Dental Club — Dental Clinic in Mogilev',
        'search_placeholder': '🔍 Search the site...',
        'hero_title_full': 'DENTAL CLINIC',
        'city_text': 'IN MOGILEV',
        'appointment_btn': 'BOOK APPOINTMENT',
        'clinic_name': 'CLINIC',
        'clinic_desc': 'The first clinic in Belarus providing a full range of dental services at European level. We use advanced equipment and digital technologies.',
        'advantages_title': 'OUR',
        'advantages_subtitle': 'ADVANTAGES',
        'advantage_1': 'Equipment and materials from leading global brands.',
        'advantage_2': 'Professionals who master the most modern techniques.',
        'advantage_3': 'Reliability and guarantees.',
        'advantage_4': 'Absolute confidence in treatment results.',
        'advantage_5': 'Individual approach and saving patient time.',
        'advantage_6': 'Impeccable service and pleasant interior.',
        
        // ========== SERVICE PAGES ==========
        'diagnostics_title': 'DIAGNOSTICS',
        'diagnostics_text': 'Diagnostics is necessary to create a quality treatment plan that guarantees results.',
        'diagnostic_intro': 'Dental Club performs 3D diagnostics using the latest generation equipment.',
        'tomograph_text': 'The Planmeca ProMax 3DMid computed tomograph is one of the best diagnostic devices in the world.',
        'safety_text': 'ProMax 3DMid is a safety guarantee. The radiation level during examination is minimal.',
        'diagnocam_text': 'DiagnoCam (KaVo, Germany) is used to detect tiny defects and hidden carious cavities.',
        'specialists_text': 'Dental Club specialists always perform examinations using special optical magnifiers.',
        'team_text': 'Our team consists of professionals who annually improve their knowledge.',
        'steps_description': 'We have our own electronic file system.',
        'steps_title': 'Stages',
        'step_1': 'Questioning and interview.',
        'step_2': 'Examination of the patient in a comfortable chair.',
        'step_3': 'Visualization of hidden cavities using DiagnoCam.',
        'step_4': '3D digital diagnostics.',
        'step_5': 'Discussion of results and joint treatment planning.',
        
        // Prevention
        'prevention_title': 'CARIES PREVENTION',
        'prevention_text': 'Prevention is a set of measures aimed at preventing dental diseases.',
        'prevention_tomograph_text': 'We notify patients about the need for professional examination.',
        'prevention_safety_text': 'Regular prevention reduces the risk of caries and gum disease.',
        'prevention_steps_title': 'Stages of the Dental Club system',
        'prevention_step_1': 'Assessment of the oral cavity condition.',
        'prevention_step_2': 'Prophylflex (KaVo) — removal of biofilm and pigmentation.',
        'prevention_step_3': 'Removal of tartar with Sonyflex scaler.',
        'prevention_step_4': 'Polishing with fluoridated paste Proxyt.',
        'prevention_step_5': 'Coating enamel with Fluor Protector.',
        'prevention_step_6': 'Individual training on proper oral care.',
        'prevention_vector_text': 'If necessary, we treat gums with the Vector device.',
        
        // Therapy
        'therapy_title': 'THERAPY',
        'therapy_text': 'Therapeutic dentistry deals with diagnosis and treatment of teeth diseases.',
        'caries_treatment': 'CARIES TREATMENT',
        'caries_text': 'The most common reason for visiting a dentist is caries.',
        'therapy_safety_text_1': 'Dental Club uses special optical magnifiers for treatment.',
        'therapy_safety_text_2': 'The best German filling materials from Ivoclar are used.',
        'therapy_safety_text_3': 'Inlays and onlays are made from zirconium oxide, IPS.E-max, ceramics.',
        'therapy_steps_title': 'Stages of caries treatment',
        'visit_1': '1st visit',
        'visit_2': '2nd visit',
        'step_anesthesia': 'Anesthesia',
        'step_preparation': 'Preparation of the carious process',
        'step_impression': 'Taking an impression',
        'step_temporary': 'Making a temporary filling',
        'step_polishing': 'Grinding and polishing',
        'step_remove_temporary': 'Removal of temporary filling',
        'step_processing': 'Processing of the inlay',
        'step_fixation': 'Fixation of the inlay',
        'step_final_polishing': 'Grinding and polishing',
        
        // Digital prosthetics
        'prosthetics_title': 'DIGITAL PROSTHETICS',
        'prosthetics_text': 'Digital prosthetics uses digital technologies in manufacturing orthopedic structures.',
        'prosthetics_tomograph_text': 'The optimal variant of orthopedic structure is selected according to your requirements.',
        'prosthetics_materials_text': 'We use modern materials - zirconium, IPS.E-max, ceramic veneers.',
        'prosthetics_accuracy_text': 'The accuracy allows you to fix the crown at the second visit.',
        'prosthetics_durability_text': 'A distinctive feature is strength and resistance to color change.',
        'prosthetics_steps_title': 'Stages',
        'prosthetics_step_1': 'Preparation of the tooth or implant',
        'prosthetics_step_2': 'Taking an impression',
        'prosthetics_step_3': 'Manufacturing of a temporary structure',
        'prosthetics_step_4': 'Installation of the final structure.',
        
        // Digital implantation
        'implantation_title': 'DIGITAL IMPLANTATION',
        'implantation_text': 'Dental implantation is an operation to install implants.',
        'implantation_navigation_text': 'At Dental Club, we use navigational dentistry.',
        'implantation_implants_text': 'We use premium class implants from European and American manufacturers.',
        'implantation_operation_text': 'The operation is carried out in a specialized operating room.',
        'implantation_steps_title': 'Stages of digital implantation:',
        'implantation_step_1': 'Diagnostics and planning: 3D image, scanning, manufacturing of a surgical template.',
        'implantation_step_2': 'Removal of a destroyed tooth.',
        'implantation_step_3': 'Installation of the implant.',
        'implantation_step_4': 'Recommendation for installation of permanent structures.',
        
        // Complex implantation
        'complex_title': 'COMPLEX IMPLANTATION',
        'complex_text_1': 'Often patients come to our clinic who were refused implants elsewhere.',
        'complex_text_2': 'At Dental Club, we can install implants even in difficult situations.',
        'complex_navigation_text': 'We use navigational dentistry. Operations are planned in digital format.',
        'complex_virtual_text': 'We perform virtual installation of implants in a digital environment.',
        'complex_allon_text': 'For complex cases, we have "All-on-4" and "All-on-6" techniques.',
        'complex_training_text': 'The chief physician was trained by leading specialists.',
        'complex_zygoma_text': 'We can install Zygoma implants in the most difficult cases.',
        'complex_steps_title': 'Stages of complex implantation (All-on-4):',
        'complex_step_1': 'Diagnostics and planning: 3D image, scanning, manufacturing of a surgical template.',
        'complex_step_2': 'Removal of destroyed teeth.',
        'complex_step_3': 'Implant installation, fixation of abutments and denture.',
        'complex_final_text': 'According to indications, dentures will be installed on the day of surgery or after 1-2 days.',
        
        // Aesthetic orthodontics
        'orthodontics_title': 'AESTHETIC ORTHODONTICS',
        'orthodontics_text_1': 'Aesthetic orthodontics specializes in bite correction.',
        'orthodontics_text_2': 'Orthodontic treatment has no strict age restrictions.',
        'orthodontics_features': 'Orthodontics at Dental Club includes:',
        'orthodontics_feature_1': 'Digital methods of diagnostics and treatment planning.',
        'orthodontics_feature_2': 'The best self-ligating bracket systems.',
        'orthodontics_feature_3': 'Invisalign removable orthodontic systems.',
        'orthodontics_feature_4': 'Pediatric orthodontics.',
        'aligners_title': 'ALIGNERS',
        'aligners_text_1': 'These are individually made mouthguards of special transparent material.',
        'aligners_text_2': 'We use Invisalign aligners.',
        'aligners_text_3': 'Aligners are comfortable and almost invisible.',
        'aligners_process': 'The patient can see the entire treatment process in digital format.',
        'aligners_consult': 'Our specialists will help you get perfectly straight teeth.',
        'aligners_certified': 'Dental Club is a certified Invisalign clinic.',
        
        // Veneers and Lumineers
        'veneers_title': 'VENEERS. LUMINEERS',
        'veneers_title_main': 'VENEERS',
        'luminirs_title': 'LUMINEERS',
        'veneers_text': 'Veneers are thin ceramic plates fixed to the surface of teeth.',
        'luminirs_text': 'Lumineers are the thinnest ceramic plates placed directly onto the tooth surface.',
        'veneers_materials': 'We use a full range of materials for veneers and lumineers.',
        'veneers_choice': 'The choice depends on your preference and indications.',
        'veneers_preparation': 'Before installing veneers, we conduct a detailed check-up.',
        'veneers_final': 'After preparation, only two final stages remain.',
        'veneers_durability': 'A distinctive feature is strength and resistance to color change.',
        'veneers_steps_title': 'Stages of installation of veneers and lumineers',
        'veneers_step_1': 'Taking impressions, facial photo protocol, check-up.',
        'veneers_step_2': 'Modeling of the digital version - wax-up.',
        'veneers_step_3': 'Transfer to the oral cavity - mock-up.',
        'veneers_step_4': 'Discussion and approval of the new shape and color.',
        'veneers_step_5': 'Tooth processing, taking the final impression.',
        'veneers_step_6': 'Manufacturing of permanent ceramic veneers and their fixation.',
        'veneers_step_7': 'Final correction and polishing.',
        
        // ========== TEAM PAGE (team.html) ==========
        'team_title': 'DENTAL CLUB TEAM',
        'doctor_therapist': 'General Dentist, Pediatric Dentist',
        'doctor_parodontologist': 'Periodontist',
        'doctor_hygienist': 'Periodontist, Hygienist',
        'doctor_endodontist': 'General Dentist, Endodontist',
        'doctor_implantologist': 'Implantologist, Orthopedist',
        'doctor_surgeon': 'Oral Surgeon, Implantologist',
        
        // ========== DOCTOR DETAILS PAGE ==========
        'specialization': 'Specialization:',
        'education': 'Education:',
        'experience': 'Work experience:',
        'improvement': 'Advanced training:',
        'work_time': 'Working hours:',
        
        // ========== REVIEWS PAGE ==========
        'reviews_title': 'CLIENT REVIEWS',
        'send_review_btn': 'SEND YOUR REVIEW',
        'write_review': 'WRITE A REVIEW',
        'review_name': 'Your name',
        'review_email': 'Email',
        'review_phone': 'Phone',
        'review_text': 'Your review',
        'submit_review': 'SUBMIT REVIEW',
        'feedback_title': 'FEEDBACK',
        'name_placeholder': 'Your name',
        'email_placeholder': 'Email',
        'phone_placeholder': '+7 (___) ___ __ __',
        'question_placeholder': 'Enter your question',
        'send_btn': 'SEND REQUEST',
        'photo_video': 'PHOTO AND VIDEO',
        'photo_video_desc': 'Our work and moments from the life of the clinic',
        'modern_cabinet': 'Modern office',
        'treatment_process': 'Treatment process',
        'team_caption': 'Dental Club Team',
        'cozy_atmosphere': 'Cozy atmosphere',
        'happy_patients': 'Happy patients',
        'clinic_desc_1': 'Dental Clinic operates according to European standards and invests in training and professional growth of its employees.',
        'clinic_desc_2': 'Our principles: to guarantee patients the best treatment, and employees the best working conditions.',
        'clinic_desc_3': 'If you want to become part of a friendly team, send your resume to:',
        
        // ========== CONTACTS PAGE ==========
        'contacts_title': 'CONTACTS',
        'contact_us': 'CONTACT US',
        'address_value': 'Belarus, Mogilev, Leninskaya str., 25 (entrance from Pervomayskaya str.)',
        'mon_fri': 'Mon - Fri: 10:00 - 20:00',
        'sat': 'Sat: 10:00 - 16:00',
        'sun': 'Sun: closed',
        'send_request': 'SEND REQUEST',
        
        // ========== PRICE LIST PAGE ==========
        'prices_title': 'PRICE LIST',
        'all_services': 'All services',
        'all_categories': 'Category:',
        'search': 'Search:',
        'search_placeholder': 'Search by service name...',
        'loading': 'Loading prices...',
        'prices_note_1': '⚠️ The prices listed are not a public offer. Please check the exact cost with the administrator.',
        'prices_note_2': '📞 To make an appointment and check prices, call:',
        
        // ========== SCHEDULE PAGE ==========
        'schedule_title': 'DOCTORS SCHEDULE',
        'clinic_hours': '📅 Clinic working hours:',
        'mon_fri_hours': 'Mon-Fri: 10:00 - 20:00',
        'sat_hours': 'Sat: 10:00 - 16:00',
        'sun_hours': 'Sun: closed',
        'call_appointment': '📞 To make an appointment call:',
        'select_doctor': 'Select doctor:',
        'all_doctors': 'All doctors',
        'weekday': 'Day of week:',
        'all_days': 'All days',
        'monday': 'Monday',
        'tuesday': 'Tuesday',
        'wednesday': 'Wednesday',
        'thursday': 'Thursday',
        'friday': 'Friday',
        'saturday': 'Saturday',
        'sunday': 'Sunday',
        'schedule_note_1': '⚠️ The schedule may change. Please check the current appointment time by phone.',
        'schedule_note_2': '💡 You can make an appointment online through the booking form.',
        
        // ========== FAQ PAGE ==========
        'faq_title': 'FAQ',
        'faq_subtitle': 'Frequently asked questions about our clinic',
        'all_questions': 'All questions',
        'search_questions': 'Search questions...',
        'no_results': 'No results found for your query',
        'reset_filters': 'Reset filters',
        'booking_visits': '📅 Booking and visits',
        'services_cat': '🦷 Services',
        'prices_payment': '💰 Prices and payment',
        'doctors_cat': '👨‍⚕️ Doctors',
        'general_cat': 'ℹ️ General',
        
        // ========== MODAL WINDOWS ==========
        'modal_appointment': 'Book appointment',
        'modal_patient_name': 'Full name',
        'modal_select_service': 'Select service',
        'modal_select_doctor': 'Select doctor',
        'modal_date': 'Date',
        'modal_time': 'Time',
        'modal_comment': 'Comment',
        'modal_submit': 'BOOK',
        'modal_close': 'Close',
        
        // ========== COMMON PHRASES ==========
        'more_btn': 'MORE',
        'send': 'SEND',
        'save': 'SAVE',
        'cancel': 'CANCEL',
        'edit': 'EDIT',
        'delete': 'DELETE',
        'close': 'CLOSE',
        'back': 'BACK',
        'yes': 'Yes',
        'no': 'No',
        'error': 'Error',
        'success': 'Success'
    }
};

let currentLanguage = localStorage.getItem('dental_language') || 'ru';

function translate(key, defaultValue = '') {
    const t = translations[currentLanguage];
    if (t && t[key]) {
        return t[key];
    }
    return defaultValue;
}

function translateText(key, params = {}, defaultValue = '') {
    const t = translations[currentLanguage];
    let text = (t && t[key]) ? t[key] : defaultValue;
    
    if (text && params) {
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
        });
    }
    
    return text;
}

function refreshDynamicContent() {
    if (typeof window.displayReviews === 'function') {
        window.displayReviews();
    }
    
    if (typeof window.displayFaq === 'function') {
        window.displayFaq();
    }
    
    if (typeof window.displaySchedule === 'function') {
        window.displaySchedule();
    }
    
    if (typeof window.displayPrices === 'function') {
        window.displayPrices();
    }
    
    console.log('🔄 Динамические данные обновлены');
}

function applyTranslations() {
    const t = translations[currentLanguage];
    if (!t) return;
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = t[key];
                }
            } else if (element.tagName === 'SELECT' && element.hasAttribute('data-translate')) {
                const option = element.options[element.selectedIndex];
                if (option && option.getAttribute('data-translate')) {
                    option.textContent = t[key];
                }
            } else {
                element.textContent = t[key];
            }
        }
    });
    
    const categoryFilter = document.getElementById('priceCategoryFilter');
    if (categoryFilter) {
        const allOption = categoryFilter.querySelector('option[value="all"]');
        if (allOption && allOption.getAttribute('data-translate') === 'all_services') {
            allOption.textContent = t['all_services'] || 'Все услуги';
        }
    }
    
    const headerLangSelector = document.getElementById('headerLangSelector');
    if (headerLangSelector) {
        const langText = headerLangSelector.querySelector('#langSelectorText');
        if (langText) langText.textContent = currentLanguage === 'ru' ? 'RUS' : 'ENG';
    }
    
    const mobileLangSelector = document.querySelector('.mobile-lang-selector');
    if (mobileLangSelector) {
        mobileLangSelector.textContent = currentLanguage === 'ru' ? 'RUS' : 'ENG';
    }
    
    console.log(`✅ Перевод применён: ${currentLanguage}`);
}

function switchLanguage() {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    localStorage.setItem('dental_language', currentLanguage);
    applyTranslations();
    
    const headerLangSelector = document.getElementById('headerLangSelector');
    if (headerLangSelector) {
        const langText = headerLangSelector.querySelector('#langSelectorText');
        if (langText) langText.textContent = currentLanguage === 'ru' ? 'RUS' : 'ENG';
    }
    
    const mobileLangSelector = document.querySelector('.mobile-lang-selector');
    if (mobileLangSelector) {
        mobileLangSelector.textContent = currentLanguage === 'ru' ? 'RUS' : 'ENG';
    }
    
    refreshDynamicContent();
    
    showLanguageToast(currentLanguage === 'ru' ? '🌐 Язык изменён на русский' : '🌐 Language changed to English');
    
    const event = new CustomEvent('languageChanged', { detail: { language: currentLanguage } });
    document.dispatchEvent(event);
}

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

function initTranslations() {
    console.log('🌐 Инициализация переводов, язык:', currentLanguage);
    applyTranslations();
    
    const headerLangSelector = document.getElementById('headerLangSelector');
    if (headerLangSelector) {
        const newLangSelector = headerLangSelector.cloneNode(true);
        headerLangSelector.parentNode.replaceChild(newLangSelector, headerLangSelector);
        
        newLangSelector.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchLanguage();
        });
    }
    
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

window.switchLanguage = switchLanguage;
window.applyTranslations = applyTranslations;
window.refreshDynamicContent = refreshDynamicContent;
window.translate = translate;
window.translateText = translateText;
window.currentLanguage = () => currentLanguage;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslations);
} else {
    initTranslations();
}