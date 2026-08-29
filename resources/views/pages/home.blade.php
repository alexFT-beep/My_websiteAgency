@extends('layouts.app')

@section('content')
    <section id="inicio" class="waves-component">
        <video class="mobile-bg-video" autoplay loop muted playsinline>
            <source
                src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/Agencia_myWebsite/fondomobile.webm"
                type="video/webm">
        </video>
        <svg id="waves-svg" class="waves-svg" xmlns="http://www.w3.org/2000/svg"></svg>
        <div id="pointer-dot" class="pointer-dot"></div>

        <div class="wave-content">
            <img src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/Agencia_myWebsite/poder2.png"
                alt="Poder IA" class="wave-image floating">
            <div class="wave-text-wrapper">
                <h1 class="wave-title">Soluciones Digitales &<br><span class="text-accent glow">Automatizamos tu futuro</span></h1>
                <div class="wave-actions" style="margin-top: 2rem;">
                    <a href="{{ route('formulario') }}" class="btn-primary"
                        style="pointer-events: auto; display: inline-flex; align-items: center; gap: 8px;">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                        </svg> CONTÁCTANOS
                    </a>
                </div>
            </div>
        </div>

        <div class="scroll-indicator">
            <span>Descubre Más</span>
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
        </div>
    </section>

    <section id="servicios" class="services">
        <div class="section-header">
            <h2>Nuestras <span class="text-accent">Soluciones</span></h2>
            <p>Implementamos tecnología de punta para resolver los desafíos más complejos de tu negocio.</p>
            <div class="animated-link-container">
                <a href="{{ route('soluciones') }}" class="animated-link">
                    ¿Me conviene para mi negocio? Saber más <span class="animated-arrow">→</span>
                </a>
            </div>
        </div>
        <div class="services-layout">
            <div class="services-content-wrapper">
                <div class="services-grid">
                    <div class="service-card glassmorphism">
                        <div class="icon">💬</div>
                        <h3>Agentes IA WhatsApp</h3>
                        <p>Un asistente inteligente activo 24/7 que atiende a tus clientes con lenguaje natural y humano. Entiende preguntas complejas, recomienda productos, agenda citas y registra datos en tu sistema automáticamente, cerrando ventas mientras tú descansas.</p>
                    </div>
                    <div class="service-card glassmorphism">
                        <div class="icon">🌐</div>
                        <h3>Desarrollo Web de Élite</h3>
                        <p>De alto impacto optimizadas para posicionarte en Google, captar clientes y multiplicar tus ventas. No es solo una web atractiva, es un canal automático que convierte visitas en ingresos constantes para tu negocio 24/7.</p>
                    </div>
                    <div class="service-card glassmorphism">
                        <div class="icon">📊</div>
                        <h3>Sistemas de Gestión de Inventarios con Análisis Predictivo</h3>
                        <p>Registra entradas y salidas para prever la demanda según la temporada. Calcula tu stock de seguridad y te muestra mediante gráficos el momento exacto para reponer inventario y no quedarte nunca en cero.</p>
                    </div>
                    <div class="service-card glassmorphism">
                        <div class="icon">📱</div>
                        <h3>Sistema de Comandas Digitales</h3>
                        <p>Reemplaza los blocs de papel por una aplicación móvil para tus meseros. Al tomar el pedido en la mesa, la orden viaja al instante a la cocina: todo queda registrado en caja.</p>
                    </div>
                    <div class="service-card glassmorphism">
                        <div class="icon">📈</div>
                        <h3>Agentes IA en Instagram & Facebook</h3>
                        <p>Transforma tus redes sociales en máquinas de ventas automáticas 24/7. Nuestros agentes inteligentes no solo responden mensajes, sino que califican prospectos y cierran citas en tiempo real sin intervención humana para convertir personas en clientes fieles.</p>
                    </div>
                    <div class="service-card glassmorphism">
                        <div class="icon">📱</div>
                        <h3>Carta Digital Interactiva</h3>
                        <p>La Carta Digital Interactiva transforma el menú de tu restaurante en una experiencia moderna y visual mediante código QR e link. Este servicio de MyWebSite integra un diseño web responsivo. Es la opción ideal para optimizar la atención al cliente, destacar tus platos principales o pedir deliverys de manera interactiva.</p>
                    </div>
                </div>
            </div>
            <div class="services-image">
                <div style="position: relative; display: inline-block;">
                    <div class="speech-bubble">Miau!</div>
                    <img src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/Agencia_myWebsite/poder3.webp"
                        alt="Poder IA" class="floating">
                </div>
            </div>
        </div>
    </section>
@endsection
