<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $metaTitle ?? 'MyWebsite | Agencia de Inteligencia Artificial' }}</title>
    <meta name="description" content="{{ $metaDescription ?? 'MyWebsite es una agencia líder en soluciones de Inteligencia Artificial para empresas del futuro.' }}">
    
    <!-- Preconnect & CDNs -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <link rel="preconnect" href="https://wdirdbryxwtbnprbrkvh.supabase.co" crossorigin>
    <link rel="dns-prefetch" href="https://wdirdbryxwtbnprbrkvh.supabase.co">
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
    <link rel="dns-prefetch" href="https://images.unsplash.com">
    <link rel="modulepreload" href="https://cdn.jsdelivr.net/npm/simplex-noise@4.0.1/dist/esm/simplex-noise.js">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Montserrat:wght@400;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    
    @stack('styles')
</head>
<body class="{{ $bodyClass ?? '' }}">
    <!-- Header Navbar -->
    @include('components.header')

    <!-- Page Content -->
    @yield('content')

    <!-- Footer -->
    @include('components.footer')

    <!-- Floating WhatsApp -->
    @include('components.floating-whatsapp')

    <!-- Main Module Script -->
    <script type="module" src="{{ asset('js/script.js') }}"></script>
    @stack('scripts')
</body>
</html>
