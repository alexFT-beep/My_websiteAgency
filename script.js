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

    // Initialize modules
    initWaves();
    initFAQ();
    initScrollReveal();
    initFormValidation();
    initGlobalErrorHandling();
    initSkeletons();

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
                menuText.innerHTML = isActive ? 'Cerrar' : 'Ver menú <span class="mobile-arrow">→</span>';
            }
        };

        mobileMenuToggle.addEventListener('click', () => toggleMenu());

        // Close menu when a link is clicked
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }
});

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
    toast.innerHTML = `<span style="font-weight:bold; font-size:1.1rem; color:${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#00c3ff'}">${icon}</span> <span>${message}</span>`;
    
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
                // Unobserve once animated for optimal performance
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

    // Simulate resource hydration / image load complete
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

    // Attach real-time validation events to each input field
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
                // Empty untouched field
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

    // Handle Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

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

        showToast('¡Datos validados correctamente! Redirigiendo a WhatsApp...', 'success');

        const nombre = fields.nombre.element.value.trim();
        const correo = fields.correo.element.value.trim();
        const telefono = fields.telefono.element.value.trim();
        const ciudad = fields.ciudad.element.value.trim();
        const servicio = fields.servicio.element.value;
        const descripcion = fields.descripcion.element.value.trim();

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
_Mensaje generado automáticamente desde el formulario oficial de MyWebsite_`;

        const url = `https://api.whatsapp.com/send/?phone=51900957415&text=${encodeURIComponent(mensaje)}&type=phone_number&app_absent=0`;
        
        setTimeout(() => {
            window.open(url, '_blank');
        }, 800);
    });
}

// 14. Global JS Error Exception Listener
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
