//slide show
let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow-image');
const totalSlides = slides.length;
let autoSlideInterval;

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
}

function showNextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
}

function showPrevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(showNextSlide, 3000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}



//buttons slideshow
document.getElementById('nextBtn').addEventListener('click', () => {
    showNextSlide();
    resetAutoSlide();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    showPrevSlide();
    resetAutoSlide();
});

startAutoSlide();

//lighbox
const photoCards = document.querySelectorAll('.photo-card');
let lightbox = null;

function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="" alt="Enlarged photo" class="lightbox-image">
        </div>
    `;
    document.body.appendChild(lightbox);

    //style
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
        }

        .lightbox.active {
            display: flex;
        }

        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }

        .lightbox-image {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            line-height: 40px;
            transition: transform 0.2s ease;
        }

        .lightbox-close:hover {
            transform: scale(1.2);
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    //close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });
}

function openLightbox(imageSrc) {
    if (!lightbox) {
        createLightbox();
    }
    const img = lightbox.querySelector('.lightbox-image');
    img.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

//click on photos
photoCards.forEach(card => {
    card.addEventListener('click', () => {
        const imageSrc = card.dataset.src;
        openLightbox(imageSrc);
    });
});