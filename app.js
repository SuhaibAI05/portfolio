(function() {
    'use strict';

    // ============================================================
    // 1. LOADER
    // ============================================================
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loaderBar');
    const loaderText = document.getElementById('loaderText');

    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += Math.floor(Math.random() * 6) + 2;
        if (loadProgress > 100) loadProgress = 100;
        loaderBar.style.width = loadProgress + '%';
        loaderText.textContent = loadProgress + '%';

        if (loadProgress === 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                loader.classList.add('hide');
                document.body.style.overflow = 'visible';
                // trigger reveal animations
                initReveal();
                animateStats();
            }, 400);
        }
    }, 60);

    // ============================================================
    // 2. SIDE MENU
    // ============================================================
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');

    function openMenu() {
        sideMenu.style.right = '24px';
        overlay.style.display = 'block';
        overlay.style.background = 'rgba(0,0,0,0.35)';
        document.body.style.overflow = 'hidden';
        // animate menu links
        const links = sideMenu.querySelectorAll('.menu-links li');
        links.forEach((li, i) => {
            li.style.transitionDelay = (i * 0.07) + 's';
            li.style.opacity = '1';
            li.style.transform = 'translateX(0)';
        });
    }

    function closeMenu() {
        sideMenu.style.right = '-600px';
        overlay.style.display = 'none';
        overlay.style.background = 'transparent';
        document.body.style.overflow = 'visible';
        const links = sideMenu.querySelectorAll('.menu-links li');
        links.forEach((li) => {
            li.style.transitionDelay = '0s';
            li.style.opacity = '0';
            li.style.transform = 'translateX(40px)';
        });
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (sideMenu.style.right === '24px') closeMenu();
            if (document.getElementById('mProj').classList.contains('open')) closeModal();
        }
    });

    // ============================================================
    // 3. FLIP CARD
    // ============================================================
    const flipWrap = document.getElementById('flipWrap');
    const flipCard = document.getElementById('flipCard');
    let isFlipped = false;

    flipWrap.addEventListener('click', () => {
        isFlipped = !isFlipped;
        flipCard.classList.toggle('flipped', isFlipped);
    });

    // ============================================================
    // 4. SCROLL REVEAL (Intersection Observer)
    // ============================================================
    function initReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('on');
                    // if it's a skill card, animate bars
                    if (entry.target.querySelectorAll('.bar-fill').length) {
                        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
                            const w = bar.getAttribute('data-w');
                            if (w) bar.style.width = w + '%';
                        });
                    }
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

        reveals.forEach(el => observer.observe(el));
    }

    // ============================================================
    // 5. STATS COUNTER ANIMATION
    // ============================================================
    function animateStats() {
        const statDays = document.getElementById('statDays');
        const statProjects = document.getElementById('statProjects');
        const statHours = document.getElementById('statHours');
        const statSkills = document.getElementById('statSkills');

        const targetDays = 1000;
        const targetProjects = 6;
        const targetHours = 500;
        const targetSkills = 10;

        let currentDays = 0, currentProjects = 0, currentHours = 0, currentSkills = 0;
        const step = () => {
            let changed = false;
            if (currentDays < targetDays) {
                currentDays += Math.ceil((targetDays - currentDays) / 12);
                if (currentDays > targetDays) currentDays = targetDays;
                statDays.textContent = currentDays;
                changed = true;
            }
            if (currentProjects < targetProjects) {
                currentProjects += 1;
                if (currentProjects > targetProjects) currentProjects = targetProjects;
                statProjects.textContent = currentProjects;
                changed = true;
            }
            if (currentHours < targetHours) {
                currentHours += Math.ceil((targetHours - currentHours) / 15);
                if (currentHours > targetHours) currentHours = targetHours;
                statHours.textContent = currentHours + '+';
                changed = true;
            }
            if (currentSkills < targetSkills) {
                currentSkills += 1;
                if (currentSkills > targetSkills) currentSkills = targetSkills;
                statSkills.textContent = currentSkills;
                changed = true;
            }
            if (changed) requestAnimationFrame(step);
        };
        // start after a small delay
        setTimeout(step, 300);
    }

    // ============================================================
    // 6. TABLE (CRUD + Sort + Toggle)
    // ============================================================
    const tblBody = document.getElementById('tblBody');
    const tblFoot = document.getElementById('tblFoot');
    const toggleTblBtn = document.getElementById('toggleTblBtn');
    const sortYrBtn = document.getElementById('sortYrBtn');
    const addRowBtn = document.getElementById('addRowBtn');
    const addPanel = document.getElementById('addPanel');
    const saveLangBtn = document.getElementById('saveLangBtn');
    const cancelAddBtn = document.getElementById('cancelAddBtn');
    const nName = document.getElementById('nName');
    const nCreator = document.getElementById('nCreator');
    const nYear = document.getElementById('nYear');

    let tblVisible = true;

    function updateTableFoot() {
        const rows = tblBody.querySelectorAll('tr');
        const count = rows.length;
        let years = [];
        let creators = new Set();
        rows.forEach(row => {
            const yearCell = row.querySelector('td:nth-child(3) .yr-pill');
            if (yearCell) years.push(parseInt(yearCell.textContent));
            const creatorCell = row.querySelector('td:nth-child(2)');
            if (creatorCell) creators.add(creatorCell.textContent.trim());
        });
        const minYear = years.length ? Math.min(...years) : 'N/A';
        const maxYear = years.length ? Math.max(...years) : 'N/A';
        document.getElementById('langCount').textContent = count;
        document.getElementById('rangeYears').textContent = (count ? minYear + '–' + maxYear : '—');
        document.getElementById('creatorCount').textContent = creators.size;
    }

    function deleteRow(btn) {
        const row = btn.closest('tr');
        if (row) {
            row.style.transition = 'opacity 0.3s, transform 0.3s';
            row.style.opacity = '0';
            row.style.transform = 'scale(0.95)';
            setTimeout(() => {
                row.remove();
                updateTableFoot();
                showToast('Language deleted successfully');
            }, 300);
        }
    }

    function editRow(btn) {
        const row = btn.closest('tr');
        const cells = row.querySelectorAll('td');
        const name = cells[0].textContent.trim();
        const creator = cells[1].textContent.trim();
        const year = cells[2].querySelector('.yr-pill')?.textContent || '';
        // populate add panel for editing
        nName.value = name;
        nCreator.value = creator;
        nYear.value = year;
        addPanel.style.display = 'block';
        // remove the row after saving
        const oldSave = saveLangBtn._clickHandler;
        if (oldSave) saveLangBtn.removeEventListener('click', oldSave);
        const handler = function() {
            if (nName.value && nCreator.value && nYear.value) {
                cells[0].textContent = nName.value;
                cells[1].textContent = nCreator.value;
                const yearSpan = cells[2].querySelector('.yr-pill');
                if (yearSpan) yearSpan.textContent = nYear.value;
                addPanel.style.display = 'none';
                nName.value = '';
                nCreator.value = '';
                nYear.value = '';
                updateTableFoot();
                showToast('Language updated successfully');
                saveLangBtn.removeEventListener('click', handler);
                saveLangBtn._clickHandler = null;
                // reattach default add handler
                saveLangBtn.addEventListener('click', defaultAddHandler);
                saveLangBtn._clickHandler = defaultAddHandler;
            } else {
                showToast('Please fill all fields');
            }
        };
        saveLangBtn.removeEventListener('click', defaultAddHandler);
        saveLangBtn.addEventListener('click', handler);
        saveLangBtn._clickHandler = handler;
        // cancel returns to default
        const oldCancel = cancelAddBtn._clickHandler;
        if (oldCancel) cancelAddBtn.removeEventListener('click', oldCancel);
        const cancelHandler = function() {
            addPanel.style.display = 'none';
            nName.value = '';
            nCreator.value = '';
            nYear.value = '';
            cancelAddBtn.removeEventListener('click', cancelHandler);
            cancelAddBtn._clickHandler = null;
            // reattach default add click
            addRowBtn.click();
        };
        cancelAddBtn.addEventListener('click', cancelHandler);
        cancelAddBtn._clickHandler = cancelHandler;
    }

    function defaultAddHandler() {
        if (nName.value && nCreator.value && nYear.value) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${nName.value}</td>
                <td>${nCreator.value}</td>
                <td><span class="yr-pill">${nYear.value}</span></td>
                <td><button class="act-btn edit">Edit</button> <button class="act-btn del">Delete</button></td>
            `;
            tblBody.appendChild(newRow);
            newRow.style.opacity = '0';
            newRow.style.transform = 'translateY(-10px)';
            requestAnimationFrame(() => {
                newRow.style.transition = 'opacity 0.4s, transform 0.4s';
                newRow.style.opacity = '1';
                newRow.style.transform = 'translateY(0)';
            });
            nName.value = '';
            nCreator.value = '';
            nYear.value = '';
            addPanel.style.display = 'none';
            updateTableFoot();
            showToast('Language added successfully');
            // attach events to new buttons
            attachTableEvents();
        } else {
            showToast('Please fill all fields');
        }
    }

    function attachTableEvents() {
        document.querySelectorAll('#tblBody .act-btn.edit').forEach(btn => {
            btn.removeEventListener('click', editHandler);
            btn.addEventListener('click', editHandler);
        });
        document.querySelectorAll('#tblBody .act-btn.del').forEach(btn => {
            btn.removeEventListener('click', delHandler);
            btn.addEventListener('click', delHandler);
        });
    }

    function editHandler(e) { editRow(e.currentTarget); }
    function delHandler(e) { deleteRow(e.currentTarget); }

    // toggle table visibility
    toggleTblBtn.addEventListener('click', () => {
        const wrap = document.getElementById('tblWrap');
        tblVisible = !tblVisible;
        wrap.style.transition = 'opacity 0.4s, transform 0.4s';
        if (tblVisible) {
            wrap.style.opacity = '1';
            wrap.style.transform = 'scale(1)';
            toggleTblBtn.textContent = 'Hide Table';
        } else {
            wrap.style.opacity = '0';
            wrap.style.transform = 'scale(0.97)';
            toggleTblBtn.textContent = 'Show Table';
        }
    });

    // sort by year
    let sortAsc = true;
    sortYrBtn.addEventListener('click', () => {
        const rows = Array.from(tblBody.querySelectorAll('tr'));
        sortAsc = !sortAsc;
        rows.sort((a, b) => {
            const aYear = parseInt(a.querySelector('td:nth-child(3) .yr-pill')?.textContent || 0);
            const bYear = parseInt(b.querySelector('td:nth-child(3) .yr-pill')?.textContent || 0);
            return sortAsc ? aYear - bYear : bYear - aYear;
        });
        rows.forEach(row => tblBody.appendChild(row));
        sortYrBtn.textContent = sortAsc ? 'Sort by Year (Oldest)' : 'Sort by Year (Newest)';
        updateTableFoot();
        showToast('Sorted by year');
    });

    // add row panel toggle
    addRowBtn.addEventListener('click', () => {
        const isOpen = addPanel.style.display === 'block';
        addPanel.style.display = isOpen ? 'none' : 'block';
        if (!isOpen) {
            nName.focus();
            // ensure default add handler is attached
            saveLangBtn.removeEventListener('click', saveLangBtn._clickHandler || defaultAddHandler);
            saveLangBtn.addEventListener('click', defaultAddHandler);
            saveLangBtn._clickHandler = defaultAddHandler;
            // cancel resets
            cancelAddBtn.removeEventListener('click', cancelAddBtn._clickHandler || (() => {}));
            const cancelReset = function() {
                addPanel.style.display = 'none';
                nName.value = '';
                nCreator.value = '';
                nYear.value = '';
            };
            cancelAddBtn.addEventListener('click', cancelReset);
            cancelAddBtn._clickHandler = cancelReset;
        }
    });

    // default add handler
    saveLangBtn.addEventListener('click', defaultAddHandler);
    saveLangBtn._clickHandler = defaultAddHandler;
    cancelAddBtn.addEventListener('click', () => {
        addPanel.style.display = 'none';
        nName.value = '';
        nCreator.value = '';
        nYear.value = '';
    });

    // initial attach
    attachTableEvents();
    updateTableFoot();

    // ============================================================
    // 7. COURSE DETAILS TOGGLE
    // ============================================================
    const detailBtn = document.getElementById('detailBtn');
    const detailPanel = document.getElementById('detailPanel');
    let detailVisible = false;

    detailBtn.addEventListener('click', () => {
        detailVisible = !detailVisible;
        detailPanel.style.display = detailVisible ? 'block' : 'none';
        detailBtn.textContent = detailVisible ? 'Hide Course Details' : 'Show Course Details';
        if (detailVisible) {
            detailPanel.style.opacity = '0';
            detailPanel.style.transform = 'translateY(-8px)';
            requestAnimationFrame(() => {
                detailPanel.style.transition = 'opacity 0.4s, transform 0.4s';
                detailPanel.style.opacity = '1';
                detailPanel.style.transform = 'translateY(0)';
            });
        }
    });

    // ============================================================
    // 8. PROJECTS MODAL
    // ============================================================
    const projCard = document.getElementById('projCard');
    const modalProj = document.getElementById('mProj');
    const xProj = document.getElementById('xProj');

    function openModal() {
        modalProj.classList.add('open');
        document.body.style.overflow = 'hidden';
        // animate rows
        const rows = modalProj.querySelectorAll('.proj-row');
        rows.forEach((row, i) => {
            row.style.opacity = '0';
            row.style.transform = 'translateY(12px)';
            setTimeout(() => {
                row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                row.style.opacity = '1';
                row.style.transform = 'translateY(0)';
            }, 100 + i * 80);
        });
    }

    function closeModal() {
        modalProj.classList.remove('open');
        document.body.style.overflow = 'visible';
        const rows = modalProj.querySelectorAll('.proj-row');
        rows.forEach(row => {
            row.style.opacity = '0';
            row.style.transform = 'translateY(12px)';
        });
    }

    projCard.addEventListener('click', openModal);
    xProj.addEventListener('click', closeModal);
    modalProj.addEventListener('click', (e) => {
        if (e.target === modalProj) closeModal();
    });

    // ============================================================
    // 9. TOAST SYSTEM
    // ============================================================
    const toastEl = document.getElementById('toast');
    let toastTimeout;

    function showToast(message) {
        toastEl.textContent = message;
        toastEl.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 2800);
    }

    // ============================================================
    // 10. KEYBOARD & ACCESSIBILITY
    // ============================================================
    // handle ESC for modal (already added above)

    // ============================================================
    // 11. SMOOTH SCROLL FOR INTERNAL LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 100;
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                // close menu if open
                if (sideMenu.style.right === '0px') closeMenu();
            }
        });
    });

    // ============================================================
    // 12. MOBILE TOUCH IMPROVEMENTS
    // ============================================================
    // subtle hover effect on touch devices via 'active' class
    document.addEventListener('touchstart', function() {}, { passive: true });

    console.log('Suhaib.dev — Light Neomorphism fully interactive!');
})();