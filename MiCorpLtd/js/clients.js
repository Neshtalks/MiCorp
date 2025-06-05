document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('clients-page')) { 
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not loaded. Clients page animations might not work as intended.');
            // Implement fallback simple animations or ensure GSAP is loaded
            // For now, we proceed assuming they might be loaded or graceful degradation is acceptable
        } else {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // ScrollToPlugin might not be used here
        }
        initClientPageInteractions();
    }
});

function initClientPageInteractions() {
    const clientsData = [
        { id: 1, name: "Tech Solutions Global", industry: "technology", logo: "../assets/images/clients/client-logo-placeholder1.png", description: "Leading IT infrastructure provider, enabling digital transformation worldwide." },
        { id: 2, name: "Auto Dynamics Corp", industry: "automotive", logo: "../assets/images/clients/client-logo-placeholder2.png", description: "Premium automobile distributor and after-sales service specialist." },
        { id: 3, name: "FinanceMax Group", industry: "finance", logo: "../assets/images/clients/client-logo-placeholder3.png", description: "International financial services and consultancy for modern enterprises." },
        { id: 4, name: "Retail World Ltd.", industry: "retail", logo: "../assets/images/clients/client-logo-placeholder4.png", description: "Multi-brand retail chain offering diverse consumer products and experiences." },
        { id: 5, name: "LogiConnect Systems", industry: "logistics", logo: "../assets/images/clients/client-logo-placeholder5.png", description: "Global logistics and supply chain solutions with cutting-edge tracking." },
        { id: 6, name: "Innovatech Software", industry: "technology", logo: "../assets/images/clients/client-logo-placeholder6.png", description: "Custom software development and AI-driven business intelligence tools." },
        { id: 7, name: "GreenBuild Ventures", industry: "construction", logo: "../assets/images/clients/client-logo-placeholder-generic1.png", description: "Sustainable construction and green building project management." },
        { id: 8, name: "HealthFirst Medics", industry: "healthcare", logo: "../assets/images/clients/client-logo-placeholder-generic2.png", description: "Advanced healthcare solutions and medical equipment supplier." }
    ];

    const testimonialsData = [
        { id: 1, text: "Micorp Trading has been instrumental in our growth. Their reliable service and quality products have helped us maintain our market leadership in the tech sector.", name: "John Smith", position: "IT Director, Tech Solutions Global", photo: "../assets/images/testimonials/person1.jpg" },
        { id: 2, text: "The automotive parts sourcing from Micorp is top-notch. Always on time and to specification, which is critical for our operations.", name: "Aisha Khan", position: "Procurement Head, Auto Dynamics Corp", photo: "../assets/images/testimonials/person2.jpg" },
        { id: 3, text: "Their financial IT solutions have streamlined our operations significantly. Highly recommend Micorp for their expertise and support.", name: "Carlos Rodriguez", position: "CFO, FinanceMax Group", photo: "../assets/images/testimonials/person3.jpg" },
        { id: 4, text: "Working with Micorp for our retail IT infrastructure has been a game-changer. Efficient, reliable, and always supportive.", name: "Sarah Lee", position: "Operations Manager, Retail World Ltd.", photo: "../assets/images/testimonials/person4.jpg" }
    ];

    loadClientData(clientsData);
    initClientFilter();
    initTestimonialSlider(testimonialsData);
    if (typeof gsap !== 'undefined') {
        initClientPageAnimationsGSAP();
    } else {
        initClientPageAnimationsCSS(); // Fallback basic CSS animations
    }
    initCustomCursor(); 
}

function loadClientData(clients) {
    const clientsGrid = document.querySelector('.clients-page .clients-grid');
    if (!clientsGrid) return;

    clientsGrid.innerHTML = clients.map(client => `
        <div class="client-card-item animate-on-scroll" data-industry="${client.industry.toLowerCase()}" style="opacity:0;"> <!-- Initial opacity for JS animation -->
            <div class="client-logo-container">
                <img src="${client.logo}" alt="${client.name} Logo" class="client-logo" loading="lazy">
            </div>
            <div class="client-info">
                <h3>${client.name}</h3>
                <p>${client.description}</p>
            </div>
        </div>
    `).join('');
    
    // Trigger CSS animations if GSAP is not available after loading
    if (typeof gsap === 'undefined') {
        setTimeout(() => { // Allow DOM to update
             document.querySelectorAll('.clients-page .client-card-item.animate-on-scroll').forEach(card => {
                card.style.opacity = '1'; // Make them visible
                // The CSS 'animate-on-scroll' and 'is-visible' logic will handle the animation if IntersectionObserver is active from main.js
            });
        },0);
    }
}

