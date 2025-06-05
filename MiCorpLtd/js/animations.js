// animations.js

/**
 * Splits the text content of elements with '.animate-text.js-split'
 * into individual character spans for staggered animation.
 */
function splitCharsForAnimation() {
    const textElementsToSplit = document.querySelectorAll('.animate-text.js-split');

    textElementsToSplit.forEach(textEl => {
        // Prevent re-splitting if already done
        if (textEl.dataset.textSplitDone === 'true') {
            return;
        }

        const originalText = textEl.textContent || "";
        textEl.innerHTML = ''; // Clear existing content to make way for char spans

        let charDelay = 0;
        originalText.split('').forEach((char) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.innerHTML = char === ' ' ? ' ' : char; // Use non-breaking space for spaces
            
            // Set inline style for animation-delay.
            // The actual animation will be triggered by CSS when the parent (.animate-text)
            // gets the '.active' class.
            span.style.animationDelay = `${charDelay.toFixed(2)}s`;
            
            textEl.appendChild(span);
            charDelay += 0.03; // Adjust stagger timing (0.03s per character)
        });
        textEl.dataset.textSplitDone = 'true'; // Mark as processed
    });
}

/**
 * Initializes Intersection Observer to add 'active' class to elements
 * when they scroll into view, triggering CSS animations.
 */
function initScrollReveal() {
    const animatedElements = document.querySelectorAll(
        '.reveal, .animate-from-bottom, .animate-from-left, .animate-from-right, .animate-fade-in, .animate-scale, .animate-text'
    );

    if (animatedElements.length === 0) {
        // console.info("No elements found for scroll-reveal animations.");
        return;
    }

    const observerOptions = {
        root: null, // Observes intersections relative to the viewport
        rootMargin: '0px 0px -10% 0px', // Triggers when element is 10% from the bottom edge of the viewport
        threshold: 0.1   // Trigger when at least 10% of the element is visible
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate only once
            }
            // To make animations re-trigger every time an element scrolls in/out:
            // else {
            //     entry.target.classList.remove('active');
            // }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        // Add a base class for initial hidden state (if not already handled by individual animation classes)
        // element.classList.add('animation-init-state'); 
        animationObserver.observe(element);
    });
}

// Wait for the DOM to be fully loaded before initializing animations
document.addEventListener('DOMContentLoaded', () => {
    splitCharsForAnimation();    // Prepare text elements for character animation first
    initScrollReveal();          // Then, set up the scroll reveal observers
});