import { createNoise2D } from 'https://cdn.jsdelivr.net/npm/simplex-noise@4.0.1/dist/esm/simplex-noise.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');

    // Add scroll effect for header (Shadow only, keep blur background)
    let isScrolled = false;
    window.addEventListener('scroll', () => {
        const shouldBeScrolled = window.scrollY > 50;
        if (shouldBeScrolled !== isScrolled) {
            isScrolled = shouldBeScrolled;
            header.style.boxShadow = isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none';
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
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }
});

function initWaves() {
    const container = document.getElementById('wave-intro');
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
        
        const xGap = 8;
        const yGap = 8;
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
        lines.forEach(points => {
            points.forEach(p => {
                const move = noise2D(
                    (p.x + time * 0.008) * 0.003,
                    (p.y + time * 0.003) * 0.002
                ) * 8;

                p.wave.x = Math.cos(move) * 12;
                p.wave.y = Math.sin(move) * 6;

                const dx = p.x - mouse.sx;
                const dy = p.y - mouse.sy;
                const d = Math.hypot(dx, dy);
                const l = Math.max(175, mouse.vs);

                if (d < l) {
                    const s = 1 - d / l;
                    const f = Math.cos(d * 0.001) * s;
                    p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00035;
                    p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00035;
                }

                p.cursor.vx += (0 - p.cursor.x) * 0.01;
                p.cursor.vy += (0 - p.cursor.y) * 0.01;

                p.cursor.vx *= 0.95;
                p.cursor.vy *= 0.95;

                p.cursor.x += p.cursor.vx;
                p.cursor.y += p.cursor.vy;

                p.cursor.x = Math.min(50, Math.max(-50, p.cursor.x));
                p.cursor.y = Math.min(50, Math.max(-50, p.cursor.y));
            });
        });
    }

    function moved(point, withCursorForce = true) {
        return {
            x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
            y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0)
        };
    }

    function drawLines() {
        lines.forEach((points, lIndex) => {
            if (points.length < 2 || !paths[lIndex]) return;
            const firstPoint = moved(points[0], false);
            let d = `M ${firstPoint.x} ${firstPoint.y}`;
            for (let i = 1; i < points.length; i++) {
                const current = moved(points[i]);
                d += `L ${current.x} ${current.y}`;
            }
            paths[lIndex].setAttribute('d', d);
        });
    }

    function tick(time) {
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

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchmove', onTouchMove, { passive: false });

    setSize();
    setLines();
    rafId = requestAnimationFrame(tick);
}
