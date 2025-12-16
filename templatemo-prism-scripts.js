/* ================================
   DATA
================================ */

const portfolioData = [
  {
    id: 1,
    title: 'Git + Github',
    description: 'Version control workflow with Git and GitHub for efficient collaboration, code management, and project tracking.',
    image: 'images/Git.png'
  },
  {
    id: 2,
    title: 'OpenCV',
    description: 'Advanced computer vision framework used for image processing, real-time detection, and visual data analysis.',
    image: 'images/OpenCV.jpg',
    url: 'https://phoenix-website-5xo.pages.dev/OpenCv/'
  },
  {
    id: 3,
    title: 'TinkerCAD',
    description: 'Interactive 3D design and electronics simulation platform for prototyping, learning, and creative engineering projects.',
    image: 'images/TinkerCAD.webp'
  }
];

/* ================================
   DOM REFERENCES (TOP – IMPORTANT)
================================ */

const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');
const carouselContainer = document.querySelector('.carousel-container');
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

/* ================================
   PARTICLES
================================ */

function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (18 + Math.random() * 8) + 's';
    particlesContainer.appendChild(particle);
  }
}

/* ================================
   CAROUSEL CORE
================================ */

let currentIndex = 0;

function createCarouselItem(data, index) {
  const item = document.createElement('div');
  item.className = 'carousel-item';
  item.dataset.index = index;

  const hasUrl = typeof data.url === 'string' && data.url.trim() !== '';
  const isExternal = hasUrl && /^https?:\/\//.test(data.url);

  item.innerHTML = `
    <div class="card">
      <div class="card-number">0${data.id}</div>
      <div class="card-image">
        <img src="${data.image}" alt="${data.title}">
      </div>
      <h3 class="card-title">${data.title}</h3>
      <p class="card-description">${data.description}</p>
      ${
        hasUrl
          ? `<a class="card-cta" href="${data.url}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>Explore</a>`
          : `<span class="card-cta card-cta-disabled">Upcoming…</span>`
      }
    </div>
  `;
  return item;
}

function initCarousel() {
  if (!carousel || !indicatorsContainer) return;

  portfolioData.forEach((data, index) => {
    carousel.appendChild(createCarouselItem(data, index));

    const indicator = document.createElement('div');
    indicator.className = 'indicator' + (index === 0 ? ' active' : '');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  updateCarousel();
}

function updateCarousel() {
  if (!carousel) return;

  const items = carousel.querySelectorAll('.carousel-item');
  const totalItems = items.length;
  if (!totalItems) return;

  const indicators = indicatorsContainer?.querySelectorAll('.indicator') || [];
  const isMobile = window.innerWidth <= 768;
  const vw = Math.min(window.innerWidth, 1200);

  let spacing1 = isMobile ? vw * 0.22 : vw * 0.28;
  let spacing2 = isMobile ? vw * 0.35 : vw * 0.45;
  let spacing3 = isMobile ? vw * 0.48 : vw * 0.6;

  const depth1 = isMobile ? -120 : -200;
  const depth2 = isMobile ? -220 : -350;
  const depth3 = isMobile ? -300 : -450;

  items.forEach((item, index) => {
    let offset = index - currentIndex;
    if (offset > totalItems / 2) offset -= totalItems;
    if (offset < -totalItems / 2) offset += totalItems;

    const abs = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;

    item.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';

    if (abs === 0) {
      item.style.transform = 'translate(-50%, -50%) scale(1)';
      item.style.opacity = '1';
      item.style.zIndex = '10';
    } else if (abs === 1) {
      item.style.transform =
        `translate(-50%, -50%) translateX(${sign * spacing1}px) translateZ(${depth1}px)
         rotateY(${-sign * (isMobile ? 25 : 30)}deg) scale(${isMobile ? 0.88 : 0.85})`;
      item.style.opacity = '0.8';
      item.style.zIndex = '5';
    } else if (abs === 2) {
      item.style.transform =
        `translate(-50%, -50%) translateX(${sign * spacing2}px) translateZ(${depth2}px)
         rotateY(${-sign * (isMobile ? 35 : 40)}deg) scale(${isMobile ? 0.75 : 0.7})`;
      item.style.opacity = '0.5';
      item.style.zIndex = '3';
    } else {
      item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
      item.style.opacity = '0';
      item.style.zIndex = '1';
    }
  });

  indicators.forEach((ind, i) => ind.classList.toggle('active', i === currentIndex));
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % portfolioData.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

/* ================================
   CONTROLS
================================ */

document.getElementById('nextBtn')?.addEventListener('click', nextSlide);
document.getElementById('prevBtn')?.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
  if (!carousel) return;
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

/* ================================
   AUTO ROTATE (STOP ON TOUCH)
================================ */

let autoRotate = null;

if (carousel && carouselContainer) {
  autoRotate = setInterval(nextSlide, 5000);

  carouselContainer.addEventListener('touchstart', () => {
    if (autoRotate) {
      clearInterval(autoRotate);
      autoRotate = null;
    }
  }, { passive: true });
}

/* ================================
   MOBILE SWIPE SUPPORT
================================ */

let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

if (carouselContainer) {
  carouselContainer.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  carouselContainer.addEventListener('touchmove', e => {
    if (!isSwiping) return;
    touchEndX = e.touches[0].clientX;
  }, { passive: true });

  carouselContainer.addEventListener('touchend', () => {
    if (!isSwiping) return;

    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 50) {
      delta < 0 ? nextSlide() : prevSlide();
    }
    isSwiping = false;
  });
}

/* ================================
   INIT & GLOBALS
================================ */

initCarousel();
initParticles();

window.addEventListener('resize', () => {
  clearTimeout(window.__resizeTimer);
  window.__resizeTimer = setTimeout(updateCarousel, 250);
});

menuToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 100);
});

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('hidden');
  }, 1500);
});
