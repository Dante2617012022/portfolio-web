const resumes = [
  ['SOC Junior', 'Diagnóstico, documentación y escalamiento.', 'SOC_Junior'],
  ['AppSec · IAM · DevSecOps', 'Identidad, desarrollo seguro y controles automatizados.', 'AppSec_IAM_DevSecOps_Junior'],
  ['GRC Junior', 'Riesgos, continuidad y documentación de controles.', 'GRC_Junior'],
  ['Hacking Ético Junior', 'Laboratorios autorizados y análisis de vulnerabilidades.', 'Hacking_Etico_Junior'],
]
export default function ResumeSection() {
  return (
    <section id="cv" aria-labelledby="cv-title" className="py-20 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 id="cv-title" className="text-3xl font-extrabold text-center">Currículum para cada oportunidad</h2>
        <p className="mt-4 text-center text-gray-600">Graduado en septiembre de 2026 · PDF de una página · Elegí el perfil que corresponde al puesto.</p>
        <div className="grid gap-5 md:grid-cols-2 mt-8">
          {resumes.map(([title, description, file]) => (
            <article key={file} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-2 text-gray-600">{description}</p>
              <a className="inline-block mt-4 rounded-lg bg-blue-700 px-4 py-3 text-white font-semibold focus:ring-4 focus:ring-blue-300"
                href={`${import.meta.env.BASE_URL}cv/CV_Dante_Balbuena_${file}.pdf`} download>
                Descargar CV {title} (PDF)
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
