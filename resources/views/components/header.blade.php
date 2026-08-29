<header class="glass-header" id="main-header">
    <nav class="navbar">
        <a href="{{ route('home') }}" class="logo">
            <img src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/Agencia_myWebsite/logo%20principal.webp"
                alt="Logo Principal" class="logo-img" fetchpriority="high" decoding="async" width="40" height="40">
            <span class="logo-text">My<span class="text-accent">Website</span></span>
        </a>
        <ul class="nav-links">
            <li><a href="{{ route('home') }}" class="{{ request()->routeIs('home') ? 'nav-inicio' : '' }}">Inicio</a></li>
            <li><a href="{{ route('home') }}#contacto" class="underline-link">Contacto</a></li>
            <li><a href="{{ route('soluciones') }}" class="pulse-link {{ request()->routeIs('soluciones') ? 'nav-inicio' : '' }}">Servicio</a></li>
            <li><a href="{{ route('nosotros') }}" class="{{ request()->routeIs('nosotros') ? 'nav-inicio' : '' }}"
                    @if(request()->routeIs('nosotros')) style="color: #b026ff !important; text-shadow: 0 0 10px rgba(176, 38, 255, 0.7);" @endif>Nosotros</a></li>
            <li><a href="{{ route('faq') }}" class="{{ request()->routeIs('faq') ? 'nav-inicio' : '' }}">FAQ</a></li>
            <li><a href="{{ route('formulario') }}" class="btn-primary">Empezar Ahora</a></li>
        </ul>

        <div class="mobile-menu-toggle">
            <span class="mobile-menu-text">Ver menú <span class="mobile-arrow">→</span></span>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    <div class="mobile-nav">
        <ul>
            <li><a href="{{ route('home') }}">Inicio</a></li>
            <li><a href="{{ route('home') }}#contacto" class="underline-link">Contacto</a></li>
            <li><a href="{{ route('soluciones') }}" class="pulse-link">Servicio</a></li>
            <li><a href="{{ route('nosotros') }}" style="color: #b026ff; font-weight: bold;">Nosotros</a></li>
            <li><a href="{{ route('faq') }}">FAQ</a></li>
            <li><a href="{{ route('formulario') }}" class="btn-primary" style="display:inline-block; margin-top:1rem;">Empezar Ahora</a></li>
        </ul>
        <div class="mobile-nav-img-container">
            <img src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/Agencia_myWebsite/logoAcostado.webp"
                alt="Logo MyWebsite" class="mobile-nav-img floating">
        </div>
    </div>
</header>
