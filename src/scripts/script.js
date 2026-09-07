import { createNoise2D } from 'simplex-noise';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

function initScript() {
    // Hide preloader if present
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }

    const header = document.getElementById('main-header');

    // Add scroll effect for header (Shadow only, keep blur background)
    let isScrolled = false;
    let ticking = false;
    if (header) {
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
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Initialize modules
    initWaves();
    initFAQ();
    initScrollReveal();
    initFormValidation();
    initGlobalErrorHandling();
    initSkeletons();
    initWebThreadsBackground();
    initFAQShardsBackground();
    initMoltenMetalBackground();

    // Mobile menu toggle with accessibility & body scroll lock
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuToggle && hamburger && mobileNav) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');

        const toggleMenu = (show) => {
            const isActive = show !== undefined ? show : hamburger.classList.toggle('active');
            if (show !== undefined) {
                hamburger.classList.toggle('active', isActive);
            }
            mobileNav.classList.toggle('active', isActive);
            mobileMenuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            document.body.style.overflow = isActive ? 'hidden' : '';
            
            const menuText = mobileMenuToggle.querySelector('.mobile-menu-text');
            if (menuText) {
                menuText.innerHTML = isActive ? 'Cerrar' : 'Ver más <span class="mobile-arrow">→</span>';
            }
        };

        mobileMenuToggle.addEventListener('click', () => toggleMenu());

        // Close menu when a link is clicked
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // Video Play/Pause Toggle
    document.querySelectorAll('.play-pause-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const video = this.previousElementSibling;
            const iconPlay = this.querySelector('.icon-play');
            const iconPause = this.querySelector('.icon-pause');

            if (video && video.paused) {
                document.querySelectorAll('.video-wrapper video').forEach(otherVideo => {
                    if (otherVideo !== video && !otherVideo.paused) {
                        otherVideo.pause();
                        const otherBtn = otherVideo.nextElementSibling;
                        if (otherBtn && otherBtn.classList.contains('play-pause-btn')) {
                            const pPlay = otherBtn.querySelector('.icon-play');
                            const pPause = otherBtn.querySelector('.icon-pause');
                            if (pPause) pPause.style.display = 'none';
                            if (pPlay) pPlay.style.display = 'block';
                        }
                    }
                });

                video.muted = false;
                video.play().catch(e => console.log('Play prevented', e));
                if (iconPlay) iconPlay.style.display = 'none';
                if (iconPause) iconPause.style.display = 'block';
            } else if (video) {
                video.pause();
                if (iconPlay) iconPlay.style.display = 'block';
                if (iconPause) iconPause.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.video-wrapper').forEach(wrapper => {
        wrapper.style.cursor = 'pointer';
        wrapper.addEventListener('click', function(e) {
            if (e.target.closest('.play-pause-btn')) return;
            const btn = this.querySelector('.play-pause-btn');
            if (btn) btn.click();
        });
    });

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.dataset.src && !video.src) {
                    video.src = video.dataset.src;
                    video.load();
                }
            } else {
                video.pause();
                const btn = video.nextElementSibling;
                if (btn && btn.classList.contains('play-pause-btn')) {
                    const pPlay = btn.querySelector('.icon-play');
                    const pPause = btn.querySelector('.icon-pause');
                    if (pPause) pPause.style.display = 'none';
                    if (pPlay) pPlay.style.display = 'block';
                }
            }
        });
    }, { rootMargin: "300px 0px" });

    document.querySelectorAll('.video-wrapper video').forEach(video => {
        videoObserver.observe(video);
    });
}

