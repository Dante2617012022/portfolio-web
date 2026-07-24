import React from 'react'
import ReactDOM from 'react-dom/client'
import PortfolioDante from './PortfolioDante.jsx'
import { startPortfolioContentOverrides } from './content-overrides.js'
import { startHeroContent } from './hero-content.js'
import { startHeroBackground } from './hero-background.js'
import { startProfileVisuals } from './profile-visuals.js'
import { startSkillsOverhaul } from './skills-section.js'
import { startSkillsInteractions } from './skills-interactions.js'
import { startSkillsClickFix } from './skills-click-fix.js'
import { startExperienceOverhaul } from './experience-section.js'
import './index.css'

const redirectPath = sessionStorage.getItem('redirect')

if (redirectPath) {
  sessionStorage.removeItem('redirect')

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const normalizedRedirect = redirectPath.startsWith('/')
    ? redirectPath.slice(1)
    : redirectPath
  const targetUrl = `${basePath}/${normalizedRedirect}`

  window.history.replaceState(null, '', targetUrl)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PortfolioDante />
  </React.StrictMode>,
)

startPortfolioContentOverrides()
startHeroContent()
startHeroBackground()
startProfileVisuals()
startSkillsOverhaul()
startSkillsInteractions()
startSkillsClickFix()
startExperienceOverhaul()
