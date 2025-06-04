// CLIENTS PAGE - PREMIUM INTERACTIVITY

document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Initialize page components
    initClientPage();
});

// Sample client data - Replace with your actual data
const clientsData = [
    {
        id: 1,
        name: "Tech Solutions LLC",
        industry: "technology",
        logo: "../assets/images/clients/tech-solutions.png",
        description: "Leading IT infrastructure provider"
    },
    {
        id: 2,
        name: "Auto Dynamics",
        industry: "automotive",
        logo: "../assets/images/clients/auto-dynamics.png",
        description: "Premium automobile distributor"
    },
    {
        id: 3,
        name: "Global Finance Corp",
        industry: "finance",
        logo: "../assets/images/clients/global-finance.png",
        description: "International financial services"
    },
    {
        id: 4,
        name: "Retail Masters",
        industry: "retail",
        logo: "../assets/images/clients/retail-masters.png",
        description: "Multi-brand retail chain"
    }
];

const testimonialsData = [
    {
        id: 1,
        text: "Micorp Trading has been instrumental in our growth. Their reliable service and quality products have helped us maintain our market leadership.",
        name: "John Smith",
        position: "IT Director, Tech Solutions LLC",
        photo: "../assets/images/testimonials/person1.jpg"
    },
    // Add more testimonials...
];

function initClientPage() {
    loadClientData();
    initClientFilter();
    initTestimonialSlider();
    initAnimations();
}

function loadClientData() {
    const clientsGrid = document.querySelector('.clients-grid');
    if (!clientsGrid) return;

    clientsGrid.innerHTML = clientsData.map(client => `
        <div class="client-card" data-industry="${client.industry}">
            <div class="client-logo-container">
                <img src="${client.logo}" alt="${client.name}" class="client-logo">
            </div>
            <div class="client-info">
                <h3>${client.name}</h3>
                <p>${client.description}</p>
            </div>
        </div>
    `).join('');
}

function initClientFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clientCards = document.querySelectorAll('.client-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards with animation
            clientCards.forEach(card => {
                if (filter === 'all' || card.dataset.industry === filter) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        display: 'block'
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.4,
                        display: 'none'
                    });
                }
            });
        });
    });
}

function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;

    // Populate testimonials
    track.innerHTML = testimonialsData.map(testimonial => `
        <div class="testimonial-slide">
            <div class="testimonial-content">
                <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="client-details">
                    <img src="${testimonial.photo}" alt="${testimonial.name}" class="client-photo">
                    <div>
                        <h4>${testimonial.name}</h4>
                        <p class="client-position">${testimonial.position}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Initialize slider controls
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dots = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create dots
    dots.innerHTML = testimonialsData.map((_, i) => 
        `<button class="dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></button>`
    ).join('');

    // Slider navigation
    function goToSlide(index) {
        gsap.to(track, {
            x: `-${index * 100}%`,
            duration: 0.6,
            ease: 'power2.out'
        });
        currentSlide = index;
        updateDots();
    }

    prevBtn?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialsData.length) % testimonialsData.length;
        goToSlide(currentSlide);
    });

    nextBtn?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialsData.length;
        goToSlide(currentSlide);
    });

    dots.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            goToSlide(parseInt(e.target.dataset.slide));
        }
    });

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
}

function initAnimations() {
    // Hero animations
    gsap.to('.hero-title .char', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power2.out'
    });

    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5
    });

    // Scroll animations
    gsap.utils.toArray('[data-animate]').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            duration: 0.8
        });
    });
}

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6
            });
        });
        
        // Add hover effects for interactive elements
        const hoverElements = document.querySelectorAll('a, button, .client-card, .case-study-card, .filter-btn');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 0.5,
                    backgroundColor: 'white',
                    duration: 0.3
                });
                gsap.to(follower, {
                    scale: 1.2,
                    borderColor: 'white',
                    duration: 0.3
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: '#2a5bd7',
                    duration: 0.3
                });
                gsap.to(follower, {
                    scale: 1,
                    borderColor: '#2a5bd7',
                    duration: 0.3
                });
            });
        });
    } else {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }
}

function initPageAnimations() {
    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const scrollHint = document.querySelector('.scroll-hint');
    
    // Split text for advanced animation
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = document.createElement('span');
            char.className = 'char';
            char.textContent = text[i] === ' ' ? '&nbsp;' : text[i];
            heroTitle.appendChild(char);
        }
        
        const chars = gsap.utils.toArray('.char');
        
        gsap.from(chars, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.03,
            delay: 0.3
        });
    }
    
    gsap.to(heroSubtitle, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
    });
    
    gsap.to(scrollHint, {
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 1.5
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
            duration: 1,
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
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
    });
    
    // Client card animations
    gsap.utils.toArray('.client-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Case study animations
    gsap.utils.toArray('.case-study-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
}

function initCaseStudies() {
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    
    caseStudyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.case-study-overlay'), {
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.case-study-overlay'), {
                y: '100%',
                duration: 0.4,
                ease: 'power3.in'
            });
        });
    });
}

function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-button');
    
    magneticButtons.forEach(button => {
        const btnText = button.querySelector('.btn-text');
        const btnIcon = button.querySelector('.btn-icon');
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distanceX = x - centerX;
            const distanceY = y - centerY;
            
            gsap.to(button, {
                x: distanceX * 0.2,
                y: distanceY * 0.2,
                duration: 0.5,
                ease: 'power3.out'
            });
            
            gsap.to(btnText, {
                x: distanceX * 0.4,
                y: distanceY * 0.4,
                duration: 0.5,
                ease: 'power3.out'
            });
            
            gsap.to(btnIcon, {
                x: distanceX * 0.6,
                y: distanceY * 0.6,
                duration: 0.5,
                ease: 'power3.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to([button, btnText, btnIcon], {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

function initHeroAnimations() {
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const scroll = document.querySelector('.scroll-hint');

    if (title) {
        // Split text into characters for animation
        const chars = title.textContent.split('');
        title.textContent = '';
        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char;
            span.style.animationDelay = `${i * 0.05}s`;
            title.appendChild(span);
        });
    }

    if (subtitle) {
        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 500);
    }

    if (scroll) {
        setTimeout(() => {
            scroll.style.opacity = '1';
        }, 1000);
    }
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
}

function initFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.client-card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            cards.forEach(card => {
                if (filter === 'all' || card.dataset.industry === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 600);
                }
            });
        });
    });
}