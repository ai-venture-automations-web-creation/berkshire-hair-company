// Navigation scroll effect
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav__links--open');
    navToggle.classList.toggle('nav__toggle--open');
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const targetPosition = target.offsetTop - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with fade-up class
document.querySelectorAll('.fade-up').forEach(el => {
  observer.observe(el);
});

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.02)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
  
  btn.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(0) scale(0.98)';
  });
  
  btn.addEventListener('mouseup', function() {
    this.style.transform = 'translateY(-2px) scale(1.02)';
  });
});

// Form handling
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.service) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Thank you for your booking request! We\'ll contact you soon to confirm your appointment.');
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Gallery lightbox effect (simple implementation)
document.querySelectorAll('.gallery__item img').forEach(img => {
  img.addEventListener('click', function() {
    // Create lightbox overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: pointer;
    `;
    
    const imgClone = this.cloneNode();
    imgClone.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 8px;
    `;
    
    overlay.appendChild(imgClone);
    document.body.appendChild(overlay);
    
    // Close on click
    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });
    
    // Close on escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        document.body.removeChild(overlay);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero__image');
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '1';
  });
  
  // Set initial opacity for fade-in effect
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';
});