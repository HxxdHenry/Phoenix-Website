// 1) Update portfolioData to use youtubeUrl instead of image
const portfolioData = [
  { id: 1, title: 'Arduino MASTERCLASS', description: 'Full Programming Workshop in 90 Minutes!', youtubeUrl: 'https://www.youtube.com/watch?v=BLrHTHUjPuw' },
  { id: 2, title: 'Introduction to NodeMCU (ESP8266)', description: 'Military-grade cybersecurity framework with real-time threat detection and automated response.', youtubeUrl: 'https://www.youtube.com/watch?v=pj2h3FaxEQY&list=PLV3C-t_tgjGGtrc6xXHG439UrYD1DrnIH&index=1' },
  { id: 3, title: 'Motor Driver in depth', description: 'H-Bridge | L293D, L298N, TB6612FNG, VNH2SP30', youtubeUrl: 'https://www.youtube.com/watch?v=PVyAcgYkzDs' },
  { id: 4, title: 'Introduction to L298N Motor Driver', description: 'Introduction to L298N Motor Driver Module, module hardware overview, pin diagram, Working Principle, Features, and applications.', youtubeUrl: 'https://www.youtube.com/watch?v=_I-7XYaAtAo' },
  { id: 5, title: 'Introduction to ESP32', description: 'Getting started with the ESP32, a low-cost and extremely versatile microcontroller with integrated WiFi and Bluetooth.', youtubeUrl: 'https://www.youtube.com/watch?v=xPlN_Tk3VLQ' },
  { id: 6, title: 'Electric motors Explained', description: 'Learn the different types of electrical motors and how they work', youtubeUrl: 'https://www.youtube.com/watch?v=yiD5nCfmbV0&list=PLWv9VM947MKh3sZh5rjYxrrNno1Mc6cuu&index=1' },
  { id: 7, title: '15 Brilliant IoT Projects for Beginners!', description: 'Automatic Fish Feeder | Temperature-based Fan Speed Control | Garage Door Opener | Water Quality Monitoring System | Smart Home | Smart Plug | Battery Monitoring System etc', youtubeUrl: 'https://www.youtube.com/watch?v=Td1d5iMF3EQ' }
]; // Thumbnails come from img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg or hqdefault.jpg. [web:19][web:20]

// 2) Helpers to extract video ID and build thumbnail URL
function getYouTubeId(url) {
  if (!url) return null;
  // Support watch?v=, youtu.be/, and embed/ formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/.*[?&]v=)([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m && m[1]) return m[1];
  }
  return null;
} // Extracting the 11-char ID enables direct thumbnail URLs. [web:19][web:20][web:17]

function youTubeThumb(id) {
  // maxresdefault may not exist for some videos; fallback to hqdefault as needed in CSS onerror if desired
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
} // Using img.youtube.com avoids API calls and returns preview images. [web:19][web:20]

// Skills data
const skillsData = [
  { name: 'React.js', icon: '⚛️', level: 95, category: 'frontend' },
  { name: 'Node.js', icon: '🟢', level: 90, category: 'backend' },
  { name: 'TypeScript', icon: '📘', level: 88, category: 'frontend' },
  { name: 'AWS', icon: '☁️', level: 92, category: 'cloud' },
  { name: 'Docker', icon: '🐳', level: 85, category: 'cloud' },
  { name: 'Python', icon: '🐍', level: 93, category: 'backend' },
  { name: 'Kubernetes', icon: '☸️', level: 82, category: 'cloud' },
  { name: 'GraphQL', icon: '◈', level: 87, category: 'backend' },
  { name: 'TensorFlow', icon: '🤖', level: 78, category: 'emerging' },
  { name: 'Blockchain', icon: '🔗', level: 75, category: 'emerging' },
  { name: 'Vue.js', icon: '💚', level: 85, category: 'frontend' },
  { name: 'MongoDB', icon: '🍃', level: 90, category: 'backend' }
];

// Safe scrollToSection
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const header = document.getElementById('header');
  if (!section) return;
  const headerHeight = header ? header.offsetHeight : 0;
  const targetPosition = section.offsetTop - headerHeight;
  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
}

// Particles (only if container exists)
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  const particleCount = 15;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (18 + Math.random() * 8) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Carousel (guarded)
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
  const item = document.createElement('div');
  item.className = 'carousel-item';
  item.dataset.index = index;

  const vid = getYouTubeId(data.youtubeUrl);
  const thumb = vid ? youTubeThumb(vid) : '';

  item.innerHTML = `
    <div class="card">
      <div class="card-number">0${data.id}</div>
      <div class="card-image">
        ${thumb ? `<img src="${thumb}" alt="${data.title}">` : ''}
      </div>
      <h3 class="card-title">${data.title}</h3>
      <p class="card-description">${data.description}</p>
      <!-- Removed tech tags block -->
      <a class="card-cta" href="${data.youtubeUrl}" target="_blank" rel="noopener">Explore</a>
    </div>
  `; // Explore is now a link to the YouTube video instead of scrolling. [web:28]

  return item;
}

function initCarousel() {
  if (!carousel || !indicatorsContainer) return;
  portfolioData.forEach((data, index) => {
    const item = createCarouselItem(data, index);
    carousel.appendChild(item);
    const indicator = document.createElement('div');
    indicator.className = 'indicator' + (index === 0 ? ' active' : '');
    indicator.dataset.index = index;
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });
  updateCarousel();
}

