// js/animations.js

document.addEventListener('DOMContentLoaded', () => {
    // Call animation initializers if they are not page-specific
    // and don't depend on elements that might not exist on all pages.
    initAnimatedCounters();
    initProductCardHoverEffect(); // Example of an advanced hover
    // initHeroParallax(); // If a global hero parallax is desired
});

// Animated Counters (from why-choose-us.html logic)
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (counters.length === 0) return;

    const speed = 200; // Lower is slower

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-count');
                counter.innerText = '0'; // Initialize

                const updateCount = () => {
                    const count = +counter.innerText;
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 15); // Adjust timing for smoothness
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                obs.unobserve(counter); // Animate only once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Product Card 3D Hover Effect (Example of a more advanced animation)
function initProductCardHoverEffect() {
    const productCards = document.querySelectorAll('.product-card, .vehicle-card'); // Apply to both

    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth < 769) return; // Disable on mobile for performance/usability

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15; // Adjust divisor for sensitivity
            const rotateY = (centerX - x) / 15; // Adjust divisor for sensitivity

            // Apply a subtle glare effect
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            const glareElement = this.querySelector('.card-glare'); // Requires a <div class="card-glare"></div> inside card

            if (glareElement) {
                glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent 40%)`;
            }


            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            this.style.transition = 'transform 0.1s linear'; // Quick follow for mousemove
        });

        card.addEventListener('mouseleave', function() {
            if (window.innerWidth < 769) return;

            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            this.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'; // Smooth return

            const glareElement = this.querySelector('.card-glare');
            if (glareElement) {
                glareElement.style.background = 'transparent';
            }
        });

        // Add a glare element if it doesn't exist (optional, can be added in HTML)
        // if (!card.querySelector('.card-glare')) {
        //     const glareDiv = document.createElement('div');
        //     glareDiv.className = 'card-glare';
        //     glareDiv.style.position = 'absolute';
        //     glareDiv.style.top = '0';
        //     glareDiv.style.left = '0';
        //     glareDiv.style.width = '100%';
        //     glareDiv.style.height = '100%';
        //     glareDiv.style.pointerEvents = 'none';
        //     glareDiv.style.borderRadius = 'inherit'; // Match card's border radius
        //     card.style.position = 'relative'; // Ensure card is positioned for absolute child
        //     card.appendChild(glareDiv);
        // }
    });
}


// Parallax effect for hero sections (Example)
function initHeroParallax() {
    const heroSections = document.querySelectorAll('.hero-background img'); // Target the image inside
    if (heroSections.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSections.forEach(heroImg => {
            // Check if the hero section itself is in view to avoid unnecessary calculations
            const parentSection = heroImg.closest('.page-hero, .hero');
            if (parentSection) {
                const rect = parentSection.getBoundingClientRect();
                if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                    heroImg.style.transform = `translateY(${scrollPosition * 0.3}px)`; // Adjust multiplier for parallax intensity
                    heroImg.style.transition = 'transform 0.1s linear'; // Smooths it slightly
                }
            }
        });
    });
}
// Call it if you want parallax on all hero images globally
// initHeroParallax();