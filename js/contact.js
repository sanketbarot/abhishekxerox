// ========== MAP TAB FUNCTION ==========
function showMap(branch, btn) {

    // Hide all maps
    const maps = document.querySelectorAll('.map-container');
    maps.forEach(function (map) {
        map.style.display = 'none';
    });

    // Remove active from all tabs
    const tabs = document.querySelectorAll('.map-tab');
    tabs.forEach(function (tab) {
        tab.classList.remove('active');
    });

    // Show selected map
    const selectedMap = document.getElementById(
        'map-' + branch
    );
    if (selectedMap) {
        selectedMap.style.display = 'block';
        selectedMap.style.animation = 'fadeIn 0.4s ease';
    }

    // Add active to clicked tab
    if (btn) btn.classList.add('active');
}

// ========== ADD IN DOMContentLoaded ==========
document.addEventListener('DOMContentLoaded', function () {

    // ===== CHECK SHOP STATUS =====
    checkShopStatus();

    // ===== HIGHLIGHT TODAY IN HOURS =====
    highlightToday();

    // ===== BRANCH CARDS ANIMATION =====
    const branchCards = document.querySelectorAll('.branch-card');
    branchCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.5s ease';
    });

    const branchObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 150);
                    branchObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    branchCards.forEach(function (card) {
        branchObserver.observe(card);
    });

    // ===== CONTACT INFO CARDS ANIMATION =====
    const infoCards = document.querySelectorAll('.contact-info-card');
    infoCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
    });

    const infoObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 120);
                    infoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    infoCards.forEach(function (card) {
        infoObserver.observe(card);
    });

    // ===== FORM SECTION ANIMATION =====
    const formSection = document.querySelector('.form-section');
    const detailsSection = document.querySelector('.details-section');

    if (formSection) {
        formSection.style.opacity = '0';
        formSection.style.transform = 'translateX(-40px)';
        formSection.style.transition = 'all 0.7s ease';
    }

    if (detailsSection) {
        detailsSection.style.opacity = '0';
        detailsSection.style.transform = 'translateX(40px)';
        detailsSection.style.transition = 'all 0.7s ease';
    }

    const formObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    if (formSection) {
                        formSection.style.opacity = '1';
                        formSection.style.transform =
                            'translateX(0)';
                    }
                    if (detailsSection) {
                        detailsSection.style.opacity = '1';
                        detailsSection.style.transform =
                            'translateX(0)';
                    }
                    formObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    if (formSection) formObserver.observe(formSection);

    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateForm()) {
                submitForm();
            }
        });
    }

    // ===== FORM STEPS PROGRESS =====
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    function updateSteps() {
        const step1 = document.getElementById('step1');
        const step2 = document.getElementById('step2');
        const step3 = document.getElementById('step3');
        const lines = document.querySelectorAll('.step-line');

        const step1Done =
            nameInput && nameInput.value.trim() !== '' &&
            phoneInput && phoneInput.value.trim() !== '';

        const step2Done =
            serviceInput && serviceInput.value !== '';

        const step3Done =
            messageInput && messageInput.value.trim() !== '';

        if (step1Done) {
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

        if (step2Done) {
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
                step2.querySelector('span').textContent = '2';
            }
            if (lines[1]) lines[1].classList.remove('done');
        }

        if (step3Done && step3) {
            step3.classList.remove('active');
            step3.classList.add('done');
            step3.querySelector('span').textContent = '✓';
        } else if (step3) {
            step3.classList.remove('done');
            step3.querySelector('span').textContent = '3';
        }
    }

    [nameInput, phoneInput, serviceInput, messageInput].forEach(
        function (el) {
            if (el) {
                el.addEventListener('input', updateSteps);
                el.addEventListener('change', updateSteps);
            }
        }
    );

    // ===== CHAR COUNT =====
    if (messageInput) {
        messageInput.addEventListener('input', function () {
            const charCount = document.getElementById('charCount');
            if (charCount) {
                const len = this.value.length;
                charCount.textContent = len + ' / 500';
                charCount.className = 'char-count';
                if (len > 400) charCount.classList.add('warning');
                if (len > 480) charCount.classList.add('danger');
                if (len > 500) {
                    this.value = this.value.substring(0, 500);
                }
            }
        });
    }

    // ===== VALIDATE FORM =====
    function validateForm() {
        let isValid = true;

        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (name && name.value.trim() === '') {
            showError(name, nameError,
                '⚠️ Please enter your full name');
            isValid = false;
        } else if (name && name.value.trim().length < 3) {
            showError(name, nameError,
                '⚠️ Name must be at least 3 characters');
            isValid = false;
        } else {
            clearError(name, nameError);
        }

        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const phoneVal = phone ?
            phone.value.trim().replace(/\s/g, '') : '';
        if (!phoneVal) {
            showError(phone, phoneError,
                '⚠️ Please enter your phone number');
            isValid = false;
        } else if (phoneVal.length < 10) {
            showError(phone, phoneError,
                '⚠️ Enter valid 10 digit number');
            isValid = false;
        } else {
            clearError(phone, phoneError);
        }

        // ✅ Branch Validation
        const branch = document.getElementById('branch');
        const branchError = document.getElementById('branchError');
        if (branch && branch.value === '') {
            showError(branch, branchError,
                '⚠️ Please select a branch');
            isValid = false;
        } else {
            clearError(branch, branchError);
        }

        const service = document.getElementById('service');
        const serviceError = document.getElementById('serviceError');
        if (service && service.value === '') {
            showError(service, serviceError,
                '⚠️ Please select a service');
            isValid = false;
        } else {
            clearError(service, serviceError);
        }

        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (message && message.value.trim() === '') {
            showError(message, messageError,
                '⚠️ Please enter your message');
            isValid = false;
        } else if (message && message.value.trim().length < 10) {
            showError(message, messageError,
                '⚠️ Message is too short');
            isValid = false;
        } else {
            clearError(message, messageError);
        }

        return isValid;
    }

    function showError(input, errorEl, msg) {
        if (input) {
            input.classList.add('error');
            input.focus();
        }
        if (errorEl) {
            errorEl.textContent = msg;
            errorEl.classList.add('show');
        }
    }

    function clearError(input, errorEl) {
        if (input) input.classList.remove('error');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
        }
    }

    const inputs = document.querySelectorAll(
        '.contact-form input, ' +
        '.contact-form select, ' +
        '.contact-form textarea'
    );

    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            this.classList.remove('error');
            const errorId = this.id + 'Error';
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('show');
            }
        });

        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.01)';
            this.parentElement.style.transition =
                'transform 0.2s ease';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    function submitForm() {
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        const submitBtn = document.getElementById('submitBtn');
        const branch = document.getElementById('branch');
        const waCheck = document.getElementById('whatsappReply');
        const wantWhatsApp = waCheck && waCheck.checked;

        const branchName = branch ?
            branch.options[branch.selectedIndex].text : '';

        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline';
        if (submitBtn) submitBtn.disabled = true;

        setTimeout(function () {
            if (btnText) btnText.style.display = 'inline';
            if (btnLoader) btnLoader.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
            if (contactForm) contactForm.reset();
            resetSteps();

            showSuccessMsg(
                '✅ Message Sent for ' + branchName + '! ' +
                'Abhishek Xerox will contact you soon.'
            );
        }, 2000);
    }

    function resetSteps() {
        const steps = document.querySelectorAll('.step');
        const lines = document.querySelectorAll('.step-line');

        steps.forEach(function (step, index) {
            step.classList.remove('done', 'active');
            const span = step.querySelector('span');
            if (span) span.textContent = index + 1;
        });

        const step1 = document.getElementById('step1');
        if (step1) step1.classList.add('active');

        lines.forEach(function (line) {
            line.classList.remove('done');
        });

        const charCount = document.getElementById('charCount');
        if (charCount) charCount.textContent = '0 / 500';
    }

    function showSuccessMsg(text) {
        const old = document.querySelector('.success-popup');
        if (old) old.remove();

        const popup = document.createElement('div');
        popup.className = 'success-popup';
        popup.textContent = text;
        popup.style.cssText =
            'position: fixed;' +
            'top: 80px;' +
            'right: 20px;' +
            'background: #1a1a1a;' +
            'color: #FFD700;' +
            'padding: 18px 30px;' +
            'border-radius: 12px;' +
            'font-size: 15px;' +
            'font-weight: 600;' +
            'z-index: 9999;' +
            'box-shadow: 0 5px 25px rgba(255,215,0,0.3);' +
            'border-left: 5px solid #FFD700;' +
            'max-width: 380px;';

        document.body.appendChild(popup);

        setTimeout(function () {
            popup.style.opacity = '0';
            popup.style.transition = 'opacity 0.5s ease';
            setTimeout(function () { popup.remove(); }, 500);
        }, 4000);
    }

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question) {
            question.addEventListener('click', function () {
                const isActive = item.classList.contains('active');

                faqItems.forEach(function (i) {
                    i.classList.remove('active');
                    const ans = i.querySelector('.faq-answer');
                    if (ans) ans.classList.remove('show');
                });

                if (!isActive) {
                    item.classList.add('active');
                    if (answer) answer.classList.add('show');
                }
            });
        }
    });

    faqItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });

    const faqObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                    }, index * 100);
                    faqObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    faqItems.forEach(function (item) {
        faqObserver.observe(item);
    });

    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.style.opacity = '0';
        mapContainer.style.transform = 'scale(0.95)';
        mapContainer.style.transition = 'all 0.6s ease';

        const mapObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                        mapObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

        mapObserver.observe(mapContainer);
    }

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

    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach(function (item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'all 0.4s ease';

        const qObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setTimeout(function () {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform =
                                'translateX(0)';
                        }, index * 100);
                        qObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

        qObserver.observe(item);
    });

    console.log('✅ Contact Page - Abhishek Xerox!');
});

