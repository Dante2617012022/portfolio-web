const VERIFY_URL = 'https://cert.ddlr.org/cert.php?id=55'

const ensureCertificateStyles = () => {
  if (document.getElementById('certificates-overhaul-styles')) return

  const style = document.createElement('style')
  style.id = 'certificates-overhaul-styles'
  style.textContent = `
    #certs .cert-heading{
      text-align:center;
      max-width:760px;
      margin:0 auto;
    }
    #certs .cert-heading h2{
      color:#f8fafc;
      font-size:clamp(2rem,5vw,2.75rem);
      font-weight:800;
      letter-spacing:-.03em;
    }
    #certs .cert-heading-copy{
      margin-top:1rem;
      color:rgba(226,232,240,.82);
      line-height:1.75;
    }
    #certs .cert-title-line{
      display:flex;
      align-items:center;
      justify-content:center;
      gap:.5rem;
      margin-top:.8rem;
    }
    #certs .cert-title-line span:first-child{
      width:4rem;
      height:.25rem;
      border-radius:999px;
      background:#3b82f6;
    }
    #certs .cert-title-line span:last-child{
      width:1.25rem;
      height:.25rem;
      border-radius:999px;
      background:#7dd3fc;
    }
    #certs .cert-card-wrap{
      max-width:1050px;
      margin:3rem auto 0;
      perspective:1200px;
    }
    #certs .cert-card{
      position:relative;
      overflow:hidden;
      border:1px solid rgba(148,163,184,.24);
      border-radius:1.75rem;
      background:linear-gradient(145deg,rgba(15,23,42,.95),rgba(30,41,59,.88));
      box-shadow:0 30px 80px rgba(2,6,23,.45), inset 0 1px 0 rgba(255,255,255,.06);
      transform-style:preserve-3d;
      transition:transform .22s ease, border-color .25s ease, box-shadow .25s ease;
      will-change:transform;
    }
    #certs .cert-card:hover,
    #certs .cert-card:focus-within{
      border-color:rgba(96,165,250,.65);
      box-shadow:0 34px 90px rgba(2,6,23,.55),0 0 0 1px rgba(96,165,250,.15);
    }
    #certs .cert-glare{
      position:absolute;
      inset:0;
      pointer-events:none;
      opacity:.65;
      background:radial-gradient(600px at 50% 20%,rgba(125,211,252,.12),transparent 62%);
    }
    #certs .cert-grid{
      position:relative;
      display:grid;
      gap:2rem;
      padding:clamp(1.5rem,4vw,3rem);
    }
    #certs .cert-identity{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      text-align:center;
      padding:1.5rem;
      border-radius:1.35rem;
      background:linear-gradient(160deg,rgba(37,99,235,.18),rgba(8,145,178,.08));
      border:1px solid rgba(125,211,252,.16);
    }
    #certs .cert-shield{
      width:6.5rem;
      height:6.5rem;
      display:grid;
      place-items:center;
      border-radius:2rem;
      color:#bfdbfe;
      background:linear-gradient(145deg,rgba(59,130,246,.35),rgba(14,116,144,.2));
      box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 18px 45px rgba(2,132,199,.2);
    }
    #certs .cert-shield svg{
      width:3.6rem;
      height:3.6rem;
    }
    #certs .cert-year{
      margin-top:1.25rem;
      color:#f8fafc;
      font-size:1.9rem;
      font-weight:800;
    }
    #certs .cert-level{
      margin-top:.4rem;
      color:#7dd3fc;
      font-size:.78rem;
      font-weight:800;
      letter-spacing:.14em;
      text-transform:uppercase;
    }
    #certs .cert-content{
      min-width:0;
    }
    #certs .cert-issuer{
      color:#7dd3fc;
      font-size:.78rem;
      font-weight:800;
      letter-spacing:.14em;
      text-transform:uppercase;
    }
    #certs .cert-content h3{
      margin-top:.6rem;
      color:#fff;
      font-size:clamp(1.65rem,4vw,2.4rem);
      font-weight:800;
      letter-spacing:-.025em;
      line-height:1.15;
    }
    #certs .cert-summary{
      margin-top:1rem;
      color:#cbd5e1;
      line-height:1.75;
      max-width:760px;
    }
    #certs .cert-tags{
      display:flex;
      flex-wrap:wrap;
      gap:.6rem;
      margin-top:1.25rem;
    }
    #certs .cert-tag{
      display:inline-flex;
      align-items:center;
      gap:.4rem;
      border-radius:999px;
      padding:.55rem .85rem;
      color:#dbeafe;
      background:rgba(30,64,175,.25);
      border:1px solid rgba(96,165,250,.22);
      font-size:.78rem;
      font-weight:700;
    }
    #certs .cert-competencies{
      margin-top:1.7rem;
      padding-top:1.5rem;
      border-top:1px solid rgba(148,163,184,.16);
    }
    #certs .cert-competencies h4{
      color:#f8fafc;
      font-size:1rem;
      font-weight:800;
    }
    #certs .cert-list{
      display:grid;
      gap:.75rem;
      margin-top:1rem;
      padding:0;
      list-style:none;
    }
    #certs .cert-list li{
      position:relative;
      padding-left:1.35rem;
      color:#cbd5e1;
      line-height:1.6;
    }
    #certs .cert-list li::before{
      content:'';
      position:absolute;
      left:0;
      top:.62rem;
      width:.45rem;
      height:.45rem;
      border-radius:999px;
      background:#38bdf8;
      box-shadow:0 0 14px rgba(56,189,248,.65);
    }
    #certs .cert-actions{
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      gap:1rem;
      margin-top:1.8rem;
    }
    #certs .cert-verify{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:.65rem;
      min-height:2.85rem;
      padding:.75rem 1.1rem;
      border-radius:.9rem;
      color:#fff;
      background:linear-gradient(135deg,#2563eb,#0891b2);
      font-weight:800;
      box-shadow:0 14px 32px rgba(37,99,235,.25);
      transition:transform .2s ease,box-shadow .2s ease;
    }
    #certs .cert-verify:hover,
    #certs .cert-verify:focus-visible{
      transform:translateY(-2px);
      box-shadow:0 18px 38px rgba(37,99,235,.34);
      outline:none;
    }
    #certs .cert-external-note{
      color:#94a3b8;
      font-size:.78rem;
      line-height:1.5;
    }
    #certs .cert-scope-note{
      max-width:900px;
      margin:1.5rem auto 0;
      padding:1rem 1.2rem;
      border-radius:1rem;
      color:#cbd5e1;
      background:rgba(15,23,42,.62);
      border:1px solid rgba(148,163,184,.14);
      text-align:center;
      font-size:.85rem;
      line-height:1.65;
    }
    #certs .cert-reveal{
      opacity:0;
      transform:translateY(22px);
    }
    #certs .cert-reveal.cert-in{
      opacity:1;
      transform:none;
      transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);
    }
    @media (min-width:800px){
      #certs .cert-grid{
        grid-template-columns:minmax(220px,.72fr) minmax(0,2fr);
        align-items:stretch;
      }
      #certs .cert-list{
        grid-template-columns:repeat(2,minmax(0,1fr));
      }
    }
    @media (prefers-reduced-motion:reduce){
      #certs .cert-reveal{
        opacity:1;
        transform:none;
      }
      #certs .cert-card,
      #certs .cert-verify{
        transition:none;
      }
    }
  `
  document.head.append(style)
}