function updateCarousel() {
  if (!carousel) return;
  const items = carousel.querySelectorAll('.carousel-item');
  const indicators = indicatorsContainer ? indicatorsContainer.querySelectorAll('.indicator') : [];
  const totalItems = items.length;
  if (!totalItems) return;
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  items.forEach((item, index) => {
    let offset = index - currentIndex;
    if (offset > totalItems / 2) offset -= totalItems;
    else if (offset < -totalItems / 2) offset += totalItems;

    const absOffset = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;

    item.style.transform = '';
    item.style.opacity = '';
    item.style.zIndex = '';
    item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';

    let spacing1 = 400, spacing2 = 600, spacing3 = 750;
    if (isMobile) {
      spacing1 = 280; spacing2 = 420; spacing3 = 550;
    } else if (isTablet) {
      spacing1 = 340; spacing2 = 520; spacing3 = 650;
    }

    if (absOffset === 0) {
      item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
      item.style.opacity = '1';
      item.style.zIndex = '10';
    } else if (absOffset === 1) {
      const translateX = sign * spacing1;
      const rotation = isMobile ? 25 : 30;
      const scale = isMobile ? 0.88 : 0.85;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
      item.style.opacity = '0.8';
      item.style.zIndex = '5';
    } else if (absOffset === 2) {
      const translateX = sign * spacing2;
      const rotation = isMobile ? 35 : 40;
      const scale = isMobile ? 0.75 : 0.7;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
      item.style.opacity = '0.5';
      item.style.zIndex = '3';
    } else if (absOffset === 3) {
      const translateX = sign * spacing3;
      const rotation = isMobile ? 40 : 45;
      const scale = isMobile ? 0.65 : 0.6;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
      item.style.opacity = '0.3';
      item.style.zIndex = '2';
    } else {
      item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
      item.style.opacity = '0';
      item.style.zIndex = '1';
    }
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}

function nextSlide() {
  if (!carousel) return;
  currentIndex = (currentIndex + 1) % portfolioData.length;
  updateCarousel();
}

function prevSlide() {
  if (!carousel) return;
  currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
  updateCarousel();
}

function goToSlide(index) {
  if (!carousel) return;
  currentIndex = index;
  updateCarousel();
}

// Skills grid (guarded)
function initSkillsGrid() {
  const skillsGrid = document.getElementById('skillsGrid');
  const categoryTabs = document.querySelectorAll('.category-tab');
  if (!skillsGrid) return;

  function displaySkills(category = 'all') {
    skillsGrid.innerHTML = '';
    const filteredSkills = category === 'all' ? skillsData : skillsData.filter(s => s.category === category);
    filteredSkills.forEach((skill, index) => {
      const hexagon = document.createElement('div');
      hexagon.className = 'skill-hexagon';
      hexagon.style.animationDelay = `${index * 0.1}s`;
      hexagon.innerHTML = `
        <div class="hexagon-inner">
          <div class="hexagon-content">
            <div class="skill-icon-hex">${skill.icon}</div>
            <div class="skill-name-hex">${skill.name}</div>
            <div class="skill-level"><div class="skill-level-fill" style="width: ${skill.level}%"></div></div>
            <div class="skill-percentage-hex">${skill.level}%</div>
          </div>
        </div>
      `;
      skillsGrid.appendChild(hexagon);
    });
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      displaySkills(tab.dataset.category);
    });
  });

  displaySkills();
}

// Event listeners (guarded)
document.getElementById('nextBtn')?.addEventListener('click', nextSlide);
document.getElementById('prevBtn')?.addEventListener('click', prevSlide);

// Auto-rotate carousel only if it exists
if (document.getElementById('carousel')) {
  setInterval(nextSlide, 5000);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('carousel')) return;
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

// Update carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  if (!document.getElementById('carousel')) return;
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateCarousel, 250);
});

// Initialize on load (safe)
initCarousel();
initSkillsGrid();
initParticles();

// Mobile menu toggle (guarded)
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Header scroll effect (guarded)
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (!header) return;
  if (window.scrollY > 100) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Smooth scrolling and active navigation (guarded)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if (navLinks.length) {
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href')?.substring(1);
      if (!targetId) return;
      const targetSection = document.getElementById(targetId);
      const headerHeight = header ? header.offsetHeight : 0;
      if (targetSection) {
        const targetPosition = targetSection.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
      navMenu?.classList.remove('active');
      menuToggle?.classList.remove('active');
    });
  });

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href')?.substring(1);
          if (href === sectionId) link.classList.add('active');
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);
}

// Animated counter for stats (guarded)
function animateCounter(element) {
  const target = parseInt(element.dataset.target || '0', 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const counter = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = String(target);
      clearInterval(counter);
    } else {
      element.textContent = String(Math.floor(current));
    }
  }, 16);
}

// Intersection Observer for stats (only if stats section exists)
const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -100px 0px' };
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(number => {
          if (!number.classList.contains('animated')) {
            number.classList.add('animated');
            animateCounter(number);
          }
        });
      }
    });
  }, observerOptions);
  observer.observe(statsSection);
}

// Form submission (guarded)
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  alert(`Thank you ${data.name || ''}! Your message has been transmitted successfully. We'll respond within 24 hours.`);
  contactForm.reset();
});

// Loading screen (always hide, regardless of sections)
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1500);
});

// Parallax hero (guarded)
window.addEventListener('scroll', () => {
  const parallax = document.querySelector('.hero');
  if (!parallax) return;
  const scrolled = window.pageYOffset;
  parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});
