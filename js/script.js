// ========================================
// HOME PAGE JS - script.js
// Abhishek Xerox - Vejalpur, Ahmedabad
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ===== HERO ANIMATION =====
    const heroElements = [
        { el: document.querySelector('.hero-badge'), delay: 200 },
        { el: document.querySelector('.hero-content h1'), delay: 400 },
        { el: document.querySelector('.hero-content > p'), delay: 600 },
        { el: document.querySelector('.hero-buttons'), delay: 800 },
        { el: document.querySelector('.hero-info'), delay: 1000 }
    ];

    heroElements.forEach(function (item) {
        if (item.el) {
            item.el.style.opacity = '0';
            item.el.style.transform = 'translateY(25px)';
            item.el.style.transition = 'all 0.6s ease';
            setTimeout(function () {
                item.el.style.opacity = '1';
                item.el.style.transform = 'translateY(0)';
            }, item.delay);
        }
    });

    // ===== SCROLL DOWN ARROW =====
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.style.cursor = 'pointer';
        scrollDown.addEventListener('click', function () {
            const marquee = document.querySelector('.marquee-section');
            if (marquee) {
                marquee.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    // ===== SERVICE CARDS ANIMATION =====
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const cardObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    serviceCards.forEach(function (card) {
        cardObserver.observe(card);
    });

    // ===== SERVICE CARD CLICK =====
    serviceCards.forEach(function (card) {
        card.addEventListener('click', function () {
            const link = this.querySelector('.card-link');
            if (link) {
                window.location.href = link.getAttribute('href');
            }
        });
    });

    // ===== WHY CARDS ANIMATION =====
    const whyCards = document.querySelectorAll('.why-card');
    whyCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.cursor = 'pointer';
    });

    const whyObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    whyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    whyCards.forEach(function (card) {
        whyObserver.observe(card);
        card.addEventListener('click', function () {
            window.location.href = 'about.html';
        });
    });

    // ===== STAT ITEMS ANIMATION =====
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const statObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

    statItems.forEach(function (item) {
        statObserver.observe(item);
    });

    // ===== ABOUT PREVIEW ANIMATION =====
    const aboutImg = document.querySelector('.about-preview-img');
    const aboutContent = document.querySelector('.about-preview-content');

    if (aboutImg) {
        aboutImg.style.opacity = '0';
        aboutImg.style.transform = 'translateX(-50px)';
        aboutImg.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    }

    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateX(50px)';
        aboutContent.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    }

    const aboutObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    if (aboutImg) {
                        aboutImg.style.opacity = '1';
                        aboutImg.style.transform = 'translateX(0)';
                    }
                    if (aboutContent) {
                        aboutContent.style.opacity = '1';
                        aboutContent.style.transform = 'translateX(0)';
                    }
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

    if (aboutImg) aboutObserver.observe(aboutImg);

    // ===== ABOUT LIST ANIMATION =====
    const aboutListItems = document.querySelectorAll('.about-list li');
    aboutListItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.4s ease';
    });

    const listObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 80);
                    listObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    aboutListItems.forEach(function (item) {
        listObserver.observe(item);
    });

    // ===== TESTIMONIALS ANIMATION =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const testimonialObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    testimonialObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    testimonialCards.forEach(function (card) {
        testimonialObserver.observe(card);
    });

    // ===== WHATSAPP SECTION ANIMATION =====
    const whatsappSection = document.querySelector('.whatsapp-section');
    if (whatsappSection) {
        whatsappSection.style.opacity = '0';
        whatsappSection.style.transform = 'translateY(30px)';
        whatsappSection.style.transition = 'all 0.6s ease';

        const waObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        waObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

        waObserver.observe(whatsappSection);
    }

    console.log('✅ Home Page Loaded - Abhishek Xerox Vejalpur!');
});

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const parent = element.closest('.stat-item');
    const label = parent ?
        parent.querySelector('p').textContent : '';
    let count = 0;
    const duration = 2000;
    const steps = 60;
    const increment = Math.ceil(target / steps);

    const timer = setInterval(function () {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(timer);
        }
        if (label.includes('%')) {
            element.textContent = count + '%';
        } else {
            element.textContent = count.toLocaleString() + '+';
        }
    }, duration / steps);
}