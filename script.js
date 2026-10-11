/* ==========================================
   Roots of Touch — Scripts
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation scroll effect ---
    const nav = document.getElementById('nav');

    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // --- Active navigation link ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinksEl = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinksEl.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinksEl.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // --- Scroll animations ---
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    // Jednotlivé elementy — každý se zobrazí samostatně
    const fadeElements = document.querySelectorAll(
        '.intro-text h3, .intro-text p, .services-header, .about-image, .about-header, .about-text, .booking-header, .booking-form, .booking-contact, .massage-comparison, .massage-comparison-title, .massage-comparison-intro, .why-me h2, .why-me p, .expectations-col, .section-label'
    );
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Stagger — skupiny se zobrazují postupně za sebou
    const staggerGroups = [
        '.intro-card',
        '.service-step',
        '.service-for-whom-grid > div',
        '.massage-comparison-row .massage-comparison-item',
        '.review-card',
        '.expectations-col',
        '.booking-contact > *',
    ];

    staggerGroups.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${i * 0.18}s`;
            observer.observe(el);
        });
    });

    // --- Booking form: set min date to today ---
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // --- Hero video autoplay ---
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.muted = true;

        let isPlaying = false;

        const play = () => {
            if (isPlaying) return;
            heroVideo.play().then(() => {
                isPlaying = true;
            }).catch(() => {});
        };

        // Zkus hned (funguje pokud Safari povolí)
        play();
        heroVideo.addEventListener('canplay', play, { once: true });

        // Záloha: spusť na první scroll nebo klik (Safari to vždy povolí)
        const onInteraction = () => {
            play();
            window.removeEventListener('scroll', onInteraction);
            window.removeEventListener('click', onInteraction);
            window.removeEventListener('touchstart', onInteraction);
        };
        window.addEventListener('scroll', onInteraction, { passive: true });
        window.addEventListener('click', onInteraction);
        window.addEventListener('touchstart', onInteraction, { passive: true });
    }

    // --- Service tabs ---
    const serviceTabs = document.querySelectorAll('.service-tab');
    const servicePanels = document.querySelectorAll('.service-panel');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            serviceTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            servicePanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.dataset.panel === target) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
