// ========================================
// PRICE PAGE JS - price.js
// Abhishek Xerox - Performance Optimized
// ========================================

(function () {
    'use strict';

    // =========================================
    // INTERSECTION OBSERVER HELPER
    // =========================================
    function observeElements(elements, callback, options) {
        if (!elements || !elements.length) return;

        var opts = {
            threshold: (options && options.threshold) || 0.1,
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
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ===== PAGE BANNER =====
        var banner = document.querySelector('.page-banner');
        if (banner) {
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(-15px)';
            banner.style.transition = 'all 0.52s ease';
            setTimeout(function () {
                banner.style.opacity = '1';
                banner.style.transform = 'translateY(0)';
            }, 80);
        }

        // ===== INTRO CARDS =====
        var introCards = document.querySelectorAll('.intro-card');
        introCards.forEach(function (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(28px)';
            card.style.transition =
                'opacity 0.5s ease, transform 0.5s ease';
            card.style.willChange = 'opacity, transform';
        });

        observeElements(Array.from(introCards), function (card, idx) {
            setTimeout(function () {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                setTimeout(function () {
                    card.style.willChange = 'auto';
                }, 560);
            }, idx * 110);
        }, { threshold: 0.1 });

        // ===== PRICE CATEGORIES =====
        var priceCategories = document.querySelectorAll(
            '.price-category'
        );
        priceCategories.forEach(function (cat) {
            cat.style.opacity = '0';
            cat.style.transform = 'translateY(38px)';
            cat.style.transition =
                'opacity 0.58s ease, transform 0.58s ease';
            cat.style.willChange = 'opacity, transform';
        });

        observeElements(Array.from(priceCategories),
            function (cat, idx) {
                setTimeout(function () {
                    cat.style.opacity = '1';
                    cat.style.transform = 'translateY(0)';
                    setTimeout(function () {
                        cat.style.willChange = 'auto';
                    }, 620);
                }, idx * 85);
            },
            { threshold: 0.08 }
        );

        // ===== TABLE ROW ANIMATION =====
        var tableRows = document.querySelectorAll(
            '.price-table tbody tr'
        );
        tableRows.forEach(function (row) {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-18px)';
            row.style.transition =
                'opacity 0.4s ease, transform 0.4s ease';
        });

        observeElements(Array.from(tableRows), function (row, idx) {
            setTimeout(function () {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, idx * 40);
        }, { threshold: 0.05 });

        // ===== NOTE BOX =====
        var noteBox = document.querySelector('.note-box');
        if (noteBox) {
            noteBox.style.opacity = '0';
            noteBox.style.transform = 'translateY(20px)';
            noteBox.style.transition = 'all 0.55s ease';

            observeElements([noteBox], function (el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, { threshold: 0.3 });
        }

        // ===== TABLE ROW HOVER =====
        tableRows.forEach(function (row) {
            row.addEventListener('mouseenter', function () {
                this.style.backgroundColor = '#FFFDE7';
                this.style.transition =
                    'background-color 0.2s ease';
            });
            row.addEventListener('mouseleave', function () {
                this.style.backgroundColor = '';
            });
        });

        // ===== PRICE COLUMN HOVER =====
        var priceCols = document.querySelectorAll('.price-col');
        priceCols.forEach(function (col) {
            col.addEventListener('mouseenter', function () {
                this.style.color = '#FFD700';
                this.style.transition = 'color 0.2s ease';
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
            });

            var queryLower = query.toLowerCase().trim();

            rows.forEach(function (row) {
                var text = row.textContent.toLowerCase();
                if (text.includes(queryLower)) {
                    foundRows.push(row);
                    row.classList.add('search-highlight');
                    row.style.background = '#FFD700';
                    row.style.transition = 'background 0.3s ease';
                }
            });

            if (foundRows.length > 0) {
                // Scroll to first result
                var navbar = document.querySelector('.navbar');
                var offset = navbar ? navbar.offsetHeight + 20 : 90;
                var top = foundRows[0].getBoundingClientRect().top +
                    window.scrollY - offset;

                window.scrollTo({ top: top, behavior: 'smooth' });

                // Remove highlight after 3 seconds
                setTimeout(function () {
                    foundRows.forEach(function (row) {
                        row.classList.remove('search-highlight');
                        row.style.background = '';
                    });
                }, 3200);

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
                        '❌ "' + query + '" not found. ' +
                        'Try different keyword.',
                        'error'
                    );
                } else {
                    alert('❌ "' + query +
                        '" not found! Try different keyword.');
                }
            }
        }

        // Ctrl+F override for search
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                var query = prompt('🔍 Search Price List:');
                if (query) searchPrice(query);
            }
        });

        // ===== PRINT BUTTON =====
        var printBtn = document.createElement('button');
        printBtn.className = 'print-btn';
        printBtn.setAttribute('aria-label', 'Print Price List');
        printBtn.setAttribute('type', 'button');
        printBtn.innerHTML = '🖨️ Print';

        printBtn.addEventListener('click', function () {
            window.print();
        });

        document.body.appendChild(printBtn);

        // ===== CATEGORY HEADER CLICK - COLLAPSE =====
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
                var isOpen = header.getAttribute(
                    'aria-expanded'
                ) === 'true';

                if (isOpen) {
                    wrap.style.maxHeight =
                        wrap.scrollHeight + 'px';
                    wrap.style.overflow = 'hidden';
                    wrap.style.transition =
                        'max-height 0.35s ease';

                    requestAnimationFrame(function () {
                        wrap.style.maxHeight = '0';
                    });

                    header.setAttribute('aria-expanded', 'false');
                    header.style.borderBottomColor =
                        'transparent';
                } else {
                    wrap.style.maxHeight =
                        wrap.scrollHeight + 'px';
                    setTimeout(function () {
                        wrap.style.maxHeight = '';
                        wrap.style.overflow = '';
                    }, 380);

                    header.setAttribute('aria-expanded', 'true');
                    header.style.borderBottomColor = '#FFD700';
                }
            }

            // Click
            header.addEventListener('click', toggleCategory);

            // Keyboard
            header.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCategory();
                }
            });
        });

        // ===== LOG =====
        console.log(
            '%c✅ Price Page - Abhishek Xerox!',
            'color: #FFD700; background: #1a1a1a; ' +
            'padding: 5px 10px; border-radius: 4px; ' +
            'font-weight: bold;'
        );

    }); // END DOMContentLoaded

})(); // IIFE