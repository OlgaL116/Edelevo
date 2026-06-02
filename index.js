document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. РАБОТА С УВЕЛИЧЕНИЕМ ФОТОГРАФИЙ (LIGHTBOX)
    // =========================================================================
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryLinks = document.querySelectorAll('.gallery-link');

    if (lightbox && lightboxImg && galleryLinks.length > 0) {
        // Открытие фото
        galleryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                lightboxImg.src = link.getAttribute('href');
                lightbox.style.display = 'flex';
                
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                
                document.body.style.overflow = 'hidden';
            });
        });

        // Функция плавного закрытия
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                lightbox.style.display = 'none';
                lightboxImg.src = '';
            }, 300);
        };

        // Закрытие при клике на крестик или фон
        lightbox.addEventListener('click', closeLightbox);
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeLightbox();
            });
        }

        // Закрытие по клавише Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // =========================================================================
    // 2. ОТПРАВКА ФОРМЫ ЧЕРЕЗ AJAX (FORMSPREE)
    // =========================================================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const button = contactForm.querySelector('.submit-btn');
            const originalBtnText = button.textContent;
            
            button.disabled = true;
            button.textContent = 'Отправка...';
            
            const formData = new FormData(this);
            
            try {
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert('Спасибо! Ваше сообщение успешно отправлено.');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data && data.errors) {
                        alert(data.errors.map(error => error.message).join(", "));
                    } else {
                        alert('Ой! Возникла проблема при отправке формы. Попробуйте позже.');
                    }
                }
            } catch (error) {
                alert('Ошибка соединения. Проверьте подключение к интернету.');
            } finally {
                button.disabled = false;
                button.textContent = originalBtnText;
            }
        });
    }
});
