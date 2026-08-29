@extends('layouts.app')

@php
    $bodyClass = 'faq-page-body';
@endphp

@section('content')
<!-- Hero Section FAQ -->
<section class="faq-hero-container">
    <div class="faq-badge">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        Centro de Ayuda & Respuestas
    </div>
    <h1 class="faq-main-title">
        Preguntas <span class="text-accent glow">Frecuentes</span>
    </h1>
    <p class="faq-subtitle">
        Respuestas claras y detalladas sobre nuestras soluciones digitales, Agentes de IA, cartas interactivas,
        procesos de desarrollo, soporte y arquitectura para tu negocio.
    </p>

    <!-- Live Search Bar -->
    <div class="faq-search-wrapper">
        <input type="text" id="faq-search-input" class="faq-search-input"
            placeholder="Busca una duda (ej. precios, IA, carta digital, soporte)..."
            aria-label="Buscar en preguntas frecuentes">
        <svg class="faq-search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <button type="button" id="faq-search-clear" class="faq-search-clear"
            aria-label="Limpiar búsqueda">&times;</button>
    </div>
</section>

<!-- Category Tabs Filter -->
<section class="faq-tabs-wrapper">
    <div class="faq-tabs-container" role="tablist">
        <button type="button" class="faq-tab-btn active" data-category="all" role="tab" aria-selected="true">
            <span>✨ Todas</span>
            <span class="badge-count">26</span>
        </button>
        <button type="button" class="faq-tab-btn" data-category="general" role="tab" aria-selected="false">
            <span>🚀 General</span>
            <span class="badge-count">6</span>
        </button>
        <button type="button" class="faq-tab-btn" data-category="precios" role="tab" aria-selected="false">
            <span>💰 Precios</span>
            <span class="badge-count">3</span>
        </button>
        <button type="button" class="faq-tab-btn" data-category="ia" role="tab" aria-selected="false">
            <span>🤖 IA & Automatización</span>
            <span class="badge-count">4</span>
        </button>
        <button type="button" class="faq-tab-btn" data-category="desarrollo" role="tab" aria-selected="false">
            <span>💻 Desarrollo</span>
            <span class="badge-count">4</span>
        </button>
        <button type="button" class="faq-tab-btn" data-category="web" role="tab" aria-selected="false">
            <span>📱 Web & Apps</span>
            <span class="badge-count">3</span>
        </button>
        <button type="button" class="faq-tab-btn" data-category="soporte" role="tab" aria-selected="false">
            <span>🛠️ Soporte</span>
            <span class="badge-count">4</span>
        </button>
        <button type="button" class="faq-tab-btn" data-category="seguridad" role="tab" aria-selected="false">
            <span>🔒 Seguridad</span>
            <span class="badge-count">2</span>
        </button>
    </div>
</section>

