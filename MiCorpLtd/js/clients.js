document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('clients-page')) { // Ensure this script runs only on clients.html
        // Check if GSAP and ScrollTrigger are loaded
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not loaded. Clients page animations might not work.');
            // Fallback or load dynamically if needed
            // For now, we assume they are loaded via CDN in clients.html if this script is used
        } else {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        }
        initClientPageInteractions();
    }
});

function initClientPageInteractions() {
    // Sample client data (could be fetched from an API in a real app)
    const clientsData = [
        { id: 1, name: "Tech Solutions Global", industry: "technology", logo: "../assets/images/clients/client-logo-placeholder1.png", description: "Leading IT infrastructure provider." },
        { id: 2, name: "Auto Dynamics Corp", industry: "automotive", logo: "../assets/images/clients/client-logo-placeholder2.png", description: "Premium automobile distributor." },
        { id: 3, name: "FinanceMax Group", industry: "finance", logo: "../assets/images/clients/client-logo-placeholder3.png", description: "International financial services." },
        { id: 4, name: "Retail World Ltd.", industry: "retail", logo: "../assets/images/clients/client-logo-placeholder4.png", description: "Multi-brand retail chain." },
        { id: 5, name: "LogiConnect Systems", industry: "logistics", logo: "../assets/images/clients/client-logo-placeholder5.png", description: "Global logistics and supply chain." },
        { id: 6, name: "Innovatech Software", industry: "technology", logo: "../assets/images/clients/client-logo-placeholder6.png", description: "Custom software development." },
         // Add more clients, ensure unique IDs and correct image paths
    ];

    const testimonialsData = [
        { id: 1, text: "Micorp Trading has been instrumental in our growth. Their reliable service and quality products have helped us maintain our market leadership.", name: "John Smith", position: "IT Director, Tech Solutions Global", photo: "../assets/images/testimonials/person1.jpg" },
        { id: 2, text: "The automotive parts sourcing from Micorp is top-notch. Always on time and to specification.", name: "Aisha Khan", position: "Procurement Head, Auto Dynamics Corp", photo: "../assets/images/testimonials/person2.jpg" },
        { id: 3, text: "Their financial IT solutions have streamlined our operations significantly. Highly recommend Micorp.", name: "Carlos Rodriguez", position: "CFO, FinanceMax Group", photo: "../assets/images/testimonials/person3.jpg" },
         // Add more testimonials with correct image paths
    ];


    loadClientData(clientsData);
    initClientFilter();
    initTestimonialSlider(testimonialsData);
    initClientPageAnimations(); // GSAP specific animations for this page
    initCustomCursor(); // If the custom cursor is exclusive to this page
    // initCaseStudiesInteractions(); // If case studies have specific JS interactions here
}

function loadClientData(clients) {
    const clientsGrid = document.querySelector('.clients-page .clients-grid');
    if (!clientsGrid) return;

    clientsGrid.innerHTML = clients.map(client => `
        <div class="client-card-item" data-industry="${client.industry.toLowerCase()}">
            <div class="client-logo-container">
                <img src="${client.logo}" alt="${client.name} Logo" class="client-logo" loading="lazy">
            </div>
            <div class="client-info">
                <h3>${client.name}</h3>
                <p>${client.description}</p>
            </div>
        </div>
    `).join('');
     // Initial animation for loaded cards
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(clientsGrid.querySelectorAll('.client-card-item'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
    }
}

function initClientFilter() {
    const filterBtns = document.querySelectorAll('.clients-page .filter-btn');
    const clientCards = () => document.querySelectorAll('.clients-page .client-card-item'); // Make it dynamic

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cardsToAnimate = Array.from(clientCards());

            if (typeof gsap !== 'undefined') {
                // Animate out cards that don't match
                const cardsToHide = cardsToAnimate.filter(card =>
                    filter !== 'all' && card.dataset.industry !== filter
                );
                if (cardsToHide.length > 0) {
                    gsap.to(cardsToHide, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => cardsToHide.forEach(c => c.style.display = 'none')
                    });
                }

                // Animate in cards that match
                const cardsToShow = cardsToAnimate.filter(card =>
                    filter === 'all' || card.dataset.industry === filter
                );
                 // Set display before animating in
                cardsToShow.forEach(c => c.style.display = 'block');
                if (cardsToShow.length > 0) {
                    gsap.fromTo(cardsToShow,
                        { opacity: 0, scale: 0.9, y:10 },
                        {
                            opacity: 1,
                            scale: 1,
                            y:0,
                            duration: 0.4,
                            delay: cardsToHide.length > 0 ? 0.3 : 0, // Delay if some cards were hidden
                            stagger: 0.05,
                            ease: 'power2.out'
                        }
                    );
                }
            } else { // Fallback if GSAP is not loaded
                clientCards().forEach(card => {
                    if (filter === 'all' || card.dataset.industry === filter) {
                        card.style.display = 'block'; // Or 'grid', 'flex' depending on card's display type
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
}


function initTestimonialSlider(testimonials) {
    const track = document.querySelector('.clients-page .testimonial-track');
    const dotsContainer = document.querySelector('.clients-page .slider-dots');
    const prevBtn = document.querySelector('.clients-page .prev-slide');
    const nextBtn = document.querySelector('.clients-page .next-slide');

    if (!track || !dotsContainer || !prevBtn || !nextBtn || testimonials.length === 0) return;

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

    function goToSlide(index, direction = 0) { // direction: 1 for next, -1 for prev
        if (index === currentSlide && direction === 0) return; // Avoid re-animating to same slide

        const oldSlide = slides[currentSlide];
        currentSlide = (index + slideCount) % slideCount;
        const newSlide = slides[currentSlide];

        if (typeof gsap !== 'undefined') {
            // Simple fade transition or use GSAP's xPercent for sliding
            // For sliding with GSAP:
             gsap.to(track, { xPercent: -100 * currentSlide, duration: 0.7, ease: "power3.inOut" });

            // Or for a fade effect:
            // gsap.timeline()
            //    .to(oldSlide, { opacity: 0, duration: 0.3, ease: 'power1.in' })
            //    .set(oldSlide, { display: 'none' })
            //    .set(newSlide, { display: 'block', opacity: 0 }) // 'block' or 'flex' depending on slide style
            //    .to(newSlide, { opacity: 1, duration: 0.4, ease: 'power1.out' });

        } else { // Fallback
            slides.forEach(s => s.style.display = 'none'); // Hide all
            newSlide.style.display = 'block'; // Show current
            newSlide.style.opacity = 1;
        }
        updateDots();
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1, -1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1, 1));

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => goToSlide(parseInt(e.target.dataset.slide)));
    });

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

     // Auto-advance (optional)
    let autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1, 1), 5000);
    const sliderElement = document.querySelector('.clients-page .testimonial-slider');
    sliderElement.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderElement.addEventListener('mouseleave', () => {
         clearInterval(autoSlideInterval); // Clear existing before setting new
         autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1, 1), 5000);
    });


    // Initial setup
    if (slideCount > 0 && typeof gsap !== 'undefined') {
        gsap.set(track, { xPercent: 0 }); // Ensure initial position
        slides.forEach((slide, index) => {
            if (index !== 0) gsap.set(slide, {}); // Ensure other slides are ready for xPercent
        });
    } else if (slideCount > 0) {
        slides.forEach((s, i) => s.style.display = i === 0 ? 'block' : 'none');
    }
    updateDots();
}


