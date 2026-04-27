// ========================================
// ABOUT PAGE JS - about.js
// Abhishek Xerox - Performance Optimized
// ========================================

(function () {
    'use strict';

    // =========================================
    // UTILITY - INTERSECTION OBSERVER
    // =========================================
    function createObs(callback, options) {
        var opts = {
            threshold: (options && options.threshold) || 0.1,
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
    // ANIMATE BATCH
    // =========================================
    function animateBatch(elements, options) {
        if (!elements || !elements.length) return;

        var direction = (options && options.direction) || 'up';
        var stagger = (options && options.stagger) || 0;
        var delay = (options && options.delay) || 0;
        var threshold = (options && options.threshold) || 0.1;

        var initTransforms = {
            up: 'translateY(32px)',
            down: 'translateY(-32px)',
            left: 'translateX(-40px)',
            right: 'translateX(40px)',
            scale: 'scale(0.85)'
        };

        var t = initTransforms[direction] || initTransforms.up;

        elements.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = t;
            el.style.transition =
                'opacity 0.52s ease, transform 0.52s ease';
            el.style.willChange = 'opacity, transform';
        });

        var obs = createObs(function (entries) {
            entries.forEach(function (entry, idx) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                        setTimeout(function () {
                            entry.target.style.willChange = 'auto';
                        }, 580);
                    }, delay + idx * stagger);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: threshold });

        elements.forEach(function (el) { obs.observe(el); });
    }

    // =========================================
    // COUNTER ANIMATION
    // =========================================
    function animateCounter(element) {
        var target = parseInt(
            element.getAttribute('data-target'), 10
        );
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

        function step(ts) {
            if (!startTime) startTime = ts;
            var elapsed = ts - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var current = Math.round(easeOut(progress) * target);

            if (isPercent) {
                element.textContent = current + '%';
            } else {
                element.textContent =
                    current.toLocaleString('en-IN') + '+';
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = isPercent ?
                    target + '%' :
                    target.toLocaleString('en-IN') + '+';
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
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(-16px)';
            banner.style.transition = 'all 0.52s ease';
            setTimeout(function () {
                banner.style.opacity = '1';
                banner.style.transform = 'translateY(0)';
            }, 80);
        }

        // ===== PRO INTRO =====
        var proContent = document.querySelector(
            '.pro-intro-content'
        );
        if (proContent) {
            proContent.style.opacity = '0';
            proContent.style.transform = 'translateX(-45px)';
            proContent.style.transition = 'all 0.65s ease';
            proContent.style.willChange = 'opacity, transform';

            var proObs = createObs(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                        setTimeout(function () {
                            entry.target.style.willChange = 'auto';
                        }, 700);
                        proObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.18 });

            proObs.observe(proContent);
        }

        animateBatch(
            Array.from(document.querySelectorAll('.pro-feature')),
            { direction: 'right', stagger: 90, threshold: 0.1 }
        );

        // ===== WELCOME SECTION =====
        var welcomeContent = document.querySelector(
            '.welcome-content'
        );
        var welcomeImg = document.querySelector('.welcome-img');

        if (welcomeContent) {
            welcomeContent.style.opacity = '0';
            welcomeContent.style.transform = 'translateX(-45px)';
            welcomeContent.style.transition = 'all 0.65s ease';
            welcomeContent.style.willChange =
                'opacity, transform';
        }

        if (welcomeImg) {
            welcomeImg.style.opacity = '0';
            welcomeImg.style.transform = 'translateX(45px)';
            welcomeImg.style.transition = 'all 0.65s ease';
            welcomeImg.style.willChange = 'opacity, transform';
        }

        if (welcomeContent) {
            var welObs = createObs(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        if (welcomeContent) {
                            welcomeContent.style.opacity = '1';
                            welcomeContent.style.transform =
                                'none';
                            setTimeout(function () {
                                welcomeContent.style.willChange =
                                    'auto';
                            }, 700);
                        }
                        if (welcomeImg) {
                            welcomeImg.style.opacity = '1';
                            welcomeImg.style.transform = 'none';
                            setTimeout(function () {
                                welcomeImg.style.willChange =
                                    'auto';
                            }, 700);
                        }
                        welObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.18 });

            welObs.observe(welcomeContent);
        }

        animateBatch(
            Array.from(document.querySelectorAll('.welcome-feat')),
            { direction: 'left', stagger: 85, threshold: 0.1 }
        );

        // ===== WHO WE ARE =====
        var whoImg = document.querySelector('.who-img');
        var whoContent = document.querySelector('.who-content');

        if (whoImg) {
            whoImg.style.opacity = '0';
            whoImg.style.transform = 'translateX(-52px)';
            whoImg.style.transition = 'all 0.68s ease';
            whoImg.style.willChange = 'opacity, transform';
        }

        if (whoContent) {
            whoContent.style.opacity = '0';
            whoContent.style.transform = 'translateX(52px)';
            whoContent.style.transition = 'all 0.68s ease';
            whoContent.style.willChange = 'opacity, transform';
        }

        if (whoImg) {
            var whoObs = createObs(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        if (whoImg) {
                            whoImg.style.opacity = '1';
                            whoImg.style.transform = 'none';
                            setTimeout(function () {
                                whoImg.style.willChange = 'auto';
                            }, 720);
                        }
                        if (whoContent) {
                            whoContent.style.opacity = '1';
                            whoContent.style.transform = 'none';
                            setTimeout(function () {
                                whoContent.style.willChange =
                                    'auto';
                            }, 720);
                        }
                        whoObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.18 });

            whoObs.observe(whoImg);
        }

        // Highlights
        animateBatch(
            Array.from(document.querySelectorAll(
                '.highlight-item'
            )),
            { direction: 'left', stagger: 90, threshold: 0.1 }
        );

        // ===== SHOP INFO =====
        animateBatch(
            Array.from(document.querySelectorAll(
                '.shop-info-item'
            )),
            { direction: 'up', stagger: 90, threshold: 0.1 }
        );

        // ===== COUNTER =====
        var counters = document.querySelectorAll('.counter');
        if (counters.length) {
            var cntObs = createObs(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        cntObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.55 });

            counters.forEach(function (c) { cntObs.observe(c); });
        }

        // ===== STAT ITEMS =====
        animateBatch(
            Array.from(document.querySelectorAll('.stat-item')),
            { direction: 'up', stagger: 90, threshold: 0.3 }
        );

        // ===== MV CARDS =====
        animateBatch(
            Array.from(document.querySelectorAll('.mv-card')),
            { direction: 'up', stagger: 130, threshold: 0.1 }
        );

        // ===== OFFER ITEMS =====
        var offerItems = document.querySelectorAll('.offer-item');

        animateBatch(
            Array.from(offerItems),
            { direction: 'scale', stagger: 50, threshold: 0.08 }
        );

        offerItems.forEach(function (item) {
            // Click to services
            item.addEventListener('click', function () {
                window.location.href = 'services.html';
            });

            // Keyboard nav
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
            { direction: 'up', stagger: 130, threshold: 0.1 }
        );

        // ===== TESTIMONIALS =====
        animateBatch(
            Array.from(document.querySelectorAll(
                '.testimonial-card'
            )),
            { direction: 'up', stagger: 130, threshold: 0.1 }
        );

        // ===== WHY LIST =====
        animateBatch(
            Array.from(document.querySelectorAll(
                '.why-list-item'
            )),
            { direction: 'left', stagger: 90, threshold: 0.1 }
        );

        // ===== PLAY BUTTON =====
        var playBtn = document.getElementById('playBtn');
        if (playBtn) {
            playBtn.addEventListener('click', function () {
                if (window.showMessage) {
                    window.showMessage(
                        '📹 Video coming soon! Visit our shop ' +
                        'at Vejalpur, Ahmedabad.',
                        'info'
                    );
                } else {
                    alert(
                        '📹 Video coming soon! Visit our shop ' +
                        'at Vejalpur, Ahmedabad.'
                    );
                }
            });
        }

        // ===== LOG =====
        console.log(
            '%c✅ About Page - Abhishek Xerox!',
            'color: #FFD700; background: #1a1a1a; ' +
            'padding: 5px 10px; border-radius: 4px; ' +
            'font-weight: bold;'
        );

    }); // END DOMContentLoaded

})(); // IIFE