
const translations = {
    ru: {
        'menu': 'МЕНЮ',
        'login': 'ВОЙТИ',
        'profile': 'ПРОФИЛЬ',
        'logout': 'ВЫЙТИ',
        'lang': 'АНГЛ',
        
         'review_rating': 'Ваша оценка:',
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
        'profile_edit_btn': 'Редактировать',
        'profile_save_btn': 'Сохранить',
        'profile_cancel_btn': 'Отменить',
        'profile_logout_btn': 'Выйти из аккаунта',
        'profile_admin_panel': 'Перейти в админ-панель',
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

         // Страница входа (login)
        'login_title': 'ВХОД В АККАУНТ',
        'login_subtitle': 'Добро пожаловать обратно!',
        'login_email_phone': 'Email или телефон',
        'login_email_phone_placeholder': 'example@mail.com или +375 (29) 123-45-67',
        'login_password': 'Пароль',
        'login_password_placeholder': 'Введите пароль',
        'login_remember': 'Запомнить меня',
        'login_button': 'ВОЙТИ',
        'login_no_account': 'Нет аккаунта?',
        'login_register_link': 'Зарегистрироваться',
        'login_error_required': 'Введите email/телефон',
        'login_error_password_required': 'Введите пароль',
        'login_error_invalid': 'Неверный email/телефон или пароль',
        'login_success': 'Вход выполнен успешно! Перенаправление...',
        'login_server_error': 'Ошибка подключения к серверу. Запустите json-server',

        // Страница регистрации (signup)
        'signup_title': 'СОЗДАНИЕ АККАУНТА',
        'signup_subtitle': 'Заполните форму для регистрации',
        'signup_first_name': 'Имя',
        'signup_first_name_placeholder': 'Введите ваше имя',
        'signup_last_name': 'Фамилия',
        'signup_last_name_placeholder': 'Введите вашу фамилию',
        'signup_email': 'Email',
        'signup_email_placeholder': 'example@mail.com',
        'signup_phone': 'Телефон',
        'signup_phone_placeholder': '+375 (29) 123-45-67',
        'signup_password': 'Пароль',
        'signup_password_placeholder': 'Минимум 6 символов',
        'signup_confirm_password': 'Подтверждение пароля',
        'signup_confirm_password_placeholder': 'Повторите пароль',
        'signup_agree_terms': 'Я соглашаюсь с',
        'signup_terms_link': 'условиями использования',
        'signup_and': 'и',
        'signup_privacy_link': 'политикой конфиденциальности',
        'signup_button': 'ЗАРЕГИСТРИРОВАТЬСя',
        'signup_have_account': 'Уже есть аккаунт?',
        'signup_login_link': 'Войти',
        'signup_error_first_name': 'Введите имя',
        'signup_error_first_name_min': 'Имя должно содержать минимум 2 символа',
        'signup_error_last_name': 'Введите фамилию',
        'signup_error_last_name_min': 'Фамилия должна содержать минимум 2 символа',
        'signup_error_email': 'Введите email',
        'signup_error_email_invalid': 'Введите корректный email',
        'signup_error_phone': 'Введите номер телефона',
        'signup_error_phone_invalid': 'Введите корректный номер телефона',
        'signup_error_password': 'Введите пароль',
        'signup_error_password_min': 'Пароль должен содержать минимум 6 символов',
        'signup_error_confirm': 'Пароли не совпадают',
        'signup_error_terms': 'Необходимо согласиться с условиями использования',
        'signup_email_exists': 'Пользователь с таким email уже существует',
        'signup_phone_exists': 'Пользователь с таким номером телефона уже существует',
        'signup_success': 'Регистрация успешна! Перенаправление на страницу входа...',

        'home': 'ГЛАВНАЯ',
        'services': 'УСЛУГИ',
        'team': 'КОМАНДА',
        'reviews': 'ОТЗЫВЫ',
        'contacts': 'КОНТАКТЫ',
        'prices': 'ПРАЙС-ЛИСТ',
        'schedule': 'РАСПИСАНИЕ',
        'faq': 'ВОПРОС-ОТВЕТ',
        
        'modal_appointment_title': '📅 Запись на прием',
'modal_appointment_name': 'Ваше имя',
'modal_appointment_phone': 'Телефон',
'modal_appointment_email': 'Email',
'modal_appointment_select_service': 'Выберите услугу',
'modal_appointment_select_doctor': 'Выберите врача',
'modal_appointment_date': 'Дата',
'modal_appointment_time': 'Время',
'modal_appointment_comment': 'Комментарий',
'modal_appointment_comment_placeholder': 'Дополнительная информация...',
'modal_appointment_submit': '📝 ЗАПИСАТЬСЯ',
'modal_appointment_required_fields': 'Заполните все обязательные поля!',
'modal_appointment_success': '✅ Запись успешно создана! Мы свяжемся с вами для подтверждения.',
'modal_appointment_error': '❌ Ошибка при создании записи. Попробуйте позже.',
        
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
        
        'diagnostics_title': 'ДИАГНОСТИКА',
        'diagnostics_text': 'Диагностика необходима для составления качественного плана лечения, гарантирующего результат. Только профессионально организованный комплекс мероприятий может помочь грамотному специалисту поставить правильный диагноз и провести адекватное лечение.',
        'diagnostic_intro': 'Dental Club производит 3D-диагностику на оборудовании последнего поколения.',
        'tomograph_text': 'Компьютерный томограф Planmeca ProMax 3DMid – является одним из лучших в мире диагностических аппаратов.',
        'safety_text': 'ProMax 3DMid- это гарант безопасности. Уровень облучения при обследовании не превышает уровня облучения после короткого воздушного перелёта. Благодаря возможностям данного аппарата можно создавать виртуальную модель ваших зубов и костной ткани.',
        'diagnocam_text': 'DiagnoCam (KaVo, Германия)- второй инстурмент в Dental Club, применяемый для выявления мельчайших дефектов и скрытых кариозных полостей.  DiagnoCam использует лазерную систему диагностики, без облучения. Весь процесс диагностики пациент может наблюдать на мониторе.',
        'specialists_text': 'Специалисты Dental Club всегда производят обследования с применением специальных оптических увеличителей: Дентальный микроскоп Leica и бинокуляры Carl Zeiss. Точность диагноза пропорциональна коэффициенту увеличения данных приборов – в десятки раз точнее, чем при простом осмотре.',
        'team_text': 'Наша команда – профессионалы, которые ежегодно совершенствуют свои знания в ведущих медицинских учреждениях Европы.',
        'steps_description': 'У нас своя электронная картотека, позволяющая отследить все этапы лечения наших пациентов.',
        'steps_title': 'Этапы',
        'step_1': 'Анкетирование и опрос.',
        'step_2': 'Осмотр пациента в удобном кресле, с применением бинокуляров Carl Zeiss или микроскопа Leica.',
        'step_3': 'При необходимости визуализация скрытых полостей и микродефектов зубов при помощи DiagnoCam.',
        'step_4': '3D цифровая диагностика, с огромным функционалом: от локальных участков зубов, суставов и челюстей, до всех костных тканей головы.',
        'step_5': 'Обсуждение результатов с пациентом и совместное планирование лечения.',
        
        'prevention_title': 'ПРОФИЛАКТИКА КАРИЕСА',
        'prevention_text': 'Профилактика - это комплекс мер, направленных на предупреждение возникновения и развития стоматологических заболеваний. <br><br>Системный подход позволяет контролировать состояние ваших зубов и дёсен в течение всего периода наблюдения в Dental Club.',
        'prevention_tomograph_text': 'Мы оповещаем пациентов о необходимости произвести профосмотр и пройти профилактику. Специальная программа напоминает нам о вашем индивидуальном графике, исключая неточности в датах.',
        'prevention_safety_text': 'Регулярная профилактика по системе DentalClub в несколько раз снижает риск возникновения кариеса и заболеваний дёсен. Профосмотр мы рекомендуем проходить не реже двух раз в год.',
        'prevention_steps_title': 'Этапы системы Dental Club',
        'prevention_step_1': 'Оценка состояния полости рта, по степени окрашивания биоплёнки.',
        'prevention_step_2': 'Prophylflex (KaVo) — устранение биоплёнки и пигментации.',
        'prevention_step_3': 'Удаление зубного камня скалером Sonyflex (KaVo).',
        'prevention_step_4': 'Полировка фторированной пастой Proxyt (Ivoclar).',
        'prevention_step_5': 'Покрытие зубной эмали препаратом Fluor Protector (Ivoclar) для укрепления эмали.',
        'prevention_step_6': 'Индивидуальное обучение по правильному уходу за полостью рта в домашних условиях.',
        'prevention_vector_text': 'При необходимости, после этих этапов мы производим лечение дёсен аппаратом Vector (Dürr Dental).',
        
        'therapy_title': 'ТЕРАПИЯ',
        'therapy_text': 'Терапевтическая стоматология - раздел медицины, занимающийся диагностикой и лечением болезней зубов, околозубных тканей и слизистой оболочки полости рта.',
        'caries_treatment': 'ЛЕЧЕНИЕ КАРИЕСА',
        'caries_text': 'Наиболее частой причиной обращения в стоматологию является кариес. Это поражение твёрдых тканей зуба, которое при отсутствии лечения может привести к возникновению воспалительных осложнений со стороны пульпы и периодонта.<br>После тщательной диагностики, для восстановления зубов устанавливается два варианта реставраций- прямая, с помощью пломбировочного материала и непрямая: керамические вкладки, накладки. ',
        'therapy_safety_text_1': 'В Dental Club всегда проводят лечение с применением специальных оптических увеличителей: Дентальный микроскоп Leica и бинокуляры Carl Zeiss. ',
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
        
        'prosthetics_title': 'ЦИФРОВОЕ ПРОТЕЗИРОВАНИЕ',
        'prosthetics_text': 'Цифровое протезирование зубов – это направление эстетической стоматологии, с использованием цифровых технологий в моделировании и изготовлении ортопедических конструкций.',
        'prosthetics_tomograph_text': 'Согласно вашим требованиям и возможностям подбирается оптимальный вариант ортопедической конструкции. Совместно с нашей лабораторией в Dental Club изготавливаются: коронки на имплантантах, одиночные коронки, виниры, вкладки, накладки, временные и постоянные несъёмные протезы по системе Всё на 4-х и Всё на 6-ти и многое другое.',
        'prosthetics_materials_text': 'В практике Dental Club мы используем современные материалы- цирконий, IPS,E-max, керамические виниры (люминиры), в том числе на рефракторе. За счёт использования передовых технологий толщина конструкций не превышает 5 микрон, что позволяет минимально обтачивать зубы, тем самым значительно продлевая срок их службы. Такие непрямые реставрации с точки зрения эстетики никак не отличаются от естественных зубов и прослужат многие годы.',
        'prosthetics_accuracy_text': 'Точность при цифровом изготовлении ортопедических конструкций позволяет уже во второе посещение зафиксировать коронку, минуя этап примерки.',
        'prosthetics_durability_text': 'Отличительной особенностью ортопедических конструкций, изготовленных современными цифровыми методами, является прочность и устойчивость к изменению цвета. Высокая стоимость таких реставраций обоснована их надёжностью и долговечностью.',
        'prosthetics_steps_title': 'Этапы',
        'prosthetics_step_1': '1. Подготовка зуба или установленного имплантата к протезированию',
        'prosthetics_step_2': '2. Снятие слепка',
        'prosthetics_step_3': '3. Изготовление временной конструкции',
        'prosthetics_step_4': '4. Установка финальной конструкции.',
        
        'implantation_title': 'ЦИФРОВАЯ ИМПЛАНТАЦИЯ',
        'implantation_text': 'Имплантация зубов – это операция по установке имплантатов, в качестве опоры для ортопедических конструкций. <br><br>Имплантация подразделяется на: одномоментную (установка имплантата сразу после удаления зуба), одноэтапную (установка имплантата и фиксация к нему временной коронки) и двухэтапную (установка имплантата, этап приживления и последующее протезирование).',
        'implantation_navigation_text': 'В Dental Club мы используем навигационную стоматологию. Для исключения неточностей операции планируются в цифровом формате. В первую очередь мы делаем 3D снимок, сканируем полость рта пациента и после этого виртуально устанавливаем имплантаты. В программе Romexis мы моделируем хирургический шаблон, по которому устанавливается имплантат. Установка одного имплантата не требует никаких разрезов и занимает не более 10-ти минут.',
        'implantation_implants_text': 'В Dental Club мы используем  имплантаты премиум класса от европейских и американских производителей: Nobel Biocare (США-Швейцария), BioHorizons (США), MIS (Израиль). <br>Такие имплантаты отличаются по составу (степенью очистки титана, покрытием поверхности) и запатентованной формой, резьбой. Они имеют расширенные ортопедические функции и пожизненную гарантию от производителя.',
        'implantation_operation_text': 'Операция по установке имплантата в нашей клинике проводится в специализированной операционной, оснащённой самым современным оборудованием',
        'implantation_steps_title': 'Этапы цифровой имплантации:',
        'implantation_step_1': 'Диагностика и планирование: 3D снимок, сканирование модели зубов, изготовление хирургического шаблона.',
        'implantation_step_2': 'Удаление разрушенного зуба (при одномоментной имплантации).',
        'implantation_step_3': 'Установка имплантата, формирователя десны или временной коронки.',
        'implantation_step_4': 'Рекомендация к установке постоянных ортопедических конструкций максимум через 2 месяца (по показаниям)',
        
        'complex_title': 'СЛОЖНАЯ ИМПЛАНТАЦИЯ',
        'complex_text_1': 'Часто в нашу клинику обращаются пациенты, которым отказали устанавливать имплантаты в других местах или предложили длительные манипуляции по наращиванию кости.<br>',
        'complex_text_2': 'В Dental Club мы можем произвести установку имплантатов даже в самых сложных ситуациях.',
        'complex_navigation_text': 'Мы используем навигационную стоматологию. Операции планируются в цифровом формате, для исключения неточности и при наличии даже небольшого количества костной ткани мы сможем установить имплантат, не нарушая целостности кости. <br>Предварительно, перед самой операцией, мы производим виртуальную установку имплантатов в цифровой среде, после чего протокол имплантации переводим в шаблон. Использование шаблона позволяет провести операцию без разреза и избежать осложнений после имплантации. <br><br>Для особо сложных случаев, в нашем арсенале имеется методика от лидера в имплантологии, фирмы Nobel Biocare – “All-on-4” и  “All-on-6”. При состояниях, близких к полной адентии, с помощью этой методики возможно в одно посещение удалить разрушенные зубы, установить имплантаты под углом и с помощью мульти-юнит абатментов прикрепить к ним несъёмный протез.',
        'complex_training_text': 'Главный врач клиники прошёл обучение данной методике у таких светил современной имплантологии, как Мало (Испания, Аликанте), Тициано Тестори (Италия).',
        'complex_zygoma_text': 'В самых сложных случаях, при недостатке кости, на базе нашей клиники мы можем установить скуловые имплантаты Zygoma (Nobel Biocare, США). Первая в Казахстане операция по их установке была проведена в Dental Club!',
        'complex_steps_title': 'Этапы сложной имплантации (All-on-4):',
        'complex_step_1': 'Диагностика и планирование: 3D снимок, сканирование модели зубов, изготовление хирургического шаблона.',
        'complex_step_2': 'Удаление разрушенных зубов.',
        'complex_step_3': 'Установка имплантата, фиксация мульти-юнит абатментов и несъемного протеза.',
        'complex_final_text': 'По показаниям, врач ортопед установит несъёмные протезы либо в день операции, либо через 1 – 2 дня.',
        
        'orthodontics_title': 'ЭСТЕТИЧЕСКАЯ ОРТОДОНТИЯ',
        'orthodontics_text_1': 'Эстетическая ортодонтия - область стоматологии, специализирующаяся на коррекции прикуса - выравнивании зубов и создании улыбки вашей мечты.',
        'orthodontics_text_2': 'Ортодонтическое лечение не имеет строгих возрастных рамок и может проводиться как у взрослых пациентов, так и у детей!',
        'orthodontics_features': 'Ортодонтия в Dental Club - это:',
        'orthodontics_feature_1': 'Цифровые методы диагностики и планирования лечения по международным стандартам и протоколам',
        'orthodontics_feature_2': 'Лучшие самолигирующие брекет-системы, производящиеся в США (H4, American Orthodontics)ю',
        'orthodontics_feature_3': 'Системы съёмного ортодонтического лечения от компании Invisaline, лидера среди производителей элайнеров в мире.',
        'orthodontics_feature_4': 'Детская ортодонтия, позволяющая избежать проблем с прикусом в более позднем возрасте, благодаря ранней диагностике и своевременному лечению',
        'aligners_title': 'ЭЛАЙНЕРЫ',
        'aligners_text_1': 'Это индивидуально изготовленные капы из специального прозрачного материала. Они используются для коррекции зубов и считаются наиболее быстрым, современным и безболезненным методом ортодонтического лечения. ',
        'aligners_text_2': 'В клинике Dental Club мы используем элайнеры от международного лидера Invisaline (США). Такие элайнеры отличаются от других высоким качеством, цифровыми методами моделирования результата – Clincheck и надёжным сервисом.  ',
        'aligners_text_3': 'Элайнеры удобны и практически не заметны в повседневной жизни, а их форма создаётся по цифровой модели ваших зубов. В отличие от брекет-систем элайнеры можно снимать во время еды и чистки зубов.',
        'aligners_process': 'Весь процесс лечения пациент может увидеть в цифровом формате. <br>Каждый набор кап соответствует определённому этапу движения зубов в полости рта.',
        'aligners_consult': 'Специалисты нашей клиники смогут подробно проконсультировать Вас по этапам коррекции прикуса и помогут Вам получить идеально ровные зубы.',
        'aligners_certified': 'Dental Club является сертифицированной клиникой по продуктам компании Invisaline. Мы оказываем пациентам поддержку, в течение всего периода лечения.',
        
        'veneers_title': 'ВИНИРЫ. ЛЮМИНИРЫ',
        'veneers_title_main': 'ВИНИРЫ',
        'luminirs_title': 'ЛЮМИНИРЫ',
        'veneers_text': 'Виниры – это тонкие керамические пластинки, которые фиксируются на заранее обработанную поверхность, с целью изменить форму и цвет зубов.',
        'luminirs_text': 'Люминиры - это тончайшие керамические пластинки, которые одеваются прямо на поверхность зуба. На сегодняшний день этот способ реставрации зубов можно считать вершиной косметической стоматологии.',
        'veneers_materials': 'В Dental Club мы используем полный спектр материалов для изготовления и виниров и люминиров, которые подбираются индивидуально для каждого пациента. ',
        'veneers_choice': 'Выбор зависит от вашего предпочтения и показаний. Мы используем в своей практике цирконий, IPS,E-max, керамические виниры (люминиры), в том числе на рефракторе. Толщина таких пластинок до 5 микрон.',
        'veneers_preparation': 'Перед установкой виниров мы проводим детальный чек-ап полости рта чтобы убедиться, здоровы ли ваши зубы и правильный ли у Вас прикус. На компьютере создаём дизайн Вашей новой улыбки, при необходимости создаем мок-ап - моделирование формы зубов непосредственно в полости рта. Такой подход  даёт длительную гарантию и понимание конечного результата.',
        'veneers_final': 'После того, как мы скорректируем индивидуальный план и подготовим ваши зубы, останется всего лишь два финальных этапа до идеального результата.',
        'veneers_durability': 'Отличительной особенностью ортопедических конструкций, изготовленных современными цифровыми методами, является прочность и устойчивость к изменению цвета. Высокая стоимость таких реставраций обоснована их надёжностью и долговечностью.',
        'veneers_steps_title': 'Этапы установки виниров и люминиров',
        'veneers_step_1': '1. Снятие слепков, фотопротокол лица, чек-ап совместно с терапевтом и ортодонтом.',
        'veneers_step_2': '2. Моделирование цифровой версии - wax-up.',
        'veneers_step_3': '3. Перенос в полость рта временной реставрации — mock-up. ',
        'veneers_step_4': '4. Обсуждение и утверждение с пациентом новой формы и цвета.',
        'veneers_step_5': '5. Обработка зубов, снятие финального слепка, изготовление временных виниров.',
        'veneers_step_6': '6. Изготовление постоянных керамических виниров и их фиксация.',
        'veneers_step_7': '7. Финальная коррекция и полировка, фото-фиксация результата.',
        
        'team_title': 'КОМАНДА DENTAL CLUB',
        'doctor_therapist': 'Стоматолог-терапевт, детский стоматолог',
        'doctor_parodontologist': 'Стоматолог-пародонтолог',
        'doctor_hygienist': 'Стоматолог-пародонтолог, гигиенист',
        'doctor_endodontist': 'Стоматолог-терапевт, эндодонтист',
        'doctor_implantologist': 'Стоматолог-имплантолог, ортопед',
        'doctor_surgeon': 'Стоматолог-хирург, имплантолог',
        
        'specialization': 'Специализация:',
        'education': 'Образование:',
        'experience': 'Опыт работы:',
        'improvement': 'Повышение квалификации:',
        'work_time': 'Время приема:',
        
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
        'phone_placeholder': '+375 (___) ___ __ __',
        'question_placeholder': 'Введите ваш вопрос',
        'send_btn': 'ОТПРАВИТЬ ЗАЯВКУ',
        'photo_video': 'ФОТО И ВИДЕО',
        'photo_video_desc': 'Наши работы и моменты из жизни клиники',
        'modern_cabinet': 'Современный кабинет',
        'treatment_process': 'Процесс лечения',
        'team_caption': 'Команда Dental Club',
        'cozy_atmosphere': 'Уютная атмосфера',
        'happy_patients': 'Счастливые пациенты',
        'clinic_desc_1': 'Клиника Dental Club работает по европейским стандартам и уделяет особое внимание / инвестирует в обучение и профессиональный рост своих сотрудников.',
        'clinic_desc_2': 'Наши принципы: гарантировать пациентам лучшее лечение, а сотрудникам – лучшие условия труда и профессиональное развитие.',
        'clinic_desc_3': 'Если Вы хотите стать частью дружной команды и реализоваться как профессионал, присылайте Ваше резюме на почту',
        
        'contacts_title': 'КОНТАКТЫ',
        'contact_us': 'СВЯЗАТЬСЯ С НАМИ',
        'address_value': 'Беларусь, г. Могилев, ул. Ленинская, 25 (вход со стороны улицы Первомайской)',
        'mon_fri': 'Пн - Пт: 10:00 - 20:00',
        'sat': 'Сб: 10:00 - 16:00',
        'sun': 'Вс: выходной',
        'send_request': 'ОТПРАВИТЬ ЗАЯВКУ',
        
        'prices_title': 'ПРАЙС-ЛИСТ',
        'all_services': 'Все услуги',
        'all_categories': 'Категория:',
        'search': 'Поиск:',
        'search_placeholder': 'Поиск по ключевым словам',
        'loading': 'Загрузка цен...',
        'prices_note_1': '⚠️ Цены, указанные на сайте, не являются публичной офертой. Точную стоимость уточняйте у администратора клиники.',
        'prices_note_2': '📞 Для записи на прием и уточнения цены звоните:',
        
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
        
        'modal_appointment': 'Запись на прием',
        'modal_patient_name': 'ФИО пациента',
        'modal_select_service': 'Выберите услугу',
        'modal_select_doctor': 'Выберите врача',
        'modal_date': 'Дата',
        'modal_time': 'Время',
        'modal_comment': 'Комментарий',
        'modal_submit': 'ЗАПИСАТЬСЯ',
        'modal_close': 'Закрыть',
        
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
        'menu': 'MENU',
        'login': 'LOGIN',
        'profile': 'PROFILE',
        'logout': 'LOGOUT',
        'lang': 'RUS',
        
        'review_rating': 'Your rating:',
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
        'profile_edit_btn': 'Edit',
        'profile_save_btn': 'Save',
        'profile_cancel_btn': 'Cancel',
        'profile_logout_btn': 'Logout',
        'profile_admin_panel': 'Go to Admin Panel',
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

         // Login page
        'login_title': 'LOGIN',
        'login_subtitle': 'Welcome back!',
        'login_email_phone': 'Email or phone',
        'login_email_phone_placeholder': 'example@mail.com or +375 (29) 123-45-67',
        'login_password': 'Password',
        'login_password_placeholder': 'Enter your password',
        'login_remember': 'Remember me',
        'login_button': 'LOGIN',
        'login_no_account': 'Don\'t have an account?',
        'login_register_link': 'Sign up',
        'login_error_required': 'Enter email/phone',
        'login_error_password_required': 'Enter password',
        'login_error_invalid': 'Invalid email/phone or password',
        'login_success': 'Login successful! Redirecting...',
        'login_server_error': 'Server connection error. Please start json-server',

        // Signup page
        'signup_title': 'CREATE ACCOUNT',
        'signup_subtitle': 'Fill out the form to register',
        'signup_first_name': 'First Name',
        'signup_first_name_placeholder': 'Enter your first name',
        'signup_last_name': 'Last Name',
        'signup_last_name_placeholder': 'Enter your last name',
        'signup_email': 'Email',
        'signup_email_placeholder': 'example@mail.com',
        'signup_phone': 'Phone',
        'signup_phone_placeholder': '+375 (29) 123-45-67',
        'signup_password': 'Password',
        'signup_password_placeholder': 'Minimum 6 characters',
        'signup_confirm_password': 'Confirm Password',
        'signup_confirm_password_placeholder': 'Repeat password',
        'signup_agree_terms': 'I agree to the',
        'signup_terms_link': 'Terms of Use',
        'signup_and': 'and',
        'signup_privacy_link': 'Privacy Policy',
        'signup_button': 'SIGN UP',
        'signup_have_account': 'Already have an account?',
        'signup_login_link': 'Login',
        'signup_error_first_name': 'Enter your first name',
        'signup_error_first_name_min': 'First name must be at least 2 characters',
        'signup_error_last_name': 'Enter your last name',
        'signup_error_last_name_min': 'Last name must be at least 2 characters',
        'signup_error_email': 'Enter email',
        'signup_error_email_invalid': 'Enter a valid email',
        'signup_error_phone': 'Enter phone number',
        'signup_error_phone_invalid': 'Enter a valid phone number',
        'signup_error_password': 'Enter password',
        'signup_error_password_min': 'Password must be at least 6 characters',
        'signup_error_confirm': 'Passwords do not match',
        'signup_error_terms': 'You must agree to the terms of use',
        'signup_email_exists': 'User with this email already exists',
        'signup_phone_exists': 'User with this phone number already exists',
        'signup_success': 'Registration successful! Redirecting to login page...',

        'home': 'HOME',
        'services': 'SERVICES',
        'team': 'TEAM',
        'reviews': 'REVIEWS',
        'contacts': 'CONTACTS',
        'prices': 'PRICE LIST',
        'schedule': 'SCHEDULE',
        'faq': 'FAQ',
        
        'modal_appointment_title': '📅 Book Appointment',
'modal_appointment_name': 'Your name',
'modal_appointment_phone': 'Phone',
'modal_appointment_email': 'Email',
'modal_appointment_select_service': 'Select service',
'modal_appointment_select_doctor': 'Select doctor',
'modal_appointment_date': 'Date',
'modal_appointment_time': 'Time',
'modal_appointment_comment': 'Comment',
'modal_appointment_comment_placeholder': 'Additional information...',
'modal_appointment_submit': '📝 BOOK NOW',
'modal_appointment_required_fields': 'Please fill in all required fields!',
'modal_appointment_success': '✅ Appointment created successfully! We will contact you for confirmation.',
'modal_appointment_error': '❌ Error creating appointment. Please try again later.',

        'hero_title': 'Dental Club — Dental Clinic in Mogilev',
        'search_placeholder': '🔍 Search the site...',
        'hero_title_full': 'DENTAL CLINIC',
        'city_text': 'IN MOGILEV',
        'appointment_btn': 'BOOK APPOINTMENT',
        'clinic_name': 'CLINIC DENTAL CLUB',
        'clinic_desc': 'The first clinic in Belarus providing a full range of dental services at European level. We use advanced equipment and digital technologies.',
        'advantages_title': 'OUR',
        'advantages_subtitle': 'ADVANTAGES',
        'advantage_1': 'Equipment and materials from leading global brands.',
        'advantage_2': 'Professionals who master the most modern techniques.',
        'advantage_3': 'Reliability and guarantees.',
        'advantage_4': 'Absolute confidence in treatment results.',
        'advantage_5': 'Individual approach and saving patient time.',
        'advantage_6': 'Impeccable service and pleasant interior.',
        
        'diagnostics_title': 'DIAGNOSTICS',
        'diagnostics_text': 'Diagnostics is necessary to create a quality treatment plan that guarantees results. Only a professionally organized set of measures can help a competent specialist make the correct diagnosis and provide adequate treatment.',
        'diagnostic_intro': 'Dental Club performs 3D diagnostics using the latest generation equipment.',
        'tomograph_text': 'The Planmeca ProMax 3DMid computed tomograph is one of the best diagnostic devices in the world. Thanks to the capabilities of this device, it is possible to create a virtual model of your teeth and bone tissue.',
        'safety_text': 'ProMax 3DMid is a safety guarantee. The radiation level during examination does not exceed the radiation level after a short air flight.',
        'diagnocam_text': 'DiagnoCam (KaVo, Germany) is the second tool in Dental Club, used to detect the smallest defects and hidden carious cavities. DiagnoCam uses a laser diagnostic system without radiation. The patient can watch the entire diagnostic process on the monitor.',
        'specialists_text': 'Dental Club specialists always perform examinations using special optical magnifiers: Leica dental microscope and Carl Zeiss binoculars. The accuracy of the diagnosis is proportional to the magnification factor of these devices - tens of times more accurate than with a simple examination.',
        'team_text': 'Our team consists of professionals who annually improve their knowledge in leading medical institutions in Europe.',
        'steps_description': 'We have our own electronic file system that allows us to track all stages of treatment of our patients.',
        'steps_title': 'Stages',
        'step_1': 'Questioning and interview.',
        'step_2': 'Examination of the patient in a comfortable chair using Carl Zeiss binoculars or a Leica microscope.',
        'step_3': 'If necessary, visualization of hidden cavities and micro-defects of teeth using DiagnoCam.',
        'step_4': '3D digital diagnostics, with great functionality: from local areas of teeth, joints and jaws, to all bone tissues of the head.',
        'step_5': 'Discussion of results with the patient and joint treatment planning.',
        
        'prevention_title': 'CARIES PREVENTION',
        'prevention_text': 'Prevention is a set of measures aimed at preventing the occurrence and development of dental diseases. A systematic approach allows you to monitor the condition of your teeth and gums throughout the entire observation period at Dental Club.',
        'prevention_tomograph_text': 'We notify patients about the need for a professional examination and prevention.',
        'prevention_safety_text': 'Regular prevention using the Dental Club system reduces the risk of caries and gum disease several times.',
        'prevention_steps_title': 'Stages of the Dental Club system',
        'prevention_step_1': 'Assessment of the oral cavity condition, by the degree of biofilm staining.',
        'prevention_step_2': 'Prophylflex (KaVo) — removal of biofilm and pigmentation.',
        'prevention_step_3': 'Removal of tartar with Sonyflex scaler (KaVo).',
        'prevention_step_4': 'Polishing with fluoridated paste Proxyt (Ivoclar).',
        'prevention_step_5': 'Coating tooth enamel with Fluor Protector (Ivoclar) to strengthen the enamel.',
        'prevention_step_6': 'Individual training on proper oral care at home.',
        'prevention_vector_text': 'If necessary, after these stages, we treat gums with the Vector device (Dürr Dental).',
        
        'therapy_title': 'THERAPY',
        'therapy_text': 'Therapeutic dentistry is a branch of medicine dealing with the diagnosis and treatment of diseases of teeth, periodontal tissues and oral mucosa.',
        'caries_treatment': 'CARIES TREATMENT',
        'caries_text': 'The most common reason for visiting a dentist is caries. This is a damage to the hard tissues of the tooth, which, if left untreated, can lead to inflammatory complications from the pulp and periodontium. After a thorough diagnosis, two types of restorations are used to restore teeth - direct, using filling material, and indirect: ceramic inlays, onlays.',
        'therapy_safety_text_1': 'At Dental Club, treatment is always performed using special optical magnifiers: Leica dental microscope and Carl Zeiss binoculars.',
        'therapy_safety_text_2': 'For direct restorations, we use the best German filling materials from Ivoclar. High-quality instruments from LM (Finland) allow us to achieve a highly aesthetic result that is indistinguishable from a natural tooth.',
        'therapy_safety_text_3': 'Inlays and onlays are manufactured in our laboratory from materials such as: zirconium oxide, IPS.E-max, ceramics. Secondary caries does not occur under such restorations, and they will last significantly longer than fillings.',
        'therapy_steps_title': 'Stages of caries treatment (fillings)',
        'visit_1': '1st visit',
        'visit_2': '2nd visit',
        'step_anesthesia': 'Anesthesia',
        'step_preparation': 'Preparation of the carious process and removal of old restorations',
        'step_impression': 'Taking an impression',
        'step_temporary': 'Making a temporary filling',
        'step_polishing': 'Grinding and polishing of the temporary filling',
        'step_remove_temporary': 'Removal of temporary filling',
        'step_processing': 'Processing of the inlay and tooth cavity',
        'step_fixation': 'Fixation of the inlay on composite cement',
        'step_final_polishing': 'Grinding and polishing',
        
        'prosthetics_title': 'DIGITAL PROSTHETICS',
        'prosthetics_text': 'Digital prosthetics is a direction of aesthetic dentistry that uses digital technologies in the modeling and manufacture of orthopedic structures.',
        'prosthetics_tomograph_text': 'According to your requirements and capabilities, the optimal variant of the orthopedic structure is selected. Together with our laboratory at Dental Club, we manufacture: crowns on implants, single crowns, veneers, inlays, onlays, temporary and permanent fixed dentures using the All-on-4 and All-on-6 systems, and much more.',
        'prosthetics_materials_text': 'In Dental Club practice, we use modern materials - zirconium, IPS.E-max, ceramic veneers (lumineers), including on a refractor. Due to the use of advanced technologies, the thickness of structures does not exceed 5 microns, which allows minimal tooth grinding, thereby significantly extending their service life. Such indirect restorations are no different from natural teeth in terms of aesthetics and will last for many years.',
        'prosthetics_accuracy_text': 'The accuracy in the digital manufacture of orthopedic structures allows you to fix the crown at the second visit, bypassing the fitting stage.',
        'prosthetics_durability_text': 'A distinctive feature of orthopedic structures manufactured using modern digital methods is strength and resistance to color change. The high cost of such restorations is justified by their reliability and durability.',
        'prosthetics_steps_title': 'Stages',
        'prosthetics_step_1': '1. Preparation of the tooth or installed implant for prosthetics',
        'prosthetics_step_2': '2. Taking an impression',
        'prosthetics_step_3': '3. Manufacturing of a temporary structure',
        'prosthetics_step_4': '4. Installation of the final structure.',
        
        'implantation_title': 'DIGITAL IMPLANTATION',
        'implantation_text': 'Dental implantation is an operation to install implants as a support for orthopedic structures. Implantation is divided into: immediate (installation of the implant immediately after tooth extraction), one-stage (installation of the implant and fixation of a temporary crown to it) and two-stage (installation of the implant, the engraftment stage and subsequent prosthetics).',
        'implantation_navigation_text': 'At Dental Club, we use navigational dentistry. To eliminate inaccuracies, operations are planned in digital format. First, we take a 3D image, scan the patient\'s oral cavity, and then virtually install the implants. In the Romexis program, we model a surgical template by which the implant is installed. Installing one implant does not require any incisions and takes no more than 10 minutes.',
        'implantation_implants_text': 'At Dental Club, we use premium class implants from European and American manufacturers: Nobel Biocare (USA-Switzerland), BioHorizons (USA), MIS (Israel). Such implants differ in composition (degree of titanium purification, surface coating) and patented shape and thread. They have expanded orthopedic functions and a lifetime warranty from the manufacturer.',
        'implantation_operation_text': 'The operation to install an implant in our clinic is carried out in a specialized operating room equipped with the most modern equipment.',
        'implantation_steps_title': 'Stages of digital implantation:',
        'implantation_step_1': 'Diagnostics and planning: 3D image, scanning of the tooth model, manufacturing of a surgical template.',
        'implantation_step_2': 'Removal of a destroyed tooth (with immediate implantation).',
        'implantation_step_3': 'Installation of the implant, gum former or temporary crown.',
        'implantation_step_4': 'Recommendation for the installation of permanent orthopedic structures in a maximum of 2 months (as indicated).',
        
        'complex_title': 'COMPLEX IMPLANTATION',
        'complex_text_1': 'Often patients come to our clinic who were refused implants elsewhere or were offered lengthy bone augmentation procedures.',
        'complex_text_2': 'At Dental Club, we can install implants even in the most difficult situations.',
        'complex_navigation_text': 'We use navigational dentistry. Operations are planned in digital format to eliminate inaccuracies and even with a small amount of bone tissue, we can install the implant without violating the integrity of the bone.',
        'complex_virtual_text': 'Before the operation itself, we perform a virtual installation of implants in a digital environment, after which we transfer the implantation protocol to a template. The use of a template allows the operation to be performed without an incision and to avoid complications after implantation.',
        'complex_allon_text': 'For particularly complex cases, we have the "All-on-4" and "All-on-6" techniques from the leader in implantology, Nobel Biocare. In conditions close to complete edentulism, using this technique, it is possible in one visit to remove destroyed teeth, install implants at an angle and attach a fixed denture to them using multi-unit abutments.',
        'complex_training_text': 'The chief physician of the clinic has been trained in this technique by such luminaries of modern implantology as Malo (Spain, Alicante), Tiziano Testori (Italy).',
        'complex_zygoma_text': 'In the most difficult cases, with a lack of bone, at our clinic we can install Zygoma implants (Nobel Biocare, USA). The first operation in Kazakhstan to install them was performed at Dental Club!',
        'complex_steps_title': 'Stages of complex implantation (All-on-4):',
        'complex_step_1': 'Diagnostics and planning: 3D image, scanning of the tooth model, manufacturing of a surgical template.',
        'complex_step_2': 'Removal of destroyed teeth.',
        'complex_step_3': 'Implant installation, fixation of multi-unit abutments and fixed denture.',
        'complex_final_text': 'According to indications, the orthopedic doctor will install fixed dentures either on the day of surgery or after 1-2 days.',
        
        'orthodontics_title': 'AESTHETIC ORTHODONTICS',
        'orthodontics_text_1': 'Aesthetic orthodontics is a field of dentistry specializing in bite correction - straightening teeth and creating the smile of your dreams.',
        'orthodontics_text_2': 'Orthodontic treatment has no strict age restrictions and can be performed on both adults and children!',
        'orthodontics_features': 'Orthodontics at Dental Club includes:',
        'orthodontics_feature_1': 'Digital methods of diagnostics and treatment planning according to international standards and protocols.',
        'orthodontics_feature_2': 'The best self-ligating bracket systems manufactured in the USA (H4, American Orthodontics).',
        'orthodontics_feature_3': 'Removable orthodontic treatment systems from Invisalign, the world leader in aligner manufacturing.',
        'orthodontics_feature_4': 'Pediatric orthodontics, which allows you to avoid bite problems at a later age, thanks to early diagnosis and timely treatment.',
        'aligners_title': 'ALIGNERS',
        'aligners_text_1': 'These are individually made mouthguards of special transparent material. They are used to correct teeth and are considered the fastest, most modern and painless method of orthodontic treatment.',
        'aligners_text_2': 'At Dental Club, we use aligners from the international leader Invisalign (USA). Such aligners differ from others in high quality, digital methods of result modeling – Clincheck, and reliable service.',
        'aligners_text_3': 'Aligners are comfortable and almost invisible in everyday life, and their shape is created based on a digital model of your teeth. Unlike bracket systems, aligners can be removed while eating and brushing your teeth.',
        'aligners_process': 'The patient can see the entire treatment process in digital format. Each set of aligners corresponds to a specific stage of tooth movement in the oral cavity.',
        'aligners_consult': 'Our specialists will be able to advise you in detail on the stages of bite correction and help you get perfectly straight teeth.',
        'aligners_certified': 'Dental Club is a certified clinic for Invisalign products. We provide patients with support throughout the entire treatment period.',
        
        'veneers_title': 'VENEERS. LUMINEERS',
        'veneers_title_main': 'VENEERS',
        'luminirs_title': 'LUMINEERS',
        'veneers_text': 'Veneers are thin ceramic plates that are fixed to a pre-treated surface in order to change the shape and color of teeth.',
        'luminirs_text': 'Lumineers are the thinnest ceramic plates that are placed directly onto the tooth surface. The thickness of such plates is up to 5 microns.',
        'veneers_materials': 'At Dental Club, we use a full range of materials for the manufacture of veneers and lumineers, which are selected individually for each patient.',
        'veneers_choice': 'The choice depends on your preference and indications. We use zirconium, IPS.E-max, ceramic veneers (lumineers), including on a refractor, in our practice. The thickness of such plates is up to 5 microns.',
        'veneers_preparation': 'Before installing veneers, we conduct a detailed check-up of the oral cavity to make sure your teeth are healthy and your bite is correct. On the computer, we create the design of your new smile, and if necessary, we create a mock-up - modeling the shape of the teeth directly in the oral cavity. This approach provides a long-term guarantee and understanding of the final result.',
        'veneers_final': 'After we adjust the individual plan and prepare your teeth, only two final stages remain to achieve the ideal result.',
        'veneers_durability': 'A distinctive feature of orthopedic structures manufactured using modern digital methods is strength and resistance to color change. The high cost of such restorations is justified by their reliability and durability.',
        'veneers_steps_title': 'Stages of installation of veneers and lumineers',
        'veneers_step_1': 'Taking impressions, facial photo protocol, check-up together with a therapist and orthodontist.',
        'veneers_step_2': 'Modeling of the digital version - wax-up.',
        'veneers_step_3': 'Transfer to the oral cavity of a temporary restoration — mock-up.',
        'veneers_step_4': 'Discussion and approval with the patient of the new shape and color.',
        'veneers_step_5': 'Tooth processing, taking the final impression, manufacturing temporary veneers.',
        'veneers_step_6': 'Manufacturing of permanent ceramic veneers and their fixation.',
        'veneers_step_7': 'Final correction and polishing, photo recording of the result.',
        
        'team_title': 'DENTAL CLUB TEAM',
        'doctor_therapist': 'General Dentist, Pediatric Dentist',
        'doctor_parodontologist': 'Periodontist',
        'doctor_hygienist': 'Periodontist, Hygienist',
        'doctor_endodontist': 'General Dentist, Endodontist',
        'doctor_implantologist': 'Implantologist, Orthopedist',
        'doctor_surgeon': 'Oral Surgeon, Implantologist',
        
        'specialization': 'Specialization:',
        'education': 'Education:',
        'experience': 'Work experience:',
        'improvement': 'Advanced training:',
        'work_time': 'Working hours:',
        
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
        'phone_placeholder': '+375 (___) ___ __ __',
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
        'clinic_desc_2': 'Our principles: to guarantee patients the best treatment, and employees the best working conditions and professional development.',
        'clinic_desc_3': 'If you want to become part of a friendly team and realize yourself as a professional, send your resume to:',
        
        'contacts_title': 'CONTACTS',
        'contact_us': 'CONTACT US',
        'address_value': 'Belarus, Mogilev, Leninskaya str., 25 (entrance from Pervomayskaya str.)',
        'mon_fri': 'Mon - Fri: 10:00 - 20:00',
        'sat': 'Sat: 10:00 - 16:00',
        'sun': 'Sun: closed',
        'send_request': 'SEND REQUEST',
        
        'prices_title': 'PRICE LIST',
        'all_services': 'All services',
        'all_categories': 'Category:',
        'search': 'Search:',
        'search_placeholder': 'Search by keywords',
        'loading': 'Loading prices...',
        'prices_note_1': '⚠️ The prices listed on the website are not a public offer. Please check the exact cost with the clinic administrator.',
        'prices_note_2': '📞 To make an appointment and clarify the price, call:',
        
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
        
        'modal_appointment': 'Book appointment',
        'modal_patient_name': 'Full name',
        'modal_select_service': 'Select service',
        'modal_select_doctor': 'Select doctor',
        'modal_date': 'Date',
        'modal_time': 'Time',
        'modal_comment': 'Comment',
        'modal_submit': 'BOOK',
        'modal_close': 'Close',
        
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
                element.innerHTML = t[key];  
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
        if (langText) {
            langText.textContent = currentLanguage === 'ru' ? 'АНГЛ' : 'RUS';
        }
    }
    
    const mobileLangSelector = document.querySelector('.mobile-lang-selector');
    if (mobileLangSelector) {
        mobileLangSelector.textContent = currentLanguage === 'ru' ? 'АНГЛ' : 'RUS';
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
        if (langText) langText.textContent = currentLanguage === 'ru' ? 'RUS' : 'АНГЛ';
    }
    
    const mobileLangSelector = document.querySelector('.mobile-lang-selector');
    if (mobileLangSelector) {
        mobileLangSelector.textContent = currentLanguage === 'ru' ? 'RUS' : 'АНГЛ';
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