const PROFILE_COPY =
  'Profesional con más de cinco años y medio de experiencia en soporte técnico y gestión de incidentes para telecomunicaciones y servicios críticos. Experiencia en diagnóstico remoto, documentación, priorización por criticidad, cumplimiento de SLA y escalamiento a niveles especializados.'

const EXPERIENCE_COPY =
  'Más de cinco años y medio de experiencia atendiendo, diagnosticando y gestionando incidentes técnicos para servicios de telecomunicaciones y energía, con foco en SLA, documentación, criticidad y escalamiento.'

const replaceLegacyTenurePhrases = (root) => {
  if (!root || !('createTreeWalker' in document)) return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes = []

  while (walker.nextNode()) textNodes.push(walker.currentNode)

  textNodes.forEach((node) => {
    const original = node.nodeValue || ''
    const corrected = original
      .replace(/Casi siete años/g, 'Más de cinco años y medio')
      .replace(/casi siete años/g, 'más de cinco años y medio')
      .replace(/Casi 7 años/g, 'Más de 5 años y medio')
      .replace(/casi 7 años/g, 'más de 5 años y medio')

    if (corrected !== original) node.nodeValue = corrected
  })
}

const correctProfile = () => {
  const container = document.querySelector('#about .max-w-prose')
  if (!container) return false

  let wrapper = container.querySelector(':scope > [data-tenure-profile-copy]')

  if (!wrapper) {
    const directParagraphs = [...container.children].filter(
      (element) => element.tagName === 'P',
    )

    if (!directParagraphs.length) return false

    wrapper = document.createElement('div')
    wrapper.dataset.tenureProfileCopy = 'true'
    wrapper.style.display = 'contents'
    directParagraphs[0].insertAdjacentElement('beforebegin', wrapper)
    directParagraphs.forEach((paragraph) => wrapper.append(paragraph))
  }

  const firstParagraph = wrapper.querySelector('p')
  if (!firstParagraph) return false

  firstParagraph.textContent = PROFILE_COPY
  container.dataset.tenureConsistency = 'true'
  return true
}

const correctExperience = () => {
  const section = document.querySelector('#experience')
  if (!section) return false

  const metric = section.querySelector(
    '[data-experience-overhaul] .experience-overhaul__metric strong',
  )
  const summary = section.querySelector(
    '[data-experience-overhaul] .experience-overhaul__card[data-featured="true"] .experience-overhaul__card-summary',
  )

  if (!metric || !summary) return false

  metric.textContent = 'Más de 5 años y medio'
  summary.textContent = EXPERIENCE_COPY
  section.dataset.tenureConsistency = 'true'
  return true
}

const applyTenureConsistency = () => {
  replaceLegacyTenurePhrases(document.getElementById('root'))
  correctProfile()
  correctExperience()
}

export const startTenureConsistency = () => {
  if (window.__portfolioTenureConsistencyStarted) return
  window.__portfolioTenureConsistencyStarted = true

  const root = document.getElementById('root')
  if (!root) return

  let scheduled = false
  const schedule = () => {
    if (scheduled) return
    scheduled = true

    window.requestAnimationFrame(() => {
      scheduled = false
      applyTenureConsistency()
    })
  }

  const observer = new MutationObserver(schedule)
  observer.observe(root, { childList: true, subtree: true })
  schedule()
}
