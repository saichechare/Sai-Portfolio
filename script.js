document.addEventListener('DOMContentLoaded', () => {
  // Navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });

  // Typing effect
  const phrases = [
    'Google Student Ambassador',
    'Software Developer',
    'Web Developer',
    'Computer Engineer',
    'Problem Solver',
    'Tech Enthusiast'
  ];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const typedTextElement = document.querySelector('.typed-text');

  function typeText() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (!typedTextElement) return;

    if (!isDeleting && currentCharIndex <= currentPhrase.length) {
      typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex);
      currentCharIndex++;
      typingSpeed = 100;
    }

    if (isDeleting && currentCharIndex >= 0) {
      typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex);
      currentCharIndex--;
      typingSpeed = 50;
    }

    if (currentCharIndex === currentPhrase.length + 1) {
      isDeleting = true;
      typingSpeed = 1000; // Pause at the end of the phrase
    }

    if (currentCharIndex === -1) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      currentCharIndex = 0;
      typingSpeed = 200; // Pause before starting new phrase
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();

  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Scroll to top button
  const scrollTopButton = document.getElementById('scroll-top');
  
  window.addEventListener('scroll', () => {
    if (scrollTopButton) {
      if (window.pageYOffset > 100) {
        scrollTopButton.style.display = 'block';
      } else {
        scrollTopButton.style.display = 'none';
      }
    }
  });

  scrollTopButton?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Update current year in footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear().toString();
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (!href) return;
      
      const target = document.querySelector(href);
      if (!target) return;

      target.scrollIntoView({
        behavior: 'smooth'
      });

      // Close mobile menu if open
      if (navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });

  // Intersection Observer for scroll animations
  const scrollObserverOptions = {
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, scrollObserverOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    scrollObserver.observe(section);
  });

  // Progress bar animation
  const progressBars = document.querySelectorAll('.progress-bar div');
  
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });

  // Add particle animation
  function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = Math.random() * 100 + 'vh';
      
      // Random size
      const size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random animation duration
      particle.style.animationDuration = Math.random() * 3 + 3 + 's';
      
      particlesContainer.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
      }, 6000);
    }

    // Create particles periodically
    setInterval(createParticle, 200);
  }

  // Initialize particles
  createParticles();

  // Add glow effect to sections on scroll
  const sections = document.querySelectorAll('section');
  const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.boxShadow = '0 0 50px rgba(100, 255, 218, 0.1)';
        setTimeout(() => {
          entry.target.style.boxShadow = 'none';
        }, 1000);
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => glowObserver.observe(section));
});

