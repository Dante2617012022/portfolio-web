const CARD_CONFIGS = [
  {
    selector: '.experience-overhaul__card',
    perspective: 1000,
    rotateXFactor: 7,
    rotateYFactor: 7,
    lift: 3,
    glareSelector: '.experience-overhaul__glare',
    glare: (x, y) =>
      `radial-gradient(500px circle at ${x}% ${y}%, rgba(255,255,255,.18), transparent 48%)`,
  },
  {
    selector: '.education-overhaul__card',
    perspective: 1100,
    rotateXFactor: 5,
    rotateYFactor: 5,
    lift: 2,
    glareSelector: '.education-overhaul__glare',
    glare: (x, y) =>
      `radial-gradient(520px circle at ${x}% ${y}%, rgba(255,255,255,.15), transparent 58%)`,
  },
  {
    selector: '#projects [data-project-card]',
    perspective: 1200,
    rotateXFactor: 6,
    rotateYFactor: 8,
    lift: 3,
    usesGlareVariables: true,
  },
  {
    selector: '#certs .cert-card',
    perspective: 1200,
    rotateXFactor: 7,
    rotateYFactor: 9,
    lift: 3,
    glareSelector: '.cert-glare',
    glare: (x, y) =>
      `radial-gradient(620px at ${x}% ${y}%,rgba(125,211,252,.2),transparent 62%)`,
  },
  {
    selector: '#contact .contact-main-card',
    perspective: 1100,
    rotateXFactor: 7,
    rotateYFactor: 7,
    lift: 2,
    glareSelector: '.contact-glare',
    glare: (x, y) =>
      `radial-gradient(620px at ${x}% ${y}%,rgba(96,165,250,.18),transparent 62%)`,
  },
  {
    selector: '#contact .contact-side-card',
    perspective: 1100,
    rotateXFactor: 7,
    rotateYFactor: 7,
    lift: 2,
    glareSelector: '.contact-glare',
    glare: (x, y) =>
      `radial-gradient(620px at ${x}% ${y}%,rgba(96,165,250,.18),transparent 62%)`,
  },
]

const controllers = new WeakMap()
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const lerp = (current, target, amount) => current + (target - current) * amount

const toMilliseconds = (value) => {
  const trimmed = value.trim()
  if (!trimmed) return 0
  if (trimmed.endsWith('ms')) return Number.parseFloat(trimmed) || 0
  if (trimmed.endsWith('s')) return (Number.parseFloat(trimmed) || 0) * 1000
  return 0
}

const getLongestTransition = (card) => {
  const styles = window.getComputedStyle(card)
  const durations = styles.transitionDuration.split(',').map(toMilliseconds)
  const delays = styles.transitionDelay.split(',').map(toMilliseconds)
  return Math.max(0, ...durations) + Math.max(0, ...delays)
}

const getRevealState = (card) => {
  if (card.matches('.projects-reveal:not(.is-visible)')) return 'pending'
  if (card.matches('.contact-reveal:not(.contact-in)')) return 'pending'
  if (card.matches('.projects-reveal.is-visible, .contact-reveal.contact-in')) return 'settling'
  return 'ready'
}