<!-- FAQ Accordion List by Categories -->
<section class="faq-content-container">

    <!-- CATEGORIA 1: GENERAL -->
    <div class="faq-category-header" data-category="general">
        <span class="category-icon">🚀</span>
        <h2>General</h2>
    </div>
    <div class="faq-accordion-list">
        <div class="faq-item glassmorphism" data-category="general">
            <button type="button" class="faq-question-btn" aria-expanded="false">
                <div class="faq-question-content">
                    <span class="faq-q-number">01.</span>
                    <span class="faq-question-text">¿Por qué contratar a MyWebsite y no solo una página web genérica?</span>
                </div>
                <span class="faq-cat-badge">General</span>
                <div class="faq-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-inner">
                    En MyWebsite no solo diseñamos páginas atractivas; creamos un ecosistema digital integral (web ultra rápida + sistemas interactivos + agentes de IA 24/7 + automatizaciones). Nuestras soluciones están construidas bajo Clean Architecture para convertir visitas en clientes reales y reducir tu carga operativa.
                </div>
            </div>
        </div>

        <div class="faq-item glassmorphism" data-category="general">
            <button type="button" class="faq-question-btn" aria-expanded="false">
                <div class="faq-question-content">
                    <span class="faq-q-number">02.</span>
                    <span class="faq-question-text">No sé qué solución necesita mi negocio, ¿qué hago?</span>
                </div>
                <span class="faq-cat-badge">General</span>
                <div class="faq-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-inner">
                    ¡No te preocupes! Ofrecemos un diagnóstico inicial personalizado totalmente gratuito. Analizamos tus canales de venta, cuellos de botella y operativa actual para recomendarte la solución exacta con el mayor retorno de inversión.
                </div>
            </div>
        </div>

        <div class="faq-item glassmorphism" data-category="general">
            <button type="button" class="faq-question-btn" aria-expanded="false">
                <div class="faq-question-content">
                    <span class="faq-q-number">03.</span>
                    <span class="faq-question-text">¿Cómo empiezo?</span>
                </div>
                <span class="faq-cat-badge">General</span>
                <div class="faq-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-inner">
                    Solo haz clic en <a href="{{ route('formulario') }}" class="text-accent" style="text-decoration: underline;">Empezar Ahora</a> o escríbenos por WhatsApp. Coordinamos una reunión breve para entender tus metas y entregarte una propuesta técnica inmediata.
                </div>
            </div>
        </div>
    </div>

    <!-- CATEGORIA 2: PRECIOS -->
    <div class="faq-category-header" data-category="precios">
        <span class="category-icon">💰</span>
        <h2>Precios</h2>
    </div>
    <div class="faq-accordion-list">
        <div class="faq-item glassmorphism" data-category="precios">
            <button type="button" class="faq-question-btn" aria-expanded="false">
                <div class="faq-question-content">
                    <span class="faq-q-number">04.</span>
                    <span class="faq-question-text">¿Cuánto cuesta una solución digital a medida?</span>
                </div>
                <span class="faq-cat-badge">Precios</span>
                <div class="faq-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-inner">
                    Contamos con planes modulares adaptados al tamaño de cada empresa, desde cartas interactivas y agentes de IA hasta desarrollos full-stack y sistemas móviles reactivos. Brindamos cotizaciones 100% transparentes sin costos ocultos.
                </div>
            </div>
        </div>
    </div>

    <!-- CATEGORIA 3: IA & AUTOMATIZACION -->
    <div class="faq-category-header" data-category="ia">
        <span class="category-icon">🤖</span>
        <h2>IA & Automatización</h2>
    </div>
    <div class="faq-accordion-list">
        <div class="faq-item glassmorphism" data-category="ia">
            <button type="button" class="faq-question-btn" aria-expanded="false">
                <div class="faq-question-content">
                    <span class="faq-q-number">05.</span>
                    <span class="faq-question-text">¿Qué puede hacer un agente de IA en WhatsApp o Redes?</span>
                </div>
                <span class="faq-cat-badge">IA & Automatización</span>
                <div class="faq-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-inner">
                    Tu agente de IA atiende 24/7 con lenguaje natural: responde consultas sobre productos o menú, califica prospectos, agenda citas en Google Calendar, deriva pedidos a cocina o caja y almacena los leads en tu base de datos automáticamente.
                </div>
            </div>
        </div>
    </div>

    <!-- CATEGORIA 4: DESARROLLO -->
    <div class="faq-category-header" data-category="desarrollo">
        <span class="category-icon">💻</span>
        <h2>Desarrollo</h2>
    </div>
    <div class="faq-accordion-list">
        <div class="faq-item glassmorphism" data-category="desarrollo">
            <button type="button" class="faq-question-btn" aria-expanded="false">
                <div class="faq-question-content">
                    <span class="faq-q-number">06.</span>
                    <span class="faq-question-text">¿Qué tecnologías y arquitecturas utilizan?</span>
                </div>
                <span class="faq-cat-badge">Desarrollo</span>
                <div class="faq-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-inner">
                    Implementamos Clean Architecture y Domain-Driven Design (DDD). Nuestro stack incluye Laravel (PHP 8.4+), Flutter/Dart y Kotlin para móviles, Python para pipelines de datos/IA, React 19/TypeScript, PostgreSQL, Docker y modelos multimodales de última generación.
                </div>
            </div>
        </div>
    </div>

    <!-- CATEGORIA 5: SEGURIDAD -->
    <div class="faq-category-header" data-category="seguridad">
        <span class="category-icon">🔒</span>
        <h2>Seguridad</h2>
    </div>
    <div class="faq-accordion-list">
        <div class="faq-item glassmorphism" data-category="seguridad">
            <button type="button" class="faq-question-btn" aria-expanded="false">
                <div class="faq-question-content">
                    <span class="faq-q-number">07.</span>
                    <span class="faq-question-text">¿Mis datos y los de mis clientes están seguros?</span>
                </div>
                <span class="faq-cat-badge">Seguridad</span>
                <div class="faq-arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-inner">
                    Totalmente. Aplicamos estrictos estándares de ciberseguridad, encriptación SSL/TLS, protección CSRF, sanitización de inputs y bases de datos aisladas para garantizar privacidad y cumplimiento normativo.
                </div>
            </div>
        </div>
    </div>

</section>

<!-- Call to Action Banner -->
<div class="faq-cta-banner glassmorphism" style="max-width: 900px; margin: 3rem auto; padding: 2.5rem; text-align: center; border-radius: 20px;">
    <h2>¿Tienes una pregunta que no está aquí?</h2>
    <p style="color: var(--text-muted); margin: 1rem 0 2rem;">Nuestro equipo de ingenieros está listo para resolver tus dudas técnicas y estratégicas.</p>
    <a href="https://api.whatsapp.com/send/?phone=51900957415&text=Hola+MyWebsite%21+tengo+una+pregunta+sobre+sus+servicios.&type=phone_number&app_absent=0" target="_blank" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
        Consultar por WhatsApp
    </a>
</div>
@endsection
