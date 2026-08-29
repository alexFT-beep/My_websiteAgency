@extends('layouts.app')

@section('content')
<main class="legal-page">
    <div class="legal-container glassmorphism">
        <h1>Términos de <span class="text-accent glow">Servicio</span></h1>
        <p class="last-updated">Última actualización: 18 de marzo de 2026</p>

        <div class="legal-intro">
            <p>Bienvenido a MyWebSite. Al acceder y utilizar nuestros servicios de desarrollo web, aplicaciones móviles y automatización con IA, usted acepta cumplir con los siguientes términos y condiciones.</p>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">01. Aceptación de Términos</h2>
            <p>El uso de este sitio web y la contratación de nuestros servicios implica la aceptación plena de estos términos. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestros servicios.</p>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">02. Servicios y Proyectos</h2>
            <p>MyWebSite se compromete a entregar los proyectos de acuerdo con las especificaciones acordadas en la propuesta técnica. Los plazos de entrega son estimaciones y se detallan en un cronograma de hitos.</p>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">03. Propiedad Intelectual</h2>
            <p>Una vez liquidado el pago total del proyecto, la propiedad del código y diseño final se transfiere al cliente, a menos que se especifique lo contrario. MyWebSite se reserva el derecho de mostrar el trabajo en su portafolio comercial.</p>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">04. Responsabilidades del Cliente</h2>
            <p>El cliente es responsable de proporcionar la información, accesos y contenidos necesarios para la ejecución del proyecto en los tiempos acordados.</p>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">05. Pagos y Cancelaciones</h2>
            <p>Los pagos se realizarán según el esquema acordado (anticipo y liquidación contra entregables). En caso de cancelación por parte del cliente, el anticipo cubre los costos incurridos de investigación y diseño inicial.</p>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">06. Limitación de Responsabilidad</h2>
            <p>MyWebSite no se hace responsable por interrupciones de servicios de terceros (hosting, APIs de terceros, cortes de WhatsApp) ajenos a nuestra infraestructura directa.</p>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">07. Uso de proyectos para portafolio y promoción</h2>
            <p>MyWebSite podrá utilizar los proyectos, arquitecturas y soluciones desarrolladas para sus clientes como material de demostración comercial y portafolio, protegiendo siempre datos confidenciales, secretos industriales y bases de datos privadas del cliente.</p>
        </div>

        <div style="text-align: center; margin-top: 3rem;">
            <a href="{{ route('home') }}" class="btn-primary">&larr; Volver al Inicio</a>
        </div>
    </div>
</main>
@endsection
