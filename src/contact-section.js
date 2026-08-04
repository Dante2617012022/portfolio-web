const EMAIL_USER = 'dantebalbuenaatar'
const EMAIL_DOMAIN = 'gmail.com'
const PHONE_HREF = '+543816654021'
const GITHUB_URL = 'https://github.com/Dante2617012022'

const getEmail = () => `${EMAIL_USER}@${EMAIL_DOMAIN}`

const ensureContactStyles = () => {
  if (document.getElementById('contact-overhaul-styles')) return

  const style = document.createElement('style')
  style.id = 'contact-overhaul-styles'
  style.textContent = `
    #contact{
      position:relative;
      overflow:hidden;
      color:#0f172a;
      background:
        radial-gradient(circle at 12% 15%,rgba(59,130,246,.12),transparent 30%),
        radial-gradient(circle at 88% 80%,rgba(14,165,233,.10),transparent 32%),
        #fff;
    }
    #contact .contact-heading{
      max-width:820px;
      margin:0 auto;
      text-align:center;
    }
    #contact .contact-heading h2{
      color:#0f172a;
      font-size:clamp(2rem,5vw,2.75rem);
      font-weight:800;
      letter-spacing:-.035em;
    }
    #contact .contact-title-line{
      display:flex;
      align-items:center;
      justify-content:center;
      gap:.5rem;
      margin-top:.8rem;
    }
    #contact .contact-title-line span:first-child{
      width:4rem;
      height:.25rem;
      border-radius:999px;
      background:#2563eb;
    }
    #contact .contact-title-line span:last-child{
      width:1.25rem;
      height:.25rem;
      border-radius:999px;
      background:#60a5fa;
    }
    #contact .contact-heading-copy{
      margin-top:1rem;
      color:#475569;
      line-height:1.75;
    }
    #contact .contact-layout{
      display:grid;
      gap:1.25rem;
      max-width:1080px;
      margin:3rem auto 0;
      perspective:1200px;
    }
    #contact .contact-main-card,
    #contact .contact-side-card{
      position:relative;
      overflow:hidden;
      border:1px solid rgba(148,163,184,.28);
      border-radius:1.65rem;
      background:rgba(255,255,255,.92);
      box-shadow:0 24px 65px rgba(15,23,42,.12),inset 0 1px 0 rgba(255,255,255,.8);
      transform-style:preserve-3d;
      transition:transform .22s ease,border-color .25s ease,box-shadow .25s ease;
      will-change:transform;
    }
    #contact .contact-main-card:hover,
    #contact .contact-main-card:focus-within,
    #contact .contact-side-card:hover,
    #contact .contact-side-card:focus-within{
      border-color:rgba(37,99,235,.48);
      box-shadow:0 30px 75px rgba(15,23,42,.17),0 0 0 1px rgba(59,130,246,.08);
    }
    #contact .contact-glare{
      position:absolute;
      inset:0;
      pointer-events:none;
      opacity:.7;
      background:radial-gradient(620px at 50% 10%,rgba(96,165,250,.15),transparent 62%);
    }
    #contact .contact-main-content{
      position:relative;
      padding:clamp(1.5rem,4vw,3rem);
    }
    #contact .contact-kicker{
      color:#2563eb;
      font-size:.78rem;
      font-weight:800;
      letter-spacing:.13em;
      text-transform:uppercase;
    }
    #contact .contact-name{
      margin-top:.55rem;
      color:#0f172a;
      font-size:clamp(1.8rem,4vw,2.55rem);
      font-weight:800;
      letter-spacing:-.03em;
      line-height:1.12;
    }
    #contact .contact-role{
      margin-top:.65rem;
      color:#334155;
      font-weight:700;
      line-height:1.55;
    }
    #contact .contact-summary{
      max-width:760px;
      margin-top:1.2rem;
      color:#475569;
      line-height:1.75;
    }
    #contact .contact-actions{
      display:flex;
      flex-wrap:wrap;
      gap:.8rem;
      margin-top:1.65rem;
    }
    #contact .contact-action{
      display:inline-flex;
      min-height:2.9rem;
      align-items:center;
      justify-content:center;
      gap:.6rem;
      border-radius:.95rem;
      padding:.78rem 1.05rem;
      font-weight:800;
      text-decoration:none;
      transition:transform .2s ease,box-shadow .2s ease,background .2s ease,border-color .2s ease;
    }
    #contact .contact-action-primary{
      color:#fff;
      background:linear-gradient(135deg,#2563eb,#0284c7);
      box-shadow:0 14px 32px rgba(37,99,235,.24);
    }
    #contact .contact-action-secondary{
      color:#1e3a8a;
      background:#eff6ff;
      border:1px solid #bfdbfe;
    }
    #contact .contact-action-neutral{
      color:#0f172a;
      background:#f8fafc;
      border:1px solid #cbd5e1;
    }
    #contact .contact-action:hover,
    #contact .contact-action:focus-visible{
      transform:translateY(-2px);
      outline:none;
      box-shadow:0 18px 38px rgba(15,23,42,.16);
    }
    #contact .contact-copy-row{
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      gap:.75rem;
      margin-top:1.2rem;
      color:#64748b;
      font-size:.84rem;
    }
    #contact .contact-copy-button{
      border:0;
      border-radius:.75rem;
      padding:.58rem .8rem;
      color:#1d4ed8;
      background:#eff6ff;
      font-weight:800;
      cursor:pointer;
    }
    #contact .contact-copy-button:hover,
    #contact .contact-copy-button:focus-visible{
      background:#dbeafe;
      outline:2px solid rgba(37,99,235,.25);
      outline-offset:2px;
    }
    #contact .contact-status{
      min-height:1.25rem;
      color:#047857;
      font-weight:700;
    }
    #contact .contact-side-card{
      padding:1.5rem;
    }
    #contact .contact-side-card h3{
      color:#0f172a;
      font-size:1.05rem;
      font-weight:800;
    }
    #contact .contact-side-list{
      display:grid;
      gap:.85rem;
      margin-top:1rem;
      padding:0;
      list-style:none;
    }
    #contact .contact-side-list li{
      display:flex;
      gap:.75rem;
      align-items:flex-start;
      color:#475569;
      line-height:1.6;
    }
    #contact .contact-side-icon{
      display:grid;
      flex:0 0 auto;
      width:2rem;
      height:2rem;
      place-items:center;
      border-radius:.7rem;
      color:#1d4ed8;
      background:#eff6ff;
      font-size:.75rem;
      font-weight:800;
    }
    #contact .contact-badges{
      display:flex;
      flex-wrap:wrap;
      gap:.55rem;
      margin-top:1.15rem;
    }
    #contact .contact-badge{
      display:inline-flex;
      align-items:center;
      gap:.4rem;
      border-radius:999px;
      padding:.5rem .75rem;
      color:#1e3a8a;
      background:#eff6ff;
      border:1px solid #dbeafe;
      font-size:.75rem;
      font-weight:800;
    }
    #contact .contact-closing{
      max-width:900px;
      margin:1.5rem auto 0;
      padding:1rem 1.2rem;
      border-radius:1rem;
      color:#334155;
      background:rgba(248,250,252,.88);
      border:1px solid rgba(148,163,184,.18);
      text-align:center;
      font-size:.9rem;
      font-weight:650;
      line-height:1.65;
    }
    #contact .contact-reveal{
      opacity:0;
      transform:translateY(22px);
    }
    #contact .contact-reveal.contact-in{
      opacity:1;
      transform:none;
      transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);
    }
    @media (min-width:860px){
      #contact .contact-layout{
        grid-template-columns:minmax(0,2fr) minmax(260px,.8fr);
        align-items:stretch;
      }
    }
    @media (prefers-reduced-motion:reduce){
      #contact .contact-reveal{
        opacity:1;
        transform:none;
      }
      #contact .contact-main-card,
      #contact .contact-side-card,
      #contact .contact-action{
        transition:none;
      }
    }
  `
  document.head.append(style)
}

