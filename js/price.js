// ========================================
// PRICE PAGE JS - price.js
// Abhishek Xerox - Liquid Glass Only
// ========================================

(function () {
    'use strict';

    // =========================================
    // INTERSECTION OBSERVER HELPER
    // =========================================
    function observeElements(elements, callback, options) {
        if (!elements || !elements.length) return;

        var opts = {
            threshold:  (options && options.threshold)  || 0.1,
            rootMargin: (options && options.rootMargin) ||
                        '0px 0px -30px 0px'
        };

        if (!('IntersectionObserver' in window)) {
            elements.forEach(function (el, idx) {
                callback(el, idx);
            });
            return;
        }

        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, idx) {
                if (entry.isIntersecting) {
                    callback(entry.target, idx);
                    obs.unobserve(entry.target);
                }
            });
        }, opts);

        elements.forEach(function (el) { obs.observe(el); });
    }

    // =========================================
    // LIQUID SPOTLIGHT ON CARDS
    // =========================================
    function initLiquidSpotlight(selector, baseBg) {
        var cards = document.querySelectorAll(selector);
        var bg = baseBg || 'rgba(255,255,255,0.55)';

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;

                card.style.background =
                    'radial-gradient(' +
                        '260px circle at ' + x + 'px ' + y + 'px,' +
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
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ===== PAGE BANNER =====
        var banner = document.querySelector('.page-banner');
        if (banner) {
            banner.style.opacity    = '0';
            banner.style.transform  = 'translateY(-15px)';
            banner.style.transition =
                'opacity 0.55s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.55s cubic-bezier(0.4,0,0.2,1)';

            setTimeout(function () {
                banner.style.opacity   = '1';
                banner.style.transform = 'translateY(0)';
            }, 80);
        }

        // ===== INTRO CARDS =====
        var introCards = document.querySelectorAll('.intro-card');

        introCards.forEach(function (card) {
            card.style.opacity    = '0';
            card.style.transform  = 'translateY(28px)';
            card.style.transition =
                'opacity 0.55s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
            card.style.willChange = 'opacity, transform';
        });

        observeElements(
            Array.from(introCards),
            function (card, idx) {
                setTimeout(function () {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0)';
                    setTimeout(function () {
                        card.style.willChange = 'auto';
                    }, 600);
                }, idx * 100);
            },
            { threshold: 0.10 }
        );

        // Liquid spotlight on intro cards
        initLiquidSpotlight(
            '.intro-card',
            'rgba(255,255,255,0.55)'
        );

        // ===== PRICE CATEGORIES =====
        var priceCategories =
            document.querySelectorAll('.price-category');

        priceCategories.forEach(function (cat) {
            cat.style.opacity    = '0';
            cat.style.transform  = 'translateY(35px)';
            cat.style.transition =
                'opacity 0.60s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.60s cubic-bezier(0.4,0,0.2,1)';
            cat.style.willChange = 'opacity, transform';
        });

        observeElements(
            Array.from(priceCategories),
            function (cat, idx) {
                setTimeout(function () {
                    cat.style.opacity   = '1';
                    cat.style.transform = 'translateY(0)';
                    setTimeout(function () {
                        cat.style.willChange = 'auto';
                    }, 650);
                }, idx * 80);
            },
            { threshold: 0.06 }
        );

        // ===== TABLE ROW ANIMATION =====
        var tableRows = document.querySelectorAll(
            '.price-table tbody tr'
        );

        tableRows.forEach(function (row) {
            row.style.opacity    = '0';
            row.style.transform  = 'translateX(-16px)';
            row.style.transition =
                'opacity 0.42s ease, transform 0.42s ease';
        });

        observeElements(
            Array.from(tableRows),
            function (row, idx) {
                setTimeout(function () {
                    row.style.opacity   = '1';
                    row.style.transform = 'translateX(0)';
                }, idx * 38);
            },
            { threshold: 0.04 }
        );

        // ===== NOTE BOX =====
        var noteBox = document.querySelector('.note-box');
        if (noteBox) {
            noteBox.style.opacity    = '0';
            noteBox.style.transform  = 'translateY(20px)';
            noteBox.style.transition =
                'opacity 0.55s ease, transform 0.55s ease';

            observeElements(
                [noteBox],
                function (el) {
                    el.style.opacity   = '1';
                    el.style.transform = 'translateY(0)';
                },
                { threshold: 0.25 }
            );
        }

        // ===== TABLE ROW HOVER =====
        tableRows.forEach(function (row) {
            row.addEventListener('mouseenter', function () {
                this.style.background =
                    'rgba(37, 99, 235, 0.05)';
                this.style.transition = 'background 0.20s ease';
            });

            row.addEventListener('mouseleave', function () {
                this.style.background = '';
            });
        });

        // ===== PRICE COL HOVER =====
        var priceCols = document.querySelectorAll('.price-col');

        priceCols.forEach(function (col) {
            col.addEventListener('mouseenter', function () {
                this.style.color = 'var(--cyan)';
                this.style.transition = 'color 0.20s ease';
            });

            col.addEventListener('mouseleave', function () {
                this.style.color = '';
            });
        });

        // ===== SEARCH FUNCTION =====
        function searchPrice(query) {
            if (!query || !query.trim()) return;

            var rows = document.querySelectorAll(
                '.price-table tbody tr'
            );
            var foundRows = [];

            // Clear previous highlights
            rows.forEach(function (row) {
                row.classList.remove('search-highlight');
                row.style.background = '';
                row.style.borderLeft = '';
            });

            var queryLower = query.toLowerCase().trim();

            rows.forEach(function (row) {
                var text = row.textContent.toLowerCase();
                if (text.includes(queryLower)) {
                    foundRows.push(row);
                    row.classList.add('search-highlight');
                }
            });

            if (foundRows.length > 0) {
                var navbar = document.querySelector('.navbar');
                var offset = navbar ? navbar.offsetHeight + 20 : 90;
                var top =
                    foundRows[0].getBoundingClientRect().top +
                    window.scrollY - offset;

                window.scrollTo({ top: top, behavior: 'smooth' });

                // Remove highlight after 3.5 seconds
                setTimeout(function () {
                    foundRows.forEach(function (row) {
                        row.classList.remove('search-highlight');
                        row.style.background = '';
                        row.style.borderLeft = '';
                    });
                }, 3500);

                if (window.showMessage) {
                    window.showMessage(
                        '🔍 Found ' + foundRows.length +
                        ' result(s) for "' + query + '"',
                        'success'
                    );
                }
            } else {
                if (window.showMessage) {
                    window.showMessage(
                        '❌ "' + query +
                        '" not found. Try different keyword.',
                        'error'
                    );
                } else {
                    alert(
                        '❌ "' + query +
                        '" not found! Try different keyword.'
                    );
                }
            }
        }

        // Ctrl+F override
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                var query = prompt('🔍 Search Price List:');
                if (query) searchPrice(query);
            }
        });

        // ===== PRINT BUTTON - Liquid Glass =====
        var printBtn = document.createElement('button');
        printBtn.className = 'print-btn';
        printBtn.setAttribute('aria-label', 'Print Price List');
        printBtn.setAttribute('type', 'button');
        printBtn.innerHTML = '🖨️ Print';

        printBtn.addEventListener('click', function () {
            window.print();
        });

        document.body.appendChild(printBtn);

        // ===== CATEGORY HEADER COLLAPSE =====
        var categoryHeaders = document.querySelectorAll(
            '.category-header'
        );

        categoryHeaders.forEach(function (header) {
            header.style.cursor = 'pointer';
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'true');
            header.setAttribute('tabindex', '0');

            var wrap = header.nextElementSibling;

            function toggleCategory() {
                var isOpen =
                    header.getAttribute('aria-expanded') === 'true';

                if (isOpen) {
                    // Collapse
                    wrap.style.maxHeight = wrap.scrollHeight + 'px';
                    wrap.style.overflow  = 'hidden';
                    wrap.style.transition = 'max-height 0.35s ease';

                    requestAnimationFrame(function () {
                        wrap.style.maxHeight = '0';
                    });

                    header.setAttribute('aria-expanded', 'false');
                    header.style.borderBottomColor =
                        'rgba(37, 99, 235, 0.08)';
                } else {
                    // Expand
                    wrap.style.maxHeight = wrap.scrollHeight + 'px';
                    setTimeout(function () {
                        wrap.style.maxHeight = '';
                        wrap.style.overflow  = '';
                    }, 360);

                    header.setAttribute('aria-expanded', 'true');
                    header.style.borderBottomColor = '';
                }
            }

            header.addEventListener('click', toggleCategory);

            header.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCategory();
                }
            });
        });

        // ===== LOG =====
        console.log(
            '%c🫧 Price Page | Liquid Glass Ready!',
            'color:#2563EB;background:#F8FAFC;' +
            'padding:6px 14px;border-radius:8px;' +
            'font-weight:bold;border-left:3px solid #06B6D4;'
        );

    }); // END DOMContentLoaded

})(); // IIFE END