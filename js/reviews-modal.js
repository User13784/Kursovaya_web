
(function() {
    const API_BASE_URL = 'http://localhost:3000';
    
    const modal = document.getElementById('reviewModal');
    const btn = document.getElementById('openReviewModal');
    const closeBtn = document.querySelector('.modal-close');
    const reviewForm = document.getElementById('reviewForm');

    function disableScroll() {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
    }

    function enableScroll() {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
    }

    function openModal() {
        if (modal) {
            modal.style.display = 'block';
            disableScroll();
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            enableScroll();
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return emailRegex.test(email);
    }

    function cleanPhone(phone) {
        return phone.replace(/\D/g, '');
    }

    function isValidPhone(phone) {
        const digits = phone.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 12;
    }

    async function submitReviewToAPI(reviewData) {
        try {
            const response = await fetch(`${API_BASE_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка при отправке отзыва в API:', error);
            throw error;
        }
    }

    function saveReviewToLocalStorage(reviewData) {
        try {
            let reviews = JSON.parse(localStorage.getItem('dental_reviews_backup') || '[]');
            const newReview = {
                id: Date.now(),
                ...reviewData,
                published: false,
                date: new Date().toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            };
            reviews.push(newReview);
            localStorage.setItem('dental_reviews_backup', JSON.stringify(reviews));
            return newReview;
        } catch (error) {
            console.error('Ошибка при сохранении отзыва в localStorage:', error);
            throw error;
        }
    }

    function showNotification(message, isError = false) {
        const oldNotification = document.querySelector('.review-notification');
        if (oldNotification) oldNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'review-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isError ? '#EF4444' : '#10B981'};
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            font-family: 'Mulish', sans-serif;
            font-size: 14px;
            z-index: 10001;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    async function submitReview(event) {
        event.preventDefault();
        
        const nameInput = reviewForm.querySelector('input[placeholder="Ваше имя"]');
        const emailInput = reviewForm.querySelector('input[placeholder="Email"]');
        const phoneInput = reviewForm.querySelector('input[placeholder="+7 (___) ___ __ __"]');
        const reviewTextarea = reviewForm.querySelector('textarea');
        
        const name = nameInput?.value?.trim() || '';
        const email = emailInput?.value?.trim() || '';
        const phoneRaw = phoneInput?.value?.trim() || '';
        const reviewText = reviewTextarea?.value?.trim() || '';
        
        if (!name) {
            showNotification('Пожалуйста, введите ваше имя!', true);
            nameInput?.focus();
            return;
        }
        
        if (!email) {
            showNotification('Пожалуйста, введите email!', true);
            emailInput?.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Пожалуйста, введите корректный email!', true);
            emailInput?.focus();
            return;
        }
        
        if (!phoneRaw) {
            showNotification('Пожалуйста, введите номер телефона!', true);
            phoneInput?.focus();
            return;
        }
        
        if (!isValidPhone(phoneRaw)) {
            showNotification('Пожалуйста, введите корректный номер телефона!', true);
            phoneInput?.focus();
            return;
        }
        
        if (!reviewText) {
            showNotification('Пожалуйста, напишите ваш отзыв!', true);
            reviewTextarea?.focus();
            return;
        }
        
        const cleanPhoneNumber = cleanPhone(phoneRaw);
        const reviewData = {
            author: name,
            email: email,
            phone: cleanPhoneNumber,
            text: reviewText,
            rating: 5,
            photo: '',
            userInfo: '',
            published: false,
            date: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        };
        
        const submitBtn = reviewForm.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent || 'ОТПРАВИТЬ ОТЗЫВ';
        if (submitBtn) {
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
        }
        
        try {
            await submitReviewToAPI(reviewData);
            showNotification('✅ Спасибо за ваш отзыв! Он будет опубликован после модерации.');
            closeModal();
            reviewForm.reset();
        } catch (apiError) {
            console.error('API ошибка, пробуем сохранить в localStorage:', apiError);
            
            try {
                saveReviewToLocalStorage(reviewData);
                showNotification('✅ Спасибо за ваш отзыв! (Сохранено локально, будет отправлен при подключении к серверу)');
                closeModal();
                reviewForm.reset();
            } catch (localError) {
                showNotification('❌ Ошибка при отправке отзыва. Пожалуйста, попробуйте позже.', true);
            }
        } finally {
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    }

    if (!document.querySelector('#review-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'review-modal-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    if (btn) {
        const newBtn = btn.cloneNode(true);
        btn.parentNode?.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode?.replaceChild(newCloseBtn, closeBtn);
        newCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    if (reviewForm) {
        const newForm = reviewForm.cloneNode(true);
        reviewForm.parentNode?.replaceChild(newForm, reviewForm);
        newForm.addEventListener('submit', submitReview);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
})();