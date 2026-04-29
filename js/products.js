// ========================================
// PRODUCTS PAGE JS - products.js
// Abhishek Xerox - Liquid Glass Only
// ========================================

(function () {
    'use strict';

    // =========================================
    // PRODUCT DATA
    // =========================================
    var productData = {
        'Stationery Print': {
            icon: '🖊️',
            desc: 'High quality stationery printing including ' +
                'letterheads, envelopes, notepads, business forms ' +
                'and all office stationery. Custom designs at ' +
                'best prices in Vejalpur, Ahmedabad.'
        },
        'Branding': {
            icon: '🏷️',
            desc: 'Complete branding solutions including logo design, ' +
                'brand identity, business cards, letterheads and all ' +
                'marketing materials. We help your business stand out ' +
                'from the crowd in Ahmedabad.'
        },
        'Events': {
            icon: '🎪',
            desc: 'Complete event printing - banners, backdrops, ' +
                'invitations, programs, certificates and all event ' +
                'related printing for your special occasions ' +
                'in Vejalpur, Ahmedabad.'
        },
        'Photos Print': {
            icon: '📷',
            desc: 'High quality photo printing on premium photo paper. ' +
                'Available in passport size, stamp size, 4R, 5R, A4 ' +
                'and all custom sizes. Best color accuracy guaranteed ' +
                'at Abhishek Xerox.'
        },
        'Sticker Print': {
            icon: '🏷️',
            desc: 'Custom sticker printing in various shapes, sizes and ' +
                'materials including vinyl, paper and waterproof stickers. ' +
                'Bulk orders welcome at best prices.'
        },
        'Pharma Prints': {
            icon: '💊',
            desc: 'Specialized pharmaceutical printing for medicine labels, ' +
                'prescription pads, packaging inserts, medical forms and ' +
                'all healthcare related printing needs in Ahmedabad.'
        },
        'Personalized Items': {
            icon: '🎁',
            desc: 'Custom personalized gifts and items with names, photos ' +
                'and messages. Perfect for birthdays, anniversaries and ' +
                'special occasions. Unique gifts at affordable prices.'
        },
        'Exhibition Print': {
            icon: '🖼️',
            desc: 'Large format exhibition prints for trade shows, galleries ' +
                'and events. Printed on high quality paper or canvas in ' +
                'various sizes including A0, A1, A2 and custom sizes.'
        },
        'Plan Xerox': {
            icon: '📐',
            desc: 'Wide format color and black & white printing for ' +
                'architectural, engineering and construction plans. ' +
                'Print and scan sizes A0, A1, A2, A3 and custom sizes ' +
                'at best quality.'
        },
        'Packaging': {
            icon: '📦',
            desc: 'Custom packaging printing for products including boxes, ' +
                'labels, bags and wrapping materials. Perfect for product ' +
                'branding and marketing needs of all businesses in Ahmedabad.'
        },
        'Restaurants': {
            icon: '🍽️',
            desc: 'Complete restaurant printing solutions including menus, ' +
                'table cards, bill books, takeaway bags, loyalty cards and ' +
                'all restaurant related printing materials at best prices.'
        },
        'Lamination': {
            icon: '🗂️',
            desc: 'Professional lamination for documents, certificates, ' +
                'ID cards, photos and all important papers. Available in ' +
                'glossy and matte finish at all sizes and all branches ' +
                'in Ahmedabad.'
        }
    };

    // =========================================
    // MODAL
    // =========================================
    var modalOverlay  = null;
    var modalClose    = null;
    var lastFocusedEl = null;

    function openModal(title) {
        var data = productData[title];
        if (!data || !modalOverlay) return;

        var iconEl  = document.getElementById('modalIcon');
        var titleEl = document.getElementById('modalTitle');
        var descEl  = document.getElementById('modalDesc');

        if (iconEl)  iconEl.textContent  = data.icon;
        if (titleEl) titleEl.textContent = title;
        if (descEl)  descEl.textContent  = data.desc;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        setTimeout(function () {
            if (modalClose) modalClose.focus();
        }, 100);
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';

        if (lastFocusedEl) {
            lastFocusedEl.focus();
            lastFocusedEl = null;
        }
    }

    // =========================================
    // FILTER PRODUCTS - Liquid Transition
    // =========================================
    function filterProducts(filter, cards) {
        var visibleCount = 0;

        cards.forEach(function (card) {
            var cat     = card.getAttribute('data-category');
            var isMatch = filter === 'all' || cat === filter;

            if (isMatch) {
                card.classList.remove('hidden');
                card.style.opacity   = '0';
                card.style.transform = 'scale(0.92) translateY(18px)';
                card.style.transition = 'none';
                visibleCount++;

                var idx = visibleCount;

                requestAnimationFrame(function () {
                    setTimeout(function () {
                        card.style.transition =
                            'opacity 0.40s cubic-bezier(0.4,0,0.2,1),' +
                            'transform 0.40s cubic-bezier(0.4,0,0.2,1)';
                        card.style.opacity   = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, idx * 55);
                });
            } else {
                card.style.transition =
                    'opacity 0.25s ease, transform 0.25s ease';
                card.style.opacity   = '0';
                card.style.transform = 'scale(0.92)';

                setTimeout(function () {
                    card.classList.add('hidden');
                }, 280);
            }
        });

        var noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.classList.toggle('show', visibleCount === 0);
        }
    }

    // =========================================
    // INTERSECTION OBSERVER HELPER
    // =========================================
    function observeElements(elements, callback, opts) {
        if (!('IntersectionObserver' in window)) {
            elements.forEach(function (el, i) {
                callback(el, i);
            });
            return;
        }

        var obs = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry, idx) {
                    if (!entry.isIntersecting) return;
                    callback(entry.target, idx);
                    obs.unobserve(entry.target);
                });
            },
            opts || { threshold: 0.06 }
        );

        elements.forEach(function (el) { obs.observe(el); });
    }

    // =========================================
    // LIQUID SPOTLIGHT EFFECT
    // =========================================
    function initLiquidSpotlight(elements, baseBg) {
        var bg = baseBg || 'rgba(255,255,255,0.55)';

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
                    '),' + bg;
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

        modalOverlay = document.getElementById('modalOverlay');
        modalClose   = document.getElementById('modalClose');

        var filterTabs   = document.querySelectorAll('.filter-tab');
        var productCards = document.querySelectorAll('.product-card');
        var whyCards     = document.querySelectorAll('.why-product-card');

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

        // ===== FILTER TABS ANIMATION =====
        filterTabs.forEach(function (tab, idx) {
            tab.style.opacity   = '0';
            tab.style.transform = 'translateY(14px)';
            tab.style.transition = 'opacity 0.38s ease, transform 0.38s ease';

            setTimeout(function () {
                tab.style.opacity   = '1';
                tab.style.transform = 'translateY(0)';
            }, 100 + idx * 60);
        });

        // ===== FILTER TABS CLICK =====
        filterTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                filterTabs.forEach(function (t) {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });

                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                filterProducts(
                    this.getAttribute('data-filter'),
                    Array.from(productCards)
                );
            });
        });

        // ===== PRODUCT CARDS ANIMATION =====
        productCards.forEach(function (card) {
            card.style.opacity   = '0';
            card.style.transform = 'translateY(38px)';
            card.style.transition =
                'opacity 0.55s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
            card.style.willChange = 'opacity, transform';
        });

        observeElements(
            Array.from(productCards),
            function (card, idx) {
                setTimeout(function () {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0)';
                    setTimeout(function () {
                        card.style.willChange = 'auto';
                    }, 600);
                }, idx * 65);
            }
        );

        // Liquid spotlight on product cards
        initLiquidSpotlight(
            Array.from(productCards),
            'rgba(255,255,255,0.55)'
        );

        // ===== PRODUCT CARD - Click (Modal) =====
        productCards.forEach(function (card) {
            card.addEventListener('click', function (e) {
                if (e.target.tagName === 'A' ||
                    e.target.closest('a')) return;

                var titleEl = this.querySelector('h3');
                if (!titleEl) return;

                lastFocusedEl = card;
                openModal(titleEl.textContent.trim());
            });

            card.addEventListener('keydown', function (e) {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();

                var titleEl = this.querySelector('h3');
                if (!titleEl) return;

                lastFocusedEl = card;
                openModal(titleEl.textContent.trim());
            });
        });

        // ===== MODAL CLOSE =====
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', function (e) {
                if (e.target === this) closeModal();
            });
        }

        // Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' &&
                modalOverlay &&
                modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });

        // ===== WHY CARDS ANIMATION =====
        whyCards.forEach(function (card) {
            card.style.opacity   = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition =
                'opacity 0.55s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
            card.style.willChange = 'opacity, transform';
        });

        observeElements(
            Array.from(whyCards),
            function (card, idx) {
                setTimeout(function () {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0)';
                    setTimeout(function () {
                        card.style.willChange = 'auto';
                    }, 600);
                }, idx * 90);
            }
        );

        // Liquid spotlight on why cards
        initLiquidSpotlight(
            Array.from(whyCards),
            'rgba(255,255,255,0.55)'
        );

        // ===== SECTION TITLES =====
        var titles = document.querySelectorAll(
            '.section-title, .section-subtitle'
        );

        titles.forEach(function (el) {
            el.style.opacity   = '0';
            el.style.transform = 'translateY(25px)';
            el.style.transition =
                'opacity 0.60s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.60s cubic-bezier(0.4,0,0.2,1)';
        });

        observeElements(Array.from(titles), function (el) {
            el.style.opacity   = '1';
            el.style.transform = 'translateY(0)';
        }, { threshold: 0.10 });

        // ===== VISIBILITY CHANGE =====
        if ('visibilityState' in document) {
            document.addEventListener('visibilitychange', function () {
                if (document.hidden &&
                    modalOverlay &&
                    modalOverlay.classList.contains('active')) {
                    closeModal();
                }
            });
        }

        // ===== LOG =====
        console.log(
            '%c🫧 Products Page | Liquid Glass Ready!',
            'color:#2563EB;background:#F8FAFC;' +
            'padding:6px 14px;border-radius:8px;' +
            'font-weight:bold;border-left:3px solid #06B6D4;'
        );

    }); // END DOMContentLoaded

})(); // IIFE END