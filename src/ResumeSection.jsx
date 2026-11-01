import { PROFILE } from './profile-content.js'

const resumes = [
  ['Soporte IT / NOC', 'Soporte IT y NOC'],
  ['SOC L1 / Blue Team', 'SOC Junior'],
  ['Desarrollo y automatización', 'Desarrollo Junior y Automatizacion'],
  ['Atención al cliente / Call Center', 'Soporte Tecnico y Call Center'],
]

export default function ResumeSection() {
  return (
    <section id="cv" aria-labelledby="cv-title" className="py-20 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 id="cv-title" className="text-3xl font-extrabold">CV y disponibilidad</h2>
        <p className="mt-4 text-gray-700">Elegí el perfil más cercano a tu búsqueda para solicitar el CV correspondiente por email.</p>
        <p className="mt-4 font-semibold text-blue-800">{PROFILE.mobility}.</p>
        <p className="mt-2 text-gray-600">{PROFILE.location}.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {resumes.map(([label, subject]) => (
            <a key={subject} className="rounded-lg border border-blue-700 bg-white px-5 py-3 text-blue-800 font-semibold focus:ring-4 focus:ring-blue-300 hover:bg-blue-50"
              href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`Solicitud de CV ${subject}`)}`}>
              {label}
            </a>
          ))}
        </div>
        <div className="mt-6">
          <a className="inline-block rounded-lg border border-blue-700 px-6 py-3 text-blue-800 font-semibold focus:ring-4 focus:ring-blue-300"
            href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            Contactar por LinkedIn
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-600">El CV se comparte directamente por contacto profesional. Modalidad y fecha de incorporación a coordinar.</p>
      </div>
    </section>
  )
}
