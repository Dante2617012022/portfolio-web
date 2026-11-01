const paths = [
  {
    title: 'Soporte de aplicaciones y operaciones IT',
    evidence: 'Experiencia profesional',
    description: 'Más de cinco años en soporte de telecomunicaciones, diagnóstico remoto, seguimiento de casos y escalamiento bajo SLA. En Camdis conecto necesidades operativas con desarrollo y pruebas.',
    link: '#experience', label: 'Ver experiencia laboral',
  },
  {
    title: 'SOC L1 y monitoreo de seguridad',
    evidence: 'Formación y laboratorio propio',
    description: 'Cuatro detecciones documentadas con Wazuh y Suricata: contexto, evidencia, clasificación y respuesta temporal. Práctica controlada para mi primera oportunidad en SOC.',
    link: 'https://github.com/Dante2617012022/mini-soc-lab', label: 'Revisar detecciones y pruebas',
  },
  {
    title: 'Desarrollo junior y automatización',
    evidence: 'Trabajo actual en Camdis',
    description: 'ERP de producción e inventario en desarrollo, con Node.js, PostgreSQL, pruebas y prácticas DevSecOps. Las muestras públicas permiten revisar autorización, integridad e idempotencia.',
    link: 'https://github.com/Dante2617012022/camdis-erp-case-study', label: 'Revisar código y controles del ERP',
  },
]

export default function CareerPaths() {
  return (
    <section id="career-paths" aria-labelledby="career-paths-title" className="py-16 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 id="career-paths-title" className="text-3xl font-extrabold text-center">Qué puedo aportar a tu equipo</h2>
        <p className="mt-4 mx-auto max-w-3xl text-center text-gray-700">Un recorrido por mi experiencia y la evidencia técnica que podés revisar según el puesto.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {paths.map(path => (
            <article key={path.title} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-blue-800">{path.evidence}</p>
              <h3 className="mt-3 text-xl font-bold leading-snug">{path.title}</h3>
              <p className="mt-4 text-gray-700 leading-relaxed flex-1">{path.description}</p>
              <a href={path.link} {...(path.link.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="mt-6 inline-block text-blue-800 font-semibold underline rounded focus:ring-4 focus:ring-blue-300">{path.label}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
