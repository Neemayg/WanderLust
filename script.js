// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;

function handleNavbarScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top button
  if (scrollY > 600) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  lastScroll = scrollY;
}

window.addEventListener('scroll', handleNavbarScroll);

// ===== MOBILE NAV TOGGLE =====
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');

  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

initScrollAnimations();

// ===== TESTIMONIAL CAROUSEL =====
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
  testimonialSlides.forEach(slide => slide.classList.remove('active'));
  testimonialDots.forEach(dot => dot.classList.remove('active'));

  currentTestimonial = index;

  if (currentTestimonial >= testimonialSlides.length) currentTestimonial = 0;
  if (currentTestimonial < 0) currentTestimonial = testimonialSlides.length - 1;

  testimonialSlides[currentTestimonial].classList.add('active');
  testimonialDots[currentTestimonial].classList.add('active');
}

function nextTestimonial() {
  showTestimonial(currentTestimonial + 1);
}

function prevTestimonial() {
  showTestimonial(currentTestimonial - 1);
}

// Auto-play
function startTestimonialAutoplay() {
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

function stopTestimonialAutoplay() {
  clearInterval(testimonialInterval);
}

// Event Listeners
testimonialNext.addEventListener('click', () => {
  stopTestimonialAutoplay();
  nextTestimonial();
  startTestimonialAutoplay();
});

testimonialPrev.addEventListener('click', () => {
  stopTestimonialAutoplay();
  prevTestimonial();
  startTestimonialAutoplay();
});

testimonialDots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopTestimonialAutoplay();
    showTestimonial(parseInt(dot.dataset.index));
    startTestimonialAutoplay();
  });
});

startTestimonialAutoplay();

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== CONTACT FORM =====
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById('contact-submit');
  const originalContent = submitBtn.innerHTML;

  // Simulate sending
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #059669 0%, #34d399 100%)';

    setTimeout(() => {
      submitBtn.innerHTML = originalContent;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      contactForm.reset();
    }, 2500);
  }, 1500);
});

// ===== NEWSLETTER FORM =====
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const input = document.getElementById('newsletter-email');
  const originalValue = input.value;

  input.value = '✓ Subscribed!';
  input.style.color = '#059669';
  input.disabled = true;

  setTimeout(() => {
    input.value = '';
    input.style.color = '';
    input.disabled = false;
    newsletterForm.reset();
  }, 2500);
});

// ===== HERO SEARCH =====
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
  const destination = document.getElementById('search-destination').value.trim();
  if (destination) {
    // Scroll to destinations section
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
  } else {
    // Focus on input with visual feedback
    const input = document.getElementById('search-destination');
    input.focus();
    input.style.outline = '2px solid #f59e0b';
    setTimeout(() => { input.style.outline = ''; }, 1500);
  }
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const stats = document.querySelectorAll('.hero-stat-number');
  const targets = ['500+', '10K+', '4.9'];
  const numericTargets = [500, 10000, 4.9];

  stats.forEach((stat, index) => {
    let current = 0;
    const target = numericTargets[index];
    const increment = target / 60;
    const isDecimal = target < 10;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = targets[index];
        clearInterval(interval);
      } else {
        if (isDecimal) {
          stat.textContent = current.toFixed(1);
        } else if (target >= 10000) {
          stat.textContent = Math.floor(current / 1000) + 'K+';
        } else {
          stat.textContent = Math.floor(current) + '+';
        }
      }
    }, 30);
  });
}

// Trigger on page load
setTimeout(animateCounters, 1000);

// ===== PARALLAX SUBTLE EFFECT ON HERO =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg && scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
  }
});

// ===== DESTINATION CARD TILT EFFECT =====
const cards = document.querySelectorAll('.destination-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

console.log('🌿 Wanderlust Travel Website loaded successfully!');