function initClientFilter() {
    const filterBtns = document.querySelectorAll('.clients-page .filter-btn');
    const clientsGrid = document.querySelector('.clients-page .clients-grid'); // Get the grid container

    if (!clientsGrid || filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const clientCards = Array.from(clientsGrid.children); // Get current children

            if (typeof gsap !== 'undefined') {
                gsap.to(clientCards, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.25,
                    stagger: 0.03,
                    ease: 'power2.in',
                    onComplete: () => {
                        clientCards.forEach(card => {
                            const cardIndustry = card.getAttribute('data-industry');
                            if (filterValue === 'all' || cardIndustry === filterValue) {
                                card.style.display = 'block'; // Or 'grid', 'flex' depending on item's display
                            } else {
                                card.style.display = 'none';
                            }
                        });
                        // Animate in the visible cards
                        const visibleCards = clientCards.filter(card => card.style.display !== 'none');
                        gsap.to(visibleCards, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.35,
                            stagger: 0.05,
                            ease: 'power2.out',
                            delay: 0.1
                        });
                    }
                });
            } else { // Fallback if GSAP is not loaded
                clientCards.forEach(card => {
                    const cardIndustry = card.getAttribute('data-industry');
                    if (filterValue === 'all' || cardIndustry === filterValue) {
                        card.style.display = 'block';
                        card.style.opacity = '0'; // For simple fade-in
                        setTimeout(() => card.style.opacity = '1', 50); // Trigger fade-in
                    } else {
                        card.style.display = 'none';
                    }
                    card.style.transition = 'opacity 0.3s ease';
                });
            }
        });
    });

    // Initially, trigger the 'all' filter if present, or just show all cards
    const initialActiveFilter = document.querySelector('.clients-page .filter-btn.active');
    if (initialActiveFilter) {
        // initialActiveFilter.click(); // Don't auto-click to avoid animation on load if GSAP runs later for entry
        // Instead, ensure cards are correctly displayed initially by GSAP or CSS
        if (typeof gsap !== 'undefined') {
             setTimeout(() => { // After initial GSAP page load animations
                gsap.to(clientsGrid.children, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out' });
            }, 500); // Delay to ensure page load animations (if any) are done
        } else {
            Array.from(clientsGrid.children).forEach(card => card.style.opacity = '1');
        }
    }
}


