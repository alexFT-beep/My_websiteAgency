@extends('layouts.app')

@php
    $bodyClass = 'form-page-body';
@endphp

@section('content')
<main class="form-page">
    <div class="form-container glassmorphism">
        <h1>Cuéntanos tu <span class="text-accent glow">Proyecto</span></h1>
        <p class="form-subtitle">Completa el formulario y nuestro equipo de desarrollo se pondrá en contacto contigo de inmediato.</p>

        @if(session('success'))
            <div class="form-alert-success">
                <span class="material-symbols-outlined">check_circle</span>
                <span>{{ session('success') }}</span>
            </div>
        @endif

        <form id="project-form" action="{{ route('formulario.store') }}" method="POST" class="custom-form">
            @csrf
            <div class="form-group">
                <label for="nombre">Nombres y Apellidos *</label>
                <input type="text" id="nombre" name="nombre" value="{{ old('nombre') }}" placeholder="Ej. Juan Pérez" required>
                @error('nombre') <span class="form-error">{{ $message }}</span> @enderror
            </div>

            <div class="form-group">
                <label for="email">Correo Electrónico *</label>
                <input type="email" id="email" name="email" value="{{ old('email') }}" placeholder="ejemplo@correo.com" required>
                @error('email') <span class="form-error">{{ $message }}</span> @enderror
            </div>

            <div class="form-group">
                <label for="telefono">Teléfono / WhatsApp *</label>
                <input type="tel" id="telefono" name="telefono" value="{{ old('telefono') }}" placeholder="Ej. 900957415" required
                    inputmode="numeric" pattern="[0-9]+" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                @error('telefono') <span class="form-error">{{ $message }}</span> @enderror
            </div>

            <div class="form-group">
                <label for="empresa">Empresa / Ciudad</label>
                <input type="text" id="empresa" name="empresa" value="{{ old('empresa') }}" placeholder="Ej. Mi Restaurante - Lima, Perú">
            </div>

            <div class="form-group">
                <label for="servicio_interes">Tipo de Servicio *</label>
                <select id="servicio_interes" name="servicio_interes" required>
                    <option value="" disabled {{ old('servicio_interes') ? '' : 'selected' }}>Selecciona un servicio...</option>
                    <option value="Chats automatizados con IA" {{ old('servicio_interes') == 'Chats automatizados con IA' ? 'selected' : '' }}>Chats automatizados con IA (WhatsApp/Redes)</option>
                    <option value="Desarrollo Web de Élite" {{ old('servicio_interes') == 'Desarrollo Web de Élite' ? 'selected' : '' }}>Desarrollo Web de Élite & Arquitectura Limpia</option>
                    <option value="Aplicaciones Móviles Reactivas (Flutter/Kotlin)" {{ old('servicio_interes') == 'Aplicaciones Móviles Reactivas (Flutter/Kotlin)' ? 'selected' : '' }}>Aplicaciones Móviles Reactivas (Flutter / Kotlin)</option>
                    <option value="Gestion de inventarios Inteligente" {{ old('servicio_interes') == 'Gestion de inventarios Inteligente' ? 'selected' : '' }}>Gestión de inventarios Inteligente y Predictivo</option>
                    <option value="Sistemas de comandas (restaurantes)" {{ old('servicio_interes') == 'Sistemas de comandas (restaurantes)' ? 'selected' : '' }}>Sistemas de comandas digitales</option>
                    <option value="Carta digital interactiva" {{ old('servicio_interes') == 'Carta digital interactiva' ? 'selected' : '' }}>Carta digital interactiva QR</option>
                </select>
                @error('servicio_interes') <span class="form-error">{{ $message }}</span> @enderror
            </div>

            <div class="form-group">
                <label for="mensaje">Descripción del Problema / Requerimiento *</label>
                <textarea id="mensaje" name="mensaje" rows="5"
                    placeholder="Explícanos a detalle qué deseas automatizar o construir..." required>{{ old('mensaje') }}</textarea>
                @error('mensaje') <span class="form-error">{{ $message }}</span> @enderror
            </div>

            <button type="submit" class="btn-primary form-submit-btn" id="submit-btn">
                <span>Enviar y Conectar por WhatsApp</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff"
                    style="vertical-align: middle; margin-left: 0.5rem;">
                    <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
            </button>
        </form>
    </div>
</main>
@endsection
