/**
 * Enhancements JS — Micro-interactions, FAQ Accordions, Search & Form Handler
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ Search & Category Filter
    const faqSearchInput = document.getElementById('faq-search-input');
    const faqSearchClear = document.getElementById('faq-search-clear');
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryBtns = document.querySelectorAll('.faq-tab-btn');
    const categoryHeaders = document.querySelectorAll('.faq-category-header');

    if (faqSearchInput) {
        faqSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (faqSearchClear) {
                faqSearchClear.style.display = query ? 'block' : 'none';
            }

            faqItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            categoryHeaders.forEach(header => {
                const cat = header.getAttribute('data-category');
                const visibleInCat = document.querySelectorAll(`.faq-item[data-category="${cat}"][style*="display: block"], .faq-item[data-category="${cat}"]:not([style*="display: none"])`);
                header.style.display = (visibleInCat.length > 0 || !query) ? 'flex' : 'none';
            });
        });

        if (faqSearchClear) {
            faqSearchClear.addEventListener('click', () => {
                faqSearchInput.value = '';
                faqSearchClear.style.display = 'none';
                faqItems.forEach(item => item.style.display = 'block');
                categoryHeaders.forEach(h => h.style.display = 'flex');
            });
        }
    }

    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                const selectedCat = btn.getAttribute('data-category');
                faqItems.forEach(item => {
                    const itemCat = item.getAttribute('data-category');
                    if (selectedCat === 'all' || itemCat === selectedCat) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });

                categoryHeaders.forEach(h => {
                    const hCat = h.getAttribute('data-category');
                    if (selectedCat === 'all' || hCat === selectedCat) {
                        h.style.display = 'flex';
                    } else {
                        h.style.display = 'none';
                    }
                });
            });
        });
    }

    // 2. FAQ Accordion Toggle
    const faqQuestionBtns = document.querySelectorAll('.faq-question-btn');
    faqQuestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            const answer = btn.nextElementSibling;
            if (answer && answer.classList.contains('faq-answer')) {
                if (!isExpanded) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                } else {
                    answer.style.maxHeight = null;
                    answer.style.opacity = '0';
                }
            }
        });
    });

    // 3. Project Form Handler with DB Persistence + WhatsApp Redirect
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', async (e) => {
            const submitBtn = document.getElementById('submit-btn');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Enviar';

            const nombre = document.getElementById('nombre')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const telefono = document.getElementById('telefono')?.value.trim() || '';
            const empresa = document.getElementById('empresa')?.value.trim() || '';
            const servicio = document.getElementById('servicio_interes')?.value || '';
            const mensaje = document.getElementById('mensaje')?.value.trim() || '';

            // Format WhatsApp Message
            const whatsappMsg = `🚀 *NUEVA SOLICITUD DE PROYECTO — MYWEBSITE*

Hola equipo de *MyWebsite*, solicito cotización para el siguiente proyecto:

👤 *DATOS DEL CLIENTE:*
• *Nombre:* ${nombre}
• *Teléfono / WhatsApp:* ${telefono}
• *Correo:* ${email}
• *Empresa / Ciudad:* ${empresa || 'No especificada'}

💼 *SERVICIO REQUERIDO:*
• *Solución:* ${servicio}

📝 *DETALLES DEL REQUERIMIENTO:*
"${mensaje}"

---
_Enviado desde el formulario oficial en Laravel de MyWebsite_`;

            // Open WhatsApp in new tab
            const waUrl = `https://api.whatsapp.com/send/?phone=51900957415&text=${encodeURIComponent(whatsappMsg)}&type=phone_number&app_absent=0`;
            window.open(waUrl, '_blank');
        });
    }

    // 4. Scroll Reveal Animations (Framer-motion style)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .about-profile-card, .solucion-item, .faq-item, .about-philosophy-banner');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });
});
