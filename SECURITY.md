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
- publicación de evidencia sin sanitizar;
- divulgación excesiva de arquitectura, inventario o controles pendientes de sistemas reales.

## Controles

- sitio estático sin backend propio;
- enlaces externos con `noreferrer noopener`;
- lint y compilación automatizados;
- auditoría de dependencias;
- Dependabot para npm y GitHub Actions;
- casos de estudio sanitizados;
- política de divulgación pública para contenido técnico;
- separación explícita entre experiencia profesional, proyectos aplicados y laboratorios académicos.

## Divulgación de proyectos reales

El portfolio publica capacidades, patrones y evidencia sanitizada. No debe publicar:

- secretos, credenciales, certificados ni datos personales;
- IP, dominios internos, hosts, puertos, redes o topología productiva;
- rutas administrativas, endpoints internos o configuración;
- nombres de clientes IAM, cookies, audiencias, roles o cuentas;
- versiones operativas asociadas a un sistema real;
- hallazgos abiertos o controles ausentes con detalle explotable.

Los nombres de tecnologías pueden figurar como competencias generales, pero no deben convertirse en un mapa de infraestructura. El criterio completo está documentado en [`docs/PUBLIC_DISCLOSURE_POLICY.md`](docs/PUBLIC_DISCLOSURE_POLICY.md).

## Divulgación de material ofensivo

Los laboratorios de pentesting se publican con fines educativos y omiten secretos, credenciales, flags y payloads reutilizables. No autorizan pruebas contra sistemas de terceros.
