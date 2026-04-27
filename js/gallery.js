// ========================================
// GALLERY PAGE JS - gallery.js
// Abhishek Xerox - Performance Optimized
// ========================================

(function () {
    'use strict';

    // =========================================
    // GALLERY DATA
    // =========================================
    var galleryData = [
        {
            emoji: '🏪',
            title: 'Our Shop',
            desc: 'Front View - Abhishek Xerox Vejalpur',
            bg: 'linear-gradient(135deg,#1a1a1a,#2d2d2d)',
            category: 'shop'
        },
        {
            emoji: '🖨️',
            title: 'Printing Machine',
            desc: 'High Quality Color Printer',
            bg: 'linear-gradient(135deg,#1a3a1a,#2d5a2d)',
            category: 'printing'
        },
        {
            emoji: '📄',
            title: 'Document Scanning',
            desc: 'Fast & Accurate Scanning',
            bg: 'linear-gradient(135deg,#1a1a3a,#2d2d5a)',
            category: 'scanning'
        },
        {
            emoji: '🗂️',
            title: 'Lamination Work',
            desc: 'Glossy & Matte Lamination',
            bg: 'linear-gradient(135deg,#3a1a1a,#5a2d2d)',
            category: 'lamination'
        },
        {
            emoji: '📚',
            title: 'Book Binding',
            desc: 'Spiral Binding Work',
            bg: 'linear-gradient(135deg,#2a1a3a,#4a2d5a)',
            category: 'binding'
        },
        {
            emoji: '🖥️',
            title: 'Computer Section',
            desc: 'Typing & Digital Work',
            bg: 'linear-gradient(135deg,#3a3a1a,#5a5a2d)',
            category: 'shop'
        },
        {
            emoji: '🎨',
            title: 'Color Printing',
            desc: 'High Quality Color Output',
            bg: 'linear-gradient(135deg,#1a2a3a,#2d4a5a)',
            category: 'printing'
        },
        {
            emoji: '🔍',
            title: 'Photo Scanning',
            desc: 'High Resolution Scanning',
            bg: 'linear-gradient(135deg,#2a3a1a,#4a5a2d)',
            category: 'scanning'
        },
        {
            emoji: '💳',
            title: 'ID Card Lamination',
            desc: 'Professional Card Lamination',
            bg: 'linear-gradient(135deg,#3a2a1a,#5a4a2d)',
            category: 'lamination'
        },
        {
            emoji: '📖',
            title: 'Hard Binding',
            desc: 'Premium Hard Binding',
            bg: 'linear-gradient(135deg,#1a3a2a,#2d5a4a)',
            category: 'binding'
        },
        {
            emoji: '🖼️',
            title: 'Photo Printing',
            desc: 'Passport & Custom Photos',
            bg: 'linear-gradient(135deg,#2d1a1a,#4a2d2d)',
            category: 'shop'
        },
        {
            emoji: '📮',
            title: 'Visiting Cards',
            desc: 'Professional Business Cards',
            bg: 'linear-gradient(135deg,#1a1a2d,#2d2d4a)',
            category: 'printing'
        }
    ];

    var currentIndex = 0;
    var visibleItems = [];
    var lightboxEl = null;
    var isLightboxOpen = false;
    var lastFocusedItem = null;

    // =========================================
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        // Get elements
        lightboxEl = document.getElementById('lightbox');
        var lightboxImg = document.getElementById('lightboxImg');
        var lightboxTitle = document.getElementById('lightboxTitle');
        var lightboxDesc = document.getElementById('lightboxDesc');
        var lightboxClose = document.getElementById('lightboxClose');
        var lightboxOverlay = document.getElementById('lightboxOverlay');
        var lightboxCounter = document.getElementById('lightboxCounter');
        var prevBtn = document.getElementById('prevBtn');
        var nextBtn = document.getElementById('nextBtn');

        var filterBtns = document.querySelectorAll('.filter-btn');
        var galleryItems = document.querySelectorAll('.gallery-item');

        // ===== PAGE BANNER =====
        var banner = document.querySelector('.page-banner');
        if (banner) {
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(-16px)';
            banner.style.transition = 'all 0.5s ease';
            setTimeout(function () {
                banner.style.opacity = '1';
                banner.style.transform = 'translateY(0)';
            }, 80);
        }

        // ===== FILTER BUTTONS ANIMATION =====
        filterBtns.forEach(function (btn, idx) {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(14px)';
            btn.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            setTimeout(function () {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 80 + idx * 70);
        });

        // ===== GALLERY ITEMS ANIMATION =====
        galleryItems.forEach(function (item) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.88)';
            item.style.transition =
                'opacity 0.45s ease, transform 0.45s ease';
            item.style.willChange = 'opacity, transform';
        });

        if ('IntersectionObserver' in window) {
            var galleryObs = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry, idx) {
                        if (entry.isIntersecting) {
                            setTimeout(function () {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform =
                                    'scale(1)';
                                setTimeout(function () {
                                    entry.target.style.willChange =
                                        'auto';
                                }, 500);
                            }, idx * 70);
                            galleryObs.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.08 }
            );

            galleryItems.forEach(function (item) {
                galleryObs.observe(item);
            });
        } else {
            galleryItems.forEach(function (item) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
                item.style.willChange = 'auto';
            });
        }

        // Build visible items list
        updateVisibleItems(galleryItems);

        // ===== FILTER BUTTONS =====
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                var filter = this.getAttribute('data-filter');
                filterGallery(filter, galleryItems);
            });
        });

        // ===== GALLERY ITEM CLICK =====
        galleryItems.forEach(function (item, idx) {
            // Click
            item.addEventListener('click', function () {
                lastFocusedItem = item;
                currentIndex = idx;
                openLightbox(currentIndex, galleryData,
                    lightboxImg, lightboxTitle, lightboxDesc,
                    lightboxCounter);
            });

            // Keyboard
            item.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    lastFocusedItem = item;
                    currentIndex = idx;
                    openLightbox(currentIndex, galleryData,
                        lightboxImg, lightboxTitle, lightboxDesc,
                        lightboxCounter);
                }
            });
        });

        // ===== LIGHTBOX CLOSE =====
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function () {
                closeLightbox();
            });
        }

        if (lightboxOverlay) {
            lightboxOverlay.addEventListener('click', function () {
                closeLightbox();
            });
        }

        // ===== NAV BUTTONS =====
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                currentIndex = (currentIndex - 1 +
                    galleryData.length) % galleryData.length;
                openLightbox(currentIndex, galleryData,
                    lightboxImg, lightboxTitle, lightboxDesc,
                    lightboxCounter);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                currentIndex = (currentIndex + 1) %
                    galleryData.length;
                openLightbox(currentIndex, galleryData,
                    lightboxImg, lightboxTitle, lightboxDesc,
                    lightboxCounter);
            });
        }

        // ===== KEYBOARD NAV =====
        document.addEventListener('keydown', function (e) {
            if (!isLightboxOpen) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    currentIndex = (currentIndex - 1 +
                        galleryData.length) % galleryData.length;
                    openLightbox(currentIndex, galleryData,
                        lightboxImg, lightboxTitle, lightboxDesc,
                        lightboxCounter);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    currentIndex = (currentIndex + 1) %
                        galleryData.length;
                    openLightbox(currentIndex, galleryData,
                        lightboxImg, lightboxTitle, lightboxDesc,
                        lightboxCounter);
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
                default:
                    break;
            }
        });

        // Touch swipe on lightbox
        addSwipeSupport(lightboxEl, function (dir) {
            if (!isLightboxOpen) return;
            if (dir === 'left') {
                currentIndex = (currentIndex + 1) %
                    galleryData.length;
            } else if (dir === 'right') {
                currentIndex = (currentIndex - 1 +
                    galleryData.length) % galleryData.length;
            }
            openLightbox(currentIndex, galleryData,
                lightboxImg, lightboxTitle, lightboxDesc,
                lightboxCounter);
        });

        // ===== LOG =====
        console.log(
            '%c✅ Gallery Page - Abhishek Xerox!',
            'color: #FFD700; background: #1a1a1a; ' +
            'padding: 5px 10px; border-radius: 4px; ' +
            'font-weight: bold;'
        );

    }); // END DOMContentLoaded

    // =========================================
    // UPDATE VISIBLE ITEMS
    // =========================================
    function updateVisibleItems(items) {
        visibleItems = Array.from(items).filter(function (item) {
            return !item.classList.contains('hidden');
        });
    }

    // =========================================
    // FILTER GALLERY
    // =========================================
    function filterGallery(filter, items) {
        var visibleCount = 0;

        items.forEach(function (item) {
            var category = item.getAttribute('data-category');
            var isMatch = filter === 'all' ||
                category === filter;

            if (isMatch) {
                item.classList.remove('hidden');
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                item.style.transition = 'none';
                visibleCount++;

                requestAnimationFrame(function () {
                    setTimeout(function () {
                        item.style.transition =
                            'opacity 0.38s ease, transform 0.38s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, visibleCount * 50);
                });
            } else {
                item.style.transition =
                    'opacity 0.25s ease, transform 0.25s ease';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';

                setTimeout(function () {
                    item.classList.add('hidden');
                }, 280);
            }
        });

        // No results
        var noResults = document.getElementById('noResults');
        if (noResults) {
            if (visibleCount === 0) {
                noResults.classList.add('show');
            } else {
                noResults.classList.remove('show');
            }
        }

        // Update visible list
        setTimeout(function () {
            updateVisibleItems(items);
        }, 350);
    }

    // =========================================
    // OPEN LIGHTBOX
    // =========================================
    function openLightbox(index, data, imgEl, titleEl, descEl,
        counterEl) {
        if (!lightboxEl || !data || !data[index]) return;

        var item = data[index];

        if (imgEl) {
            imgEl.style.background = item.bg;
            imgEl.innerHTML =
                '<span style="font-size:95px;line-height:1;">' +
                item.emoji + '</span>';
        }

        if (titleEl) titleEl.textContent = item.title;
        if (descEl) descEl.textContent = item.desc;

        if (counterEl) {
            counterEl.textContent =
                (index + 1) + ' / ' + data.length;
        }

        lightboxEl.classList.add('active');
        document.body.style.overflow = 'hidden';
        isLightboxOpen = true;

        // Focus close button
        var closeBtn = document.getElementById('lightboxClose');
        if (closeBtn) {
            setTimeout(function () { closeBtn.focus(); }, 100);
        }
    }

    // =========================================
    // CLOSE LIGHTBOX
    // =========================================
    function closeLightbox() {
        if (!lightboxEl) return;
        lightboxEl.classList.remove('active');
        document.body.style.overflow = '';
        isLightboxOpen = false;

        // Return focus
        if (lastFocusedItem) {
            lastFocusedItem.focus();
            lastFocusedItem = null;
        }
    }

    // =========================================
    // TOUCH SWIPE SUPPORT
    // =========================================
    function addSwipeSupport(el, callback) {
        if (!el) return;

        var startX = 0;
        var startY = 0;
        var threshold = 50;

        el.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        el.addEventListener('touchend', function (e) {
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            var diffX = startX - endX;
            var diffY = startY - endY;

            // Only horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) &&
                Math.abs(diffX) > threshold) {
                callback(diffX > 0 ? 'left' : 'right');
            }
        }, { passive: true });
    }

})(); // IIFE