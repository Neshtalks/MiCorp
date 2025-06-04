// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    handlePreloader();
    initMobileMenu();
    initSmoothScroll();
    initNavbarScrollEffect();
    updateDynamicYear();
    initFaqAccordion();
    initGeneralScrollAnimations(); // Basic scroll animations for elements with .animate-on-scroll
    handleContactForm(); // Example: if contact form is on multiple pages or for global handling
}

function handlePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('loaded');
        });
    }
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const body = document.body;
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = navWrapper ? navWrapper.querySelectorAll('.nav-links a') : [];
    const dropdownToggles = navWrapper ? navWrapper.querySelectorAll('.dropdown > a') : [];


    if (!menuToggle || !navWrapper) return;

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    navLinks.forEach(link => {
        // Close menu if it's not a dropdown toggle link
        if (!link.parentElement.classList.contains('dropdown')) {
            link.addEventListener('click', closeMenu);
        }
    });
    
    dropdownToggles.forEach(toggle => {
        const parentDropdown = toggle.parentElement;
        if (parentDropdown.classList.contains('dropdown')) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && parentDropdown.querySelector('.dropdown-menu')) {
                    e.preventDefault(); // Prevent navigation for main dropdown link on mobile
                    parentDropdown.classList.toggle('active');
                }
            });
        }
    });


    function toggleMenu() {
        const isActive = menuToggle.classList.toggle('active');
        navWrapper.classList.toggle('active', isActive);
        body.classList.toggle('menu-open', isActive);
        if (menuOverlay) menuOverlay.classList.toggle('active', isActive);
        menuToggle.setAttribute('aria-expanded', isActive);
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        navWrapper.classList.remove('active');
        body.classList.remove('menu-open');
        if (menuOverlay) menuOverlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        // Close any open dropdowns within the mobile menu
        navWrapper.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    // Close menu on window resize if screen becomes larger
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && body.classList.contains('menu-open')) {
            closeMenu();
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ensure it's a valid internal link and not just "#"
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initNavbarScrollEffect() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const scrollThreshold = 50; // Pixels to scroll before effect triggers
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function updateDynamicYear() {
    document.querySelectorAll('.current-year').forEach(span => {
        span.textContent = new Date().getFullYear();
    });
    // For older specific IDs, though .current-year is better
    const yearSpans = ['currentYear', 'currentYearAbout', 'currentYearAuto', 'currentYearClients', 'currentYearContact', 'currentYearIT', 'currentYearProducts', 'currentYearWhy'];
    yearSpans.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = new Date().getFullYear();
    });
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerPanel = item.querySelector('.faq-answer');

        if (questionButton && answerPanel) {
            questionButton.addEventListener('click', () => {
                const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';

                // Optional: Accordion behavior (close others)
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) {
                //         otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                //         otherItem.querySelector('.faq-question').classList.remove('active');
                //         otherItem.querySelector('.faq-answer').classList.remove('show');
                //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
                //     }
                // });

                questionButton.setAttribute('aria-expanded', String(!isExpanded));
                questionButton.classList.toggle('active', !isExpanded);
                answerPanel.classList.toggle('show', !isExpanded);

                if (!isExpanded) {
                    answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
                } else {
                    answerPanel.style.maxHeight = null;
                }
            });
        }
    });
}

function initGeneralScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: unobserve after animation if it should only run once
                // obs.unobserve(entry.target);
            } else {
                 // Optional: remove class if animation should replay when scrolling back up
                 // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        // rootMargin: "0px 0px -50px 0px" // Example: trigger 50px earlier from bottom
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}


function handleContactForm() {
    const contactForm = document.getElementById('contactForm'); // Assuming one main contact form
    const formStatusEl = document.getElementById('formStatus');

    if (contactForm && formStatusEl) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            // Basic client-side validation (enhance as needed)
            let isValid = true;
            ['name', 'email', 'subject', 'message'].forEach(fieldName => {
                const field = form.elements[fieldName];
                if (field && field.required && !field.value.trim()) {
                    isValid = false;
                    // Add some visual indication for missing fields if desired
                    field.style.borderColor = 'var(--accent-color-error)';
                } else if (field) {
                    field.style.borderColor = ''; // Reset border
                }
            });

            if (!isValid) {
                formStatusEl.textContent = "Please fill in all required fields.";
                formStatusEl.className = 'form-status form-error';
                return;
            }


            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            formStatusEl.textContent = '';
            formStatusEl.className = 'form-status';


            // Simulate form submission (replace with actual fetch to Formspree or backend)
            if (form.action.includes('formspree.io')) { // If using Formspree
                 try {
                    const response = await fetch(form.action, {
                        method: form.method,
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });
                    if (response.ok) {
                        formStatusEl.textContent = "Thanks for your message! We'll be in touch soon.";
                        formStatusEl.className = 'form-status form-success';
                        form.reset();
                        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    } else {
                        const data = await response.json();
                        if (data.errors) {
                            formStatusEl.textContent = data.errors.map(err => err.message).join(', ');
                        } else {
                            formStatusEl.textContent = "Oops! There was a problem submitting your form.";
                        }
                        formStatusEl.className = 'form-status form-error';
                        submitButton.innerHTML = originalButtonText;
                    }
                } catch (error) {
                    formStatusEl.textContent = "Oops! There was a network error. Please try again.";
                    formStatusEl.className = 'form-status form-error';
                    submitButton.innerHTML = originalButtonText;
                } finally {
                    if (formStatusEl.className.includes('form-success')) {
                         setTimeout(() => {
                            submitButton.innerHTML = originalButtonText;
                            submitButton.disabled = false;
                            formStatusEl.textContent = '';
                         }, 3000);
                    } else {
                        submitButton.disabled = false;
                    }
                }
            } else {
                // Fallback for non-Formspree or local testing
                setTimeout(() => {
                    formStatusEl.textContent = "Thank you! Your message has been 'sent' (simulated).";
                    formStatusEl.className = 'form-status form-success';
                    form.reset();
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    setTimeout(() => {
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                        formStatusEl.textContent = '';
                    }, 3000);
                }, 1500);
            }
        });
    }
}

// Leaflet Map Initialization (can be called specifically from contact.html or conditionally here)
// Moved to contact.html inline script for page-specific dependency loading.
// If you prefer it here, ensure Leaflet JS is loaded globally or conditionally.
/*
function initLeafletMap() {
    if (document.getElementById('map')) {
        // ... map code from contact.html ...
    }
}
*/