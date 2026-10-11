import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

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
            {t.about.bio}
          </motion.p>

          <motion.ul className="about-facts" {...rise}>
            {t.about.facts.map((fact) => (
              <li key={fact.label} className="fact-card card">
                <span className="fact-label">{fact.label}</span>
                <span className="fact-value">{fact.value}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
