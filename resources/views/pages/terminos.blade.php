@extends('layouts.app')

@section('content')
<main class="legal-page">
        <div class="legal-container glassmorphism">
            <h1>Términos de <span class="text-accent glow">Servicio</span></h1>
            <p class="last-updated">Última actualización: 18 de marzo de 2026</p>

            <div class="legal-intro">
                <p>Bienvenido a MyWebSite. Al acceder y utilizar nuestros servicios de desarrollo web, aplicaciones y
                    automatización, usted acepta cumplir con los siguientes términos y condiciones.</p>
            </div>

            <div class="legal-section">
                <h2 class="text-accent">01. Aceptación de Términos</h2>
                <p>El uso de este sitio web y la contratación de nuestros servicios implica la aceptación plena de estos
                    términos. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestros
                    servicios.</p>
            </div>

            <div class="legal-section">
                <h2 class="text-accent">02. Servicios y Proyectos</h2>
                <p>MyWebSite se compromete a entregar los proyectos de acuerdo con las especificaciones acordadas en el
                    contrato de servicio. Los plazos de entrega son estimaciones y pueden variar según la complejidad y
                    la retroalimentación del cliente.</p>
            </div>

            <div class="legal-section">
                <h2 class="text-accent">03. Propiedad Intelectual</h2>
                <p>Una vez liquidado el pago total del proyecto, la propiedad intelectual del código y diseño final se
                    transfiere al cliente, a menos que se especifique lo contrario. MyWebSite se reserva el derecho de
                    mostrar el trabajo en su portafolio.</p>
            </div>

            <div class="legal-section">
                <h2 class="text-accent">04. Responsabilidades del Cliente</h2>
                <p>El cliente es responsable de proporcionar toda la información, accesos y contenidos necesarios para
                    la ejecución del proyecto en los tiempos acordados. El retraso en la entrega de materiales puede
                    afectar la fecha final de entrega.</p>
            </div>

            <div class="legal-section">
                <h2 class="text-accent">05. Pagos y Cancelaciones</h2>
                <p>Los pagos se realizarán según el esquema acordado (anticipo y liquidación). En caso de cancelación
                    por parte del cliente, el anticipo no será reembolsable si el trabajo ya ha comenzado.</p>
            </div>

            <div class="legal-section">
                <h2 class="text-accent">06. Limitación de Responsabilidad</h2>
                <p>MyWebSite no se hace responsable por pérdidas de datos, interrupciones de servicio de terceros
                    (hosting, APIs) o mal uso de las herramientas entregadas una vez finalizado el proyecto.</p>
            </div>

            <div class="legal-section">
                <h2 class="text-accent">07. Uso de proyectos para portafolio y promoción</h2>
                <p>MyWebSite podrá utilizar los proyectos, diseños y soluciones desarrolladas para sus clientes como
                    material de portafolio, demostración comercial y publicidad, incluyendo capturas, imágenes, vídeos y
                    demostraciones a potenciales clientes, siempre protegiendo la información confidencial, datos
                    personales, credenciales y código fuente privado del cliente.</p>
            </div>

            <div style="text-align: center; margin-top: 3rem;">
                <a href="{{ route('home') }}" class="btn-primary">&larr; Volver Atrás</a>
            </div>
        </div>
    </main>
@endsection
