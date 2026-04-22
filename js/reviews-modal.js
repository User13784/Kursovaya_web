(function() {
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

    if (btn) {
        btn.addEventListener('click', openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = reviewForm.querySelector('input[placeholder="Ваше имя"]').value;
            const email = reviewForm.querySelector('input[placeholder="Email"]').value;
            const phone = reviewForm.querySelector('input[placeholder="+7 (___) ___ __ __"]').value;
            const review = reviewForm.querySelector('textarea').value;
            
            if (!name || !email || !phone || !review) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }       
           
            alert('Спасибо за ваш отзыв!');
            
            closeModal();
            
            reviewForm.reset();
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
})();