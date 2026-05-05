async function loadReviews() {
    try {
        const response = await fetch('http://localhost:3000/reviews');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const reviews = await response.json();
        
        if (reviews && reviews.length > 0) {
            console.log(`✅ Загружено ${reviews.length} отзывов из JSON Server`);
            return reviews.filter(r => r.published === true);
        } else {
            console.log('ℹ️ В JSON Server нет отзывов');
            return [];
        }
    } catch (error) {
        console.error('❌ Ошибка загрузки отзывов из JSON Server:', error);
        console.log('⚠️ Убедитесь, что JSON Server запущен: json-server --watch db.json --port 3000 --cors');
        return [];
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatReviewText(text, author) {
    if (!text) return '';
    
    if (author === 'Айгуль Ахметова') {
        const parts = text.split(/(?<=[.!?])\s+(?=[А-Я])/);
        let html = '';
        for (let i = 0; i < Math.min(parts.length, 4); i++) {
            if (parts[i] && parts[i].trim()) {
                html += `<p>${escapeHtml(parts[i].trim())}</p>`;
            }
        }
        return html;
    }
    
    if (author === 'Лариса Мухамеджанова') {
        return `
            <p>Я лечусь у Дмитрия Щеголева уже 20 лет. За это время выросла дочь, подросла внучка. И, разумеется мы все – пациенты данной клиники.</p>
            <p>Очень коротко объясняю, почему:</p>
            <ul class="review-points">
                <li>здесь - сверхстандарты безопасности, при которых исключены всякие воспаления, флюсы, заражения и прочее;</li>
                <li>абсолютная надежность и доверие, что лечение пройдет без боли и без всяких ошибок, без лишних трат с понятным ценообразованием;</li>
                <li>уверенность в том, что тебя лечит профи, умный, талантливый и любящий свое дело врач на новейшем оборудовании с использованием не допотопных, а нормальных технологий 21 века.</li>
            </ul>
        `;
    }
    
    if (author === 'Эленора Тен') {
        return `
            <p>Хотелось бы поблагодарить команду Dental Club за профессионализм, квалифицированный подход в лечении.</p>
            <p>Благодаря прекрасному, чуткому врачу Дмитрию Щёголева в клинике витает атмосфера добра, уверенности, защищённости и спокойствия. К такому специалисту всегда приятно идти на приём.</p>
            <p>Я всем и всегда рекомендую Dental Club!</p>
        `;
    }
    
    const paragraphs = text.split(/\n\n+|\r\n\r\n+/);
    let html = '';
    for (const paragraph of paragraphs) {
        if (paragraph.trim()) {
            html += `<p>${escapeHtml(paragraph.trim())}</p>`;
        }
    }
    
    return html;
}

async function displayReviews() {
    const reviewsContainer = document.getElementById('reviewsListContainer');
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = '<div class="loading-reviews">Загрузка отзывов...</div>';
    
    const reviews = await loadReviews();
    const reviewsSection = document.getElementById('reviewsSection');
    
    if (!reviews || reviews.length === 0) {
        if (reviewsSection) {
            reviewsSection.style.display = 'none';
        }
        reviewsContainer.innerHTML = '';
        return;
    }
    
    if (reviewsSection) {
        reviewsSection.style.display = 'block';
    }
    
    let html = '';
    
    reviews.forEach((review, index) => {
        let photo = review.photo || '';
        
        const isLogoReview = review.author === 'Эленора Тен' || photo.includes('logo');
        
        if (!photo || photo === '') {
            photo = '../assets/images/logo/logo4.png';
        }
        
        const reviewHtml = formatReviewText(review.text, review.author);
        
        html += `
            <div class="review-card">
                <div class="review-img ${isLogoReview ? 'logo-placeholder' : ''}">
                    <img src="${photo}" alt="${escapeHtml(review.author)}" onerror="this.src='../assets/images/logo/logo4.png'">
                </div>
                <div class="review-content">
                    <h3>${escapeHtml(review.author)}</h3>
                    ${review.userInfo ? `<p class="user-info">${escapeHtml(review.userInfo)}</p>` : ''}
                    ${reviewHtml}
                </div>
            </div>
        `;
    });
    
    reviewsContainer.innerHTML = html;
}

async function submitReview(event) {
    event.preventDefault();
    
    const name = document.getElementById('reviewName')?.value?.trim() || '';
    const email = document.getElementById('reviewEmail')?.value?.trim() || '';
    const phone = document.getElementById('reviewPhone')?.value?.trim() || '';
    const reviewText = document.getElementById('reviewText')?.value?.trim() || '';
    
    if (!name) {
        alert('Пожалуйста, введите ваше имя!');
        return;
    }
    
    if (!email) {
        alert('Пожалуйста, введите email!');
        return;
    }
    
    if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) {
        alert('Пожалуйста, введите корректный email!');
        return;
    }
    
    if (!reviewText) {
        alert('Пожалуйста, напишите ваш отзыв!');
        return;
    }
    
    const cleanPhone = phone.replace(/\D/g, '');
    
    const reviewData = {
        id: Date.now(),
        author: name,
        email: email,
        phone: cleanPhone,
        text: reviewText,
        rating: 5,
        photo: '',
        userInfo: '',
        published: false, 
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    };
    
    const submitBtn = document.querySelector('#reviewForm button[type="submit"]');
    const originalText = submitBtn?.textContent || 'ОТПРАВИТЬ ОТЗЫВ';
    if (submitBtn) {
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
    }
    
    try {
        const response = await fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const savedReview = await response.json();
        console.log('✅ Отзыв сохранен в JSON Server:', savedReview);
        
        alert('✅ Спасибо за ваш отзыв! Он будет опубликован после проверки модератором.');
        
        document.getElementById('reviewForm').reset();
        
        const modal = document.getElementById('reviewModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
        
    } catch (error) {
        console.error('❌ Ошибка при отправке отзыва:', error);
        alert('❌ Ошибка подключения к серверу. Убедитесь, что JSON Server запущен: json-server --watch db.json --port 3000 --cors');
    } finally {
        if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
}

async function submitFeedback(event) {
    event.preventDefault();
    
    const name = document.getElementById('feedbackName')?.value?.trim() || '';
    const email = document.getElementById('feedbackEmail')?.value?.trim() || '';
    const phone = document.getElementById('feedbackPhone')?.value?.trim() || '';
    const question = document.getElementById('feedbackQuestion')?.value?.trim() || '';
    
    if (!name || !email || !question) {
        alert('Пожалуйста, заполните имя, email и вопрос!');
        return;
    }
    
    alert('✅ Ваше сообщение отправлено! Наш администратор свяжется с вами в ближайшее время.');
    document.getElementById('feedbackForm').reset();
}

function initReviewModal() {
    const modal = document.getElementById('reviewModal');
    const openModalBtn = document.getElementById('openReviewModal');
    const closeModalBtn = document.querySelector('.modal-close');
    
    if (!modal) return;
    
    function openModal() {
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }
    
    if (openModalBtn) {
        const newBtn = openModalBtn.cloneNode(true);
        openModalBtn.parentNode.replaceChild(newBtn, openModalBtn);
        newBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        const newCloseBtn = closeModalBtn.cloneNode(true);
        closeModalBtn.parentNode.replaceChild(newCloseBtn, closeModalBtn);
        newCloseBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        const newForm = reviewForm.cloneNode(true);
        reviewForm.parentNode.replaceChild(newForm, reviewForm);
        newForm.addEventListener('submit', submitReview);
    }
}

function initSwiper() {
    if (document.querySelector('.swiper')) {
        new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            },
        });
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    await displayReviews();
    
    initReviewModal();
    
    initSwiper();
    
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', submitFeedback);
    }
    
    setTimeout(function() {
        const burgerIcon = document.getElementById('burgerIcon');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const closeMenuBtn = document.getElementById('closeMenuBtn');
        const body = document.body;

        function openMenu() {
            if (burgerIcon) burgerIcon.classList.add('active');
            if (mobileMenu) mobileMenu.classList.add('active');
            if (menuOverlay) menuOverlay.classList.add('active');
            body.classList.add('menu-open');
            body.style.overflow = 'hidden';
        }

        function closeMenu() {
            if (burgerIcon) burgerIcon.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
        }

        if (burgerIcon) {
            const newBurger = burgerIcon.cloneNode(true);
            burgerIcon.parentNode.replaceChild(newBurger, burgerIcon);
            newBurger.addEventListener('click', function(e) {
                e.stopPropagation();
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }

        if (closeMenuBtn) {
            const newClose = closeMenuBtn.cloneNode(true);
            closeMenuBtn.parentNode.replaceChild(newClose, closeMenuBtn);
            newClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeMenu();
            });
        }

        if (menuOverlay) {
            const newOverlay = menuOverlay.cloneNode(true);
            menuOverlay.parentNode.replaceChild(newOverlay, menuOverlay);
            newOverlay.addEventListener('click', closeMenu);
        }

        const mobileLinks = document.querySelectorAll('.mobile-menu-btn, .mobile-lang-selector, .mobile-login-link, .mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && mobileMenu && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }, 100);
});

window.displayReviews = displayReviews;
window.submitReview = submitReview;