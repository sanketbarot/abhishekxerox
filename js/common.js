// ========================================
// COMMON JS - NAVBAR + FOOTER
// Abhishek Xerox - Vejalpur, Ahmedabad
// Version: 2.0 - Enhanced & Fixed
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // =========================================
    // HAMBURGER MENU
    // =========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {

        // Toggle menu on click
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = navLinks.classList.contains('active');

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu on outside click
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) &&
                !navLinks.contains(e.target)) {
                closeMenu();
            }
        });

        // Prevent menu close when clicking inside
        navLinks.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // ✅ Open Menu
    function openMenu() {
        if (!navLinks || !hamburger) return;
        navLinks.classList.add('active');
        hamburger.classList.add('open');
        animateHamburger(true);
        document.body.style.overflow = '';
    }

    // ✅ Close Menu
    function closeMenu() {
        if (!navLinks || !hamburger) return;
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
        animateHamburger(false);
    }

    // ✅ Hamburger Animation
    function animateHamburger(isOpen) {
        if (!hamburger) return;
        const spans = hamburger.querySelectorAll('span');
        if (!spans || spans.length < 3) return;

        if (isOpen) {
            spans[0].style.transform =
                'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[1].style.transform = 'scaleX(0)';
            spans[2].style.transform =
                'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[1].style.transform = 'none';
            spans[2].style.transform = 'none';
        }
    }

    // =========================================
    // CLOSE MENU ON NAV LINK CLICK
    // =========================================
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(function (item) {
        item.addEventListener('click', function () {
            closeMenu();
        });
    });

    // =========================================
    // ACTIVE NAV LINK
    // =========================================
    function setActiveNavLink() {
        const currentPage =
            window.location.pathname.split('/').pop() ||
            'index.html';

        navItems.forEach(function (link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (!href) return;

            if (href === currentPage ||
                (currentPage === '' && href === 'index.html') ||
                (currentPage === '/' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // =========================================
    // KEYBOARD ACCESSIBILITY
    // =========================================
    document.addEventListener('keydown', function (e) {
        // Close menu on Escape
        if (e.key === 'Escape') {
            closeMenu();
        }

        // Tab trap prevention in mobile menu
        if (e.key === 'Tab' && navLinks &&
            navLinks.classList.contains('active')) {
            const focusableElements = navLinks.querySelectorAll('a');
            const firstElement = focusableElements[0];
            const lastElement =
                focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    // =========================================
    // NAVBAR SCROLL EFFECT
    // =========================================
    const navbar = document.querySelector('.navbar');

    function handleNavbarScroll() {
        if (!navbar) return;

        if (window.scrollY > 60) {
            navbar.style.boxShadow =
                '0 2px 20px rgba(255, 215, 0, 0.2)';
        } else {
            navbar.style.boxShadow =
                '0 2px 15px rgba(0, 0, 0, 0.3)';
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, {
        passive: true
    });

    // =========================================
    // SCROLL TO TOP BUTTON
    // =========================================
    const scrollBtn = document.getElementById('scrollTop');

    if (scrollBtn) {
        // Show/hide on scroll
        window.addEventListener('scroll', function () {
            if (window.scrollY > 350) {
                scrollBtn.style.display = 'flex';
            } else {
                scrollBtn.style.display = 'none';
            }
        }, { passive: true });

        // Scroll to top on click
        scrollBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(
        function (anchor) {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarHeight =
                        navbar ? navbar.offsetHeight : 70;
                    const targetTop =
                        target.getBoundingClientRect().top +
                        window.scrollY - navbarHeight - 10;

                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    );

    // =========================================
    // WINDOW RESIZE HANDLER
    // =========================================
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                closeMenu();
            }
        }, 200);
    });

    // =========================================
    // SHOW MESSAGE / TOAST FUNCTION
    // =========================================
    window.showMessage = function (text, type, duration) {
        // Remove existing messages
        const existing = document.querySelectorAll(
            '.success-message, .success-popup'
        );
        existing.forEach(function (el) { el.remove(); });

        const msgType = type || 'success';
        const msgDuration = duration || 4000;

        const colors = {
            success: {
                bg: '#1a1a1a',
                text: '#FFD700',
                border: '#FFD700'
            },
            error: {
                bg: '#c0392b',
                text: '#ffffff',
                border: '#e74c3c'
            },
            warning: {
                bg: '#e67e22',
                text: '#ffffff',
                border: '#f39c12'
            },
            info: {
                bg: '#2980b9',
                text: '#ffffff',
                border: '#3498db'
            }
        };

        const color = colors[msgType] || colors.success;

        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.setAttribute('role', 'alert');
        msg.setAttribute('aria-live', 'polite');
        msg.textContent = text;

        msg.style.cssText = [
            'position: fixed',
            'top: 85px',
            'right: 20px',
            'background: ' + color.bg,
            'color: ' + color.text,
            'padding: 15px 22px',
            'border-radius: 12px',
            'font-size: 14px',
            'font-weight: 600',
            'z-index: 9999',
            'box-shadow: 0 5px 25px rgba(0,0,0,0.25)',
            'border-left: 4px solid ' + color.border,
            'max-width: 360px',
            'width: calc(100% - 40px)',
            'line-height: 1.5',
            'animation: slideInRight 0.4s ease forwards',
            'cursor: pointer'
        ].join(';');

        // Click to dismiss
        msg.addEventListener('click', function () {
            dismissMessage(msg);
        });

        document.body.appendChild(msg);

        // Auto dismiss
        const timer = setTimeout(function () {
            dismissMessage(msg);
        }, msgDuration);

        // Store timer for cleanup
        msg._timer = timer;
    };

    function dismissMessage(msg) {
        if (!msg || !msg.parentNode) return;
        if (msg._timer) clearTimeout(msg._timer);
        msg.style.opacity = '0';
        msg.style.transform = 'translateX(120px)';
        msg.style.transition = 'all 0.4s ease';
        setTimeout(function () {
            if (msg.parentNode) msg.remove();
        }, 400);
    }

    // =========================================
    // FOOTER LINKS - HOVER EFFECT
    // =========================================
    const footerLinks = document.querySelectorAll(
        '.footer-col ul li a'
    );

    footerLinks.forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            this.style.color = '#FFD700';
            this.style.paddingLeft = '8px';
            this.style.transition = 'all 0.3s ease';
        });
        link.addEventListener('mouseleave', function () {
            this.style.color = '';
            this.style.paddingLeft = '';
        });
    });

    // =========================================
    // INTERSECTION OBSERVER - FADE IN
    // (Global - works on all pages)
    // =========================================
    if ('IntersectionObserver' in window) {
        const fadeElements = document.querySelectorAll(
            '.fade-in'
        );

        if (fadeElements.length > 0) {
            const fadeObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform =
                                'translateY(0)';
                            fadeObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
            );

            fadeElements.forEach(function (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(25px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                fadeObserver.observe(el);
            });
        }
    }

    // =========================================
    // LAZY LOADING IMAGES
    // =========================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll(
            'img[data-src]'
        );

        if (lazyImages.length > 0) {
            const imageObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.getAttribute('data-src');
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    });
                },
                { rootMargin: '50px 0px' }
            );

            lazyImages.forEach(function (img) {
                imageObserver.observe(img);
            });
        }
    }

    // =========================================
    // WHATSAPP FLOAT - TOOLTIP
    // =========================================
    const waFloat = document.querySelector('.whatsapp-float');
    if (waFloat) {
        waFloat.setAttribute('title', 'Chat on WhatsApp');

        // Show tooltip on hover
        waFloat.addEventListener('mouseenter', function () {
            const existing = document.querySelector('.wa-tooltip');
            if (existing) return;

            const tooltip = document.createElement('span');
            tooltip.className = 'wa-tooltip';
            tooltip.textContent = 'Chat with us!';
            tooltip.style.cssText = [
                'position: absolute',
                'right: 65px',
                'top: 50%',
                'transform: translateY(-50%)',
                'background: #1a1a1a',
                'color: #FFD700',
                'padding: 6px 12px',
                'border-radius: 8px',
                'font-size: 12px',
                'font-weight: 600',
                'white-space: nowrap',
                'pointer-events: none',
                'animation: fadeIn 0.2s ease'
            ].join(';');

            this.style.position = 'fixed';
            this.appendChild(tooltip);
        });

        waFloat.addEventListener('mouseleave', function () {
            const tooltip = this.querySelector('.wa-tooltip');
            if (tooltip) tooltip.remove();
        });
    }

    // =========================================
    // DETECT TOUCH DEVICE
    // =========================================
    if ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }

    // =========================================
    // PERFORMANCE - PRELOAD FONTS
    // =========================================
    if ('requestIdleCallback' in window) {
        requestIdleCallback(function () {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = 'https://fonts.googleapis.com';
            document.head.appendChild(link);
        });
    }

    // =========================================
    // LOG
    // =========================================
    console.log(
        '%c✅ Abhishek Xerox - Common JS Loaded!',
        'color: #FFD700; background: #1a1a1a; ' +
        'padding: 5px 10px; border-radius: 5px; ' +
        'font-weight: bold;'
    );

}); // END DOMContentLoaded