// ========================================
// MAIN.JS - Landing Page Scripts
// ========================================

// Particles Background
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 20) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = (0.1 + Math.random() * 0.3);

        const colors = ['#ff6b35', '#ffd700', '#00d4ff', '#a855f7', '#00ff88'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when link clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked if wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Countdown Timer
function initCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!hoursEl || !minutesEl || !secondsEl) return;

    // Set random initial time that resets
    let totalSeconds = Math.floor(Math.random() * 7200) + 3600; // 1-3 hours

    function updateCountdown() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            totalSeconds = 10800; // Reset to 3 hours
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Live Orders Ticker
function initLiveOrdersTicker() {
    const ticker = document.getElementById('ordersTicker');
    if (!ticker) return;

    const names = [
        'Rahul', 'Priya', 'Amit', 'Sneha', 'Vijay', 'Anjali', 'Rohit',
        'Pooja', 'Suresh', 'Kavita', 'Arun', 'Deepa', 'Manoj', 'Ritu',
        'Sanjay', 'Nisha', 'Gaurav', 'Swati', 'Vishal', 'Anita',
        'Akash', 'Meena', 'Rajesh', 'Sunita', 'Harsh', 'Divya'
    ];

    const packages = ['100', '310', '520', '1060', '2180', '5600'];
    const times = ['just now', '1 min ago', '2 min ago', '3 min ago', '5 min ago',
        '8 min ago', '10 min ago', '15 min ago', '20 min ago', '30 min ago'];

    // Generate initial items
    for (let i = 0; i < 15; i++) {
        const item = document.createElement('div');
        item.className = 'ticker-item';
        const name = names[Math.floor(Math.random() * names.length)];
        const pack = packages[Math.floor(Math.random() * packages.length)];
        const time = times[Math.floor(Math.random() * times.length)];
        item.innerHTML = `
            <span class="tick-check"><i class="fas fa-check-circle"></i></span>
            <span>${name} bought <span class="tick-diamond">💎${pack}</span></span>
            <span style="opacity:0.5; font-size:11px">${time}</span>
        `;
        ticker.appendChild(item);
    }

    // Auto scroll
    let scrollAmount = 0;
    setInterval(() => {
        scrollAmount += 1;
        if (scrollAmount >= ticker.scrollWidth - ticker.clientWidth) {
            scrollAmount = 0;
        }
        ticker.scrollLeft = scrollAmount;
    }, 30);
}

// Smooth Scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Animate on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.package-card, .step-card, .review-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initMobileMenu();
    initCountdown();
    initLiveOrdersTicker();
    initSmoothScroll();
    initNavbarScroll();
    initScrollAnimations();
});
