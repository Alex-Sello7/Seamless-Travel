// index.js - enhanced smooth interactions & animations

// Initialize AOS with smoother settings
AOS.init({
  duration: 900,
  once: true,
  offset: 80,
  easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
  disable: window.innerWidth < 768 ? 'mobile' : false
});

document.addEventListener("DOMContentLoaded", function() {
  // ----- Hero slider (ultra smooth) -----
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length) {
    slides[0].classList.add('active');
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5500); // slightly longer for smoother transition
  }

  // ----- Flatpickr date picker with subtle feedback -----
  const datePicker = document.getElementById('dates');
  if (datePicker) {
    flatpickr(datePicker, {
      mode: "range",
      dateFormat: "Y-m-d",
      minDate: "today",
      showMonths: 2,
      onOpen: function(selectedDates, dateStr, instance) {
        datePicker.style.borderColor = '#1c7d7a';
      }
    });
  }

  // ----- Form submission with gentle feedback (no alerts) -----
  const tripForm = document.getElementById('tripForm');
  const formSpinner = document.getElementById('formSpinner');
  const formFeedback = document.getElementById('formFeedback');

  if (tripForm) {
    tripForm.addEventListener('submit', function(e) {
      e.preventDefault();

      formSpinner.style.display = 'block';
      formFeedback.style.display = 'none';

      const submitBtn = tripForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      submitBtn.disabled = true;

      // simulate smooth async
      setTimeout(() => {
        formSpinner.style.display = 'none';
        submitBtn.innerHTML = originalHtml;
        submitBtn.disabled = false;

        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <div class="d-flex align-items-start">
            <i class="fas fa-check-circle fa-2x me-3" style="color:#1e5f3e;"></i>
            <div>
              <h6 class="mb-1">Thank you, traveller!</h6>
              <p class="mb-0 small">Your inquiry is with our specialists. Expect a reply within 24h.</p>
            </div>
          </div>
        `;

        // reset form after short delay
        setTimeout(() => {
          tripForm.reset();
          if (datePicker) datePicker._flatpickr.clear();
        }, 2000);

        // hide message after 7 sec
        setTimeout(() => {
          formFeedback.style.opacity = '0';
          setTimeout(() => {
            formFeedback.style.display = 'none';
            formFeedback.style.opacity = '1';
          }, 300);
        }, 7000);
      }, 1800);
    });
  }

  // ----- smooth scroll with offset (for navbar) -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();

      const target = document.querySelector(href);
      if (!target) return;

      // close navbar if open (mobile)
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarToggler && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }

      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPos = targetPos - navbarHeight - 20; // Keep the 20px gap

      window.scrollTo({ top: offsetPos, behavior: 'smooth' });
    });
  });

  // ----- navbar background on scroll (parallax feel) -----
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top-btn');
  const hero = document.querySelector('.hero-section');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // navbar shrink
    if (scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // back to top visibility
    if (backToTop) {
      if (scrollY > 400) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }

    // subtle parallax for hero (if exists)
    if (hero) {
      const speed = 0.3;
      hero.style.transform = `translateY(${scrollY * speed * 0.1}px)`;
    }
  });

  // ----- back to top click -----
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----- whatsapp button (float + tooltip) -----
  const waBtn = document.querySelector('.whatsapp-btn');
  if (waBtn) {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://wa.me/27000000000?text=Hello%20Seamless%20Travel', '_blank');
    });

    // gentle floating animation (tiny)
    let floatDir = 1;
    setInterval(() => {
      if (!waBtn) return;
      let currentY = parseFloat(waBtn.style.transform?.match(/translateY\(([-\d.]+)px\)/)?.[1] || 0);
      if (currentY <= -6) floatDir = 1;
      if (currentY >= 0) floatDir = -1;
      waBtn.style.transform = `translateY(${currentY + floatDir * 0.25}px)`;
    }, 60);
  }

  // ----- newsletter form smooth feedback (no alert) -----
  const newsletter = document.querySelector('.newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector('button');
      const original = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i>';
        emailInput.value = '';
        emailInput.placeholder = 'Thanks for subscribing!';
        setTimeout(() => {
          submitBtn.innerHTML = original;
          submitBtn.disabled = false;
          emailInput.placeholder = 'Your email address';
        }, 2000);
      }, 1000);
    });
  }

  // ----- gentle hover lift (already in css, but we can add ripple removal) -----
  // remove any existing ripple remnants
});

// small style addition for ripple effect (if needed – we keep it minimal)
const style = document.createElement('style');
style.textContent = `
  .btn-modern, .btn-outline-modern { position: relative; overflow: hidden; }
  .ripple-effect { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.5); transform: scale(0); animation: rippleAnim 0.6s ease-out; pointer-events: none; }
  @keyframes rippleAnim { to { transform: scale(6); opacity: 0; } }
`;
document.head.appendChild(style);

// add ripple on btn click (optional, subtle)
document.querySelectorAll('.btn-modern, .btn-outline-modern').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size/2 + 'px';
    ripple.style.top = e.clientY - rect.top - size/2 + 'px';
    ripple.classList.add('ripple-effect');
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// image load smoothness (prevent layout shift)
document.querySelectorAll('img').forEach(img => {
  img.classList.add('image-load');
  if (img.complete) img.classList.add('loaded');
  else img.addEventListener('load', function() { this.classList.add('loaded'); });
});

// tiny extra: add loading class style
const imgStyle = document.createElement('style');
imgStyle.textContent = `
  img.image-load { opacity: 0; transition: opacity 0.4s ease; }
  img.image-load.loaded { opacity: 1; }
`;
document.head.appendChild(imgStyle);