// ========================================
// PRODUCTS PAGE JS - products.js
// Abhishek Xerox - Vejalpur, Ahmedabad
// ========================================

// ✅ Product Data
const productData = {
    'Stationery Print': {
        icon: '🖊️',
        desc: 'High quality stationery printing including letterheads, envelopes, notepads, business forms and all office stationery. Custom designs available at best prices in Vejalpur, Ahmedabad.'
    },
    'Branding': {
        icon: '🏷️',
        desc: 'Complete branding solutions including logo design, brand identity, business cards, letterheads and all marketing materials. We help your business stand out from the crowd.'
    },
    'Events': {
        icon: '🎪',
        desc: 'Complete event printing solutions including banners, backdrops, invitations, programs, certificates and all event related printing for your special occasions in Ahmedabad.'
    },
    'Photos Print': {
        icon: '📷',
        desc: 'High quality photo printing on premium photo paper. Available in passport size, stamp size, 4R, 5R, A4 and all custom sizes. Best color accuracy guaranteed.'
    },
    'Sticker Print': {
        icon: '🏷️',
        desc: 'Custom sticker printing for all purposes. Available in various shapes, sizes and materials including vinyl, paper and waterproof stickers. Bulk orders welcome.'
    },
    'Pharma Prints': {
        icon: '💊',
        desc: 'Specialized pharmaceutical printing for medicine labels, prescription pads, packaging inserts, medical forms and all healthcare related printing needs in Ahmedabad.'
    },
    'Personalized Items': {
        icon: '🎁',
        desc: 'Custom personalized gifts and items with names, photos and messages. Perfect for birthdays, anniversaries and special occasions. Unique gifts at affordable prices.'
    },
    'Exhibition Print': {
        icon: '🖼️',
        desc: 'Large format exhibition prints for trade shows, galleries and events. Printed on high quality paper or canvas in various sizes including A0, A1, A2 and custom sizes.'
    },
    'Plan Xerox': {
        icon: '📐',
        desc: 'Wide format color and black & white printing for architectural, engineering and construction plans. We print and scan sizes A0, A1, A2, A3 and custom sizes.'
    },
    'Packaging': {
        icon: '📦',
        desc: 'Custom packaging printing for products including boxes, labels, bags and wrapping materials. Perfect for product branding and marketing needs of all businesses.'
    },
    'Restaurants': {
        icon: '🍽️',
        desc: 'Complete restaurant printing solutions including menus, table cards, bill books, takeaway bags, loyalty cards and all restaurant related printing materials.'
    },
    'Lamination': {
        icon: '🗂️',
        desc: 'Professional lamination services for documents, certificates, ID cards, photos and all important papers. Available in glossy and matte finish at all sizes.'
    }
};

document.addEventListener('DOMContentLoaded', function () {

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

    // ===== FILTER TABS =====
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');

    filterTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            // Active tab
            filterTabs.forEach(function (t) {
                t.classList.remove('active');
            });
            this.classList.add('active');

            // Filter products
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });

    function filterProducts(filter) {
        productCards.forEach(function (card) {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                card.style.transition = 'all 0.4s ease';

                setTimeout(function () {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                card.style.transition = 'all 0.3s ease';

                setTimeout(function () {
                    card.classList.add('hidden');
                }, 300);
            }
        });
    }

    // ===== PRODUCT CARDS ANIMATION =====
    productCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.5s ease';
    });

    const cardObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 80);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    productCards.forEach(function (card) {
        cardObserver.observe(card);
    });

    // ===== PRODUCT CARD CLICK - MODAL =====
    productCards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            // Don't open modal if clicking buttons
            if (e.target.tagName === 'A' ||
                e.target.closest('a')) {
                return;
            }
            const title = this.querySelector('h3').textContent;
            openModal(title);
        });
    });

    // ===== MODAL =====
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');

    function openModal(title) {
        const data = productData[title];
        if (!data) return;

        document.getElementById('modalIcon').textContent =
            data.icon;
        document.getElementById('modalTitle').textContent =
            title;
        document.getElementById('modalDesc').textContent =
            data.desc;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    // ===== WHY CARDS ANIMATION =====
    const whyCards = document.querySelectorAll('.why-product-card');
    whyCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
    });

    const whyObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 120);
                    whyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    whyCards.forEach(function (card) {
        whyObserver.observe(card);
    });

    // ===== FILTER TABS ANIMATION =====
    filterTabs.forEach(function (tab, index) {
        tab.style.opacity = '0';
        tab.style.transform = 'translateY(15px)';
        tab.style.transition = 'all 0.4s ease';
        setTimeout(function () {
            tab.style.opacity = '1';
            tab.style.transform = 'translateY(0)';
        }, index * 80);
    });

    console.log('✅ Products Page - Abhishek Xerox!');

});