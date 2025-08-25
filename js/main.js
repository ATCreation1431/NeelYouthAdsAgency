// Main JavaScript functionality
class DigitalBoostApp {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startCounters();
        this.setupAutoPopup();
        this.updateSpotsLeft();
        // this.initDarkMode();
        this.setupVideoModal();
    }

    init() {
        // Hide loading screen
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);

        // Initialize navbar scroll effect
        // this.setupNavbarScroll();
        
        // Initialize mobile menu
        // this.setupMobileMenu();
        
        // Initialize countdown timer
        this.startCountdownTimer();
        
        // Initialize form validation
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Register button event listeners
        const registerButtons = [
            'sticky-register-btn',
            'hero-register-btn',
            'process-register-btn',
            'curriculum-register-btn',
            'audience-register-btn',
            'final-register-btn',
            'rgBtn1',
            'rgBtn2',
            'rgBtn3'
        ];

        registerButtons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('click', () => this.openRegistrationModal());
            }
        });

        // Modal event listeners
        document.getElementById('modal-close').addEventListener('click', () => this.closeRegistrationModal());
        document.getElementById('success-close').addEventListener('click', () => this.closeSuccessModal());
        
        // Close modals when clicking outside
        document.getElementById('registration-modal').addEventListener('click', (e) => {
            if (e.target.id === 'registration-modal') {
                this.closeRegistrationModal();
            }
        });

        document.getElementById('success-modal').addEventListener('click', (e) => {
            if (e.target.id === 'success-modal') {
                this.closeSuccessModal();
            }
        });

        document.getElementById('video-modal').addEventListener('click', (e) => {
            if (e.target.id === 'video-modal') {
                this.closeVideoModal();
            }
        });

        // Form submission
        document.getElementById('registration-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Dark mode toggle
        // document.getElementById('dark-mode-toggle').addEventListener('click', () => this.toggleDarkMode());

        // Video thumbnail click
        document.getElementById('video-thumbnail').addEventListener('click', () => this.openVideoModal());
        
        // Video modal close
        document.getElementById('video-close').addEventListener('click', () => this.closeVideoModal());

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
    }

    setupNavbarScroll() {
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    closeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }

    startCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const current = parseInt(counter.textContent);
            const increment = target / 100;
            
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(() => animateCounter(counter), 30);
            } else {
                counter.textContent = target;
            }
        };

        // Start counters when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (!counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        counter.textContent = '0';
                        animateCounter(counter);
                    }
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    startCountdownTimer() {
        // Set countdown for 24 hours from now
        const now = new Date().getTime();
        const countdownTime = now + (24 * 60 * 60 * 1000);

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = countdownTime - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                // Reset timer for next day
                const newCountdownTime = new Date().getTime() + (24 * 60 * 60 * 1000);
                return;
            }
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    setupAutoPopup() {
        // Auto-open registration modal after 30 seconds
        setTimeout(() => {
            if (!localStorage.getItem('registration_popup_shown')) {
                this.openRegistrationModal();
                localStorage.setItem('registration_popup_shown', 'true');
            }
        }, 30000);
    }

    updateSpotsLeft() {
        // Simulate dynamic spots left counter
        const spotsElements = document.querySelectorAll('#spots-left, #final-spots-left');
        let spotsLeft = parseInt(localStorage.getItem('spots_left')) || 47;
        
        // Randomly decrease spots every 2-5 minutes
        setInterval(() => {
            if (spotsLeft > 10 && Math.random() < 0.3) {
                spotsLeft--;
                spotsElements.forEach(el => el.textContent = spotsLeft);
                localStorage.setItem('spots_left', spotsLeft);
            }
        }, Math.random() * 180000 + 120000); // 2-5 minutes

        spotsElements.forEach(el => el.textContent = spotsLeft);
    }

    openRegistrationModal() {
        document.getElementById('registration-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeRegistrationModal() {
        document.getElementById('registration-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    openSuccessModal() {
        document.getElementById('success-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeSuccessModal() {
        document.getElementById('success-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    setupFormValidation() {
        const form = document.getElementById('registration-form');
        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else {
            switch (field.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'tel':
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ff6b6b';
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ff6b6b';
            errorElement.style.fontSize = '14px';
            errorElement.style.marginTop = '5px';
            errorElement.style.display = 'block';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.style.borderColor = '#e0e0e0';
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    handleFormSubmission() {
        const form = document.getElementById('registration-form');
        const formData = new FormData(form);
        const requiredInputs = form.querySelectorAll('input[required]');
        
        let isFormValid = true;

        // Validate all required fields
        requiredInputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('.form-submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Close registration modal
            this.closeRegistrationModal();
            
            // Open success modal
            setTimeout(() => {
                this.openSuccessModal();
            }, 300);

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Track registration (in real app, send to analytics)
            console.log('Registration successful:', Object.fromEntries(formData));
            
            // Update spots left
            const spotsElements = document.querySelectorAll('#spots-left, #final-spots-left');
            let spotsLeft = parseInt(spotsElements[0].textContent) - 1;
            spotsElements.forEach(el => el.textContent = spotsLeft);
            localStorage.setItem('spots_left', spotsLeft);

        }, 2000);
    }

    initDarkMode() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeIcon = document.getElementById('theme-icon');
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    setupVideoModal() {
        this.videoId = 'dQw4w9WgXcQ'; // YouTube video ID
        this.videoIframe = document.getElementById('video-iframe');
    }

    openVideoModal() {
        const modal = document.getElementById('video-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load video with autoplay
        const embedUrl = `https://www.youtube.com/embed/${this.videoId}?autoplay=1&rel=0&modestbranding=1`;
        this.videoIframe.src = embedUrl;
    }

    closeVideoModal() {
        const modal = document.getElementById('video-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Stop video by removing src
        this.videoIframe.src = '';
    }

    // Utility method for smooth scrolling
    smoothScrollTo(element, duration = 1000) {
        const targetPosition = element.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    // Easing function for smooth animations
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// Intersection Observer for scroll animations
class ScrollAnimations {
    constructor() {
        this.initScrollAnimations();
    }

    initScrollAnimations() {
        // Elements to animate on scroll
        const animateElements = [
            { selector: '.section-header', class: 'fade-in' },
            { selector: '.benefit-card', class: 'scale-in' },
            { selector: '.testimonial-card', class: 'fade-in' },
            { selector: '.step-content', class: 'slide-in-left' },
            { selector: '.step-visual', class: 'slide-in-right' },
            { selector: '.curriculum-item', class: 'fade-in' },
            { selector: '.about-content', class: 'fade-in' }
        ];

        // Add animation classes to elements
        animateElements.forEach(({ selector, class: className }) => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add(className);
            });
        });

        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe all elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });

        // Stagger animations for grouped elements
        this.staggerAnimations();
    }

    staggerAnimations() {
        // Stagger benefit cards
        document.querySelectorAll('.benefit-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });

        // Stagger testimonial cards
        document.querySelectorAll('.testimonial-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.3}s`;
        });

        // Stagger curriculum items
        document.querySelectorAll('.curriculum-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

// Particle system for background effects
class ParticleSystem {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 50,
            particleColor: options.particleColor || 'rgba(255, 255, 255, 0.5)',
            particleSize: options.particleSize || 2,
            speed: options.speed || 0.5,
            ...options
        };
        
        this.init();
        this.animate();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed,
                size: Math.random() * this.options.particleSize + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.fillStyle = this.options.particleColor;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    new DigitalBoostApp();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize particle systems for hero background
    const heroCanvas = document.createElement('canvas');
    heroCanvas.style.position = 'absolute';
    heroCanvas.style.top = '0';
    heroCanvas.style.left = '0';
    heroCanvas.style.width = '100%';
    heroCanvas.style.height = '100%';
    heroCanvas.style.pointerEvents = 'none';
    
    const heroCanvasContainer = document.getElementById('hero-canvas');
    if (heroCanvasContainer) {
        heroCanvasContainer.appendChild(heroCanvas);
        new ParticleSystem(heroCanvas, {
            particleCount: 100,
            particleColor: 'rgba(255, 255, 255, 0.3)',
            speed: 0.3
        });
    }
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.position = 'fixed';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.width = '4px';
    cursor.style.height = '4px';
    cursor.style.background = 'rgba(102, 126, 234, 0.5)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.animation = 'cursorFade 1s ease-out forwards';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
    }, 1000);
});

// Add cursor fade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes cursorFade {
        0% { 
            transform: scale(1); 
            opacity: 1; 
        }
        100% { 
            transform: scale(0); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(style);
