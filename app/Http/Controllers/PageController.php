<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class PageController extends Controller
{
    /**
     * Home / Landing page
     */
    public function home(): View
    {
        return view('pages.home', [
            'metaTitle' => 'MyWebsite | Agencia de Inteligencia Artificial y Desarrollo Web de Élite',
            'metaDescription' => 'Agencia líder en desarrollo web, soluciones de Inteligencia Artificial, agentes para WhatsApp/Redes y sistemas de alta escala.',
        ]);
    }

    /**
     * Nosotros / Team & Founder Showcase
     */
    public function nosotros(): View
    {
        return view('pages.nosotros', [
            'metaTitle' => 'Nosotros - Equipo & Liderazgo | MyWebsite',
            'metaDescription' => 'Conoce al equipo detrás de MyWebsite: Alberto Tejada (Fundador & Director) y Ramses CB (Software Engineer & Mobile / Data Specialist).',
        ]);
    }

    /**
     * Soluciones / Servicios
     */
    public function soluciones(): View
    {
        return view('pages.soluciones', [
            'metaTitle' => 'Nuestras Soluciones - Inteligencia Artificial & Desarrollo | MyWebsite',
            'metaDescription' => 'Automatización con Agentes IA, aplicaciones móviles reactivas, cartas digitales interactivas y sistemas predictivos.',
        ]);
    }

    /**
     * Preguntas Frecuentes (FAQ)
     */
    public function faq(): View
    {
        return view('pages.faq', [
            'metaTitle' => 'Preguntas Frecuentes (FAQ) | MyWebsite',
            'metaDescription' => 'Respuestas claras sobre nuestros servicios de IA, desarrollo de software, tiempos de entrega y metodología de trabajo.',
        ]);
    }

    /**
     * Formulario de Contacto / Cotización
     */
    public function formulario(): View
    {
        return view('pages.formulario', [
            'metaTitle' => 'Empezar Ahora - Cotiza tu Proyecto | MyWebsite',
            'metaDescription' => 'Inicia tu transformación digital. Cuéntanos sobre tu negocio y diseñaremos la solución ideal en IA y desarrollo web.',
        ]);
    }

    /**
     * Política de Privacidad
     */
    public function politica(): View
    {
        return view('pages.politica', [
            'metaTitle' => 'Política de Privacidad | MyWebsite',
            'metaDescription' => 'Conoce cómo protegemos y tratamos tus datos personales en MyWebsite.',
        ]);
    }

    /**
     * Términos y Condiciones
     */
    public function terminos(): View
    {
        return view('pages.terminos', [
            'metaTitle' => 'Términos y Condiciones de Servicio | MyWebsite',
            'metaDescription' => 'Términos, derechos y obligaciones de uso de los servicios digitales provistos por MyWebsite.',
        ]);
    }
}
