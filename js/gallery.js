// ========================================
// GALLERY PAGE JS - gallery.js
// Abhishek Xerox - Liquid Glass Only
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
            bg: 'rgba(37, 99, 235, 0.06)',
            category: 'shop'
        },
        {
            emoji: '🖨️',
            title: 'Printing Machine',
            desc: 'High Quality Color Printer',
            bg: 'rgba(16, 185, 129, 0.06)',
            category: 'printing'
        },
        {
            emoji: '📄',
            title: 'Document Scanning',
            desc: 'Fast & Accurate Scanning',
            bg: 'rgba(99, 102, 241, 0.06)',
            category: 'scanning'
        },
        {
            emoji: '🗂️',
            title: 'Lamination Work',
            desc: 'Glossy & Matte Lamination',
            bg: 'rgba(239, 68, 68, 0.06)',
            category: 'lamination'
        },
        {
            emoji: '📚',
            title: 'Book Binding',
            desc: 'Spiral Binding Work',
            bg: 'rgba(168, 85, 247, 0.06)',
            category: 'binding'
        },
        {
            emoji: '🖥️',
            title: 'Computer Section',
            desc: 'Typing & Digital Work',
            bg: 'rgba(245, 158, 11, 0.06)',
            category: 'shop'
        },
        {
            emoji: '🎨',
            title: 'Color Printing',
            desc: 'High Quality Color Output',
            bg: 'rgba(6, 182, 212, 0.07)',
            category: 'printing'
        },
        {
            emoji: '🔍',
            title: 'Photo Scanning',
            desc: 'High Resolution Scanning',
            bg: 'rgba(16, 185, 129, 0.07)',
            category: 'scanning'
        },
        {
            emoji: '💳',
            title: 'ID Card Lamination',
            desc: 'Professional Card Lamination',
            bg: 'rgba(249, 115, 22, 0.06)',
            category: 'lamination'
        },
        {
            emoji: '📖',
            title: 'Hard Binding',
            desc: 'Premium Hard Binding',
            bg: 'rgba(99, 102, 241, 0.07)',
            category: 'binding'
        },
        {
            emoji: '🖼️',
            title: 'Photo Printing',
            desc: 'Passport & Custom Photos',
            bg: 'rgba(37, 99, 235, 0.07)',
            category: 'shop'
        },
        {
            emoji: '📮',
            title: 'Visiting Cards',
            desc: 'Professional Business Cards',
            bg: 'rgba(6, 182, 212, 0.07)',
            category: 'printing'
        }
    ];

    var currentIndex    = 0;
    var lightboxEl      = null;
    var isLightboxOpen  = false;
    var lastFocusedItem = null;

    // =========================================
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        lightboxEl = document.getElementById('lightbox');

        var lightboxImg     = document.getElementById('lightboxImg');
        var lightboxTitle   = document.getElementById('lightboxTitle');
        var lightboxDesc    = document.getElementById('lightboxDesc');
        var lightboxClose   = document.getElementById('lightboxClose');
        var lightboxOverlay = document.getElementById('lightboxOverlay');
        var lightboxCounter = document.getElementById('lightboxCounter');
        var prevBtn         = document.getElementById('prevBtn');
        var nextBtn         = document.getElementById('nextBtn');

        var filterBtns   = document.querySelectorAll('.filter-btn');
        var galleryItems = document.querySelectorAll('.gallery-item');

        // ===== PAGE BANNER =====
        var banner = document.querySelector('.page-banner');
        if (banner) {
            banner.style.opacity    = '0';
            banner.style.transform  = 'translateY(-16px)';
            banner.style.transition =
                'opacity 0.55s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.55s cubic-bezier(0.4,0,0.2,1)';

            setTimeout(function () {
                banner.style.opacity   = '1';
                banner.style.transform = 'translateY(0)';
            }, 80);
        }

        // ===== FILTER BTN ANIMATION =====
        filterBtns.forEach(function (btn, idx) {
            btn.style.opacity   = '0';
            btn.style.transform = 'translateY(14px)';
            btn.style.transition =
                'opacity 0.40s ease, transform 0.40s ease';

            setTimeout(function () {
                btn.style.opacity   = '1';
                btn.style.transform = 'translateY(0)';
            }, 80 + idx * 65);
        });

        // ===== GALLERY ITEMS ANIMATION =====
        galleryItems.forEach(function (item) {
            item.style.opacity   = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition =
                'opacity 0.55s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
            item.style.willChange = 'opacity, transform';
        });

        if ('IntersectionObserver' in window) {
            var galleryObs = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry, idx) {
                        if (!entry.isIntersecting) return;

                        setTimeout(function () {
                            entry.target.style.opacity   = '1';
                            entry.target.style.transform = 'translateY(0)';
                            setTimeout(function () {
                                entry.target.style.willChange = 'auto';
                            }, 600);
                        }, idx * 65);

                        galleryObs.unobserve(entry.target);
                    });
                },
                { threshold: 0.08 }
            );

            galleryItems.forEach(function (item) {
                galleryObs.observe(item);
            });
        } else {
            galleryItems.forEach(function (item) {
                item.style.opacity   = '1';
                item.style.transform = 'translateY(0)';
                item.style.willChange = 'auto';
            });
        }

        // ===== FILTER BUTTONS CLICK =====
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                filterGallery(
                    this.getAttribute('data-filter'),
                    galleryItems
                );
            });
        });

        // ===== GALLERY ITEM CLICK =====
        galleryItems.forEach(function (item, idx) {
            item.addEventListener('click', function () {
                lastFocusedItem = item;
                currentIndex    = idx;
                openLightbox(currentIndex);
            });

            item.addEventListener('keydown', function (e) {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                lastFocusedItem = item;
                currentIndex    = idx;
                openLightbox(currentIndex);
            });
        });

        // ===== LIGHTBOX CLOSE =====
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        if (lightboxOverlay) {
            lightboxOverlay.addEventListener('click', closeLightbox);
        }

        // ===== NAV PREV / NEXT =====
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                currentIndex =
                    (currentIndex - 1 + galleryData.length) %
                    galleryData.length;
                openLightbox(currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                currentIndex =
                    (currentIndex + 1) % galleryData.length;
                openLightbox(currentIndex);
            });
        }

        // ===== KEYBOARD NAVIGATION =====
        document.addEventListener('keydown', function (e) {
            if (!isLightboxOpen) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    currentIndex =
                        (currentIndex - 1 + galleryData.length) %
                        galleryData.length;
                    openLightbox(currentIndex);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    currentIndex =
                        (currentIndex + 1) % galleryData.length;
                    openLightbox(currentIndex);
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
            }
        });

        // ===== TOUCH SWIPE =====
        addSwipeSupport(lightboxEl, function (dir) {
            if (!isLightboxOpen) return;

            currentIndex = dir === 'left'
                ? (currentIndex + 1) % galleryData.length
                : (currentIndex - 1 + galleryData.length) %
                    galleryData.length;

            openLightbox(currentIndex);
        });

        // ===== LOG =====
        console.log(
            '%c🫧 Gallery Page | Liquid Glass Ready!',
            'color:#2563EB;background:#F8FAFC;' +
            'padding:6px 14px;border-radius:8px;' +
            'font-weight:bold;border-left:3px solid #06B6D4;'
        );

        // =========================================
        // INTERNAL FUNCTIONS
        // =========================================

        function openLightbox(index) {
            if (!lightboxEl || !galleryData[index]) return;

            var item = galleryData[index];

            if (lightboxImg) {
                lightboxImg.style.background = item.bg;
                lightboxImg.innerHTML =
                    '<span style="font-size:95px;' +
                    'line-height:1;position:relative;z-index:1;">' +
                    item.emoji + '</span>';
            }

            if (lightboxTitle) lightboxTitle.textContent = item.title;
            if (lightboxDesc)  lightboxDesc.textContent  = item.desc;

            if (lightboxCounter) {
                lightboxCounter.textContent =
                    (index + 1) + ' / ' + galleryData.length;
            }

            lightboxEl.classList.add('active');
            document.body.style.overflow = 'hidden';
            isLightboxOpen = true;

            if (lightboxClose) {
                setTimeout(function () {
                    lightboxClose.focus();
                }, 100);
            }
        }

        function closeLightbox() {
            if (!lightboxEl) return;
            lightboxEl.classList.remove('active');
            document.body.style.overflow = '';
            isLightboxOpen = false;

            if (lastFocusedItem) {
                lastFocusedItem.focus();
                lastFocusedItem = null;
            }
        }

    }); // END DOMContentLoaded

    // =========================================
    // FILTER GALLERY
    // =========================================
    function filterGallery(filter, items) {
        var visibleCount = 0;

        items.forEach(function (item) {
            var cat     = item.getAttribute('data-category');
            var isMatch = filter === 'all' || cat === filter;

            if (isMatch) {
                item.classList.remove('hidden');
                item.style.opacity   = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'none';
                visibleCount++;

                var idx = visibleCount;
                requestAnimationFrame(function () {
                    setTimeout(function () {
                        item.style.transition =
                            'opacity 0.40s cubic-bezier(0.4,0,0.2,1),' +
                            'transform 0.40s cubic-bezier(0.4,0,0.2,1)';
                        item.style.opacity   = '1';
                        item.style.transform = 'translateY(0)';
                    }, idx * 50);
                });
            } else {
                item.style.transition =
                    'opacity 0.22s ease, transform 0.22s ease';
                item.style.opacity   = '0';
                item.style.transform = 'scale(0.94)';

                setTimeout(function () {
                    item.classList.add('hidden');
                }, 250);
            }
        });

        var noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.classList.toggle('show', visibleCount === 0);
        }
    }

    // =========================================
    // TOUCH SWIPE SUPPORT
    // =========================================
    function addSwipeSupport(el, callback) {
        if (!el) return;

        var startX    = 0;
        var startY    = 0;
        var threshold = 50;

        el.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        el.addEventListener('touchend', function (e) {
            var endX  = e.changedTouches[0].clientX;
            var endY  = e.changedTouches[0].clientY;
            var diffX = startX - endX;
            var diffY = startY - endY;

            if (Math.abs(diffX) > Math.abs(diffY) &&
                Math.abs(diffX) > threshold) {
                callback(diffX > 0 ? 'left' : 'right');
            }
        }, { passive: true });
    }

})(); // IIFE END