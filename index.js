// Initialize AOS with modern settings
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic',
  disable: 'mobile'
});

// Hero slider functionality
document.addEventListener("DOMContentLoaded", function() {
  // Initialize hero slider
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 0) {
    slides[0].classList.add('active');
    
    let currentSlide = 0;
    
    function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
  }

  // Initialize date picker
  const datePicker = document.getElementById('dates');
  if (datePicker) {
    flatpickr(datePicker, {
      mode: "range",
      dateFormat: "Y-m-d",
      minDate: "today",
      placeholder: "Select your travel dates",
      showMonths: 2,
      onChange: function(selectedDates, dateStr, instance) {
        // Add custom styling
        datePicker.style.borderColor = '#079992';
        datePicker.style.boxShadow = '0 0 0 3px rgba(7, 153, 146, 0.1)';
      }
    });
  }

  // Modern form submission
  const tripForm = document.getElementById('tripForm');
  const formSpinner = document.getElementById('formSpinner');
  const formFeedback = document.getElementById('formFeedback');
  
  if (tripForm) {
    tripForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading spinner
      formSpinner.style.display = 'block';
      formFeedback.style.display = 'none';
      
      // Create a more realistic loading experience
      const submitButton = tripForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
      submitButton.disabled = true;
      
      // Simulate API call with realistic timing
      setTimeout(() => {
        // Hide spinner
        formSpinner.style.display = 'none';
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message with modern styling
        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <div class="d-flex align-items-start">
            <div class="flex-shrink-0">
              <i class="fas fa-check-circle fa-lg me-3" style="color: #2e7d32;"></i>
            </div>
            <div class="flex-grow-1">
              <h6 class="mb-1">Thank You for Your Inquiry!</h6>
              <p class="mb-0 small">Your travel request has been received successfully. One of our luxury travel specialists will contact you within 24 hours to begin crafting your perfect journey.</p>
            </div>
          </div>
        `;
        
        // Add celebration effect
        formFeedback.style.animation = 'fadeIn 0.5s ease-out';
        
        // Reset form after delay
        setTimeout(() => {
          tripForm.reset();
          // Reset date picker
          if (datePicker) {
            datePicker._flatpickr.clear();
          }
        }, 3000);
        
        // Auto-hide success message after 8 seconds
        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 8000);
      }, 2000);
    });
  }
  
  // Enhanced smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        // Close mobile navbar if open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
          navbarToggler.click();
        }
        
        // Calculate position with offset for navbar
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - navbarHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add parallax effect to hero on scroll
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    
    // Add/remove scrolled class to navbar
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for hero
    if (hero) {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      hero.style.transform = `translateY(${yPos}px)`;
    }
    
    // Show/hide back to top button
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Add hover effects to cards dynamically
  const cards = document.querySelectorAll('.destination-card, .service-card, .feature-box, .experience-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe elements for fade-in
  document.querySelectorAll('.destination-card, .service-card, .feature-box').forEach(el => {
    observer.observe(el);
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const submitButton = this.querySelector('button[type="submit"]');
      
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      submitButton.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i>';
        submitButton.style.background = '#2e7d32';
        
        setTimeout(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
          submitButton.style.background = '';
          emailInput.value = '';
          emailInput.placeholder = 'Thank you for subscribing!';
        }, 1500);
      }, 1000);
    });
  }

  // Add click effect to buttons
  document.querySelectorAll('.btn-modern, .btn-outline-modern').forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ========================
  // FLOATING BUTTONS FUNCTIONALITY
  // ========================

  // Back to Top Button functionality
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // WhatsApp Button functionality - Add click tracking
  const whatsappBtn = document.querySelector('.whatsapp-btn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
      // You can add analytics tracking here
      console.log('WhatsApp button clicked');
      // Example: ga('send', 'event', 'Contact', 'click', 'WhatsApp Button');
    });
  }

  // Add floating animation to WhatsApp button
  if (whatsappBtn) {
    let floatDirection = 1;
    setInterval(() => {
      const currentTransform = whatsappBtn.style.transform || 'translateY(0px)';
      const currentY = parseFloat(currentTransform.match(/translateY\((-?\d+(\.\d+)?)px\)/)?.[1] || 0);
      
      if (currentY <= -10) floatDirection = 1;
      if (currentY >= 0) floatDirection = -1;
      
      const newY = currentY + (floatDirection * 0.5);
      whatsappBtn.style.transform = `translateY(${newY}px)`;
    }, 50);
  }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .btn-modern, .btn-outline-modern {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
    
    // Add loading class initially
    if (!img.complete) {
      img.classList.add('loading');
    } else {
      img.classList.add('loaded');
    }
  });
});

// Add CSS for image loading
const imageStyle = document.createElement('style');
imageStyle.textContent = `
  img.loading {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  img.loaded {
    opacity: 1;
  }
`;
document.head.appendChild(imageStyle);