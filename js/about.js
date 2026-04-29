// ========================================
// ABOUT PAGE JS - about.js
// Abhishek Xerox - Liquid Glass Only
// ========================================

(function () {
    'use strict';

    // =========================================
    // UTILITY - INTERSECTION OBSERVER
    // =========================================
    function createObs(callback, options) {
        var opts = {
            threshold:  (options && options.threshold)  || 0.1,
            rootMargin: (options && options.rootMargin) ||
                        '0px 0px -30px 0px'
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
    // ANIMATE BATCH - Stagger + Direction
    // =========================================
    function animateBatch(elements, options) {
        if (!elements || !elements.length) return;

        var direction = (options && options.direction) || 'up';
        var stagger   = (options && options.stagger)   || 0;
        var delay     = (options && options.delay)      || 0;
        var threshold = (options && options.threshold)  || 0.1;

        var initTransforms = {
            up:    'translateY(32px)',
            down:  'translateY(-32px)',
            left:  'translateX(-42px)',
            right: 'translateX(42px)',
            scale: 'scale(0.85)'
        };

        var t = initTransforms[direction] || initTransforms.up;

        elements.forEach(function (el) {
            el.style.opacity    = '0';
            el.style.transform  = t;
            el.style.transition =
                'opacity 0.60s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.60s cubic-bezier(0.4,0,0.2,1)';
            el.style.willChange = 'opacity, transform';
        });

        var obs = createObs(function (entries) {
            entries.forEach(function (entry, idx) {
                if (!entry.isIntersecting) return;

                setTimeout(function () {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'none';
                    setTimeout(function () {
                        entry.target.style.willChange = 'auto';
                    }, 650);
                }, delay + idx * stagger);

                obs.unobserve(entry.target);
            });
        }, { threshold: threshold });

        elements.forEach(function (el) { obs.observe(el); });
    }

    // =========================================
    // SLIDE IN PAIR - Left/Right
    // =========================================
    function slideInPair(leftEl, rightEl, threshold) {
        var th = threshold || 0.15;

        function applyStyle(el, tx) {
            if (!el) return;
            el.style.opacity    = '0';
            el.style.transform  = tx;
            el.style.transition =
                'opacity 0.70s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.70s cubic-bezier(0.4,0,0.2,1)';
            el.style.willChange = 'opacity, transform';
        }

        applyStyle(leftEl,  'translateX(-50px)');
        applyStyle(rightEl, 'translateX(50px)');

        if (!leftEl && !rightEl) return;
        var target = leftEl || rightEl;

        var obs = createObs(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                function reveal(el, delay) {
                    if (!el) return;
                    setTimeout(function () {
                        el.style.opacity   = '1';
                        el.style.transform = 'none';
                        setTimeout(function () {
                            el.style.willChange = 'auto';
                        }, 750);
                    }, delay);
                }

                reveal(leftEl,  0);
                reveal(rightEl, 120);

                obs.unobserve(entry.target);
            });
        }, { threshold: th });

        obs.observe(target);
    }

    // =========================================
    // LIQUID SPOTLIGHT
    // =========================================
    function initLiquidSpotlight(selector, baseBg) {
        var cards = document.querySelectorAll(selector);
        var bg    = baseBg || 'rgba(255,255,255,0.55)';

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;

                card.style.background =
                    'radial-gradient(' +
                        '270px circle at ' + x + 'px ' + y + 'px,' +
                        'rgba(37, 99, 235, 0.07),' +
                        'rgba(6, 182, 212, 0.04) 30%,' +
                        'transparent 52%' +
                    '),' + bg;
            });

            card.addEventListener('mouseleave', function () {
                card.style.background = '';
            });
        });
    }

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

        function step(ts) {
            if (!startTime) startTime = ts;
            var elapsed  = ts - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var current  =
                Math.round(easeOut(progress) * target);

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

    // =========================================
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ===== PAGE BANNER =====
        var banner = document.querySelector('.page-banner');
        if (banner) {
            banner.style.opacity    = '0';
            banner.style.transform  = 'translateY(-18px)';
            banner.style.transition =
                'opacity 0.55s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.55s cubic-bezier(0.4,0,0.2,1)';

            setTimeout(function () {
                banner.style.opacity   = '1';
                banner.style.transform = 'translateY(0)';
            }, 80);
        }

        // ===== PRO INTRO =====
        slideInPair(
            document.querySelector('.pro-intro-content'),
            document.querySelector('.pro-intro-features'),
            0.15
        );

        animateBatch(
            Array.from(document.querySelectorAll('.pro-feature')),
            { direction: 'right', stagger: 85, threshold: 0.08 }
        );

        // ===== WELCOME SECTION =====
        slideInPair(
            document.querySelector('.welcome-content'),
            document.querySelector('.welcome-img'),
            0.15
        );

        animateBatch(
            Array.from(document.querySelectorAll('.welcome-feat')),
            { direction: 'left', stagger: 80, threshold: 0.08 }
        );

        // ===== WHO WE ARE =====
        slideInPair(
            document.querySelector('.who-img'),
            document.querySelector('.who-content'),
            0.15
        );

        animateBatch(
            Array.from(document.querySelectorAll('.highlight-item')),
            { direction: 'left', stagger: 85, threshold: 0.08 }
        );

        // ===== SHOP INFO =====
        animateBatch(
            Array.from(document.querySelectorAll('.shop-info-item')),
            { direction: 'up', stagger: 85, threshold: 0.08 }
        );

        initLiquidSpotlight(
            '.shop-info-item',
            'rgba(255,255,255,0.55)'
        );

        // ===== COUNTERS =====
        var counters = document.querySelectorAll('.counter');
        if (counters.length) {
            var cntObs = createObs(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    animateCounter(entry.target);
                    cntObs.unobserve(entry.target);
                });
            }, { threshold: 0.55 });

            counters.forEach(function (c) {
                cntObs.observe(c);
            });
        }

        // ===== STAT ITEMS =====
        animateBatch(
            Array.from(document.querySelectorAll('.stat-item')),
            { direction: 'up', stagger: 85, threshold: 0.25 }
        );

        initLiquidSpotlight(
            '.stat-item',
            'rgba(255,255,255,0.60)'
        );

        // ===== MV CARDS =====
        animateBatch(
            Array.from(document.querySelectorAll('.mv-card')),
            { direction: 'up', stagger: 120, threshold: 0.08 }
        );

        initLiquidSpotlight(
            '.mv-card',
            'rgba(255,255,255,0.55)'
        );

        // ===== OFFER ITEMS =====
        var offerItems = document.querySelectorAll('.offer-item');

        animateBatch(
            Array.from(offerItems),
            { direction: 'scale', stagger: 45, threshold: 0.06 }
        );

        offerItems.forEach(function (item) {
            item.addEventListener('click', function () {
                window.location.href = 'services.html';
            });

            item.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = 'services.html';
                }
            });
        });

        // ===== TEAM CARDS =====
        animateBatch(
            Array.from(document.querySelectorAll('.team-card')),
            { direction: 'up', stagger: 120, threshold: 0.08 }
        );

        initLiquidSpotlight(
            '.team-card',
            'rgba(255,255,255,0.55)'
        );

        // ===== TESTIMONIALS =====
        animateBatch(
            Array.from(document.querySelectorAll('.testimonial-card')),
            { direction: 'up', stagger: 120, threshold: 0.08 }
        );

        initLiquidSpotlight(
            '.testimonial-card',
            'rgba(255,255,255,0.55)'
        );

        // ===== WHY LIST =====
        animateBatch(
            Array.from(document.querySelectorAll('.why-list-item')),
            { direction: 'left', stagger: 85, threshold: 0.08 }
        );

        initLiquidSpotlight(
            '.why-list-item',
            'rgba(255,255,255,0.55)'
        );

        // ===== SECTION TITLES =====
        animateBatch(
            Array.from(document.querySelectorAll(
                '.section-title, .section-subtitle,' +
                '.customer-love-header h2,' +
                '.customer-love-header p'
            )),
            { direction: 'up', stagger: 70, threshold: 0.08 }
        );

        // ===== PLAY BUTTON =====
        var playBtn = document.getElementById('playBtn');
        if (playBtn) {
            playBtn.addEventListener('click', function () {
                if (window.showMessage) {
                    window.showMessage(
                        '📹 Video coming soon! ' +
                        'Visit our shop at Vejalpur, Ahmedabad.',
                        'info'
                    );
                } else {
                    alert(
                        '📹 Video coming soon! ' +
                        'Visit our shop at Vejalpur, Ahmedabad.'
                    );
                }
            });
        }

        // ===== LOG =====
        console.log(
            '%c🫧 About Page | Liquid Glass Ready!',
            'color:#2563EB;background:#F8FAFC;' +
            'padding:6px 14px;border-radius:8px;' +
            'font-weight:bold;border-left:3px solid #06B6D4;'
        );

    }); // END DOMContentLoaded

})(); // IIFE END