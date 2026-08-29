<!DOCTYPE html>
<html lang="es" class="dark scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $metaTitle ?? 'MyWebsite | Agencia de Inteligencia Artificial' }}</title>
    <meta name="description" content="{{ $metaDescription ?? 'Agencia líder en soluciones de Inteligencia Artificial, agentes inteligentes y arquitectura web de alta velocidad.' }}">
    
    <!-- Preconnect & Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="preconnect" href="https://wdirdbryxwtbnprbrkvh.supabase.co" crossorigin>
    <link rel="dns-prefetch" href="https://wdirdbryxwtbnprbrkvh.supabase.co">
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    
    <!-- Fonts Google -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@400;600;700;800&family=Geist:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet">
    
    <!-- Devicon Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
    
    <!-- Simplex Noise Preload -->
    <link rel="modulepreload" href="https://cdn.jsdelivr.net/npm/simplex-noise@4.0.1/dist/esm/simplex-noise.js">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <link rel="stylesheet" href="{{ asset('css/custom-enhancements.css') }}">
    
    @stack('styles')
</head>
<body class="{{ $bodyClass ?? '' }}">
    <!-- Header -->
    @include('components.header')

    <!-- Main Content -->
    <main style="flex: 1;">
        @yield('content')
    </main>

    <!-- Footer -->
    @include('components.footer')

    <!-- Floating WhatsApp Action -->
    @include('components.floating-whatsapp')

    <!-- Main Script -->
    <script type="module" src="{{ asset('js/script.js') }}"></script>
    <script src="{{ asset('js/enhancements.js') }}"></script>
    @stack('scripts')
</body>
</html>