// Toast notification helper
export function showToast(message, type = 'info', duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    const safeMsg = String(message).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    toast.innerHTML = `<span style="font-weight:bold; font-size:1.1rem; color:${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#00c3ff'}">${icon}</span> <span>${safeMsg}</span>`;
    
    container.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// 1. Scroll Reveal Observer
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// 8. Skeleton Loaders Handler
function initSkeletons() {
    const skeletons = document.querySelectorAll('.skeleton');
    if (!skeletons.length) return;

    window.addEventListener('load', () => {
        skeletons.forEach(sk => sk.classList.remove('skeleton'));
    });
}

// 13. Form Interactive Real-time Validation
function initFormValidation() {
    const form = document.getElementById('project-form');
    if (!form) return;

    const fields = {
        nombre: {
            element: document.getElementById('nombre'),
            validate: val => val.trim().length >= 3,
            errorMsg: 'Ingresa al menos 3 caracteres en tu nombre.'
        },
        correo: {
            element: document.getElementById('correo'),
            validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
            errorMsg: 'Ingresa un correo electrónico válido.'
        },
        telefono: {
            element: document.getElementById('telefono'),
            validate: val => /^[0-9]{8,15}$/.test(val.trim()),
            errorMsg: 'Ingresa un número telefónico válido (8 a 15 dígitos).'
        },
        ciudad: {
            element: document.getElementById('ciudad'),
            validate: val => val.trim().length >= 2,
            errorMsg: 'Ingresa tu ciudad o país.'
        },
        servicio: {
            element: document.getElementById('servicio'),
            validate: val => val && val.length > 0,
            errorMsg: 'Selecciona un servicio de la lista.'
        },
        descripcion: {
            element: document.getElementById('descripcion'),
            validate: val => val.trim().length >= 10,
            errorMsg: 'Explícanos tu requerimiento en al menos 10 caracteres.'
        }
    };

    const progressFill = document.getElementById('form-progress-fill');
    const progressText = document.getElementById('form-progress-text');

    const updateFormProgress = () => {
        if (!progressFill || !progressText) return;
        let filledCount = 0;
        const totalKeys = Object.keys(fields);
        const total = totalKeys.length;

        totalKeys.forEach(key => {
            const el = fields[key].element;
            if (el) {
                const val = el.value ? el.value.trim() : '';
                if (val.length > 0) {
                    filledCount++;
                }
            }
        });

        const percentage = Math.round((filledCount / total) * 100);
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;
    };

    updateFormProgress();
    form.addEventListener('input', updateFormProgress);
    form.addEventListener('change', updateFormProgress);

    Object.keys(fields).forEach(key => {
        const field = fields[key];
        if (!field.element) return;

        const parent = field.element.closest('.form-group') || field.element.parentElement;
        let msgEl = parent.querySelector('.field-msg');
        if (!msgEl) {
            msgEl = document.createElement('div');
            msgEl.className = 'field-msg';
            parent.appendChild(msgEl);
        }

        const validateField = () => {
            const val = field.element.value;
            if (!val && !field.element.classList.contains('is-invalid') && !field.element.classList.contains('is-valid')) {
                return true;
            }

            const isValid = field.validate(val);
            if (isValid) {
                field.element.classList.remove('is-invalid');
                field.element.classList.add('is-valid');
                msgEl.className = 'field-msg success-msg';
                msgEl.textContent = '✓ Correcto';
            } else {
                field.element.classList.remove('is-valid');
                field.element.classList.add('is-invalid');
                msgEl.className = 'field-msg error-msg';
                msgEl.textContent = `✕ ${field.errorMsg}`;
            }
            return isValid;
        };

        field.element.addEventListener('input', validateField);
        field.element.addEventListener('blur', validateField);
    });

    const formInitTime = Date.now();

    const sanitizeInput = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\\/g, '')
            .trim();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const hpCheck = document.getElementById('b_hp_website_check');
        if (hpCheck && hpCheck.value && hpCheck.value.trim() !== '') {
            console.warn('[Security] Automated bot submission detected & blocked.');
            return;
        }

        if (Date.now() - formInitTime < 1500) {
            showToast('⚠️ Solicitud procesada demasiado rápido. Por favor intenta nuevamente.', 'error');
            return;
        }

        const lastSubmit = sessionStorage.getItem('mw_last_submit_ts');
        const now = Date.now();
        if (lastSubmit && (now - parseInt(lastSubmit, 10)) < 6000) {
            showToast('⚠️ Aguarda unos segundos antes de enviar otra solicitud.', 'error');
            return;
        }

        let isFormValid = true;
        Object.keys(fields).forEach(key => {
            const field = fields[key];
            if (!field.element) return;
            const parent = field.element.closest('.form-group') || field.element.parentElement;
            let msgEl = parent.querySelector('.field-msg');

            const isValid = field.validate(field.element.value);
            if (!isValid) {
                isFormValid = false;
                field.element.classList.remove('is-valid');
                field.element.classList.add('is-invalid');
                if (msgEl) {
                    msgEl.className = 'field-msg error-msg';
                    msgEl.textContent = `✕ ${field.errorMsg}`;
                }
            } else {
                field.element.classList.remove('is-invalid');
                field.element.classList.add('is-valid');
            }
        });

        if (!isFormValid) {
            showToast('Por favor corrige los campos indicados antes de enviar.', 'error');
            return;
        }

        sessionStorage.setItem('mw_last_submit_ts', now.toString());
        showToast('¡Datos validados correctamente! Redirigiendo a WhatsApp...', 'success');

        const nombre = sanitizeInput(fields.nombre.element.value);
        const correo = sanitizeInput(fields.correo.element.value);
        const telefono = sanitizeInput(fields.telefono.element.value);
        const ciudad = sanitizeInput(fields.ciudad.element.value);
        const servicio = sanitizeInput(fields.servicio.element.value);
        const descripcion = sanitizeInput(fields.descripcion.element.value);

        const mensaje = `🚀 *NUEVA SOLICITUD DE PROYECTO — MYWEBSITE*

Hola equipo de *MyWebsite*, solicito información y cotización para el siguiente requerimiento:

👤 *DATOS DEL CLIENTE:*
• *Nombre:* ${nombre}
• *Teléfono / WhatsApp:* ${telefono}
• *Correo:* ${correo}
• *Ubicación:* ${ciudad}

💼 *SERVICIO REQUERIDO:*
• *Solución:* ${servicio}

📝 *DETALLES DEL PROYECTO:*
"${descripcion}"

---
_Mensaje generado de forma segura desde el formulario oficial de MyWebsite_`;

        const url = `https://api.whatsapp.com/send/?phone=51900957415&text=${encodeURIComponent(mensaje)}&type=phone_number&app_absent=0`;
        
        setTimeout(() => {
            window.open(url, '_blank', 'noopener,noreferrer');
        }, 800);
    });
}

function initGlobalErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('[MyWebsite Exception caught]:', event.error || event.message);
    });

    window.addEventListener('unhandledrejection', (event) => {
        console.error('[MyWebsite Unhandled Promise Rejection]:', event.reason);
    });
}

function initFAQ() {
    const faqContainer = document.querySelector('.faq-content-container');
    if (!faqContainer) return;

    const accordionBtns = document.querySelectorAll('.faq-question-btn');
    const tabBtns = document.querySelectorAll('.faq-tab-btn');
    const searchInput = document.getElementById('faq-search-input');
    const searchClearBtn = document.getElementById('faq-search-clear');
    const categoryHeaders = document.querySelectorAll('.faq-category-header');
    const noResults = document.querySelector('.faq-no-results');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            if (!item) return;

            const isOpen = item.classList.contains('active');
            item.classList.toggle('active', !isOpen);
        });
    });

    tabBtns.forEach(tab => {
        tab.addEventListener('click', () => {
            tabBtns.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;
            filterFAQ(category, searchInput ? searchInput.value.trim().toLowerCase() : '');
        });
    });

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

    const STOP_WORDS = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'en', 'para', 'por', 'con', 'sin', 'mi', 'tu', 'su', 'que', 'se', 'y', 'o', 'a', 'es', 'son', 'un']);

    function normalizeText(text) {
        if (!text) return '';
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, " ")
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
        if (targetNormalizedText.includes(term)) return true;

        const termStem = getWordStem(term);
        if (termStem.length >= 3 && targetNormalizedText.includes(termStem)) return true;

        if (termStem.length >= 3 && targetStems.some(stem => stem === termStem || stem.startsWith(termStem) || termStem.startsWith(stem))) {
            return true;
        }

        return false;
    }

    function filterFAQ(category, query) {
        let visibleCount = 0;
        const normalizedQuery = normalizeText(query);
        let queryTerms = normalizedQuery ? normalizedQuery.split(' ').filter(Boolean) : [];

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
    const container = document.querySelector('.waves-component') || document.getElementById('wave-intro');
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

    const strokeColor = "rgba(142, 45, 226, 0.6)";
    
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
        bounding = container.getBoundingClientRect();
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
    
    window.addEventListener('scroll', () => {
        if (container) {
            bounding = container.getBoundingClientRect();
        }
    }, { passive: true });

    setSize();
    setLines();
    rafId = requestAnimationFrame(tick);
}

function initWebThreadsBackground() {
    const container = document.getElementById('web-threads-bg');
    if (!container) return;

    const hexToRgb = hex => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return [1, 1, 1];
        return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
    };

    const FAN_MODE = { center: 0, left: 1, right: 2 };

    const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

    const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uThreadCount;