const contactMarkup = `
  <div class="contact-heading contact-reveal">
    <h2>Hablemos sobre oportunidades en ciberseguridad</h2>
    <div class="contact-title-line" aria-hidden="true"><span></span><span></span></div>
    <p class="contact-heading-copy">Estoy interesado en oportunidades junior en SOC, AppSec y DevSecOps, además de soporte de seguridad y gestión de incidentes.</p>
  </div>

  <div class="contact-layout">
    <article class="contact-main-card contact-reveal" tabindex="0" aria-labelledby="contact-name">
      <div class="contact-glare" aria-hidden="true"></div>
      <div class="contact-main-content">
        <p class="contact-kicker">Contacto profesional</p>
        <h3 class="contact-name" id="contact-name">Dante Gabriel Balbuena Atar</h3>
        <p class="contact-role">Técnico en Ciberseguridad · SOC Jr. · AppSec y DevSecOps Jr.</p>
        <p class="contact-summary">Busco aportar experiencia operativa, capacidad de diagnóstico y formación universitaria en ciberseguridad a equipos donde pueda analizar incidentes, fortalecer aplicaciones y automatizar controles de seguridad dentro del ciclo de desarrollo.</p>

        <div class="contact-actions" aria-label="Canales de contacto">
          <a class="contact-action contact-action-primary" href="mailto:${getEmail()}?subject=Oportunidad%20laboral%20en%20ciberseguridad"><span aria-hidden="true">✉</span>Enviar email</a>
          <a class="contact-action contact-action-secondary" href="tel:${PHONE_HREF}"><span aria-hidden="true">☎</span>Llamar</a>
          <a class="contact-action contact-action-neutral" href="${GITHUB_URL}" target="_blank" rel="noreferrer noopener"><span aria-hidden="true">↗</span>Ver GitHub</a>
        </div>

        <div class="contact-copy-row">
          <span>${getEmail()}</span>
          <button class="contact-copy-button" type="button" data-copy-email>Copiar email</button>
          <span class="contact-status" role="status" aria-live="polite" data-copy-status></span>
        </div>
      </div>
    </article>

    <aside class="contact-side-card contact-reveal" aria-labelledby="contact-details-title">
      <div class="contact-glare" aria-hidden="true"></div>
      <div style="position:relative">
        <h3 id="contact-details-title">Información profesional</h3>
        <ul class="contact-side-list">
          <li><span class="contact-side-icon" aria-hidden="true">⌖</span><span><strong>Ubicación</strong><br>Tafí Viejo, Tucumán, Argentina</span></li>
          <li><span class="contact-side-icon" aria-hidden="true">SEC</span><span><strong>Objetivo</strong><br>Roles junior en SOC, AppSec, DevSecOps o infraestructura con enfoque en seguridad</span></li>
          <li><span class="contact-side-icon" aria-hidden="true">@</span><span><strong>Canal recomendado</strong><br>Contacto y seguimiento por email</span></li>
        </ul>
        <div class="contact-badges" aria-label="Estado profesional">
          <span class="contact-badge">● Abierto a oportunidades junior</span>
          <span class="contact-badge">SOC · AppSec · DevSecOps</span>
        </div>
      </div>
    </aside>
  </div>

  <p class="contact-closing contact-reveal">Contacto directo, sin formularios externos ni seguimiento publicitario adicional.</p>
`

