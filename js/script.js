// ========================================
// HOME PAGE JS - script.js
// Abhishek Xerox - Liquid Glass Only
// ========================================

(function () {
    'use strict';

    // =========================================
    // UTILITY - INTERSECTION OBSERVER
    // =========================================
    function createObserver(callback, options) {
        var opts = {
            threshold:  options.threshold  || 0.1,
            rootMargin: options.rootMargin || '0px 0px -40px 0px'
        };

        if (!('IntersectionObserver' in window)) {
            return {
                observe: function (el) {
                    callback([{
                        target: el,
                        isIntersecting: true
                    }]);
                },
                unobserve: function () {}
            };
        }

        return new IntersectionObserver(callback, opts);
    }

    // =========================================
    // ANIMATE ELEMENTS IN - Stagger
    // =========================================
    function animateIn(elements, options) {
        var stagger   = (options && options.stagger)   || 0;
        var direction = (options && options.direction) || 'up';
        var delay     = (options && options.delay)     || 0;

        var transforms = {
            up:    'translateY(35px)',
            down:  'translateY(-35px)',
            left:  'translateX(-45px)',
            right: 'translateX(45px)',
            scale: 'scale(0.85)'
        };

        elements.forEach(function (el) {
            el.style.opacity   = '0';
            el.style.transform = transforms[direction] || transforms.up;
            el.style.transition =
                'opacity 0.60s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.60s cubic-bezier(0.4,0,0.2,1)';
            el.style.willChange = 'opacity, transform';
        });

        var observer = createObserver(
            function (entries) {
                entries.forEach(function (entry, idx) {
                    if (!entry.isIntersecting) return;

                    var totalDelay = delay + (idx * stagger);

                    setTimeout(function () {
                        entry.target.style.opacity   = '1';
                        entry.target.style.transform = 'none';
                        setTimeout(function () {
                            entry.target.style.willChange = 'auto';
                        }, 650);
                    }, totalDelay);

                    observer.unobserve(entry.target);
                });
            },
            { threshold: options && options.threshold || 0.08 }
        );

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // =========================================
    // LIQUID SPOTLIGHT EFFECT
    // =========================================
    function initLiquidSpotlight(selector, baseBg) {
        var cards = document.querySelectorAll(selector);

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;

                card.style.background =
                    'radial-gradient(' +
                        '280px circle at ' + x + 'px ' + y + 'px,' +
                        'rgba(37, 99, 235, 0.07),' +
                        'rgba(6, 182, 212, 0.04) 28%,' +
                        'transparent 52%' +
                    '),' + (baseBg || 'rgba(255,255,255,0.55)');
            });

            card.addEventListener('mouseleave', function () {
                card.style.background = '';
            });
        });
    }

    // =========================================
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ===== HERO ELEMENTS ANIMATION =====
        var heroElements = [
            { selector: '.hero-badge',       delay: 150 },
            { selector: '.hero-content h1',  delay: 300 },
            { selector: '.hero-content > p', delay: 450 },
            { selector: '.hero-buttons',     delay: 600 },
            { selector: '.hero-info',        delay: 750 }
        ];

        heroElements.forEach(function (item) {
            var el = document.querySelector(item.selector);
            if (!el) return;

            el.style.opacity   = '0';
            el.style.transform = 'translateY(25px)';
            el.style.transition =
                'opacity 0.60s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.60s cubic-bezier(0.4,0,0.2,1)';

            setTimeout(function () {
                el.style.opacity   = '1';
                el.style.transform = 'translateY(0)';
            }, item.delay);
        });

        // ===== SCROLL DOWN BUTTON =====
        var scrollDownBtn = document.getElementById('scrollDownBtn');

        if (scrollDownBtn) {
            scrollDownBtn.addEventListener('click', function () {
                var target =
                    document.querySelector('.marquee-section') ||
                    document.querySelector('#services') ||
                    document.querySelector('.services-section');

                if (target) {
                    var navbar = document.querySelector('.navbar');
                    var offset = navbar ? navbar.offsetHeight : 65;
                    var top =
                        target.getBoundingClientRect().top +
                        window.scrollY - offset;

                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        }

        // ===== SERVICE CARDS =====
        var serviceCards = document.querySelectorAll('.service-card');

        if (serviceCards.length) {
            animateIn(Array.from(serviceCards), {
                direction: 'up',
                stagger:   90,
                threshold: 0.08
            });

            serviceCards.forEach(function (card) {
                // Click → services page
                card.addEventListener('click', function (e) {
                    if (e.target.tagName === 'A') return;
                    var link = this.querySelector('.card-link');
                    if (link) {
                        window.location.href = link.getAttribute('href');
                    }
                });

                // 3D Tilt
                card.addEventListener('mousemove', function (e) {
                    var rect = card.getBoundingClientRect();
                    var x  = e.clientX - rect.left;
                    var y  = e.clientY - rect.top;
                    var cx = rect.width  / 2;
                    var cy = rect.height / 2;
                    var rx = (y - cy) / 22;
                    var ry = (cx - x) / 22;

                    card.style.transform =
                        'perspective(1000px)' +
                        ' rotateX(' + rx + 'deg)' +
                        ' rotateY(' + ry + 'deg)' +
                        ' translateY(-12px)';
                });

                card.addEventListener('mouseleave', function () {
                    card.style.transform =
                        'perspective(1000px)' +
                        ' rotateX(0) rotateY(0) translateY(0)';
                });
            });

            // Liquid spotlight on service cards
            initLiquidSpotlight('.service-card', 'rgba(255,255,255,0.55)');
        }

        // ===== WHY CARDS =====
        var whyCards = document.querySelectorAll('.why-card');

        if (whyCards.length) {
            animateIn(Array.from(whyCards), {
                direction: 'up',
                stagger:   110,
                threshold: 0.10
            });

            whyCards.forEach(function (card) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', function () {
                    window.location.href = 'about.html';
                });
            });

            initLiquidSpotlight('.why-card', 'rgba(255,255,255,0.55)');
        }

        // ===== STAT ITEMS =====
        var statItems = document.querySelectorAll('.stat-item');

        if (statItems.length) {
            animateIn(Array.from(statItems), {
                direction: 'up',
                stagger:   90,
                threshold: 0.25
            });

            initLiquidSpotlight('.stat-item', 'rgba(255,255,255,0.62)');
        }

        // ===== COUNTER ANIMATION =====
        var counters = document.querySelectorAll('.counter');

        if (counters.length) {
            var counterObs = createObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        animateCounter(entry.target);
                        counterObs.unobserve(entry.target);
                    });
                },
                { threshold: 0.55 }
            );

            counters.forEach(function (c) {
                counterObs.observe(c);
            });
        }

        // ===== ABOUT PREVIEW - Slide In =====
        var aboutImg     = document.querySelector('.about-preview-img');
        var aboutContent = document.querySelector('.about-preview-content');

        function setStyle(el, styles) {
            if (!el) return;
            Object.assign(el.style, styles);
        }

        setStyle(aboutImg, {
            opacity:    '0',
            transform:  'translateX(-50px)',
            transition:
                'opacity 0.75s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
            willChange: 'opacity, transform'
        });

        setStyle(aboutContent, {
            opacity:    '0',
            transform:  'translateX(50px)',
            transition:
                'opacity 0.75s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
            willChange: 'opacity, transform'
        });

        if (aboutImg) {
            var aboutObs = createObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;

                        setStyle(aboutImg, {
                            opacity: '1', transform: 'translateX(0)'
                        });

                        setTimeout(function () {
                            setStyle(aboutContent, {
                                opacity: '1', transform: 'translateX(0)'
                            });
                        }, 150);

                        setTimeout(function () {
                            if (aboutImg) aboutImg.style.willChange = 'auto';
                            if (aboutContent) aboutContent.style.willChange = 'auto';
                        }, 900);

                        aboutObs.unobserve(entry.target);
                    });
                },
                { threshold: 0.15 }
            );

            aboutObs.observe(aboutImg);
        }

        // ===== ABOUT LIST =====
        var aboutListItems = document.querySelectorAll('.about-list li');

        if (aboutListItems.length) {
            animateIn(Array.from(aboutListItems), {
                direction: 'left',
                stagger:   70,
                threshold: 0.08
            });
        }

        // ===== TESTIMONIAL CARDS =====
        var testimonialCards =
            document.querySelectorAll('.testimonial-card');

        if (testimonialCards.length) {
            animateIn(Array.from(testimonialCards), {
                direction: 'up',
                stagger:   120,
                threshold: 0.08
            });

            initLiquidSpotlight(
                '.testimonial-card',
                'rgba(255,255,255,0.55)'
            );
        }

        // ===== WHATSAPP SECTION =====
        var waContent = document.querySelector('.whatsapp-content');

        if (waContent) {
            waContent.style.opacity   = '0';
            waContent.style.transform = 'translateY(30px)';
            waContent.style.transition =
                'opacity 0.65s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.65s cubic-bezier(0.4,0,0.2,1)';

            var waObs = createObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        entry.target.style.opacity   = '1';
                        entry.target.style.transform = 'translateY(0)';
                        waObs.unobserve(entry.target);
                    });
                },
                { threshold: 0.18 }
            );

            waObs.observe(waContent);
        }

        // ===== SECTION TITLES =====
        var sectionTitles = document.querySelectorAll(
            '.section-title, .section-subtitle'
        );

        if (sectionTitles.length) {
            animateIn(Array.from(sectionTitles), {
                direction: 'up',
                stagger:   80,
                threshold: 0.10
            });
        }

        // ===== HERO PARALLAX =====
        var heroContent = document.querySelector('.hero-content');
        var hero        = document.querySelector('.hero');

        if (hero && heroContent) {
            window.addEventListener('scroll', function () {
                var scrolled = window.scrollY;
                if (scrolled < window.innerHeight) {
                    heroContent.style.transform =
                        'translateY(' + (scrolled * 0.22) + 'px)';
                    heroContent.style.opacity =
                        String(1 - (scrolled / window.innerHeight) * 0.80);
                }
            }, { passive: true });
        }

        // ===== LOG =====
        console.log(
            '%c🫧 Abhishek Xerox | Liquid Glass Home Ready!',
            'color:#2563EB;background:#F8FAFC;' +
            'padding:6px 14px;border-radius:8px;' +
            'font-weight:bold;border-left:3px solid #06B6D4;'
        );

    }); // END DOMContentLoaded

    // =========================================
    // COUNTER ANIMATION
    // =========================================
    function animateCounter(element) {
        var target = parseInt(
            element.getAttribute('data-target'), 10
        );
        if (isNaN(target)) return;

        var parent    = element.closest('.stat-item');
        var label     = parent && parent.querySelector('p')
            ? parent.querySelector('p').textContent : '';
        var isPercent = label.includes('%');
        var duration  = 2000;
        var startTime = null;

        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;

            var elapsed  = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased    = easeOut(progress);
            var current  = Math.round(eased * target);

            element.textContent = isPercent
                ? current + '%'
                : current.toLocaleString('en-IN') + '+';

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = isPercent
                    ? target + '%'
                    : target.toLocaleString('en-IN') + '+';
            }
        }

        requestAnimationFrame(step);
    }

    window.animateCounter = animateCounter;

})(); // IIFE END