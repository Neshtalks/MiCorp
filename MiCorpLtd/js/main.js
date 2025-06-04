// Main JavaScript file for the website

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }

            // Add loading state to button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';

            try {
                // Here you would typically send the form data to your server
                // For now, we'll just simulate a submission
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('Thank you for your message. We will contact you soon!');
                contactForm.reset();
            } catch (error) {
                alert('There was an error sending your message. Please try again.');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }
        });
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe all animated elements
    document.querySelectorAll('.animate-from-left, .animate-from-right, .animate-from-bottom')
        .forEach(el => observer.observe(el));

    // Check if hero image loads
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.addEventListener('load', function() {
            console.log('Hero image loaded successfully');
        });
        heroImage.addEventListener('error', function() {
            console.error('Error loading hero image');
            console.log('Image path:', heroImage.src);
        });
    }

// Enhanced Scroll Reveal Animation
function initScrollReveal() {
    const animateElements = document.querySelectorAll(
        '.animate-from-bottom, .animate-from-left, .animate-from-right, .reveal'
    );
    
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Reset animation when element is out of view
                // } else {
                //     entry.target.classList.remove('active');
            }
        });
    }, options);
    
    animateElements.forEach(element => {
        observer.observe(element);
        // Add initial state class
        element.classList.add('animate-init');
    });
}
  // Additional animation for floating contacts on scroll
        window.addEventListener('scroll', function() {
            const floatingContacts = document.querySelector('.floating-contacts');
            const contactHero = document.querySelector('.contact-hero');
            const heroHeight = contactHero.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > heroHeight * 0.3) {
                floatingContacts.style.transform = 'translateY(0) scale(0.9)';
                floatingContacts.style.opacity = '0.9';
            } else {
                floatingContacts.style.transform = 'translateY(0) scale(1)';
                floatingContacts.style.opacity = '1';
            }
        });
//!-- Leaflet JS for Map -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

// Initialize animations after page load

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

// CLIENTS PAGE SPECIFIC SCRIPTS

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations
    initAnimations();
    
    // Initialize client filtering
    initClientFilter();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize case studies
    initCaseStudies();
    
    // Initialize magnetic button effect
    initMagneticButton();
    
    // Load client data
    loadClientData();
});

function initAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.to('.scroll-indicator', {
        opacity: 1,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    // Section title animations
    gsap.utils.toArray('[data-animate="title"]').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Section subtitle animations
    gsap.utils.toArray('[data-animate="subtitle"]').forEach(subtitle => {
        gsap.from(subtitle, {
            scrollTrigger: {
                trigger: subtitle,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
        });
    });
    
    // Filter buttons animation
    gsap.from('.industry-filter', {
        scrollTrigger: {
            trigger: '.industry-filter',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Client cards animation
    gsap.utils.toArray('.client-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
    
    // CTA section animation
    gsap.from('.cta-content', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

function initClientFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clientCards = document.querySelectorAll('.client-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter client cards
            clientCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-industry') === filterValue) {
                    card.style.display = 'block';
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power3.out'
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.5,
                        ease: 'power3.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Update slider position
    function updateSlider() {
        gsap.to(track, {
            x: `-${currentIndex * 100}%`,
            duration: 0.6,
            ease: 'power3.out'
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance slides (optional)
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

function initCaseStudies() {
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    
    caseStudyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.case-study-overlay h3'), {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.case-study-overlay h3'), {
                y: 20,
                opacity: 0,
                duration: 0.3,
                ease: 'power3.in'
            });
        });
    });
}

function initMagneticButton() {
    const magneticBtn = document.querySelector('.magnetic-wrap');
    
    if (magneticBtn) {
        magneticBtn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distanceX = x - centerX;
            const distanceY = y - centerY;
            
            gsap.to(this, {
                x: distanceX * 0.2,
                y: distanceY * 0.2,
                duration: 0.5,
                ease: 'power3.out'
            });
            
            gsap.to(this.querySelector('.btn-text'), {
                x: distanceX * 0.4,
                y: distanceY * 0.4,
                duration: 0.5,
                ease: 'power3.out'
            });
        });
        
        magneticBtn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.5)'
            });
            
            gsap.to(this.querySelector('.btn-text'), {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    }
}

function loadClientData() {
    // In a real implementation, you would fetch this from an API
    const clientsData = [
        {
            id: 1,
            name: "Tech Solutions LLC",
            industry: "technology",
            description: "Enterprise IT infrastructure provider",
            logo: "../assets/images/clients/tech-solutions.png"
        },
        // Add more client data here
    ];
    
    const testimonialsData = [
        {
            id: 1,
            text: "Micorp Trading has been our trusted supplier for IT equipment for the past five years. Their reliability and technical expertise have been invaluable to our operations.",
            name: "Ali Al Maktoum",
            position: "IT Director, Tech Solutions LLC",
            photo: "../assets/images/testimonials/ali-al-maktoum.jpg"
        },
        // Add more testimonial data here
    ];
    
    const caseStudiesData = [
        {
            id: 1,
            title: "Enterprise IT Infrastructure Upgrade",
            description: "Complete overhaul of network infrastructure with next-gen equipment, resulting in 40% performance improvement...",
            image: "../assets/images/case-studies/it-infrastructure.jpg",
            link: "#"
        },
        // Add more case study data here
    ];
    
    // Populate clients grid
    const clientsGrid = document.querySelector('.clients-grid');
    clientsData.forEach(client => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';
        clientCard.setAttribute('data-industry', client.industry);
        clientCard.innerHTML = `
            <div class="client-logo-container">
                <img src="${client.logo}" alt="${client.name}" class="client-logo">
            </div>
            <div class="client-info">
                <h3>${client.name}</h3>
                <p>${client.description}</p>
            </div>
        `;
        clientsGrid.appendChild(clientCard);
    });
    
    // Populate testimonials slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    testimonialsData.forEach(testimonial => {
        const testimonialSlide = document.createElement('div');
        testimonialSlide.className = 'testimonial-slide';
        testimonialSlide.innerHTML = `
            <div class="testimonial-content">
                <div class="quote-icon">
                    <i class="fas fa-quote-left"></i>
                </div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="client-details">
                    <img src="${testimonial.photo}" alt="${testimonial.name}" class="client-photo">
                    <div>
                        <h4>${testimonial.name}</h4>
                        <p class="client-position">${testimonial.position}</p>
                    </div>
                </div>
            </div>
        `;
        testimonialTrack.appendChild(testimonialSlide);
    });
    
    // Populate case studies
    const caseStudiesGrid = document.querySelector('.case-studies-grid');
    caseStudiesData.forEach(study => {
        const caseStudyCard = document.createElement('div');
        caseStudyCard.className = 'case-study-card';
        caseStudyCard.innerHTML = `
            <div class="case-study-image">
                <img src="${study.image}" alt="${study.title}">
                <div class="case-study-overlay">
                    <h3>${study.title}</h3>
                </div>
            </div>
            <div class="case-study-content">
                <p>${study.description}</p>
                <a href="${study.link}" class="btn-secondary">Read Full Case Study</a>
            </div>
        `;
        caseStudiesGrid.appendChild(caseStudyCard);
    });
}
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
;

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;

    // Add index to nav items for staggered animation
    navLinks.forEach((link, index) => {
        link.style.setProperty('--item-index', index);
    });

    // Toggle menu
    menuToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navWrapper?.classList.contains('active') &&
            !navWrapper.contains(e.target) &&
            !menuToggle?.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when mouse leaves nav wrapper (with delay)
    let timeoutId;
    navWrapper?.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 768) {
            timeoutId = setTimeout(() => {
                closeMenu();
            }, 500); // 500ms delay before closing
        }
    });

    // Cancel close if mouse returns
    navWrapper?.addEventListener('mouseenter', () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    function toggleMenu() {
        menuToggle?.classList.toggle('active');
        navWrapper?.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    function closeMenu() {
        menuToggle?.classList.remove('active');
        navWrapper?.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Handle dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (window.innerWidth <= 768) {
            link?.addEventListener('click', (e) => {
                e.preventDefault();
                menu?.classList.toggle('active');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';

            setTimeout(() => {
                alert('Thank you for your message. We will contact you soon!');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }, 1500);
        });
    }
});

// Mobile Menu Implementation
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;
    
    // Toggle menu function
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navWrapper.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Animate menu items
        navLinks.forEach((link, index) => {
            if (navWrapper.classList.contains('active')) {
                link.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
            } else {
                link.style.animation = 'none';
            }
        });
    }

    // Close menu function
    function closeMenu() {
        menuToggle.classList.remove('active');
        navWrapper.classList.remove('active');
        body.classList.remove('menu-open');
        navLinks.forEach(link => {
            link.style.animation = 'none';
        });
    }

    // Event Listeners
    menuToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navWrapper.classList.contains('active') && 
            !navWrapper.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});