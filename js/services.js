// ========================================
// SERVICES PAGE JS - services.js
// Abhishek Xerox - Vejalpur, Ahmedabad
// ========================================

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

    // ===== INTRO ANIMATION =====
    const introContent = document.querySelector('.intro-content');
    if (introContent) {
        introContent.style.opacity = '0';
        introContent.style.transform = 'translateY(30px)';
        introContent.style.transition = 'all 0.7s ease';

        const introObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                        introObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

        introObserver.observe(introContent);
    }

    // ===== INTRO STATS ANIMATION =====
    const introStats = document.querySelectorAll('.intro-stat');
    introStats.forEach(function (stat) {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.5s ease';
    });

    const statsObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 100);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

    introStats.forEach(function (stat) {
        statsObserver.observe(stat);
    });

    // ===== SERVICE ITEMS ANIMATION =====
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const serviceObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 150);
                    serviceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

    serviceItems.forEach(function (item) {
        serviceObserver.observe(item);
    });

    // ===== ALL SERVICE CARDS ANIMATION =====
    const allServiceCards = document.querySelectorAll(
        '.all-service-card'
    );
    allServiceCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const allCardObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 80);
                    allCardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    allServiceCards.forEach(function (card) {
        allCardObserver.observe(card);
        card.addEventListener('click', function () {
            window.location.href = 'contact.html';
        });
    });

    // ===== MORE CARDS ANIMATION =====
    const moreCards = document.querySelectorAll('.more-card');
    moreCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const moreObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 100);
                    moreObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    moreCards.forEach(function (card) {
        moreObserver.observe(card);
        card.addEventListener('click', function () {
            window.location.href = 'contact.html';
        });
    });

    // ===== WHY BOXES ANIMATION =====
    const whyBoxes = document.querySelectorAll('.why-box');
    whyBoxes.forEach(function (box) {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const whyObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 150);
                    whyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    whyBoxes.forEach(function (box) {
        whyObserver.observe(box);
    });

    // ===== SERVICE ICON HOVER =====
    const iconBoxes = document.querySelectorAll('.service-icon-box');
    iconBoxes.forEach(function (icon) {
        icon.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.12) rotate(6deg)';
            this.style.transition = 'all 0.3s ease';
        });
        icon.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ===== SERVICE TAGS CLICK =====
    const tags = document.querySelectorAll('.service-tags span');
    tags.forEach(function (tag) {
        tag.addEventListener('click', function () {
            this.style.background = '#FFD700';
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'all 0.2s ease';
            setTimeout(function () {
                tag.style.background = '';
                tag.style.transform = '';
            }, 400);
        });
    });

    // ===== NAVBAR SCROLL =====
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow =
                    '0 2px 20px rgba(255,215,0,0.25)';
            } else {
                navbar.style.boxShadow =
                    '0 2px 15px rgba(0,0,0,0.3)';
            }
        }
    });

    console.log('✅ Services Page Loaded - Abhishek Xerox!');

});