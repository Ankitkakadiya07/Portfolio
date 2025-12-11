document.addEventListener('DOMContentLoaded', () => {
  // --------------------
  // 1. Mobile Navigation Toggle
  // --------------------
  const navLinks = document.querySelector('.nav-links');
  const burger = document.querySelector('.burger');
  const links = document.querySelectorAll('.nav-links li a');

  const navToggle = () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');

    // Burger Animation
    burger.classList.toggle('toggle');

    // Animate Links
    navLinks.querySelectorAll('li').forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });
  };

  burger.addEventListener('click', navToggle);

  // Close nav on link click (for mobile)
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navToggle();
      }
    });
  });

  // --------------------
  // 2. Smooth Scroll for Navigation
  // (Modern browsers handle this with CSS 'scroll-behavior: smooth'
  // in the HTML, but this JS provides a fallback and ensures correct behavior)
  // --------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Check if it's an internal link
      if (this.getAttribute('href').length > 1) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Calculate target position adjusted for the sticky header
          const headerHeight = document.querySelector('#header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --------------------
  // 3. Animated Skill Bars on Scroll
  // --------------------
  const skillLevels = document.querySelectorAll('.skill-level');
  const skillsSection = document.getElementById('skills');

  const activateSkillBars = () => {
    skillLevels.forEach(bar => {
      const level = bar.getAttribute('data-level');
      bar.style.width = level + '%';
    });
  };

  const handleScroll = () => {
    // Get the top position of the skills section
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    // Activate when the section is about 75% visible in the viewport
    if (sectionPos < screenHeight * 0.75) {
      activateSkillBars();
      // Remove the listener after activation to prevent re-triggering
      window.removeEventListener('scroll', handleScroll);
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Call once on load in case the section is visible immediately
  handleScroll();

  // --------------------
  // 4. Contact Form Validation and Submission
  // --------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  const validateForm = () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
      formStatus.textContent = 'Error: All fields are required.';
      formStatus.style.color = 'red';
      return false;
    }

    // Simple email regex for client-side check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = 'Error: Please enter a valid email address.';
      formStatus.style.color = 'red';
      return false;
    }

    formStatus.textContent = '';
    return true;
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      formStatus.textContent = 'Sending...';
      formStatus.style.color = 'var(--primary-color)';

      // **Replace this block with your actual server-side submission logic (e.g., Fetch API)**
      // Since this is a client-side guide, we simulate success after a delay.
      setTimeout(() => {
        formStatus.textContent = 'Message Sent Successfully! Thank you.';
        formStatus.style.color = 'green';
        contactForm.reset(); // Clear the form
      }, 1500);
      // **END OF SIMULATION BLOCK**
    }
  });

  // --------------------
  // 5. Dark/Light Mode Toggle
  // --------------------
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

  // Initial load state
  if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').className = 'fas fa-sun';
  }

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isCurrentlyDark = body.classList.contains('dark-mode');

    if (isCurrentlyDark) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.querySelector('i').className = 'fas fa-sun'; // Change icon to sun
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.querySelector('i').className = 'fas fa-moon'; // Change icon to moon
    }
  });
});