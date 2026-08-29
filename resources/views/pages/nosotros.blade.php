@extends('layouts.app')

@php
    $bodyClass = 'about-page-body';
@endphp

@section('content')
<main class="about-hero-container" style="flex-direction: column; gap: 2.5rem; padding-top: 6rem; padding-bottom: 4rem;">
    
    <!-- Switcher / Selector de Perfiles -->
    <div class="about-team-switcher">
        <button type="button" class="team-switcher-btn active" id="btn-tab-alberto" onclick="switchProfile('alberto')">
            <span>Alberto Tejada (Fundador)</span>
        </button>
        <button type="button" class="team-switcher-btn" id="btn-tab-ramses" onclick="switchProfile('ramses')">
            <span>Ramses CB (Software Engineer)</span>
        </button>
    </div>

    <!-- TARJETA 1: Alberto Tejada (Fundador & Director) -->
    <div class="about-profile-card" id="card-alberto">
        <!-- Profile Header -->
        <div class="about-profile-header">
            <!-- Avatar Frame -->
            <div class="about-avatar-container">
                <div class="about-avatar-frame">
                    <img src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/Agencia_myWebsite/PerfilAlexFT.webp"
                        alt="Alberto Tejada - Fundador & Director" class="about-avatar-img" loading="lazy">
                </div>
            </div>

            <!-- Founder Text Content (Right Side) -->
            <div class="about-info-content">
                <h1 class="about-founder-name">Alberto Tejada</h1>
                <h2 class="about-sub-title1">Fundador & Director — MyWebsite</h2>
                <p class="about-sub-title2">Student Software Engineer | Frontend & UI/UX | Web Architecture | AI</p>
                <div class="about-badge-purple">
                    <span class="about-badge-dot-purple"></span>
                    <span>Liderazgo · Visión · Dirección</span>
                </div>
            </div>
        </div>

        <!-- Innovative Tech Stack Carousel Section -->
        <div class="about-tech-section">
            <div class="tech-marquee-wrapper">
                <!-- Track 1: Moving Left -->
                <div class="tech-marquee-track track-left">
                    <div class="tech-logo-card" title="HTML5"><img src="{{ asset('assets/logos/html.svg') }}" alt="HTML5"></div>
                    <div class="tech-logo-card" title="CSS3"><img src="{{ asset('assets/logos/css.svg') }}" alt="CSS3"></div>
                    <div class="tech-logo-card" title="JavaScript"><img src="{{ asset('assets/logos/javascript.svg') }}" alt="JavaScript"></div>
                    <div class="tech-logo-card" title="TypeScript"><img src="{{ asset('assets/logos/typescript.svg') }}" alt="TypeScript"></div>
                    <div class="tech-logo-card" title="Python"><img src="{{ asset('assets/logos/python.svg') }}" alt="Python"></div>
                    <div class="tech-logo-card" title="Supabase"><img src="{{ asset('assets/logos/supabase.svg') }}" alt="Supabase"></div>
                    <div class="tech-logo-card" title="Firebase"><img src="{{ asset('assets/logos/firebase.svg') }}" alt="Firebase"></div>
                    <div class="tech-logo-card" title="Figma"><img src="{{ asset('assets/logos/figma.svg') }}" alt="Figma"></div>
                    <div class="tech-logo-card" title="VS Code"><img src="{{ asset('assets/logos/vscode.svg') }}" alt="VS Code"></div>
                    <div class="tech-logo-card" title="Cursor"><img src="{{ asset('assets/logos/cursor.svg') }}" alt="Cursor"></div>
                    <div class="tech-logo-card" title="Antigravity"><img src="{{ asset('assets/logos/antigravity.svg') }}" alt="Antigravity"></div>
                    <div class="tech-logo-card" title="Obsidian"><img src="{{ asset('assets/logos/obsidian.svg') }}" alt="Obsidian"></div>
                    <div class="tech-logo-card" title="Adobe"><img src="{{ asset('assets/logos/adobe.svg') }}" alt="Adobe"></div>
                    <div class="tech-logo-card" title="ChatGPT"><img src="{{ asset('assets/logos/chatgpt.svg') }}" alt="ChatGPT"></div>
                    <div class="tech-logo-card" title="Gemini"><img src="{{ asset('assets/logos/gemini.svg') }}" alt="Gemini"></div>
                    <div class="tech-logo-card" title="Meta AI"><img src="{{ asset('assets/logos/meta-ai.svg') }}" alt="Meta AI"></div>
                    <div class="tech-logo-card" title="Vectores"><img src="{{ asset('assets/logos/vectores.svg') }}" alt="Vectores"></div>
                    <div class="tech-logo-card" title="AI Workflows"><img src="{{ asset('assets/logos/ai-workflows.svg') }}" alt="AI Workflows"></div>

                    <!-- Duplicate Set for Seamless Loop -->
                    <div class="tech-logo-card" title="HTML5"><img src="{{ asset('assets/logos/html.svg') }}" alt="HTML5"></div>
                    <div class="tech-logo-card" title="CSS3"><img src="{{ asset('assets/logos/css.svg') }}" alt="CSS3"></div>
                    <div class="tech-logo-card" title="JavaScript"><img src="{{ asset('assets/logos/javascript.svg') }}" alt="JavaScript"></div>
                    <div class="tech-logo-card" title="TypeScript"><img src="{{ asset('assets/logos/typescript.svg') }}" alt="TypeScript"></div>
                    <div class="tech-logo-card" title="Python"><img src="{{ asset('assets/logos/python.svg') }}" alt="Python"></div>
                    <div class="tech-logo-card" title="Supabase"><img src="{{ asset('assets/logos/supabase.svg') }}" alt="Supabase"></div>
                    <div class="tech-logo-card" title="Firebase"><img src="{{ asset('assets/logos/firebase.svg') }}" alt="Firebase"></div>
                    <div class="tech-logo-card" title="Figma"><img src="{{ asset('assets/logos/figma.svg') }}" alt="Figma"></div>
                    <div class="tech-logo-card" title="VS Code"><img src="{{ asset('assets/logos/vscode.svg') }}" alt="VS Code"></div>
                    <div class="tech-logo-card" title="Cursor"><img src="{{ asset('assets/logos/cursor.svg') }}" alt="Cursor"></div>
                    <div class="tech-logo-card" title="Antigravity"><img src="{{ asset('assets/logos/antigravity.svg') }}" alt="Antigravity"></div>
                    <div class="tech-logo-card" title="Obsidian"><img src="{{ asset('assets/logos/obsidian.svg') }}" alt="Obsidian"></div>
                    <div class="tech-logo-card" title="Adobe"><img src="{{ asset('assets/logos/adobe.svg') }}" alt="Adobe"></div>
                    <div class="tech-logo-card" title="ChatGPT"><img src="{{ asset('assets/logos/chatgpt.svg') }}" alt="ChatGPT"></div>
                    <div class="tech-logo-card" title="Gemini"><img src="{{ asset('assets/logos/gemini.svg') }}" alt="Gemini"></div>
                    <div class="tech-logo-card" title="Meta AI"><img src="{{ asset('assets/logos/meta-ai.svg') }}" alt="Meta AI"></div>
                    <div class="tech-logo-card" title="Vectores"><img src="{{ asset('assets/logos/vectores.svg') }}" alt="Vectores"></div>
                    <div class="tech-logo-card" title="AI Workflows"><img src="{{ asset('assets/logos/ai-workflows.svg') }}" alt="AI Workflows"></div>
                </div>

                <!-- Track 2: Moving Right -->
                <div class="tech-marquee-track track-right">
                    <div class="tech-logo-card" title="AI Workflows"><img src="{{ asset('assets/logos/ai-workflows.svg') }}" alt="AI Workflows"></div>
                    <div class="tech-logo-card" title="Vectores"><img src="{{ asset('assets/logos/vectores.svg') }}" alt="Vectores"></div>
                    <div class="tech-logo-card" title="Meta AI"><img src="{{ asset('assets/logos/meta-ai.svg') }}" alt="Meta AI"></div>
                    <div class="tech-logo-card" title="Gemini"><img src="{{ asset('assets/logos/gemini.svg') }}" alt="Gemini"></div>
                    <div class="tech-logo-card" title="ChatGPT"><img src="{{ asset('assets/logos/chatgpt.svg') }}" alt="ChatGPT"></div>
                    <div class="tech-logo-card" title="Adobe"><img src="{{ asset('assets/logos/adobe.svg') }}" alt="Adobe"></div>
                    <div class="tech-logo-card" title="Obsidian"><img src="{{ asset('assets/logos/obsidian.svg') }}" alt="Obsidian"></div>
                    <div class="tech-logo-card" title="Antigravity"><img src="{{ asset('assets/logos/antigravity.svg') }}" alt="Antigravity"></div>
                    <div class="tech-logo-card" title="Cursor"><img src="{{ asset('assets/logos/cursor.svg') }}" alt="Cursor"></div>
                    <div class="tech-logo-card" title="VS Code"><img src="{{ asset('assets/logos/vscode.svg') }}" alt="VS Code"></div>
                    <div class="tech-logo-card" title="Figma"><img src="{{ asset('assets/logos/figma.svg') }}" alt="Figma"></div>
                    <div class="tech-logo-card" title="Firebase"><img src="{{ asset('assets/logos/firebase.svg') }}" alt="Firebase"></div>
                    <div class="tech-logo-card" title="Supabase"><img src="{{ asset('assets/logos/supabase.svg') }}" alt="Supabase"></div>
                    <div class="tech-logo-card" title="Python"><img src="{{ asset('assets/logos/python.svg') }}" alt="Python"></div>
                    <div class="tech-logo-card" title="TypeScript"><img src="{{ asset('assets/logos/typescript.svg') }}" alt="TypeScript"></div>
                    <div class="tech-logo-card" title="JavaScript"><img src="{{ asset('assets/logos/javascript.svg') }}" alt="JavaScript"></div>
                    <div class="tech-logo-card" title="CSS3"><img src="{{ asset('assets/logos/css.svg') }}" alt="CSS3"></div>
                    <div class="tech-logo-card" title="HTML5"><img src="{{ asset('assets/logos/html.svg') }}" alt="HTML5"></div>

                    <!-- Duplicate Set -->
                    <div class="tech-logo-card" title="AI Workflows"><img src="{{ asset('assets/logos/ai-workflows.svg') }}" alt="AI Workflows"></div>
                    <div class="tech-logo-card" title="Vectores"><img src="{{ asset('assets/logos/vectores.svg') }}" alt="Vectores"></div>
                    <div class="tech-logo-card" title="Meta AI"><img src="{{ asset('assets/logos/meta-ai.svg') }}" alt="Meta AI"></div>
                    <div class="tech-logo-card" title="Gemini"><img src="{{ asset('assets/logos/gemini.svg') }}" alt="Gemini"></div>
                    <div class="tech-logo-card" title="ChatGPT"><img src="{{ asset('assets/logos/chatgpt.svg') }}" alt="ChatGPT"></div>
                    <div class="tech-logo-card" title="Adobe"><img src="{{ asset('assets/logos/adobe.svg') }}" alt="Adobe"></div>
                    <div class="tech-logo-card" title="Obsidian"><img src="{{ asset('assets/logos/obsidian.svg') }}" alt="Obsidian"></div>
                    <div class="tech-logo-card" title="Antigravity"><img src="{{ asset('assets/logos/antigravity.svg') }}" alt="Antigravity"></div>
                    <div class="tech-logo-card" title="Cursor"><img src="{{ asset('assets/logos/cursor.svg') }}" alt="Cursor"></div>
                    <div class="tech-logo-card" title="VS Code"><img src="{{ asset('assets/logos/vscode.svg') }}" alt="VS Code"></div>
                    <div class="tech-logo-card" title="Figma"><img src="{{ asset('assets/logos/figma.svg') }}" alt="Figma"></div>
                    <div class="tech-logo-card" title="Firebase"><img src="{{ asset('assets/logos/firebase.svg') }}" alt="Firebase"></div>
                    <div class="tech-logo-card" title="Supabase"><img src="{{ asset('assets/logos/supabase.svg') }}" alt="Supabase"></div>
                    <div class="tech-logo-card" title="Python"><img src="{{ asset('assets/logos/python.svg') }}" alt="Python"></div>
                    <div class="tech-logo-card" title="TypeScript"><img src="{{ asset('assets/logos/typescript.svg') }}" alt="TypeScript"></div>
                    <div class="tech-logo-card" title="JavaScript"><img src="{{ asset('assets/logos/javascript.svg') }}" alt="JavaScript"></div>
                    <div class="tech-logo-card" title="CSS3"><img src="{{ asset('assets/logos/css.svg') }}" alt="CSS3"></div>
                    <div class="tech-logo-card" title="HTML5"><img src="{{ asset('assets/logos/html.svg') }}" alt="HTML5"></div>
                </div>
            </div>
        </div>

        <!-- Contact Logos Section -->
        <div class="about-contact-section">
            <a href="https://github.com/alexFT-beep" target="_blank" class="about-contact-link" aria-label="GitHub de Alberto Tejada">
                <img src="{{ asset('assets/logos/github.svg') }}" alt="GitHub" style="width:24px; height:24px; filter: invert(1);">
            </a>
            <a href="https://www.instagram.com/mywebsitee/" target="_blank" class="about-contact-link" aria-label="Instagram de MyWebsite">
                <img src="{{ asset('assets/logos/instagram.svg') }}" alt="Instagram" style="width:24px; height:24px; filter: invert(1);">
            </a>
            <a href="mailto:Alberto900957415@gmail.com" class="about-contact-link" aria-label="Correo de Alberto Tejada">
                <img src="{{ asset('assets/logos/email.svg') }}" alt="Correo" style="width:24px; height:24px; filter: invert(1);">
            </a>
        </div>
    </div>

    <!-- TARJETA 2: Ramses CB (Software Engineer & Mobile / Data Specialist) -->
    <div class="about-profile-card" id="card-ramses" style="display: none;">
        <!-- Profile Header -->
        <div class="about-profile-header">
            <!-- Avatar Frame con Glow Naranja -->
            <div class="about-avatar-container">
                <div class="about-avatar-frame avatar-orange-glow">
                    <img src="{{ asset('assets/avatar_ramses.webp') }}"
                        alt="Ramses CB - Software Engineer & Mobile / Data Specialist" class="about-avatar-img"
                        onerror="this.src='https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/Agencia_myWebsite/PerfilAlexFT.webp'">
                </div>
            </div>

            <!-- Ramses Text Content -->
            <div class="about-info-content">
                <h1 class="about-founder-name text-gradient-orange">Ramses CB</h1>
                <h2 class="about-sub-title1">Software Engineer & Mobile / Data Specialist</h2>
                <p class="about-sub-title2">Clean Architecture · Flutter & Dart · Kotlin & Android · React 19 · Python</p>
                <div class="about-badge-green">
                    <span class="about-badge-dot-green"></span>
                    <span>Disponible para proyectos · Nv Chimbote, PE</span>
                </div>
            </div>
        </div>

        <!-- Innovative Tech Stack Carousel Section (Ramses Stack) -->
        <div class="about-tech-section">
            <div class="tech-marquee-wrapper">
                <!-- Track 1: Moving Left -->
                <div class="tech-marquee-track track-left">
                    <div class="tech-logo-card" title="Flutter"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" alt="Flutter"></div>
                    <div class="tech-logo-card" title="Dart"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" alt="Dart"></div>
                    <div class="tech-logo-card" title="Kotlin"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" alt="Kotlin"></div>
                    <div class="tech-logo-card" title="Android Studio"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg" alt="Android Studio"></div>
                    <div class="tech-logo-card" title="Python"><img src="{{ asset('assets/logos/python.svg') }}" alt="Python"></div>
                    <div class="tech-logo-card" title="React 19"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React"></div>
                    <div class="tech-logo-card" title="TypeScript"><img src="{{ asset('assets/logos/typescript.svg') }}" alt="TypeScript"></div>
                    <div class="tech-logo-card" title="PostgreSQL"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL"></div>
                    <div class="tech-logo-card" title="Docker"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker"></div>
                    <div class="tech-logo-card" title="Git"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git"></div>
                    <div class="tech-logo-card" title="Linux"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" alt="Linux"></div>
                    <div class="tech-logo-card" title="Supabase"><img src="{{ asset('assets/logos/supabase.svg') }}" alt="Supabase"></div>

                    <!-- Duplicate Set -->
                    <div class="tech-logo-card" title="Flutter"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" alt="Flutter"></div>
                    <div class="tech-logo-card" title="Dart"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" alt="Dart"></div>
                    <div class="tech-logo-card" title="Kotlin"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" alt="Kotlin"></div>
                    <div class="tech-logo-card" title="Android Studio"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg" alt="Android Studio"></div>
                    <div class="tech-logo-card" title="Python"><img src="{{ asset('assets/logos/python.svg') }}" alt="Python"></div>
                    <div class="tech-logo-card" title="React 19"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React"></div>
                    <div class="tech-logo-card" title="TypeScript"><img src="{{ asset('assets/logos/typescript.svg') }}" alt="TypeScript"></div>
                    <div class="tech-logo-card" title="PostgreSQL"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL"></div>
                    <div class="tech-logo-card" title="Docker"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker"></div>
                    <div class="tech-logo-card" title="Git"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git"></div>
                    <div class="tech-logo-card" title="Linux"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" alt="Linux"></div>
                    <div class="tech-logo-card" title="Supabase"><img src="{{ asset('assets/logos/supabase.svg') }}" alt="Supabase"></div>
                </div>

                <!-- Track 2: Moving Right -->
                <div class="tech-marquee-track track-right">
                    <div class="tech-logo-card" title="Pandas"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" alt="Pandas"></div>
                    <div class="tech-logo-card" title="NumPy"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" alt="NumPy"></div>
                    <div class="tech-logo-card" title="Java"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java"></div>
                    <div class="tech-logo-card" title="Go"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" alt="Go"></div>
                    <div class="tech-logo-card" title="C++"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++"></div>
                    <div class="tech-logo-card" title="Tailwind CSS"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind"></div>
                    <div class="tech-logo-card" title="Vite"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" alt="Vite"></div>
                    <div class="tech-logo-card" title="Gemini"><img src="{{ asset('assets/logos/gemini.svg') }}" alt="Gemini"></div>

                    <!-- Duplicate Set -->
                    <div class="tech-logo-card" title="Pandas"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" alt="Pandas"></div>
                    <div class="tech-logo-card" title="NumPy"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" alt="NumPy"></div>
                    <div class="tech-logo-card" title="Java"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java"></div>
                    <div class="tech-logo-card" title="Go"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" alt="Go"></div>
                    <div class="tech-logo-card" title="C++"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++"></div>
                    <div class="tech-logo-card" title="Tailwind CSS"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind"></div>
                    <div class="tech-logo-card" title="Vite"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" alt="Vite"></div>
                    <div class="tech-logo-card" title="Gemini"><img src="{{ asset('assets/logos/gemini.svg') }}" alt="Gemini"></div>
                </div>
            </div>
        </div>

        <!-- Contact Logos & Portfolio Button Section -->
        <div class="about-contact-section" style="justify-content: space-between; align-items: center;">
            <div style="display: flex; gap: 0.8rem; align-items: center;">
                <a href="https://www.linkedin.com/in/ramses-contreras-08a652378" target="_blank" class="about-contact-link" aria-label="LinkedIn de Ramses CB" title="LinkedIn">
                    <i class="devicon-linkedin-plain" style="font-size: 22px; color: #0a66c2;"></i>
                </a>
                <a href="https://github.com/RamsesCB" target="_blank" class="about-contact-link" aria-label="GitHub de Ramses CB" title="GitHub">
                    <img src="{{ asset('assets/logos/github.svg') }}" alt="GitHub" style="width:24px; height:24px; filter: invert(1);">
                </a>
                <a href="mailto:sergiocontrerasbernaola22@gmail.com" class="about-contact-link" aria-label="Correo de Ramses CB" title="Email">
                    <img src="{{ asset('assets/logos/email.svg') }}" alt="Email" style="width:24px; height:24px; filter: invert(1);">
                </a>
            </div>

            <a href="https://ramses-cb-portafolio.vercel.app/" target="_blank" class="btn-portfolio-ramses" title="Ver Portafolio Completo">
                <span>🚀 Portafolio Oficial</span>
                <span>&rarr;</span>
            </a>
        </div>
    </div>
</main>

<script>
function switchProfile(profile) {
    const cardAlberto = document.getElementById('card-alberto');
    const cardRamses = document.getElementById('card-ramses');
    const btnAlberto = document.getElementById('btn-tab-alberto');
    const btnRamses = document.getElementById('btn-tab-ramses');

    if (profile === 'alberto') {
        cardAlberto.style.display = 'flex';
        cardRamses.style.display = 'none';
        btnAlberto.classList.add('active');
        btnRamses.classList.remove('active');
    } else {
        cardAlberto.style.display = 'none';
        cardRamses.style.display = 'flex';
        btnRamses.classList.add('active');
        btnAlberto.classList.remove('active');
    }
}
</script>
@endsection
