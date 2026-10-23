import { PROFILE } from './profile-content.js'

export default function ResumeSection() {
  return (
    <section id="cv" aria-labelledby="cv-title" className="py-20 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 id="cv-title" className="text-3xl font-extrabold">CV y disponibilidad</h2>
        <p className="mt-4 text-gray-700">CV orientado a SOC Nivel 1 / Junior, con experiencia en soporte técnico y práctica de análisis de alertas en laboratorio.</p>
        <p className="mt-4 font-semibold text-blue-800">{PROFILE.mobility}.</p>
        <p className="mt-2 text-gray-600">{PROFILE.location}.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a className="inline-block rounded-lg bg-blue-700 px-6 py-3 text-white font-semibold focus:ring-4 focus:ring-blue-300"
            href={`mailto:${PROFILE.email}?subject=Solicitud%20de%20CV%20SOC%20Junior`}>
            Solicitar CV por email
          </a>
          <a className="inline-block rounded-lg border border-blue-700 px-6 py-3 text-blue-800 font-semibold focus:ring-4 focus:ring-blue-300"
            href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            Contactar por LinkedIn
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-600">El CV se comparte directamente por contacto profesional.</p>
      </div>
    </section>
  )
}
