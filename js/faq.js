
const FAQ_STORAGE_KEY = 'dental_faq';

const defaultFaq = [
    { 
        id: 1, 
        question: 'Как записаться на прием в Dental Club?', 
        answer: 'Вы можете записаться на прием несколькими способами: по телефону +375 (29) 123-45-67, через форму обратной связи на сайте, через администратора клиники при личном визите, или через онлайн-форму на странице "Запись на прием". Также доступна запись через мессенджеры WhatsApp и Telegram.',
        category: 'Запись и визиты',
        order: 1,
        active: true
    },
    { 
        id: 2, 
        question: 'Нужно ли брать с собой какие-то документы на первый прием?', 
        answer: 'При первом визите желательно иметь при себе паспорт. Если у вас есть предыдущие снимки (рентген, КТ) или выписки от других стоматологов, захватите их - это поможет врачу составить полную картину вашего здоровья и избежать повторных исследований.',
        category: 'Запись и визиты',
        order: 2,
        active: true
    },
    { 
        id: 3, 
        question: 'Как отменить или перенести запись?', 
        answer: 'Вы можете отменить или перенести запись по телефону +375 (29) 123-45-67 не позднее чем за 24 часа до назначенного времени. Это позволит нам предложить освободившееся время другим пациентам.',
        category: 'Запись и визиты',
        order: 3,
        active: true
    },

    { 
        id: 4, 
        question: 'Как часто нужно проходить профилактический осмотр?', 
        answer: 'Мы рекомендуем проходить профилактический осмотр не реже 2 раз в год. Это позволяет своевременно выявить проблемы на ранних стадиях и избежать сложного и дорогостоящего лечения.',
        category: 'Услуги',
        order: 4,
        active: true
    },
    { 
        id: 5, 
        question: 'Сколько времени занимает установка имплантата?', 
        answer: 'Установка одного имплантата занимает от 20 до 40 минут. Процедура проводится под местной анестезией и абсолютно безболезненна. Полный процесс имплантации с протезированием может занять от 3 до 6 месяцев.',
        category: 'Услуги',
        order: 5,
        active: true
    },
    { 
        id: 6, 
        question: 'Больно ли лечить зубы?', 
        answer: 'Современная стоматология в Dental Club практически безболезненна. Мы используем эффективные местные анестетики, которые полностью блокируют болевые ощущения. Перед инъекцией наносится анестезирующий гель.',
        category: 'Услуги',
        order: 6,
        active: true
    },

    { 
        id: 7, 
        question: 'Какие методы оплаты вы принимаете?', 
        answer: 'Мы принимаем оплату наличными, банковскими картами (Visa, MasterCard, Белкарт), а также возможна оплата через банковский перевод. Для юридических лиц предоставляем все необходимые документы для безналичного расчета.',
        category: 'Цены и оплата',
        order: 7,
        active: true
    },
    { 
        id: 8, 
        question: 'Есть ли у вас рассрочка или кредит на лечение?', 
        answer: 'Да, мы сотрудничаем с несколькими банками и можем предложить рассрочку или кредит на стоматологическое лечение. Рассрочка предоставляется без процентов на срок до 12 месяцев. Подробности уточняйте у администратора.',
        category: 'Цены и оплата',
        order: 8,
        active: true
    },
    { 
        id: 9, 
        question: 'Принимаете ли вы по страховке (ДМС)?', 
        answer: 'Да, мы работаем с большинством страховых компаний. Рекомендуем уточнить наличие договора с вашей страховой компанией перед визитом.',
        category: 'Цены и оплата',
        order: 9,
        active: true
    },

    { 
        id: 10, 
        question: 'Какой врач лечит детей?', 
        answer: 'Детским стоматологом в Dental Club работает Волкова Екатерина Андреевна. Она специализируется на лечении кариеса, пульпита у детей, а также проводит профилактику стоматологических заболеваний.',
        category: 'Врачи',
        order: 10,
        active: true
    },
    { 
        id: 11, 
        question: 'Какой врач занимается имплантацией?', 
        answer: 'Имплантацию в Dental Club проводит Щеголев Дмитрий Владиславович — стоматолог-имплантолог, ортопед с более чем 30-летним опытом работы.',
        category: 'Врачи',
        order: 11,
        active: true
    },
    { 
        id: 12, 
        question: 'Можно ли выбрать врача при записи?', 
        answer: 'Да, при записи вы можете выбрать любого врача из нашего штата. На странице "Команда" вы можете ознакомиться с профилями всех специалистов.',
        category: 'Врачи',
        order: 12,
        active: true
    },

    { 
        id: 13, 
        question: 'Есть ли у вас парковка для пациентов?', 
        answer: 'Да, у клиники есть собственная охраняемая парковка для пациентов. Вход на парковку со стороны улицы Первомайской. Парковка бесплатная.',
        category: 'Общие',
        order: 13,
        active: true
    },
    { 
        id: 14, 
        question: 'Как обеспечивается стерильность инструментов?', 
        answer: 'В Dental Club действует многоступенчатая система стерилизации: ультразвуковая очистка, упаковка в индивидуальные пакеты, стерилизация в автоклаве при 134°C. Все инструменты проходят полный цикл стерилизации.',
        category: 'Общие',
        order: 14,
        active: true
    },
    { 
        id: 15, 
        question: 'Предоставляете ли вы гарантию на лечение?', 
        answer: 'Да, на все виды лечения предоставляется гарантия: на пломбирование — 1 год, на эндодонтическое лечение — 2 года, на протезирование — до 5 лет.',
        category: 'Общие',
        order: 15,
        active: true
    }
];

