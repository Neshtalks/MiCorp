document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-wrapper .nav-links a'); // Target links within nav-wrapper
    const body = document.body;
    const siteHeader = document.querySelector('.site-header');

    // Add index to nav items for staggered animation if needed by CSS
    document.querySelectorAll('.nav-links li').forEach((link, index) => {
        link.style.setProperty('--item-index', index);
    });

    // Toggle menu
    menuToggle?.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling to document
        const isActive = menuToggle.classList.toggle('active');
        navWrapper.classList.toggle('active', isActive);
        body.classList.toggle('menu-open', isActive);
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navWrapper.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navWrapper.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navWrapper && navWrapper.classList.contains('active') &&
            !navWrapper.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navWrapper.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navWrapper && navWrapper.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navWrapper.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });


    // Navbar scroll effect (optional, if you want background change on scroll)
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (siteHeader) {
            if (scrollTop > 50) {
                siteHeader.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            } else {
                siteHeader.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'; // Keep initial shadow
            }
            // Basic hide/show navbar on scroll
            // if (scrollTop > lastScrollTop && scrollTop > siteHeader.offsetHeight) {
            //     // Scroll Down
            //     siteHeader.style.top = `-${siteHeader.offsetHeight}px`;
            // } else {
            //     // Scroll Up
            //     siteHeader.style.top = "0";
            // }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Check if it's a simple hash for the current page
            if (href.startsWith('#') && href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = siteHeader ? siteHeader.offsetHeight : 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact Form Handling (Contact Page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields (*).');
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Simulate success
                submitButton.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                alert('Thank you for your message. We will contact you soon!');
                contactForm.reset();
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }, 2000);

            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error sending your message. Please try again.');
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }

    // FAQ Functionality (Contact Page)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.toggle('active');
            
            if (answer) {
                if (isActive) {
                    answer.classList.add('show');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.classList.remove('show');
                    answer.style.maxHeight = null;
                }
            }

            // Optional: Close other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    if (otherAnswer) {
                        otherAnswer.classList.remove('show');
                        otherAnswer.style.maxHeight = null;
                    }
                }
            });
        });
    });

    // Initialize Leaflet Map (Contact Page)
    if (document.getElementById('map')) {
        try {
            const micorpLocation = [25.2675, 55.3084]; // Coordinates for Fahidi Heights (approx)
            const map = L.map('map').setView(micorpLocation, 16);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            const micorpIcon = L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Default Leaflet icon
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                shadowSize: [41, 41]
            });

            L.marker(micorpLocation, { icon: micorpIcon })
                .addTo(map)
                .bindPopup(`
                    <div style="text-align: center; font-family: var(--font-primary);">
                        <strong style="color: var(--primary-color); font-size: 1.1em;">Micorp Trading LLC</strong><br>
                        <small>Office No. 709, Fahidi Heights<br>Al Hamriya, Bur Dubai, Dubai, UAE</small><br>
                        <a href="https://www.google.com/maps/search/?api=1&query=25.2675,55.3084" target="_blank" style="color: var(--primary-dark); text-decoration: underline; font-weight: 500;">
                            Get Directions
                        </a>
                    </div>
                `)
                .openPopup();
        } catch (e) {
            console.error("Error initializing Leaflet map. Make sure Leaflet library is loaded.", e);
            const mapDiv = document.getElementById('map');
            if (mapDiv) {
                mapDiv.innerHTML = "<p style='text-align:center; padding-top: 50px;'>Map could not be loaded. Please check your internet connection or contact support.</p>";
            }
        }
    }

    // Stats Counter Animation (Why Choose Us Page)
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStat = (element) => {
        const target = +element.getAttribute('data-count');
        const duration = 1500; // 1.5 seconds
        const frameDuration = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * progress);
            
            element.textContent = currentCount;

            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = target; // Ensure final value is exact
            }
        }, frameDuration);
    };

    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

});