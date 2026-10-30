import { motion, useReducedMotion } from 'framer-motion'
import { FiBriefcase, FiBookOpen, FiLayers } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'

const FACT_ICONS = [FiBriefcase, FiLayers, FiBookOpen]

function renderBio(text) {
  return text.split(/\{([^}]+)\}/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="tech-hl">
        {part}
      </span>
    ) : (
      part
    )
  )
}

export default function About() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.5, ease: 'easeOut' },
      }

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.h2 className="section-title" {...rise}>
          {t.about.title}
        </motion.h2>

        <div className="about-grid">
          <motion.p className="about-bio card" {...rise}>
            <span className="bio-text">{renderBio(t.about.bio)}</span>
          </motion.p>

          <motion.ul className="about-facts" {...rise}>
            {t.about.facts.map((fact, i) => {
              const Icon = FACT_ICONS[i]
              return (
                <li key={fact.label} className="fact-card card">
                  <span className="fact-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="fact-body">
                    <span className="fact-label">{fact.label}</span>
                    <span className="fact-value">{fact.value}</span>
                  </span>
                </li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
