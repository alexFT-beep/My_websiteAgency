@extends('layouts.app')

@section('content')
<main class="legal-page">
    <div class="legal-container glassmorphism">
        <h1>Política de <span class="text-accent glow">Privacidad</span></h1>
        <p class="last-updated">Última actualización: 18 de marzo de 2026</p>

        <div class="legal-intro">
            <p>En MyWebsite, valoramos la privacidad de nuestros clientes y usuarios. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que nos proporcionas al contratar nuestros servicios de desarrollo web, creación de aplicaciones y automatización de procesos.</p>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">01. Información que Recopilamos</h2>
            <p>Podemos recopilar los siguientes tipos de información:</p>
            <ul>
                <li><strong>Información de contacto:</strong> Nombre, correo electrónico, número de teléfono y dirección fiscal.</li>
                <li><strong>Información comercial:</strong> Nombre del negocio, detalles de sus procesos operativos para automatización y requisitos del proyecto.</li>
                <li><strong>Datos técnicos:</strong> Información sobre el dominio, hosting y credenciales de acceso necesarias para la ejecución de los servicios (manejadas bajo estrictos protocolos de seguridad).</li>
            </ul>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">02. Uso de la Información</h2>
            <p>La información recopilada se utiliza exclusivamente para:</p>
            <ul>
                <li>La prestación y entrega de los servicios contratados.</li>
                <li>Comunicación directa sobre el estado de los proyectos.</li>
                <li>Envío de facturación y gestión administrativa.</li>
                <li>Soporte técnico y mantenimiento post-entrega.</li>
                <li>Mejorar la experiencia del usuario y optimizar nuestras herramientas de automatización.</li>
            </ul>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">03. Protección y Seguridad</h2>
            <p>Implementamos medidas técnicas y organizativas para salvaguardar tus datos. El acceso a la información confidencial de los clientes está restringido únicamente al personal que requiere dicha información para desarrollar el servicio. No vendemos, alquilamos ni compartimos tus datos personales con terceros con fines comerciales.</p>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">04. Terceros y Herramientas</h2>
            <p>Para el desarrollo de páginas web y aplicaciones, podemos utilizar plataformas de terceros (como servicios de hosting, APIs o bases de datos). El uso de estas herramientas se rige por sus propias políticas de privacidad, y MyWebsite se asegura de utilizar proveedores que cumplan con estándares de seguridad internacionales.</p>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">05. Derechos del Usuario (ARCO)</h2>
            <p>Como titular de los datos, tienes derecho a:</p>
            <ul>
                <li>Acceder a tus datos personales en nuestro poder.</li>
                <li>Rectificar cualquier información inexacta o incompleta.</li>
                <li>Cancelar o solicitar la supresión de tus datos cuando ya no sean necesarios para los fines contratados.</li>
                <li>Oponerte al tratamiento de tus datos para fines específicos.</li>
            </ul>
        </div>

        <div class="legal-section">
            <h2 class="text-accent">06. Consentimiento</h2>
            <p>Al contratar los servicios de MyWebsite o navegar por nuestro sitio web, declaras conocer y aceptar los términos de esta Política de Privacidad.</p>
        </div>

        <div style="text-align: center; margin-top: 3rem;">
            <a href="{{ route('home') }}" class="btn-primary">&larr; Volver al Inicio</a>
        </div>
    </div>
</main>
@endsection
