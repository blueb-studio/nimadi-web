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
    // --- Form AJAX Submissions (FormSubmit) ---
    const setupFormSubmit = (formId, messageId) => {
        const form = document.getElementById(formId);
        const messageDiv = document.getElementById(messageId);

        if (form && messageDiv) {
            form.addEventListener('submit', function (e) {
                e.preventDefault(); // Prevent default redirection

                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;

                const formData = new FormData(form);

                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok || response.status === 200) {
                            messageDiv.style.display = 'block';
                            messageDiv.style.color = '#0c4028';
                            messageDiv.textContent = 'Your Message is Submitted.';
                            form.reset(); // Clear form fields
                        } else {
                            messageDiv.style.display = 'block';
                            messageDiv.style.color = '#dc3545';
                            messageDiv.textContent = 'Oops! There was a problem submitting your form.';
                        }
                    })
                    .catch(error => {
                        messageDiv.style.display = 'block';
                        messageDiv.style.color = '#dc3545';
                        messageDiv.textContent = 'Oops! There was a problem submitting your form.';
                    })
                    .finally(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;

                        // Hide the message after 5 seconds
                        setTimeout(() => {
                            messageDiv.style.display = 'none';
                        }, 5000);
                    });
            });
        }
    };

    setupFormSubmit('contactForm', 'contactFormMessage');
    setupFormSubmit('subscribeForm', 'subscribeFormMessage');
});
