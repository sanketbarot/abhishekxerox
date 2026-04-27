// ========================================
// ABOUT PAGE JS - about.js
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

    // ===== PRO INTRO ANIMATION =====
    const proContent = document.querySelector('.pro-intro-content');
    const proFeatures = document.querySelectorAll('.pro-feature');

    if (proContent) {
        proContent.style.opacity = '0';
        proContent.style.transform = 'translateX(-50px)';
        proContent.style.transition = 'all 0.7s ease';

        const proObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateX(0)';
                        proObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

        proObserver.observe(proContent);
    }

    proFeatures.forEach(function (feat) {
        feat.style.opacity = '0';
        feat.style.transform = 'translateX(40px)';
        feat.style.transition = 'all 0.5s ease';
    });

    const featObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateX(0)';
                    }, index * 100);
                    featObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    proFeatures.forEach(function (feat) {
        featObserver.observe(feat);
    });

    // ===== WELCOME SECTION ANIMATION =====
    const welcomeContent = document.querySelector('.welcome-content');
    const welcomeImg = document.querySelector('.welcome-img');

    if (welcomeContent) {
        welcomeContent.style.opacity = '0';
        welcomeContent.style.transform = 'translateX(-50px)';
        welcomeContent.style.transition = 'all 0.7s ease';
    }

    if (welcomeImg) {
        welcomeImg.style.opacity = '0';
        welcomeImg.style.transform = 'translateX(50px)';
        welcomeImg.style.transition = 'all 0.7s ease';
    }

    const welcomeObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    if (welcomeContent) {
                        welcomeContent.style.opacity = '1';
                        welcomeContent.style.transform =
                            'translateX(0)';
                    }
                    if (welcomeImg) {
                        welcomeImg.style.opacity = '1';
                        welcomeImg.style.transform =
                            'translateX(0)';
                    }
                    welcomeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

    if (welcomeContent) welcomeObserver.observe(welcomeContent);

    // ===== WELCOME FEATURES ANIMATION =====
    const welcomeFeats = document.querySelectorAll('.welcome-feat');
    welcomeFeats.forEach(function (feat) {
        feat.style.opacity = '0';
        feat.style.transform = 'translateX(-20px)';
        feat.style.transition = 'all 0.4s ease';
    });

    const wfObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateX(0)';
                    }, index * 100);
                    wfObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    welcomeFeats.forEach(function (feat) {
        wfObserver.observe(feat);
    });

    // ===== WHO WE ARE ANIMATION =====
    const whoImg = document.querySelector('.who-img');
    const whoContent = document.querySelector('.who-content');

    if (whoImg) {
        whoImg.style.opacity = '0';
        whoImg.style.transform = 'translateX(-60px)';
        whoImg.style.transition = 'all 0.7s ease';
    }

    if (whoContent) {
        whoContent.style.opacity = '0';
        whoContent.style.transform = 'translateX(60px)';
        whoContent.style.transition = 'all 0.7s ease';
    }

    const whoObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    if (whoImg) {
                        whoImg.style.opacity = '1';
                        whoImg.style.transform = 'translateX(0)';
                    }
                    if (whoContent) {
                        whoContent.style.opacity = '1';
                        whoContent.style.transform = 'translateX(0)';
                    }
                    whoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

    if (whoImg) whoObserver.observe(whoImg);

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.counter');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    // ===== SHOP INFO ANIMATION =====
    const shopItems = document.querySelectorAll('.shop-info-item');
    shopItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });

    const shopObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 100);
                    shopObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    shopItems.forEach(function (item) {
        shopObserver.observe(item);
    });

    // ===== MV CARDS ANIMATION =====
    const mvCards = document.querySelectorAll('.mv-card');
    mvCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.5s ease';
    });

    const mvObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 150);
                    mvObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    mvCards.forEach(function (card) {
        mvObserver.observe(card);
    });

    // ===== OFFER ITEMS ANIMATION =====
    const offerItems = document.querySelectorAll('.offer-item');
    offerItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'all 0.4s ease';
        item.style.cursor = 'pointer';
        item.addEventListener('click', function () {
            window.location.href = 'services.html';
        });
    });

    const offerObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 60);
                    offerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    offerItems.forEach(function (item) {
        offerObserver.observe(item);
    });

    // ===== TEAM CARDS ANIMATION =====
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.5s ease';
    });

    const teamObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 150);
                    teamObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    teamCards.forEach(function (card) {
        teamObserver.observe(card);
    });

    // ===== TESTIMONIAL CARDS ANIMATION =====
    const testimonialCards = document.querySelectorAll(
        '.testimonial-card'
    );
    testimonialCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
    });

    const testimonialObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 150);
                    testimonialObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    testimonialCards.forEach(function (card) {
        testimonialObserver.observe(card);
    });

    // ===== HIGHLIGHT ITEMS ANIMATION =====
    const highlights = document.querySelectorAll('.highlight-item');
    highlights.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.4s ease';
    });

    const highlightObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateX(0)';
                    }, index * 100);
                    highlightObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    highlights.forEach(function (item) {
        highlightObserver.observe(item);
    });

    // ===== WHY LIST ANIMATION =====
    const whyItems = document.querySelectorAll('.why-list-item');
    whyItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.5s ease';
    });

    const whyObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateX(0)';
                    }, index * 100);
                    whyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    whyItems.forEach(function (item) {
        whyObserver.observe(item);
    });

    // ===== STAT ITEMS ANIMATION =====
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });

    const statObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 100);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

    statItems.forEach(function (item) {
        statObserver.observe(item);
    });

    // ===== PLAY BUTTON =====
    const playBtn = document.querySelector('.welcome-play');
    if (playBtn) {
        playBtn.addEventListener('click', function () {
            alert('📹 Video coming soon! Visit our shop at Vejalpur, Ahmedabad.');
        });
    }

    console.log('✅ About Page - Abhishek Xerox Vejalpur!');

});

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const parent = element.closest('.stat-item');
    const label = parent ?
        parent.querySelector('p').textContent : '';
    let count = 0;
    const duration = 2000;
    const steps = 60;
    const increment = Math.ceil(target / steps);

    const timer = setInterval(function () {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(timer);
        }
        if (label.includes('%')) {
            element.textContent = count + '%';
        } else {
            element.textContent = count.toLocaleString() + '+';
        }
    }, duration / steps);
}