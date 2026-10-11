import { motion, useReducedMotion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'

export default function Education() {
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
    <section id="education" className="section section-alt">
      <div className="container">
        <motion.h2 className="section-title" {...rise}>
          {t.education.title}
        </motion.h2>

        <motion.div className="timeline" {...rise}>
          {t.education.items.map((item) => (
            <article key={item.school} className="timeline-item card">
              <span className="timeline-dot" aria-hidden="true">
                <FiBookOpen />
              </span>
              <h3 className="timeline-school">{item.school}</h3>
              <p className="timeline-program">{item.program}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
