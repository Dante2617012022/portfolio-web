const STYLE_ID = 'experience-responsive-fix-styles'

const styles = `
  .experience-overhaul__card[data-featured="true"] h3 {
    color: #f8fafc !important;
    text-shadow: 0 2px 14px rgba(2, 6, 23, .42);
  }

  .experience-overhaul__summary {
    width: 100%;
    max-width: 860px;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr));
    align-items: stretch;
  }

  .experience-overhaul__metric {
    min-width: 0;
    height: 100%;
    overflow: hidden;
  }

  .experience-overhaul__metric strong,
  .experience-overhaul__metric span {
    max-width: 100%;
    overflow-wrap: anywhere;
    word-break: normal;
    hyphens: auto;
    text-wrap: balance;
  }

  .experience-overhaul__metric strong {
    font-size: clamp(.9rem, 2.2vw, .98rem);
    line-height: 1.3;
  }

  .experience-overhaul__metric span {
    font-size: clamp(.74rem, 1.9vw, .8rem);
    line-height: 1.45;
  }

  @media (max-width: 560px) {
    [data-experience-overhaul] {
      width: min(100% - 1.25rem, 1152px);
    }

    .experience-overhaul__summary {
      gap: .7rem;
    }

    .experience-overhaul__metric {
      padding: .85rem .9rem;
    }

    .experience-overhaul__card h3 {
      font-size: clamp(1.35rem, 7vw, 1.65rem);
      overflow-wrap: anywhere;
    }
  }
`

export const startExperienceResponsiveFix = () => {
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = styles
  document.head.append(style)
}
