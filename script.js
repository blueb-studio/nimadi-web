/* ============================================
   NIMADI FARMS — Homepage JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Header scroll effect ---
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Stick to top once announcement bar is scrolled past
        const announcementHeight = document.querySelector('.announcement-bar')?.offsetHeight || 36;
        if (currentScroll > announcementHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // --- Mobile hamburger menu ---
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('open');
            document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked
        mainNav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mainNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Category active state ---
    const categories = document.querySelectorAll('.category');
    categories.forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.preventDefault();
            categories.forEach(c => c.classList.remove('category--active'));
            cat.classList.add('category--active');
        });
    });

    // --- Intersection Observer for scroll animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.categories').forEach(el => {
        observer.observe(el);
    });
});