uniform float uFrequency;
uniform float uSpread;
uniform float uTaper;
uniform float uPosition;
uniform float uFanMode;
uniform float uGlow;
uniform float uFalloff;
uniform float uThickness;
uniform float uBrightness;
uniform float uOpacity;
uniform float uMirror;
uniform float uShimmer;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uBackgroundColor;
uniform bool uLightMode;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uEnableMouse;
uniform float uMouseActive;
out vec4 fragColor;

#define TAU 6.28318530718
#define MAX_THREADS 10

float glow(float x, float str, float dist) {
  return dist / pow(max(x, 1e-4), str);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float n = max(uThreadCount, 1.0);

  float pinchX = uFanMode < 0.5 ? 0.5 : (uFanMode < 1.5 ? 0.0 : 1.0);
  if (uEnableMouse > 0.5) {
    pinchX = mix(pinchX, uMouse.x, clamp(uMouseStrength, 0.0, 1.0) * uMouseActive);
  }

  float spreadDx = uSpread * abs(uv.x - pinchX);
  float baseT = iTime * uSpeed;
  float tauOverN = TAU / n;
  float mirror = uMirror > 0.5 ? sign(pinchX - uv.x) : 1.0;
  bool doShimmer = uShimmer > 0.5;
  float shimmerT = iTime * 1.7;
  float invThickness = 1.0 / max(uThickness, 0.01);
  float xFreq = uv.x * uFrequency;
  float yOff = uv.y - uPosition;
  float ciScale = n > 1.0 ? 1.0 / (n - 1.0) : 0.0;

  vec3 col = vec3(0.0);
  float gsum = 0.0;

  for (int idx = 0; idx < MAX_THREADS; idx++) {
    float i = float(idx);
    if (i >= n) break;

    float amplitude = spreadDx * (1.0 + i * uTaper);
    float shimmer = doShimmer ? sin(shimmerT + i * 1.3) * 0.35 : 0.0;
    float phase = (baseT + i * tauOverN) * mirror + shimmer;

    float sdf = abs(yOff + sin(xFreq + phase) * amplitude) * invThickness;

    float g = glow(sdf, uFalloff, uGlow);
    float ci = i * ciScale;
    vec3 threadCol = mix(uColor1, uColor2, ci);

    col += g * threadCol;
    gsum += g;
  }

  float coreAmt = smoothstep(0.5, 2.2, gsum);
  col = mix(col, uColor3 * gsum, coreAmt * 0.5);

  float bright = uBrightness;
  if (uEnableMouse > 0.5) {
    vec2 md = uv - uMouse;
    float d2 = dot(md, md);
    bright += clamp(uMouseStrength, 0.0, 1.0) * uMouseActive * exp(-d2 * 6.0) * 0.6;
  }
  col *= bright;

  float alpha = clamp(gsum, 0.0, 1.0) * uOpacity;
  vec3 outRgb = col * alpha;

  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    alpha = clamp(alpha + gv, 0.0, 1.0);
  }

  if (uLightMode) {
    vec3 mapped = vec3(1.0) - exp(-max(col, vec3(0.0)) * 1.3);
    float rawEnergy = clamp(max(mapped.r, max(mapped.g, mapped.b)) * uOpacity, 0.0, 1.0);
    float coverage = smoothstep(0.18, 0.72, rawEnergy);
    coverage *= coverage;
    vec3 hue = mapped / max(max(mapped.r, max(mapped.g, mapped.b)), 1e-4);
    vec3 chroma = pow(clamp(hue, 0.0, 1.0), vec3(0.78));
    vec3 pigment = mix(chroma, vec3(0.08), 0.12);
    vec3 ink = mix(vec3(0.9), pigment, 0.82 + coverage * 0.18);
    fragColor = vec4(mix(uBackgroundColor, ink, coverage), 1.0);
  } else {
    fragColor = vec4(outRgb, alpha);
  }
}
`;

    const options = {
        color1: '#8E35FF',
        color2: '#C084FC',
        color3: '#FFFFFF',
        speed: 0.2,
        threadCount: 6,
        frequency: 5.0,
        spread: 0.18,
        taper: 1.0,
        position: 0.5,
        fanMode: 'center',
        glow: 0.02,
        falloff: 0.6,
        thickness: 1.1,
        brightness: 0.6,
        opacity: 1.0,
        mirror: true,
        shimmer: false,
        grain: true,
        grainIntensity: 0.05,
        mouseInteraction: true,
        mouseStrength: 0.3,
        backgroundColor: '#0A0A0C',
        lightMode: false
    };

    try {
        const renderer = new Renderer({
            webgl: 2,
            alpha: true,
            premultipliedAlpha: true,
            antialias: false,
            powerPreference: 'high-performance',
            dpr: Math.min(window.devicePixelRatio || 1, 1.5)
        });

        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        const canvas = gl.canvas;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        container.appendChild(canvas);

        const geometry = new Triangle(gl);

        const rgb1 = hexToRgb(options.color1);
        const rgb2 = hexToRgb(options.color2);
        const rgb3 = hexToRgb(options.color3);
        const bgRgb = hexToRgb(options.backgroundColor);

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new Float32Array([1, 1]) },
                uSpeed: { value: options.speed },
                uThreadCount: { value: Math.round(options.threadCount) },
                uFrequency: { value: options.frequency },
                uSpread: { value: options.spread },
                uTaper: { value: options.taper },
                uPosition: { value: options.position },
                uFanMode: { value: FAN_MODE[options.fanMode] ?? 0 },
                uGlow: { value: options.glow },
                uFalloff: { value: options.falloff },
                uThickness: { value: options.thickness },
                uBrightness: { value: options.brightness },
                uOpacity: { value: options.opacity },
                uMirror: { value: options.mirror ? 1.0 : 0.0 },
                uShimmer: { value: options.shimmer ? 1.0 : 0.0 },
                uGrain: { value: options.grain ? 1.0 : 0.0 },
                uGrainIntensity: { value: options.grainIntensity },
                uColor1: { value: new Float32Array(rgb1) },
                uColor2: { value: new Float32Array(rgb2) },
                uColor3: { value: new Float32Array(rgb3) },
                uBackgroundColor: { value: new Float32Array(bgRgb) },
                uLightMode: { value: options.lightMode },
                uMouse: { value: new Float32Array([0.5, 0.5]) },
                uMouseStrength: { value: options.mouseStrength },
                uEnableMouse: { value: options.mouseInteraction ? 1.0 : 0.0 },
                uMouseActive: { value: 0 }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        const setSize = () => {
            const rect = container.getBoundingClientRect();
            const w = Math.max(1, Math.floor(rect.width));
            const h = Math.max(1, Math.floor(rect.height));
            renderer.setSize(w, h);
            const res = program.uniforms.iResolution.value;
            res[0] = gl.drawingBufferWidth;
            res[1] = gl.drawingBufferHeight;
            renderer.render({ scene: mesh });
        };

        const ro = new ResizeObserver(setSize);
        ro.observe(container);
        setSize();

        const currentMouse = [0.5, 0.5];
        const targetMouse = [0.5, 0.5];
        let currentActive = 0;
        let targetActive = 0;

        const onMouseMove = e => {
            const rect = canvas.getBoundingClientRect();
            targetMouse[0] = (e.clientX - rect.left) / rect.width;
            targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
            targetActive = 1;
        };
        const onMouseEnter = () => { targetActive = 1; };
        const onMouseLeave = () => { targetActive = 0; };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        container.addEventListener('mouseenter', onMouseEnter, { passive: true });
        container.addEventListener('mouseleave', onMouseLeave, { passive: true });

        let raf = 0;
        let isVisible = true;
        let isPageVisible = !document.hidden;
        const t0 = performance.now();

        const loop = t => {
            program.uniforms.iTime.value = (t - t0) * 0.001;
            currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
            currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
            currentActive += 0.05 * (targetActive - currentActive);
            program.uniforms.uMouse.value[0] = currentMouse[0];
            program.uniforms.uMouse.value[1] = currentMouse[1];
            program.uniforms.uMouseActive.value = currentActive;
            renderer.render({ scene: mesh });
            raf = requestAnimationFrame(loop);
        };

        const tryStart = () => {
            if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
        };
        const tryStop = () => {
            if (raf !== 0) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                isVisible ? tryStart() : tryStop();
            },
            { threshold: 0 }
        );
        io.observe(container);

        const onVisibility = () => {
            isPageVisible = !document.hidden;
            isPageVisible ? tryStart() : tryStop();
        };
        document.addEventListener('visibilitychange', onVisibility);

        tryStart();
    } catch (e) {
        console.warn('WebThreads WebGL initialization failed', e);
    }
}

function initFAQShardsBackground() {
    const container = document.getElementById('faq-shards-bg');
    if (!container) return;

    const hexToRgb = hex => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return [0, 0, 0];
        return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
    };

    const options = {
        backgroundColor: '#0A0A0C',
        shardColor: '#8E35FF',
        accentColor: '#A855F7',
        highlightColor: '#896ABD',
        speed: 0.8,
        shardSize: 1.1
    };

    try {
        const renderer = new Renderer({
            webgl: 2,
            alpha: true,
            premultipliedAlpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            dpr: Math.min(window.devicePixelRatio || 1, 1.5)
        });

        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        const canvas = gl.canvas;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        container.appendChild(canvas);

        const geometry = new Triangle(gl);

        const vertex = `#version 300 es
