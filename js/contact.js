// ========================================
// CONTACT PAGE JS - contact.js
// Abhishek Xerox - Liquid Glass Only
// ========================================

(function () {
    'use strict';

    // =========================================
    // MAP TAB FUNCTION (global for onclick)
    // =========================================
    window.showMap = function (branch, btn) {
        var maps = document.querySelectorAll('.map-container');
        maps.forEach(function (map) {
            map.style.display = 'none';
            map.setAttribute('hidden', '');
        });

        var tabs = document.querySelectorAll('.map-tab');
        tabs.forEach(function (tab) {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });

        var selectedMap = document.getElementById('map-' + branch);
        if (selectedMap) {
            selectedMap.style.display = 'block';
            selectedMap.removeAttribute('hidden');
        }

        if (btn) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        }
    };

    // =========================================
    // INTERSECTION OBSERVER HELPER
    // =========================================
    function observeIn(elements, callback, options) {
        if (!elements || !elements.length) return;

        var opts = {
            threshold:  (options && options.threshold)  || 0.1,
            rootMargin: (options && options.rootMargin) ||
                        '0px 0px -25px 0px'
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
    // LIQUID SPOTLIGHT
    // =========================================
    function initLiquidSpotlight(selector, baseBg) {
        var cards = document.querySelectorAll(selector);
        var bg    = baseBg || 'rgba(255,255,255,0.58)';

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;

                card.style.background =
                    'radial-gradient(' +
                        '260px circle at ' + x + 'px ' + y + 'px,' +
                        'rgba(37, 99, 235, 0.07),' +
                        'rgba(6, 182, 212, 0.04) 28%,' +
                        'transparent 50%' +
                    '),' + bg;
            });

            card.addEventListener('mouseleave', function () {
                card.style.background = '';
            });
        });
    }

    // =========================================
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ===== SHOP STATUS =====
        checkShopStatus();

        // ===== HIGHLIGHT TODAY =====
        highlightToday();

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

        // ===== BRANCH CARDS =====
        var branchCards = document.querySelectorAll('.branch-card');

        branchCards.forEach(function (card) {
            card.style.opacity    = '0';
            card.style.transform  = 'translateY(38px)';
            card.style.transition =
                'opacity 0.55s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
            card.style.willChange = 'opacity, transform';
        });

        observeIn(Array.from(branchCards), function (card, idx) {
            setTimeout(function () {
                card.style.opacity   = '1';
                card.style.transform = 'translateY(0)';
                setTimeout(function () {
                    card.style.willChange = 'auto';
                }, 600);
            }, idx * 130);
        });

        initLiquidSpotlight(
            '.branch-card',
            'rgba(255,255,255,0.58)'
        );

        // ===== CONTACT INFO CARDS =====
        var infoCards = document.querySelectorAll('.contact-info-card');

        infoCards.forEach(function (card) {
            card.style.opacity    = '0';
            card.style.transform  = 'translateY(28px)';
            card.style.transition =
                'opacity 0.55s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
            card.style.willChange = 'opacity, transform';
        });

        observeIn(Array.from(infoCards), function (card, idx) {
            setTimeout(function () {
                card.style.opacity   = '1';
                card.style.transform = 'translateY(0)';
                setTimeout(function () {
                    card.style.willChange = 'auto';
                }, 600);
            }, idx * 100);
        });

        initLiquidSpotlight(
            '.contact-info-card',
            'rgba(255,255,255,0.58)'
        );

        // ===== FORM SECTION SLIDE IN =====
        var formSection    = document.querySelector('.form-section');
        var detailsSection = document.querySelector('.details-section');

        function applySlide(el, tx) {
            if (!el) return;
            el.style.opacity    = '0';
            el.style.transform  = tx;
            el.style.transition =
                'opacity 0.68s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.68s cubic-bezier(0.4,0,0.2,1)';
            el.style.willChange = 'opacity, transform';
        }

        applySlide(formSection,    'translateX(-38px)');
        applySlide(detailsSection, 'translateX(38px)');

        if (formSection) {
            observeIn([formSection], function () {
                if (formSection) {
                    formSection.style.opacity   = '1';
                    formSection.style.transform = 'translateX(0)';
                    setTimeout(function () {
                        formSection.style.willChange = 'auto';
                    }, 720);
                }
                if (detailsSection) {
                    detailsSection.style.opacity   = '1';
                    detailsSection.style.transform = 'translateX(0)';
                    setTimeout(function () {
                        detailsSection.style.willChange = 'auto';
                    }, 720);
                }
            }, { threshold: 0.08 });
        }

        // ===== FORM STEPS =====
        var nameInput    = document.getElementById('name');
        var phoneInput   = document.getElementById('phone');
        var serviceInput = document.getElementById('service');
        var messageInput = document.getElementById('message');

        function updateSteps() {
            var step1 = document.getElementById('step1');
            var step2 = document.getElementById('step2');
            var step3 = document.getElementById('step3');
            var lines = document.querySelectorAll('.step-line');

            var s1Done = nameInput &&
                nameInput.value.trim() !== '' &&
                phoneInput && phoneInput.value.trim() !== '';
            var s2Done = serviceInput && serviceInput.value !== '';
            var s3Done = messageInput && messageInput.value.trim() !== '';

            if (s1Done) {
                if (step1) {
                    step1.classList.remove('active');
                    step1.classList.add('done');
                    step1.querySelector('span').textContent = '✓';
                }
                if (lines[0]) lines[0].classList.add('done');
                if (step2) step2.classList.add('active');
            } else {
                if (step1) {
                    step1.classList.remove('done');
                    step1.classList.add('active');
                    step1.querySelector('span').textContent = '1';
                }
                if (lines[0]) lines[0].classList.remove('done');
            }

            if (s2Done) {
                if (step2) {
                    step2.classList.remove('active');
                    step2.classList.add('done');
                    step2.querySelector('span').textContent = '✓';
                }
                if (lines[1]) lines[1].classList.add('done');
                if (step3) step3.classList.add('active');
            } else {
                if (step2) {
                    step2.classList.remove('done');
                    if (step2.querySelector('span')) {
                        step2.querySelector('span').textContent = '2';
                    }
                }
                if (lines[1]) lines[1].classList.remove('done');
            }

            if (s3Done && step3) {
                step3.classList.remove('active');
                step3.classList.add('done');
                step3.querySelector('span').textContent = '✓';
            } else if (step3) {
                step3.classList.remove('done');
                if (step3.querySelector('span')) {
                    step3.querySelector('span').textContent = '3';
                }
            }
        }

        [nameInput, phoneInput, serviceInput, messageInput]
            .forEach(function (el) {
                if (el) {
                    el.addEventListener('input', updateSteps);
                    el.addEventListener('change', updateSteps);
                }
            });

        // ===== CHAR COUNT =====
        if (messageInput) {
            messageInput.addEventListener('input', function () {
                var charCount = document.getElementById('charCount');
                if (charCount) {
                    var len = this.value.length;
                    charCount.textContent = len + ' / 500';
                    charCount.className   = 'char-count';

                    if (len > 400) charCount.classList.add('warning');
                    if (len > 480) charCount.classList.add('danger');
                    if (len > 500) {
                        this.value = this.value.substring(0, 500);
                    }
                }
            });
        }

        // ===== CONTACT FORM =====
        var contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                if (validateForm()) submitForm();
            });
        }

        // ===== FORM INPUT INTERACTIONS =====
        var inputs = document.querySelectorAll(
            '.contact-form input,' +
            '.contact-form select,' +
            '.contact-form textarea'
        );

        inputs.forEach(function (input) {
            input.addEventListener('input', function () {
                this.classList.remove('error');
                this.removeAttribute('aria-invalid');
                var errorId = this.id + 'Error';
                var errorEl = document.getElementById(errorId);
                if (errorEl) {
                    errorEl.textContent = '';
                    errorEl.classList.remove('show');
                }
            });

            input.addEventListener('focus', function () {
                this.parentElement.style.transform  = 'scale(1.01)';
                this.parentElement.style.transition = 'transform 0.20s ease';
            });

            input.addEventListener('blur', function () {
                this.parentElement.style.transform = 'scale(1)';
            });
        });

        // =========================================
        // VALIDATE FORM
        // =========================================
        function validateForm() {
            var isValid = true;

            var name        = document.getElementById('name');
            var nameError   = document.getElementById('nameError');
            var phone       = document.getElementById('phone');
            var phoneError  = document.getElementById('phoneError');
            var branch      = document.getElementById('branch');
            var branchError = document.getElementById('branchError');
            var service     = document.getElementById('service');
            var serviceError= document.getElementById('serviceError');
            var message     = document.getElementById('message');
            var messageError= document.getElementById('messageError');

            // Name
            if (!name || name.value.trim() === '') {
                showError(name, nameError, '⚠️ Please enter your full name');
                isValid = false;
            } else if (name.value.trim().length < 3) {
                showError(name, nameError, '⚠️ Name must be at least 3 characters');
                isValid = false;
            } else { clearError(name, nameError); }

            // Phone
            var phoneVal = phone
                ? phone.value.trim().replace(/\s/g, '')
                : '';
            if (!phoneVal) {
                showError(phone, phoneError, '⚠️ Please enter your phone number');
                isValid = false;
            } else if (phoneVal.length < 10) {
                showError(phone, phoneError, '⚠️ Enter valid 10 digit number');
                isValid = false;
            } else { clearError(phone, phoneError); }

            // Branch
            if (!branch || branch.value === '') {
                showError(branch, branchError, '⚠️ Please select a branch');
                isValid = false;
            } else { clearError(branch, branchError); }

            // Service
            if (!service || service.value === '') {
                showError(service, serviceError, '⚠️ Please select a service');
                isValid = false;
            } else { clearError(service, serviceError); }

            // Message
            if (!message || message.value.trim() === '') {
                showError(message, messageError, '⚠️ Please enter your message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, messageError, '⚠️ Message is too short');
                isValid = false;
            } else { clearError(message, messageError); }

            return isValid;
        }

        function showError(input, errorEl, msg) {
            if (input) {
                input.classList.add('error');
                input.setAttribute('aria-invalid', 'true');
                input.focus();
            }
            if (errorEl) {
                errorEl.textContent = msg;
                errorEl.classList.add('show');
            }
        }

        function clearError(input, errorEl) {
            if (input) {
                input.classList.remove('error');
                input.removeAttribute('aria-invalid');
            }
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('show');
            }
        }

        // =========================================
        // SUBMIT FORM
        // =========================================
        function submitForm() {
            var btnText   = document.getElementById('btnText');
            var btnLoader = document.getElementById('btnLoader');
            var submitBtn = document.getElementById('submitBtn');
            var branch    = document.getElementById('branch');

            var branchName = branch
                ? branch.options[branch.selectedIndex].text
                : '';

            if (btnText)   btnText.style.display   = 'none';
            if (btnLoader) {
                btnLoader.style.display = 'inline';
                btnLoader.removeAttribute('aria-hidden');
            }
            if (submitBtn) submitBtn.disabled = true;

            setTimeout(function () {
                if (btnText)   btnText.style.display   = 'inline';
                if (btnLoader) {
                    btnLoader.style.display = 'none';
                    btnLoader.setAttribute('aria-hidden', 'true');
                }
                if (submitBtn) submitBtn.disabled = false;
                if (contactForm)   contactForm.reset();

                resetSteps();

                var charCount = document.getElementById('charCount');
                if (charCount) charCount.textContent = '0 / 500';

                var msg =
                    '✅ Message sent for ' + branchName +
                    '! Abhishek Xerox will contact you soon.';

                if (window.showMessage) {
                    window.showMessage(msg, 'success');
                } else {
                    showSuccessMsg(msg);
                }
            }, 2000);
        }

        // =========================================
        // RESET STEPS
        // =========================================
        function resetSteps() {
            var steps = document.querySelectorAll('.step');
            var lines = document.querySelectorAll('.step-line');

            steps.forEach(function (step, index) {
                step.classList.remove('done', 'active');
                var span = step.querySelector('span');
                if (span) span.textContent = index + 1;
            });

            var step1 = document.getElementById('step1');
            if (step1) step1.classList.add('active');

            lines.forEach(function (line) {
                line.classList.remove('done');
            });

            var charCount = document.getElementById('charCount');
            if (charCount) charCount.textContent = '0 / 500';
        }

        // =========================================
        // LOCAL SUCCESS - Liquid Glass Toast
        // =========================================
        function showSuccessMsg(text) {
            var old = document.querySelector('.success-popup');
            if (old) old.remove();

            var popup = document.createElement('div');
            popup.className = 'success-popup';
            popup.textContent = text;
            popup.setAttribute('role', 'alert');
            popup.setAttribute('aria-live', 'polite');

            popup.style.cssText = [
                'position:fixed',
                'top:85px',
                'right:20px',
                'background:rgba(255,255,255,0.88)',
                'backdrop-filter:blur(22px) saturate(180%)',
                '-webkit-backdrop-filter:blur(22px) saturate(180%)',
                'color:#2563EB',
                'padding:16px 22px',
                'border-radius:16px',
                'font-size:14px',
                'font-weight:600',
                'z-index:9999',
                'border:1px solid rgba(255,255,255,0.75)',
                'border-left:3px solid #2563EB',
                'max-width:360px',
                'width:calc(100% - 40px)',
                'line-height:1.5',
                'box-shadow:0 10px 30px rgba(15,23,42,0.08),' +
                    'inset 0 1px 0 rgba(255,255,255,0.90)',
                'animation:slideInRight 0.4s ease forwards',
                'cursor:pointer'
            ].join(';');

            popup.addEventListener('click', function () {
                popup.style.opacity   = '0';
                popup.style.transform = 'translateX(120px)';
                popup.style.transition = 'all 0.4s ease';
                setTimeout(function () { popup.remove(); }, 420);
            });

            document.body.appendChild(popup);

            setTimeout(function () {
                popup.style.opacity   = '0';
                popup.style.transform = 'translateX(120px)';
                popup.style.transition = 'all 0.4s ease';
                setTimeout(function () {
                    if (popup.parentNode) popup.remove();
                }, 420);
            }, 5000);
        }

        // ===== MAP TABS =====
        var mapTabBtns = document.querySelectorAll('.map-tab');
        mapTabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var branch = this.getAttribute('data-branch');
                if (branch) window.showMap(branch, this);
            });

            btn.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // ===== FAQ ACCORDION =====
        var faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(function (item) {
            var question = item.querySelector('.faq-question');
            var answer   = item.querySelector('.faq-answer');

            if (question) {
                question.addEventListener('click', function () {
                    var isActive = item.classList.contains('active');

                    faqItems.forEach(function (i) {
                        i.classList.remove('active');
                        var q = i.querySelector('.faq-question');
                        var a = i.querySelector('.faq-answer');
                        if (q) q.setAttribute('aria-expanded', 'false');
                        if (a) a.classList.remove('show');
                    });

                    if (!isActive) {
                        item.classList.add('active');
                        question.setAttribute('aria-expanded', 'true');
                        if (answer) answer.classList.add('show');
                    }
                });
            }
        });

        // FAQ Animation
        faqItems.forEach(function (item) {
            item.style.opacity    = '0';
            item.style.transform  = 'translateY(18px)';
            item.style.transition =
                'opacity 0.50s cubic-bezier(0.4,0,0.2,1),' +
                'transform 0.50s cubic-bezier(0.4,0,0.2,1)';
        });

        observeIn(Array.from(faqItems), function (item, idx) {
            setTimeout(function () {
                item.style.opacity   = '1';
                item.style.transform = 'translateY(0)';
            }, idx * 85);
        });

        // ===== MAP ANIMATION =====
        var mapContainerFirst = document.querySelector('.map-container');
        if (mapContainerFirst) {
            mapContainerFirst.style.opacity   = '0';
            mapContainerFirst.style.transform = 'scale(0.96)';
            mapContainerFirst.style.transition = 'all 0.60s ease';

            observeIn([mapContainerFirst], function (el) {
                el.style.opacity   = '1';
                el.style.transform = 'scale(1)';
            }, { threshold: 0.15 });
        }

        // ===== QUICK ITEMS =====
        var quickItems = document.querySelectorAll('.quick-item');

        quickItems.forEach(function (item) {
            item.style.opacity    = '0';
            item.style.transform  = 'translateX(18px)';
            item.style.transition =
                'opacity 0.45s ease, transform 0.45s ease';
        });

        observeIn(Array.from(quickItems), function (item, idx) {
            setTimeout(function () {
                item.style.opacity   = '1';
                item.style.transform = 'translateX(0)';
            }, idx * 85);
        });

        // ===== LOG =====
        console.log(
            '%c🫧 Contact Page | Liquid Glass Ready!',
            'color:#2563EB;background:#F8FAFC;' +
            'padding:6px 14px;border-radius:8px;' +
            'font-weight:bold;border-left:3px solid #06B6D4;'
        );

    }); // END DOMContentLoaded

    // =========================================
    // CHECK SHOP STATUS
    // =========================================
    function checkShopStatus() {
        var statusBadge = document.getElementById('shopStatus');
        if (!statusBadge) return;

        var now  = new Date();
        var day  = now.getDay();
        var time = now.getHours() + now.getMinutes() / 60;

        var isOpen = false;

        if (day >= 1 && day <= 6) {
            isOpen = time >= 9 && time < 21.5;
        } else if (day === 0) {
            isOpen = time >= 9 && time < 13.5;
        }

        statusBadge.textContent =
            isOpen ? '🟢 Open Now' : '🔴 Closed Now';
        statusBadge.className =
            'status-badge ' + (isOpen ? 'open' : 'closed');
    }

    // =========================================
    // HIGHLIGHT TODAY
    // =========================================
    function highlightToday() {
        var days = [
            'Sunday', 'Monday', 'Tuesday',
            'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];

        var todayName  = days[new Date().getDay()];
        var hoursItems = document.querySelectorAll('.hours-item');

        hoursItems.forEach(function (item) {
            var daySpan = item.querySelector('span:first-child');
            if (daySpan &&
                daySpan.textContent.trim() === todayName) {
                item.classList.add('today');
                daySpan.textContent = '📅 ' + todayName + ' (Today)';
            }
        });

        var todayInfo = document.getElementById('todayInfo');
        if (todayInfo) {
            var now     = new Date();
            var timeStr = now.toLocaleTimeString('en-IN', {
                hour: '2-digit', minute: '2-digit'
            });
            todayInfo.textContent =
                '📅 Today: ' + todayName + ' | Time: ' + timeStr;
        }
    }

})(); // IIFE END