const createController = (card, config) => {
  const glare = config.glareSelector ? card.querySelector(config.glareSelector) : null
  const state = {
    ready: false,
    active: false,
    frame: 0,
    currentX: 0,
    currentY: 0,
    currentLift: 0,
    currentGlareX: 50,
    currentGlareY: 50,
    targetX: 0,
    targetY: 0,
    targetLift: 0,
    targetGlareX: 50,
    targetGlareY: 50,
  }

  const neutralTransform = `perspective(${config.perspective}px) rotateX(0deg) rotateY(0deg) translateY(0px)`

  const updateGlare = () => {
    const x = state.currentGlareX
    const y = state.currentGlareY

    if (config.usesGlareVariables) {
      card.style.setProperty('--glare-x', `${x}%`)
      card.style.setProperty('--glare-y', `${y}%`)
      return
    }

    if (glare && config.glare) glare.style.background = config.glare(x, y)
  }

  const clearGlare = () => {
    if (config.usesGlareVariables) {
      card.style.setProperty('--glare-x', '50%')
      card.style.setProperty('--glare-y', '50%')
      return
    }

    if (glare) glare.style.background = ''
  }

  const render = () => {
    state.frame = 0
    if (!state.ready) return

    const smoothing = state.active ? 0.11 : 0.09
    state.currentX = lerp(state.currentX, state.targetX, smoothing)
    state.currentY = lerp(state.currentY, state.targetY, smoothing)
    state.currentLift = lerp(state.currentLift, state.targetLift, smoothing)
    state.currentGlareX = lerp(state.currentGlareX, state.targetGlareX, 0.14)
    state.currentGlareY = lerp(state.currentGlareY, state.targetGlareY, 0.14)

    card.style.transform =
      `perspective(${config.perspective}px) ` +
      `rotateX(${state.currentX.toFixed(3)}deg) ` +
      `rotateY(${state.currentY.toFixed(3)}deg) ` +
      `translateY(${state.currentLift.toFixed(3)}px)`
    updateGlare()

    const distance =
      Math.abs(state.targetX - state.currentX) +
      Math.abs(state.targetY - state.currentY) +
      Math.abs(state.targetLift - state.currentLift) +
      Math.abs(state.targetGlareX - state.currentGlareX) / 10 +
      Math.abs(state.targetGlareY - state.currentGlareY) / 10

    if (distance > 0.015) {
      state.frame = window.requestAnimationFrame(render)
      return
    }

    state.currentX = state.targetX
    state.currentY = state.targetY
    state.currentLift = state.targetLift
    state.currentGlareX = state.targetGlareX
    state.currentGlareY = state.targetGlareY

    if (!state.active) {
      card.style.transform = neutralTransform
      clearGlare()
    }
  }

  const requestRender = () => {
    if (!state.ready || state.frame) return
    state.frame = window.requestAnimationFrame(render)
  }

  const stopLegacyHandler = (event) => {
    event.stopImmediatePropagation()
  }

  const handleEnter = (event) => {
    stopLegacyHandler(event)
    if (!state.ready) return
    state.active = true
    requestRender()
  }

  const handleMove = (event) => {
    stopLegacyHandler(event)
    if (!state.ready) return

    const rect = card.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1)
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1)

    state.active = true
    state.targetX = (0.5 - y) * config.rotateXFactor
    state.targetY = (x - 0.5) * config.rotateYFactor
    state.targetLift = -config.lift
    state.targetGlareX = x * 100
    state.targetGlareY = y * 100
    requestRender()
  }

  const handleLeave = (event) => {
    stopLegacyHandler(event)
    if (!state.ready) return

    state.active = false
    state.targetX = 0
    state.targetY = 0
    state.targetLift = 0
    state.targetGlareX = 50
    state.targetGlareY = 50
    requestRender()
  }

  const captureOptions = { capture: true, passive: true }
  card.addEventListener('pointerenter', handleEnter, captureOptions)
  card.addEventListener('mouseenter', handleEnter, captureOptions)
  card.addEventListener('pointermove', handleMove, captureOptions)
  card.addEventListener('mousemove', handleMove, captureOptions)
  card.addEventListener('pointerleave', handleLeave, captureOptions)
  card.addEventListener('mouseleave', handleLeave, captureOptions)

  const prepare = () => {
    if (state.ready) return
    state.ready = true
    card.dataset.cardMotionFixed = 'true'
    card.style.transitionDelay = '0ms'
    card.style.transition = 'border-color 250ms ease, box-shadow 250ms ease'
    card.style.transformOrigin = 'center center'
    card.style.backfaceVisibility = 'hidden'
    card.style.transform = neutralTransform
    clearGlare()
  }

  return { prepare }
}

const scheduleCard = (card, config) => {
  let controller = controllers.get(card)
  if (!controller) {
    controller = createController(card, config)
    controllers.set(card, controller)
  }

  if (card.dataset.cardMotionFixed === 'true') return

  const revealState = getRevealState(card)
  if (revealState === 'pending') return

  if (revealState === 'settling') {
    if (card.dataset.cardMotionFixScheduled === 'true') return
    card.dataset.cardMotionFixScheduled = 'true'
    const wait = Math.max(80, getLongestTransition(card) + 80)
    window.setTimeout(() => {
      delete card.dataset.cardMotionFixScheduled
      controller.prepare()
    }, wait)
    return
  }

  controller.prepare()
}

const scanCards = () => {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const finePointer = window.matchMedia?.('(pointer: fine)')?.matches
  if (reduceMotion || !finePointer) return

  CARD_CONFIGS.forEach((config) => {
    document.querySelectorAll(config.selector).forEach((card) => scheduleCard(card, config))
  })
}

export const startCardMotionFix = () => {
  if (window.__portfolioCardMotionFixStarted) return
  window.__portfolioCardMotionFixStarted = true

  const root = document.getElementById('root')
  if (!root) return

  let scheduled = false
  const scheduleScan = () => {
    if (scheduled) return
    scheduled = true
    window.requestAnimationFrame(() => {
      scheduled = false
      scanCards()
    })
  }

  const observer = new MutationObserver(scheduleScan)
  observer.observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  })

  scheduleScan()
}