function initTestimonialSlider(testimonials) {
    const track = document.querySelector('.clients-page .testimonial-track');
    const dotsContainer = document.querySelector('.clients-page .slider-dots');
    const prevBtn = document.querySelector('.clients-page .prev-slide');
    const nextBtn = document.querySelector('.clients-page .next-slide');
    const sliderElement = document.querySelector('.clients-page .testimonial-slider');


    if (!track || !dotsContainer || !prevBtn || !nextBtn || testimonials.length === 0 || !sliderElement) return;

    track.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-slide-item">
            <div class="testimonial-content">
                <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="client-details">
                    <img src="${testimonial.photo}" alt="${testimonial.name}" class="client-photo" loading="lazy">
                    <div>
                        <h4>${testimonial.name}</h4>
                        <p class="client-position">${testimonial.position}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    dotsContainer.innerHTML = testimonials.map((_, i) =>
        `<button class="dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');

    const slides = track.querySelectorAll('.testimonial-slide-item');
    const dots = dotsContainer.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    function goToSlide(index) {
        if (slideCount <= 1) return;
        
        currentSlide = (index + slideCount) % slideCount; // Loop correctly

        if (typeof gsap !== 'undefined') {
            gsap.to(track, { 
                xPercent: -100 * currentSlide, 
                duration: 0.7, 
                ease: "power3.inOut" 
            });
        } else { 
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            track.style.transition = 'transform 0.7s ease-in-out';
        }
        updateDots();
        resetAutoSlide();
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => goToSlide(parseInt(e.target.dataset.slide)));
    });

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
            dot.setAttribute('aria-current', i === currentSlide);
        });
    }
    
    function startAutoSlide() {
        if (slideCount <= 1) return;
        clearInterval(autoSlideInterval); // Clear existing
        autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    function resetAutoSlide() {
        if (slideCount <= 1) return;
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    sliderElement.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderElement.addEventListener('mouseleave', () => startAutoSlide());

    // Swipe functionality for touch devices
    let touchstartX = 0;
    let touchendX = 0;
    const swipeThreshold = 50; // Minimum swipe distance

    track.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
        clearInterval(autoSlideInterval); // Pause on touch
    }, {passive: true});

    track.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide(); // Resume on touch end
    }, {passive: true});

    function handleSwipe() {
        if (touchendX < touchstartX - swipeThreshold) { // Swiped left
            goToSlide(currentSlide + 1);
        }
        if (touchendX > touchstartX + swipeThreshold) { // Swiped right
            goToSlide(currentSlide - 1);
        }
    }
    
    // Initial setup
    if (slideCount > 0) {
        if (typeof gsap !== 'undefined') {
            gsap.set(track, { width: `${slideCount * 100}%` }); // Set track width for xPercent
            gsap.set(slides, { width: `${100 / slideCount}%` }); // Set individual slide width
            gsap.set(track, { xPercent: 0 }); 
        } else {
            track.style.width = `${slideCount * 100}%`;
            slides.forEach(slide => slide.style.width = `${100 / slideCount}%`);
            track.style.transform = `translateX(0%)`;
        }
    }
    updateDots();
    startAutoSlide();
}


function initClientPageAnimationsGSAP() {
    // Hero animations
    gsap.from(".clients-page .page-hero h1", { opacity: 0, y: 50, duration: 0.8, delay: 0.2, ease: "power3.out" });
    gsap.from(".clients-page .page-hero p", { opacity: 0, y: 40, duration: 0.8, delay: 0.4, ease: "power3.out" });

    // Section headers - using the global .animate-on-scroll via main.js is often better for consistency
    // but if specific GSAP is needed:
    document.querySelectorAll('.clients-page .section-header').forEach(header => {
        gsap.from(header.querySelectorAll("h2, p"), {
            opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: header, start: 'top 88%', toggleActions: 'play none none none' }
        });
    });

    // Filter buttons
    gsap.from(".clients-page .industry-filter .filter-btn", {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: ".clients-page .industry-filter", start: 'top 90%', toggleActions: 'play none none none' }
    });
    
    // Testimonial slider section container
     gsap.from(".clients-page .testimonial-slider", {
        opacity: 0, scale: 0.98, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ".clients-page .testimonial-slider", start: 'top 85%', toggleActions: 'play none none none' }
    });

    // Case Study Cards
    document.querySelectorAll('.clients-page .case-study-card').forEach((card) => {
        // This relies on .animate-on-scroll from main.js which is better for global consistency.
        // If specific GSAP is required for these cards beyond the global scroll animation:
        // gsap.from(card, { /* GSAP specific animation here if needed */ });

        // Hover for overlay (GSAP driven can be smoother)
        const overlay = card.querySelector('.case-study-overlay h3'); // Assuming overlay has h3
        const image = card.querySelector('.case-study-image img');
        if (overlay) {
            const tl = gsap.timeline({ paused: true });
            tl.to(overlay, { y: '0%', duration: 0.4, ease: 'power2.out' })
              .to(image, { scale: 1.08, duration: 0.4, ease: 'power2.out' }, 0); // Synchronize image scale

            card.addEventListener('mouseenter', () => tl.play());
            card.addEventListener('mouseleave', () => tl.reverse());
        }
    });

    // CTA Section
    gsap.from(".clients-page .cta-section .cta-content > *", {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ".clients-page .cta-section", start: 'top 85%', toggleActions: 'play none none none' }
    });
}

function initClientPageAnimationsCSS() {
    // This function is a placeholder if you need to trigger CSS animations
    // specifically when GSAP is not available.
    // Most entry animations are handled by .animate-on-scroll and IntersectionObserver from main.js
    // So, specific triggers here might not be necessary unless you want to add more.
    console.log("Using CSS fallbacks for clients page animations.");
}


function initCustomCursor() {
    const cursor = document.querySelector('.clients-page .custom-cursor');
    const follower = document.querySelector('.clients-page .cursor-follower');

    if (!cursor || !follower || window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1025) { 
        if(cursor) cursor.style.display = 'none';
        if(follower) follower.style.display = 'none';
        return;
    }
    
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    let mouseX = 0, mouseY = 0;
    
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursor, 0.05, { x: mouseX, y: mouseY }); // Faster update for main cursor
        gsap.to(follower, 0.3, { x: mouseX, y: mouseY, ease: "power2.out" }); // Smoother follow
    });

    // Show cursor once JS is ready and positioning is set
    cursor.style.opacity = '1';
    follower.style.opacity = '1';

    const interactiveElements = document.querySelectorAll(
        '.clients-page a, .clients-page button, .clients-page .filter-btn, .clients-page .client-card-item, .clients-page .case-study-card, .clients-page .slider-controls button, .clients-page .dot'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, 0.2, { scale: 1.8, backgroundColor: 'rgba(255,255,255,0.5)' });
            gsap.to(follower, 0.3, { scale: 1.5, borderColor: 'var(--light-text)', backgroundColor: 'rgba(var(--primary-rgb), 0.1)' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, 0.2, { scale: 1, backgroundColor: 'var(--primary-color)' });
            gsap.to(follower, 0.3, { scale: 1, borderColor: 'var(--primary-color)', backgroundColor: 'transparent' });
        });
    });
}