function initClientPageAnimations() {
    if (typeof gsap === 'undefined') return;

    // Hero animations for clients page
    gsap.fromTo(".clients-page .page-hero h1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" });
    gsap.fromTo(".clients-page .page-hero p", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" });

    // Section header scroll triggers
    document.querySelectorAll('.clients-page .section-header').forEach(header => {
        gsap.fromTo(header.querySelector('h2'),
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' } }
        );
        gsap.fromTo(header.querySelector('p'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power2.out', scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' } }
        );
    });

    // Filter buttons animation
    gsap.fromTo(".clients-page .industry-filter .filter-btn",
        { opacity: 0, y: 20 },
        {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: ".clients-page .industry-filter", start: 'top 85%', toggleActions: 'play none none none' }
        }
    );

    // Testimonial slider section
     gsap.fromTo(".clients-page .testimonial-slider",
        { opacity: 0, scale: 0.95 },
        {
            opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: ".clients-page .testimonial-slider", start: 'top 80%', toggleActions: 'play none none none' }
        }
    );


    // Case Study Cards (if present on this page and structured with .case-study-card)
    document.querySelectorAll('.clients-page .case-study-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, scale:0.95 },
            {
                opacity: 1, y: 0, scale:1, duration: 0.6, ease: 'power3.out',
                delay: index * 0.1, // Stagger
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
        // Hover for overlay (if GSAP is used for this instead of CSS)
        const overlay = card.querySelector('.case-study-overlay');
        if (overlay) {
            card.addEventListener('mouseenter', () => gsap.to(overlay, { y: '0%', duration: 0.4, ease: 'power2.out' }));
            card.addEventListener('mouseleave', () => gsap.to(overlay, { y: '100%', duration: 0.3, ease: 'power2.in' }));
        }
    });

    // CTA Section
    gsap.fromTo(".clients-page .cta-section .cta-content > *",
        { opacity: 0, y: 30 },
        {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: ".clients-page .cta-section", start: 'top 80%', toggleActions: 'play none none none' }
        }
    );
}

function initCustomCursor() {
    const cursor = document.querySelector('.clients-page .custom-cursor');
    const follower = document.querySelector('.clients-page .cursor-follower');

    if (!cursor || !follower || window.innerWidth < 1025) { // Disable on touch devices / smaller screens
        if(cursor) cursor.style.display = 'none';
        if(follower) follower.style.display = 'none';
        return;
    }
    
    // Show cursor once JS is ready
    cursor.style.opacity = '1';
    follower.style.opacity = '1';


    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    const speed = 0.1; // Adjust for follower smoothness (lower = slower/smoother)

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if(cursor) gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' });
    });

    function loop() {
        if(follower) {
            const distX = mouseX - followerX;
            const distY = mouseY - followerY;
            followerX += distX * speed;
            followerY += distY * speed;
            gsap.to(follower, { x: followerX, y: followerY, duration: 0, ease: 'none' }); // Update position directly in loop
        }
        requestAnimationFrame(loop);
    }
    loop();


    const interactiveElements = document.querySelectorAll(
        '.clients-page a, .clients-page button, .clients-page .filter-btn, .clients-page .client-card-item, .clients-page .case-study-card, .clients-page .slider-controls button, .clients-page .dot'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursor) cursor.classList.add('active');
            if(follower) follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            if(cursor) cursor.classList.remove('active');
            if(follower) follower.classList.remove('active');
        });
    });
}