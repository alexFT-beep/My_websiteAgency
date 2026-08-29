@extends('layouts.app')

@php
    $bodyClass = 'soluciones-body';
@endphp

@section('content')
<div class="soluciones-bg-container">
        <video class="soluciones-bg-video-desktop" autoplay loop muted playsinline>
            <source
                src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/Agencia_myWebsite/laptophechado.webm"
                type="video/webm">
        </video>
        <video class="soluciones-bg-video-mobile" autoplay loop muted playsinline>
            <source
                src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/Agencia_myWebsite/laptopvertcal.webm"
                type="video/webm">
        </video>
    </div>
    

    <main>
        <div class="soluciones-container">
            <div class="soluciones-header">
                <h1>¿Por qué necesitas <span class="text-accent glow">Nuestras Soluciones?</span></h1>
                <p style="font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto;">Descubre cómo
                    nuestra tecnología transformará tu negocio, ahorrará costos y multiplicará tus ventas sin esfuerzo
                    humano.</p>
            </div>

            <div class="solucion-item">
                <div class="solucion-icon">🤖</div>
                <div class="solucion-content">
                    <h3>No pierdas clientes por no responder a tiempo</h3>
                    <p>Tu restaurante puede recibir consultas incluso cuando estás cerrado. Nuestro agente IA responde
                        automáticamente sobre horarios, menú, reservas, ubicación y preguntas frecuentes, 24/7.</p>
                    <p style="margin-top: 1rem; font-weight: bold; font-style: italic;" class="highlight">Más
                        respuestas. Más reservas. Menos clientes perdidos.</p>
                </div>
            </div>

            <div class="solucion-item">
                <div class="solucion-icon">🌐</div>
                <div class="solucion-content">
                    <h3>Tu restaurante merece algo mejor que solo Instagram</h3>
                    <p>Una página web profesional convierte visitas en clientes. Presenta tu restaurante, menú,
                        ubicación, reservas y promociones en un solo lugar, con una experiencia diseñada para generar
                        confianza.</p>
                    <p style="margin-top: 1rem; font-weight: bold; font-style: italic;" class="highlight">Que te
                        encuentren. Que confíen. Que reserven.</p>
                </div>
            </div>

            <div class="solucion-item">
                <div class="solucion-icon">📦</div>
                <div class="solucion-content">
                    <h3>Deja de perder dinero por falta de control</h3>
                    <p>Controla tus productos, existencias y movimientos desde un sistema inteligente. Reduce
                        desperdicios, detecta faltantes y toma mejores decisiones antes de que el inventario se
                        convierta en un problema.</p>
                    <p style="margin-top: 1rem; font-weight: bold; font-style: italic;" class="highlight">Más control.
                        Menos desperdicio.</p>
                </div>
            </div>

            <div class="solucion-item">
                <div class="solucion-icon">🍽️</div>
                <div class="solucion-content">
                    <h3>Tu menú también puede vender</h3>
                    <p>Una carta digital moderna permite actualizar precios, platos y promociones al instante, sin
                        volver a imprimir. Haz que tus clientes encuentren lo que quieren de forma rápida y atractiva.
                    </p>
                    <p style="margin-top: 1rem; font-weight: bold; font-style: italic;" class="highlight">Actualiza una
                        vez. Vende todos los días.</p>
                </div>
            </div>

            <div class="solucion-item">
                <div class="solucion-icon">⚙️</div>
                <div class="solucion-content">
                    <h3>Menos tareas repetitivas. Más tiempo para tu restaurante.</h3>
                    <p>Automatiza procesos y acciones que hoy requieren tiempo de tu equipo. Diseñamos sistemas que
                        simplifican la operación y hacen que ciertas tareas sucedan con menos intervención manual.</p>
                    <p style="margin-top: 1rem; font-weight: bold; font-style: italic;" class="highlight">Automatiza lo
                        repetitivo. Enfócate en lo importante.</p>
                </div>
            </div>

            <div class="solucion-item">
                <div class="solucion-icon">🧩</div>
                <div class="solucion-content">
                    <h3>Si tienes un problema, podemos crear la solución</h3>
                    <p>No todos los restaurantes funcionan igual. Por eso desarrollamos software personalizado para
                        problemas específicos de tu negocio, adaptándonos a tu operación en lugar de obligarte a
                        adaptarte a una herramienta genérica.</p>
                    <p style="margin-top: 1rem; font-weight: bold; font-style: italic;" class="highlight">Tu problema.
                        Tu sistema. Tu solución.</p>
                </div>
            </div>

            <div class="soluciones-closing">
                <div class="soluciones-closing-container">
                    <h2 class="soluciones-closing-title">"No necesitas más herramientas. Necesitas soluciones que hagan funcionar mejor tu restaurante."</h2>
                    <img src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/Agencia_myWebsite/poder2.png"
                        alt="Poder IA" class="soluciones-closing-img floating">
                </div>
            </div>

            <div class="soluciones-footer-action" style="text-align: center;">
                <a href="{{ route('formulario') }}" class="btn-primary" style="font-size: 1.2rem; padding: 1.2rem 3rem;">Cuéntanos
                    qué necesitas</a>
            </div>
        </div>
    </main>
@endsection
