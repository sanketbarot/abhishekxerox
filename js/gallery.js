// ========================================
// GALLERY PAGE JS - gallery.js
// Yellow Theme
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ===== GALLERY DATA =====
    const galleryData = [
        { emoji: '🏪', title: 'Our Shop', desc: 'Front View', bg: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)', category: 'shop' },
        { emoji: '🖨️', title: 'Printing Machine', desc: 'Color Printer', bg: 'linear-gradient(135deg, #1a3a1a, #2d5a2d)', category: 'printing' },
        { emoji: '📄', title: 'Document Scanning', desc: 'Fast Scanning', bg: 'linear-gradient(135deg, #1a1a3a, #2d2d5a)', category: 'scanning' },
        { emoji: '🗂️', title: 'Lamination Work', desc: 'Glossy Lamination', bg: 'linear-gradient(135deg, #3a1a1a, #5a2d2d)', category: 'lamination' },
        { emoji: '📚', title: 'Book Binding', desc: 'Spiral Binding', bg: 'linear-gradient(135deg, #2a1a3a, #4a2d5a)', category: 'binding' },
        { emoji: '🖥️', title: 'Computer Section', desc: 'Typing Work', bg: 'linear-gradient(135deg, #3a3a1a, #5a5a2d)', category: 'shop' },
        { emoji: '🎨', title: 'Color Printing', desc: 'High Quality', bg: 'linear-gradient(135deg, #1a2a3a, #2d4a5a)', category: 'printing' },
        { emoji: '🔍', title: 'Photo Scanning', desc: 'High Resolution', bg: 'linear-gradient(135deg, #2a3a1a, #4a5a2d)', category: 'scanning' },
        { emoji: '💳', title: 'ID Card Lamination', desc: 'Card Lamination', bg: 'linear-gradient(135deg, #3a2a1a, #5a4a2d)', category: 'lamination' },
        { emoji: '📖', title: 'Hard Binding', desc: 'Premium Binding', bg: 'linear-gradient(135deg, #1a3a2a, #2d5a4a)', category: 'binding' },
        { emoji: '🖼️', title: 'Photo Printing', desc: 'Passport Photos', bg: 'linear-gradient(135deg, #2d1a1a, #4a2d2d)', category: 'shop' },
        { emoji: '📮', title: 'Visiting Cards', desc: 'Business Cards', bg: 'linear-gradient(135deg, #1a1a2d, #2d2d4a)', category: 'printing' },
    ];

    let currentIndex = 0;

    // ===== GALLERY ITEMS ANIMATION =====
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'all 0.4s ease';
    });

    const galleryObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 80);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    galleryItems.forEach(function (item) {
        galleryObserver.observe(item);
    });

    // ===== FILTER BUTTONS =====
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {

            // Remove active from all
            filterBtns.forEach(function (b) {
                b.classList.remove('active');
            });

            // Add active to clicked
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterGallery(filter);
        });
    });

    // ===== FILTER GALLERY FUNCTION =====
    function filterGallery(filter) {
        const items = document.querySelectorAll('.gallery-item');

        items.forEach(function (item) {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';

                setTimeout(function () {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.transition = 'all 0.4s ease';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                item.style.transition = 'all 0.3s ease';

                setTimeout(function () {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Open Lightbox
    const galleryItemsAll = document.querySelectorAll('.gallery-item');
    galleryItemsAll.forEach(function (item, index) {
        item.addEventListener('click', function () {
            currentIndex = index;
            openLightbox(currentIndex);
        });
    });

    function openLightbox(index) {
        const data = galleryData[index];
        lightboxImg.style.background = data.bg;
        lightboxImg.innerHTML = '<span style="font-size:100px">' + data.emoji + '</span>';
        lightboxTitle.textContent = data.title;
        lightboxDesc.textContent = data.desc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close Lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }

    // Previous Button
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
            openLightbox(currentIndex);
        });
    }

    // Next Button
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % galleryData.length;
            openLightbox(currentIndex);
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', function (e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
                openLightbox(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryData.length;
                openLightbox(currentIndex);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });

    // ===== PAGE BANNER ANIMATION =====
    const pageBanner = document.querySelector('.page-banner');
    if (pageBanner) {
        pageBanner.style.opacity = '0';
        pageBanner.style.transform = 'translateY(-20px)';
        pageBanner.style.transition = 'all 0.6s ease';
        setTimeout(function () {
            pageBanner.style.opacity = '1';
            pageBanner.style.transform = 'translateY(0)';
        }, 100);
    }

    // ===== FILTER BUTTONS ANIMATION =====
    filterBtns.forEach(function (btn, index) {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        btn.style.transition = 'all 0.4s ease';
        setTimeout(function () {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, index * 100);
    });

    console.log('✅ Gallery Page Loaded!');

});