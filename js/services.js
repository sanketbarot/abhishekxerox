// ========================================
// SERVICES PAGE JS - services.js
// Abhishek Xerox - Performance Optimized
// ========================================

(function () {
    'use strict';

    // =========================================
    // UTILITY - INTERSECTION OBSERVER
    // =========================================
    function createObserver(callback, options) {
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
    // UTILITY - ANIMATE ELEMENTS
    // =========================================
    function animateElements(elements, options) {
        if (!elements || !elements.length) return;

        var stagger = (options && options.stagger) || 0;
        var delay = (options && options.delay) || 0;
        var direction = (options && options.direction) || 'up';
        var threshold = (options && options.threshold) || 0.1;

        var initTransforms = {
            up: 'translateY(35px)',
            left: 'translateX(-35px)',
            right: 'translateX(35px)',
            scale: 'scale(0.88)',
            fade: 'translateY(0px)'
        };

        var transform = initTransforms[direction] ||
            initTransforms.up;

        elements.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = transform;
            el.style.transition =
                'opacity 0.52s ease, transform 0.52s ease';
            el.style.willChange = 'opacity, transform';
        });

        var obs = createObserver(function (entries) {
            entries.forEach(function (entry, idx) {
                if (entry.isIntersecting) {
                    var totalDelay = delay + (idx * stagger);
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                        setTimeout(function () {
                            entry.target.style.willChange =
                                'auto';
                        }, 580);
                    }, totalDelay);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: threshold });

        elements.forEach(function (el) {
            obs.observe(el);
        });
    }

    // =========================================
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ===== PAGE BANNER =====
        var pageBanner = document.querySelector('.page-banner');
        if (pageBanner) {
            pageBanner.style.opacity = '0';
            pageBanner.style.transform = 'translateY(-18px)';
            pageBanner.style.transition = 'all 0.55s ease';
            setTimeout(function () {
                pageBanner.style.opacity = '1';
                pageBanner.style.transform = 'translateY(0)';
            }, 80);
        }

        // ===== INTRO CONTENT =====
        var introContent = document.querySelector('.intro-content');
        if (introContent) {
            introContent.style.opacity = '0';
            introContent.style.transform = 'translateY(28px)';
            introContent.style.transition = 'all 0.65s ease';

            var introObs = createObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                        introObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            introObs.observe(introContent);
        }

        // ===== INTRO STATS =====
        var introStats = document.querySelectorAll('.intro-stat');
        animateElements(Array.from(introStats), {
            direction: 'up',
            stagger: 90,
            threshold: 0.3
        });

        // ===== SERVICE ITEMS =====
        var serviceItems = document.querySelectorAll('.service-item');
        animateElements(Array.from(serviceItems), {
            direction: 'up',
            stagger: 130,
            threshold: 0.12,
            delay: 50
        });

        // ===== ALL SERVICE CARDS =====
        var allCards = document.querySelectorAll('.all-service-card');
        animateElements(Array.from(allCards), {
            direction: 'up',
            stagger: 70,
            threshold: 0.08
        });

        // Click → contact
        allCards.forEach(function (card) {
            card.addEventListener('click', function (e) {
                if (e.target.tagName === 'A') return;
                window.location.href = 'contact.html';
            });
        });

        // ===== MORE CARDS =====
        var moreCards = document.querySelectorAll('.more-card');
        animateElements(Array.from(moreCards), {
            direction: 'up',
            stagger: 85,
            threshold: 0.1
        });

        moreCards.forEach(function (card) {
            card.addEventListener('click', function () {
                window.location.href = 'contact.html';
            });
        });

        // ===== WHY BOXES =====
        var whyBoxes = document.querySelectorAll('.why-box');
        animateElements(Array.from(whyBoxes), {
            direction: 'up',
            stagger: 120,
            threshold: 0.1
        });

        // ===== SERVICE ICON HOVER =====
        // Only on non-touch devices
        if (!('ontouchstart' in window)) {
            var iconBoxes = document.querySelectorAll(
                '.service-icon-box'
            );
            iconBoxes.forEach(function (icon) {
                icon.addEventListener('mouseenter', function () {
                    if (this.closest('.service-item:hover')) return;
                    this.style.transform =
                        'scale(1.08) rotate(5deg)';
                    this.style.transition = 'all 0.3s ease';
                });
                icon.addEventListener('mouseleave', function () {
                    this.style.transform = '';
                });
            });
        }

        // ===== SERVICE TAGS =====
        var tags = document.querySelectorAll('.service-tags span');
        tags.forEach(function (tag) {
            tag.addEventListener('click', function () {
                var self = this;
                self.style.background = '#FFD700';
                self.style.transform = 'scale(1.08)';
                self.style.transition = 'all 0.2s ease';
                setTimeout(function () {
                    self.style.background = '';
                    self.style.transform = '';
                }, 380);
            });
        });

        // ===== SERVICE ITEM - CTA KEYBOARD =====
        var serviceCtaLinks = document.querySelectorAll(
            '.service-cta'
        );
        serviceCtaLinks.forEach(function (link) {
            link.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href =
                        this.getAttribute('href');
                }
            });
        });

        // ===== PERFORMANCE - PAUSE ANIMATIONS ON HIDDEN =====
        if ('visibilityState' in document) {
            document.addEventListener(
                'visibilitychange',
                function () {
                    var cards = document.querySelectorAll(
                        '.more-card, .all-service-card'
                    );
                    cards.forEach(function (card) {
                        if (document.hidden) {
                            card.style.animationPlayState =
                                'paused';
                        } else {
                            card.style.animationPlayState =
                                'running';
                        }
                    });
                }
            );
        }

        // ===== LOG =====
        console.log(
            '%c✅ Services Page - Abhishek Xerox!',
            'color: #FFD700; background: #1a1a1a; ' +
            'padding: 5px 10px; border-radius: 4px; ' +
            'font-weight: bold;'
        );

    }); // END DOMContentLoaded

})(); // IIFE