in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

        const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uBackgroundColor;
uniform vec3 uShardColor;
uniform vec3 uAccentColor;
uniform vec3 uHighlightColor;
uniform float uSpeed;
uniform float uShardSize;
uniform vec2 uMouse;
uniform float uMouseActive;
out vec4 fragColor;

vec3 hash33(vec3 p) {
    p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
              dot(p,vec3(269.5,183.3,246.1)),
              dot(p,vec3(113.5,271.9,124.6)));
    return fract(sin(p)*43758.5453123);
}

vec4 voronoiShards(vec3 p) {
    vec3 n = floor(p);
    vec3 f = fract(p);

    float md = 8.0;
    float md2 = 8.0;
    vec3 mr = vec3(0.0);

    for(int k=-1; k<=1; k++) {
        for(int j=-1; j<=1; j++) {
            for(int i=-1; i<=1; i++) {
                vec3 g = vec3(float(i), float(j), float(k));
                vec3 o = hash33(n + g);
                o = 0.5 + 0.45 * sin(iTime * uSpeed * 0.7 + 6.2831 * o);
                vec3 r = g + o - f;
                float d = dot(r, r);

                if(d < md) {
                    md2 = md;
                    md = d;
                    mr = r;
                } else if(d < md2) {
                    md2 = d;
                }
            }
        }
    }

    float edge = md2 - md;
    return vec4(mr, edge);
}

