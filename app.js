// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach((el) => {
    observer.observe(el);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if(menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Navbar blur effect on scroll
const navbar = document.querySelector('.navbar');
if(navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Flyers Carousel Logic
const flyersGrid = document.getElementById('flyersGrid');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if(flyersGrid && prevBtn && nextBtn) {
    const updateArrows = () => {
        if (flyersGrid.scrollLeft <= 5) {
            prevBtn.style.opacity = '0';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
        
        if (flyersGrid.scrollLeft + flyersGrid.clientWidth >= flyersGrid.scrollWidth - 5) {
            nextBtn.style.opacity = '0';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    };
    
    flyersGrid.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    // Delay initial check slightly to ensure layout is computed
    setTimeout(updateArrows, 100);

    prevBtn.addEventListener('click', () => {
        flyersGrid.scrollBy({ left: -250, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        flyersGrid.scrollBy({ left: 250, behavior: 'smooth' });
    });
}

// YouTube Facade Logic
document.querySelectorAll('.yt-facade').forEach(el => {
    el.addEventListener('click', () => {
        const id = el.dataset.videoId;
        el.innerHTML = `<iframe loading='lazy' width='100%' height='250' src='https://www.youtube.com/embed/${id}?autoplay=1&mute=1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe>`;
    });
});

// Form Submission Feedback
const forms = document.querySelectorAll('form');
forms.forEach(f => {
    f.addEventListener('submit', () => {
        const btn = f.querySelector('button[type="submit"]');
        if(btn) {
            btn.innerHTML = 'SENDING...';
            btn.style.opacity = '0.7';
        }
    });
});

/* ============================================
   MICRO-INTERACTIONS JS
   ============================================ */

// 1. Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = `${(scrollTop / scrollHeight) * 100}%`;
    }, { passive: true });
}

// 2. Custom Cursor Glow (desktop only)
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top  = e.clientY + 'px';
    }, { passive: true });
} else if (cursorGlow) {
    cursorGlow.style.display = 'none';
}

// 3. Glitch effect on section titles when they enter viewport
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('glitch-ready');
            setTimeout(() => el.classList.add('glitch-active'), 100);
            setTimeout(() => el.classList.remove('glitch-active'), 700);
            titleObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title[data-text]').forEach(el => titleObserver.observe(el));

// 4. Gallery image 3D tilt on mouse move
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        const img = item.querySelector('img');
        if (img) img.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.03)`;
    });
    item.addEventListener('mouseleave', () => {
        const img = item.querySelector('img');
        if (img) img.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
});

// 5. Download button ripple effect on click
document.querySelectorAll('.btn-pro-submit').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px; height: ${size}px;
            left: ${e.clientX - rect.left - size/2}px;
            top: ${e.clientY - rect.top - size/2}px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-expand 0.5s ease-out forwards;
            pointer-events: none;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });
});

// Inject ripple keyframe dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple-expand { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(rippleStyle);
