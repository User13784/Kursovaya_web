// Модальное окно для отзыва
(function() {
    // Получаем элементы
    const modal = document.getElementById('reviewModal');
    const btn = document.getElementById('openReviewModal');
    const closeBtn = document.querySelector('.modal-close');
    const reviewForm = document.getElementById('reviewForm');

    // Функция для запрета прокрутки страницы
    function disableScroll() {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
    }

    // Функция для включения прокрутки страницы
    function enableScroll() {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
    }

    // Функция для открытия модального окна
    function openModal() {
        if (modal) {
            modal.style.display = 'block';
            disableScroll();
        }
    }

    // Функция для закрытия модального окна
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            enableScroll();
        }
    }

    // Открыть модальное окно при клике на кнопку
    if (btn) {
        btn.addEventListener('click', openModal);
    }

    // Закрыть модальное окно при клике на крестик
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Закрыть модальное окно при клике вне области окна
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Обработка отправки формы
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем значения полей
            const name = reviewForm.querySelector('input[placeholder="Ваше имя"]').value;
            const email = reviewForm.querySelector('input[placeholder="Email"]').value;
            const phone = reviewForm.querySelector('input[placeholder="+7 (___) ___ __ __"]').value;
            const review = reviewForm.querySelector('textarea').value;
            
            // Проверка заполнения полей
            if (!name || !email || !phone || !review) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }
            
            // Здесь можно добавить отправку данных на сервер
            // Например, через fetch или XMLHttpRequest
            
            // Показываем сообщение об успехе
            alert('Спасибо за ваш отзыв!');
            
            // Закрываем модальное окно
            closeModal();
            
            // Очищаем форму
            reviewForm.reset();
        });
    }

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
})();