const certificateMarkup = `
  <div class="cert-heading cert-reveal">
    <h2 id="certificates-title">Certificados</h2>
    <div class="cert-title-line" aria-hidden="true"><span></span><span></span></div>
    <div class="cert-heading-copy">
      Credenciales verificables que complementan la formación universitaria, los laboratorios autorizados y los proyectos aplicados.
    </div>
  </div>

  <div class="cert-card-wrap cert-reveal">
    <article class="cert-card" tabindex="0" aria-labelledby="newbie-auditor-title">
      <div class="cert-glare" aria-hidden="true"></div>
      <div class="cert-grid">
        <div class="cert-identity">
          <div class="cert-shield" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3 5 6v5c0 4.7 2.9 8.2 7 10 4.1-1.8 7-5.3 7-10V6l-7-3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="m9.3 12 1.7 1.7 3.8-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="cert-year">2025</div>
          <div class="cert-level">Nivel inicial</div>
        </div>

        <div class="cert-content">
          <p class="cert-issuer">Diosdelared.com · Credencial verificable</p>
          <h3 id="newbie-auditor-title">Newbie Security Auditor</h3>
          <p class="cert-summary">Auditoría de seguridad en entorno CTF autorizado, pentesting básico y hardening.</p>

          <div class="cert-tags" aria-label="Características de la credencial">
            <span class="cert-tag">✓ Credencial verificable</span>
            <span class="cert-tag">Entorno CTF autorizado</span>
            <span class="cert-tag">Pentesting básico</span>
            <span class="cert-tag">Hardening</span>
          </div>

          <div class="cert-competencies">
            <h4>Competencias trabajadas</h4>
            <ul class="cert-list">
              <li>Reconocimiento y enumeración inicial dentro de un alcance definido.</li>
              <li>Identificación básica de vulnerabilidades y posibles vectores de ataque.</li>
              <li>Uso ético de herramientas de auditoría en un entorno autorizado.</li>
              <li>Documentación de hallazgos y recomendaciones iniciales de mitigación.</li>
            </ul>
          </div>

          <div class="cert-actions">
            <a class="cert-verify" href="${VERIFY_URL}" target="_blank" rel="noreferrer noopener">
              Verificar credencial
              <span aria-hidden="true">↗</span>
            </a>
            <span class="cert-external-note">La verificación se abre en el sitio del emisor.</span>
          </div>
        </div>
      </div>
    </article>
  </div>

  <div class="cert-scope-note cert-reveal">
    Esta credencial acredita formación introductoria en auditoría. No representa experiencia profesional desempeñando el rol de auditor de seguridad.
  </div>
`

