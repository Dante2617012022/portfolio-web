const POSITIONING_MARKER = 'data-security-projects-positioning'

const setText = (root, selector, value) => {
  const node = root.querySelector(selector)
  if (node) node.textContent = value
}

const setStatusText = (card, value) => {
  const status = card.querySelector('.project-status')
  if (!status) return

  const statusIcon = status.querySelector('svg')
  const nodes = statusIcon
    ? [statusIcon, document.createTextNode(value)]
    : [document.createTextNode(value)]

  status.replaceChildren(...nodes)
}

const setChips = (card, values) => {
  const list = card.querySelector('.project-chip-list')
  if (!list) return

  list.replaceChildren(...values.map((value) => {
    const chip = document.createElement('span')
    chip.className = 'project-chip'
    chip.textContent = value
    return chip
  }))
}

const setControlTexts = (card, values) => {
  const controls = [...card.querySelectorAll('.project-control span')]
  controls.forEach((control, index) => {
    if (values[index]) control.textContent = values[index]
  })
}

const updateAnchor = (anchor, href, label) => {
  if (!anchor) return
  anchor.href = href
  anchor.target = '_blank'
  anchor.rel = 'noreferrer noopener'
  anchor.setAttribute('aria-label', label)

  const labelNode = anchor.querySelector('span')
  if (labelNode) labelNode.textContent = label
  else anchor.textContent = label
}

const ensureAction = (card, href, label) => {
  let actions = card.querySelector('.project-actions')
  if (!actions) {
    actions = document.createElement('div')
    actions.className = 'project-actions'
    card.append(actions)
  }

  let anchor = actions.querySelector('a')
  if (!anchor) {
    anchor = document.createElement('a')
    anchor.className = 'project-link'
    actions.append(anchor)
  }

  updateAnchor(anchor, href, label)
}

const applySecurityProjectPositioning = () => {
  const section = document.querySelector('#projects')
  if (!section || section.getAttribute(POSITIONING_MARKER) === 'true') return

  const cards = [...section.querySelectorAll('[data-project-card]')]
  if (cards.length < 3) return

  const [camdis, chatbot, offensiveLabs] = cards

  setStatusText(camdis, 'Proyecto principal · AppSec / IAM / DevSecOps')
  setText(camdis, '.text-xs', 'Piloto técnico · Entorno controlado')
  setText(camdis, '.project-heading', 'Camdis Commerce Platform')
  setText(
    camdis,
    '.project-description',
    'Plataforma de pedidos y operación gastronómica con seguridad integrada: identidad separada para clientes y personal, MFA, autorización por roles, sesiones BFF, reglas de negocio en API, CI de seguridad, backups y recuperación.',
  )
  setChips(camdis, ['Fastify', 'PostgreSQL', 'Keycloak', 'OIDC + PKCE', 'MFA TOTP', 'Docker', 'SBOM'])
  setControlTexts(camdis, [
    'Clientes OIDC, callbacks, audiencias, cookies y sesiones separados por contexto.',
    'Google limitado a clientes y rechazo backend de identidad federada administrativa.',
    'Autorización por rol, CSRF, idempotencia y precios calculados en el servidor.',
    'CI con pruebas, secret scanning, Trivy, auditoría de dependencias y SBOM.',
  ])

  const camdisActions = [...camdis.querySelectorAll('.project-actions a')]
  updateAnchor(
    camdisActions[0],
    'https://github.com/Dante2617012022/portfolio-web/blob/main/docs/case-studies/camdis-commerce-security.md',
    'Ver caso de estudio sanitizado',
  )
  updateAnchor(
    camdisActions[1],
    'https://github.com/Dante2617012022/portfolio-web/blob/main/docs/PORTFOLIO_EVIDENCE_INDEX.md',
    'Ver índice de evidencias',
  )

  const architecture = camdis.querySelector('.project-architecture')
  if (architecture) {
    architecture.setAttribute('aria-label', 'Arquitectura resumida de Camdis Commerce Platform')
  }
  setText(camdis, '.architecture-label', 'Arquitectura segura resumida')
  const architectureSteps = [...camdis.querySelectorAll('.architecture-step span:last-child')]
  const architectureLabels = [
    'Tienda pública y dashboard interno',
    'Caddy como reverse proxy y capa de entrada',
    'API Fastify con reglas y autorización',
    'Keycloak con OIDC, PKCE y MFA',
    'PostgreSQL para datos, sesiones y auditoría',
    'CI, escaneo, SBOM, backups y rollback',
  ]
  architectureSteps.forEach((step, index) => {
    if (architectureLabels[index]) step.textContent = architectureLabels[index]
  })

  setStatusText(chatbot, 'Automatización segura e IA controlada')
  setText(chatbot, '.project-heading', 'Chatbot de pedidos con IA y controles de seguridad')
  setText(
    chatbot,
    '.project-description',
    'Sistema modular de pedidos por WhatsApp con parser determinístico, fallback de IA restringido, validación contra catálogo, rate limiting, gestión de secretos, HMAC para webhooks y pruebas automatizadas.',
  )
  setChips(chatbot, ['Node.js', 'SQLite', 'IA controlada', 'JSON Schema', 'Rate limiting', 'HMAC', 'CodeQL'])
  const privateNoteText = chatbot.querySelector('.project-private-note span')
  if (privateNoteText) {
    privateNoteText.textContent = 'Repositorio público con README técnico, modelo de amenazas, política de seguridad y CI.'
  }
  ensureAction(
    chatbot,
    'https://github.com/Dante2617012022/chatbot-hamburgueseria-v3',
    'Ver código y documentación',
  )

  setStatusText(offensiveLabs, 'Pentesting en laboratorios autorizados')
  setText(offensiveLabs, '.project-heading', 'Hacking Ético y Tratamiento de Vulnerabilidades')
  setText(
    offensiveLabs,
    '.project-description',
    'Casos académicos de pentesting web y Linux con reconocimiento, explotación controlada, escalada, post-explotación, pivoting, documentación de impacto y recomendaciones de remediación.',
  )
  setChips(offensiveLabs, ['OWASP Top 10', 'Nmap', 'Burp Suite', 'Linux', 'Escalada', 'Pivoting', 'Reportes'])
  const offensiveActions = [...offensiveLabs.querySelectorAll('.project-actions a')]
  updateAnchor(
    offensiveActions[0],
    'https://github.com/Dante2617012022/Actividades-UGR-Ciberseguridad/tree/main/hacking-etico',
    'Ver casos ofensivos sanitizados',
  )

  section.setAttribute(POSITIONING_MARKER, 'true')
}

export const startSecurityProjectPositioning = () => {
  if (window.__securityProjectPositioningStarted) return
  window.__securityProjectPositioningStarted = true

  const root = document.getElementById('root')
  if (!root) return

  let scheduled = false
  const schedule = () => {
    if (scheduled) return
    scheduled = true
    window.requestAnimationFrame(() => {
      scheduled = false
      applySecurityProjectPositioning()
    })
  }

  const observer = new MutationObserver(schedule)
  observer.observe(root, { childList: true, subtree: true })
  schedule()
}