// ===== CHECK SHOP STATUS =====
function checkShopStatus() {
    const statusBadge = document.getElementById('shopStatus');
    if (!statusBadge) return;

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = hour + minute / 60;

    let isOpen = false;

    if (day >= 1 && day <= 6) {
        // Mon-Sat: 9AM - 9:30PM
        isOpen = time >= 9 && time < 21.5;
    } else if (day === 0) {
        // Sunday: 9AM - 1:30PM
        isOpen = time >= 9 && time < 13.5;
    }

    if (isOpen) {
        statusBadge.textContent = '🟢 Open Now';
        statusBadge.className = 'status-badge open';
    } else {
        statusBadge.textContent = '🔴 Closed Now';
        statusBadge.className = 'status-badge closed';
    }
}

// ===== HIGHLIGHT TODAY =====
function highlightToday() {
    const days = [
        'Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    const todayName = days[new Date().getDay()];
    const hoursItems = document.querySelectorAll('.hours-item');

    hoursItems.forEach(function (item) {
        const daySpan = item.querySelector('span:first-child');
        if (daySpan &&
            daySpan.textContent.trim() === todayName) {
            item.classList.add('today');
            daySpan.textContent =
                '📅 ' + todayName + ' (Today)';
        }
    });

    const todayInfo = document.getElementById('todayInfo');
    if (todayInfo) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
        todayInfo.textContent =
            '📅 Today: ' + todayName +
            ' | Time: ' + timeStr;
    }
}