function loadFaqData() {
    const stored = localStorage.getItem(FAQ_STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    } else {
        localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(defaultFaq));
        return [...defaultFaq];
    }
}

// Отображение FAQ
function displayFaq() {
    const container = document.getElementById('faqList');
    if (!container) return;
    
    const faq = loadFaqData();
    const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
    const searchQuery = document.getElementById('faqSearchInput')?.value.toLowerCase() || '';
    
    let filtered = faq.filter(item => item.active);
    
    // Фильтр по категории
    if (activeCategory !== 'all') {
        filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Фильтр по поиску
    if (searchQuery) {
        filtered = filtered.filter(item => 
            item.question.toLowerCase().includes(searchQuery) || 
            item.answer.toLowerCase().includes(searchQuery)
        );
    }
    
    // Сортировка по order
    filtered.sort((a, b) => a.order - b.order);
    
    const noResults = document.getElementById('noResults');
    if (filtered.length === 0) {
        if (container) container.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    if (noResults) noResults.style.display = 'none';
    
    let html = '';
    filtered.forEach(item => {
        html += `
            <div class="faq-item" data-id="${item.id}">
                <div class="faq-question" onclick="toggleFaq(this)">
                    <h3>${escapeHtmlForFaq(item.question)}</h3>
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    <p>${escapeHtmlForFaq(item.answer).replace(/\n/g, '<br>')}</p>
                    <span class="faq-category-badge">${escapeHtmlForFaq(item.category)}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const toggle = element.querySelector('.faq-toggle');
    
    if (answer.classList.contains('show')) {
        answer.classList.remove('show');
        toggle.classList.remove('open');
    } else {
        answer.classList.add('show');
        toggle.classList.add('open');
    }
}

function escapeHtmlForFaq(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function initCategories() {
    const btns = document.querySelectorAll('.category-btn');
    btns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();  
            e.stopImmediatePropagation(); 
            
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            displayFaq();
            
            return false;
        });
    });
}

function resetFilters() {
    const searchInput = document.getElementById('faqSearchInput');
    if (searchInput) searchInput.value = '';
    
    const allBtn = document.querySelector('.category-btn[data-category="all"]');
    if (allBtn) {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
    }
    
    displayFaq();
}

document.addEventListener('DOMContentLoaded', function() {
    displayFaq();
    initCategories();
    
    const searchInput = document.getElementById('faqSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', displayFaq);
    }
    
    const resetBtn = document.querySelector('.btn-reset-faq');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
});

window.toggleFaq = toggleFaq;