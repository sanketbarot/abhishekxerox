// ========================================
// COMMON JS - NAVBAR + FOOTER
// Abhishek Xerox - Vejalpur, Ahmedabad
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');

            const spans = hamburger.querySelectorAll('span');

            if (hamburger.classList.contains('open')) {
                spans[0].style.transform =
                    'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[1].style.transform = 'scaleX(0)';
                spans[2].style.transform =
                    'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[1].style.transform = 'none';
                spans[2].style.transform = 'none';
            }
        });

        // ✅ Close menu on outside click
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) &&
                !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
                resetHamburger();
            }
        });
    }

    // ===== CLOSE MENU ON LINK CLICK =====
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(function (item) {
        item.addEventListener('click', function () {
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('open');
                resetHamburger();
            }
        });
    });

    // ✅ Reset hamburger spans
    function resetHamburger() {
        if (!hamburger) return;
        const spans = hamburger.querySelectorAll('span');
        if (spans[0]) spans[0].style.transform = 'none';
        if (spans[1]) {
            spans[1].style.opacity = '1';
            spans[1].style.transform = 'none';
        }
        if (spans[2]) spans[2].style.transform = 'none';
    }

    // ===== ACTIVE NAV LINK =====
    const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';

    navItems.forEach(function (link) {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ===== NAVBAR SCROLL EFFECT =====
    let lastScrollY = 0;
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.style.boxShadow =
                '0 2px 20px rgba(255, 215, 0, 0.25)';
        } else {
            navbar.style.boxShadow =
                '0 2px 15px rgba(0, 0, 0, 0.3)';
        }

        lastScrollY = currentScrollY;
    });

    // ===== SCROLL TO TOP BUTTON =====
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                scrollBtn.style.display = 'flex';
                scrollBtn.style.alignItems = 'center';
                scrollBtn.style.justifyContent = 'center';
            } else {
                scrollBtn.style.display = 'none';
            }
        });

        scrollBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top +
                    window.scrollY - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SUCCESS MESSAGE FUNCTION =====
    window.showMessage = function (text, type) {
        const oldMsg = document.querySelector('.success-message');
        if (oldMsg) oldMsg.remove();

        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.textContent = text;

        const bgColor = type === 'error' ? '#c0392b' : '#1a1a1a';
        const borderColor = type === 'error' ? '#e74c3c' : '#FFD700';
        const textColor = type === 'error' ? '#ffffff' : '#FFD700';

        msg.style.cssText =
            'position: fixed;' +
            'top: 80px;' +
            'right: 20px;' +
            'background:' + bgColor + ';' +
            'color:' + textColor + ';' +
            'padding: 16px 24px;' +
            'border-radius: 12px;' +
            'font-size: 15px;' +
            'font-weight: 600;' +
            'z-index: 9999;' +
            'box-shadow: 0 5px 25px rgba(0,0,0,0.2);' +
            'border-left: 5px solid' + borderColor + ';' +
            'max-width: 380px;' +
            'animation: slideInRight 0.4s ease;';

        document.body.appendChild(msg);

        setTimeout(function () {
            msg.style.opacity = '0';
            msg.style.transition = 'opacity 0.5s ease';
            setTimeout(function () { msg.remove(); }, 500);
        }, 4000);
    };

    // ===== KEYBOARD ACCESSIBILITY =====
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('open');
                    resetHamburger();
                }
            }
        }
    });

    console.log('✅ Common JS Loaded - Abhishek Xerox!');
});