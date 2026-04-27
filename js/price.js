// ========================================
// PRICE PAGE JS - price.js
// Yellow Theme
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ===== INTRO CARDS ANIMATION =====
    const introCards = document.querySelectorAll('.intro-card');
    introCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
    });

    const introObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 120);
                introObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    introCards.forEach(function (card) {
        introObserver.observe(card);
    });

    // ===== PRICE CATEGORY ANIMATION =====
    const priceCategories = document.querySelectorAll('.price-category');
    priceCategories.forEach(function (cat) {
        cat.style.opacity = '0';
        cat.style.transform = 'translateY(40px)';
        cat.style.transition = 'all 0.6s ease';
    });

    const categoryObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                categoryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    priceCategories.forEach(function (cat) {
        categoryObserver.observe(cat);
    });

    // ===== TABLE ROW ANIMATION =====
    const tableRows = document.querySelectorAll('.price-table tbody tr');
    tableRows.forEach(function (row) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.4s ease';
    });

    const rowObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 50);
                rowObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    tableRows.forEach(function (row) {
        rowObserver.observe(row);
    });

    // ===== TABLE ROW HOVER COLOR =====
    tableRows.forEach(function (row) {
        row.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#FFFDE7';
            this.style.paddingLeft = '5px';
            this.style.transition = 'all 0.2s ease';
        });
        row.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
            this.style.paddingLeft = '';
        });
    });

    // ===== PRICE HIGHLIGHT =====
    const priceCols = document.querySelectorAll('.price-col');
    priceCols.forEach(function (col) {
        col.addEventListener('mouseenter', function () {
            this.style.color = '#FFD700';
            this.style.fontSize = '16px';
            this.style.transition = 'all 0.2s ease';
        });
        col.addEventListener('mouseleave', function () {
            this.style.color = '';
            this.style.fontSize = '';
        });
    });

    // ===== NOTE BOX ANIMATION =====
    const noteBox = document.querySelector('.note-box');
    if (noteBox) {
        noteBox.style.opacity = '0';
        noteBox.style.transform = 'translateY(20px)';
        noteBox.style.transition = 'all 0.6s ease';

        const noteObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    noteObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        noteObserver.observe(noteBox);
    }

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

    // ===== SEARCH / HIGHLIGHT PRICE =====
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const search = prompt('🔍 Search Service Price:');
            if (search) {
                searchPrice(search);
            }
        }
    });

    function searchPrice(query) {
        const rows = document.querySelectorAll('.price-table tbody tr');
        let found = false;

        rows.forEach(function (row) {
            row.style.background = '';
        });

        rows.forEach(function (row) {
            const text = row.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                row.style.background = '#FFD700';
                row.style.transition = 'all 0.3s ease';
                if (!found) {
                    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                }
                setTimeout(function () {
                    row.style.background = '';
                }, 3000);
            }
        });

        if (!found) {
            alert('❌ Service not found! Try different keyword.');
        }
    }

    // ===== PRINT BUTTON =====
    const printBtn = document.createElement('button');
    printBtn.textContent = '🖨️ Print Price List';
    printBtn.style.cssText =
        'position: fixed;' +
        'bottom: 90px;' +
        'right: 30px;' +
        'background: #1a1a1a;' +
        'color: #FFD700;' +
        'border: 2px solid #FFD700;' +
        'padding: 10px 20px;' +
        'border-radius: 25px;' +
        'font-size: 14px;' +
        'font-weight: 700;' +
        'cursor: pointer;' +
        'z-index: 998;' +
        'transition: all 0.3s ease;' +
        'font-family: Segoe UI, sans-serif;';

    printBtn.addEventListener('mouseenter', function () {
        this.style.background = '#FFD700';
        this.style.color = '#1a1a1a';
    });

    printBtn.addEventListener('mouseleave', function () {
        this.style.background = '#1a1a1a';
        this.style.color = '#FFD700';
    });

    printBtn.addEventListener('click', function () {
        window.print();
    });

    document.body.appendChild(printBtn);

    console.log('✅ Price Page Loaded!');

});