const copyText = async (value) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const field = document.createElement('textarea')
  field.value = value
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.append(field)
  field.select()
  document.execCommand('copy')
  field.remove()
}

const setupCopyEmail = (section) => {
  const button = section.querySelector('[data-copy-email]')
  const status = section.querySelector('[data-copy-status]')
  if (!button || !status) return

  let resetTimer
  button.addEventListener('click', async () => {
    try {
      await copyText(getEmail())
      button.textContent = 'Email copiado'
      status.textContent = 'Dirección copiada al portapapeles.'
    } catch {
      button.textContent = 'No se pudo copiar'
      status.textContent = 'Seleccioná la dirección visible para copiarla.'
    }

    window.clearTimeout(resetTimer)
    resetTimer = window.setTimeout(() => {
      button.textContent = 'Copiar email'
      status.textContent = ''
    }, 2200)
  })
}

const setupContactReveal = (section) => {
  const nodes = section.querySelectorAll('.contact-reveal')
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('contact-in'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('contact-in')
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )

  nodes.forEach((node, index) => {
    node.style.transitionDelay = `${index * 70}ms`
    observer.observe(node)
  })
}

const setupTiltCard = (card) => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const finePointer = window.matchMedia?.('(pointer: fine)')?.matches
  if (reduce || !finePointer) return

  const glare = card.querySelector('.contact-glare')

  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const rotateX = (0.5 - y) * 7
    const rotateY = (x - 0.5) * 7

    card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
    if (glare) {
      glare.style.background = `radial-gradient(620px at ${x * 100}% ${y * 100}%,rgba(96,165,250,.18),transparent 62%)`
    }
  })

  card.addEventListener('mouseleave', () => {
    card.style.transform = ''
    if (glare) glare.style.background = ''
  })
}

export const startContactOverhaul = () => {
  const section = document.querySelector('#contact')
  if (!section || section.dataset.contactOverhauled === 'true') return

  const container = section.firstElementChild
  if (!container) return

  section.dataset.contactOverhauled = 'true'
  ensureContactStyles()
  container.innerHTML = contactMarkup

  setupCopyEmail(section)
  setupContactReveal(section)
  section.querySelectorAll('.contact-main-card, .contact-side-card').forEach(setupTiltCard)
}