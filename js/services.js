// ========================================
// SERVICES PAGE JS - services.js
// Abhishek Xerox - Liquid Glass Only
// ========================================

(function () {
    'use strict';

    // =========================================
    // UTILITY - INTERSECTION OBSERVER
    // =========================================
    function createObserver(callback, options) {
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
    // ANIMATE ELEMENTS - Stagger + Direction
    // =========================================
    function animateElements(elements, options) {
        if (!elements || !elements.length) return;

        var stagger   = (options && options.stagger)   || 0;
        var delay     = (options && options.delay)      || 0;
        var direction = (options && options.direction)  || 'up';
        var threshold = (options && options.threshold)  || 0.1;

        var initTransforms = {
            up:    'translateY(35px)',
            left:  'translateX(-38px)',
            right: 'translateX(38px)',
            scale: 'scale(0.88)',
            fade:  'translateY(0px)'
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

        var obs = createObserver(function (entries) {
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
    // LIQUID SPOTLIGHT EFFECT
    // =========================================
    function initLiquidSpotlight(selector, baseBg) {
        var elements = document.querySelectorAll(selector);

        elements.forEach(function (el) {
            el.addEventListener('mousemove', function (e) {
                var rect = el.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;

                el.style.background =
                    'radial-gradient(' +
                        '280px circle at ' + x + 'px ' + y + 'px,' +
                        'rgba(37, 99, 235, 0.07),' +
                        'rgba(6, 182, 212, 0.04) 30%,' +
                        'transparent 52%' +
                    '),' + (baseBg || 'rgba(255,255,255,0.55)');
            });

            el.addEventListener('mouseleave', function () {
                el.style.background = '';
            });
        });
    }

    // =========================================
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ===== PAGE BANNER =====
        var pageBanner = document.querySelector('.page-banner');
        if (pageBanner) {
            pageBanner.style.opacity   = '0';
            pageBanner.style.transform = 'translateY(-18px)';
            pageBanner.style.transition =
                'opacity 0.55s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.55s cubic-bezier(0.4,0,0.2,1)';

            setTimeout(function () {
                pageBanner.style.opacity   = '1';
                pageBanner.style.transform = 'translateY(0)';
            }, 80);
        }

        // ===== INTRO CONTENT =====
        var introContent = document.querySelector('.intro-content');
        if (introContent) {
            introContent.style.opacity   = '0';
            introContent.style.transform = 'translateY(30px)';
            introContent.style.transition =
                'opacity 0.65s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.65s cubic-bezier(0.4,0,0.2,1)';

            var introObs = createObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'none';
                    introObs.unobserve(entry.target);
                });
            }, { threshold: 0.18 });

            introObs.observe(introContent);
        }

        // ===== INTRO STATS =====
        animateElements(
            Array.from(document.querySelectorAll('.intro-stat')),
            { direction: 'up', stagger: 85, threshold: 0.22 }
        );

        initLiquidSpotlight('.intro-stat', 'rgba(255,255,255,0.58)');

        // ===== SERVICE ITEMS =====
        var serviceItems = document.querySelectorAll('.service-item');

        animateElements(Array.from(serviceItems), {
            direction: 'up',
            stagger:   110,
            threshold: 0.10,
            delay:     50
        });

        // Liquid Spotlight on service items
        initLiquidSpotlight(
            '.service-item',
            'rgba(255,255,255,0.55)'
        );

        // ===== ALL SERVICE CARDS =====
        var allCards = document.querySelectorAll('.all-service-card');

        animateElements(Array.from(allCards), {
            direction: 'up',
            stagger:   60,
            threshold: 0.06
        });

        allCards.forEach(function (card) {
            card.addEventListener('click', function (e) {
                if (e.target.tagName === 'A') return;
                window.location.href = 'contact.html';
            });
        });

        initLiquidSpotlight(
            '.all-service-card',
            'rgba(255,255,255,0.55)'
        );

        // ===== MORE CARDS =====
        var moreCards = document.querySelectorAll('.more-card');

        animateElements(Array.from(moreCards), {
            direction: 'up',
            stagger:   75,
            threshold: 0.08
        });

        moreCards.forEach(function (card) {
            card.addEventListener('click', function () {
                window.location.href = 'contact.html';
            });
        });

        initLiquidSpotlight(
            '.more-card',
            'rgba(255,255,255,0.55)'
        );

        // ===== WHY BOXES =====
        var whyBoxes = document.querySelectorAll('.why-box');

        animateElements(Array.from(whyBoxes), {
            direction: 'up',
            stagger:   100,
            threshold: 0.08
        });

        initLiquidSpotlight(
            '.why-box',
            'rgba(255,255,255,0.55)'
        );

        // ===== SERVICE TAGS - Click Ripple ===== */
        var tags = document.querySelectorAll('.service-tags span');

        tags.forEach(function (tag) {
            tag.addEventListener('click', function () {
                var self = this;
                self.style.background = 'rgba(37, 99, 235, 0.12)';
                self.style.transform  = 'scale(1.08)';
                self.style.transition = 'all 0.20s ease';

                setTimeout(function () {
                    self.style.background = '';
                    self.style.transform  = '';
                }, 380);
            });
        });

        // ===== SECTION TITLES =====
        animateElements(
            Array.from(document.querySelectorAll(
                '.section-title, .section-subtitle'
            )),
            { direction: 'up', stagger: 70, threshold: 0.08 }
        );

        // ===== SERVICE CTA - Keyboard =====
        document.querySelectorAll('.service-cta')
            .forEach(function (link) {
                link.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.location.href = this.getAttribute('href');
                    }
                });
            });

        // ===== VISIBILITY - Pause on hidden =====
        if ('visibilityState' in document) {
            document.addEventListener('visibilitychange', function () {
                var animated = document.querySelectorAll(
                    '.more-card, .all-service-card, .why-box'
                );
                animated.forEach(function (el) {
                    el.style.animationPlayState =
                        document.hidden ? 'paused' : 'running';
                });
            });
        }

        // ===== LOG =====
        console.log(
            '%c🫧 Services Page | Liquid Glass Ready!',
            'color:#2563EB;background:#F8FAFC;' +
            'padding:6px 14px;border-radius:8px;' +
            'font-weight:bold;border-left:3px solid #06B6D4;'
        );

    }); // END DOMContentLoaded

})(); // IIFE END