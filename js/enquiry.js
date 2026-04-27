// ========================================
// ENQUIRY PAGE JS - enquiry.js
// Abhishek Xerox - Vejalpur, Ahmedabad
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ===== SET MIN DATE =====
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1)
            .padStart(2, '0');
        const dd = String(today.getDate())
            .padStart(2, '0');
        dateInput.min = yyyy + '-' + mm + '-' + dd;
    }

    // ===== FORM ANIMATION =====
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(40px)';
        formContainer.style.transition = 'all 0.7s ease';

        const formObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';
                        formObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

        formObserver.observe(formContainer);
    }

    // ===== INFO CARDS ANIMATION =====
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
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
                    }, index * 150);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

    infoCards.forEach(function (card) {
        cardObserver.observe(card);
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

    // ===== CHAR COUNT =====
    const messageInput = document.getElementById('message');
    if (messageInput) {
        messageInput.addEventListener('input', function () {
            const charCount = document.getElementById('charCount');
            if (charCount) {
                const len = this.value.length;
                charCount.textContent = len + ' / 500';
                charCount.className = 'char-count';
                if (len > 400) {
                    charCount.classList.add('warning');
                }
                if (len > 480) {
                    charCount.classList.add('danger');
                }
                if (len > 500) {
                    this.value = this.value.substring(0, 500);
                }
            }
        });
    }

    // ===== FORM INPUT FOCUS EFFECT =====
    const inputs = document.querySelectorAll(
        '#enquiryForm input, ' +
        '#enquiryForm select, ' +
        '#enquiryForm textarea'
    );

    inputs.forEach(function (input) {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.01)';
            this.parentElement.style.transition =
                'transform 0.2s ease';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });

        // Clear error on input
        input.addEventListener('input', function () {
            this.classList.remove('error');
            const errorId = this.id + 'Error';
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('show');
            }
        });
    });

    // ===== FORM SUBMIT =====
    const enquiryForm = document.getElementById('enquiryForm');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm()) {
                submitEnquiry();
            }
        });
    }

    // ===== VALIDATE FORM =====
    function validateForm() {
        let isValid = true;

        // Name Validation
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

        // Phone Validation
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

        // Service Validation
        const service = document.getElementById('service');
        const serviceError = document.getElementById('serviceError');
        if (service && service.value === '') {
            showError(service, serviceError,
                '⚠️ Please select a service');
            isValid = false;
        } else {
            clearError(service, serviceError);
        }

        return isValid;
    }

    // ===== SHOW ERROR =====
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

    // ===== CLEAR ERROR =====
    function clearError(input, errorEl) {
        if (input) input.classList.remove('error');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
        }
    }

    // ===== SUBMIT ENQUIRY =====
    function submitEnquiry() {
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        const submitBtn = document.getElementById('submitBtn');

        // Show loader
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline';
        if (submitBtn) submitBtn.disabled = true;

        // Get form values for WhatsApp
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const quantity = document.getElementById('quantity');
        const date = document.getElementById('date');
        const message = document.getElementById('message');

        setTimeout(function () {
            // Reset button
            if (btnText) btnText.style.display = 'inline';
            if (btnLoader) btnLoader.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;

            // Show success
            showSuccessMsg(
                '✅ Enquiry Sent Successfully! ' +
                'Abhishek Xerox will contact you soon on ' +
                '+91 98988 67134'
            );

            // Reset form
            if (enquiryForm) enquiryForm.reset();

            // Reset char count
            const charCount =
                document.getElementById('charCount');
            if (charCount) charCount.textContent = '0 / 500';

        }, 2000);
    }

    // ===== SUCCESS MESSAGE =====
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
        }, 5000);
    }

    // ===== QUANTITY INPUT =====
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('input', function () {
            if (this.value < 1) {
                this.value = 1;
            }
            if (this.value > 99999) {
                this.value = 99999;
            }
        });
    }

    console.log(
        '✅ Enquiry Page Loaded - Abhishek Xerox Vejalpur!'
    );

});