import { createNoise2D } from 'https://cdn.jsdelivr.net/npm/simplex-noise@4.0.1/dist/esm/simplex-noise.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');

    // Add scroll effect for header (Shadow only, keep blur background)
    let isScrolled = false;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const shouldBeScrolled = window.scrollY > 50;
                if (shouldBeScrolled !== isScrolled) {
                    isScrolled = shouldBeScrolled;
                    header.style.boxShadow = isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none';
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize wave background
    initWaves();

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuToggle && hamburger && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            const menuText = mobileMenuToggle.querySelector('.mobile-menu-text');
            if (menuText) {
                menuText.innerHTML = isActive ? 'Cerrar' : 'Ver menú <span class="mobile-arrow">→</span>';
            }
        });

        // Close menu when a link is clicked
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                
                const menuText = mobileMenuToggle.querySelector('.mobile-menu-text');
                if (menuText) {
                    menuText.innerHTML = 'Ver menú <span class="mobile-arrow">→</span>';
                }
            });
        });
    }

    // Video Play/Pause Toggle
    document.querySelectorAll('.play-pause-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const video = this.previousElementSibling;
            const iconPlay = this.querySelector('.icon-play');
            const iconPause = this.querySelector('.icon-pause');

            if (video.paused) {
                // Pause all other videos
                document.querySelectorAll('.video-wrapper video').forEach(otherVideo => {
                    if (otherVideo !== video && !otherVideo.paused) {
                        otherVideo.pause();
                        const otherBtn = otherVideo.nextElementSibling;
                        if (otherBtn && otherBtn.classList.contains('play-pause-btn')) {
                            otherBtn.querySelector('.icon-pause').style.display = 'none';
                            otherBtn.querySelector('.icon-play').style.display = 'block';
                        }
                    }
                });

                video.muted = false; // Ensure audio plays
                video.play().catch(e => console.log('Play prevented', e));
                iconPlay.style.display = 'none';
                iconPause.style.display = 'block';
            } else {
                video.pause();
                iconPlay.style.display = 'block';
                iconPause.style.display = 'none';
            }
        });
    });

    // Make whole wrapper clickable for video toggle
    document.querySelectorAll('.video-wrapper').forEach(wrapper => {
        wrapper.style.cursor = 'pointer';
        wrapper.addEventListener('click', function(e) {
            if (e.target.closest('.play-pause-btn')) return; // handled by btn
            const btn = this.querySelector('.play-pause-btn');
            if (btn) btn.click();
        });
    });

    // Video Lazy Load & Play/Pause Optimization
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.dataset.src && !video.src) {
                    video.src = video.dataset.src;
                    video.load();
                }
                // Removed auto-play, videos stay paused by default
            } else {
                video.pause();
                const btn = video.nextElementSibling;
                if (btn && btn.classList.contains('play-pause-btn')) {
                    btn.querySelector('.icon-pause').style.display = 'none';
                    btn.querySelector('.icon-play').style.display = 'block';
                }
            }
        });
    }, { rootMargin: "300px 0px" });

    document.querySelectorAll('.video-wrapper video').forEach(video => {
        videoObserver.observe(video);
    });

    // Initialize FAQ interaction
    initFAQ();
});

