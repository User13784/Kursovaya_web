async function loadFaqData() {
    try {
        const faq = await getFaq({ active: true });
        return faq;
    } catch (error) {
        console.error('Ошибка загрузки FAQ:', error);
        return [];
    }
}

async function displayFaq() {
    const container = document.getElementById('faqList');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Загрузка вопросов...</div>';
    
    const faq = await loadFaqData();
    const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
    const searchQuery = document.getElementById('faqSearchInput')?.value.toLowerCase() || '';
    
    let filtered = faq.filter(item => item.active !== false);
    
    if (activeCategory !== 'all') {
        filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    if (searchQuery) {
        filtered = filtered.filter(item => 
            item.question.toLowerCase().includes(searchQuery) || 
            item.answer.toLowerCase().includes(searchQuery)
        );
    }
    
    filtered.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    const noResults = document.getElementById('noResults');
    if (filtered.length === 0) {
        container.innerHTML = '';
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
        
        newBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            await displayFaq();
            
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