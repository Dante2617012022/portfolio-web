const CARD_CONFIGS = [
  { selector: '.experience-overhaul__card', perspective: 1000 },
  { selector: '.education-overhaul__card', perspective: 1100 },
  { selector: '#projects [data-project-card]', perspective: 1200 },
  { selector: '#certs .cert-card', perspective: 1100 },
  { selector: '#contact .contact-main-card', perspective: 1100 },
  { selector: '#contact .contact-side-card', perspective: 1100 },
]

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
  const longestDuration = Math.max(0, ...durations)
  const longestDelay = Math.max(0, ...delays)
  return longestDuration + longestDelay
}

const getRevealState = (card) => {
  if (card.matches('.projects-reveal:not(.is-visible)')) return 'pending'
  if (card.matches('.contact-reveal:not(.contact-in)')) return 'pending'
  if (card.matches('.projects-reveal.is-visible, .contact-reveal.contact-in')) return 'settling'
  return 'ready'
}

const prepareCard = (card, perspective) => {
  if (card.dataset.cardMotionFixed === 'true') return

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  if (reduceMotion) {
    card.dataset.cardMotionFixed = 'true'
    return
  }

  const neutralTransform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0)`

  card.dataset.cardMotionFixed = 'true'
  card.style.transitionDelay = '0ms'
  card.style.transition =
    'transform 140ms cubic-bezier(.22,1,.36,1), border-color 250ms ease, box-shadow 250ms ease'
  card.style.transformOrigin = 'center center'
  card.style.backfaceVisibility = 'hidden'
  card.style.transform = neutralTransform

  const restoreNeutralPosition = () => {
    window.requestAnimationFrame(() => {
      if (!card.matches(':hover')) card.style.transform = neutralTransform
    })
  }

  card.addEventListener(
    'pointerenter',
    () => {
      if (!card.style.transform || card.style.transform === 'none') {
        card.style.transform = neutralTransform
      }
    },
    { passive: true },
  )
  card.addEventListener('pointerleave', restoreNeutralPosition, { passive: true })
  card.addEventListener('mouseleave', restoreNeutralPosition, { passive: true })
}

const scheduleCard = (card, perspective) => {
  if (
    card.dataset.cardMotionFixed === 'true' ||
    card.dataset.cardMotionFixScheduled === 'true'
  ) {
    return
  }

  const revealState = getRevealState(card)
  if (revealState === 'pending') return

  if (revealState === 'settling') {
    card.dataset.cardMotionFixScheduled = 'true'
    const wait = Math.max(60, getLongestTransition(card) + 60)
    window.setTimeout(() => {
      delete card.dataset.cardMotionFixScheduled
      prepareCard(card, perspective)
    }, wait)
    return
  }

  prepareCard(card, perspective)
}

const scanCards = () => {
  CARD_CONFIGS.forEach(({ selector, perspective }) => {
    document.querySelectorAll(selector).forEach((card) => scheduleCard(card, perspective))
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