function initFAQ() {
    const faqContainer = document.querySelector('.faq-content-container');
    if (!faqContainer) return;

    const accordionBtns = document.querySelectorAll('.faq-question-btn');
    const tabBtns = document.querySelectorAll('.faq-tab-btn');
    const searchInput = document.getElementById('faq-search-input');
    const searchClearBtn = document.getElementById('faq-search-clear');
    const categoryHeaders = document.querySelectorAll('.faq-category-header');
    const noResults = document.querySelector('.faq-no-results');

    // Accordion Toggle
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            if (!item) return;

            const isOpen = item.classList.contains('active');
            item.classList.toggle('active', !isOpen);
        });
    });

    // Category Tabs Filtering
    tabBtns.forEach(tab => {
        tab.addEventListener('click', () => {
            tabBtns.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;
            filterFAQ(category, searchInput ? searchInput.value.trim().toLowerCase() : '');
        });
    });

    // Search Filtering
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();
            if (searchClearBtn) {
                searchClearBtn.style.display = query.length > 0 ? 'flex' : 'none';
            }
            const activeTab = document.querySelector('.faq-tab-btn.active');
            const category = activeTab ? activeTab.dataset.category : 'all';
            filterFAQ(category, query);
        });
    }

    if (searchClearBtn && searchInput) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchClearBtn.style.display = 'none';
            searchInput.focus();
            const activeTab = document.querySelector('.faq-tab-btn.active');
            const category = activeTab ? activeTab.dataset.category : 'all';
            filterFAQ(category, '');
        });
    }

    // Advanced Text Normalization & Flexible Search Helper
    const STOP_WORDS = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'en', 'para', 'por', 'con', 'sin', 'mi', 'tu', 'su', 'que', 'se', 'y', 'o', 'a', 'es', 'son', 'un']);

    function normalizeText(text) {
        if (!text) return '';
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // removes accents: á->a, é->e, ñ->n, ü->u
            .replace(/[^a-z0-9]/g, " ")     // replace punctuation, commas, symbols with spaces
            .replace(/\s+/g, " ")
            .trim();
    }

    function getWordStem(word) {
        if (word.length <= 3) return word;
        if (word.endsWith('es') && word.length > 4) return word.slice(0, -2);
        if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
        return word;
    }

    function isTermMatch(term, targetNormalizedText, targetStems) {
        if (!term) return true;
        
        // 1. Direct substring match (e.g. "precio" in "precios")
        if (targetNormalizedText.includes(term)) return true;

        // 2. Stem match (e.g. term "precios" -> stem "precio" matches target "precio")
        const termStem = getWordStem(term);
        if (termStem.length >= 3 && targetNormalizedText.includes(termStem)) return true;

        // 3. Reverse stem match (e.g. term stem matches any target word stem)
        if (termStem.length >= 3 && targetStems.some(stem => stem === termStem || stem.startsWith(termStem) || termStem.startsWith(stem))) {
            return true;
        }

        return false;
    }

    function filterFAQ(category, query) {
        let visibleCount = 0;

        const normalizedQuery = normalizeText(query);
        let queryTerms = normalizedQuery ? normalizedQuery.split(' ').filter(Boolean) : [];

        // Remove stop words if user typed more than one word
        if (queryTerms.length > 1) {
            const filteredTerms = queryTerms.filter(t => !STOP_WORDS.has(t));
            if (filteredTerms.length > 0) {
                queryTerms = filteredTerms;
            }
        }

        categoryHeaders.forEach(header => {
            const headerCat = header.dataset.category;
            const isCatMatch = (category === 'all' || category === headerCat);
            
            const categoryItems = document.querySelectorAll(`.faq-item[data-category="${headerCat}"]`);
            let categoryVisibleItems = 0;

            categoryItems.forEach(item => {
                const questionRaw = item.querySelector('.faq-question-text')?.textContent || '';
                const answerRaw = item.querySelector('.faq-answer-inner')?.textContent || '';
                const badgeRaw = item.querySelector('.faq-cat-badge')?.textContent || '';
                
                const matchesCategory = (category === 'all' || category === headerCat);

                let matchesSearch = true;
                if (queryTerms.length > 0) {
                    const fullTargetText = normalizeText(`${questionRaw} ${answerRaw} ${badgeRaw}`);
                    const targetWords = fullTargetText.split(' ').filter(Boolean);
                    const targetStems = targetWords.map(getWordStem);

                    // Check if EVERY query term matches target text (smart multi-word matching)
                    matchesSearch = queryTerms.every(term => isTermMatch(term, fullTargetText, targetStems));
                }

                if (matchesCategory && matchesSearch) {
                    item.style.display = 'block';
                    categoryVisibleItems++;
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            if (isCatMatch && categoryVisibleItems > 0) {
                header.style.display = 'flex';
            } else {
                header.style.display = 'none';
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }
}

function initWaves() {
    const container = document.getElementById('wave-intro') || document.getElementById('inicio') || document.querySelector('.waves-component');
    const svg = document.getElementById('waves-svg');
    if (!container || !svg) return;

    const noise2D = createNoise2D();
    
    let mouse = {
        x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false
    };
    
    let paths = [];
    let lines = [];
    let rafId = null;
    let bounding = null;

    const strokeColor = "rgba(142, 45, 226, 0.6)"; // Neon Purple
    
    function setSize() {
        bounding = container.getBoundingClientRect();
        svg.style.width = `${bounding.width}px`;
        svg.style.height = `${bounding.height}px`;
    }

    function setLines() {
        if (!bounding) return;
        const { width, height } = bounding;
        lines = [];
        
        paths.forEach(p => p.remove());
        paths = [];
        
        const xGap = 16;
        const yGap = 16;
        const oWidth = width + 200;
        const oHeight = height + 30;
        
        const totalLines = Math.ceil(oWidth / xGap);
        const totalPoints = Math.ceil(oHeight / yGap);
        
        const xStart = (width - xGap * totalLines) / 2;
        const yStart = (height - yGap * totalPoints) / 2;
        
        for (let i = 0; i < totalLines; i++) {
            const points = [];
            for (let j = 0; j < totalPoints; j++) {
                points.push({
                    x: xStart + xGap * i,
                    y: yStart + yGap * j,
                    wave: { x: 0, y: 0 },
                    cursor: { x: 0, y: 0, vx: 0, vy: 0 }
                });
            }
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', strokeColor);
            path.setAttribute('stroke-width', '1');
            svg.appendChild(path);
            paths.push(path);
            lines.push(points);
        }
    }

    function onResize() {
        setSize();
        setLines();
    }

    function onMouseMove(e) {
        updateMousePosition(e.clientX, e.clientY);
    }

    function onTouchMove(e) {
        const touch = e.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
    }

    function updateMousePosition(x, y) {
        if (!bounding) return;
        mouse.x = x - bounding.left;
        mouse.y = y - bounding.top;

        if (!mouse.set) {
            mouse.sx = mouse.x; mouse.sy = mouse.y;
            mouse.lx = mouse.x; mouse.ly = mouse.y;
            mouse.set = true;
        }

        container.style.setProperty('--x', `${mouse.sx}px`);
        container.style.setProperty('--y', `${mouse.sy}px`);
    }

    function movePoints(time) {
        const mouseSx = mouse.sx;
        const mouseSy = mouse.sy;
        const mouseVs = mouse.vs;
        const mouseA = mouse.a;
        const l = Math.max(175, mouseVs);
        const lSq = l * l;
        const cosA = Math.cos(mouseA);
        const sinA = Math.sin(mouseA);
        const forceMult = l * mouseVs * 0.00035;
        const fVx = cosA * forceMult;
        const fVy = sinA * forceMult;
        const time008_003 = time * 0.008 * 0.003;
        const time003_002 = time * 0.003 * 0.002;

        for (let i = 0; i < lines.length; i++) {
            const points = lines[i];
            for (let j = 0; j < points.length; j++) {
                const p = points[j];
                const move = noise2D(
                    (p.x * 0.003) + time008_003,
                    (p.y * 0.002) + time003_002
                ) * 8;

                p.wave.x = Math.cos(move) * 12;
                p.wave.y = Math.sin(move) * 6;

                const dx = p.x - mouseSx;
                const dy = p.y - mouseSy;
                const dSq = dx * dx + dy * dy;

                if (dSq < lSq) {
                    const d = Math.sqrt(dSq);
                    const s = 1 - d / l;
                    const f = Math.cos(d * 0.001) * s;
                    p.cursor.vx += f * fVx;
                    p.cursor.vy += f * fVy;
                }

                p.cursor.vx += (-p.cursor.x) * 0.01;
                p.cursor.vy += (-p.cursor.y) * 0.01;

                p.cursor.vx *= 0.95;
                p.cursor.vy *= 0.95;

                p.cursor.x += p.cursor.vx;
                p.cursor.y += p.cursor.vy;

                if (p.cursor.x > 50) p.cursor.x = 50;
                else if (p.cursor.x < -50) p.cursor.x = -50;

                if (p.cursor.y > 50) p.cursor.y = 50;
                else if (p.cursor.y < -50) p.cursor.y = -50;
            }
        }
    }

    function moved(point, withCursorForce = true) {
        return {
            x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
            y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0)
        };
    }

    function drawLines() {
        for (let lIndex = 0; lIndex < lines.length; lIndex++) {
            const points = lines[lIndex];
            if (points.length < 2 || !paths[lIndex]) continue;
            
            const firstPoint = moved(points[0], false);
            let d = `M ${firstPoint.x} ${firstPoint.y}`;
            for (let i = 1; i < points.length; i++) {
                const current = moved(points[i]);
                d += ` L ${current.x} ${current.y}`;
            }
            paths[lIndex].setAttribute('d', d);
        }
    }

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (isVisible && !rafId) {
                rafId = requestAnimationFrame(tick);
            }
        });
    });
    observer.observe(container);

    function tick(time) {
        if (!isVisible) {
            rafId = null;
            return;
        }

        mouse.sx += (mouse.x - mouse.sx) * 0.1;
        mouse.sy += (mouse.y - mouse.sy) * 0.1;

        const dx = mouse.x - mouse.lx;
        const dy = mouse.y - mouse.ly;
        const d = Math.hypot(dx, dy);

        mouse.v = d;
        mouse.vs += (d - mouse.vs) * 0.1;
        mouse.vs = Math.min(100, mouse.vs);

        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.a = Math.atan2(dy, dx);

        container.style.setProperty('--x', `${mouse.sx}px`);
        container.style.setProperty('--y', `${mouse.sy}px`);

        movePoints(time);
        drawLines();

        rafId = requestAnimationFrame(tick);
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            onResize();
        }, 150);
    }, { passive: true });
    
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    setSize();
    setLines();
    rafId = requestAnimationFrame(tick);
}
