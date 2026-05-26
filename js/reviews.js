async function loadReviews() {
    try {
        const response = await fetch('http://localhost:3000/reviews');
        const reviews = await response.json();
        
        if (reviews && reviews.length > 0) {
            console.log(`✅ Загружено ${reviews.length} отзывов`);
            return reviews;
        } else {
            console.log('ℹ️ В JSON Server нет отзывов');
            return [];
        }
    } catch (error) {
        console.error('❌ Ошибка загрузки отзывов:', error);
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

function getRatingStarsHtml(rating) {
    let starsHtml = '<div class="review-rating-stars">';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<span class="star-filled">★</span>';
        } else {
            starsHtml += '<span class="star-empty">☆</span>';
        }
    }
    starsHtml += '</div>';
    return starsHtml;
}

function formatReviewText(text, author) {
    if (!text) return '';
    
    const currentLang = localStorage.getItem('dental_language') || 'ru';
    
    if (author === 'Айгуль Ахметова' || author === 'Aigul Akhmetova') {
        const parts = text.split(/(?<=[.!?])\s+(?=[А-ЯA-Z])/);
        let html = '';
        for (let i = 0; i < Math.min(parts.length, 4); i++) {
            if (parts[i] && parts[i].trim()) {
                html += `<p>${escapeHtml(parts[i].trim())}</p>`;
            }
        }
        return html;
    }
    
    if (author === 'Лариса Мухамеджанова' || author === 'Larisa Mukhamedzhanova') {
        if (currentLang === 'en') {
            return `
                <p>I have been treated by Dmitry Shchegolev for 20 years. During this time, my daughter has grown up, my granddaughter has grown up. And of course, we are all patients of this clinic.</p>
                <p>I explain very briefly why:</p>
                <ul class="review-points">
                    <li>here - super safety standards, which exclude any inflammation, flux, infection, etc.;</li>
                    <li>absolute reliability and confidence that the treatment will be painless and without any mistakes, without unnecessary expenses with understandable pricing;</li>
                    <li>confidence that you are being treated by a pro, a smart, talented doctor who loves his job, using the latest equipment and not outdated, but normal 21st century technologies.</li>
                </ul>
            `;
        }
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
    
    if (author === 'Эленора Тен' || author === 'Eleonora Ten') {
        if (currentLang === 'en') {
            return `
                <p>I would like to thank the Dental Club team for their professionalism and qualified approach to treatment.</p>
                <p>Thanks to the wonderful, caring doctor Dmitry Shchegolev, the atmosphere of kindness, confidence, security and tranquility is in the air.</p>
                <p>I always recommend Dental Club to everyone!</p>
            `;
        }
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

let allReviews = [];
let currentVisibleCount = 3; 
const STEP = 3; 

function createFullReviewCard(review) {
    let photo = review.photo || '';
    const currentLang = localStorage.getItem('dental_language') || 'ru';
    let authorName = review.author;
    let userInfo = review.userInfo;
    let reviewText = review.text;
    let rating = review.rating || 5;
    
    if (typeof review.author === 'object') {
        authorName = review.author[currentLang] || review.author.ru;
    }
    if (typeof review.userInfo === 'object') {
        userInfo = review.userInfo[currentLang] || review.userInfo.ru;
    }
    if (typeof review.text === 'object') {
        reviewText = review.text[currentLang] || review.text.ru;
    }
    
    const useLogoPlaceholder = !photo || photo === '' || photo.includes('logo');
    
    const reviewHtml = formatReviewText(reviewText, authorName);
    const starsHtml = getRatingStarsHtml(rating);
    
    return `
        <div class="review-card">
            <div class="review-img ${useLogoPlaceholder ? 'logo-placeholder' : ''}">
                <img src="${useLogoPlaceholder ? '../assets/images/logo/logo4.png' : photo}" alt="${escapeHtml(authorName)}" onerror="this.src='../assets/images/logo/logo4.png'">
            </div>
            <div class="review-content">
                <h3>${escapeHtml(authorName)}</h3>
                ${userInfo ? `<p class="user-info">${escapeHtml(userInfo)}</p>` : ''}
                ${starsHtml}
                ${reviewHtml}
            </div>
        </div>
    `;
}

function renderReviews() {
    const reviewsContainer = document.getElementById('reviewsListContainer');
    if (!reviewsContainer) return;
    
    if (!allReviews || !Array.isArray(allReviews)) {
        console.error('allReviews не является массивом:', allReviews);
        reviewsContainer.innerHTML = '<div class="error">Ошибка загрузки отзывов</div>';
        return;
    }
    
    console.log('Всего отзывов:', allReviews.length);
    console.log('Показываем отзывов:', currentVisibleCount);
    
    const visibleReviews = allReviews.slice(0, currentVisibleCount);
    const hasMore = currentVisibleCount < allReviews.length;
    const hasExtra = currentVisibleCount > 3;
    
    console.log('hasMore (показать ещё):', hasMore);
    console.log('hasExtra (скрыть):', hasExtra);
    
    let html = '';
    
    visibleReviews.forEach(review => {
        html += createFullReviewCard(review);
    });
    
    if (allReviews.length > 3) {
        html += `
            <div class="reviews-control-buttons" style="text-align: center; margin-top: 30px;">
                ${hasMore ? `
                    <button class="reviews-control-btn show-more-btn" id="showMoreReviewsBtn" style="background: #A5C33C; color: #1a1e22; border: none; padding: 12px 30px; border-radius: 30px; cursor: pointer; font-size: 16px; font-weight: 600; margin-right: 15px;">
                        📖 Показать еще 3 отзыва
                    </button>
                ` : ''}
                ${hasExtra ? `
                    <button class="reviews-control-btn show-less-btn" id="showLessReviewsBtn" style="background: transparent; border: 2px solid #A5C33C; color: #A5C33C; padding: 12px 30px; border-radius: 30px; cursor: pointer; font-size: 16px; font-weight: 600;">
                        📖 Скрыть лишние
                    </button>
                ` : ''}
            </div>
        `;
    }
    
    reviewsContainer.innerHTML = html;
    
    const showMoreBtn = document.getElementById('showMoreReviewsBtn');
    const showLessBtn = document.getElementById('showLessReviewsBtn');
    
    if (showMoreBtn) {
        const newBtn = showMoreBtn.cloneNode(true);
        showMoreBtn.parentNode.replaceChild(newBtn, showMoreBtn);
        newBtn.addEventListener('click', () => {
            currentVisibleCount = Math.min(currentVisibleCount + STEP, allReviews.length);
            console.log('Показываем ещё, теперь видно:', currentVisibleCount);
            renderReviews();
        });
    }
    
    if (showLessBtn) {
        const newBtn = showLessBtn.cloneNode(true);
        showLessBtn.parentNode.replaceChild(newBtn, showLessBtn);
        newBtn.addEventListener('click', () => {
            currentVisibleCount = 3;
            console.log('Скрываем, теперь видно:', currentVisibleCount);
            renderReviews();
            const reviewsSection = document.getElementById('reviewsSection');
            if (reviewsSection) {
                reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

async function displayReviews() {
    const reviewsContainer = document.getElementById('reviewsListContainer');
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = '<div class="loading-reviews">Загрузка отзывов...</div>';
    
    allReviews = await loadReviews();
    const reviewsSection = document.getElementById('reviewsSection');
    
    if (!allReviews || allReviews.length === 0) {
        if (reviewsSection) {
            reviewsSection.style.display = 'none';
        }
        reviewsContainer.innerHTML = '';
        return;
    }
    
    if (reviewsSection) {
        reviewsSection.style.display = 'block';
    }
    
    currentVisibleCount = 3;
    renderReviews();
}

function isValidEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 12;
}

function cleanPhone(phone) {
    return phone.replace(/\D/g, '');
}

function getValidationMessage(key, defaultValue = '') {
    const currentLang = localStorage.getItem('dental_language') || 'ru';
    const messages = {
        ru: {
            'required_name': 'Пожалуйста, введите ваше имя',
            'name_min': 'Имя должно содержать минимум 2 символа',
            'required_email': 'Пожалуйста, введите email',
            'email_invalid': 'Введите корректный email (например: name@domain.com)',
            'required_phone': 'Пожалуйста, введите номер телефона',
            'phone_invalid': 'Введите корректный номер телефона (10-12 цифр)',
            'required_question': 'Пожалуйста, введите ваш вопрос',
            'question_min': 'Вопрос должен содержать минимум 5 символов'
        },
        en: {
            'required_name': 'Please enter your name',
            'name_min': 'Name must contain at least 2 characters',
            'required_email': 'Please enter your email',
            'email_invalid': 'Please enter a valid email (e.g., name@domain.com)',
            'required_phone': 'Please enter your phone number',
            'phone_invalid': 'Please enter a valid phone number (10-12 digits)',
            'required_question': 'Please enter your question',
            'question_min': 'Question must contain at least 5 characters'
        }
    };
    return messages[currentLang]?.[key] || messages.ru[key] || defaultValue;
}

function showValidationMessage(elementId, message, isError = true) {
    let errorSpan = document.getElementById(elementId + 'Error');
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.id = elementId + 'Error';
        errorSpan.className = 'validation-error';
        errorSpan.style.cssText = 'display: block; font-size: 12px; color: #EF4444; margin-top: 5px;';
        const input = document.getElementById(elementId);
        if (input && input.parentNode) {
            input.parentNode.appendChild(errorSpan);
        }
    }
    errorSpan.textContent = message;
    errorSpan.style.display = message ? 'block' : 'none';
    
    const input = document.getElementById(elementId);
    if (input) {
        input.classList.remove('error');
        input.style.borderColor = '';
    }
}

function clearValidationMessages() {
    const errorSpans = document.querySelectorAll('.validation-error');
    errorSpans.forEach(span => span.remove());
    
    const inputs = document.querySelectorAll('#feedbackName, #feedbackEmail, #feedbackPhone, #feedbackQuestion');
    inputs.forEach(input => {
        input.classList.remove('error');
        input.style.borderColor = '';
    });
}

function getSelectedRating() {
    const ratingInput = document.getElementById('reviewRating');
    if (ratingInput && ratingInput.value) {
        return parseInt(ratingInput.value);
    }
    return 5;
}

async function getNextReviewId() {
    try {
        const response = await fetch('http://localhost:3000/reviews');
        const reviews = await response.json();
        
        if (reviews && reviews.length > 0) {
            const maxId = Math.max(...reviews.map(r => r.id));
            return maxId + 1;
        }
        return 1;
    } catch (error) {
        console.error('Ошибка получения следующего ID:', error);
        return Date.now(); 
    }
}

async function submitReview(event) {
    event.preventDefault();
    
    const name = document.getElementById('reviewName')?.value?.trim() || '';
    const email = document.getElementById('reviewEmail')?.value?.trim() || '';
    const phone = document.getElementById('reviewPhone')?.value?.trim() || '';
    const reviewText = document.getElementById('reviewText')?.value?.trim() || '';
    const rating = getSelectedRating();
    
    const currentLang = localStorage.getItem('dental_language') || 'ru';
    const requiredNameMsg = getValidationMessage('required_name');
    const requiredEmailMsg = getValidationMessage('required_email');
    const emailInvalidMsg = getValidationMessage('email_invalid');
    const requiredPhoneMsg = getValidationMessage('required_phone');
    const phoneInvalidMsg = getValidationMessage('phone_invalid');
    const requiredTextMsg = getValidationMessage('required_question');
    
    if (!name) {
        alert(requiredNameMsg);
        return;
    }
    
    if (!email) {
        alert(requiredEmailMsg);
        return;
    }
    
    if (!isValidEmail(email)) {
        alert(emailInvalidMsg);
        return;
    }
    
    if (!phone) {
        alert(requiredPhoneMsg);
        return;
    }
    
    if (!isValidPhone(phone)) {
        alert(phoneInvalidMsg);
        return;
    }
    
    if (!reviewText) {
        alert(requiredTextMsg);
        return;
    }
    
    const cleanPhoneNumber = cleanPhone(phone);
    
    const nextId = await getNextReviewId();
    
    const reviewData = {
        id: nextId,
        author: { ru: name, en: name },
        email: email,
        phone: cleanPhoneNumber,
        text: { ru: reviewText, en: reviewText },
        rating: rating,
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
        console.log('✅ Отзыв сохранен в JSON Server с ID:', savedReview.id);
        
        const successMsg = currentLang === 'ru' 
            ? '✅ Спасибо за ваш отзыв! Он будет опубликован после проверки модератором.'
            : '✅ Thank you for your review! It will be published after moderation.';
        
        alert(successMsg);
        
        document.getElementById('reviewForm').reset();
        
        const ratingInput = document.getElementById('reviewRating');
        if (ratingInput) ratingInput.value = '5';
        const stars = document.querySelectorAll('#starRatingSelector .star');
        stars.forEach((star, index) => {
            if (index < 5) {
                star.textContent = '★';
                star.classList.add('active');
            } else {
                star.textContent = '☆';
                star.classList.remove('active');
            }
        });
        
        const modal = document.getElementById('reviewModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
        
        await displayReviews();
        
    } catch (error) {
        console.error('❌ Ошибка при отправке отзыва:', error);
        const errorMsg = currentLang === 'ru'
            ? '❌ Ошибка подключения к серверу. Убедитесь, что JSON Server запущен: json-server --watch db.json --port 3000 --cors'
            : '❌ Server connection error. Please make sure JSON Server is running: json-server --watch db.json --port 3000 --cors';
        alert(errorMsg);
    } finally {
        if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
}

async function submitFeedback(event) {
    event.preventDefault();
    
    clearValidationMessages();
    
    const name = document.getElementById('feedbackName')?.value?.trim() || '';
    const email = document.getElementById('feedbackEmail')?.value?.trim() || '';
    const phone = document.getElementById('feedbackPhone')?.value?.trim() || '';
    const question = document.getElementById('feedbackQuestion')?.value?.trim() || '';
    
    let isValid = true;
    
    if (!name) {
        showValidationMessage('feedbackName', getValidationMessage('required_name'));
        isValid = false;
    } else if (name.length < 2) {
        showValidationMessage('feedbackName', getValidationMessage('name_min'));
        isValid = false;
    } else {
        showValidationMessage('feedbackName', '', false);
    }
    
    if (!email) {
        showValidationMessage('feedbackEmail', getValidationMessage('required_email'));
        isValid = false;
    } else if (!isValidEmail(email)) {
        showValidationMessage('feedbackEmail', getValidationMessage('email_invalid'));
        isValid = false;
    } else {
        showValidationMessage('feedbackEmail', '', false);
    }
    
    if (!phone) {
        showValidationMessage('feedbackPhone', getValidationMessage('required_phone'));
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showValidationMessage('feedbackPhone', getValidationMessage('phone_invalid'));
        isValid = false;
    } else {
        showValidationMessage('feedbackPhone', '', false);
    }
    
    if (!question) {
        showValidationMessage('feedbackQuestion', getValidationMessage('required_question'));
        isValid = false;
    } else if (question.length < 5) {
        showValidationMessage('feedbackQuestion', getValidationMessage('question_min'));
        isValid = false;
    } else {
        showValidationMessage('feedbackQuestion', '', false);
    }
    
    if (!isValid) {
        return;
    }
    
    const cleanPhoneNumber = cleanPhone(phone);
    
    const feedbackData = {
        id: Date.now(),
        name: name,
        email: email,
        phone: cleanPhoneNumber,
        message: question,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    };
    
    const submitBtn = document.querySelector('#feedbackForm button[type="submit"]');
    const originalText = submitBtn?.textContent || 'ОТПРАВИТЬ ЗАЯВКУ';
    if (submitBtn) {
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
    }
    
    try {
        const response = await fetch('http://localhost:3000/feedbacks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const savedFeedback = await response.json();
        console.log('✅ Сообщение сохранено в JSON Server:', savedFeedback);
        
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        const successMessage = currentLang === 'ru' 
            ? '✅ Ваше сообщение отправлено! Наш администратор свяжется с вами в ближайшее время.'
            : '✅ Your message has been sent! Our administrator will contact you shortly.';
        
        alert(successMessage);
        document.getElementById('feedbackForm').reset();
        clearValidationMessages();
        
    } catch (error) {
        console.error('❌ Ошибка при отправке сообщения:', error);
        const currentLang = localStorage.getItem('dental_language') || 'ru';
        const errorMessage = currentLang === 'ru'
            ? '❌ Ошибка подключения к серверу. Убедитесь, что JSON Server запущен: json-server --watch db.json --port 3000 --cors'
            : '❌ Server connection error. Please make sure JSON Server is running: json-server --watch db.json --port 3000 --cors';
        alert(errorMessage);
    } finally {
        if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
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
        
        setTimeout(() => {
            const stars = document.querySelectorAll('#starRatingSelector .star');
            const ratingInput = document.getElementById('reviewRating');
            if (ratingInput && ratingInput.value && stars.length) {
                const currentRating = parseInt(ratingInput.value);
                stars.forEach((star, index) => {
                    if (index < currentRating) {
                        star.textContent = '★';
                        star.classList.add('active');
                    } else {
                        star.textContent = '☆';
                        star.classList.remove('active');
                    }
                });
            }
        }, 100);
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
        
        const stars = newForm.querySelectorAll('#starRatingSelector .star');
        const ratingInput = newForm.querySelector('#reviewRating');
        if (stars.length && ratingInput) {
            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const value = parseInt(this.dataset.value);
                    ratingInput.value = value;
                    
                    stars.forEach((s, index) => {
                        if (index < value) {
                            s.textContent = '★';
                            s.classList.add('active');
                        } else {
                            s.textContent = '☆';
                            s.classList.remove('active');
                        }
                    });
                });
            });
        }
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
        const newFeedbackForm = feedbackForm.cloneNode(true);
        feedbackForm.parentNode.replaceChild(newFeedbackForm, feedbackForm);
        newFeedbackForm.addEventListener('submit', submitFeedback);
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

document.addEventListener('languageChanged', function() {
    displayReviews();
});