const setupCertificateReveal = (section) => {
  const nodes = section.querySelectorAll('.cert-reveal')
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('cert-in'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('cert-in')
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )

  nodes.forEach((node, index) => {
    node.style.transitionDelay = `${index * 90 + 50}ms`
    observer.observe(node)
  })
}

const setupCertificateTilt = (section) => {
  const card = section.querySelector('.cert-card')
  const glare = section.querySelector('.cert-glare')
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const finePointer = window.matchMedia?.('(pointer: fine)')?.matches
  if (!card || reduce || !finePointer) return

  let frame = 0
  const reset = () => {
    cancelAnimationFrame(frame)
    card.style.transform = ''
    if (glare) glare.style.background = ''
  }

  card.addEventListener('mousemove', (event) => {
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    const rotateX = (0.5 - y) * 7
    const rotateY = (x - 0.5) * 9

    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`
      if (glare) {
        glare.style.background = `radial-gradient(620px at ${x * 100}% ${y * 100}%,rgba(125,211,252,.2),transparent 62%)`
      }
    })
  })

  card.addEventListener('mouseleave', reset)
  card.addEventListener('blur', reset, true)
}

export const applyCertificatesOverhaul = () => {
  const section = document.querySelector('#certs')
  if (!section || section.dataset.certificatesOverhaul === 'true') return Boolean(section)

  const container = section.querySelector('.relative.z-10')
  if (!container) return false

  section.dataset.certificatesOverhaul = 'true'
  ensureCertificateStyles()
  container.innerHTML = certificateMarkup
  setupCertificateReveal(section)
  setupCertificateTilt(section)
  return true
}

export const startCertificatesOverhaul = () => {
  if (window.__certificatesOverhaulStarted) return
  window.__certificatesOverhaulStarted = true

  if (applyCertificatesOverhaul()) return

  const observer = new MutationObserver(() => {
    if (!applyCertificatesOverhaul()) return
    observer.disconnect()
  })

  observer.observe(document.documentElement, { childList: true, subtree: true })
}
