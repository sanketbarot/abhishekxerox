// ========================================
// HOME PAGE JS - script.js
// Abhishek Xerox - Vejalpur, Ahmedabad
// Performance Optimized v2.0
// ========================================

(function () {
    'use strict';

    // =========================================
    // UTILITY - CREATE INTERSECTION OBSERVER
    // =========================================
    function createObserver(callback, options) {
        var defaultOptions = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -40px 0px'
        };

        if (!('IntersectionObserver' in window)) {
            // Fallback for old browsers
            return {
                observe: function (el) { callback([{ target: el, isIntersecting: true }]); },
                unobserve: function () {}
            };
        }

        return new IntersectionObserver(callback, defaultOptions);
    }

    // =========================================
    // ANIMATE ELEMENTS IN
    // =========================================
    function animateIn(elements, options) {
        var stagger = (options && options.stagger) || 0;
        var direction = (options && options.direction) || 'up';
        var delay = (options && options.delay) || 0;

        var transforms = {
            up: 'translateY(35px)',
            down: 'translateY(-35px)',
            left: 'translateX(-45px)',
            right: 'translateX(45px)',
            scale: 'scale(0.85)'
        };

        elements.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = transforms[direction] || transforms.up;
            el.style.transition =
                'opacity 0.55s ease, transform 0.55s ease';
            el.style.willChange = 'opacity, transform';
        });

        var observer = createObserver(function (entries) {
            entries.forEach(function (entry, idx) {
                if (entry.isIntersecting) {
                    var totalDelay = delay + (idx * stagger);
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                        // Clean up will-change after animation
                        setTimeout(function () {
                            entry.target.style.willChange = 'auto';
                        }, 600);
                    }, totalDelay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: options && options.threshold || 0.1 });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // =========================================
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ===== HERO ANIMATION =====
        var heroElements = [
            { selector: '.hero-badge', delay: 150 },
            { selector: '.hero-content h1', delay: 300 },
            { selector: '.hero-content > p', delay: 450 },
            { selector: '.hero-buttons', delay: 600 },
            { selector: '.hero-info', delay: 750 }
        ];

        heroElements.forEach(function (item) {
            var el = document.querySelector(item.selector);
            if (!el) return;
            el.style.opacity = '0';
            el.style.transform = 'translateY(22px)';
            el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
            setTimeout(function () {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, item.delay);
        });

        // ===== SCROLL DOWN BUTTON =====
        var scrollDownBtn = document.getElementById('scrollDownBtn');
        if (scrollDownBtn) {
            scrollDownBtn.addEventListener('click', function () {
                var target = document.querySelector('.marquee-section') ||
                    document.querySelector('#services') ||
                    document.querySelector('.services-section');
                if (target) {
                    var navbar = document.querySelector('.navbar');
                    var offset = navbar ? navbar.offsetHeight : 65;
                    var top = target.getBoundingClientRect().top +
                        window.scrollY - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        }

        // ===== SERVICE CARDS ANIMATION =====
        var serviceCards = document.querySelectorAll('.service-card');
        if (serviceCards.length) {
            animateIn(Array.from(serviceCards), {
                direction: 'up',
                stagger: 90,
                threshold: 0.08
            });

            // Click to navigate
            serviceCards.forEach(function (card) {
                card.addEventListener('click', function (e) {
                    if (e.target.tagName === 'A') return;
                    var link = this.querySelector('.card-link');
                    if (link) {
                        window.location.href = link.getAttribute('href');
                    }
                });
            });
        }

        // ===== WHY CARDS ANIMATION =====
        var whyCards = document.querySelectorAll('.why-card');
        if (whyCards.length) {
            animateIn(Array.from(whyCards), {
                direction: 'up',
                stagger: 120,
                threshold: 0.1
            });

            // Click to about page
            whyCards.forEach(function (card) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', function () {
                    window.location.href = 'about.html';
                });
            });
        }

        // ===== COUNTER ANIMATION =====
        var counters = document.querySelectorAll('.counter');
        if (counters.length) {
            var counterObserver = createObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            animateCounter(entry.target);
                            counterObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.6 }
            );
            counters.forEach(function (c) {
                counterObserver.observe(c);
            });
        }

        // ===== STAT ITEMS ANIMATION =====
        var statItems = document.querySelectorAll('.stat-item');
        if (statItems.length) {
            animateIn(Array.from(statItems), {
                direction: 'up',
                stagger: 90,
                threshold: 0.3
            });
        }

        // ===== ABOUT PREVIEW ANIMATION =====
        var aboutImg = document.querySelector('.about-preview-img');
        var aboutContent = document.querySelector('.about-preview-content');

        if (aboutImg) {
            aboutImg.style.opacity = '0';
            aboutImg.style.transform = 'translateX(-45px)';
            aboutImg.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            aboutImg.style.willChange = 'opacity, transform';
        }

        if (aboutContent) {
            aboutContent.style.opacity = '0';
            aboutContent.style.transform = 'translateX(45px)';
            aboutContent.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            aboutContent.style.willChange = 'opacity, transform';
        }

        if (aboutImg) {
            var aboutObs = createObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        if (aboutImg) {
                            aboutImg.style.opacity = '1';
                            aboutImg.style.transform = 'translateX(0)';
                            setTimeout(function () {
                                aboutImg.style.willChange = 'auto';
                            }, 750);
                        }
                        if (aboutContent) {
                            aboutContent.style.opacity = '1';
                            aboutContent.style.transform = 'translateX(0)';
                            setTimeout(function () {
                                aboutContent.style.willChange = 'auto';
                            }, 750);
                        }
                        aboutObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.18 });

            aboutObs.observe(aboutImg);
        }

        // ===== ABOUT LIST ANIMATION =====
        var aboutListItems = document.querySelectorAll('.about-list li');
        if (aboutListItems.length) {
            animateIn(Array.from(aboutListItems), {
                direction: 'left',
                stagger: 70,
                threshold: 0.1
            });
        }

        // ===== TESTIMONIAL CARDS ANIMATION =====
        var testimonialCards = document.querySelectorAll(
            '.testimonial-card'
        );
        if (testimonialCards.length) {
            animateIn(Array.from(testimonialCards), {
                direction: 'up',
                stagger: 130,
                threshold: 0.1
            });
        }

        // ===== WHATSAPP SECTION ANIMATION =====
        var waSection = document.querySelector('.whatsapp-section');
        if (waSection) {
            waSection.style.opacity = '0';
            waSection.style.transform = 'translateY(28px)';
            waSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            var waObs = createObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        waObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            waObs.observe(waSection);
        }

        // ===== HERO INFO LINK =====
        // Make phone number in hero info clickable
        var heroInfoLinks = document.querySelectorAll(
            '.hero-info-item a'
        );
        heroInfoLinks.forEach(function (link) {
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';
        });

        // =========================================
        // LOG
        // =========================================
        console.log(
            '%c✅ Home Page Ready - Abhishek Xerox!',
            'color: #FFD700; background: #1a1a1a; ' +
            'padding: 5px 10px; border-radius: 4px; ' +
            'font-weight: bold;'
        );

    }); // END DOMContentLoaded

    // =========================================
    // COUNTER ANIMATION FUNCTION
    // =========================================
    function animateCounter(element) {
        var target = parseInt(element.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        var parent = element.closest('.stat-item');
        var label = parent && parent.querySelector('p') ?
            parent.querySelector('p').textContent : '';
        var isPercent = label.includes('%');

        var start = 0;
        var duration = 1800;
        var startTime = null;

        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = easeOut(progress);
            var current = Math.round(eased * target);

            if (isPercent) {
                element.textContent = current + '%';
            } else {
                element.textContent = current.toLocaleString('en-IN') + '+';
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Final value
                element.textContent = isPercent ?
                    target + '%' :
                    target.toLocaleString('en-IN') + '+';
            }
        }

        requestAnimationFrame(step);
    }

    // =========================================
    // EXPOSE GLOBALLY IF NEEDED
    // =========================================
    window.animateCounter = animateCounter;

})(); // IIFE END