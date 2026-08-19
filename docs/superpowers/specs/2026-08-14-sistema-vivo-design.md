# Sistema vivo — diseño de experiencia

## Objetivo

Convertir la landing de UXEL en una experiencia memorable que combine la confianza de una consultoría B2B premium con la sofisticación visible de un equipo tecnológico. La conversión principal será agendar un diagnóstico estratégico; las demos servirán como prueba de capacidad, no como destino principal.

## Audiencia

La página debe funcionar para dos públicos que suelen visitar juntos o influirse mutuamente:

- Gerentes y líderes de negocio que necesitan entender el impacto, el riesgo y el siguiente paso.
- Perfiles técnicos que quieren comprobar rigor, criterio y capacidad de implementación.

El lenguaje inicial será de negocio. Los detalles técnicos se descubrirán progresivamente.

## Dirección visual: sistema vivo

La interfaz usará una estética editorial oscura y sobria con acentos cian y esmeralda existentes. El elemento distintivo será un mapa de señales animado: nodos y conexiones representan ventas, operaciones, experiencia de cliente y tecnología. Al desplazarse, sus conexiones se reorganizan y pasan de ruido disperso a oportunidades priorizadas.

La animación nunca será requisito para comprender el contenido. Cuando `prefers-reduced-motion` esté activo o la capacidad del dispositivo sea limitada, se mostrará una composición estática equivalente.

## Recorrido de la página

1. **Hero / señal inicial.** Pantalla completa con el mapa de señales, titular actual refinado y CTA principal `Agendar diagnóstico`. Un CTA secundario permite explorar casos.
2. **Diagnóstico visual.** Un breve bloque explica la transformación de señales desconectadas a una decisión concreta: problema, impacto y siguiente paso.
3. **Tres rutas.** Desarrollo, marca B2B y CX se presentan como rutas que parten del mismo mapa. Cada una muestra resultado de negocio, mecanismo de trabajo y capacidades técnicas relevantes.
4. **Prueba de capacidad.** Casos y demos existentes se reformulan como tarjetas de evidencia. Las demos siguen en rutas dedicadas y no interrumpen la lectura principal.
5. **Método.** El proceso muestra diagnóstico, diseño de sistema y ejecución medible; sirve para reducir incertidumbre antes del contacto.
6. **Cierre / conversión.** Sección inmersiva oscura que enmarca el diagnóstico como el primer entregable, con formulario de contacto y una llamada clara a agenda.

## Arquitectura de componentes

- `SignalMap`: componente cliente aislado que dibuja y anima el mapa; acepta modo reducido y no depende de datos remotos.
- `Hero`: integra el mapa, titular y CTAs sin contener lógica de animación propia.
- `DiagnosisPanel`: bloque estático y accesible que comunica problema, impacto y siguiente paso.
- `Services`: conserva los servicios, pero los conecta visualmente con las tres rutas del sistema.
- `ProofOfCapability`: evolución de casos/demos con enlaces a las rutas actuales.
- `StickyDiagnosticCTA`: CTA discreto visible después del hero; no debe aparecer si el formulario ya está en pantalla.

Los componentes existentes se conservarán cuando su responsabilidad siga siendo clara. El mapa y sus preferencias de movimiento vivirán fuera de `Hero` para que se puedan probar y mantener por separado.

## Datos y comportamiento

El mapa usa un conjunto local y tipado de nodos/enlaces. No habrá telemetría, API ni IA simulada presentada como real. Los estados interactivos deben describirse mediante texto accesible, y los enlaces y botones han de funcionar con teclado.

El formulario continúa validando con Zod y React Hook Form. La API de contacto seguirá devolviendo errores explícitos si el envío falla; una integración real de correo queda fuera de este rediseño visual, salvo que se solicite aparte.

## Rendimiento y accesibilidad

- Respetar `prefers-reduced-motion` y evitar parallax o animaciones obligatorias.
- Preferir SVG o DOM/CSS para el mapa; no cargar librerías de visualización adicionales.
- Pausar cálculos visuales cuando la sección no esté visible.
- Mantener contraste AA, foco visible, jerarquía de encabezados y etiquetas de formularios.
- Medir que el hero no cause desplazamientos de diseño ni penalice innecesariamente la carga inicial.

## Verificación

- Build de producción de Next.js sin errores.
- Revisión manual de escritorio y móvil.
- Navegación por teclado y comprobación de modo de movimiento reducido.
- Verificar que los CTAs llevan a contacto/casos según corresponda y que las demos existentes continúan funcionando.

## Fuera de alcance

- Reemplazar las demos por sistemas de producción.
- Envío real de emails, calendario de terceros o CRM.
- Cambios a la landing estática independiente de Operata AI en `PAge/`.
