// ========================================
// COMMON JS - NAVBAR + FOOTER
// Abhishek Xerox - Liquid Glass Only
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // =========================================
    // HAMBURGER MENU
    // =========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.contains('active')
                ? closeMenu()
                : openMenu();
        });

        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) &&
                !navLinks.contains(e.target)) {
                closeMenu();
            }
        });

        navLinks.addEventListener('click',
            function (e) { e.stopPropagation(); }
        );
    }

    function openMenu() {
        if (!navLinks || !hamburger) return;
        navLinks.classList.add('active');
        hamburger.classList.add('open');
        animateHamburger(true);
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!navLinks || !hamburger) return;
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
        animateHamburger(false);
        document.body.style.overflow = '';
    }

    function animateHamburger(isOpen) {
        if (!hamburger) return;
        const spans = hamburger.querySelectorAll('span');
        if (!spans || spans.length < 3) return;

        if (isOpen) {
            spans[0].style.transform =
                'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity   = '0';
            spans[1].style.transform = 'scaleX(0)';
            spans[2].style.transform =
                'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity   = '1';
            spans[1].style.transform = 'none';
            spans[2].style.transform = 'none';
        }
    }

    // =========================================
    // NAV LINK CLICK → CLOSE
    // =========================================
    document.querySelectorAll('.nav-links li a')
        .forEach(function (item) {
            item.addEventListener('click', closeMenu);
        });

    // =========================================
    // ACTIVE NAV LINK
    // =========================================
    function setActiveNavLink() {
        const currentPage =
            window.location.pathname.split('/').pop()
            || 'index.html';

        document.querySelectorAll('.nav-links li a')
            .forEach(function (link) {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (!href) return;
                if (
                    href === currentPage ||
                    (currentPage === '' && href === 'index.html') ||
                    (currentPage === '/' && href === 'index.html')
                ) {
                    link.classList.add('active');
                }
            });
    }
    setActiveNavLink();

    // =========================================
    // KEYBOARD ACCESSIBILITY
    // =========================================
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();

        if (e.key === 'Tab' && navLinks &&
            navLinks.classList.contains('active')) {
            const focusable = navLinks.querySelectorAll('a');
            const first = focusable[0];
            const last  = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });

    // =========================================
    // NAVBAR SCROLL - Liquid Intensify
    // =========================================
    const navbar = document.querySelector('.navbar');

    function handleNavbarScroll() {
        if (!navbar) return;

        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow =
                '0 10px 35px rgba(15,23,42,0.10),' +
                'inset 0 1px 0 rgba(255,255,255,0.92),' +
                'inset 0 -1px 0 rgba(255,255,255,0.35)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow =
                '0 8px 30px rgba(15,23,42,0.08),' +
                'inset 0 1px 0 rgba(255,255,255,0.90),' +
                'inset 0 -1px 0 rgba(255,255,255,0.35)';
        }
    }

    window.addEventListener('scroll', handleNavbarScroll,
        { passive: true });

    // =========================================
    // SCROLL TO TOP
    // =========================================
    const scrollBtn = document.getElementById('scrollTop');

    if (scrollBtn) {
        window.addEventListener('scroll', function () {
            scrollBtn.style.display =
                window.scrollY > 350 ? 'flex' : 'none';
        }, { passive: true });

        scrollBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================
    // SMOOTH SCROLL - ANCHOR LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]')
        .forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarH =
                        navbar ? navbar.offsetHeight : 70;
                    const top =
                        target.getBoundingClientRect().top +
                        window.scrollY - navbarH - 10;

                    window.scrollTo({
                        top: top,
                        behavior: 'smooth'
                    });
                }
            });
        });

    // =========================================
    // RESIZE HANDLER
    // =========================================
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 768) closeMenu();
        }, 200);
    });

    // =========================================
    // LIQUID GLASS SPOTLIGHT HOVER
    // =========================================
    function initLiquidSpotlight() {
        const cards = document.querySelectorAll(
            '.service-card, .why-card, .stat-item, ' +
            '.testimonial-card'
        );

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.background = `
                    radial-gradient(
                        280px circle at ${x}px ${y}px,
                        rgba(37, 99, 235, 0.07),
                        rgba(6, 182, 212, 0.04) 25%,
                        transparent 50%
                    ),
                    rgba(255, 255, 255, 0.60)
                `;
            });

            card.addEventListener('mouseleave', function () {
                card.style.background = '';
            });
        });
    }
    initLiquidSpotlight();

    // =========================================
    // SCROLL REVEAL
    // =========================================
    if ('IntersectionObserver' in window) {

        const fadeEls = document.querySelectorAll('.fade-in');

        if (fadeEls.length > 0) {
            const fadeObs = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform =
                                'translateY(0)';
                            fadeObs.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            fadeEls.forEach(function (el) {
                el.style.opacity    = '0';
                el.style.transform  = 'translateY(25px)';
                el.style.transition =
                    'opacity 0.7s ease, transform 0.7s ease';
                fadeObs.observe(el);
            });
        }

        // Auto reveal
        const autoReveal = document.querySelectorAll(
            '.service-card, .why-card, .stat-item, ' +
            '.testimonial-card, .section-title, ' +
            '.section-subtitle, .footer-col'
        );

        let delay = 0;

        const revealObs = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setTimeout(function () {
                            entry.target.style.opacity   = '1';
                            entry.target.style.transform =
                                'translateY(0)';
                        }, delay);
                        delay += 80;
                        if (delay > 400) delay = 0;
                        revealObs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        autoReveal.forEach(function (el) {
            el.style.opacity    = '0';
            el.style.transform  = 'translateY(35px)';
            el.style.transition =
                'opacity 0.75s cubic-bezier(0.4,0,0.2,1), ' +
                'transform 0.75s cubic-bezier(0.4,0,0.2,1)';
            revealObs.observe(el);
        });
    }

    // =========================================
    // LAZY LOADING IMAGES
    // =========================================
    if ('IntersectionObserver' in window) {
        const lazyImgs =
            document.querySelectorAll('img[data-src]');

        if (lazyImgs.length > 0) {
            const imgObs = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src =
                                img.getAttribute('data-src');
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                            imgObs.unobserve(img);
                        }
                    });
                },
                { rootMargin: '50px 0px' }
            );

            lazyImgs.forEach(function (img) {
                imgObs.observe(img);
            });
        }
    }

    // =========================================
    // SHOW MESSAGE / TOAST - Liquid Glass
    // =========================================
    window.showMessage = function (text, type, duration) {

        document.querySelectorAll(
            '.success-message, .success-popup'
        ).forEach(function (el) { el.remove(); });

        const msgType     = type     || 'success';
        const msgDuration = duration || 4000;

        const colors = {
            success: {
                bg: 'rgba(255,255,255,0.88)',
                text: '#2563EB',
                border: '#2563EB'
            },
            error: {
                bg: 'rgba(255,240,240,0.88)',
                text: '#DC2626',
                border: '#DC2626'
            },
            warning: {
                bg: 'rgba(255,250,235,0.88)',
                text: '#D97706',
                border: '#D97706'
            },
            info: {
                bg: 'rgba(240,249,255,0.88)',
                text: '#06B6D4',
                border: '#06B6D4'
            }
        };

        const color = colors[msgType] || colors.success;

        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.setAttribute('role', 'alert');
        msg.setAttribute('aria-live', 'polite');
        msg.textContent = text;

        msg.style.cssText = [
            'position:fixed',
            'top:85px',
            'right:20px',
            'background:' + color.bg,
            'backdrop-filter:blur(22px) saturate(180%)',
            '-webkit-backdrop-filter:blur(22px) saturate(180%)',
            'color:' + color.text,
            'padding:15px 22px',
            'border-radius:16px',
            'font-size:14px',
            'font-weight:600',
            'z-index:9999',
            'box-shadow:0 10px 30px rgba(15,23,42,0.08),' +
                'inset 0 1px 0 rgba(255,255,255,0.80)',
            'border-left:3px solid ' + color.border,
            'border:1px solid rgba(255,255,255,0.60)',
            'border-left:3px solid ' + color.border,
            'max-width:360px',
            'width:calc(100% - 40px)',
            'line-height:1.5',
            'animation:slideInRight 0.4s ease forwards',
            'cursor:pointer',
            'transition:all 0.4s ease'
        ].join(';');

        msg.addEventListener('click', function () {
            dismissMsg(msg);
        });

        document.body.appendChild(msg);

        const timer = setTimeout(function () {
            dismissMsg(msg);
        }, msgDuration);

        msg._timer = timer;
    };

    function dismissMsg(msg) {
        if (!msg || !msg.parentNode) return;
        if (msg._timer) clearTimeout(msg._timer);
        msg.style.opacity   = '0';
        msg.style.transform = 'translateX(120px)';
        setTimeout(function () {
            if (msg.parentNode) msg.remove();
        }, 400);
    }

    // =========================================
    // WHATSAPP FLOAT - Tooltip
    // =========================================
    const waFloat = document.querySelector('.whatsapp-float');

    if (waFloat) {
        waFloat.setAttribute('title', 'Chat on WhatsApp');

        waFloat.addEventListener('mouseenter', function () {
            if (document.querySelector('.wa-tooltip')) return;

            const tip = document.createElement('span');
            tip.className   = 'wa-tooltip';
            tip.textContent = 'Chat with us!';
            tip.style.cssText = [
                'position:absolute',
                'right:68px',
                'top:50%',
                'transform:translateY(-50%)',
                'background:rgba(255,255,255,0.88)',
                'backdrop-filter:blur(18px) saturate(180%)',
                '-webkit-backdrop-filter:blur(18px) saturate(180%)',
                'color:#2563EB',
                'padding:7px 14px',
                'border-radius:12px',
                'border:1px solid rgba(255,255,255,0.70)',
                'font-size:12px',
                'font-weight:600',
                'white-space:nowrap',
                'pointer-events:none',
                'box-shadow:0 6px 18px rgba(15,23,42,0.08),' +
                    'inset 0 1px 0 rgba(255,255,255,0.80)',
                'animation:fadeIn 0.2s ease'
            ].join(';');

            this.style.position = 'fixed';
            this.appendChild(tip);
        });

        waFloat.addEventListener('mouseleave', function () {
            const tip = this.querySelector('.wa-tooltip');
            if (tip) tip.remove();
        });
    }

    // =========================================
    // LIQUID CURSOR TRAIL
    // =========================================
    let trailCount = 0;
    const maxTrail = 10;

    document.addEventListener('mousemove', function (e) {
        if (trailCount >= maxTrail) return;

        trailCount++;

        const dot = document.createElement('div');

        const trailColors = [
            'rgba(37, 99, 235, 0.35)',
            'rgba(6, 182, 212, 0.35)',
            'rgba(37, 99, 235, 0.25)',
            'rgba(6, 182, 212, 0.25)'
        ];

        const rndColor =
            trailColors[Math.floor(Math.random() * trailColors.length)];

        dot.style.cssText = [
            'position:fixed',
            'left:' + e.clientX + 'px',
            'top:' + e.clientY + 'px',
            'width:5px',
            'height:5px',
            'border-radius:50%',
            'background:' + rndColor,
            'pointer-events:none',
            'z-index:9998',
            'transform:translate(-50%,-50%)',
            'transition:all 0.8s ease'
        ].join(';');

        document.body.appendChild(dot);

        setTimeout(function () {
            dot.style.opacity   = '0';
            dot.style.transform =
                'translate(-50%,-50%) scale(0)';
        }, 60);

        setTimeout(function () {
            dot.remove();
            trailCount--;
        }, 860);
    });

    // =========================================
    // DETECT TOUCH DEVICE
    // =========================================
    if ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }

    // =========================================
    // CONSOLE LOG
    // =========================================
    console.log(
        '%c✅ Abhishek Xerox | Liquid Glass UI Loaded!',
        'color:#2563EB;background:#F8FAFC;' +
        'padding:6px 14px;border-radius:6px;' +
        'font-weight:bold;border-left:3px solid #2563EB;'
    );

}); // END DOMContentLoaded