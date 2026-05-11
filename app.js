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
