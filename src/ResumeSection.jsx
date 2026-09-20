export default function ResumeSection() {
  return (
    <section id="cv" aria-labelledby="cv-title" className="py-20 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 id="cv-title" className="text-3xl font-extrabold">Conversemos sobre tu oportunidad</h2>
        <p className="mt-4 text-gray-600">Si mi perfil encaja con tu búsqueda, contactame por LinkedIn para solicitar mi CV y contarme sobre el puesto.</p>
        <a className="inline-block mt-6 rounded-lg bg-blue-700 px-6 py-3 text-white font-semibold focus:ring-4 focus:ring-blue-300"
          href="https://www.linkedin.com/in/dante-gabriel-balbuena-179963235/" target="_blank" rel="noopener noreferrer">
          Solicitar CV por LinkedIn
        </a>
      </div>
    </section>
  )
}
