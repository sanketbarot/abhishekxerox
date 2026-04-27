// ========================================
// ENQUIRY PAGE JS - enquiry.js
// Abhishek Xerox - Vejalpur, Ahmedabad
// Performance Optimized
// ========================================

(function () {
    'use strict';

    // =========================================
    // INTERSECTION OBSERVER HELPER
    // =========================================
    function observeIn(elements, callback, options) {
        if (!elements || !elements.length) return;

        var opts = {
            threshold: (options && options.threshold) || 0.1,
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
    // DOM READY
    // =========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ===== PAGE BANNER =====
        var banner = document.querySelector('.page-banner');
        if (banner) {
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(-16px)';
            banner.style.transition = 'all 0.52s ease';
            setTimeout(function () {
                banner.style.opacity = '1';
                banner.style.transform = 'translateY(0)';
            }, 80);
        }

        // ===== SET MIN DATE =====
        var dateInput = document.getElementById('date');
        if (dateInput) {
            var today = new Date();
            var yyyy = today.getFullYear();
            var mm = String(today.getMonth() + 1)
                .padStart(2, '0');
            var dd = String(today.getDate())
                .padStart(2, '0');
            dateInput.min = yyyy + '-' + mm + '-' + dd;
        }

        // ===== FORM CONTAINER ANIMATION =====
        var formContainer =
            document.querySelector('.form-container');
        if (formContainer) {
            formContainer.style.opacity = '0';
            formContainer.style.transform = 'translateY(38px)';
            formContainer.style.transition = 'all 0.65s ease';
            formContainer.style.willChange =
                'opacity, transform';

            observeIn([formContainer], function (el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                setTimeout(function () {
                    el.style.willChange = 'auto';
                }, 700);
            }, { threshold: 0.1 });
        }

        // ===== INFO CARDS ANIMATION =====
        var infoCards =
            document.querySelectorAll('.info-card');
        infoCards.forEach(function (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition =
                'opacity 0.5s ease, transform 0.5s ease';
            card.style.willChange = 'opacity, transform';
        });

        observeIn(Array.from(infoCards), function (card, idx) {
            setTimeout(function () {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                setTimeout(function () {
                    card.style.willChange = 'auto';
                }, 580);
            }, idx * 130);
        });

        // ===== CHAR COUNT =====
        var messageInput = document.getElementById('message');
        if (messageInput) {
            messageInput.addEventListener('input',
                function () {
                    var charCount =
                        document.getElementById('charCount');
                    if (charCount) {
                        var len = this.value.length;
                        charCount.textContent = len + ' / 500';
                        charCount.className = 'char-count';
                        if (len > 400)
                            charCount.classList.add('warning');
                        if (len > 480)
                            charCount.classList.add('danger');
                        if (len > 500) {
                            this.value =
                                this.value.substring(0, 500);
                        }
                    }
                });
        }

        // ===== FORM INPUT FOCUS =====
        var inputs = document.querySelectorAll(
            '.enquiry-form input, ' +
            '.enquiry-form select, ' +
            '.enquiry-form textarea'
        );

        inputs.forEach(function (input) {
            // Focus scale effect
            input.addEventListener('focus', function () {
                this.parentElement.style.transform =
                    'scale(1.01)';
                this.parentElement.style.transition =
                    'transform 0.18s ease';
            });

            input.addEventListener('blur', function () {
                this.parentElement.style.transform = 'scale(1)';
            });

            // Clear error on input
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
        });

        // ===== QUANTITY INPUT =====
        var quantityInput = document.getElementById('quantity');
        if (quantityInput) {
            quantityInput.addEventListener('input', function () {
                var val = parseInt(this.value, 10);
                if (val < 1) this.value = 1;
                if (val > 99999) this.value = 99999;
            });
        }

        // ===== FORM SUBMIT =====
        var enquiryForm = document.getElementById('enquiryForm');
        if (enquiryForm) {
            enquiryForm.addEventListener('submit',
                function (e) {
                    e.preventDefault();
                    if (validateForm()) {
                        submitEnquiry();
                    }
                });
        }

        // ===== VALIDATE FORM =====
        function validateForm() {
            var isValid = true;

            // Name
            var name = document.getElementById('name');
            var nameError =
                document.getElementById('nameError');
            if (!name || name.value.trim() === '') {
                showError(name, nameError,
                    '⚠️ Please enter your full name');
                isValid = false;
            } else if (name.value.trim().length < 3) {
                showError(name, nameError,
                    '⚠️ Name must be at least 3 characters');
                isValid = false;
            } else {
                clearError(name, nameError);
            }

            // Phone
            var phone = document.getElementById('phone');
            var phoneError =
                document.getElementById('phoneError');
            var phoneVal = phone ?
                phone.value.trim().replace(/\s/g, '') : '';
            if (!phoneVal) {
                showError(phone, phoneError,
                    '⚠️ Please enter your phone number');
                isValid = false;
            } else if (phoneVal.length < 10) {
                showError(phone, phoneError,
                    '⚠️ Enter a valid 10-digit number');
                isValid = false;
            } else {
                clearError(phone, phoneError);
            }

            // Branch
            var branch = document.getElementById('branch');
            var branchError =
                document.getElementById('branchError');
            if (!branch || branch.value === '') {
                showError(branch, branchError,
                    '⚠️ Please select a branch');
                isValid = false;
            } else {
                clearError(branch, branchError);
            }

            // Service
            var service = document.getElementById('service');
            var serviceError =
                document.getElementById('serviceError');
            if (!service || service.value === '') {
                showError(service, serviceError,
                    '⚠️ Please select a service');
                isValid = false;
            } else {
                clearError(service, serviceError);
            }

            return isValid;
        }

        // ===== SHOW / CLEAR ERROR =====
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

        // ===== SUBMIT ENQUIRY =====
        function submitEnquiry() {
            var btnText = document.getElementById('btnText');
            var btnLoader = document.getElementById('btnLoader');
            var submitBtn = document.getElementById('submitBtn');

            var branch = document.getElementById('branch');
            var service = document.getElementById('service');

            var branchName = branch ?
                branch.options[branch.selectedIndex].text : '';
            var serviceName = service ?
                service.options[service.selectedIndex].text : '';

            // Show loader
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) {
                btnLoader.style.display = 'inline';
                btnLoader.removeAttribute('aria-hidden');
            }
            if (submitBtn) submitBtn.disabled = true;

            // Simulate send (2 seconds)
            setTimeout(function () {
                // Reset button
                if (btnText) btnText.style.display = 'inline';
                if (btnLoader) {
                    btnLoader.style.display = 'none';
                    btnLoader.setAttribute(
                        'aria-hidden', 'true'
                    );
                }
                if (submitBtn) submitBtn.disabled = false;

                // Reset form
                if (enquiryForm) enquiryForm.reset();

                // Reset char count
                var charCount =
                    document.getElementById('charCount');
                if (charCount) {
                    charCount.textContent = '0 / 500';
                    charCount.className = 'char-count';
                }

                // Reset date min
                if (dateInput) {
                    var today = new Date();
                    var yyyy = today.getFullYear();
                    var mm = String(today.getMonth() + 1)
                        .padStart(2, '0');
                    var dd = String(today.getDate())
                        .padStart(2, '0');
                    dateInput.min = yyyy + '-' + mm + '-' + dd;
                }

                // Show success message
                var msg = '✅ Enquiry Sent! ' +
                    'Abhishek Xerox (' + branchName + ') ' +
                    'will contact you for ' + serviceName +
                    ' soon. +91 98988 67134';

                if (window.showMessage) {
                    window.showMessage(msg, 'success');
                } else {
                    showLocalSuccess(msg);
                }

            }, 2000);
        }

        // ===== LOCAL SUCCESS MESSAGE =====
        function showLocalSuccess(text) {
            var old = document.querySelector('.success-popup');
            if (old) old.remove();

            var popup = document.createElement('div');
            popup.className = 'success-popup';
            popup.textContent = text;
            popup.setAttribute('role', 'alert');
            popup.setAttribute('aria-live', 'polite');
            popup.style.cssText = [
                'position: fixed',
                'top: 82px',
                'right: 18px',
                'background: #1a1a1a',
                'color: #FFD700',
                'padding: 16px 22px',
                'border-radius: 12px',
                'font-size: 14px',
                'font-weight: 600',
                'z-index: 9999',
                'box-shadow: 0 5px 25px rgba(255,215,0,0.3)',
                'border-left: 5px solid #FFD700',
                'max-width: 360px',
                'width: calc(100% - 36px)',
                'line-height: 1.5'
            ].join(';');

            document.body.appendChild(popup);

            setTimeout(function () {
                popup.style.opacity = '0';
                popup.style.transition = 'opacity 0.45s ease';
                setTimeout(function () { popup.remove(); }, 500);
            }, 5000);
        }

        // ===== LOG =====
        console.log(
            '%c✅ Enquiry Page - Abhishek Xerox!',
            'color: #FFD700; background: #1a1a1a; ' +
            'padding: 5px 10px; border-radius: 4px; ' +
            'font-weight: bold;'
        );

    }); // END DOMContentLoaded

})(); // IIFE