void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * iResolution.xy) / min(iResolution.x, iResolution.y);
    vec2 mouseOffset = (uMouse - 0.5) * 0.3 * uMouseActive;
    st -= mouseOffset;

    vec3 rayPos = vec3(st * 3.2 / uShardSize, iTime * 0.15 * uSpeed);
    float angle = iTime * 0.04;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    rayPos.xy = rot * rayPos.xy;

    vec4 shardData = voronoiShards(rayPos);
    vec3 cellPos = shardData.xyz;
    float edge = shardData.w;

    vec3 norm = normalize(cellPos + vec3(0.001));
    vec3 lightDir = normalize(vec3(0.5, 0.8, -0.6));
    float diff = max(dot(norm, lightDir), 0.0);
    
    vec3 viewDir = vec3(0.0, 0.0, -1.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(norm, halfDir), 0.0), 24.0);

    float edgeGlow = smoothstep(0.0, 0.22, edge);
    float sharpLines = 1.0 - smoothstep(0.015, 0.06, edge);

    float colorMix = 0.5 + 0.5 * sin(cellPos.x * 3.0 + cellPos.y * 2.0 + iTime * 0.5);
    vec3 shardBase = mix(uShardColor, uAccentColor, colorMix);
    
    vec3 finalColor = shardBase * (0.2 + 0.7 * diff) + uHighlightColor * spec * 0.8;
    finalColor += uAccentColor * sharpLines * 1.4;

    float distToCenter = length(st);
    float bgFade = smoothstep(1.3, 0.2, distToCenter);
    
    vec3 col = mix(uBackgroundColor, finalColor, edgeGlow * bgFade * 0.7);
    fragColor = vec4(col, 1.0);
}
`;

        const bgRgb = hexToRgb(options.backgroundColor);
        const shardRgb = hexToRgb(options.shardColor);
        const accentRgb = hexToRgb(options.accentColor);
        const highlightRgb = hexToRgb(options.highlightColor);

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new Float32Array([1, 1]) },
                uBackgroundColor: { value: new Float32Array(bgRgb) },
                uShardColor: { value: new Float32Array(shardRgb) },
                uAccentColor: { value: new Float32Array(accentRgb) },
                uHighlightColor: { value: new Float32Array(highlightRgb) },
                uSpeed: { value: options.speed },
                uShardSize: { value: options.shardSize },
                uMouse: { value: new Float32Array([0.5, 0.5]) },
                uMouseActive: { value: 0 }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        const setSize = () => {
            const rect = container.getBoundingClientRect();
            const w = Math.max(1, Math.floor(rect.width));
            const h = Math.max(1, Math.floor(rect.height));
            renderer.setSize(w, h);
            const res = program.uniforms.iResolution.value;
            res[0] = gl.drawingBufferWidth;
            res[1] = gl.drawingBufferHeight;
            renderer.render({ scene: mesh });
        };

        const ro = new ResizeObserver(setSize);
        ro.observe(container);
        setSize();

        const currentMouse = [0.5, 0.5];
        const targetMouse = [0.5, 0.5];
        let currentActive = 0;
        let targetActive = 0;

        const onMouseMove = e => {
            targetMouse[0] = e.clientX / window.innerWidth;
            targetMouse[1] = 1.0 - (e.clientY / window.innerHeight);
            targetActive = 1;
        };
        const onMouseEnter = () => { targetActive = 1; };
        const onMouseLeave = () => { targetActive = 0; };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mouseenter', onMouseEnter, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave, { passive: true });

        let raf = 0;
        let isVisible = true;
        let isPageVisible = !document.hidden;
        const t0 = performance.now();

        const loop = t => {
            program.uniforms.iTime.value = (t - t0) * 0.001;
            currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
            currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
            currentActive += 0.05 * (targetActive - currentActive);
            program.uniforms.uMouse.value[0] = currentMouse[0];
            program.uniforms.uMouse.value[1] = currentMouse[1];
            program.uniforms.uMouseActive.value = currentActive;
            renderer.render({ scene: mesh });
            raf = requestAnimationFrame(loop);
        };

        const tryStart = () => {
            if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
        };
        const tryStop = () => {
            if (raf !== 0) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                isVisible ? tryStart() : tryStop();
            },
            { threshold: 0 }
        );
        io.observe(container);

        const onVisibility = () => {
            isPageVisible = !document.hidden;
            isPageVisible ? tryStart() : tryStop();
        };
        document.addEventListener('visibilitychange', onVisibility);

        tryStart();
    } catch (e) {
        console.warn('FAQShards WebGL initialization failed', e);
    }
}

function initMoltenMetalBackground() {
    const container = document.getElementById('molten-metal-bg');
    if (!container) return;

    const hexToRgb = hex => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return [1, 1, 1];
        return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
    };

    const options = {
        color1: '#3B1599',
        color2: '#8E35FF',
        color3: '#FF9FFC',
        backgroundColor: '#0A0A0C',
        speed: 0.35,
        scale: 4,
        detail: 3,
        glow: 1.6,
        coreSize: 0.1,
        swirl: 1,
        fold: -0.2,
        blackPoint: 0.05,
        brightness: 1.3,
        colorMode: 0,
        grain: true,
        grainIntensity: 0.05,
        mouseInteraction: true,
        mouseStrength: 0.3,
        opacity: 1.0,
        lightMode: false
    };

    try {
        const renderer = new Renderer({
            webgl: 2,
            alpha: true,
            premultipliedAlpha: true,
            antialias: false,
            dpr: Math.min(window.devicePixelRatio || 1, 1.5)
        });

        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        const canvas = gl.canvas;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        container.appendChild(canvas);

        const geometry = new Triangle(gl);

        const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

        const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uBackgroundColor;
uniform bool uLightMode;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;

  vec2 drift = vec2(0.0);
  if (uEnableMouse) {
    drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  }
  p += drift;

  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;

  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;

  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }

  c /= 6.0;
  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;
  float g = clamp(intensity, 0.0, 1.0);

  float mid = 0.5;
  if (uColorMode > 1.5) {
    mid = 0.65;
  } else if (uColorMode > 0.5) {
    mid = 0.35;
  }

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));

  float a = g;
  if (uGrain > 0.5) {
    float gr = hash(gl_FragCoord.xy + iTime);
    a += (gr - 0.5) * uGrainIntensity;
  }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  if (uLightMode) {
    float signal = 1.0 - exp(-max(c, 0.0) * 6.5);
    float body = smoothstep(0.075, 0.68, signal);
    float ridge = smoothstep(0.42, 0.92, signal);

    vec3 lightCol = mix(uColor1, uColor2, smoothstep(0.08, 0.52, signal));
    lightCol = mix(lightCol, uColor3, smoothstep(0.52, 0.96, signal));
    lightCol = mix(lightCol, lightCol * 0.72, ridge * 0.24);

    float coverage = body * mix(0.2, 0.86, signal) * uOpacity;
    if (uGrain > 0.5) {
      float gr = hash(gl_FragCoord.xy + iTime);
      coverage += (gr - 0.5) * uGrainIntensity * body * 0.16;
    }
    fragColor = vec4(mix(uBackgroundColor, lightCol, clamp(coverage, 0.0, 0.92)), 1.0);
  } else {
    fragColor = vec4(col * a, a);
  }
}
`;

        const c1 = hexToRgb(options.color1);
        const c2 = hexToRgb(options.color2);
        const c3 = hexToRgb(options.color3);
        const bg = hexToRgb(options.backgroundColor);

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new Float32Array([1, 1]) },
                uSpeed: { value: options.speed },
                uScale: { value: options.scale },
                uDetail: { value: options.detail },
                uGlow: { value: options.glow },
                uCoreSize: { value: options.coreSize },
                uSwirl: { value: options.swirl },
                uFold: { value: options.fold },
                uBlackPoint: { value: options.blackPoint },
                uBrightness: { value: options.brightness },
                uColorMode: { value: options.colorMode },
                uGrain: { value: options.grain ? 1 : 0 },
                uGrainIntensity: { value: options.grainIntensity },
                uOpacity: { value: options.opacity },
                uMouse: { value: new Float32Array([0.5, 0.5]) },
                uMouseStrength: { value: options.mouseStrength },
                uEnableMouse: { value: options.mouseInteraction },
                uColor1: { value: new Float32Array(c1) },
                uColor2: { value: new Float32Array(c2) },
                uColor3: { value: new Float32Array(c3) },
                uBackgroundColor: { value: new Float32Array(bg) },
                uLightMode: { value: options.lightMode }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        const setSize = () => {
            const rect = container.getBoundingClientRect();
            const w = Math.max(1, Math.floor(rect.width));
            const h = Math.max(1, Math.floor(rect.height));
            renderer.setSize(w, h);
            const res = program.uniforms.iResolution.value;
            res[0] = gl.drawingBufferWidth;
            res[1] = gl.drawingBufferHeight;
            renderer.render({ scene: mesh });
        };

        const ro = new ResizeObserver(setSize);
        ro.observe(container);
        setSize();

        const targetMouse = [0.5, 0.5];
        const currentMouse = [0.5, 0.5];

        const onMouseMove = e => {
            const rect = canvas.getBoundingClientRect();
            targetMouse[0] = (e.clientX - rect.left) / rect.width;
            targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
        };
        const onMouseLeave = () => {
            targetMouse[0] = 0.5;
            targetMouse[1] = 0.5;
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        canvas.addEventListener('mouseleave', onMouseLeave, { passive: true });

        let raf = 0;
        let isVisible = true;
        let isPageVisible = !document.hidden;
        const t0 = performance.now();

        const loop = t => {
            program.uniforms.iTime.value = (t - t0) * 0.001;
            currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
            currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
            program.uniforms.uMouse.value[0] = currentMouse[0];
            program.uniforms.uMouse.value[1] = currentMouse[1];
            renderer.render({ scene: mesh });
            raf = requestAnimationFrame(loop);
        };

        const tryStart = () => {
            if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
        };
        const tryStop = () => {
            if (raf !== 0) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                isVisible ? tryStart() : tryStop();
            },
            { threshold: 0 }
        );
        io.observe(container);

        const onVisibility = () => {
            isPageVisible = !document.hidden;
            isPageVisible ? tryStart() : tryStop();
        };
        document.addEventListener('visibilitychange', onVisibility);

        tryStart();
    } catch (e) {
        console.warn('MoltenMetal WebGL initialization failed', e);
    }
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScript);
    } else {
        initScript();
    }
    document.addEventListener('astro:page-load', initScript);
}
