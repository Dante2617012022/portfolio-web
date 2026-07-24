import { startContactOverhaul } from './contact-section.js'

export const startContactInitFix = () => {
  if (window.__portfolioContactInitFixStarted) return
  window.__portfolioContactInitFixStarted = true

  const root = document.getElementById('root')
  if (!root) return

  let scheduled = false
  let observer

  const attempt = () => {
    startContactOverhaul()
    const section = document.querySelector('#contact')
    if (section?.dataset.contactOverhauled === 'true') {
      observer?.disconnect()
      return true
    }
    return false
  }

  const schedule = () => {
    if (scheduled) return
    scheduled = true
    window.requestAnimationFrame(() => {
      scheduled = false
      attempt()
    })
  }

  observer = new MutationObserver(schedule)
  observer.observe(root, { childList: true, subtree: true })
  schedule()
}
