# Política de seguridad

## Alcance

Este repositorio contiene un sitio estático publicado mediante GitHub Pages. No implementa autenticación, base de datos, formularios propios ni procesamiento de pagos.

## Reporte responsable

Si encontrás una vulnerabilidad o información sensible publicada accidentalmente, evitá abrir un issue público. Reportá de forma privada:

- descripción del problema;
- ruta o componente afectado;
- pasos mínimos para reproducirlo;
- impacto estimado;
- evidencia sin datos sensibles.

No incluyas tokens, cookies, credenciales, datos personales ni información de terceros.

## Riesgos relevantes

- dependencias frontend vulnerables;
- enlaces externos inseguros;
- exposición accidental de datos de contacto o documentos;
- XSS introducido por contenido dinámico;
- errores de configuración de GitHub Pages o Actions;
- publicación de evidencia sin sanitizar.

## Controles

- sitio estático sin backend propio;
- enlaces externos con `noreferrer noopener`;
- lint y compilación automatizados;
- auditoría de dependencias;
- Dependabot para npm y GitHub Actions;
- casos de estudio sanitizados;
- separación explícita entre experiencia profesional y laboratorios académicos.

## Divulgación de material ofensivo

Los laboratorios de pentesting se publican con fines educativos y omiten secretos, credenciales, flags y payloads reutilizables. No autorizan pruebas contra sistemas de terceros.
